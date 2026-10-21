import{a as e,c as t,i as n,n as r,o as i,r as a,s as o,t as s}from"./illustrations-YnOToB_N.js";var c=Object.entries(i).map(([e,n])=>`
    <figure class="gallery__item">
      <div class="gallery__row">
        ${o.map(n=>`<div class="gallery__art">${t(e,{expression:n})}</div>`).join(``)}
      </div>
      <figcaption><strong>${n.name}</strong> <em>${n.role}</em></figcaption>
    </figure>`).join(``),l=Object.keys(i).map(e=>`<div class="gallery__avatar">${t(e,{shape:`circle`})}</div>`).join(``),u=n.map(t=>`
    <figure class="gallery__item gallery__item--small">
      <div class="gallery__art">${e({pose:t})}</div>
      <figcaption><code>${t}</code></figcaption>
    </figure>`).join(``);document.querySelector(`#app`).innerHTML=`
  <main class="gallery">
    <header class="gallery__header">
      <p class="gallery__eyebrow">Nº 05 · Illustrations</p>
      <h1>The cast of <strong>Learn Luganda</strong></h1>
      <p>Flat Bauhaus portraits, the crowned crane mascot and the scenes they live in. Every piece is an inline SVG drawn from theme colours.</p>
    </header>

    <section>
      <h2>Scenes</h2>
      <div class="gallery__scenes">
        <figure class="gallery__item gallery__item--wide"><div class="gallery__art">${s()}</div><figcaption><code>heroScene()</code></figcaption></figure>
        <figure class="gallery__item"><div class="gallery__art">${r({xp:15})}</div><figcaption><code>lessonCompleteScene({ xp })</code></figcaption></figure>
        <figure class="gallery__item"><div class="gallery__art">${a({days:7})}</div><figcaption><code>streakScene({ days })</code></figcaption></figure>
      </div>
    </section>

    <section>
      <h2>Mascot poses</h2>
      <div class="gallery__poses">${u}</div>
    </section>

    <section>
      <h2>Cast and expressions</h2>
      <p class="gallery__note"><code>portrait(id, { expression })</code> with neutral, happy and sad.</p>
      <div class="gallery__cast">${c}</div>
    </section>

    <section>
      <h2>Profile avatars</h2>
      <p class="gallery__note"><code>portrait(id, { shape: 'circle' })</code></p>
      <div class="gallery__avatars">${l}</div>
    </section>
  </main>
`;