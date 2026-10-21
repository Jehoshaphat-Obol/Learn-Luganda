/* Dev route that shows every UI kit component in one place. */
import { button, progressBar, ring, pill, speech, toast, openModal } from '../ui/components.js';
import { icon, ICON_NAMES } from '../ui/icons.js';
import { mascot } from '../illustrations/index.js';

export function styleguideView({ root }) {
  const swatches = [
    'vermillion-50', 'vermillion-100', 'vermillion-300', 'vermillion-500', 'vermillion-600', 'vermillion-700',
    'paper-50', 'paper-200', 'paper-400', 'ink-500', 'ink-700', 'ink-900',
    'bauhaus-yellow', 'bauhaus-blue', 'success', 'error',
    'pastel-butter', 'pastel-blush', 'pastel-sky', 'pastel-sage', 'pastel-lilac',
  ];

  root.innerHTML = `
    <div class="page page--wide styleguide">
      <header class="page__header">
        <p class="eyebrow">Nº 07 · UI kit</p>
        <h1>Style <strong>guide</strong></h1>
        <p class="muted">Every component the app is built from, on the theme tokens.</p>
      </header>

      <section class="sg-section">
        <h2>Colour</h2>
        <div class="sg-swatches">
          ${swatches.map((s) => `<figure class="sg-swatch"><span style="background:var(--color-${s})"></span><figcaption>${s}</figcaption></figure>`).join('')}
        </div>
      </section>

      <section class="sg-section">
        <h2>Type</h2>
        <h1>Oli otya? <strong>Gyendi.</strong></h1>
        <h2>Light heading, <strong>bold phrase</strong></h2>
        <h3>Section title</h3>
        <p>Body copy in Inter. Luganda has long and short vowels: <em>kula</em> (grow) and <em>kuula</em> (pluck).</p>
        <p class="caption">okuyiga — v. to learn, a little every day</p>
      </section>

      <section class="sg-section">
        <h2>Buttons</h2>
        <div class="sg-row">
          ${button({ label: 'Continue' })}
          ${button({ label: 'Secondary', variant: 'secondary' })}
          ${button({ label: 'Correct', variant: 'success' })}
          ${button({ label: 'Wrong', variant: 'danger' })}
          ${button({ label: 'Blue', variant: 'blue' })}
          ${button({ label: 'Ghost', variant: 'ghost' })}
          ${button({ label: 'Disabled', disabled: true })}
        </div>
        <div class="sg-row">${button({ label: 'Start lesson', size: 'lg', iconName: 'arrow' })}</div>
        <div class="sg-row">
          <button class="tile" type="button">ssebo</button>
          <button class="tile is-selected" type="button">nnyabo</button>
          <button class="tile is-used" type="button">mukwano</button>
        </div>
      </section>

      <section class="sg-section">
        <h2>Progress</h2>
        ${progressBar(0.35)}
        <div class="sg-row">
          ${ring(0.7, { content: icon('bolt', { size: 22 }), label: 'Daily goal' })}
          ${ring(1, { size: 72, content: '<strong>20</strong>', label: 'Daily goal' })}
        </div>
      </section>

      <section class="sg-section">
        <h2>Pills and cards</h2>
        <div class="sg-row">
          ${pill('New word', { variant: 'primary' })}
          ${pill('3 day streak', { variant: 'yellow', iconName: 'flame' })}
          ${pill('Unit 1', {})}
          ${pill('Legendary', { variant: 'blue', iconName: 'star' })}
        </div>
        <div class="sg-cards">
          <article class="card"><h3>Card</h3><p class="muted">A surface for grouping content.</p></article>
          <article class="card card--pastel-sky"><h3>Pastel card</h3><p class="muted">Used for highlights.</p></article>
          <article class="card card--inverse"><h3>Inverse card</h3><p>Ink background.</p></article>
        </div>
      </section>

      <section class="sg-section">
        <h2>Mascot speech</h2>
        <div class="talk">
          <div class="talk__art">${mascot({ pose: 'happy' })}</div>
          ${speech('Oli otya! Let’s learn a few words of <strong>Luganda</strong>.')}
        </div>
      </section>

      <section class="sg-section">
        <h2>Overlays</h2>
        <div class="sg-row">
          ${button({ label: 'Open modal', variant: 'secondary', attrs: 'data-sg="modal"' })}
          ${button({ label: 'Show toast', variant: 'secondary', attrs: 'data-sg="toast"' })}
        </div>
      </section>

      <section class="sg-section">
        <h2>Icons</h2>
        <div class="sg-icons">
          ${ICON_NAMES.map((n) => `<figure>${icon(n, { size: 28 })}<figcaption>${n}</figcaption></figure>`).join('')}
        </div>
      </section>
    </div>`;

  root.addEventListener('click', async (e) => {
    const action = e.target.closest('[data-sg]')?.dataset.sg;
    if (action === 'toast') toast('Weebale! That’s a toast.');
    if (action === 'modal') {
      const v = await openModal({
        title: 'Quit lesson?',
        body: '<p>You’ll lose your progress in this lesson.</p>',
        art: mascot({ pose: 'sad' }),
        actions: [
          { label: 'Keep learning', value: 'stay' },
          { label: 'End session', value: 'quit', variant: 'ghost' },
        ],
      });
      toast(`You chose: ${v ?? 'dismissed'}`);
    }
  });
}
