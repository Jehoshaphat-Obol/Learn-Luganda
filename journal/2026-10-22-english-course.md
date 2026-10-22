# 2026-10-22 · English for Luganda speakers (#122)

## Done
- `src/packs/courses/lg-en/` is a new course with Luganda as the base and English as the target. Section 1 (units 1–8, 53 lessons, 195 words, 5 stories) is the en-lg Section 1 turned round:
  - English is the target text and Luganda the base. Accepted English answers moved to `altTarget`.
  - Three words were dropped because another Luganda word teaches the same English (`wange`, `omuyizi`, `lunnuma`). Meanings that only made sense for Luganda were removed from the English alternatives.
  - Skill and unit titles, dialogue replies, story titles and questions, and cast roles are in Luganda.
  - Guidebooks are new. They are written in Luganda about English: greetings by time of day, I/I am, you for one or many, my, plurals, a/the, "I am hungry", "I eat" vs "I am eating", -teen/-ty, English time vs Ganda time, on Monday, going to, please, "my head hurts".
  - Settings: synthesized listening, since English device voices are everywhere.
  - Status is `draft`; both languages need a native-speaker review.
- Region guess: a browser language spoken in the region now comes first. In Uganda with an English browser, the crane asks about English ("do you speak it, or want to learn it?"). Learning English picks lg-en and switches the app to Luganda; speaking English picks en-lg.
- Language names are localised. Packs have a `languageNames` group, and screens use `courseLanguage()` (src/content/names.js) or `languageLabel()`. So Luganda screens say "okuyiga Olungereza". `languageName()` in course.js keeps the English names for scripts and tests.
- Added Luganda for the new install-card strings.
- Tests: region ordering, the English guess in Uganda, the Kampala e2e for both directions, a Luganda browser in Kampala, a full lg-en lesson in Luganda, and the lg-en guidebook.

## Next
- Sections 2–5 of lg-en, following the en-lg outline.
- Native review of ui/lg and lg-en.

# 2026-10-22 · lg-en Sections 2–5 (#162)

## Method
- `scripts/flip-course.js` now does the mechanical part of turning an en-lg unit round (swap target/base and the alternatives, drop glosses and Luganda-grammar notes, translate dialogue and story options through the en-lg words and sentences, titles from `en-lg/labels/lg.json`). A per-unit overlay holds what has to be written: dropped duplicates, Luganda notes, the guidebook, story titles, summaries and questions. The script fails if any of it is missing.
- Overlays live in scratch space; the unit JSON is the source after that. Story questions without hand-written options keep English options (`optionsLang: "target"`), which doubles as reading practice.
- Section labels: `lg-en/labels/en.json` takes the en-lg English titles, `sw.json` the en-lg Swahili labels (same ids).

## Section 2 (units 9–16)
- 8 units, 72 lessons, 150 words, 4 stories. Dropped words whose English repeats another word: kirungi, balungi, mukadde, munene, bawanvu (u9), yange, zange, eno, nnene, ntono, yambala (u10), nnyo-nnyo (u12). `mulungi` teaches "beautiful"; the class commands teach "Read", "Write", "Listen".
- Guidebooks in Luganda about English: adjectives before the noun and unchanged, is/are, old/young/new; "my" never changes, this/these, plural trousers; present simple for routines and he/she -s; "It is raining"; plurals with -s and sheep; there is/are; "I am a farmer" with a/an and -er jobs; one command for everyone, capital letters for languages; does/goes, from…to, by taxi.
