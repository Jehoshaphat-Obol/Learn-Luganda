/*
 * Course labels in the interface language. A course pack is written in the
 * language it's taught in, so a learner who reads the app in another
 * language would see the path half in one language and half in the other.
 * An optional labels file per interface language translates the path's
 * headings:
 *
 *   src/packs/courses/<course>/labels/<ui>.json
 *   {
 *     "sections": { "s1": { "title": "…", "level": "…", "description": "…" } },
 *     "units": { "u1": { "title": "…", "description": "…" } },
 *     "skills": { "u1s1": "…" },
 *     "description": "…",
 *     "cast": { "nakato": "…" },
 *     "landing": { "why": { "title": "…", "text": "…", "cards": [{ "title": "…", "text": "…" }] }, … }
 *   }
 *
 * `description`, `cast` (roles) and `landing` put the landing, onboarding
 * and About pages in the interface language too. `landing` covers only the
 * base-language parts of the pack's `landing` block (LANDING_TEXT); its
 * target-language words (hello, the sample's options, the start word) stay.
 * `landing.words` lists one meaning per ticker word, in the pack's order.
 *
 * Every entry is optional: anything left out keeps the pack's own text.
 * Lesson content (exercises, guidebooks, stories) is not covered.
 */

const SECTION_FIELDS = ['title', 'level', 'description'];
const UNIT_FIELDS = ['title', 'description'];

/** Base-language text in a course's `landing` block, as paths into it. */
export const LANDING_TEXT = ['word', 'why.title', 'why.text', 'sample.prompt', 'sample.explain', 'start.caption', 'farewell', 'audience', 'first'];

const pick = (own, fields) => Object.fromEntries(fields.filter((f) => typeof own?.[f] === 'string' && own[f]).map((f) => [f, own[f]]));

/** `{ meta, units }` with the headings in `labels` laid over the pack's own. */
export function applyLabels(pack, labels) {
  if (!labels) return pack;
  const { sections = {}, units = {}, skills = {}, cast = {} } = labels;
  const meta = { ...pack.meta, sections: pack.meta.sections.map((s) => ({ ...s, ...pick(sections[s.id], SECTION_FIELDS) })) };
  if (isText(labels.description)) meta.description = labels.description;
  if (pack.meta.cast) {
    meta.cast = Object.fromEntries(Object.entries(pack.meta.cast).map(([id, c]) => [id, isText(cast[id]) ? { ...c, role: cast[id] } : c]));
  }
  if (pack.meta.landing && labels.landing) meta.landing = applyLanding(pack.meta.landing, labels.landing);
  const out = {};
  for (const [id, u] of Object.entries(pack.units)) {
    out[id] = {
      ...u,
      ...pick(units[id], UNIT_FIELDS),
      skills: u.skills.map((sk) => (typeof skills[sk.id] === 'string' && skills[sk.id] ? { ...sk, title: skills[sk.id] } : sk)),
    };
  }
  return { meta, units: out };
}

const isText = (x) => typeof x === 'string' && x !== '';
const get = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj);

/** The pack's landing copy with the base-language text from `own` laid over it. */
function applyLanding(landing, own) {
  const out = structuredClone(landing);
  for (const path of LANDING_TEXT) {
    const value = get(own, path);
    if (!isText(value) || get(landing, path) === undefined) continue;
    const keys = path.split('.');
    keys.slice(0, -1).reduce((o, k) => o[k], out)[keys.at(-1)] = value;
  }
  if (Array.isArray(out.words)) out.words = out.words.map(([word, meaning], i) => [word, isText(own.words?.[i]) ? own.words[i] : meaning]);
  if (Array.isArray(out.why?.cards)) out.why.cards = out.why.cards.map((c, i) => ({ ...c, ...pick(own.why?.cards?.[i], ['title', 'text']) }));
  return out;
}

/**
 * Paths of the landing, cast and description text `labels` leaves in the
 * pack's language. A reader of the target language needs no meanings for the
 * ticker's words: they would only repeat the words.
 */
function missingCopy(labels, meta, ui) {
  const missing = [];
  if (meta.description && !isText(labels.description)) missing.push('description');
  for (const [id, c] of Object.entries(meta.cast ?? {})) if (c.role && !isText(labels.cast?.[id])) missing.push(`cast.${id}`);
  const landing = meta.landing;
  if (!landing) return missing;
  const own = labels.landing ?? {};
  for (const path of LANDING_TEXT) if (isText(get(landing, path)) && !isText(get(own, path))) missing.push(`landing.${path}`);
  if (ui !== meta.to) (landing.words ?? []).forEach((_, i) => isText(own.words?.[i]) || missing.push(`landing.words.${i}`));
  (landing.why?.cards ?? []).forEach((c, i) => {
    for (const f of ['title', 'text']) if (c[f] && !isText(own.why?.cards?.[i]?.[f])) missing.push(`landing.why.cards.${i}.${f}`);
  });
  return missing;
}

/**
 * Checks a labels file against its course pack: `errors` for ids the course
 * doesn't have, `missing` for text that falls back to the pack's own. `ui`
 * is the interface language the labels are for.
 */
export function checkLabels(labels, pack, ui) {
  const errors = [];
  const missing = [];
  const sectionIds = new Set(pack.meta.sections.map((s) => s.id));
  const skillIds = new Set(Object.values(pack.units).flatMap((u) => u.skills.map((s) => s.id)));
  for (const id of Object.keys(labels.sections ?? {})) if (!sectionIds.has(id)) errors.push(`sections.${id}: no such section`);
  for (const id of Object.keys(labels.units ?? {})) if (!pack.units[id]) errors.push(`units.${id}: no such unit`);
  for (const id of Object.keys(labels.skills ?? {})) if (!skillIds.has(id)) errors.push(`skills.${id}: no such skill`);
  for (const id of Object.keys(labels.cast ?? {})) if (!pack.meta.cast?.[id]) errors.push(`cast.${id}: no such character`);
  const { words, why } = labels.landing ?? {};
  if (words && words.length !== (pack.meta.landing?.words?.length ?? 0)) errors.push(`landing.words: ${words.length} meaning(s) for ${pack.meta.landing?.words?.length ?? 0} word(s)`);
  if (why?.cards && why.cards.length !== (pack.meta.landing?.why?.cards?.length ?? 0)) errors.push(`landing.why.cards: ${why.cards.length} card(s) for ${pack.meta.landing?.why?.cards?.length ?? 0}`);
  for (const s of pack.meta.sections) for (const f of SECTION_FIELDS) if (s[f] && !labels.sections?.[s.id]?.[f]) missing.push(`sections.${s.id}.${f}`);
  for (const u of Object.values(pack.units)) {
    for (const f of UNIT_FIELDS) if (u[f] && !labels.units?.[u.id]?.[f]) missing.push(`units.${u.id}.${f}`);
    for (const sk of u.skills) if (!labels.skills?.[sk.id]) missing.push(`skills.${sk.id}`);
  }
  missing.push(...missingCopy(labels, pack.meta, ui));
  return { errors, missing };
}
