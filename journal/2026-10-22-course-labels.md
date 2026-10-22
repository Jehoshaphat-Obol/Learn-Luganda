# 2026-10-22: Path headings follow the interface language

Issue: #153 · Branch: `feat/153-course-labels`

## Context

After #148 the owner pointed out that section titles stay in one language
when the app language changes. A course pack is written in the language
it's taught in, so with Swahili or Luganda menus the path was still English
(or the other way round).

## Done

- `src/content/labels.js`: optional `courses/<id>/labels/<ui>.json` files
  translate section titles, levels and descriptions, unit titles and
  descriptions, and skill titles, keyed by id. `applyLabels` lays them over
  the raw pack before it's built, so every screen (path, guidebook,
  checkpoints, practice, jump, stories) gets them with no view changes.
  Anything missing keeps the pack's text.
- The loader fetches the labels file with the course, on demand. Changing
  the interface language, or the course, rebuilds the course with the
  matching labels.
- Schema `docs/packs/schema/course-labels.schema.json`; `validate-packs`
  checks ids, refuses labels for a missing UI pack or for the course's own
  language, and counts fallbacks. Guide section in docs/packs/README.md.
- Labels for every course × other UI language: en-lg → sw, lg; en-sw → sw,
  lg; lg-en → en, sw; sw-en → en, lg. 0 fallbacks today. Where a course in
  the other direction already had the same unit in that language (lg-en and
  en-lg u1–u8), its text was reused.
- Tests: unit tests for apply/check and every shipped labels file; e2e for
  Swahili then Luganda headings on the Luganda course.

## Decisions

- Labels live beside the course, not in the UI pack: they belong to one
  course and change with it.
- Lesson content, guidebooks and stories stay in the course's language.

## Native-speaker review checklist

- [ ] Luganda headings for Sections 2–5 of en-lg and all of en-sw, sw-en
- [ ] Swahili headings for en-lg, en-sw and lg-en
- [ ] Level names: Wanaoanza / Ngazi ya awali / Kabla ya kati / Kati / Juu ya kati; Abatandika / Abeeyongerayo / Ab’omu makkati abasooka / Ab’omu makkati / Abali waggulu

## Next

- Courses still being written (en-sw Section 3+) need their headings added
  to the labels files as units land.
