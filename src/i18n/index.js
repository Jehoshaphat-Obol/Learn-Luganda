/*
 * The active UI language. Every interface string comes from a UI pack in
 * src/packs/ui/: English is bundled with the app and is the fallback for any
 * key another pack leaves out; other packs load on demand, so learners only
 * download the language they use.
 *
 *   t('nav.learn')                      -> "Learn"
 *   t('stats.streak', { count: 3 })     -> "3 day streak"
 *
 * The starting language comes from the browser's preferred languages
 * (`navigator.languages`). That needs no permission and no server. Location
 * lookup isn't used: on a static site it needs a third-party IP service, and
 * where someone is says little about what they read.
 */
import en from '../packs/ui/en.json';
import { deepFreeze } from './freeze.js';
import { detectLanguage, format, lookup } from './format.js';
import { languageInfo } from './languages.js';
import { rich } from './rich.js';

export const DEFAULT_LANGUAGE = 'en';

const ENGLISH = deepFreeze(en);
const loaders = import.meta.glob(['../packs/ui/*.json', '!../packs/ui/en.json'], { import: 'default' });
const codeOf = (path) => path.match(/([^/]+)\.json$/)[1];
const LOADERS = Object.fromEntries(Object.entries(loaders).map(([path, load]) => [codeOf(path), load]));

/** Codes of every UI pack the app ships, English first. */
export const UI_LANGUAGES = Object.freeze([DEFAULT_LANGUAGE, ...Object.keys(LOADERS).sort()]);

let active = ENGLISH;
const listeners = new Set();

/** Code of the language the interface is in now. */
export const currentLanguage = () => active.meta.code;

/** The best shipped UI language for this browser. */
export function detectUiLanguage(preferred = globalThis.navigator?.languages ?? [globalThis.navigator?.language].filter(Boolean)) {
  return detectLanguage(preferred, UI_LANGUAGES, DEFAULT_LANGUAGE);
}

/**
 * Switches the interface language, loading its pack if needed. Unknown codes,
 * and packs that fail to load, fall back to English.
 */
export async function setLanguage(code) {
  let pack = ENGLISH;
  if (code !== DEFAULT_LANGUAGE && LOADERS[code]) {
    try {
      pack = deepFreeze(await LOADERS[code]());
    } catch {
      pack = ENGLISH;
    }
  }
  const changed = pack !== active;
  active = pack;
  if (typeof document !== 'undefined') {
    document.documentElement.lang = active.meta.code;
    document.documentElement.dir = languageInfo(active.meta.code).dir;
  }
  if (changed) for (const fn of listeners) fn(active.meta.code);
  return active.meta.code;
}

/** Calls `fn(code)` after each language change; returns an unsubscribe. */
export function onLanguageChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * The interface string for `key`, filled with `params`. Missing keys fall
 * back to English, then to the key itself so a gap is visible, not blank.
 */
export function t(key, params) {
  const value = lookup(active.strings, key) ?? lookup(ENGLISH.strings, key);
  if (value === undefined) return key;
  return format(value, params, active.meta.code);
}

/**
 * Every string in the group `key` (an object of strings), filled with
 * `params`: for lists a pack may make as long as it likes, such as praise.
 * Falls back to English when the active pack has no such group.
 */
export function tList(key, params) {
  const group = (strings) => {
    let node = strings;
    for (const part of key.split('.')) node = node?.[part];
    return node && typeof node === 'object' ? Object.values(node).filter((v) => typeof v === 'string') : [];
  };
  const list = group(active.strings);
  return (list.length ? list : group(ENGLISH.strings)).map((v) => format(v, params, active.meta.code));
}

/** Like `t`, as safe HTML with the pack's **bold**, _italic_ and [links](#/path). */
export const tHtml = (key, params) => rich(t(key, params));

/** Uses `pack` as the interface language directly (tests: pseudo-locales). */
export function useUiPack(pack) {
  active = deepFreeze(pack);
}
