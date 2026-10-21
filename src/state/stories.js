/* Story progress: a story opens once its `unlockAfter` lesson is done (or skipped). */
import { STORIES } from '../content/stories.js';
import { isLessonPassed } from './progress.js';

export const storyKey = (id) => `story-${id}`;

export function isStoryUnlocked(s, story) {
  return isLessonPassed(s, story.unlockAfter);
}

export function isStoryDone(s, story) {
  return Boolean(s.lessons[storyKey(story.id)]?.completions);
}

/** Stories with their state, in course order. */
export function storyList(s) {
  return STORIES.map((story) => ({ story, unlocked: isStoryUnlocked(s, story), done: isStoryDone(s, story) }));
}
