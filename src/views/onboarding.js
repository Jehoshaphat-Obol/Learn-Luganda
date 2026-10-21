/*
 * First-run onboarding. The crane asks a few questions, one per screen, and
 * the answers become the learner's profile. The current step and answers are
 * saved as they go, so a refresh resumes where the learner left off.
 */
import '../styles/onboarding.css';
import { store } from '../state/store.js';
import { DAILY_GOALS, AVATAR_COLORS, createProfile } from '../state/profile.js';
import { CAST, mascot } from '../illustrations/index.js';
import { MASCOT_NAME } from '../app/brand.js';
import { button, escapeHtml, progressBar, speech } from '../ui/components.js';
import { avatar } from '../ui/avatar.js';
import { icon } from '../ui/icons.js';

const MOTIVATIONS = [
  { id: 'family', label: 'Talk with family', icon: 'profile' },
  { id: 'travel', label: 'Travel to Uganda', icon: 'arrow' },
  { id: 'friends', label: 'Connect with friends', icon: 'heart' },
  { id: 'culture', label: 'Explore the culture', icon: 'book' },
  { id: 'work', label: 'Work or study', icon: 'target' },
  { id: 'fun', label: 'Just for fun', icon: 'star' },
];

const LEVELS = [
  { id: 'new', label: 'I’m new to Luganda', detail: 'Start from the very first lesson.' },
  { id: 'some', label: 'I know some words', detail: 'Start with a quick greetings review.' },
];

const STEPS = ['welcome', 'motivation', 'goal', 'level', 'avatar', 'ready'];

function saveOnboarding(patch) {
  store.update((s) => {
    s.onboarding = { ...s.onboarding, ...patch, answers: { ...s.onboarding.answers, ...(patch.answers ?? {}) } };
  });
}

function screen(step, answers) {
  switch (step) {
    case 'welcome':
      return {
        pose: 'happy',
        say: `Oli otya! I’m ${escapeHtml(MASCOT_NAME)}, your guide to Luganda.`,
        body: '<p class="onb__lead">A few quick questions and we’ll set up your course.</p>',
        ready: true,
        cta: 'Let’s go',
      };
    case 'motivation':
      return {
        pose: 'thinking',
        say: 'Why are you learning Luganda?',
        body: `<div class="onb__options onb__options--grid" role="radiogroup" aria-label="Why are you learning">
          ${MOTIVATIONS.map((m) => `<button class="choice" type="button" role="radio" aria-checked="${answers.motivation === m.id}" data-pick="motivation" data-value="${m.id}">${icon(m.icon, { size: 22 })}<span>${m.label}</span></button>`).join('')}
        </div>`,
        ready: Boolean(answers.motivation),
      };
    case 'goal':
      return {
        pose: 'idle',
        say: 'What’s your daily goal?',
        body: `<div class="onb__options" role="radiogroup" aria-label="Daily goal">
          ${DAILY_GOALS.map((g) => `<button class="choice onb__goal" type="button" role="radio" aria-checked="${Number(answers.dailyGoal) === g.xp}" data-pick="dailyGoal" data-value="${g.xp}">
            <strong>${g.label}</strong><span>${g.minutes} min a day</span><span class="onb__xp">${g.xp} XP</span></button>`).join('')}
        </div>`,
        ready: Boolean(answers.dailyGoal),
      };
    case 'level':
      return {
        pose: 'thinking',
        say: 'How much Luganda do you know?',
        body: `<div class="onb__options" role="radiogroup" aria-label="Your level">
          ${LEVELS.map((l) => `<button class="choice onb__level" type="button" role="radio" aria-checked="${answers.level === l.id}" data-pick="level" data-value="${l.id}">
            <strong>${l.label}</strong><span>${l.detail}</span></button>`).join('')}
        </div>`,
        ready: Boolean(answers.level),
      };
    case 'avatar': {
      const character = answers.character ?? 'nakato';
      const color = answers.color ?? 'vermillion';
      return {
        pose: 'happy',
        say: 'Make it yours. What should I call you?',
        body: `
          <div class="onb__avatar-preview">${avatar({ character, color }, { size: 120, label: 'Your avatar' })}</div>
          <div class="field">
            <label for="onb-name">Your name</label>
            <input id="onb-name" class="input" type="text" maxlength="30" autocomplete="given-name" placeholder="e.g. Amani" value="${escapeHtml(answers.name ?? '')}" />
          </div>
          <fieldset class="onb__fieldset">
            <legend>Character</legend>
            <div class="onb__characters" role="radiogroup" aria-label="Character">
              ${Object.keys(CAST).map((id) => `<button class="onb__character" type="button" role="radio" aria-checked="${character === id}" aria-label="${CAST[id].name}" data-pick="character" data-value="${id}">${avatar({ character: id, color: 'paper' }, { size: 64 })}</button>`).join('')}
            </div>
          </fieldset>
          <fieldset class="onb__fieldset">
            <legend>Colour</legend>
            <div class="onb__colors" role="radiogroup" aria-label="Colour">
              ${AVATAR_COLORS.map((c) => `<button class="onb__color avatar--${c}" type="button" role="radio" aria-checked="${color === c}" aria-label="${c}" data-pick="color" data-value="${c}"></button>`).join('')}
            </div>
          </fieldset>`,
        ready: Boolean((answers.name ?? '').trim()),
        cta: 'Continue',
      };
    }
    case 'ready':
    default: {
      const goal = DAILY_GOALS.find((g) => g.xp === Number(answers.dailyGoal)) ?? DAILY_GOALS[1];
      return {
        pose: 'cheering',
        say: `Weebale, ${escapeHtml(answers.name ?? '')}! You’re all set.`,
        body: `<div class="onb__summary card">
            ${avatar({ character: answers.character ?? 'nakato', color: answers.color ?? 'vermillion' }, { size: 72 })}
            <div><strong>${escapeHtml(answers.name ?? '')}</strong><p class="muted">${goal.label} goal · ${goal.xp} XP a day</p></div>
          </div>
          <p class="onb__lead">Your first lesson: greetings. You’ll learn to say <em>Oli otya?</em> in under five minutes.</p>`,
        ready: true,
        cta: 'Start learning',
      };
    }
  }
}

