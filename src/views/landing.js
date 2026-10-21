/* Temporary landing screen; the full landing page is issue #8. */
import { button } from '../ui/components.js';

export function landingView({ root }) {
  root.innerHTML = `
    <section class="empty-state">
      <svg class="empty-state__mark" viewBox="0 0 200 200" role="img" aria-label="Bauhaus shapes">
        <circle cx="78" cy="80" r="52" fill="var(--color-paper-400)" />
        <rect x="96" y="96" width="78" height="78" fill="var(--color-ink-900)" />
        <path d="M26 176 L96 176 L26 106 Z" fill="var(--color-ink-700)" />
        <circle cx="140" cy="54" r="22" fill="var(--color-primary)" />
      </svg>
      <h1>Oli otya! <strong>Learn Luganda.</strong></h1>
      <p class="muted">Learn Luganda with bite-sized, game-like lessons.</p>
      ${button({ label: 'Tandika', size: 'lg', href: '#/learn' })}
      <p class="caption"><em>Tandika</em> means "start".</p>
    </section>`;
}
