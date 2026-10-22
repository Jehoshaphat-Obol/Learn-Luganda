/*
 * Small flags beside language names. Each language in the registry may name
 * a country (`flag`); its drawing lives in ./flags/ (copied from flag-icons
 * by `npm run flags`). Flags are decoration: the name next to one is always
 * the label, so a language without a flag simply shows none.
 */
import { languageInfo } from '../i18n/languages.js';

const files = import.meta.glob('./flags/*.svg', { query: '?url', import: 'default', eager: true });
const URLS = new Map(Object.entries(files).map(([path, url]) => [path.slice('./flags/'.length, -'.svg'.length), url]));

/** The flag image URL for a country code, or undefined. */
export const flagUrl = (country) => URLS.get(country);

/** A small decorative flag for language `code`, or '' when it has none. */
export function languageFlag(code) {
  const url = flagUrl(languageInfo(code).flag);
  return url ? `<img class="flag" src="${url}" alt="" width="20" height="15" decoding="async">` : '';
}
