/*
 * Turns a lesson's content (new words, sentences, dialogues) into a
 * sequence of exercises. Each exercise is plain data; the renderers in
 * ./exercises draw them. Distractors come from words the learner has met.
 */
import { course as defaultCourse, wordsUpTo } from '../content/course.js';
import { tokens, normalise } from './answers.js';
import { createRng } from './random.js';

export const MAX_EXERCISES = 16;

const quote = (t) => `“${t.replace(/[?.!]$/, '')}”`;

function choiceExercise(word, pool, rng, direction) {
  const others = rng.sample(pool.filter((w) => w.id !== word.id && normalise(w.lg) !== normalise(word.lg) && normalise(w.en) !== normalise(word.en)), 3);
  const toLg = direction === 'toLg';
  const options = rng.shuffle([word, ...others]).map((w) => ({ text: toLg ? w.lg : w.en, value: w.id }));
  return {
    type: 'choice',
    prompt: toLg ? `Which one means ${quote(word.en)}?` : `What does ${quote(word.lg)} mean?`,
    lang: toLg ? 'lg' : 'en',
    options,
    answer: word.id,
    answerText: toLg ? word.lg : word.en,
    wordIds: [word.id],
  };
}

function translateExercise(item, pools, rng, direction) {
  const toEn = direction === 'toEn';
  const answer = toEn ? item.en : item.lg;
  const answerTokens = tokens(answer);
  const lower = new Set(answerTokens.map((t) => normalise(t)));
  const pool = (toEn ? pools.enTokens : pools.lgTokens).filter((t) => !lower.has(normalise(t)));
  const distractors = rng.sample([...new Set(pool)], Math.min(4, Math.max(2, 6 - answerTokens.length)));
  return {
    type: 'translate',
    prompt: 'Write this in ' + (toEn ? 'English' : 'Luganda'),
    source: toEn ? item.lg : item.en,
    sourceLang: toEn ? 'lg' : 'en',
    lang: toEn ? 'en' : 'lg',
    accepted: [answer, ...(toEn ? item.altEn : item.altLg)],
    answerText: answer,
    bank: rng.shuffle([...answerTokens, ...distractors]),
    sentenceId: item.id,
    wordIds: item.wordIds ?? [],
  };
}

function matchExercise(words, rng) {
  const chosen = rng.sample(words, Math.min(5, words.length));
  return {
    type: 'match',
    prompt: 'Tap the matching pairs',
    pairs: chosen.map((w) => ({ id: w.id, lg: w.lg, en: w.en })),
    left: rng.shuffle(chosen.map((w) => w.id)),
    right: rng.shuffle(chosen.map((w) => w.id)),
    wordIds: chosen.map((w) => w.id),
  };
}

/** Words that appear in a sentence, by matching their Luganda text. */
function wordsInSentence(sentence, words) {
  const n = ` ${normalise(sentence.lg)} `;
  return words.filter((w) => n.includes(` ${normalise(w.lg)} `)).map((w) => w.id);
}

/**
 * @param {string} lessonId
 * @param {{ course?: object, seed?: number, firstTime?: boolean, extras?: Function[] }} [options]
 *   `extras` are later generators (e.g. dialogues) called with the same context.
 */
export function buildLesson(lessonId, { course = defaultCourse, seed, firstTime = true, extras = [] } = {}) {
  const lesson = course.lessons[lessonId];
  if (!lesson) throw new Error(`Unknown lesson: ${lessonId}`);
  const rng = createRng(seed ?? Date.now());

  const known = wordsUpTo(lessonId, course).map((id) => course.words[id]);
  const newWords = lesson.newWords.map((id) => course.words[id]);
  const earlier = known.filter((w) => !lesson.newWords.includes(w.id));
  const sentences = lesson.sentences.map((id) => ({ ...course.sentences[id], wordIds: wordsInSentence(course.sentences[id], known) }));

  // Tile pools: tokens from everything the learner has seen so far.
  const unitOrder = Object.fromEntries(course.units.map((u, i) => [u.id, i]));
  const knownSentences = Object.values(course.sentences).filter((s) => unitOrder[s.unit] <= unitOrder[lesson.unit]);
  const pools = {
    lgTokens: [...known.flatMap((w) => tokens(w.lg)), ...knownSentences.flatMap((s) => tokens(s.lg))],
    enTokens: [...known.flatMap((w) => tokens(w.en.toLowerCase())), ...knownSentences.flatMap((s) => tokens(s.en))],
  };
  // Choice options need at least four words; borrow from the unit if the course is young.
  const choicePool = known.length >= 4 ? known : Object.values(course.words).filter((w) => w.unit === lesson.unit);

  const out = [];
  newWords.forEach((w, i) => {
    if (firstTime) out.push({ type: 'intro', word: w, wordIds: [w.id] });
    out.push(choiceExercise(w, choicePool, rng, i % 2 ? 'toEn' : 'toLg'));
  });

  const matchPool = newWords.length >= 3 ? newWords : [...newWords, ...rng.sample(earlier, 5 - newWords.length)];
  if (matchPool.length >= 3) out.push(matchExercise(matchPool, rng));

  sentences.forEach((s, i) => out.push(translateExercise(s, pools, rng, i % 2 ? 'toLg' : 'toEn')));

  for (const extra of extras) out.push(...extra({ lesson, course, rng, known, newWords, sentences, pools }));

  // Short lessons get the reverse direction of each sentence, then review words.
  for (const [i, s] of sentences.entries()) {
    if (out.length >= 12) break;
    out.push(translateExercise(s, pools, rng, i % 2 ? 'toEn' : 'toLg'));
  }
  for (const w of rng.shuffle(newWords)) {
    if (out.length >= 10) break;
    out.push(choiceExercise(w, choicePool, rng, 'toEn'));
  }
  for (const w of rng.sample(earlier, 2)) {
    if (out.length >= MAX_EXERCISES) break;
    out.push(choiceExercise(w, choicePool, rng, rng.next() < 0.5 ? 'toLg' : 'toEn'));
  }

  return out.slice(0, MAX_EXERCISES);
}
