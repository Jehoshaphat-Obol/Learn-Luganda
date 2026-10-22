# Shared catalog, phase 2: folding the Swahili courses in, Section 1

Issue #187 (phase 2 of #184).

## Context

Phase 1 (#185) built one curriculum and per-language packs from the Luganda
family (en-lg, sw-lg, lg-en). The Swahili courses (en-sw, sw-en) were still a
separate, hand-built family with their own words and lessons. The owner wants
one shared structure, as extensive as possible, built on the existing common
configuration, so any of the 50 × 49 pairs is a full course.

## Done

- `scripts/fold-course.js`: matches every word and sentence of a hand-built
  pair (and its reverse) to the curriculum. A match needs both languages to
  agree, one of them on the main text. Matches gain the pair's accepted
  answers and notes; the rest become new concepts in an extra skill per unit.
  Other languages' text comes from a drafts file the script writes and reads
  (`scripts/fold/en-sw.tsv`).
- Audit of en-sw: 356 of 664 words and 46 of 533 sentences were already in the
  curriculum. 308 words and 487 sentences are new concepts.
- Section 1 (u1–u8) folded: 71 new words and 115 new sentences as skills
  `u1s4`–`u8s4`, with English and Swahili from en-sw/sw-en and Luganda drafted.
  New skill headings in English, Swahili, Luganda and French.
- Swahili now has dialogue replies for S1, `cheers`/`phrases`/`settings` for
  courses that teach it, and notes about Swahili in English
  (`lang/en/about/sw/`, description, landing, cast roles, word notes and
  guidebooks for u1–u8) and about English in Swahili (`lang/sw/about/en/`).
- Curriculum version 2. New skills carry `since: 2`; when two words share an
  answer, the composer keeps the one from the older skill, so new concepts never
  push out words learners already have (lg-en keeps *kino* "this" over the new
  *ono*).
- Golden test: compares only what the legacy packs had, so it now checks that
  growth is purely additive.

## Decisions

- Extra skill per unit rather than reshuffling existing skills: existing
  lesson ids, words and progress stay exactly where they were.
- Placement by where a source lesson's matched words live, with a topic map
  as fallback, because en-sw's units 2–7 and 25–32 are ordered differently.
- Proper names in folded sentences (Amani, Mombasa, Arusha) stay as written.
  Culture slots (per-language cast names and places) are a later step on #187.
- Hand-built en-sw/sw-en stay live (they take precedence) until every section
  is folded; composed en-sw is held back automatically because its notes cover
  only 20% of units.

## Native-speaker review

All Luganda in `scripts/fold/en-sw.tsv` (lines starting `lg`) is AI-drafted.
Points to check first: *Nkulamusizza n'ekitiibwa* for Shikamoo, *Kiri bulungi*
for Poa, *ewooma* for "tasty", *Mponye* for "I've recovered", *kamunye* for
minibus, *akawungeezi* for evening. The Swahili dialogue replies (`sw dialogue`
lines) need a check too.

## Next

S2 (u9–u16) on #187: `node scripts/fold-course.js --units u9-u16 --drafts scripts/fold/en-sw.tsv`,
fill the new `lg`, `fr`, `en`, `sw` lines, run with `--write`, then
`npm run coverage`. Then S3–S5, culture slots, and retiring the hand-built
en-sw/sw-en with progress migrations.
