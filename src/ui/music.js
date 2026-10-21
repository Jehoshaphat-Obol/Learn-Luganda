/*
 * Background music: one quiet loop (public/audio/music/), played on the
 * app's home screens only. Lessons and stories stay silent so recordings
 * are easy to hear. Browsers block audio until the learner interacts, so
 * nothing starts before the first tap or key press. `settings.music`
 * turns it off; it also pauses while the tab is hidden.
 */
import { store } from '../state/store.js';
import { audioContext, loadBuffer } from './sound.js';

const TRACK = 'audio/music/amadinda-loop.mp3';
const LOOP_SECONDS = 31.3; // the rendered length; mp3 padding sits past it
const VOLUME = 0.22;

let scene = false; // the current screen wants music
let unlocked = false; // the learner has interacted
let track = null; // Promise<AudioBuffer|null>
let playing = null; // { src, amp }
let generation = 0;

export function musicOn(state = store.get()) {
  return state.settings?.music !== false;
}

function shouldPlay() {
  return scene && unlocked && musicOn() && globalThis.document?.visibilityState !== 'hidden';
}

async function start() {
  const ac = audioContext();
  if (!ac || playing) return;
  const gen = ++generation;
  track ??= loadBuffer(TRACK);
  const buffer = await track;
  if (!buffer) track = null; // try again next time, e.g. once back online
  if (!buffer || gen !== generation || playing || !shouldPlay()) return;
  const src = ac.createBufferSource();
  const amp = ac.createGain();
  src.buffer = buffer;
  src.loop = true;
  src.loopEnd = Math.min(LOOP_SECONDS, buffer.duration);
  amp.gain.setValueAtTime(0.0001, ac.currentTime);
  amp.gain.exponentialRampToValueAtTime(VOLUME, ac.currentTime + 1.5);
  src.connect(amp).connect(ac.destination);
  src.start();
  playing = { src, amp };
}

function stop() {
  generation++;
  if (!playing) return;
  const { src, amp } = playing;
  playing = null;
  const t = src.context.currentTime;
  amp.gain.cancelScheduledValues(t);
  amp.gain.setValueAtTime(Math.max(amp.gain.value, 0.0001), t);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
  src.stop(t + 0.65);
}

/** Starts or stops the loop to match the screen, settings and visibility. */
export function syncMusic() {
  if (shouldPlay()) start();
  else stop();
}

/** Called on each route change: `active` is true on screens with music. */
export function setMusicScene(active) {
  scene = active;
  syncMusic();
}

/** Wires up the first-interaction unlock, settings and tab visibility. */
export function initMusic() {
  const unlock = () => {
    unlocked = true;
    syncMusic();
    document.removeEventListener('pointerdown', unlock);
    document.removeEventListener('keydown', unlock);
  };
  document.addEventListener('pointerdown', unlock);
  document.addEventListener('keydown', unlock);
  document.addEventListener('visibilitychange', syncMusic);
  store.subscribe(syncMusic);
}

/** Flips the music setting (the top bar button). */
export function toggleMusic() {
  store.update((s) => {
    s.settings.music = !musicOn(s);
  });
}
