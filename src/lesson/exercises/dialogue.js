/* Dialogue: a cast member speaks; choose the right reply. */
import { castMember, langAttr } from '../../content/course.js';
import { portrait } from '../../illustrations/index.js';
import { escapeHtml } from '../../ui/components.js';
import { icon } from '../../ui/icons.js';
import { speakButton } from '../../audio/speech.js';

export function renderDialogue(ex, el, api) {
  let selected = null;
  const speaker = castMember(ex.speaker);
  const who = speaker.name;
  el.innerHTML = `
    <div class="ex ex--dialogue">
      <h2 class="ex__prompt">${escapeHtml(ex.prompt)}</h2>
      <div class="ex-dialogue__scene">
        <div class="ex-dialogue__speaker">${portrait(speaker.look, { expression: 'happy' })}<span>${escapeHtml(who)}</span></div>
        <div class="speech speech--left ex-dialogue__line">
          <p${langAttr('target')}>${escapeHtml(ex.line)}${speakButton(ex.line, { speaker: ex.speaker, label: `Hear ${who}` })}</p>
          <button class="ex-dialogue__reveal" type="button" data-reveal aria-expanded="false">${icon('book', { size: 16 })} Show translation</button>
          <p class="ex-dialogue__translation muted" hidden>${escapeHtml(ex.translation)}</p>
        </div>
      </div>
      <div class="ex-choice__options" role="radiogroup" aria-label="Replies">
        ${ex.options.map((o, i) => `<button class="choice" type="button" role="radio" aria-checked="false" data-value="${escapeHtml(o)}"${langAttr('target')}><span class="choice__key">${i + 1}</span><span>${escapeHtml(o)}</span></button>`).join('')}
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
    const reveal = e.target.closest('[data-reveal]');
    if (reveal) {
      el.querySelector('.ex-dialogue__translation').hidden = false;
      reveal.setAttribute('aria-expanded', 'true');
      reveal.hidden = true;
      return;
    }
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
      return { correct, answerText: ex.answer };
    },
  };
}
