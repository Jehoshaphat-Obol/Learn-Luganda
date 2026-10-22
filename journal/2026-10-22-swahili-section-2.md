# 2026-10-22: Swahili for English speakers, Section 2 (#146)

## What happened
- The owner asked for every course to be extensive, so en-sw now grows to the full 40 units, one section per PR. This is Section 2, "Everyday life" (Elementary), units 9–16: 48 lessons, 157 words, 8 stories.
- Units:
  - u9 Describing things
  - u10 Clothes
  - u11 Helping at home
  - u12 Weather and seasons
  - u13 Animals
  - u14 Work and jobs
  - u15 School
  - u16 Travel
- Each unit has 2 to 3 skills, a dialogue in most lessons that end a skill, a guidebook (intro, key phrases, tips, culture) and one story set in Tanzania or Kenya with the existing cast.
- Grammar this section introduces, one tip at a time:
  - adjective agreement across classes (mzuri, kizuri, vizuri, nzuri) and big/small in every class
  - -me- for states (nimevaa) and reversive verbs (vaa/vua, funga/fungua)
  - commands, -ni plurals and polite requests with the subjunctive (nisaidie, tufanye)
  - the two rainy seasons and the -li- past (ilinyesha, nilikuwa, kulikuwa na)
  - animals agreeing like people (simba mkali, ndege wengi)
  - job nouns and the full subject-prefix table (ni-, u-, a-, tu-, m-, wa-)
  - "of" agreeing (somo la, kitabu cha, kalamu ya) and the si- negative (sielewi, sijui)
  - the -ta- future and ji-/ma- nouns (gari langu jipya)
- Words not yet taught (angalia, hiki, mti, tena, kwenye and others) appear only in stories, with glosses.

## Checks
- `npm run validate` OK. Lesson-build check over all 107 en-sw lessons × 3 seeds: 321 builds, average 16.1 exercises.
- A scan of section 2 sentences for words not yet taught leaves only agreement forms covered by the tips (yangu, vyangu, kiko, mdogo, wawili…), place forms in -ni, and names.

## Native-speaker review checklist
- [ ] Agreement in every sentence (especially shati jeupe, gari langu jipya, masika yanakuja, viatu vyangu ni vichafu).
- [ ] Kenyan and Tanzanian usage: fundi, jua kali, kituo, saizi, likizo.
- [ ] Proverbs: Mikono mingi, kazi nyepesi; Mtaka cha mvunguni sharti ainame.
- [ ] Season months (masika March–May, vuli October–December) are fair for both countries.

## Next
- Section 3 "Conversations" (units 17–24) for en-sw, still under #146.
