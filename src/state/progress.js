/*
 * Course progress derived from the store: which lessons are done, which is
 * next, and what's unlocked. Pure functions of (state, course) so the path
 * and tests share one source of truth.
 */
import { course as defaultCourse } from '../content/course.js';

export function isLessonDone(state, lessonId) {
  return (state.lessons[lessonId]?.completions ?? 0) > 0;
}

/** Index of the furthest section the learner jumped to with a section test, or -1. */
export function jumpedSectionIndex(state, c = defaultCourse) {
  return Math.max(-1, ...(state.jumps ?? []).map((id) => c.sections.findIndex((s) => s.id === id)));
}

const sectionIndexOfUnit = (unitId, c) => c.sections.findIndex((s) => s.units.some((u) => u.id === unitId));

/** Not done, but in a section before one the learner jumped to. */
export function isLessonSkipped(state, lessonId, c = defaultCourse) {
  const lesson = c.lessons[lessonId];
  return Boolean(lesson) && !isLessonDone(state, lessonId) && sectionIndexOfUnit(lesson.unit, c) < jumpedSectionIndex(state, c);
}

/** Done or skipped: either way, the lessons after it are open. */
export function isLessonPassed(state, lessonId, c = defaultCourse) {
  return isLessonDone(state, lessonId) || isLessonSkipped(state, lessonId, c);
}

/** Learners who said they know some Luganda can start anywhere in the first skill. */
function placementUnlocked(state, lesson, c) {
  return state.profile?.level === 'some' && lesson.skill === c.units[0].skills[0].id;
}

export function isLessonUnlocked(state, lessonId, c = defaultCourse) {
  const lesson = c.lessons[lessonId];
  if (!lesson) return false;
  if (lesson.order === 0 || isLessonPassed(state, lessonId, c)) return true;
  if (placementUnlocked(state, lesson, c)) return true;
  return isLessonPassed(state, c.order[lesson.order - 1], c);
}

/** The first unlocked lesson not yet done or skipped, or null when the course is finished. */
export function nextLessonId(state, c = defaultCourse) {
  return c.order.find((id) => !isLessonPassed(state, id, c) && isLessonUnlocked(state, id, c)) ?? null;
}

export function skillProgress(state, skillId, c = defaultCourse) {
  const lessons = c.skills[skillId].lessons;
  const done = lessons.filter((l) => isLessonDone(state, l.id)).length;
  return { done, total: lessons.length, complete: done === lessons.length };
}

export function unitProgress(state, unitId, c = defaultCourse) {
  const unit = c.units.find((u) => u.id === unitId);
  const lessons = unit.skills.flatMap((s) => s.lessons);
  const done = lessons.filter((l) => isLessonDone(state, l.id)).length;
  // `passed`: every lesson done or skipped, so the checkpoint can open.
  const passed = lessons.every((l) => isLessonPassed(state, l.id, c));
  return { done, total: lessons.length, complete: done === lessons.length, passed };
}

/** Lessons done (or skipped) across a section. */
export function sectionProgress(state, sectionId, c = defaultCourse) {
  const section = c.sections.find((s) => s.id === sectionId);
  const lessons = section.units.flatMap((u) => u.skills.flatMap((s) => s.lessons));
  const done = lessons.filter((l) => isLessonDone(state, l.id)).length;
  const passed = lessons.filter((l) => isLessonPassed(state, l.id, c)).length;
  return { done, passed, total: lessons.length, complete: passed === lessons.length };
}

/** A section is open once its first lesson is unlocked. */
export function isSectionUnlocked(state, sectionId, c = defaultCourse) {
  const section = c.sections.find((s) => s.id === sectionId);
  return isUnitUnlocked(state, section.units[0].id, c);
}

/** A locked section after the first can be reached early with a section test. */
export function canJumpTo(state, sectionId, c = defaultCourse) {
  const section = c.sections.find((s) => s.id === sectionId);
  return Boolean(section) && section.index > 0 && !isSectionUnlocked(state, sectionId, c);
}

/** A unit is open once its first lesson is unlocked. */
export function isUnitUnlocked(state, unitId, c = defaultCourse) {
  const unit = c.units.find((u) => u.id === unitId);
  return isLessonUnlocked(state, unit.skills[0].lessons[0].id, c);
}

/** Words the learner has met in completed lessons. */
export function learnedWordIds(state, c = defaultCourse) {
  return c.order.filter((id) => isLessonDone(state, id)).flatMap((id) => c.lessons[id].newWords);
}

/** The whole course is done: every lesson passed and the last checkpoint taken. */
export function isCourseComplete(state, c = defaultCourse) {
  const last = c.units[c.units.length - 1];
  return Boolean(last && state.lessons[`checkpoint-${last.id}`]?.completions) && c.order.every((id) => isLessonPassed(state, id, c));
}
