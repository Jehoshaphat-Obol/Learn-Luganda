# 2026-10-21: Pack authoring guide, AI prompts and an example pack

Issue: #86 (epic #80) · Branch: `feat/86-pack-guide`

## Context

With the interface and the Luganda course in packs (#81–#85, #88, #89,
#100), the last step of the epic is making new packs easy to write, by a
person or with an AI, without lowering the bar for accuracy.

## Done

- `docs/packs/README.md`: how packs are laid out, every file format, how to
  add a language, a UI pack and a course, settings for making each course
  its own, pronunciation, versions and migrations, and how to validate.
- `docs/packs/prompts/`: templates for a UI pack, a course outline
  (`course.json`) and one unit at a time, with the rules: keep ids, keys
  and placeholders; stay `draft`; leave out what you're unsure of rather
  than guess; write for the culture, not just the words.
- `docs/packs/example/`: a partial Swahili UI pack and a one-unit
  English → Swahili course that use every part of the format (cast with
  voices, settings, cheers, phrases, landing copy, a dialogue, a guidebook
  tip, a story). Not shipped in the app.
- Validators take `--root <dir>`; `npm run validate` now also checks the
  example, so the docs can't drift from the format.
- List groups (`lesson.praise`, reminder messages) may have any number of
  entries under a pack's own keys; the validator knows them
  (`LIST_GROUPS`) and still checks placeholders.

## Decisions

- The example lives under `docs/` so the app doesn't offer a one-unit
  course; the validator reads it with the same rules as real packs.
- The example's Swahili is marked draft, like every AI-written pack.

## Next

- Epic #80 is complete once this merges. Later: precache only the active
  course in the service worker; real UI packs and courses, each reviewed
  by a native speaker.
