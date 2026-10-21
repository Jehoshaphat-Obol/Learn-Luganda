/* A new word card: shown before the word is first tested. */
import { escapeHtml, pill } from '../../ui/components.js';

export function renderIntro(ex, el, api) {
  const w = ex.word;
  el.innerHTML = `
    <div class="ex ex--intro">
      ${pill('New word', { variant: 'primary', iconName: 'star' })}
      <p class="ex-intro__lg" lang="lg">${escapeHtml(w.lg)}</p>
      <p class="ex-intro__en">${escapeHtml(w.en)}</p>
      ${w.notes ? `<p class="ex-intro__notes caption">${escapeHtml(w.notes)}</p>` : ''}
    </div>`;
  api.setReady(true);
  return { check: () => ({ correct: null }) };
}
