/*
 * Settings: profile (name, character, colour), daily goal, sound and
 * animation preferences, then the data section (export, import, reset).
 * Every change saves and applies straight away. The theme is light only.
 */
import '../styles/onboarding.css';
import { store } from '../state/store.js';
import { AVATAR_COLORS, DAILY_GOALS, saveProfile } from '../state/profile.js';
import { button, escapeHtml, openModal, toast } from '../ui/components.js';
import { CAST, mascot } from '../illustrations/index.js';
import { avatar } from '../ui/avatar.js';
import { refreshTopBar } from '../app/shell.js';
import { play } from '../ui/sound.js';

function download(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function toggle(key, label, hint, checked, disabled = false) {
  return `<label class="switch-row">
    <span class="switch-row__text"><strong>${label}</strong><small>${hint}</small></span>
    <input class="switch" type="checkbox" role="switch" data-setting="${key}"${checked ? ' checked' : ''}${disabled ? ' disabled' : ''} />
  </label>`;
}

function profileSection(p) {
  const { character, color } = p.avatar;
  return `<section class="settings-group" id="profile">
    <h2>Profile</h2>
    <div class="settings-profile">
      <div class="settings-profile__preview" data-preview>${avatar(p.avatar, { size: 88, label: 'Your avatar' })}</div>
      <div class="field">
        <label for="settings-name">Name</label>
        <input id="settings-name" class="input" type="text" maxlength="30" autocomplete="given-name" value="${escapeHtml(p.name)}" data-name />
      </div>
    </div>
    <fieldset class="onb__fieldset">
      <legend>Character</legend>
      <div class="onb__characters" role="radiogroup" aria-label="Character">
        ${Object.keys(CAST).map((id) => `<button class="onb__character" type="button" role="radio" aria-checked="${character === id}" aria-label="${CAST[id].name}" data-pick="character" data-value="${id}">${avatar({ character: id, color: 'paper' }, { size: 56 })}</button>`).join('')}
      </div>
    </fieldset>
    <fieldset class="onb__fieldset">
      <legend>Colour</legend>
      <div class="onb__colors" role="radiogroup" aria-label="Colour">
        ${AVATAR_COLORS.map((c) => `<button class="onb__color avatar--${c}" type="button" role="radio" aria-checked="${color === c}" aria-label="${c}" data-pick="color" data-value="${c}"></button>`).join('')}
      </div>
    </fieldset>
  </section>
  <section class="settings-group" id="goal">
    <h2>Daily goal</h2>
    <div class="goal-options" role="radiogroup" aria-label="Daily goal">
      ${DAILY_GOALS.map((g) => `<button class="choice" type="button" role="radio" aria-checked="${p.dailyGoal === g.xp}" data-goal="${g.xp}"><span><strong>${g.label}</strong> · ${g.xp} XP a day</span><span class="muted">${g.minutes} min</span></button>`).join('')}
    </div>
  </section>`;
}

export function settingsView({ root, query, navigate }) {
  const { settings, profile } = store.get();
  const systemReduced = Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  root.innerHTML = `
    <div class="page">
      <header class="page__header">
        <h1><strong>Settings</strong></h1>
      </header>

      ${profile ? profileSection(profile) : ''}
      <section class="settings-group" id="preferences">
        <h2>Preferences</h2>
        <div>
          ${toggle('sound', 'Sound effects', 'Chimes for right and wrong answers and rewards.', settings.sound !== false)}
          ${toggle('motion', 'Animations', systemReduced ? 'Your device asks for reduced motion, so animations stay minimal.' : 'Confetti, bouncing and sliding.', settings.motion !== false && !systemReduced, systemReduced)}
        </div>
      </section>

      <section class="settings-group" id="data">
        <h2>Your progress</h2>
        <p class="muted">Progress is saved in this browser only. Export it to keep a backup or to move to another device, then import it there.</p>
        <div class="settings-actions">
          ${button({ label: 'Export progress', variant: 'secondary', iconName: 'arrow', attrs: 'data-action="export"' })}
          ${button({ label: 'Import progress', variant: 'secondary', attrs: 'data-action="import"' })}
          <input type="file" accept="application/json,.json" hidden data-import-file />
        </div>
      </section>

      <section class="settings-group settings-group--danger">
        <h2>Start over</h2>
        <p class="muted">Erase your profile, XP, streak and everything you’ve learned on this device.</p>
        ${button({ label: 'Reset progress', variant: 'danger', attrs: 'data-action="reset"' })}
      </section>
    </div>`;

  const fileInput = root.querySelector('[data-import-file]');

  // Profile edits save as they happen.
  const nameInput = root.querySelector('[data-name]');
  nameInput?.addEventListener('change', () => {
    const name = nameInput.value.trim();
    if (!name) {
      nameInput.value = store.get().profile.name;
      return;
    }
    saveProfile({ name });
    toast('Name saved.');
  });

  root.addEventListener('click', (e) => {
    const pick = e.target.closest('[data-pick]');
    if (pick) {
      saveProfile({ avatar: { [pick.dataset.pick]: pick.dataset.value } });
      pick.parentElement.querySelectorAll('[data-pick]').forEach((b) => b.setAttribute('aria-checked', String(b === pick)));
      root.querySelector('[data-preview]').innerHTML = avatar(store.get().profile.avatar, { size: 88, label: 'Your avatar' });
      return;
    }
    const goal = e.target.closest('[data-goal]');
    if (goal) {
      saveProfile({ dailyGoal: Number(goal.dataset.goal) });
      goal.parentElement.querySelectorAll('[data-goal]').forEach((b) => b.setAttribute('aria-checked', String(b === goal)));
      refreshTopBar();
    }
  });

  if (query.section) root.querySelector(`#${CSS.escape(query.section)}`)?.scrollIntoView({ block: 'start' });

  root.addEventListener('change', (e) => {
    const key = e.target.dataset?.setting;
    if (!key) return;
    store.update((s) => {
      s.settings[key] = e.target.checked;
    });
    if (key === 'sound' && e.target.checked) play('correct');
  });

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    fileInput.value = '';
    if (!file) return;
    const text = await file.text();
    const ok = await openModal({
      title: 'Replace your progress?',
      body: '<p>Importing replaces everything saved on this device with the file’s progress.</p>',
      actions: [
        { label: 'Import', value: 'yes' },
        { label: 'Cancel', value: 'no', variant: 'ghost' },
      ],
    });
    if (ok !== 'yes') return;
    try {
      const state = store.importJSON(text);
      refreshTopBar();
      toast('Progress imported. Weebale!', { variant: 'success' });
      navigate(state.profile ? '/learn' : '/onboarding');
    } catch (err) {
      toast(err.message, { variant: 'error', duration: 4000 });
    }
  });

  root.addEventListener('click', async (e) => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action === 'export') {
      const name = store.get().profile?.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'learner';
      download(`learn-luganda-${name}-${new Date().toISOString().slice(0, 10)}.json`, store.exportJSON());
      toast('Progress exported.');
    }
    if (action === 'import') fileInput.click();
    if (action === 'reset') {
      const choice = await openModal({
        title: 'Reset all progress?',
        body: '<p>This can’t be undone. Export first if you might want it back.</p>',
        art: mascot({ pose: 'sad' }),
        actions: [
          { label: 'Keep my progress', value: 'keep' },
          { label: 'Reset everything', value: 'reset', variant: 'danger' },
        ],
      });
      if (choice === 'reset') {
        store.reset();
        toast('Progress reset.');
        navigate('/');
      }
    }
  });

  if (query.import) fileInput.click();
}
