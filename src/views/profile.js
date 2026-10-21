/*
 * Profile: who you are and your achievements. Stats and settings join it in
 * the profile, stats and settings issue.
 */
import '../styles/profile.css';
import { store } from '../state/store.js';
import { ACHIEVEMENTS, achievementProgress } from '../state/achievements.js';
import { badge } from '../ui/badge.js';
import { avatar } from '../ui/avatar.js';
import { escapeHtml, progressBar } from '../ui/components.js';

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

export function profileView({ root }) {
  const state = store.get();
  const p = state.profile;
  root.innerHTML = `
    <div class="page">
      <header class="profile-head">
        ${avatar(p.avatar, { size: 96, label: p.name })}
        <div>
          <h1><strong>${escapeHtml(p.name)}</strong></h1>
          <p class="muted">Learning Luganda since ${new Date(p.joinedAt).toLocaleDateString('en', { month: 'long', year: 'numeric' })}</p>
        </div>
      </header>
      <h2 class="profile-section">Achievements</h2>
      ${achievementList(state)}
    </div>`;
}
