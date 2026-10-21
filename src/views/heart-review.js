/*
 * Heart review: what happens instead of a lockout when hearts run out. The
 * learner steps back to a short review of earlier words (no hearts at stake),
 * finishing it fills their hearts, and then they go on. Gems are an optional
 * shortcut.
 */
import { course } from '../content/course.js';
import { store } from '../state/store.js';
import { learnedWordIds } from '../state/progress.js';
import { HEART_REVIEW_WORDS, MAX_HEARTS, REFILL_COST, finishHeartReview, heartReviewWordIds, refillHearts } from '../state/hearts.js';
import { buildPractice } from '../lesson/practice.js';
import { quitText, runExercises } from './lesson.js';
import { mascot } from '../illustrations/index.js';
import { button, escapeHtml, openModal } from '../ui/components.js';
import { play } from '../ui/sound.js';
import { t } from '../i18n/index.js';

/** Words to step back to, given what this session missed and showed. */
export function reviewWords({ missed = [], seen = [] } = {}) {
  const state = store.get();
  return heartReviewWordIds(state, { missed, seen, learned: learnedWordIds(state), exists: (id) => Boolean(course.words[id]) });
}

const refillAction = (key) => (store.get().gems >= REFILL_COST ? [{ label: t(key, { cost: REFILL_COST }), value: 'refill', variant: 'secondary' }] : []);

export function refillWithGems() {
  store.update((s) => {
    refillHearts(s);
  });
}

/**
 * Runs a heart review in `root`. Hearts fill up when it's finished.
 * @returns {Function} cleanup
 */
export function runHeartReview({ root, words, onDone, onQuit }) {
  const state = store.get();
  const exercises = buildPractice(words, { knownIds: [...learnedWordIds(state), ...words], size: HEART_REVIEW_WORDS });
  if (!exercises.length) {
    // Nothing to look back at yet (a brand new learner): just carry on.
    store.update((s) => {
      s.hearts = { count: MAX_HEARTS, updatedAt: Date.now() };
    });
    onDone();
    return () => {};
  }
  const runner = runExercises({
    root,
    exercises,
    title: t('heartReview.session'),
    quitPrompt: quitText('heartReview.quit'),
    onQuit,
    onFinish: (result) => {
      runner.cleanup();
      store.update((s) => finishHeartReview(s, result));
      play('reward');
      onDone(result);
    },
  });
  return runner.cleanup;
}

/** The "hearts refilled" card shown before going back to the lesson. */
export function celebrateRefill(next) {
  return openModal({
    title: t('heartReview.done.title'),
    body: `<p>${escapeHtml(t('heartReview.done.body'))}</p>`,
    art: mascot({ pose: 'cheering' }),
    dismissible: false,
    actions: [{ label: next, value: 'go' }],
  });
}

/**
 * Mid-lesson: the last heart just went. Offers the step back (or gems), runs
 * the review over the lesson, and resolves true once hearts are full again.
 * `track` receives the review's cleanup so the lesson can tidy it up.
 */
export async function stepBack({ root, lessonEl, missed, seen, onQuit, track }) {
  const words = reviewWords({ missed, seen });
  const choice = await openModal({
    title: t('heartReview.out.title'),
    body: `<p>${escapeHtml(t('heartReview.out.body'))}</p>`,
    art: mascot({ pose: 'thinking' }),
    dismissible: false,
    actions: [
      { label: t('heartReview.out.review'), value: 'review' },
      ...refillAction('heartReview.out.refill'),
      { label: t('heartReview.out.quit'), value: 'quit', variant: 'ghost' },
    ],
  });
  if (choice === 'refill') {
    refillWithGems();
    return true;
  }
  if (choice !== 'review') {
    onQuit();
    return false;
  }
  const layer = document.createElement('div');
  layer.dataset.heartReview = '';
  lessonEl.hidden = true;
  root.append(layer);
  const done = await new Promise((resolve) => {
    track(runHeartReview({ root: layer, words, onDone: () => resolve(true), onQuit: () => resolve(false) }));
  });
  track(null);
  layer.remove();
  if (!done) {
    onQuit();
    return false;
  }
  lessonEl.hidden = false;
  await celebrateRefill(t('heartReview.done.next'));
  return true;
}

/**
 * Before a lesson or checkpoint with no hearts: a warm-up review, then
 * `onReady()` starts it. Returns a cleanup for the router.
 */
export function heartGate({ root, navigate, onReady }) {
  const words = reviewWords();
  let cleanup = () => {};
  if (!words.length) {
    store.update((s) => {
      s.hearts = { count: MAX_HEARTS, updatedAt: Date.now() };
    });
    cleanup = onReady() ?? cleanup;
    return () => cleanup();
  }
  const canRefill = store.get().gems >= REFILL_COST;
  root.innerHTML = `
    <section class="empty-state">
      <div class="empty-state__art">${mascot({ pose: 'thinking' })}</div>
      <h1>${escapeHtml(t('heartReview.gate.title'))}</h1>
      <p class="muted">${escapeHtml(t('heartReview.gate.body'))}</p>
      ${button({ label: t('heartReview.gate.review'), size: 'lg', attrs: 'data-review' })}
      ${canRefill ? button({ label: t('heartReview.gate.refill', { cost: REFILL_COST }), variant: 'secondary', attrs: 'data-refill' }) : ''}
      ${button({ label: t('heartReview.gate.back'), href: '#/learn', variant: 'ghost' })}
    </section>`;
  root.querySelector('[data-refill]')?.addEventListener('click', () => {
    refillWithGems();
    cleanup = onReady() ?? cleanup;
  });
  root.querySelector('[data-review]').addEventListener('click', () => {
    cleanup = runHeartReview({
      root,
      words,
      onQuit: () => navigate('/learn'),
      onDone: async () => {
        await celebrateRefill(t('heartReview.done.start'));
        cleanup = onReady() ?? (() => {});
      },
    });
  });
  return () => cleanup();
}
