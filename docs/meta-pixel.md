# Turning on the Meta (Facebook) Pixel

The Meta Pixel lets Facebook and Instagram ads measure who visits the site
and finishes lessons, so Meta can show your ads to more people like them.
It ships switched off. Everything lives in one file:
[`src/marketing/pixel.config.js`](../src/marketing/pixel.config.js).

## Owner steps

1. **Create a pixel.** In [Meta Events Manager](https://business.facebook.com/events_manager2)
   choose *Connect data sources › Web › Meta Pixel*, name it (e.g. "Learn
   Luganda") and copy the **Pixel ID** (a 15–16 digit number). Choose
   "install code manually" if asked; the app already has the code.
2. **Paste the ID** into `src/marketing/pixel.config.js`:

   ```js
   id: env.VITE_META_PIXEL_ID || '123456789012345',
   ```

   Or keep the file untouched and add a repository variable named
   `VITE_META_PIXEL_ID` under *Settings › Secrets and variables › Actions ›
   Variables*; the deploy workflow already passes it to the build. (A pixel
   ID is public anyway: it's visible in every page that loads the pixel.)
3. **Pick events.** In the same file, set any of these to `false` to stop
   sending them:

   | Key | Meta event | Sent when |
   | --- | --- | --- |
   | `pageView` | `PageView` (standard) | a screen opens |
   | `signUp` | `CompleteRegistration` (standard) | onboarding is finished |
   | `lessonComplete` | `LessonComplete` (custom, with `kind` and `xp`) | a lesson, practice, story, checkpoint or test is finished |
   | `streakMilestone` | `StreakMilestone` (custom, with `days`) | the streak reaches 3, 7, 14, 30, 50, 100, 200 or 365 days |

   Set `enabled: false` to pause the pixel without deleting the ID.
4. **Merge to `main`.** The deploy publishes it.
5. **Check it works.** Install the [Meta Pixel Helper](https://chromewebstore.google.com/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
   Chrome extension, open the site, tap **Allow** on the Facebook card and
   look for `PageView`. Events also appear under *Test events* in Events
   Manager within a few minutes.
6. **Use it in ads.** In Ads Manager, pick the pixel as the ad set's data
   source and optimise for `CompleteRegistration` (new learners), or build
   custom conversions and audiences from `LessonComplete`.
7. **Domain.** Meta asks you to verify the domain you advertise. A
   `github.io` address can't be verified by you, so this is one more reason
   to get the custom domain listed in [adsense.md](adsense.md). Add it under
   *Business settings › Brand safety › Domains*.

## How the app handles privacy

- Nothing from Meta loads until the learner taps **Allow** on a small card
  ("Help more people find Learn Luganda?"). It shows on the landing page
  and app screens, never inside lessons, practice, stories or tests, and
  waits its turn when the ad consent card is up.
- **No thanks** is remembered; the card doesn't come back. Learners can
  change their mind in *Settings › Ads and privacy › Facebook measurement*.
  Switching it off revokes consent in the pixel and stops all events.
- Only the events above are sent. Names, avatars, answers and progress
  never are. Nothing is sent offline.
- The privacy page (`#/privacy`) has a Facebook section describing this.
- The choice is stored under `learn-luganda:pixel-consent`, separately from
  progress, so a progress reset or import doesn't touch it.

The code is in `src/marketing/pixel.js`; tests in `tests/pixel.test.js`.
