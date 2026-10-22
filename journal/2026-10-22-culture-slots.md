# Culture slots: each language's own cast and places

Issue #187 (phase 2 of the shared catalog, #184).

## Context

Folding en-sw into the curriculum brought Amani, Baraka, Mombasa and
Arusha into every course, so Luganda learners met Swahili names and
Swahili learners met Nakato in Kampala. Each language should still feel
local while sharing one structure.

## Done

- Lang text writes names and everyday places as slots: `{@nakato}`,
  `{@jjajja}`/`{@jjajja.name}`, `{@city}`, `{@hometown}`, `{@town}`,
  `{@getaway}`, `{@island}`, `{@nearby}`. 424 items across en, lg and sw
  were converted by matching each item's English text, so Luganda's noun
  *jjajja* (grandparent) stays a noun where the English says "Grandma".
- `cultureOf()` and `fillCulture()` in src/content/compose.js. The
  curriculum's `cast` (plus `short`) and new `places` are the defaults
  (Luganda's); lang/sw has `culture` (Amani, Baraka, Bibi Mwanaisha, Juma,
  Neema; Dar es Salaam, Tanga, Arusha, Mombasa, Zanzibar, Bagamoyo).
  lang/lg has an empty `culture` so Luganda courses keep the defaults.
- Cast roles in lang packs use the slots too, and composed labels fill them.
- validate-packs fails on a slot with no default; tests cover the rule and
  the real courses (lg-sw speaks of Amani in Dar es Salaam, en-lg has no
  Swahili names).
- fold-course.js matches with the pair's culture, still 664/664 words and
  533/533 sentences.

## Decisions

- A course takes its **target** language's culture, else its base
  language's. English declares none, so sw-en keeps the Swahili cast like
  the hand-built pack did, and lg-en keeps the Ugandan one.
- Facts stay literal: "The Nile starts at Jinja", "Kampala has seven hills",
  "Zanzibar is an island", Nairobi in "Juma works in Nairobi".

## Next

Retire the hand-built en-sw and sw-en packs with progress migrations. They
have 45 stories, the curriculum 21, so their stories need folding first or
learners lose them.
