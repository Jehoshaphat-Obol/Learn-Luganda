/*
 * How a course teaches: the exercise mix of a lesson, practice and test
 * sizes, pass marks, how answers are compared, how stories show
 * translations. Every value here is a default; a course pack overrides any
 * of them in `course.json` → `settings`, a unit in its own `settings`, and a
 * single lesson in its `settings`. Objects merge key by key; arrays and
 * plain values replace.
 *
 * A lesson is built by running its `steps` in order (see
 * src/lesson/generate.js for what each step does), then trimmed to
 * `maxExercises`. The default recipe is the one the Luganda course was
 * written for.
 */
import { deepFreeze } from '../i18n/freeze.js';

export const LESSON_STEPS = Object.freeze(['newWords', 'match', 'sentences', 'fill', 'dialogues', 'type', 'listen', 'reverse', 'newWordReview', 'earlierReview']);
export const PRACTICE_STEPS = Object.freeze(['choice', 'match', 'translate', 'fill', 'type']);

export const DEFAULT_SETTINGS = deepFreeze({
  lesson: {
    steps: ['newWords', 'match', 'sentences', 'fill', 'dialogues', 'type', 'listen', 'reverse', 'newWordReview', 'earlierReview'],
    maxExercises: 18,
    // Wrong answers cost a heart.
    hearts: true,
    // A new-word card before each word is first tested.
    introCards: true,
    // Directions cycle through these lists, one exercise at a time.
    newWords: { directions: ['toTarget', 'toBase'] },
    match: { pairs: 5, minPairs: 3 },
    sentences: { directions: ['toBase', 'toTarget'] },
    fill: { count: 1, distractors: 2 },
    type: { count: 1, direction: 'toBase' },
    listen: { count: 2 },
    // Padding for short lessons: reverse sentences up to `upTo` exercises,
    // then new words again, then a few earlier words.
    reverse: { upTo: 12, directions: ['toTarget', 'toBase'] },
    newWordReview: { upTo: 10, direction: 'toBase' },
    earlierReview: { count: 2 },
  },
  exercises: {
    choice: { options: 4 },
    translate: { minDistractors: 2, maxDistractors: 4 },
  },
  practice: {
    steps: ['choice', 'match', 'translate', 'fill', 'type'],
    size: 12,
    focusWords: 8,
    sentences: 4,
    shuffle: true,
  },
  checkpoint: { size: 15, hearts: true },
  sectionTest: { size: 15, passMark: 0.8, hearts: false },
  answers: {
    // Letters learners may type another way, e.g. { "ŋ": "ng" }.
    equivalents: {},
    // When true, tone marks and accents are optional in typed answers.
    ignoreDiacritics: false,
    // One slip allowed per this many letters (always at least one).
    lettersPerTypo: 10,
  },
  stories: {
    // 'tap': translations show when a line is tapped; 'always': under each line.
    translations: 'tap',
  },
});

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

/** Merges setting layers left to right: objects deeply, everything else replaced. */
export function mergeSettings(...layers) {
  const out = {};
  for (const layer of layers) {
    if (!isObject(layer)) continue;
    for (const [k, v] of Object.entries(layer)) out[k] = isObject(v) && isObject(out[k]) ? mergeSettings(out[k], v) : v;
  }
  return out;
}
