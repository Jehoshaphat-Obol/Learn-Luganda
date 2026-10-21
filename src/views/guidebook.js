/*
 * Unit guidebook: key phrases, grammar tips and culture notes, plus the
 * unit's stories. `?tip=<id>` scrolls straight to one tip.
 */
import '../styles/stories.css';
import { course, langAttr } from '../content/course.js';
import { store } from '../state/store.js';
import { storyList } from '../state/stories.js';
import { portrait } from '../illustrations/index.js';
import { button, escapeHtml } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { richText, storyCard } from './stories.js';

// `targetColumns` lists the columns written in the target language (the
// first two unless a tip says otherwise).
function table(rows, targetColumns = [0, 1]) {
  const [head, ...body] = rows;
  return `<div class="guide-table"><table>
    <thead><tr>${head.map((h) => `<th scope="col">${escapeHtml(h)}</th>`).join('')}</tr></thead>
    <tbody>${body.map((r) => `<tr>${r.map((c, i) => `<td${langAttr(targetColumns.includes(i) ? 'target' : 'base')}>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`;
}

function note(item, kind) {
  return `<article class="card guide-note guide-note--${kind}"${item.id ? ` id="tip-${item.id}"` : ''}>
    <h3>${icon(kind === 'tip' ? 'bolt' : 'star', { size: 18 })}${escapeHtml(item.title)}</h3>
    ${item.body.map((p) => `<p>${richText(p)}</p>`).join('')}
    ${item.table ? table(item.table, item.targetColumns) : ''}
  </article>`;
}

export function guidebookView({ root, params, query, navigate }) {
  const unit = course.units.find((u) => u.id === params.unit);
  const book = course.guidebooks[params.unit];
  if (!unit || !book) {
    navigate('/learn', { replace: true });
    return;
  }
  const stories = storyList(store.get()).filter((x) => x.story.unit === unit.id);
  root.innerHTML = `
    <div class="page guide">
      <header class="guide__head">
        <div>
          <p class="eyebrow">Unit ${unit.index + 1} guidebook</p>
          <h1>${escapeHtml(unit.title)}</h1>
          <p class="muted">${escapeHtml(book.intro)}</p>
        </div>
        <div class="guide__art" aria-hidden="true">${portrait(unit.character, { expression: 'happy' })}</div>
      </header>

      <section class="guide__section" aria-labelledby="guide-phrases">
        <h2 id="guide-phrases">Key phrases</h2>
        <ul class="phrase-list">
          ${book.phrases.map((p) => `<li><strong${langAttr('target')}>${escapeHtml(p.target)}</strong><span${langAttr('base')}>${escapeHtml(p.base)}</span></li>`).join('')}
        </ul>
      </section>

      <section class="guide__section" aria-labelledby="guide-tips">
        <h2 id="guide-tips">Tips</h2>
        ${book.tips.map((t) => note(t, 'tip')).join('')}
      </section>

      <section class="guide__section" aria-labelledby="guide-culture">
        <h2 id="guide-culture">Culture</h2>
        ${book.culture.map((c) => note(c, 'culture')).join('')}
      </section>

      ${
        stories.length
          ? `<section class="guide__section" aria-labelledby="guide-stories">
              <h2 id="guide-stories">Stories</h2>
              <div class="story-list">${stories.map(storyCard).join('')}</div>
            </section>`
          : ''
      }
      <p class="guide__back">${button({ label: 'Back to the path', href: '#/learn', variant: 'secondary', iconName: 'back' })}</p>
    </div>`;

  if (query.tip) {
    const el = root.querySelector(`#tip-${CSS.escape(query.tip)}`);
    if (el) {
      el.classList.add('is-highlighted');
      el.scrollIntoView({ block: 'start' });
    }
  }
}
