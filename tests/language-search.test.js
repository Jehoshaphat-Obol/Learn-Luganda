import { describe, expect, it } from 'vitest';
import { LANGUAGES } from '../src/i18n/languages.js';
import { foldText, languageSearchText, matchesSearch } from '../src/i18n/search.js';
import { flagUrl, languageFlag } from '../src/ui/flags.js';

describe('finding a language by typing', () => {
  const find = (query) => LANGUAGES.filter((l) => matchesSearch(languageSearchText(l.code), query)).map((l) => l.code);

  it('folds case, accents and apostrophes', () => {
    expect(foldText('  Français ')).toBe('francais');
    expect(foldText('Yorùbá')).toBe('yoruba');
    expect(foldText('Lingála  ’n')).toBe('lingala n');
  });

  it('matches English names, native names and codes', () => {
    expect(find('swahili')).toEqual(['sw']);
    expect(find('kiswa')).toEqual(['sw']);
    expect(find('francais')).toEqual(['fr']);
    expect(find('LUG')).toContain('lg');
    expect(find('nyn')).toEqual(['nyn']);
  });

  it('matches the name in the interface language too', () => {
    expect(matchesSearch(languageSearchText('en', 'Kiingereza'), 'kiinge')).toBe(true);
  });

  it('needs every word to match, and an empty search matches all', () => {
    expect(find('isi zulu')).toEqual(['zu']);
    expect(find('')).toHaveLength(LANGUAGES.length);
    expect(find('klingon')).toEqual([]);
  });
});

describe('flags', () => {
  it('has a drawing for every flag in the registry', () => {
    const missing = LANGUAGES.filter((l) => l.flag && !flagUrl(l.flag)).map((l) => l.code);
    expect(missing).toEqual([]);
  });

  it('draws a small decorative image, or nothing when a language has no flag', () => {
    expect(languageFlag('lg')).toMatch(/^<img class="flag" src="[^"]+" alt="" width="20" height="15"/);
    expect(languageFlag('ar')).toBe('');
  });
});
