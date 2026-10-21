# 2026-10-21: Local storage layer and user profile

Issue: #9 · Branch: `feat/9-storage`

## Context

There is no server: everything a learner earns lives in their browser. One
bad write or a schema change must never wipe someone's 100-day streak.

## Done

- `src/state/storage.js`: `createStore({ key, version, defaults, migrations })`
  with `get`, `update(draft => …)`, `subscribe`, `reset`, `exportJSON`,
  `importJSON`.
  - Saved documents carry a `version`; `migrations[n]` upgrades n-1 → n.
  - `withDefaults` deep-fills missing keys, so adding a new feature's slice
    needs no migration.
  - Corrupt or non-object data is copied to `learn-luganda:corrupt:<time>`
    and the app starts fresh instead of crashing.
  - If localStorage is unavailable (private mode, blocked), an in-memory
    fallback keeps the session working.
  - Updates run on a `structuredClone` draft, so earlier snapshots never
    change under a view.
- `src/state/store.js`: the app's single document under `learn-luganda`
  (schema v1) with slices for profile, onboarding, settings, lessons, XP,
  gems, hearts, streak, words (spaced review), mistakes, achievements,
  inventory, league and stats.
- `src/state/profile.js`: daily goal presets, avatar colours,
  `createProfile` and `saveProfile`.
- `src/state/dates.js`: local-midnight day keys, `daysBetween`, `addDays`,
  `weekKey` (Monday-based).
- Settings screen with export (downloads a dated JSON file), import (with a
  confirm) and reset (with a confirm).
- The top bar now reads gems, hearts and streak from the store and redraws
  on every change. The landing page shows "Continue learning" when a
  profile exists.
- 17 new unit tests (storage and dates).

## Decisions

- **One document, one key.** Simpler to export, import and migrate than many
  keys; the whole state is a few kilobytes.
- New learners start with 50 gems so the shop is meaningful on day one.
- Exports are wrapped as `{ app: 'learn-luganda', exportedAt, data }` so the
  importer can reject unrelated JSON files with a clear message.

## Next

- #10 Onboarding writes the profile.
