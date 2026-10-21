/*
 * The active course: one from→to course pack (src/packs/courses/<id>/)
 * indexed for the app. A pack is plain JSON, a `course.json` plus one file
 * per unit; everything derived (lesson order, word lookups, stories by id)
 * is built here once and frozen.
 *
 * `course` is a live binding: the app loads a pack before its first render
 * (see ./load.js) and every module reads the same frozen course after that.
 * Functions take the course as an optional last argument so tests can pass
 * their own.
 */
import { deepFreeze } from '../i18n/freeze.js';
import { upgradePack } from './format.js';
import { DEFAULT_SETTINGS, mergeSettings } from './settings.js';
import { CAST } from '../illustrations/characters.js';

function toItem(raw, unitId) {
  return {
    id: raw.id,
    target: raw.target,
    base: raw.base,
    altTarget: raw.altTarget ?? [],
    altBase: raw.altBase ?? [],
    notes: raw.notes ?? '',
    audio: raw.audio ?? null,
    unit: unitId,
  };
}

/**
 * Builds the indexed, frozen course from raw units. Without `rawSections`,
 * every unit goes into one section. `meta` is the pack's course.json.
 */
export function buildCourse(rawUnits, rawSections = [{ id: 's1', title: 'Course', level: '', description: '', units: rawUnits.map((u) => u.id) }], meta = {}) {
  const words = {};
  const sentences = {};
  const lessons = {};
  const skills = {};
  const order = [];
  const stories = [];
  const guidebooks = {};
  // Settings cascade: app defaults, then the course, the unit, the lesson.
  const settings = mergeSettings(DEFAULT_SETTINGS, meta.settings);

  const units = rawUnits.map((u, ui) => {
    const unitSettings = mergeSettings(settings, u.settings);
    for (const w of u.words) words[w.id] = toItem(w, u.id);
    for (const s of u.sentences) sentences[s.id] = toItem(s, u.id);
    if (u.guidebook) guidebooks[u.id] = u.guidebook;
    for (const st of u.stories ?? []) stories.push({ ...st, unit: u.id });
    const unitSkills = u.skills.map((sk, si) => {
      const skill = {
        ...sk,
        unit: u.id,
        index: si,
        lessons: sk.lessons.map((l, li) => {
          const lesson = {
            ...l,
            sentences: l.sentences ?? [],
            dialogues: l.dialogues ?? [],
            settings: l.settings ? mergeSettings(unitSettings, l.settings) : unitSettings,
            skill: sk.id,
            unit: u.id,
            index: li,
            order: order.length,
          };
          lessons[l.id] = lesson;
          order.push(l.id);
          return lesson;
        }),
      };
      skills[sk.id] = skill;
      return skill;
    });
    return { id: u.id, title: u.title, description: u.description, color: u.color, character: u.character, index: ui, settings: unitSettings, skills: unitSkills };
  });

  // Sections keep only the units that exist; empty ones are left out.
  const byId = Object.fromEntries(units.map((u) => [u.id, u]));
  const sections = rawSections
    .map((sec) => ({ ...sec, units: sec.units.map((id) => byId[id]).filter(Boolean) }))
    .filter((sec) => sec.units.length)
    .map((sec, index) => {
      for (const u of sec.units) u.section = sec.id;
      return { ...sec, index };
    });

  return deepFreeze({
    id: meta.id ?? 'course',
    version: meta.version ?? 1,
    from: meta.from ?? 'en',
    to: meta.to ?? 'lg',
    title: meta.title ?? '',
    names: meta.names ?? { from: meta.from ?? 'en', to: meta.to ?? 'lg' },
    settings,
    cast: meta.cast ?? {},
    units,
    sections,
    words,
    sentences,
    lessons,
    skills,
    order,
    stories,
    storyById: Object.fromEntries(stories.map((s) => [s.id, s])),
    guidebooks,
    pack: { meta, units: rawUnits },
  });
}

/**
 * Builds a course from a pack. `unitFiles` maps unit id to the parsed unit
 * file; units appear in the order the sections list them.
 */
export function buildFromPack(rawMeta, rawUnits, names) {
  const { meta, units: unitFiles } = upgradePack({ meta: rawMeta, units: rawUnits });
  const units = meta.sections.flatMap((s) => s.units).map((id) => unitFiles[id]).filter(Boolean);
  return buildCourse(units, meta.sections, { ...meta, names: names ?? { from: meta.from, to: meta.to } });
}

/** The course in use. Empty until a pack is loaded. */
export let course = buildCourse([]);

/** Makes `next` the active course. */
export function useCourse(next) {
  course = next;
  return next;
}

/** The BCP 47 code for an exercise's `lang` role: 'target' or 'base'. */
export const langCode = (role, c = course) => (role === 'target' ? c.to : c.from);

/** A ` lang="…"` attribute for HTML, for a 'target' or 'base' string. */
export const langAttr = (role, c = course) => ` lang="${langCode(role, c)}"`;

/** The section a lesson or unit belongs to. */
export function sectionOf(unitId, c = course) {
  return c.sections.find((s) => s.units.some((u) => u.id === unitId)) ?? null;
}

/** Totals for the landing page and README. */
export function courseStats(c = course) {
  return { sections: c.sections.length, units: c.units.length, lessons: c.order.length, words: Object.keys(c.words).length, stories: c.stories.length };
}

/** Words introduced up to and including `lessonId`, in course order. */
export function wordsUpTo(lessonId, c = course) {
  const stop = c.lessons[lessonId]?.order ?? -1;
  const out = [];
  for (let i = 0; i <= stop; i += 1) out.push(...c.lessons[c.order[i]].newWords);
  return out;
}

/** The display name of the 'target' or 'base' language, e.g. "Luganda". */
export const languageName = (role, c = course) => (role === 'target' ? c.names.to : c.names.from);

/**
 * A character of the course: `{ id, name, role, look }`, where `look` is
 * what `portrait()` draws. Packs name their own cast and either reuse one
 * of the illustrated looks (`"look": "nakato"`) or describe a new one with
 * the same fields as src/illustrations/characters.js. Ids the pack doesn't
 * list fall back to the illustrated cast.
 */
export function castMember(id, c = course) {
  const entry = c.cast[id];
  const look = typeof entry?.look === 'object' ? { extras: [], ...entry.look, id: `${c.id}-${id}` } : CAST[entry?.look ?? id];
  if (!look) return { id, name: entry?.name ?? id, role: entry?.role ?? '', look: CAST.nakato };
  const name = entry?.name ?? look.name;
  return { id, name, role: entry?.role ?? look.role ?? '', look: { id, ...look, name } };
}
