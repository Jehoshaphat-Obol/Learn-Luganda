# 2026-10-22: Ad rule engine and rewarded ads (#163)

## Asked

A rule engine that decides whether a learner sees an ad, and an opt-in
"watch an ad, earn gems" feature at 3 gems an ad.

## Done

- `src/ads/rules.js`: the ad rules as an ordered list of named rules, for
  sponsored cards and for rewarded ads. `decide()` returns `{ show, rule }`;
  `decideAd()` in `ads.js` gathers the facts (config, network, sessions,
  ad break, logs) and runs it. `allowAd` and `adSlot` now go through it, so
  the config and online checks are rules too instead of side checks.
- New `afterRewarded` rule: after a learner watches a rewarded ad, no
  sponsored cards for a while (30 min on gentle).
- `rewarded` block in every policy level: 3 gems an ad, 5 a day (6 on
  generous), 3 minutes apart, offered after the first session. Tests bound
  it (2 to 5 gems, at most 30 gems a day from ads).
- `src/ads/rewarded.js`: day log on the device and a GPT rewarded ad
  player. Gems only on `rewardedSlotGranted`; closing early, declining, no
  fill or no support all pay nothing and say so.
- Gems screen: "Watch an ad, earn gems" card with what's left today or when
  the next is ready, and a line in "How to earn gems". The crane confirms
  before the ad plays. Strings in en, lg and sw packs.
- `docs/adsense.md`: rule engine section, rewarded rows in the levels
  table, owner steps for Ad Manager.

## Decisions

- AdSense can't serve rewarded ads, and its policies forbid paying users
  to view ordinary ads. Google Ad Manager's rewarded format (GPT) is the
  compliant route and runs fine on a static site. The card stays hidden
  until the owner sets `VITE_GAM_REWARDED_UNIT`.
- Ad breaks don't block rewarded ads, since the learner asks for them.
- Daily cap of 15 gems keeps ads a top-up: a heart refill (40) still takes
  most of a day of ads, and learning pays more.

## Next

Owner: Ad Manager account and rewarded unit (`docs/adsense.md` step 8).
