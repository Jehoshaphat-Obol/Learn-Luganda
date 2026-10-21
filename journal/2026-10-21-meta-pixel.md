# 2026-10-21: Meta (Facebook) Pixel

Issue: #113 · Branch: `feat/113-meta-pixel`

## Context

The owner wants the Meta Pixel so Facebook and Instagram ads can measure
and reach more learners, configured from a single file.

## Done

- `src/marketing/pixel.config.js`: the owner's file. `id` (or
  `VITE_META_PIXEL_ID`), `enabled`, and an on/off switch per event. Ships
  empty, so the pixel is off.
- `src/marketing/pixel.js`: Meta's base snippet loaded on demand, a consent
  card of its own, `trackPixel()` and `pixelOnRoute()`.
- Events: `PageView` on every screen (from the router in `main.js`),
  `CompleteRegistration` when onboarding finishes, custom `LessonComplete`
  (`kind`, `xp`) and `StreakMilestone` (`days`) from `finishLesson()`.
- Settings › Ads and privacy: "Facebook measurement" toggle (revokes
  consent when switched off). Privacy page: a Facebook section.
- Ads consent card is now tagged `data-consent-for="ads"` so the two cards
  never remove each other; the pixel card steps aside while the ad card
  shows.
- `docs/meta-pixel.md`: owner steps, event table, privacy notes. README
  links it.
- Tests: `tests/pixel.test.js` (off by default, consent before load, no
  card in lessons, event switches, revoke); e2e checks nothing from
  Facebook loads while unconfigured. Checked by hand with a test ID: card
  shows on the landing page, Allow loads `fbevents.js` and sends
  `PageView`.

## Decisions

- Consent before load, not Meta's `consent revoke` pattern alone: no
  request to Meta at all until Allow.
- No personal data in events, and no Advanced Matching.
- The card is separate from the ad card because it covers a different
  company and purpose.

## Next

- Owner: create the pixel, paste the ID, verify the domain once the custom
  domain exists (see docs/meta-pixel.md).
