# 2026-10-22: English for Swahili speakers, Section 2 (#147)

## What happened
- sw-en Section 2, "Maisha ya kila siku" (Elementary), units 9–16: 48 lessons, 152 words, 8 stories. sw-en now has 16 units.
- Units: Kueleza vitu, Nguo, Kusaidia nyumbani, Hali ya hewa na majira, Wanyama, Kazi, Shule, Kusafiri.
- Built by flipping en-sw units 9–16 (English becomes the target, Swahili the base) and writing new Swahili guidebooks about English grammar:
  - adjectives before the noun; plural -s and odd plurals (sheep, children)
  - "I’m wearing" (am/is/are + -ing); phrasal verbs put on / take off / try on
  - commands and "Don’t…"; asking politely (please, could you)
  - "It’s windy/cloudy"; the past of be (was/were) and -ed
  - "there is / there are"; "I am a farmer" (a/an with jobs); he works (-s)
  - capital letters for languages; "I don’t" and "Do you…?"; the future with will
- Story questions and summaries are in Swahili; lesson dialogue replies are in English.
- Words already taught in Section 1 (big, small, good, short, clean) were dropped from the new units, and "kanga" too (same word in English).
- Path headings: sw-en labels in English and Luganda cover Section 2.

## Checks
- `npm run validate` OK. Lesson-build check: 321 builds over all 107 lessons, average 15.3 exercises.
- vitest 331 passed; Playwright 160 passed.

## Native-speaker review checklist
- [ ] Swahili guidebook wording on English grammar (u9–u16).
- [ ] Story questions and summaries in Swahili.

## Next
- Section 3 (units 17–24), flipped from en-sw Section 3 the same way.
