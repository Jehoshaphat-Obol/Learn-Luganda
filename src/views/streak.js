/*
 * Streak page: the current and longest streak, freezes owned, and a month
 * calendar marking days with practice (flame) and days saved by a freeze.
 */
import '../styles/streak.css';
import { store } from '../state/store.js';
import { streakStatus, nextMilestone, MAX_FREEZES } from '../state/streak.js';
import { dayKey } from '../state/dates.js';
import { streakScene } from '../illustrations/index.js';
import { button, escapeHtml, progressBar } from '../ui/components.js';
import { icon } from '../ui/icons.js';

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function calendar(year, month, state, frozen) {
  const first = new Date(year, month, 1);
  const days = new Date(year, month + 1, 0).getDate();
  const lead = (first.getDay() + 6) % 7;
  const today = dayKey();
  const cells = [];
  for (let i = 0; i < lead; i += 1) cells.push('<span class="cal__cell cal__cell--empty" aria-hidden="true"></span>');
  for (let d = 1; d <= days; d += 1) {
    const key = dayKey(new Date(year, month, d));
    const active = (state.xp.byDay[key] ?? 0) > 0;
    const isFrozen = frozen.includes(key);
    const cls = ['cal__cell', active && 'is-active', isFrozen && 'is-frozen', key === today && 'is-today'].filter(Boolean).join(' ');
    const label = `${first.toLocaleString('en', { month: 'long' })} ${d}${active ? ', practised' : isFrozen ? ', streak freeze used' : ''}`;
    cells.push(`<span class="${cls}" role="listitem" aria-label="${label}">${isFrozen ? icon('snowflake', { size: 14 }) : d}</span>`);
  }
  return cells.join('');
}

export function streakView({ root }) {
  const state = store.get();
  const st = streakStatus(state);
  const next = nextMilestone(st.current);
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();

  function draw() {
    const monthName = new Date(year, month, 1).toLocaleString('en', { month: 'long', year: 'numeric' });
    root.innerHTML = `
      <div class="page streak-page">
        <header class="streak-hero">
          <div>
            <p class="eyebrow">Streak</p>
            <h1><strong>${st.current}</strong> day${st.current === 1 ? '' : 's'}</h1>
            <p class="muted">${st.doneToday ? 'You’ve practised today. See you tomorrow!' : st.current ? 'Finish a lesson today to extend your streak.' : 'Finish a lesson to start a streak.'}</p>
          </div>
          <div class="streak-hero__art">${streakScene({ days: st.current })}</div>
        </header>

        ${next ? `<section class="card streak-next">
          <h2>Next milestone: ${next} days</h2>
          ${progressBar(st.current / next, { label: 'Progress to next milestone', variant: 'gold' })}
          <p class="muted">${next - st.current} day${next - st.current === 1 ? '' : 's'} to go</p>
        </section>` : ''}

        <section class="streak-stats">
          <div class="card"><span class="streak-stats__icon">${icon('flame', { size: 26 })}</span><strong>${st.longest}</strong><span class="muted">Longest streak</span></div>
          <div class="card"><span class="streak-stats__icon streak-stats__icon--freeze">${icon('snowflake', { size: 26 })}</span><strong>${st.freezes} / ${MAX_FREEZES}</strong><span class="muted">Streak freezes</span></div>
        </section>
        ${st.freezes < MAX_FREEZES ? `<p class="streak-shop">A streak freeze covers a day you miss. ${button({ label: 'Get one with gems', href: '#/shop', variant: 'ghost' })}</p>` : ''}

        <section class="card cal">
          <header class="cal__head">
            <button class="icon-btn" type="button" data-month="-1" aria-label="Previous month">${icon('back', { size: 20 })}</button>
            <h2>${escapeHtml(monthName)}</h2>
            <button class="icon-btn" type="button" data-month="1" aria-label="Next month">${icon('arrow', { size: 20 })}</button>
          </header>
          <div class="cal__grid" role="list" aria-label="${escapeHtml(monthName)}">
            ${WEEKDAYS.map((d) => `<span class="cal__dow" aria-hidden="true">${d}</span>`).join('')}
            ${calendar(year, month, state, st.frozenDays)}
          </div>
          <p class="cal__legend"><span class="cal__key is-active"></span> Practised <span class="cal__key is-frozen"></span> Freeze used</p>
        </section>
      </div>`;
  }

  root.addEventListener('click', (e) => {
    const step = e.target.closest('[data-month]');
    if (!step) return;
    month += Number(step.dataset.month);
    if (month < 0) {
      month = 11;
      year -= 1;
    } else if (month > 11) {
      month = 0;
      year += 1;
    }
    draw();
  });
  draw();
}
