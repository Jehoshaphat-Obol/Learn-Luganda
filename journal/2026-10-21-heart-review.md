# 2026-10-21 · Hearts never block learning (#96)

The owner asked that hearts never stop anyone learning. Running out should send the learner a little way back, to review earlier material, and then let them carry on.

## Decision

Running out of hearts is now a step back, not a lockout or a wait.

- **Mid-lesson or checkpoint:** when the last heart goes, a friendly "Let’s take a quick step back" card offers a short heart review. It covers what was just missed, then saved mistakes, then the weakest words from earlier lessons (up to 8 words, about 8 questions). No hearts are at stake in it. Finishing it fills all five hearts, a "Hearts refilled!" card cheers, and the lesson resumes exactly where it was: no progress lost.
- **Opening a lesson or checkpoint with no hearts:** a "Warm up first" screen runs the same review, then starts it. The old "next heart in 3h 12m" lock and the checkpoint redirect are gone.
- **Gems** stay an optional shortcut ("Use 40 gems instead"), only shown when affordable. Gems are earn-only.
- Timed refills (one every four hours) and practice-hub hearts still work as quiet bonuses.
- Heart review answers go through spaced repetition and clear fixed mistakes, so the step back is real learning, not a penalty screen.
- A brand new learner with nothing to look back at simply gets hearts back.

No schema change: the store stays at v3.

## Where things live

- `src/state/hearts.js`: `heartReviewWordIds` (pure word picker) and `finishHeartReview`.
- `src/views/heart-review.js`: the step-back card, the review run over the lesson, and the warm-up gate.
- `src/views/heart-review-strings.js`: every new string in one place, ready for the language packs (#85).
- `runExercises` takes `title` and `quitPrompt` so the review has its own wording.

## Tests

Unit tests for the word picker and refill; e2e for losing the last heart → review → refilled → lesson resumes, and for the warm-up gate with a gem shortcut.

## Next

When UI strings move into packs (#85), move `HEART_STRINGS` with them.
