# 2026-10-21: Learning path home screen

Issue: #12 · Branch: `feat/12-path`

## Context

With content (#11) and a profile (#10) in place, learners need the home
screen: the Duolingo-style winding path of lessons.

## Done

- `src/state/progress.js`: pure functions for lesson done/unlocked, the
  next lesson, skill and unit progress, unit unlock and learned words.
  Lessons unlock strictly in course order; learners who chose "I know some
  words" in onboarding get the whole first skill unlocked.
- `src/views/learn.js` + `src/styles/learn.css`:
  - A sticky banner per unit (colour from the content: vermillion, ink, or
    pastels for later units) with unit number, title, description, a
    progress meter and a Guidebook link.
  - Skill headings with a done/total count, then a winding trail of round
    3D nodes: gold with a tick when done, unit colour with a pulsing halo
    and a bobbing "Start" bubble for the next lesson, grey with a lock when
    locked.
  - The unit's cast member stands beside the trail (greyed out while the
    unit is locked).
  - A checkpoint trophy at the end of each unit (opens once every lesson
    in the unit is done; the checkpoint itself comes with #18).
  - Tapping a node opens a card: "Lesson 2 of 4" with Start (+10 XP) or
    Practise again (+5 XP).
  - On wide screens a sidebar shows the daily goal ring and streak.
- Placeholder routes for `/checkpoint/:unit` and `/guidebook/:unit`.
- 5 new unit tests for progress rules.

## Decisions

- One node per lesson (not per skill level) so progress is visible lesson
  by lesson with this amount of content.
- The page scrolls the current node into view on load.

## Next

- #13 Lesson engine and first exercise types, behind `/lesson/:id`.
