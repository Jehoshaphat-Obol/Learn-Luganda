# 2026-10-22: Luganda for Swahili speakers, Section 1 (#143)

## What happened
- New course pack `sw-lg`: Luganda taught in Swahili, the first course with no English side. Section 1 "Misingi" (Beginner), units 1–8: 53 lessons, 198 words, 5 stories.
- Built from en-lg u1–u8. Luganda stays the target, so nothing flips: every base-side string (words, sentences, dialogues, story lines, glosses, story questions and options, guidebook phrases, tips and culture notes) was rewritten in Swahili, with Swahili `altBase` alternatives (Habari yako / Hujambo / Mambo, Nzuri / Salama / Sijambo, ninakwenda / naenda …). English alternatives are dropped.
- Guidebook tips compare Luganda with Swahili instead of English, where the two Bantu languages line up:
  - noun classes: omu-/aba- ≈ m-/wa-, eki-/ebi- ≈ ki-/vi-, and agreement (kyange/byange ≈ changu/vyangu)
  - subject prefixes: n-/o-/a- ≈ ni-/u-/a-; Luganda has no -na- for the present
  - Nnina enjala = nina njaa (identical pattern)
  - Ugandan time = Swahili time (ssaawa emu = saa moja), so no conversion
  - Kkodi! = Hodi!, Gyebale ko ≈ pole na kazi, ssebo/nnyabo ≈ shikamoo-style respect
  - gunnuma / lunnuma ≈ kinaniuma / linaniuma; the -n- object marker ≈ -ni-
  - long vowels and doubled consonants (Swahili has no length contrast), ŋ ≈ ng’
- Unit and skill titles come from en-lg's Swahili labels; `labels/en.json` and `labels/lg.json` give path headings in English and Luganda.
- course.json: Swahili title, landing text and cast roles; same cast and voices as en-lg.
- e2e: a Swahili browser now gets both English and Luganda offered; the Luganda path and first lesson open in Swahili. With two courses from Swahili and no region hint, the picker no longer pre-selects one (by design in `likelyCourse`).
- Tooling (project files `handoff/sw-lg/`): `rebase.py extract N` lists every base-side string of en-lg uN; `rebase.py apply N swN.txt` writes sw-lg uN from a `path := Swahili` file and fails on missing or unknown paths. `course.py N` writes course.json and labels for N sections.

## Checks
- `npm run validate` OK. Lesson-build check: 159 builds over 53 lessons, average 15.4 exercises.
- vitest 333 passed; Playwright 164 passed.

## Native-speaker review checklist
- [ ] Swahili explanations of Luganda grammar are accurate and natural.
- [ ] Swahili answers and alternatives cover what learners will type (both Kenyan and Tanzanian usage).
- [ ] Comparisons between Luganda and Swahili are correct (noun classes, prefixes, time).
- [ ] Story questions and options are unambiguous.

## Next
- sw-lg Sections 2–5 (units 9–40) in a follow-up issue, one section per PR, same tooling.
