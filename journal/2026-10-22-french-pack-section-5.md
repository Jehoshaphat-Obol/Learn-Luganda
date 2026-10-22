# 2026-10-22: French language pack, Section 5 (#144)

## What happened
- `lang/fr/units/u33.json` … `u40.json`: French text for Section 5 (Confident speaker): comparisons, conditionals, storytelling, proverbs, news and opinions, emergencies, respect and manners, and folktales (Kintu et Nnambi), with the Swahili-culture stories (Qui est le plus rapide ?, Préparatifs de mariage, Si j'étais riche, Le lièvre et le crocodile, Les proverbes de Bibi, Le harambee, Le journal du matin, Abunuwasi et le roi, among others).
- Storytelling uses the French tale register (passé simple: "Il alla", "Il vit", "Kintu épousa Nnambi") with passé composé forms accepted as alternatives.
- Proverbs are translated literally ("Un seul doigt ne tue pas un pou") with the closest French saying accepted as an alternative ("L'union fait la force", "Qui va lentement va loin", "Mieux vaut prévenir que guérir").
- `lang/fr` is now complete: 100% as target and as base. French speakers get two new composed courses, **fr-lg** (Luganda for French speakers) and **fr-sw** (Swahili for French speakers), each 40 units / 462 lessons. Courses that teach French (en-fr, lg-fr, sw-fr) and fr-en still wait for notes about French (#145), as the compose rules require.

## Checks
- `check.mjs 40`: fr-lg, lg-fr, fr-en, en-fr, fr-sw, sw-fr all compose 40 units / 462 lessons, no unit or story errors.
- `npm run validate` OK (8 composed courses); vitest 419 passed (the new courses add landing and label checks).

## Native-speaker review checklist
- [ ] Passé simple in tales vs passé composé in dialogue.
- [ ] Proverb pairs (literal vs French equivalent) read naturally.
- [ ] Emergency phrases (Au secours ! Au voleur !) and respectful greetings (mwasuze → Bonjour / Vous avez bien dormi ?).

## Next
- #145: French guidebook notes (lang/en/about/fr, lang/fr/about/{en,lg,sw}) to unlock en-fr, lg-fr, sw-fr and fr-en.
