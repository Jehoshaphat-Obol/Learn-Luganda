# 2026-10-22: Swahili for English speakers, Section 1

Issue: #125 (epic #80, wave 1 of docs/languages/README.md) · Branch: `feat/125-swahili-course`

## Context

The second course in the app and the first not about Luganda. Swahili is
Uganda's second official language and the lingua franca of East Africa, so
it comes right after the Luganda interface and courses in the build plan.

## Done

- `src/packs/courses/en-sw/`: `course.json` and units 1 to 8 (Foundations):
  greetings and respect, family, food and the market, numbers and Swahili
  time, getting around, the home and colours, the days of the week and the
  weather, the body and health. 59 lessons, 226 words, 13 stories.
- Its own cast, set across the Swahili-speaking region: Amani (student, Dar
  es Salaam), Baraka (chai stall, Mombasa), Bibi Mwanaisha (Zanzibar,
  proverbs), Juma (matatu driver, Nairobi), Neema (student, Arusha) and
  Emma (a volunteer learning alongside you). They reuse the illustrated
  looks through `look`.
- Course settings: two fill-in-the-blank exercises per lesson (Swahili
  agreement and verb pieces reward it) and three listening exercises using
  the device voice, since Swahili voices are common on Android and desktop.
- Guidebook tips built for Swahili: news greetings and shikamoo, `ni`,
  noun classes (m-/wa-, ki-/vi-), nina/sina, Swahili time from sunrise,
  ni-na- verbs and -ni places, kuna/hakuna, colours that agree, pole or
  samahani.
- Onboarding pre-selects the likeliest course when a language now has two:
  an English speaker in Nairobi gets Swahili, in Kampala Luganda, and
  elsewhere the default (Luganda). `likelyCourse` in
  `src/views/language-picker.js`, with unit tests.
- Fix: the learning path and guidebook drew `unit.character` as an
  illustration id. A course whose cast ids differ from the drawings (here
  `amani` drawn as `nakato`) crashed the path. They now go through
  `castMember(id).look` like stories and dialogues do.
- e2e: Nairobi pre-selects Swahili; the Swahili path and first lesson open.

## Decisions

- Kenyan and Tanzanian words both accepted where they differ (matatu and
  daladala, piki piki and boda boda), with notes.
- Close family takes the `y-` possessive (mama yangu), other people the
  `w-` form (rafiki wangu); the tip explains that both are heard.
- `iko wapi?` is taught for all places and things, as heard on the street,
  with a note that the class-agreeing forms exist.

## Native-speaker review checklist

- [ ] Greetings: Habari za mchana as "good afternoon"; Mambo/Poa register
- [ ] u2: mama yangu vs mama wangu; rafiki wangu
- [ ] u4: Swahili time table and the matatu story's explanation
- [ ] u5: Msikiti iko pale (vs uko); Duka iko hapa (vs liko)
- [ ] u6: Rangi ya dirisha ni kijani; colour agreement table
- [ ] u7: Mvua inanyesha; days of the week etymology note
- [ ] u8: kichwa kinauma / jino linauma / mguu unauma; Ugua pole; Afya ni bora kuliko mali
- [ ] Every story for natural flow
