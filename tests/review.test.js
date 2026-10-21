import { describe, expect, it } from 'vitest';
import { dueWordIds, recordSession, recordWord, strength, weakestWordIds, clearMistakes } from '../src/state/review.js';

const fresh = () => ({ words: {}, mistakes: [] });

describe('spaced review', () => {
  it('moves words up the boxes and schedules them further out', () => {
    const s = fresh();
    recordWord(s, 'a', true, '2026-10-20');
    expect(s.words.a).toMatchObject({ box: 1, due: '2026-10-21' });
    recordWord(s, 'a', true, '2026-10-21');
    expect(s.words.a).toMatchObject({ box: 2, due: '2026-10-24' });
    recordWord(s, 'a', false, '2026-10-24');
    expect(s.words.a).toMatchObject({ box: 1, due: '2026-10-25', wrong: 1 });
  });

  it('lists due words, most overdue first', () => {
    const s = fresh();
    recordWord(s, 'a', true, '2026-10-10');
    recordWord(s, 'b', true, '2026-10-15');
    recordWord(s, 'c', true, '2026-10-20');
    expect(dueWordIds(s, '2026-10-20')).toEqual(['a', 'b']);
    expect(dueWordIds(s, '2026-10-21')).toEqual(['a', 'b', 'c']);
  });

  it('records sessions and keeps a mistakes list', () => {
    const s = fresh();
    recordSession(s, { wordIds: ['a', 'b'], missed: { b: 1 } }, '2026-10-20');
    expect(s.words.a.box).toBe(1);
    expect(s.words.b.wrong).toBe(1);
    expect(s.mistakes).toEqual(['b']);
    expect(weakestWordIds(s)[0]).toBe('b');
    clearMistakes(s, { wordIds: ['b'], missed: {} });
    expect(s.mistakes).toEqual([]);
  });

  it('measures strength', () => {
    const s = fresh();
    expect(strength(s, ['a'])).toBe(0);
    for (let i = 0; i < 5; i += 1) recordWord(s, 'a', true, '2026-10-20');
    expect(strength(s, ['a'])).toBe(1);
  });
});

import { buildCheckpoint, buildPractice } from '../src/lesson/practice.js';
import { course } from '../src/content/course.js';

describe('practice builder', () => {
  it('builds a session from a few words', () => {
    const ex = buildPractice(['weebale', 'gyendi', 'oli-otya', 'ssebo'], { seed: 1 });
    expect(ex.length).toBeGreaterThanOrEqual(6);
    expect(ex.some((e) => e.type === 'match')).toBe(true);
    expect(ex.every((e) => e.type !== 'intro')).toBe(true);
  });

  it('returns nothing without words', () => {
    expect(buildPractice([])).toEqual([]);
  });

  it('builds a checkpoint for every unit', () => {
    for (const u of course.units) {
      const ex = buildCheckpoint(u.id, { seed: 3 });
      expect(ex.length).toBeGreaterThanOrEqual(10);
    }
  });
});
