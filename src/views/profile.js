/*
 * Profile: who you are, headline stats, the last 7 days of XP and every
 * achievement. Editing lives in Settings.
 */
import '../styles/profile.css';
import { store } from '../state/store.js';
import { ACHIEVEMENTS, achievementProgress } from '../state/achievements.js';
import { badge } from '../ui/badge.js';
import { avatar } from '../ui/avatar.js';
import { button, escapeHtml, progressBar } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { barChart } from '../ui/barchart.js';
import { profileStats } from '../state/stats.js';
import { dailyGoal, xpHistory } from '../state/xp.js';
import { fromDayKey } from '../state/dates.js';

export function achievementList(state) {
  return `<ul class="achievements">
    ${ACHIEVEMENTS.map((a) => {
      const p = achievementProgress(state, a);
      return `<li class="achievement">
        ${badge({ shape: a.shape, iconName: a.icon, tier: p.tier, size: 64, label: `${a.title}, level ${p.tier} of ${p.maxTier}` })}
        <div class="achievement__body">
          <h3>${escapeHtml(a.title)} <span class="muted">${p.tier ? `Level ${p.tier}` : 'Locked'}</span></h3>
          <p class="muted">${escapeHtml(p.next ? a.describe(p.next) : 'All levels complete!')}</p>
          ${p.next ? `${progressBar(p.ratio, { label: `${a.title} progress`, variant: 'gold' })}<span class="achievement__count">${p.value} / ${p.next}</span>` : ''}
        </div>
      </li>`;
    }).join('')}
  </ul>`;
}

function tile(iconName, value, label, cls = '') {
  return `<li class="stat-tile ${cls}">${icon(iconName, { size: 26 })}<div><strong>${value}</strong><span>${label}</span></div></li>`;
}

export function profileView({ root }) {
  const state = store.get();
  const p = state.profile;
  const st = profileStats(state);
  const history = xpHistory(state, 7);
  const week = history.reduce((n, d) => n + d.xp, 0);
  const chartData = history.map((d, i) => {
    const date = fromDayKey(d.day);
    return {
      label: i === history.length - 1 ? 'Today' : date.toLocaleDateString('en', { weekday: 'short' }),
      long: date.toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' }),
      value: d.xp,
      highlight: i === history.length - 1,
    };
  });
  root.innerHTML = `
    <div class="page">
      <header class="profile-head">
        ${avatar(p.avatar, { size: 96, label: p.name })}
        <div class="profile-head__text">
          <h1><strong>${escapeHtml(p.name)}</strong></h1>
          <p class="muted">Learning Luganda since ${new Date(p.joinedAt).toLocaleDateString('en', { month: 'long', year: 'numeric' })}</p>
        </div>
        ${button({ label: 'Edit', variant: 'secondary', href: '#/settings?section=profile', attrs: 'aria-label="Edit profile"' })}
      </header>

      <h2 class="profile-section">Statistics</h2>
      <ul class="stat-tiles">
        ${tile('flame', st.streak, `day streak${st.longestStreak > st.streak ? ` · best ${st.longestStreak}` : ''}`, 'stat-tile--flame')}
        ${tile('bolt', st.totalXp, 'total XP', 'stat-tile--xp')}
        ${tile('book', st.words, 'words learned')}
        ${tile('check', st.lessons, `lessons · ${st.perfect} perfect`)}
        ${tile('target', st.accuracy === null ? '—' : `${Math.round(st.accuracy * 100)}%`, 'accuracy')}
        ${tile('clock', st.minutes, 'minutes learning')}
        ${tile('stories', st.stories, 'stories read')}
      </ul>

      <section class="card xp-week" aria-labelledby="xp-week-title">
        <header class="xp-week__head">
          <h2 id="xp-week-title">XP this week</h2>
          <span class="muted">${week} XP in 7 days</span>
        </header>
        ${barChart(chartData, { unit: 'XP', caption: 'XP earned each day for the last 7 days', goal: dailyGoal(state).goal })}
      </section>

      <h2 class="profile-section">Achievements</h2>
      ${achievementList(state)}
    </div>`;
}
