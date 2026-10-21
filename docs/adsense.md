# Turning on ads (Google AdSense)

The app ships with ad slots switched off. This is everything AdSense needs
from the site, what's already done, and what the owner has to do.

## Already in the app

| Requirement | Where |
| --- | --- |
| Privacy policy that discloses Google's ad cookies, with links to Google's partner-sites page and Ads Settings | `#/privacy` |
| About, Contact and Terms pages | `#/about`, `#/contact`, `#/terms` |
| Clear navigation to those pages | landing footer, Learn sidebar, Settings, the bottom of each page |
| Ads clearly labelled **Sponsored**, kept out of lessons, practice and stories, spaced away from buttons | `src/ads/ads.js`, `src/styles/ads.css` |
| Consent choice (personalised or basic ads), changeable later | consent card + Settings › Ads and privacy |
| Plenty of original content | 24 units, guidebooks and stories |
| `ads.txt` placeholder | `public/ads.txt` |
| Nothing loads offline; unfilled slots collapse | `src/ads/ads.js` |

## Owner to-do, in order

1. **Get a custom domain** (e.g. speakluganda.com) and point GitHub Pages at
   it. AdSense only accepts sites on a domain you own, and it reads
   `ads.txt` only from the domain root. A `github.io` project path can't be
   approved.
2. **Pick a public contact address** and set `VITE_CONTACT_EMAIL` (or
   `contactEmail` in `src/app/site.js`). The Contact page falls back to
   GitHub issues until then; a real email helps approval.
3. **Apply for AdSense** at <https://adsense.google.com>, add the domain and
   follow its verification step (the AdSense script already loads with your
   `client` ID once set, which also works as the verification snippet).
4. **Fill in `ads.txt`**: replace the comment in `public/ads.txt` with the
   line AdSense shows under *Sites › ads.txt*.
5. **Turn on Google's consent message for Europe.** Since 2024 Google only
   serves ads to visitors in the EEA, UK and Switzerland when consent comes
   from a Google-certified CMP. The app's own consent card is not certified,
   so in AdSense go to *Privacy & messaging › European regulations* and
   publish the free Google consent message. It shows automatically through
   the AdSense script; the app's card still covers everyone else.
6. **Create two ad units** under *Ads › By ad unit*:
   - an **In-feed** unit (style it with the paper colours: background
     `#fbfaf8`, title `#1c1a18`, text `#4a4640`, link `#1d4e9e`, font
     Inter) and note its slot ID and layout key;
   - a **Display** unit, responsive, for the lesson complete screen.
7. **Set the IDs** in `src/ads/config.js`, or as build variables
   `VITE_ADSENSE_CLIENT`, `VITE_ADSENSE_SLOT_IN_FEED`,
   `VITE_ADSENSE_LAYOUT_KEY`, `VITE_ADSENSE_SLOT_DISPLAY`. Ads appear on the
   next deploy.

## Tuning how much ads affect learning

All the rules live in `src/ads/policy.js`. They are frozen when the app
loads, so no setting, saved data or browser console can change them; the
only way is to edit the file and deploy. A test (`tests/ads-policy.test.js`)
fails CI if a level drifts outside safe bounds.

Change the one line `const LEVEL = 'gentle';` to pick a level:

| Rule | off | gentle (default) | balanced | generous |
| --- | --- | --- | --- | --- |
| Path ad (in-feed, after the section you're on) | no | yes | yes | yes |
| Stories list ad (in-feed) | no | no | yes | yes |
| Lesson complete ad (display, above Continue) | no | yes | yes | yes |
| No ads until this many sessions finished | – | 5 | 3 | 1 |
| Minutes between any two ads | – | 15 | 8 | 4 |
| Most ads per day | 0 | 3 | 6 | 10 |
| Lesson complete ad after every Nth session | – | 4th | 3rd | 2nd |
| Skip the complete ad below this accuracy | – | 80% | 60% | 50% |
| Ad break length (free pause) | – | 24 h | 12 h | 6 h |
| Ad break with a 7+ day streak | – | 48 h | 24 h | 12 h |
| Ad breaks per rolling week | 0 | 3 | 2 | 2 |

Learners take an ad break from the "Ad break" button on any ad card or in
Settings › Ads and privacy. The crane offers it in a short, playful note
(text in `src/ads/strings.js`). Breaks can't stack, and ending one early
still counts towards the week.

Ads never appear inside lessons, practice, checkpoints, section tests,
stories being read, onboarding or the landing page: those screens have no
placement at all. To fine-tune, edit a preset's numbers in `policy.js`.

## Policy notes

- Never click your own ads or ask anyone to.
- Keep the **Sponsored** label and the "About ads" link; AdSense forbids ads
  disguised as app content. The cards match the app's style, but must stay
  recognisable as ads.
- Don't move ads into lessons or right next to Continue, Check or Start
  buttons; that counts as encouraging accidental clicks.
