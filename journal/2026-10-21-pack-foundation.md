# 2026-10-21: Language pack foundation

Issue: #81 (epic #80) · Branch: `feat/81-pack-foundation`

## Context

The owner wants the app to grow from Luganda to African languages in
general. Every string, from the landing page to the lessons, should come
from immutable JSON so a language can be added by generating JSON (likely
with an AI) rather than writing code. The learner picks a base ("from")
language, detected automatically with English as the default, and a target
("to") language. Later the owner added that each course must feel distinct
(its own structure, exercises, quizzes and cast) and that characters should
speak with their own voices, all free of paid services.

The work is split into eight issues under epic #80. This first one lays the
groundwork the others build on.

## Done

- `src/packs/languages.json`: a registry of 23 languages (code, English
  name, native name, a short greeting, text direction), most of them
  African, for the language picker.
- `src/packs/ui/en.json`: the English UI pack. It starts with the app shell
  strings (brand, navigation, top bar stats, music button, page titles);
  the other screens move over in #84 and #85.
- `src/i18n/`: `t(key, params)` with `{placeholder}` filling, plural forms
  through `Intl.PluralRules`, locale number formatting, English fallback for
  missing keys (and the key itself as a visible last resort);
  `setLanguage()` loads a pack on demand through `import.meta.glob`, so each
  language becomes its own small chunk, and sets `<html lang dir>`;
  `detectUiLanguage()` reads `navigator.languages`; `deepFreeze()` locks
  every pack.
- `docs/packs/schema/`: JSON Schemas for UI packs and the registry. Packs
  point at them with `$schema`, so editors (and AI tools) can check them
  while writing.
- `npm run validate` now also runs `scripts/validate-packs.js`: schema
  checks (with ajv) plus checks the schema can't express: every key must be
  an English key, placeholders and plural shape must match English, and
  `meta.code` must match the file name and the registry. Missing keys are
  allowed and reported as falling back to English.
- `src/app/shell.js` reads its strings through `t()`.
- `tests/i18n.test.js`: formatting, plurals, detection, fallback, freezing
  and validation.

## Decisions

- **Browser languages, not location.** `navigator.languages` is what the
  person configured their device to read, needs no permission and no
  server. IP geolocation would need a third-party service call from a
  static site, and a place says little about language: someone in Kampala
  may read Luganda, English or Swahili.
- **English bundled, others lazy.** English is the fallback, so it ships
  with the app and `t()` can stay synchronous. Other packs load once,
  before the first render, when the learner's language needs them.
- **Partial packs are fine.** A draft translation can ship with gaps; the
  validator lists them and the screen shows English instead of blanks.
- **`meta.status`** is `draft` or `reviewed`, so AI-generated packs are
  clearly marked until a fluent speaker has checked them.
- Schemas live in `docs/packs/schema/` next to the authoring guide that
  #86 will add.

## Next

#82: move the English→Luganda course (40 units, guidebooks, stories) into a
JSON course pack and make the lesson engine speak of target and base
languages instead of Luganda and English.
