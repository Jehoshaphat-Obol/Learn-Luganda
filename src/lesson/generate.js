/*
 * Turns a lesson's content (new words, sentences, dialogues) into a
 * sequence of exercises. Each exercise is plain data; the renderers in
 * ./exercises draw them. Distractors come from words the learner has met.
 */
import { course as defaultCourse, wordsUpTo } from '../content/course.js';
import { tokens, normalise } from './answers.js';
import { createRng } from './random.js';

export const MAX_EXERCISES = 18;

const quote = (t) => `“${t.replace(/[?.!]$/, '')}”`;

export function choiceExercise(word, pool, rng, direction) {
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

export function translateExercise(item, pools, rng, direction) {
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

export function matchExercise(words, rng) {
  // Pairs must be unambiguous: no two with the same Luganda or English.
  const seen = new Set();
  const chosen = rng
    .shuffle(words)
    .filter((w) => {
      const keys = [`lg:${normalise(w.lg)}`, `en:${normalise(w.en)}`];
      if (keys.some((k) => seen.has(k))) return false;
      keys.forEach((k) => seen.add(k));
      return true;
    })
    .slice(0, 5);
  return {
    type: 'match',
    prompt: 'Tap the matching pairs',
    pairs: chosen.map((w) => ({ id: w.id, lg: w.lg, en: w.en })),
    left: rng.shuffle(chosen.map((w) => w.id)),
    right: rng.shuffle(chosen.map((w) => w.id)),
    wordIds: chosen.map((w) => w.id),
  };
}

export function typeExercise(item) {
  return {
    type: 'type',
    prompt: 'Type this in English',
    source: item.lg,
    sourceLang: 'lg',
    lang: 'en',
    accepted: [item.en, ...item.altEn],
    answerText: item.en,
    sentenceId: item.id,
    wordIds: item.wordIds ?? [],
  };
}

/** Blanks out one known word of a sentence and offers it among look-alikes. */
export function fillExercise(sentence, known, rng) {
  const parts = tokens(sentence.lg);
  const candidates = known.filter((w) => !w.lg.includes(' ') && parts.some((p) => normalise(p) === normalise(w.lg)));
  if (!candidates.length) return null;
  const word = rng.pick(candidates);
  const regex = new RegExp(`(^|[\\s,])${word.lg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=$|[\\s,.?!])`, 'i');
  const m = regex.exec(sentence.lg);
  if (!m) return null;
  const answer = m[0].slice(m[1].length);
  const blanked = sentence.lg.replace(regex, '$1___');
  // Match the case the word has in this sentence (capitalised at the start).
  const cased = (t) => (answer[0] === answer[0].toUpperCase() ? t[0].toUpperCase() + t.slice(1) : t[0].toLowerCase() + t.slice(1));
  const others = rng.sample(known.filter((w) => w.id !== word.id && !w.lg.includes(' ') && normalise(w.lg) !== normalise(word.lg)), 2);
  if (others.length < 2) return null;
  return {
    type: 'fill',
    prompt: 'Fill in the blank',
    sentence: blanked,
    translation: sentence.en,
    full: sentence.lg,
    options: rng.shuffle([answer, ...others.map((w) => cased(w.lg))]),
    answer,
    lang: 'lg',
    wordIds: [word.id],
  };
}

function dialogueExercise(d, rng) {
  return {
    type: 'dialogue',
    prompt: 'Choose the best reply',
    speaker: d.speaker,
    line: d.line,
    translation: d.translation,
    options: rng.shuffle(d.options),
    answer: d.answer,
    lang: 'lg',
    wordIds: [],
  };
}

function listenExercise(item, pools, rng) {
  const ex = translateExercise(item, pools, rng, 'toLg');
  return { ...ex, type: 'listen', prompt: 'Tap what you hear', audio: item.audio };
}

/** Words that appear in a sentence, by matching their Luganda text. */
export function wordsInSentence(sentence, words) {
  const n = ` ${normalise(sentence.lg)} `;
  return words.filter((w) => n.includes(` ${normalise(w.lg)} `)).map((w) => w.id);
}

/** Distractor tiles: tokens from known words and sentences up to `unitId`. */
export function tilePools(course, known, unitId) {
  const unitOrder = Object.fromEntries(course.units.map((u, i) => [u.id, i]));
  const sentences = Object.values(course.sentences).filter((s) => unitOrder[s.unit] <= unitOrder[unitId]);
  return {
    lgTokens: [...known.flatMap((w) => tokens(w.lg)), ...sentences.flatMap((s) => tokens(s.lg))],
    enTokens: [...known.flatMap((w) => tokens(w.en.toLowerCase())), ...sentences.flatMap((s) => tokens(s.en))],
  };
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
  const pools = tilePools(course, known, lesson.unit);
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

  // One fill-in-the-blank, the lesson's dialogues, then a typed answer.
  for (const s of rng.shuffle(sentences)) {
    const fill = fillExercise(s, known, rng);
    if (fill) {
      out.push(fill);
      break;
    }
  }
  for (const d of lesson.dialogues) out.push(dialogueExercise(d, rng));
  if (sentences.length) out.push(typeExercise(rng.pick(sentences)));
  else if (newWords.length) {
    const w = rng.pick(newWords);
    out.push(typeExercise({ ...w, wordIds: [w.id] }));
  }

  // Recorded audio becomes listening practice.
  for (const item of [...sentences, ...newWords].filter((x) => x.audio).slice(0, 2)) out.push(listenExercise(item, pools, rng));

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
