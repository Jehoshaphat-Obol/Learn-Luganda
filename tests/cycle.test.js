import { afterEach, describe, expect, it } from 'vitest';
import { setLanguage } from '../src/i18n/index.js';
import { store } from '../src/state/store.js';
import { cyclePlaceholder, cycleText, cycling, showWording, stop, wordings } from '../src/ui/cycle.js';

afterEach(async () => {
  stop();
  document.body.innerHTML = '';
  store.update((s) => {
    s.settings.uiLang = null;
    s.settings.motion = true;
  });
  await setLanguage('en');
});

describe('labels in every language', () => {
  it('lists every pack, the current language first', async () => {
    await setLanguage('sw');
    expect(wordings('landing.cta.start').map(([code]) => code)).toEqual(['sw', 'en', 'fr', 'lg']);
    expect(wordings('landing.cta.start')[0][1]).toBe('Anza sasa');
  });

  it('fades through the wordings together, the current one for screen readers', () => {
    document.body.innerHTML = `<p>${cycleText('landing.cta.start')}</p><p>${cycleText('onboarding.continue')}</p><input ${cyclePlaceholder('picker.search.label')}>`;
    const on = () => [...document.querySelectorAll('.cycle__item.is-on')].map((i) => i.lang);
    expect(on()).toEqual(['en', 'en']);
    expect(document.querySelectorAll('.cycle__item:not([aria-hidden])')).toHaveLength(2);
    showWording(1);
    expect(on()).toEqual(['fr', 'fr']);
    expect(document.querySelector('input').placeholder).toBe(wordings('picker.search.label')[1][1]);
    expect(document.querySelector('input').getAttribute('aria-label')).toBe('Search languages');
    showWording(4);
    expect(on()).toEqual(['en', 'en']);
  });

  it('stops once a language is picked', () => {
    store.update((s) => {
      s.settings.uiLang = 'sw';
    });
    expect(cycling()).toBe(false);
    expect(cycleText('landing.cta.start')).toBe('Get started');
    expect(cyclePlaceholder('picker.search.label')).not.toContain('data-cycle-placeholder');
  });

  it('never runs with reduced motion', () => {
    store.update((s) => {
      s.settings.motion = false;
    });
    expect(cycleText('landing.cta.start')).toBe('Get started');
  });
});
