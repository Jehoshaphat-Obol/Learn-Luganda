/*
 * AdSense settings. Ads stay off until `client` holds a real publisher ID
 * (ca-pub-…) and a placement has a slot ID; both come from the AdSense
 * dashboard. They can also be set at build time with VITE_ADSENSE_CLIENT,
 * VITE_ADSENSE_SLOT_FEED and VITE_ADSENSE_SLOT_COMPLETE.
 *
 * `feed` is an in-feed (native) unit: create it in AdSense under
 * Ads › By ad unit › In-feed, and copy its layout key too. `complete` is a
 * plain responsive display unit.
 */
const env = import.meta.env ?? {};

export const ADS = {
  client: env.VITE_ADSENSE_CLIENT ?? '',
  placements: {
    feed: { slot: env.VITE_ADSENSE_SLOT_FEED ?? '', format: 'fluid', layoutKey: env.VITE_ADSENSE_LAYOUT_KEY ?? '' },
    complete: { slot: env.VITE_ADSENSE_SLOT_COMPLETE ?? '', format: 'auto' },
  },
};
