/*
 * A small record of ads shown on this device (today's count and the time of
 * the last one) so the policy's cooldown and daily cap hold across visits.
 * It holds no personal data and sits apart from learning progress.
 */
import { dayKey } from '../state/dates.js';

const KEY = 'learn-luganda:ads-log';

export function adLog(now = Date.now()) {
  try {
    const log = JSON.parse(localStorage.getItem(KEY)) ?? {};
    const today = dayKey(new Date(now));
    return { day: today, shown: log.day === today ? Number(log.shown) || 0 : 0, last: Number(log.last) || 0 };
  } catch {
    return { day: dayKey(new Date(now)), shown: 0, last: 0 };
  }
}

export function recordAdShown(now = Date.now()) {
  const log = adLog(now);
  try {
    localStorage.setItem(KEY, JSON.stringify({ day: log.day, shown: log.shown + 1, last: now }));
  } catch {
    // Storage blocked: limits reset with the page.
  }
}
