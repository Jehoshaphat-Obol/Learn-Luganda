# Language packs

Every word Learn Luganda shows comes from JSON packs. A new language means
new pack files, not code changes:

- **UI packs** hold the interface: menus, buttons, lesson prompts, rewards,
  settings, the landing page. One file per language the app can be used in.
- **The shared catalog** holds courses as one structure every language
  fills: a curriculum (units, lessons, word and sentence ids) plus one
  **lang pack** per language with that language's text. Any two languages
  with lang packs make a course, `<from>-<to>`, composed when it loads, so
  50 languages need 50 lang packs, not 50 × 49 courses. Every course in
  the app is composed this way.
- **Course packs** (`courses/<from>-<to>/`) hold a hand-built course. The
  loader still reads them, but none are left: never write a new one, write
  a lang pack instead ([Adding a language](#adding-a-language)).

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
  curriculum/
    course.json             sections, cast, version and migrations shared by every language
    units/u1.json           a unit's skeleton: word and sentence ids, skills, lessons,
                            dialogue and story steps (no text)
  lang/
    coverage.json           how much each lang pack fills (`npm run coverage`)
    en/
      course.json           English as a course's language: title, headings, cast roles;
                            as the language learned: cheers, phrases, settings
      units/u1.json         the unit's text in English, by the curriculum's ids
      about/lg/             optional notes about Luganda written in English:
        course.json         description, landing copy
        units/u1.json       word notes, guidebook, story glosses
  courses/                  legacy hand-built courses (none left; see docs/packs/example)
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

## The shared catalog

Every language fills the same curriculum. A course `<from>-<to>` takes
its target text (what the learner learns) from `lang/<to>/` and its base
text (meanings, headings, story titles, questions) from `lang/<from>/`.
`src/content/compose.js` turns them into the same shape as a hand-built
course pack, so everything after it works the same way.

- **`curriculum/`** has no text. Unit files list word and sentence ids in
  teaching order, skills and lessons, dialogues (speaker, and the index of
  the right reply) and story steps (speaker for a line; answer index and
  `optionsLang` for a question).
- **`lang/<code>/course.json`** frames a course in `<code>`: `courseTitle`
  (`"{to} for English speakers"`), `sections`, `units`, `skills` and `cast`
  headings (the same shape as [course labels](#headings-in-other-interface-languages)),
  and, for courses that teach `<code>`, `cheers`, `phrases` and `settings`.
  `languageNames` says how `<code>` names languages.
- **`lang/<code>/units/uN.json`** has the lesson text in `<code>` by id:
  `words` and `sentences` (`text`, `alts`), `phrases` (guidebook phrases in
  order), `dialogues` (each line, and the replies to choose from when the
  dialogue teaches `<code>`), and `stories` (title, summary, lines,
  questions).
- **`lang/<from>/about/<to>/`** is the only text written for a pair, and
  it's optional: the description and landing copy, word notes, the
  guidebook's intro, tips and culture notes, and story glosses, all about
  `<to>` written in `<from>`. Without them a course uses the notes in the
  base language's `pivot` (from `languages.json`), then English.

One text per language has to work on both sides of a course, so:

- A trailing hint in a word, like **Read (all of you)**, shows when the
  word is the meaning and is left out when it's the answer.
- `{to}` and `{from}` stand for the course's languages, named the text's
  own way: `"Do you speak {to}?"` in English, `"Oyogera {to}?"` in Luganda.
  `{to.mu}` picks another form of a name (`"mu {to.mu}"` → "mu Luganda").
- Culture slots: write the cast's names and everyday places as `{@nakato}`,
  `{@jjajja}` (`{@jjajja.name}` for the full name), `{@city}`,
  `{@hometown}`, `{@town}`, `{@getaway}`, `{@island}` and `{@nearby}`. A
  course fills them from its target language's `culture` in
  lang/<code>/course.json (else its base language's, else the curriculum's
  `cast` and `places`, which are Luganda's), so Swahili learners meet Amani
  in Dar es Salaam and Luganda learners meet Nakato in Kampala. A language
  only lists the slots it changes. Facts about one real place ("The Nile
  starts at Jinja") keep the name as it is.
- A curriculum story tagged `culture` (a language code) is told only in
  courses of that culture, and only where both languages have its text;
  one tagged `teaches` only in courses teaching that language. That's how
  the Swahili stories from the retired en-sw/sw-en packs live on.
- A curriculum migration step with `courses: ["en-sw"]` applies only to
  those courses. `node scripts/retire-course.js --course <from>-<to>` writes
  such steps (and folds the pair's stories) when a hand-built pair is
  replaced by its composed course, after `scripts/fold-course.js`.
- Words whose answer repeats an earlier word's are left out of a course,
  since they'd be two questions with one answer. Words from older skills
  win: a skill added later carries `since` (the curriculum version that
  added it), so a new concept never pushes out one learners already have.
- Accepted answers (`alts`) serve both directions.

A pair is offered when its target language covers at least 95% of the text a
course needs to teach it, its base language 95% of what a course needs to be
taught in it, and there are notes about the target (its own, the pivot's or
English). `npm run coverage` writes `lang/coverage.json`, and
`npm run validate` fails when it's out of date. Headings in other interface
languages come from that language's `lang/<ui>/course.json` and its notes,
so a language with only headings (like `lang/fr`) still labels every course.

`scripts/split-course.js` built the catalog from the hand-built en-lg, sw-lg
and lg-en packs (#185), and `tests/compose.test.js` checks the composed
courses against them: anything learners already had must stay as it was.

`scripts/fold-course.js` folds another hand-built pair into the catalog
(#187), one section at a time:

```
node scripts/fold-course.js --course en-sw --units u9-u16 --drafts scripts/fold/en-sw.tsv
```

Each word and sentence either matches a concept the curriculum has (the
two languages agree, one of them on the main text), which gains the pair's
accepted answers and notes, or becomes a new concept. New concepts go to
the unit where most of their source lesson's words already are, as an extra
skill (`uNs4`). The pair's languages bring their own text; every other
language that writes lesson text needs a line in the drafts file
(`lang  kind  id  text`, kind `word`, `sentence`, `skill` or `dialogue`).
The script appends the lines it still needs; fill them in and run it again
with `--write`, then `npm run coverage`.

## Course packs

The composed courses have this shape too, and the settings, pronunciation
and migration rules below apply to them. A hand-built course lives in `src/packs/courses/<from>-<to>/`. The folder name, the
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

## Adding a language

Adding a language means writing `lang/<code>/`; every course to and from
the languages already there follows. Never build a pair course by hand.

1. Add the language to `languages.json` (and `regions.json`) if it's
   missing.
2. Write `lang/<code>/course.json`: the course title, `languageNames`, the
   section, unit, skill and cast headings, `culture` (the cast's local
   names and places), `cheers`, `phrases` and `settings`. Copy the shape of
   `lang/fr/course.json` ([prompt](prompts/lang-course.md)).
3. Translate the units one section at a time (u1–u8, u9–u16, …). Dump a
   unit from a language you read, translate each line, build it back:

   ```sh
   node scripts/lang-flat.js dump en u4 > drafts/u4.txt   # translate the text after each tab
   node scripts/lang-flat.js build <code> drafts/u4.txt   # → src/packs/lang/<code>/units/u4.json
   ```

   Each line is `KEY<TAB>text[<TAB>alt | alt]`; keep the keys, the
   `{placeholders}` and the `{@culture}` slots, and give as many accepted
   answers as are natural. `build` refuses a draft with a missing or
   unknown line, so nothing is dropped by accident
   ([prompt](prompts/lang-unit.md)).
4. Write notes about the language for the courses that teach it:
   `lang/en/about/<code>/` (description, landing copy, word notes,
   guidebook tips and culture, story glosses, in English). Other base
   languages fall back to them through their `pivot` until they have their
   own ([prompt](prompts/about-notes.md)).
5. `npm run coverage`, `npm run validate`, `npm test`. A pair shows up in
   the picker once both sides pass 95%.
6. Keep `status: "draft"` and say who drafted it in `notes` until a fluent
   speaker has reviewed it. An interface in the language (`ui/<code>.json`)
   is a separate, optional step.

The app finds new lang packs by itself, and each composed course is a
separate download.

## Drafting with an AI

The [prompts](prompts/) folder has templates for:

- [a lang pack's course.json](prompts/lang-course.md): headings, cast and culture;
- [one unit](prompts/lang-unit.md), translated line by line with `scripts/lang-flat.js`;
- [notes about a language](prompts/about-notes.md) for the courses that teach it;
- [a UI pack](prompts/ui-pack.md), translated from `en.json`.

The rules every draft follows:

- Keep every id, key and `{placeholder}` exactly as given.
- Mark everything `"status": "draft"` and say in `notes` that it was drafted
  by an AI. Never mark a draft as reviewed.
- When unsure of a word, a spelling or a tone, say so in `notes` instead of
  guessing; leave a word out rather than invent one.
- Write for the learner's culture as well as their language: names, places,
  food and situations that belong to where the language is spoken.
- A native speaker reviews every draft before it is marked `reviewed`.
