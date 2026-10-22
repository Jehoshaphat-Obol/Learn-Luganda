# 2026-10-22: French language pack, Section 2 (#144)

## What happened
- `lang/fr/units/u9.json` … `u16.json`: French text for Section 2 (Everyday life): colours and describing, clothes, daily routine, weather, animals, jobs, school and transport, including the Swahili-culture stories (Mzee à l'échoppe, Un nouveau kanga, En safari, Le métier de ses rêves, Le train pour Mombasa).
- Same conventions as Section 1: *tu* by default with *vous* and gendered forms as alternatives (je suis arrivé/arrivée, agriculteur/agricultrice), bare nouns with article forms accepted, cast and place slots ({@amara}, {@getaway}) left as placeholders.
- Proverb in sw-dream-job kept literal ("Qui veut ce qui est sous le lit doit se baisser") with the quiz explaining its meaning.

## Checks
- `npm run coverage`: `lang/fr` now 48% as target, 52% as base (still below the 95% listing threshold).
- `check.mjs 16`: fr-lg, lg-fr, fr-en, en-fr, fr-sw, sw-fr compose 16 units / 185 lessons each, no unit or story errors.
- `npm run validate` OK, vitest 401 passed.

## Native-speaker review checklist
- [ ] Adjective agreement in single-word meanings (rouge/blanc/neuf given in masculine, feminine as alternatives).
- [ ] Ugandan terms kept as loanwords (gomesi, kanzu, boda boda, matatu, gare routière for taxi park).
- [ ] Weather phrasing (il fait frais / il y a du vent for empewo).

## Next
- #144 Section 3 (u17–u24), then Sections 4–5, then #145 notes.
