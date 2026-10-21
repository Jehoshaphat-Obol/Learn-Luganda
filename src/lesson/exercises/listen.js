/*
 * Listening: hear the target-language answer and build it from tiles. The
 * recording plays when the pack has one, otherwise the device's voice
 * (only generated then when the course allows it; see listen.synthesized).
 */
import { langAttr } from '../../content/course.js';
import { escapeHtml } from '../../ui/components.js';
import { icon } from '../../ui/icons.js';
import { isAccepted } from '../answers.js';
import { speak } from '../../audio/speech.js';

export function renderListen(ex, el, api) {
  const placed = [];
  el.innerHTML = `
    <div class="ex ex--listen">
      <h2 class="ex__prompt">${escapeHtml(ex.prompt)}</h2>
      <div class="ex-listen__controls">
        <button class="btn btn--blue ex-listen__play" type="button" data-play aria-label="Play audio">${icon('speaker', { size: 40 })}</button>
      </div>
      <div class="ex-translate__answer" data-answer aria-live="polite"></div>
      <div class="ex-translate__bank">${ex.bank.map((t, i) => `<button class="tile" type="button" data-tile="${i}"${langAttr('target')}>${escapeHtml(t)}</button>`).join('')}</div>
    </div>`;
  const answerEl = el.querySelector('[data-answer]');
  const tiles = [...el.querySelectorAll('[data-tile]')];
  const play = () => speak(ex.answerText, { audio: ex.audio });
  function draw() {
    answerEl.innerHTML = placed.map((i, pos) => `<button class="tile" type="button" data-placed="${pos}"${langAttr('target')}>${escapeHtml(ex.bank[i])}</button>`).join('');
    tiles.forEach((b, i) => {
      b.disabled = placed.includes(i);
      b.classList.toggle('is-used', b.disabled);
    });
    api.setReady(placed.length > 0);
  }
  el.addEventListener('click', (e) => {
    if (e.target.closest('[data-play]')) return play();
    if (api.locked()) return undefined;
    const tile = e.target.closest('[data-tile]');
    if (tile && !tile.disabled) placed.push(Number(tile.dataset.tile));
    const back = e.target.closest('[data-placed]');
    if (back) placed.splice(Number(back.dataset.placed), 1);
    draw();
    return undefined;
  });
  setTimeout(play, 300);
  return {
    check: () => ({ correct: isAccepted(placed.map((i) => ex.bank[i]).join(' '), ex.accepted), answerText: ex.answerText }),
  };
}
