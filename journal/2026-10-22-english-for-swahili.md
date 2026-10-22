# 2026-10-22: English for Swahili speakers, Section 1 (#126)

## What happened
- New course pack `src/packs/courses/sw-en/`: English taught in Swahili. 8 units, 59 lessons, 220 words, 13 stories. Status `draft`.
- Built by turning the en-sw units around (the English becomes the target and the Swahili the base), then rewriting everything a Swahili speaker reads. Unit and skill titles, descriptions, word notes, guidebook intros, tips, culture notes, story titles, summaries and questions, and cast roles are all in Swahili. The generator script stayed in the scratchpad; the pack is the source from now on.
- **Cut** what only makes sense for learners of Swahili: Shikamoo and Marahaba (and their sentence), the duplicate "my" and "your" forms (wangu, wako), yuko ("is (at)") and inanyesha. The u1 Shikamoo story became "Habari za asubuhi, Bibi", a morning greeting in English. The u4 matatu story about Swahili time became "Saa ya Kiingereza", where Juma learns to say the time in English.
- **New grammar tips** in Swahili about English: I am / you are, he and she (and his/her), have/has and don't, plurals with -s and the irregular ones, "I am hungry" (not "I have hunger"), I eat vs I am eating, please, -teen and -ty numbers, English clock time vs Swahili time, Where is…?, going to (and "go home"), in/on/under, there is / there are, adjectives before nouns, capital letters for days, -s for he/she in routines, "It's raining", body plurals (feet, teeth), "My head hurts", sorry vs excuse me.
- Dialogues now have English prompts and English answer options. Story questions with `optionsLang: "target"` ask for the English phrase.
- Both "mzuri" and "njema" translate to "good", so each accepts the other.
- Onboarding: a Swahili speaker who answers "Ninaongea Kiswahili" now gets English pre-selected (the only course taught in Swahili).

## Checks
- `npm run validate` OK; lesson-build check: 177 builds (59 lessons × 3 seeds), average 15.5 exercises.
- e2e: a Swahili browser is offered "Kiingereza, kwa kutumia Kiswahili", and the sw-en path and first lesson open.

## Native-speaker review checklist
- [ ] Swahili in titles, notes, tips and culture notes reads naturally (Kenyan and Tanzanian readers).
- [ ] The English time tip (ongeza au toa sita) and the examples are clear.
- [ ] Story questions and options are unambiguous.
- [ ] The cast roles and the landing text are in natural Swahili.

## Next
- #146 en-sw Sections 2–5, then #147 sw-en Sections 2–5 (both courses to 40 units).
