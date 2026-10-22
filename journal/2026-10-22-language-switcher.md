# 2026-10-22: Interface language switcher

Issue: #156 · Branch: `feat/156-language-switcher`

## Context

The owner wants the landing page to let anyone pick a language they
understand, with a control that people who read no English still recognise.

## Done

- `translate` icon: the 文A mark phones, browsers and Wikipedia use for
  "change language".
- `src/ui/language-switcher.js`: a pill with the mark and the current
  language in its own name. It opens a sheet with "Automatic" and every UI
  pack, each in its own name, with its small flag and its name in the
  current interface language. Lists of 7+ get the picker's search.
- Placed in the landing header (icon only on phones under 380px) and the
  onboarding top bar (icon only); the Settings "App language" row shows the
  same mark.
- `languageSwitch.*` strings in en, lg, sw. Tests in
  tests/language-switcher.test.js.

## Decisions

- One mark everywhere rather than a globe in one place and a flag in
  another: flags stand for countries, not languages, and 文A is the one
  symbol people already know means "language".
- The sheet reuses `openModal` (bottom sheet on phones), and picking a
  language goes through `changeUiLanguage`, the same path as Settings, so
  the choice is saved and the page redraws in the new language.

## Next

- Trim the landing copy and cycle the key entry labels through languages
  (Apple "hello" style) until a language is chosen.
