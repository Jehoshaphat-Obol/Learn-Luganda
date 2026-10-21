/* Story progress: a story opens once its `unlockAfter` lesson is done. */
import { STORIES } from '../content/stories.js';
import { isLessonDone } from './progress.js';

export const storyKey = (id) => `story-${id}`;

export function isStoryUnlocked(s, story) {
  return isLessonDone(s, story.unlockAfter);
}

export function isStoryDone(s, story) {
  return Boolean(s.lessons[storyKey(story.id)]?.completions);
}

/** Stories with their state, in course order. */
export function storyList(s) {
  return STORIES.map((story) => ({ story, unlocked: isStoryUnlocked(s, story), done: isStoryDone(s, story) }));
}
