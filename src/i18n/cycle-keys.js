/*
 * The interface strings that cycle through every language on the way into
 * the app (src/ui/cycle.js), so someone who reads none of the current
 * language still recognises "Get started" or "Search". Kept short: each
 * key is bundled from every UI pack by build/ui-cycle.js.
 */
export const CYCLE_KEYS = Object.freeze([
  'landing.cta.start',
  'languageSwitch.short',
  'onboarding.continue',
  'picker.search.label',
]);
