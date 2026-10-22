/*
 * The interface-language switcher: a button with the 文A translate mark and
 * the current language in its own name, so someone who reads no English can
 * still tell what it does. It opens a sheet listing every UI pack, each in
 * its own name with its small flag, plus "Automatic". Long lists get the
 * same search the language picker uses. While the language is Automatic
 * the pill says "Language" in every language in turn (./cycle.js); once
 * one is picked it shows that one's name.
 *
 *   languageSwitcher()          the button's HTML
 *   bindLanguageSwitcher(root)  opens the sheet from any button inside root,
 *                               now or after a redraw (call once per view)
 */
import { currentLanguage, languageLabel, t, UI_LANGUAGES } from '../i18n/index.js';
import { languageInfo } from '../i18n/languages.js';
import { languageSearchText, matchesSearch } from '../i18n/search.js';
import { autoUiLanguage, changeUiLanguage } from '../app/languages.js';
import { store } from '../state/store.js';
import { escapeHtml, openModal } from './components.js';
import { languageFlag } from './flags.js';
import { icon } from './icons.js';
import { cycleText, cyclePlaceholder, cycling } from './cycle.js';

/** Lists at least this long get a search box. */
export const SEARCH_FROM = 7;

const nativeOf = (code) => languageInfo(code).nativeName;

/**
 * The switcher button. `compact` shows only the icon (the name stays in the
 * accessible label and tooltip).
 */
export function languageSwitcher({ compact = false, className = '' } = {}) {
  const code = currentLanguage();
  const label = escapeHtml(t('languageSwitch.button', { language: nativeOf(code) }));
  return `<button class="lang-switch${compact ? ' lang-switch--compact' : ''} ${className}" type="button" data-lang-switch aria-haspopup="dialog" aria-label="${label}" title="${label}">
    ${icon('translate', { size: 20 })}${compact ? '' : `<span class="lang-switch__name">${cycling() ? cycleText('languageSwitch.short') : `<span lang="${code}">${escapeHtml(nativeOf(code))}</span>`}</span>`}
  </button>`;
}

/**
 * The sheet's choices as `{ value, name, detail, lang, checked }`: Automatic
 * first, then each pack in its own name, with its name in the interface
 * language beside it when that differs.
 */
export function switcherOptions(saved = store.get().settings.uiLang ?? null) {
  const auto = autoUiLanguage();
  return [
    { value: 'auto', name: t('settings.languages.automatic', { language: nativeOf(auto) }), detail: '', lang: null, checked: !saved },
    ...UI_LANGUAGES.map((code) => ({
      value: code,
      name: nativeOf(code),
      detail: languageLabel(code) === nativeOf(code) ? '' : languageLabel(code),
      lang: code,
      checked: saved === code,
    })),
  ];
}

function sheetBody(options) {
  const search = options.length >= SEARCH_FROM;
  const items = options.map((o) => {
    const text = o.lang ? ` data-search="${escapeHtml(languageSearchText(o.lang, o.detail))}"` : '';
    const lang = o.lang ? ` lang="${o.lang}" dir="${languageInfo(o.lang).dir}"` : '';
    return `<button class="choice lang-sheet__option" type="button" role="radio" aria-checked="${o.checked}" data-value="${o.value}"${text}>
      <strong${lang}>${o.lang ? languageFlag(o.lang) : icon('translate', { size: 18, className: 'lang-sheet__auto' })}${escapeHtml(o.name)}</strong>${o.detail ? `<span>${escapeHtml(o.detail)}</span>` : ''}
    </button>`;
  });
  return `${search ? `<div class="lang-sheet__search">${icon('search', { size: 18 })}<input class="input" type="search" data-lang-sheet-search ${cyclePlaceholder('picker.search.label')} autocomplete="off" spellcheck="false"></div>` : ''}
    <div class="lang-sheet__options" role="radiogroup" aria-label="${escapeHtml(t('languageSwitch.title'))}">${items.join('')}</div>
    ${search ? `<p class="lang-sheet__none" data-lang-sheet-none role="status" hidden>${escapeHtml(t('picker.search.none'))}</p>` : ''}`;
}

/** Shows only the options matching `text`; the "nothing found" line otherwise. */
export function filterSheet(sheet, text) {
  let shown = 0;
  for (const item of sheet.querySelectorAll('[data-search]')) {
    item.hidden = !matchesSearch(item.dataset.search, text);
    shown += !item.hidden;
  }
  const none = sheet.querySelector('[data-lang-sheet-none]');
  if (none) none.hidden = shown > 0;
}

/** Opens the sheet; resolves once the chosen language has loaded (or on dismiss). */
export async function openLanguageSheet() {
  const picked = openModal({ title: t('languageSwitch.title'), body: sheetBody(switcherOptions()), actions: [] });
  const sheet = document.querySelector('.modal-backdrop:last-of-type .modal');
  sheet?.classList.add('lang-sheet');
  sheet?.querySelector('[data-lang-sheet-search]')?.addEventListener('input', (e) => filterSheet(sheet, e.target.value));
  (sheet?.querySelector('[data-lang-sheet-search]') ?? sheet?.querySelector('[aria-checked="true"]'))?.focus();
  const value = await picked;
  if (!value) return;
  const code = value === 'auto' ? null : value;
  if (code === (store.get().settings.uiLang ?? null)) return;
  await changeUiLanguage(code);
}

/** Opens the sheet from any switcher button inside `root`. */
export function bindLanguageSwitcher(root) {
  root.addEventListener('click', (e) => {
    if (e.target.closest('[data-lang-switch]')) openLanguageSheet();
  });
}
