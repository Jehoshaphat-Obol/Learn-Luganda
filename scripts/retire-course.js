#!/usr/bin/env node
// Retires a hand-built course pair once scripts/fold-course.js has folded
// its words and sentences into the shared catalog (#184, phase 2):
//
//   node scripts/retire-course.js [--course en-sw] [--write]
//
// - The pair's stories become curriculum stories tagged with the target
//   language's culture (`culture` in curriculum-unit.schema.json), with
//   their text in lang/<from> and lang/<to> and glosses in the about notes.
//   Story ids stay the same. A story only one direction has (one about
//   the language being learned, like greeting elders with "Shikamoo") is
//   tagged `teaches` so only courses of that target language tell it.
// - Each direction (`<from>-<to>` and `<to>-<from>`) gets a curriculum
//   migration step (`courses: [id]`) that moves saved progress from the
//   pair's word, lesson and unit ids to the curriculum's: a lesson goes to
//   every curriculum lesson that teaches its words, a word to the concept
//   it matched (or, where the composer leaves that out as a repeat, the
//   word that keeps its answer).
//
// Without --write it reports what it would do. Afterwards, delete
// src/packs/courses/<from>-<to> and <to>-<from> so the composed courses
// take over, then run `npm run coverage`.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { formatJson } from './format-json.js';
import { asTarget, composeCourse } from '../src/content/compose.js';
import { readCatalog, readLanguages } from './load-pack.js';

const args = process.argv.slice(2);
const opt = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const course = opt('--course', 'en-sw');
const [from, to] = course.split('-');
const reverseId = `${to}-${from}`;
const write = args.includes('--write');

const root = resolve('src/packs');
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const units = (dir) => Object.fromEntries((existsSync(dir) ? readdirSync(dir) : []).map((f) => readJson(`${dir}/${f}`)).map((u) => [u.id, u]));
const byNumber = (a, b) => Number(a.slice(1)) - Number(b.slice(1));
const pack = (id) => ({ meta: readJson(`${root}/courses/${id}/course.json`), units: units(`${root}/courses/${id}/units`) });
const pair = pack(course);
const reverse = pack(reverseId);
const curriculum = { meta: readJson(`${root}/curriculum/course.json`), units: units(`${root}/curriculum/units`) };

// What fold-course.js matched each of the pair's words and sentences to.
const mapFile = join(mkdtempSync(join(tmpdir(), 'retire-')), 'map.json');
execFileSync('node', ['scripts/fold-course.js', '--course', course, '--map', mapFile]);
const matched = readJson(mapFile);
const itemMap = { words: {}, sentences: {} };
for (const it of matched) itemMap[it.kind][it.id] = it.match;

// The curriculum's lessons in course order, and which lessons teach each item.
const order = [];
const unitOfLesson = {};
const teaching = {};
for (const s of curriculum.meta.sections) {
  for (const uid of s.units) {
    for (const sk of curriculum.units[uid].skills) {
      for (const l of sk.lessons) {
        order.push(l.id);
        unitOfLesson[l.id] = uid;
        for (const id of [...l.newWords, ...(l.sentences ?? [])]) (teaching[id] ??= []).push(l.id);
      }
    }
  }
}
const position = Object.fromEntries(order.map((id, i) => [id, i]));
const inOrder = (ids) => [...new Set(ids)].sort((a, b) => position[a] - position[b]);

// The pair's lessons and units, mapped to the curriculum's.
const lessonMap = {};
const unitMap = {};
for (const u of Object.values(pair.units).sort((a, b) => byNumber(a.id, b.id))) {
  const votes = {};
  for (const sk of u.skills) {
    for (const l of sk.lessons) {
      const ids = [...l.newWords.map((w) => itemMap.words[w]), ...(l.sentences ?? []).map((s) => itemMap.sentences[s])].filter(Boolean);
      lessonMap[l.id] = inOrder(ids.flatMap((id) => teaching[id] ?? []));
      for (const lid of lessonMap[l.id]) votes[unitOfLesson[lid]] = (votes[unitOfLesson[lid]] ?? 0) + 1;
    }
  }
  unitMap[u.id] = Object.entries(votes).sort((a, b) => b[1] - a[1] || byNumber(a[0], b[0]))[0]?.[0] ?? u.id;
}

