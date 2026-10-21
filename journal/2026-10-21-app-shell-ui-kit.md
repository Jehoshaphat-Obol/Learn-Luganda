# 2026-10-21: App shell, hash router and UI kit

Issue: #7 · Branch: `feat/7-app-shell`

## Context

With the theme (#3) and illustrations (#5) in place, every later screen
needs a common frame: routing that works on GitHub Pages, a layout with the
stats bar and navigation, and a shared set of controls.

## Done

- `src/app/router.js`: a small hash router (`compile`, `parseHash`,
  `matchRoute`, `createRouter`) with `:param` segments and query strings.
- `src/app/shell.js`: picks a layout per route. `bare` (landing, onboarding,
  lessons) is full screen; `app` adds a sticky top bar with streak, gems and
  hearts and the navigation (bottom tab bar on phones, side rail from
  900px). Stats come from `setStatsProvider()` so the progress store can
  plug in later; `refreshTopBar()` redraws them.
- `src/app/routes.js`: the route table, with placeholder screens for
  everything later issues build.
- `src/ui/icons.js`: 23 geometric inline SVG icons using `currentColor`.
- `src/ui/components.js`: `button`, `progressBar`, `ring`, `pill`,
  `speech`, `toast`, `openModal` (focus-trapped, Escape to close, bottom
  sheet on phones) and `escapeHtml`.
- `src/styles/components.css` and `layout.css`: pressable buttons in six
  variants, word tiles, choice cards, inputs, cards, pastel cards, toasts,
  modal, progress bar and ring.
- `#/styleguide` route showing every component.
- Vitest (jsdom) with router tests; CI now runs `npm test` before building.

## Decisions

- **View contract:** a view is `({ root, params, query, navigate }) => cleanup?`.
  Views render HTML strings and use event delegation on `root`; no framework
  yet, which keeps the bundle tiny (about 6 kB gzipped JS).
- **Button colour:** filled buttons use `--color-action` (`#d13a26`), one
  step darker than brand vermillion, because white on `#e34234` is 4.1:1 and
  fails WCAG AA for normal text. White on `#d13a26` is 4.8:1. Large shapes
  and illustrations keep the brand vermillion.
- Vermillion text uses `--color-primary-text` (vermillion-700) for the same
  reason.
- Light-only, following #28: no dark-mode overrides in the new styles.
- The illustration gallery stays a separate page (`illustrations.html`).

## Next

- #8 Landing page on the `/` route.
