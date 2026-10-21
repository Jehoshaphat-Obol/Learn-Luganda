/*
 * The learning path: each unit is a banner followed by a winding trail of
 * lesson nodes, grouped by skill, ending in a unit checkpoint. Tapping a
 * node opens a small card to start (or redo) that lesson.
 */
import '../styles/learn.css';
import { course } from '../content/course.js';
import { store } from '../state/store.js';
import { isLessonDone, isLessonUnlocked, isUnitUnlocked, nextLessonId, skillProgress, unitProgress } from '../state/progress.js';
import { dailyGoal } from '../state/xp.js';
import { streakStatus } from '../state/streak.js';
import { dueWordIds } from '../state/review.js';
import { portrait } from '../illustrations/index.js';
import { button, escapeHtml, ring, toast } from '../ui/components.js';
import { icon } from '../ui/icons.js';

// Horizontal offsets (px) that make the trail wind left and right.
const WIND = [0, 44, 72, 44, 0, -44, -72, -44];

function lessonNode(state, lesson, position, current) {
  const done = isLessonDone(state, lesson.id);
  const unlocked = isLessonUnlocked(state, lesson.id);
  const status = done ? 'done' : lesson.id === current ? 'current' : unlocked ? 'open' : 'locked';
  const skill = course.skills[lesson.skill];
  const label = `${skill.title}, lesson ${lesson.index + 1} of ${skill.lessons.length}: ${status === 'locked' ? 'locked' : status === 'done' ? 'completed' : 'start'}`;
  const glyph = status === 'locked' ? 'lock' : status === 'done' ? 'check' : skill.icon ?? 'star';
  return `
    <li class="node-wrap" style="--x:${WIND[position % WIND.length]}px">
      ${status === 'current' ? '<span class="node__bubble" aria-hidden="true">Start</span>' : ''}
      <button class="node node--${status}" type="button" data-lesson="${lesson.id}" aria-label="${escapeHtml(label)}">
        ${icon(glyph, { size: 30 })}
      </button>
    </li>`;
}

function checkpointNode(state, unit, position) {
  const prog = unitProgress(state, unit.id);
  const passed = Boolean(state.lessons[`checkpoint-${unit.id}`]?.completions);
  const status = passed ? 'done' : prog.complete ? 'current' : 'locked';
  return `
    <li class="node-wrap" style="--x:${WIND[position % WIND.length]}px">
      <button class="node node--checkpoint node--${status}" type="button" data-checkpoint="${unit.id}" aria-label="${escapeHtml(`${unit.title} checkpoint${status === 'locked' ? ', locked' : ''}`)}">
        ${icon('trophy', { size: 34 })}
      </button>
    </li>`;
}

function needsReview(state, skill, due) {
  return skillProgress(state, skill.id).complete && skill.lessons.some((l) => l.newWords.some((w) => due.has(w)));
}

function unitSection(state, unit, current) {
  const due = new Set(dueWordIds(state));
  const prog = unitProgress(state, unit.id);
  const open = isUnitUnlocked(state, unit.id);
  let position = 0;
  const skills = unit.skills
    .map((skill) => {
      const sp = skillProgress(state, skill.id);
      const nodes = skill.lessons.map((l) => lessonNode(state, l, position++, current)).join('');
      return `
        <li class="skill${sp.complete ? ' skill--complete' : ''}">
          <h3 class="skill__title"><span>${escapeHtml(skill.title)}</span><span class="skill__count">${sp.done}/${sp.total}</span>${needsReview(state, skill, due) ? `<a class="pill pill--primary skill__review" href="#/practice/session?mode=skill&id=${skill.id}">${icon('target', { size: 14 })}Review</a>` : ''}</h3>
          <ol class="trail">${nodes}</ol>
        </li>`;
    })
    .join('');
  // Cast members stand beside the trail, alternating sides.
  const cast = [unit.character, ...unit.skills.map((s) => s.character).filter(Boolean)];
  return `
    <section class="unit unit--${unit.color}${open ? '' : ' unit--locked'}" aria-labelledby="unit-${unit.id}">
      <header class="unit__banner">
        <div>
          <p class="unit__eyebrow">Unit ${unit.index + 1}</p>
          <h2 id="unit-${unit.id}">${escapeHtml(unit.title)}</h2>
          <p class="unit__desc">${escapeHtml(unit.description)}</p>
        </div>
        <a class="unit__guide" href="#/guidebook/${unit.id}" aria-label="${escapeHtml(unit.title)} guidebook">${icon('book', { size: 22 })}<span>Guidebook</span></a>
        <div class="unit__meter" aria-label="${prog.done} of ${prog.total} lessons complete"><span style="width:${(prog.done / prog.total) * 100}%"></span></div>
      </header>
      <div class="unit__body">
        <div class="unit__cast" aria-hidden="true">${cast.map((id) => `<div class="unit__character">${portrait(id, { expression: prog.complete ? 'happy' : 'neutral' })}</div>`).join('')}</div>
        <ol class="skills">${skills}</ol>
        <ol class="trail trail--checkpoint">${checkpointNode(state, unit, position)}</ol>
      </div>
    </section>`;
}

