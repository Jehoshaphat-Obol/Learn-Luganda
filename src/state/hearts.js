/*
 * Hearts: five lives per lesson. A wrong answer costs one; they come back
 * one every four hours, worked out from timestamps when read, so no timer
 * has to run in the background.
 */
export const MAX_HEARTS = 5;
export const REFILL_MS = 4 * 60 * 60 * 1000;
export const REFILL_COST = 40; // gems for a full refill

/** Applies any refills due by `now` (mutates the draft). */
export function settleHearts(s, now = Date.now()) {
  const h = s.hearts;
  if (h.count >= MAX_HEARTS) {
    h.count = MAX_HEARTS;
    return s;
  }
  const since = Math.max(0, now - h.updatedAt);
  const gained = Math.floor(since / REFILL_MS);
  if (gained > 0) {
    h.count = Math.min(MAX_HEARTS, h.count + gained);
    h.updatedAt = h.count >= MAX_HEARTS ? now : h.updatedAt + gained * REFILL_MS;
  }
  return s;
}

/** Read-only view: hearts right now and when the next one arrives. */
export function heartStatus(s, now = Date.now()) {
  const copy = { hearts: { ...s.hearts } };
  settleHearts(copy, now);
  const { count, updatedAt } = copy.hearts;
  return {
    count,
    max: MAX_HEARTS,
    full: count >= MAX_HEARTS,
    nextAt: count >= MAX_HEARTS ? null : updatedAt + REFILL_MS,
  };
}

export function loseHeart(s, now = Date.now()) {
  settleHearts(s, now);
  if (s.hearts.count >= MAX_HEARTS) s.hearts.updatedAt = now; // refill clock starts now
  s.hearts.count = Math.max(0, s.hearts.count - 1);
  return s;
}

export function gainHeart(s, n = 1, now = Date.now()) {
  settleHearts(s, now);
  s.hearts.count = Math.min(MAX_HEARTS, s.hearts.count + n);
  if (s.hearts.count >= MAX_HEARTS) s.hearts.updatedAt = now;
  return s;
}

/** Spends gems on a full refill. Returns false if the learner can't afford it. */
export function refillHearts(s, now = Date.now()) {
  if (s.gems < REFILL_COST) return false;
  s.gems -= REFILL_COST;
  s.hearts = { count: MAX_HEARTS, updatedAt: now };
  return true;
}

/** "3h 12m" until the next heart. */
export function formatWait(ms) {
  const mins = Math.max(1, Math.ceil(ms / 60000));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}
