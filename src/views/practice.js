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

function storiesNote(state) {
  const list = storyList(state);
  const unread = list.filter((x) => x.unlocked && !x.done).length;
  if (unread) return `${unread} new stor${unread === 1 ? 'y' : 'ies'} to read`;
  return `${list.filter((x) => x.done).length} of ${list.length} read`;
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
        <h1>Nothing to practise yet</h1>
        <p class="muted">Finish your first lesson and the words you learn will show up here for review.</p>
        ${button({ label: 'Start learning', href: '#/learn' })}
      </section>`;
    return;
  }

  const units = course.units.filter((u) => isUnitUnlocked(state, u.id));
  root.innerHTML = `
    <div class="page">
      <header class="page__header">
        <p class="eyebrow">Practice hub</p>
        <h1>Keep words <strong>fresh.</strong></h1>
        <p class="muted">Practice doesn’t cost hearts, and each session earns one back.</p>
      </header>

      <div class="practice-cards">
        <a class="practice-card practice-card--review" href="#/practice/session?mode=review">
          <span class="practice-card__icon">${icon('target', { size: 30 })}</span>
          <span><strong>Review</strong><small>${due.length ? `${due.length} word${due.length === 1 ? '' : 's'} due today` : 'Strengthen your weakest words'}</small></span>
          ${icon('arrow', { size: 22 })}
        </a>
        <a class="practice-card practice-card--mistakes${mistakes.length ? '' : ' is-disabled'}" href="${mistakes.length ? '#/practice/session?mode=mistakes' : '#/practice'}" ${mistakes.length ? '' : 'aria-disabled="true"'}>
          <span class="practice-card__icon">${icon('cross', { size: 26 })}</span>
          <span><strong>Mistakes</strong><small>${mistakes.length ? `${mistakes.length} word${mistakes.length === 1 ? '' : 's'} to fix` : 'No recent mistakes. Nice!'}</small></span>
          ${icon('arrow', { size: 22 })}
        </a>
        <a class="practice-card practice-card--stories" href="#/stories">
          <span class="practice-card__icon">${icon('stories', { size: 26 })}</span>
          <span><strong>Stories</strong><small>${storiesNote(state)}</small></span>
          ${icon('arrow', { size: 22 })}
        </a>
      </div>

      <h2 class="practice-heading">Practise a skill</h2>
      ${units.map((u) => `
        <section class="practice-unit">
          <h3>Unit ${u.index + 1} · ${escapeHtml(u.title)}</h3>
          <ul class="practice-skills">
            ${u.skills.filter((sk) => skillProgress(state, sk.id).done > 0).map((sk) => {
              const words = skillWords(sk.id);
              const st = strength(state, words);
              const dueHere = words.filter((id) => due.includes(id)).length;
              return `<li><a class="practice-skill" href="#/practice/session?mode=skill&id=${sk.id}">
                <span class="practice-skill__icon">${icon(sk.icon ?? 'star', { size: 22 })}</span>
                <span class="practice-skill__body"><strong>${escapeHtml(sk.title)}</strong>${progressBar(st, { label: `${sk.title} strength`, variant: st > 0.6 ? 'success' : 'gold' })}</span>
                ${dueHere ? `<span class="pill pill--primary">${dueHere} due</span>` : ''}
              </a></li>`;
            }).join('') || '<li class="muted">Finish a lesson in this unit to practise it.</li>'}
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
        title: 'Practice complete!',
        subtitle: 'You earned a heart back. Those words will stick better now.',
        onDone: () => navigate('/practice'),
      });
    },
  });
  return runner.cleanup;
}
