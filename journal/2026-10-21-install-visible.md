# 2026-10-21: Install button you can actually find (#119)

The owner (Android, Chrome) still couldn't find Install after #111.

**Why:** #111 only showed the header buttons when Chrome had fired
`beforeinstallprompt` (or on iOS). Chrome skips that event when the app is
already installed on the device, after the prompt was dismissed, before its
engagement check passes, and in browsers that can't install, so most visits
still hid it. On phones the top-bar button was also a plain outline icon.
The service worker serves pages network-first, so caching wasn't the cause.

**What changed**
- `offerInstall()` is true whenever the page isn't running as the installed
  app. With no browser prompt, the button opens the menu steps plus
  "Already installed? Open it from your home screen or apps list".
- Landing page: a large **Install app** button in the hero, right under
  Get started, and the header button reads "Install" on phones (hidden
  below 440px where the header has no room; the hero button covers it).
- App top bar on phones: a filled vermillion install icon button.
- Learn page: a "Get the app" card with a big Install button; "Not now"
  hides it for 14 days (`learn-luganda-install-card` in localStorage).
- Install buttons use dark vermillion text (#a02916) to pass contrast.
- Tests: unit (card snooze, always offered) and e2e (fallback steps, prompt,
  hero button, no horizontal scroll, Not now).

**Next:** nothing pending.
