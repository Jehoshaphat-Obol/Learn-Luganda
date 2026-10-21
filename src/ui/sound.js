/*
 * Sound effects and haptics. Effects are short CC0 recordings bundled in
 * public/audio/sfx/<pack>/ (see public/audio/CREDITS.md) so they work
 * offline; until a file has loaded, or if it can't be decoded, a few
 * synthesised notes play instead. `play` also buzzes the phone where the
 * Vibration API exists (Android browsers; iOS Safari has none).
 * `settings.sound` mutes effects, `settings.haptics` stops buzzing.
 */
import { store } from '../state/store.js';

export const PACKS = { playful: 'Playful', soft: 'Soft' };
const DEFAULT_PACK = 'playful';
const VOLUME = 0.7;

// Effect name -> file name in each pack.
const FILES = {
  correct: 'success',
  wrong: 'error',
  tap: 'press',
  select: 'select',
  start: 'start',
  toggle: 'toggle-on',
  back: 'back',
  complete: 'complete',
  streak: 'streak',
  unlock: 'unlock',
  reward: 'reward',
  achievement: 'achievement',
  levelup: 'level-up',
};

// Vibration patterns in ms (buzz, pause, buzz...). Kept short and few.
const HAPTICS = {
  tap: 8,
  select: 8,
  correct: 20,
  wrong: [40, 60, 40],
  complete: [25, 50, 25, 50, 60],
  streak: [30, 50, 80],
  unlock: [20, 40, 20],
  reward: [20, 40, 20],
  achievement: [25, 50, 25, 50, 90],
  levelup: [25, 50, 25, 50, 90],
};

// Fallback synth: [frequency Hz, start s, length s, wave, gain]
const TAP = [[520, 0, 0.04, 'sine', 0.12]];
const UNLOCK = [
  [784, 0, 0.1, 'sine', 0.18],
  [1175, 0.09, 0.1, 'sine', 0.18],
  [1568, 0.18, 0.3, 'sine', 0.16],
];
const COMPLETE = [
  [523, 0, 0.12, 'triangle', 0.2],
  [659, 0.11, 0.12, 'triangle', 0.2],
  [784, 0.22, 0.12, 'triangle', 0.2],
  [1047, 0.33, 0.32, 'triangle', 0.22],
];
const SYNTH = {
  correct: [
    [660, 0, 0.09, 'triangle', 0.22],
    [990, 0.08, 0.16, 'triangle', 0.22],
  ],
  wrong: [
    [220, 0, 0.12, 'square', 0.08],
    [185, 0.11, 0.2, 'square', 0.08],
  ],
  tap: TAP,
  select: TAP,
  start: TAP,
  toggle: TAP,
  back: TAP,
  complete: COMPLETE,
  levelup: COMPLETE,
  streak: [
    [392, 0, 0.1, 'sawtooth', 0.08],
    [587, 0.09, 0.1, 'sawtooth', 0.08],
    [784, 0.18, 0.28, 'triangle', 0.2],
  ],
  unlock: UNLOCK,
  reward: UNLOCK,
  achievement: UNLOCK,
};

let ctx = null;
const buffers = new Map(); // 'pack/name' -> AudioBuffer once decoded
const loading = new Map(); // 'pack/name' -> Promise

/** The shared AudioContext (also used by the music), or null without Web Audio. */
export function audioContext() {
  const Ctor = globalThis.AudioContext ?? globalThis.webkitAudioContext;
  if (!Ctor) return null;
  ctx ??= new Ctor();
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

/** Fetches and decodes a bundled audio file; resolves to null on any failure. */
export function loadBuffer(path) {
  const ac = audioContext();
  if (!ac || typeof fetch !== 'function') return Promise.resolve(null);
  return fetch(new URL(path, document.baseURI))
    .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(r.statusText))))
    .then((data) => ac.decodeAudioData(data))
    .catch(() => null);
}

export function soundOn(state = store.get()) {
  return state.settings?.sound !== false;
}

export function soundPack(state = store.get()) {
  return PACKS[state.settings?.soundPack] ? state.settings.soundPack : DEFAULT_PACK;
}

export function hapticsSupported() {
  return typeof globalThis.navigator?.vibrate === 'function';
}

/** Haptics are on unless turned off, or the system asks for reduced motion. */
export function hapticsOn(state = store.get()) {
  const systemReduced = Boolean(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  return state.settings?.haptics !== false && !systemReduced && hapticsSupported();
}

/** Loads every effect in a pack in the background. */
export function preload(pack = soundPack()) {
  for (const [name, file] of Object.entries(FILES)) {
    const key = `${pack}/${name}`;
    if (loading.has(key)) continue;
    loading.set(
      key,
      loadBuffer(`audio/sfx/${pack}/${file}.mp3`).then((buf) => {
        if (buf) buffers.set(key, buf);
        return buf;
      }),
    );
  }
}

function synth(ac, name) {
  const t0 = ac.currentTime + 0.01;
  for (const [freq, start, length, type, gain] of SYNTH[name] ?? []) {
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

/** Buzzes a named pattern if haptics are on and supported. */
export function vibrate(name) {
  const pattern = HAPTICS[name];
  if (pattern === undefined || !hapticsOn()) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    // Some browsers throw without a recent user gesture; nothing to do.
  }
}

/** Plays a named effect (and its haptic) unless muted or unsupported. */
export function play(name) {
  if (!FILES[name]) return;
  vibrate(name);
  if (!soundOn()) return;
  const ac = audioContext();
  if (!ac) return;
  const pack = soundPack();
  const buffer = buffers.get(`${pack}/${name}`);
  if (!buffer) {
    preload(pack);
    synth(ac, name);
    return;
  }
  const src = ac.createBufferSource();
  const amp = ac.createGain();
  src.buffer = buffer;
  amp.gain.value = VOLUME;
  src.connect(amp).connect(ac.destination);
  src.start();
}

export const SOUNDS = Object.keys(FILES);
