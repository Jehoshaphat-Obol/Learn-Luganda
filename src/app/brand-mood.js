/*
 * The crane logo's mood follows today's progress, like Duolingo's app icon,
 * but only ever nudges kindly: it celebrates and naps, it never sulks.
 * The mood shows in the app's logo and the browser-tab icon.
 */
import { dailyGoal } from '../state/xp.js';
import { MILESTONES, streakStatus } from '../state/streak.js';
import { dayKey } from '../state/dates.js';
import { brandMark, faviconSvg } from './brand-mark.js';

const TITLES = {
  idle: 'Learn Luganda home',
  happy: "Learn Luganda home. Today's goal is done!",
  sleepy: 'Learn Luganda home. Your streak is waiting for today’s lesson.',
  celebrating: 'Learn Luganda home. Streak milestone today!',
};

/** @returns {'idle'|'happy'|'sleepy'|'celebrating'} */
export function brandMood(s, now = new Date()) {
  if (!s?.profile) return 'idle';
  const streak = streakStatus(s, dayKey(now));
  if (streak.doneToday && MILESTONES.includes(streak.current)) return 'celebrating';
  if (dailyGoal(s, now).met) return 'happy';
  if (streak.atRisk) return 'sleepy';
  return 'idle';
}

export const moodLabel = (mood) => TITLES[mood] ?? TITLES.idle;

let shown = 'idle';

/** Redraws the app's crane marks and the tab icon when the mood changes. */
export function applyBrandMood(mood, doc = document) {
  doc.querySelectorAll('[data-brand]').forEach((el) => {
    if (el.dataset.mood === mood) return;
    el.dataset.mood = mood;
    el.innerHTML = brandMark(mood);
    (el.closest('a') ?? el).setAttribute('aria-label', moodLabel(mood));
  });
  if (mood === shown) return;
  shown = mood;
  const link = doc.querySelector('link[rel="icon"]');
  if (link) link.href = mood === 'idle' ? './favicon.svg' : `data:image/svg+xml,${encodeURIComponent(faviconSvg(mood))}`;
}
