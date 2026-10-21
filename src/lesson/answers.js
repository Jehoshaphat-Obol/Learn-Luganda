/*
 * Answer checking. Learners shouldn't lose a heart over capitals,
 * punctuation, curly versus straight apostrophes or stray spaces.
 */

export function normalise(text) {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFC')
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
