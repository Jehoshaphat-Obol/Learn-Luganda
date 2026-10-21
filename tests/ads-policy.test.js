import { describe, expect, it } from 'vitest';
import { AD_TYPES, LEVELS, POLICY, buildPolicy } from '../src/ads/policy.js';
import { allowAd } from '../src/ads/ads.js';

const MIN = 60_000;
const fresh = { shown: 0, last: 0 };

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
  });

  it('never has a placement inside learning screens', () => {
    for (const level of LEVELS) expect(Object.keys(buildPolicy(level).placements).sort()).toEqual(['complete', 'path', 'stories']);
  });

  it('off allows nothing', () => {
    const policy = buildPolicy('off');
    for (const place of ['path', 'stories', 'complete']) expect(allowAd(place, { sessions: 100, accuracy: 1 }, { policy, log: fresh })).toBe(false);
  });
});

describe('ad rules', () => {
  const policy = buildPolicy('balanced'); // grace 3, cooldown 8, max 6, every 3rd, accuracy 0.6
  const ok = (place, ctx, log = fresh, now = 100 * MIN) => allowAd(place, { sessions: 9, accuracy: 1, ...ctx }, { policy, log, now });

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
    expect(allowAd('stories', { sessions: 10 }, { policy: buildPolicy('gentle'), log: fresh })).toBe(false);
  });
});
