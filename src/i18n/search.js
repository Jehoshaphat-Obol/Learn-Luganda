/*
 * Finding a language by typing: matches its English name, its own name,
 * its name in the interface language and its code, ignoring case, accents
 * and apostrophes (so "kiswa", "swahili" and "sw" all find Kiswahili, and
 * "francais" finds Français).
 */
import { languageInfo } from './languages.js';

/** Lowercase, accents and apostrophes gone, spaces collapsed. */
export function foldText(text) {
  return String(text)
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[’'ʼ`]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** Everything a learner might type to find language `code`, folded. */
export function languageSearchText(code, label = '') {
  const { name, nativeName } = languageInfo(code);
  return foldText([code, name, nativeName, label].join(' '));
}

/** Whether every word of `query` appears in `text` (from languageSearchText). */
export function matchesSearch(text, query) {
  return foldText(query)
    .split(' ')
    .every((word) => text.includes(word));
}

/**
 * The one language a search clearly points at, or null: an exact name or
 * code wins, otherwise the only language with a name starting with it.
 * `labelOf(code)` gives its name in the interface language.
 */
export function searchedLanguage(query, languages, labelOf = () => '') {
  const q = foldText(query);
  if (q.length < 2) return null;
  const names = (l) => [l.code, l.name, l.nativeName, labelOf(l.code)].map(foldText);
  const exact = languages.find((l) => names(l).includes(q));
  if (exact) return exact.code;
  const starts = languages.filter((l) => names(l).some((n) => n.split(' ').some((w) => w.startsWith(q)) || n.startsWith(q)));
  return starts.length === 1 ? starts[0].code : null;
}