// Stories: the pair's cast ids become the curriculum's (same drawing).
const castMap = {};
for (const [id, c] of Object.entries(pair.meta.cast)) castMap[id] = Object.entries(curriculum.meta.cast).find(([, cc]) => cc.look === c.look)?.[0] ?? id;
const langFile = (code, uid) => `lang/${code}/units/${uid}.json`;
const aboutFile = (code, about, uid) => `lang/${code}/about/${about}/units/${uid}.json`;
const files = {};
const load = (path, fresh) => (files[path] ??= existsSync(`${root}/${path}`) ? readJson(`${root}/${path}`) : fresh());
const curriculumUnit = (uid) => load(`curriculum/units/${uid}.json`, () => null);
const stories = [];
// A story in one direction only: its base text in full, and the lines and
// target-language options in the language it teaches.
const oneWay = (st, base, target) => {
  const lines = st.steps.filter((x) => x.line);
  return {
    [base]: { title: st.title, summary: st.summary, lines: lines.map((x) => x.line.base), questions: st.steps.filter((x) => !x.line).map((q) => ({ question: q.question, ...(q.optionsLang !== 'target' ? { options: q.options } : {}) })) },
    [target]: { lines: lines.map((x) => x.line.target), questions: st.steps.filter((x) => !x.line).map((q) => (q.optionsLang === 'target' ? { options: q.options } : {})) },
  };
};
for (const u of Object.values(pair.units).sort((a, b) => byNumber(a.id, b.id))) {
  const told = (u.stories ?? []).map((st) => [st, reverse.units[u.id]?.stories?.find((s) => s.id === st.id)]);
  const reverseOnly = (reverse.units[u.id]?.stories ?? []).filter((r) => !u.stories?.some((s) => s.id === r.id)).map((r) => [r, null, from]);
  for (const [st, rev, teaches = rev ? null : to] of [...told, ...reverseOnly]) {
    if (rev && rev.steps.length !== st.steps.length) throw new Error(`${st.id}: ${reverseId} tells it differently`);
    const after = lessonMap[st.unlockAfter]?.at(-1) ?? curriculumUnit(unitMap[u.id]).skills[0].lessons.at(-1).id;
    const uid = unitOfLesson[after];
    const steps = st.steps.map((step) => (step.line ? { speaker: castMap[step.line.speaker] } : { answer: step.answer, ...(step.optionsLang ? { optionsLang: step.optionsLang } : {}) }));
    const lines = st.steps.filter((x) => x.line);
    const questions = rev ? st.steps.map((x, k) => [x, rev.steps[k]]).filter(([x]) => !x.line) : [];
    const text = !rev ? (teaches === to ? oneWay(st, from, to) : oneWay(st, to, from)) : {
      [from]: {
        title: st.title,
        summary: st.summary,
        lines: lines.map((x) => x.line.base),
        questions: questions.map(([q, r]) => ({ question: q.question, ...(q.optionsLang !== 'target' ? { options: q.options } : r.optionsLang === 'target' ? { options: r.options } : {}) })),
      },
      [to]: {
        title: rev.title,
        summary: rev.summary,
        lines: lines.map((x) => x.line.target),
        questions: questions.map(([q, r]) => ({ question: r.question, ...(q.optionsLang === 'target' ? { options: q.options } : r.optionsLang !== 'target' ? { options: r.options } : {}) })),
      },
    };
    stories.push({ id: st.id, unit: uid });
    const cu = curriculumUnit(uid);
    cu.stories = [...(cu.stories ?? []).filter((s) => s.id !== st.id), { id: st.id, unlockAfter: after, cast: st.cast.map((c) => castMap[c]), culture: to, ...(teaches ? { teaches } : {}), steps }];
    for (const code of [from, to]) {
      const lu = load(langFile(code, uid), () => ({ $schema: '../../../../../docs/packs/schema/lang-unit.schema.json', id: uid }));
      lu.stories = { ...lu.stories, [st.id]: text[code] };
    }
    // Glosses: the pair's explain <to> words in <from>, the reverse's the other way.
    const sources = rev ? [[from, to, st], [to, from, rev]] : teaches === to ? [[from, to, st]] : [[to, from, st]];
    for (const [code, about, source] of sources) {
      const glosses = Object.fromEntries(source.steps.map((x, k) => [k, x.gloss]).filter(([, g]) => g));
      if (!Object.keys(glosses).length) continue;
      const au = load(aboutFile(code, about, uid), () => ({ $schema: '../../../../../../../docs/packs/schema/about-unit.schema.json', id: uid }));
      au.glosses = { ...au.glosses, [st.id]: glosses };
    }
  }
}

