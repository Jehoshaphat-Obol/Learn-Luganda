# 2026-10-21: Remove leagues and social features

Issue: #63 · Branch: `feat/63-remove-leagues`

## Context

The owner asked to drop leaderboards and anything that implies other
users. The app is offline and keeps everything in localStorage, so the
simulated weekly league (#20) suggested competition that was never real.
Milestones and achievements stay.

## Done

- Deleted the leagues screen, its styles, the rival simulation
  (`src/state/league.js`), its tests, the start-up weekly settle and the
  nav item. The bottom bar now has four tabs: Learn, Practice, Shop,
  Profile. Old `#/leagues` links fall back like any unknown route.
- Profile: removed the league stat tile; `profileStats` no longer returns
  `league`. Removed the now-unused trophy icon.
- Storage: schema v2 with a migration that drops the saved `league` slice
  (also applies to imported backups).
- Landing: the showcase card now says "Earn XP and unlock achievements".
- README: removed the leagues screenshot and mentions; notes that the app
  is solo and offline.
- e2e: dropped `#/leagues` from the screen/axe sweep.

## Decisions

- Achievements, streak milestones, XP, gems and the shop.
- The "Connect with friends" onboarding motivation: it is a reason to learn
  (real-life friends), not an in-app feature.
- Story characters and the "Meet the cast" section: fictional guides.

## Next

Social features are now out of scope for the project. The extended course
(#53 onwards) continues.
