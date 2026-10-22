/*
 * First-run onboarding. The crane asks a few questions, one per screen, and
 * the answers become the learner's profile. The current step and answers are
 * saved as they go, so a refresh resumes where the learner left off.
 */
import '../styles/onboarding.css';
import { store } from '../state/store.js';
import { DAILY_GOALS, AVATAR_COLORS, createProfile } from '../state/profile.js';
import { avatarIds, characterInfo, mascot } from '../illustrations/index.js';
import { MASCOT_NAME } from '../app/brand.js';
import { button, escapeHtml, progressBar, speech } from '../ui/components.js';
import { avatar } from '../ui/avatar.js';
import { icon } from '../ui/icons.js';
import { trackPixel } from '../marketing/pixel.js';
import { applyLanguages, languageScreen, onGuessReply } from './language-picker.js';
import { course } from '../content/course.js';
import { courseLanguage } from '../content/names.js';
import { t, tHtml } from '../i18n/index.js';

// Labels are UI pack keys under onboarding.motivation / onboarding.level.
const MOTIVATIONS = [
  { id: 'family', icon: 'profile' },
  { id: 'travel', icon: 'arrow' },
  { id: 'friends', icon: 'heart' },
  { id: 'culture', icon: 'book' },
  { id: 'work', icon: 'target' },
  { id: 'fun', icon: 'star' },
];

const LEVELS = ['new', 'some'];

/** Values onboarding text can use: the course's language, greeting and place. */
const params = () => ({ language: courseLanguage('target'), hello: course.landing?.hello ?? '', thanks: course.landing?.thanks ?? '', place: course.landing?.place ?? '', mascot: MASCOT_NAME });
const say = (key, extra) => escapeHtml(t(key, { ...params(), ...extra }));

const STEPS = ['languages', 'welcome', 'motivation', 'goal', 'level', 'avatar', 'ready'];

function saveOnboarding(patch) {
  store.update((s) => {
    s.onboarding = { ...s.onboarding, ...patch, answers: { ...s.onboarding.answers, ...(patch.answers ?? {}) } };
  });
}

