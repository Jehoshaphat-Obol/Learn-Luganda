/*
 * Installable app: registers the service worker built by
 * build/service-worker.js, and runs the opt-in daily reminder. With no
 * server there's no push, so the reminder fires only while the app (or
 * its installed window) is open: best effort, at most once a day.
 */
import { store } from '../state/store.js';
import { streakStatus } from '../state/streak.js';
import { dailyGoal } from '../state/xp.js';
import { dayKey } from '../state/dates.js';

const CHECK_MS = 10 * 60 * 1000;

let installPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  installPrompt = e;
});
window.addEventListener('appinstalled', () => {
  installPrompt = null;
});

/** True when the browser offered to install the app (Chrome, Edge, Android). */
export const canInstall = () => Boolean(installPrompt);

export async function promptInstall() {
  if (!installPrompt) return false;
  installPrompt.prompt();
  const { outcome } = await installPrompt.userChoice;
  installPrompt = null;
  return outcome === 'accepted';
}

export function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || !import.meta.env.PROD) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

export function notificationsSupported() {
  return 'Notification' in window && 'serviceWorker' in navigator;
}

/** Asks for permission; resolves true when reminders can be shown. */
export async function enableReminders() {
  if (!notificationsSupported()) return false;
  const permission = Notification.permission === 'default' ? await Notification.requestPermission() : Notification.permission;
  return permission === 'granted';
}

/**
 * Whether a reminder is due: reminders on, past the chosen hour, nothing
 * learned today and none sent yet today.
 */
export function reminderDue(s, now = new Date()) {
  const { reminder, reminderHour = 19, lastReminder } = s.settings;
  if (!reminder || !s.profile) return false;
  const today = dayKey(now);
  if (lastReminder === today || now.getHours() < reminderHour) return false;
  return !dailyGoal(s, now).met && !streakStatus(s, today).doneToday;
}

export function reminderText(s, now = new Date()) {
  const st = streakStatus(s, dayKey(now));
  return st.atRisk ? `Your ${st.current} day streak ends at midnight. A quick lesson keeps it going!` : 'A few minutes of Luganda today? Your next lesson is ready.';
}

async function checkReminder() {
  const s = store.get();
  if (!reminderDue(s) || Notification.permission !== 'granted') return;
  store.update((d) => {
    d.settings.lastReminder = dayKey();
  });
  const reg = await navigator.serviceWorker.getRegistration();
  const options = { body: reminderText(s), icon: './icons/icon-192.png', badge: './icons/icon-192.png', tag: 'daily-reminder' };
  if (reg) reg.showNotification('Time for Luganda', options);
  else new Notification('Time for Luganda', options);
}

export function startReminders() {
  if (!notificationsSupported()) return;
  checkReminder();
  setInterval(checkReminder, CHECK_MS);
}
