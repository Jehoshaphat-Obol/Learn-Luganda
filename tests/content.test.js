import { describe, expect, it } from 'vitest';
import { UNITS_RAW, buildCourse, course, wordsUpTo } from '../src/content/course.js';
import { validateUnits } from '../src/content/validate.js';

describe('course content', () => {
  it('passes validation', () => {
    expect(validateUnits(UNITS_RAW)).toEqual([]);
  });

  it('indexes lessons in course order', () => {
    expect(course.order[0]).toBe('u1s1l1');
    expect(course.lessons.u1s1l1.skill).toBe('u1s1');
    expect(course.lessons[course.order[1]].order).toBe(1);
  });

  it('lists words known by a lesson', () => {
    const known = wordsUpTo('u1s1l2');
    expect(known).toContain('oli-otya');
    expect(known).toContain('nedda');
    expect(known).not.toContain('weraba');
  });
});

describe('validateUnits', () => {
  const base = () => ({
    id: 'ux',
    title: 'T',
    words: [['a', 'A', 'a'], ['b', 'B', 'b']],
    sentences: [['s1', 'A B', 'a b']],
    skills: [{ id: 'ux1', lessons: [{ id: 'ux1l1', newWords: ['a', 'b'], sentences: ['s1'] }] }],
  });

  it('accepts a minimal unit', () => {
    expect(validateUnits([base()])).toEqual([]);
    expect(buildCourse([base()]).order).toEqual(['ux1l1']);
  });

  it('catches unknown refs, duplicates and untaught words', () => {
    const u = base();
    u.words.push(['c', 'C', 'c']);
    u.skills[0].lessons.push({ id: 'ux1l2', newWords: ['a', 'zz'], sentences: ['nope'], dialogues: [{ line: 'x', translation: 'y', options: ['p', 'q'], answer: 'r' }] });
    const errors = validateUnits([u]).join('\n');
    expect(errors).toMatch(/already introduced/);
    expect(errors).toMatch(/unknown word "zz"/);
    expect(errors).toMatch(/unknown sentence "nope"/);
    expect(errors).toMatch(/answer must be one of the options/);
    expect(errors).toMatch(/"c" is never introduced/);
  });
});

describe('every lesson', () => {
  it('builds a full lesson and a checkpoint for each unit', async () => {
    const { buildLesson } = await import('../src/lesson/generate.js');
    const { buildCheckpoint } = await import('../src/lesson/practice.js');
    for (const id of course.order) {
      for (const seed of [1, 2, 3]) {
        const ex = buildLesson(id, { seed });
        expect(ex.length, id).toBeGreaterThanOrEqual(8);
        for (const e of ex) {
          if (e.type === 'choice') expect(e.options.length, id).toBeGreaterThanOrEqual(2);
          if (e.type === 'translate') expect(e.bank.length, id).toBeGreaterThan(0);
          if (e.type === 'match') expect(new Set(e.pairs.map((p) => p.en.toLowerCase())).size, id).toBe(e.pairs.length);
        }
      }
    }
    for (const u of course.units) {
      const known = u.skills.flatMap((s) => s.lessons.flatMap((l) => l.newWords));
      expect(buildCheckpoint(u.id, { knownIds: known }).length, u.id).toBeGreaterThan(5);
    }
  });
});
