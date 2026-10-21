# 2026-10-21: Configurable lessons, tests, answers and cast per course

Issue: #88 (epic #80) · Branch: `feat/88-configurable-lessons`

## Context

The owner wants every language to feel like its own course rather than a
template with new words poured in: the quizzes, the sections, the way
lessons run should all be configurable from the pack. Until now the lesson
engine hard-coded one recipe, test sizes, the 80% jump mark, Luganda's
ŋ/ng rule, and the six illustrated characters.

## Done

- `src/content/settings.js`: every teaching choice as a default, overridable
  in `course.json` → `settings`, in a unit's `settings`, or on one lesson.
  Objects merge key by key; lists and values replace. Each built lesson and
  unit carries its merged, frozen settings.
- **Lesson recipe.** A lesson runs its `steps` in order: `newWords`,
  `match`, `sentences`, `fill`, `dialogues`, `type`, `listen`, then the
  padding steps `reverse`, `newWordReview`, `earlierReview`. Each step has
  its own options (directions to cycle through, pair counts, how many fill
  and typed exercises, typed direction, padding targets) plus
  `maxExercises`, `hearts` and `introCards`. Step order is free, so a
  tonal-language course can, say, lead with listening and type in the
  target language.
- **Exercise options:** number of choice options, word-bank distractors.
- **Practice, checkpoints, section tests:** steps, sizes, focus words,
  shuffling, hearts and the section-test pass mark.
- **Answer rules:** `equivalents` (Luganda's `ŋ` → `ng` now lives in the
  Luganda pack instead of the engine), `ignoreDiacritics` (optional tone
  marks and accents, for Yoruba or Igbo), `lettersPerTypo`. The answer cache
  resets when the course changes.
- **Stories:** `translations: 'tap' | 'always'`.
- **Cast per course.** `course.json` → `cast` names the course's people
  with a role line and a look: either one of the illustrated looks or a new
  one built from the same Bauhaus parts (skin, hair style, clothes, card,
  backdrop, texture, extras). `portrait()` draws a look object; dialogues,
  stories and the landing page read names and looks from the pack. The
  validator checks that every speaker is in the course's cast.
- `docs/packs/schema/settings.schema.json`, referenced from the course and
  unit schemas, with every option bounded so a bad pack fails validation.
- `tests/settings.test.js`: merging and cascade, a custom recipe, pack-sized
  practice and checkpoints, answer rules, a pack-defined character.

## Decisions

- The defaults are exactly the old behaviour. A comparison script built
  all 341 lessons (4 seeds, first time and repeat) plus every checkpoint,
  section test and 50 practice sessions with the old and new engines:
  zero differences.
- Steps are a fixed vocabulary rather than free code: packs are data, safe
  to generate with an AI and to validate. New exercise types join the
  vocabulary in code.
- Learner avatars still use the illustrated looks; the course cast is for
  the course's own characters.

## Next

#83: the playful get-started flow (greetings, a region guess from the time
zone, "do you speak it or want to learn it?") and per-course progress.
