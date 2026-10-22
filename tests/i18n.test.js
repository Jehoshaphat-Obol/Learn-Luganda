import { describe, expect, it, vi } from 'vitest';
import { deepFreeze } from '../src/i18n/freeze.js';
import { detectLanguage, flatten, format, lookup, placeholders } from '../src/i18n/format.js';
import { DEFAULT_LANGUAGE, UI_LANGUAGES, currentLanguage, detectUiLanguage, languageLabel, onLanguageChange, setLanguage, t, tList, useUiPack } from '../src/i18n/index.js';
import { LANGUAGES, languageInfo } from '../src/i18n/languages.js';
import { LIST_GROUPS, validateUiPack } from '../src/i18n/validate.js';
import en from '../src/packs/ui/en.json';
import lg from '../src/packs/ui/lg.json';

describe('formatting', () => {
  it('fills placeholders and leaves unknown ones visible', () => {
    expect(format('Hello, {name}!', { name: 'Amara' })).toBe('Hello, Amara!');
    expect(format('Hello, {name}!')).toBe('Hello, {name}!');
  });

  it('picks plural forms and formats numbers for the locale', () => {
    const days = { one: '{count} day', other: '{count} days' };
    expect(format(days, { count: 1 })).toBe('1 day');
    expect(format(days, { count: 2 })).toBe('2 days');
    expect(format(days, { count: 1200 })).toBe('1,200 days');
    expect(format({ zero: 'none yet', other: '{count} days' }, { count: 0 })).toBe('none yet');
    expect(format(days, { count: 1200 }, 'fr')).toMatch(/^1\s200 days$/);
  });

  it('reads dotted keys and lists placeholders', () => {
    expect(lookup({ a: { b: 'x' } }, 'a.b')).toBe('x');
    expect(lookup({ a: { b: 'x' } }, 'a')).toBeUndefined();
    expect(lookup({ a: 'x' }, 'a.b')).toBeUndefined();
    expect([...placeholders({ one: '{count} of {max}', other: '{count}' })]).toEqual(['count', 'max']);
    expect(flatten({ a: { b: 'x', c: { other: 'y' } } })).toEqual({ 'a.b': 'x', 'a.c': { other: 'y' } });
  });
});

describe('language detection', () => {
  const have = ['en', 'sw', 'pt-BR'];
  it('matches exact tags, then the primary language', () => {
    expect(detectLanguage(['pt-br'], have)).toBe('pt-BR');
    expect(detectLanguage(['sw-KE', 'en'], have)).toBe('sw');
    expect(detectLanguage(['lg-UG', 'sw'], have)).toBe('sw');
  });

  it('falls back to English', () => {
    expect(detectLanguage(['ha-NG'], have)).toBe('en');
    expect(detectLanguage([], have)).toBe('en');
    expect(detectLanguage(undefined, have)).toBe('en');
  });

  it('reads the browser list', () => {
    expect(UI_LANGUAGES[0]).toBe(DEFAULT_LANGUAGE);
    vi.stubGlobal('navigator', { languages: ['xx-YY', 'en-GB'] });
    expect(detectUiLanguage()).toBe('en');
    vi.unstubAllGlobals();
  });
});

