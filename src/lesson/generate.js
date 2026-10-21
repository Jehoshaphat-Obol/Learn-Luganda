/*
 * Turns a lesson's content (new words, sentences, dialogues) into a
 * sequence of exercises. Each exercise is plain data; the renderers in
 * ./exercises draw them. Distractors come from words the learner has met.
 *
 * The mix is set by the course pack (see src/content/settings.js): a lesson
 * runs its `steps` in order, each step adding exercises, then the list is
 * cut to `maxExercises`.
 */
import { course as defaultCourse, wordsUpTo } from '../content/course.js';
import { DEFAULT_SETTINGS } from '../content/settings.js';
import { tokens, normalise } from './answers.js';
import { createRng } from './random.js';

export const MAX_EXERCISES = DEFAULT_SETTINGS.lesson.maxExercises;
const EXERCISES = DEFAULT_SETTINGS.exercises;

/** The `i`th entry of a list, wrapping round: directions alternate this way. */
const cycle = (list, i) => list[i % list.length];

const quote = (t) => `“${t.replace(/[?.!]$/, '')}”`;

export function choiceExercise(word, pool, rng, direction, { options: count = EXERCISES.choice.options } = {}) {
  const others = rng.sample(pool.filter((w) => w.id !== word.id && normalise(w.target) !== normalise(word.target) && normalise(w.base) !== normalise(word.base)), count - 1);
  const toTarget = direction === 'toTarget';
  const options = rng.shuffle([word, ...others]).map((w) => ({ text: toTarget ? w.target : w.base, value: w.id }));
  return {
    type: 'choice',
    prompt: toTarget ? `Which one means ${quote(word.base)}?` : `What does ${quote(word.target)} mean?`,
    lang: toTarget ? 'target' : 'base',
    options,
    answer: word.id,
    answerText: toTarget ? word.target : word.base,
    wordIds: [word.id],
  };
}

export function translateExercise(item, pools, rng, direction, { minDistractors = EXERCISES.translate.minDistractors, maxDistractors = EXERCISES.translate.maxDistractors } = {}) {
  const toBase = direction === 'toBase';
  const answer = toBase ? item.base : item.target;
  const answerTokens = tokens(answer);
  const lower = new Set(answerTokens.map((t) => normalise(t)));
  const pool = (toBase ? pools.baseTokens : pools.targetTokens).filter((t) => !lower.has(normalise(t)));
  const distractors = rng.sample([...new Set(pool)], Math.min(maxDistractors, Math.max(minDistractors, 6 - answerTokens.length)));
  return {
    type: 'translate',
    prompt: 'Write this in ' + (toBase ? defaultCourse.names.from : defaultCourse.names.to),
    source: toBase ? item.target : item.base,
    sourceLang: toBase ? 'target' : 'base',
    lang: toBase ? 'base' : 'target',
    accepted: [answer, ...(toBase ? item.altBase : item.altTarget)],
    answerText: answer,
    bank: rng.shuffle([...answerTokens, ...distractors]),
    sentenceId: item.id,
    wordIds: item.wordIds ?? [],
    audio: item.audio ?? null,
  };
}

export function matchExercise(words, rng, { pairs = DEFAULT_SETTINGS.lesson.match.pairs } = {}) {
  // Pairs must be unambiguous: no two with the same target or base text.
  const seen = new Set();
  const chosen = rng
    .shuffle(words)
    .filter((w) => {
      const keys = [`t:${normalise(w.target)}`, `b:${normalise(w.base)}`];
      if (keys.some((k) => seen.has(k))) return false;
      keys.forEach((k) => seen.add(k));
      return true;
    })
    .slice(0, pairs);
  return {
    type: 'match',
    prompt: 'Tap the matching pairs',
    pairs: chosen.map((w) => ({ id: w.id, target: w.target, base: w.base })),
    left: rng.shuffle(chosen.map((w) => w.id)),
    right: rng.shuffle(chosen.map((w) => w.id)),
    wordIds: chosen.map((w) => w.id),
  };
}

