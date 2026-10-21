/*
 * Settings: profile (name, character, colour), daily goal, sound, music,
 * haptics and animation preferences, then the data section (export, import, reset).
 * Every change saves and applies straight away. The theme is light only.
 */
import '../styles/onboarding.css';
import { store } from '../state/store.js';
import { AVATAR_COLORS, DAILY_GOALS, saveProfile } from '../state/profile.js';
import { button, escapeHtml, openModal, toast } from '../ui/components.js';
import { avatarIds, characterInfo, mascot } from '../illustrations/index.js';
import { avatar } from '../ui/avatar.js';
import { refreshTopBar } from '../app/shell.js';
import { installSection } from '../app/pwa.js';
import { backgroundSupported, remindersSupported, setReminderHour, setReminders } from '../reminders/reminders.js';
import { REMINDER_STRINGS } from '../reminders/strings.js';
import { PACKS, hapticsSupported, play, preload } from '../ui/sound.js';
import { adBreakNow, adBreakTime, adConsent, adsConfigured, changeAdConsent, offerAdBreak } from '../ads/ads.js';
import { endAdBreak } from '../ads/breaks.js';
import { POLICY } from '../ads/policy.js';
import { AD_STRINGS, duration } from '../ads/strings.js';
import { fill } from '../reminders/strings.js';
import { siteLinks } from '../app/site.js';
import { COURSES, changeCourse, changeUiLanguage, loadSaved } from '../app/languages.js';
import { detectUiLanguage, t, UI_LANGUAGES } from '../i18n/index.js';
import { languageInfo } from '../i18n/languages.js';

