/*
 * Every piece of heart review text in one place, so it can move into the
 * language packs with the rest of the app's strings. `{name}` slots are
 * filled by `fill`. Running out of hearts is a nudge back, never a scolding.
 */

export const HEART_STRINGS = {
  // Mid-lesson, when the last heart goes.
  out: {
    title: 'Let’s take a quick step back',
    body: 'That was your last heart. A short look back at words you’ve already met fills them all up again, then you carry on right where you left off.',
    review: 'Review to refill hearts',
    refill: 'Use {cost} gems instead',
    quit: 'Leave for now',
  },
  // Opening a lesson or checkpoint with no hearts.
  gate: {
    title: 'Warm up first',
    body: 'Your hearts are empty, so start with a quick review of earlier words. Finish it and your hearts fill up for the next lesson.',
    review: 'Start warm-up review',
    refill: 'Use {cost} gems instead',
    back: 'Back to the path',
  },
  session: 'Heart review',
  quit: {
    label: 'Leave heart review',
    title: 'Leave the review?',
    body: 'Your hearts only refill when you finish it. It’s just a few questions.',
    stay: 'Keep reviewing',
    leave: 'Leave',
  },
  done: {
    title: 'Hearts refilled!',
    body: 'Those words are fresher now. Back to it!',
    next: 'Continue lesson',
    start: 'Let’s go',
  },
};

export function fill(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
}