// Migration steps, one per direction, checked against the composed course.
const catalog = readCatalog();
for (const [path, json] of Object.entries(files)) {
  if (path.startsWith('curriculum/units/')) catalog.curriculum.units[json.id] = json;
  else if (/^lang\/[^/]+\/units\//.test(path)) catalog.lang[path.split('/')[1]].units[json.id] = json;
}
const wordUnit = Object.fromEntries(Object.values(catalog.curriculum.units).flatMap((u) => u.words.map((w) => [w, u.id])));
const norm = (t) => asTarget(String(t)).trim().toLowerCase().replace(/\s+/g, ' ');
const steps = [];
for (const [id, legacy] of [[course, pair], [reverseId, reverse]]) {
  const composed = composeCourse(id, catalog, { registry: readLanguages(), uis: [] });
  const known = new Set(Object.values(composed.units).flatMap((u) => u.words.map((w) => w.id)));
  const byTarget = Object.fromEntries(Object.values(composed.units).flatMap((u) => u.words.map((w) => [norm(w.target), w.id])));
  const words = {};
  const lost = [];
  for (const u of Object.values(legacy.units)) {
    for (const w of u.words) {
      const m = itemMap.words[w.id];
      // A match the composer left out as a repeat goes to the word that kept its answer.
      const target = (wid) => catalog.lang[id.split('-')[1]].units[wordUnit[wid]]?.words?.[wid]?.text;
      const goal = m && known.has(m) ? m : byTarget[norm(target(m) ?? '')] ?? byTarget[norm(w.target)];
      if (!goal) lost.push(w.id), console.log(`  ${id}: no word for ${w.id} (${w.target} = ${w.base})`);
      else if (goal !== w.id) words[w.id] = goal;
    }
  }
  const lessons = {};
  const removed = [];
  for (const [lid, list] of Object.entries(lessonMap)) {
    if (!list.length) removed.push(lid);
    else if (!(list.length === 1 && list[0] === lid)) lessons[lid] = list.length === 1 ? list[0] : list;
  }
  const unitRenames = Object.fromEntries(Object.entries(unitMap).filter(([a, b]) => a !== b));
  const step = { version: curriculum.meta.version, courses: [id], rename: { words, lessons, units: unitRenames } };
  if (lost.length || removed.length) step.remove = { ...(lost.length ? { words: lost } : {}), ...(removed.length ? { lessons: removed } : {}) };
  steps.push(step);
  console.log(`${id}: ${Object.keys(words).length} word renames, ${lost.length} words archived; ${Object.keys(lessons).length} lesson renames, ${removed.length} archived; ${Object.keys(unitRenames).length} unit renames.`);
}
console.log(`${stories.length} stories to the curriculum, tagged "${to}".`);

if (write) {
  const meta = curriculum.meta;
  meta.migrations = [...(meta.migrations ?? []).filter((m) => !m.courses?.some((c) => c === course || c === reverseId)), ...steps];
  files['curriculum/course.json'] = meta;
  for (const [path, json] of Object.entries(files)) writeFileSync(`${root}/${path}`, formatJson(json) + '\n');
  console.log(`Wrote ${Object.keys(files).length} files. Now delete src/packs/courses/${course} and ${reverseId}.`);
}
