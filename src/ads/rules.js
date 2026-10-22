/*
 * The ad rule engine: the one place that decides whether an ad shows.
 *
 * Each rule has a name and a test that says when it blocks. Rules run in
 * order, the first one that blocks wins, and the decision names it, so
 * "why no ad here?" always has a single answer. The numbers every rule
 * reads come from the frozen policy (`policy.js`); this file holds no
 * numbers of its own, and nothing here reads storage or the network. The
 * caller gathers the facts (`context`) and passes them in.
 *
 * Context for placement ads (sponsored cards):
 *   placement    'path', 'stories' or 'complete'
 *   configured   AdSense has a publisher ID and a slot for this placement
 *   online       the device is online
 *   sessions     lessons and practice sessions finished so far
 *   accuracy     accuracy of the session just finished (complete only)
 *   breakUntil   when the learner's ad break ends (0 when none)
 *   log          today's ads shown and when the last one was ({ shown, last })
 *   rewardedLast when the learner last finished a rewarded ad
 *   now          the time, in ms
 *
 * Context for rewarded ads (watch an ad, earn gems):
 *   configured   an Ad Manager rewarded unit is set
 *   online, sessions, now as above
 *   rewarded     today's rewarded ads and when the last one was ({ count, last })
 */

const MIN = 60_000;

/** Rules for sponsored cards on the path, stories list and complete screen. */
export const PLACEMENT_RULES = Object.freeze([
  { id: 'configured', blocks: (c) => !c.configured },
  { id: 'online', blocks: (c) => !c.online },
  { id: 'placement', blocks: (c, p) => !p.placements[c.placement]?.enabled },
  { id: 'adBreak', blocks: (c) => c.breakUntil > c.now },
  { id: 'grace', blocks: (c, p) => c.sessions < p.graceSessions },
  // Someone who just watched an ad for gems gets a quiet spell.
  { id: 'afterRewarded', blocks: (c, p) => Boolean(c.rewardedLast) && c.now - c.rewardedLast < p.rewarded.quietMinutes * MIN },
  { id: 'dailyCap', blocks: (c, p) => c.log.shown >= p.maxPerDay },
  { id: 'cooldown', blocks: (c, p) => Boolean(c.log.last) && c.now - c.log.last < p.cooldownMinutes * MIN },
  { id: 'everyNthSession', blocks: (c, p) => c.placement === 'complete' && c.sessions % p.everyNthSession !== 0 },
  { id: 'minAccuracy', blocks: (c, p) => c.placement === 'complete' && (c.accuracy ?? 1) < p.minAccuracy },
]);

/**
 * Rules for offering a rewarded ad. Ad breaks don't apply: the learner asks
 * for these, and the gems are theirs to earn.
 */
export const REWARDED_RULES = Object.freeze([
  { id: 'configured', blocks: (c) => !c.configured },
  { id: 'online', blocks: (c) => !c.online },
  { id: 'enabled', blocks: (c, p) => !(p.rewarded.perDay > 0 && p.rewarded.gems > 0) },
  { id: 'grace', blocks: (c, p) => c.sessions < p.rewarded.graceSessions },
  { id: 'dailyCap', blocks: (c, p) => c.rewarded.count >= p.rewarded.perDay },
  { id: 'cooldown', blocks: (c, p) => Boolean(c.rewarded.last) && c.now - c.rewarded.last < p.rewarded.cooldownMinutes * MIN },
]);

/**
 * Runs `rules` in order against `context` and `policy`.
 * @returns {{ show: boolean, rule: string|null }} `rule` names the rule that blocked
 */
export function decide(rules, context, policy) {
  for (const r of rules) if (r.blocks(context, policy)) return { show: false, rule: r.id };
  return { show: true, rule: null };
}
