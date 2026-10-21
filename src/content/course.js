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

export const UNITS_RAW = [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8];

function toItem([id, lg, en, extras = {}], unitId) {
  return { id, lg, en, altLg: extras.altLg ?? [], altEn: extras.altEn ?? [], notes: extras.notes ?? '', audio: extras.audio ?? null, unit: unitId };
}

/** Builds the indexed course from raw units. Exported for tests. */
export function buildCourse(rawUnits) {
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

  return { units, words, sentences, lessons, skills, order };
}

export const course = buildCourse(UNITS_RAW);

/** Words introduced up to and including `lessonId`, in course order. */
export function wordsUpTo(lessonId, c = course) {
  const stop = c.lessons[lessonId]?.order ?? -1;
  const out = [];
  for (let i = 0; i <= stop; i += 1) out.push(...c.lessons[c.order[i]].newWords);
  return out;
}