function screen(step, answers) {
  switch (step) {
    case 'languages':
      return languageScreen(answers);
    case 'welcome':
      return {
        pose: 'happy',
        say: say('onboarding.welcome.say'),
        body: `<p class="onb__lead">${say('onboarding.welcome.lead')}</p>`,
        ready: true,
        cta: t('onboarding.welcome.cta'),
      };
    case 'motivation':
      return {
        pose: 'thinking',
        say: say('onboarding.motivation.say'),
        body: `<div class="onb__options onb__options--grid" role="radiogroup" aria-label="${say('onboarding.motivation.label')}">
          ${MOTIVATIONS.map((m) => `<button class="choice" type="button" role="radio" aria-checked="${answers.motivation === m.id}" data-pick="motivation" data-value="${m.id}">${icon(m.icon, { size: 22 })}<span>${say(`onboarding.motivation.${m.id}`)}</span></button>`).join('')}
        </div>`,
        ready: Boolean(answers.motivation),
      };
    case 'goal':
      return {
        pose: 'idle',
        say: say('onboarding.goal.say'),
        body: `<div class="onb__options" role="radiogroup" aria-label="${say('onboarding.goal.label')}">
          ${DAILY_GOALS.map((g) => `<button class="choice onb__goal" type="button" role="radio" aria-checked="${Number(answers.dailyGoal) === g.xp}" data-pick="dailyGoal" data-value="${g.xp}">
            <strong>${say(`goals.${g.id}`)}</strong><span>${say('goals.minutes', { minutes: g.minutes })}</span><span class="onb__xp">${say('goals.xp', { xp: g.xp })}</span></button>`).join('')}
        </div>`,
        ready: Boolean(answers.dailyGoal),
      };
    case 'level':
      return {
        pose: 'thinking',
        say: say('onboarding.level.say'),
        body: `<div class="onb__options" role="radiogroup" aria-label="${say('onboarding.level.label')}">
          ${LEVELS.map((id) => `<button class="choice onb__level" type="button" role="radio" aria-checked="${answers.level === id}" data-pick="level" data-value="${id}">
            <strong>${say(`onboarding.level.${id}`)}</strong><span>${say(`onboarding.level.${id}Detail`)}</span></button>`).join('')}
        </div>`,
        ready: Boolean(answers.level),
      };
    case 'avatar': {
      const character = answers.character ?? 'nakato';
      const color = answers.color ?? 'vermillion';
      return {
        pose: 'happy',
        say: say('onboarding.avatar.say'),
        body: `
          <div class="onb__avatar-preview">${avatar({ character, color }, { size: 120, label: t('onboarding.avatar.preview') })}</div>
          <div class="field">
            <label for="onb-name">${say('onboarding.avatar.name')}</label>
            <input id="onb-name" class="input" type="text" maxlength="30" autocomplete="given-name" placeholder="${say('onboarding.avatar.placeholder')}" value="${escapeHtml(answers.name ?? '')}" />
          </div>
          <fieldset class="onb__fieldset">
            <legend>${say('onboarding.avatar.character')}</legend>
            <div class="onb__characters" role="radiogroup" aria-label="${say('onboarding.avatar.character')}">
              ${avatarIds().map((id) => `<button class="onb__character" type="button" role="radio" aria-checked="${character === id}" aria-label="${characterInfo(id).name}" data-pick="character" data-value="${id}">${avatar({ character: id, color: 'paper' }, { size: 64 })}</button>`).join('')}
            </div>
          </fieldset>
          <fieldset class="onb__fieldset">
            <legend>${say('onboarding.avatar.colour')}</legend>
            <div class="onb__colors" role="radiogroup" aria-label="${say('onboarding.avatar.colour')}">
              ${AVATAR_COLORS.map((c) => `<button class="onb__color avatar--${c}" type="button" role="radio" aria-checked="${color === c}" aria-label="${say(`colours.${c}`)}" data-pick="color" data-value="${c}"></button>`).join('')}
            </div>
          </fieldset>`,
        ready: Boolean((answers.name ?? '').trim()),
        cta: t('onboarding.continue'),
      };
    }
    case 'ready':
    default: {
      const goal = DAILY_GOALS.find((g) => g.xp === Number(answers.dailyGoal)) ?? DAILY_GOALS[1];
      return {
        pose: 'cheering',
        say: say('onboarding.ready.say', { name: answers.name ?? '' }),
        body: `<div class="onb__summary card">
            ${avatar({ character: answers.character ?? 'nakato', color: answers.color ?? 'vermillion' }, { size: 72 })}
            <div><strong>${escapeHtml(answers.name ?? '')}</strong><p class="muted">${say('goals.summary', { goal: t(`goals.${goal.id}`), xp: goal.xp })}</p></div>
          </div>
          <p class="onb__lead">${tHtml('onboarding.ready.lead', params())}</p>`,
        ready: true,
        cta: t('onboarding.ready.cta'),
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
          ${i > 0 ? `<button class="icon-btn" type="button" data-nav="back" aria-label="${escapeHtml(t('onboarding.back'))}">${icon('back')}</button>` : `<a class="icon-btn" href="#/" aria-label="${escapeHtml(t('onboarding.close'))}">${icon('close')}</a>`}
          ${progressBar(i / (STEPS.length - 1), { label: t('onboarding.progress') })}
        </header>
        <section class="onb__main onb__main--${step}">
          <div class="talk onb__talk">
            <div class="talk__art">${mascot({ pose: s.pose })}</div>
            ${speech(`<h1 class="onb__say">${s.say}</h1>`)}
          </div>
          <div class="onb__body">${s.body}</div>
        </section>
        <footer class="onb__footer">
          ${button({ label: s.cta ?? t('onboarding.continue'), size: 'lg', block: true, disabled: !s.ready, attrs: 'data-nav="next"' })}
        </footer>
      </div>`;
    root.querySelector('#onb-name')?.focus();
  }

  async function next() {
    const { step = 0, answers } = store.get().onboarding;
    if (STEPS[step] === 'languages') {
      // Move on first: switching language or course redraws the screen.
      saveOnboarding({ step: step + 1 });
      await applyLanguages(answers);
      render();
      return;
    }
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
      trackPixel('signUp', { content_name: 'onboarding' });
      navigate('/learn');
      return;
    }
    saveOnboarding({ step: step + 1 });
    render();
  }

  root.addEventListener('click', (e) => {
    const reply = e.target.closest('[data-lang-reply]');
    if (reply) {
      saveOnboarding({ answers: onGuessReply(reply.dataset.langReply) });
      render();
      root.querySelector('.onb__body [role="radio"], .onb__body button')?.focus();
      return;
    }
    const pick = e.target.closest('[data-pick]');
    if (pick) {
      // A new base language may not offer the course picked before.
      const extra = pick.dataset.pick === 'speak' ? { course: null } : {};
      saveOnboarding({ answers: { [pick.dataset.pick]: pick.dataset.value, ...extra } });
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
