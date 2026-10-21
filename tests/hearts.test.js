import { describe, expect, it } from 'vitest';
import { HEART_REVIEW_WORDS, MAX_HEARTS, REFILL_COST, REFILL_MS, finishHeartReview, formatWait, gainHeart, heartReviewWordIds, heartStatus, loseHeart, refillHearts, settleHearts } from '../src/state/hearts.js';

const fresh = () => ({ gems: 50, hearts: { count: 5, updatedAt: 0 } });

describe('hearts', () => {
  it('starts full and loses one per mistake', () => {
    const s = fresh();
    loseHeart(s, 1000);
    expect(s.hearts).toEqual({ count: 4, updatedAt: 1000 });
    loseHeart(s, 2000);
    expect(s.hearts.count).toBe(3);
    expect(s.hearts.updatedAt).toBe(1000); // clock keeps running from the first loss
  });

  it('never goes below zero', () => {
    const s = fresh();
    for (let i = 0; i < 8; i += 1) loseHeart(s, 1000);
    expect(s.hearts.count).toBe(0);
  });

  it('refills one heart per interval, carrying the remainder', () => {
    const s = fresh();
    loseHeart(s, 0);
    loseHeart(s, 0);
    loseHeart(s, 0);
    settleHearts(s, REFILL_MS + 10);
    expect(s.hearts).toEqual({ count: 3, updatedAt: REFILL_MS });
    expect(heartStatus(s, REFILL_MS + 10).nextAt).toBe(2 * REFILL_MS);
    settleHearts(s, 10 * REFILL_MS);
    expect(s.hearts.count).toBe(MAX_HEARTS);
    expect(heartStatus(s, 10 * REFILL_MS)).toMatchObject({ full: true, nextAt: null });
  });

  it('status is read-only', () => {
    const s = fresh();
    loseHeart(s, 0);
    heartStatus(s, 5 * REFILL_MS);
    expect(s.hearts.count).toBe(4);
  });

  it('gains and refills with gems', () => {
    const s = fresh();
    loseHeart(s, 0);
    loseHeart(s, 0);
    gainHeart(s, 1, 10);
    expect(s.hearts.count).toBe(4);
    expect(refillHearts(s, 20)).toBe(true);
    expect(s.gems).toBe(50 - REFILL_COST);
    expect(s.hearts.count).toBe(MAX_HEARTS);
    expect(refillHearts({ gems: 1, hearts: { count: 0, updatedAt: 0 } })).toBe(false);
  });

  it('formats the wait', () => {
    expect(formatWait(3 * 3600000 + 12 * 60000)).toBe('3h 12m');
    expect(formatWait(1000)).toBe('1m');
  });
});

describe('heart review', () => {
  const state = (extra = {}) => ({ gems: 0, hearts: { count: 0, updatedAt: 0 }, words: {}, mistakes: [], ...extra });

  it('steps back to what was missed, then saved mistakes, then weak earlier words', () => {
    const s = state({
      mistakes: ['m1', 'x'],
      words: {
        strong: { box: 5, due: '2099-01-01', seen: 9, correct: 9, wrong: 0 },
        weak: { box: 1, due: '2000-01-01', seen: 3, correct: 1, wrong: 2 },
      },
    });
    const ids = heartReviewWordIds(s, { missed: ['x'], seen: ['now'], learned: ['strong', 'weak', 'fresh'] });
    expect(ids).toEqual(['x', 'm1', 'weak', 'strong', 'fresh', 'now']);
  });

  it('keeps it short and skips unknown words', () => {
    const learned = Array.from({ length: 20 }, (_, i) => `w${i}`);
    expect(heartReviewWordIds(state(), { learned })).toHaveLength(HEART_REVIEW_WORDS);
    expect(heartReviewWordIds(state(), { learned: ['a', 'b'], exists: (id) => id === 'b' })).toEqual(['b']);
  });

  it('works for a brand new learner from the words just seen', () => {
    expect(heartReviewWordIds(state(), { missed: ['a'], seen: ['a', 'b'] })).toEqual(['a', 'b']);
  });

  it('fills hearts, records the words and clears fixed mistakes', () => {
    const s = state({ mistakes: ['a', 'b'] });
    finishHeartReview(s, { wordIds: ['a', 'b'], missed: { b: 1 } }, Date.UTC(2026, 9, 21));
    expect(s.hearts).toEqual({ count: MAX_HEARTS, updatedAt: Date.UTC(2026, 9, 21) });
    expect(s.mistakes).toEqual(['b']);
    expect(s.words.a.box).toBe(1);
    expect(s.words.b.wrong).toBe(1);
    expect(s.gems).toBe(0); // free: gems are only a shortcut
  });
});
