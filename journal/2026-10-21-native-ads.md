# 2026-10-21: Native-style ad slots and AdSense readiness (#68)

## Asked

Ads that blend into the app like sponsored posts in a feed, not banners that
irritate; plus everything the site needs for AdSense to work.

## Done

- `src/ads/`: config (publisher/slot IDs, empty for now, also settable via
  `VITE_ADSENSE_*`), consent storage (own localStorage key, so a progress
  reset doesn't touch it) and the slot renderer.
- Ad cards use the app's card language (paper surface, soft border, 20px
  radius) with a "Sponsored" pill and an "About ads" link. They stay
  collapsed until AdSense reports `filled`, vanish if `unfilled`, if the
  script is blocked, or when offline.
- Placements: one in-feed card after the section being studied on the path,
  one after the first unit on the Stories list, one on the lesson complete
  summary (with space before Continue). None inside lessons, practice,
  checkpoints, story reading, onboarding or the landing page.
- Consent card (Allow / Basic ads only) shown from the path or stories only,
  never on the complete screen. Declining sends
  `requestNonPersonalizedAds = 1`. Changeable in Settings.
- Pages: Privacy (with Google ad-cookie disclosure), About, Contact (GitHub
  issues until a public email is set), Terms; linked from the landing
  footer, Learn sidebar, Settings and each page's foot.
- `public/ads.txt` placeholder; `docs/adsense.md` owner checklist.
- Rule-based ad policy (`src/ads/policy.js`), asked for mid-task: one
  `LEVEL` line picks off / gentle / balanced / generous, which sets
  placements and ad type per placement, a grace period for new learners,
  cooldown, daily cap, every-Nth-session for the complete screen and a
  minimum accuracy below which a struggling learner sees no ad. Deep-frozen
  at load; a test bounds every level. Shown ads are logged per day on the
  device (`learn-luganda:ads-log`) so limits hold across visits.

## Decisions

- "Blend in" stops at style: AdSense forbids ads disguised as content, so
  the Sponsored label stays and cards keep clear of buttons.
- The in-app consent card is not a Google-certified CMP. For EEA/UK/CH
  visitors the owner turns on Google's free consent message in AdSense
  (documented); it appears through the AdSense script.
- Default level is `gentle` (max 3 a day, none in the first 5 lessons) to
  keep learning first; the owner can raise it.
- "Immutable" means frozen at runtime and changeable only by a reviewed
  code change and deploy; a static site can't hide its code from readers.
- AdSense won't approve a `github.io` project path and only reads `ads.txt`
  at a domain root, so ads wait for the custom domain.

## Checked

Unit tests for policy rules and freezing, slot rendering, offline, consent flow and non-personalised
requests; e2e confirms no ads/consent when unconfigured and axe passes on the
new pages. A local build with fake IDs and a stubbed AdSense script was used
to eyeball the card and consent card on phone and desktop.

## Next

Owner: domain, contact email, AdSense approval, then fill IDs (see
`docs/adsense.md`).
