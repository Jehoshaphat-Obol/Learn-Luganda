/*
 * The visitor's ad choice, kept apart from learning progress so a progress
 * reset or import doesn't touch it. `granted` allows personalised ads,
 * `denied` asks Google for non-personalised ones, `null` means not asked yet.
 */
const KEY = 'learn-luganda:ads-consent';

export function adConsent() {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function setAdConsent(value) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // Storage blocked: the choice holds for this visit only.
  }
}
