/*
 * Stories: a hub listing every story, and the story player. Lines appear
 * one at a time (tap a line for the English); questions along the way
 * check understanding. Stories never cost hearts.
 */
import '../styles/lesson.css';
import '../styles/stories.css';
import { course } from '../content/course.js';
import { storyById } from '../content/stories.js';
import { store } from '../state/store.js';
import { storyKey, storyList, isStoryUnlocked, isStoryDone } from '../state/stories.js';
import { finishLesson } from '../state/lessons.js';
import { XP } from '../state/xp.js';
import { showRewards } from './rewards.js';
import { CAST, portrait } from '../illustrations/index.js';
import { avatar } from '../ui/avatar.js';
import { button, escapeHtml, progressBar } from '../ui/components.js';
import { icon } from '../ui/icons.js';

const CAST_COLORS = ['vermillion', 'butter', 'sky', 'sage'];

/** The story's cast as a row of overlapping avatars. */
export function castRow(ids, size) {
  return `<span class="cast-row">${ids.map((id, i) => avatar({ character: id, color: CAST_COLORS[i % CAST_COLORS.length] }, { size, label: CAST[id].name })).join('')}</span>`;
}

/** Escapes text, then turns **word** into bold Luganda. */
export function richText(text) {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong lang="lg">$1</strong>');
}

function unlockHint(story) {
  const lesson = course.lessons[story.unlockAfter];
  const skill = course.skills[lesson.skill];
  return `Finish ${skill.title}, lesson ${lesson.index + 1}`;
}

export function storyCard({ story, unlocked, done }) {
  const status = done ? `${icon('check', { size: 16 })} Read` : unlocked ? 'New' : `${icon('lock', { size: 14 })} ${escapeHtml(unlockHint(story))}`;
  const inner = `
    <span class="story-card__art" aria-hidden="true">${castRow(story.cast, 56)}</span>
    <span class="story-card__text">
      <strong>${escapeHtml(story.title)}</strong>
      <small>${escapeHtml(story.summary)}</small>
      <span class="story-card__status${done ? ' is-done' : unlocked ? ' is-new' : ''}">${status}</span>
    </span>`;
  return unlocked
    ? `<a class="story-card" href="#/story/${story.id}">${inner}</a>`
    : `<div class="story-card is-locked" aria-disabled="true">${inner}</div>`;
}

export function storiesView({ root }) {
  const list = storyList(store.get());
  root.innerHTML = `
    <div class="page">
      <header class="page__header">
        <p class="eyebrow">Stories</p>
        <h1>Read <strong>with the cast.</strong></h1>
        <p class="muted">Short conversations that use what you’ve learned. Tap any line to see it in English. Stories never cost hearts.</p>
      </header>
      ${course.units
        .map((u) => {
          const items = list.filter((x) => x.story.unit === u.id);
          if (!items.length) return '';
          return `<section class="stories-unit">
            <h2 class="stories-unit__title">Unit ${u.index + 1}: ${escapeHtml(u.title)}</h2>
            <div class="story-list">${items.map(storyCard).join('')}</div>
          </section>`;
        })
        .join('')}
    </div>`;
}

function lineHtml([speaker, lg, en], gloss, side) {
  const glossHtml = gloss ? `<span class="story-line__gloss">${Object.entries(gloss).map(([w, m]) => `<span><strong lang="lg">${escapeHtml(w)}</strong> ${escapeHtml(m)}</span>`).join('')}</span>` : '';
  return `<div class="story-line story-line--${side}">
    <span class="story-line__who">${portrait(speaker, { shape: 'circle', expression: 'happy', label: CAST[speaker].name })}</span>
    <button class="story-line__bubble" type="button" aria-expanded="false">
      <span class="story-line__name">${escapeHtml(CAST[speaker].name)}</span>
      <span class="story-line__lg" lang="lg">${escapeHtml(lg)}</span>
      <span class="story-line__en">${escapeHtml(en)}</span>
      ${glossHtml}
    </button>
  </div>`;
}

function questionHtml(step, n) {
  return `<div class="story-q" role="group" aria-labelledby="story-q-${n}">
    <p class="story-q__prompt" id="story-q-${n}">${icon('target', { size: 18 })} ${escapeHtml(step.question)}</p>
    <div class="story-q__options">
      ${step.options.map((o, i) => `<button class="choice" type="button" data-opt="${i}"${step.lang ? ` lang="${step.lang}"` : ''}><span class="choice__key">${i + 1}</span><span>${escapeHtml(o)}</span></button>`).join('')}
    </div>
  </div>`;
}

