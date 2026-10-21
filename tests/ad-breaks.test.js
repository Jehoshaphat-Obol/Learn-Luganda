import { beforeEach, describe, expect, it } from 'vitest';
import { adBreakStatus, adBreakUntil, endAdBreak, takeAdBreak } from '../src/ads/breaks.js';
import { buildPolicy } from '../src/ads/policy.js';
import { allowAd } from '../src/ads/ads.js';

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const policy = buildPolicy('gentle'); // 24 h, 3 a week, 48 h from a 7 day streak
const T0 = Date.UTC(2026, 9, 21, 12);

beforeEach(() => localStorage.clear());

describe('ad breaks', () => {
  it('pause ads for the policy length, longer with a streak', () => {
    expect(takeAdBreak({ now: T0, policy })).toBe(T0 + DAY);
    expect(adBreakUntil(T0 + DAY - 1)).toBe(T0 + DAY);
    expect(adBreakUntil(T0 + DAY)).toBe(0);
    expect(allowAd('path', { sessions: 50 }, { policy, log: { shown: 0, last: 0 }, now: T0 + HOUR })).toBe(false);
    expect(allowAd('path', { sessions: 50 }, { policy, log: { shown: 0, last: 0 }, now: T0 + DAY })).toBe(true);
    expect(takeAdBreak({ streak: 7, now: T0 + 2 * DAY, policy })).toBe(T0 + 4 * DAY);
  });

  it("can't stack while one is running", () => {
    takeAdBreak({ now: T0, policy });
    expect(takeAdBreak({ now: T0 + HOUR, policy })).toBe(0);
  });

  it('allow a few per rolling week, then say when the next frees up', () => {
    for (let i = 0; i < 3; i++) expect(takeAdBreak({ now: T0 + i * 2 * DAY, policy })).toBeGreaterThan(0);
    const s = adBreakStatus({ now: T0 + 6 * DAY, policy });
    expect(s.left).toBe(0);
    expect(s.available).toBe(false);
    expect(s.nextAt).toBe(T0 + 7 * DAY);
    expect(adBreakStatus({ now: T0 + 7 * DAY, policy }).available).toBe(true);
  });

  it('ending early brings ads back but still counts', () => {
    takeAdBreak({ now: T0, policy });
    endAdBreak();
    expect(adBreakUntil(T0 + HOUR)).toBe(0);
    expect(adBreakStatus({ now: T0 + HOUR, policy }).left).toBe(2);
  });

  it('are off when the policy is off', () => {
    expect(takeAdBreak({ now: T0, policy: buildPolicy('off') })).toBe(0);
  });
});
