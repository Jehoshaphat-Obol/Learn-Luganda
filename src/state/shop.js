/* Gems: earned by learning, never bought, spent on streak freezes, refills and frames. */
import { MAX_FREEZES } from './streak.js';
import { MAX_HEARTS, REFILL_COST, heartStatus, refillHearts } from './hearts.js';
import { t } from '../i18n/index.js';

export const GEMS = { lesson: 5, practice: 3, perfect: 5 };
export const STREAK_GEMS = { 3: 10, 7: 25, 14: 35, 30: 50, 50: 75, 100: 150, 200: 200, 365: 365 };

/** Names and descriptions come from the UI pack (`shop.items.<id>`, camel-cased: frameGold). */
const shopItem = (i) => {
  const key = `shop.items.${i.id.replace(/-(\w)/g, (_, c) => c.toUpperCase())}`;
  return Object.defineProperties(i, {
    title: { get: () => t(`${key}.title`), enumerable: true },
    description: { get: () => t(`${key}.description`, { max: i.id === 'freeze' ? MAX_FREEZES : MAX_HEARTS }), enumerable: true },
  });
};

export const SHOP_ITEMS = [
  { id: 'freeze', icon: 'snowflake', price: 60 },
  { id: 'refill', icon: 'heart', price: REFILL_COST },
  { id: 'frame-gold', icon: 'star', price: 100, cosmetic: true },
  { id: 'frame-bauhaus', icon: 'target', price: 150, cosmetic: true },
  { id: 'frame-sky', icon: 'target', price: 200, cosmetic: true },
  { id: 'frame-sun', icon: 'star', price: 300, cosmetic: true },
].map(shopItem);

/** Every way to earn gems, from the real reward numbers (shown on the gems screen). */
export function earnRules({ perTier = 10 } = {}) {
  const milestones = Object.entries(STREAK_GEMS);
  const [firstDay, firstGems] = milestones[0];
  const [lastDay, lastGems] = milestones[milestones.length - 1];
  return [
    { label: t('shop.earn.lesson'), gems: `+${GEMS.lesson}` },
    { label: t('shop.earn.practice'), gems: `+${GEMS.practice}` },
    { label: t('shop.earn.perfect'), gems: t('shop.earn.perfectGems', { gems: GEMS.perfect }) },
    { label: t('shop.earn.streak', { first: firstDay, last: lastDay }), gems: t('shop.earn.streakGems', { first: firstGems, last: lastGems }) },
    { label: t('shop.earn.achievement'), gems: t('shop.earn.achievementGems', { gems: perTier }) },
  ];
}

/** Gems earned for a session (before achievements). */
export function sessionGems(result, { practice = false } = {}) {
  return (practice ? GEMS.practice : GEMS.lesson) + (result.perfect ? GEMS.perfect : 0);
}

/** Whether an item can be bought now, and why not. */
export function canBuy(s, item, now = Date.now()) {
  if (s.gems < item.price) return { ok: false, reason: t('shop.reasons.gems') };
  if (item.id === 'freeze' && s.streak.freezes >= MAX_FREEZES) return { ok: false, reason: t('shop.reasons.stocked') };
  if (item.id === 'refill' && heartStatus(s, now).full) return { ok: false, reason: t('shop.reasons.full') };
  if (item.cosmetic && s.inventory[item.id]) return { ok: false, reason: t('shop.reasons.owned') };
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
