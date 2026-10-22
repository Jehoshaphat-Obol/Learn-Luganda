/*
 * Installable app: registers the service worker built by
 * build/service-worker.js and drives the "Install app" buttons. Word
 * reminders live in src/reminders.
 *
 * Chrome, Edge and Android fire `beforeinstallprompt`, which we keep and
 * replay when the learner taps Install. iPhone and iPad Safari never fire it,
 * so there the button shows the Share → Add to Home Screen steps instead.
 * Every install button is hidden once the app runs installed.
 *
 * Chrome stops offering once the app is installed on the device, so a tap in
 * the browser would only show steps. getInstalledRelatedApps() (Android
 * Chrome, via `related_applications` in the manifest) tells us it's already
 * there, and the buttons say "App installed" instead.
 *
 * Buttons are plain markup with `data-install`; one document click handler
 * (initInstall) serves them all, and syncInstall() updates them when the
 * browser's offer arrives late or the app gets installed.
 */
import { escapeHtml, openModal } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { mascot } from '../illustrations/index.js';
import { t } from '../i18n/index.js';

// index.html keeps an offer that came before this module loaded.
let installPrompt = window.__installPrompt ?? null;
let installed = false;
let onDevice = false;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  installPrompt = e;
  syncInstall();
});
window.addEventListener('appinstalled', () => {
  installPrompt = null;
  installed = true;
  syncInstall();
});

/** True when the app is open as an installed app rather than in a browser tab. */
export function isStandalone(win = window) {
  return Boolean(win.matchMedia?.('(display-mode: standalone)').matches || win.navigator?.standalone === true);
}

/** iPhone, iPad (which reports itself as a Mac) and iPod. */
export function isIos(nav = navigator) {
  return /iPad|iPhone|iPod/.test(nav.userAgent ?? '') || (nav.platform === 'MacIntel' && nav.maxTouchPoints > 1);
}

/**
 * - `installed`: running as the installed app, nothing to offer.
 * - `prompt`: the browser offered to install (Chrome, Edge, Android).
 * - `onDevice`: open in the browser, but already installed on this device.
 * - `ios`: Safari on iPhone or iPad, installed by hand from the Share sheet.
 * - `manual`: anything else; the browser menu may have an install item.
 */
export function installState() {
  if (installed || isStandalone()) return 'installed';
  if (installPrompt) return 'prompt';
  if (onDevice) return 'onDevice';
  if (isIos()) return 'ios';
  return 'manual';
}

/**
 * Offer Install everywhere until the app runs installed. Without a browser
 * prompt the button explains the steps, so it never dead-ends.
 */
export const offerInstall = () => installState() !== 'installed';

/** True when the browser offered to install the app (Chrome, Edge, Android). */
export const canInstall = () => Boolean(installPrompt);

export async function promptInstall() {
  if (!installPrompt) return false;
  const prompt = installPrompt;
  prompt.prompt();
  const { outcome } = await prompt.userChoice;
  // A prompt can only be shown once; Chrome fires a fresh event if it may ask again.
  installPrompt = null;
  if (outcome === 'accepted') installed = true;
  syncInstall();
  return outcome === 'accepted';
}

const steps = (keys) => `<ol class="install-steps">${keys.map((k) => `<li>${escapeHtml(t(k))}</li>`).join('')}</ol>`;

function instructions(state) {
  if (state === 'onDevice') return `<p>${escapeHtml(t('install.onDeviceText'))}</p>`;
  if (state === 'ios') return steps(['install.iosStep1', 'install.iosStep2', 'install.iosStep3']);
  return `${steps(['install.manualStep1', 'install.manualStep2'])}<p class="muted">${escapeHtml(t('install.manualNote'))} ${escapeHtml(t('install.already'))}</p>`;
}

/** Uses the browser's own install prompt, or explains how to install by hand. */
export async function installApp() {
  const state = installState();
  if (state === 'installed') return true;
  if (state === 'prompt') return promptInstall();
  await openModal({
    title: t(state === 'onDevice' ? 'install.onDeviceTitle' : 'install.title'),
    body: instructions(state),
    art: mascot({ pose: 'happy' }),
    actions: [{ label: t('install.ok'), value: 'ok' }],
  });
  return false;
}

