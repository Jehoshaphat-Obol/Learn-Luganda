/* Story progress: a story opens once its `unlockAfter` lesson is done (or skipped). */
import { course as defaultCourse } from '../content/course.js';
import { isLessonPassed } from './progress.js';

export const storyKey = (id) => `story-${id}`;

export function isStoryUnlocked(s, story) {
  return isLessonPassed(s, story.unlockAfter);
}

export function isStoryDone(s, story) {
  return Boolean(s.lessons[storyKey(story.id)]?.completions);
}

/** Stories with their state, in course order. */
export function storyList(s, c = defaultCourse) {
  return c.stories.map((story) => ({ story, unlocked: isStoryUnlocked(s, story), done: isStoryDone(s, story) }));
}
