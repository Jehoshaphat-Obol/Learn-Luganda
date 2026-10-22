# 2026-10-22: French language pack, Section 1 (#144)

## What happened
- The owner pointed out that hand-built pairs grow as n×(n−1). With the shared catalog (#184) in place, the paused pair issues were rewritten: #144 is now one French pack (`src/packs/lang/fr`) that pairs French with every language, and #145 covers the optional guidebook notes. No `fr-lg` or `lg-fr` folder is built.
- `lang/fr/units/u1.json` … `u8.json`: French text for every curriculum word, sentence, phrase, dialogue and story in Section 1 (Basics), including the Swahili-culture stories, so the same file works when French is the language being learned and when it is the learner's own.
- `lang/fr/course.json`: course title ("{to} pour les francophones"), cheers, congrats/thanks, learner settings, and culture slots: Camille, Julien, Mamie Jeanne, Karim and Léa in Paris, Lyon, Marseille, Nice, Belle-Île and Versailles. Every place takes "à", so French base text ("J’habite à {@city}") also reads right with Kampala or Dar es Salaam.
- Conventions: answers default to *tu*, with *vous* forms and gendered variants (étudiant/étudiante, enchanté/enchantée) as accepted alternatives; nouns are bare with "le/un" forms as alternatives; French spacing uses a no-break space before ? ! : ; (answer checking ignores it); trailing "(…)" hints are used where a base-language meaning needs them ("suis (est, sont)").
- Tooling for the remaining sections lives in the project's shared folder (handoff/fr): `flat.py` dumps a unit to one line per text and builds it back, mirroring English's shape; `check.mjs N` composes all six French pairings and validates units up to N.

## Checks
- `npm run validate` OK; `lang/fr` is at 24% as target and 30% as base, so no French course is listed yet (threshold 95%).
- fr-lg, lg-fr, fr-en, en-fr, fr-sw and sw-fr composed for units 1–8: 83 lessons each, no unit or story errors.
- vitest 401 passed.

## Native-speaker review checklist
- [ ] Greeting equivalents (Bon après-midi for Osiibye otya, Bon travail for Gyebale ko).
- [ ] Number and time phrasing (Ugandan/Swahili hours vs French clock).
- [ ] Gendered alternatives accepted where the speaker's gender is unknown.

## Next
- #144 Section 2 (u9–u16), then Sections 3–5, then #145 notes.
