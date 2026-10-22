import { describe, expect, it } from 'vitest';
import { AD_TYPES, LEVELS, POLICY, buildPolicy } from '../src/ads/policy.js';
import { allowAd, decideAd } from '../src/ads/ads.js';

const MIN = 60_000;
const fresh = { shown: 0, last: 0 };
const config = {
  client: 'ca-pub-1234567890123456',
  units: { inFeed: { slot: '1111111111', format: 'fluid' }, display: { slot: '2222222222', format: 'auto' } },
  rewarded: { unit: '/1234567/rewarded' },
};

describe('ad policy', () => {
  it('is frozen all the way down', () => {
    expect(Object.isFrozen(POLICY)).toBe(true);
    expect(Object.isFrozen(POLICY.placements)).toBe(true);
    expect(Object.isFrozen(POLICY.placements.path)).toBe(true);
    expect(() => {
      'use strict';
      POLICY.maxPerDay = 99;
    }).toThrow(TypeError);
    expect(POLICY.maxPerDay).not.toBe(99);
  });

  it.each(LEVELS.filter((l) => l !== 'off'))('%s stays within safe bounds', (level) => {
    const p = buildPolicy(level);
    expect(p.graceSessions).toBeGreaterThanOrEqual(1);
    expect(p.cooldownMinutes).toBeGreaterThanOrEqual(3);
    expect(p.maxPerDay).toBeLessThanOrEqual(12);
    expect(p.everyNthSession).toBeGreaterThanOrEqual(2);
    expect(p.minAccuracy).toBeGreaterThanOrEqual(0.5);
    for (const rule of Object.values(p.placements)) expect(Object.values(AD_TYPES)).toContain(rule.type);
    expect(p.adBreak.hours).toBeGreaterThanOrEqual(6);
    expect(p.adBreak.perWeek).toBeGreaterThanOrEqual(1);
    expect(p.adBreak.streakHours).toBeGreaterThanOrEqual(p.adBreak.hours);
    // Rewarded ads: a small, capped top-up, never a gem fountain.
    expect(p.rewarded.gems).toBeGreaterThanOrEqual(2);
    expect(p.rewarded.gems).toBeLessThanOrEqual(5);
    expect(p.rewarded.perDay).toBeLessThanOrEqual(8);
    expect(p.rewarded.gems * p.rewarded.perDay).toBeLessThanOrEqual(30);
    expect(p.rewarded.cooldownMinutes).toBeGreaterThanOrEqual(2);
    expect(p.rewarded.graceSessions).toBeGreaterThanOrEqual(1);
    expect(p.rewarded.quietMinutes).toBeGreaterThanOrEqual(10);
  });

  it('never has a placement inside learning screens', () => {
    for (const level of LEVELS) expect(Object.keys(buildPolicy(level).placements).sort()).toEqual(['complete', 'path', 'stories']);
  });

  it('off allows nothing', () => {
    const policy = buildPolicy('off');
    for (const place of ['path', 'stories', 'complete']) expect(allowAd(place, { sessions: 100, accuracy: 1 }, { policy, config, log: fresh })).toBe(false);
  });
});

describe('ad rules', () => {
  const policy = buildPolicy('balanced'); // grace 3, cooldown 8, max 6, every 3rd, accuracy 0.6
  const ok = (place, ctx, log = fresh, now = 100 * MIN) => allowAd(place, { sessions: 9, accuracy: 1, ...ctx }, { policy, config, log, now, breakUntil: 0, rewardedLast: 0 });

  it('waits out the grace period', () => {
    expect(ok('path', { sessions: 2 })).toBe(false);
    expect(ok('path', { sessions: 3 })).toBe(true);
  });

  it('keeps the cooldown and daily cap', () => {
    expect(ok('path', {}, { shown: 1, last: 95 * MIN })).toBe(false);
    expect(ok('path', {}, { shown: 1, last: 90 * MIN })).toBe(true);
    expect(ok('path', {}, { shown: 6, last: 0 })).toBe(false);
  });

  it('shows complete-screen ads every Nth session, and not after a hard one', () => {
    expect(ok('complete', { sessions: 9 })).toBe(true);
    expect(ok('complete', { sessions: 10 })).toBe(false);
    expect(ok('complete', { sessions: 9, accuracy: 0.5 })).toBe(false);
  });

  it('respects disabled placements', () => {
    expect(allowAd('stories', { sessions: 10 }, { policy: buildPolicy('gentle'), config, log: fresh })).toBe(false);
  });
});

describe('ad rule engine', () => {
  const policy = buildPolicy('balanced');
  const why = (place, ctx = {}, deps = {}) => decideAd(place, { sessions: 9, accuracy: 1, ...ctx }, { policy, config, log: fresh, now: 100 * MIN, breakUntil: 0, rewardedLast: 0, ...deps }).rule;

  it('names the rule that said no', () => {
    expect(why('path')).toBe(null);
    expect(why('path', {}, { config: { ...config, client: '' } })).toBe('configured');
    expect(why('nowhere')).toBe('configured');
    expect(why('path', {}, { breakUntil: 200 * MIN })).toBe('adBreak');
    expect(why('path', { sessions: 1 })).toBe('grace');
    expect(why('path', {}, { log: { shown: 6, last: 0 } })).toBe('dailyCap');
    expect(why('path', {}, { log: { shown: 1, last: 99 * MIN } })).toBe('cooldown');
    expect(why('complete', { sessions: 10 })).toBe('everyNthSession');
    expect(why('complete', { accuracy: 0.3 })).toBe('minAccuracy');
  });

  it('runs rules in order: the first to say no wins', () => {
    expect(why('path', { sessions: 1 }, { breakUntil: 200 * MIN })).toBe('adBreak');
  });

  it('keeps sponsored cards away for a while after a rewarded ad', () => {
    expect(why('path', {}, { rewardedLast: 90 * MIN })).toBe('afterRewarded'); // quiet 20 min
    expect(why('path', {}, { rewardedLast: 79 * MIN })).toBe(null);
  });
});
