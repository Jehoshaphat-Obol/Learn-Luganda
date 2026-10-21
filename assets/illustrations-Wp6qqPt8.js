import{_ as e,a as t,c as n,d as r,f as i,g as a,h as o,i as s,l as c,o as l,p as u,s as d,u as f,v as p,y as m}from"./illustrations-zkF5YppP.js";var h=Object.entries({...f,...r}).map(([e,t])=>`
    <figure class="gallery__item">
      <div class="gallery__row">
        ${i.map(t=>`<div class="gallery__art">${o(e,{expression:t})}</div>`).join(``)}
      </div>
      <figcaption><strong>${t.name}</strong> <em>${t.role}</em></figcaption>
    </figure>`).join(``),g=u().map(e=>`<div class="gallery__avatar">${o(e,{shape:`circle`})}</div>`).join(``),_=a.map(t=>`
    <figure class="gallery__item gallery__item--small">
      <div class="gallery__art">${e({pose:t})}</div>
      <figcaption><code>${t}</code></figcaption>
    </figure>`).join(``),v=d.map((e,t)=>`
    <figure class="gallery__item">
      <div class="gallery__art">${c(e,{cast:t%2?[]:Object.keys(f).slice(t,t+2),pose:a[t]})}</div>
      <figcaption><strong>${n(e).name}</strong> <code>placeScene('${e}', { cast, pose })</code></figcaption>
    </figure>`).join(``),y=p.map(e=>`
    <figure class="gallery__item gallery__item--small">
      <div class="gallery__art">${m(e)}</div>
      <figcaption><code>${e}</code></figcaption>
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
        <figure class="gallery__item"><div class="gallery__art">${t({xp:15})}</div><figcaption><code>lessonCompleteScene({ xp })</code></figcaption></figure>
        <figure class="gallery__item"><div class="gallery__art">${l({days:7})}</div><figcaption><code>streakScene({ days })</code></figcaption></figure>
      </div>
    </section>

    <section>
      <h2>Places</h2>
      <p class="gallery__note">Reload the page: the hero, the lesson complete scene and the picks across the app change every visit.</p>
      <div class="gallery__scenes">${v}</div>
    </section>

    <section>
      <h2>Props</h2>
      <div class="gallery__poses">${y}</div>
    </section>

    <section>
      <h2>Mascot poses</h2>
      <div class="gallery__poses">${_}</div>
    </section>

    <section>
      <h2>Cast and expressions</h2>
      <p class="gallery__note"><code>portrait(id, { expression })</code> with neutral, happy, sad, surprised and wink.</p>
      <div class="gallery__cast">${h}</div>
    </section>

    <section>
      <h2>Profile avatars</h2>
      <p class="gallery__note"><code>portrait(id, { shape: 'circle' })</code></p>
      <div class="gallery__avatars">${g}</div>
    </section>
  </main>
`;