import{a as e,c as t,n,o as r,r as i,t as a}from"./illustrations-YnOToB_N.js";function o(e){let t=[],n=e.split(`/`).map(e=>e.startsWith(`:`)?(t.push(e.slice(1)),`([^/]+)`):e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)).join(`/`),r=RegExp(`^${n}/?$`);return e=>{let n=r.exec(e);return n?Object.fromEntries(t.map((e,t)=>[e,decodeURIComponent(n[t+1])])):null}}function s(e){let[t,n=``]=(e.replace(/^#/,``)||`/`).split(`?`);return{path:t.startsWith(`/`)?t:`/${t}`,query:Object.fromEntries(new URLSearchParams(n))}}function c(e,t){for(let n of e){n.match??=o(n.path);let e=n.match(t);if(e)return{route:n,params:e}}return null}function l({routes:e,onChange:t,fallback:n=`/`}){function r(){let{path:r,query:a}=s(window.location.hash),o=c(e,r);o?t({...o,query:a,path:r}):i(n,{replace:!0})}function i(e,{replace:t=!1}={}){let n=`#${e}`;window.location.hash===n?r():t?(window.history.replaceState(null,``,n),r()):window.location.hash=n}return{start(){window.addEventListener(`hashchange`,r),r()},navigate:i}}var u={home:`<path d="M4 11 L12 4 L20 11 V20 H14 V14 H10 V20 H4 Z"/>`,practice:`<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="12" cy="12" r="3.2"/>`,leagues:`<path d="M6 4 H18 V9 A6 6 0 0 1 6 9 Z"/><rect x="10.5" y="14" width="3" height="4"/><rect x="7" y="18" width="10" height="2.5"/>`,profile:`<circle cx="12" cy="8" r="4.2"/><path d="M4 21 A8 8 0 0 1 20 21 Z"/>`,shop:`<path d="M5 8 H19 L18 20 H6 Z"/><path d="M9 8 V6.5 A3 3 0 0 1 15 6.5 V8" fill="none" stroke="currentColor" stroke-width="2"/>`,settings:`<circle cx="12" cy="12" r="3.4"/><path d="M12 2.5 L14 6 H10 Z M12 21.5 L10 18 H14 Z M2.5 12 L6 10 V14 Z M21.5 12 L18 14 V10 Z" /><circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/>`,flame:`<path d="M12 2 C12 2 19 9.5 19 14.5 A7 7 0 0 1 5 14.5 C5 9.5 12 2 12 2 Z"/><circle cx="12" cy="15.5" r="3" fill="var(--icon-inner, #fff)" opacity="0.55"/>`,gem:`<path d="M6 4 H18 L22 9 L12 21 L2 9 Z"/><path d="M2 9 H22 M8.5 9 L12 21 L15.5 9" fill="none" stroke="var(--icon-inner, #fff)" stroke-width="1.2" opacity="0.55"/>`,heart:`<path d="M12 21 L3.5 12.5 A4.8 4.8 0 0 1 12 6 A4.8 4.8 0 0 1 20.5 12.5 Z"/>`,bolt:`<path d="M13 2 L4 14 H11 L10 22 L20 9 H13 Z"/>`,close:`<path d="M5 5 L19 19 M19 5 L5 19" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>`,check:`<path d="M4 12.5 L9.5 18 L20 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,cross:`<path d="M6 6 L18 18 M18 6 L6 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`,lock:`<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10 V7.5 A4 4 0 0 1 16 7.5 V10" fill="none" stroke="currentColor" stroke-width="2.2"/>`,star:`<path d="M12 2.5 L14.9 8.6 L21.5 9.3 L16.6 13.8 L18 20.4 L12 17 L6 20.4 L7.4 13.8 L2.5 9.3 L9.1 8.6 Z"/>`,book:`<path d="M3 5 Q7.5 3.5 12 6 V20 Q7.5 17.5 3 19 Z M21 5 Q16.5 3.5 12 6 V20 Q16.5 17.5 21 19 Z"/>`,speaker:`<path d="M3 9 H7 L12 5 V19 L7 15 H3 Z"/><path d="M15.5 8.5 A5 5 0 0 1 15.5 15.5 M18 6 A8.5 8.5 0 0 1 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,trophy:`<path d="M7 3 H17 V9 A5 5 0 0 1 7 9 Z"/><path d="M7 5 H4 A3 3 0 0 0 7 10 M17 5 H20 A3 3 0 0 1 17 10" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="10.5" y="13.5" width="3" height="4"/><rect x="7" y="18" width="10" height="3"/>`,arrow:`<path d="M4 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,back:`<path d="M20 12 H5 M11 6 L5 12 L11 18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,snowflake:`<path d="M12 2 V22 M3.3 7 L20.7 17 M3.3 17 L20.7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="12" r="2.6"/>`,stories:`<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8 H16 M8 12 H16 M8 16 H13" stroke="var(--icon-inner, #fff)" stroke-width="1.6" stroke-linecap="round" opacity="0.75"/>`,target:`<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="1.8"/>`},d=Object.keys(u);function f(e,{size:t=24,label:n,className:r=``}={}){let i=u[e];if(!i)throw Error(`Unknown icon: ${e}`);return`<svg class="icon ${r}" width="${t}" height="${t}" viewBox="0 0 24 24" fill="currentColor" ${n?`role="img" aria-label="${n}"`:`aria-hidden="true" focusable="false"`}>${i}</svg>`}function p(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function m({label:e,variant:t=`primary`,size:n=`md`,href:r,attrs:i=``,block:a=!1,disabled:o=!1,iconName:s}){let c=`btn btn--${t}${n===`lg`?` btn--lg`:``}${a?` btn--block`:``}`,l=`${s?f(s,{size:20}):``}<span>${p(e)}</span>`;return r?`<a class="${c}" href="${r}" ${i}>${l}</a>`:`<button class="${c}" type="button" ${o?`disabled`:``} ${i}>${l}</button>`}function h(e,{label:t=`Progress`,variant:n=`primary`}={}){let r=Math.round(Math.max(0,Math.min(1,e))*100);return`<div class="progress progress--${n}" role="progressbar" aria-label="${p(t)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${r}">
    <div class="progress__fill" style="width:${r}%"></div>
  </div>`}function g(e,{size:t=56,stroke:n=6,content:r=``,label:i=`Progress`}={}){let a=(t-n)/2,o=2*Math.PI*a,s=Math.max(0,Math.min(1,e));return`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label="${p(i)}: ${Math.round(s*100)}%">
    <svg width="${t}" height="${t}" viewBox="0 0 ${t} ${t}" aria-hidden="true">
      <circle cx="${t/2}" cy="${t/2}" r="${a}" class="ring__track" stroke-width="${n}" fill="none"/>
      <circle cx="${t/2}" cy="${t/2}" r="${a}" class="ring__fill" stroke-width="${n}" fill="none"
        stroke-dasharray="${o}" stroke-dashoffset="${o*(1-s)}" transform="rotate(-90 ${t/2} ${t/2})" stroke-linecap="round"/>
    </svg>
    <div class="ring__content">${r}</div>
  </div>`}function _(e,{variant:t=`neutral`,iconName:n}={}){return`<span class="pill pill--${t}">${n?f(n,{size:16}):``}${p(e)}</span>`}function v(e,{tail:t=`left`}={}){return`<div class="speech speech--${t}">${e}</div>`}var y;function b(e,{variant:t=`neutral`,duration:n=2600}={}){y||(y=document.createElement(`div`),y.className=`toast-host`,y.setAttribute(`role`,`status`),y.setAttribute(`aria-live`,`polite`),document.body.append(y));let r=document.createElement(`div`);r.className=`toast toast--${t}`,r.textContent=e,y.append(r),setTimeout(()=>{r.classList.add(`toast--leaving`),setTimeout(()=>r.remove(),300)},n)}function x({title:e,body:t=``,art:n=``,actions:r=[{label:`OK`,value:`ok`}],dismissible:i=!0}){return new Promise(a=>{let o=document.activeElement,s=document.createElement(`div`);s.className=`modal-backdrop`,s.innerHTML=`
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        ${i?`<button class="icon-btn modal__close" type="button" data-value="" aria-label="Close">${f(`close`,{size:20})}</button>`:``}
        ${n?`<div class="modal__art">${n}</div>`:``}
        <h2 id="modal-title" class="modal__title">${p(e)}</h2>
        ${t?`<div class="modal__body">${t}</div>`:``}
        <div class="modal__actions">
          ${r.map(e=>m({label:e.label,variant:e.variant??`primary`,block:!0,attrs:`data-value="${p(e.value)}"`})).join(``)}
        </div>
      </div>`;function c(e){document.removeEventListener(`keydown`,l),s.remove(),o?.focus?.(),a(e||null)}function l(e){if(e.key===`Escape`&&i&&c(null),e.key===`Tab`){let t=[...s.querySelectorAll(`button, a, input, select, textarea`)],n=t[0],r=t[t.length-1];e.shiftKey&&document.activeElement===n?(e.preventDefault(),r.focus()):!e.shiftKey&&document.activeElement===r&&(e.preventDefault(),n.focus())}}s.addEventListener(`click`,e=>{let t=e.target.closest(`[data-value]`);t?c(t.dataset.value):e.target===s&&i&&c(null)}),document.addEventListener(`keydown`,l),document.body.append(s),s.querySelector(`.modal__actions .btn`)?.focus()})}var S=[{path:`/learn`,label:`Learn`,icon:`home`},{path:`/practice`,label:`Practice`,icon:`practice`},{path:`/leagues`,label:`Leagues`,icon:`leagues`},{path:`/shop`,label:`Shop`,icon:`shop`},{path:`/profile`,label:`Profile`,icon:`profile`}],C=()=>({streak:0,gems:0,hearts:5,maxHearts:5,streakToday:!1});function ee(e){C=e}function w(e,t,n,r=``){return`<a class="stat stat--${e} ${r}" href="#/${e===`hearts`||e===`gems`?`shop`:`profile`}" aria-label="${p(n)}">
    ${f(e===`streak`?`flame`:e===`gems`?`gem`:`heart`,{size:22})}<span>${p(t)}</span>
  </a>`}function T(){let e=C();return`
    ${w(`streak`,e.streak,`${e.streak} day streak`,e.streakToday?``:`stat--dim`)}
    ${w(`gems`,e.gems,`${e.gems} gems`)}
    ${w(`hearts`,e.hearts,`${e.hearts} of ${e.maxHearts} hearts`)}`}function E(){let e=document.querySelector(`[data-topbar-stats]`);e&&(e.innerHTML=T())}function D(e){return S.map(t=>`<a class="nav__link${e.startsWith(t.path)?` is-active`:``}" href="#${t.path}" ${e.startsWith(t.path)?`aria-current="page"`:``}>
      ${f(t.icon,{size:26})}<span>${t.label}</span></a>`).join(``)}function te(e){return`
    <div class="layout">
      <nav class="nav" aria-label="Main">
        <a class="nav__brand" href="#/learn" aria-label="Learn Luganda home">
          <span class="brand-mark" aria-hidden="true"><i></i><b></b></span><span>luganda</span>
        </a>
        ${D(e)}
      </nav>
      <div class="layout__main">
        <header class="topbar">
          <a class="topbar__brand" href="#/learn" aria-label="Learn Luganda home"><span class="brand-mark" aria-hidden="true"><i></i><b></b></span></a>
          <div class="topbar__stats" data-topbar-stats>${T()}</div>
        </header>
        <main id="view" class="view" tabindex="-1"></main>
      </div>
    </div>`}function ne(e){let t=null,n=null;return{render({route:r,params:i,query:a,path:o},s){typeof t==`function`&&t(),t=null;let c=r.layout??`app`,l;c===`app`?(e.innerHTML=te(o),l=e.querySelector(`#view`)):(e.innerHTML=`<main id="view" class="view view--bare" tabindex="-1"></main>`,l=e.querySelector(`#view`)),n=c,document.title=r.title?`${r.title} · Learn Luganda`:`Learn Luganda`,window.scrollTo(0,0),t=r.view({root:l,params:i,query:a,path:o,navigate:s})??null,n&&document.activeElement===document.body&&l.focus({preventScroll:!0})}}}var O=e=>typeof e==`object`&&!!e&&!Array.isArray(e);function k(e,t){if(!O(t))return e===void 0?structuredClone(t):e;if(!O(e))return structuredClone(t);let n={...e};for(let[r,i]of Object.entries(t))n[r]=i===null?e[r]??null:k(e[r],i);return n}function re(){let e=new Map;return{getItem:t=>e.has(t)?e.get(t):null,setItem:(t,n)=>e.set(t,String(n)),removeItem:t=>e.delete(t)}}function ie(e){try{let t=e??globalThis.localStorage,n=`__ll_probe__`;return t.setItem(n,`1`),t.removeItem(n),t}catch{return re()}}function ae({key:e,version:t,defaults:n,migrations:r={},storage:i}){let a=ie(i),o=new Set,s=u();function c(e){let n=e,i=Number(n.version)||0;for(;i<t;)i+=1,r[i]&&(n=r[i](n)),n={...n,version:i};return n}function l(e){if(!O(e))throw Error(`Saved progress is not an object`);if(Number(e.version)>t)throw Error(`Saved progress is from a newer version of the app`);return k(c(e),{...n,version:t})}function u(){let r=a.getItem(e);if(r==null)return structuredClone({...n,version:t});try{return l(JSON.parse(r))}catch{return a.setItem(`${e}:corrupt:${Date.now()}`,r),structuredClone({...n,version:t})}}function d(){try{a.setItem(e,JSON.stringify(s))}catch{}}function f(){for(let e of o)e(s)}return{get:()=>s,update(e){let t=structuredClone(s);return s=e(t)??t,d(),f(),s},subscribe(e){return o.add(e),()=>o.delete(e)},reset(){s=structuredClone({...n,version:t}),a.removeItem(e),f()},exportJSON(){return JSON.stringify({app:`learn-luganda`,exportedAt:new Date().toISOString(),data:s},null,2)},importJSON(e){let t;try{t=JSON.parse(e)}catch{throw Error(`That file isn’t valid JSON.`)}if(t?.app!==`learn-luganda`||!O(t.data))throw Error(`That file isn’t a Learn Luganda progress export.`);return s=l(t.data),d(),f(),s}}}var A=ae({key:`learn-luganda`,version:1,defaults:{profile:null,onboarding:{step:0,answers:{}},settings:{sound:!0,motion:!0},lessons:{},xp:{total:0,byDay:{}},gems:50,hearts:{count:5,updatedAt:0},streak:{current:0,longest:0,lastDay:null,freezes:0,frozenDays:[]},words:{},mistakes:[],achievements:{},inventory:{},league:{},stats:{lessonsCompleted:0,perfectLessons:0,answers:0,correctAnswers:0,secondsLearning:0}}}),j=()=>!!A.get().profile;function M(t,n){return({root:r})=>{r.innerHTML=`
      <section class="empty-state">
        <div class="empty-state__art">${e({pose:`thinking`})}</div>
        <h1>${p(t)}</h1>
        <p class="muted">${p(n)}</p>
        ${m({label:`Back to learning`,href:`#/learn`,variant:`secondary`})}
      </section>`}}function N({root:t}){t.innerHTML=`
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
          ${m({label:`Continue`})}
          ${m({label:`Secondary`,variant:`secondary`})}
          ${m({label:`Correct`,variant:`success`})}
          ${m({label:`Wrong`,variant:`danger`})}
          ${m({label:`Blue`,variant:`blue`})}
          ${m({label:`Ghost`,variant:`ghost`})}
          ${m({label:`Disabled`,disabled:!0})}
        </div>
        <div class="sg-row">${m({label:`Start lesson`,size:`lg`,iconName:`arrow`})}</div>
        <div class="sg-row">
          <button class="tile" type="button">ssebo</button>
          <button class="tile is-selected" type="button">nnyabo</button>
          <button class="tile is-used" type="button">mukwano</button>
        </div>
      </section>

      <section class="sg-section">
        <h2>Progress</h2>
        ${h(.35)}
        <div class="sg-row">
          ${g(.7,{content:f(`bolt`,{size:22}),label:`Daily goal`})}
          ${g(1,{size:72,content:`<strong>20</strong>`,label:`Daily goal`})}
        </div>
      </section>

      <section class="sg-section">
        <h2>Pills and cards</h2>
        <div class="sg-row">
          ${_(`New word`,{variant:`primary`})}
          ${_(`3 day streak`,{variant:`yellow`,iconName:`flame`})}
          ${_(`Unit 1`,{})}
          ${_(`Legendary`,{variant:`blue`,iconName:`star`})}
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
          ${v(`Oli otya! Let’s learn a few words of <strong>Luganda</strong>.`)}
        </div>
      </section>

      <section class="sg-section">
        <h2>Overlays</h2>
        <div class="sg-row">
          ${m({label:`Open modal`,variant:`secondary`,attrs:`data-sg="modal"`})}
          ${m({label:`Show toast`,variant:`secondary`,attrs:`data-sg="toast"`})}
        </div>
      </section>

      <section class="sg-section">
        <h2>Icons</h2>
        <div class="sg-icons">
          ${d.map(e=>`<figure>${f(e,{size:28})}<figcaption>${e}</figcaption></figure>`).join(``)}
        </div>
      </section>
    </div>`,t.addEventListener(`click`,async t=>{let n=t.target.closest(`[data-sg]`)?.dataset.sg;n===`toast`&&b(`Weebale! That’s a toast.`),n===`modal`&&b(`You chose: ${await x({title:`Quit lesson?`,body:`<p>You’ll lose your progress in this lesson.</p>`,art:e({pose:`sad`}),actions:[{label:`Keep learning`,value:`stay`},{label:`End session`,value:`quit`,variant:`ghost`}]})??`dismissed`}`)})}var oe=[{icon:`bolt`,title:`Bite-sized lessons`,text:`Five-minute lessons with pictures, word tiles, listening and matching games.`},{icon:`flame`,title:`Daily streaks`,text:`Practise a little every day. Your streak and daily goal keep you coming back.`},{icon:`heart`,title:`Hearts`,text:`Mistakes cost a heart, so every answer counts. Practice wins them back.`},{icon:`target`,title:`Spaced review`,text:`Words return just before you’d forget them, so they stick for good.`}],P=[[`Oli otya?`,`How are you?`],[`Gyendi`,`I’m fine`],[`Weebale`,`Thank you`],[`Kale`,`Okay`],[`Mukwano`,`Friend`],[`Amazzi`,`Water`],[`Emmere`,`Food`],[`Ssebo`,`Sir`],[`Nnyabo`,`Madam`],[`Webale kujja`,`Welcome`]],se=[[`Is it free?`,`Yes. Learn Luganda is free, with no ads and no account.`],[`Where is my progress saved?`,`In your browser’s local storage on this device. You can export it to a file and import it on another device from Settings.`],[`Who is it for?`,`Complete beginners, diaspora families reconnecting with the language, and visitors to Uganda who want more than “hello”.`],[`What will I learn first?`,`Greetings, introductions and numbers, then family, food, the market, time, places and more, unit by unit.`],[`Does it work offline?`,`Once installed, lessons work without a connection.`]],F={prompt:`Which one means “thank you”?`,options:[`Oli otya?`,`Weebale`,`Nedda`],answer:`Weebale`};function ce({hasProgress:o=()=>!1}={}){return function({root:s}){let c=o(),l=m(c?{label:`Continue learning`,size:`lg`,href:`#/learn`}:{label:`Get started`,size:`lg`,href:`#/onboarding`}),u=c?``:m({label:`I already have progress`,variant:`secondary`,size:`lg`,href:`#/settings?import=1`}),d=Object.keys(r);s.innerHTML=`
      <div class="landing">
        <header class="landing__header">
          <a class="landing__brand" href="#/"><span class="brand-mark" aria-hidden="true"><i></i><b></b></span><span>luganda</span></a>
          <nav class="landing__links" aria-label="Page">
            <a href="#how">How it works</a>
            <a href="#cast">Meet the cast</a>
            <a href="#faq">FAQ</a>
          </nav>
          ${m({label:c?`Continue`:`Get started`,href:c?`#/learn`:`#/onboarding`})}
        </header>

        <section class="hero">
          <div class="hero__copy">
            <p class="eyebrow">Free · Bite-sized · Fun</p>
            <h1>The playful way to <strong>learn Luganda.</strong></h1>
            <p class="hero__lead">Short, game-like lessons that take you from <em>Oli otya?</em> to real conversations, one day at a time.</p>
            <div class="hero__ctas">${l}${u}</div>
            <p class="caption">okuyiga — v. to learn</p>
          </div>
          <div class="hero__art">${a()}</div>
          <span class="shape shape--circle" aria-hidden="true"></span>
          <span class="shape shape--square" aria-hidden="true"></span>
          <span class="shape shape--triangle" aria-hidden="true"></span>
        </section>

        <div class="ticker" aria-label="Sample words">
          <div class="ticker__track">
            ${[...P,...P].map(([e,t],n)=>`<span class="ticker__item"${n>=P.length?` aria-hidden="true"`:``}><strong>${p(e)}</strong> ${p(t)}</span>`).join(``)}
          </div>
        </div>

        <section class="landing__section why">
          <div class="why__grid">
            <div>
              <p class="eyebrow">Why Luganda</p>
              <h2>The language of <strong>Kampala’s streets.</strong></h2>
            </div>
            <p class="why__text">Luganda is spoken by millions of people across central Uganda and is the most widely spoken language in Kampala. Learn it to talk with family, make friends at the market, or feel at home on your next trip.</p>
          </div>
          <div class="why__cards">
            <article class="card card--pastel-butter"><h3>For families</h3><p>Reconnect with grandparents and pass the language on.</p></article>
            <article class="card card--pastel-sky"><h3>For travellers</h3><p>Greet, bargain and get around with confidence.</p></article>
            <article class="card card--pastel-sage"><h3>For the curious</h3><p>Discover noun classes, tones and proverbs.</p></article>
          </div>
        </section>

        <section class="landing__section how" id="how">
          <p class="eyebrow">How it works</p>
          <h2>Learning that feels <strong>like a game.</strong></h2>
          <ol class="how__steps">
            ${oe.map((e,t)=>`
              <li class="how__step">
                <span class="how__icon how__icon--${t}">${f(e.icon,{size:28})}</span>
                <h3>${e.title}</h3>
                <p>${e.text}</p>
              </li>`).join(``)}
          </ol>
        </section>

        <section class="landing__section try">
          <div class="try__card">
            <p class="eyebrow">Try it</p>
            <h2>${p(F.prompt)}</h2>
            <div class="try__options" role="group" aria-label="Answers">
              ${F.options.map((e,t)=>`<button class="choice" type="button" data-answer="${p(e)}"><span class="choice__key">${t+1}</span>${p(e)}</button>`).join(``)}
            </div>
            <p class="try__feedback" aria-live="polite"></p>
          </div>
          <div class="try__art" data-try-art>${e({pose:`thinking`})}</div>
        </section>

        <section class="landing__section showcase">
          <article class="showcase__item">
            <div class="showcase__art">${i({days:7})}</div>
            <h3>Keep your <strong>streak</strong> alive</h3>
            <p class="muted">Hit your daily goal to grow your streak. Busy day? A streak freeze has your back.</p>
          </article>
          <article class="showcase__item">
            <div class="showcase__art">${n({xp:20})}</div>
            <h3>Earn <strong>XP</strong> and climb leagues</h3>
            <p class="muted">Every lesson earns XP. Compete in a weekly practice league and unlock achievements.</p>
          </article>
        </section>

        <section class="landing__section cast" id="cast">
          <p class="eyebrow">Meet the cast</p>
          <h2>Friends who’ll <strong>talk with you.</strong></h2>
          <div class="cast__grid">
            ${d.map(e=>`
              <figure class="cast__item">
                <div class="cast__art">${t(e,{expression:`happy`})}</div>
                <figcaption><strong>${p(r[e].name)}</strong><span>${p(r[e].role)}</span></figcaption>
              </figure>`).join(``)}
          </div>
        </section>

        <section class="landing__section faq" id="faq">
          <p class="eyebrow">Questions</p>
          <h2>Good to <strong>know.</strong></h2>
          <div class="faq__list">
            ${se.map(([e,t])=>`<details class="faq__item"><summary>${p(e)}</summary><p>${p(t)}</p></details>`).join(``)}
          </div>
        </section>

        <section class="final-cta">
          <div class="final-cta__art">${e({pose:`cheering`})}</div>
          <h2>Ready? <strong>Tandika!</strong></h2>
          <p class="caption">tandika — v. start, begin</p>
          ${l}
        </section>

        <footer class="landing__footer">
          <span class="landing__brand"><span class="brand-mark" aria-hidden="true"><i></i><b></b></span><span>luganda</span></span>
          <p>Made with care for Luganda learners. Your progress stays on your device.</p>
          <p class="caption">Weebale nnyo — thank you very much.</p>
        </footer>
      </div>`,s.addEventListener(`click`,t=>{let n=t.target.closest(`a[href^="#"]:not([href^="#/"])`);if(n){t.preventDefault(),s.querySelector(n.getAttribute(`href`))?.scrollIntoView({behavior:`smooth`});return}let r=t.target.closest(`[data-answer]`);if(!r)return;let i=r.dataset.answer===F.answer;s.querySelectorAll(`[data-answer]`).forEach(e=>e.classList.remove(`is-correct`,`is-wrong`)),r.classList.add(i?`is-correct`:`is-wrong`),s.querySelector(`.try__feedback`).innerHTML=i?`${f(`check`,{size:18})} Correct! <em>Weebale</em> means thank you.`:`${f(`cross`,{size:18})} Not quite. Try again!`,s.querySelector(`.try__feedback`).className=`try__feedback try__feedback--${i?`good`:`bad`}`,s.querySelector(`[data-try-art]`).innerHTML=e({pose:i?`cheering`:`sad`})})}}function le(e,t){let n=URL.createObjectURL(new Blob([t],{type:`application/json`})),r=Object.assign(document.createElement(`a`),{href:n,download:e});document.body.append(r),r.click(),r.remove(),URL.revokeObjectURL(n)}function ue({root:t,query:n,navigate:r}){t.innerHTML=`
    <div class="page">
      <header class="page__header">
        <h1><strong>Settings</strong></h1>
      </header>

      <section class="settings-group" id="data">
        <h2>Your progress</h2>
        <p class="muted">Progress is saved in this browser only. Export it to keep a backup or to move to another device, then import it there.</p>
        <div class="settings-actions">
          ${m({label:`Export progress`,variant:`secondary`,iconName:`arrow`,attrs:`data-action="export"`})}
          ${m({label:`Import progress`,variant:`secondary`,attrs:`data-action="import"`})}
          <input type="file" accept="application/json,.json" hidden data-import-file />
        </div>
      </section>

      <section class="settings-group settings-group--danger">
        <h2>Start over</h2>
        <p class="muted">Erase your profile, XP, streak and everything you’ve learned on this device.</p>
        ${m({label:`Reset progress`,variant:`danger`,attrs:`data-action="reset"`})}
      </section>
    </div>`;let i=t.querySelector(`[data-import-file]`);i.addEventListener(`change`,async()=>{let e=i.files?.[0];if(i.value=``,!e)return;let t=await e.text();if(await x({title:`Replace your progress?`,body:`<p>Importing replaces everything saved on this device with the file’s progress.</p>`,actions:[{label:`Import`,value:`yes`},{label:`Cancel`,value:`no`,variant:`ghost`}]})===`yes`)try{let e=A.importJSON(t);E(),b(`Progress imported. Weebale!`,{variant:`success`}),r(e.profile?`/learn`:`/onboarding`)}catch(e){b(e.message,{variant:`error`,duration:4e3})}}),t.addEventListener(`click`,async t=>{let n=t.target.closest(`[data-action]`)?.dataset.action;n===`export`&&(le(`learn-luganda-${A.get().profile?.name?.toLowerCase().replace(/[^a-z0-9]+/g,`-`)||`learner`}-${new Date().toISOString().slice(0,10)}.json`,A.exportJSON()),b(`Progress exported.`)),n===`import`&&i.click(),n===`reset`&&await x({title:`Reset all progress?`,body:`<p>This can’t be undone. Export first if you might want it back.</p>`,art:e({pose:`sad`}),actions:[{label:`Keep my progress`,value:`keep`},{label:`Reset everything`,value:`reset`,variant:`danger`}]})===`reset`&&(A.reset(),b(`Progress reset.`),r(`/`))}),n.import&&i.click()}function I(e=new Date){let t=new Date(e),n=String(t.getMonth()+1).padStart(2,`0`),r=String(t.getDate()).padStart(2,`0`);return`${t.getFullYear()}-${n}-${r}`}var L=[{xp:10,label:`Casual`,minutes:5},{xp:20,label:`Regular`,minutes:10},{xp:30,label:`Serious`,minutes:15},{xp:50,label:`Intense`,minutes:20}],R=[`vermillion`,`ink`,`butter`,`sky`,`sage`,`lilac`,`blush`];function z({name:e,avatar:t,dailyGoal:n=20,motivation:r=null,level:i=`new`},a=new Date){return{name:String(e??``).trim().slice(0,30)||`Learner`,avatar:{character:t?.character??`nakato`,color:t?.color??`vermillion`},dailyGoal:n,motivation:r,level:i,joinedAt:I(a)}}var B=`Crane`;function V({character:e=`nakato`,color:n=`vermillion`}={},{size:r=48,label:i=``}={}){return`<span class="avatar avatar--${p(n)}" style="--avatar-size:${r}px"${i?` title="${p(i)}"`:``}>
    ${t(e,{shape:`circle`,expression:`happy`,label:i||`Avatar`})}
  </span>`}var H=[{id:`family`,label:`Talk with family`,icon:`profile`},{id:`travel`,label:`Travel to Uganda`,icon:`arrow`},{id:`friends`,label:`Connect with friends`,icon:`heart`},{id:`culture`,label:`Explore the culture`,icon:`book`},{id:`work`,label:`Work or study`,icon:`target`},{id:`fun`,label:`Just for fun`,icon:`star`}],U=[{id:`new`,label:`I’m new to Luganda`,detail:`Start from the very first lesson.`},{id:`some`,label:`I know some words`,detail:`Start with a quick greetings review.`}],W=[`welcome`,`motivation`,`goal`,`level`,`avatar`,`ready`];function G(e){A.update(t=>{t.onboarding={...t.onboarding,...e,answers:{...t.onboarding.answers,...e.answers??{}}}})}function de(e,t){switch(e){case`welcome`:return{pose:`happy`,say:`Oli otya! I’m ${p(B)}, your guide to Luganda.`,body:`<p class="onb__lead">A few quick questions and we’ll set up your course.</p>`,ready:!0,cta:`Let’s go`};case`motivation`:return{pose:`thinking`,say:`Why are you learning Luganda?`,body:`<div class="onb__options onb__options--grid" role="radiogroup" aria-label="Why are you learning">
          ${H.map(e=>`<button class="choice" type="button" role="radio" aria-checked="${t.motivation===e.id}" data-pick="motivation" data-value="${e.id}">${f(e.icon,{size:22})}<span>${e.label}</span></button>`).join(``)}
        </div>`,ready:!!t.motivation};case`goal`:return{pose:`idle`,say:`What’s your daily goal?`,body:`<div class="onb__options" role="radiogroup" aria-label="Daily goal">
          ${L.map(e=>`<button class="choice onb__goal" type="button" role="radio" aria-checked="${Number(t.dailyGoal)===e.xp}" data-pick="dailyGoal" data-value="${e.xp}">
            <strong>${e.label}</strong><span>${e.minutes} min a day</span><span class="onb__xp">${e.xp} XP</span></button>`).join(``)}
        </div>`,ready:!!t.dailyGoal};case`level`:return{pose:`thinking`,say:`How much Luganda do you know?`,body:`<div class="onb__options" role="radiogroup" aria-label="Your level">
          ${U.map(e=>`<button class="choice onb__level" type="button" role="radio" aria-checked="${t.level===e.id}" data-pick="level" data-value="${e.id}">
            <strong>${e.label}</strong><span>${e.detail}</span></button>`).join(``)}
        </div>`,ready:!!t.level};case`avatar`:{let e=t.character??`nakato`,n=t.color??`vermillion`;return{pose:`happy`,say:`Make it yours. What should I call you?`,body:`
          <div class="onb__avatar-preview">${V({character:e,color:n},{size:120,label:`Your avatar`})}</div>
          <div class="field">
            <label for="onb-name">Your name</label>
            <input id="onb-name" class="input" type="text" maxlength="30" autocomplete="given-name" placeholder="e.g. Amani" value="${p(t.name??``)}" />
          </div>
          <fieldset class="onb__fieldset">
            <legend>Character</legend>
            <div class="onb__characters" role="radiogroup" aria-label="Character">
              ${Object.keys(r).map(t=>`<button class="onb__character" type="button" role="radio" aria-checked="${e===t}" aria-label="${r[t].name}" data-pick="character" data-value="${t}">${V({character:t,color:`paper`},{size:64})}</button>`).join(``)}
            </div>
          </fieldset>
          <fieldset class="onb__fieldset">
            <legend>Colour</legend>
            <div class="onb__colors" role="radiogroup" aria-label="Colour">
              ${R.map(e=>`<button class="onb__color avatar--${e}" type="button" role="radio" aria-checked="${n===e}" aria-label="${e}" data-pick="color" data-value="${e}"></button>`).join(``)}
            </div>
          </fieldset>`,ready:!!(t.name??``).trim(),cta:`Continue`}}default:{let e=L.find(e=>e.xp===Number(t.dailyGoal))??L[1];return{pose:`cheering`,say:`Weebale, ${p(t.name??``)}! You’re all set.`,body:`<div class="onb__summary card">
            ${V({character:t.character??`nakato`,color:t.color??`vermillion`},{size:72})}
            <div><strong>${p(t.name??``)}</strong><p class="muted">${e.label} goal · ${e.xp} XP a day</p></div>
          </div>
          <p class="onb__lead">Your first lesson: greetings. You’ll learn to say <em>Oli otya?</em> in under five minutes.</p>`,ready:!0,cta:`Start learning`}}}}function fe({root:t,navigate:n}){if(A.get().profile){n(`/learn`,{replace:!0});return}function r(){let{step:n=0,answers:r={}}=A.get().onboarding,i=Math.min(n,W.length-1),a=W[i],o=de(a,r);t.innerHTML=`
      <div class="onb">
        <header class="onb__top">
          ${i>0?`<button class="icon-btn" type="button" data-nav="back" aria-label="Back">${f(`back`)}</button>`:`<a class="icon-btn" href="#/" aria-label="Close">${f(`close`)}</a>`}
          ${h(i/(W.length-1),{label:`Setup progress`})}
        </header>
        <section class="onb__main onb__main--${a}">
          <div class="talk onb__talk">
            <div class="talk__art">${e({pose:o.pose})}</div>
            ${v(o.say)}
          </div>
          <div class="onb__body">${o.body}</div>
        </section>
        <footer class="onb__footer">
          ${m({label:o.cta??`Continue`,size:`lg`,block:!0,disabled:!o.ready,attrs:`data-nav="next"`})}
        </footer>
      </div>`,t.querySelector(`#onb-name`)?.focus()}function i(){let{step:e=0,answers:t}=A.get().onboarding;W[e]===`ready`?(A.update(e=>{e.profile=z({name:t.name,avatar:{character:t.character,color:t.color},dailyGoal:Number(t.dailyGoal)||20,motivation:t.motivation,level:t.level}),e.onboarding={step:0,answers:{}}}),n(`/learn`)):(G({step:e+1}),r())}t.addEventListener(`click`,e=>{let n=e.target.closest(`[data-pick]`);if(n){G({answers:{[n.dataset.pick]:n.dataset.value}});let e=`[data-pick="${n.dataset.pick}"][data-value="${n.dataset.value}"]`;r(),t.querySelector(e)?.focus();return}let a=e.target.closest(`[data-nav]`)?.dataset.nav;a===`back`&&(G({step:Math.max(0,A.get().onboarding.step-1)}),r()),a===`next`&&!e.target.closest(`[disabled]`)&&i()}),t.addEventListener(`input`,e=>{if(e.target.id!==`onb-name`)return;let n=e.target.value;A.update(e=>{e.onboarding.answers.name=n}),t.querySelector(`[data-nav="next"]`).disabled=!n.trim()}),t.addEventListener(`keydown`,e=>{e.key===`Enter`&&e.target.id===`onb-name`&&e.target.value.trim()&&i()}),r()}var pe=[{id:`u1`,title:`Greetings`,description:`Say hello, introduce yourself and count to ten.`,color:`vermillion`,character:`nakato`,words:[[`oli-otya`,`Oli otya?`,`How are you?`,{altEn:[`how are you doing`,`hello`],notes:`The everyday greeting to one person.`}],[`gyendi`,`Gyendi`,`I’m fine`,{altEn:[`i am fine`,`fine`,`i am well`,`i’m well`],notes:`The usual reply to Oli otya?`}],[`bulungi`,`Bulungi`,`Good`,{altEn:[`fine`,`well`,`okay`]}],[`weebale`,`Weebale`,`Thank you`,{altEn:[`thanks`,`thank you`]}],[`nnyo`,`nnyo`,`very much`,{altEn:[`very`,`a lot`,`so much`]}],[`kale`,`Kale`,`Okay`,{altEn:[`ok`,`alright`,`all right`]}],[`ssebo`,`ssebo`,`sir`,{notes:`A polite way to address a man.`}],[`nnyabo`,`nnyabo`,`madam`,{altEn:[`ma’am`,`maam`],notes:`A polite way to address a woman.`}],[`yee`,`Yee`,`Yes`],[`nedda`,`Nedda`,`No`],[`wasuze-otya`,`Wasuze otya?`,`Good morning`,{altEn:[`how did you sleep`,`morning`],notes:`Literally “how did you sleep?”, said to one person in the morning.`}],[`nsuze-bulungi`,`Nsuze bulungi`,`I slept well`,{altEn:[`slept well`]}],[`osiibye-otya`,`Osiibye otya?`,`Good afternoon`,{altEn:[`good evening`,`how was your day`,`how has your day been`],notes:`Literally “how have you spent the day?”`}],[`gyebale-ko`,`Gyebale ko`,`Well done`,{altEn:[`thank you for your work`,`good work`],notes:`Said to greet someone who is working.`}],[`weraba`,`Weraba`,`Goodbye`,{altEn:[`bye`],notes:`To one person.`}],[`tunaalabagana`,`Tunaalabagana`,`See you later`,{altEn:[`see you`,`we will see each other`,`see you soon`]}],[`nze`,`Nze`,`I`,{altEn:[`me`,`i am`]}],[`ggwe`,`Ggwe`,`You`,{notes:`One person.`}],[`erinnya`,`erinnya`,`name`],[`lyange`,`lyange`,`my`,{notes:`Agrees with erinnya: erinnya lyange, my name.`}],[`lyo`,`lyo`,`your`,{notes:`Agrees with erinnya: erinnya lyo, your name.`}],[`ani`,`ani`,`who`,{altEn:[`what`]}],[`mbeera`,`Mbeera`,`I live`,{altEn:[`i stay`]}],[`ova-wa`,`Ova wa?`,`Where are you from?`,{altEn:[`where do you come from`]}],[`nva`,`Nva`,`I come from`,{altEn:[`i am from`,`i’m from`]}],[`ndi`,`Ndi`,`I am`,{altEn:[`i’m`]}],[`muyizi`,`muyizi`,`student`,{altEn:[`learner`,`a student`]}],[`nsanyuse-okukulaba`,`Nsanyuse okukulaba`,`Nice to meet you`,{altEn:[`i am happy to see you`,`i’m happy to see you`,`pleased to meet you`,`glad to see you`]}],[`emu`,`emu`,`one`,{altEn:[`1`]}],[`bbiri`,`bbiri`,`two`,{altEn:[`2`]}],[`ssatu`,`ssatu`,`three`,{altEn:[`3`]}],[`nnya`,`nnya`,`four`,{altEn:[`4`]}],[`ttaano`,`ttaano`,`five`,{altEn:[`5`]}],[`mukaaga`,`mukaaga`,`six`,{altEn:[`6`]}],[`musanvu`,`musanvu`,`seven`,{altEn:[`7`]}],[`munaana`,`munaana`,`eight`,{altEn:[`8`]}],[`mwenda`,`mwenda`,`nine`,{altEn:[`9`]}],[`kkumi`,`kkumi`,`ten`,{altEn:[`10`]}]],sentences:[[`s-oli-otya-ssebo`,`Oli otya, ssebo?`,`How are you, sir?`,{altEn:[`Hello, sir`]}],[`s-oli-otya-nnyabo`,`Oli otya, nnyabo?`,`How are you, madam?`,{altEn:[`How are you, ma’am?`]}],[`s-gyendi-weebale`,`Gyendi, weebale.`,`I’m fine, thank you.`,{altEn:[`I am fine, thank you.`,`I’m fine, thanks.`,`I am fine, thanks.`,`Fine, thank you.`]}],[`s-weebale-nnyo`,`Weebale nnyo.`,`Thank you very much.`,{altEn:[`Thanks a lot.`,`Thank you so much.`,`Thanks very much.`]}],[`s-yee-ssebo`,`Yee, ssebo.`,`Yes, sir.`],[`s-nedda-nnyabo`,`Nedda, nnyabo.`,`No, madam.`,{altEn:[`No, ma’am.`]}],[`s-wasuze-otya-nnyabo`,`Wasuze otya, nnyabo?`,`Good morning, madam.`,{altEn:[`Good morning, ma’am.`,`How did you sleep, madam?`]}],[`s-nsuze-bulungi`,`Nsuze bulungi, weebale.`,`I slept well, thank you.`,{altEn:[`I slept well, thanks.`]}],[`s-osiibye-otya-ssebo`,`Osiibye otya, ssebo?`,`Good afternoon, sir.`,{altEn:[`Good evening, sir.`,`How was your day, sir?`]}],[`s-gyebale-ko-ssebo`,`Gyebale ko, ssebo.`,`Well done, sir.`,{altEn:[`Good work, sir.`]}],[`s-kale-weraba`,`Kale, weraba.`,`Okay, goodbye.`,{altEn:[`Ok, goodbye.`,`Okay, bye.`,`Alright, goodbye.`]}],[`s-weraba-tunaalabagana`,`Weraba, tunaalabagana.`,`Goodbye, see you later.`,{altEn:[`Bye, see you later.`,`Goodbye, see you soon.`]}],[`s-nze-nakato`,`Nze Nakato.`,`I am Nakato.`,{altEn:[`I’m Nakato.`,`My name is Nakato.`]}],[`s-erinnya-lyo-ani`,`Erinnya lyo ani?`,`What is your name?`,{altEn:[`What’s your name?`]}],[`s-erinnya-lyange-mukasa`,`Erinnya lyange Mukasa.`,`My name is Mukasa.`,{altEn:[`My name’s Mukasa.`]}],[`s-ggwe-ani`,`Ggwe ani?`,`Who are you?`],[`s-mbeera-kampala`,`Mbeera Kampala.`,`I live in Kampala.`,{altEn:[`I stay in Kampala.`]}],[`s-nva-masaka`,`Nva Masaka.`,`I come from Masaka.`,{altEn:[`I am from Masaka.`,`I’m from Masaka.`]}],[`s-ndi-muyizi`,`Ndi muyizi.`,`I am a student.`,{altEn:[`I’m a student.`,`I am a learner.`]}],[`s-nsanyuse-okukulaba`,`Nsanyuse okukulaba, Ssali.`,`Nice to meet you, Ssali.`,{altEn:[`Pleased to meet you, Ssali.`,`I am happy to see you, Ssali.`,`I’m happy to see you, Ssali.`]}]],skills:[{id:`u1s1`,title:`Hello`,icon:`star`,lessons:[{id:`u1s1l1`,newWords:[`oli-otya`,`gyendi`,`weebale`,`ssebo`,`nnyabo`],sentences:[`s-oli-otya-ssebo`,`s-oli-otya-nnyabo`,`s-gyendi-weebale`]},{id:`u1s1l2`,newWords:[`yee`,`nedda`,`nnyo`,`kale`,`bulungi`],sentences:[`s-weebale-nnyo`,`s-yee-ssebo`,`s-nedda-nnyabo`,`s-gyendi-weebale`]},{id:`u1s1l3`,newWords:[`wasuze-otya`,`nsuze-bulungi`,`osiibye-otya`,`gyebale-ko`],sentences:[`s-wasuze-otya-nnyabo`,`s-nsuze-bulungi`,`s-osiibye-otya-ssebo`,`s-gyebale-ko-ssebo`],dialogues:[{speaker:`jjajja`,line:`Wasuze otya, mwana wange?`,translation:`Good morning, my child.`,options:[`Nsuze bulungi, nnyabo.`,`Weraba, nnyabo.`,`Nedda, ssebo.`],answer:`Nsuze bulungi, nnyabo.`}]},{id:`u1s1l4`,newWords:[`weraba`,`tunaalabagana`],sentences:[`s-kale-weraba`,`s-weraba-tunaalabagana`,`s-weebale-nnyo`,`s-gyebale-ko-ssebo`],dialogues:[{speaker:`ssali`,line:`Kale, weraba!`,translation:`Okay, goodbye!`,options:[`Weraba, tunaalabagana.`,`Wasuze otya?`,`Gyendi.`],answer:`Weraba, tunaalabagana.`}]}]},{id:`u1s2`,title:`Introductions`,icon:`profile`,lessons:[{id:`u1s2l1`,newWords:[`nze`,`ggwe`,`erinnya`,`lyange`,`lyo`,`ani`],sentences:[`s-nze-nakato`,`s-erinnya-lyo-ani`,`s-erinnya-lyange-mukasa`,`s-ggwe-ani`]},{id:`u1s2l2`,newWords:[`mbeera`,`ova-wa`,`nva`],sentences:[`s-mbeera-kampala`,`s-nva-masaka`,`s-nze-nakato`]},{id:`u1s2l3`,newWords:[`ndi`,`muyizi`,`nsanyuse-okukulaba`],sentences:[`s-ndi-muyizi`,`s-nsanyuse-okukulaba`,`s-erinnya-lyo-ani`,`s-mbeera-kampala`],dialogues:[{speaker:`mukasa`,line:`Erinnya lyo ani?`,translation:`What is your name?`,options:[`Nze Amara.`,`Mbeera Kampala.`,`Gyebale ko.`],answer:`Nze Amara.`},{speaker:`emma`,line:`Nze Emma. Ova wa?`,translation:`I am Emma. Where are you from?`,options:[`Nva Masaka.`,`Ndi muyizi.`,`Weebale nnyo.`],answer:`Nva Masaka.`}]}]},{id:`u1s3`,title:`Numbers 1–10`,icon:`target`,lessons:[{id:`u1s3l1`,newWords:[`emu`,`bbiri`,`ssatu`,`nnya`,`ttaano`],sentences:[]},{id:`u1s3l2`,newWords:[`mukaaga`,`musanvu`,`munaana`,`mwenda`,`kkumi`],sentences:[]}]}]},{id:`u2`,title:`People and things`,description:`Family, everyday things and your first verbs.`,color:`ink`,character:`jjajja`,words:[[`maama`,`maama`,`mother`,{altEn:[`mom`,`mum`,`mama`]}],[`taata`,`taata`,`father`,{altEn:[`dad`,`papa`]}],[`jjajja`,`jjajja`,`grandparent`,{altEn:[`grandmother`,`grandfather`,`grandma`,`grandpa`]}],[`wange`,`wange`,`my`,{notes:`Agrees with people nouns (mu-/ba- class, singular): maama wange, my mother.`}],[`omwana`,`omwana`,`child`,{altEn:[`a child`,`the child`,`kid`]}],[`abaana`,`abaana`,`children`,{altEn:[`the children`,`kids`]}],[`omusajja`,`omusajja`,`man`,{altEn:[`a man`,`the man`]}],[`abasajja`,`abasajja`,`men`,{altEn:[`the men`]}],[`omukazi`,`omukazi`,`woman`,{altEn:[`a woman`,`the woman`]}],[`abakazi`,`abakazi`,`women`,{altEn:[`the women`]}],[`omuntu`,`omuntu`,`person`,{altEn:[`a person`,`the person`]}],[`abantu`,`abantu`,`people`,{altEn:[`the people`]}],[`omuyizi`,`omuyizi`,`student`,{altEn:[`a student`,`the student`,`learner`]}],[`abayizi`,`abayizi`,`students`,{altEn:[`the students`,`learners`]}],[`omusomesa`,`omusomesa`,`teacher`,{altEn:[`a teacher`,`the teacher`]}],[`abasomesa`,`abasomesa`,`teachers`,{altEn:[`the teachers`]}],[`ekitabo`,`ekitabo`,`book`,{altEn:[`a book`,`the book`]}],[`ebitabo`,`ebitabo`,`books`,{altEn:[`the books`]}],[`ekikopo`,`ekikopo`,`cup`,{altEn:[`a cup`,`the cup`]}],[`ebikopo`,`ebikopo`,`cups`,{altEn:[`the cups`]}],[`ekintu`,`ekintu`,`thing`,{altEn:[`a thing`,`the thing`]}],[`ebintu`,`ebintu`,`things`,{altEn:[`the things`]}],[`ekitanda`,`ekitanda`,`bed`,{altEn:[`a bed`,`the bed`]}],[`ebitanda`,`ebitanda`,`beds`,{altEn:[`the beds`]}],[`amazzi`,`amazzi`,`water`,{altEn:[`the water`]}],[`emmere`,`emmere`,`food`,{altEn:[`the food`]}],[`caayi`,`caayi`,`tea`,{altEn:[`the tea`]}],[`oluganda`,`Oluganda`,`Luganda`,{notes:`The language. A Muganda person speaks Oluganda.`}],[`njagala`,`Njagala`,`I want`,{altEn:[`i like`,`i love`]}],[`ndya`,`Ndya`,`I eat`,{altEn:[`i am eating`,`i’m eating`]}],[`nnywa`,`Nnywa`,`I drink`,{altEn:[`i am drinking`,`i’m drinking`]}],[`nsoma`,`Nsoma`,`I read`,{altEn:[`i am reading`,`i’m reading`,`i study`]}],[`njiga`,`Njiga`,`I learn`,{altEn:[`i am learning`,`i’m learning`]}],[`oyagala-ki`,`Oyagala ki?`,`What do you want?`,{altEn:[`what would you like`]}]],sentences:[[`s-maama-wange`,`Maama wange.`,`My mother.`,{altEn:[`My mom.`,`My mum.`]}],[`s-taata-wange`,`Taata wange.`,`My father.`,{altEn:[`My dad.`]}],[`s-jjajja-wange`,`Jjajja wange.`,`My grandparent.`,{altEn:[`My grandmother.`,`My grandfather.`,`My grandma.`,`My grandpa.`]}],[`s-omwana-wange`,`Omwana wange.`,`My child.`],[`s-omusajja-omukazi`,`Omusajja n’omukazi.`,`A man and a woman.`,{altEn:[`The man and the woman.`]}],[`s-abaana-abayizi`,`Abaana bayizi.`,`The children are students.`,{altEn:[`Children are students.`]}],[`s-omusomesa-wange`,`Omusomesa wange.`,`My teacher.`],[`s-ekitabo-kyange`,`Ekitabo kyange.`,`My book.`,{notes:`ki- class nouns take kyange.`}],[`s-ebitabo-byange`,`Ebitabo byange.`,`My books.`,{notes:`bi- class nouns take byange.`}],[`s-njagala-amazzi`,`Njagala amazzi.`,`I want water.`,{altEn:[`I would like water.`,`I want some water.`]}],[`s-njagala-emmere`,`Njagala emmere.`,`I want food.`,{altEn:[`I would like food.`,`I want some food.`]}],[`s-nnywa-caayi`,`Nnywa caayi.`,`I drink tea.`,{altEn:[`I am drinking tea.`,`I’m drinking tea.`]}],[`s-ndya-emmere`,`Ndya emmere.`,`I eat food.`,{altEn:[`I am eating food.`,`I’m eating food.`,`I am eating.`]}],[`s-nsoma-ekitabo`,`Nsoma ekitabo.`,`I read a book.`,{altEn:[`I am reading a book.`,`I’m reading a book.`,`I read the book.`]}],[`s-njiga-oluganda`,`Njiga Oluganda.`,`I am learning Luganda.`,{altEn:[`I’m learning Luganda.`,`I learn Luganda.`]}],[`s-oyagala-ki`,`Oyagala ki?`,`What do you want?`,{altEn:[`What would you like?`]}],[`s-njagala-ekikopo`,`Njagala ekikopo.`,`I want a cup.`,{altEn:[`I want the cup.`]}]],skills:[{id:`u2s1`,title:`Family`,icon:`heart`,lessons:[{id:`u2s1l1`,newWords:[`maama`,`taata`,`jjajja`,`wange`,`omwana`],sentences:[`s-maama-wange`,`s-taata-wange`,`s-jjajja-wange`,`s-omwana-wange`]},{id:`u2s1l2`,newWords:[`abaana`,`omusajja`,`omukazi`,`abasajja`,`abakazi`],sentences:[`s-omusajja-omukazi`,`s-omwana-wange`,`s-maama-wange`],dialogues:[{speaker:`jjajja`,line:`Ono ani?`,translation:`Who is this?`,options:[`Maama wange.`,`Njagala amazzi.`,`Ebitabo byange.`],answer:`Maama wange.`}]}]},{id:`u2s2`,title:`People and things`,icon:`book`,tip:`noun-classes`,lessons:[{id:`u2s2l1`,newWords:[`omuntu`,`abantu`,`omuyizi`,`abayizi`,`omusomesa`,`abasomesa`],sentences:[`s-abaana-abayizi`,`s-omusomesa-wange`]},{id:`u2s2l2`,newWords:[`ekitabo`,`ebitabo`,`ekikopo`,`ebikopo`],sentences:[`s-ekitabo-kyange`,`s-ebitabo-byange`]},{id:`u2s2l3`,newWords:[`ekintu`,`ebintu`,`ekitanda`,`ebitanda`],sentences:[`s-ekitabo-kyange`,`s-ebitabo-byange`,`s-omusomesa-wange`]}]},{id:`u2s3`,title:`First verbs`,icon:`bolt`,lessons:[{id:`u2s3l1`,newWords:[`njagala`,`amazzi`,`emmere`,`oyagala-ki`],sentences:[`s-njagala-amazzi`,`s-njagala-emmere`,`s-oyagala-ki`]},{id:`u2s3l2`,newWords:[`ndya`,`nnywa`,`caayi`],sentences:[`s-nnywa-caayi`,`s-ndya-emmere`,`s-njagala-amazzi`]},{id:`u2s3l3`,newWords:[`nsoma`,`njiga`,`oluganda`],sentences:[`s-nsoma-ekitabo`,`s-njiga-oluganda`,`s-njagala-ekikopo`],dialogues:[{speaker:`nakato`,line:`Oyagala ki?`,translation:`What do you want?`,options:[`Njagala caayi.`,`Nze Nakato.`,`Wasuze otya?`],answer:`Njagala caayi.`}]}]}]}];function K([e,t,n,r={}],i){return{id:e,lg:t,en:n,altLg:r.altLg??[],altEn:r.altEn??[],notes:r.notes??``,audio:r.audio??null,unit:i}}function q(e){let t={},n={},r={},i={},a=[];return{units:e.map((e,o)=>{for(let n of e.words)t[n[0]]=K(n,e.id);for(let t of e.sentences)n[t[0]]=K(t,e.id);let s=e.skills.map((t,n)=>{let o={...t,unit:e.id,index:n,lessons:t.lessons.map((n,i)=>{let o={...n,dialogues:n.dialogues??[],skill:t.id,unit:e.id,index:i,order:a.length};return r[n.id]=o,a.push(n.id),o})};return i[t.id]=o,o});return{id:e.id,title:e.title,description:e.description,color:e.color,character:e.character,index:o,skills:s}}),words:t,sentences:n,lessons:r,skills:i,order:a}}var J=q(pe);function Y(e,t){return(e.lessons[t]?.completions??0)>0}function me(e,t,n){return e.profile?.level===`some`&&t.skill===n.units[0].skills[0].id}function X(e,t,n=J){let r=n.lessons[t];return r?r.order===0||Y(e,t)||me(e,r,n)?!0:Y(e,n.order[r.order-1]):!1}function he(e,t=J){return t.order.find(n=>!Y(e,n)&&X(e,n,t))??null}function ge(e,t,n=J){let r=n.skills[t].lessons,i=r.filter(t=>Y(e,t.id)).length;return{done:i,total:r.length,complete:i===r.length}}function Z(e,t,n=J){let r=n.units.find(e=>e.id===t).skills.flatMap(e=>e.lessons),i=r.filter(t=>Y(e,t.id)).length;return{done:i,total:r.length,complete:i===r.length}}function _e(e,t,n=J){return X(e,n.units.find(e=>e.id===t).skills[0].lessons[0].id,n)}var Q=[0,44,72,44,0,-44,-72,-44];function ve(e,t,n,r){let i=Y(e,t.id),a=X(e,t.id),o=i?`done`:t.id===r?`current`:a?`open`:`locked`,s=J.skills[t.skill],c=`${s.title}, lesson ${t.index+1} of ${s.lessons.length}: ${o===`locked`?`locked`:o===`done`?`completed`:`start`}`,l=o===`locked`?`lock`:o===`done`?`check`:s.icon??`star`;return`
    <li class="node-wrap" style="--x:${Q[n%Q.length]}px">
      ${o===`current`?`<span class="node__bubble" aria-hidden="true">Start</span>`:``}
      <button class="node node--${o}" type="button" data-lesson="${t.id}" aria-label="${p(c)}">
        ${f(l,{size:30})}
      </button>
    </li>`}function ye(e,t,n){let r=Z(e,t.id),i=e.lessons[`checkpoint-${t.id}`]?.completions?`done`:r.complete?`current`:`locked`;return`
    <li class="node-wrap" style="--x:${Q[n%Q.length]}px">
      <button class="node node--checkpoint node--${i}" type="button" data-checkpoint="${t.id}" aria-label="${p(`${t.title} checkpoint${i===`locked`?`, locked`:``}`)}">
        ${f(`trophy`,{size:34})}
      </button>
    </li>`}function be(e,n,r){let i=Z(e,n.id),a=_e(e,n.id),o=0,s=n.skills.map(t=>{let n=ge(e,t.id),i=t.lessons.map(t=>ve(e,t,o++,r)).join(``);return`
        <li class="skill${n.complete?` skill--complete`:``}">
          <h3 class="skill__title"><span>${p(t.title)}</span><span class="skill__count">${n.done}/${n.total}</span></h3>
          <ol class="trail">${i}</ol>
        </li>`}).join(``),c=[n.character,...n.skills.map(e=>e.character).filter(Boolean)];return`
    <section class="unit unit--${n.color}${a?``:` unit--locked`}" aria-labelledby="unit-${n.id}">
      <header class="unit__banner">
        <div>
          <p class="unit__eyebrow">Unit ${n.index+1}</p>
          <h2 id="unit-${n.id}">${p(n.title)}</h2>
          <p class="unit__desc">${p(n.description)}</p>
        </div>
        <a class="unit__guide" href="#/guidebook/${n.id}" aria-label="${p(n.title)} guidebook">${f(`book`,{size:22})}<span>Guidebook</span></a>
        <div class="unit__meter" aria-label="${i.done} of ${i.total} lessons complete"><span style="width:${i.done/i.total*100}%"></span></div>
      </header>
      <div class="unit__body">
        <div class="unit__cast" aria-hidden="true">${c.map(e=>`<div class="unit__character">${t(e,{expression:i.complete?`happy`:`neutral`})}</div>`).join(``)}</div>
        <ol class="skills">${s}</ol>
        <ol class="trail trail--checkpoint">${ye(e,n,o)}</ol>
      </div>
    </section>`}function xe(e){let t=e.profile?.dailyGoal??20,n=e.xp.byDay[I()]??0;return`
    <aside class="learn__side">
      <div class="card side-card">
        ${g(n/t,{size:64,content:f(`bolt`,{size:26}),label:`Daily goal`})}
        <div>
          <h3>Daily goal</h3>
          <p class="muted">${Math.min(n,t)} / ${t} XP today</p>
        </div>
      </div>
      <div class="card side-card">
        <span class="side-card__icon">${f(`flame`,{size:34})}</span>
        <div>
          <h3>${e.streak.current} day streak</h3>
          <p class="muted">${e.streak.current?`Keep it going!`:`Finish a lesson to start one.`}</p>
        </div>
      </div>
    </aside>`}function Se({root:e,navigate:t}){let n=A.get(),r=he(n);e.innerHTML=`
    <div class="learn">
      <div class="learn__path">
        ${J.units.map(e=>be(n,e,r)).join(``)}
        <p class="learn__more caption">More units are on the way. Weebale for learning!</p>
      </div>
      ${xe(n)}
    </div>`,e.querySelector(`.node--current`)?.scrollIntoView({block:`center`});let i=null;function a(){i?.remove(),i=null}e.addEventListener(`click`,e=>{let n=e.target.closest(`[data-checkpoint]`);if(n){n.classList.contains(`node--locked`)?b(`Finish every lesson in this unit to unlock the checkpoint.`):t(`/checkpoint/${n.dataset.checkpoint}`);return}let r=e.target.closest(`[data-lesson]`);if(!r){e.target.closest(`.node-pop`)||a();return}let o=J.lessons[r.dataset.lesson];if(r.classList.contains(`node--locked`)){b(`Complete the lessons before this one to unlock it.`);return}a();let s=J.skills[o.skill],c=Y(A.get(),o.id);i=document.createElement(`div`),i.className=`node-pop`,i.setAttribute(`role`,`dialog`),i.setAttribute(`aria-label`,s.title),i.innerHTML=`
      <h3>${p(s.title)}</h3>
      <p>Lesson ${o.index+1} of ${s.lessons.length}</p>
      ${m({label:c?`Practise again +5 XP`:`Start +10 XP`,block:!0,href:`#/lesson/${o.id}`,variant:c?`secondary`:`primary`})}`,r.closest(`.node-wrap`).append(i),i.querySelector(`.btn`).focus()}),e.addEventListener(`keydown`,e=>{e.key===`Escape`&&a()})}var Ce=[{path:`/`,view:ce({hasProgress:j}),layout:`bare`,public:!0},{path:`/onboarding`,view:fe,layout:`bare`,public:!0,title:`Get started`},{path:`/learn`,view:Se,title:`Learn`},{path:`/lesson/:id`,view:M(`Lesson`,`Lessons arrive soon.`),layout:`bare`,title:`Lesson`},{path:`/checkpoint/:unit`,view:M(`Checkpoint`,`Unit checkpoints arrive soon.`),layout:`bare`,title:`Checkpoint`},{path:`/guidebook/:unit`,view:M(`Guidebook`,`Unit guidebooks arrive soon.`),title:`Guidebook`},{path:`/practice`,view:M(`Practice`,`Review sessions arrive soon.`),title:`Practice`},{path:`/leagues`,view:M(`Leagues`,`Weekly leagues arrive soon.`),title:`Leagues`},{path:`/shop`,view:M(`Shop`,`The shop opens soon.`),title:`Shop`},{path:`/profile`,view:M(`Profile`,`Your profile arrives soon.`),title:`Profile`},{path:`/settings`,view:ue,public:!0,title:`Settings`},{path:`/styleguide`,view:N,public:!0,title:`Style guide`}];ee(()=>{let e=A.get();return{streak:e.streak.current,gems:e.gems,hearts:e.hearts.count,maxHearts:5,streakToday:!1}}),A.subscribe(E);var we=ne(document.querySelector(`#app`)),$=l({routes:Ce,onChange:e=>{!e.route.public&&!j()?$.navigate(`/onboarding`,{replace:!0}):we.render(e,$.navigate)}});$.start();