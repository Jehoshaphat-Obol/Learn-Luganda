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
