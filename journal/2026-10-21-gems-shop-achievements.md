# 2026-10-21: Gems, shop and achievements

Issue: #19 · Branch: `feat/19-shop`

## Context

Gems give XP somewhere to go: they buy safety nets (streak freezes, heart
refills) and a little vanity, and achievements reward long-term habits.

## Done

- **Gems** (`src/state/shop.js`): +5 per lesson, +3 per practice, +5 more
  for a perfect session, streak milestone bonuses (3→10 … 365→365), and
  10 × level for each achievement level. Shown in the lesson summary.
- **Shop** (`/shop`): streak freeze (60 gems, hold up to 2), heart refill
  (40, only when not full, shows the next-heart timer), gold frame (100)
  and Bauhaus frame (150) for the avatar. Frames can be equipped and
  unequipped once owned. `canBuy` explains why a button is disabled.
- **Achievements** (`src/state/achievements.js`): Wildfire (streak), Sage
  (XP), Scholar (words learned), Perfectionist (perfect lessons), Sharp
  Mind (practice sessions), Explorer (units completed), five levels each.
  `evaluateAchievements` runs inside `finishLesson`, stores new levels
  and pays gems; new levels get an "Achievement unlocked!" reward screen.
- **Badges** (`src/ui/badge.js`): the achievement's Bauhaus shape (circle,
  square, triangle, half-disc) filled by level colour, its icon, and the
  level in Roman numerals.
- **Profile** (`/profile`, first version): avatar with frame, name, joined
  date and every achievement with level, next target and a progress bar.
- `stats.practiceSessions` added (defaults fill it for existing saves).
- 7 new tests: tier unlocks pay once, progress ratios, freeze cap, refill
  rules, frames, balance checks, session gems.

## Decisions

- Prices are set so a learner doing one lesson a day can afford a freeze
  in about a week (5–10 gems a lesson plus achievement payouts).
- Badges are drawn, not image files, so they follow the theme tokens.

## Next

- #20 Leagues (local).
