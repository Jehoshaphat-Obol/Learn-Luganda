# 2026-10-22: Swahili for English speakers, Section 5 (#146)

## What happened
- en-sw Section 5, "Confident speaker" (Upper intermediate), units 33–40: 28 lessons, 78 words, 8 stories. en-sw is now complete at 40 units, 202 lessons, 664 words, 45 stories.
- Units:
  - u33 Comparing (kuliko, zaidi, kuliko wote, bora)
  - u34 If and when (-ki- "if/when", -nge- "would", laiti)
  - u35 Telling stories (Paukwa! Pakawa!, the narrative -ka-)
  - u36 Proverbs (hu- for "always true"; six well-known methali)
  - u37 News and opinions (nadhani, kwa maoni yangu, nakubali / sikubaliani)
  - u38 Emergencies (kumetokea, the passive/stative, usi-…-e "don't")
  - u39 Respect and etiquette (Hodi, naomba, Pole kwa kazi, the right hand)
  - u40 Folktales (Sungura and fisi, Abunuwasi and the king; object markers -m-/-tu-)
- u33–u36 started from the handoff drafts; each was filled out to three lessons, and words that sentences relied on but never taught (mali, tajiri, sungura) were added.
- Path headings: en-sw labels in Swahili and Luganda now cover Sections 4 and 5 too (they stopped at Section 3), so `npm run validate` reports no fallbacks for en-sw.

## Checks
- `npm run validate` OK. Lesson-build check: 606 builds over all 202 lessons, average 15.9 exercises.
- Untaught-word scan over u33–u40: only inflected forms of taught roots remain.
- vitest 309 passed; Playwright 160 passed.

## Native-speaker review checklist
- [ ] Conditionals and wishes (ukifika, ningekuwa, laiti ningekuwa na muda).
- [ ] Proverb wording and meanings (u36), Paukwa/Pakawa story openings.
- [ ] Emergency phrasing (kumetokea ajali, ameibiwa, gari la wagonjwa).
- [ ] Etiquette notes (Hodi, Pole kwa kazi, right hand) and the Abunuwasi tale.
- [ ] Luganda and Swahili path headings for u25–u40.

## Next
- #147: Swahili → English (sw-en) Sections 2–5.
