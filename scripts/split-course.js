#!/usr/bin/env node
// Splits hand-built course packs into the shared catalog (#185):
// src/packs/curriculum/, src/packs/lang/<code>/ and the optional notes in
// src/packs/lang/<from>/about/<to>/ (see src/content/compose.js).
//
//   node scripts/split-course.js [--source <dir>] [--write]
//
// It reads en-lg, sw-lg and lg-en (and their labels) from --source (default
// src/packs/courses), merges each language's text from every course it
// appears in, and lists the places where two courses disagree. Without
// --write it only reports. Phase 1 ran it once, at the commit before the
// three folders were deleted; it's kept for phase 2, which folds en-sw and
// sw-en in the same way.
import { mkdirSync, readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { formatJson } from './format-json.js';
import { applyLabels } from '../src/content/labels.js';
import { CATALOG_FORMAT, asTarget } from '../src/content/compose.js';

const args = process.argv.slice(2);
const sourceAt = args.indexOf('--source');
const source = resolve(sourceAt >= 0 ? args[sourceAt + 1] : 'src/packs/courses');
const write = args.includes('--write');
const out = resolve('src/packs');

// Courses to split, most trusted first: when two disagree, the first wins
// unless PREFER says otherwise.
export const SOURCES = ['en-lg', 'sw-lg', 'lg-en'];

// Disagreements settled by hand: `<lang>:<key>` -> the course whose text is kept.
const PREFER = {
  // "coffee" repeats kaawa's meaning, and mulungi's "good" repeats bulungi's:
  // lg-en's sharper meanings keep both words in the English course.
  'en:words.emmwanyi': 'lg-en',
  'en:words.mulungi': 'lg-en',
  // en-lg left out "my".
  'en:sentences.s20-wiikendi': 'lg-en',
  'en:phrases.u20.3': 'lg-en',
};

// How each language names the others, for `{to}` in sentences that talk
// about the language being learned ("Do you speak Luganda?").
export const LANGUAGE_NAMES = {
  en: { en: 'English', lg: 'Luganda', sw: 'Swahili', fr: 'French' },
  lg: { en: { name: 'Olungereza', mu: 'Lungereza' }, lg: { name: 'Oluganda', mu: 'Luganda' }, sw: { name: 'Oluswayiri', mu: 'Luswayiri' }, fr: { name: 'Olufalansa', mu: 'Lufalansa' } },
  sw: { en: 'Kiingereza', lg: 'Kiganda', sw: 'Kiswahili', fr: 'Kifaransa' },
  fr: { en: 'anglais', lg: 'luganda', sw: 'swahili', fr: 'français' },
};

// The course title in each language, `{to}` being the language learned.
const COURSE_TITLES = {
  en: '{to} for English speakers',
  lg: '{to} eri aboogera Oluganda',
  sw: '{to} kwa wazungumzaji wa Kiswahili',
};

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function readCourse(id) {
  const dir = `${source}/${id}`;
  const meta = readJson(`${dir}/course.json`);
  const units = {};
  for (const f of readdirSync(`${dir}/units`)) {
    const u = readJson(`${dir}/units/${f}`);
    units[u.id] = u;
  }
  const labels = {};
  if (existsSync(`${dir}/labels`)) for (const f of readdirSync(`${dir}/labels`)) labels[f.replace(/\.json$/, '')] = readJson(`${dir}/labels/${f}`);
  return { meta, units, labels };
}

/** Name forms of `to` in language `code`, longest first, with their placeholders. */
function nameForms(code, to) {
  const entry = LANGUAGE_NAMES[code]?.[to];
  if (!entry) return [];
  const forms = typeof entry === 'string' ? [['{to}', entry]] : Object.entries(entry).map(([k, v]) => [k === 'name' ? '{to}' : `{to.${k}}`, v]);
  return forms.sort((a, b) => b[1].length - a[1].length);
}

function template(text, code, to) {
  let outText = text;
  for (const [ph, name] of nameForms(code, to)) outText = outText.replace(new RegExp(`(?<![\\p{L}{])${name}(?![\\p{L}])`, 'gu'), ph);
  return outText;
}

// Every piece of text, as `slots[code][key] = [{ src, to, value }]`.
const slots = {};
const put = (code, key, value, src, to) => {
  if (value === undefined || value === null || value === '') return;
  ((slots[code] ??= {})[key] ??= []).push({ src, to, value });
};

const courses = Object.fromEntries(SOURCES.map((id) => [id, readCourse(id)]));
const curriculum = { meta: null, units: {} };
const about = {}; // about[code][to] = { meta, units }
const structural = [];

for (const id of SOURCES) {
  const { meta, units, labels } = courses[id];
  const { from, to } = meta;
  const ab = ((about[from] ??= {})[to] ??= { meta: {}, units: {} });
  ab.meta = { status: meta.status, description: meta.description, notes: meta.notes, landing: meta.landing };
  put(to, 'meta.cheers', meta.cheers, id, to);
  put(to, 'meta.phrases', meta.phrases, id, to);
  put(to, 'meta.settings', meta.settings, id, to);
  for (const s of meta.sections) for (const f of ['title', 'level', 'description']) put(from, `meta.sections.${s.id}.${f}`, s[f], id, to);
  for (const [cid, c] of Object.entries(meta.cast)) put(from, `meta.cast.${cid}`, c.role, id, to);

  if (!curriculum.meta) {
    curriculum.meta = {
      formatVersion: CATALOG_FORMAT,
      version: meta.version,
      ...(meta.migrations?.length ? { migrations: meta.migrations } : {}),
      cast: Object.fromEntries(Object.entries(meta.cast).map(([cid, c]) => [cid, { name: c.name, look: c.look, voice: c.voice }])),
      sections: meta.sections.map((s) => ({ id: s.id, units: s.units })),
    };
  }

  for (const u of Object.values(units)) {
    const au = (ab.units[u.id] = { notes: {}, tips: {}, glosses: {} });
    put(from, `meta.units.${u.id}.title`, u.title, id, to);
    put(from, `meta.units.${u.id}.description`, u.description, id, to);
    for (const kind of ['words', 'sentences']) {
      for (const w of u[kind]) {
        put(to, `${kind}.${w.id}`, { text: w.target, alts: w.altTarget ?? [], audio: w.audio }, id, to);
        put(from, `${kind}.${w.id}`, { text: w.base, alts: w.altBase ?? [] }, id, to);
        if (w.notes) au.notes[w.id] = w.notes;
      }
    }
    u.guidebook.phrases.forEach((p, i) => {
      put(to, `phrases.${u.id}.${i}`, p.target, id, to);
      put(from, `phrases.${u.id}.${i}`, p.base, id, to);
    });
    au.guidebook = { intro: u.guidebook.intro, tips: u.guidebook.tips, culture: u.guidebook.culture };
    for (const sk of u.skills) {
      put(from, `meta.skills.${sk.id}`, sk.title, id, to);
      if (sk.tip) au.tips[sk.id] = sk.tip;
      for (const l of sk.lessons) {
        (l.dialogues ?? []).forEach((d, i) => {
          put(to, `dialogues.${u.id}.${l.id}.${i}.line`, d.target, id, to);
          put(to, `dialogues.${u.id}.${l.id}.${i}.options`, d.options, id, to);
          put(from, `dialogues.${u.id}.${l.id}.${i}.line`, d.base, id, to);
        });
      }
    }
    for (const st of u.stories ?? []) {
      put(from, `stories.${u.id}.${st.id}.title`, st.title, id, to);
      put(from, `stories.${u.id}.${st.id}.summary`, st.summary, id, to);
      let line = 0;
      let q = 0;
      st.steps.forEach((step, k) => {
        if (step.gloss) au.glosses[st.id] = { ...au.glosses[st.id], [k]: step.gloss };
        if (step.line) {
          put(to, `stories.${u.id}.${st.id}.lines.${line}`, step.line.target, id, to);
          put(from, `stories.${u.id}.${st.id}.lines.${line}`, step.line.base, id, to);
          line += 1;
        } else {
          put(from, `stories.${u.id}.${st.id}.questions.${q}.question`, step.question, id, to);
          put(step.optionsLang === 'target' ? to : from, `stories.${u.id}.${st.id}.questions.${q}.options`, step.options, id, to);
          q += 1;
        }
      });
    }
    for (const k of ['notes', 'tips', 'glosses']) if (!Object.keys(au[k]).length) delete au[k];

    // The skeleton: the first course writes it, the others must match it.
    const skeleton = {
      id: u.id,
      color: u.color,
      character: u.character,
      words: u.words.map((w) => w.id),
      sentences: u.sentences.map((s) => s.id),
      phrases: u.guidebook.phrases.length,
      skills: u.skills.map((sk) => ({
        id: sk.id,
        icon: sk.icon,
        lessons: sk.lessons.map((l) => ({
          id: l.id,
          newWords: l.newWords,
          ...(l.sentences?.length ? { sentences: l.sentences } : {}),
          ...(l.dialogues ? { dialogues: l.dialogues.map((d) => ({ speaker: d.speaker, answer: d.options.indexOf(d.answer) })) } : {}),
        })),
      })),
      ...(u.stories?.length
        ? {
            stories: u.stories.map((st) => ({
              id: st.id,
              unlockAfter: st.unlockAfter,
              cast: st.cast,
              steps: st.steps.map((s) => (s.line ? { speaker: s.line.speaker } : { answer: s.answer, ...(s.optionsLang ? { optionsLang: s.optionsLang } : {}) })),
            })),
          }
        : {}),
    };
    const have = curriculum.units[u.id];
    if (!have) curriculum.units[u.id] = skeleton;
    else {
      // lg-en leaves out words that repeat another's meaning; the composer
      // does the same by itself, so only the rest has to match.
      const lessonsOf = (x) => x.skills.map((sk) => ({ ...sk, lessons: sk.lessons.map((l) => ({ ...l, newWords: undefined, dialogues: l.dialogues?.map((d) => d.speaker) })) }));
      if (!same(lessonsOf(have), lessonsOf(skeleton))) structural.push(`${id} ${u.id}: skills or lessons differ from ${SOURCES[0]}`);
      if (have.color !== skeleton.color || have.character !== skeleton.character) structural.push(`${id} ${u.id}: color or character differ`);
      if (!same(have.sentences, skeleton.sentences)) structural.push(`${id} ${u.id}: sentence ids differ`);
      if (skeleton.words.some((w) => !have.words.includes(w))) structural.push(`${id} ${u.id}: has words ${SOURCES[0]} lacks`);
      if (!same(have.stories?.map((s) => [s.id, s.unlockAfter, s.cast, s.steps.map((x) => x.speaker ?? x.answer)]), skeleton.stories?.map((s) => [s.id, s.unlockAfter, s.cast, s.steps.map((x) => x.speaker ?? x.answer)]))) structural.push(`${id} ${u.id}: stories differ`);
    }
  }

  // Labels: the course's headings and landing copy in other languages.
  for (const [ui, l] of Object.entries(labels)) {
    const src = `${id}/labels/${ui}`;
    for (const [sid, s] of Object.entries(l.sections ?? {})) for (const [f, v] of Object.entries(s)) put(ui, `meta.sections.${sid}.${f}`, v, src, to);
    for (const [uid, u] of Object.entries(l.units ?? {})) for (const [f, v] of Object.entries(u)) put(ui, `meta.units.${uid}.${f}`, v, src, to);
    for (const [sk, v] of Object.entries(l.skills ?? {})) put(ui, `meta.skills.${sk}`, v, src, to);
    for (const [cid, v] of Object.entries(l.cast ?? {})) put(ui, `meta.cast.${cid}`, v, src, to);
    const ab2 = ((about[ui] ??= {})[to] ??= { meta: null, units: {}, fromLabels: src });
    if (!ab2.meta) {
      // Notes for the landing and about pages only: no unit notes.
      const translated = applyLabels({ meta, units: {} }, l).meta;
      ab2.meta = { description: l.description, landing: translated.landing };
    } else if (ab2.fromLabels === undefined) {
      const translated = applyLabels({ meta, units: {} }, l).meta;
      if (l.description && l.description !== ab2.meta.description) structural.push(`note: ${src} description differs from the ${ui}-${to} course's own (kept the course's)`);
      if (l.landing && !same(translated.landing, ab2.meta.landing)) structural.push(`note: ${src} landing differs from the ${ui}-${to} course's own (kept the course's)`);
    }
  }
}

// Resolve every slot: one value per language and key.
const conflicts = [];
const templated = new Set();
const lang = {};
for (const [code, keys] of Object.entries(slots)) {
  const values = (lang[code] = {});
  for (const [key, entries] of Object.entries(keys)) {
    const textOf = (e) => (typeof e.value === 'object' && e.value && 'text' in e.value ? e.value.text : e.value);
    const distinct = new Set(entries.map((e) => JSON.stringify(textOf(e))));
    let chosen = entries[0];
    if (key.startsWith('meta.cast.')) {
      // A role can depend on the course (Emma is learning the target
      // language): the first is the language's own, others go to the
      // course's notes.
      for (const e of entries) {
        if (e.value === chosen.value) continue;
        const ab = ((about[code] ??= {})[e.to] ??= { meta: {}, units: {} });
        (ab.meta.cast ??= {})[key.slice('meta.cast.'.length)] = e.value;
      }
      values[key] = { text: chosen.value, to: chosen.to };
      continue;
    }
    const hinted = typeof textOf(entries[0]) === 'string' && new Set(entries.map((e) => asTarget(textOf(e)))).size === 1;
    if (distinct.size > 1 && hinted) {
      // "Read (all of you)" as a meaning, "Read" as the answer: one text.
      chosen = entries.find((e) => textOf(e) !== asTarget(textOf(e)));
    } else if (distinct.size > 1) {
      const tmpl = entries.map((e) => (typeof textOf(e) === 'string' ? template(textOf(e), code, e.to) : null));
      if (tmpl.every((t) => t !== null && t === tmpl[0]) && tmpl[0] !== textOf(entries[0])) {
        templated.add(key);
      } else {
        const want = PREFER[`${code}:${key}`];
        chosen = entries.find((e) => e.src === want) ?? entries[0];
        conflicts.push({ code, key, kept: `${chosen.src}: ${JSON.stringify(textOf(chosen))}`, others: entries.filter((e) => e !== chosen && JSON.stringify(textOf(e)) !== JSON.stringify(textOf(chosen))).map((e) => `${e.src}: ${JSON.stringify(textOf(e))}`), settled: Boolean(want) });
      }
    }
    if (typeof chosen.value === 'object' && chosen.value && 'text' in chosen.value) {
      // Accepted answers: every course's.
      const alts = [...new Set(entries.flatMap((e) => (templated.has(key) ? e.value.alts.map((a) => template(a, code, e.to)) : e.value.alts)))];
      const text = templated.has(key) ? template(chosen.value.text, code, chosen.to) : chosen.value.text;
      values[key] = { text, alts: alts.filter((a) => a !== text), audio: chosen.value.audio, to: chosen.to };
    } else values[key] = { text: chosen.value, to: chosen.to };
  }
}

// Text that names the language being learned becomes `{to}` in every language.
const placeholders = (v, code, to) => (typeof v === 'string' ? template(v, code, to) : Array.isArray(v) ? v.map((x) => placeholders(x, code, to)) : v);
for (const [code, values] of Object.entries(lang)) {
  for (const key of templated) {
    const v = values[key];
    if (!v) continue;
    v.text = placeholders(v.text, code, v.to);
    if (v.alts) v.alts = placeholders(v.alts, code, v.to);
  }
}

// Build the files.
const set = (obj, path, value) => {
  const keys = path.split('.');
  keys.slice(0, -1).reduce((o, k) => (o[k] ??= {}), obj)[keys.at(-1)] = value;
};
const files = {};
const fileOf = (path, init) => (files[path] ??= init());
for (const [code, values] of Object.entries(lang)) {
  const meta = fileOf(`lang/${code}/course.json`, () => ({
    $schema: '../../../../docs/packs/schema/lang.schema.json',
    formatVersion: CATALOG_FORMAT,
    code,
    status: 'draft',
    notes: 'Drafted by Claude (AI): needs a native-speaker review. Split from the en-lg, sw-lg and lg-en courses by scripts/split-course.js (#185).',
    ...(COURSE_TITLES[code] ? { courseTitle: COURSE_TITLES[code] } : {}),
    languageNames: LANGUAGE_NAMES[code],
  }));
  const unitFile = (uid) => fileOf(`lang/${code}/units/${uid}.json`, () => ({ $schema: '../../../../../docs/packs/schema/lang-unit.schema.json', id: uid }));
  for (const [key, v] of Object.entries(values)) {
    const parts = key.split('.');
    if (parts[0] === 'meta') {
      set(meta, parts.slice(1).join('.'), v.text);
      continue;
    }
    if (parts[0] === 'words' || parts[0] === 'sentences') {
      const uid = Object.values(curriculum.units).find((u) => u[parts[0]].includes(parts.slice(1).join('.')))?.id;
      const item = { text: v.text };
      if (v.alts?.length) item.alts = v.alts;
      if (v.audio) item.audio = v.audio;
      set(unitFile(uid), `${parts[0]}`, { ...unitFile(uid)[parts[0]], [parts.slice(1).join('.')]: item });
      continue;
    }
    const [kind, uid, ...rest] = parts;
    const u = unitFile(uid);
    if (kind === 'phrases') (u.phrases ??= [])[Number(rest[0])] = v.text;
    else if (kind === 'dialogues') {
      const [lid, i, field] = rest;
      (((u.dialogues ??= {})[lid] ??= [])[Number(i)] ??= {})[field] = v.text;
    } else if (kind === 'stories') {
      const [sid, field, i, sub] = rest;
      const st = ((u.stories ??= {})[sid] ??= {});
      if (field === 'title' || field === 'summary') st[field] = v.text;
      else if (field === 'lines') (st.lines ??= [])[Number(i)] = v.text;
      else ((st.questions ??= [])[Number(i)] ??= {})[sub] = v.text;
    }
  }
}
// Arrays with holes (a language that has some of a list) get empty strings.
const fillHoles = (v) => (Array.isArray(v) ? Array.from(v, (x) => fillHoles(x ?? '')) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fillHoles(x)])) : v);

