/*
 * Weekly leagues, simulated. There's no server, so the other learners are
 * generated from a seed (week + tier + slot): the same week always shows the
 * same rivals with the same XP at the same moment. The learner's own XP is
 * their real XP for the week. Top finishers move up a tier, the bottom ones
 * move down, and every Monday a new week starts.
 */
import { addDays, dayKey, fromDayKey, weekKey } from './dates.js';
import { createRng } from '../lesson/random.js';
import { CAST } from '../illustrations/characters.js';

export const TIERS = [
  { id: 'bronze', name: 'Bronze' },
  { id: 'silver', name: 'Silver' },
  { id: 'gold', name: 'Gold' },
  { id: 'sapphire', name: 'Sapphire' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'emerald', name: 'Emerald' },
  { id: 'diamond', name: 'Diamond' },
];
export const SIZE = 15; // learner plus 14 rivals
export const PROMOTE = 5;
export const DEMOTE = 3;

const NAMES = [
  'Kato', 'Babirye', 'Nalubega', 'Ssempa', 'Namutebi', 'Kizza', 'Nansubuga', 'Lubega', 'Akello', 'Opio',
  'Nabukenya', 'Mugisha', 'Atim', 'Wasswa', 'Nakimuli', 'Okello', 'Grace', 'Daniel', 'Aisha', 'Samuel',
  'Ritah', 'Brian', 'Mariam', 'Joel', 'Esther', 'Ivan', 'Sophie', 'Tom', 'Lena', 'Yusuf',
];
const COLORS = ['vermillion', 'ink', 'butter', 'sky', 'sage', 'lilac', 'blush'];
const CHARACTERS = Object.keys(CAST);

function hash(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** The rivals for a week and tier: names, colours and daily pace. */
export function rivals(week, tier) {
  const rng = createRng(hash(`${week}:${tier}`));
  const names = rng.sample(NAMES, SIZE - 1);
  return names.map((name, i) => {
    const r = createRng(hash(`${week}:${tier}:${i}`));
    // Higher tiers have keener rivals; some rivals barely show up.
    const keen = r.next();
    const pace = keen < 0.2 ? r.int(8) : Math.round((10 + r.int(30)) * (1 + tier * 0.35) * (0.5 + keen));
    return { id: `bot-${i}`, name, avatar: { character: CHARACTERS[r.int(CHARACTERS.length)], color: COLORS[r.int(COLORS.length)] }, pace, seed: hash(`${week}:${tier}:${i}:xp`) };
  });
}

/** A rival's XP at `now`: whole past days plus the share of today so far. */
export function rivalXp(rival, week, now = new Date()) {
  let total = 0;
  const start = fromDayKey(week);
  for (let d = 0; d < 7; d += 1) {
    const dayStart = new Date(start);
    dayStart.setDate(start.getDate() + d);
    if (dayStart > now) break;
    const r = createRng(rival.seed + d);
    // Most days near pace, some days off, the odd big day.
    const roll = r.next();
    const dayXp = roll < 0.18 ? 0 : Math.round(rival.pace * (roll > 0.9 ? 2.2 : 0.6 + r.next() * 0.8));
    const share = Math.min(1, (now - dayStart) / 86_400_000);
    total += Math.round(dayXp * share);
  }
  return total;
}

/** The learner's XP in a given week, from the per-day log. */
export function weeklyXp(s, week, now = new Date()) {
  let total = 0;
  const today = dayKey(now);
  for (let d = 0; d < 7; d += 1) {
    const key = addDays(week, d);
    if (key > today) break;
    total += s.xp.byDay[key] ?? 0;
  }
  return total;
}

/** Ranked table for a week. `now` caps rivals' XP (use the week end for finals). */
export function standings(s, week, tier, now = new Date()) {
  const me = { id: 'me', name: s.profile?.name ?? 'You', me: true, avatar: s.profile?.avatar, xp: weeklyXp(s, week, now) };
  const rows = [me, ...rivals(week, tier).map((r) => ({ ...r, xp: rivalXp(r, week, now) }))];
  // Ties go to the learner, then alphabetical, so ranks are stable.
  rows.sort((a, b) => b.xp - a.xp || (a.me ? -1 : b.me ? 1 : a.name.localeCompare(b.name)));
  return rows.map((r, i) => ({ ...r, rank: i + 1 }));
}

export function zone(rank, tier) {
  if (rank <= PROMOTE && tier < TIERS.length - 1) return 'promote';
  if (rank > SIZE - DEMOTE && tier > 0) return 'demote';
  return 'stay';
}

/**
 * Joins the first league, or closes finished weeks (mutates the draft).
 * A finished week leaves `pendingResult` for the leagues page to announce.
 */
export function settleLeague(s, now = new Date()) {
  const current = weekKey(now);
  const lg = s.league;
  if (!lg.week) {
    s.league = { week: current, tier: 0, history: [], pendingResult: null };
    return s;
  }
  if (lg.week === current) return s;
  const weekEnd = fromDayKey(addDays(lg.week, 7));
  const table = standings(s, lg.week, lg.tier, new Date(weekEnd - 1));
  const me = table.find((r) => r.me);
  // A learner who earned nothing that week doesn't move up.
  const result = me.xp === 0 && lg.tier > 0 ? 'demote' : me.xp === 0 ? 'stay' : zone(me.rank, lg.tier);
  const tier = Math.max(0, Math.min(TIERS.length - 1, lg.tier + (result === 'promote' ? 1 : result === 'demote' ? -1 : 0)));
  const entry = { week: lg.week, tier: lg.tier, rank: me.rank, xp: me.xp, result, newTier: tier };
  s.league = { week: current, tier, history: [entry, ...(lg.history ?? [])].slice(0, 26), pendingResult: entry };
  return s;
}

/** Milliseconds until the current week ends. */
export function timeLeft(now = new Date()) {
  return fromDayKey(addDays(weekKey(now), 7)) - now;
}
