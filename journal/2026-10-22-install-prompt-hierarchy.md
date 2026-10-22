# 2026-10-22: Install that installs, and a calmer landing hero (#138)

Owner feedback on #136 from Android Chrome: tapping Install only showed the
menu steps (earlier it installed straight away), and the hero's three loud
buttons fought each other.

**Why only steps:** Chrome stops firing `beforeinstallprompt` once the app is
installed on the device, so there's no prompt to replay. It can also fire
before the app bundle runs, and the listener in `pwa.js` missed it.

**What changed**
- `index.html` has a tiny inline listener that keeps an early
  `beforeinstallprompt` in `window.__installPrompt`; `pwa.js` picks it up.
- The manifest lists itself in `related_applications` (platform `webapp`),
  and `navigator.getInstalledRelatedApps()` tells us when the app is already
  on the device. Then the buttons read "App installed" (check icon), the tap
  explains opening it from the home screen (or removing it to reinstall), and
  the Get the app card stays hidden.
- Landing hero: Get started (primary), Install app (neutral secondary with a
  vermillion icon), and "I already have progress" as a text link; buttons go
  full width on phones.
- Added the Luganda strings for every install key (the i18n completeness test
  was red on main since #135 and #136 crossed).
- e2e: an offer fired before the app loads is kept; the "already on this
  device" path.

**Note:** `getInstalledRelatedApps` only reports on Android Chrome. Elsewhere
we fall back to the steps, which include "Already installed? Open it…".
