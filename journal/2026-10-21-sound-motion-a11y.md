# 2026-10-21: Sound, animation and accessibility

Issue: #22 · Branch: `feat/22-a11y`

## Done

- **Sound effects** (`src/ui/sound.js`): synthesised with Web Audio, no
  audio files. Effects: correct, wrong, tap, lesson complete, streak and
  unlock (goal met or achievement). Played from the lesson runner, the
  story questions and the rewards screens. Silent when muted or when Web
  Audio is missing.
- **Motion** (`src/ui/motion.js`): `data-motion="reduce"` on `<html>`
  when the system asks for reduced motion or the learner turns
  Animations off. CSS stops animations and transitions under it;
  confetti, XP count-up and smooth scrolling check it too.
- **Settings**: a Preferences section with switches for Sound effects
  and Animations (the Animations switch is locked off, with a note,
  when the system already asks for reduced motion).
- **Keyboard**:
  - Enter now checks the answer while focus is on a selected option
    (before, Enter on a focused option only re-selected it).
  - Match exercises use 1–9 and 0 for the tenth tile (5-pair matches
    used to need a "10" key).
  - Translate exercises have a **Use keyboard** switch that swaps the
    word bank for a text box with typo tolerance; the choice sticks for
    the visit. Placing a tile keeps focus in the bank.
  - The first visible, enabled control gets focus on each exercise.
- **Screen readers**: lesson feedback is a `status` live region; unit
  meters are proper progress bars; the streak calendar is a labelled
  list; pages without a visible title (path, lesson, onboarding) have an
  `h1`. Lesson and story screens no longer nest a second `<main>`.
- **Contrast**: vermillion unit banners and the landing call to action
  use the darker action vermillion, and their small text is full white.
- Feedback already pairs colour with icons (check and cross) and text,
  so it works without colour.

## Verification

- axe-core 4.10 on 13 screens, signed in and out (landing, onboarding, learn, lesson,
  practice, leagues, shop, profile, streak, settings, stories, story,
  guidebook): no violations.
- Keyboard-only Playwright runs: a full practice session to the rewards
  screen, a lesson through every exercise type, and a story. All done
  without the mouse.
- 3 new tests (92 total).

## Next

- #23 Profile, stats and settings.
