import { describe, expect, it } from 'vitest';
import { addXp, dailyGoal, lessonXp, xpHistory } from '../src/state/xp.js';

const state = () => ({ profile: { dailyGoal: 20 }, xp: { total: 0, byDay: {} } });

describe('xp', () => {
  it('awards lesson, replay and perfect XP', () => {
    expect(lessonXp({ perfect: false }).total).toBe(10);
    expect(lessonXp({ perfect: true }).total).toBe(15);
    expect(lessonXp({ perfect: false }, { replay: true }).total).toBe(5);
    expect(lessonXp({ perfect: true }, { base: 20 }).parts).toHaveLength(2);
  });

  it('logs XP per local day and tracks the daily goal', () => {
    const s = state();
    const day1 = new Date(2026, 9, 20, 23, 50);
    const day2 = new Date(2026, 9, 21, 0, 10);
    addXp(s, 15, day1);
    addXp(s, 10, day2);
    addXp(s, 15, day2);
    expect(s.xp.total).toBe(40);
    expect(dailyGoal(s, day1)).toMatchObject({ today: 15, met: false });
    expect(dailyGoal(s, day2)).toMatchObject({ today: 25, met: true, ratio: 1 });
    expect(xpHistory(s, 3, day2).map((d) => d.xp)).toEqual([0, 15, 25]);
  });
});
