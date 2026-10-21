/*
 * Native-style ad slots. Each slot is a card in the app's own paper style,
 * plainly labelled "Sponsored", that sits between pieces of content the way
 * a sponsored post sits in a feed. Slots only render when AdSense is
 * configured, the device is online and the ad policy (`policy.js`) allows
 * one; a slot that gets no ad collapses so
 * the page never shows an empty box. Ads are never placed inside lessons,
 * practice or stories being read.
 */
import '../styles/ads.css';
import { ADS } from './config.js';
import { POLICY } from './policy.js';
import { adLog, recordAdShown } from './log.js';
import { adConsent, setAdConsent } from './consent.js';
import { store } from '../state/store.js';
import { escapeHtml } from '../ui/components.js';

export { adConsent };

const CLIENT_RE = /^ca-pub-\d{10,20}$/;
let scriptPromise = null;

/** True when a publisher ID is set and the given ad type (or any) has a slot. */
export function adsConfigured(type, config = ADS) {
  if (!CLIENT_RE.test(config.client)) return false;
  return type ? Boolean(config.units[type]?.slot) : Object.values(config.units).some((u) => u.slot);
}

const online = () => typeof navigator === 'undefined' || navigator.onLine !== false;

/** Lessons and sessions finished so far, from saved progress. */
const sessionsDone = () => Object.values(store.get().lessons ?? {}).reduce((n, l) => n + (l.completions || 0), 0);

/**
 * Applies the ad policy. `context.sessions` is the number of finished
 * sessions; `context.accuracy` the accuracy of the one just finished (for
 * the complete placement). Returns false whenever any rule says no.
 */
export function allowAd(placement, context = {}, { policy = POLICY, log = adLog(), now = Date.now() } = {}) {
  const rule = policy.placements[placement];
  if (!rule?.enabled) return false;
  const sessions = context.sessions ?? sessionsDone();
  if (sessions < policy.graceSessions) return false;
  if (log.shown >= policy.maxPerDay) return false;
  if (log.last && now - log.last < policy.cooldownMinutes * 60_000) return false;
  if (placement === 'complete') {
    if (sessions % policy.everyNthSession !== 0) return false;
    if ((context.accuracy ?? 1) < policy.minAccuracy) return false;
  }
  return true;
}

/** The HTML for one ad card, or '' when the policy, config or network says no. */
export function adSlot(placement, context = {}, { config = ADS, policy = POLICY, log, now } = {}) {
  const type = policy.placements[placement]?.type;
  if (!type || !adsConfigured(type, config) || !online()) return '';
  if (!allowAd(placement, context, { policy, log, now })) return '';
  const u = config.units[type];
  const layout = u.format === 'fluid' && u.layoutKey ? ` data-ad-layout-key="${escapeHtml(u.layoutKey)}"` : '';
  const format = u.format === 'fluid' && !u.layoutKey ? 'auto' : u.format;
  return `<aside class="ad-card ad-card--${placement}" data-ad aria-label="Sponsored">
    <header class="ad-card__head">
      <span class="ad-card__label">Sponsored</span>
      <a class="ad-card__about" href="#/privacy">About ads</a>
    </header>
    <ins class="adsbygoogle ad-card__unit" style="display:block" data-ad-client="${escapeHtml(config.client)}" data-ad-slot="${escapeHtml(u.slot)}" data-ad-format="${format}"${layout}${format === 'auto' ? ' data-full-width-responsive="true"' : ''}></ins>
  </aside>`;
}

function loadScript(config) {
  window.adsbygoogle = window.adsbygoogle || [];
  // Without consent to personalise, ask Google for non-personalised ads.
  window.adsbygoogle.requestNonPersonalizedAds = adConsent() === 'granted' ? 0 : 1;
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(config.client)}`;
    s.onload = resolve;
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error('Ads blocked or offline'));
    };
    document.head.append(s);
  });
  return scriptPromise;
}

const removeAll = (root) => root.querySelectorAll('[data-ad]').forEach((el) => el.remove());

/** Shows a card only once AdSense fills it; drops it if no ad comes. */
function watch(card) {
  const unit = card.querySelector('ins');
  const apply = () => {
    const status = unit.getAttribute('data-ad-status');
    if (status === 'filled' && !card.classList.contains('is-filled')) {
      card.classList.add('is-filled');
      recordAdShown();
    }
    else if (status === 'unfilled') card.remove();
  };
  new MutationObserver(apply).observe(unit, { attributes: true, attributeFilter: ['data-ad-status'] });
  apply();
}

function fill(root, config) {
  const cards = [...root.querySelectorAll('[data-ad]')];
  if (!cards.length) return;
  loadScript(config)
    .then(() => {
      for (const card of cards) {
        if (!card.isConnected) continue;
        watch(card);
        try {
          window.adsbygoogle.push({});
        } catch {
          card.remove();
        }
      }
    })
    .catch(() => removeAll(root));
}

/** Records a new ad choice; later ad requests follow it. */
export function changeAdConsent(choice) {
  setAdConsent(choice);
  if (window.adsbygoogle) window.adsbygoogle.requestNonPersonalizedAds = choice === 'granted' ? 0 : 1;
}

export const dismissConsent = () => document.querySelector('.consent')?.remove();

/** A small card asking how ads may use data. Resolves with the choice. */
export function askForConsent() {
  dismissConsent();
  return new Promise((resolve) => {
    const el = document.createElement('section');
    el.className = 'consent';
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', 'Ad choices');
    el.innerHTML = `
      <p><strong>Ads keep Learn Luganda free.</strong> May our ad partner, Google, use cookies to show ads that suit you? Your lessons and progress never leave this device. <a href="#/privacy">Privacy policy</a></p>
      <div class="consent__actions">
        <button class="btn btn--secondary" type="button" data-consent="denied">Basic ads only</button>
        <button class="btn" type="button" data-consent="granted">Allow</button>
      </div>`;
    el.addEventListener('click', (e) => {
      const choice = e.target.closest('[data-consent]')?.dataset.consent;
      if (!choice) return;
      changeAdConsent(choice);
      el.remove();
      resolve(choice);
    });
    document.body.append(el);
  });
}

/**
 * Loads ads into the slots under `root`. With `ask`, a visitor who hasn't
 * chosen yet sees the consent card first; without it (e.g. on the lesson
 * complete screen, next to Continue) undecided visitors just get no ad.
 * Returns a cleanup that takes the consent card away on navigation.
 */
export function mountAds(root, { ask = true, config = ADS } = {}) {
  if (!root.querySelector('[data-ad]')) return dismissConsent;
  if (adConsent()) {
    fill(root, config);
  } else if (ask) {
    askForConsent().then(() => fill(root, config));
  } else {
    removeAll(root);
  }
  return dismissConsent;
}

// Going offline mid-visit: take any ad cards away rather than leave holes.
if (typeof window !== 'undefined') {
  window.addEventListener('offline', () => removeAll(document));
}
