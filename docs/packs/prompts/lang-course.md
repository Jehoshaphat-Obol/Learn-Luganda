# Prompt: a lang pack's course.json

Attach `docs/packs/README.md`, `docs/packs/schema/lang.schema.json` and, as
examples, `src/packs/lang/en/course.json` and `src/packs/lang/fr/course.json`.
Save the result as `src/packs/lang/{{code}}/course.json`.

---

You are adding **{{language}}** (code `{{code}}`) to Learn Luganda, a free
Duolingo-style web app. Every course is composed from one shared
curriculum: this file holds everything about a course that is written in
{{language}}, whether {{language}} is the language learned or the language
the learner reads. Translate the English example into {{language}},
keeping its shape and every key.

- `formatVersion: 2`, `code: "{{code}}"`, `status: "draft"`, and `notes`
  saying it was drafted by an AI and needs a native-speaker review.
- `courseTitle`: "{to} for {{language}} speakers", written naturally, with
  `{to}` left as it is.
- `languageNames`: how {{language}} names each language in the example
  (and itself). Add `{ "mu": … }` style forms only if the language needs
  another form after a preposition, as Luganda does.
- `sections`, `units`, `skills`, `cast`: every heading translated. Keep
  `{@city}`-style slots and `{to}`/`{from}` as they are.
- `culture`: local names for the cast (`nakato`, `mukasa`, `jjajja` with
  `name` and `short`, `ssali`, `amara`) and places (`city`, `hometown`,
  `town`, `getaway`, `island`, `nearby`) from where {{language}} is spoken.
- `cheers` (three short praises), `phrases.congrats`, `phrases.thanks`.
- `settings`: start from the French example. Set `speech.fallbacks` to
  related languages devices may have voices for, closest first.

When unsure of a word or a spelling, say so in `notes` rather than guess.
Reply with the JSON, then a list of what a native speaker should check first.
