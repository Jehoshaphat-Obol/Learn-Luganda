/* Multiple choice: pick the translation of a word. Keys 1–4 select. */
import { langAttr } from '../../content/course.js';
import { escapeHtml } from '../../ui/components.js';

export function renderChoice(ex, el, api) {
  let selected = null;
  el.innerHTML = `
    <div class="ex ex--choice">
      <h2 class="ex__prompt">${escapeHtml(ex.prompt)}</h2>
      <div class="ex-choice__options" role="radiogroup" aria-label="Answers">
        ${ex.options.map((o, i) => `<button class="choice" type="button" role="radio" aria-checked="false" data-value="${escapeHtml(o.value)}" ${langAttr(ex.lang)}><span class="choice__key">${i + 1}</span><span>${escapeHtml(o.text)}</span></button>`).join('')}
      </div>
    </div>`;

  const buttons = [...el.querySelectorAll('[data-value]')];
  function select(btn) {
    if (api.locked()) return;
    selected = btn.dataset.value;
    buttons.forEach((b) => b.setAttribute('aria-checked', String(b === btn)));
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
      buttons.forEach((b) => {
        if (b.dataset.value === ex.answer) b.classList.add('is-correct');
        else if (b.dataset.value === selected) b.classList.add('is-wrong');
      });
      return { correct, answerText: ex.answerText };
    },
  };
}
