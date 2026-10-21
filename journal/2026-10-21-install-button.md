# 2026-10-21: Install app button is back (#109)

**Why it "disappeared":** no PR removed it. Since the PWA work (#24, PR #46)
the only Install button lived in Settings, and it was drawn only if Chrome's
`beforeinstallprompt` had already fired when Settings rendered. The view never
redrew when the event arrived later, Safari on iPhone/iPad never fires it, and
after a dismissed prompt Chrome stops offering for a while. So most visits
showed nothing. The manifest, icons and service worker on gh-pages were fine
after the crane icon changes (#92, #101): checked icon sizes and the deployed files.

**What changed**
- `src/app/pwa.js` tracks an install state (`prompt`, `ios`, `manual`,
  `installed`) and `syncInstall()` updates every button when it changes.
- An Install button in the app top bar (icon-only on phones) and the landing
  header, shown when the browser offers to install or on iOS.
- On iOS the button opens the Share → Add to Home Screen steps.
- Settings always has an "Install Learn Luganda" section: the button, iOS
  steps, or the browser-menu steps, and "installed" once it is.
- Everything hides when running installed (`display-mode: standalone`,
  `navigator.standalone`) or after `appinstalled`.
- Strings in the UI pack under `install.*`; a new `install` icon.
- Tests: `tests/pwa.test.js`; e2e for a late `beforeinstallprompt` and the iOS steps.

**Next:** nothing pending for this issue.
