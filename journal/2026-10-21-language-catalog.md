# 2026-10-21: Language catalog and build plan

Issue: #123 (epic #80) · Branch: `feat/123-language-catalog`

## Context

With every string and every lesson now in language packs, the owner asked
for the list of languages spoken in Africa, then the major languages of the
world, and a plan for building their packs one by one, starting from Uganda
(English by default, Luganda both ways). The onboarding side (asking what
you speak and what you want to learn, and switching the whole UI) is being
done separately, together with the Luganda UI pack (#121) and the first
English-for-Luganda-speakers section (#122).

## Done

- `docs/languages/catalog.json`: 137 African and 48 global languages, each
  with code, English and native name, family, script, main countries, a
  rough speaker count, a build wave, how confidently Claude can draft it,
  and whether the app already registers it.
- `docs/languages/README.md`: what "adding a language" means (registry
  entry, UI pack, en→X course, X→en course; courses start with Section 1
  and grow a section per issue), the waves (Uganda, East Africa and the
  Horn, West, Central and Southern, North Africa, global, later), the wave 1
  issue order, and the quality bar. The tables are generated from the JSON
  by `npm run catalog`; `tests/language-catalog.test.js` keeps them in sync
  and checks the catalog against `src/packs/languages.json`.
- Wave 1 issues opened in order: #124 Swahili UI, #125 en-sw, #126 sw-en,
  #127 lg-en sections 2 to 5, #128 en-nyn, #129 en-xog, #130 en-ach,
  #131 en-teo, #132 en-lgg, #133 French UI.

## Decisions

- "All languages in Africa" is about 2,000 languages; the catalog lists the
  ones that are official, national, lingua francas or have roughly half a
  million speakers, plus Uganda's languages. Anything else can be added the
  same way.
- The app's existing code `tw` (Twi) is kept rather than the macrolanguage
  `ak` (Akan), so the catalog and the registry agree.
- Arabic appears in both lists on purpose (it is African and global).
- Issues are only opened for the wave we are working on, so the tracker
  holds work we are about to do.

## Next

#121 and #122 (in progress elsewhere), then #124 onward, one at a time.
