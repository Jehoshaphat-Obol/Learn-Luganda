# 2026-10-22: Authoring guide writes lang packs (#184)

The last open step of #184: the authoring guide and AI prompts still told
contributors to hand-build `courses/<from>-<to>/` packs, the N×(N−1) mess
the shared catalog replaced.

## Done

- `docs/packs/README.md`: "Adding a course" is now "Adding a language":
  write `lang/<code>/course.json`, translate units, write
  `lang/en/about/<code>/` notes, run coverage. Course packs are described
  as legacy (none are left).
- `scripts/lang-flat.js`: dumps a lang unit to tab lines
  (`W id`, `S id`, `P i`, `D lesson i line|o`, `T story …`) and builds a
  translated draft back into JSON in the reference unit's shape. Missing or
  unknown lines are errors. `--typography fr` applies French spacing. A Node
  port of the Python tool used for French (#144).
- `tests/lang-flat.test.js`: every unit of every lang pack survives the
  round trip.
- Prompts: `lang-course.md`, `lang-unit.md`, `about-notes.md` replace
  `course-outline.md` and `course-unit.md`.
- Closed #127 (lg-en Sections 2–5): the composed lg-en already has 40 units.

## Next

Owner (2026-10-22): retire each old language issue by building that
language as a full lang pack, then go through every African language in
wave order. Next: #128 Runyankore (`lang/nyn`), then #129–#132.
