/*
 * Practice hub and practice sessions. Practice never costs hearts and earns
 * one back, so it's the way out when hearts run low.
 */
import '../styles/practice.css';
import { course } from '../content/course.js';
import { store } from '../state/store.js';
import { dueWordIds, strength, weakestWordIds } from '../state/review.js';
import { isUnitUnlocked, learnedWordIds, skillProgress } from '../state/progress.js';
import { finishLesson } from '../state/lessons.js';
import { XP } from '../state/xp.js';
import { buildPractice } from '../lesson/practice.js';
import { storyList } from '../state/stories.js';
import { runExercises } from './lesson.js';
import { showRewards } from './rewards.js';
import { emptyStateArt } from '../illustrations/index.js';
import { button, escapeHtml, progressBar } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { t, tHtml } from '../i18n/index.js';

function storiesNote(state) {
  const list = storyList(state);
  const unread = list.filter((x) => x.unlocked && !x.done).length;
  if (unread) return t('practice.storiesNew', { count: unread });
  return t('practice.storiesRead', { done: list.filter((x) => x.done).length, total: list.length });
}

function skillWords(skillId) {
  return course.skills[skillId].lessons.flatMap((l) => l.newWords);
}

export function practiceHubView({ root }) {
  const state = store.get();
  const learned = learnedWordIds(state);
  const due = dueWordIds(state).filter((id) => course.words[id]);
  const mistakes = state.mistakes.filter((id) => course.words[id]);

  if (!learned.length) {
    root.innerHTML = `
      <section class="empty-state">
        <div class="empty-state__art">${emptyStateArt('empty')}</div>
        <h1>${escapeHtml(t('practice.empty.title'))}</h1>
        <p class="muted">${escapeHtml(t('practice.empty.body'))}</p>
        ${button({ label: t('ui.startLearning'), href: '#/learn' })}
      </section>`;
    return;
  }

  const units = course.units.filter((u) => isUnitUnlocked(state, u.id));
  root.innerHTML = `
    <div class="page">
      <header class="page__header">
        <p class="eyebrow">${escapeHtml(t('practice.eyebrow'))}</p>
        <h1>${tHtml('practice.title')}</h1>
        <p class="muted">${escapeHtml(t('practice.lead'))}</p>
      </header>

      <div class="practice-cards">
        <a class="practice-card practice-card--review" href="#/practice/session?mode=review">
          <span class="practice-card__icon">${icon('target', { size: 30 })}</span>
          <span><strong>${escapeHtml(t('practice.review'))}</strong><small>${escapeHtml(due.length ? t('practice.reviewDue', { count: due.length }) : t('practice.reviewWeak'))}</small></span>
          ${icon('arrow', { size: 22 })}
        </a>
        <a class="practice-card practice-card--mistakes${mistakes.length ? '' : ' is-disabled'}" href="${mistakes.length ? '#/practice/session?mode=mistakes' : '#/practice'}" ${mistakes.length ? '' : 'aria-disabled="true"'}>
          <span class="practice-card__icon">${icon('cross', { size: 26 })}</span>
          <span><strong>${escapeHtml(t('practice.mistakes'))}</strong><small>${escapeHtml(mistakes.length ? t('practice.mistakesCount', { count: mistakes.length }) : t('practice.noMistakes'))}</small></span>
          ${icon('arrow', { size: 22 })}
        </a>
        <a class="practice-card practice-card--stories" href="#/stories">
          <span class="practice-card__icon">${icon('stories', { size: 26 })}</span>
          <span><strong>${escapeHtml(t('practice.stories'))}</strong><small>${escapeHtml(storiesNote(state))}</small></span>
          ${icon('arrow', { size: 22 })}
        </a>
      </div>

      <h2 class="practice-heading">${escapeHtml(t('practice.skills'))}</h2>
      ${units.map((u) => `
        <section class="practice-unit">
          <h3>${escapeHtml(t('practice.unit', { number: u.index + 1, title: u.title }))}</h3>
          <ul class="practice-skills">
            ${u.skills.filter((sk) => skillProgress(state, sk.id).done > 0).map((sk) => {
              const words = skillWords(sk.id);
              const st = strength(state, words);
              const dueHere = words.filter((id) => due.includes(id)).length;
              return `<li><a class="practice-skill" href="#/practice/session?mode=skill&id=${sk.id}">
                <span class="practice-skill__icon">${icon(sk.icon ?? 'star', { size: 22 })}</span>
                <span class="practice-skill__body"><strong>${escapeHtml(sk.title)}</strong>${progressBar(st, { label: t('practice.strength', { skill: sk.title }), variant: st > 0.6 ? 'success' : 'gold' })}</span>
                ${dueHere ? `<span class="pill pill--primary">${escapeHtml(t('practice.due', { count: dueHere }))}</span>` : ''}
              </a></li>`;
            }).join('') || `<li class="muted">${escapeHtml(t('practice.locked'))}</li>`}
          </ul>
        </section>`).join('')}
    </div>`;
}

function pickWords(state, query) {
  const learned = learnedWordIds(state);
  if (query.mode === 'mistakes') return state.mistakes.filter((id) => course.words[id]);
  if (query.mode === 'skill' && course.skills[query.id]) {
    const words = skillWords(query.id).filter((id) => learned.includes(id));
    const due = new Set(dueWordIds(state));
    return [...words.filter((id) => due.has(id)), ...words.filter((id) => !due.has(id))];
  }
  // Review: due words first, then the weakest of the rest.
  const due = dueWordIds(state).filter((id) => learned.includes(id));
  const weak = weakestWordIds(state).filter((id) => learned.includes(id) && !due.includes(id));
  const fallback = learned.filter((id) => !due.includes(id) && !weak.includes(id));
  return [...due, ...weak, ...fallback];
}

export function practiceSessionView({ root, query, navigate }) {
  const state = store.get();
  const words = pickWords(state, query);
  const exercises = buildPractice(words, { knownIds: learnedWordIds(state) });
  if (!exercises.length) {
    navigate('/practice', { replace: true });
    return undefined;
  }
  const runner = runExercises({
    root,
    exercises,
    onQuit: () => navigate('/practice'),
    onFinish: (result) => {
      runner.cleanup();
      const summary = finishLesson(null, result, { base: XP.practice, practice: true });
      showRewards(root, {
        result,
        ...summary,
        title: t('practice.done.title'),
        subtitle: t('practice.done.subtitle'),
        onDone: () => navigate('/practice'),
      });
    },
  });
  return runner.cleanup;
}
