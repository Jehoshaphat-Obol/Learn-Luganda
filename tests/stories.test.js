import { describe, expect, it } from 'vitest';
import { UNITS_RAW, course } from '../src/content/course.js';
import { validateGuidebooks, validateStories } from '../src/content/validate.js';
import { STORIES } from '../src/content/stories.js';
import { GUIDEBOOKS } from '../src/content/guidebooks.js';
import { CAST } from '../src/illustrations/characters.js';
import { isStoryDone, isStoryUnlocked, storyKey } from '../src/state/stories.js';

const ctx = { lessons: Object.keys(course.lessons), units: UNITS_RAW.map((u) => u.id), cast: Object.keys(CAST) };

describe('stories and guidebooks', () => {
  it('pass validation', () => {
    expect(validateStories(STORIES, ctx)).toEqual([]);
    expect(validateGuidebooks(GUIDEBOOKS, UNITS_RAW)).toEqual([]);
  });

  it('catches bad stories and missing tips', () => {
    const bad = [{ id: 'x', unit: 'u999', unlockAfter: 'nope', steps: [{ line: ['ghost', 'Hi', ''] }, { question: 'Q', options: ['a'], answer: 3 }] }];
    expect(validateStories(bad, ctx)).toHaveLength(5);
    expect(validateGuidebooks({}, UNITS_RAW)).toHaveLength(UNITS_RAW.length);
  });

  it('unlocks a story after its lesson', () => {
    const story = STORIES[0];
    const s = { lessons: {} };
    expect(isStoryUnlocked(s, story)).toBe(false);
    s.lessons[story.unlockAfter] = { completions: 1 };
    expect(isStoryUnlocked(s, story)).toBe(true);
    expect(isStoryDone(s, story)).toBe(false);
    s.lessons[storyKey(story.id)] = { completions: 1 };
    expect(isStoryDone(s, story)).toBe(true);
  });
});
