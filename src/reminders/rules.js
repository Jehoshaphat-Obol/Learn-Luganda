/*
 * When to send a word reminder, and which word. Loose rules rather than a
 * fixed alarm: aim a little after the hour the learner usually studies,
 * move the time a bit each day, keep out of quiet hours, skip days they've
 * already practised, send at most one a day, and wait longer each time a
 * reminder is ignored. Everything here is pure; `now` and `rand` are passed
 * in so it can be tested.
 */
import { course as defaultCourse } from '../content/course.js';
import { nextLessonId } from '../state/progress.js';
import { dueWordIds } from '../state/review.js';
import { addDays, dayKey, daysBetween, fromDayKey } from '../state/dates.js';
import { REMINDER_STRINGS, fill } from './strings.js';

export const DEFAULT_HOUR = 19;
export const QUIET = { start: 22, end: 8 }; // no reminders from 22:00 to 08:00
export const LATE_END = 23.5; // for learners who study at night
export const BACKOFF_DAYS = [1, 2, 3, 5, 7]; // gap after 0, 1, 2, 3, 4+ ignored reminders
export const MIN_SAMPLES = 3;
const AFTER_USUAL_MIN = 30; // aim a little after the usual time
const JITTER_MIN = 40; // ± this many minutes, different each day
const KEEP_SENT = 10;

/** Notes the hour a lesson or practice finished, to learn the routine. */
export function recordStudyHour(s, now = new Date()) {
  const hours = Array.isArray(s.reminders.hours) && s.reminders.hours.length === 24 ? s.reminders.hours : Array(24).fill(0);
  hours[now.getHours()] += 1;
  s.reminders.hours = hours;
  return s;
}

/** The hour the learner studies most, smoothed over neighbouring hours; null without enough history. */
export function usualHour(hours = []) {
  const total = hours.reduce((n, h) => n + h, 0);
  if (total < MIN_SAMPLES) return null;
  let best = null;
  let bestScore = -1;
  for (let h = 0; h < 24; h += 1) {
    const score = 2 * (hours[h] ?? 0) + (hours[(h + 23) % 24] ?? 0) + (hours[(h + 1) % 24] ?? 0);
    if (score > bestScore) {
      best = h;
      bestScore = score;
    }
  }
  return best;
}

/** Stable 0–1 value for a string, so a day's jitter doesn't change on every check. */
export function seeded(text) {
  let h = 2166136261;
  for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return ((h >>> 0) % 10000) / 10000;
}

/**
 * The window on `day` in which a reminder may go out: from a jittered time
 * near the target hour until quiet hours begin. Times are epoch ms.
 */
export function reminderWindow(r, day) {
  const chosen = Number.isInteger(r.hour);
  const base = chosen ? r.hour : (usualHour(r.hours) ?? DEFAULT_HOUR);
  const late = base >= QUIET.start - 1;
  const end = late ? LATE_END : QUIET.start;
  let minutes = base * 60 + (chosen ? 0 : AFTER_USUAL_MIN) + Math.round((seeded(day) * 2 - 1) * JITTER_MIN);
  minutes = Math.max(QUIET.end * 60, Math.min(minutes, end * 60 - 45));
  const midnight = fromDayKey(day).getTime();
  return { from: midnight + minutes * 60_000, latest: midnight + end * 3_600_000 };
}

/** The last day the learner earned XP or extended the streak. */
function lastStudyDay(s) {
  const days = Object.keys(s.xp?.byDay ?? {}).filter((d) => s.xp.byDay[d] > 0);
  if (s.streak?.lastDay) days.push(s.streak.lastDay);
  return days.sort().at(-1) ?? null;
}

/** Reminders sent since the learner last studied. */
export function ignoredCount(s) {
  const last = lastStudyDay(s);
  return (s.reminders.sent ?? []).filter((d) => !last || d > last).length;
}

/** Days to wait after a reminder when `ignored` reminders have gone unanswered. */
export const gapAfter = (ignored) => BACKOFF_DAYS[Math.min(ignored, BACKOFF_DAYS.length - 1)];

