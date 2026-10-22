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
import { adBreakStatus, adBreakUntil, takeAdBreak } from './breaks.js';
import { PLACEMENT_RULES, REWARDED_RULES, decide } from './rules.js';
import { playRewardedAd, recordRewarded, rewardedConfigured, rewardedLog } from './rewarded.js';
import { play } from '../ui/sound.js';
import { t, tHtml, currentLanguage } from '../i18n/index.js';
import { store } from '../state/store.js';
import { streakStatus } from '../state/streak.js';
import { MASCOT_NAME } from '../app/brand.js';
import { mascot } from '../illustrations/index.js';
import { escapeHtml, openModal, toast } from '../ui/components.js';

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
 * Decides whether a sponsored card may show in `placement`, by running the
 * rules in `rules.js`. `context.sessions` is the number of finished
 * sessions; `context.accuracy` the accuracy of the one just finished (for
 * the complete placement). Returns `{ show, rule }`, where `rule` names the
 * rule that said no.
 */
export function decideAd(
  placement,
  context = {},
  { config = ADS, policy = POLICY, log = adLog(), now = Date.now(), breakUntil = adBreakUntil(now), rewardedLast = rewardedLog(now).last } = {},
) {
  const type = policy.placements[placement]?.type;
  return decide(
    PLACEMENT_RULES,
    {
      placement,
      configured: Boolean(type) && adsConfigured(type, config),
      online: online(),
      sessions: context.sessions ?? sessionsDone(),
      accuracy: context.accuracy,
      breakUntil,
      log,
      rewardedLast,
      now,
    },
    policy,
  );
}

/** True when `decideAd` says the card may show. */
export const allowAd = (placement, context, deps) => decideAd(placement, context, deps).show;

