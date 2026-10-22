import { beforeEach, describe, expect, it, vi } from 'vitest';
import { buildPolicy } from '../src/ads/policy.js';
import { grantRewardedGems, rewardedNow } from '../src/ads/ads.js';
import { playRewardedAd, recordRewarded, rewardedConfigured, rewardedLog } from '../src/ads/rewarded.js';
import { store } from '../src/state/store.js';

const MIN = 60_000;
const CONFIG = { client: '', units: {}, rewarded: { unit: '/1234567/learn-luganda-rewarded' } };
const policy = buildPolicy('gentle'); // 3 gems, 5 a day, 3 min apart, grace 1
const NOW = new Date(2026, 9, 22, 12).getTime();
const status = (opts = {}) => rewardedNow({ config: CONFIG, policy, now: NOW, sessions: 4, ...opts });

beforeEach(() => localStorage.clear());

describe('rewarded ad rules', () => {
  it('stay off until an Ad Manager rewarded unit is set', () => {
    expect(rewardedConfigured({ rewarded: { unit: '' } })).toBe(false);
    expect(rewardedConfigured({ rewarded: { unit: 'ca-pub-123' } })).toBe(false);
    expect(rewardedConfigured(CONFIG)).toBe(true);
    expect(status({ config: { rewarded: { unit: '' } } }).rule).toBe('configured');
    expect(status({ policy: buildPolicy('off') }).rule).toBe('enabled');
  });

  it('offer 3 gems after the first session', () => {
    expect(status({ sessions: 0 }).rule).toBe('grace');
    expect(status()).toMatchObject({ show: true, gems: 3, left: 5, perDay: 5 });
  });

  it('keep the cooldown and the daily cap', () => {
    expect(status({ log: { count: 1, last: NOW - 2 * MIN } })).toMatchObject({ show: false, rule: 'cooldown', nextAt: NOW + MIN });
    expect(status({ log: { count: 1, last: NOW - 3 * MIN } }).show).toBe(true);
    expect(status({ log: { count: 5, last: 0 } })).toMatchObject({ show: false, rule: 'dailyCap', left: 0 });
  });

  it('count today only', () => {
    recordRewarded(NOW - 24 * 60 * MIN);
    expect(rewardedLog(NOW).count).toBe(0);
    recordRewarded(NOW);
    expect(rewardedLog(NOW)).toMatchObject({ count: 1, last: NOW });
  });

  it('pay gems, but never past the cap', () => {
    const before = store.get().gems;
    expect(grantRewardedGems({ policy, now: NOW })).toBe(3);
    expect(store.get().gems).toBe(before + 3);
    for (let i = 0; i < 4; i++) grantRewardedGems({ policy, now: NOW + i });
    expect(grantRewardedGems({ policy, now: NOW + 9 })).toBe(0);
    expect(store.get().gems).toBe(before + 15);
  });
});

/** A stand-in for Google's GPT that plays back the events a test asks for. */
function fakeGpt(events, { supported = true } = {}) {
  const listeners = {};
  const slot = { addService: vi.fn() };
  const pubads = {
    addEventListener: (type, fn) => (listeners[type] = fn),
    removeEventListener: vi.fn(),
    setPrivacySettings: vi.fn(),
  };
  const fire = (type, extra = {}) => listeners[type]?.({ slot, ...extra });
  window.googletag = {
    apiReady: true,
    cmd: { push: (fn) => fn() },
    enums: { OutOfPageFormat: { REWARDED: 'rewarded' } },
    defineOutOfPageSlot: () => (supported ? slot : null),
    pubads: () => pubads,
    enableServices: vi.fn(),
    destroySlots: vi.fn(),
    display: () => setTimeout(() => events(fire)),
  };
  return { pubads, gt: window.googletag };
}

describe('playing a rewarded ad', () => {
  it('grants only when Google says the ad was watched', async () => {
    const { gt, pubads } = fakeGpt(async (fire) => {
      await fire('rewardedSlotReady', { makeRewardedVisible: () => {} });
      fire('rewardedSlotGranted');
      fire('rewardedSlotClosed');
    });
    const onGranted = vi.fn();
    await expect(playRewardedAd({ unit: '/1/r', confirm: async () => true, onGranted })).resolves.toBe('granted');
    expect(onGranted).toHaveBeenCalledOnce();
    expect(pubads.setPrivacySettings).toHaveBeenCalledWith({ nonPersonalizedAds: true });
    expect(gt.destroySlots).toHaveBeenCalled();
  });

  it('gives nothing when closed early or declined', async () => {
    fakeGpt(async (fire) => {
      await fire('rewardedSlotReady', { makeRewardedVisible: () => {} });
      fire('rewardedSlotClosed');
    });
    const onGranted = vi.fn();
    await expect(playRewardedAd({ unit: '/1/r', confirm: async () => true, onGranted })).resolves.toBe('closed');
    const visible = vi.fn();
    fakeGpt((fire) => fire('rewardedSlotReady', { makeRewardedVisible: visible }));
    await expect(playRewardedAd({ unit: '/1/r', confirm: async () => false, onGranted })).resolves.toBe('declined');
    expect(visible).not.toHaveBeenCalled();
    expect(onGranted).not.toHaveBeenCalled();
  });

  it('copes with no ad or no support', async () => {
    fakeGpt((fire) => fire('slotRenderEnded', { isEmpty: true }));
    await expect(playRewardedAd({ unit: '/1/r', confirm: async () => true })).resolves.toBe('unavailable');
    fakeGpt(() => {}, { supported: false });
    await expect(playRewardedAd({ unit: '/1/r', confirm: async () => true })).resolves.toBe('unsupported');
    fakeGpt(() => {});
    await expect(playRewardedAd({ unit: '/1/r', confirm: async () => true, timeoutMs: 20 })).resolves.toBe('unavailable');
  });
});
