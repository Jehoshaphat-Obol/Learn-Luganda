# 2026-10-21: Course content model and Units 1 to 2

Issue: #11 · Branch: `feat/11-content`

## Context

The lesson engine (#13) needs real Luganda to teach and a content format
that scales to eight units without hand-writing every exercise.

## Done

- Content format (`src/content/units/*.js`, plain data):
  - **Words** `[id, luganda, english, { altLg, altEn, notes, audio }]`.
  - **Sentences** in the same shape, with accepted alternative answers.
  - **Units → skills → lessons.** A lesson lists the `newWords` it
    introduces, the `sentences` it practises and optional authored
    `dialogues` (a cast member says a line; pick the right reply).
  - Exercises are *generated* from this by the engine (intro cards, multiple
    choice, word bank, match pairs, typing), so new content needs no
    exercise markup.
- `src/content/course.js`: builds indexes (words, sentences, skills,
  lessons, course order) and `wordsUpTo(lessonId)` for distractors.
- `src/content/validate.js` + `npm run validate` (now in CI): unique ids,
  every referenced word and sentence exists, no word introduced twice,
  every word is taught somewhere, dialogue answers are among the options.
- **Unit 1, Greetings:** Hello (4 lessons: Oli otya?, Gyendi, Weebale,
  ssebo/nnyabo, Yee/Nedda, Wasuze otya?, Osiibye otya?, Gyebale ko, Weraba,
  Tunaalabagana), Introductions (3 lessons: Nze, Ggwe, Erinnya lyo ani?,
  Mbeera, Ova wa?, Nva, Ndi muyizi, Nsanyuse okukulaba), Numbers 1–10
  (2 lessons).
- **Unit 2, People and things:** Family (maama, taata, jjajja, wange,
  omwana, omusajja, omukazi…), People and things (mu-/ba- and ki-/bi-
  noun classes), First verbs (Njagala, Ndya, Nnywa, Nsoma, Njiga).
- Totals: 2 units, 6 skills, 17 lessons, 72 words, 37 sentences.

## Decisions

- **JS modules, not JSON**, so files can carry comments for reviewers and
  are bundled without a fetch.
- **Audio:** browsers have no Luganda text-to-speech. Every item has an
  `audio` slot (null for now); listening exercises only appear for items
  with a recording. Recording sessions are a follow-up for a native speaker.
- Words are defined in the unit that first teaches them.

## Native-speaker review checklist

Written from standard learner references, not yet checked by a native
speaker. Please confirm before launch:

- [ ] Greetings and replies: *Oli otya? / Gyendi*, *Wasuze otya? / Nsuze
      bulungi*, *Osiibye otya?*, *Gyebale ko*, *Weraba*, *Tunaalabagana*.
- [ ] Introductions: *Erinnya lyo ani?*, *Erinnya lyange Mukasa*,
      *Nze Nakato*, *Ova wa? / Nva Masaka*, *Mbeera Kampala*,
      *Nsanyuse okukulaba*, *Ndi muyizi*.
- [ ] Counting forms 1–10 (*emu … kkumi*).
- [ ] Possessive concords: *maama wange*, *ekitabo kyange*,
      *ebitabo byange*; *Abaana bayizi*; *Omusajja n’omukazi*.
- [ ] Verb forms: *Njagala*, *Ndya*, *Nnywa*, *Nsoma*, *Njiga*,
      *Oyagala ki?*
- [ ] Dialogue lines: *Wasuze otya, mwana wange?*, *Ono ani?*
- [ ] Spelling of double consonants and long vowels throughout.

## Next

- #12 Learning path home screen built from `course.units`.
