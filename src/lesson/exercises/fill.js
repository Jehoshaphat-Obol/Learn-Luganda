/* Fill in the blank: pick the missing word of a Luganda sentence. */
import { langAttr } from '../../content/course.js';
import { escapeHtml } from '../../ui/components.js';

export function renderFill(ex, el, api) {
  let selected = null;
  const [before, after] = ex.sentence.split('___');
  el.innerHTML = `
    <div class="ex ex--fill">
      <h2 class="ex__prompt">${escapeHtml(ex.prompt)}</h2>
      <p class="ex-fill__hint muted">${escapeHtml(ex.translation)}</p>
      <p class="ex-fill__sentence"${langAttr('target')}>${escapeHtml(before)}<span class="ex-fill__blank" data-blank>&nbsp;</span>${escapeHtml(after)}</p>
      <div class="ex-fill__options" role="radiogroup" aria-label="Answers">
        ${ex.options.map((o, i) => `<button class="tile" type="button" role="radio" aria-checked="false" data-value="${escapeHtml(o)}"${langAttr('target')}><span class="choice__key">${i + 1}</span>${escapeHtml(o)}</button>`).join('')}
      </div>
    </div>`;
  const buttons = [...el.querySelectorAll('[data-value]')];
  const blank = el.querySelector('[data-blank]');
  function select(btn) {
    if (api.locked()) return;
    selected = btn.dataset.value;
    buttons.forEach((b) => {
      b.setAttribute('aria-checked', String(b === btn));
      b.classList.toggle('is-selected', b === btn);
    });
    blank.textContent = selected;
    blank.classList.add('is-filled');
    api.setReady(true);
  }
  el.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-value]');
    if (btn) select(btn);
  });
  return {
    keydown(e) {
      const n = Number(e.key);
      if (n >= 1 && n <= buttons.length) {
        select(buttons[n - 1]);
        return true;
      }
      return false;
    },
    check() {
      const correct = selected === ex.answer;
      blank.classList.add(correct ? 'is-correct' : 'is-wrong');
      return { correct, answerText: ex.full };
    },
  };
}
