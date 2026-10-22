# 2026-10-22: Shared catalog, phase 2, Section 2

Issue: #187 (phase 2 of #184) · Branch: `feat/187-fold-swahili-s2`

## Context

Phase 2 folds the hand-built Swahili family (en-sw, sw-en) into the shared
curriculum one section at a time. Section 1 landed in PR #188. This entry
covers Section 2 (units 9 to 16).

## Done

- `node scripts/fold-course.js --units u9-u16 --write`: 70 new words and
  120 new sentences, as one extra skill per unit (`u9s4` to `u16s4`, all
  `since: 2`): More descriptions, Shoes and sizes, Chores, Wind and storms,
  On safari, At the company, Words and meanings, Trains and planes.
- Luganda text for every new concept, skill titles in English, Swahili,
  Luganda and French, and Swahili replies for the S2 dialogues, all drafted
  in `scripts/fold/en-sw.tsv` (Luganda is an AI draft, like the rest, and
  needs native review).
- en-sw and sw-en notes for S2 now live in `lang/en/about/sw/` and
  `lang/sw/about/en/` (about coverage 0.4).
- "How do you say it in Swahili?" became `{to}` / `{to.mu}` in every
  language, so it names whichever language the course teaches.

## Decisions

- Where a new Swahili word would have the same Luganda answer as an older
  word (for example *anafanya* "he works" vs *akola*), the Luganda draft
  uses a distinct but natural form (*akolera*) instead of letting the
  composer drop the newer word.

## Next

Section 3 (u17 to u24), then S4 (culture units), S5, culture slots, and
retiring the hand-built en-sw and sw-en.
