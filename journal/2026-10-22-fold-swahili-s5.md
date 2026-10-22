# 2026-10-22: Shared catalog, phase 2, Section 5

Issue: #187 (phase 2 of #184) · Branch: `feat/187-fold-swahili-s5`

## Context

The last section (units 33 to 40) of folding the hand-built en-sw/sw-en
into the shared curriculum. With it, every en-sw word and sentence is a
curriculum concept, and the Swahili about-notes pass the 95% bar, so the
catalog composes Swahili courses on its own.

## Done

- `node scripts/fold-course.js --units u33-u40 --write`: 54 new words and
  76 new sentences as `u33s4` to `u40s4` (`since: 2`): More or less, If I
  were rich, Paukwa! Pakawa!, Swahili proverbs, Community and news,
  Emergencies, Manners, The hare and the hyena.
- `fold-course.js` fills `{to}`/`{from}` with each language's own names
  before matching, so "How do you say it in {to}?" matches en-sw's "in
  Swahili". A dry run now reports 664/664 words and 533/533 sentences
  matched.
- **New course: Swahili for Luganda speakers (lg-sw)**, composed. It
  needed course intros about Swahili in Luganda, French and Swahili
  (`lang/{lg,fr,sw}/about/sw/course.json`), Swahili options for 15 story
  questions, and a u26 guidebook in `lang/en/about/sw` (Kabaka words,
  `hu-`, Abunuwasi). Unit notes for lg-sw fall back to English until
  Luganda ones are written.
- en-sw and sw-en are still served from the hand-built packs (they win
  over composed ones with the same id).

## Decisions

- Swahili proverbs get literal Luganda renderings where Luganda has no
  matching proverb already in the course; where it has one (*Kamu kamu gwe
  muganda*, *Akwata empola atuuka wala*), the new one is worded differently
  so both stay.
- Paukwa!/Pakawa! became *Mbagerere? / Tugerere!* ("Shall I tell you a
  story? / Tell us!") so it doesn't collide with the word *enfumo*.

## Next

Culture slots (cast names and places per target language), then retire
the hand-built en-sw and sw-en with progress migrations from their word
ids to curriculum ids.
