/*
 * Reduced motion: on when the system asks for it or the learner turns
 * animations off in settings. CSS keys off `data-motion="reduce"`.
 */
import { store } from '../state/store.js';

export function reducedMotion(state = store.get()) {
  return state.settings?.motion === false || Boolean(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
}

export function applyMotion(state = store.get()) {
  document.documentElement.dataset.motion = reducedMotion(state) ? 'reduce' : 'full';
}
