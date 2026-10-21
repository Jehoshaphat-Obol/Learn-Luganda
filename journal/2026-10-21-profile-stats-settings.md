# 2026-10-21: Profile, stats and settings

Issue: #23 · Branch: `feat/23-profile`

## Done

- **Stats** (`src/state/stats.js`): `profileStats` derives streak (and
  best), total XP, league, words learned, lessons and perfect lessons,
  accuracy, minutes learning and stories read from the saved state.
- **Profile** (`/profile`): an Edit button, eight stat tiles, an "XP
  this week" chart, then achievements.
- **Bar chart** (`src/ui/barchart.js`): built in HTML so the text stays
  readable at any width. It uses one hue: light vermillion for past days
  and action vermillion for today. Bars have rounded data ends and there
  is a dashed daily-goal line. Today's value always shows; other values
  show on hover. A visually hidden table carries the same numbers for
  screen readers.
- **Settings** (`/settings`), everything saves and applies immediately:
  - Profile: name (saved on change, blank is rejected), character and
    colour pickers with a live avatar preview.
  - Daily goal: Casual, Regular, Serious or Intense.
  - Sound effects and Animations switches (from #22).
  - Export, import and reset (from #3).
  - `?section=profile` scrolls to a section; the profile Edit button
    uses it.
- **Theme**: the issue listed a system/light/dark choice, but the user
  asked for a light-only theme (feedback on #28), so there is no theme
  setting. It can be added later if they want it.
- 2 new tests (94 total). axe found no issues on profile and settings.
  A Playwright check confirmed the goal, colour, character, name, sound
  and motion changes persist and apply.

## Next

- #24 PWA and offline.
