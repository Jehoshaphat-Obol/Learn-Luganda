/*
 * Every piece of ad-break text in one place, so it can move into the
 * language config with the rest of the app's strings. The crane speaks:
 * honest that sponsored cards keep lessons free, playful, never guilt.
 * `{name}` slots are filled by `fill` from reminders/strings.js.
 */
export const AD_STRINGS = {
  cardButton: 'Ad break',
  cardButtonLabel: 'Take a break from ads',

  offer: {
    title: 'Fancy an ad break?',
    body: '{mascot} here. These sponsored cards pay for my birdseed and keep every lesson free for everyone. Between you and me, I’d rather be teaching than advertising. Want me to shoo them away for {duration}? It’s on the house.',
    streak: 'Your {streak} day streak earned you the long version.',
    left: 'Ad breaks left this week: {left}.',
    yes: 'Clear the skies',
    no: 'Ads are fine',
  },

  done: 'Clear skies until {time}. Weebale for keeping me flying!',

  none: {
    title: 'All out of ad breaks',
    body: 'You’ve had all {perWeek} of this week’s breaks. The next one lands {when}. Until then, the sponsored cards keep the lessons free. Weebale for sticking with me!',
    ok: 'Fair enough',
  },

  settings: {
    title: 'Ad breaks',
    hint: 'Pause ads for {duration}, free. {left} left this week.',
    active: 'Ads are on a break until {time}.',
    take: 'Take an ad break',
    end: 'Bring ads back early',
    ended: 'Ads are back. Weebale, that helps keep the lessons free!',
  },
};

/** "a whole day", "two whole days" or "6 hours". */
export function duration(hours) {
  if (hours === 24) return 'a whole day';
  if (hours === 48) return 'two whole days';
  return `${hours} hours`;
}
