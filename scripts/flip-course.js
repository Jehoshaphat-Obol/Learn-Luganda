#!/usr/bin/env node
// Builds a unit of a reversed course (e.g. lg-en from en-lg) out of the
// source unit plus an overlay of hand-written text in the new base language.
//
//   node scripts/flip-course.js --from en-lg --to lg-en --overlay path/u9.json u9
//
// The mechanical part: target and base swap, altBase and altTarget swap,
// glosses and source notes go (they explain the old target language), and
// dialogue options are translated through the source course's own
// words and sentences. The overlay supplies everything that has to be
// written, and the script fails when something is missing:
//
// {
//   "drop": ["word-id"],                      // words whose new target repeats another word
//   "words": { "id": { "notes": "...", "altTarget": [...] } },  // merged over the flip
//   "tips": { "u9s2": "tip-id" },             // skill -> new guidebook tip (null removes)
//   "options": { "old option": "new option" },// dialogue options the lookup misses
//   "guidebook": { "intro", "tips", "culture" }, // phrases are flipped automatically
//   "replace": { "old text": "new text" },   // whole strings, anywhere in the unit
//   "stories": { "story-id": { "title", "summary", "questions": ["...", { "question", "options" }] } }
//   // a question without options keeps them in the new target language
// }
//
// Unit and skill titles come from the source course's labels in the new base
// language (courses/<from>/labels/<new base>.json).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i < 0 ? undefined : args.splice(i, 2)[1];
};
const from = opt('from');
const to = opt('to');
const overlayPath = opt('overlay');
const [unitId] = args;
if (!from || !to || !overlayPath || !unitId) {
  console.error('usage: flip-course.js --from en-lg --to lg-en --overlay file.json u9');
  process.exit(1);
}

// The same layout as the hand-made lg-en files: objects always break, lists
// of plain values stay on one line when they fit in 80 columns.
function pretty(v, ind = '', pre = 0) {
  if (v === null || typeof v !== 'object') return JSON.stringify(v);
  const inner = ind + '  ';
  if (Array.isArray(v)) {
    if (!v.length) return '[]';
    if (v.every((x) => x === null || typeof x !== 'object')) {
      const flat = `[${v.map((x) => JSON.stringify(x)).join(', ')}]`;
      if (ind.length + pre + flat.length + 1 <= 80) return flat;
    }
    return `[\n${v.map((x) => inner + pretty(x, inner)).join(',\n')}\n${ind}]`;
  }
  const entries = Object.entries(v);
  if (!entries.length) return '{}';
  const lines = entries.map(([k, x]) => `${inner}${JSON.stringify(k)}: ${pretty(x, inner, JSON.stringify(k).length + 2)}`);
  return `{\n${lines.join(',\n')}\n${ind}}`;
}

const root = 'src/packs/courses';
const read = (p) => JSON.parse(readFileSync(p, 'utf8'));
const src = read(join(root, from, 'units', `${unitId}.json`));
const overlay = read(overlayPath);
const newBase = to.split('-')[0];
const labels = read(join(root, from, 'labels', `${newBase}.json`));

const problems = [];
const need = (value, what) => {
  if (value === undefined || value === null || value === '') problems.push(`missing ${what}`);
  return value;
};

// Old target text -> old base text, over the whole source course.
const lookup = new Map();
for (const file of readdirSync(join(root, from, 'units'))) {
  const unit = read(join(root, from, 'units', file));
  for (const item of [...unit.words, ...unit.sentences]) {
    for (const t of [item.target, ...(item.altTarget || [])]) {
      if (!lookup.has(t)) lookup.set(t, item.base);
    }
  }
}
const translate = (text, what) => {
  const hit = overlay.options?.[text] ?? lookup.get(text);
  return need(hit, `${what} for “${text}”`);
};

const flipItem = (item) => {
  const out = { id: item.id, target: item.base, base: item.target };
  if (item.altBase?.length) out.altTarget = item.altBase;
  if (item.altTarget?.length) out.altBase = item.altTarget;
  return { ...out, ...(overlay.words?.[item.id] || {}) };
};

