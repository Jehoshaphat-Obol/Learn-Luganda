/* The language registry (src/packs/languages.json), frozen. */
import registry from '../packs/languages.json';
import { deepFreeze } from './freeze.js';

export const LANGUAGES = deepFreeze(registry.languages);

const byCode = new Map(LANGUAGES.map((l) => [l.code, l]));

/** Registry entry for a code, or a bare stand-in for an unlisted language. */
export function languageInfo(code) {
  return byCode.get(code) ?? Object.freeze({ code, name: code, nativeName: code, greeting: '', dir: 'ltr' });
}
