# 2026-10-22: Luganda for Swahili speakers, Section 2 (#176)

## What happened
- sw-lg Section 2, "Maisha ya kila siku" (Elementary), units 9–16: 72 lessons, 162 words, 4 stories. sw-lg is now at 16/40 units (125 lessons, 360 words, 9 stories).
- Units: Rangi na maumbo, Nguo, Siku yangu, Hali ya hewa, Wanyama, Kazi, Shuleni, Usafiri (titles from en-lg’s Swahili labels).
- Same method as Section 1 (`handoff/sw-lg/rebase.py` + `sw9.txt`…`sw16.txt` in the project files). New Swahili tips about Luganda:
  - adjectives agree like Swahili (-lungi ≈ -zuri: mulungi / balungi / kirungi ≈ mzuri / wazuri / kizuri); colour nouns use kya/ya ≈ cha/ya
  - the n- class is the Swahili N class: essaati yange / engatto zange ≈ nguo yangu / nguo zangu; eno ≈ hii; nkitwala / ngitwala ≈ nitakichukua / nitaichukua
  - subject prefixes n-/o-/a-/tu-/mu-/ba- ≈ ni-/u-/a-/tu-/m-/wa-; ku- infinitive is the same (okusoma = kusoma)
  - agent nouns omu- + stem + -i ≈ m- + stem + -i (omuzimbi ≈ mjenzi, omufumbi ≈ mpishi)
  - group commands and “let’s”: Musome ≈ msome, Tusome = tusome, Tugende ≈ twende
  - n- sound changes (mpandiika, ndaba) compared with Swahili N-class changes (-refu → ndefu)
  - animals: Luganda n-class agreement e-/zi- (ente erya / ente zirya), unlike Swahili a-/wa- for animals
- Taxi words use matatu / daladala as alternatives; Uganda’s second national language (Swahili) noted in the school culture note.

## Checks
- `npm run validate` OK. Lesson-build check: 375 builds over 125 lessons, average 14.3 exercises (u12s3l3 has no new words, as in en-lg).

## Native-speaker review checklist
- [ ] Swahili explanations and comparisons in units 9–16 are accurate.
- [ ] Swahili answers and alternatives cover common Kenyan and Tanzanian forms.
- [ ] Story questions and options are unambiguous.

## Next
- Section 3 (units 17–24): `python3 rebase.py extract N`, write `swN.txt`, `apply`, then `course.py 3`.
