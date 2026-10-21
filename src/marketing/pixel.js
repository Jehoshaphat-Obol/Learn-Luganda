/*
 * Optional Meta (Facebook) Pixel. Off until `pixel.config.js` holds a Pixel
 * ID, and even then nothing from Meta loads until the learner taps Allow on
 * the pixel's own consent card. Only screen views and a few learning
 * milestones are sent, never names or answers. The card never appears on
 * lessons, practice, stories or tests, and waits while the ad card is up.
 */
import '../styles/ads.css';
import { PIXEL } from './pixel.config.js';
import { t, tHtml } from '../i18n/index.js';
import { escapeHtml } from '../ui/components.js';

const KEY = 'learn-luganda:pixel-consent';
const ID_RE = /^\d{10,20}$/;
// Screens where the card may appear: the landing page and the app frame.
const ASK_ON = (match) => match.path === '/' || (match.route.layout ?? 'app') === 'app';
// Standard Meta events use `track`; the rest are custom.
const STANDARD = { pageView: 'PageView', signUp: 'CompleteRegistration' };
const CUSTOM = { lessonComplete: 'LessonComplete', streakMilestone: 'StreakMilestone' };

let loaded = false;

/** True when the config has a valid ID and the pixel is switched on. */
export function pixelConfigured(config = PIXEL) {
  return Boolean(config.enabled) && ID_RE.test(String(config.id).trim());
}

/** 'granted', 'denied', or null when the learner hasn't been asked. */
export function pixelConsent() {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

const allowed = (config) => pixelConfigured(config) && pixelConsent() === 'granted';

/** Meta's base snippet, written out so it can be loaded on demand. */
function loadPixel(config) {
  if (loaded) return;
  loaded = true;
  if (!window.fbq) {
    const fbq = function (...args) {
      fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq ??= fbq;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.append(s);
  }
  window.fbq('consent', 'grant');
  window.fbq('init', String(config.id).trim());
}

/**
 * Sends one event if the pixel is configured, consented to and that event
 * is switched on. Returns whether it was sent.
 */
export function trackPixel(name, data, config = PIXEL) {
  if (!allowed(config) || !config.events?.[name]) return false;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return false;
  loadPixel(config);
  if (STANDARD[name]) window.fbq('track', STANDARD[name], data);
  else if (CUSTOM[name]) window.fbq('trackCustom', CUSTOM[name], data);
  else return false;
  return true;
}

/** Records the learner's choice; granting counts the current screen. */
export function setPixelConsent(choice, config = PIXEL) {
  try {
    localStorage.setItem(KEY, choice);
  } catch {
    // Storage blocked: the choice holds for this visit only.
  }
  if (choice === 'granted') trackPixel('pageView', undefined, config);
  else if (loaded && window.fbq) window.fbq('consent', 'revoke');
}

export const dismissPixelConsent = () => document.querySelector('[data-consent-for="pixel"]')?.remove();

/** The pixel's consent card. Resolves with the learner's choice. */
export function askPixelConsent(config = PIXEL) {
  dismissPixelConsent();
  return new Promise((resolve) => {
    const el = document.createElement('section');
    el.className = 'consent';
    el.dataset.consentFor = 'pixel';
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', t('pixel.label'));
    el.innerHTML = `
      <p>${tHtml('pixel.text', { app: t('app.name') })}</p>
      <div class="consent__actions">
        <button class="btn btn--secondary" type="button" data-pixel-consent="denied">${escapeHtml(t('pixel.deny'))}</button>
        <button class="btn" type="button" data-pixel-consent="granted">${escapeHtml(t('pixel.allow'))}</button>
      </div>`;
    el.addEventListener('click', (e) => {
      const choice = e.target.closest('[data-pixel-consent]')?.dataset.pixelConsent;
      if (!choice) return;
      setPixelConsent(choice, config);
      el.remove();
      resolve(choice);
    });
    document.body.append(el);
  });
}

/**
 * Runs after each screen renders: counts the view, or offers the consent
 * card on a suitable screen while no other consent card is showing.
 */
export function pixelOnRoute(match, config = PIXEL) {
  if (!pixelConfigured(config)) return;
  if (pixelConsent()) {
    trackPixel('pageView', undefined, config);
    return;
  }
  if (!ASK_ON(match)) {
    dismissPixelConsent();
    return;
  }
  // One card at a time: the ad card, when a screen shows one, goes first.
  if (document.querySelector('[data-consent-for="ads"]')) {
    dismissPixelConsent();
    return;
  }
  if (!document.querySelector('[data-consent-for="pixel"]')) askPixelConsent(config);
}
