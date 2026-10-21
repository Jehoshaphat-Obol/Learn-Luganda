/*
 * Spaced repetition with Leitner boxes. Each word sits in a box 0–5; a
 * right answer moves it up a box and pushes its next review further out, a
 * wrong one drops it back to box 1 for tomorrow. Words are "due" when their
 * review day has come.
 */
import { addDays, dayKey, daysBetween } from './dates.js';

export const INTERVALS = [0, 1, 3, 7, 14, 30]; // days until next review, by box
export const MAX_MISTAKES = 40;

export function recordWord(s, wordId, correct, today = dayKey()) {
  const w = s.words[wordId] ?? { box: 0, due: today, seen: 0, correct: 0, wrong: 0, lastSeen: null };
  w.seen += 1;
  if (correct) {
    w.correct += 1;
    w.box = Math.min(INTERVALS.length - 1, w.box + 1);
  } else {
    w.wrong += 1;
    w.box = 1;
  }
  w.due = addDays(today, INTERVALS[w.box]);
  w.lastSeen = today;
  s.words[wordId] = w;
  return s;
}

/** Applies a session's results: every practised word up or down a box. */
export function recordSession(s, { wordIds = [], missed = {} }, today = dayKey()) {
  for (const id of wordIds) recordWord(s, id, !missed[id], today);
  const wrong = Object.keys(missed);
  if (wrong.length) {
    s.mistakes = [...wrong, ...s.mistakes.filter((id) => !missed[id])].slice(0, MAX_MISTAKES);
  }
  return s;
}

/** Clears words from the mistakes list once they're answered right. */
export function clearMistakes(s, { wordIds = [], missed = {} }) {
  s.mistakes = s.mistakes.filter((id) => !wordIds.includes(id) || missed[id]);
  return s;
}

export function isDue(entry, today = dayKey()) {
  return Boolean(entry) && daysBetween(entry.due, today) >= 0;
}

/** Due words, most overdue and weakest first. */
export function dueWordIds(s, today = dayKey()) {
  return Object.entries(s.words)
    .filter(([, w]) => isDue(w, today))
    .sort(([, a], [, b]) => a.due.localeCompare(b.due) || a.box - b.box)
    .map(([id]) => id);
}

/** Learned words from weakest to strongest. */
export function weakestWordIds(s) {
  return Object.entries(s.words)
    .sort(([, a], [, b]) => a.box - b.box || (b.wrong - b.correct) - (a.wrong - a.correct))
    .map(([id]) => id);
}

/** 0–1 strength of a set of words (average box out of the top box). */
export function strength(s, wordIds) {
  const known = wordIds.filter((id) => s.words[id]);
  if (!known.length) return 0;
  return known.reduce((n, id) => n + s.words[id].box, 0) / (known.length * (INTERVALS.length - 1));
}
