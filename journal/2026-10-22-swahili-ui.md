# 2026-10-22: Swahili interface pack

Issue: #124 (epic #80, wave 1 of docs/languages/README.md) · Branch: `feat/124-swahili-ui`

## Context

Swahili is Uganda's second official language and East Africa's lingua
franca. With the Luganda interface in (#121), Swahili is the next
interface language in the build plan, and the base for the sw-en course
(#126).

## Done

- `src/packs/ui/sw.json`: every string of `ui/en.json` in standard
  Swahili (Kiswahili sanifu), informal "you", short verb buttons. Nothing
  falls back to English.
- Extra free-list entries in Swahili's own voice: `lesson.praise.hodari`
  ("Wewe ni hodari!"), `lesson.praise.vizuri`, and a reminder built on the
  proverb _Haba na haba hujaza kibaba_ (little by little fills the
  measure).
- e2e: a browser set to `sw-KE` gets the Swahili interface, and English is
  one change away in Settings.

## Decisions

- The app name stays "Learn Luganda" (it is the brand), as do iOS and
  browser menu labels (Share, Add to Home Screen), which most phones in the
  region show in English.
- "Unit" is _kipengele_, "section" _sehemu_, "streak" _mfululizo_, "streak
  freeze" _kigandisho cha mfululizo_, "gems" _vito_, "hearts" _mioyo_.

## Native-speaker review checklist

- [ ] Overall tone: friendly, not too formal, natural in Uganda and Kenya as well as Tanzania
- [ ] Gamified terms: mfululizo, kigandisho, vito, mioyo, kipengele, kituo cha ukaguzi
- [ ] Privacy, terms and ads wording (pages.privacy, pages.terms, settings.privacy, ads.consent)
- [ ] The crane's playful ad-break offer (ads.offer.body)
- [ ] Colour names (colours.*) and frame names (shop.items.frame*)
- [ ] Plural agreement in stats.*, practice.*, achievements.*
