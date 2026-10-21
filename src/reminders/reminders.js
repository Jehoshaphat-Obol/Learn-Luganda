/*
 * Word reminders at runtime. The app has no server, so there is no web push:
 *  - while the app is open in a background tab or installed window, the page
 *    checks every few minutes and shows the reminder itself;
 *  - on installed Chrome/Edge apps, Periodic Background Sync wakes the
 *    service worker now and then (the browser decides how often, about daily)
 *    and it shows the next reminder from a plan the page keeps in the cache.
 * Safari and Firefox have no background wake-up, so there reminders only
 * arrive while the app is open. Rules and wording live in rules.js and
 * strings.js.
 */
import { store } from '../state/store.js';
import { dayKey } from '../state/dates.js';
import { addRewardStep } from '../views/rewards.js';
import { button, speech } from '../ui/components.js';
import { mascot } from '../illustrations/index.js';
import { dueSlot, markSent, plan, shouldOfferReminders } from './rules.js';
import { REMINDER_STRINGS } from './strings.js';

const CHECK_MS = 5 * 60 * 1000;
export const REMINDER_CACHE = 'learn-luganda-reminders';
export const SYNC_TAG = 'learn-luganda-reminder';
const ICON = './icons/icon-192.png';

export const remindersSupported = () => 'Notification' in window && 'serviceWorker' in navigator;
const permission = () => (remindersSupported() ? Notification.permission : 'denied');

/** True when this browser can wake the app in the background (installed Chrome/Edge). */
export const backgroundSupported = () => typeof ServiceWorkerRegistration !== 'undefined' && 'periodicSync' in ServiceWorkerRegistration.prototype;

async function registration() {
  if (!('serviceWorker' in navigator)) return null;
  return (await navigator.serviceWorker.getRegistration()) ?? null;
}

async function cacheJSON(reg, name, value) {
  if (!reg || !('caches' in window)) return undefined;
  const cache = await caches.open(REMINDER_CACHE);
  const url = new URL(`__reminders/${name}.json`, reg.scope).href;
  if (value === undefined) return (await cache.match(url))?.json();
  await cache.put(url, new Response(JSON.stringify(value), { headers: { 'content-type': 'application/json' } }));
  return value;
}

/** Writes the upcoming reminders for the service worker. */
async function savePlan() {
  const reg = await registration();
  await cacheJSON(reg, 'plan', { slots: plan(store.get()), updatedAt: Date.now() }).catch(() => {});
}

/** Brings in reminders the service worker sent while the app was closed. */
async function pullSent() {
  const reg = await registration();
  const log = await cacheJSON(reg, 'sent').catch(() => null);
  const fresh = (log?.days ?? []).filter((d) => !(store.get().reminders.sent ?? []).includes(d));
  if (fresh.length) store.update((s) => fresh.reduce(markSent, s));
}

async function setBackgroundSync(on) {
  const reg = await registration();
  if (!reg || !backgroundSupported()) return;
  try {
    if (on) await reg.periodicSync.register(SYNC_TAG, { minInterval: 6 * 3_600_000 });
    else await reg.periodicSync.unregister(SYNC_TAG);
  } catch {
    // Not installed, or the browser said no: reminders still come while the app is open.
  }
}

async function show(slot) {
  const reg = await registration();
  const options = { body: slot.body, icon: ICON, badge: ICON, tag: 'word-reminder', data: { url: slot.url } };
  if (reg) await reg.showNotification(slot.title, options);
  else new Notification(slot.title, options);
  store.update((s) => markSent(s, slot.day));
  await cacheJSON(reg, 'sent', { days: store.get().reminders.sent }).catch(() => {});
}

async function check() {
  // A reminder is pointless while the learner is looking at the app.
  if (document.visibilityState === 'visible' || permission() !== 'granted') return;
  const s = store.get();
  const slot = dueSlot(plan(s), s.reminders.sent);
  if (slot) await show(slot).catch(() => {});
}

/**
 * Turns reminders on or off. Turning on asks the browser for permission, so
 * call it from a click. Resolves true when reminders are on.
 */
export async function setReminders(wanted) {
  let on = false;
  if (wanted && remindersSupported()) {
    const p = permission() === 'default' ? await Notification.requestPermission() : permission();
    on = p === 'granted';
  }
  store.update((s) => {
    s.reminders.on = on;
    if (wanted) {
      s.reminders.consent = on ? 'granted' : 'declined';
      s.reminders.askedAt = dayKey();
    }
  });
  await setBackgroundSync(on);
  return on;
}

/** Changes the reminder hour; null learns it from when lessons get done. */
export function setReminderHour(hour) {
  store.update((s) => {
    s.reminders.hour = Number.isInteger(hour) ? hour : null;
  });
}

// The offer after a lesson: our own card first, the browser prompt only on "yes".
addRewardStep(() => {
  if (!shouldOfferReminders(store.get(), { supported: remindersSupported(), permission: permission() })) return null;
  const t = REMINDER_STRINGS.consent;
  return {
    html: `
      <div class="complete__art complete__art--small reminder-offer__art" aria-hidden="true">${speech('Weebale!', { tail: 'right' })}${mascot({ pose: 'happy' })}</div>
      <h1>${t.title}</h1>
      <p class="complete__sub muted" data-offer-text>${t.body}</p>
      <div class="reminder-offer__yes">${button({ label: t.yes, variant: 'secondary', size: 'lg', block: true, attrs: 'data-offer-yes' })}</div>
      <p class="muted reminder-offer__later" data-offer-later>${t.later}</p>`,
    after(root) {
      let decided = false;
      root.querySelector('[data-offer-yes]').addEventListener('click', async (e) => {
        decided = true;
        e.currentTarget.disabled = true;
        const on = await setReminders(true);
        root.querySelector('[data-offer-text]').textContent = on ? t.on : t.blocked;
        root.querySelector('[data-offer-later]').hidden = true;
        e.currentTarget.parentElement.hidden = true;
        root.querySelector('[data-continue]')?.focus();
      });
      root.querySelector('[data-continue]')?.addEventListener('click', () => {
        if (decided) return;
        store.update((s) => {
          s.reminders.consent = 'later';
          s.reminders.asks += 1;
          s.reminders.askedAt = dayKey();
        });
      });
    },
  };
});

export function startReminders() {
  if (!remindersSupported()) return;
  let timer = null;
  // Keep the service worker's plan in step with progress (debounced).
  store.subscribe(() => {
    clearTimeout(timer);
    timer = setTimeout(savePlan, 500);
  });
  const ready = import.meta.env.PROD ? navigator.serviceWorker.ready : Promise.resolve();
  ready
    .then(pullSent)
    .then(() => Promise.all([savePlan(), setBackgroundSync(store.get().reminders.on && permission() === 'granted')]))
    .catch(() => {});
  setInterval(check, CHECK_MS);
}
