# Prompt: write one unit

Attach `docs/packs/README.md`, `docs/packs/schema/course-unit.schema.json`,
the course's `course.json`, the unit plan from the outline, the previous
unit file (for words already taught), and, as an example of depth,
`src/packs/courses/en-sw/units/u1.json`. Save the result as
`src/packs/courses/{{from}}-{{to}}/units/{{unit id}}.json`.

---

You are writing unit **{{unit id}}, "{{unit title}}"** of a course teaching
**{{target language}}** to **{{base language}}** speakers. Its plan:
{{one-line plan from the outline}}.

Write the unit file following the schema and the example:

- **words**: 25–40 new words for this unit's topic. `target` is
  {{target language}} as learners should type it, `base` the
  {{base language}} meaning, `altBase`/`altTarget` other accepted answers,
  and `notes` for anything surprising (a literal meaning, a noun class, a
  tone). Ids are lowercase with dashes (`thank-you`), unique in the course,
  and never reuse an id from an earlier unit.
- **sentences**: 15–25 short, natural sentences using this unit's words and
  earlier ones, with ids starting `s-`.
- **skills**: two to four skills, each with an `icon` (from
  `src/ui/icons.js`) and two to four lessons. Each lesson introduces three
  to six `newWords` (every word in exactly one lesson) and practises two to
  four `sentences`. Add `dialogues` where a reply makes sense: a cast
  member's line, its translation, three `options` and the `answer`. Use
  only speakers from the course's `cast`.
- **guidebook**: an `intro`, key `phrases`, one or two grammar `tips` (give
  each an `id`, and point a skill at it with `tip`) and a `culture` note
  about where the language is spoken. Mark target-language words in tips
  with `**bold**`.
- **stories**: one or two short scenes (8–14 steps) with the cast, using
  this unit's words, with at least two `question` steps. Set `unlockAfter`
  to a lesson of this unit.
- `title`, `description`, a `color` and a `character` from the cast.

Rules:

1. Only {{target language}} you are confident of: correct spelling,
   natural word order, real usage. If unsure, simplify or leave it out, and
   list the doubts after the JSON.
2. Every word in a sentence should be taught by this unit or an earlier
   one, apart from names.
3. Situations, names, food and places from where {{target language}} is
   spoken, not translated stock phrases.
4. Keep the JSON valid: no comments, no trailing commas.

Reply with the JSON file, then a list of anything a native speaker should
check first.
