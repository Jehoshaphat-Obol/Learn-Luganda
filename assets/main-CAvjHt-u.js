import{n as e}from"./illustrations-Cak6dSPY.js";function t(e){let t=[],n=e.split(`/`).map(e=>e.startsWith(`:`)?(t.push(e.slice(1)),`([^/]+)`):e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)).join(`/`),r=RegExp(`^${n}/?$`);return e=>{let n=r.exec(e);return n?Object.fromEntries(t.map((e,t)=>[e,decodeURIComponent(n[t+1])])):null}}function n(e){let[t,n=``]=(e.replace(/^#/,``)||`/`).split(`?`);return{path:t.startsWith(`/`)?t:`/${t}`,query:Object.fromEntries(new URLSearchParams(n))}}function r(e,n){for(let r of e){r.match??=t(r.path);let e=r.match(n);if(e)return{route:r,params:e}}return null}function i({routes:e,onChange:t,fallback:i=`/`}){function a(){let{path:a,query:s}=n(window.location.hash),c=r(e,a);c?t({...c,query:s,path:a}):o(i,{replace:!0})}function o(e,{replace:t=!1}={}){let n=`#${e}`;window.location.hash===n?a():t?(window.history.replaceState(null,``,n),a()):window.location.hash=n}return{start(){window.addEventListener(`hashchange`,a),a()},navigate:o}}var a={home:`<path d="M4 11 L12 4 L20 11 V20 H14 V14 H10 V20 H4 Z"/>`,practice:`<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="12" cy="12" r="3.2"/>`,leagues:`<path d="M6 4 H18 V9 A6 6 0 0 1 6 9 Z"/><rect x="10.5" y="14" width="3" height="4"/><rect x="7" y="18" width="10" height="2.5"/>`,profile:`<circle cx="12" cy="8" r="4.2"/><path d="M4 21 A8 8 0 0 1 20 21 Z"/>`,shop:`<path d="M5 8 H19 L18 20 H6 Z"/><path d="M9 8 V6.5 A3 3 0 0 1 15 6.5 V8" fill="none" stroke="currentColor" stroke-width="2"/>`,settings:`<circle cx="12" cy="12" r="3.4"/><path d="M12 2.5 L14 6 H10 Z M12 21.5 L10 18 H14 Z M2.5 12 L6 10 V14 Z M21.5 12 L18 14 V10 Z" /><circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/>`,flame:`<path d="M12 2 C12 2 19 9.5 19 14.5 A7 7 0 0 1 5 14.5 C5 9.5 12 2 12 2 Z"/><circle cx="12" cy="15.5" r="3" fill="var(--icon-inner, #fff)" opacity="0.55"/>`,gem:`<path d="M6 4 H18 L22 9 L12 21 L2 9 Z"/><path d="M2 9 H22 M8.5 9 L12 21 L15.5 9" fill="none" stroke="var(--icon-inner, #fff)" stroke-width="1.2" opacity="0.55"/>`,heart:`<path d="M12 21 L3.5 12.5 A4.8 4.8 0 0 1 12 6 A4.8 4.8 0 0 1 20.5 12.5 Z"/>`,bolt:`<path d="M13 2 L4 14 H11 L10 22 L20 9 H13 Z"/>`,close:`<path d="M5 5 L19 19 M19 5 L5 19" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>`,check:`<path d="M4 12.5 L9.5 18 L20 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,cross:`<path d="M6 6 L18 18 M18 6 L6 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`,lock:`<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10 V7.5 A4 4 0 0 1 16 7.5 V10" fill="none" stroke="currentColor" stroke-width="2.2"/>`,star:`<path d="M12 2.5 L14.9 8.6 L21.5 9.3 L16.6 13.8 L18 20.4 L12 17 L6 20.4 L7.4 13.8 L2.5 9.3 L9.1 8.6 Z"/>`,book:`<path d="M3 5 Q7.5 3.5 12 6 V20 Q7.5 17.5 3 19 Z M21 5 Q16.5 3.5 12 6 V20 Q16.5 17.5 21 19 Z"/>`,speaker:`<path d="M3 9 H7 L12 5 V19 L7 15 H3 Z"/><path d="M15.5 8.5 A5 5 0 0 1 15.5 15.5 M18 6 A8.5 8.5 0 0 1 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,trophy:`<path d="M7 3 H17 V9 A5 5 0 0 1 7 9 Z"/><path d="M7 5 H4 A3 3 0 0 0 7 10 M17 5 H20 A3 3 0 0 1 17 10" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="10.5" y="13.5" width="3" height="4"/><rect x="7" y="18" width="10" height="3"/>`,arrow:`<path d="M4 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,back:`<path d="M20 12 H5 M11 6 L5 12 L11 18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,snowflake:`<path d="M12 2 V22 M3.3 7 L20.7 17 M3.3 17 L20.7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="12" r="2.6"/>`,stories:`<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8 H16 M8 12 H16 M8 16 H13" stroke="var(--icon-inner, #fff)" stroke-width="1.6" stroke-linecap="round" opacity="0.75"/>`,target:`<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="1.8"/>`},o=Object.keys(a);function s(e,{size:t=24,label:n,className:r=``}={}){let i=a[e];if(!i)throw Error(`Unknown icon: ${e}`);return`<svg class="icon ${r}" width="${t}" height="${t}" viewBox="0 0 24 24" fill="currentColor" ${n?`role="img" aria-label="${n}"`:`aria-hidden="true" focusable="false"`}>${i}</svg>`}function c(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function l({label:e,variant:t=`primary`,size:n=`md`,href:r,attrs:i=``,block:a=!1,disabled:o=!1,iconName:l}){let u=`btn btn--${t}${n===`lg`?` btn--lg`:``}${a?` btn--block`:``}`,d=`${l?s(l,{size:20}):``}<span>${c(e)}</span>`;return r?`<a class="${u}" href="${r}" ${i}>${d}</a>`:`<button class="${u}" type="button" ${o?`disabled`:``} ${i}>${d}</button>`}function u(e,{label:t=`Progress`,variant:n=`primary`}={}){let r=Math.round(Math.max(0,Math.min(1,e))*100);return`<div class="progress progress--${n}" role="progressbar" aria-label="${c(t)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${r}">
    <div class="progress__fill" style="width:${r}%"></div>
  </div>`}function d(e,{size:t=56,stroke:n=6,content:r=``,label:i=`Progress`}={}){let a=(t-n)/2,o=2*Math.PI*a,s=Math.max(0,Math.min(1,e));return`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label="${c(i)}: ${Math.round(s*100)}%">
    <svg width="${t}" height="${t}" viewBox="0 0 ${t} ${t}" aria-hidden="true">
      <circle cx="${t/2}" cy="${t/2}" r="${a}" class="ring__track" stroke-width="${n}" fill="none"/>
      <circle cx="${t/2}" cy="${t/2}" r="${a}" class="ring__fill" stroke-width="${n}" fill="none"
        stroke-dasharray="${o}" stroke-dashoffset="${o*(1-s)}" transform="rotate(-90 ${t/2} ${t/2})" stroke-linecap="round"/>
    </svg>
    <div class="ring__content">${r}</div>
  </div>`}function f(e,{variant:t=`neutral`,iconName:n}={}){return`<span class="pill pill--${t}">${n?s(n,{size:16}):``}${c(e)}</span>`}function p(e,{tail:t=`left`}={}){return`<div class="speech speech--${t}">${e}</div>`}var m;function h(e,{variant:t=`neutral`,duration:n=2600}={}){m||(m=document.createElement(`div`),m.className=`toast-host`,m.setAttribute(`role`,`status`),m.setAttribute(`aria-live`,`polite`),document.body.append(m));let r=document.createElement(`div`);r.className=`toast toast--${t}`,r.textContent=e,m.append(r),setTimeout(()=>{r.classList.add(`toast--leaving`),setTimeout(()=>r.remove(),300)},n)}function g({title:e,body:t=``,art:n=``,actions:r=[{label:`OK`,value:`ok`}],dismissible:i=!0}){return new Promise(a=>{let o=document.activeElement,u=document.createElement(`div`);u.className=`modal-backdrop`,u.innerHTML=`
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        ${i?`<button class="icon-btn modal__close" type="button" data-value="" aria-label="Close">${s(`close`,{size:20})}</button>`:``}
        ${n?`<div class="modal__art">${n}</div>`:``}
        <h2 id="modal-title" class="modal__title">${c(e)}</h2>
        ${t?`<div class="modal__body">${t}</div>`:``}
        <div class="modal__actions">
          ${r.map(e=>l({label:e.label,variant:e.variant??`primary`,block:!0,attrs:`data-value="${c(e.value)}"`})).join(``)}
        </div>
      </div>`;function d(e){document.removeEventListener(`keydown`,f),u.remove(),o?.focus?.(),a(e||null)}function f(e){if(e.key===`Escape`&&i&&d(null),e.key===`Tab`){let t=[...u.querySelectorAll(`button, a, input, select, textarea`)],n=t[0],r=t[t.length-1];e.shiftKey&&document.activeElement===n?(e.preventDefault(),r.focus()):!e.shiftKey&&document.activeElement===r&&(e.preventDefault(),n.focus())}}u.addEventListener(`click`,e=>{let t=e.target.closest(`[data-value]`);t?d(t.dataset.value):e.target===u&&i&&d(null)}),document.addEventListener(`keydown`,f),document.body.append(u),u.querySelector(`.modal__actions .btn`)?.focus()})}var _=[{path:`/learn`,label:`Learn`,icon:`home`},{path:`/practice`,label:`Practice`,icon:`practice`},{path:`/leagues`,label:`Leagues`,icon:`leagues`},{path:`/shop`,label:`Shop`,icon:`shop`},{path:`/profile`,label:`Profile`,icon:`profile`}],v=()=>({streak:0,gems:0,hearts:5,maxHearts:5,streakToday:!1});function y(e,t,n,r=``){return`<a class="stat stat--${e} ${r}" href="#/${e===`hearts`||e===`gems`?`shop`:`profile`}" aria-label="${c(n)}">
    ${s(e===`streak`?`flame`:e===`gems`?`gem`:`heart`,{size:22})}<span>${c(t)}</span>
  </a>`}function b(){let e=v();return`
    ${y(`streak`,e.streak,`${e.streak} day streak`,e.streakToday?``:`stat--dim`)}
    ${y(`gems`,e.gems,`${e.gems} gems`)}
    ${y(`hearts`,e.hearts,`${e.hearts} of ${e.maxHearts} hearts`)}`}function x(e){return _.map(t=>`<a class="nav__link${e.startsWith(t.path)?` is-active`:``}" href="#${t.path}" ${e.startsWith(t.path)?`aria-current="page"`:``}>
      ${s(t.icon,{size:26})}<span>${t.label}</span></a>`).join(``)}function S(e){return`
    <div class="layout">
      <nav class="nav" aria-label="Main">
        <a class="nav__brand" href="#/learn" aria-label="Learn Luganda home">
          <span class="brand-mark" aria-hidden="true"><i></i><b></b></span><span>luganda</span>
        </a>
        ${x(e)}
      </nav>
      <div class="layout__main">
        <header class="topbar">
          <a class="topbar__brand" href="#/learn" aria-label="Learn Luganda home"><span class="brand-mark" aria-hidden="true"><i></i><b></b></span></a>
          <div class="topbar__stats" data-topbar-stats>${b()}</div>
        </header>
        <main id="view" class="view" tabindex="-1"></main>
      </div>
    </div>`}function C(e){let t=null,n=null;return{render({route:r,params:i,query:a,path:o},s){typeof t==`function`&&t(),t=null;let c=r.layout??`app`,l;c===`app`?(e.innerHTML=S(o),l=e.querySelector(`#view`)):(e.innerHTML=`<main id="view" class="view view--bare" tabindex="-1"></main>`,l=e.querySelector(`#view`)),n=c,document.title=r.title?`${r.title} · Learn Luganda`:`Learn Luganda`,window.scrollTo(0,0),t=r.view({root:l,params:i,query:a,path:o,navigate:s})??null,n&&document.activeElement===document.body&&l.focus({preventScroll:!0})}}}function w(t,n){return({root:r})=>{r.innerHTML=`
      <section class="empty-state">
        <div class="empty-state__art">${e({pose:`thinking`})}</div>
        <h1>${c(t)}</h1>
        <p class="muted">${c(n)}</p>
        ${l({label:`Back to learning`,href:`#/learn`,variant:`secondary`})}
      </section>`}}function T({root:t}){t.innerHTML=`
    <div class="page page--wide styleguide">
      <header class="page__header">
        <p class="eyebrow">Nº 07 · UI kit</p>
        <h1>Style <strong>guide</strong></h1>
        <p class="muted">Every component the app is built from, on the theme tokens.</p>
      </header>

      <section class="sg-section">
        <h2>Colour</h2>
        <div class="sg-swatches">
          ${[`vermillion-50`,`vermillion-100`,`vermillion-300`,`vermillion-500`,`vermillion-600`,`vermillion-700`,`paper-50`,`paper-200`,`paper-400`,`ink-500`,`ink-700`,`ink-900`,`bauhaus-yellow`,`bauhaus-blue`,`success`,`error`,`pastel-butter`,`pastel-blush`,`pastel-sky`,`pastel-sage`,`pastel-lilac`].map(e=>`<figure class="sg-swatch"><span style="background:var(--color-${e})"></span><figcaption>${e}</figcaption></figure>`).join(``)}
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
          ${l({label:`Continue`})}
          ${l({label:`Secondary`,variant:`secondary`})}
          ${l({label:`Correct`,variant:`success`})}
          ${l({label:`Wrong`,variant:`danger`})}
          ${l({label:`Blue`,variant:`blue`})}
          ${l({label:`Ghost`,variant:`ghost`})}
          ${l({label:`Disabled`,disabled:!0})}
        </div>
        <div class="sg-row">${l({label:`Start lesson`,size:`lg`,iconName:`arrow`})}</div>
        <div class="sg-row">
          <button class="tile" type="button">ssebo</button>
          <button class="tile is-selected" type="button">nnyabo</button>
          <button class="tile is-used" type="button">mukwano</button>
        </div>
      </section>

      <section class="sg-section">
        <h2>Progress</h2>
        ${u(.35)}
        <div class="sg-row">
          ${d(.7,{content:s(`bolt`,{size:22}),label:`Daily goal`})}
          ${d(1,{size:72,content:`<strong>20</strong>`,label:`Daily goal`})}
        </div>
      </section>

      <section class="sg-section">
        <h2>Pills and cards</h2>
        <div class="sg-row">
          ${f(`New word`,{variant:`primary`})}
          ${f(`3 day streak`,{variant:`yellow`,iconName:`flame`})}
          ${f(`Unit 1`,{})}
          ${f(`Legendary`,{variant:`blue`,iconName:`star`})}
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
          <div class="talk__art">${e({pose:`happy`})}</div>
          ${p(`Oli otya! Let’s learn a few words of <strong>Luganda</strong>.`)}
        </div>
      </section>

      <section class="sg-section">
        <h2>Overlays</h2>
        <div class="sg-row">
          ${l({label:`Open modal`,variant:`secondary`,attrs:`data-sg="modal"`})}
          ${l({label:`Show toast`,variant:`secondary`,attrs:`data-sg="toast"`})}
        </div>
      </section>

      <section class="sg-section">
        <h2>Icons</h2>
        <div class="sg-icons">
          ${o.map(e=>`<figure>${s(e,{size:28})}<figcaption>${e}</figcaption></figure>`).join(``)}
        </div>
      </section>
    </div>`,t.addEventListener(`click`,async t=>{let n=t.target.closest(`[data-sg]`)?.dataset.sg;n===`toast`&&h(`Weebale! That’s a toast.`),n===`modal`&&h(`You chose: ${await g({title:`Quit lesson?`,body:`<p>You’ll lose your progress in this lesson.</p>`,art:e({pose:`sad`}),actions:[{label:`Keep learning`,value:`stay`},{label:`End session`,value:`quit`,variant:`ghost`}]})??`dismissed`}`)})}function E({root:e}){e.innerHTML=`
    <section class="empty-state">
      <svg class="empty-state__mark" viewBox="0 0 200 200" role="img" aria-label="Bauhaus shapes">
        <circle cx="78" cy="80" r="52" fill="var(--color-paper-400)" />
        <rect x="96" y="96" width="78" height="78" fill="var(--color-ink-900)" />
        <path d="M26 176 L96 176 L26 106 Z" fill="var(--color-ink-700)" />
        <circle cx="140" cy="54" r="22" fill="var(--color-primary)" />
      </svg>
      <h1>Oli otya! <strong>Learn Luganda.</strong></h1>
      <p class="muted">Learn Luganda with bite-sized, game-like lessons.</p>
      ${l({label:`Tandika`,size:`lg`,href:`#/learn`})}
      <p class="caption"><em>Tandika</em> means "start".</p>
    </section>`}var D=[{path:`/`,view:E,layout:`bare`},{path:`/onboarding`,view:w(`Onboarding`,`Setting up your profile arrives soon.`),layout:`bare`,title:`Get started`},{path:`/learn`,view:w(`Your path`,`The learning path arrives soon.`),title:`Learn`},{path:`/lesson/:id`,view:w(`Lesson`,`Lessons arrive soon.`),layout:`bare`,title:`Lesson`},{path:`/practice`,view:w(`Practice`,`Review sessions arrive soon.`),title:`Practice`},{path:`/leagues`,view:w(`Leagues`,`Weekly leagues arrive soon.`),title:`Leagues`},{path:`/shop`,view:w(`Shop`,`The shop opens soon.`),title:`Shop`},{path:`/profile`,view:w(`Profile`,`Your profile arrives soon.`),title:`Profile`},{path:`/settings`,view:w(`Settings`,`Settings arrive soon.`),title:`Settings`},{path:`/styleguide`,view:T,title:`Style guide`}],O=C(document.querySelector(`#app`)),k=i({routes:D,onChange:e=>O.render(e,k.navigate)});k.start();