import { describe, expect, it } from 'vitest';
import { BACKOFF_DAYS, DEFAULT_HOUR, dueSlot, ignoredCount, markSent, pickSnippet, plan, recordStudyHour, reminderWindow, seeded, shouldOfferReminders, usualHour } from '../src/reminders/rules.js';
import { REMINDER_STRINGS, fill } from '../src/reminders/strings.js';
import { DEFAULTS, MIGRATIONS } from '../src/state/store.js';
import { course } from '../src/content/course.js';

const state = (reminders = {}) => {
  const s = structuredClone(DEFAULTS);
  s.profile = { name: 'Amani', dailyGoal: 20 };
  s.reminders = { ...s.reminders, on: true, ...reminders };
  return s;
};
const at = (day, h, m = 0) => {
  const [y, mo, d] = day.split('-').map(Number);
  return new Date(y, mo - 1, d, h, m);
};
const hoursOf = (d) => d.getHours() + d.getMinutes() / 60;
const fixed = (v) => () => v;

describe('learning the routine', () => {
  it('needs a few lessons before trusting a usual hour', () => {
    const hours = Array(24).fill(0);
    hours[7] = 2;
    expect(usualHour(hours)).toBe(null);
    hours[7] = 3;
    expect(usualHour(hours)).toBe(7);
  });

  it('favours a cluster of nearby hours over a single spike', () => {
    const hours = Array(24).fill(0);
    hours[20] = 3;
    hours[21] = 3;
    hours[22] = 3;
    hours[9] = 4;
    expect(usualHour(hours)).toBe(21);
  });

  it('records the hour each lesson finishes', () => {
    const s = state();
    recordStudyHour(s, at('2026-10-21', 7, 15));
    recordStudyHour(s, at('2026-10-22', 7, 40));
    expect(s.reminders.hours[7]).toBe(2);
  });
});

describe('reminder window', () => {
  it('defaults to early evening and ends before quiet hours', () => {
    const w = reminderWindow(state().reminders, '2026-10-21');
    const from = hoursOf(new Date(w.from));
    expect(from).toBeGreaterThanOrEqual(DEFAULT_HOUR - 1);
    expect(from).toBeLessThan(DEFAULT_HOUR + 2);
    expect(new Date(w.latest).getHours()).toBe(22);
  });

  it('moves a little from day to day', () => {
    const r = state().reminders;
    const times = ['2026-10-21', '2026-10-22', '2026-10-23', '2026-10-24', '2026-10-25'].map((d) => hoursOf(new Date(reminderWindow(r, d).from)));
    expect(new Set(times).size).toBeGreaterThan(1);
    expect(seeded('2026-10-21')).toBe(seeded('2026-10-21'));
  });

  it('follows a morning learner and never starts before 8:00', () => {
    const hours = Array(24).fill(0);
    hours[6] = 10;
    const w = reminderWindow(state({ hours }).reminders, '2026-10-21');
    expect(hoursOf(new Date(w.from))).toBeGreaterThanOrEqual(8);
    expect(hoursOf(new Date(w.from))).toBeLessThan(9);
  });

  it('lets a night owl get theirs late, but before midnight', () => {
    const w = reminderWindow(state({ hour: 23 }).reminders, '2026-10-21');
    expect(new Date(w.from).getDate()).toBe(21);
    expect(w.from).toBeLessThan(w.latest);
    expect(hoursOf(new Date(w.latest))).toBe(23.5);
  });
});

describe('planning reminders', () => {
  it('plans nothing when reminders are off', () => {
    expect(plan(state({ on: false }), at('2026-10-21', 9))).toEqual([]);
  });

  it('plans today when nothing was learned yet', () => {
    const slots = plan(state(), at('2026-10-21', 9), { rand: fixed(0.1) });
    expect(slots[0].day).toBe('2026-10-21');
    expect(slots).toHaveLength(3);
  });

  it('skips today once the learner has practised', () => {
    const s = state();
    s.xp.byDay['2026-10-21'] = 10;
    expect(plan(s, at('2026-10-21', 9))[0].day).toBe('2026-10-22');
  });

  it('sends at most one a day', () => {
    const s = markSent(state(), '2026-10-21');
    expect(plan(s, at('2026-10-21', 21))[0].day).not.toBe('2026-10-21');
  });

  it('moves to tomorrow when today’s window has passed', () => {
    expect(plan(state(), at('2026-10-21', 22, 30))[0].day).toBe('2026-10-22');
  });

  it('backs off when reminders are ignored', () => {
    const s = state();
    s.xp.byDay['2026-10-10'] = 20;
    markSent(s, '2026-10-11');
    markSent(s, '2026-10-13');
    expect(ignoredCount(s)).toBe(2);
    const slots = plan(s, at('2026-10-14', 9));
    expect(slots.map((x) => x.day)).toEqual(['2026-10-16', '2026-10-21', '2026-10-28']);
    expect(BACKOFF_DAYS.at(-1)).toBe(7);
  });

  it('goes back to daily once the learner studies again', () => {
    const s = state();
    markSent(s, '2026-10-11');
    markSent(s, '2026-10-13');
    s.xp.byDay['2026-10-14'] = 20;
    expect(ignoredCount(s)).toBe(0);
    expect(plan(s, at('2026-10-14', 9))[0].day).toBe('2026-10-15');
  });

  it('finds the slot that is due now', () => {
    const s = state();
    const [slot] = plan(s, at('2026-10-21', 9));
    expect(dueSlot([slot], [], new Date(slot.from - 60_000))).toBe(null);
    expect(dueSlot([slot], [], new Date(slot.from + 60_000))).toBe(slot);
    expect(dueSlot([slot], ['2026-10-21'], new Date(slot.from + 60_000))).toBe(null);
  });
});

