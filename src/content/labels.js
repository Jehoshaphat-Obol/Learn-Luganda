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
 *     "skills": { "u1s1": "…" }
 *   }
 *
 * Every entry is optional: anything left out keeps the pack's own text.
 * Lesson content (exercises, guidebooks, stories) is not covered.
 */

const SECTION_FIELDS = ['title', 'level', 'description'];
const UNIT_FIELDS = ['title', 'description'];

const pick = (own, fields) => Object.fromEntries(fields.filter((f) => typeof own?.[f] === 'string' && own[f]).map((f) => [f, own[f]]));

/** `{ meta, units }` with the headings in `labels` laid over the pack's own. */
export function applyLabels(pack, labels) {
  if (!labels) return pack;
  const { sections = {}, units = {}, skills = {} } = labels;
  const meta = { ...pack.meta, sections: pack.meta.sections.map((s) => ({ ...s, ...pick(sections[s.id], SECTION_FIELDS) })) };
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

/**
 * Checks a labels file against its course pack: `errors` for ids the course
 * doesn't have, `missing` for headings that fall back to the pack's text.
 */
export function checkLabels(labels, pack) {
  const errors = [];
  const missing = [];
  const sectionIds = new Set(pack.meta.sections.map((s) => s.id));
  const skillIds = new Set(Object.values(pack.units).flatMap((u) => u.skills.map((s) => s.id)));
  for (const id of Object.keys(labels.sections ?? {})) if (!sectionIds.has(id)) errors.push(`sections.${id}: no such section`);
  for (const id of Object.keys(labels.units ?? {})) if (!pack.units[id]) errors.push(`units.${id}: no such unit`);
  for (const id of Object.keys(labels.skills ?? {})) if (!skillIds.has(id)) errors.push(`skills.${id}: no such skill`);
  for (const s of pack.meta.sections) for (const f of SECTION_FIELDS) if (s[f] && !labels.sections?.[s.id]?.[f]) missing.push(`sections.${s.id}.${f}`);
  for (const u of Object.values(pack.units)) {
    for (const f of UNIT_FIELDS) if (u[f] && !labels.units?.[u.id]?.[f]) missing.push(`units.${u.id}.${f}`);
    for (const sk of u.skills) if (!labels.skills?.[sk.id]) missing.push(`skills.${sk.id}`);
  }
  return { errors, missing };
}