const drop = new Set(overlay.drop || []);
const words = src.words.filter((w) => !drop.has(w.id)).map(flipItem);
const sentences = src.sentences.map(flipItem);

const skills = src.skills.map((skill) => {
  const out = { id: skill.id, title: need(labels.skills[skill.id], `skill title ${skill.id}`), icon: skill.icon };
  const tip = overlay.tips && skill.id in overlay.tips ? overlay.tips[skill.id] : skill.tip;
  if (tip) out.tip = tip;
  out.lessons = skill.lessons.map((lesson) => {
    const l = { ...lesson, newWords: lesson.newWords.filter((id) => !drop.has(id)) };
    if (lesson.dialogues) {
      l.dialogues = lesson.dialogues.map((d) => ({
        speaker: d.speaker,
        target: d.base,
        base: d.target,
        options: d.options.map((o) => translate(o, `dialogue option in ${lesson.id}`)),
        answer: translate(d.answer, `dialogue answer in ${lesson.id}`)
      }));
    }
    return l;
  });
  return out;
});

const gb = need(overlay.guidebook, 'guidebook') || {};
const guidebook = {
  intro: need(gb.intro, 'guidebook intro'),
  phrases: src.guidebook.phrases.map((p) => ({ target: p.base, base: p.target })),
  tips: need(gb.tips, 'guidebook tips'),
  ...(gb.culture ? { culture: gb.culture } : {})
};
const tipIds = new Set((gb.tips || []).map((t) => t.id));
for (const s of skills) if (s.tip && !tipIds.has(s.tip)) problems.push(`skill ${s.id} points to unknown tip ${s.tip}`);

const stories = (src.stories || []).map((story) => {
  const o = overlay.stories?.[story.id] || {};
  const questions = [...(o.questions || [])];
  const steps = story.steps.map((step) => {
    if (step.line) {
      return { line: { speaker: step.line.speaker, target: step.line.base, base: step.line.target } };
    }
    let q = questions.shift() ?? {};
    if (typeof q === 'string') q = { question: q };
    const out = { question: need(q.question, `question in story ${story.id}`) };
    if (q.options) {
      // Options written in the new base language.
      out.options = q.options;
    } else {
      // Keep the options in the new target language (the old base, or the
      // old target options translated through the lookup).
      out.options =
        step.optionsLang === 'target'
          ? step.options.map((x) => translate(x, `story option in ${story.id}`))
          : step.options;
      out.optionsLang = 'target';
    }
    out.answer = step.answer;
    return out;
  });
  if (questions.length) problems.push(`story ${story.id} has ${questions.length} extra questions`);
  return {
    id: story.id,
    title: need(o.title, `story title ${story.id}`),
    unlockAfter: story.unlockAfter,
    cast: story.cast,
    summary: need(o.summary, `story summary ${story.id}`),
    steps
  };
});

const unit = {
  $schema: src.$schema,
  id: src.id,
  title: need(labels.units[src.id]?.title, 'unit title'),
  description: need(labels.units[src.id]?.description, 'unit description'),
  color: src.color,
  character: src.character,
  words,
  sentences,
  skills,
  guidebook,
  ...(stories.length ? { stories } : {})
};

const swap = overlay.replace || {};
const used = new Set();
const walk = (v) => {
  if (typeof v === 'string') {
    if (v in swap) {
      used.add(v);
      return swap[v];
    }
    return v;
  }
  if (Array.isArray(v)) return v.map(walk);
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
  return v;
};
Object.assign(unit, walk(unit));
for (const k of Object.keys(swap)) if (!used.has(k)) problems.push(`replace text not found: “${k}”`);

if (problems.length) {
  console.error(`${unitId}:\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
writeFileSync(join(root, to, 'units', `${unitId}.json`), pretty(unit) + '\n');
console.log(`wrote ${join(root, to, 'units', `${unitId}.json`)}`);
