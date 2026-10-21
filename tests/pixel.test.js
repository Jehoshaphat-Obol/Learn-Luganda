import { beforeEach, describe, expect, it } from 'vitest';
import { askPixelConsent, pixelConfigured, pixelConsent, pixelOnRoute, setPixelConsent, trackPixel } from '../src/marketing/pixel.js';
import { PIXEL } from '../src/marketing/pixel.config.js';

const CONFIG = { id: '123456789012345', enabled: true, events: { pageView: true, signUp: true, lessonComplete: true, streakMilestone: false } };
const app = (path = '/learn') => ({ path, route: { path } });
const bare = (path) => ({ path, route: { path, layout: 'bare' } });
const script = () => document.querySelector('script[src*="connect.facebook.net"]');
const card = () => document.querySelector('[data-consent-for="pixel"]');
const calls = () => window.fbq.queue.map((args) => args.slice(0, 2).join(' '));

beforeEach(() => {
  localStorage.clear();
  document.head.innerHTML = '';
  document.body.innerHTML = '';
});

describe('meta pixel config', () => {
  it('ships switched off, with every event listed', () => {
    expect(PIXEL.id).toBe('');
    expect(pixelConfigured()).toBe(false);
    expect(Object.keys(PIXEL.events)).toEqual(['pageView', 'signUp', 'lessonComplete', 'streakMilestone']);
    expect(Object.isFrozen(PIXEL)).toBe(true);
  });

  it('needs a numeric ID and the enabled switch', () => {
    expect(pixelConfigured(CONFIG)).toBe(true);
    expect(pixelConfigured({ ...CONFIG, id: ' 123456789012345 ' })).toBe(true);
    expect(pixelConfigured({ ...CONFIG, id: 'YOUR_PIXEL_ID' })).toBe(false);
    expect(pixelConfigured({ ...CONFIG, enabled: false })).toBe(false);
  });
});

describe('meta pixel consent', () => {
  it('does nothing at all while unconfigured', () => {
    pixelOnRoute(app(), PIXEL);
    expect(card()).toBeNull();
    expect(trackPixel('pageView', undefined, PIXEL)).toBe(false);
    expect(script()).toBeNull();
  });

  it('asks on app screens and loads nothing before the learner answers', () => {
    pixelOnRoute(app(), CONFIG);
    expect(card()).not.toBeNull();
    expect(trackPixel('lessonComplete', {}, CONFIG)).toBe(false);
    expect(script()).toBeNull();
  });

  it('never asks inside lessons, and hides the card there', () => {
    pixelOnRoute(app(), CONFIG);
    pixelOnRoute(bare('/lesson/u1s1l1'), CONFIG);
    expect(card()).toBeNull();
    pixelOnRoute(bare('/'), CONFIG);
    expect(card()).not.toBeNull();
  });

  it('waits while the ad consent card is showing', () => {
    document.body.innerHTML = '<section class="consent" data-consent-for="ads"></section>';
    pixelOnRoute(app(), CONFIG);
    expect(card()).toBeNull();
  });

  it('loads the pixel on Allow and counts the screen', async () => {
    const choice = askPixelConsent(CONFIG);
    document.querySelector('[data-pixel-consent="granted"]').click();
    expect(await choice).toBe('granted');
    expect(pixelConsent()).toBe('granted');
    expect(card()).toBeNull();
    expect(script()).not.toBeNull();
    expect(calls()).toEqual(['consent grant', 'init 123456789012345', 'track PageView']);
  });

  it('sends only switched-on events once allowed', () => {
    setPixelConsent('granted', CONFIG);
    expect(trackPixel('signUp', {}, CONFIG)).toBe(true);
    expect(trackPixel('lessonComplete', { kind: 'lesson', xp: 10 }, CONFIG)).toBe(true);
    expect(trackPixel('streakMilestone', { days: 7 }, CONFIG)).toBe(false);
    expect(calls()).toContain('track CompleteRegistration');
    expect(calls()).toContain('trackCustom LessonComplete');
    pixelOnRoute(app('/shop'), CONFIG);
    expect(card()).toBeNull();
  });

  it('stops sending after No thanks or switching it off', () => {
    setPixelConsent('granted', CONFIG);
    setPixelConsent('denied', CONFIG);
    expect(calls()).toContain('consent revoke');
    expect(trackPixel('pageView', undefined, CONFIG)).toBe(false);
    pixelOnRoute(app(), CONFIG);
    expect(card()).toBeNull();
  });
});
