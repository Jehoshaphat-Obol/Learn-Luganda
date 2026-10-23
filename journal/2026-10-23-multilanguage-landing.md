# 2026-10-23: Landing page for a multi-language app (#213)

The owner said the landing page read as a Luganda-only product, although the
app now teaches seven languages from the shared catalog. Landing page only.

## Done

- Hero: "The playful way to learn African languages", a one-line lead with
  the number of languages, and a row of chips (small flag + name) for every
  language there is a course for. African languages come first (a language
  counts as African when its flag country has an `Africa/` time zone in
  `regions.json`), then by name in the interface language. Order of the
  actions is unchanged: Get started, Install app, "I already have progress".
- The course-specific sections (ticker, why, sample question) stay, but the
  "why" eyebrow now reads as a spotlight on the current course.
- "Practise where Luganda lives" became "Practise in real places", and the
  footer thanks learners of African languages, not one language.
- FAQ: the long course-specific "Who is it for?" and "What will I learn
  first?" answers are gone; a new "Which languages can I learn?" lists the
  languages with `Intl.ListFormat`. Course length and install answers are
  shorter.
- Same changes in en, lg, sw and fr UI packs. Page meta description names
  more than one language.

## Notes

- Course packs still carry `landing.audience` and `landing.first` (and their
  labels); the landing page no longer shows them. They can be dropped from
  the schema later.
- The brand name ("Learn Luganda" / "luganda" in the header) is unchanged on
  purpose: the owner is choosing a new brand and domain.
