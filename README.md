# Learn Luganda

Duolingo-style lessons for Luganda. A static web app that runs on GitHub Pages
and keeps your progress in your browser's localStorage.

## Develop

```sh
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
```

Requires Node 20.19+ (CI uses Node 22).

## Deploy

Pushes to `main` are built by `.github/workflows/deploy.yml`, which publishes
`dist/` to the `gh-pages` branch. Pages serves that branch (Settings → Pages →
Source: Deploy from a branch, `gh-pages` / root).

## Project layout

- `src/styles/tokens.css`: theme tokens (vermillion orange, Bauhaus palette, type, spacing)
- `src/main.js`: app entry
- `public/`: static files copied as-is
- `journal/`: development log, one entry per PR