const pick = (list, rand) => list[Math.floor(rand() * list.length) % list.length];

/** A short lesson snippet for a notification: a due word, a known word or the next new one. */
export function pickSnippet(s, day, { rand = Math.random, c = defaultCourse } = {}) {
  const known = (ids) => ids.filter((id) => c.words[id]);
  const due = known(dueWordIds(s, day)).slice(0, 6);
  const learned = known(Object.keys(s.words ?? {}));
  const next = nextLessonId(s, c);
  const fresh = known(c.lessons[next]?.newWords ?? c.lessons[c.order[0]]?.newWords ?? []).filter((id) => !s.words?.[id]);
  const roll = rand();
  let kind;
  let id;
  if (due.length && roll < 0.6) [kind, id] = ['review', pick(due, rand)];
  else if (learned.length && (roll < 0.85 || !fresh.length)) [kind, id] = ['learned', pick(learned, rand)];
  else if (fresh.length) [kind, id] = ['fresh', pick(fresh, rand)];
  else [kind, id] = ['learned', Object.keys(c.words)[0]];
  const w = c.words[id];
  // Sometimes the word's own note says more than a stock line would.
  const body = w.notes && rand() < 0.4 ? w.notes : pick(REMINDER_STRINGS[kind], rand);
  return { wordId: id, title: fill(REMINDER_STRINGS.title, { target: w.target, base: w.base }), body, url: kind === 'fresh' ? '#/learn' : '#/practice' };
}

/**
 * The next few reminders, assuming the learner doesn't open the app in
 * between (each later one backs off further). The service worker works from
 * this list when the app is closed; it's rebuilt whenever progress changes.
 */
export function plan(s, now = new Date(), { count = 3, rand = Math.random, c = defaultCourse } = {}) {
  const r = s.reminders;
  if (!r?.on || !s.profile) return [];
  const today = dayKey(now);
  const sent = r.sent ?? [];
  let ignored = ignoredCount(s);
  const lastSent = sent.at(-1);
  let day = lastSent ? addDays(lastSent, gapAfter(ignored)) : today;
  if (daysBetween(day, today) > 0) day = today;
  if (day === today && (lastStudyDay(s) === today || sent.includes(today))) day = addDays(today, 1);
  const slots = [];
  while (slots.length < count) {
    const win = reminderWindow(r, day);
    if (win.latest > now.getTime()) {
      slots.push({ day, ...win, ...pickSnippet(s, day, { rand, c }) });
      ignored += 1;
      day = addDays(day, gapAfter(ignored));
    } else {
      day = addDays(day, 1);
    }
  }
  return slots;
}

/** The slot to show right now, if any. */
export function dueSlot(slots, sent = [], now = new Date()) {
  const t = now.getTime();
  return slots.find((x) => x.from <= t && t < x.latest && x.day === dayKey(now) && !sent.includes(x.day)) ?? null;
}

/** Records a sent reminder, keeping the log short. */
export function markSent(s, day) {
  s.reminders.sent = [...new Set([...(s.reminders.sent ?? []), day])].sort().slice(-KEEP_SENT);
  return s;
}

export const CONSENT_SNOOZE_DAYS = 7;
export const MAX_ASKS = 2;
export const MIN_LESSONS_BEFORE_ASK = 2;

/** Whether to offer reminders after a lesson: never on first visit, at most twice, a week apart. */
export function shouldOfferReminders(s, { supported, permission }, now = new Date()) {
  const r = s.reminders;
  if (!supported || permission === 'denied' || !s.profile || r.on) return false;
  if (r.consent === 'declined' || r.asks >= MAX_ASKS) return false;
  if ((s.stats?.lessonsCompleted ?? 0) < MIN_LESSONS_BEFORE_ASK) return false;
  return !r.askedAt || daysBetween(r.askedAt, dayKey(now)) >= CONSENT_SNOOZE_DAYS;
}