export function onboardingView({ root, navigate }) {
  if (store.get().profile) {
    navigate('/learn', { replace: true });
    return undefined;
  }

  function render() {
    const { step: index = 0, answers = {} } = store.get().onboarding;
    const i = Math.min(index, STEPS.length - 1);
    const step = STEPS[i];
    const s = screen(step, answers);
    root.innerHTML = `
      <div class="onb">
        <header class="onb__top">
          ${i > 0 ? `<button class="icon-btn" type="button" data-nav="back" aria-label="Back">${icon('back')}</button>` : `<a class="icon-btn" href="#/" aria-label="Close">${icon('close')}</a>`}
          ${progressBar(i / (STEPS.length - 1), { label: 'Setup progress' })}
        </header>
        <section class="onb__main onb__main--${step}">
          <div class="talk onb__talk">
            <div class="talk__art">${mascot({ pose: s.pose })}</div>
            ${speech(s.say)}
          </div>
          <div class="onb__body">${s.body}</div>
        </section>
        <footer class="onb__footer">
          ${button({ label: s.cta ?? 'Continue', size: 'lg', block: true, disabled: !s.ready, attrs: 'data-nav="next"' })}
        </footer>
      </div>`;
    root.querySelector('#onb-name')?.focus();
  }

  function next() {
    const { step = 0, answers } = store.get().onboarding;
    if (STEPS[step] === 'ready') {
      store.update((s) => {
        s.profile = createProfile({
          name: answers.name,
          avatar: { character: answers.character, color: answers.color },
          dailyGoal: Number(answers.dailyGoal) || 20,
          motivation: answers.motivation,
          level: answers.level,
        });
        s.onboarding = { step: 0, answers: {} };
      });
      navigate('/learn');
      return;
    }
    saveOnboarding({ step: step + 1 });
    render();
  }

  root.addEventListener('click', (e) => {
    const pick = e.target.closest('[data-pick]');
    if (pick) {
      saveOnboarding({ answers: { [pick.dataset.pick]: pick.dataset.value } });
      const focusKey = `[data-pick="${pick.dataset.pick}"][data-value="${pick.dataset.value}"]`;
      render();
      root.querySelector(focusKey)?.focus();
      return;
    }
    const nav = e.target.closest('[data-nav]')?.dataset.nav;
    if (nav === 'back') {
      saveOnboarding({ step: Math.max(0, store.get().onboarding.step - 1) });
      render();
    }
    if (nav === 'next' && !e.target.closest('[disabled]')) next();
  });

  root.addEventListener('input', (e) => {
    if (e.target.id !== 'onb-name') return;
    const name = e.target.value;
    // Save without re-rendering so the caret stays put; just toggle the button.
    store.update((s) => {
      s.onboarding.answers.name = name;
    });
    root.querySelector('[data-nav="next"]').disabled = !name.trim();
  });

  root.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.id === 'onb-name' && e.target.value.trim()) next();
  });

  render();
  return undefined;
}
