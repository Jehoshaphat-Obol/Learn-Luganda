/* Learner profile: who they are and what they're aiming for. */
import { store } from './store.js';
import { dayKey } from './dates.js';

// `id` names the goal in the UI pack (goals.<id>).
export const DAILY_GOALS = [
  { xp: 10, id: 'casual', minutes: 5 },
  { xp: 20, id: 'regular', minutes: 10 },
  { xp: 30, id: 'serious', minutes: 15 },
  { xp: 50, id: 'intense', minutes: 20 },
];

export const AVATAR_COLORS = ['vermillion', 'ink', 'butter', 'sky', 'sage', 'lilac', 'blush'];

export function createProfile({ name, avatar, dailyGoal = 20, motivation = null, level = 'new' }, now = new Date()) {
  const clean = String(name ?? '').trim().slice(0, 30);
  return {
    name: clean || 'Learner',
    avatar: { character: avatar?.character ?? 'nakato', color: avatar?.color ?? 'vermillion' },
    dailyGoal,
    motivation,
    level,
    joinedAt: dayKey(now),
  };
}

export function saveProfile(fields) {
  store.update((s) => {
    s.profile = s.profile ? { ...s.profile, ...fields, avatar: { ...s.profile.avatar, ...fields.avatar } } : createProfile(fields);
  });
}
