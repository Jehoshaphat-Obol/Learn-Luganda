# 2026-10-21: Learning screens from the packs

Issue: #85 (epic #80) · Branch: `feat/85-learning-strings`

## Context

After #84 the landing page, shell, onboarding and site pages read their text
from the UI pack. This pass does the rest: everything a learner sees once
they are inside the app.

## Done

- **UI pack** (`src/packs/ui/en.json`): new groups `lesson` (runner,
  feedback, exercise prompts and controls), `heartReview`, `practice`,
  `checkpoint`, `jump`, `complete`, `learn`, `rewards`, `achievements`,
  `shop` (items, earning rules, reasons), `profile`, `streak`, `guidebook`,
  `stories`, `reminders`, `ads`, `pixel`, `mood`, `sounds` and `time`, plus
  the rest of `settings` and `ui`.
- **Exercise prompts are data**: the generator now emits
  `prompt: { id, params }` and renderers fill in `lesson.prompt.<id>`, so
  `generate.js` stays free of the UI layer (the e2e helpers import it in
  plain Node).
- **Lists a pack can grow** (`tList`): praise after a right answer and the
  reminder bodies are groups of strings, as many as a language wants.
- **Target-language phrases moved to the course pack**: `course.json` gains
  `cheers` (mixed into lesson praise) and `phrases` (`congrats`, `thanks`),
  with schema entries. The English UI pack no longer contains Luganda; the
  "Weebale nnyo!" lines now come from the course, so an en-sw course says
  its own thanks.
- Achievement and shop item names and descriptions are getters over the
  pack, so callers didn't change. XP parts carry ids instead of labels.
- Dates (profile chart, streak calendar, ad-break times, reminder hours)
  are formatted in the interface language; the calendar's weekday letters
  come from `Intl`.
- Removed `src/reminders/strings.js`, `src/ads/strings.js` and
  `src/views/heart-review-strings.js`.
- The course-end note no longer hard-codes "Unit 40".

## Decisions

- Shop item ids keep their dashes (saved inventories use them); the pack
  keys are camel-cased (`frameGold`) since pack keys can't contain dashes.
- The "Lake frame" description no longer names Lake Nalubaale: UI text is
  shared by every course.

## Checks

- `tests/strings.test.js` now also renders the learning path, practice
  hub, guidebook, stories and a story, streak, shop, profile, settings, the
  heart warm-up, every exercise type, the lesson runner with feedback, every
  rewards screen, the course-complete page, both consent cards, the logo
  label and a reminder. Allowed text is matched as whole words, and course
  content (words, units, stories, guidebooks) is allowed. A planted
  hard-coded label fails it.
- 275 unit tests and 122 e2e tests pass; validation and build pass.

## Next

- #86: authoring guide and AI prompt templates for new packs.