/** Nudge when a streak would be lost tonight. */
function riskBanner(state) {
  const st = streakStatus(state);
  if (!st.atRisk) return '';
  return `<div class="risk-banner" role="status">
    ${icon('flame', { size: 28 })}
    <p><strong>Your ${st.current} day streak is at risk!</strong> Finish a lesson today to keep it${st.freezes ? ` (you have ${st.freezes} streak freeze${st.freezes > 1 ? 's' : ''})` : ''}.</p>
  </div>`;
}

/** Compact daily goal shown above the path on narrow screens. */
function goalStrip(state) {
  const g = dailyGoal(state);
  return `<a class="goal-strip" href="#/profile">
    ${ring(g.ratio, { size: 40, stroke: 5, content: icon('bolt', { size: 16 }), label: 'Daily goal' })}
    <span><strong>${g.met ? 'Daily goal met!' : 'Daily goal'}</strong> ${Math.min(g.today, g.goal)} / ${g.goal} XP</span>
  </a>`;
}

function sidebar(state) {
  const { goal, today } = dailyGoal(state);
  const streak = streakStatus(state);
  return `
    <aside class="learn__side">
      <div class="card side-card">
        ${ring(today / goal, { size: 64, content: icon('bolt', { size: 26 }), label: 'Daily goal' })}
        <div>
          <h3>Daily goal</h3>
          <p class="muted">${Math.min(today, goal)} / ${goal} XP today</p>
        </div>
      </div>
      <a class="card side-card side-card--link" href="#/streak">
        <span class="side-card__icon${streak.doneToday ? '' : ' is-dim'}">${icon('flame', { size: 34 })}</span>
        <div>
          <h3>${streak.current} day streak</h3>
          <p class="muted">${streak.doneToday ? 'Done for today. Weebale!' : streak.current ? 'Do a lesson to extend it.' : 'Finish a lesson to start one.'}</p>
        </div>
      </a>
    </aside>`;
}

export function learnView({ root, navigate }) {
  const state = store.get();
  const current = nextLessonId(state);

  root.innerHTML = `
    <div class="learn">
      <div class="learn__path">
        ${riskBanner(state)}
        ${goalStrip(state)}
        ${course.units.map((u) => unitSection(state, u, current)).join('')}
        <p class="learn__more caption">More units are on the way. Weebale for learning!</p>
      </div>
      ${sidebar(state)}
    </div>`;

  // Bring the current lesson into view.
  root.querySelector('.node--current')?.scrollIntoView({ block: 'center' });

  let popover = null;
  function closePopover() {
    popover?.remove();
    popover = null;
  }

  root.addEventListener('click', (e) => {
    const cp = e.target.closest('[data-checkpoint]');
    if (cp) {
      if (cp.classList.contains('node--locked')) toast('Finish every lesson in this unit to unlock the checkpoint.');
      else navigate(`/checkpoint/${cp.dataset.checkpoint}`);
      return;
    }
    const node = e.target.closest('[data-lesson]');
    if (!node) {
      if (!e.target.closest('.node-pop')) closePopover();
      return;
    }
    const lesson = course.lessons[node.dataset.lesson];
    if (node.classList.contains('node--locked')) {
      toast('Complete the lessons before this one to unlock it.');
      return;
    }
    closePopover();
    const skill = course.skills[lesson.skill];
    const done = isLessonDone(store.get(), lesson.id);
    popover = document.createElement('div');
    popover.className = 'node-pop';
    popover.setAttribute('role', 'dialog');
    popover.setAttribute('aria-label', skill.title);
    popover.innerHTML = `
      <h3>${escapeHtml(skill.title)}</h3>
      <p>Lesson ${lesson.index + 1} of ${skill.lessons.length}</p>
      ${button({ label: done ? 'Practise again +5 XP' : 'Start +10 XP', block: true, href: `#/lesson/${lesson.id}`, variant: done ? 'secondary' : 'primary' })}`;
    node.closest('.node-wrap').append(popover);
    popover.querySelector('.btn').focus();
  });

  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopover();
  });
}
