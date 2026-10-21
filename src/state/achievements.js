/*
 * Achievements: each has tiers with rising thresholds. Reaching a tier
 * unlocks a badge and pays out gems. `evaluateAchievements` runs after every
 * session and reports anything newly unlocked.
 */
import { unitProgress } from './progress.js';
import { course as defaultCourse } from '../content/course.js';

export const ACHIEVEMENTS = [
  { id: 'wildfire', title: 'Wildfire', icon: 'flame', shape: 'circle', describe: (n) => `Reach a ${n} day streak`, tiers: [3, 7, 14, 30, 100], value: (s) => s.streak.longest },
  { id: 'sage', title: 'Sage', icon: 'bolt', shape: 'square', describe: (n) => `Earn ${n} XP`, tiers: [100, 250, 500, 1000, 2500], value: (s) => s.xp.total },
  { id: 'scholar', title: 'Scholar', icon: 'book', shape: 'triangle', describe: (n) => `Learn ${n} words`, tiers: [10, 25, 50, 100, 200], value: (s) => Object.keys(s.words).length },
  { id: 'perfectionist', title: 'Perfectionist', icon: 'star', shape: 'half', describe: (n) => `Finish ${n} lesson${n > 1 ? 's' : ''} with no mistakes`, tiers: [1, 5, 10, 25, 50], value: (s) => s.stats.perfectLessons },
  { id: 'reviewer', title: 'Sharp Mind', icon: 'target', shape: 'circle', describe: (n) => `Complete ${n} practice session${n > 1 ? 's' : ''}`, tiers: [1, 5, 10, 25, 50], value: (s) => s.stats.practiceSessions ?? 0 },
  {
    id: 'explorer',
    title: 'Explorer',
    icon: 'trophy',
    shape: 'square',
    describe: (n) => `Complete ${n} unit${n > 1 ? 's' : ''}`,
    tiers: [1, 2, 4, 6, 8],
    value: (s, c = defaultCourse) => c.units.filter((u) => unitProgress(s, u.id, c).complete).length,
  },
];

export const GEMS_PER_TIER = 10;

/** Progress for one achievement: tier reached, next target, value. */
export function achievementProgress(s, a) {
  const value = a.value(s);
  const tier = a.tiers.filter((t) => value >= t).length;
  const next = a.tiers[tier] ?? null;
  const prev = a.tiers[tier - 1] ?? 0;
  return { value, tier, maxTier: a.tiers.length, next, ratio: next ? (value - prev) / (next - prev) : 1 };
}

/**
 * Updates stored tiers and pays gems for new ones (mutates the draft).
 * @returns {Array<{ id, title, tier, gems }>} newly unlocked tiers
 */
export function evaluateAchievements(s) {
  const unlocked = [];
  for (const a of ACHIEVEMENTS) {
    const { tier } = achievementProgress(s, a);
    const had = s.achievements[a.id] ?? 0;
    for (let t = had + 1; t <= tier; t += 1) {
      const gems = GEMS_PER_TIER * t;
      s.gems += gems;
      unlocked.push({ id: a.id, title: a.title, tier: t, gems, description: a.describe(a.tiers[t - 1]) });
    }
    if (tier > had) s.achievements[a.id] = tier;
  }
  return unlocked;
}
