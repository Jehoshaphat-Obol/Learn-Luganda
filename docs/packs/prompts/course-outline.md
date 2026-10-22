# Prompt: outline a new course

Attach `docs/packs/README.md`, `docs/packs/schema/course.schema.json`,
`docs/packs/schema/settings.schema.json`, `src/content/settings.js` and, as an
example, `src/packs/courses/en-sw/course.json`. Save the result as
`src/packs/courses/{{from}}-{{to}}/course.json`.

---

You are designing a course that teaches **{{target language}}** (code
`{{to}}`) to people who read **{{base language}}** (code `{{from}}`), for
Learn Luganda, a free Duolingo-style web app. Write the course's
`course.json`, following the attached schema and guide.

What to write:

- `formatVersion: 1`, `version: 1`, `id: "{{from}}-{{to}}"`,
  `status: "draft"`, a `title` and a one-sentence `description` in
  {{base language}}.
- `notes`: say the course was drafted by an AI and needs a native-speaker
  review; list anything you were unsure of.
- `sections`: about {{number of sections}} sections, beginner to upper
  intermediate, each with a `title`, `level`, `description` and the ids of
  its units (`u1`, `u2`, … in teaching order). After the JSON, list each
  unit's title and a one-line plan (what it teaches, which grammar point),
  so units can be written one at a time.
- `cast`: four to six characters who belong where {{target language}} is
  spoken: names, ages and roles that feel real there (a market seller, a
  grandmother, a student, a driver…). For `look`, pick from the drawings
  listed in `src/illustrations/characters.js` (`nakato`, `mukasa`,
  `jjajja`, `ssali`, `amara`, `emma`, `kato`, `namuli`, `musoke`, `kizza`,
  `nansubuga`). Give each a `voice` with `pitch` (0.5–2), `rate` (0.5–2)
  and `hints` such as `["female"]`, `["male", "older"]`.
- `settings`: think about what makes this language different and set the
  teaching to match, instead of copying the defaults:
  - `answers.equivalents` for letters learners may type another way, and
    `ignoreDiacritics` if tone marks or accents should be optional when
    typing;
  - `lesson.steps` and counts: more `dialogues` for a conversational
    language, more `fill` for one with rich agreement or word endings,
    `listen` only if devices are likely to have a voice (or a
    `speech.fallbacks` language that sounds close);
  - `stories.translations`: `always` for a script learners can't read yet.
  Explain each choice in a sentence after the JSON.
- `cheers` (two or three short cheers in {{target language}}) and
  `phrases` (`congrats`, `thanks`).
- `landing`: the landing page copy in {{base language}} with
  {{target language}} words: a greeting (`hello`), "thank you" (`thanks`),
  where it is spoken (`place`), a dictionary-style `word`, ten common
  `words` as `[target, base]` pairs, a `why` section with three cards, a
  playable `sample` question whose `answer` is one of its `options`, a
  `start` word, a `farewell`, the `audience` and what comes `first`.

Rules: write only {{target language}} you are confident of. When unsure,
choose a simpler word, or leave it out and say so in `notes`. Never present
a guess as fact.

Reply with the JSON file, then the unit plan, then your notes on settings.
