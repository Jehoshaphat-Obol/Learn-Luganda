# 2026-10-22: French guidebook notes

Issue: #145 (epic #80, follows #144) · PRs: #200 (S1), #201 (S2), #202 (S3), #203 (S4), #204 (S5)

## Context

With the French lang pack complete (#144), the shared catalog could
compose every French pairing, but `composedIds` only lists a course when
the learner's about-chain has guidebook notes for at least 95% of units.
fr-lg and fr-sw already listed (they fall back to the English notes about
Luganda and Swahili). en-fr, lg-fr, sw-fr and fr-en needed notes about
French, and about English in French.

## Done

- `lang/{en,fr,lg,sw}/about/fr/course.json`: description, landing copy
  and Emma's role about French in each interface language, so every
  French course has landing labels in every UI language
  (`tests/landing-i18n.test.js`).
- `lang/en/about/fr/units/u1–u40`: guidebook intro, 2–3 tips, a culture
  note, skill→tip links and word notes about French, in English. Luganda
  and Swahili speakers get these through the English fallback
  (`aboutChain`).
- `lang/fr/about/en/units/u1–u40`: the same about English, in French,
  comparing with French (no tu/vous, `my` never changes, `I am hungry`,
  `I agree` not `I am agree`, present after `when`/`if`…).
- Four new courses list: **en-fr**, **lg-fr**, **sw-fr** (French) and
  **fr-en** (English for French speakers). The catalog now composes 12
  courses.
- e2e: an English speaker now has three languages to learn (Luganda,
  Swahili, French), so `languages.spec.js` expects 3.

## Decisions

- Sources and tooling stay in the project's shared folder at
  `handoff/fr-notes/` (`sN.py` per section, `build.py`, `meta.py`): the
  build turns `'` into `’` and puts a no-break space before `? ! : ; »`.
- Notes teach French as Africans meet it: tu/vous from the first unit,
  septante/nonante alongside soixante-dix, francs CFA, taxis-brousse,
  tontines, griots and Leuk-le-Lièvre in the culture notes.
- The course culture stays the curriculum default (Kampala cast), as for
  every target without its own `culture` block; the notes don't assume a
  French setting.
- Story glosses (`glosses`) are left out for now; they're optional.

## Native-speaker review

Everything is drafted by Claude (AI). Worth a check: the Luganda and
Swahili landing copy in `lg/about/fr` and `sw/about/fr`, and the
regional claims in the culture notes (number words by country, emergency
numbers, school exam names).

## Next

- Optional: `lang/fr/about/lg` and `lang/fr/about/sw` unit notes (about
  Luganda and Swahili in French), so French speakers stop falling back
  to the English notes in fr-lg and fr-sw; and story glosses for French.
- Then #127–#132 (wave 1 languages).
