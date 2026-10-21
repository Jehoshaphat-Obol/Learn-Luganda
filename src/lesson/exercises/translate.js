/*
 * Translate with a word bank: tap tiles to build the answer, tap a placed
 * tile to send it back.
 */
import { escapeHtml } from '../../ui/components.js';
import { isAccepted } from '../answers.js';

export function renderTranslate(ex, el, api) {
  const placed = []; // indexes into ex.bank
  el.innerHTML = `
    <div class="ex ex--translate">
      <h2 class="ex__prompt">${escapeHtml(ex.prompt)}</h2>
      <div class="ex-translate__source">
        <p class="speech speech--left" ${ex.sourceLang === 'lg' ? 'lang="lg"' : ''}>${escapeHtml(ex.source)}</p>
      </div>
      <div class="ex-translate__answer" data-answer aria-label="Your answer" aria-live="polite"></div>
      <div class="ex-translate__bank" data-bank>
        ${ex.bank.map((t, i) => `<button class="tile" type="button" data-tile="${i}" ${ex.lang === 'lg' ? 'lang="lg"' : ''}>${escapeHtml(t)}</button>`).join('')}
      </div>
    </div>`;

  const answerEl = el.querySelector('[data-answer]');
  const bankTiles = [...el.querySelectorAll('[data-tile]')];

  function draw() {
    answerEl.innerHTML = placed.map((i, pos) => `<button class="tile" type="button" data-placed="${pos}" ${ex.lang === 'lg' ? 'lang="lg"' : ''}>${escapeHtml(ex.bank[i])}</button>`).join('');
    bankTiles.forEach((b, i) => {
      const used = placed.includes(i);
      b.classList.toggle('is-used', used);
      b.disabled = used;
    });
    api.setReady(placed.length > 0);
  }

  el.addEventListener('click', (e) => {
    if (api.locked()) return;
    const tile = e.target.closest('[data-tile]');
    if (tile && !tile.disabled) {
      placed.push(Number(tile.dataset.tile));
      draw();
      return;
    }
    const back = e.target.closest('[data-placed]');
    if (back) {
      placed.splice(Number(back.dataset.placed), 1);
      draw();
    }
  });

  return {
    keydown(e) {
      if (e.key === 'Backspace' && placed.length) {
        placed.pop();
        draw();
        return true;
      }
      return false;
    },
    check() {
      const text = placed.map((i) => ex.bank[i]).join(' ');
      return { correct: isAccepted(text, ex.accepted), answerText: ex.answerText };
    },
  };
}
