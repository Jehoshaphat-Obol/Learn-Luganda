/*
 * Answer checking. Learners shouldn't lose a heart over capitals,
 * punctuation, curly versus straight apostrophes or stray spaces.
 */

export function normalise(text) {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFC')
    // ŋ is often typed as "ng" on keyboards without it.
    .replace(/ŋ/g, 'ng')
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
 * Checks a typed answer. A near miss (one slip per ten letters, at least
 * one) counts as correct but is flagged as a typo so the learner sees the
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
  const allowed = Math.max(1, Math.floor(normalise(best.answer).length / 10));
  const typo = best.distance <= allowed;
  return { correct: typo, typo, closest: best.answer };
}
