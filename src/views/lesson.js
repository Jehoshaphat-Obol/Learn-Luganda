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
import { recordLessonResult } from '../state/lessons.js';
import { lessonCompleteScene, mascot } from '../illustrations/index.js';
import { button, escapeHtml, openModal, progressBar } from '../ui/components.js';
import { icon } from '../ui/icons.js';

const PRAISE = ['Nice!', 'Great job!', 'Correct!', 'Kale!', 'Well done!', 'Excellent!'];

/**
 * Generic runner shared by lessons, practice and checkpoints.
 * @param {{ root: HTMLElement, exercises: object[], title: string, onQuit: Function,
 *   onFinish: (result: object) => void }} options
 */
export function runExercises({ root, exercises, onQuit, onFinish }) {
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
    const { correct, answerText } = current.check();
    locked = true;
    if (correct === null) {
      session.answer(null);
      advance();
      return;
    }
    session.answer(correct);
    phase = 'feedback';
    footer.className = `lesson__footer lesson__footer--${correct ? 'good' : 'bad'}`;
    feedback.innerHTML = correct
      ? `<div class="fb"><span class="fb__icon">${icon('check', { size: 26 })}</span><div><strong>${PRAISE[Math.floor(Math.random() * PRAISE.length)]}</strong>${ex.type === 'translate' && answerText ? `<p class="fb__answer">${escapeHtml(answerText)}</p>` : ''}</div></div>`
      : `<div class="fb"><span class="fb__icon">${icon('cross', { size: 26 })}</span><div><strong>Correct answer:</strong><p class="fb__answer" ${ex.lang === 'lg' ? 'lang="lg"' : ''}>${escapeHtml(answerText ?? '')}</p></div></div>`;
    mainLabel.textContent = 'Continue';
    mainBtn.className = `btn btn--${correct ? 'success' : 'danger'} btn--lg btn--block`;
    mainBtn.disabled = false;
    mainBtn.focus({ preventScroll: true });
    drawProgress();
  }

  function advance() {
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

  show();
  return {
    extraEl: root.querySelector('[data-extra]'),
    cleanup: () => document.removeEventListener('keydown', onKey),
  };
}

/** Shown after a lesson; the XP issue enriches it. */
export function renderComplete(root, { result, onContinue, xp = 0 }) {
  const pct = Math.round(result.accuracy * 100);
  const mins = Math.floor(result.seconds / 60);
  const secs = String(result.seconds % 60).padStart(2, '0');
  root.innerHTML = `
    <div class="complete">
      <div class="complete__art">${lessonCompleteScene({ xp })}</div>
      <h1>${result.perfect ? 'Perfect lesson!' : 'Lesson complete!'}</h1>
      <div class="complete__stats">
        <div class="complete__stat complete__stat--xp"><span>Total XP</span><strong>${icon('bolt', { size: 20 })}${xp}</strong></div>
        <div class="complete__stat complete__stat--acc"><span>${pct >= 90 ? 'Amazing' : pct >= 70 ? 'Good' : 'Accuracy'}</span><strong>${icon('target', { size: 20 })}${pct}%</strong></div>
        <div class="complete__stat complete__stat--time"><span>Time</span><strong>${icon('stories', { size: 20 })}${mins}:${secs}</strong></div>
      </div>
      <div class="complete__actions">${button({ label: 'Continue', size: 'lg', block: true, attrs: 'data-continue' })}</div>
    </div>`;
  const btn = root.querySelector('[data-continue]');
  btn.addEventListener('click', onContinue);
  btn.focus();
}

export function lessonView({ root, params, navigate }) {
  const lesson = course.lessons[params.id];
  const state = store.get();
  if (!lesson || !isLessonUnlocked(state, params.id)) {
    navigate('/learn', { replace: true });
    return undefined;
  }
  const firstTime = !isLessonDone(state, lesson.id);
  const runner = runExercises({
    root,
    exercises: buildLesson(lesson.id, { firstTime }),
    onQuit: () => navigate('/learn'),
    onFinish: (result) => {
      runner.cleanup();
      recordLessonResult(lesson.id, result);
      renderComplete(root, { result, onContinue: () => navigate('/learn') });
    },
  });
  return runner.cleanup;
}
