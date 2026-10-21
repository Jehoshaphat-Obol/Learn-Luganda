import { afterEach, describe, expect, it, vi } from 'vitest';
import { hapticsOn, play, soundPack, vibrate } from '../src/ui/sound.js';
import { musicOn } from '../src/ui/music.js';
import { DEFAULTS } from '../src/state/store.js';
import { readdirSync, statSync } from 'node:fs';

describe('sound packs, music and haptics', () => {
  afterEach(() => {
    delete navigator.vibrate;
    delete window.matchMedia;
  });

  it('defaults to the playful pack and ignores unknown ones', () => {
    expect(soundPack({ settings: {} })).toBe('playful');
    expect(soundPack({ settings: { soundPack: 'soft' } })).toBe('soft');
    expect(soundPack({ settings: { soundPack: 'nope' } })).toBe('playful');
  });

  it('turns music on by default and off from the setting', () => {
    expect(musicOn({ settings: DEFAULTS.settings })).toBe(true);
    expect(musicOn({ settings: { music: false } })).toBe(false);
  });

  it('vibrates only where supported, turned on, and motion is not reduced', () => {
    expect(hapticsOn({ settings: { haptics: true } })).toBe(false);
    navigator.vibrate = vi.fn(() => true);
    expect(hapticsOn({ settings: { haptics: true } })).toBe(true);
    expect(hapticsOn({ settings: { haptics: false } })).toBe(false);
    window.matchMedia = vi.fn(() => ({ matches: true }));
    expect(hapticsOn({ settings: { haptics: true } })).toBe(false);
  });

  it('buzzes a pattern for answers, even with sound off', () => {
    navigator.vibrate = vi.fn(() => true);
    vibrate('wrong');
    expect(navigator.vibrate).toHaveBeenLastCalledWith([40, 60, 40]);
    play('correct');
    expect(navigator.vibrate).toHaveBeenLastCalledWith(20);
    play('not-an-effect');
    expect(navigator.vibrate).toHaveBeenCalledTimes(2);
  });

  it('bundles every effect in every pack, and keeps audio small', () => {
    const dir = 'public/audio';
    const files = (sub) => readdirSync(`${dir}/${sub}`).filter((f) => f.endsWith('.mp3'));
    expect(files('sfx/playful')).toEqual(files('sfx/soft'));
    expect(files('sfx/playful').length).toBe(13);
    const bytes = ['sfx/playful', 'sfx/soft', 'music'].flatMap((sub) => files(sub).map((f) => statSync(`${dir}/${sub}/${f}`).size));
    expect(bytes.reduce((a, b) => a + b, 0)).toBeLessThan(700 * 1024);
  });
});
