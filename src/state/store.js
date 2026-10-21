/*
 * The app's single progress document. Feature modules read and write their
 * own slice through `store.update`; defaults here are the shape of a brand
 * new learner.
 */
import { createStore } from './storage.js';

export const STORAGE_KEY = 'learn-luganda';
export const SCHEMA_VERSION = 3;

export const DEFAULTS = {
  // null until onboarding finishes: { name, avatar, dailyGoal, motivation, level, joinedAt }
  profile: null,
  onboarding: { step: 0, answers: {} },
  // soundPack: 'playful' | 'soft' (see src/ui/sound.js)
  // uiLang: the interface language (null = detect from the browser);
  // course: the active from→to course pack
  settings: { sound: true, soundPack: 'playful', music: true, haptics: true, motion: true, uiLang: null, course: 'en-lg' },
  // Progress of courses other than the active one, by course id (see ./courses.js).
  courses: {},
  // Opt-in word reminders (src/reminders). hour: null learns the routine from
  // `hours` (lessons finished per hour of day); consent: 'unasked' | 'granted'
  // | 'later' | 'declined'; sent: day keys reminders went out.
  reminders: { on: false, hour: null, consent: 'unasked', askedAt: null, asks: 0, sent: [], hours: Array(24).fill(0) },
  // lessonId -> { completions, bestAccuracy, lastCompletedAt }
  lessons: {},
  xp: { total: 0, byDay: {} },
  gems: 50,
  hearts: { count: 5, updatedAt: 0 },
  streak: { current: 0, longest: 0, lastDay: null, freezes: 0, frozenDays: [] },
  // wordId -> { box, due, seen, correct, wrong, lastSeen }
  words: {},
  mistakes: [],
  // section ids reached early by passing a section test
  jumps: [],
  achievements: {},
  inventory: {},
  stats: { lessonsCompleted: 0, perfectLessons: 0, practiceSessions: 0, answers: 0, correctAnswers: 0, secondsLearning: 0 },
};

/** `MIGRATIONS[n]` upgrades a saved document from version n-1 to n. */
export const MIGRATIONS = {
  // v2: weekly leagues were removed; drop their saved slice.
  2: ({ league, ...doc }) => doc,
  // v3: the fixed-hour daily reminder became smart word reminders. Keep an
  // explicit hour (19 was the default, so treat it as "learn my routine") and
  // seed the routine from when lessons were last finished.
  3: (doc) => {
    const { reminder = false, reminderHour = 19, lastReminder = null, ...settings } = doc.settings ?? {};
    const hours = Array(24).fill(0);
    for (const l of Object.values(doc.lessons ?? {})) {
      if (l?.lastCompletedAt) hours[new Date(l.lastCompletedAt).getHours()] += 1;
    }
    const reminders = { on: Boolean(reminder), hour: reminderHour === 19 ? null : reminderHour, consent: reminder ? 'granted' : 'unasked', askedAt: null, asks: 0, sent: lastReminder ? [lastReminder] : [], hours };
    return { ...doc, settings, reminders };
  },
};

export const store = createStore({
  key: STORAGE_KEY,
  version: SCHEMA_VERSION,
  defaults: DEFAULTS,
  migrations: MIGRATIONS,
});

export const hasProfile = () => Boolean(store.get().profile);
