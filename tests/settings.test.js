import { describe, expect, it } from 'vitest';
import { buildCourse, castMember, course, useCourse } from '../src/content/course.js';
import { DEFAULT_SETTINGS, mergeSettings } from '../src/content/settings.js';
import { buildLesson } from '../src/lesson/generate.js';
import { buildCheckpoint, buildPractice } from '../src/lesson/practice.js';
import { checkTyped, isAccepted, normalise } from '../src/lesson/answers.js';
import { portrait } from '../src/illustrations/index.js';

const words = ['a', 'b', 'c', 'd', 'e'].map((id) => ({ id, target: `${id.toUpperCase()}lo`, base: `${id}-word` }));
const unit = (settings, lessonSettings) => ({
  id: 'u1',
  title: 'Unit',
  words,
  sentences: [{ id: 's1', target: 'Alo Blo', base: 'a-word b-word' }],
  settings,
  skills: [{ id: 'k1', title: 'Skill', lessons: [{ id: 'l1', newWords: ['a', 'b', 'c', 'd', 'e'], sentences: ['s1'], settings: lessonSettings }] }],
  guidebook: { intro: '', phrases: [], tips: [], culture: [] },
});

describe('settings', () => {
  it('merge objects deeply and replace lists', () => {
    const out = mergeSettings(DEFAULT_SETTINGS, { lesson: { steps: ['match'], match: { pairs: 3 } } });
    expect(out.lesson.steps).toEqual(['match']);
    expect(out.lesson.match).toEqual({ pairs: 3, minPairs: 3 });
    expect(out.lesson.maxExercises).toBe(18);
    expect(DEFAULT_SETTINGS.lesson.steps).toHaveLength(10);
  });

  it('cascade from course to unit to lesson', () => {
    const c = buildCourse([unit({ lesson: { maxExercises: 9 } }, { lesson: { introCards: false } })], undefined, { settings: { checkpoint: { size: 6 } } });
    const s = c.lessons.l1.settings;
    expect(s.lesson.maxExercises).toBe(9);
    expect(s.lesson.introCards).toBe(false);
    expect(s.checkpoint.size).toBe(6);
    expect(c.settings.lesson.maxExercises).toBe(18);
    expect(Object.isFrozen(s.lesson)).toBe(true);
  });

  it('let a course choose its own lesson recipe', () => {
    const c = buildCourse([unit(undefined, { lesson: { steps: ['match', 'sentences', 'type'], type: { direction: 'toTarget' } } })]);
    const types = buildLesson('l1', { course: c, seed: 3 }).map((e) => e.type);
    expect(types).toEqual(['match', 'translate', 'type']);
    const typed = buildLesson('l1', { course: c, seed: 3 }).at(-1);
    expect(typed).toMatchObject({ lang: 'target', answerText: 'Alo Blo' });
  });

  it('size practice and checkpoints from the pack', () => {
    const c = buildCourse([unit({ checkpoint: { size: 4 } })], undefined, { settings: { practice: { size: 5, steps: ['choice'], shuffle: false } } });
    expect(buildPractice(['a', 'b', 'c', 'd', 'e'], { course: c, seed: 1 }).map((e) => e.type)).toEqual(['choice', 'choice', 'choice', 'choice', 'choice']);
    expect(buildCheckpoint('u1', { course: c, seed: 1 })).toHaveLength(4);
  });

  it('use the Luganda defaults for the real course', () => {
    expect(course.settings.answers.equivalents).toEqual({ ŋ: 'ng' });
    expect(course.settings.lesson.steps).toEqual(DEFAULT_SETTINGS.lesson.steps);
  });
});

describe('answer rules per course', () => {
  it('accepts ng for ŋ in Luganda', () => {
    expect(isAccepted('Ngenda', ['Ŋŋenda'])).toBe(false);
    expect(isAccepted('Ngngenda', ['Ŋŋenda'])).toBe(true);
  });

  it('can make tone marks optional', () => {
    const saved = course;
    try {
      useCourse(buildCourse([unit()], undefined, { settings: { answers: { ignoreDiacritics: true, lettersPerTypo: 4 } } }));
      expect(normalise('Ẹ káàrọ̀')).toBe('e kaaro');
      expect(isAccepted('e kaaro', ['Ẹ káàrọ̀'])).toBe(true);
      expect(checkTyped('abcxefgh', ['abcdefgh']).typo).toBe(true);
      expect(checkTyped('abxxefgh', ['abcdefgh']).correct).toBe(true);
      useCourse(buildCourse([unit()]));
      expect(isAccepted('e kaaro', ['Ẹ káàrọ̀'])).toBe(false);
    } finally {
      useCourse(saved);
    }
  });
});

describe('cast', () => {
  it('names the pack’s characters and reuses illustrated looks', () => {
    expect(castMember('jjajja')).toMatchObject({ name: 'Jjajja Nalwoga', look: { hair: 'headwrap' } });
  });

  it('draws a character a pack describes itself', () => {
    const look = { skin: '#6b3f26', shade: '#52301b', hair: 'short', hairColor: '#1c1512', top: 'f-ink', card: 'f-sage', backdrop: 'arch', texture: 'grid' };
    const c = buildCourse([], undefined, { id: 'en-yo', cast: { tunde: { name: 'Túndé', role: 'A tailor in Ibadan', look } } });
    const who = castMember('tunde', c);
    expect(who).toMatchObject({ name: 'Túndé', role: 'A tailor in Ibadan', look: { id: 'en-yo-tunde', extras: [] } });
    expect(portrait(who.look, { expression: 'happy' })).toContain('Túndé');
  });
});
