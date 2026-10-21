# 2026-10-21: Smart word reminders

Issue: #79 · Branch: `feat/79-smart-reminders`

## Context

The owner asked for opt-in notifications that remind learners to study
without nagging, and that teach something instead of guilt-tripping
("Weebale means thank you", not "we miss you"). The old reminder was a fixed
hour, fired only while the app was open, and talked about the streak.

## Done

- `src/reminders/rules.js` (pure, tested):
  - Learns the usual study hour from when lessons finish (`recordStudyHour`
    in `finishLesson`), smoothed over neighbouring hours; 19:00 until there
    are 3 lessons of history. Learners can still pick an hour in Settings.
  - Aims 30 minutes after the usual hour, with a ±40 minute jitter that
    differs per day (seeded by the date, so it's stable within a day).
  - Quiet hours 22:00 to 08:00; night learners (usual hour 21+) get until 23:30.
  - Skips days with any XP, at most one reminder a day.
  - Backs off when ignored: 1, 2, 3, 5 then 7 days between reminders.
    Studying again resets it to daily.
  - Content: a word due for spaced review (60%), else a learned word, else
    the next lesson's new word. Title "Luganda — English", body a short
    stock line or the word's own note. Tapping opens practice or the path.
- `src/reminders/strings.js`: all reminder text (notifications, consent card,
  settings) in one object, ready to move into the language config.
- `src/reminders/reminders.js`: consent, delivery and the service-worker plan.
  - Consent: our own card after a finished lesson, only from the second
    lesson on, never on first load. The browser prompt appears only after
    "Yes". "Continue" counts as not now: asked again after 7 days, at most
    twice. A browser "block" stops the asking.
  - The page writes the next 3 planned reminders to Cache Storage
    (`learn-luganda-reminders`), rebuilt whenever progress changes.
- `build/sw-template.js`: handles `periodicsync`, shows today's reminder if
  its time has come and the app isn't on screen, and logs it so the page
  counts it for backoff. Notification clicks open the reminder's page.
- Settings: "Word reminders" switch and "Reminder time" (Automatic or an
  hour). Browsers without background sync get a one-line note on the limits.
- Schema v3 migration: `settings.reminder*` moved to a `reminders` slice; the
  old default 19:00 becomes Automatic; the routine is seeded from lessons'
  `lastCompletedAt`.

## Limits (no push server)

- Installed Chrome/Edge (Android, desktop): Periodic Background Sync wakes
  the worker when the browser decides, roughly daily depending on site
  engagement, so a reminder may land later than planned or skip a day.
- Safari/iOS and Firefox: no background wake-up, so reminders only arrive
  while the app is open in a background tab or window.
- Notification Triggers (scheduled local notifications) never became a
  standard, so they aren't used. True push would need a server.

## Tests

- `tests/reminders.test.js`: routine learning, windows, jitter, quiet hours,
  skip-if-practised, one a day, backoff and reset, snippet choice, no guilt
  words, consent rules, migration.
- `e2e/reminders.spec.js`: the offer appears after the second lesson and
  "Yes" turns reminders on; the first lesson never asks. Headless Chromium
  always reports notifications as denied, so the test stubs the prompt.

## Next

- When the multi-language config lands, move `REMINDER_STRINGS` into it and
  pick snippets from the learner's target language.