/** A vermillion-edged button (compact for headers, `lg` for the hero); hidden once installed. */
export function installButton(className = '', { size = 'md' } = {}) {
  const label = escapeHtml(installLabel());
  return `<button class="btn btn--secondary${size === 'lg' ? ' btn--lg' : ''} install-btn ${className}" type="button" data-install aria-label="${label}" title="${label}"${offerInstall() ? '' : ' hidden'}>${installButtonInner()}</button>`;
}

const installLabel = () => t(installState() === 'onDevice' ? 'install.onDeviceLabel' : 'install.label');

function installButtonInner() {
  const there = installState() === 'onDevice';
  const label = escapeHtml(t(there ? 'install.onDeviceLabel' : 'install.label'));
  const short = escapeHtml(t(there ? 'install.onDeviceShort' : 'install.short'));
  return `${icon(there ? 'check' : 'install', { size: 20 })}<span class="install-btn__label">${label}</span><span class="install-btn__short" aria-hidden="true">${short}</span>`;
}

const CARD_KEY = 'learn-luganda-install-card';
const CARD_PAUSE = 14 * 24 * 60 * 60 * 1000;

function cardSnoozed(now = Date.now()) {
  try {
    return now - Number(localStorage.getItem(CARD_KEY) ?? 0) < CARD_PAUSE;
  } catch {
    return false;
  }
}

/** "Get the app" card for the Learn page; "Not now" hides it for two weeks. */
export function installCard() {
  if (['installed', 'onDevice'].includes(installState()) || cardSnoozed()) return '';
  return `<section class="card install-card" data-install-card aria-labelledby="install-card-title">
    <span class="install-card__icon">${icon('install', { size: 30 })}</span>
    <div class="install-card__text">
      <h2 id="install-card-title">${escapeHtml(t('install.cardTitle'))}</h2>
      <p>${escapeHtml(t('install.cardText'))}</p>
    </div>
    <div class="install-card__actions">
      <button class="btn btn--primary" type="button" data-install="card">${icon('install', { size: 20 })}<span>${escapeHtml(t('install.label'))}</span></button>
      <button class="btn btn--ghost" type="button" data-install-later>${escapeHtml(t('install.notNow'))}</button>
    </div>
  </section>`;
}

/** The Settings section: the right action or steps for this browser. */
export function installSection() {
  const state = installState();
  if (state === 'installed') return `<h2>${escapeHtml(t('install.title'))}</h2><p class="muted">${escapeHtml(t('install.done'))}</p>`;
  const action =
    state === 'prompt'
      ? `<button class="btn btn--secondary" type="button" data-install="always">${icon('install', { size: 20 })}<span>${escapeHtml(t('install.label'))}</span></button>`
      : instructions(state);
  return `<h2>${escapeHtml(t('install.title'))}</h2><p class="muted">${escapeHtml(t('install.lead'))}</p>${action}`;
}

/** Brings every install button and the Settings section up to date. */
export function syncInstall(root = document) {
  const show = offerInstall();
  root.querySelectorAll('.install-btn[data-install]').forEach((el) => {
    el.hidden = !show;
    el.innerHTML = installButtonInner();
    el.setAttribute('aria-label', installLabel());
    el.title = installLabel();
  });
  root.querySelectorAll('[data-install-section]').forEach((el) => {
    el.innerHTML = installSection();
  });
  if (!installCard() && !cardSnoozed()) root.querySelectorAll('[data-install-card]').forEach((el) => el.remove());
}

export function initInstall() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-install]')) installApp();
    if (e.target.closest('[data-install-later]')) {
      try {
        localStorage.setItem(CARD_KEY, String(Date.now()));
      } catch {
        // Private mode: the card just comes back next visit.
      }
      e.target.closest('[data-install-card]')?.remove();
    }
  });
  window.matchMedia?.('(display-mode: standalone)').addEventListener?.('change', () => syncInstall());
  navigator
    .getInstalledRelatedApps?.()
    .then((apps) => {
      onDevice = apps.length > 0;
      if (onDevice) syncInstall();
    })
    .catch(() => {});
}

export function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || !import.meta.env.PROD) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
