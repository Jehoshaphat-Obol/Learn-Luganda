# 2026-10-22: Landing page in every interface language (#181)

The owner saw the landing page only half translated in Luganda and Swahili:
the UI-pack eyebrows switched, but the "why" heading ("The language of
Kampala's streets."), the audience cards, ticker meanings, sample question,
captions, cast roles and two FAQ answers stayed English. All of those come
from the course pack's `landing` block, written in the course's base
language, and `tests/strings.test.js` allows course-pack text, so nothing
caught it.

## What changed
- Course labels (`courses/<id>/labels/<ui>.json`) now also take
  `description`, `cast` (roles) and `landing` (the base-language parts of the
  landing block). `applyLabels` lays them over the pack; target-language words
  stay as the course writes them. `checkLabels(labels, pack, ui)` reports
  missing copy; ticker meanings aren't needed when `ui` is the course's target
  language (they'd repeat the words).
- Filled in for all 10 course × interface-language pairs.
- `tests/landing-i18n.test.js`: every pair must have the copy, and the landing
  and About pages rendered in each interface language must contain none of the
  course's own base-language copy. It fails on all 20 cases without the new
  labels and caught three slips while writing them.
- Schema and `docs/packs/README.md` updated.

## Decisions
- Swahili "Kiganda" stays: it is the standard Swahili name for the language
  (like Kiingereza, Kiswahili) and matches the sw-lg course.
- Luganda and Swahili copy is drafted by Claude and needs native review, like
  the rest of the packs.

## Next
- New UI packs (#133 French) and new courses must add these labels for every
  pairing, or the new test fails.
