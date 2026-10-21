/*
 * The ad policy: the rules for when, where and which kind of ad may appear.
 *
 * Pick a LEVEL to tune how much ads touch learning, from 'off' to
 * 'generous'. Every value is frozen when the app loads, so nothing at runtime
 * (no setting, no saved data, no console tweak) can change it; the only way
 * is to edit this file and deploy. `tests/ads-policy.test.js` checks each
 * level stays within safe bounds, so a bad edit fails CI.
 *
 * Rules, applied in this order:
 *   placements      where ads may appear and which ad type each uses.
 *                   Lessons, practice, checkpoints and stories being read
 *                   never have a placement, so they never show ads.
 *   graceSessions   no ads at all until the learner has finished this many
 *                   lessons or practice sessions.
 *   cooldownMinutes minimum gap between two ads shown, on any screen.
 *   maxPerDay       cap on ads shown per day.
 *   everyNthSession the lesson complete ad only shows after every Nth
 *                   finished session.
 *   minAccuracy     no lesson complete ad after a session below this
 *                   accuracy: a struggling learner gets a quiet screen.
 *   adBreak         free, temporary pauses the learner can take: `hours`
 *                   long, `perWeek` in any 7 days, and `streakHours` long
 *                   instead once their streak reaches `streakDays`.
 */

/** Ad types, matching the AdSense units in `config.js`. */
export const AD_TYPES = Object.freeze({
  inFeed: 'inFeed', // native card between content, styled like the app
  display: 'display', // responsive display unit
});

const PRESETS = {
  off: {
    impact: 'No ads anywhere.',
    placements: { path: false, stories: false, complete: false },
    graceSessions: Infinity,
    cooldownMinutes: Infinity,
    maxPerDay: 0,
    everyNthSession: Infinity,
    minAccuracy: 1,
    adBreak: { hours: 0, perWeek: 0, streakDays: Infinity, streakHours: 0 },
  },
  gentle: {
    impact: 'About 3 ads a day at most; never in the first 5 lessons; complete-screen ads after every 4th session.',
    placements: { path: true, stories: false, complete: true },
    graceSessions: 5,
    cooldownMinutes: 15,
    maxPerDay: 3,
    everyNthSession: 4,
    minAccuracy: 0.8,
    adBreak: { hours: 24, perWeek: 3, streakDays: 7, streakHours: 48 },
  },
  balanced: {
    impact: 'Up to 6 ads a day, at least 8 minutes apart; complete-screen ads after every 3rd session.',
    placements: { path: true, stories: true, complete: true },
    graceSessions: 3,
    cooldownMinutes: 8,
    maxPerDay: 6,
    everyNthSession: 3,
    minAccuracy: 0.6,
    adBreak: { hours: 12, perWeek: 2, streakDays: 7, streakHours: 24 },
  },
  generous: {
    impact: 'Up to 10 ads a day, at least 4 minutes apart; complete-screen ads after every 2nd session.',
    placements: { path: true, stories: true, complete: true },
    graceSessions: 1,
    cooldownMinutes: 4,
    maxPerDay: 10,
    everyNthSession: 2,
    minAccuracy: 0.5,
    adBreak: { hours: 6, perWeek: 2, streakDays: 7, streakHours: 12 },
  },
};

/** Change this to tune ads. One of: 'off', 'gentle', 'balanced', 'generous'. */
const LEVEL = 'gentle';

/** Which ad type each placement uses. */
const PLACEMENT_TYPES = {
  path: AD_TYPES.inFeed, // after the section being studied on the learning path
  stories: AD_TYPES.inFeed, // after the first unit on the stories list
  complete: AD_TYPES.display, // on the lesson complete summary, above Continue
};

function deepFreeze(obj) {
  for (const v of Object.values(obj)) if (v && typeof v === 'object') deepFreeze(v);
  return Object.freeze(obj);
}

export function buildPolicy(level) {
  const preset = PRESETS[level];
  if (!preset) throw new Error(`Unknown ad level "${level}"`);
  const placements = Object.fromEntries(
    Object.entries(PLACEMENT_TYPES).map(([name, type]) => [name, { enabled: preset.placements[name], type }]),
  );
  return deepFreeze({ ...structuredClone(preset), level, placements });
}

export const LEVELS = Object.freeze(Object.keys(PRESETS));
export const POLICY = buildPolicy(LEVEL);
