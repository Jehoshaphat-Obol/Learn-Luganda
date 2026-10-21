/*
 * Achievements: each has tiers with rising thresholds. Reaching a tier
 * unlocks a badge and pays out gems. `evaluateAchievements` runs after every
 * session and reports anything newly unlocked.
 */
import { unitProgress } from './progress.js';
import { course as defaultCourse } from '../content/course.js';
import { t } from '../i18n/index.js';

/** Names and descriptions come from the UI pack (`achievements.<id>`). */
const achievement = (a) =>
  Object.defineProperties(a, {
    title: { get: () => t(`achievements.${a.id}.title`), enumerable: true },
    describe: { value: (n) => t(`achievements.${a.id}.describe`, { count: n }) },
  });

export const ACHIEVEMENTS = [
  { id: 'wildfire', icon: 'flame', shape: 'circle', tiers: [3, 7, 14, 30, 100], value: (s) => s.streak.longest },
  { id: 'sage', icon: 'bolt', shape: 'square', tiers: [100, 250, 500, 1000, 2500], value: (s) => s.xp.total },
  { id: 'scholar', icon: 'book', shape: 'triangle', tiers: [10, 25, 50, 100, 200], value: (s) => Object.keys(s.words).length },
  { id: 'perfectionist', icon: 'star', shape: 'half', tiers: [1, 5, 10, 25, 50], value: (s) => s.stats.perfectLessons },
  { id: 'reviewer', icon: 'target', shape: 'circle', tiers: [1, 5, 10, 25, 50], value: (s) => s.stats.practiceSessions ?? 0 },
  {
    id: 'explorer',
    icon: 'trophy',
    shape: 'square',
    tiers: [1, 2, 4, 6, 8],
    value: (s, c = defaultCourse) => c.units.filter((u) => unitProgress(s, u.id, c).complete).length,
  },
].map(achievement);

export const GEMS_PER_TIER = 10;

/** Progress for one achievement: tier reached, next target, value. */
export function achievementProgress(s, a) {
  const value = a.value(s);
  const tier = a.tiers.filter((n) => value >= n).length;
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
    for (let n = had + 1; n <= tier; n += 1) {
      const gems = GEMS_PER_TIER * n;
      s.gems += gems;
      unlocked.push({ id: a.id, title: a.title, tier: n, gems, description: a.describe(a.tiers[n - 1]) });
    }
    if (tier > had) s.achievements[a.id] = tier;
  }
  return unlocked;
}
