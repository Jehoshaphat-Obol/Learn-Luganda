/*
 * Sound effects synthesised with Web Audio, so there are no files to load.
 * Each effect is a few short notes; `settings.sound` mutes them all.
 */
import { store } from '../state/store.js';

// [frequency Hz, start s, length s, wave, gain]
const EFFECTS = {
  correct: [
    [660, 0, 0.09, 'triangle', 0.22],
    [990, 0.08, 0.16, 'triangle', 0.22],
  ],
  wrong: [
    [220, 0, 0.12, 'square', 0.08],
    [185, 0.11, 0.2, 'square', 0.08],
  ],
  tap: [[520, 0, 0.04, 'sine', 0.12]],
  complete: [
    [523, 0, 0.12, 'triangle', 0.2],
    [659, 0.11, 0.12, 'triangle', 0.2],
    [784, 0.22, 0.12, 'triangle', 0.2],
    [1047, 0.33, 0.32, 'triangle', 0.22],
  ],
  streak: [
    [392, 0, 0.1, 'sawtooth', 0.08],
    [587, 0.09, 0.1, 'sawtooth', 0.08],
    [784, 0.18, 0.28, 'triangle', 0.2],
  ],
  unlock: [
    [784, 0, 0.1, 'sine', 0.18],
    [1175, 0.09, 0.1, 'sine', 0.18],
    [1568, 0.18, 0.3, 'sine', 0.16],
  ],
};

let ctx = null;

function context() {
  const Ctor = globalThis.AudioContext ?? globalThis.webkitAudioContext;
  if (!Ctor) return null;
  ctx ??= new Ctor();
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

export function soundOn(state = store.get()) {
  return state.settings?.sound !== false;
}

/** Plays a named effect unless sound is off or unsupported. */
export function play(name) {
  const notes = EFFECTS[name];
  if (!notes || !soundOn()) return;
  const ac = context();
  if (!ac) return;
  const t0 = ac.currentTime + 0.01;
  for (const [freq, start, length, type, gain] of notes) {
    const osc = ac.createOscillator();
    const amp = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    amp.gain.setValueAtTime(0.0001, t0 + start);
    amp.gain.exponentialRampToValueAtTime(gain, t0 + start + 0.01);
    amp.gain.exponentialRampToValueAtTime(0.0001, t0 + start + length);
    osc.connect(amp).connect(ac.destination);
    osc.start(t0 + start);
    osc.stop(t0 + start + length + 0.02);
  }
}

export const SOUNDS = Object.keys(EFFECTS);
