/*
 * The learning path: sections of units. Each unit is a banner followed by a
 * winding trail of lesson nodes, grouped by skill, ending in a unit
 * checkpoint. Tapping a node opens a small card to start (or redo) that
 * lesson. Only the current section is drawn open; the others render their
 * units when expanded, so a long course stays light.
 */
import '../styles/learn.css';
import { castMember, course } from '../content/course.js';
import { store } from '../state/store.js';
import { canJumpTo, isCourseComplete, isLessonDone, isLessonSkipped, isLessonUnlocked, isSectionUnlocked, isUnitUnlocked, nextLessonId, sectionProgress, skillProgress, unitProgress } from '../state/progress.js';
import { XP, dailyGoal } from '../state/xp.js';
import { streakStatus } from '../state/streak.js';
import { dueWordIds } from '../state/review.js';
import { storyList } from '../state/stories.js';
import { portrait, prop, PROP_IDS } from '../illustrations/index.js';
import { pick } from '../illustrations/random.js';
import { button, escapeHtml, ring, toast } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { adSlot, mountAds } from '../ads/ads.js';
import { siteLinks } from '../app/site.js';
import { t } from '../i18n/index.js';
import { installCard } from '../app/pwa.js';

// Horizontal offsets (px) that make the trail wind left and right.
const WIND = [0, 44, 72, 44, 0, -44, -72, -44];

function lessonNode(state, lesson, position, current) {
  const done = isLessonDone(state, lesson.id);
  const unlocked = isLessonUnlocked(state, lesson.id);
  const status = done ? 'done' : lesson.id === current ? 'current' : isLessonSkipped(state, lesson.id) ? 'skipped' : unlocked ? 'open' : 'locked';
  const skill = course.skills[lesson.skill];
  const label = t('learn.node.label', { skill: skill.title, number: lesson.index + 1, total: skill.lessons.length, status: t(`learn.node.${{ locked: 'locked', done: 'done', skipped: 'skipped' }[status] ?? 'start'}`) });
  const glyph = status === 'locked' ? 'lock' : status === 'done' ? 'check' : skill.icon ?? 'star';
  return `
    <li class="node-wrap" style="--x:${WIND[position % WIND.length]}px">
      ${status === 'current' ? `<span class="node__bubble" aria-hidden="true">${escapeHtml(t('learn.node.bubble'))}</span>` : ''}
      <button class="node node--${status}" type="button" data-lesson="${lesson.id}" aria-label="${escapeHtml(label)}">
        ${icon(glyph, { size: 30 })}
      </button>
    </li>`;
}

function checkpointNode(state, unit, position) {
  const prog = unitProgress(state, unit.id);
  const passed = Boolean(state.lessons[`checkpoint-${unit.id}`]?.completions);
  const status = passed ? 'done' : prog.passed ? 'current' : 'locked';
  return `
    <li class="node-wrap" style="--x:${WIND[position % WIND.length]}px">
      <button class="node node--checkpoint node--${status}" type="button" data-checkpoint="${unit.id}" aria-label="${escapeHtml(t(status === 'locked' ? 'learn.checkpointLocked' : 'learn.checkpoint', { unit: unit.title }))}">
        ${icon('trophy', { size: 34 })}
      </button>
    </li>`;
}

function needsReview(state, skill, due) {
  return skillProgress(state, skill.id).complete && skill.lessons.some((l) => l.newWords.some((w) => due.has(w)));
}

