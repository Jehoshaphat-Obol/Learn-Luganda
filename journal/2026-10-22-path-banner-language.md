# 2026-10-22: Slim unit banner on phones, and the interface follows the course

Issue: #148 · Branch: `fix/148-path-banner-language`

## Context

A phone screenshot of the Swahili course showed two problems. The sticky
unit banner, with its two or three line description, took a fifth of the
screen and cut skill titles in half; path nodes also peeked out through the
gap between it and the top bar. And the menus were in Swahili while the
course, which is taught in English, was all English: the learner had
onboarded before the Swahili interface pack (#124), so their interface was
on Automatic and the new pack took over.

## Done

- The unit description moved out of the banner to a short centred line
  just below it. The stuck banner is now eyebrow, title, guidebook and
  meter only, and a little tighter under 480px.
- A second box shadow in the page colour fills the gap above the stuck
  banner, so nothing shows through.
- The Start bubble gets more room above the first node, so it no longer
  overlaps the skill title.
- `autoUiLanguage()` (src/app/languages.js): once a learner has a profile,
  Automatic means the language the course is taught in, when there's a UI
  pack for it; before that, the browser's. Switching course in Settings
  now switches the interface too, unless one was picked by hand.
  Settings shows "Automatic (English)" etc. to match.
- e2e: Swahili browser + en-sw course shows English; Swahili stays one
  tap away; switching to lg-en on Automatic switches to Luganda; the stuck
  banner stays slim on a phone.

## Decisions

- Course titles and descriptions stay in the course's base language. A
  learner who picks Swahili menus by hand for an English-taught course
  still sees English lessons; translating only the labels would leave the
  path half in one language and the lessons in another.

## Next

- sw-en (#126) will give Swahili speakers a course whose labels are Swahili.
