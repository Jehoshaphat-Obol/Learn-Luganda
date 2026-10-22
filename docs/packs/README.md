# Language packs

Every word Learn Luganda shows comes from JSON packs. A new language means
new pack files, not code changes:

- **UI packs** hold the interface: menus, buttons, lesson prompts, rewards,
  settings, the landing page. One file per language the app can be used in.
- **Course packs** hold a course: what the learner already reads (the
  _base_ or "from" language) paired with what they learn (the _target_ or
  "to" language). English → Luganda is `en-lg`.

Packs are read-only at runtime (they are deep-frozen when loaded). The
learner's progress is stored separately, by id, so a pack can be improved
without losing anyone's progress (see [Versions and migrations](#versions-and-migrations)).

```
src/packs/
  languages.json            every language the app can name, greet in and lay out
  regions.json              country and time zone → likely languages (the picker's guess)
  ui/
    en.json                 English interface (complete; the fallback for every other pack)
    sw.json                 another interface language (may be partial)
  courses/
    en-lg/
      course.json           the course: languages, settings, cast, sections, landing copy
      units/
        u1.json             one self-contained unit: words, sentences, lessons,
        u2.json             guidebook and stories
docs/packs/
  schema/                   JSON Schemas for every file above
  example/                  a tiny UI pack and course pack that pass validation
  prompts/                  prompt templates for drafting packs with an AI
```

Run `npm run validate` after any change. It checks every pack against its
schema and the content rules below, and also checks the example in
`docs/packs/example`. To check another folder laid out like `src/packs`:

```sh
node scripts/validate-content.js --root path/to/packs
node scripts/validate-packs.js --root path/to/packs
```

## Adding a language to the registry

Add the language to `src/packs/languages.json` first, with its BCP 47
`code`, English `name`, `nativeName`, a short `greeting` (shown in the
get-started picker) and text direction `dir` (`ltr` or `rtl`). If people in
some countries are likely to speak or want to learn it, list it in
`regions.json` under those countries (most likely first).

A language in the registry is only offered once a UI pack or a course pack
uses it.

## UI packs

`src/packs/ui/<code>.json`:

```json
{
  "$schema": "../../../docs/packs/schema/ui-pack.schema.json",
  "meta": { "code": "sw", "status": "draft", "notes": "Who drafted it and what still needs review." },
  "strings": {
    "nav": { "learn": "Jifunze" },
    "stats": { "streak": { "one": "Siku {count} mfululizo", "other": "Siku {count} mfululizo" } }
  }
}
```

- **Keys** are the ones in `en.json`; nothing else is allowed. Leave a key
  out and English is used for it, so a pack can start small. The validator
  lists how many strings fall back.
- **Placeholders** such as `{count}`, `{language}` or `{name}` must be the
  same set as in English. They are filled in by the app; never translate
  the word inside the braces.
- **Plurals.** Where English has `{ "one": …, "other": … }`, give the forms
  your language uses: any of `zero`, `one`, `two`, `few`, `many`, `other`
  (`other` is required). The app picks one with `Intl.PluralRules`.
- **Formatting.** Strings may use `**bold**`, `_italic_` and
  `[a link](#/settings)`; links may only point inside the app (`#/…`), to
  `https://` or `mailto:`. Never write HTML: it is shown as text.
- **Lists.** A few groups are free lists that the app picks from at random:
  `lesson.praise` and the reminder messages (`reminders.review`,
  `reminders.learned`, `reminders.fresh`). Use your own keys and as many
  entries as suit the language. They are listed in `LIST_GROUPS` in
  `src/i18n/validate.js`.
- **Target-language words stay out.** The UI pack is shared by every course
  taught in that language, so it never contains words of a language being
  learned. Where the interface drops in a word of the target language (a
  "thank you" after a checkpoint, a cheer after a right answer), the
  course pack supplies it through `{thanks}`, `{congrats}` and similar
  placeholders.
- **Status.** Keep `"status": "draft"` until a fluent speaker has reviewed
  every string, then set `"reviewed"`.