function unitSection(state, unit, current, due) {
  const prog = unitProgress(state, unit.id);
  const open = isUnitUnlocked(state, unit.id);
  let position = 0;
  const skills = unit.skills
    .map((skill) => {
      const sp = skillProgress(state, skill.id);
      const nodes = skill.lessons.map((l) => lessonNode(state, l, position++, current)).join('');
      return `
        <li class="skill${sp.complete ? ' skill--complete' : ''}">
          <h4 class="skill__title"><span>${escapeHtml(skill.title)}</span><span class="skill__count">${sp.done}/${sp.total}</span>${skill.tip ? `<a class="pill skill__review" href="#/guidebook/${unit.id}?tip=${skill.tip}" aria-label="${escapeHtml(t('learn.tipLabel', { skill: skill.title }))}">${icon('bolt', { size: 14 })}${escapeHtml(t('learn.tip'))}</a>` : ''}${needsReview(state, skill, due) ? `<a class="pill pill--primary skill__review" href="#/practice/session?mode=skill&id=${skill.id}">${icon('target', { size: 14 })}${escapeHtml(t('learn.review'))}</a>` : ''}</h4>
          <ol class="trail">${nodes}</ol>
        </li>`;
    })
    .join('');
  // Cast members stand beside the trail, alternating sides.
  const cast = [unit.character, ...unit.skills.map((s) => s.character).filter(Boolean)].map((id) => castMember(id).look);
  return `
    <section class="unit unit--${unit.color}${open ? '' : ' unit--locked'}" aria-labelledby="unit-${unit.id}">
      <header class="unit__banner">
        <div>
          <p class="unit__eyebrow">${escapeHtml(t('learn.unit', { number: unit.index + 1 }))}</p>
          <h3 id="unit-${unit.id}">${escapeHtml(unit.title)}</h3>
          <p class="unit__desc">${escapeHtml(unit.description)}</p>
        </div>
        <a class="unit__guide" href="#/guidebook/${unit.id}" aria-label="${escapeHtml(t('learn.guidebookLabel', { unit: unit.title }))}">${icon('book', { size: 22 })}<span>${escapeHtml(t('learn.guidebook'))}</span></a>
        <div class="unit__meter" role="progressbar" aria-valuemin="0" aria-valuemax="${prog.total}" aria-valuenow="${prog.done}" aria-label="${escapeHtml(t('learn.unitMeter', { unit: unit.title, done: prog.done, total: prog.total }))}"><span style="width:${(prog.done / prog.total) * 100}%"></span></div>
      </header>
      <div class="unit__body">
        <div class="unit__cast" aria-hidden="true">${cast.map((look) => `<div class="unit__character">${portrait(look, { expression: prog.complete ? pick(['happy', 'wink']) : pick(['neutral', 'neutral', 'happy', 'surprised']) })}</div>`).join('')}<div class="unit__prop">${prop(pick(PROP_IDS))}</div></div>
        <ol class="skills">${skills}</ol>
        <ol class="trail trail--checkpoint">${checkpointNode(state, unit, position)}</ol>
      </div>
    </section>`;
}

/** The section to draw open: the one holding the next lesson, else the furthest open one. */
function openSectionId(state, current) {
  if (current) return course.units.find((u) => u.id === course.lessons[current].unit).section;
  return course.sections.findLast((s) => isSectionUnlocked(state, s.id))?.id ?? course.sections[0].id;
}

function sectionUnits(state, section, current) {
  const due = new Set(dueWordIds(state));
  return section.units.map((u) => unitSection(state, u, current, due)).join('');
}

function courseSection(state, section, current, open) {
  const prog = sectionProgress(state, section.id);
  const unlocked = isSectionUnlocked(state, section.id);
  const status = prog.complete ? t('learn.sectionStatus.complete') : unlocked ? t('learn.sectionStatus.progress', { done: prog.passed, total: prog.total }) : t('learn.sectionStatus.locked');
  const jump = canJumpTo(state, section.id)
    ? button({ label: t('learn.jump', { number: section.index + 1 }), variant: 'secondary', href: `#/jump/${section.id}` })
    : '';
  return `
    <section class="course-section${unlocked ? '' : ' course-section--locked'}" aria-labelledby="section-${section.id}" data-section="${section.id}">
      <header class="course-section__head">
        <p class="course-section__eyebrow">${escapeHtml(section.level ? t('learn.sectionLevel', { number: section.index + 1, level: section.level }) : t('learn.section', { number: section.index + 1 }))}</p>
        <h2 id="section-${section.id}">${escapeHtml(section.title)}</h2>
        <p class="course-section__desc">${escapeHtml(section.description)}</p>
        <div class="course-section__meta">
          <span class="pill">${unlocked ? '' : icon('lock', { size: 14 })}${escapeHtml(status)}</span>
          <span class="caption">${escapeHtml(t('learn.units', { count: section.units.length }))}</span>
          ${jump}
        </div>
      </header>
      <details class="course-section__units"${open ? ' open' : ''}>
        <summary>${escapeHtml(t(open ? 'learn.hideUnits' : 'learn.showUnits'))}</summary>
        <div data-units>${open ? sectionUnits(state, section, current) : ''}</div>
      </details>
    </section>`;
}

/** Nudge when a streak would be lost tonight. */
function riskBanner(state) {
  const st = streakStatus(state);
  if (!st.atRisk) return '';
  return `<div class="risk-banner" role="status">
    ${icon('flame', { size: 28 })}
    <p><strong>${escapeHtml(t('learn.risk.title', { count: st.current }))}</strong> ${escapeHtml(st.freezes ? t('learn.risk.freezes', { count: st.freezes }) : t('learn.risk.body'))}</p>
  </div>`;
}

