import { describe, expect, it } from 'vitest';
import { extendStreak, nextMilestone, settleStreak, streakStatus } from '../src/state/streak.js';

const fresh = (extra = {}) => ({ streak: { current: 0, longest: 0, lastDay: null, freezes: 0, frozenDays: [], ...extra } });

describe('streak', () => {
  it('starts at one and extends once per day', () => {
    const s = fresh();
    expect(extendStreak(s, '2026-10-20')).toMatchObject({ extended: true, current: 1 });
    expect(extendStreak(s, '2026-10-20')).toMatchObject({ extended: false, current: 1 });
    expect(extendStreak(s, '2026-10-21')).toMatchObject({ extended: true, current: 2 });
    expect(s.streak.longest).toBe(2);
  });

  it('resets after a missed day without freezes', () => {
    const s = fresh({ current: 5, longest: 5, lastDay: '2026-10-18' });
    expect(streakStatus(s, '2026-10-20')).toMatchObject({ current: 0, atRisk: false });
    expect(extendStreak(s, '2026-10-20')).toMatchObject({ current: 1 });
    expect(s.streak.longest).toBe(5);
  });

  it('uses freezes to cover missed days', () => {
    const s = fresh({ current: 5, longest: 5, lastDay: '2026-10-17', freezes: 2 });
    settleStreak(s, '2026-10-20');
    expect(s.streak).toMatchObject({ current: 5, freezes: 0, lastDay: '2026-10-19', frozenDays: ['2026-10-18', '2026-10-19'] });
    expect(extendStreak(s, '2026-10-20')).toMatchObject({ current: 6 });
  });

  it('breaks when freezes do not cover every missed day', () => {
    const s = fresh({ current: 5, lastDay: '2026-10-16', freezes: 2 });
    settleStreak(s, '2026-10-20');
    expect(s.streak.current).toBe(0);
    expect(s.streak.freezes).toBe(2);
  });

  it('flags a streak at risk until today is done', () => {
    const s = fresh({ current: 3, longest: 3, lastDay: '2026-10-19' });
    expect(streakStatus(s, '2026-10-20')).toMatchObject({ atRisk: true, doneToday: false, current: 3 });
    extendStreak(s, '2026-10-20');
    expect(streakStatus(s, '2026-10-20')).toMatchObject({ atRisk: false, doneToday: true, current: 4 });
  });

  it('works across month ends', () => {
    const s = fresh({ current: 1, lastDay: '2026-10-31' });
    expect(extendStreak(s, '2026-11-01').current).toBe(2);
  });

  it('marks milestones', () => {
    const s = fresh({ current: 6, lastDay: '2026-10-19' });
    expect(extendStreak(s, '2026-10-20').milestone).toBe(7);
    expect(nextMilestone(7)).toBe(14);
  });
});
