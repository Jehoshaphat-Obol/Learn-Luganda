# 2026-10-21: Lesson engine and first exercise types

Issue: #13 · Branch: `feat/13-lesson-engine`

## Context

The path (#12) links to `/lesson/:id`. This issue makes lessons playable.

## Done

- `src/lesson/answers.js`: `normalise` (case, punctuation, curly vs
  straight apostrophes, spacing), `isAccepted` against a list of accepted
  answers, and `tokens` for word-bank tiles.
- `src/lesson/random.js`: a seeded RNG (mulberry32) with shuffle/sample, so
  generated lessons are reproducible in tests.
- `src/lesson/generate.js`: `buildLesson(lessonId, { firstTime, extras })`
  turns content into up to 16 exercises:
  - an intro card before each new word (first time only), followed by a
    multiple-choice question alternating Luganda→English and back;
  - a match-pairs board from the lesson's words;
  - word-bank translations of each sentence, alternating direction, with
    distractor tiles drawn from what the learner has already met;
  - padding with reverse translations and review questions on earlier
    words when a lesson is short.
  - `extras` lets later issues plug in more generators (dialogues, typing).
- `src/lesson/session.js`: walks the queue, re-queues a wrong answer once at
  the end, tracks first-try accuracy, missed words and time.
- Renderers in `src/lesson/exercises/`: intro, choice (keys 1–4), translate
  (tap tiles, tap again or Backspace to remove), match (pairs lock in,
  wrong pairs shake, finishes itself).
- `src/views/lesson.js`: `runExercises()` runner (progress bar, Check →
  green/red feedback sheet with the right answer → Continue, Enter to
  check/continue, quit confirmation) reused later by practice and
  checkpoints; `lessonView` for `/lesson/:id`; a first completion screen
  with accuracy and time.
- `src/state/lessons.js`: records completions, best accuracy and stats.
- 11 new unit tests (answer checking, generation for every lesson, tile
  banks, reproducibility, session re-queue and accuracy).

## Decisions

- **Generated, not authored, exercises** keep content files small and let
  every lesson get fresh variants on replay.
- Match mistakes don't fail the exercise but are recorded as missed words
  for spaced review.
- Accuracy is first-try correctness over graded exercises.
- Locked or unknown lesson ids redirect to the path.

## Next

- #14 More exercise types (typing, fill in the blank, dialogue, listening).