/** Compact daily goal shown above the path on narrow screens. */
function goalStrip(state) {
  const g = dailyGoal(state);
  return `<a class="goal-strip" href="#/profile">
    ${ring(g.ratio, { size: 40, stroke: 5, content: icon('bolt', { size: 16 }), label: t('learn.goal') })}
    <span><strong>${escapeHtml(t(g.met ? 'learn.goalMet' : 'learn.goal'))}</strong> ${escapeHtml(t('learn.goalXp', { done: Math.min(g.today, g.goal), goal: g.goal }))}</span>
  </a>`;
}

function sidebar(state) {
  const { goal, today } = dailyGoal(state);
  const streak = streakStatus(state);
  const unread = storyList(state).filter((x) => x.unlocked && !x.done).length;
  return `
    <aside class="learn__side">
      <div class="card side-card">
        ${ring(today / goal, { size: 64, content: icon('bolt', { size: 26 }), label: t('learn.goal') })}
        <div>
          <h3>${escapeHtml(t('learn.goal'))}</h3>
          <p class="muted">${escapeHtml(t('learn.goalToday', { done: Math.min(today, goal), goal }))}</p>
        </div>
      </div>
      <a class="card side-card side-card--link" href="#/streak">
        <span class="side-card__icon${streak.doneToday ? '' : ' is-dim'}">${icon('flame', { size: 34 })}</span>
        <div>
          <h3>${escapeHtml(t('stats.streak', { count: streak.current }))}</h3>
          <p class="muted">${escapeHtml(streak.doneToday ? t('learn.streak.done', { thanks: course.phrases.thanks }) : t(streak.current ? 'learn.streak.extend' : 'learn.streak.start'))}</p>
        </div>
      </a>
      <a class="card side-card side-card--link" href="#/stories">
        <span class="side-card__icon">${icon('stories', { size: 34 })}</span>
        <div>
          <h3>${escapeHtml(t('learn.stories'))}</h3>
          <p class="muted">${escapeHtml(unread ? t('learn.storiesNew', { count: unread }) : t('learn.storiesNone'))}</p>
        </div>
      </a>
      ${siteLinks()}
    </aside>`;
}

export function learnView({ root, navigate }) {
  const state = store.get();
  const current = nextLessonId(state);
  const openId = openSectionId(state, current);

  root.innerHTML = `
    <div class="learn">
      <div class="learn__path">
        <h1 class="visually-hidden">${escapeHtml(t('learn.heading'))}</h1>
        ${riskBanner(state)}
        ${installCard()}
        ${goalStrip(state)}
        ${course.sections.map((s) => courseSection(state, s, current, s.id === openId) + (s.id === openId ? adSlot('path') : '')).join('')}
        ${isCourseComplete(state) ? `<p class="learn__more caption"><a href="#/complete">${escapeHtml(t('learn.finished'))}</a></p>` : `<p class="learn__more caption">${escapeHtml(t('learn.end', { units: course.units.length, thanks: course.phrases.thanks }))}</p>`}
      </div>
      ${sidebar(state)}
    </div>`;

  // Bring the current lesson into view.
  root.querySelector('.node--current')?.scrollIntoView({ block: 'center' });

  // Closed sections draw their units the first time they're opened.
  for (const details of root.querySelectorAll('.course-section__units')) {
    details.addEventListener('toggle', () => {
      const section = course.sections.find((s) => s.id === details.closest('[data-section]').dataset.section);
      const holder = details.querySelector('[data-units]');
      if (details.open && !holder.childElementCount) holder.innerHTML = sectionUnits(store.get(), section, nextLessonId(store.get()));
      details.querySelector('summary').textContent = t(details.open ? 'learn.hideUnits' : 'learn.showUnits');
    });
  }

  // One sponsored card, after the section being studied.
  const stopAds = mountAds(root);

  let popover = null;
  function closePopover() {
    popover?.remove();
    popover = null;
  }

  root.addEventListener('click', (e) => {
    const cp = e.target.closest('[data-checkpoint]');
    if (cp) {
      if (cp.classList.contains('node--locked')) toast(t('learn.checkpointToast'));
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
      toast(t('learn.lockedToast'));
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
      <p>${escapeHtml(t('learn.pop.lesson', { number: lesson.index + 1, total: skill.lessons.length }))}</p>
      ${button({ label: done ? t('learn.pop.again', { xp: XP.replay }) : t('learn.pop.start', { xp: XP.lesson }), block: true, href: `#/lesson/${lesson.id}`, variant: done ? 'secondary' : 'primary' })}`;
    node.closest('.node-wrap').append(popover);
    popover.querySelector('.btn').focus();
  });

  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopover();
  });

  return stopAds;
}
