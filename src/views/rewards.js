/*
 * The screens after a lesson: the summary with XP, then any milestones the
 * lesson unlocked (daily goal met, later the streak). Each screen has one
 * Continue button; the last one calls `onDone`.
 */
import { lessonCompleteScene, mascot, streakScene } from '../illustrations/index.js';
import { nextMilestone } from '../state/streak.js';
import { button, escapeHtml, ring } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { confetti } from '../ui/confetti.js';
import { play } from '../ui/sound.js';
import { reducedMotion } from '../ui/motion.js';
import { badge } from '../ui/badge.js';
import { ACHIEVEMENTS } from '../state/achievements.js';
import { adSlot, mountAds } from '../ads/ads.js';

/** Extra screens registered by other features (e.g. streaks). */
const extraSteps = [];
export function addRewardStep(step) {
  extraSteps.push(step);
}

function countUp(el, to, ms = 700) {
  if (reducedMotion()) {
    el.textContent = to;
    return;
  }
  const start = performance.now();
  const tick = (t) => {
    const k = Math.min(1, (t - start) / ms);
    el.textContent = Math.round(to * k);
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function summaryScreen({ result, xp, gems = 0, title, subtitle }) {
  const pct = Math.round(result.accuracy * 100);
  const mins = Math.floor(result.seconds / 60);
  const secs = String(result.seconds % 60).padStart(2, '0');
  return {
    html: `
      <div class="complete__art">${lessonCompleteScene({ xp: xp.total })}</div>
      <h1>${escapeHtml(title ?? (result.perfect ? 'Perfect lesson!' : 'Lesson complete!'))}</h1>
      <p class="complete__sub muted">${escapeHtml(subtitle ?? (result.perfect ? 'Not a single mistake. Weebale nnyo!' : 'Weebale! Every lesson makes the words stick.'))}</p>
      <div class="complete__stats">
        <div class="complete__stat complete__stat--xp"><span>Total XP</span><strong>${icon('bolt', { size: 20 })}<b data-count="${xp.total}">0</b></strong></div>
        <div class="complete__stat complete__stat--acc"><span>${pct === 100 ? 'Perfect' : pct >= 80 ? 'Amazing' : pct >= 60 ? 'Good' : 'Accuracy'}</span><strong>${icon('target', { size: 20 })}${pct}%</strong></div>
        <div class="complete__stat complete__stat--time"><span>Time</span><strong>${icon('clock', { size: 20 })}${mins}:${secs}</strong></div>
      </div>
      <ul class="complete__parts">${xp.parts.map((p) => `<li><span>${escapeHtml(p.label)}</span><span>+${p.xp} XP</span></li>`).join('')}${gems ? `<li class="complete__gems"><span>${icon('gem', { size: 16 })} Gems</span><span>+${gems}</span></li>` : ''}</ul>
      ${adSlot('complete')}`,
    after(root) {
      // Never ask for consent here; the Continue button is right below.
      mountAds(root, { ask: false });
      root.querySelectorAll('[data-count]').forEach((el) => countUp(el, Number(el.dataset.count)));
      play('complete');
      confetti();
    },
  };
}

function goalScreen({ goalAfter }) {
  return {
    html: `
      <div class="complete__art complete__art--small">${mascot({ pose: 'cheering' })}</div>
      <h1>Daily goal met!</h1>
      <div class="complete__ring">${ring(1, { size: 140, stroke: 12, content: `<strong class="complete__ring-num">${goalAfter.today}</strong><span>XP today</span>`, label: 'Daily goal' })}</div>
      <p class="complete__sub muted">You reached your ${goalAfter.goal} XP goal. Come back tomorrow to keep learning.</p>`,
    after: () => {
      play('unlock');
      confetti();
    },
  };
}

function streakScreen({ streak }) {
  const next = nextMilestone(streak.current);
  const message = streak.milestone
    ? `A ${streak.milestone} day milestone. Amazing commitment!`
    : streak.current === 1
      ? 'Your streak starts today. Come back tomorrow to grow it.'
      : `You’ve learned ${streak.current} days in a row.${next ? ` ${next - streak.current} more to reach ${next}!` : ''}`;
  return {
    html: `
      <div class="complete__art">${streakScene({ days: streak.current })}</div>
      <h1>${streak.current} day streak!</h1>
      <p class="complete__sub muted">${message}</p>`,
    after: () => {
      play('streak');
      if (streak.milestone) confetti();
    },
  };
}

function achievementScreen(unlocked) {
  const items = unlocked.map((u) => {
    const a = ACHIEVEMENTS.find((x) => x.id === u.id);
    return `<li class="unlock">
      ${badge({ shape: a.shape, iconName: a.icon, tier: u.tier, size: 88, label: `${a.title} level ${u.tier}` })}
      <div><strong>${escapeHtml(a.title)}</strong><p class="muted">${escapeHtml(u.description)}</p><span class="pill pill--blue">${icon('gem', { size: 14 })} +${u.gems} gems</span></div>
    </li>`;
  });
  return {
    html: `
      <h1>Achievement${unlocked.length > 1 ? 's' : ''} unlocked!</h1>
      <ul class="unlocks">${items.join('')}</ul>`,
    after: () => {
      play('unlock');
      confetti();
    },
  };
}

export function showRewards(root, summary) {
  const steps = [summaryScreen(summary)];
  if (summary.streak?.extended) steps.push(streakScreen(summary));
  if (!summary.goalBefore.met && summary.goalAfter.met) steps.push(goalScreen(summary));
  if (summary.achievements?.length) steps.push(achievementScreen(summary.achievements));
  for (const make of extraSteps) {
    const step = make(summary);
    if (step) steps.push(step);
  }

  let i = 0;
  function show() {
    const step = steps[i];
    root.innerHTML = `
      <div class="complete">
        ${step.html}
        <div class="complete__actions">${button({ label: 'Continue', size: 'lg', block: true, attrs: 'data-continue' })}</div>
      </div>`;
    step.after?.(root);
    const btn = root.querySelector('[data-continue]');
    btn.focus();
    btn.addEventListener('click', () => {
      i += 1;
      if (i < steps.length) show();
      else summary.onDone();
    });
  }
  show();
}
