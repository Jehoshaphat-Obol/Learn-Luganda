#!/usr/bin/env node
// Folds a hand-built course pair into the shared catalog (#184, phase 2):
// every word and sentence of `<from>-<to>` (and its reverse `<to>-<from>`)
// either matches a concept the curriculum already has, which gains the
// pair's accepted answers and notes, or becomes a new concept, which grows
// the curriculum for every language.
//
//   node scripts/fold-course.js [--course en-sw] [--units u1-u8] [--drafts <file>] [--since 2] [--write] [--map <file>]
//
// New concepts go to the curriculum unit where most of the words their
// source lesson shares with the curriculum already live, as an extra skill
// (`uNs4`). Every language in lang/ must fill them: text for the pair's
// two languages comes from the pair, the rest from `--drafts`, a
// tab-separated file of `lang  kind  id  text` lines (kind is word,
// sentence or skill). Without --write the script reports what it would do
// and writes the lines still missing to --drafts (if given) to fill in.
// `--units` limits the run to the new concepts landing in those curriculum
// units, so a pair can be folded one section at a time.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { formatJson } from './format-json.js';
import { cultureOf, fillCulture, fillNames } from '../src/content/compose.js';

const args = process.argv.slice(2);
const opt = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const course = opt('--course', 'en-sw');
const [from, to] = course.split('-');
const draftsPath = opt('--drafts', null);
const write = args.includes('--write');
// The curriculum version new skills belong to (see `since` in
// curriculum-unit.schema.json): phase 2 of #184 is version 2.
const SINCE = Number(opt('--since', 2));
const range = opt('--units', 'u1-u40').split('-').map((u) => Number(u.replace('u', '')));
const inRange = (uid) => Number(uid.slice(1)) >= range[0] && Number(uid.slice(1)) <= (range[1] ?? range[0]);

const root = resolve('src/packs');
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const units = (dir) => Object.fromEntries((existsSync(dir) ? readdirSync(dir) : []).map((f) => readJson(`${dir}/${f}`)).map((u) => [u.id, u]));
const byNumber = (a, b) => Number(a.slice(1)) - Number(b.slice(1));

// Where a source unit's new concepts go when none of its lesson's words
// matched: the curriculum unit on the same topic.
const UNIT_MAP = {
  'en-sw': { u5: 'u6', u6: 'u7', u7: 'u11', u26: 'u27', u27: 'u28', u28: 'u29', u29: 'u30', u30: 'u31', u31: 'u32', u32: 'u37' },
};
// Curriculum units whose guidebook notes come from a source unit that
// UNIT_MAP doesn't send there (en-sw's "Numbers and time" covers both).
const GUIDE_MAP = { 'en-sw': { u5: 'u4' } };

const pair = { meta: readJson(`${root}/courses/${course}/course.json`), units: units(`${root}/courses/${course}/units`) };
const reverseId = `${to}-${from}`;
const reverse = existsSync(`${root}/courses/${reverseId}`) ? { meta: readJson(`${root}/courses/${reverseId}/course.json`), units: units(`${root}/courses/${reverseId}/units`) } : null;
const curriculum = { meta: readJson(`${root}/curriculum/course.json`), units: units(`${root}/curriculum/units`) };
const codes = readdirSync(`${root}/lang`).filter((c) => existsSync(`${root}/lang/${c}/course.json`));
const lang = Object.fromEntries(codes.map((c) => [c, { meta: readJson(`${root}/lang/${c}/course.json`), units: units(`${root}/lang/${c}/units`) }]));
// Languages that fill lesson text (French has headings only so far).
const full = codes.filter((c) => Object.keys(lang[c].units).length);

