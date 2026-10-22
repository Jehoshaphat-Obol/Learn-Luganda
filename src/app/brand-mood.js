/*
 * The crane logo's mood follows today's progress, like Duolingo's app icon,
 * but only ever nudges kindly: it celebrates and naps, it never sulks.
 * The mood shows in the app's logo and the browser-tab icon, together with
 * the scene around the crane (time of day, holiday, weather: brand-scene.js).
 */
import { dailyGoal } from '../state/xp.js';
import { MILESTONES, streakStatus } from '../state/streak.js';
import { dayKey } from '../state/dates.js';
import { brandMark, faviconSvg } from './brand-mark.js';
import { t } from '../i18n/index.js';

const MOODS = ['idle', 'happy', 'sleepy', 'celebrating'];

/** @returns {'idle'|'happy'|'sleepy'|'celebrating'} */
export function brandMood(s, now = new Date()) {
  if (!s?.profile) return 'idle';
  const streak = streakStatus(s, dayKey(now));
  if (streak.doneToday && MILESTONES.includes(streak.current)) return 'celebrating';
  if (dailyGoal(s, now).met) return 'happy';
  if (streak.atRisk) return 'sleepy';
  return 'idle';
}

export const moodLabel = (mood) => t(`mood.${MOODS.includes(mood) ? mood : 'idle'}`, { app: t('app.name') });

/** The logo's label: the mood, then the holiday and the sky, if any. */
export function brandLabel(mood, scene = {}) {
  const parts = [moodLabel(mood)];
  if (scene.holiday) parts.push(t(`brandScene.holiday.${scene.holiday}`));
  if (scene.phase) parts.push(t(scene.weather && scene.weather !== 'clear' ? `brandScene.weather.${scene.weather}` : `brandScene.phase.${scene.phase}`));
  return parts.join(' ');
}

let shown = 'idle';

/** Redraws the app's crane marks and the tab icon when the mood or scene changes. */
export function applyBrandMood(mood, doc = document, scene = {}) {
  const key = [mood, scene.phase, scene.weather, scene.holiday].filter(Boolean).join(' ');
  doc.querySelectorAll('[data-brand]').forEach((el) => {
    if (el.dataset.mood === key) return;
    el.dataset.mood = key;
    el.innerHTML = brandMark(mood, scene);
    (el.closest('a') ?? el).setAttribute('aria-label', brandLabel(mood, scene));
  });
  if (key === shown) return;
  shown = key;
  const link = doc.querySelector('link[rel="icon"]');
  if (link) link.href = key === 'idle' ? './favicon.svg' : `data:image/svg+xml,${encodeURIComponent(faviconSvg(mood, scene))}`;
}
