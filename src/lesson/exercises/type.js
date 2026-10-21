/* Type the translation. Near misses pass with a "watch the spelling" note. */
import { langAttr, languageName } from '../../content/course.js';
import { escapeHtml } from '../../ui/components.js';
import { checkTyped } from '../answers.js';

export function renderType(ex, el, api) {
  el.innerHTML = `
    <div class="ex ex--type">
      <h2 class="ex__prompt">${escapeHtml(ex.prompt)}</h2>
      <div class="ex-translate__source"><p class="speech speech--left"${langAttr(ex.sourceLang)}>${escapeHtml(ex.source)}</p></div>
      <label class="visually-hidden" for="ex-type-input">Your answer</label>
      <textarea id="ex-type-input" class="input ex-type__input" rows="3" autocomplete="off" autocapitalize="off" spellcheck="false"${langAttr(ex.lang)} placeholder="Type in ${escapeHtml(languageName(ex.lang))}"></textarea>
    </div>`;
  const input = el.querySelector('textarea');
  input.addEventListener('input', () => api.setReady(input.value.trim().length > 0));
  input.addEventListener('keydown', (e) => {
    // Enter submits rather than adding a new line.
    if (e.key === 'Enter') e.preventDefault();
  });
  return {
    check() {
      input.readOnly = true;
      const { correct, typo, closest } = checkTyped(input.value, ex.accepted);
      return { correct, answerText: correct && !typo ? null : closest, note: typo ? 'You have a typo.' : '' };
    },
  };
}
