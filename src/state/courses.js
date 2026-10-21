/*
 * Progress per course. The slices below belong to one from→to course (they
 * hold its lesson, word and section ids); everything else in the saved
 * document (XP, streak, gems, hearts, achievements, stats) is the
 * learner's, whatever they study. The active course's slices sit at the top
 * of the document where every feature reads them; switching course parks
 * them under `courses[<id>]` and brings the other course's back, so no
 * progress is ever lost.
 */
import { DEFAULTS } from './store.js';

export const COURSE_SLICES = ['lessons', 'words', 'mistakes', 'jumps'];

/** Id of the course whose progress is at the top of the document. */
export const activeCourseId = (s) => s.settings.course;

/** Makes `id` the active course in state `s` (mutates `s`, for store.update). */
export function switchCourse(s, id) {
  const current = s.settings.course;
  if (current === id) return s;
  s.courses ??= {};
  s.courses[current] = Object.fromEntries(COURSE_SLICES.map((k) => [k, s[k]]));
  const saved = s.courses[id] ?? {};
  for (const k of COURSE_SLICES) s[k] = saved[k] ?? structuredClone(DEFAULTS[k]);
  delete s.courses[id];
  s.settings.course = id;
  return s;
}

/** Whether the learner has started course `id`. */
export function hasStarted(s, id) {
  const slices = id === s.settings.course ? s : s.courses?.[id];
  return Boolean(slices && Object.keys(slices.lessons ?? {}).length);
}
