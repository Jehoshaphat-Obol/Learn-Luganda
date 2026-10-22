# 2026-10-22: English for Swahili speakers, Section 3 (#147)

## What happened
- sw-en Section 3, "Mazungumzo" (Pre-intermediate), units 17–24: 39 lessons, 113 words, 8 stories. sw-en now has 24 units.
- Units: Kukataa, Kuuliza maswali, Nilichofanya, Mipango, Hisia, Burudani na michezo, Kwenye simu, Upishi.
- Built by flipping en-sw units 17–24 and writing new Swahili guidebooks about English grammar:
  - don’t / doesn’t (no -s after doesn’t); isn’t and not yet; didn’t and won’t
  - question words go first, with do/does; why / because; how many vs how old
  - present perfect (I’ve eaten, haven’t … yet); past simple -ed and irregular verbs (went, ate, did, bought, saw)
  - will vs going to; next week / last week; I would like
  - "I am happy" (not "I have happiness"); worried about, afraid of
  - like + -ing; play vs dance
  - object pronouns (call me, I’ll call you)
  - in / on / at for Swahili -ni; recipe commands and "Don’t…"
- The u18 dialogue now asks "How do you say “kwaheri” in English?" instead of asking for the Swahili.
- Dropped as duplicates of earlier English: "how many" (ngapi), "football", "hello" (haloo), and "bao" (same word in English).
- Path headings: sw-en labels in English and Luganda cover Section 3.
- Overlay script: `handoff/sw-en/sw_en_s3.py` in the project files (uses `flip.py`).

## Checks
- `npm run validate` OK. Lesson-build check: 438 builds over all 146 lessons, average 15.2 exercises, no lesson without new words.
- vitest 331 passed.

## Native-speaker review checklist
- [ ] Swahili tips on English grammar are clear and natural.
- [ ] Story questions and options are unambiguous.

## Next
- sw-en Section 4 (u25–u32), then Section 5 (u33–u40).
