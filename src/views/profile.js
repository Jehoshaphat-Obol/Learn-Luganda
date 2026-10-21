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
import { languageName } from '../content/course.js';
import { currentLanguage, t } from '../i18n/index.js';

export function achievementList(state) {
  return `<ul class="achievements">
    ${ACHIEVEMENTS.map((a) => {
      const p = achievementProgress(state, a);
      return `<li class="achievement">
        ${badge({ shape: a.shape, iconName: a.icon, tier: p.tier, size: 64, label: t('profile.badge', { title: a.title, tier: p.tier, max: p.maxTier }) })}
        <div class="achievement__body">
          <h3>${escapeHtml(a.title)} <span class="muted">${escapeHtml(p.tier ? t('profile.level', { tier: p.tier }) : t('profile.locked'))}</span></h3>
          <p class="muted">${escapeHtml(p.next ? a.describe(p.next) : t('profile.allDone'))}</p>
          ${p.next ? `${progressBar(p.ratio, { label: t('profile.progress', { title: a.title }), variant: 'gold' })}<span class="achievement__count">${escapeHtml(t('profile.count', { value: p.value, next: p.next }))}</span>` : ''}
        </div>
      </li>`;
    }).join('')}
  </ul>`;
}

function tile(iconName, value, label, cls = '') {
  return `<li class="stat-tile ${cls}">${icon(iconName, { size: 26 })}<div><strong>${escapeHtml(String(value))}</strong><span>${escapeHtml(label)}</span></div></li>`;
}

export function profileView({ root }) {
  const state = store.get();
  const p = state.profile;
  const st = profileStats(state);
  const history = xpHistory(state, 7);
  const locale = currentLanguage();
  const week = history.reduce((n, d) => n + d.xp, 0);
  const chartData = history.map((d, i) => {
    const date = fromDayKey(d.day);
    return {
      label: i === history.length - 1 ? t('time.today') : date.toLocaleDateString(locale, { weekday: 'short' }),
      long: date.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric' }),
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
          <p class="muted">${escapeHtml(t('profile.since', { language: languageName('target'), date: new Date(p.joinedAt).toLocaleDateString(locale, { month: 'long', year: 'numeric' }) }))}</p>
        </div>
        ${button({ label: t('profile.edit'), variant: 'secondary', href: '#/settings?section=profile', attrs: `aria-label="${escapeHtml(t('profile.editLabel'))}"` })}
      </header>

      <h2 class="profile-section">${escapeHtml(t('profile.stats'))}</h2>
      <ul class="stat-tiles">
        ${tile('flame', st.streak, st.longestStreak > st.streak ? t('profile.streakBest', { best: st.longestStreak }) : t('profile.streak'), 'stat-tile--flame')}
        ${tile('bolt', st.totalXp, t('profile.xp'), 'stat-tile--xp')}
        ${tile('book', st.words, t('profile.words'))}
        ${tile('check', st.lessons, t('profile.lessons', { perfect: st.perfect }))}
        ${tile('target', st.accuracy === null ? '—' : `${Math.round(st.accuracy * 100)}%`, t('profile.accuracy'))}
        ${tile('clock', st.minutes, t('profile.minutes'))}
        ${tile('stories', st.stories, t('profile.stories'))}
      </ul>

      <section class="card xp-week" aria-labelledby="xp-week-title">
        <header class="xp-week__head">
          <h2 id="xp-week-title">${escapeHtml(t('profile.week.title'))}</h2>
          <span class="muted">${escapeHtml(t('profile.week.total', { xp: week }))}</span>
        </header>
        ${barChart(chartData, { unit: t('profile.week.unit'), caption: t('profile.week.caption'), goal: dailyGoal(state).goal })}
      </section>

      <h2 class="profile-section">${escapeHtml(t('profile.achievements'))}</h2>
      ${achievementList(state)}
    </div>`;
}
