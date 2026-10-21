import { describe, expect, it, vi } from 'vitest';
import { SOUNDS, play, soundOn } from '../src/ui/sound.js';
import { applyMotion, reducedMotion } from '../src/ui/motion.js';

describe('sound and motion preferences', () => {
  it('reads the sound setting', () => {
    expect(soundOn({ settings: { sound: true } })).toBe(true);
    expect(soundOn({ settings: { sound: false } })).toBe(false);
    expect(SOUNDS).toEqual(expect.arrayContaining(['correct', 'wrong', 'complete', 'streak']));
  });

  it('plays nothing without Web Audio', () => {
    expect(() => play('correct')).not.toThrow();
  });

  it('reduces motion from the setting or the system', () => {
    expect(reducedMotion({ settings: { motion: false } })).toBe(true);
    expect(reducedMotion({ settings: { motion: true } })).toBe(false);
    window.matchMedia = vi.fn(() => ({ matches: true }));
    expect(reducedMotion({ settings: { motion: true } })).toBe(true);
    applyMotion({ settings: { motion: true } });
    expect(document.documentElement.dataset.motion).toBe('reduce');
    delete window.matchMedia;
  });
});