export function storyView({ root, params, navigate }) {
  const story = storyById[params.id];
  const state = store.get();
  if (!story || !isStoryUnlocked(state, story)) {
    navigate('/stories', { replace: true });
    return undefined;
  }
  const replay = isStoryDone(state, story);
  const started = Date.now();
  const sides = Object.fromEntries(story.cast.map((id, i) => [id, i % 2 ? 'right' : 'left']));
  let step = -1;
  let waiting = false; // a question is open
  let questions = 0;
  let firstTry = 0;
  let wrong = 0;
  let missedThis = false;

  root.innerHTML = `
    <div class="lesson story">
      <header class="lesson__top">
        <button class="icon-btn" type="button" data-quit aria-label="Close story">${icon('close')}</button>
        <div class="lesson__progress" data-progress></div>
      </header>
      <main class="lesson__stage">
        <div class="story__script" data-script aria-live="polite">
          <header class="story__title">
            <div class="story__cast" aria-hidden="true">${castRow(story.cast, 88)}</div>
            <h1>${escapeHtml(story.title)}</h1>
            <p class="muted">${escapeHtml(story.summary)}</p>
          </header>
        </div>
      </main>
      <footer class="lesson__footer">
        <div class="lesson__actions">${button({ label: 'Start', size: 'lg', block: true, attrs: 'data-next' })}</div>
      </footer>
    </div>`;

  const script = root.querySelector('[data-script]');
  const next = root.querySelector('[data-next]');
  const nextLabel = next.querySelector('span');

  function drawProgress() {
    root.querySelector('[data-progress]').innerHTML = progressBar((step + 1) / story.steps.length, { label: 'Story progress' });
  }

  function finish() {
    const seconds = Math.round((Date.now() - started) / 1000);
    const result = { correct: firstTry, wrong, firstTry, accuracy: questions ? firstTry / questions : 1, perfect: wrong === 0, seconds, missed: {}, wordIds: [] };
    const summary = finishLesson(storyKey(story.id), result, { base: replay ? XP.replay : XP.story });
    showRewards(root, {
      result,
      ...summary,
      title: 'Story complete!',
      subtitle: `You finished “${story.title}”. Weebale nnyo!`,
      onDone: () => navigate('/stories'),
    });
  }

  function advance() {
    if (waiting) return;
    step += 1;
    if (step >= story.steps.length) {
      finish();
      return;
    }
    nextLabel.textContent = 'Continue';
    const s = story.steps[step];
    const el = document.createElement('div');
    el.className = 'story__step';
    if (s.line) el.innerHTML = lineHtml(s.line, s.gloss, sides[s.line[0]] ?? 'left');
    else {
      el.innerHTML = questionHtml(s, step);
      waiting = true;
      questions += 1;
      missedThis = false;
      next.disabled = true;
    }
    script.append(el);
    drawProgress();
    el.scrollIntoView({ block: 'end', behavior: 'smooth' });
    if (s.question) el.querySelector('[data-opt]').focus();
    else next.focus();
  }

  function choose(btn) {
    const s = story.steps[step];
    if (!waiting || btn.disabled) return;
    const i = Number(btn.dataset.opt);
    if (i === s.answer) {
      btn.classList.add('is-correct');
      btn.closest('.story-q').querySelectorAll('[data-opt]').forEach((b) => (b.disabled = true));
      if (!missedThis) firstTry += 1;
      waiting = false;
      next.disabled = false;
      next.focus();
    } else {
      btn.classList.add('is-wrong');
      btn.disabled = true;
      missedThis = true;
      wrong += 1;
    }
  }

  function onClick(e) {
    if (e.target.closest('[data-quit]')) navigate('/stories');
    else if (e.target.closest('[data-next]')) advance();
    else if (e.target.closest('[data-opt]')) choose(e.target.closest('[data-opt]'));
    else {
      const bubble = e.target.closest('.story-line__bubble');
      if (bubble) bubble.setAttribute('aria-expanded', String(bubble.getAttribute('aria-expanded') !== 'true'));
    }
  }

  function onKey(e) {
    if (waiting && /^[1-9]$/.test(e.key)) {
      const btn = script.querySelector(`.story__step:last-child [data-opt="${Number(e.key) - 1}"]`);
      if (btn) choose(btn);
    }
  }

  root.addEventListener('click', onClick);
  document.addEventListener('keydown', onKey);
  drawProgress();
  next.focus();
  return () => document.removeEventListener('keydown', onKey);
}
