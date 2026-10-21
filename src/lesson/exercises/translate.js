/*
 * Translate with a word bank: tap tiles to build the answer, tap a placed
 * tile to send it back. "Use keyboard" swaps the bank for a text box (and
 * stays that way for the rest of the visit).
 */
import { langAttr, languageName } from '../../content/course.js';
import { escapeHtml } from '../../ui/components.js';
import { checkTyped, isAccepted } from '../answers.js';

let preferKeyboard = false;

export function renderTranslate(ex, el, api) {
  const placed = []; // indexes into ex.bank
  let typing = false;
  el.innerHTML = `
    <div class="ex ex--translate">
      <h2 class="ex__prompt">${escapeHtml(ex.prompt)}</h2>
      <div class="ex-translate__source">
        <p class="speech speech--left"${langAttr(ex.sourceLang)}>${escapeHtml(ex.source)}</p>
      </div>
      <div class="ex-translate__answer" data-answer aria-label="Your answer" aria-live="polite"></div>
      <div class="ex-translate__bank" data-bank>
        ${ex.bank.map((t, i) => `<button class="tile" type="button" data-tile="${i}"${langAttr(ex.lang)}>${escapeHtml(t)}</button>`).join('')}
      </div>
      <label class="visually-hidden" for="ex-translate-input">Your answer</label>
      <textarea id="ex-translate-input" class="input ex-type__input" rows="3" autocomplete="off" autocapitalize="off" spellcheck="false" hidden${langAttr(ex.lang)} placeholder="Type in ${escapeHtml(languageName(ex.lang))}"></textarea>
      <button class="btn btn--ghost btn--sm ex-translate__mode" type="button" data-mode>Use keyboard</button>
    </div>`;

  const answerEl = el.querySelector('[data-answer]');
  const bankEl = el.querySelector('[data-bank]');
  const bankTiles = [...el.querySelectorAll('[data-tile]')];
  const input = el.querySelector('textarea');
  const modeBtn = el.querySelector('[data-mode]');

  function setTyping(on, { focus = true } = {}) {
    typing = on;
    preferKeyboard = on;
    answerEl.hidden = on;
    bankEl.hidden = on;
    input.hidden = !on;
    modeBtn.textContent = on ? 'Use word bank' : 'Use keyboard';
    api.setReady(on ? input.value.trim().length > 0 : placed.length > 0);
    if (focus) (on ? input : bankTiles.find((b) => !b.disabled))?.focus();
  }

  input.addEventListener('input', () => api.setReady(input.value.trim().length > 0));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') e.preventDefault();
  });

  function draw() {
    answerEl.innerHTML = placed.map((i, pos) => `<button class="tile" type="button" data-placed="${pos}"${langAttr(ex.lang)}>${escapeHtml(ex.bank[i])}</button>`).join('');
    bankTiles.forEach((b, i) => {
      const used = placed.includes(i);
      b.classList.toggle('is-used', used);
      b.disabled = used;
    });
    api.setReady(placed.length > 0);
  }

  el.addEventListener('click', (e) => {
    if (api.locked()) return;
    if (e.target.closest('[data-mode]')) {
      setTyping(!typing);
      return;
    }
    const tile = e.target.closest('[data-tile]');
    if (tile && !tile.disabled) {
      placed.push(Number(tile.dataset.tile));
      draw();
      // Keep keyboard focus in the bank once this tile is disabled.
      if (document.activeElement === tile || document.activeElement === document.body) bankTiles.find((b) => !b.disabled)?.focus();
      return;
    }
    const back = e.target.closest('[data-placed]');
    if (back) {
      placed.splice(Number(back.dataset.placed), 1);
      draw();
    }
  });

  if (preferKeyboard) setTyping(true, { focus: false });

  return {
    keydown(e) {
      if (typing) return false;
      if (e.key === 'Backspace' && placed.length) {
        placed.pop();
        draw();
        return true;
      }
      return false;
    },
    check() {
      modeBtn.disabled = true;
      if (typing) {
        input.readOnly = true;
        const { correct, typo } = checkTyped(input.value, ex.accepted);
        return { correct, answerText: ex.answerText, note: typo ? 'You have a typo.' : '' };
      }
      const text = placed.map((i) => ex.bank[i]).join(' ');
      return { correct: isAccepted(text, ex.accepted), answerText: ex.answerText };
    },
  };
}
