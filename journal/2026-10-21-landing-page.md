# 2026-10-21: Landing page

Issue: #8 · Branch: `feat/8-landing-page`

## Context

The `/` route was a one-screen placeholder. New visitors need to see what
the app is, how it teaches and who they'll learn with before starting.

## Done

- `src/views/landing.js` (`createLandingView`) and `src/styles/landing.css`:
  - Sticky header with brand, in-page links and a call to action.
  - Hero: "The playful way to **learn Luganda.**" with `heroScene()`,
    "Get started" and "I already have progress" (goes to Settings import,
    built in #9/#23), and slow-floating Bauhaus shapes.
  - A tilted ink ticker of everyday words (*Oli otya?*, *Weebale*,
    *Mukwano*…).
  - Why Luganda, How it works (lessons, streaks, hearts, spaced review),
    a playable sample question where the crane reacts to your answer,
    streak and XP showcases, the cast with names and roles, an FAQ using
    `<details>`, and a vermillion "Ready? **Tandika!**" closing section.
- Returning learners (once the store exists) see "Continue learning"
  instead of the sign-up buttons; `createLandingView({ hasProgress })` takes
  the check as a parameter.

## Decisions

- Decorative shapes use paper grey, ink and vermillion, following #28's
  light promada palette; Bauhaus yellow and blue stay inside the
  illustrations only.
- Kept to facts that need no citation ("spoken by millions across central
  Uganda", "most widely spoken language in Kampala").
- All motion (floating shapes, ticker) stops under
  `prefers-reduced-motion` through the global rule in `base.css`.

## Next

- #9 Local storage layer and user profile, then wire `hasProgress`.
