# 2026-10-21 · Luganda interface pack (#121)

## Done
- `src/packs/ui/lg.json` translates every key in `en.json` (about 600 strings): landing, onboarding, site pages, lessons, rewards, shop, profile, settings, reminders, ads and the consent cards. `npm run validate` reports no strings falling back to English.
- Status is `draft`. The Luganda was drafted by Claude and needs a native speaker's review before it is marked `reviewed`.
- Tests: a unit test checks that the pack is complete and that `lg-UG` browsers get it, and an e2e test switches the interface to Luganda in Settings.

## Word choices worth reviewing
Yiga (Learn), Yegezaamu (Practice), Amayinja (Gems), Emitima (Hearts), Essomo (Lesson), Ekitundu (Unit), Omutendera (Section), Olugero/Engero (Story/Stories), Akatabo (Guidebook), Ekigezo (Checkpoint), Ekiruubirirwa (Goal), ennaku ez'omuddiriŋŋanwa (Streak), Ekikuuma ennaku (Streak freeze), Entegeka (Settings), Ebikukwatako (Profile). The app name stays "Learn Luganda".

## Next
- #122: the lg-en course, so Luganda speakers can learn English with this interface.
- Region guess: in Uganda with an English browser, ask about English first.
