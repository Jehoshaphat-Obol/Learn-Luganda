/*
 * Daily streak. Finishing a lesson extends it once per local day. Missing
 * days breaks it unless streak freezes cover every missed day, in which case
 * the freezes are used up and the streak carries on.
 */
import { addDays, dayKey, daysBetween } from './dates.js';

export const MILESTONES = [3, 7, 14, 30, 50, 100, 200, 365];
export const MAX_FREEZES = 2;

/** Applies missed days: uses freezes or resets the streak (mutates the draft). */
export function settleStreak(s, today = dayKey()) {
  const st = s.streak;
  if (!st.lastDay || st.current === 0) return s;
  const gap = daysBetween(st.lastDay, today);
  if (gap <= 1) return s;
  const missed = gap - 1;
  if (st.freezes >= missed) {
    st.freezes -= missed;
    for (let i = 1; i <= missed; i += 1) st.frozenDays.push(addDays(st.lastDay, i));
    st.lastDay = addDays(today, -1);
  } else {
    st.current = 0;
  }
  return s;
}

/**
 * Counts today toward the streak. Returns what happened so the UI can
 * celebrate: `{ extended, current, milestone }`.
 */
export function extendStreak(s, today = dayKey()) {
  settleStreak(s, today);
  const st = s.streak;
  if (st.lastDay === today && st.current > 0) return { extended: false, current: st.current, milestone: null };
  st.current += 1;
  st.longest = Math.max(st.longest, st.current);
  st.lastDay = today;
  return { extended: true, current: st.current, milestone: MILESTONES.includes(st.current) ? st.current : null };
}

/** Read-only view for the top bar, path and calendar. */
export function streakStatus(s, today = dayKey()) {
  const copy = { streak: { ...s.streak, frozenDays: [...s.streak.frozenDays] } };
  settleStreak(copy, today);
  const st = copy.streak;
  const doneToday = st.lastDay === today && st.current > 0;
  return {
    current: st.current,
    longest: Math.max(st.longest, st.current),
    freezes: st.freezes,
    doneToday,
    atRisk: !doneToday && st.current > 0,
    frozenDays: st.frozenDays,
  };
}

export function nextMilestone(current) {
  return MILESTONES.find((m) => m > current) ?? null;
}
