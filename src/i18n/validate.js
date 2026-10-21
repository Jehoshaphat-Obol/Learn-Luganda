/*
 * Checks a UI pack against the English one, beyond what the JSON Schema can
 * say: every key must exist in English, and each string must use the same
 * {placeholders}, so `t()` never prints a raw `{count}` or drops a value.
 * Keys a pack leaves out are allowed (they fall back to English) and are
 * reported separately as missing.
 *
 * List groups (read with `tList`, such as lesson praise) are the exception:
 * a pack may give them as many entries as it likes, under its own keys.
 */
import { flatten, isPlural, placeholders } from './format.js';

const same = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));

/** Groups whose entries are a free list (see `tList`). */
export const LIST_GROUPS = ['lesson.praise', 'reminders.review', 'reminders.learned', 'reminders.fresh'];
const listOf = (key) => LIST_GROUPS.find((g) => key.startsWith(`${g}.`));

/** @returns {{ errors: string[], missing: string[] }} */
export function validateUiPack(pack, english, { code, languages = [] } = {}) {
  const errors = [];
  const where = `ui/${code ?? pack.meta?.code}`;
  if (code && pack.meta?.code !== code) errors.push(`${where}: meta.code "${pack.meta?.code}" doesn't match the file name`);
  if (languages.length && !languages.some((l) => l.code === pack.meta?.code)) errors.push(`${where}: "${pack.meta?.code}" is not in languages.json`);

  const ours = flatten(pack.strings ?? {});
  const theirs = flatten(english.strings);
  for (const [key, value] of Object.entries(ours)) {
    const list = listOf(key);
    if (list) {
      // Any key, no plural forms, and only placeholders the English entries use.
      const allowed = new Set(Object.entries(theirs).filter(([k]) => listOf(k) === list).flatMap(([, v]) => [...placeholders(v)]));
      if (isPlural(value)) errors.push(`${where}: "${key}" is a list entry and can't have plural forms`);
      for (const p of placeholders(value)) if (!allowed.has(p)) errors.push(`${where}: "${key}" uses {${p}}, which ${list} entries don't have`);
      continue;
    }
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
  const hasList = (g) => Object.keys(ours).some((k) => listOf(k) === g);
  const missing = Object.keys(theirs).filter((k) => !(k in ours) && !(listOf(k) && hasList(listOf(k))));
  return { errors, missing };
}
