/*
 * Every piece of reminder text in one place, so it can move into the
 * language config with the rest of the app's strings. `{name}` slots are
 * filled by `fill`. Notifications teach a word; they never guilt-trip.
 */

export const REMINDER_STRINGS = {
  // A notification's title is the snippet itself: "Weebale — Thank you".
  title: '{lg} — {en}',
  // Bodies are picked at random so the same nudge doesn't repeat word for word.
  review: ['Say it out loud once today.', 'Two minutes of practice keeps it fresh.', 'Tap to practise a few words.', 'A quick review is ready when you are.'],
  learned: ['One you already know. Can you use it today?', 'Tap for a short practice.', 'Try it on someone today.'],
  fresh: ['A word from your next lesson.', 'New today. Tap to learn it properly.'],

  consent: {
    title: 'A word a day?',
    body: 'We can send one short Luganda word, like “Weebale — Thank you”, around the time you usually learn. Never more than once a day, and never on days you’ve already practised.',
    yes: 'Yes, send me words',
    later: 'Tap Continue if you’d rather not. You can turn this on in Settings any time.',
    on: 'Done. Your first word arrives soon. Weebale!',
    blocked: 'Notifications are blocked for this site. Allow them in your browser settings to get word reminders.',
  },

  settings: {
    label: 'Word reminders',
    hint: 'One short Luganda word a day, around when you usually learn. Skipped on days you’ve practised, and less often if you’re busy.',
    time: 'Reminder time',
    auto: 'Automatic (learns your routine)',
    limited: 'This browser only shows reminders while the app is open in the background. Install the app in Chrome or Edge for reminders when it’s closed.',
  },
};

export function fill(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
}
