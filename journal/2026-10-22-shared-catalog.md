# 2026-10-22: Shared catalog, phase 1

Issue: #185 (phase 1 of #184) · Branch: `feat/185-shared-catalog`

## Context

The owner plans courses between any two of ~50 languages. With one
hand-built pack per pair that is 50 × 49 courses, each a full copy of the
lesson plan. The owner decided every language uses **one shared
structure**, as extensive as possible, built on the existing pack
configuration rather than a parallel system. Pair courses (#144, #145,
#127–#132) wait for this.

## Done

- `src/packs/curriculum/`: sections, cast, version and 40 unit skeletons
  (word and sentence ids, skills, lessons, dialogue and story steps), no
  text.
- `src/packs/lang/{en,lg,sw}/`: each language's text by id, used both as
  the language learned and as the learner's language. `lang/fr` has only
  headings and landing copy (from the French labels), enough to label
  every course in French.
- `src/packs/lang/<from>/about/<to>/`: the per-pair notes (word notes,
  guidebooks, story glosses, description, landing copy). Optional; a
  course without them uses the base language's `pivot`, then English.
- `src/content/compose.js`: `composePack`/`composeCourse` build the same
  `{ meta, units, labels }` a hand-built pack has, so `buildFromPack`,
  labels, migrations, views and validators are unchanged.
  `composeLabels` makes course labels from `lang/<ui>`.
- Loaders: `src/content/load.js` (browser, one chunk per file) and
  `scripts/load-pack.js` (Node) read hand-built and composed courses the
  same way. `COURSE_IDS` = hand-built packs + composed pairs that pass
  coverage.
- `npm run coverage` writes `src/packs/lang/coverage.json`; `npm run
  validate` checks schemas for the new files, every id against the
  curriculum, tip links, composed labels, and that coverage.json is
  current. Pack format 2 (`PACK_FORMAT`), with a no-op upgrade for
  format 1 packs.
- Six new schemas in `docs/packs/schema/` (curriculum, curriculum-unit,
  lang, lang-unit, about, about-unit) and `pivot` in the registry schema.
- `scripts/split-course.js` built the catalog from en-lg, sw-lg and lg-en,
  which were then deleted (`scripts/flip-course.js` too: composing
  replaces flipping).
- `tests/compose.test.js`: golden test against the deleted packs (frozen
  in `tests/fixtures/legacy-courses.json.gz`) plus unit tests for the
  composing rules. labels and landing-i18n tests now read every course,
  composed or not, through `readPack`.

## Decisions

- **Ids unchanged**, so saved progress keeps working with no migration.
- **One text per language, both directions.** Three rules make that work
  without per-pair text: a trailing hint like "Read (all of you)" is shown
  as the meaning but not required as the answer; `{to}`/`{from}` name the
  course's languages in the text's own language ("Do you speak {to}?",
  "Oyogera {to}?", "mu {to.mu}"), via `languageNames`; words whose answer
  repeats an earlier word's are left out (this reproduces exactly the 25
  words lg-en had dropped by hand).
- **Disagreements between the three courses** were only four, settled by
  hand: mulungi = "beautiful" and emmwanyi = "coffee beans" (lg-en's
  sharper meanings, so they don't repeat bulungi and kaawa), and "visit
  *my* grandparent". Accepted answers merge every course's, so they only
  grow.
- **Cast roles that depend on the pair** (Emma is "learning Luganda" in
  en-lg but "speaks English" in lg-en) live in the pair's notes.
- **Landing copy in another interface language** now comes from the notes
  about the target in that language (e.g. Swahili notes about Luganda),
  not a per-course translation. That is the only visible change: someone
  reading the app in Swahili sees the Swahili-speakers' landing copy for
  every Luganda course.
- **Offered pairs:** en-lg, sw-lg and lg-en (composed), plus the
  hand-built en-sw and sw-en, unchanged. The newly possible pairs (lg-sw,
  en-sw composed) stay hidden: Swahili has no dialogue replies as a target
  language yet (96% coverage) and there are no notes about Swahili in the
  catalog. Phase 2 folds the en-sw/sw-en family in, and they will replace
  the hand-built packs then rather than run alongside them.

## Next

- Phase 2 (#184): fold en-sw/sw-en into the catalog, grow the concept set
  with their vocabulary, and add culture slots (cast names, places) so each
  language still feels local.
- Phase 3: rewrite the authoring guide and AI prompts (#86) to produce
  `lang/<code>` packs, then French (#144/#145) is just `lang/fr`.