const norm = (t) =>
  String(t)
    .replace(/\s*\([^()]*\)\s*$/, '')
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[?!.,;:“”"…—–-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Curriculum text names languages as `{to}`/`{from}`; the pair spells
// them out, so match on the pair's own names, and its own culture.
const culture = cultureOf(curriculum.meta, lang[from]?.meta, lang[to]?.meta);
const named = (code, t) => fillCulture(fillNames(t, lang[code].meta.languageNames, { from, to }), culture);

// Index the curriculum: text in each language -> concept ids.
const index = { words: {}, sentences: {} };
const where = {}; // concept id -> curriculum unit
for (const cu of Object.values(curriculum.units)) {
  for (const kind of ['words', 'sentences']) {
    for (const id of cu[kind]) {
      where[id] = cu.id;
      for (const code of [from, to]) {
        const item = lang[code].units[cu.id]?.[kind]?.[id];
        if (!item) continue;
        for (const t of [item.text, ...(item.alts ?? [])]) (((index[kind][code] ??= {})[norm(named(code, t))] ??= new Set())).add(id);
      }
    }
  }
}
const textsOf = (code, kind, id) => {
  const item = lang[code].units[where[id]]?.[kind]?.[id];
  return item ? [item.text, ...(item.alts ?? [])].map((t) => norm(named(code, t))) : [];
};

// The pair's items, with the reverse course's accepted answers merged in.
const items = []; // { kind, id, unit, lesson, text: { [from]: {text, alts}, [to]: {...} }, notes: { [from], [to] } }
const revItem = (kind, uid, id) => reverse?.units[uid]?.[kind]?.find((x) => x.id === id);
for (const u of Object.values(pair.units).sort((a, b) => byNumber(a.id, b.id))) {
  const lessonOf = {};
  for (const sk of u.skills) for (const l of sk.lessons) for (const id of [...l.newWords, ...(l.sentences ?? [])]) lessonOf[id] ??= { skill: sk, lesson: l };
  for (const kind of ['words', 'sentences']) {
    for (const x of u[kind]) {
      const r = revItem(kind, u.id, x.id);
      items.push({
        kind,
        id: x.id,
        unit: u.id,
        lesson: lessonOf[x.id]?.lesson.id ?? null,
        skill: lessonOf[x.id]?.skill ?? null,
        text: {
          [to]: { text: x.target, alts: [...new Set([...(x.altTarget ?? []), ...(r?.altBase ?? [])])] },
          [from]: { text: x.base, alts: [...new Set([...(x.altBase ?? []), ...(r?.altTarget ?? [])])] },
        },
        notes: { [from]: x.notes, [to]: r?.notes },
      });
    }
  }
}

// Match each item to a concept: same text in the target language whose
// meaning agrees, else same meaning whose target text agrees, else the same
// target text alone (a word with one more meaning than the curriculum gives).
const all = (code, t) => [t.text, ...t.alts].map(norm);
const mainOf = (code, kind, id) => norm(named(code, lang[code].units[where[id]]?.[kind]?.[id]?.text ?? ''));
// How closely concept `id` agrees with the item in language `code`: the
// same main text (3), the item's text among the concept's answers (2), the
// concept's text among the item's answers (1), or neither (0).
const agreement = (it, id, code) => {
  const mine = norm(it.text[code].text);
  const theirs = mainOf(code, it.kind, id);
  if (mine === theirs) return 3;
  if (textsOf(code, it.kind, id).includes(mine)) return 2;
  if (it.text[code].alts.map(norm).includes(theirs)) return 1;
  return 0;
};
for (const it of items) {
  const idx = index[it.kind];
  const ids = (code) => [...new Set(all(code, it.text[code]).flatMap((t) => [...(idx[code]?.[t] ?? [])]))];
  // Both languages must agree, the meaning at least by an accepted answer.
  const scored = [...new Set([...ids(to), ...ids(from)])]
    .map((id) => ({ id, t: agreement(it, id, to), b: agreement(it, id, from) }))
    .filter((c) => Math.max(c.t, c.b) === 3 && (c.t >= 1 && c.b >= 2 || c.t >= 2 && c.b >= 1))
    .sort((x, y) => y.t + y.b - (x.t + x.b));
  it.match = scored[0]?.id ?? null;
}

// Each source lesson's home: the curriculum unit holding most of its matched words.
const home = {};
for (const it of items) {
  if (!it.lesson || !it.match) continue;
  const h = (home[it.lesson] ??= {});
  h[where[it.match]] = (h[where[it.match]] ?? 0) + 1;
}
const homeOf = (it) => {
  const h = home[it.lesson];
  if (h) return Object.entries(h).sort((a, b) => b[1] - a[1] || byNumber(a[0], b[0]))[0][0];
  return UNIT_MAP[course]?.[it.unit] ?? it.unit;
};

const fresh = items.filter((it) => !it.match);
for (const it of fresh) it.home = homeOf(it);
const taken = new Set(Object.keys(where));
for (const it of fresh) {
  // Concept ids are shared by every language: keep the pair's, unless taken.
  it.newId = taken.has(it.id) ? `${it.id}-${to}` : it.id;
  taken.add(it.newId);
}
const folding = fresh.filter((it) => inRange(it.home));

// `--map <file>`: the pair's word and sentence ids with the curriculum ids
// they matched, by source unit and lesson (scripts/retire-course.js reads it).
const mapPath = opt('--map', null);
if (mapPath) writeFileSync(mapPath, JSON.stringify(items.map((it) => ({ kind: it.kind, id: it.id, unit: it.unit, lesson: it.lesson, match: it.match ?? it.newId }))));

if (args.includes('--matches')) for (const it of items.filter((x) => x.match)) { const t = lang[from].units[where[it.match]][it.kind][it.match].text; if (norm(t) !== norm(it.text[from].text)) console.log(`  ${it.unit} ${it.text[to].text} = ${it.text[from].text} -> ${it.match} (${t})`); }
// Report.
const count = (list, kind) => list.filter((x) => x.kind === kind).length;
console.log(`${course}: ${count(items, 'words')} words, ${count(items, 'sentences')} sentences.`);
console.log(`Matched to the curriculum: ${count(items.filter((x) => x.match), 'words')} words, ${count(items.filter((x) => x.match), 'sentences')} sentences.`);
console.log(`New concepts: ${count(fresh, 'words')} words, ${count(fresh, 'sentences')} sentences; in ${range.join('-')}: ${count(folding, 'words')} words, ${count(folding, 'sentences')} sentences.`);
const perUnit = {};
for (const it of folding) (perUnit[it.home] ??= []).push(it);
for (const uid of Object.keys(perUnit).sort(byNumber)) console.log(`  ${uid}: ${perUnit[uid].filter((x) => x.kind === 'words').map((x) => x.text[to].text).join(', ')} (+${count(perUnit[uid], 'sentences')} sentences)`);

// The extra skill: new words with the new sentences that come with them,
// in the order the pair teaches them, gathered into lessons of up to 5
// words and 4 sentences; a short remainder joins the lesson before it.
const plan = {};
for (const uid of Object.keys(perUnit).sort(byNumber)) {
  const sid = `${uid}s${curriculum.units[uid].skills.length + 1}`;
  const byLesson = new Map();
  for (const it of perUnit[uid]) {
    const g = byLesson.get(it.lesson) ?? [];
    byLesson.set(it.lesson, g);
    g.push(it);
  }
  const lessons = [];
  let cur = { newWords: [], sentences: [] };
  const flush = () => {
    if (cur.newWords.length + cur.sentences.length) lessons.push(cur);
    cur = { newWords: [], sentences: [] };
  };
  for (const g of byLesson.values()) {
    for (const it of [...g.filter((x) => x.kind === 'words'), ...g.filter((x) => x.kind === 'sentences')]) {
      const list = it.kind === 'words' ? cur.newWords : cur.sentences;
      if (list.length >= (it.kind === 'words' ? 5 : 4)) flush();
      (it.kind === 'words' ? cur.newWords : cur.sentences).push(it.newId);
    }
    if (cur.newWords.length + cur.sentences.length >= 6) flush();
  }
  if (lessons.length && cur.newWords.length + cur.sentences.length < 4) {
    lessons.at(-1).newWords.push(...cur.newWords);
    lessons.at(-1).sentences.push(...cur.sentences);
  } else flush();
  const icon = perUnit[uid].find((x) => x.skill)?.skill.icon ?? 'star';
  plan[uid] = { id: sid, icon, lessons: lessons.map((l, i) => ({ id: `${sid}l${i + 1}`, newWords: l.newWords, ...(l.sentences.length ? { sentences: l.sentences } : {}) })) };
}

// What other languages must write: drafts.
const drafts = {};
if (draftsPath && existsSync(draftsPath)) {
  for (const line of readFileSync(draftsPath, 'utf8').split('\n')) {
    const [code, kind, id, text] = line.split('\t');
    if (!text?.trim() || code.startsWith('#')) continue;
    ((drafts[code] ??= {})[`${kind}:${id}`] = text.trim());
  }
}
const others = full.filter((c) => c !== from && c !== to);
const missing = [];
for (const code of others) {
  for (const it of folding) {
    const key = `${it.kind === 'words' ? 'word' : 'sentence'}:${it.newId}`;
    if (!drafts[code]?.[key]) missing.push([code, key.split(':')[0], it.newId, '', `${it.text[from].text} = ${it.text[to].text}`]);
  }
}
for (const code of codes.filter((c) => c !== from && c !== to)) {
  for (const s of Object.values(plan)) if (!drafts[code]?.[`skill:${s.id}`]) missing.push([code, 'skill', s.id, '', '']);
}
for (const code of [from, to]) for (const s of Object.values(plan)) if (!drafts[code]?.[`skill:${s.id}`]) missing.push([code, 'skill', s.id, '', '']);
// Replies in dialogues: every language that writes lesson text needs them
// to be learned, written as `option | option | option` in the order of
// the Luganda ones.
const dialogueGaps = [];
for (const code of full) {
  for (const cu of Object.values(curriculum.units).filter((u) => inRange(u.id)).sort((a, b) => byNumber(a.id, b.id))) {
    for (const sk of cu.skills) {
      for (const l of sk.lessons) {
        (l.dialogues ?? []).forEach((d, i) => {
          const have = lang[code].units[cu.id]?.dialogues?.[l.id]?.[i];
          if (have?.options?.length) return;
          const key = `dialogue:${l.id}.${i}`;
          dialogueGaps.push({ code, uid: cu.id, lesson: l.id, i, key });
          if (!drafts[code]?.[key]) {
            const lg = lang.lg?.units[cu.id]?.dialogues?.[l.id]?.[i];
            missing.push([code, 'dialogue', `${l.id}.${i}`, '', `${have?.line ?? ''} :: ${(lg?.options ?? []).join(' | ')} (answer ${d.answer + 1})`]);
          }
        });
      }
    }
  }
}
console.log(`${missing.length} text(s) still to write${draftsPath ? ` (see ${draftsPath})` : ''}.`);
if (draftsPath && missing.length) {
  const keep = existsSync(draftsPath) ? readFileSync(draftsPath, 'utf8').trimEnd() : '# lang\tkind\tid\ttext\t(hint)';
  writeFileSync(draftsPath, `${keep}\n${missing.map((m) => m.join('\t')).join('\n')}\n`);
}

if (!write) process.exit(0);
if (missing.length) {
  console.error('Fill in every draft before --write.');
  process.exit(1);
}

// Write: the pair's accepted answers and notes for matched concepts, then
// the new concepts.
const files = {};
const langUnit = (code, uid) => (files[`lang/${code}/units/${uid}.json`] ??= lang[code].units[uid] ?? { $schema: '../../../../../docs/packs/schema/lang-unit.schema.json', id: uid });
const aboutDir = (code, about) => `lang/${code}/about/${about}`;
const aboutUnit = (code, about, uid) => {
  const path = `${aboutDir(code, about)}/units/${uid}.json`;
  return (files[path] ??= existsSync(`${root}/${path}`) ? readJson(`${root}/${path}`) : { $schema: '../../../../../../../docs/packs/schema/about-unit.schema.json', id: uid });
};
// New accepted answers: the pair's text and answers that the item doesn't accept yet.
const merge = (item, t) => {
  const have = new Set([item.text, ...(item.alts ?? [])].map(norm));
  const add = [];
  for (const a of [t.text, ...t.alts]) {
    if (have.has(norm(a))) continue;
    have.add(norm(a));
    add.push(a);
  }
  if (add.length) item.alts = [...(item.alts ?? []), ...add];
};
for (const it of items) {
  const id = it.match ?? it.newId;
  const uid = it.match ? where[it.match] : it.home;
  if (!inRange(uid)) continue;
  for (const code of [from, to]) {
    const u = langUnit(code, uid);
    const bucket = (u[it.kind] ??= {});
    if (bucket[id]) merge(bucket[id], it.text[code]);
    else bucket[id] = { text: it.text[code].text, ...(it.text[code].alts.length ? { alts: it.text[code].alts } : {}) };
  }
  // Notes about the target in the base language, and the reverse.
  if (it.notes[from]) ((aboutUnit(from, to, uid).notes ??= {})[id] ??= it.notes[from]);
  if (it.notes[to]) ((aboutUnit(to, from, uid).notes ??= {})[id] ??= it.notes[to]);
}
for (const it of folding) {
  for (const code of others) langUnit(code, it.home)[it.kind][it.newId] ??= { text: drafts[code][`${it.kind === 'words' ? 'word' : 'sentence'}:${it.newId}`] };
}
for (const [uid, skill] of Object.entries(plan)) {
  const cu = (files[`curriculum/units/${uid}.json`] ??= curriculum.units[uid]);
  for (const it of perUnit[uid]) cu[it.kind].push(it.newId);
  cu.skills.push({ id: skill.id, icon: skill.icon, since: SINCE, lessons: skill.lessons });
  for (const code of codes) {
    const meta = (files[`lang/${code}/course.json`] ??= lang[code].meta);
    meta.skills = { ...meta.skills, [skill.id]: drafts[code][`skill:${skill.id}`] };
  }
}

for (const g of dialogueGaps) {
  const u = langUnit(g.code, g.uid);
  const list = ((u.dialogues ??= {})[g.lesson] ??= []);
  list[g.i] = { ...list[g.i], options: drafts[g.code][g.key].split('|').map((o) => o.trim()) };
}

// Guidebook notes: the source unit on the same topic, in both directions.
const sourceFor = (uid) => GUIDE_MAP[course]?.[uid] ?? Object.keys(pair.units).find((s) => (UNIT_MAP[course]?.[s] ?? s) === uid);
for (const uid of Object.keys(curriculum.units).filter(inRange)) {
  const src = sourceFor(uid);
  if (!src) continue;
  for (const [code, about, unit] of [[from, to, pair.units[src]], [to, from, reverse?.units[src]]]) {
    const gb = unit?.guidebook;
    if (!gb) continue;
    const au = aboutUnit(code, about, uid);
    au.guidebook ??= { intro: gb.intro, ...(gb.tips?.length ? { tips: gb.tips } : {}), ...(gb.culture?.length ? { culture: gb.culture } : {}) };
  }
}

// Course-wide: what learning <to> needs (cheers, settings), and the notes
// that frame each direction (description, landing, cast roles).
const look = Object.fromEntries(Object.entries(curriculum.meta.cast).map(([id, c]) => [c.look, id]));
for (const [code, src] of [[to, pair.meta], [from, reverse?.meta]]) {
  if (!src) continue;
  const meta = (files[`lang/${code}/course.json`] ??= lang[code].meta);
  for (const k of ['cheers', 'phrases', 'settings']) if (src[k] && !meta[k]) meta[k] = src[k];
}
for (const [code, about, src] of [[from, to, pair.meta], [to, from, reverse?.meta]]) {
  if (!src) continue;
  const path = `${aboutDir(code, about)}/course.json`;
  if (existsSync(`${root}/${path}`)) continue;
  const cast = Object.fromEntries(Object.values(src.cast ?? {}).filter((c) => look[c.look]).map((c) => [look[c.look], c.role]));
  files[path] = { $schema: '../../../../../../docs/packs/schema/about.schema.json', status: src.status, description: src.description, notes: src.notes, landing: src.landing, cast };
}

if (Object.keys(plan).length && curriculum.meta.version < SINCE) files['curriculum/course.json'] = { ...curriculum.meta, version: SINCE };

// Keep keys in curriculum order.
const order = (obj, keys) => Object.fromEntries(keys.filter((k) => obj?.[k] !== undefined).map((k) => [k, obj[k]]));
for (const [path, f] of Object.entries(files)) {
  if (path.startsWith('lang/') && path.includes('/units/') && !path.includes('/about/')) {
    const cu = files[`curriculum/units/${f.id}.json`] ?? curriculum.units[f.id];
    if (f.words) f.words = order(f.words, cu.words);
    if (f.sentences) f.sentences = order(f.sentences, cu.sentences);
  }
  if (path.endsWith('/course.json') && f.skills) {
    const ids = Object.keys(curriculum.units).sort(byNumber).flatMap((uid) => (files[`curriculum/units/${uid}.json`] ?? curriculum.units[uid]).skills.map((s) => s.id));
    f.skills = order(f.skills, ids);
  }
  const full = `${root}/${path}`;
  mkdirSync(full.slice(0, full.lastIndexOf('/')), { recursive: true });
  writeFileSync(full, `${formatJson(f)}\n`);
}
console.log(`Wrote ${Object.keys(files).length} files.`);
