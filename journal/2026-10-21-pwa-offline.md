# 2026-10-21: Installable app and offline support

Issue: #24 · Branch: `feat/24-pwa`

## Done

- **Manifest** (`public/manifest.webmanifest`): name, short name, light
  paper theme colour, standalone display, relative `start_url`
  (`./#/learn`) and scope so it works under `/Learn-Luganda/`.
- **Icons** (`public/icons/`): 192, 512, maskable 512 (extra safe-zone
  padding) and a 180 Apple touch icon, rendered from the crane mascot
  (happy pose) on promada paper. They were made once with Playwright
  from the live SVG and committed as PNGs.
- **Service worker**: `build/service-worker.js` is a small Vite plugin
  that writes `dist/sw.js` after each build from `build/sw-template.js`.
  - It precaches every built file under a cache named after a hash of
    their contents, so each deploy gets a fresh cache and old caches are
    deleted on activate.
  - Pages are network first, with the cached shell as the offline
    fallback. Hashed assets are cache first.
  - Google Fonts use stale-while-revalidate in their own cache.
  - All paths are relative to the worker.
  - Registered only in production builds.
- **Install button**: Settings shows "Install app" when the browser
  offers it (`beforeinstallprompt`).
- **Daily reminder** (opt-in, Settings): asks for notification
  permission and lets you pick an hour (6 am to 10 pm). There is no server
  or push, so it is best effort: while the app or its installed window is
  open, a check every 10 minutes sends at most one notification a day,
  after the chosen hour, if the daily goal isn't met. The message names a
  streak at risk. Clicking it focuses the app.

## Verification

- Playwright against the production build: the service worker takes
  control on the first visit, and the manifest loads with 3 icons. After
  going offline and reloading, a lesson and the stories hub render with
  no errors.
- 4 new reminder tests (98 total).

## Next

- #25 Units 3–8 content.
