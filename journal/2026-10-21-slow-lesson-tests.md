# 2026-10-21: Whole-course lesson tests timing out in CI

Issue: #76 · Branch: `fix/76-slow-lesson-tests`

## Context

Four tests in `tests/lesson.test.js` build all 305 lessons. Each takes
about 3 s locally and runs past vitest's 5 s default on GitHub runners,
so `build-and-deploy` failed now and then on main and on PRs.

## Done

- `vite.config.js`: unit test timeout raised to 30 s.

## Decisions

- Kept the tests checking every lesson rather than sampling, since they
  catch content mistakes in any unit. Building a lesson is a few ms in
  the app, so this is only test-harness overhead.

## Next

- If the suite keeps growing, split the whole-course checks into their
  own file so they run in parallel with the rest.
