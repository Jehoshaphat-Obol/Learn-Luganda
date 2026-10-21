import { describe, expect, it } from 'vitest';
import { UNITS_RAW, buildCourse, course, courseStats, sectionOf } from '../src/content/course.js';
import { SECTIONS } from '../src/content/sections.js';
import { validateSections } from '../src/content/validate.js';
import { canJumpTo, isCourseComplete, isLessonPassed, isLessonSkipped, isLessonUnlocked, isSectionUnlocked, nextLessonId, sectionProgress, unitProgress } from '../src/state/progress.js';
import { buildSectionTest } from '../src/lesson/practice.js';

// The real units split into two sections, so jumping can be tested today.
const split = [
  { id: 'a', title: 'A', units: ['u1', 'u2', 'u3', 'u4'] },
  { id: 'b', title: 'B', units: ['u5', 'u6', 'u7', 'u8', 'u99'] },
];
const two = buildCourse(UNITS_RAW, split);
const fresh = (extra = {}) => ({ profile: { level: 'new' }, lessons: {}, jumps: [], ...extra });

describe('sections', () => {
  it('cover every unit in order', () => {
    expect(validateSections(SECTIONS, UNITS_RAW)).toEqual([]);
    expect(course.sections[0].units[0].id).toBe('u1');
    expect(sectionOf('u1').id).toBe('s1');
    expect(courseStats().units).toBe(course.units.length);
  });

  it('leave out units that are not written yet', () => {
    expect(two.sections.map((s) => s.units.length)).toEqual([4, 4]);
    expect(two.units.find((u) => u.id === 'u5').section).toBe('b');
  });

  it('catches missing, doubled and out-of-order units', () => {
    const errors = validateSections(
      [
        { id: 'x', title: 'X', units: ['u2', 'u1'] },
        { id: 'y', title: 'Y', units: ['u2'] },
      ],
      UNITS_RAW,
    ).join('\n');
    expect(errors).toMatch(/u2: in sections x and y/);
    expect(errors).toMatch(/u3: not in any section/);
    expect(errors).toMatch(/u2: out of order/);
  });
});

describe('jumping ahead', () => {
  const firstOfB = two.sections[1].units[0].skills[0].lessons[0].id;

  it('offers a test for locked later sections only', () => {
    expect(canJumpTo(fresh(), 'a', two)).toBe(false);
    expect(canJumpTo(fresh(), 'b', two)).toBe(true);
    expect(isSectionUnlocked(fresh(), 'b', two)).toBe(false);
  });

  it('opens the section and skips the lessons before it', () => {
    const s = fresh({ jumps: ['b'] });
    expect(nextLessonId(s, two)).toBe(firstOfB);
    expect(isLessonUnlocked(s, firstOfB, two)).toBe(true);
    expect(isLessonSkipped(s, 'u1s1l1', two)).toBe(true);
    expect(isLessonPassed(s, 'u4s1l1', two)).toBe(true);
    expect(isLessonUnlocked(s, two.order[two.lessons[firstOfB].order + 1], two)).toBe(false);
    expect(canJumpTo(s, 'b', two)).toBe(false);
    expect(unitProgress(s, 'u1', two)).toMatchObject({ done: 0, complete: false, passed: true });
    expect(sectionProgress(s, 'a', two)).toMatchObject({ done: 0, complete: true });
  });

  it('keeps lessons done before the jump as done', () => {
    const s = fresh({ jumps: ['b'], lessons: { u1s1l1: { completions: 1 } } });
    expect(isLessonSkipped(s, 'u1s1l1', two)).toBe(false);
    expect(sectionProgress(s, 'a', two).done).toBe(1);
  });

  it('builds a section test from earlier sections', () => {
    const before = new Set(two.sections[0].units.flatMap((u) => u.skills.flatMap((s) => s.lessons.flatMap((l) => l.newWords))));
    for (const seed of [1, 2, 3]) {
      const ex = buildSectionTest('b', { course: two, seed });
      expect(ex.length).toBeGreaterThanOrEqual(10);
      const words = ex.flatMap((e) => e.wordIds ?? (e.word ? [e.word.id] : []));
      for (const w of words) expect(before.has(w), w).toBe(true);
    }
  });
});

describe('finishing the course', () => {
  const allDone = Object.fromEntries(course.order.map((id) => [id, { completions: 1, bestAccuracy: 1 }]));
  const last = course.units[course.units.length - 1].id;

  it('has 40 units in 5 sections', () => {
    expect(courseStats(course)).toMatchObject({ sections: 5, units: 40 });
  });

  it('needs every lesson and the last checkpoint', () => {
    expect(isCourseComplete({ lessons: allDone, jumps: [] })).toBe(false);
    expect(isCourseComplete({ lessons: { ...allDone, [`checkpoint-${last}`]: { completions: 1 } }, jumps: [] })).toBe(true);
    const { [course.order[0]]: _, ...missingOne } = allDone;
    expect(isCourseComplete({ lessons: { ...missingOne, [`checkpoint-${last}`]: { completions: 1 } }, jumps: [] })).toBe(false);
  });
});
