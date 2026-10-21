/*
 * Meta (Facebook) Pixel settings: the one file the owner edits.
 *
 * 1. Paste your Pixel ID (the 15–16 digit number from Meta Events Manager ›
 *    Data sources) into `id`, or set VITE_META_PIXEL_ID at build time.
 * 2. Leave `enabled` true. Set it to false to switch the pixel off without
 *    deleting the ID.
 * 3. Turn individual events on or off below.
 *
 * Nothing loads until `id` is set, `enabled` is true AND the learner taps
 * Allow on the pixel's consent card. See docs/meta-pixel.md.
 */
const env = import.meta.env ?? {};

export const PIXEL = Object.freeze({
  id: env.VITE_META_PIXEL_ID || '',
  enabled: true,
  events: Object.freeze({
    // Standard "PageView" each time a screen opens.
    pageView: true,
    // Standard "CompleteRegistration" when a visitor finishes onboarding.
    signUp: true,
    // Custom "LessonComplete" for each finished lesson, practice, story or test.
    lessonComplete: true,
    // Custom "StreakMilestone" on streak days 3, 7, 14, 30 and so on.
    streakMilestone: true,
  }),
});
