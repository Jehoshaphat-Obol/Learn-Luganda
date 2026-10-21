/*
 * Ad breaks: free, temporary pauses from ads. The policy sets how long a
 * break lasts, how many fit in any 7 days and the longer break a streak
 * earns. Breaks are kept on this device beside the ad log.
 */
import { POLICY } from './policy.js';

const KEY = 'learn-luganda:ad-breaks';
const HOUR = 3_600_000;
const WEEK = 7 * 24 * HOUR;

function read() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY)) ?? {};
    return { until: Number(v.until) || 0, taken: Array.isArray(v.taken) ? v.taken.map(Number).filter(Boolean) : [] };
  } catch {
    return { until: 0, taken: [] };
  }
}

function write(v) {
  try {
    localStorage.setItem(KEY, JSON.stringify(v));
  } catch {
    // Storage blocked: the break lasts for this visit only.
  }
}

/** When the current break ends (0 when ads aren't paused). */
export function adBreakUntil(now = Date.now()) {
  const { until } = read();
  return until > now ? until : 0;
}

/**
 * Where the learner stands: whether a break is on, how long the next one
 * would be, how many are left in the rolling week and when one frees up.
 */
export function adBreakStatus({ streak = 0, now = Date.now(), policy = POLICY } = {}) {
  const rule = policy.adBreak;
  const { until, taken } = read();
  const recent = taken.filter((t) => now - t < WEEK).sort((a, b) => a - b);
  const left = Math.max(0, rule.perWeek - recent.length);
  const long = streak >= rule.streakDays;
  return {
    active: until > now,
    until: until > now ? until : 0,
    left,
    hours: long ? rule.streakHours : rule.hours,
    streakBonus: long,
    nextAt: left ? now : recent[recent.length - rule.perWeek] + WEEK,
    available: rule.perWeek > 0 && left > 0 && until <= now,
  };
}

/** Starts a break if one is available; returns when it ends, or 0. */
export function takeAdBreak({ streak = 0, now = Date.now(), policy = POLICY } = {}) {
  const status = adBreakStatus({ streak, now, policy });
  if (!status.available) return 0;
  const { taken } = read();
  const until = now + status.hours * HOUR;
  write({ until, taken: [...taken.filter((t) => now - t < WEEK), now] });
  return until;
}

/** Ends the current break early. It still counts towards the week. */
export function endAdBreak() {
  write({ ...read(), until: 0 });
}