describe('t()', () => {
  it('reads the English pack', () => {
    expect(t('nav.learn')).toBe('Learn');
    expect(t('stats.hearts', { count: 3, max: 5 })).toBe('3 of 5 hearts');
  });

  it('shows the key for a missing string', () => {
    expect(t('no.such.key')).toBe('no.such.key');
  });

  it('falls back to English for an unknown language and sets the page language', async () => {
    const seen = [];
    const off = onLanguageChange((c) => seen.push(c));
    document.documentElement.lang = 'xx';
    expect(await setLanguage('zz')).toBe('en');
    expect(currentLanguage()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
    expect(seen).toEqual([]);
    off();
  });
});

describe('packs are immutable', () => {
  it('deep-freezes nested objects', () => {
    const v = deepFreeze({ a: { b: [1, { c: 2 }] } });
    expect(Object.isFrozen(v.a.b[1])).toBe(true);
    expect(() => {
      v.a.b[1].c = 3;
    }).toThrow(TypeError);
  });

  it('freezes the language registry', () => {
    expect(Object.isFrozen(LANGUAGES[0])).toBe(true);
    expect(languageInfo('lg').greeting).toBe('Oli otya');
    expect(languageInfo('ar').dir).toBe('rtl');
    expect(languageInfo('qq').name).toBe('qq');
  });
});

describe('UI pack validation', () => {
  const meta = { code: 'sw', status: 'draft' };
  const languages = [{ code: 'sw' }];

  it('accepts a partial pack and lists what falls back', () => {
    const { errors, missing } = validateUiPack({ meta, strings: { nav: { learn: 'Jifunze' } } }, en, { code: 'sw', languages });
    expect(errors).toEqual([]);
    expect(missing).toContain('nav.practice');
    expect(missing).not.toContain('nav.learn');
  });

  it('rejects unknown keys, changed placeholders and mismatched plurals', () => {
    const { errors } = validateUiPack(
      { meta: { ...meta, code: 'xx' }, strings: { nav: { lern: 'x' }, stats: { hearts: { other: '{count}' }, gems: 'gems' } } },
      en,
      { code: 'sw', languages },
    );
    expect(errors.join('\n')).toMatch(/meta.code/);
    expect(errors.join('\n')).toMatch(/not in languages.json/);
    expect(errors.join('\n')).toMatch(/"nav.lern" is not an English key/);
    expect(errors.join('\n')).toMatch(/"stats.hearts" uses \{count\} but English uses \{count\}, \{max\}/);
    expect(errors.join('\n')).toMatch(/"stats.gems" must have plural forms/);
  });

  it('lets list groups have their own entries, without new placeholders', () => {
    const praise = { a: 'Vizuri!', b: 'Hongera!', c: 'Safi sana!' };
    const ok = validateUiPack({ meta, strings: { lesson: { praise } } }, en, { code: 'sw', languages });
    expect(ok.errors).toEqual([]);
    expect(ok.missing.some((k) => k.startsWith('lesson.praise.'))).toBe(false);
    const bad = validateUiPack({ meta, strings: { lesson: { praise: { a: 'Vizuri {name}!' } } } }, en, { code: 'sw', languages });
    expect(bad.errors.join('\n')).toMatch(/uses \{name\}/);
  });

  it('lists every group read with tList', () => {
    for (const group of LIST_GROUPS) expect(tList(group).length).toBeGreaterThan(0);
  });

  it('tList reads the active pack, falling back to English', () => {
    useUiPack({ meta, strings: { lesson: { praise: { a: 'Vizuri!' } } } });
    expect(tList('lesson.praise')).toEqual(['Vizuri!']);
    expect(tList('reminders.fresh')).toEqual(Object.values(en.strings.reminders.fresh));
    useUiPack(en);
  });

  it('passes for English itself', () => {
    expect(validateUiPack(en, en, { code: 'en', languages: LANGUAGES }).errors).toEqual([]);
  });

  it('has a complete Luganda pack, so Luganda speakers never see English', async () => {
    const { errors, missing } = validateUiPack(lg, en, { code: 'lg', languages: LANGUAGES });
    expect(errors).toEqual([]);
    expect(missing).toEqual([]);
    expect(UI_LANGUAGES).toContain('lg');
    expect(detectUiLanguage(['lg-UG', 'en'])).toBe('lg');
    expect(await setLanguage('lg')).toBe('lg');
    expect(t('nav.learn')).toBe('Yiga');
    expect(languageLabel('en')).toBe('Olungereza');
    expect(languageLabel('zz')).toBe('zz');
    expect(document.documentElement.lang).toBe('lg');
    await setLanguage('en');
  });
});
