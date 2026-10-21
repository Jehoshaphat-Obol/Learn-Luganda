/*
 * The lesson screen: a progress bar, one exercise at a time, and a footer
 * that checks the answer and slides up feedback. Enter checks and
 * continues; number keys pick options.
 */
import '../styles/lesson.css';
import { course } from '../content/course.js';
import { buildLesson } from '../lesson/generate.js';
import { createSession } from '../lesson/session.js';
import { RENDERERS } from '../lesson/exercises/index.js';
import { store } from '../state/store.js';
import { isLessonDone, isLessonUnlocked } from '../state/progress.js';
import { finishLesson } from '../state/lessons.js';
import { REFILL_COST, formatWait, heartStatus, loseHeart, refillHearts } from '../state/hearts.js';
import { showRewards } from './rewards.js';
import { mascot } from '../illustrations/index.js';
import { button, escapeHtml, openModal, progressBar } from '../ui/components.js';
import { icon } from '../ui/icons.js';

const PRAISE = ['Nice!', 'Great job!', 'Correct!', 'Kale!', 'Well done!', 'Excellent!'];

/**
 * Generic runner shared by lessons, practice and checkpoints.
 * @param {{ root: HTMLElement, exercises: object[], onQuit: Function,
 *   onFinish: (result: object) => void, hearts?: boolean, navigate?: Function }} options
 *   With `hearts`, each wrong answer costs a heart and running out pauses the lesson.
 */
export function runExercises({ root, exercises, onQuit, onFinish, hearts = false, navigate }) {
  const session = createSession(exercises);
  let current = null; // renderer handle
  let phase = 'answer'; // 'answer' | 'feedback'
  let locked = false;

  root.innerHTML = `
    <div class="lesson">
      <header class="lesson__top">
        <button class="icon-btn" type="button" data-quit aria-label="Quit lesson">${icon('close')}</button>
        <div class="lesson__progress" data-progress></div>
        <div class="lesson__extra" data-extra></div>
      </header>
      <main class="lesson__stage" data-stage aria-live="polite"></main>
      <footer class="lesson__footer" data-footer>
        <div class="lesson__feedback" data-feedback></div>
        <div class="lesson__actions">${button({ label: 'Check', size: 'lg', block: true, disabled: true, attrs: 'data-main' })}</div>
      </footer>
    </div>`;

  const stage = root.querySelector('[data-stage]');
  const footer = root.querySelector('[data-footer]');
  const feedback = root.querySelector('[data-feedback]');
  const mainBtn = root.querySelector('[data-main]');
  const mainLabel = mainBtn.querySelector('span');

  function drawHearts(lost = false) {
    if (!hearts) return;
    const { count } = heartStatus(store.get());
    root.querySelector('[data-extra]').innerHTML = `<span class="lesson__hearts${lost ? ' is-lost' : ''}" aria-label="${count} hearts left">${icon('heart', { size: 26 })}<span>${count}</span></span>`;
  }

  function drawProgress() {
    root.querySelector('[data-progress]').innerHTML = progressBar(session.progress, { label: 'Lesson progress' });
  }

  const api = {
    setReady(ready, { hideCheck = false } = {}) {
      mainBtn.disabled = !ready;
      footer.classList.toggle('is-hidden', hideCheck);
    },
    locked: () => locked,
    complete(correct) {
      session.answer(correct);
      advance();
    },
    miss(wordIds) {
      session.noteMiss(wordIds);
    },
  };

  function show() {
    const ex = session.current;
    phase = 'answer';
    locked = false;
    footer.className = 'lesson__footer';
    feedback.innerHTML = '';
    mainLabel.textContent = ex.type === 'intro' ? 'Continue' : 'Check';
    mainBtn.className = 'btn btn--primary btn--lg btn--block';
    stage.innerHTML = '<div class="lesson__exercise" data-ex></div>';
    current = RENDERERS[ex.type](ex, stage.querySelector('[data-ex]'), api);
    drawProgress();
    stage.querySelector('button, input, textarea')?.focus({ preventScroll: true });
  }

  function check() {
    const ex = session.current;
    const { correct, answerText, note } = current.check();
    locked = true;
    if (correct === null) {
      session.answer(null);
      advance();
      return;
    }
    session.answer(correct);
    if (!correct && hearts) {
      store.update((st) => loseHeart(st));
      drawHearts(true);
    }
    phase = 'feedback';
    footer.className = `lesson__footer lesson__footer--${correct ? 'good' : 'bad'}`;
    feedback.innerHTML = correct
      ? `<div class="fb"><span class="fb__icon">${icon('check', { size: 26 })}</span><div><strong>${note ? escapeHtml(note) : PRAISE[Math.floor(Math.random() * PRAISE.length)]}</strong>${(ex.type === 'translate' || note) && answerText ? `<p class="fb__answer">${escapeHtml(answerText)}</p>` : ''}</div></div>`
      : `<div class="fb"><span class="fb__icon">${icon('cross', { size: 26 })}</span><div><strong>Correct answer:</strong><p class="fb__answer" ${ex.lang === 'lg' ? 'lang="lg"' : ''}>${escapeHtml(answerText ?? '')}</p></div></div>`;
    mainLabel.textContent = 'Continue';
    mainBtn.className = `btn btn--${correct ? 'success' : 'danger'} btn--lg btn--block`;
    mainBtn.disabled = false;
    mainBtn.focus({ preventScroll: true });
    drawProgress();
  }

  async function advance() {
    if (hearts && heartStatus(store.get()).count === 0) {
      const ok = await outOfHearts({ navigate, onQuit });
      if (!ok) return;
      drawHearts();
    }
    session.next();
    if (session.done) {
      onFinish(session.result());
      return;
    }
    show();
  }

  mainBtn.addEventListener('click', () => {
    if (mainBtn.disabled) return;
    if (phase === 'answer') check();
    else advance();
  });

  async function quit() {
    const choice = await openModal({
      title: 'Wait, don’t go!',
      body: '<p>You’ll lose your progress in this lesson if you quit now.</p>',
      art: mascot({ pose: 'sad' }),
      actions: [
        { label: 'Keep learning', value: 'stay' },
        { label: 'End session', value: 'quit', variant: 'ghost' },
      ],
    });
    if (choice === 'quit') onQuit();
  }
  root.querySelector('[data-quit]').addEventListener('click', quit);

  function onKey(e) {
    if (document.querySelector('.modal-backdrop')) return;
    if (e.target.matches('input, textarea') && e.key !== 'Enter') return;
    if (e.key === 'Enter' && !mainBtn.disabled && e.target.tagName !== 'BUTTON') {
      e.preventDefault();
      mainBtn.click();
      return;
    }
    if (phase === 'answer' && !e.target.matches('input, textarea') && current.keydown?.(e)) e.preventDefault();
  }
  document.addEventListener('keydown', onKey);

  drawHearts();
  show();
  return {
    extraEl: root.querySelector('[data-extra]'),
    cleanup: () => document.removeEventListener('keydown', onKey),
  };
}

