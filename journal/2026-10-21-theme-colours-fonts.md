# 2026-10-21: Theme colours and fonts from promada

Issue: #3

## Context

The owner asked to learn from the theme of their promada site. The repo
itself wasn't reachable from Claude's GitHub access, so the reference was two
screenshots: a Bauhaus geometric illustration grid and the full promada home
page. The owner then narrowed the ask to **colours and fonts only**: no
layout, components, texture or illustration style.

## Done

- `tokens.css`: added promada's warm grey paper neutrals (`--color-paper-*`)
  and near-black ink (`--color-ink-*`), plus a pastel set (butter, blush, sky,
  sage, lilac) for highlight cards. Background moves from cream to paper grey,
  text to ink. Added semantic `--color-bg-alt`, `--color-surface-inverse`,
  `--color-on-inverse` and `--color-text-subtle`. Dark mode updated to match.
- Fonts: Inter Tight (display, light 300 with bold 700 emphasis), Inter (body)
  and Instrument Serif italic (captions), replacing Outfit and Lexend.
- `base.css`: headings default to light weight with tight tracking, and
  `<strong>` inside a heading goes bold, matching promada's
  "light phrase, **bold phrase**" headlines. Added a `.caption` serif style.
- Placeholder page updated to show the new type pairing.

## Decisions

- **Vermillion `#e34234` stays primary.** promada's orange-red accent sits
  very close to it, so no conflict.
- **Bauhaus yellow and blue kept** as illustration accents; promada's
  illustrations stick to black, grey and vermillion, but the project goal asks
  for Bauhaus characters and they need a wider palette.
- **Fonts identified by eye** from screenshots (promada's source wasn't
  available). If promada uses different families, swap the three
  `--font-*` tokens and the Google Fonts link in `index.html`.

## Next

- Landing page and the rest of the issue roadmap, built on these tokens.
