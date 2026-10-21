import { describe, expect, it } from 'vitest';
import { brandMood } from '../src/app/brand-mood.js';
import { brandMark, faviconSvg, MOODS } from '../src/app/brand-mark.js';

const NOW = new Date(2026, 9, 21, 12);
const learner = ({ streak = {}, xpToday = 0, goal = 20 } = {}) => ({
  profile: { name: 'A', dailyGoal: goal },
  streak: { current: 0, longest: 0, lastDay: null, freezes: 0, frozenDays: [], ...streak },
  xp: { total: xpToday, byDay: xpToday ? { '2026-10-21': xpToday } : {} },
});

describe('brand mood', () => {
  it('is idle before there is a profile or any streak', () => {
    expect(brandMood({}, NOW)).toBe('idle');
    expect(brandMood(learner(), NOW)).toBe('idle');
  });

  it('naps while a streak waits for today’s lesson', () => {
    expect(brandMood(learner({ streak: { current: 4, lastDay: '2026-10-20' } }), NOW)).toBe('sleepy');
  });

  it('is idle once the streak is safe but the goal is not met', () => {
    expect(brandMood(learner({ streak: { current: 4, lastDay: '2026-10-21' }, xpToday: 10 }), NOW)).toBe('idle');
  });

  it('is happy when today’s goal is met', () => {
    expect(brandMood(learner({ streak: { current: 4, lastDay: '2026-10-21' }, xpToday: 25 }), NOW)).toBe('happy');
  });

  it('celebrates on a streak milestone day', () => {
    expect(brandMood(learner({ streak: { current: 7, lastDay: '2026-10-21' }, xpToday: 10 }), NOW)).toBe('celebrating');
  });

  it('does not nap after a broken streak', () => {
    expect(brandMood(learner({ streak: { current: 4, lastDay: '2026-10-18' } }), NOW)).toBe('idle');
  });

  it('draws every mood', () => {
    const marks = MOODS.map((m) => brandMark(m));
    expect(new Set(marks).size).toBe(MOODS.length);
    expect(faviconSvg('happy')).toMatch(/^<svg xmlns/);
  });
});