/** Out-of-hearts choice. Resolves true when refilled and the lesson can go on. */
async function outOfHearts({ navigate, onQuit }) {
  const st = store.get();
  const status = heartStatus(st);
  const canRefill = st.gems >= REFILL_COST;
  const choice = await openModal({
    title: 'You’re out of hearts',
    body: `<p>Your next heart arrives in ${formatWait(status.nextAt - Date.now())}.</p><p>Practise words you know to earn hearts back${canRefill ? `, or refill now for ${REFILL_COST} gems` : ''}.</p>`,
    art: mascot({ pose: 'sad' }),
    dismissible: false,
    actions: [
      ...(canRefill ? [{ label: `Refill for ${REFILL_COST} gems`, value: 'refill', variant: 'blue' }] : []),
      { label: 'Practise to earn hearts', value: 'practice', variant: canRefill ? 'secondary' : 'primary' },
      { label: 'End lesson', value: 'quit', variant: 'ghost' },
    ],
  });
  if (choice === 'refill') {
    store.update((s) => {
      refillHearts(s);
    });
    return true;
  }
  if (choice === 'practice') navigate?.('/practice');
  else onQuit();
  return false;
}

function noHeartsScreen(root) {
  const status = heartStatus(store.get());
  const canRefill = store.get().gems >= REFILL_COST;
  root.innerHTML = `
    <section class="empty-state">
      <div class="empty-state__art">${mascot({ pose: 'sad' })}</div>
      <h1>Out of hearts</h1>
      <p class="muted">Your next heart arrives in ${formatWait(status.nextAt - Date.now())}. Practise to earn hearts now${canRefill ? `, or refill for ${REFILL_COST} gems` : ''}.</p>
      ${canRefill ? button({ label: `Refill for ${REFILL_COST} gems`, variant: 'blue', size: 'lg', attrs: 'data-refill' }) : ''}
      ${button({ label: 'Practise to earn hearts', href: '#/practice', variant: canRefill ? 'secondary' : 'primary' })}
      ${button({ label: 'Back to the path', href: '#/learn', variant: 'ghost' })}
    </section>`;
}

export function lessonView({ root, params, navigate }) {
  const lesson = course.lessons[params.id];
  const state = store.get();
  if (!lesson || !isLessonUnlocked(state, params.id)) {
    navigate('/learn', { replace: true });
    return undefined;
  }
  const firstTime = !isLessonDone(state, lesson.id);
  if (heartStatus(state).count === 0) {
    noHeartsScreen(root);
    root.querySelector('[data-refill]')?.addEventListener('click', () => {
      store.update((s) => {
        refillHearts(s);
      });
      lessonView({ root, params, navigate });
    });
    return undefined;
  }
  const runner = runExercises({
    root,
    hearts: true,
    navigate,
    exercises: buildLesson(lesson.id, { firstTime }),
    onQuit: () => navigate('/learn'),
    onFinish: (result) => {
      runner.cleanup();
      const summary = finishLesson(lesson.id, result, { replay: !firstTime });
      showRewards(root, { result, ...summary, onDone: () => navigate('/learn') });
    },
  });
  return runner.cleanup;
}
