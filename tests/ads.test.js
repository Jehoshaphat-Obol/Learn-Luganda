import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { adConsent, adSlot, adsConfigured, changeAdConsent, mountAds } from '../src/ads/ads.js';

const CONFIG = {
  client: 'ca-pub-1234567890123456',
  placements: {
    feed: { slot: '1111111111', format: 'fluid', layoutKey: '-fb+5w+4e-db+86' },
    complete: { slot: '2222222222', format: 'auto' },
  },
};

beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = '';
});
afterEach(() => {
  Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
});

describe('ad slots', () => {
  it('stay off until a publisher ID and slot are set', () => {
    expect(adsConfigured('feed')).toBe(false);
    expect(adSlot('feed')).toBe('');
    expect(adsConfigured('feed', { ...CONFIG, client: 'ca-pub-XXXX' })).toBe(false);
    expect(adSlot('complete', { ...CONFIG, placements: { ...CONFIG.placements, complete: { slot: '' } } })).toBe('');
  });

  it('render as a labelled card with an in-feed unit', () => {
    const html = adSlot('feed', CONFIG);
    expect(html).toContain('Sponsored');
    expect(html).toContain('data-ad-client="ca-pub-1234567890123456"');
    expect(html).toContain('data-ad-format="fluid"');
    expect(html).toContain('data-ad-layout-key="-fb+5w+4e-db+86"');
  });

  it('render nothing offline', () => {
    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    expect(adSlot('feed', CONFIG)).toBe('');
  });
});

describe('consent', () => {
  it('asks before loading ads, then remembers the choice', async () => {
    document.body.innerHTML = `<div id="v">${adSlot('feed', CONFIG)}</div>`;
    const root = document.querySelector('#v');
    mountAds(root, { config: CONFIG });
    expect(document.querySelector('.consent')).not.toBeNull();
    expect(document.querySelector('script[src*="adsbygoogle"]')).toBeNull();
    document.querySelector('[data-consent="denied"]').click();
    expect(adConsent()).toBe('denied');
    expect(document.querySelector('.consent')).toBeNull();
    await Promise.resolve();
    expect(document.querySelector('script[src*="adsbygoogle.js?client=ca-pub-1234567890123456"]')).not.toBeNull();
  });

  it('drops the card instead of asking when asking is off', () => {
    document.body.innerHTML = `<div id="v">${adSlot('complete', CONFIG)}</div>`;
    mountAds(document.querySelector('#v'), { ask: false, config: CONFIG });
    expect(document.querySelector('.consent')).toBeNull();
    expect(document.querySelector('[data-ad]')).toBeNull();
  });

  it('loads AdSense once a choice exists, non-personalised unless allowed', () => {
    changeAdConsent('denied');
    document.body.innerHTML = `<div id="v">${adSlot('feed', CONFIG)}</div>`;
    mountAds(document.querySelector('#v'), { config: CONFIG });
    expect(document.querySelectorAll('script[src*="adsbygoogle"]')).toHaveLength(1);
    expect(window.adsbygoogle.requestNonPersonalizedAds).toBe(1);
    changeAdConsent('granted');
    expect(window.adsbygoogle.requestNonPersonalizedAds).toBe(0);
  });
});
