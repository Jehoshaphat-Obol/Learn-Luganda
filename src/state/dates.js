/*
 * Calendar helpers. Days are local-time `YYYY-MM-DD` keys so a streak or
 * daily goal rolls over at the learner's own midnight.
 */

export function dayKey(date = new Date()) {
  const d = new Date(date);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Parses a day key as local midnight. */
export function fromDayKey(key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** Whole days from `a` to `b` (both day keys); positive when b is later. */
export function daysBetween(a, b) {
  const ms = fromDayKey(b) - fromDayKey(a);
  return Math.round(ms / 86_400_000);
}

export function addDays(key, n) {
  const d = fromDayKey(key);
  d.setDate(d.getDate() + n);
  return dayKey(d);
}

/** Monday-based week key, e.g. the Monday's day key. */
export function weekKey(date = new Date()) {
  const d = new Date(date);
  const offset = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - offset);
  return dayKey(d);
}
