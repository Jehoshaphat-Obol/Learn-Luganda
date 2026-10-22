/*
 * Colour theme: 'light' (the default), 'dark', or 'system', which follows the
 * device. Light stays the default because an automatic dark mode once showed
 * a black page to someone who never asked for it (#28). CSS keys off
 * `data-theme="dark"` on <html>; the inline script in index.html sets it
 * before first paint, and this module keeps it in step afterwards.
 */
import { store } from '../state/store.js';

export const THEMES = ['light', 'dark', 'system'];

// The page background of each theme, for the browser chrome (meta theme-color).
export const THEME_COLORS = { light: '#ebe8e2', dark: '#181614' };

const darkQuery = () => globalThis.matchMedia?.('(prefers-color-scheme: dark)');

export function themePreference(state = store.get()) {
  const pref = state.settings?.theme;
  return THEMES.includes(pref) ? pref : 'light';
}

/** The theme actually shown: 'light' or 'dark'. */
export function resolvedTheme(pref = themePreference(), systemDark = Boolean(darkQuery()?.matches)) {
  if (pref === 'system') return systemDark ? 'dark' : 'light';
  return pref === 'dark' ? 'dark' : 'light';
}

export function applyTheme(state = store.get()) {
  const theme = resolvedTheme(themePreference(state));
  const root = document.documentElement;
  if (root.dataset.theme !== theme) root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', theme);
}

export function setTheme(pref) {
  store.update((s) => {
    s.settings.theme = THEMES.includes(pref) ? pref : 'light';
  });
}

/** Apply now, on every settings change, and when the device switches while 'system' is chosen. */
export function startTheme() {
  applyTheme();
  store.subscribe(() => applyTheme());
  darkQuery()?.addEventListener?.('change', () => applyTheme());
}
