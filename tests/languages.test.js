import { describe, expect, it } from 'vitest';
import regions from '../src/packs/regions.json';
import { coursesFrom, coursesTo, languageRoles, likelyLanguages, pairsOf, suggestLanguage } from '../src/i18n/catalog.js';
import { languageFlow, replyToGuess } from '../src/views/language-picker.js';
import { DEFAULTS } from '../src/state/store.js';
import { hasStarted, switchCourse } from '../src/state/courses.js';

// A wider catalogue than the app ships today, to exercise every branch.
const PAIRS = pairsOf(['en-lg', 'en-ar', 'ar-en', 'en-sw', 'sw-en', 'fr-sw']);

describe('catalogue', () => {
  it('splits course ids into from and to', () => {
    expect(pairsOf(['en-lg', 'en-zh-hant'])).toEqual([
      { id: 'en-lg', from: 'en', to: 'lg' },
      { id: 'en-zh-hant', from: 'en', to: 'zh-hant' },
    ]);
  });

  it('knows what each language can do', () => {
    expect(languageRoles('lg', PAIRS)).toEqual({ canLearn: true, canSpeak: false });
    expect(languageRoles('ar', PAIRS)).toEqual({ canLearn: true, canSpeak: true });
    expect(languageRoles('fr', PAIRS)).toEqual({ canLearn: false, canSpeak: true });
    expect(coursesFrom('en', PAIRS).map((p) => p.to)).toEqual(['lg', 'ar', 'sw']);
    expect(coursesTo('sw', PAIRS).map((p) => p.from)).toEqual(['en', 'fr']);
  });
});

describe('the first guess', () => {
  it('maps a time zone to the languages used there, then the browser’s', () => {
    expect(likelyLanguages({ timeZone: 'Asia/Dubai', preferred: ['en-GB'], regions })).toEqual({ country: 'AE', languages: ['ar', 'en'] });
    expect(likelyLanguages({ timeZone: 'Africa/Kampala', preferred: ['fr'], regions }).languages).toEqual(['lg', 'en', 'sw', 'nyn', 'fr']);
    expect(likelyLanguages({ timeZone: 'Mars/Olympus', preferred: ['sw-KE'], regions })).toEqual({ country: null, languages: ['sw'] });
  });

  it('suggests Arabic in the UAE, which can go either way', () => {
    expect(suggestLanguage({ timeZone: 'Asia/Dubai', preferred: [], regions, pairs: PAIRS })).toEqual({ code: 'ar', country: 'AE', canLearn: true, canSpeak: true });
  });

  it('skips languages with no course on either side', () => {
    // Today only English→Luganda ships: in the UAE that means English.
    const shipped = pairsOf(['en-lg']);
    expect(suggestLanguage({ timeZone: 'Asia/Dubai', preferred: [], regions, pairs: shipped })).toMatchObject({ code: 'en', canSpeak: true, canLearn: false });
    expect(suggestLanguage({ timeZone: 'Africa/Kampala', preferred: [], regions, pairs: shipped })).toMatchObject({ code: 'lg', canLearn: true });
    expect(suggestLanguage({ timeZone: null, preferred: ['de'], regions, pairs: shipped })).toBeNull();
  });
});

describe('the get-started flow', () => {
  const arabic = { code: 'ar', country: 'AE', canLearn: true, canSpeak: true };

  it('asks about the guess first', () => {
    expect(languageFlow({}, { suggestion: arabic, pairs: PAIRS })).toMatchObject({ stage: 'guess', course: null });
  });

  it('learning the guess asks which language to learn it from', () => {
    const answers = replyToGuess('learn', arabic, PAIRS);
    expect(answers).toEqual({ langAnswer: 'learn', learn: 'ar', course: 'en-ar' });
    const flow = languageFlow(answers, { suggestion: arabic, pairs: PAIRS });
    expect(flow.stage).toBe('base');
    expect(flow.options.map((p) => p.id)).toEqual(['en-ar']);
    expect(flow.course.id).toBe('en-ar');
  });

  it('speaking the guess asks what to learn, and waits for a pick when there are several', () => {
    const swahili = { code: 'sw', canLearn: true, canSpeak: true };
    const answers = replyToGuess('learn', swahili, PAIRS);
    expect(answers.course).toBeNull();
    expect(languageFlow(answers, { suggestion: swahili, pairs: PAIRS }).options.map((p) => p.from)).toEqual(['en', 'fr']);

    const speak = replyToGuess('speak', arabic, PAIRS);
    expect(speak).toEqual({ langAnswer: 'speak', speak: 'ar', course: 'ar-en' });
    expect(languageFlow(speak, { suggestion: arabic, pairs: PAIRS })).toMatchObject({ stage: 'target', none: false });
  });

  it('offers every course when nothing is taught from the learner’s language yet', () => {
    const flow = languageFlow({ langAnswer: 'speak', speak: 'lg' }, { suggestion: null, pairs: PAIRS });
    expect(flow).toMatchObject({ stage: 'target', none: true });
    expect(flow.options).toHaveLength(PAIRS.length);
  });

  it('“something else” and no guess open the full picker', () => {
    expect(replyToGuess('other')).toEqual({ langAnswer: 'other', course: null });
    const flow = languageFlow({ langAnswer: 'other', speak: 'fr' }, { suggestion: arabic, pairs: PAIRS });
    expect(flow).toMatchObject({ stage: 'pick', bases: ['en', 'ar', 'sw', 'fr'], speak: 'fr' });
    expect(flow.options.map((p) => p.id)).toEqual(['fr-sw']);
    expect(languageFlow({}, { suggestion: null, pairs: PAIRS })).toMatchObject({ stage: 'pick', speak: 'en' });
  });
});

describe('progress per course', () => {
  const state = () => {
    const s = structuredClone(DEFAULTS);
    s.xp = 120;
    s.lessons = { 'u1-l1': { completed: 1 } };
    s.words = { oli: { box: 2 } };
    return s;
  };

  it('parks the active course and starts the new one fresh', () => {
    const s = switchCourse(state(), 'en-sw');
    expect(s.settings.course).toBe('en-sw');
    expect(s.lessons).toEqual({});
    expect(s.words).toEqual({});
    expect(s.courses['en-lg'].lessons).toEqual({ 'u1-l1': { completed: 1 } });
    expect(s.xp).toBe(120);
    expect(hasStarted(s, 'en-lg')).toBe(true);
    expect(hasStarted(s, 'en-sw')).toBe(false);
  });

  it('brings a course’s progress back when switching home', () => {
    const s = switchCourse(switchCourse(state(), 'en-sw'), 'en-lg');
    expect(s.lessons).toEqual({ 'u1-l1': { completed: 1 } });
    expect(s.words).toEqual({ oli: { box: 2 } });
    expect(s.courses['en-lg']).toBeUndefined();
    expect(Object.keys(s.courses)).toEqual(['en-sw']);
  });

  it('switching to the active course changes nothing', () => {
    const s = state();
    expect(switchCourse(s, 'en-lg')).toBe(s);
    expect(s.courses).toEqual({});
  });
});
