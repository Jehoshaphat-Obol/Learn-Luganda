# Prompt templates

Templates for drafting packs with an AI model. Fill in the `{{…}}` parts,
paste the template with the files it asks for, and save what comes back
where the template says. Then run `npm run validate` and fix what it
reports (you can paste the errors back to the model).

Work in this order for a new language (see
[Adding a language](../README.md#adding-a-language)):

1. [lang-course.md](lang-course.md): `lang/<code>/course.json` (headings,
   cast, culture, cheers, settings).
2. [lang-unit.md](lang-unit.md): one unit at a time, translated line by line
   with `scripts/lang-flat.js`. Validate after each section.
3. [about-notes.md](about-notes.md): notes about the language, in English
   first, for the courses that teach it.
4. [ui-pack.md](ui-pack.md): optional, an interface in the language.

Every draft stays `"status": "draft"` until a fluent speaker has reviewed
it. A model can sound sure of words it has made up; the review is what
makes a pack trustworthy.
