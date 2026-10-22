/*
 * Rewarded ads: the learner chooses to watch an ad and earns gems for it.
 *
 * AdSense can't do this. Its policies forbid paying people to view ordinary
 * ads; only Google's rewarded inventory may carry a reward, and on the web
 * that comes from Google Ad Manager's rewarded format, loaded with the
 * Google Publisher Tag (GPT). GPT runs in the browser, so it works on a
 * static site. Gems are granted only when GPT fires `rewardedSlotGranted`,
 * which it does once the ad has been watched; closing early earns nothing.
 *
 * The count of rewarded ads today and the time of the last one are kept on
 * this device, beside the ad log, so the policy's daily cap and cooldown
 * hold across visits.
 */
import { ADS } from './config.js';
import { dayKey } from '../state/dates.js';

const KEY = 'learn-luganda:ads-rewarded';
const UNIT_RE = /^\/\d+(\/[\w.-]+)+$/;
const GPT_SRC = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';

/** True when an Ad Manager rewarded unit path is set. */
export const rewardedConfigured = (config = ADS) => UNIT_RE.test(config.rewarded?.unit ?? '');

export function rewardedLog(now = Date.now()) {
  const today = dayKey(new Date(now));
  try {
    const log = JSON.parse(localStorage.getItem(KEY)) ?? {};
    return { day: today, count: log.day === today ? Number(log.count) || 0 : 0, last: Number(log.last) || 0 };
  } catch {
    return { day: today, count: 0, last: 0 };
  }
}

export function recordRewarded(now = Date.now()) {
  const log = rewardedLog(now);
  try {
    localStorage.setItem(KEY, JSON.stringify({ day: log.day, count: log.count + 1, last: now }));
  } catch {
    // Storage blocked: limits reset with the page.
  }
}

let gptPromise = null;

function loadGpt() {
  window.googletag = window.googletag || { cmd: [] };
  if (window.googletag.apiReady || gptPromise) return gptPromise ?? Promise.resolve();
  gptPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.src = GPT_SRC;
    s.onload = resolve;
    s.onerror = () => {
      gptPromise = null;
      reject(new Error('Ads blocked or offline'));
    };
    document.head.append(s);
  });
  return gptPromise;
}

/**
 * Requests one rewarded ad and plays it if the learner agrees.
 *
 * `confirm()` is asked once the ad is ready (resolve true to watch);
 * `onGranted()` runs the moment GPT grants the reward, before the ad is
 * closed. Resolves with 'granted', 'closed' (stopped early), 'declined',
 * 'unavailable' (no ad came) or 'unsupported' (GPT won't serve rewarded
 * ads on this page or device).
 */
export function playRewardedAd({ unit = ADS.rewarded.unit, personalised = false, confirm, onGranted, timeoutMs = 10_000 } = {}) {
  return loadGpt().then(
    () =>
      new Promise((resolve) => {
        const gt = window.googletag;
        gt.cmd.push(() => {
          const slot = gt.defineOutOfPageSlot(unit, gt.enums.OutOfPageFormat.REWARDED);
          if (!slot) return resolve('unsupported');
          const pubads = gt.pubads();
          let granted = false;
          let done = false;
          const handlers = {
            rewardedSlotReady: async (e) => {
              if (e.slot !== slot) return;
              clearTimeout(timer);
              if (await confirm()) e.makeRewardedVisible();
              else finish('declined');
            },
            rewardedSlotGranted: (e) => {
              if (e.slot !== slot || granted) return;
              granted = true;
              onGranted?.();
            },
            rewardedSlotClosed: (e) => {
              if (e.slot === slot) finish(granted ? 'granted' : 'closed');
            },
            slotRenderEnded: (e) => {
              if (e.slot === slot && e.isEmpty) finish('unavailable');
            },
          };
          function finish(result) {
            if (done) return;
            done = true;
            clearTimeout(timer);
            for (const [type, fn] of Object.entries(handlers)) pubads.removeEventListener?.(type, fn);
            gt.destroySlots([slot]);
            resolve(result);
          }
          const timer = setTimeout(() => finish('unavailable'), timeoutMs);
          for (const [type, fn] of Object.entries(handlers)) pubads.addEventListener(type, fn);
          slot.addService(pubads);
          pubads.setPrivacySettings?.({ nonPersonalizedAds: !personalised });
          gt.enableServices();
          gt.display(slot);
        });
      }),
    () => 'unavailable',
  );
}
