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
import { currentLanguage, t, tHtml } from '../i18n/index.js';

/** Narrow weekday names, Monday first (5 Jan 2026 was a Monday). */
const weekdays = (locale) => Array.from({ length: 7 }, (_, i) => new Date(2026, 0, 5 + i).toLocaleDateString(locale, { weekday: 'narrow' }));

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
    const date = new Date(year, month, d).toLocaleDateString(currentLanguage(), { month: 'long', day: 'numeric' });
    const label = t(active ? 'streak.dayPractised' : isFrozen ? 'streak.dayFrozen' : 'streak.day', { date });
    cells.push(`<span class="${cls}" role="listitem" aria-label="${escapeHtml(label)}">${isFrozen ? icon('snowflake', { size: 14 }) : d}</span>`);
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
    const monthName = new Date(year, month, 1).toLocaleString(currentLanguage(), { month: 'long', year: 'numeric' });
    root.innerHTML = `
      <div class="page streak-page">
        <header class="streak-hero">
          <div>
            <p class="eyebrow">${escapeHtml(t('streak.eyebrow'))}</p>
            <h1>${tHtml('streak.days', { count: st.current })}</h1>
            <p class="muted">${escapeHtml(t(st.doneToday ? 'streak.today' : st.current ? 'streak.extend' : 'streak.start'))}</p>
          </div>
          <div class="streak-hero__art">${streakScene({ days: st.current })}</div>
        </header>

        ${next ? `<section class="card streak-next">
          <h2>${escapeHtml(t('streak.next', { count: next }))}</h2>
          ${progressBar(st.current / next, { label: t('streak.nextLabel'), variant: 'gold' })}
          <p class="muted">${escapeHtml(t('streak.toGo', { count: next - st.current }))}</p>
        </section>` : ''}

        <section class="streak-stats">
          <div class="card"><span class="streak-stats__icon">${icon('flame', { size: 26 })}</span><strong>${st.longest}</strong><span class="muted">${escapeHtml(t('streak.longest'))}</span></div>
          <div class="card"><span class="streak-stats__icon streak-stats__icon--freeze">${icon('snowflake', { size: 26 })}</span><strong>${escapeHtml(t('streak.freezesCount', { count: st.freezes, max: MAX_FREEZES }))}</strong><span class="muted">${escapeHtml(t('streak.freezes'))}</span></div>
        </section>
        ${st.freezes < MAX_FREEZES ? `<p class="streak-shop">${escapeHtml(t('streak.shop'))} ${button({ label: t('streak.shopCta'), href: '#/shop', variant: 'ghost' })}</p>` : ''}

        <section class="card cal">
          <header class="cal__head">
            <button class="icon-btn" type="button" data-month="-1" aria-label="${escapeHtml(t('streak.previous'))}">${icon('back', { size: 20 })}</button>
            <h2>${escapeHtml(monthName)}</h2>
            <button class="icon-btn" type="button" data-month="1" aria-label="${escapeHtml(t('streak.nextMonth'))}">${icon('arrow', { size: 20 })}</button>
          </header>
          <div class="cal__grid" role="list" aria-label="${escapeHtml(monthName)}">
            ${weekdays(currentLanguage()).map((d) => `<span class="cal__dow" aria-hidden="true">${d}</span>`).join('')}
            ${calendar(year, month, state, st.frozenDays)}
          </div>
          <p class="cal__legend"><span class="cal__key is-active"></span> ${escapeHtml(t('streak.practised'))} <span class="cal__key is-frozen"></span> ${escapeHtml(t('streak.frozen'))}</p>
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
