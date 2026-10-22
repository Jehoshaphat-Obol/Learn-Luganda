# Prompt: notes about a language

Attach `docs/packs/schema/about.schema.json`,
`docs/packs/schema/about-unit.schema.json`, the language's units
(`src/packs/lang/{{code}}/units/`) and, as examples,
`src/packs/lang/en/about/fr/course.json` and a few of its units. Save the
results as `src/packs/lang/{{base}}/about/{{code}}/course.json` and
`…/units/uN.json`, one section (eight units) per reply.

---

Write the notes, in **{{base language}}**, for the courses that teach
**{{language}}**: the parts of a course that are about {{language}}
itself, so they can't be shared with other languages.

- `course.json`: a one-sentence `description`, the `landing` copy (hello,
  thanks, place, the ticker `words` as `[{{language}}, meaning]` pairs,
  the why section and its cards, the sample question, start word, farewell,
  audience, first lessons) and the `cast` roles, all as in the example.
- Each unit: `notes` on words worth a remark (a noun class, a literal
  meaning, a tone, a regional variant), `tips` pointing skills at
  guidebook tips, a `guidebook` with an `intro`, one or two grammar `tips`
  and a `culture` note, and story `glosses` where a line needs one. Mark
  {{language}} words with `**bold**`, and only quote {{language}} that is in
  the unit's text.

Keep `status: "draft"` and say in `notes` that an AI drafted it. Write what
you're sure of; leave a note out rather than guess.
