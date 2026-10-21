# 2026-10-21: Project foundation

Issue: #1

## Context

The repository started empty (README only). The goal is a Duolingo-style web
app for learning Luganda: static, hosted on GitHub Pages, with progress and
user data kept in localStorage, a vermillion orange theme and Bauhaus-style
illustrations. Work proceeds one issue, one branch and one PR at a time.

## Done

- Scaffolded a Vite project (vanilla JS) with `npm run dev`, `build`, `preview`.
- Set `base: './'` in `vite.config.js` so the same build works at
  `https://<user>.github.io/Learn-Luganda/` and locally.
- Added a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds
  on every PR and, on pushes to `main`, publishes `dist/` to the `gh-pages`
  branch that Pages serves.
- Added design tokens in `src/styles/tokens.css`: a vermillion scale around
  `#e34234`, a Bauhaus set (yellow `#f4c430`, blue `#1d4e9e`, black, cream),
  feedback colours, type scale, spacing, radii and the "pressable" button
  shadow. Basic dark-mode overrides for surfaces and text.
- Fonts: Outfit (display, geometric, fits the Bauhaus look) and Lexend (body,
  designed for reading fluency, a good fit for a learning app).
- Placeholder page with a Bauhaus shape mark, "Oli otya!" greeting and a
  disabled "Tandika" (start) button, plus a matching favicon.

## Decisions

- **Vanilla JS for now.** No framework until the lesson engine needs one; a
  later issue can introduce one if it earns its place.
- **Relative base path** instead of hard-coding `/Learn-Luganda/`, so renaming
  the repo or using a custom domain needs no config change. Client-side routing
  should use hash routes to stay compatible with Pages.
- **Build on PRs, deploy only from `main`.** PRs get a build check without
  publishing.
- **Deploy via a `gh-pages` branch** rather than the Pages Actions source.
  The Actions source has to be switched on in repo settings, which Claude
  can't do from its environment; a `gh-pages` branch can be served without it.
- **Branch names:** from the next issue on, branches are named
  `<type>/<issue>-<slug>`, e.g. `feat/3-landing-page`. Claude merges its own
  PRs once CI is green.

## Next

- Confirm the site is live at https://jehoshaphat-obol.github.io/Learn-Luganda/.
- Follow the issue roadmap: landing page, app shell and routing, localStorage
  progress store, lesson engine, Bauhaus avatars, gamification (XP, streaks,
  hearts, spaced review).
