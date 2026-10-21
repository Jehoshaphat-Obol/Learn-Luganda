import { describe, expect, it } from 'vitest';
import { PROMOTE, SIZE, rivalXp, rivals, settleLeague, standings, weeklyXp, zone } from '../src/state/league.js';

const state = (byDay = {}) => ({ profile: { name: 'Amani' }, xp: { total: 0, byDay }, league: {} });

describe('leagues', () => {
  it('generates the same rivals for the same week and tier', () => {
    expect(rivals('2026-10-19', 0)).toEqual(rivals('2026-10-19', 0));
    expect(rivals('2026-10-19', 0)).not.toEqual(rivals('2026-10-26', 0));
    expect(rivals('2026-10-19', 0)).toHaveLength(SIZE - 1);
  });

  it('grows rival XP through the week and never shrinks it', () => {
    const r = rivals('2026-10-19', 2)[0];
    let last = 0;
    for (let h = 0; h < 7 * 24; h += 6) {
      const xp = rivalXp(r, '2026-10-19', new Date(2026, 9, 19, h));
      expect(xp).toBeGreaterThanOrEqual(last);
      last = xp;
    }
  });

  it('counts the learner’s XP for the week only', () => {
    const s = state({ '2026-10-18': 50, '2026-10-19': 10, '2026-10-21': 15, '2026-10-26': 99 });
    expect(weeklyXp(s, '2026-10-19', new Date(2026, 9, 22))).toBe(25);
  });

  it('ranks everyone with the learner included', () => {
    const table = standings(state({ '2026-10-19': 5000 }), '2026-10-19', 0, new Date(2026, 9, 21));
    expect(table).toHaveLength(SIZE);
    expect(table[0]).toMatchObject({ me: true, rank: 1 });
  });

  it('joins at bronze, then promotes a winner at the week’s end', () => {
    const s = state();
    settleLeague(s, new Date(2026, 9, 20));
    expect(s.league).toMatchObject({ week: '2026-10-19', tier: 0 });
    s.xp.byDay['2026-10-20'] = 5000;
    settleLeague(s, new Date(2026, 9, 27));
    expect(s.league).toMatchObject({ week: '2026-10-26', tier: 1 });
    expect(s.league.pendingResult).toMatchObject({ result: 'promote', rank: 1, newTier: 1 });
  });

  it('demotes an inactive learner from a higher tier', () => {
    const s = state();
    s.league = { week: '2026-10-19', tier: 3, history: [] };
    settleLeague(s, new Date(2026, 9, 27));
    expect(s.league.tier).toBe(2);
  });

  it('has promotion and demotion zones', () => {
    expect(zone(PROMOTE, 0)).toBe('promote');
    expect(zone(SIZE, 0)).toBe('stay');
    expect(zone(SIZE, 2)).toBe('demote');
    expect(zone(1, 6)).toBe('stay');
  });
});
