# 2026-10-21: Onboarding flow

Issue: #10 · Branch: `feat/10-onboarding`

## Context

"Get started" needs to turn a visitor into a learner with a profile: a
name, an avatar, a daily goal and a starting point.

## Done

- `src/views/onboarding.js` and `src/styles/onboarding.css`: six screens
  (welcome, why are you learning, daily goal, level, name and avatar, ready),
  each with the crane talking in a speech bubble and a progress bar on top.
  - Daily goals: Casual 10, Regular 20, Serious 30, Intense 50 XP.
  - Avatar: any of the six cast portraits on one of seven colours, with a
    live preview.
  - Step and answers are saved to `store.onboarding` on every change, so a
    refresh resumes mid-flow with answers intact.
  - Options are `role="radio"` buttons with `aria-checked`; Enter in the
    name field continues.
- `src/ui/avatar.js`: `avatar({ character, color }, { size })` used by
  onboarding now and the top bar and profile later.
- Route guard in `main.js`: routes not marked `public` send learners
  without a profile to onboarding, and onboarding sends learners who have
  one to the path.
- `src/app/brand.js`: `MASCOT_NAME` placeholder ("Crane") until the owner
  names the mascot.

## Decisions

- The "I know some words" level is recorded now; the path uses it to
  unlock Unit 1's first skills once content exists (#11/#12).
- Onboarding stays on the bare layout (no nav) to keep the focus on the
  questions.

## Next

- #11 Course content model and Units 1 to 2.
- Ask the owner for the mascot's name.
