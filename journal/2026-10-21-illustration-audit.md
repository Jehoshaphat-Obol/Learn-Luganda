# 2026-10-21: Illustration audit and flags

Issue: #112 · Branch: `fix/112-illustration-audit`

## Context

A phone screenshot of the landing page's cast grid showed broken portraits:
the shaded half of each face stuck out past the head as a rectangle, bodies
spilled outside the rounded card, the card tint sat offset from its frame,
and black squares appeared in the corners.

## Cause

One bug caused all of it. Since #88 the landing page draws the course's cast
from look objects (`castMember(id).look`), and those objects had no `id`.
`portrait()` then built its SVG ids from `uid(object)`, giving ids like
`[object Object]-5-face`. A `url(#…)` reference to an id with spaces fails
silently, so the browser dropped the face and frame clip paths and painted
every texture pattern black. The gallery was fine because it passes
string ids, which is why it slipped through.

## Done

- `uid()` keeps only id-safe characters, and cast looks carry their id.
- Rendered everything headless (Playwright) at 360, 412 and 1280px: cast in
  all five expressions, avatars, critters, mascot poses, props, places and
  scenes, and checked every `url(#…)` resolves. Nothing else was broken.
  The two cast cards in place scenes moved a few units in so their tilt
  stays inside the panel.
- Flags: the school's flag was hard-coded Ugandan. It now comes from data:
  - `country` on each language in `languages.json` (Luganda → UG), with the
    schema updated.
  - The app shows the learned language's country flag, else the learner's
    home country guessed from the time zone (`regions.json`), else a plain
    vermillion pennant that is nobody's flag. English and Arabic have no
    single country, so an English course would fall back to the learner.
  - `src/illustrations/flags.js`: 28 simple, accurate SVG flags (East and
    West African countries for every language we list, plus FR, BE, PT,
    US, GB). Official colours, emblems reduced to a shape or two. A Flags
    section in the gallery shows them all.
- Tests: unit tests for course-look ids, every flag and the flag choice; an
  e2e check that no illustration on the landing page has a broken reference.

Screenshots: `docs/screenshots/art-audit-cast-before-after.png`,
`docs/screenshots/art-audit-flags.png`.

## Next

More countries' flags can be added to `FLAGS` as language packs arrive;
the unit tests fail if a language names a country with no flag.
