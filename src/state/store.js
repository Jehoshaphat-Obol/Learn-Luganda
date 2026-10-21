/*
 * The app's single progress document. Feature modules read and write their
 * own slice through `store.update`; defaults here are the shape of a brand
 * new learner.
 */
import { createStore } from './storage.js';

export const STORAGE_KEY = 'learn-luganda';
export const SCHEMA_VERSION = 1;

export const DEFAULTS = {
  // null until onboarding finishes: { name, avatar, dailyGoal, motivation, level, joinedAt }
  profile: null,
  onboarding: { step: 0, answers: {} },
  // reminder: opt-in daily notification at reminderHour (local time)
  settings: { sound: true, motion: true, reminder: false, reminderHour: 19, lastReminder: null },
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
  league: {},
  stats: { lessonsCompleted: 0, perfectLessons: 0, practiceSessions: 0, answers: 0, correctAnswers: 0, secondsLearning: 0 },
};

export const store = createStore({
  key: STORAGE_KEY,
  version: SCHEMA_VERSION,
  defaults: DEFAULTS,
});

export const hasProfile = () => Boolean(store.get().profile);
