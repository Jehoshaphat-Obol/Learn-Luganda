/*
 * Checks a UI pack against the English one, beyond what the JSON Schema can
 * say: every key must exist in English, and each string must use the same
 * {placeholders}, so `t()` never prints a raw `{count}` or drops a value.
 * Keys a pack leaves out are allowed (they fall back to English) and are
 * reported separately as missing.
 */
import { flatten, isPlural, placeholders } from './format.js';

const same = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));

/** @returns {{ errors: string[], missing: string[] }} */
export function validateUiPack(pack, english, { code, languages = [] } = {}) {
  const errors = [];
  const where = `ui/${code ?? pack.meta?.code}`;
  if (code && pack.meta?.code !== code) errors.push(`${where}: meta.code "${pack.meta?.code}" doesn't match the file name`);
  if (languages.length && !languages.some((l) => l.code === pack.meta?.code)) errors.push(`${where}: "${pack.meta?.code}" is not in languages.json`);

  const ours = flatten(pack.strings ?? {});
  const theirs = flatten(english.strings);
  for (const [key, value] of Object.entries(ours)) {
    const base = theirs[key];
    if (base === undefined) {
      errors.push(`${where}: "${key}" is not an English key`);
      continue;
    }
    if (isPlural(base) !== isPlural(value)) errors.push(`${where}: "${key}" must ${isPlural(base) ? '' : 'not '}have plural forms, like English`);
    const want = placeholders(base);
    const got = placeholders(value);
    if (!same(want, got)) errors.push(`${where}: "${key}" uses {${[...got].join('}, {')}} but English uses {${[...want].join('}, {')}}`);
  }
  const missing = Object.keys(theirs).filter((k) => !(k in ours));
  return { errors, missing };
}
