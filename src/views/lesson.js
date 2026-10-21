/*
 * The lesson screen: a progress bar, one exercise at a time, and a footer
 * that checks the answer and slides up feedback. Enter checks and
 * continues; number keys pick options.
 */
import '../styles/lesson.css';
import { course, langAttr } from '../content/course.js';
import { buildLesson } from '../lesson/generate.js';
import { createSession } from '../lesson/session.js';
import { RENDERERS } from '../lesson/exercises/index.js';
import { store } from '../state/store.js';
import { isLessonDone, isLessonUnlocked } from '../state/progress.js';
import { finishLesson } from '../state/lessons.js';
import { heartStatus, loseHeart } from '../state/hearts.js';
import { heartGate, stepBack } from './heart-review.js';
import { showRewards } from './rewards.js';
import { mascot } from '../illustrations/index.js';
import { button, escapeHtml, openModal, progressBar } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { play } from '../ui/sound.js';

const QUIT = {
  label: 'Quit lesson',
  title: 'Wait, don’t go!',
  body: 'You’ll lose your progress in this lesson if you quit now.',
  stay: 'Keep learning',
  leave: 'End session',
};

const PRAISE = ['Nice!', 'Great job!', 'Correct!', 'Kale!', 'Well done!', 'Excellent!'];

/**
 * Generic runner shared by lessons, practice and checkpoints.
 * @param {{ root: HTMLElement, exercises: object[], onQuit: Function,
 *   onFinish: (result: object) => void, hearts?: boolean, title?: string,
 *   quitPrompt?: { title: string, body: string, stay: string, leave: string } }} options
 *   With `hearts`, each wrong answer costs a heart, and running out steps back
 *   to a short heart review before the lesson goes on.
 */
export function runExercises({ root, exercises, onQuit, onFinish, hearts = false, title = 'Lesson', quitPrompt = QUIT }) {
  const session = createSession(exercises);
  let current = null; // renderer handle
  let phase = 'answer'; // 'answer' | 'feedback'
  let locked = false;
  let detour = null; // cleanup of a heart review running over the lesson

  root.innerHTML = `
    <div class="lesson">
      <h1 class="visually-hidden">${escapeHtml(title)}</h1>
      <header class="lesson__top">
        <button class="icon-btn" type="button" data-quit aria-label="${escapeHtml(quitPrompt.label)}">${icon('close')}</button>
        <div class="lesson__progress" data-progress></div>
        <div class="lesson__extra" data-extra></div>
      </header>
      <div class="lesson__stage" data-stage></div>
      <footer class="lesson__footer" data-footer>
        <div class="lesson__feedback" data-feedback role="status" aria-live="polite"></div>
        <div class="lesson__actions">${button({ label: 'Check', size: 'lg', block: true, disabled: true, attrs: 'data-main' })}</div>
      </footer>
    </div>`;

  const stage = root.querySelector('[data-stage]');
  const footer = root.querySelector('[data-footer]');
  const feedback = root.querySelector('[data-feedback]');
  const mainBtn = root.querySelector('[data-main]');
  const mainLabel = mainBtn.querySelector('span');
  play('start');
  // A soft tap for picking options and tiles (not the play-audio button).
  stage.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn && !btn.disabled && !btn.matches('[data-play]') && !locked) play('tap');
  });

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
    [...stage.querySelectorAll('button, input, textarea')].find((x) => x.offsetParent !== null && !x.disabled)?.focus({ preventScroll: true });
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
    play(correct ? 'correct' : 'wrong');
    if (!correct && hearts) {
      store.update((st) => loseHeart(st));
      drawHearts(true);
    }
    phase = 'feedback';
    footer.className = `lesson__footer lesson__footer--${correct ? 'good' : 'bad'}`;
    feedback.innerHTML = correct
      ? `<div class="fb"><span class="fb__icon">${icon('check', { size: 26 })}</span><div><strong>${note ? escapeHtml(note) : PRAISE[Math.floor(Math.random() * PRAISE.length)]}</strong>${(ex.type === 'translate' || note) && answerText ? `<p class="fb__answer">${escapeHtml(answerText)}</p>` : ''}</div></div>`
      : `<div class="fb"><span class="fb__icon">${icon('cross', { size: 26 })}</span><div><strong>Correct answer:</strong><p class="fb__answer"${ex.lang ? langAttr(ex.lang) : ''}>${escapeHtml(answerText ?? '')}</p></div></div>`;
    mainLabel.textContent = 'Continue';
    mainBtn.className = `btn btn--${correct ? 'success' : 'danger'} btn--lg btn--block`;
    mainBtn.disabled = false;
    mainBtn.focus({ preventScroll: true });
    drawProgress();
  }

  async function advance() {
    if (hearts && heartStatus(store.get()).count === 0) {
      const ok = await stepBack({
        root,
        lessonEl: root.querySelector('.lesson'),
        missed: Object.keys(session.result().missed),
        seen: session.seenWordIds(),
        onQuit,
        track: (cleanup) => {
          detour = cleanup;
        },
      });
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
      title: quitPrompt.title,
      body: `<p>${escapeHtml(quitPrompt.body)}</p>`,
      art: mascot({ pose: 'sad' }),
      actions: [
        { label: quitPrompt.stay, value: 'stay' },
        { label: quitPrompt.leave, value: 'quit', variant: 'ghost' },
      ],
    });
    if (choice === 'quit') onQuit();
  }
  root.querySelector('[data-quit]').addEventListener('click', quit);

  function onKey(e) {
    if (detour || document.querySelector('.modal-backdrop')) return;
    if (e.target.matches('input, textarea') && e.key !== 'Enter') return;
    // Enter checks, except on buttons that do their own thing (tiles, quit).
    // Picking an option is idempotent, so Enter on a selected option checks.
    if (e.key === 'Enter' && !mainBtn.disabled && (e.target.tagName !== 'BUTTON' || e.target.closest('[role="radio"]'))) {
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
    cleanup: () => {
      detour?.();
      document.removeEventListener('keydown', onKey);
    },
  };
}

export function lessonView({ root, params, query = {}, navigate }) {
  const lesson = course.lessons[params.id];
  const state = store.get();
  if (!lesson || !isLessonUnlocked(state, params.id)) {
    navigate('/learn', { replace: true });
    return undefined;
  }
  const firstTime = !isLessonDone(state, lesson.id);
  // No hearts: warm up with a heart review first, then start.
  if (heartStatus(state).count === 0) return heartGate({ root, navigate, onReady: () => lessonView({ root, params, query, navigate }) });
  const runner = runExercises({
    root,
    hearts: true,
    // `?seed=` replays the same exercises (used by the end-to-end tests).
    exercises: buildLesson(lesson.id, { firstTime, seed: Number(query.seed) || undefined }),
    onQuit: () => navigate('/learn'),
    onFinish: (result) => {
      runner.cleanup();
      const summary = finishLesson(lesson.id, result, { replay: !firstTime });
      showRewards(root, { result, ...summary, onDone: () => navigate('/learn') });
    },
  });
  return runner.cleanup;
}
