/*
 * AdSense account IDs. Ads stay off until `client` holds a real publisher
 * ID (ca-pub-…) and the ad type a placement uses has a slot ID; both come
 * from the AdSense dashboard. They can also be set at build time with
 * VITE_ADSENSE_CLIENT, VITE_ADSENSE_SLOT_IN_FEED, VITE_ADSENSE_LAYOUT_KEY
 * and VITE_ADSENSE_SLOT_DISPLAY. When, where and how often ads show is
 * decided by `policy.js`, not here.
 *
 * `inFeed` is an In-feed (native) unit: create it under Ads › By ad unit ›
 * In-feed and copy its layout key too. `display` is a responsive display
 * unit.
 */
const env = import.meta.env ?? {};

export const ADS = Object.freeze({
  client: env.VITE_ADSENSE_CLIENT ?? '',
  units: Object.freeze({
    inFeed: Object.freeze({ slot: env.VITE_ADSENSE_SLOT_IN_FEED ?? '', format: 'fluid', layoutKey: env.VITE_ADSENSE_LAYOUT_KEY ?? '' }),
    display: Object.freeze({ slot: env.VITE_ADSENSE_SLOT_DISPLAY ?? '', format: 'auto' }),
  }),
});
