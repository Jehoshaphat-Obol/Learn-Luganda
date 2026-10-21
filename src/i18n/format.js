/*
 * String lookup and formatting for packs. Pure functions with no browser or
 * bundler dependencies, so the validator script can use them too.
 *
 * A pack string is either plain text or a set of plural forms:
 *   "greeting": "Hello, {name}!"
 *   "days": { "one": "{count} day", "other": "{count} days" }
 * Plural forms are picked with `Intl.PluralRules` from `params.count`, using
 * the categories the language has (zero, one, two, few, many, other);
 * `other` is required and used whenever a category is missing. Numbers in
 * `params` are formatted for the locale.
 */

const PLACEHOLDER = /\{(\w+)\}/g;
export const PLURAL_CATEGORIES = ['zero', 'one', 'two', 'few', 'many', 'other'];

export const isPlural = (v) => v !== null && typeof v === 'object' && !Array.isArray(v) && typeof v.other === 'string';

/** Reads `a.b.c` from nested `strings`; undefined when any part is missing. */
export function lookup(strings, key) {
  let node = strings;
  for (const part of key.split('.')) {
    if (node === null || typeof node !== 'object') return undefined;
    node = node[part];
  }
  return typeof node === 'string' || isPlural(node) ? node : undefined;
}

function pluralRules(locale) {
  try {
    return new Intl.PluralRules(locale);
  } catch {
    return new Intl.PluralRules('en');
  }
}

function numberFormat(locale) {
  try {
    return new Intl.NumberFormat(locale);
  } catch {
    return new Intl.NumberFormat('en');
  }
}

/** Fills `{name}` placeholders and picks the plural form for `params.count`. */
export function format(value, params = {}, locale = 'en') {
  let text = value;
  if (isPlural(value)) {
    const count = Number(params.count ?? 0);
    const category = count === 0 && value.zero ? 'zero' : pluralRules(locale).select(count);
    text = value[category] ?? value.other;
  }
  const nf = numberFormat(locale);
  return text.replace(PLACEHOLDER, (whole, name) => {
    if (!(name in params)) return whole;
    const v = params[name];
    return typeof v === 'number' ? nf.format(v) : String(v);
  });
}

/** The placeholder names a string (or every form of a plural) uses. */
export function placeholders(value) {
  const forms = isPlural(value) ? Object.values(value) : [value];
  const names = new Set();
  for (const form of forms) for (const m of String(form).matchAll(PLACEHOLDER)) names.add(m[1]);
  return names;
}

/** Every dotted key in a nested strings object, with its value. */
export function flatten(strings, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(strings)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string' || isPlural(v)) out[key] = v;
    else if (v && typeof v === 'object') Object.assign(out, flatten(v, key));
  }
  return out;
}

/**
 * Picks the best UI language for a browser's preferred list: an exact match
 * first (`pt-br`), then the primary subtag (`sw-KE` -> `sw`), else `fallback`.
 */
export function detectLanguage(preferred, available, fallback = 'en') {
  const have = new Map(available.map((c) => [c.toLowerCase(), c]));
  for (const tag of preferred ?? []) {
    const lower = String(tag).toLowerCase();
    if (have.has(lower)) return have.get(lower);
    const primary = lower.split('-')[0];
    if (have.has(primary)) return have.get(primary);
  }
  return fallback;
}
