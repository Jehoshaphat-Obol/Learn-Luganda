# 2026-10-22: Picker headings in the searched language (#155)

## What happened
- The owner tried the picker search on a phone. Typing "Swa" should also turn "I speak" and "I want to learn" into Swahili, live, to make the result feel more natural.
- Every registry language except Runyankore now has `speak` and `learn` phrases in the language itself. Examples: Ninaongea / Nataka kujifunza, Njogera / Njagala okuyiga, Je parle / Je veux apprendre. Runyankore is left out until a speaker confirms the wording. They are drafts and need native review.
- `searchedLanguage(query, languages, labelOf)` in `src/i18n/search.js` picks the one language a search clearly points at. An exact name or code wins; otherwise it's the only language with a name or word starting with the query. It needs at least 2 letters. If nothing is clear, it returns null (for example "isi" matches both isiZulu and isiXhosa).
- While the search points at a language, the full picker's headings read "Ninaongea · I speak". The searched-language phrase gets `lang`/`dir`, and the app-language heading is muted beside it. Clearing or changing the search restores them without a redraw. If the searched language is the app language, only one heading shows.
- Spanish is not in the registry yet (no course or interface), so searching for it finds nothing. It will appear when a Spanish pack exists.

## Tests
- Unit: searchedLanguage (prefix, exact, too short, ambiguous, interface-language names) and the phrases for en/lg/sw/fr.
- e2e: typing "kiswa" shows "Ninaongea · I speak" and "Nataka kujifunza"; "klingon" restores "I speak".

## Native-speaker review checklist
- [ ] speak/learn phrases for each of the 22 languages in `src/packs/languages.json`.
