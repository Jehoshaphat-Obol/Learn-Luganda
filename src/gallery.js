import './styles/tokens.css';
import './styles/base.css';
import './styles/gallery.css';
import {
  CAST,
  EXPRESSIONS,
  MASCOT_POSES,
  portrait,
  mascot,
  heroScene,
  lessonCompleteScene,
  streakScene,
} from './illustrations/index.js';

const castCards = Object.entries(CAST)
  .map(
    ([id, c]) => `
    <figure class="gallery__item">
      <div class="gallery__row">
        ${EXPRESSIONS.map((expression) => `<div class="gallery__art">${portrait(id, { expression })}</div>`).join('')}
      </div>
      <figcaption><strong>${c.name}</strong> <em>${c.role}</em></figcaption>
    </figure>`,
  )
  .join('');

const avatars = Object.keys(CAST)
  .map((id) => `<div class="gallery__avatar">${portrait(id, { shape: 'circle' })}</div>`)
  .join('');

const poses = MASCOT_POSES.map(
  (pose) => `
    <figure class="gallery__item gallery__item--small">
      <div class="gallery__art">${mascot({ pose })}</div>
      <figcaption><code>${pose}</code></figcaption>
    </figure>`,
).join('');

document.querySelector('#app').innerHTML = `
  <main class="gallery">
    <header class="gallery__header">
      <p class="gallery__eyebrow">Nº 05 · Illustrations</p>
      <h1>The cast of <strong>Learn Luganda</strong></h1>
      <p>Flat Bauhaus portraits, the crowned crane mascot and the scenes they live in. Every piece is an inline SVG drawn from theme colours.</p>
    </header>

    <section>
      <h2>Scenes</h2>
      <div class="gallery__scenes">
        <figure class="gallery__item gallery__item--wide"><div class="gallery__art">${heroScene()}</div><figcaption><code>heroScene()</code></figcaption></figure>
        <figure class="gallery__item"><div class="gallery__art">${lessonCompleteScene({ xp: 15 })}</div><figcaption><code>lessonCompleteScene({ xp })</code></figcaption></figure>
        <figure class="gallery__item"><div class="gallery__art">${streakScene({ days: 7 })}</div><figcaption><code>streakScene({ days })</code></figcaption></figure>
      </div>
    </section>

    <section>
      <h2>Mascot poses</h2>
      <div class="gallery__poses">${poses}</div>
    </section>

    <section>
      <h2>Cast and expressions</h2>
      <p class="gallery__note"><code>portrait(id, { expression })</code> with neutral, happy and sad.</p>
      <div class="gallery__cast">${castCards}</div>
    </section>

    <section>
      <h2>Profile avatars</h2>
      <p class="gallery__note"><code>portrait(id, { shape: 'circle' })</code></p>
      <div class="gallery__avatars">${avatars}</div>
    </section>
  </main>
`;
