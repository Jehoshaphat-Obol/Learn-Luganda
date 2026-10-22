# 2026-10-22: Shared catalog, phase 2, Section 4

Issue: #187 (phase 2 of #184) · Branch: `feat/187-fold-swahili-s4`

## Context

Section 4 (units 25 to 32) is the culture section. The curriculum's units
are about Buganda (clans, the Kabaka, kwanjula, drums); en-sw's are about
the Swahili coast (dhows, Lamu, Abunuwasi, taarab). Both stay: Buganda
units keep their skills, and en-sw's culture becomes the extra skill in
each unit, so every learner meets both.

## Done

- `node scripts/fold-course.js --units u25-u32 --write`: 49 new words and
  69 new sentences as `u25s4` to `u32s4` (`since: 2`): The Swahili coast,
  Abunuwasi, Rice and rain, Guests and holidays, Bands and concerts, Faith
  and names, Trade and savings, Mountains and nature.
- Luganda drafts, skill titles and Swahili dialogue replies for S4 in
  `scripts/fold/en-sw.tsv`; S4 notes in the about folders.

## Decisions

- Coast facts ("Swahili is the language of the coast") keep the literal
  name rather than `{to}`, because they are about Swahili whichever
  language the course teaches.

## Next

Section 5 (u33 to u40), culture slots, then retire the hand-built en-sw
and sw-en.
