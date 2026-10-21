/*
 * Practice and checkpoint sessions built from a set of words rather than a
 * lesson: review due words, redo recent mistakes, practise one skill, or
 * test a whole unit. Sizes, the exercise mix and pass marks come from the
 * course pack's settings (`practice`, `checkpoint`, `sectionTest`).
 */
import { course as defaultCourse } from '../content/course.js';
import { createRng } from './random.js';
import { choiceExercise, matchExercise, tilePools, translateExercise, typeExercise, wordsInSentence, fillExercise } from './generate.js';

const PRACTICE_STEPS = {
  choice({ out, focus, choicePool, rng, exercises }) {
    focus.forEach((w, i) => out.push(choiceExercise(w, choicePool, rng, i % 2 ? 'toBase' : 'toTarget', exercises.choice)));
  },
  match({ out, focus, rng, lesson }) {
    if (focus.length >= lesson.match.minPairs) out.push(matchExercise(focus, rng, lesson.match));
  },
  translate({ out, sentences, pools, rng, practice, exercises }) {
    for (const [i, s] of rng.sample(sentences, practice.sentences).entries()) out.push(translateExercise(s, pools, rng, i % 2 ? 'toTarget' : 'toBase', exercises.translate));
  },
  fill({ out, sentences, known, rng, lesson }) {
    const from = rng.pick(sentences);
    const fill = from && fillExercise(from, known, rng, lesson.fill);
    if (fill) out.push(fill);
  },
  type({ out, sentences, focus, rng, lesson }) {
    if (sentences.length) out.push(typeExercise(rng.pick(sentences), lesson.type.direction));
    else out.push(typeExercise({ ...focus[0], wordIds: [focus[0].id] }, lesson.type.direction));
  },
};

/**
 * @param {string[]} wordIds words to practise, most important first
 * @param {{ course?: object, seed?: number, size?: number, knownIds?: string[] }} [options]
 *   `knownIds` are all words the learner has met (for distractors).
 */
export function buildPractice(wordIds, { course = defaultCourse, seed, size, knownIds = wordIds } = {}) {
  const { practice, lesson, exercises } = course.settings;
  const rng = createRng(seed ?? Date.now());
  const words = wordIds.map((id) => course.words[id]).filter(Boolean);
  if (!words.length) return [];
  const known = [...new Set([...knownIds, ...wordIds])].map((id) => course.words[id]).filter(Boolean);
  const lastUnit = course.units.findLast((u) => known.some((w) => w.unit === u.id))?.id ?? course.units[0].id;
  const pools = tilePools(course, known, lastUnit);
  const choicePool = known.length >= exercises.choice.options ? known : Object.values(course.words).filter((w) => w.unit === course.units[0].id);
  const focus = words.slice(0, practice.focusWords);
  const focusIds = new Set(focus.map((w) => w.id));
  const knownIdSet = new Set(known.map((w) => w.id));

  // Sentences that use the focus words and nothing the learner hasn't met.
  const sentences = Object.values(course.sentences)
    .map((s) => ({ ...s, wordIds: wordsInSentence(s, known) }))
    .filter((s) => s.wordIds.some((id) => focusIds.has(id)) && s.wordIds.every((id) => knownIdSet.has(id)));

  const out = [];
  const ctx = { out, focus, choicePool, known, sentences, pools, rng, practice, lesson, exercises };
  for (const step of practice.steps) PRACTICE_STEPS[step](ctx);

  // Interleave so the session doesn't run all choices first.
  return (practice.shuffle ? rng.shuffle(out) : out).slice(0, size ?? practice.size);
}

/**
 * A section test: to jump ahead to `sectionId`, show you know the sections
 * before it. Leans on the section just before, with some older words mixed in.
 */
export function buildSectionTest(sectionId, { course = defaultCourse, seed } = {}) {
  const section = course.sections.find((s) => s.id === sectionId);
  const before = course.sections.slice(0, section.index);
  const wordsOf = (sec) => sec.units.flatMap((u) => u.skills.flatMap((s) => s.lessons.flatMap((l) => l.newWords)));
  const rng = createRng(seed ?? Date.now());
  const last = wordsOf(before.at(-1));
  const older = before.slice(0, -1).flatMap(wordsOf);
  const focus = [...rng.sample(last, 6), ...rng.sample(older, 2)];
  const all = before.flatMap(wordsOf);
  return buildPractice(focus.length ? focus : rng.sample(all, 8), { course, seed: rng.int(1e9), size: course.settings.sectionTest.size, knownIds: all });
}

/** A unit checkpoint: words and sentences from the whole unit. */
export function buildCheckpoint(unitId, { course = defaultCourse, seed, knownIds } = {}) {
  const unit = course.units.find((u) => u.id === unitId);
  const unitWords = unit.skills.flatMap((s) => s.lessons.flatMap((l) => l.newWords));
  const rng = createRng(seed ?? Date.now());
  return buildPractice(rng.shuffle(unitWords), { course, seed: rng.int(1e9), size: unit.settings.checkpoint.size, knownIds: knownIds ?? unitWords });
}