The app finds new UI packs by itself: a file in `src/packs/ui/` is a
language the interface can switch to, and it is chosen automatically when
the browser prefers it.

## Course packs

A course lives in `src/packs/courses/<from>-<to>/`. The folder name, the
`id` and `from`/`to` must agree, and both codes must be in the registry.

### course.json

| Field | What it is |
| --- | --- |
| `formatVersion` | The file format. `1` today. |
| `version` | The content version. Raise it when ids are renamed or removed, and add a migration. |
| `from`, `to` | Base and target language codes. |
| `status`, `notes` | `draft` or `reviewed`, and who reviewed what. |
| `title`, `description` | Shown in the picker and on the About page, in the base language. |
| `cheers` | Short praise in the target language, mixed into "Nice!" after a right answer. |
| `phrases` | `congrats` ("Wayita bulungi") and `thanks` ("Weebale nnyo!") in the target language, used in celebrations. |
| `landing` | The landing page and onboarding copy for this course: greeting, ticker words, why learn it, a playable sample question, the start word, the farewell line. In the base language, with target-language words as the learner will see them. |
| `settings` | How the course teaches (see below). |
| `cast` | The characters who speak in lessons and stories, each with a `name`, `role`, `look` (a character drawing) and `voice`. |
| `sections` | Groups of units in order, each with a `title`, `level` and `description`. |
| `migrations` | Steps that keep progress when ids change (see below). |

### Units

Each `units/<unitId>.json` holds everything for one unit, so a unit can be
written, reviewed and replaced on its own:

- `words`: `{ id, target, base, altBase?, altTarget?, notes?, audio? }`.
- `sentences`: the same shape. `altBase`/`altTarget` list other accepted
  answers.
- `skills` → `lessons`: each lesson introduces `newWords` (ids from this
  unit, each taught exactly once) and practises `sentences`. A lesson can
  add `dialogues` (a cast member speaks; the learner picks a reply) and its
  own `settings`.
- `guidebook`: `intro`, key `phrases`, grammar `tips` (a skill can point at
  one with `tip`) and `culture` notes. `**word**` in guidebook text marks a
  target-language word.
- `stories`: short scripts of `line` steps (who says what, with a
  translation and optional `gloss`) and `question` steps. Each story
  unlocks after a lesson (`unlockAfter`) and needs at least one question.

Ids are lowercase letters, digits and dashes, and never reused for
something else. Learners' progress is saved by id.

### Settings: make each course its own

Courses should not feel like one template with the words swapped. Every
value in `src/content/settings.js` can be changed for the whole course
(`course.json` → `settings`), for one unit (`settings` in the unit file) or
for one lesson. Objects merge key by key; lists and plain values replace.

- `lesson.steps`: the recipe, in order. Drop `listen` for a language
  without good voices, lead with `dialogues` for a conversation-first
  course, add more `fill` for a language with rich word endings.
- `lesson.maxExercises`, `introCards`, `hearts`, and per-step counts and
  `directions` (`toTarget`, `toBase`).
- `practice`, `checkpoint`, `sectionTest`: sizes, pass marks, hearts.
- `answers`: `equivalents` for letters learners type another way
  (`{ "ŋ": "ng" }`), `ignoreDiacritics` for tone marks, `lettersPerTypo`.
- `stories.translations`: `tap` or `always`.
- `speech`: `fallbacks` (device voices that may stand in, closest first,
  such as `["sw"]` for Luganda) and the narrator's `voice`.

### Pronunciation

Speaker buttons play a recording when a word or sentence has `audio` (a
path under `public/`, such as `audio/en-lg/weebale.mp3`). Otherwise the
device's own speech voice reads it, if it has one for the target language
or for a `speech.fallbacks` language, in the speaker's `voice` (pitch,
rate, `hints` for choosing among voices). With neither, no button is shown.
Recordings must be free to use: record them yourself or use openly
licensed ones, and credit them in `public/audio/CREDITS.md`.

### Headings in other interface languages

