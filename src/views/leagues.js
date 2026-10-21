/*
 * Weekly league table. Rivals are simulated (see state/league.js), so the
 * page says so plainly. A finished week is announced once with a modal.
 */
import '../styles/leagues.css';
import { store } from '../state/store.js';
import { DEMOTE, PROMOTE, SIZE, TIERS, settleLeague, standings, timeLeft, zone } from '../state/league.js';
import { mascot } from '../illustrations/index.js';
import { avatar } from '../ui/avatar.js';
import { button, escapeHtml, openModal } from '../ui/components.js';
import { icon } from '../ui/icons.js';

function shield(tier, { size = 56, current = false, locked = false } = {}) {
  return `<span class="tier-shield tier-shield--${TIERS[tier].id}${current ? ' is-current' : ''}${locked ? ' is-locked' : ''}" style="--size:${size}px" aria-hidden="true">
    <svg class="tier-shield__bg" viewBox="0 0 40 46"><path d="M20 2 L37 8 V22 C37 33 29 40 20 44 C11 40 3 33 3 22 V8 Z"/></svg>
    ${locked ? icon('lock', { size: Math.round(size * 0.36) }) : icon('star', { size: Math.round(size * 0.42) })}
  </span>`;
}

function formatLeft(ms) {
  const h = Math.floor(ms / 3_600_000);
  if (h >= 24) return `${Math.floor(h / 24)} day${h >= 48 ? 's' : ''}`;
  if (h >= 1) return `${h} hour${h > 1 ? 's' : ''}`;
  return `${Math.max(1, Math.round(ms / 60_000))} min`;
}

function row(r, tier) {
  const z = zone(r.rank, tier);
  return `<li class="league-row league-row--${z}${r.me ? ' is-me' : ''}">
    <span class="league-row__rank">${r.rank}</span>
    ${avatar(r.avatar ?? {}, { size: 40, label: r.name })}
    <span class="league-row__name">${escapeHtml(r.name)}${r.me ? ' <span class="pill">You</span>' : ''}</span>
    <span class="league-row__xp">${r.xp} XP</span>
  </li>`;
}

function divider(text, kind) {
  return `<li class="league-divider league-divider--${kind}">${icon(kind === 'promote' ? 'up' : 'down', { size: 14 })}${text}</li>`;
}

function table(rows, tier) {
  const out = [];
  rows.forEach((r) => {
    out.push(row(r, tier));
    if (r.rank === PROMOTE && tier < TIERS.length - 1) out.push(divider('Promotion zone', 'promote'));
    if (r.rank === SIZE - DEMOTE && tier > 0) out.push(divider('Demotion zone', 'demote'));
  });
  return out.join('');
}

function announce(result) {
  const from = TIERS[result.tier].name;
  const to = TIERS[result.newTier].name;
  const title = result.result === 'promote' ? `Promoted to ${to}!` : result.result === 'demote' ? `Back to ${to}` : `You stay in ${to}`;
  const body =
    result.result === 'promote'
      ? `You finished #${result.rank} in the ${from} League with ${result.xp} XP. Kale, keep climbing!`
      : result.result === 'demote'
        ? `You finished #${result.rank} with ${result.xp} XP. A few lessons a day will lift you back up.`
        : `You finished #${result.rank} in the ${from} League with ${result.xp} XP.`;
  return openModal({
    title,
    body: `<p>${escapeHtml(body)}</p>`,
    art: `<div class="league-modal__art">${shield(result.newTier, { size: 96, current: true })}</div>`,
    actions: [{ label: 'Continue', value: true, variant: 'primary' }],
  });
}

export function leaguesView({ root }) {
  store.update((s) => settleLeague(s));
  let state = store.get();
  const { tier, week } = state.league;
  const rows = standings(state, week, tier);
  const me = rows.find((r) => r.me);

  root.innerHTML = `
    <div class="page leagues">
      <header class="leagues__head">
        <ol class="tier-strip" aria-label="Leagues">
          ${TIERS.map((t, i) => `<li title="${t.name} League">${shield(i, { size: i === tier ? 64 : 40, current: i === tier, locked: i > tier })}</li>`).join('')}
        </ol>
        <h1>${TIERS[tier].name} League</h1>
        <p class="muted">Top ${PROMOTE} move up${tier > 0 ? `, bottom ${DEMOTE} move down` : ''}. ${icon('clock', { size: 16 })} ${formatLeft(timeLeft())} left.</p>
        <p class="leagues__rank">You're <strong>#${me.rank}</strong> with ${me.xp} XP this week.</p>
      </header>
      ${
        me.xp === 0
          ? `<div class="card leagues__empty">
              <div class="leagues__empty-art">${mascot({ pose: 'cheering' })}</div>
              <div>
                <h2>Earn XP to climb</h2>
                <p class="muted">Every lesson and practice session this week counts toward your league place.</p>
                ${button({ label: 'Start a lesson', href: '#/learn' })}
              </div>
            </div>`
          : ''
      }
      <ol class="league-table">${table(rows, tier)}</ol>
      <p class="caption leagues__note">${icon('info', { size: 14 })} Leagues are practice leagues: the other learners are simulated on your device, since Learn Luganda keeps everything offline. Your XP is real.</p>
    </div>`;

  if (state.league.pendingResult) {
    const result = state.league.pendingResult;
    store.update((s) => {
      s.league.pendingResult = null;
    });
    announce(result);
  }
}
