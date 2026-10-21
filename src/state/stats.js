/* Numbers for the profile page, derived from the saved state. */
import { learnedWordIds } from './progress.js';
import { streakStatus } from './streak.js';
import { TIERS } from './league.js';
import { STORIES } from '../content/stories.js';
import { storyKey } from './stories.js';
import { dayKey } from './dates.js';

export function profileStats(s, now = new Date()) {
  const { answers, correctAnswers, lessonsCompleted, perfectLessons, secondsLearning } = s.stats;
  return {
    totalXp: s.xp.total,
    streak: streakStatus(s, dayKey(now)).current,
    longestStreak: s.streak.longest,
    league: s.league?.week ? TIERS[s.league.tier]?.name : null,
    words: learnedWordIds(s).length,
    lessons: lessonsCompleted,
    perfect: perfectLessons,
    accuracy: answers ? correctAnswers / answers : null,
    minutes: Math.round(secondsLearning / 60),
    stories: STORIES.filter((st) => s.lessons[storyKey(st.id)]?.completions).length,
  };
}
