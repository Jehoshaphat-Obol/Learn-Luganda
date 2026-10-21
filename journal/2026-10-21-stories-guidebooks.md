# 2026-10-21: Stories and unit guidebooks

Issue: #21 · Branch: `feat/21-stories`

## Context

Lessons drill words and sentences; stories and guidebooks give them
context. Stories are short conversations with the cast, and guidebooks
explain the grammar and culture behind each unit.

## Done

- **Stories** (`src/content/stories.js`): three stories, each a list of
  lines and comprehension questions.
  - *A new friend* (Unit 1, after Introductions 1): Emma meets Nakato.
  - *Good morning, Jjajja* (Unit 1, after Hello 4): Amara greets her
    grandmother.
  - *Matooke at the market* (Unit 2, after First verbs 1): Emma buys
    matooke and water from Mukasa.
  Lines can carry glosses for words not taught yet (matooke, ssente,
  nkumi, gano, nange).
- **Story player** (`/story/:id`, full screen): lines appear one at a
  time with the speaker's portrait, alternating sides; tap a line for the
  English and glosses. Questions block Continue until answered right;
  wrong picks are marked and count against accuracy. No hearts are used.
  Finishing goes through `finishLesson` as `story-<id>` for 15 XP
  (`XP.story`), 5 on replay, with the normal rewards screens.
- **Stories hub** (`/stories`): cards by unit with cast avatars, status
  (new, read, or what unlocks it). Linked from the Practice hub and the
  Learn sidebar.
- **Guidebooks** (`src/content/guidebooks.js`, `/guidebook/:unit`):
  replaces the placeholder. Key phrases, grammar tips with tables, culture
  notes and the unit's stories.
  - Unit 1: greetings by time of day, singular vs plural greetings,
    long vowels and double consonants; taking time to greet, ssebo and
    nnyabo, gyebale ko.
  - Unit 2: noun classes and agreement (wange/bange, kyange/byange), the
    initial vowel, verb prefixes n- and o-; wide kinship terms (ssenga,
    kojja, jjajja), Oluganda/Muganda/Buganda.
- Skills with a `tip` show a **Tip** pill on the path that opens the
  guidebook scrolled to that tip (`?tip=noun-classes`).
- Content validation now covers stories (unit, unlock lesson, speakers,
  questions) and guidebooks (one per unit, every skill tip exists).
- 3 new tests (89 total).

## Native-speaker review

Add every story line and guidebook example to the review checklist in
`2026-10-21-course-content.md`. Points to double-check: "Ssente nkumi
ttaano" (vs "enkumi ttaano"), "Njagala n'amazzi", "Gano amazzi", plural
greetings (Mwasuze mutya, Mwebale, Mweraba).

## Next

- #22 Sound, animation and accessibility.
