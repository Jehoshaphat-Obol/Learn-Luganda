# 2026-10-21: Landing, shell, onboarding and site pages from the packs

Issue: #84 (epic #80) · Branch: `feat/84-site-strings`

## Context

Every string in the app should come from the immutable JSON packs, so a
new language means a new pack, not code changes. This first pass covers the
landing page, the app shell, page titles, onboarding and the About, Contact,
Terms and Privacy pages.

## Done

- **UI pack** (`src/packs/ui/en.json`): new groups `titles`, `site`,
  `places`, `goals`, `colours`, `ui` (the UI kit's defaults), `landing`,
  `onboarding` and `pages`.
- **Light formatting in packs** (`src/i18n/rich.js`, `tHtml`): `**bold**`,
  `_italic_` and `[links](#/path)` (in-app, https and mailto only), applied
  after escaping, so translators never write HTML and a pack can't inject
  markup.
- **Course marketing** lives in the course pack: `course.json` → `landing`
  holds the greeting, "thank you", where the language is spoken, the
  ticker words, the "Why Luganda" copy, the playable sample question, the
  "Start!" word, the farewell line and two FAQ answers. It has a schema,
  and the validator checks that the sample's answer is one of its options.
  The About page uses the pack's `description`.
- Routes carry title keys. Site links, daily goals (now with ids),
  onboarding motivations and levels, avatar colours, place names and the
  modal, progress bar and ring defaults all read the pack.
- **Test** (`tests/strings.test.js`): switches to a pseudo-language that
  wraps every UI string in ⟦…⟧, renders the landing page, shell, every
  onboarding step and the four site pages, and fails on any English left
  after removing pack text and allowed names (cast, language names, course
  copy). It caught the taxi park's key and the critter avatar names on its
  first run.

## Decisions

- The FAQ's "Is it free?" answer said "no ads", which hasn't been true
  since AdSense. It now says a few clearly marked sponsored cards keep it
  free.
- Lists in the UI pack would make translation tooling harder, so the FAQ
  and "how it works" steps are fixed ids in code with one key per entry.

## Next

- #85: the learning screens, plus the reminder, ad and heart-review string
  files, into the UI pack, with the same pseudo-language test.
