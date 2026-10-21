# 2026-10-21: Pack versions and progress compatibility

Issue: #100 (epic #80) · Branch: `feat/100-pack-versions`

## Context

The owner wants saved progress to survive changes to language packs, with
a compatibility layer between the progress and each version of a course's
configuration.

## Done

- `src/content/migrations.js`:
  - `course.json` can list `migrations`, one step per content `version`,
    with `rename` and `remove` for words, lessons, stories, units and
    sections.
  - A rename moves progress to the new id.
  - Several old ids that point at one new id merge, keeping the best of
    each: the highest box and best accuracy, summed counts, the latest
    "last seen" and the earliest due date.
  - An old id that points at a list splits, and every new id gets a copy.
  - Progress for removed ids, and for any id the pack no longer has, goes
    into an `archive`. It comes back automatically if a later pack has the
    id again.
  - Progress keys are mapped to ids: `story-*` to stories,
    `checkpoint-*` to units, `jump-*` to sections, and `mistakes` and
    `jumps` too.
- Each course keeps its own `courseVersion` and `archive`, which park with
  the rest of its progress when the learner switches course.
  `syncCourse()` runs at startup, on course switch and after importing a
  progress file.
- Store schema v4: everything saved before now is recorded as
  English→Luganda version 1.
- An older pack loaded over newer progress replays no steps. It archives
  what it doesn't know and keeps the newer version number, so nothing is
  replayed twice later.
- Pack formats: `upgradePack` (from #82) is now tested with a two-step
  upgrade and a refused newer format.
- Schema: `migrations` is in `course.schema.json`. The validator checks
  that steps are in order and within `version`, that kinds are known, and
  that every rename, followed through later steps, lands on an id the pack
  has now.
- Tests cover rename, merge, split, removal and restore, skipped versions,
  a downgrade, the validator, the format upgrade and the v4 store
  migration. There is also an e2e test for old progress loading.

## Decisions

- The archive lives inside the course's progress, not alongside it, so it
  travels with exports and course switches.
- The validator doesn't forbid removing an id that still exists: a pack
  can bring an item back, and its progress returns from the archive.

## Next

- #89 pronunciation audio with per-character voices.
- #86 must document ids, `version` and `migrations` for pack authors.
