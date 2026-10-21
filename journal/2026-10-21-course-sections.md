# 2026-10-21: Course sections and jump-ahead tests

Issue: #50 · Branch: `feat/50-course-sections`

## Context

The owner asked for the course to be as long as possible, for daily,
progressive learning. The plan (issues #50 to #58) grows it from 8 units to
40 units in 5 sections, roughly 340 lessons and 900+ words. This issue gets
the app ready for that size before the content arrives.

| Section | Units | Level |
| --- | --- | --- |
| 1 Foundations | 1–8 | Beginner |
| 2 Everyday life | 9–16 | Elementary |
| 3 Conversations | 17–24 | Pre-intermediate |
| 4 Community and culture | 25–32 | Intermediate |
| 5 Confident speaker | 33–40 | Upper intermediate |

## Done

- `src/content/sections.js` lists the five sections. The course keeps only
  units that exist, so sections fill up as each content issue lands.
- The path shows a section card (level, description, progress, unit count)
  above its units. Only the section holding the next lesson is drawn open;
  the others render their units the first time they're expanded.
- **Section tests** (`#/jump/:section`): a 15-question test on earlier
  sections (mostly the section just before). 80% first-try accuracy opens
  the section. Lessons before it count as *skipped*: they stay open to
  replay, unlock what follows, and their stories open too, but they aren't
  counted as done.
- Unit checkpoints open once every lesson is done or skipped.
- `validateSections` checks every unit is in exactly one section, in order.
- The landing FAQ and `npm run validate` derive course totals from content.
- Headings now go section (h2), unit (h3), skill (h4).
- Tests: 7 new unit tests on sections, skipping and the section test, using
  the real units split into two sections.

## Decisions

- Jumped sections are stored as `state.jumps` (a new default, so no storage
  migration). Skipped lessons are not marked done, so XP, stats and spaced
  review only count work the learner actually did.
- The section test has no hearts; a pass mark is fairer for a long test and
  can't be bought with a gem refill.
- An end-to-end test for jumping comes with #51, when Section 2 exists.

## Next

- #51 Units 9 to 12: colours, clothes, my day, weather.