/** A typed answer: target to base by default, or base to target. */
export function typeExercise(item, direction = 'toBase') {
  const toBase = direction === 'toBase';
  return {
    type: 'type',
    prompt: `Type this in ${toBase ? defaultCourse.names.from : defaultCourse.names.to}`,
    source: toBase ? item.target : item.base,
    sourceLang: toBase ? 'target' : 'base',
    lang: toBase ? 'base' : 'target',
    accepted: toBase ? [item.base, ...item.altBase] : [item.target, ...item.altTarget],
    answerText: toBase ? item.base : item.target,
    sentenceId: item.id,
    wordIds: item.wordIds ?? [],
    audio: item.audio ?? null,
  };
}

/** Blanks out one known word of a sentence and offers it among look-alikes. */
export function fillExercise(sentence, known, rng, { distractors = DEFAULT_SETTINGS.lesson.fill.distractors } = {}) {
  const parts = tokens(sentence.target);
  const candidates = known.filter((w) => !w.target.includes(' ') && parts.some((p) => normalise(p) === normalise(w.target)));
  if (!candidates.length) return null;
  const word = rng.pick(candidates);
  const regex = new RegExp(`(^|[\\s,])${word.target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=$|[\\s,.?!])`, 'i');
  const m = regex.exec(sentence.target);
  if (!m) return null;
  const answer = m[0].slice(m[1].length);
  const blanked = sentence.target.replace(regex, '$1___');
  // Match the case the word has in this sentence (capitalised at the start).
  const cased = (t) => (answer[0] === answer[0].toUpperCase() ? t[0].toUpperCase() + t.slice(1) : t[0].toLowerCase() + t.slice(1));
  const others = rng.sample(known.filter((w) => w.id !== word.id && !w.target.includes(' ') && normalise(w.target) !== normalise(word.target)), distractors);
  if (others.length < distractors) return null;
  return {
    type: 'fill',
    prompt: 'Fill in the blank',
    sentence: blanked,
    translation: sentence.base,
    full: sentence.target,
    options: rng.shuffle([answer, ...others.map((w) => cased(w.target))]),
    answer,
    lang: 'target',
    wordIds: [word.id],
  };
}

function dialogueExercise(d, rng) {
  return {
    type: 'dialogue',
    prompt: 'Choose the best reply',
    speaker: d.speaker,
    line: d.target,
    translation: d.base,
    options: rng.shuffle(d.options),
    answer: d.answer,
    lang: 'target',
    wordIds: [],
  };
}

function listenExercise(item, pools, rng) {
  const ex = translateExercise(item, pools, rng, 'toTarget');
  return { ...ex, type: 'listen', prompt: 'Tap what you hear', audio: item.audio };
}

/** Words that appear in a sentence, by matching their target-language text. */
export function wordsInSentence(sentence, words) {
  const n = ` ${normalise(sentence.target)} `;
  return words.filter((w) => n.includes(` ${normalise(w.target)} `)).map((w) => w.id);
}

/** Distractor tiles: tokens from known words and sentences up to `unitId`. */
export function tilePools(course, known, unitId) {
  const unitOrder = Object.fromEntries(course.units.map((u, i) => [u.id, i]));
  const sentences = Object.values(course.sentences).filter((s) => unitOrder[s.unit] <= unitOrder[unitId]);
  // Unique tokens, in first-seen order: exercises filter these per sentence.
  return {
    targetTokens: [...new Set([...known.flatMap((w) => tokens(w.target)), ...sentences.flatMap((s) => tokens(s.target))])],
    baseTokens: [...new Set([...known.flatMap((w) => tokens(w.base.toLowerCase())), ...sentences.flatMap((s) => tokens(s.base))])],
  };
}

/**
 * Lesson steps, in the order a course lists them. Each gets the lesson
 * context and its own settings, and pushes exercises onto `out`. A step
 * must use the random generator the same way whatever it adds, so a seed
 * always gives the same lesson.
 */
