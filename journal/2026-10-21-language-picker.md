# 2026-10-21: Get-started language picker and progress per course

Issue: #83 (epic #80) · Branch: `feat/83-language-picker`

## Context

The owner wants the app to work out where a learner is and which language
they likely know. It should then ask playfully, in the app's voice, whether
that language is the one they speak or the one they came to learn, and
branch to pick the other side. Each from→to course needs its own progress.

## Done

- `src/packs/regions.json` maps time zones to countries, and countries to
  the languages commonly used there, most common first. It has a schema,
  and validation checks that every code is in the registry. There is no
  location permission and no server: the time zone is only a hint, and the
  learner always confirms.
- `src/i18n/catalog.js` builds course pairs from the course ids and knows
  which languages can be learned and which can be taught from.
  `suggestLanguage()` tries the region's languages first, then
  `navigator.languages`, and skips languages with no course.
- Onboarding now starts with a languages step. It shows "hello" in every
  registry language with the guess popped out, then the crane's guess:
  - "Teach me X" asks which language to learn it from.
  - "I speak X" asks what to learn. When nothing is taught from X yet, it
    offers every course with a friendly "on its way".
  - "Something else" opens the full "I speak / I want to learn" picker.
  When only one course fits, it is picked straight away.
- `src/state/courses.js`: lessons, words, mistakes and jumps belong to a
  course. Switching parks the active course's slices under `courses[id]`
  and brings the other course's back. XP, streak, gems, hearts and
  achievements stay with the learner. A saved course that is no longer
  shipped is parked too.
- Settings → Languages lets the learner choose the app language (automatic
  or a UI pack) and the course.
- New strings live in the UI pack, under `picker.*` and
  `settings.languages.*`.
- Tests cover the catalogue, the guess, the flow and course switching. New
  e2e tests cover Kampala, Dubai, "something else" and Settings.

## Decisions

- Today only English→Luganda ships, so in the UAE the guess skips Arabic
  and lands on English. Once an Arabic pack lands, the same screen asks
  the "speak it or learn it?" question about Arabic with no code change.
- The interface language follows the chosen course's base language when a
  UI pack exists for it. It stays "automatic" when that base language
  matches the browser's.

## Next

- #100: versioned progress, so pack updates keep learners' progress.