function download(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const hourLabel = (h) => new Date(2026, 0, 1, h).toLocaleTimeString('en', { hour: 'numeric' });

function toggle(key, label, hint, checked, disabled = false) {
  return `<label class="switch-row">
    <span class="switch-row__text"><strong>${label}</strong><small>${hint}</small></span>
    <input class="switch" type="checkbox" role="switch" data-setting="${key}"${checked ? ' checked' : ''}${disabled ? ' disabled' : ''} />
  </label>`;
}

function remindersRows(r) {
  const t = REMINDER_STRINGS.settings;
  const hours = [...Array(14).keys()].map((i) => i + 8);
  return `${toggle('reminder', t.label, `${t.hint}${backgroundSupported() ? '' : ` ${t.limited}`}`, r.on)}
    <label class="switch-row" ${r.on ? '' : 'hidden'} data-hour-row>
      <span class="switch-row__text"><strong>${t.time}</strong></span>
      <select class="input settings-hour" data-hour>
        <option value="auto"${r.hour == null ? ' selected' : ''}>${t.auto}</option>
        ${hours.map((h) => `<option value="${h}"${h === r.hour ? ' selected' : ''}>${hourLabel(h)}</option>`).join('')}
      </select>
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
        ${avatarIds().map((id) => `<button class="onb__character" type="button" role="radio" aria-checked="${character === id}" aria-label="${characterInfo(id).name}" data-pick="character" data-value="${id}">${avatar({ character: id, color: 'paper' }, { size: 56 })}</button>`).join('')}
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

function languagesSection(settings) {
  const option = (value, label, selected) => `<option value="${value}"${selected ? ' selected' : ''}>${escapeHtml(label)}</option>`;
  const name = (code) => languageInfo(code).nativeName;
  const ui = [
    option('auto', t('settings.languages.automatic', { language: name(detectUiLanguage()) }), !settings.uiLang),
    ...UI_LANGUAGES.map((code) => option(code, name(code), settings.uiLang === code)),
  ];
  const courses = COURSES.map((p) =>
    option(p.id, t('picker.course', { target: languageInfo(p.to).name, base: languageInfo(p.from).name }), p.id === settings.course),
  );
  return `<section class="settings-group" id="languages">
    <h2>${escapeHtml(t('settings.languages.title'))}</h2>
    <div>
      <label class="switch-row">
        <span class="switch-row__text"><strong>${escapeHtml(t('settings.languages.ui'))}</strong><small>${escapeHtml(t('settings.languages.uiHint'))}</small></span>
        <select class="input settings-hour" data-ui-lang>${ui.join('')}</select>
      </label>
      <label class="switch-row">
        <span class="switch-row__text"><strong>${escapeHtml(t('settings.languages.course'))}</strong><small>${escapeHtml(t('settings.languages.courseHint'))}</small></span>
        <select class="input settings-hour" data-course>${courses.join('')}</select>
      </label>
    </div>
  </section>`;
}

function adBreakRow() {
  const s = adBreakNow();
  const S = AD_STRINGS.settings;
  const text = s.active ? fill(S.active, { time: adBreakTime(s.until) }) : fill(S.hint, { duration: duration(s.hours), left: s.left });
  return `<span class="switch-row__text"><strong>${S.title}</strong><small>${escapeHtml(text)}</small></span>
    ${s.active ? button({ label: S.end, variant: 'secondary', attrs: 'data-action="ad-break-end"' }) : button({ label: S.take, variant: 'secondary', attrs: 'data-action="ad-break"' })}`;
}

export function settingsView({ root, query, navigate }) {
  const { settings, profile, reminders } = store.get();
  const systemReduced = Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  root.innerHTML = `
    <div class="page">
      <header class="page__header">
        <h1><strong>Settings</strong></h1>
      </header>

      ${profile ? profileSection(profile) : ''}
      ${languagesSection(settings)}
      <section class="settings-group" id="preferences">
        <h2>Preferences</h2>
        <div>
          ${toggle('sound', 'Sound effects', 'Sounds for taps, right and wrong answers, and rewards.', settings.sound !== false)}
          <label class="switch-row">
            <span class="switch-row__text"><strong>Sound style</strong><small>Playful is bright and bouncy, soft is gentle and warm.</small></span>
            <select class="input settings-hour" data-pack>${Object.entries(PACKS).map(([id, label]) => `<option value="${id}"${id === (settings.soundPack ?? 'playful') ? ' selected' : ''}>${label}</option>`).join('')}</select>
          </label>
          ${toggle('music', 'Background music', 'A quiet amadinda loop on the home screens. Lessons and stories stay quiet.', settings.music !== false)}
          ${toggle('haptics', 'Vibration', !hapticsSupported() ? 'This device or browser can’t vibrate (iPhones and most computers don’t allow it).' : systemReduced ? 'Your device asks for reduced motion, so vibration stays off.' : 'A small buzz for taps, answers and rewards.', hapticsSupported() && !systemReduced && settings.haptics !== false, !hapticsSupported() || systemReduced)}
          ${profile && remindersSupported() ? remindersRows(reminders) : ''}
          ${toggle('motion', 'Animations', systemReduced ? 'Your device asks for reduced motion, so animations stay minimal.' : 'Confetti, bouncing and sliding.', settings.motion !== false && !systemReduced, systemReduced)}
          <p class="muted settings-credits">Sounds and music are free and openly licensed (CC0). <a href="./audio/CREDITS.md" target="_blank" rel="noopener">Audio credits</a></p>
        </div>
      </section>

      <section class="settings-group" id="install" data-install-section>${installSection()}</section>
      <section class="settings-group" id="privacy">
        <h2>Ads and privacy</h2>
        ${adsConfigured() ? `<div>${toggle('personalisedAds', 'Personalised ads', 'Let Google use cookies to show ads that suit you. Off means basic, non-personalised ads.', adConsent() === 'granted')}</div>` : ''}
        ${adsConfigured() && POLICY.adBreak.perWeek ? `<div class="ad-break-row" data-ad-break-row>${adBreakRow()}</div>` : ''}
        <p class="muted">Your lessons and progress never leave this device. <a href="#/privacy">Read the privacy policy</a>.</p>
        ${siteLinks()}
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

  root.addEventListener('change', async (e) => {
    // Both redraw the page once the new pack has loaded.
    if (e.target.matches('[data-ui-lang]')) {
      await changeUiLanguage(e.target.value === 'auto' ? null : e.target.value);
      return;
    }
    if (e.target.matches('[data-course]')) {
      const to = COURSES.find((p) => p.id === e.target.value)?.to;
      await changeCourse(e.target.value);
      toast(t('settings.languages.switched', { target: languageInfo(to).name }));
      return;
    }
    if (e.target.matches('[data-pack]')) {
      store.update((s) => {
        s.settings.soundPack = e.target.value;
      });
      preload(e.target.value);
      play('correct');
      return;
    }
    if (e.target.matches('[data-hour]')) {
      setReminderHour(e.target.value === 'auto' ? null : Number(e.target.value));
      return;
    }
    const key = e.target.dataset?.setting;
    if (!key) return;
    if (key === 'personalisedAds') {
      changeAdConsent(e.target.checked ? 'granted' : 'denied');
      toast(e.target.checked ? 'Personalised ads allowed.' : 'You’ll see basic ads only.');
      return;
    }
    if (key === 'reminder') {
      const wanted = e.target.checked;
      const on = await setReminders(wanted);
      e.target.checked = on;
      if (wanted && !on) toast(REMINDER_STRINGS.consent.blocked, { duration: 4000 });
      root.querySelector('[data-hour-row]').hidden = !on;
      return;
    }
    store.update((s) => {
      s.settings[key] = e.target.checked;
    });
    if (key === 'sound' && e.target.checked) play('correct');
    if (key === 'haptics' && e.target.checked) play('tap');
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
      store.importJSON(text);
      // The file may be for another course or an older version of this one.
      await loadSaved();
      const state = store.get();
      refreshTopBar();
      toast('Progress imported. Weebale!', { variant: 'success' });
      navigate(state.profile ? '/learn' : '/onboarding');
    } catch (err) {
      toast(err.message, { variant: 'error', duration: 4000 });
    }
  });

  root.addEventListener('click', async (e) => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action === 'ad-break' || action === 'ad-break-end') {
      if (action === 'ad-break') await offerAdBreak();
      else {
        endAdBreak();
        toast(AD_STRINGS.settings.ended);
      }
      root.querySelector('[data-ad-break-row]').innerHTML = adBreakRow();
      return;
    }
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
