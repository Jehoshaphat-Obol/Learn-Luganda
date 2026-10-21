# 2026-10-21: Bauhaus illustrations

Issue: #5 · Branch: `feat/5-bauhaus-illustrations`

## Context

The owner shared the promada sign-in art as the style reference: flat
Bauhaus portraits in rounded cards, big vermillion circles and
quarter-circles, black blocks, hatching and dot-grid textures, crop marks,
tick rulers and small italic serif captions on warm grey paper.

## Done

- `src/illustrations/` module, imported via `index.js`:
  - `core.js`: unique ids, hatch / dot / grid patterns, crop marks,
    crosshairs, tick ruler, serif caption, "Welcome back" style pill.
  - `mascot.js`: a grey crowned crane (Uganda's national bird) built from a
    circle body, quarter-circle wing, triangle beak and a crown of rules
    tipped with vermillion dots. Poses: `idle`, `happy`, `sad`, `cheering`,
    `thinking`.
  - `characters.js`: six cast members (Nakato, Mukasa, Jjajja Nalwoga,
    Ssali, Amara, Emma) with `neutral`, `happy` and `sad` expressions, as a
    framed card or a circular profile avatar. Faces are split down the nose
    into lit and shaded halves like the reference.
  - `scenes.js`: `heroScene()`, `lessonCompleteScene({ xp })`,
    `streakScene({ days })`.
  - `illustrations.css`: `--ill-*` colour properties that fall back to the
    theme tokens, plus bob / blink / drift / spin animations that switch off
    under `prefers-reduced-motion`.
- `illustrations.html` gallery page (second Vite entry) showing every asset.

## Decisions

- Inline SVG strings from plain functions, not image files: they take theme
  colours from CSS, can be animated, and need no framework.
- Colours go through classes (`f-verm`, `f-ink`…) rather than hex. The
  `--ill-*` properties point at the promada paper / ink tokens from #3, so a
  theme change re-skins everything.
  Skin and hair tones are fixed per character since they are not theme
  colours.
- Lines drawn straight onto the page use `--ill-rule` (the text colour) so
  rules and captions stay visible in dark mode; the cards themselves stay
  light like printed paper.
- The gomesi's raised, pointed shoulders mark Jjajja as a Muganda elder at
  a glance.
- Luganda used in captions: *Oli otya?* (how are you), *weebale nnyo*
  (thank you very much), *okuyiga* (to learn), *olunaku* (day). These should
  go on the native speaker review list with the course content.

## Next

- Give the mascot a name (open question for the owner or a native speaker).
- Use `heroScene()` on the landing page and the cast in onboarding's
  avatar step.