describe('what a reminder says', () => {
  it('teaches a word: "Luganda — English"', () => {
    const snip = pickSnippet(state(), '2026-10-21', { rand: fixed(0.99) });
    const w = course.words[snip.wordId];
    expect(snip.title).toBe(fill(REMINDER_STRINGS.title, w));
    expect(snip.title).toContain(' — ');
    expect(snip.url).toBe('#/learn');
  });

  it('prefers words due for review', () => {
    const s = state();
    s.words.weebale = { box: 1, due: '2026-10-20', seen: 2, correct: 1, wrong: 1, lastSeen: '2026-10-19' };
    s.words.kale = { box: 4, due: '2026-11-20', seen: 5, correct: 5, wrong: 0, lastSeen: '2026-10-19' };
    const snip = pickSnippet(s, '2026-10-21', { rand: fixed(0.1) });
    expect(snip.wordId).toBe('weebale');
    expect(snip.title).toBe('Weebale — Thank you');
    expect(snip.url).toBe('#/practice');
  });

  it('never guilt-trips', () => {
    const all = [...REMINDER_STRINGS.review, ...REMINDER_STRINGS.learned, ...REMINDER_STRINGS.fresh].join(' ');
    expect(all).not.toMatch(/miss|sad|streak|lose|disappoint/i);
  });
});

describe('asking for consent', () => {
  const ok = { supported: true, permission: 'default' };
  const learner = (reminders = {}, lessons = 2) => {
    const s = state({ on: false, ...reminders });
    s.stats.lessonsCompleted = lessons;
    return s;
  };

  it('waits until a couple of lessons are done', () => {
    expect(shouldOfferReminders(learner({}, 1), ok)).toBe(false);
    expect(shouldOfferReminders(learner({}, 2), ok)).toBe(true);
  });

  it('respects the browser, a "no" and "not now"', () => {
    expect(shouldOfferReminders(learner(), { supported: true, permission: 'denied' })).toBe(false);
    expect(shouldOfferReminders(learner(), { supported: false, permission: 'default' })).toBe(false);
    expect(shouldOfferReminders(learner({ consent: 'declined' }), ok)).toBe(false);
    const later = learner({ consent: 'later', asks: 1, askedAt: '2026-10-21' });
    expect(shouldOfferReminders(later, ok, at('2026-10-25', 9))).toBe(false);
    expect(shouldOfferReminders(later, ok, at('2026-10-28', 9))).toBe(true);
    expect(shouldOfferReminders(learner({ consent: 'later', asks: 2, askedAt: '2026-01-01' }), ok, at('2026-10-28', 9))).toBe(false);
  });
});

describe('migrating the old daily reminder', () => {
  it('moves the setting and seeds the routine from finished lessons', () => {
    const old = {
      version: 2,
      settings: { sound: true, reminder: true, reminderHour: 19, lastReminder: '2026-10-20' },
      lessons: { a: { completions: 1, lastCompletedAt: new Date(2026, 9, 20, 7, 30).toISOString() } },
    };
    const doc = MIGRATIONS[3](old);
    expect(doc.settings).toEqual({ sound: true });
    expect(doc.reminders).toMatchObject({ on: true, hour: null, consent: 'granted', sent: ['2026-10-20'] });
    expect(doc.reminders.hours[7]).toBe(1);
    expect(MIGRATIONS[3]({ version: 2, settings: { reminderHour: 8 } }).reminders).toMatchObject({ on: false, hour: 8 });
  });
});
