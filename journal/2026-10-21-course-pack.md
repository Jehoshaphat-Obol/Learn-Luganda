# 2026-10-21: The Luganda course as a JSON course pack

Issue: #82 (epic #80) · Branch: `feat/82-course-pack`

## Context

After #81 the interface can come from language packs; the course itself
still lived in 50 JavaScript modules written for one pair, English to
Luganda, with `lg` and `en` baked into the lesson engine. For the course to
be generated per language pair, it has to be data, and the engine has to
talk about the language being taught (target) and the learner's language
(base) instead.

## Done

- `src/packs/courses/en-lg/`: `course.json` (pair, title, description,
  status, sections) and `units/u1.json` … `u40.json`. Each unit file is
  self-contained: words, sentences, skills and lessons, dialogues, its
  guidebook and its stories. Converted by a one-off script from the old
  modules; `npm run validate` reports the same 40 units, 341 lessons, 679
  words and 21 stories as before.
- Item fields are now `target`, `base`, `altTarget`, `altBase`; dialogue
  lines and story lines are `{ speaker, target, base }` objects; guidebook
  phrases are `{ target, base }`; story questions say `optionsLang` when
  their options are in the target language; guidebook tables can say which
  columns are in the target language (`targetColumns`, default the first
  two, as before).
- `src/content/course.js`: `buildCourse` now also indexes stories and
  guidebooks and freezes the whole course. `course` is a live binding set
  by `useCourse`; `langAttr(role)` and `languageName(role)` turn
  'target'/'base' into `lang="lg"` or "Luganda" from the pack, so no view
  hard-codes Luganda any more.
- `src/content/load.js`: the browser loader. Packs are lazy chunks, and the
  app loads the course and the UI language before the first render. The
  main bundle dropped from 405 KB to 155 KB; the units are small chunks.
- `scripts/load-pack.js`: the same loader for Node (validator, e2e).
  `tests/setup.js` loads the pack for unit tests.
- `docs/packs/schema/course.schema.json` and `course-unit.schema.json`,
  checked by `npm run validate` with the existing cross-reference checks.
- `scripts/format-json.js`: writes packs with one short item per line so
  diffs and reviews stay readable.
- Reminder titles use `{target} — {base}` and follow the active course.
- Versions: `course.json` carries `formatVersion` (the file format; older
  formats are upgraded on load by `src/content/format.js`, newer ones are
  refused and the default course loads instead) and `version` (the content
  version that progress migrations will key on in #100).

## Decisions

- **One file per unit.** A unit is the natural unit of work for an AI to
  generate and for a speaker to review, and it keeps files small (the
  largest is about 400 lines).
- **Sections order the units.** `course.json` is the single place that
  says which units exist and in what order; a listed unit without a file
  is skipped, so a course can grow a few units at a time.
- **Everything frozen at load.** The course is configuration; a stray write
  throws instead of silently changing every screen.
- The cast in stories still refers to the shared illustrated characters;
  per-course casts, exercise mix and quiz settings come in #88.

## Next

- #88: configurable lessons per course pack (exercise mix, quiz and
  checkpoint settings, cast).
- Later (#83): the service worker precaches every pack today; with many
  languages it should precache only the active course and cache others when
  first used.
