import { describe, expect, it } from 'vitest';
import { reminderDue, reminderText } from '../src/app/pwa.js';
import { DEFAULTS } from '../src/state/store.js';

const state = (settings = {}) => {
  const s = structuredClone(DEFAULTS);
  s.profile = { name: 'Amani', dailyGoal: 20 };
  s.settings = { ...s.settings, reminder: true, reminderHour: 19, ...settings };
  return s;
};

describe('daily reminder', () => {
  const evening = new Date(2026, 9, 21, 20);

  it('is due in the evening when nothing was learned', () => {
    expect(reminderDue(state(), evening)).toBe(true);
  });

  it('waits for the hour, respects opt-out and fires once a day', () => {
    expect(reminderDue(state(), new Date(2026, 9, 21, 18))).toBe(false);
    expect(reminderDue(state({ reminder: false }), evening)).toBe(false);
    expect(reminderDue(state({ lastReminder: '2026-10-21' }), evening)).toBe(false);
  });

  it('stays quiet once the day’s goal is met', () => {
    const s = state();
    s.xp.byDay['2026-10-21'] = 25;
    expect(reminderDue(s, evening)).toBe(false);
  });

  it('mentions a streak at risk', () => {
    const s = state();
    s.streak = { ...s.streak, current: 5, lastDay: '2026-10-20' };
    expect(reminderText(s, evening)).toMatch(/5 day streak/);
  });
});
