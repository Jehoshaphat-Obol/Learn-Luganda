# 2026-10-21: Crane logo in the header (#66)

**Asked:** the owner noticed abstract shapes (a vermillion circle over a black square) at the top left and asked for the crane there instead.

**Done**
- New `src/app/brand-mark.js`: the crane's head cropped from the mascot geometry (crown fan, black head, white cheek, red cap and wattle, grey beak, neck running off the bottom edge). The crown strokes and dots are heavier than in the full mascot so the fan still reads at 30px.
- `brandMark()` replaces the old `.brand-mark` spans in the app sidebar, the mobile top bar, and the landing header and footer. Colours are literal so it doesn't need the illustration stylesheet.
- `public/favicon.svg` and the PNG app icons (192, 512, maskable 512, apple-touch 180) redrawn from the same shapes on the paper background. The maskable icon keeps the crane inside the 80% safe zone. PNGs were rendered with Playwright's Chromium.

**Checked:** unit tests, build and e2e pass; screenshots of the landing header, desktop sidebar and phone top bar look right, and the favicon is legible at 32px.

**Next:** none for this issue. If the crane gets a name (still the `MASCOT_NAME` placeholder), the aria labels could mention it.
