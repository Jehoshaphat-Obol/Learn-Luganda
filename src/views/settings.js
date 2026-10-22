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
import { PACKS, hapticsSupported, play, preload } from '../ui/sound.js';
import { pixelConfigured, pixelConsent, setPixelConsent } from '../marketing/pixel.js';
import { adBreakNow, adBreakTime, adConsent, adsConfigured, changeAdConsent, duration, offerAdBreak } from '../ads/ads.js';
import { endAdBreak } from '../ads/breaks.js';
import { POLICY } from '../ads/policy.js';
import { siteLinks } from '../app/site.js';
import { COURSES, autoUiLanguage, changeCourse, changeUiLanguage, loadSaved } from '../app/languages.js';
import { currentLanguage, languageLabel, t, tHtml, UI_LANGUAGES } from '../i18n/index.js';
import { languageInfo } from '../i18n/languages.js';
import { canSynthesize, speak, stopSpeech } from '../audio/speech.js';
import { course } from '../content/course.js';
import { courseLanguage } from '../content/names.js';

function download(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const hourLabel = (h) => new Date(2026, 0, 1, h).toLocaleTimeString(currentLanguage(), { hour: 'numeric' });
const say = (key, params) => escapeHtml(t(key, params));

function toggle(key, label, hint, checked, disabled = false) {
  return `<label class="switch-row">
    <span class="switch-row__text"><strong>${escapeHtml(label)}</strong><small>${escapeHtml(hint)}</small></span>
    <input class="switch" type="checkbox" role="switch" data-setting="${key}"${checked ? ' checked' : ''}${disabled ? ' disabled' : ''} />
  </label>`;
}

function remindersRows(r) {
  const hours = [...Array(14).keys()].map((i) => i + 8);
  const hint = [t('reminders.settings.hint', { language: courseLanguage('target') }), backgroundSupported() ? '' : t('reminders.settings.limited')].filter(Boolean).join(' ');
  return `${toggle('reminder', t('reminders.settings.label'), hint, r.on)}
    <label class="switch-row" ${r.on ? '' : 'hidden'} data-hour-row>
      <span class="switch-row__text"><strong>${say('reminders.settings.time')}</strong></span>
      <select class="input settings-hour" data-hour>
        <option value="auto"${r.hour == null ? ' selected' : ''}>${say('reminders.settings.auto')}</option>
        ${hours.map((h) => `<option value="${h}"${h === r.hour ? ' selected' : ''}>${hourLabel(h)}</option>`).join('')}
      </select>
    </label>`;
}

function profileSection(p) {
  const { character, color } = p.avatar;
  return `<section class="settings-group" id="profile">
    <h2>${say('settings.profile.title')}</h2>
    <div class="settings-profile">
      <div class="settings-profile__preview" data-preview>${avatar(p.avatar, { size: 88, label: t('settings.profile.avatar') })}</div>
      <div class="field">
        <label for="settings-name">${say('settings.profile.name')}</label>
        <input id="settings-name" class="input" type="text" maxlength="30" autocomplete="given-name" value="${escapeHtml(p.name)}" data-name />
      </div>
    </div>
    <fieldset class="onb__fieldset">
      <legend>${say('settings.profile.character')}</legend>
      <div class="onb__characters" role="radiogroup" aria-label="${say('settings.profile.character')}">
        ${avatarIds().map((id) => `<button class="onb__character" type="button" role="radio" aria-checked="${character === id}" aria-label="${characterInfo(id).name}" data-pick="character" data-value="${id}">${avatar({ character: id, color: 'paper' }, { size: 56 })}</button>`).join('')}
      </div>
    </fieldset>
    <fieldset class="onb__fieldset">
      <legend>${say('settings.profile.colour')}</legend>
      <div class="onb__colors" role="radiogroup" aria-label="${say('settings.profile.colour')}">
        ${AVATAR_COLORS.map((c) => `<button class="onb__color avatar--${c}" type="button" role="radio" aria-checked="${color === c}" aria-label="${escapeHtml(t(`colours.${c}`))}" data-pick="color" data-value="${c}"></button>`).join('')}
      </div>
    </fieldset>
  </section>
  <section class="settings-group" id="goal">
    <h2>${say('settings.goal')}</h2>
    <div class="goal-options" role="radiogroup" aria-label="${say('settings.goal')}">
      ${DAILY_GOALS.map((g) => `<button class="choice" type="button" role="radio" aria-checked="${p.dailyGoal === g.xp}" data-goal="${g.xp}"><span><strong>${escapeHtml(t(`goals.${g.id}`))}</strong> · ${escapeHtml(t('goals.perDay', { xp: g.xp }))}</span><span class="muted">${escapeHtml(t('goals.minutes', { minutes: g.minutes }))}</span></button>`).join('')}
    </div>
  </section>`;
}

function speechRows(settings) {
  const on = settings.speech !== false;
  const hint = canSynthesize() ? t('settings.speech.hint') : t('settings.speech.hintNoVoice', { language: languageLabel(course.to) });
  return `${toggle('speech', t('settings.speech.label'), hint, on)}
    <div data-speech-slow${on ? '' : ' hidden'}>${toggle('speechSlow', t('settings.speech.slow'), t('settings.speech.slowHint'), Boolean(settings.speechSlow))}</div>`;
}

function languagesSection(settings) {
  const option = (value, label, selected) => `<option value="${value}"${selected ? ' selected' : ''}>${escapeHtml(label)}</option>`;
  const name = (code) => languageInfo(code).nativeName;
  const ui = [
    option('auto', t('settings.languages.automatic', { language: name(autoUiLanguage()) }), !settings.uiLang),
    ...UI_LANGUAGES.map((code) => option(code, name(code), settings.uiLang === code)),
  ];
  const courses = COURSES.map((p) =>
    option(p.id, t('picker.course', { target: languageLabel(p.to), base: languageLabel(p.from) }), p.id === settings.course),
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
  const text = s.active ? t('ads.settings.active', { time: adBreakTime(s.until) }) : t('ads.settings.hint', { duration: duration(s.hours), left: s.left });
  return `<span class="switch-row__text"><strong>${say('ads.settings.title')}</strong><small>${escapeHtml(text)}</small></span>
    ${s.active ? button({ label: t('ads.settings.end'), variant: 'secondary', attrs: 'data-action="ad-break-end"' }) : button({ label: t('ads.settings.take'), variant: 'secondary', attrs: 'data-action="ad-break"' })}`;
}

export function settingsView({ root, query, navigate }) {
  const { settings, profile, reminders } = store.get();
  const systemReduced = Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  root.innerHTML = `
    <div class="page">
      <header class="page__header">
        <h1><strong>${say('settings.title')}</strong></h1>
      </header>

      ${profile ? profileSection(profile) : ''}
      ${languagesSection(settings)}
      <section class="settings-group" id="preferences">
        <h2>${say('settings.preferences')}</h2>
        <div>
          ${toggle('sound', t('settings.sound.label'), t('settings.sound.hint'), settings.sound !== false)}
          <label class="switch-row">
            <span class="switch-row__text"><strong>${say('settings.sound.style')}</strong><small>${say('settings.sound.styleHint')}</small></span>
            <select class="input settings-hour" data-pack>${Object.keys(PACKS).map((id) => `<option value="${id}"${id === (settings.soundPack ?? 'playful') ? ' selected' : ''}>${say(`sounds.${id}`)}</option>`).join('')}</select>
          </label>
          ${speechRows(settings)}
          ${toggle('music', t('settings.music.label'), t('settings.music.hint'), settings.music !== false)}
          ${toggle('haptics', t('settings.haptics.label'), t(!hapticsSupported() ? 'settings.haptics.unsupported' : systemReduced ? 'settings.haptics.reduced' : 'settings.haptics.hint'), hapticsSupported() && !systemReduced && settings.haptics !== false, !hapticsSupported() || systemReduced)}
          ${profile && remindersSupported() ? remindersRows(reminders) : ''}
          ${toggle('motion', t('settings.motion.label'), t(systemReduced ? 'settings.motion.reduced' : 'settings.motion.hint'), settings.motion !== false && !systemReduced, systemReduced)}
          <p class="muted settings-credits">${say('settings.credits')} <a href="./audio/CREDITS.md" target="_blank" rel="noopener">${say('settings.creditsLink')}</a></p>
        </div>
      </section>

      <section class="settings-group" id="install" data-install-section>${installSection()}</section>
      <section class="settings-group" id="privacy">
        <h2>${say('settings.privacy.title')}</h2>
        ${adsConfigured() ? `<div>${toggle('personalisedAds', t('settings.privacy.ads'), t('settings.privacy.adsHint'), adConsent() === 'granted')}</div>` : ''}
        ${pixelConfigured() ? `<div>${toggle('pixel', t('settings.privacy.pixel'), t('settings.privacy.pixelHint'), pixelConsent() === 'granted')}</div>` : ''}
        ${adsConfigured() && POLICY.adBreak.perWeek ? `<div class="ad-break-row" data-ad-break-row>${adBreakRow()}</div>` : ''}
        <p class="muted">${tHtml('settings.privacy.note')}</p>
        ${siteLinks()}
      </section>

      <section class="settings-group" id="data">
        <h2>${say('settings.data.title')}</h2>
        <p class="muted">${say('settings.data.body')}</p>
        <div class="settings-actions">
          ${button({ label: t('settings.data.export'), variant: 'secondary', iconName: 'arrow', attrs: 'data-action="export"' })}
          ${button({ label: t('settings.data.import'), variant: 'secondary', attrs: 'data-action="import"' })}
          <input type="file" accept="application/json,.json" hidden data-import-file />
        </div>
      </section>

      <section class="settings-group settings-group--danger">
        <h2>${say('settings.reset.title')}</h2>
        <p class="muted">${say('settings.reset.body')}</p>
        ${button({ label: t('settings.reset.button'), variant: 'danger', attrs: 'data-action="reset"' })}
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
    toast(t('settings.profile.saved'));
  });

  root.addEventListener('click', (e) => {
    const pick = e.target.closest('[data-pick]');
    if (pick) {
      saveProfile({ avatar: { [pick.dataset.pick]: pick.dataset.value } });
      pick.parentElement.querySelectorAll('[data-pick]').forEach((b) => b.setAttribute('aria-checked', String(b === pick)));
      root.querySelector('[data-preview]').innerHTML = avatar(store.get().profile.avatar, { size: 88, label: t('settings.profile.avatar') });
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
      toast(t('settings.languages.switched', { target: languageLabel(to) }));
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
      toast(t(e.target.checked ? 'settings.privacy.adsOn' : 'settings.privacy.adsOff'));
      return;
    }
    if (key === 'pixel') {
      setPixelConsent(e.target.checked ? 'granted' : 'denied');
      toast(t(e.target.checked ? 'settings.privacy.pixelOn' : 'settings.privacy.pixelOff'));
      return;
    }
    if (key === 'reminder') {
      const wanted = e.target.checked;
      const on = await setReminders(wanted);
      e.target.checked = on;
      if (wanted && !on) toast(t('reminders.consent.blocked'), { duration: 4000 });
      root.querySelector('[data-hour-row]').hidden = !on;
      return;
    }
    store.update((s) => {
      s.settings[key] = e.target.checked;
    });
    if (key === 'speech') {
      root.querySelector('[data-speech-slow]').hidden = !e.target.checked;
      if (!e.target.checked) stopSpeech();
    }
    if ((key === 'speech' && e.target.checked) || key === 'speechSlow') {
      // The course's first word, so the learner hears the change.
      const [first] = Object.values(course.words);
      if (first) speak(first.target, { audio: first.audio });
    }
    if (key === 'sound' && e.target.checked) play('correct');
    if (key === 'haptics' && e.target.checked) play('tap');
  });

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    fileInput.value = '';
    if (!file) return;
    const text = await file.text();
    const ok = await openModal({
      title: t('settings.data.replaceTitle'),
      body: `<p>${say('settings.data.replaceBody')}</p>`,
      actions: [
        { label: t('settings.data.replaceYes'), value: 'yes' },
        { label: t('settings.data.cancel'), value: 'no', variant: 'ghost' },
      ],
    });
    if (ok !== 'yes') return;
    try {
      store.importJSON(text);
      // The file may be for another course or an older version of this one.
      await loadSaved();
      const state = store.get();
      refreshTopBar();
      toast(t('settings.data.imported', { thanks: course.phrases.thanks }), { variant: 'success' });
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
        toast(t('ads.settings.ended'));
      }
      root.querySelector('[data-ad-break-row]').innerHTML = adBreakRow();
      return;
    }
    if (action === 'export') {
      const name = store.get().profile?.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'learner';
      download(`learn-luganda-${name}-${new Date().toISOString().slice(0, 10)}.json`, store.exportJSON());
      toast(t('settings.data.exported'));
    }
    if (action === 'import') fileInput.click();
    if (action === 'reset') {
      const choice = await openModal({
        title: t('settings.reset.confirmTitle'),
        body: `<p>${say('settings.reset.confirmBody')}</p>`,
        art: mascot({ pose: 'sad' }),
        actions: [
          { label: t('settings.reset.keep'), value: 'keep' },
          { label: t('settings.reset.yes'), value: 'reset', variant: 'danger' },
        ],
      });
      if (choice === 'reset') {
        store.reset();
        toast(t('settings.reset.done'));
        navigate('/');
      }
    }
  });

  if (query.import) fileInput.click();
}
