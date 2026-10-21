/*
 * Experience points. A lesson earns base XP (less when replaying it) plus a
 * bonus for a perfect run; XP is also logged per day for the daily goal.
 */
import { dayKey } from './dates.js';

export const XP = { lesson: 10, replay: 5, perfectBonus: 5, practice: 10, checkpoint: 20, story: 15 };

/** @returns {{ total: number, parts: Array<{ id: 'lesson' | 'replay' | 'perfect', xp: number }> }} */
export function lessonXp(result, { replay = false, base } = {}) {
  const parts = [{ id: replay ? 'replay' : 'lesson', xp: base ?? (replay ? XP.replay : XP.lesson) }];
  if (result.perfect) parts.push({ id: 'perfect', xp: XP.perfectBonus });
  return { total: parts.reduce((n, p) => n + p.xp, 0), parts };
}

export function addXp(s, amount, now = new Date()) {
  const key = dayKey(now);
  s.xp.total += amount;
  s.xp.byDay[key] = (s.xp.byDay[key] ?? 0) + amount;
  return s;
}

export function todayXp(s, now = new Date()) {
  return s.xp.byDay[dayKey(now)] ?? 0;
}

export function dailyGoal(s, now = new Date()) {
  const goal = s.profile?.dailyGoal ?? 20;
  const today = todayXp(s, now);
  return { today, goal, met: today >= goal, ratio: Math.min(1, today / goal) };
}

/** XP for each of the last `days` days, oldest first: [{ day, xp }]. */
export function xpHistory(s, days = 7, now = new Date()) {
  const out = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = dayKey(d);
    out.push({ day: key, xp: s.xp.byDay[key] ?? 0 });
  }
  return out;
}
