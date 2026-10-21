# 2026-10-21: Light paper theme on every device

Issue: #28

## Context

After #3 shipped, the owner opened the live site on a phone in dark mode and
saw a near-black page with yellow, blue and red shapes instead of promada's
warm grey paper. Two causes: `tokens.css` still had a
`prefers-color-scheme: dark` override that swapped the background to near
black, and the placeholder mark used the old yellow/blue primaries (its black
triangle also vanished on the dark background).

## Done

- Removed the automatic dark-mode override; promada is light-only, so the
  paper palette now applies everywhere. Declared `color-scheme: light` in
  `tokens.css` and a `color-scheme` meta on both pages so browsers keep form
  controls and scrollbars light too.
- `theme-color` meta set to paper `#ebe8e2` so the phone's browser bar
  matches the page.
- Placeholder mark and favicon recoloured to promada's ink, grey and
  vermillion.
- Checked in Chromium with dark colour scheme emulated: home and
  illustrations pages both render on paper.

## Decisions

- **No dark mode for now.** If one is wanted later, it should be an explicit
  toggle built from promada's palette, not an automatic override.
- Bauhaus yellow/blue tokens stay for the character illustrations (#5); only
  the brand mark moved to the promada palette.

## Next

- Continue the issue roadmap.
