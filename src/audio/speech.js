/*
 * Spoken words, sentences and lines, free and offline-friendly.
 *
 * A line plays, in order of preference:
 *   1. the recording the pack points to (`audio` on a word, sentence or line);
 *   2. the browser's own speech synthesis, when the device has a voice for
 *      the target language, or for a stand-in the pack allows
 *      (`settings.speech.fallbacks`, e.g. Swahili for Luganda);
 *   3. nothing: no speaker button is drawn.
 *
 * Each cast member can have a `voice` in course.json (pitch, rate, volume and
 * `hints`, words to look for in voice names such as "female" or "Zira"), so
 * the people in dialogues and stories sound different from each other.
 * Narration and word cards use the pack's default voice.
 */
import { course } from '../content/course.js';
import { store } from '../state/store.js';
import { escapeHtml } from '../ui/components.js';
import { icon } from '../ui/icons.js';

/** Rate multiplier for the "slow" setting. */
export const SLOW = 0.7;

const synth = () => globalThis.speechSynthesis ?? null;
const primary = (tag) => String(tag ?? '').toLowerCase().split(/[-_]/)[0];

/** Speech on and slow, from the saved settings. */
export const speechOn = (s = store.get()) => s.settings.speech !== false;
export const speechSlow = (s = store.get()) => Boolean(s.settings.speechSlow);

/**
 * The best voice for `lang` among `voices`: an exact language match, then the
 * same primary language, then each allowed fallback in turn. Among matches,
 * voices whose names contain one of `hints` win; local voices beat network
 * ones (which may need a connection). Returns null when nothing fits.
 */
export function pickVoice(voices, lang, { fallbacks = [], hints = [] } = {}) {
  // Whole words only, so "male" doesn't match "Female".
  const words = hints.map((h) => new RegExp(`\\b${String(h).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'));
  const byHint = (list) => words.map((w) => list.find((v) => w.test(v.name))).find(Boolean);
  const best = (list) => byHint(list) ?? list.find((v) => v.localService) ?? list[0] ?? null;
  for (const code of [lang, ...fallbacks]) {
    const exact = voices.filter((v) => v.lang?.toLowerCase() === code.toLowerCase());
    const same = voices.filter((v) => primary(v.lang) === primary(code));
    const found = best(exact.length ? exact : same);
    if (found) return found;
  }
  return null;
}

/** The voice settings for `speaker` (a cast id) or the narrator, merged over the pack's default. */
export function voiceProfile(speaker, c = course) {
  const base = c.settings.speech.voice;
  const own = speaker ? c.cast?.[speaker]?.voice : null;
  return { ...base, ...own, hints: [...(own?.hints ?? []), ...(base.hints ?? [])] };
}

/** The voices the device has right now. */
export const deviceVoices = () => synth()?.getVoices?.() ?? [];

/**
 * Resolves once the device's voices are known. Some browsers load them
 * after the page; give up after `wait` ms rather than hold the app.
 */
export function loadVoices(wait = 600) {
  const s = synth();
  if (!s || deviceVoices().length) return Promise.resolve(deviceVoices());
  return new Promise((resolve) => {
    const done = () => resolve(deviceVoices());
    s.addEventListener?.('voiceschanged', done, { once: true });
    setTimeout(done, wait);
  });
}

/** Whether the device can say target-language text for this course. */
export function canSynthesize(c = course, voices = deviceVoices()) {
  return Boolean(synth()) && Boolean(pickVoice(voices, c.to, { fallbacks: c.settings.speech.fallbacks }));
}

/** Whether an item (with optional `audio`) can be heard at all. */
export const canSpeak = (item = {}, c = course) => speechOn() && Boolean(item.audio || canSynthesize(c));

let current = null;

/** Stops whatever is playing. */
export function stopSpeech() {
  current?.pause?.();
  current = null;
  synth()?.cancel();
}

/**
 * Says `text` (target language) as `speaker`, or plays `audio` when the pack
 * has a recording. Resolves when done (or at once if speech is off).
 */
export function speak(text, { audio, speaker, c = course, slow = speechSlow() } = {}) {
  if (!speechOn()) return Promise.resolve();
  stopSpeech();
  if (audio) {
    const player = new Audio(audio);
    player.playbackRate = slow ? SLOW : 1;
    current = player;
    return new Promise((resolve) => {
      player.onended = resolve;
      player.onerror = resolve;
      player.play().catch(resolve);
    });
  }
  const s = synth();
  if (!s) return Promise.resolve();
  const profile = voiceProfile(speaker, c);
  const voice = pickVoice(deviceVoices(), c.to, { fallbacks: c.settings.speech.fallbacks, hints: profile.hints });
  if (!voice) return Promise.resolve();
  const u = new SpeechSynthesisUtterance(text);
  u.voice = voice;
  u.lang = voice.lang;
  u.pitch = profile.pitch;
  u.rate = profile.rate * (slow ? SLOW : 1);
  u.volume = profile.volume;
  return new Promise((resolve) => {
    u.onend = resolve;
    u.onerror = resolve;
    s.speak(u);
  });
}

/** A speaker button for target-language text, or '' when it can't be heard. */
export function speakButton(text, { audio, speaker, label = 'Listen', size = 20, className = '' } = {}) {
  if (!canSpeak({ audio })) return '';
  const attrs = [`data-speak="${escapeHtml(text)}"`, audio ? `data-audio="${escapeHtml(audio)}"` : '', speaker ? `data-speaker="${escapeHtml(speaker)}"` : ''].filter(Boolean).join(' ');
  return `<button class="speak-btn ${className}" type="button" ${attrs} aria-label="${escapeHtml(label)}">${icon('speaker', { size })}</button>`;
}

/** Plays speaker buttons anywhere in the app (one listener on the document). */
export function startSpeech(root = document) {
  root.addEventListener('click', (e) => {
    const btn = e.target.closest?.('[data-speak]');
    if (!btn) return;
    e.preventDefault();
    btn.classList.add('is-playing');
    speak(btn.dataset.speak, { audio: btn.dataset.audio, speaker: btn.dataset.speaker }).finally(() => btn.classList.remove('is-playing'));
  });
  // Leaving a screen ends whatever it was saying.
  globalThis.addEventListener?.('hashchange', stopSpeech);
  return loadVoices();
}
