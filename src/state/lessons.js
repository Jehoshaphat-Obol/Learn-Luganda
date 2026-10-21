/* Saving the outcome of a finished lesson. */
import { store } from './store.js';

/**
 * Applies a finished lesson's result to the state (pure, for tests).
 * @param {object} s draft state
 * @param {string} lessonId
 * @param {{ accuracy: number, perfect: boolean, seconds: number, correct: number, wrong: number }} result
 * @param {Date} [now]
 */
export function applyLessonResult(s, lessonId, result, now = new Date()) {
  const prev = s.lessons[lessonId] ?? { completions: 0, bestAccuracy: 0 };
  s.lessons[lessonId] = {
    completions: prev.completions + 1,
    bestAccuracy: Math.max(prev.bestAccuracy ?? 0, result.accuracy),
    lastCompletedAt: now.toISOString(),
  };
  s.stats.lessonsCompleted += 1;
  if (result.perfect) s.stats.perfectLessons += 1;
  s.stats.answers += result.correct + result.wrong;
  s.stats.correctAnswers += result.correct;
  s.stats.secondsLearning += result.seconds;
  return s;
}

export function recordLessonResult(lessonId, result) {
  store.update((s) => applyLessonResult(s, lessonId, result));
}
