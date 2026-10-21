import { describe, expect, it } from 'vitest';
import { ACHIEVEMENTS, evaluateAchievements, achievementProgress } from '../src/state/achievements.js';
import { buy, canBuy, earnRules, sessionGems, GEMS, SHOP_ITEMS } from '../src/state/shop.js';

const state = () => ({
  profile: { avatar: { character: 'nakato', color: 'sky' } },
  gems: 200,
  hearts: { count: 5, updatedAt: 0 },
  streak: { current: 0, longest: 0, lastDay: null, freezes: 0, frozenDays: [] },
  xp: { total: 0, byDay: {} },
  words: {},
  lessons: {},
  achievements: {},
  inventory: {},
  stats: { perfectLessons: 0, practiceSessions: 0 },
});

describe('achievements', () => {
  it('unlocks tiers once and pays gems', () => {
    const s = state();
    s.streak.longest = 8;
    const first = evaluateAchievements(s);
    expect(first.filter((u) => u.id === 'wildfire').map((u) => u.tier)).toEqual([1, 2]);
    expect(s.gems).toBe(200 + 10 + 20);
    expect(evaluateAchievements(s)).toEqual([]);
  });

  it('reports progress toward the next tier', () => {
    const s = state();
    s.xp.total = 175;
    const sage = ACHIEVEMENTS.find((a) => a.id === 'sage');
    expect(achievementProgress(s, sage)).toMatchObject({ tier: 1, next: 250, ratio: 0.5 });
  });
});

describe('shop', () => {
  it('buys streak freezes up to the cap', () => {
    const s = state();
    expect(buy(s, 'freeze')).toBe(true);
    expect(buy(s, 'freeze')).toBe(true);
    expect(buy(s, 'freeze')).toBe(false);
    expect(s.streak.freezes).toBe(2);
    expect(s.gems).toBe(80);
  });

  it('refuses a refill when hearts are full and allows it when not', () => {
    const s = state();
    const refill = SHOP_ITEMS.find((i) => i.id === 'refill');
    expect(canBuy(s, refill, 0).ok).toBe(false);
    s.hearts = { count: 1, updatedAt: 0 };
    expect(buy(s, 'refill', 1000)).toBe(true);
    expect(s.hearts.count).toBe(5);
  });

  it('buys and equips a frame once', () => {
    const s = state();
    expect(buy(s, 'frame-gold')).toBe(true);
    expect(s.profile.avatar.frame).toBe('frame-gold');
    expect(buy(s, 'frame-gold')).toBe(false);
  });

  it('checks gem balance', () => {
    const s = state();
    s.gems = 10;
    expect(buy(s, 'freeze')).toBe(false);
  });

  it('pays gems per session', () => {
    expect(sessionGems({ perfect: true })).toBe(10);
    expect(sessionGems({ perfect: false }, { practice: true })).toBe(3);
  });

  it('only takes gems the learner has earned', () => {
    const s = state();
    s.gems = 0;
    for (const item of SHOP_ITEMS) expect(canBuy(s, item, 0)).toMatchObject({ ok: false, reason: 'Not enough gems' });
    expect(SHOP_ITEMS.every((i) => Number.isInteger(i.price) && i.price > 0)).toBe(true);
  });

  it('lists the ways to earn gems from the real numbers', () => {
    const rules = earnRules({ perTier: 10 });
    expect(rules[0]).toEqual({ label: 'Finish a lesson', gems: `+${GEMS.lesson}` });
    expect(rules.map((r) => r.label).join(' ')).toMatch(/Streak milestones \(3 to 365 days\)/);
    expect(rules.at(-1).gems).toBe('+10 per level');
  });
});
