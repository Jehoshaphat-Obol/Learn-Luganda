# 2026-10-21: Bolder crane icon (#92)

**Asked:** the owner found the crane in the app icon too small and wanted a fuller icon that keeps the crane's identity.

**Done**
- Redrew `src/app/brand-mark.js` in a 100×100 box that the head fills edge to edge: one big ink head, a large white cheek and eye, a red cap and wattle, a grey beak running to the left edge and a five-ray crown with heavy strokes and big vermillion dots. The old mark was a crop of the full mascot with a small head in the middle.
- `public/favicon.svg` and the PNG icons (192, 512, apple-touch 180) use the mark full-bleed on the paper background. The maskable icon scales it to 74% so the crown and beak stay inside the Android safe circle.
- The header, sidebar and landing logo pick up the new mark automatically.

**Checked:** the favicon is legible at 16 and 32px; unit tests, build and e2e pass.

**Next:** #93, the logo and tab icon changing mood with progress.
