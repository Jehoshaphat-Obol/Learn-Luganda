/*
 * Course progress derived from the store: which lessons are done, which is
 * next, and what's unlocked. Pure functions of (state, course) so the path
 * and tests share one source of truth.
 */
import { course as defaultCourse } from '../content/course.js';

export function isLessonDone(state, lessonId) {
  return (state.lessons[lessonId]?.completions ?? 0) > 0;
}

/** Learners who said they know some Luganda can start anywhere in the first skill. */
function placementUnlocked(state, lesson, c) {
  return state.profile?.level === 'some' && lesson.skill === c.units[0].skills[0].id;
}

export function isLessonUnlocked(state, lessonId, c = defaultCourse) {
  const lesson = c.lessons[lessonId];
  if (!lesson) return false;
  if (lesson.order === 0 || isLessonDone(state, lessonId)) return true;
  if (placementUnlocked(state, lesson, c)) return true;
  return isLessonDone(state, c.order[lesson.order - 1]);
}

/** The first unlocked lesson not yet done, or null when the course is finished. */
export function nextLessonId(state, c = defaultCourse) {
  return c.order.find((id) => !isLessonDone(state, id) && isLessonUnlocked(state, id, c)) ?? null;
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
  return { done, total: lessons.length, complete: done === lessons.length };
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
