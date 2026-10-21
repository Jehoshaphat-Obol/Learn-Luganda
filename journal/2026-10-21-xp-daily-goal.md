# 2026-10-21: XP, lesson complete screen and daily goal

Issue: #15 · Branch: `feat/15-xp`

## Context

Lessons were saved but earned nothing. XP and a daily goal are the core
Duolingo motivators: a visible reward now, and a target for today.

## Done

- `src/state/xp.js`: `lessonXp` (10 XP for a new lesson, 5 for a replay,
  +5 for a perfect lesson, with a breakdown), `addXp` (total plus a
  per-day log keyed by local date), `dailyGoal`, `xpHistory`.
- `finishLesson()` in `src/state/lessons.js` saves the lesson result and XP
  in one store update and returns the daily goal before and after.
- `src/views/rewards.js`: the post-lesson sequence.
  - Summary: completion scene, "Perfect lesson!" or "Lesson complete!",
    three stat cards (XP counting up, accuracy with a word for how it
    went, time) and the XP breakdown.
  - "Daily goal met!" screen with a full ring, only when this lesson
    crossed the goal.
  - `addRewardStep()` lets later features (streaks, achievements) add
    their own screens.
- `src/ui/confetti.js`: Bauhaus confetti (circles, squares, triangles,
  half-discs in vermillion, ink, gold and grey); skipped under reduced
  motion.
- Learning path: a compact daily-goal strip above the path on phones (the
  sidebar already covers wide screens).
- A `clock` icon for the time card.

## Decisions

- Replays earn half so practising is rewarded but new lessons stay the
  fastest route to the goal.
- XP is logged per local day so a lesson at 23:50 counts for that day.

## Next

- #16 Hearts.
