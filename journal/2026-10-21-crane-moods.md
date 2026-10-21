# 2026-10-21: The crane logo changes with progress (#93)

**Asked:** the owner wanted the icon to change with the learner's progress, as Duolingo's does, without nagging.

**What's possible:** an installed PWA's home-screen icon comes from the manifest and can't change at runtime, so that one stays the idle crane. The in-app logo (sidebar and phone top bar) and the browser-tab favicon can change, so those carry the mood.

**Done**
- `src/app/brand-mark.js` takes a mood: `idle`, `happy` (smiling eye), `sleepy` (closed eye and a "z") and `celebrating` (smiling eye and confetti). `faviconSvg()` builds the tab icon; `public/favicon.svg` is its idle output.
- `src/app/brand-mood.js`: `brandMood(state)` picks the mood. Celebrating on a streak-milestone day once today counts, happy once the daily goal is met, sleepy while a live streak is waiting for today's lesson, idle otherwise (including after a streak has already broken, so the crane never sulks). `applyBrandMood()` redraws the marks, updates the logo link's label for screen readers, and swaps the favicon to a data URI.
- `main.js` refreshes the mood after each route render, on every store change and when the tab becomes visible again (the mood depends on the date).
- The landing page keeps the idle crane.

**Checked:** unit tests for the mood rules; unit tests, build and e2e pass; checked the sleepy mark and favicon in a seeded browser session.