A course is written in the language it's taught in, but a learner can read
the app in any interface language. Optional files in
`courses/<id>/labels/<ui>.json` translate the path's headings for learners
who read the app in `<ui>`: section titles, levels and descriptions, unit
titles and descriptions, and skill titles, keyed by id
([schema](schema/course-labels.schema.json)). Anything left out keeps the
course's own text, and `npm run validate` says how many headings fall back.
Lessons, guidebooks and stories stay in the course's language.

```json
{
  "sections": { "s1": { "title": "Misingi", "level": "Wanaoanza", "description": "…" } },
  "units": { "u1": { "title": "Salamu", "description": "…" } },
  "skills": { "u1s1": "Salamu za kwanza" }
}
```

The same files put the course's landing page in `<ui>`: `description`
(About page), `cast` (each character's role) and `landing`, which holds the
base-language parts of the course's `landing` block (the why section and its
cards, the ticker's meanings in `words`, the sample question's prompt and
explanation, captions, farewell, audience and first lessons). Target-language
words stay as the course writes them. A test (`tests/landing-i18n.test.js`)
fails when any of this is missing or the landing page still shows the
course's own copy in another interface language, so a new UI pack or course
needs these filled in for every pairing.

```json
{
  "description": "…",
  "cast": { "nakato": "Kiongozi wako, mwanafunzi wa chuo kikuu Kampala" },
  "landing": {
    "word": "okuyiga — kujifunza",
    "words": ["Habari yako?", "Nzuri", "…"],
    "why": { "title": "Lugha ya **mitaa ya Kampala.**", "text": "…", "cards": [{ "title": "…", "text": "…" }] },
    "sample": { "prompt": "Lipi maana yake “asante”?", "explain": "_Weebale_ maana yake asante." },
    "start": { "caption": "tandika — anza" },
    "farewell": "Weebale nnyo — asante sana.",
    "audience": "…",
    "first": "…"
  }
}
```

When you add units or skills to a course, add their headings to its labels
files too.

### Versions and migrations

Learners' progress is stored by id: words they know, lessons they finished,
their mistakes. When a new version of a pack renames, merges, splits or
removes ids, raise `version` and add a step:

```json
"version": 2,
"migrations": [
  {
    "version": 2,
    "note": "Split the greetings skill; one word was a duplicate.",
    "rename": { "words": { "gyebale-ko": "gyebaleko" }, "lessons": { "u1s1l3": ["u1s1l3", "u1s1l4"] } },
    "remove": { "words": ["old-word"] }
  }
]
```

When a learner opens the new pack, every step above their saved version is
applied. Several old ids renamed to one new id merge their progress; one id
renamed to a list splits it. Ids the pack no longer has are archived, not
deleted, and come back if a later version restores them. The validator
checks that steps are in order, within the pack's version, and that renames
point at ids the pack has.

Adding new words, lessons or units needs no migration.

## Adding a course

1. Add both languages to `languages.json` if they are missing.
2. Copy `docs/packs/example/courses/en-sw/` to
   `src/packs/courses/<from>-<to>/` and change the ids, languages and
   content.
3. Write units one at a time. The [prompt templates](prompts/) help draft
   them with an AI.
4. Run `npm run validate` until it passes, then `npm test`.
5. Keep `status: "draft"` and a note in `notes` until a fluent speaker has
   reviewed it.

The app finds new course packs by itself. Each pack is a separate download,
so learners only fetch the course they take.

## Drafting with an AI

The [prompts](prompts/) folder has templates for:

- [a UI pack](prompts/ui-pack.md), translated from `en.json`;
- [a course outline](prompts/course-outline.md): `course.json` with sections,
  cast, settings and landing copy;
- [one unit](prompts/course-unit.md), written to that outline.

The rules every draft follows:

- Keep every id, key and `{placeholder}` exactly as given.
- Mark everything `"status": "draft"` and say in `notes` that it was drafted
  by an AI. Never mark a draft as reviewed.
- When unsure of a word, a spelling or a tone, say so in `notes` instead of
  guessing; leave a word out rather than invent one.
- Write for the learner's culture as well as their language: names, places,
  food and situations that belong to where the language is spoken.
- A native speaker reviews every draft before it is marked `reviewed`.
