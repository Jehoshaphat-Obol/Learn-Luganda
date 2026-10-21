# Prompt templates

Templates for drafting packs with an AI model. Fill in the `{{…}}` parts,
paste the template with the files it asks for, and save what comes back
where the template says. Then run `npm run validate` and fix what it
reports (you can paste the errors back to the model).

Work in this order for a new course:

1. [course-outline.md](course-outline.md): `course.json` (languages,
   sections and unit titles, cast, settings, landing copy).
2. [course-unit.md](course-unit.md): one unit file at a time, following the
   outline. Validate after each unit.
3. [ui-pack.md](ui-pack.md): if the base language has no UI pack yet.

Every draft stays `"status": "draft"` until a fluent speaker has reviewed
it. A model can sound sure of words it has made up; the review is what
makes a pack trustworthy.
