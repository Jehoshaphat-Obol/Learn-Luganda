/*
 * Ready-made random picks for the app's screens, so each view asks for a
 * mood ("celebrate", "empty") and gets a different drawing every time.
 */
import { CAST } from './characters.js';
import { mascot } from './mascot.js';
import { PROP_IDS } from './props.js';
import { PLACE_IDS, placeScene } from './places.js';
import { lessonCompleteScene } from './scenes.js';
import { chance, pick, sample } from './random.js';

const MOODS = {
  celebrate: ['cheering', 'dancing', 'waving', 'happy'],
  greet: ['waving', 'happy', 'idle'],
  empty: ['thinking', 'sleeping', 'idle'],
  ponder: ['thinking', 'idle'],
  sad: ['sad'],
};

/** A crane pose that fits the mood. */
export function randomPose(mood = 'greet') {
  return pick(MOODS[mood] ?? MOODS.greet);
}

/** The crane for an empty or waiting screen, sometimes with a prop. */
export function emptyStateArt(mood = 'empty', { label } = {}) {
  const pose = randomPose(mood);
  return mascot({ pose, prop: chance(0.6) ? pick(PROP_IDS) : undefined, label });
}

/**
 * Art for the end of a lesson: usually the crane on its sun, sometimes the
 * crane and two friends celebrating in one of the places.
 */
export function celebrationArt({ xp = 15 } = {}) {
  if (chance(0.35)) {
    const place = pick(PLACE_IDS);
    return placeScene(place, {
      cast: sample(Object.keys(CAST), 2),
      pose: pick(MOODS.celebrate),
      label: `Lesson complete. The crane and friends celebrate. You earned ${xp} XP.`,
    });
  }
  return lessonCompleteScene({ xp });
}
