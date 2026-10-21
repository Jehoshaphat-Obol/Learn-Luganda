/*
 * The course: units in order, plus lookup indexes built once at load.
 * Content files stay plain data; everything derived lives here.
 */
import unit1 from './units/unit1.js';
import unit2 from './units/unit2.js';
import unit3 from './units/unit3.js';
import unit4 from './units/unit4.js';
import unit5 from './units/unit5.js';
import unit6 from './units/unit6.js';
import unit7 from './units/unit7.js';
import unit8 from './units/unit8.js';
import unit9 from './units/unit9.js';
import unit10 from './units/unit10.js';
import unit11 from './units/unit11.js';
import unit12 from './units/unit12.js';
import unit13 from './units/unit13.js';
import unit14 from './units/unit14.js';
import unit15 from './units/unit15.js';
import unit16 from './units/unit16.js';
import { SECTIONS } from './sections.js';

export const UNITS_RAW = [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8, unit9, unit10, unit11, unit12, unit13, unit14, unit15, unit16];

function toItem([id, lg, en, extras = {}], unitId) {
  return { id, lg, en, altLg: extras.altLg ?? [], altEn: extras.altEn ?? [], notes: extras.notes ?? '', audio: extras.audio ?? null, unit: unitId };
}

/**
 * Builds the indexed course from raw units. Exported for tests. Without
 * `rawSections`, every unit goes into one section.
 */
export function buildCourse(rawUnits, rawSections = [{ id: 's1', title: 'Course', level: '', description: '', units: rawUnits.map((u) => u.id) }]) {
  const words = {};
  const sentences = {};
  const lessons = {};
  const skills = {};
  const order = [];

  const units = rawUnits.map((u, ui) => {
    for (const w of u.words) words[w[0]] = toItem(w, u.id);
    for (const s of u.sentences) sentences[s[0]] = toItem(s, u.id);
    const unitSkills = u.skills.map((sk, si) => {
      const skill = {
        ...sk,
        unit: u.id,
        index: si,
        lessons: sk.lessons.map((l, li) => {
          const lesson = { ...l, dialogues: l.dialogues ?? [], skill: sk.id, unit: u.id, index: li, order: order.length };
          lessons[l.id] = lesson;
          order.push(l.id);
          return lesson;
        }),
      };
      skills[sk.id] = skill;
      return skill;
    });
    return { id: u.id, title: u.title, description: u.description, color: u.color, character: u.character, index: ui, skills: unitSkills };
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

  return { units, sections, words, sentences, lessons, skills, order };
}

export const course = buildCourse(UNITS_RAW, SECTIONS);

/** The section a lesson or unit belongs to. */
export function sectionOf(unitId, c = course) {
  return c.sections.find((s) => s.units.some((u) => u.id === unitId)) ?? null;
}

/** Totals for the landing page and README. */
export function courseStats(c = course) {
  return { sections: c.sections.length, units: c.units.length, lessons: c.order.length, words: Object.keys(c.words).length };
}

/** Words introduced up to and including `lessonId`, in course order. */
export function wordsUpTo(lessonId, c = course) {
  const stop = c.lessons[lessonId]?.order ?? -1;
  const out = [];
  for (let i = 0; i <= stop; i += 1) out.push(...c.lessons[c.order[i]].newWords);
  return out;
}
