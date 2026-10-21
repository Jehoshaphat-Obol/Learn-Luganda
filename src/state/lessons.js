/* Saving the outcome of a finished lesson. */
import { store } from './store.js';
import { addXp, dailyGoal, lessonXp } from './xp.js';
import { extendStreak } from './streak.js';
import { dayKey } from './dates.js';
import { clearMistakes, recordSession } from './review.js';
import { gainHeart } from './hearts.js';

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

/**
 * Saves a finished lesson and its XP in one update.
 * @returns {{ xp: { total: number, parts: object[] }, streak: object, goalBefore: object, goalAfter: object, before: object, after: object }}
 */
export function finishLesson(lessonId, result, { replay = false, base, practice = false, now = new Date() } = {}) {
  const before = store.get();
  const xp = lessonXp(result, { replay, base });
  let streak;
  const after = store.update((s) => {
    if (lessonId) applyLessonResult(s, lessonId, result, now);
    addXp(s, xp.total, now);
    streak = extendStreak(s, dayKey(now));
    recordSession(s, result, dayKey(now));
    if (practice) {
      clearMistakes(s, result);
      gainHeart(s, 1, now.getTime());
    }
  });
  return { xp, streak, before, after, goalBefore: dailyGoal(before, now), goalAfter: dailyGoal(after, now) };
}
