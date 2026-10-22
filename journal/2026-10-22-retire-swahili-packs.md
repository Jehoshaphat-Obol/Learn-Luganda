# Retiring the hand-built Swahili packs

Issue #187 (phase 2 of the shared catalog, #184).

## Context

With en-sw folded into the curriculum and culture slots in place, en-sw and
sw-en could be composed like every other course. The hand-built packs still
won because their ids came first, and they had 45 Swahili stories the
curriculum didn't.

## Done

- `scripts/retire-course.js`: folds a pair's stories into the curriculum and
  writes progress migrations, using what `fold-course.js --map` matched.
- 47 stories moved into the curriculum, tagged `culture: "sw"` (told only in
  Swahili-culture courses that have their text). Three exist in one
  direction only and carry `teaches` (Shikamoo for learners of Swahili;
  Grandma's morning and English time for learners of English).
- Curriculum migration steps with a new `courses` filter: for en-sw and
  sw-en, 360 word renames, 200 lesson renames (each old lesson to every
  curriculum lesson that teaches its words) and 11 unit renames. A word
  whose match the composer drops as a repeat goes to the word that keeps
  its answer (ikiwa → kama).
- Deleted `src/packs/courses/en-sw` and `sw-en`; the app now has no
  hand-built course packs. Composed en-sw and sw-en have 40 units,
  462 lessons and 66 stories each (were 202 lessons, 45 stories).
- A Swahili guidebook for sw-en's unit 26 (the kingdom), the one unit
  without notes.
- tests/retired-courses.test.js: a learner who finished everything in the
  old packs keeps every word's practice, every story, checkpoint and jump,
  and nothing is archived (fixture: tests/fixtures/legacy-swahili.json.gz).

## Decisions

- Old lessons map to all the curriculum lessons with their words. The
  course is longer now, so returning learners find new lessons in between;
  the ones they had done stay done.
- Story ids are unchanged, so story progress needs no migration.

## Next

Optional: Luganda unit notes in `lang/lg/about/sw/units/` so lg-sw stops
falling back to English. Then the paused pair courses (#144, #145,
#127–#132) as lang packs.