// Unit files list their content in curriculum order.
const unitOrder = Object.keys(curriculum.units).sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)));
const orderKeys = (obj, keys) => Object.fromEntries(keys.filter((k) => obj?.[k] !== undefined).map((k) => [k, obj[k]]));
for (const [path, f] of Object.entries(files)) {
  if (!path.includes('/units/')) {
    const allSkills = unitOrder.flatMap((uid) => curriculum.units[uid].skills.map((s) => s.id));
    if (f.units) f.units = orderKeys(f.units, unitOrder);
    if (f.skills) f.skills = orderKeys(f.skills, allSkills);
    continue;
  }
  const cu = curriculum.units[f.id];
  const ordered = { $schema: f.$schema, id: f.id };
  if (f.words) ordered.words = orderKeys(f.words, cu.words);
  if (f.sentences) ordered.sentences = orderKeys(f.sentences, cu.sentences);
  if (f.phrases) ordered.phrases = f.phrases;
  if (f.dialogues) ordered.dialogues = f.dialogues;
  if (f.stories) ordered.stories = orderKeys(f.stories, (cu.stories ?? []).map((s) => s.id));
  files[path] = fillHoles(ordered);
}

files['curriculum/course.json'] = { $schema: '../../../docs/packs/schema/curriculum.schema.json', ...curriculum.meta };
for (const uid of unitOrder) files[`curriculum/units/${uid}.json`] = { $schema: '../../../../docs/packs/schema/curriculum-unit.schema.json', ...curriculum.units[uid] };
for (const [code, byTo] of Object.entries(about)) {
  for (const [to, ab] of Object.entries(byTo)) {
    const dir = `lang/${code}/about/${to}`;
    files[`${dir}/course.json`] = { $schema: '../../../../../../docs/packs/schema/about.schema.json', ...Object.fromEntries(Object.entries(ab.meta).filter(([, v]) => v !== undefined)) };
    for (const [uid, u] of Object.entries(ab.units)) files[`${dir}/units/${uid}.json`] = { $schema: '../../../../../../../docs/packs/schema/about-unit.schema.json', id: uid, ...u };
  }
}

const settled = conflicts.filter((c) => c.settled);
const open = conflicts.filter((c) => !c.settled);
for (const s of structural) console.log(s);
console.log(`${Object.keys(files).length} files; ${templated.size} text(s) name the language learned ({to}); ${settled.length} disagreement(s) settled by hand, ${open.length} kept from the first course:`);
for (const c of conflicts) console.log(`- ${c.code} ${c.key}${c.settled ? ' (settled)' : ''}: kept ${c.kept}; dropped ${c.others.join('; ')}`);

if (write) {
  for (const [path, f] of Object.entries(files)) {
    const full = `${out}/${path}`;
    mkdirSync(full.slice(0, full.lastIndexOf('/')), { recursive: true });
    writeFileSync(full, `${formatJson(f)}\n`);
  }
  console.log(`Wrote ${Object.keys(files).length} files under ${out}.`);
}
