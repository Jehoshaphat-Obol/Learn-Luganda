# 2026-10-21 · Earn-only gems (#78)

The owner asked what gems are for and said no money should be involved. There were never payments: gems were always earned in the app. But the Shop screen talked like a store ("Shop", "Buy", "bought"), so it read as if gems could be purchased.

## Decision

Keep gems. XP measures how much you've learned and drives the daily goal; gems are what you *spend*, so they let learning buy safety (streak freezes, heart refills) and decoration (avatar frames). Removing them would leave streak freezes and refills with no way to get them.

## What changed

- Nav and page title "Shop" → "Gems" with the gem icon (route stays `#/shop`).
- Wording: "Get"/"unlocked" instead of "Buy"/"bought"; a line saying gems can't be bought.
- New "How to earn gems" card built from the real constants (`earnRules` in `src/state/shop.js`), so it can't drift from the rewards.
- Two new Bauhaus frames: Lake (200) and Sunburst (300).
- Landing and README note that gems are never sold.

## Next

Nothing pending for gems. Notifications and the multi-language config are being handled separately.
