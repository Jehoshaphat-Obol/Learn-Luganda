import './styles/tokens.css';
import './styles/base.css';
import './styles/gallery.css';
import {
  CAST,
  CRITTERS,
  EXPRESSIONS,
  MASCOT_POSES,
  PLACE_IDS,
  PROP_IDS,
  avatarIds,
  placeInfo,
  placeScene,
  portrait,
  prop,
  mascot,
  heroScene,
  lessonCompleteScene,
  streakScene,
  FLAGS,
  flag,
  setFlagCountry,
} from './illustrations/index.js';
import { languageInfo } from './i18n/languages.js';

// The gallery shows the Luganda course's art, so its flag is Uganda's.
setFlagCountry(languageInfo('lg').country);

const castCards = Object.entries({ ...CAST, ...CRITTERS })
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

const avatars = avatarIds()
  .map((id) => `<div class="gallery__avatar">${portrait(id, { shape: 'circle' })}</div>`)
  .join('');

const poses = MASCOT_POSES.map(
  (pose) => `
    <figure class="gallery__item gallery__item--small">
      <div class="gallery__art">${mascot({ pose })}</div>
      <figcaption><code>${pose}</code></figcaption>
    </figure>`,
).join('');

const places = PLACE_IDS.map(
  (id, i) => `
    <figure class="gallery__item">
      <div class="gallery__art">${placeScene(id, { cast: i % 2 ? [] : Object.keys(CAST).slice(i, i + 2), pose: MASCOT_POSES[i] })}</div>
      <figcaption><strong>${placeInfo(id).name}</strong> <code>placeScene('${id}', { cast, pose })</code></figcaption>
    </figure>`,
).join('');

const flags = Object.entries(FLAGS)
  .map(
    ([code, f]) => `
    <figure class="gallery__item gallery__item--small">
      <div class="gallery__art"><svg class="ill" viewBox="0 0 60 40" role="img" aria-label="Flag of ${f.name}">${flag(code, { x: 3, y: 3, width: 54 })}</svg></div>
      <figcaption><code>${code}</code> ${f.name}</figcaption>
    </figure>`,
  )
  .join('');

const props = PROP_IDS.map(
  (id) => `
    <figure class="gallery__item gallery__item--small">
      <div class="gallery__art">${prop(id)}</div>
      <figcaption><code>${id}</code></figcaption>
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
      <h2>Places</h2>
      <p class="gallery__note">Reload the page: the hero, the lesson complete scene and the picks across the app change every visit.</p>
      <div class="gallery__scenes">${places}</div>
    </section>

    <section>
      <h2>Props</h2>
      <div class="gallery__poses">${props}</div>
    </section>

    <section>
      <h2>Flags</h2>
      <p class="gallery__note">Places show the flag of the language being learned (<code>country</code> in languages.json), else the learner's home country, else a plain pennant.</p>
      <div class="gallery__poses">${flags}</div>
    </section>

    <section>
      <h2>Mascot poses</h2>
      <div class="gallery__poses">${poses}</div>
    </section>

    <section>
      <h2>Cast and expressions</h2>
      <p class="gallery__note"><code>portrait(id, { expression })</code> with neutral, happy, sad, surprised and wink.</p>
      <div class="gallery__cast">${castCards}</div>
    </section>

    <section>
      <h2>Profile avatars</h2>
      <p class="gallery__note"><code>portrait(id, { shape: 'circle' })</code></p>
      <div class="gallery__avatars">${avatars}</div>
    </section>
  </main>
`;
