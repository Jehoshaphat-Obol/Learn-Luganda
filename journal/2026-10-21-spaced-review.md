# 2026-10-21: Spaced repetition review and practice hub

Issue: #18 · Branch: `feat/18-review`

## Context

Finishing a lesson once doesn't make words stick. Reviewing them just
before they'd be forgotten does, and practice is also how learners earn
hearts back.

## Done

- `src/state/review.js`: Leitner boxes 0–5 with review intervals of
  0, 1, 3, 7, 14 and 30 days. A right answer moves a word up a box, a wrong
  one drops it to box 1 (due tomorrow). `recordSession` applies every
  lesson and practice result; missed words go on a mistakes list (max 40)
  that practice clears. `dueWordIds`, `weakestWordIds`, `strength`.
- `finishLesson` records word results for every session; practice also
  clears fixed mistakes and gives back a heart.
- Generator helpers are now exported so `src/lesson/practice.js` can build
  sessions from a word list: `buildPractice` (choices, match, sentence
  translations limited to words the learner knows, a fill and a typed
  answer, shuffled) and `buildCheckpoint` (15 exercises over a unit).
- `/practice` hub: Review (due words first, then the weakest), Mistakes,
  and per-skill practice with a strength bar and a due count. An empty
  state before the first lesson.
- `/practice/session?mode=review|mistakes|skill&id=…`: hearts-free
  sessions worth 10 XP that end with "Practice complete!".
- `/checkpoint/:unit`: a 15-exercise unit test with hearts, worth 20 XP
  (5 on replay); passing turns the trophy gold.
- Learning path: completed skills with due words get a "Review" pill that
  starts a skill practice.
- 7 new tests (boxes and scheduling, due ordering, mistakes list,
  strength, practice and checkpoint builders).

## Decisions

- Leitner over SM-2: easier to explain ("box 3 of 5"), no per-card ease
  factor to tune, and good enough at this course size.
- Practice sentences only use words the learner has met, so review never
  surprises them with new vocabulary.

## Next

- #19 Gems, shop and achievements.
