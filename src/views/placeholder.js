/* A stand-in for screens that later issues build. */
import { emptyStateArt } from '../illustrations/index.js';
import { button, escapeHtml } from '../ui/components.js';

export function placeholderView(title, note) {
  return ({ root }) => {
    root.innerHTML = `
      <section class="empty-state">
        <div class="empty-state__art">${emptyStateArt('empty')}</div>
        <h1>${escapeHtml(title)}</h1>
        <p class="muted">${escapeHtml(note)}</p>
        ${button({ label: 'Back to learning', href: '#/learn', variant: 'secondary' })}
      </section>`;
  };
}
