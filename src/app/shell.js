/*
 * App shell: decides the layout for each route and mounts the view into it.
 * `bare` routes (landing, onboarding, lessons) take the whole screen; `app`
 * routes get the top stats bar and the navigation (side rail on desktop,
 * bottom bar on phones).
 */
import { icon } from '../ui/icons.js';
import { escapeHtml } from '../ui/components.js';
import { brandMark } from './brand-mark.js';
import { musicOn } from '../ui/music.js';
import { t } from '../i18n/index.js';
import { installButton } from './pwa.js';

// `label` is a UI pack key.
export const NAV = [
  { path: '/learn', label: 'nav.learn', icon: 'home' },
  { path: '/practice', label: 'nav.practice', icon: 'practice' },
  { path: '/shop', label: 'nav.gems', icon: 'gem' },
  { path: '/profile', label: 'nav.profile', icon: 'profile' },
];

/** Default stats until the progress store provides real ones. */
let statsProvider = () => ({ streak: 0, gems: 0, hearts: 5, maxHearts: 5, streakToday: false });

export function setStatsProvider(fn) {
  statsProvider = fn;
}

function stat(name, value, label, extra = '') {
  return `<a class="stat stat--${name} ${extra}" href="#/${name === 'streak' ? 'streak' : 'shop'}" aria-label="${escapeHtml(label)}">
    ${icon(name === 'streak' ? 'flame' : name === 'gems' ? 'gem' : 'heart', { size: 22 })}<span>${escapeHtml(value)}</span>
  </a>`;
}

function topBarStats() {
  const s = statsProvider();
  return `
    ${stat('streak', s.streak, t('stats.streak', { count: s.streak }), s.streakToday ? '' : 'stat--dim')}
    ${stat('gems', s.gems, t('stats.gems', { count: s.gems }))}
    ${stat('hearts', s.hearts, t('stats.hearts', { count: s.hearts, max: s.maxHearts }))}`;
}

function musicButton() {
  const on = musicOn();
  return `<button class="icon-btn topbar__music" type="button" data-music-toggle aria-pressed="${on}" aria-label="${escapeHtml(t('music.label'))}" title="${escapeHtml(t(on ? 'music.turnOff' : 'music.turnOn'))}">${icon(on ? 'music' : 'music-off', { size: 22 })}</button>`;
}

/** Redraws the music button after the setting changes. */
export function refreshMusicButton() {
  const el = document.querySelector('[data-music-toggle]');
  if (el && el.getAttribute('aria-pressed') !== String(musicOn())) el.outerHTML = musicButton();
}

/** Re-reads the stats provider and redraws the counters. */
export function refreshTopBar() {
  const el = document.querySelector('[data-topbar-stats]');
  if (el) el.innerHTML = topBarStats();
}

function navLinks(current) {
  return NAV.map(
    (n) => `<a class="nav__link${current.startsWith(n.path) ? ' is-active' : ''}" href="#${n.path}" ${current.startsWith(n.path) ? 'aria-current="page"' : ''}>
      ${icon(n.icon, { size: 26 })}<span>${escapeHtml(t(n.label))}</span></a>`,
  ).join('');
}

function appLayout(path) {
  return `
    <div class="layout">
      <nav class="nav" aria-label="${escapeHtml(t('nav.main'))}">
        <a class="nav__brand" href="#/learn" aria-label="${escapeHtml(t('app.home'))}">
          <span class="nav__mark" data-brand data-mood="idle">${brandMark()}</span><span>${escapeHtml(t('app.shortName'))}</span>
        </a>
        ${navLinks(path)}
      </nav>
      <div class="layout__main">
        <header class="topbar">
          <a class="topbar__brand" href="#/learn" aria-label="${escapeHtml(t('app.home'))}" data-brand data-mood="idle">${brandMark()}</a>
          <div class="topbar__stats" data-topbar-stats>${topBarStats()}</div>
          ${installButton('topbar__install')}
          ${musicButton()}
        </header>
        <main id="view" class="view" tabindex="-1"></main>
      </div>
    </div>`;
}

/**
 * @param {HTMLElement} root
 * @returns {{ render: (match: object, navigate: Function) => void }}
 */
export function createShell(root) {
  let cleanup = null;
  let currentLayout = null;

  return {
    render({ route, params, query, path }, navigate) {
      if (typeof cleanup === 'function') cleanup();
      cleanup = null;

      const layout = route.layout ?? 'app';
      let viewRoot;
      if (layout === 'app') {
        // Rebuild the frame each time so the active nav link updates.
        root.innerHTML = appLayout(path);
        viewRoot = root.querySelector('#view');
      } else {
        root.innerHTML = '<main id="view" class="view view--bare" tabindex="-1"></main>';
        viewRoot = root.querySelector('#view');
      }
      currentLayout = layout;

      document.title = route.title ? t('app.pageTitle', { page: t(route.title), app: t('app.name') }) : t('app.name');
      window.scrollTo(0, 0);
      cleanup = route.view({ root: viewRoot, params, query, path, navigate }) ?? null;
      // Move focus to the new view for screen reader users, without scrolling.
      if (currentLayout && document.activeElement === document.body) viewRoot.focus({ preventScroll: true });
    },
  };
}