/** The HTML for one ad card, or '' when the policy, config or network says no. */
export function adSlot(placement, context = {}, { config = ADS, policy = POLICY, log, now } = {}) {
  if (!allowAd(placement, context, { config, policy, log, now })) return '';
  const u = config.units[policy.placements[placement].type];
  const layout = u.format === 'fluid' && u.layoutKey ? ` data-ad-layout-key="${escapeHtml(u.layoutKey)}"` : '';
  const format = u.format === 'fluid' && !u.layoutKey ? 'auto' : u.format;
  return `<aside class="ad-card ad-card--${placement}" data-ad aria-label="${escapeHtml(t('ads.sponsored'))}">
    <header class="ad-card__head">
      <span class="ad-card__label">${escapeHtml(t('ads.sponsored'))}</span>
      <a class="ad-card__about" href="#/privacy">${escapeHtml(t('ads.about'))}</a>
      ${policy.adBreak.perWeek ? `<button class="ad-card__break" type="button" data-ad-break aria-label="${escapeHtml(t('ads.cardButtonLabel'))}">${escapeHtml(t('ads.cardButton'))}</button>` : ''}
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

export const dismissConsent = () => document.querySelector('[data-consent-for="ads"]')?.remove();

/** A small card asking how ads may use data. Resolves with the choice. */
export function askForConsent() {
  dismissConsent();
  return new Promise((resolve) => {
    const el = document.createElement('section');
    el.className = 'consent';
    el.dataset.consentFor = 'ads';
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', t('ads.consent.label'));
    el.innerHTML = `
      <p>${tHtml('ads.consent.text', { app: t('app.name') })}</p>
      <div class="consent__actions">
        <button class="btn btn--secondary" type="button" data-consent="denied">${escapeHtml(t('ads.consent.deny'))}</button>
        <button class="btn" type="button" data-consent="granted">${escapeHtml(t('ads.consent.allow'))}</button>
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

const timeLabel = (time) => new Date(time).toLocaleString(currentLanguage(), { weekday: 'long', hour: 'numeric', minute: '2-digit' });

/** "a whole day", "two whole days" or "6 hours". */
export function duration(hours) {
  if (hours === 24) return t('ads.duration.day');
  if (hours === 48) return t('ads.duration.twoDays');
  return t('ads.duration.hours', { count: hours });
}
const currentStreak = () => streakStatus(store.get()).current;

/** The learner's ad-break standing, for Settings. */
export const adBreakNow = (policy = POLICY) => adBreakStatus({ streak: currentStreak(), policy });
export { timeLabel as adBreakTime };

/**
 * The crane offers an ad break (or explains when the next one comes).
 * Resolves with when the break ends, or 0 if none was taken.
 */
export async function offerAdBreak({ policy = POLICY } = {}) {
  const streak = currentStreak();
  const status = adBreakStatus({ streak, policy });
  if (status.active) return status.until;
  if (!status.available) {
    await openModal({
      title: t('ads.none.title'),
      art: mascot({ pose: 'thinking' }),
      body: `<p>${escapeHtml(t('ads.none.body', { perWeek: policy.adBreak.perWeek, when: timeLabel(status.nextAt) }))}</p>`,
      actions: [{ label: t('ads.none.ok'), value: 'ok' }],
    });
    return 0;
  }
  const body = [
    t('ads.offer.body', { mascot: MASCOT_NAME, duration: duration(status.hours) }),
    status.streakBonus ? t('ads.offer.streak', { streak }) : '',
    t('ads.offer.left', { left: status.left }),
  ].filter(Boolean);
  const choice = await openModal({
    title: t('ads.offer.title'),
    art: mascot({ pose: 'happy' }),
    body: body.map((p) => `<p>${escapeHtml(p)}</p>`).join(''),
    actions: [
      { label: t('ads.offer.no'), value: 'no', variant: 'secondary' },
      { label: t('ads.offer.yes'), value: 'yes' },
    ],
  });
  if (choice !== 'yes') return 0;
  const until = takeAdBreak({ streak, policy });
  if (until) {
    removeAll(document);
    toast(t('ads.done', { time: timeLabel(until) }));
  }
  return until;
}

/**
 * Where the learner stands on rewarded ads: whether one can be watched now
 * (`show`, and the `rule` that says no otherwise), the gems per ad, how many
 * are left today and when the next is possible.
 */
export function rewardedNow({ config = ADS, policy = POLICY, now = Date.now(), log = rewardedLog(now), sessions = sessionsDone() } = {}) {
  const rule = policy.rewarded;
  const decision = decide(REWARDED_RULES, { configured: rewardedConfigured(config), online: online(), sessions, rewarded: log, now }, policy);
  return {
    ...decision,
    gems: rule.gems,
    perDay: rule.perDay,
    left: Math.max(0, rule.perDay - log.count),
    nextAt: decision.rule === 'cooldown' ? log.last + rule.cooldownMinutes * 60_000 : 0,
  };
}

/** Pays the gems for a rewarded ad, if today's cap still has room. */
export function grantRewardedGems({ policy = POLICY, now = Date.now() } = {}) {
  if (rewardedLog(now).count >= policy.rewarded.perDay) return 0;
  recordRewarded(now);
  store.update((s) => {
    s.gems += policy.rewarded.gems;
  });
  return policy.rewarded.gems;
}

const REWARDED_REASONS = { grace: 'grace', dailyCap: 'dailyCap', cooldown: 'cooldown', online: 'offline' };

/**
 * The learner asked to watch an ad for gems. Asks for ad consent first if
 * they haven't chosen, finds an ad, lets them confirm, and pays out only
 * once Google says the ad was watched. Resolves with the gems earned.
 */
export async function offerRewardedAd({ policy = POLICY } = {}) {
  const status = rewardedNow({ policy });
  if (!status.show) {
    const why = REWARDED_REASONS[status.rule] ?? 'unavailable';
    toast(t(`ads.rewarded.why.${why}`, { perDay: status.perDay, time: timeOfDay(status.nextAt) }));
    return 0;
  }
  if (!adConsent()) await askForConsent();
  toast(t('ads.rewarded.finding'));
  let earned = 0;
  const result = await playRewardedAd({
    personalised: adConsent() === 'granted',
    confirm: async () =>
      (await openModal({
        title: t('ads.rewarded.ready.title'),
        art: mascot({ pose: 'happy' }),
        body: `<p>${escapeHtml(t('ads.rewarded.ready.body', { mascot: MASCOT_NAME, gems: status.gems }))}</p>`,
        actions: [
          { label: t('ads.rewarded.ready.no'), value: 'no', variant: 'secondary' },
          { label: t('ads.rewarded.ready.yes', { gems: status.gems }), value: 'yes' },
        ],
      })) === 'yes',
    onGranted: () => {
      earned = grantRewardedGems({ policy });
    },
  });
  if (earned) {
    play('reward');
    toast(t('ads.rewarded.earned', { gems: earned }), { variant: 'success' });
  } else if (result === 'closed') {
    toast(t('ads.rewarded.closed'));
  } else if (result !== 'declined') {
    toast(t('ads.rewarded.why.unavailable'));
  }
  return earned;
}

const timeOfDay = (time) => (time ? new Date(time).toLocaleTimeString(currentLanguage(), { hour: 'numeric', minute: '2-digit' }) : '');
export { timeOfDay as rewardedTime };

if (typeof window !== 'undefined') {
  // Going offline mid-visit: take any ad cards away rather than leave holes.
  window.addEventListener('offline', () => removeAll(document));
  document.addEventListener('click', (e) => {
    if (e.target.closest?.('[data-ad-break]')) offerAdBreak();
  });
}
