# 2026-10-22: French language pack, Section 3 (#144)

## What happened
- `lang/fr/units/u17.json` … `u24.json`: French text for Section 3 (Conversations): negation, questions, past, future, feelings, hobbies, phone calls and cooking, including the Swahili-culture stories (La photo de famille, Jour d'examen, Non, merci, L'accident, Un voyage à Zanzibar, Les corvées du samedi, Une semaine chargée, Le grand match, Mauvais réseau, Une leçon de pilau).
- Negation answers use full *ne … pas* with the spoken form without *ne* accepted as an alternative (je sais pas, j'ai pas mangé).
- Past and feelings accept both genders (je suis allé/allée, fatigué/fatiguée, content/contente).
- Bibi's proverb in sw-saturday-chores uses the French equivalent "L'union fait la force"; the quiz explains it.

## Checks
- `npm run coverage`: `lang/fr` 68% as target, 70% as base (listing threshold is 95%).
- `check.mjs 24`: all six French pairings compose 24 units / 282 lessons, no unit or story errors.
- `npm run validate` OK, vitest passes.

## Native-speaker review checklist
- [ ] "nkkuse" as "je n'ai plus faim" (polite) rather than "je suis plein".
- [ ] Phone vocabulary (crédit/unités for airtime).
- [ ] Future forms: futur simple vs aller + infinitive both accepted.

## Next
- #144 Section 4 (u25–u32), then Section 5, then #145 notes.
