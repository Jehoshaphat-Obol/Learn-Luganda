import { afterEach, describe, expect, it } from 'vitest';
import { currentLanguage, setLanguage, UI_LANGUAGES } from '../src/i18n/index.js';
import { store } from '../src/state/store.js';
import { filterSheet, languageSwitcher, openLanguageSheet, switcherOptions } from '../src/ui/language-switcher.js';
import { ICON_NAMES } from '../src/ui/icons.js';
import { stop } from '../src/ui/cycle.js';

const nextTick = () => new Promise((r) => setTimeout(r, 0));

afterEach(async () => {
  document.body.innerHTML = '';
  store.update((s) => {
    s.settings.uiLang = null;
  });
  await setLanguage('en');
});

describe('language switcher', () => {
  it('shows the translate mark and, once picked, the language in its own name', async () => {
    expect(ICON_NAMES).toContain('translate');
    store.update((s) => {
      s.settings.uiLang = 'lg';
    });
    await setLanguage('lg');
    document.body.innerHTML = languageSwitcher();
    const btn = document.querySelector('[data-lang-switch]');
    expect(btn.querySelector('svg.icon')).not.toBeNull();
    expect(btn.textContent.trim()).toBe('Luganda');
    expect(btn.getAttribute('aria-label')).toContain('Olulimi');
  });

  it('says "Language" in every language while on Automatic', () => {
    document.body.innerHTML = languageSwitcher();
    const items = [...document.querySelectorAll('[data-lang-switch] .cycle__item')];
    expect(items.map((i) => i.textContent)).toEqual(['Language', 'Olulimi', 'Lugha']);
    expect(items.filter((i) => !i.hasAttribute('aria-hidden'))).toHaveLength(1);
    stop();
  });

  it('keeps the name in the label when compact', () => {
    document.body.innerHTML = languageSwitcher({ compact: true });
    const btn = document.querySelector('[data-lang-switch]');
    expect(btn.textContent.trim()).toBe('');
    expect(btn.getAttribute('aria-label')).toContain('English');
  });

  it('lists Automatic and every UI pack in its own name', () => {
    const options = switcherOptions(null);
    expect(options.map((o) => o.value)).toEqual(['auto', ...UI_LANGUAGES]);
    expect(options[0].checked).toBe(true);
    expect(options.find((o) => o.value === 'sw').name).toBe('Kiswahili');
    expect(options.find((o) => o.value === 'sw').detail).toBe('Swahili');
    expect(switcherOptions('lg').find((o) => o.value === 'lg').checked).toBe(true);
  });

  it('switches the interface language when one is picked', async () => {
    const done = openLanguageSheet();
    document.querySelector('.lang-sheet [data-value="sw"]').click();
    await done;
    expect(store.get().settings.uiLang).toBe('sw');
    expect(currentLanguage()).toBe('sw');
    expect(document.querySelector('.lang-sheet')).toBeNull();
  });

  it('goes back to automatic', async () => {
    store.update((s) => {
      s.settings.uiLang = 'lg';
    });
    const done = openLanguageSheet();
    document.querySelector('.lang-sheet [data-value="auto"]').click();
    await done;
    await nextTick();
    expect(store.get().settings.uiLang).toBeNull();
  });

  it('filters by any name a learner might type', () => {
    document.body.innerHTML = `<div class="s">
      <button data-search="sw swahili kiswahili"></button>
      <button data-search="lg luganda"></button>
      <p data-lang-sheet-none hidden></p></div>`;
    const sheet = document.querySelector('.s');
    filterSheet(sheet, 'kiswa');
    expect([...sheet.querySelectorAll('[data-search]')].map((b) => b.hidden)).toEqual([false, true]);
    filterSheet(sheet, 'zzz');
    expect(sheet.querySelector('[data-lang-sheet-none]').hidden).toBe(false);
  });
});
