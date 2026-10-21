import { afterEach, describe, expect, it, vi } from 'vitest';
import { canSpeak, canSynthesize, pickVoice, SLOW, speak, speakButton, voiceProfile } from '../src/audio/speech.js';
import { course } from '../src/content/course.js';
import { buildLesson } from '../src/lesson/generate.js';
import { store } from '../src/state/store.js';

const voice = (name, lang, localService = true) => ({ name, lang, localService });
const VOICES = [voice('Google US English', 'en-US', false), voice('Microsoft Zira - English', 'en-US'), voice('Microsoft Rehema - Kiswahili (Female)', 'sw-KE'), voice('Microsoft Daudi - Kiswahili (Male)', 'sw-TZ')];

/** A fake speechSynthesis that records what it was asked to say. */
function fakeSynth(voices = VOICES) {
  const said = [];
  globalThis.speechSynthesis = { getVoices: () => voices, speak: (u) => (said.push(u), u.onend?.()), cancel: vi.fn() };
  globalThis.SpeechSynthesisUtterance = class {
    constructor(text) {
      this.text = text;
    }
  };
  return said;
}

afterEach(() => {
  delete globalThis.speechSynthesis;
  delete globalThis.SpeechSynthesisUtterance;
  store.update((s) => {
    s.settings.speech = true;
    s.settings.speechSlow = false;
  });
});

describe('choosing a voice', () => {
  it('prefers the target language, then the pack’s stand-ins', () => {
    expect(pickVoice(VOICES, 'en-GB').name).toBe('Microsoft Zira - English');
    expect(pickVoice(VOICES, 'lg')).toBeNull();
    expect(pickVoice(VOICES, 'lg', { fallbacks: ['sw'] }).lang).toMatch(/^sw/);
  });

  it('follows name hints, so each person can sound different', () => {
    expect(pickVoice(VOICES, 'lg', { fallbacks: ['sw'], hints: ['male'] }).name).toMatch(/Daudi/);
    expect(pickVoice(VOICES, 'lg', { fallbacks: ['sw'], hints: ['female'] }).name).toMatch(/Rehema/);
  });

  it('gives each cast member their own pitch and pace over the narrator’s', () => {
    expect(voiceProfile(null)).toEqual({ pitch: 1, rate: 0.9, volume: 1, hints: [] });
    const jjajja = voiceProfile('jjajja');
    expect(jjajja.rate).toBeLessThan(voiceProfile('ssali').rate);
    expect(voiceProfile('mukasa').pitch).toBeLessThan(voiceProfile('amara').pitch);
    expect(jjajja.hints).toContain('female');
  });
});

describe('speaking', () => {
  it('needs a device voice or a recording; otherwise no button', () => {
    expect(canSynthesize()).toBe(false);
    expect(speakButton('Oli otya')).toBe('');
    expect(speakButton('Oli otya', { audio: 'audio/oli.mp3' })).toMatch(/data-audio="audio\/oli.mp3"/);
    fakeSynth();
    expect(canSynthesize()).toBe(true);
    expect(speakButton('Oli otya', { speaker: 'nakato' })).toMatch(/data-speak="Oli otya" data-speaker="nakato"/);
    fakeSynth([voice('Zira', 'en-US')]);
    expect(canSynthesize()).toBe(false);
  });

  it('reads a line in the speaker’s voice, slower when asked', async () => {
    const said = fakeSynth();
    await speak('Gyendi', { speaker: 'mukasa' });
    expect(said[0]).toMatchObject({ text: 'Gyendi', pitch: 0.8, rate: 0.85, lang: 'sw-TZ' });
    store.update((s) => {
      s.settings.speechSlow = true;
    });
    await speak('Gyendi', { speaker: 'mukasa' });
    expect(said[1].rate).toBeCloseTo(0.85 * SLOW);
  });

  it('stays quiet when spoken words are turned off', async () => {
    const said = fakeSynth();
    store.update((s) => {
      s.settings.speech = false;
    });
    expect(canSpeak({ audio: 'x.mp3' })).toBe(false);
    await speak('Gyendi');
    expect(said).toEqual([]);
  });
});

describe('listening exercises', () => {
  const settings = (synthesized) => ({ ...course, lessons: { ...course.lessons, u1s1l1: { ...course.lessons.u1s1l1, settings: { ...course.lessons.u1s1l1.settings, lesson: { ...course.lessons.u1s1l1.settings.lesson, listen: { count: 2, synthesized } } } } } });
  const listens = (c, opts) => buildLesson('u1s1l1', { course: c, seed: 3, ...opts }).filter((e) => e.type === 'listen').length;

  it('come from the device voice only when the course allows it and a voice exists', () => {
    expect(listens(settings(false), { speakable: true })).toBe(0);
    expect(listens(settings(true), { speakable: false })).toBe(0);
    expect(listens(settings(true), { speakable: true })).toBe(2);
    expect(listens(settings(true), { speakable: true, listening: false })).toBe(0);
  });
});
