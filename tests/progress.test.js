import { describe, expect, it } from 'vitest';
import { course } from '../src/content/course.js';
import { isLessonUnlocked, isUnitUnlocked, learnedWordIds, nextLessonId, skillProgress, unitProgress } from '../src/state/progress.js';

const fresh = (extra = {}) => ({ profile: { level: 'new' }, lessons: {}, ...extra });
const done = (...ids) => Object.fromEntries(ids.map((id) => [id, { completions: 1 }]));

describe('progress', () => {
  it('starts at the first lesson with everything else locked', () => {
    const s = fresh();
    expect(nextLessonId(s)).toBe(course.order[0]);
    expect(isLessonUnlocked(s, course.order[0])).toBe(true);
    expect(isLessonUnlocked(s, course.order[1])).toBe(false);
    expect(isUnitUnlocked(s, 'u2')).toBe(false);
  });

  it('unlocks lessons in order', () => {
    const s = fresh({ lessons: done(course.order[0]) });
    expect(nextLessonId(s)).toBe(course.order[1]);
    expect(isLessonUnlocked(s, course.order[2])).toBe(false);
  });

  it('opens the first skill for learners who know some Luganda', () => {
    const s = fresh({ profile: { level: 'some' } });
    const firstSkill = course.units[0].skills[0];
    for (const l of firstSkill.lessons) expect(isLessonUnlocked(s, l.id)).toBe(true);
    expect(isLessonUnlocked(s, course.units[0].skills[1].lessons[1].id)).toBe(false);
  });

  it('reports skill and unit progress', () => {
    const skill = course.units[0].skills[0];
    const s = fresh({ lessons: done(...skill.lessons.map((l) => l.id)) });
    expect(skillProgress(s, skill.id)).toEqual({ done: skill.lessons.length, total: skill.lessons.length, complete: true });
    expect(unitProgress(s, 'u1').complete).toBe(false);
    expect(learnedWordIds(s)).toContain('oli-otya');
  });

  it('returns null when every lesson is done', () => {
    expect(nextLessonId(fresh({ lessons: done(...course.order) }))).toBeNull();
    expect(isUnitUnlocked(fresh({ lessons: done(...course.order) }), 'u2')).toBe(true);
  });
});
