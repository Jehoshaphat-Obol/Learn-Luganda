# 2026-10-21: More exercise types

Issue: #14 · Branch: `feat/14-more-exercises`

## Context

The engine (#13) had intro, choice, word bank and match. Duolingo-style
variety keeps learners producing language, not just recognising it.

## Done

- **Type the translation** (`type.js`): free text, Enter to check.
  `checkTyped()` uses Levenshtein distance; one slip per ten letters (at
  least one) passes with "You have a typo." and the correct spelling.
- **Fill in the blank** (`fill.js`): a Luganda sentence with one known
  word blanked, the English as a hint, and three options. The answer keeps
  the casing it has in the sentence; distractors are cased to match.
- **Dialogue** (`dialogue.js`): a cast portrait says a line in Luganda
  (translation on request); pick the right reply. Uses the authored
  `dialogues` in the content.
- **Listening** (`listen.js`): play a recording, build what you hear from
  tiles. Generated only for items with recorded `audio`.
- New-word intro cards were already in #13.
- Generator order: intros and choices, match, translations, one fill, the
  lesson's dialogues, one typed answer, listening (if audio), then
  padding. Max length raised from 16 to 18.
- Runner shows typo notes; 5 new tests (edit distance, typo tolerance,
  fill correctness, dialogue coverage).

## Decisions

- Typing is Luganda → English for now: beginners can recognise Luganda
  spelling before producing it. Luganda typing can come with review.
- No text-to-speech fallback for listening. A wrong accent teaches the
  wrong sounds; recordings by a native speaker are the plan, and the
  `audio` slot is ready for them.

## Next

- #15 XP, lesson complete screen and daily goal.
