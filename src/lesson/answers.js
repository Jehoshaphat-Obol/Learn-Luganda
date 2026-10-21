/*
 * Answer checking. Learners shouldn't lose a heart over capitals,
 * punctuation, curly versus straight apostrophes or stray spaces. Each
 * course adds its own rules in `settings.answers`: letters that may be typed
 * another way (Luganda's ŋ as "ng"), whether tone marks and accents are
 * optional, and how many typos to forgive.
 */
import { course } from '../content/course.js';

// Lesson building normalises the same course text over and over, so remember
// results, per course since the rules differ.
const normalised = new Map();
let cachedFor = null;

const escapeRegex = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function rulesFor(c) {
  const { equivalents, ignoreDiacritics } = c.settings.answers;
  const keys = Object.keys(equivalents).map((k) => k.toLowerCase().normalize('NFC'));
  const pattern = keys.length ? new RegExp(keys.map(escapeRegex).join('|'), 'g') : null;
  const map = Object.fromEntries(Object.entries(equivalents).map(([k, v]) => [k.toLowerCase().normalize('NFC'), v.toLowerCase()]));
  return { pattern, map, ignoreDiacritics };
}

export function normalise(text) {
  if (cachedFor?.course !== course) {
    normalised.clear();
    cachedFor = { course, rules: rulesFor(course) };
  }
  const key = String(text ?? '');
  let out = normalised.get(key);
  if (out === undefined) {
    if (normalised.size > 20_000) normalised.clear();
    out = normaliseUncached(key, cachedFor.rules);
    normalised.set(key, out);
  }
  return out;
}

function normaliseUncached(text, { pattern, map, ignoreDiacritics }) {
  let out = text.toLowerCase().normalize('NFC');
  if (pattern) out = out.replace(pattern, (m) => map[m]);
  // Strip combining marks (tones, accents) when the course makes them optional.
  if (ignoreDiacritics) out = out.normalize('NFD').replace(/\p{M}/gu, '').normalize('NFC');
  return out
    .replace(/[’‘`´]/g, "'")
    .replace(/[.,!?¿¡;:"“”()–—-]/g, ' ')
    // An apostrophe only counts inside a word (n'omukazi); drop quote marks around words.
    .replace(/(^|\s)'+|'+(\s|$)/g, '$1$2')
    .replace(/\s+/g, ' ')
    .trim();
}

/** True when `input` matches any accepted answer after normalising. */
export function isAccepted(input, accepted) {
  const n = normalise(input);
  return n.length > 0 && accepted.some((a) => normalise(a) === n);
}

/** Splits an answer into word tiles, dropping sentence punctuation. */
export function tokens(text) {
  return String(text)
    .split(/\s+/)
    .map((t) => t.replace(/^[.,!?¿¡;:"“”()'’‘]+|[.,!?¿¡;:"“”()'’‘]+$/g, ''))
    .filter(Boolean);
}

/** Edit distance between two strings (insert, delete, substitute). */
export function levenshtein(a, b) {
  if (a === b) return 0;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const cur = [i];
    for (let j = 1; j <= b.length; j += 1) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
}

/**
 * Checks a typed answer. A near miss (one slip per `lettersPerTypo`
 * letters, ten by default, and at least one) counts as correct but is flagged as a typo so the learner sees the
 * right spelling.
 * @returns {{ correct: boolean, typo: boolean, closest: string }}
 */
export function checkTyped(input, accepted) {
  const n = normalise(input);
  if (!n) return { correct: false, typo: false, closest: accepted[0] };
  let best = { distance: Infinity, answer: accepted[0] };
  for (const a of accepted) {
    const d = levenshtein(n, normalise(a));
    if (d === 0) return { correct: true, typo: false, closest: a };
    if (d < best.distance) best = { distance: d, answer: a };
  }
  const allowed = Math.max(1, Math.floor(normalise(best.answer).length / course.settings.answers.lettersPerTypo));
  const typo = best.distance <= allowed;
  return { correct: typo, typo, closest: best.answer };
}