export const STEPS = {
  newWords({ out, newWords, choicePool, rng, firstTime, settings, exercises }, cfg) {
    newWords.forEach((w, i) => {
      if (firstTime && settings.introCards) out.push({ type: 'intro', word: w, wordIds: [w.id] });
      out.push(choiceExercise(w, choicePool, rng, cycle(cfg.directions, i), exercises.choice));
    });
  },
  match({ out, newWords, earlier, rng }, cfg) {
    const pool = newWords.length >= cfg.minPairs ? newWords : [...newWords, ...rng.sample(earlier, cfg.pairs - newWords.length)];
    if (pool.length >= cfg.minPairs) out.push(matchExercise(pool, rng, cfg));
  },
  sentences({ out, sentences, pools, rng, exercises }, cfg) {
    sentences.forEach((s, i) => out.push(translateExercise(s, pools, rng, cycle(cfg.directions, i), exercises.translate)));
  },
  fill({ out, sentences, known, rng }, cfg) {
    let added = 0;
    for (const s of rng.shuffle(sentences)) {
      if (added >= cfg.count) break;
      const fill = fillExercise(s, known, rng, cfg);
      if (fill) {
        out.push(fill);
        added += 1;
      }
    }
  },
  dialogues({ out, lesson, rng }) {
    for (const d of lesson.dialogues) out.push(dialogueExercise(d, rng));
  },
  type({ out, sentences, newWords, rng }, cfg) {
    for (let n = 0; n < cfg.count; n += 1) {
      if (sentences.length) out.push(typeExercise(rng.pick(sentences), cfg.direction));
      else if (newWords.length) {
        const w = rng.pick(newWords);
        out.push(typeExercise({ ...w, wordIds: [w.id] }, cfg.direction));
      }
    }
  },
  // Recorded audio becomes listening practice, and so can the device's
  // voice when the course allows it and the device has one.
  listen({ out, sentences, newWords, pools, rng, listening, speakable }, cfg) {
    if (!listening) return;
    const audible = (x) => x.audio || (cfg.synthesized && speakable);
    for (const item of [...sentences, ...newWords].filter(audible).slice(0, cfg.count)) out.push(listenExercise(item, pools, rng));
  },
  // Short lessons get each sentence the other way round...
  reverse({ out, sentences, pools, rng, exercises }, cfg) {
    for (const [i, s] of sentences.entries()) {
      if (out.length >= cfg.upTo) break;
      out.push(translateExercise(s, pools, rng, cycle(cfg.directions, i), exercises.translate));
    }
  },
  // ...then the new words again...
  newWordReview({ out, newWords, choicePool, rng, exercises }, cfg) {
    for (const w of rng.shuffle(newWords)) {
      if (out.length >= cfg.upTo) break;
      out.push(choiceExercise(w, choicePool, rng, cfg.direction, exercises.choice));
    }
  },
  // ...and a few words from earlier lessons.
  earlierReview({ out, earlier, choicePool, rng, settings, exercises }, cfg) {
    for (const w of rng.sample(earlier, cfg.count)) {
      if (out.length >= settings.maxExercises) break;
      out.push(choiceExercise(w, choicePool, rng, rng.next() < 0.5 ? 'toTarget' : 'toBase', exercises.choice));
    }
  },
};

/**
 * @param {string} lessonId
 * @param {{ course?: object, seed?: number, firstTime?: boolean, speakable?: boolean }} [options]
 *   `listening`: false when spoken audio is turned off (no listening exercises);
 *   `speakable`: the device can voice the target language (for `listen.synthesized`).
 */
export function buildLesson(lessonId, { course = defaultCourse, seed, firstTime = true, listening = true, speakable = false } = {}) {
  const lesson = course.lessons[lessonId];
  if (!lesson) throw new Error(`Unknown lesson: ${lessonId}`);
  const rng = createRng(seed ?? Date.now());
  const { lesson: settings, exercises } = lesson.settings;

  const known = wordsUpTo(lessonId, course).map((id) => course.words[id]);
  const newWords = lesson.newWords.map((id) => course.words[id]);
  const earlier = known.filter((w) => !lesson.newWords.includes(w.id));
  const sentences = lesson.sentences.map((id) => ({ ...course.sentences[id], wordIds: wordsInSentence(course.sentences[id], known) }));

  // Tile pools: tokens from everything the learner has seen so far.
  const pools = tilePools(course, known, lesson.unit);
  // Choice options need at least four words; borrow from the unit if the course is young.
  const choicePool = known.length >= exercises.choice.options ? known : Object.values(course.words).filter((w) => w.unit === lesson.unit);

  const out = [];
  const ctx = { out, lesson, course, rng, firstTime, settings, exercises, known, newWords, earlier, sentences, pools, choicePool, listening, speakable };
  for (const step of settings.steps) STEPS[step](ctx, settings[step] ?? {});
  return out.slice(0, settings.maxExercises);
}
