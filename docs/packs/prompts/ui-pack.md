# Prompt: translate the interface

Attach `src/packs/ui/en.json`. Save the result as
`src/packs/ui/{{code}}.json`.

---

You are translating the interface of Learn Luganda, a free, friendly
language-learning web app with a crane mascot, into **{{language name}}**
(code `{{code}}`). The attached `en.json` is the English interface pack.

Write `{{code}}.json` in the same format:

```json
{
  "$schema": "../../../docs/packs/schema/ui-pack.schema.json",
  "meta": { "code": "{{code}}", "status": "draft", "notes": "…" },
  "strings": { … }
}
```

Rules:

1. **Same keys, nothing new.** Use exactly the keys of `en.json`. If you are
   not confident about a string, leave its key out: the app shows English
   for missing keys, which is better than a wrong translation. The
   exception is the free lists `lesson.praise`, `reminders.review`,
   `reminders.learned` and `reminders.fresh`: write as many entries as feel
   natural, with your own short keys.
2. **Placeholders stay.** Every `{name}` in braces must appear in your
   string, spelled exactly the same, and you may not add new ones. Move them
   to wherever your grammar needs them.
3. **Plurals.** Where English gives `{ "one": …, "other": … }`, give the
   plural forms {{language name}} uses (from `zero`, `one`, `two`, `few`,
   `many`, `other`; `other` is required). Keep plural objects for those keys
   even if your language doesn't inflect.
4. **Formatting marks stay.** Keep `**bold**`, `_italic_` and
   `[link text](#/path)`, translating only the text. Never add HTML.
5. **Tone.** Warm, short and encouraging, never guilt-tripping. Use the
   informal "you" if the language has one and it suits a friendly app.
   Buttons are short verbs.
6. **No words of other languages** except names (Learn Luganda, Google,
   Meta) and what is already inside placeholders.
7. **Honesty.** Set `"status": "draft"`. In `meta.notes`, say the pack was
   drafted by an AI, and list any strings you were unsure of by key.

Reply with the JSON file only.
