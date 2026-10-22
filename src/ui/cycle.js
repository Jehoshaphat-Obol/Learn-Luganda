/*
 * Labels that say themselves in every language, like the "hello" on a new
 * Apple device: while the interface language is Automatic, the few labels
 * that lead into the app (Get started, the language button, Continue, the
 * search box) fade through each UI pack's wording every few seconds, all in
 * the same language at once, so anyone finds their way in.
 *
 * It stops for good once the learner picks a language themselves (landing
 * switcher or Settings), and never runs with reduced motion. Screen readers
 * only ever get the current language: the other wordings are aria-hidden.
 * Every wording sits in the same grid cell, so the widest sets the size and
 * nothing jumps as they change.
 */
import strings from 'virtual:ui-cycle';
import { currentLanguage, t } from '../i18n/index.js';
import { store } from '../state/store.js';
import { escapeHtml } from './components.js';
import { reducedMotion } from './motion.js';

/** How long each language stays on screen. */
export const CYCLE_MS = 2800;

let timer = null;
let step = 0;

/** Whether labels cycle now: Automatic language and motion allowed. */
export function cycling(state = store.get()) {
  return !state.settings.uiLang && !reducedMotion(state);
}

/**
 * `[code, text]` for `key` in every pack, the current language first (as
 * `t` gives it). Every key lists the same languages in the same order, so
 * all labels on screen change language together; a pack without the key
 * shows English there.
 */
export function wordings(key) {
  const current = currentLanguage();
  const rest = Object.keys(strings)
    .filter((code) => code !== current)
    .map((code) => [strings[code][key] ? code : 'en', strings[code][key] ?? strings.en?.[key] ?? t(key)]);
  return [[current, t(key)], ...rest];
}

/** The label for `key` as HTML: cycling when it should, plain text otherwise. */
export function cycleText(key) {
  if (!cycling()) return escapeHtml(t(key));
  const items = wordings(key);
  if (items.length < 2) return escapeHtml(t(key));
  start();
  return `<span class="cycle" data-cycle>${items
    .map(([code, text], i) => `<span class="cycle__item${i ? '' : ' is-on'}" lang="${code}"${i ? ' aria-hidden="true"' : ''}>${escapeHtml(text)}</span>`)
    .join('')}</span>`;
}

/**
 * Attributes for an input whose placeholder cycles: `placeholder` and
 * `aria-label` in the current language, and the other wordings to show.
 */
export function cyclePlaceholder(key) {
  const label = escapeHtml(t(key));
  if (!cycling()) return `placeholder="${label}" aria-label="${label}"`;
  const texts = wordings(key).map(([, text]) => text);
  if (texts.length > 1) start();
  return `placeholder="${label}" aria-label="${label}" data-cycle-placeholder="${escapeHtml(JSON.stringify(texts))}"`;
}

/** Shows wording `n` (wrapping) on every cycling label in `root`. */
export function showWording(n, root = document) {
  for (const label of root.querySelectorAll('[data-cycle]')) {
    const items = label.children;
    for (let i = 0; i < items.length; i++) items[i].classList.toggle('is-on', i === n % items.length);
  }
  for (const input of root.querySelectorAll('[data-cycle-placeholder]')) {
    // Leave it be while someone types in it.
    if (input.value || input === document.activeElement) continue;
    const texts = JSON.parse(input.dataset.cyclePlaceholder);
    input.placeholder = texts[n % texts.length];
  }
}

function tick() {
  const any = document.querySelector('[data-cycle], [data-cycle-placeholder]');
  if (!any || !cycling()) {
    if (any) showWording(0);
    stop();
    return;
  }
  // Hidden tabs skip ahead silently instead of piling up fades.
  if (document.hidden) return;
  showWording(++step);
}

function start() {
  if (timer) return;
  step = 0;
  timer = setInterval(tick, CYCLE_MS);
}

/** Stops cycling (tests; a redraw after a language pick stops it too). */
export function stop() {
  clearInterval(timer);
  timer = null;
}
