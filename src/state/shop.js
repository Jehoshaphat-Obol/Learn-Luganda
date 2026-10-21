/* Gems and the shop. */
import { MAX_FREEZES } from './streak.js';
import { MAX_HEARTS, REFILL_COST, heartStatus, refillHearts } from './hearts.js';

export const GEMS = { lesson: 5, practice: 3, perfect: 5 };
export const STREAK_GEMS = { 3: 10, 7: 25, 14: 35, 30: 50, 50: 75, 100: 150, 200: 200, 365: 365 };

export const SHOP_ITEMS = [
  { id: 'freeze', title: 'Streak freeze', icon: 'snowflake', price: 60, description: `Keeps your streak if you miss a day. Hold up to ${MAX_FREEZES}.` },
  { id: 'refill', title: 'Heart refill', icon: 'heart', price: REFILL_COST, description: `Refill to ${MAX_HEARTS} hearts right away.` },
  { id: 'frame-gold', title: 'Gold frame', icon: 'star', price: 100, description: 'A gold ring around your avatar.', cosmetic: true },
  { id: 'frame-bauhaus', title: 'Bauhaus frame', icon: 'target', price: 150, description: 'Vermillion, ink and gold quarters around your avatar.', cosmetic: true },
];

/** Gems earned for a session (before achievements). */
export function sessionGems(result, { practice = false } = {}) {
  return (practice ? GEMS.practice : GEMS.lesson) + (result.perfect ? GEMS.perfect : 0);
}

/** Whether an item can be bought now, and why not. */
export function canBuy(s, item, now = Date.now()) {
  if (s.gems < item.price) return { ok: false, reason: 'Not enough gems' };
  if (item.id === 'freeze' && s.streak.freezes >= MAX_FREEZES) return { ok: false, reason: 'Fully stocked' };
  if (item.id === 'refill' && heartStatus(s, now).full) return { ok: false, reason: 'Hearts are full' };
  if (item.cosmetic && s.inventory[item.id]) return { ok: false, reason: 'Owned' };
  return { ok: true };
}

/** Buys an item (mutates the draft). Returns false if not allowed. */
export function buy(s, itemId, now = Date.now()) {
  const item = SHOP_ITEMS.find((i) => i.id === itemId);
  if (!item || !canBuy(s, item, now).ok) return false;
  if (item.id === 'refill') return refillHearts(s, now);
  s.gems -= item.price;
  if (item.id === 'freeze') s.streak.freezes += 1;
  if (item.cosmetic) {
    s.inventory[item.id] = true;
    if (s.profile) s.profile.avatar = { ...s.profile.avatar, frame: item.id };
  }
  return true;
}
