# 2026-10-22: French language pack, Section 4 (#144)

## What happened
- `lang/fr/units/u25.json` … `u32.json`: French text for Section 4 (Community and culture): clans and totems, the Buganda kingdom, farming, ceremonies, music and dance, faith and holidays, business, and nature, with the Swahili-culture stories (Le boutre, Une bonne nouvelle, L'Aïd chez Bibi, Soirée concert, Un soir de ramadan, Le commerce de Baraka, Le Kilimandjaro).
- Ugandan institutions keep their names with a French gloss as alternatives (Kabaka/roi, Katikkiro/Premier ministre, Lukiiko/parlement, ssenga/tante paternelle, kwanjula/présentation).
- Clan totems in French: civette (Ffumbe), pangolin (Lugave), protoptère (Mmamba, lungfish), colobe (Ngeye).
- Proverbs use French equivalents where one exists ("Petit à petit, l'oiseau fait son nid" for Haba na haba hujaza kibaba); Bibi's Eid proverb is kept literal.

## Checks
- `npm run coverage`: `lang/fr` 85% as target, 86% as base (listing threshold 95%).
- `check.mjs 32`: all six French pairings compose 32 units / 371 lessons, no unit or story errors.
- `npm run validate` OK, vitest passes.

## Native-speaker review checklist
- [ ] "protoptère" for mmamba (lungfish) is accurate but rare; "poisson à poumons" is accepted too.
- [ ] Holiday greetings (Bonne fête de l'Aïd / Aïd Moubarak, Joyeux Noël).
- [ ] "Bon courage !" for the Luganda greeting to someone working (Gyebale ko).

## Next
- #144 Section 5 (u33–u40), then #145 notes.
