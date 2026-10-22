# 2026-10-22: Leaner landing page, labels in every language

Issue: #159 · Branch: `feat/159-lean-landing-cycling`

## Context

The owner found the landing page wordy, and wants the small steps into the
app to work for anyone, whatever they read: like the "hello" on a new
Apple device, labels such as Get started should show themselves in every
language in turn, until the learner picks one.

## Done

- Landing copy trimmed in en, lg and sw: one-line hero lead, one-line
  "how it works" steps and showcase texts, shorter FAQ answers and footer.
  The course's long "why" paragraph is no longer shown (title and the three
  cards stay); the field stays in course packs so no pack changes.
- `src/ui/cycle.js`: `cycleText(key)` and `cyclePlaceholder(key)`. While
  the interface language is Automatic, Get started (header, hero, final
  call), the language pill ("Language" / "Olulimi" / "Lugha"), onboarding
  Continue and the language search placeholder fade through every UI pack's
  wording every 2.8 s, all labels in the same language at once.
- Strings come from `virtual:ui-cycle`, a Vite plugin (build/ui-cycle.js)
  that copies only the keys in src/i18n/cycle-keys.js out of every UI pack,
  so the page never downloads whole packs to show them.
- On phones the landing header shows the bird without the wordmark, so the
  pill and Get started fit in their longest wording.
- Tests: tests/cycle.test.js; the stray-English test ignores the hidden
  wordings.

## Decisions

- Old wording fades out fully before the new one fades in (no crossfade),
  so the label is readable at every moment.
- All wordings share one grid cell: the widest sets the size, so buttons
  don't jump.
- Screen readers only get the current language (other wordings are
  aria-hidden; inputs keep a fixed aria-label), and the placeholder stops
  changing while the box has focus or text.
- Stops once a language is chosen (switcher or Settings), never runs with
  reduced motion, and picking Automatic again turns it back on.

## Next

- Add keys to cycle-keys.js if other entry points need it; every new UI
  pack joins the cycle automatically.
