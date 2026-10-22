/*
 * What can be learned from what, and a friendly first guess. A course id is
 * `<from>-<to>`, so the list of course folders is enough to know every pair
 * without downloading any pack.
 *
 * The guess combines the device's time zone (mapped to a country, then to
 * the languages commonly used there, via src/packs/regions.json) with the
 * browser's preferred languages. No permission prompt and no server: it's
 * a hint for the get-started screen, which always lets the learner say no.
 */

/** `{ id, from, to }` for each course id. */
export const pairsOf = (ids) => ids.map((id) => ({ id, from: id.split('-')[0], to: id.split('-').slice(1).join('-') }));

/** Whether a language can be learned here, and whether courses are taught from it. */
export function languageRoles(code, pairs) {
  return { canLearn: pairs.some((p) => p.to === code), canSpeak: pairs.some((p) => p.from === code) };
}

/** The device's time zone, if the browser shares it. */
export function deviceTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;
  } catch {
    return null;
  }
}

/**
 * Languages likely for this learner, most likely first: browser languages
 * that are spoken in the region (an English browser in Uganda points to
 * English), then the region's other languages, then the browser's.
 */
export function likelyLanguages({ timeZone, preferred = [], regions }) {
  const country = regions.timeZones[timeZone] ?? null;
  const fromRegion = country ? (regions.countries[country] ?? []) : [];
  const fromBrowser = preferred.map((tag) => String(tag).toLowerCase().split('-')[0]);
  const spokenHere = fromBrowser.filter((code) => fromRegion.includes(code));
  return { country, languages: [...new Set([...spokenHere, ...fromRegion, ...fromBrowser])] };
}

/**
 * The first likely language that has a course on either side, with what the
 * learner could do with it; null when nothing matches.
 */
export function suggestLanguage({ timeZone, preferred, regions, pairs }) {
  const { country, languages } = likelyLanguages({ timeZone, preferred, regions });
  for (const code of languages) {
    const roles = languageRoles(code, pairs);
    if (roles.canLearn || roles.canSpeak) return { code, country, ...roles };
  }
  return null;
}

/** Languages courses are taught from, and the courses for one base or one target. */
export const baseLanguages = (pairs) => [...new Set(pairs.map((p) => p.from))];
export const targetLanguages = (pairs) => [...new Set(pairs.map((p) => p.to))];
export const coursesFrom = (base, pairs) => pairs.filter((p) => p.from === base);
export const coursesTo = (target, pairs) => pairs.filter((p) => p.to === target);
