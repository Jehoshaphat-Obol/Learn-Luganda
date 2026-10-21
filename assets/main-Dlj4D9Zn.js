import{a as e,c as t,n,o as r,r as i,t as a}from"./illustrations-YnOToB_N.js";function o(e){let t=[],n=e.split(`/`).map(e=>e.startsWith(`:`)?(t.push(e.slice(1)),`([^/]+)`):e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)).join(`/`),r=RegExp(`^${n}/?$`);return e=>{let n=r.exec(e);return n?Object.fromEntries(t.map((e,t)=>[e,decodeURIComponent(n[t+1])])):null}}function s(e){let[t,n=``]=(e.replace(/^#/,``)||`/`).split(`?`);return{path:t.startsWith(`/`)?t:`/${t}`,query:Object.fromEntries(new URLSearchParams(n))}}function c(e,t){for(let n of e){n.match??=o(n.path);let e=n.match(t);if(e)return{route:n,params:e}}return null}function l({routes:e,onChange:t,fallback:n=`/`}){function r(){let{path:r,query:a}=s(window.location.hash),o=c(e,r);o?t({...o,query:a,path:r}):i(n,{replace:!0})}function i(e,{replace:t=!1}={}){let n=`#${e}`;window.location.hash===n?r():t?(window.history.replaceState(null,``,n),r()):window.location.hash=n}return{start(){window.addEventListener(`hashchange`,r),r()},navigate:i}}var u={home:`<path d="M4 11 L12 4 L20 11 V20 H14 V14 H10 V20 H4 Z"/>`,practice:`<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="12" cy="12" r="3.2"/>`,leagues:`<path d="M6 4 H18 V9 A6 6 0 0 1 6 9 Z"/><rect x="10.5" y="14" width="3" height="4"/><rect x="7" y="18" width="10" height="2.5"/>`,profile:`<circle cx="12" cy="8" r="4.2"/><path d="M4 21 A8 8 0 0 1 20 21 Z"/>`,shop:`<path d="M5 8 H19 L18 20 H6 Z"/><path d="M9 8 V6.5 A3 3 0 0 1 15 6.5 V8" fill="none" stroke="currentColor" stroke-width="2"/>`,settings:`<circle cx="12" cy="12" r="3.4"/><path d="M12 2.5 L14 6 H10 Z M12 21.5 L10 18 H14 Z M2.5 12 L6 10 V14 Z M21.5 12 L18 14 V10 Z" /><circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/>`,flame:`<path d="M12 2 C12 2 19 9.5 19 14.5 A7 7 0 0 1 5 14.5 C5 9.5 12 2 12 2 Z"/><circle cx="12" cy="15.5" r="3" fill="var(--icon-inner, #fff)" opacity="0.55"/>`,gem:`<path d="M6 4 H18 L22 9 L12 21 L2 9 Z"/><path d="M2 9 H22 M8.5 9 L12 21 L15.5 9" fill="none" stroke="var(--icon-inner, #fff)" stroke-width="1.2" opacity="0.55"/>`,heart:`<path d="M12 21 L3.5 12.5 A4.8 4.8 0 0 1 12 6 A4.8 4.8 0 0 1 20.5 12.5 Z"/>`,bolt:`<path d="M13 2 L4 14 H11 L10 22 L20 9 H13 Z"/>`,close:`<path d="M5 5 L19 19 M19 5 L5 19" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>`,check:`<path d="M4 12.5 L9.5 18 L20 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,cross:`<path d="M6 6 L18 18 M18 6 L6 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`,lock:`<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10 V7.5 A4 4 0 0 1 16 7.5 V10" fill="none" stroke="currentColor" stroke-width="2.2"/>`,star:`<path d="M12 2.5 L14.9 8.6 L21.5 9.3 L16.6 13.8 L18 20.4 L12 17 L6 20.4 L7.4 13.8 L2.5 9.3 L9.1 8.6 Z"/>`,book:`<path d="M3 5 Q7.5 3.5 12 6 V20 Q7.5 17.5 3 19 Z M21 5 Q16.5 3.5 12 6 V20 Q16.5 17.5 21 19 Z"/>`,speaker:`<path d="M3 9 H7 L12 5 V19 L7 15 H3 Z"/><path d="M15.5 8.5 A5 5 0 0 1 15.5 15.5 M18 6 A8.5 8.5 0 0 1 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,trophy:`<path d="M7 3 H17 V9 A5 5 0 0 1 7 9 Z"/><path d="M7 5 H4 A3 3 0 0 0 7 10 M17 5 H20 A3 3 0 0 1 17 10" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="10.5" y="13.5" width="3" height="4"/><rect x="7" y="18" width="10" height="3"/>`,arrow:`<path d="M4 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,back:`<path d="M20 12 H5 M11 6 L5 12 L11 18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,snowflake:`<path d="M12 2 V22 M3.3 7 L20.7 17 M3.3 17 L20.7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="12" r="2.6"/>`,stories:`<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8 H16 M8 12 H16 M8 16 H13" stroke="var(--icon-inner, #fff)" stroke-width="1.6" stroke-linecap="round" opacity="0.75"/>`,up:`<path d="M12 20 V5 M6 11 L12 5 L18 11" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,down:`<path d="M12 4 V19 M6 13 L12 19 L18 13" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,info:`<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="10.8" y="10.5" width="2.4" height="7" rx="1"/><circle cx="12" cy="7.3" r="1.5"/>`,clock:`<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 7 V12 L15.5 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`,target:`<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="1.8"/>`},d=Object.keys(u);function f(e,{size:t=24,label:n,className:r=``}={}){let i=u[e];if(!i)throw Error(`Unknown icon: ${e}`);return`<svg class="icon ${r}" width="${t}" height="${t}" viewBox="0 0 24 24" fill="currentColor" ${n?`role="img" aria-label="${n}"`:`aria-hidden="true" focusable="false"`}>${i}</svg>`}function p(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function m({label:e,variant:t=`primary`,size:n=`md`,href:r,attrs:i=``,block:a=!1,disabled:o=!1,iconName:s}){let c=`btn btn--${t}${n===`lg`?` btn--lg`:``}${a?` btn--block`:``}`,l=`${s?f(s,{size:20}):``}<span>${p(e)}</span>`;return r?`<a class="${c}" href="${r}" ${i}>${l}</a>`:`<button class="${c}" type="button" ${o?`disabled`:``} ${i}>${l}</button>`}function h(e,{label:t=`Progress`,variant:n=`primary`}={}){let r=Math.round(Math.max(0,Math.min(1,e))*100);return`<div class="progress progress--${n}" role="progressbar" aria-label="${p(t)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${r}">
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
      </div>`;function c(e){document.removeEventListener(`keydown`,l),s.remove(),o?.focus?.(),a(e||null)}function l(e){if(e.key===`Escape`&&i&&c(null),e.key===`Tab`){let t=[...s.querySelectorAll(`button, a, input, select, textarea`)],n=t[0],r=t[t.length-1];e.shiftKey&&document.activeElement===n?(e.preventDefault(),r.focus()):!e.shiftKey&&document.activeElement===r&&(e.preventDefault(),n.focus())}}s.addEventListener(`click`,e=>{let t=e.target.closest(`[data-value]`);t?c(t.dataset.value):e.target===s&&i&&c(null)}),document.addEventListener(`keydown`,l),document.body.append(s),s.querySelector(`.modal__actions .btn`)?.focus()})}var ee=[{path:`/learn`,label:`Learn`,icon:`home`},{path:`/practice`,label:`Practice`,icon:`practice`},{path:`/leagues`,label:`Leagues`,icon:`leagues`},{path:`/shop`,label:`Shop`,icon:`shop`},{path:`/profile`,label:`Profile`,icon:`profile`}],te=()=>({streak:0,gems:0,hearts:5,maxHearts:5,streakToday:!1});function ne(e){te=e}function S(e,t,n,r=``){return`<a class="stat stat--${e} ${r}" href="#/${e===`streak`?`streak`:`shop`}" aria-label="${p(n)}">
    ${f(e===`streak`?`flame`:e===`gems`?`gem`:`heart`,{size:22})}<span>${p(t)}</span>
  </a>`}function C(){let e=te();return`
    ${S(`streak`,e.streak,`${e.streak} day streak`,e.streakToday?``:`stat--dim`)}
    ${S(`gems`,e.gems,`${e.gems} gems`)}
    ${S(`hearts`,e.hearts,`${e.hearts} of ${e.maxHearts} hearts`)}`}function re(){let e=document.querySelector(`[data-topbar-stats]`);e&&(e.innerHTML=C())}function ie(e){return ee.map(t=>`<a class="nav__link${e.startsWith(t.path)?` is-active`:``}" href="#${t.path}" ${e.startsWith(t.path)?`aria-current="page"`:``}>
      ${f(t.icon,{size:26})}<span>${t.label}</span></a>`).join(``)}function ae(e){return`
    <div class="layout">
      <nav class="nav" aria-label="Main">
        <a class="nav__brand" href="#/learn" aria-label="Learn Luganda home">
          <span class="brand-mark" aria-hidden="true"><i></i><b></b></span><span>luganda</span>
        </a>
        ${ie(e)}
      </nav>
      <div class="layout__main">
        <header class="topbar">
          <a class="topbar__brand" href="#/learn" aria-label="Learn Luganda home"><span class="brand-mark" aria-hidden="true"><i></i><b></b></span></a>
          <div class="topbar__stats" data-topbar-stats>${C()}</div>
        </header>
        <main id="view" class="view" tabindex="-1"></main>
      </div>
    </div>`}function oe(e){let t=null,n=null;return{render({route:r,params:i,query:a,path:o},s){typeof t==`function`&&t(),t=null;let c=r.layout??`app`,l;c===`app`?(e.innerHTML=ae(o),l=e.querySelector(`#view`)):(e.innerHTML=`<main id="view" class="view view--bare" tabindex="-1"></main>`,l=e.querySelector(`#view`)),n=c,document.title=r.title?`${r.title} · Learn Luganda`:`Learn Luganda`,window.scrollTo(0,0),t=r.view({root:l,params:i,query:a,path:o,navigate:s})??null,n&&document.activeElement===document.body&&l.focus({preventScroll:!0})}}}var w=e=>typeof e==`object`&&!!e&&!Array.isArray(e);function se(e,t){if(!w(t))return e===void 0?structuredClone(t):e;if(!w(e))return structuredClone(t);let n={...e};for(let[r,i]of Object.entries(t))n[r]=i===null?e[r]??null:se(e[r],i);return n}function ce(){let e=new Map;return{getItem:t=>e.has(t)?e.get(t):null,setItem:(t,n)=>e.set(t,String(n)),removeItem:t=>e.delete(t)}}function le(e){try{let t=e??globalThis.localStorage,n=`__ll_probe__`;return t.setItem(n,`1`),t.removeItem(n),t}catch{return ce()}}function ue({key:e,version:t,defaults:n,migrations:r={},storage:i}){let a=le(i),o=new Set,s=u();function c(e){let n=e,i=Number(n.version)||0;for(;i<t;)i+=1,r[i]&&(n=r[i](n)),n={...n,version:i};return n}function l(e){if(!w(e))throw Error(`Saved progress is not an object`);if(Number(e.version)>t)throw Error(`Saved progress is from a newer version of the app`);return se(c(e),{...n,version:t})}function u(){let r=a.getItem(e);if(r==null)return structuredClone({...n,version:t});try{return l(JSON.parse(r))}catch{return a.setItem(`${e}:corrupt:${Date.now()}`,r),structuredClone({...n,version:t})}}function d(){try{a.setItem(e,JSON.stringify(s))}catch{}}function f(){for(let e of o)e(s)}return{get:()=>s,update(e){let t=structuredClone(s);return s=e(t)??t,d(),f(),s},subscribe(e){return o.add(e),()=>o.delete(e)},reset(){s=structuredClone({...n,version:t}),a.removeItem(e),f()},exportJSON(){return JSON.stringify({app:`learn-luganda`,exportedAt:new Date().toISOString(),data:s},null,2)},importJSON(e){let t;try{t=JSON.parse(e)}catch{throw Error(`That file isn’t valid JSON.`)}if(t?.app!==`learn-luganda`||!w(t.data))throw Error(`That file isn’t a Learn Luganda progress export.`);return s=l(t.data),d(),f(),s}}}var T=ue({key:`learn-luganda`,version:1,defaults:{profile:null,onboarding:{step:0,answers:{}},settings:{sound:!0,motion:!0},lessons:{},xp:{total:0,byDay:{}},gems:50,hearts:{count:5,updatedAt:0},streak:{current:0,longest:0,lastDay:null,freezes:0,frozenDays:[]},words:{},mistakes:[],achievements:{},inventory:{},league:{},stats:{lessonsCompleted:0,perfectLessons:0,practiceSessions:0,answers:0,correctAnswers:0,secondsLearning:0}}}),de=()=>!!T.get().profile,fe=144e5;function pe(e,t=Date.now()){let n=e.hearts;if(n.count>=5)return n.count=5,e;let r=Math.max(0,t-n.updatedAt),i=Math.floor(r/fe);return i>0&&(n.count=Math.min(5,n.count+i),n.updatedAt=n.count>=5?t:n.updatedAt+i*fe),e}function E(e,t=Date.now()){let n={hearts:{...e.hearts}};pe(n,t);let{count:r,updatedAt:i}=n.hearts;return{count:r,max:5,full:r>=5,nextAt:r>=5?null:i+fe}}function me(e,t=Date.now()){return pe(e,t),e.hearts.count>=5&&(e.hearts.updatedAt=t),e.hearts.count=Math.max(0,e.hearts.count-1),e}function he(e,t=1,n=Date.now()){return pe(e,n),e.hearts.count=Math.min(5,e.hearts.count+t),e.hearts.count>=5&&(e.hearts.updatedAt=n),e}function ge(e,t=Date.now()){return e.gems<40?!1:(e.gems-=40,e.hearts={count:5,updatedAt:t},!0)}function _e(e){let t=Math.max(1,Math.ceil(e/6e4)),n=Math.floor(t/60),r=t%60;return n?`${n}h ${r}m`:`${r}m`}function D(e=new Date){let t=new Date(e),n=String(t.getMonth()+1).padStart(2,`0`),r=String(t.getDate()).padStart(2,`0`);return`${t.getFullYear()}-${n}-${r}`}function O(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function ve(e,t){let n=O(t)-O(e);return Math.round(n/864e5)}function k(e,t){let n=O(e);return n.setDate(n.getDate()+t),D(n)}function ye(e=new Date){let t=new Date(e),n=(t.getDay()+6)%7;return t.setDate(t.getDate()-n),D(t)}var be=[3,7,14,30,50,100,200,365];function xe(e,t=D()){let n=e.streak;if(!n.lastDay||n.current===0)return e;let r=ve(n.lastDay,t);if(r<=1)return e;let i=r-1;if(n.freezes>=i){n.freezes-=i;for(let e=1;e<=i;e+=1)n.frozenDays.push(k(n.lastDay,e));n.lastDay=k(t,-1)}else n.current=0;return e}function Se(e,t=D()){xe(e,t);let n=e.streak;return n.lastDay===t&&n.current>0?{extended:!1,current:n.current,milestone:null}:(n.current+=1,n.longest=Math.max(n.longest,n.current),n.lastDay=t,{extended:!0,current:n.current,milestone:be.includes(n.current)?n.current:null})}function A(e,t=D()){let n={streak:{...e.streak,frozenDays:[...e.streak.frozenDays]}};xe(n,t);let r=n.streak,i=r.lastDay===t&&r.current>0;return{current:r.current,longest:Math.max(r.longest,r.current),freezes:r.freezes,doneToday:i,atRisk:!i&&r.current>0,frozenDays:r.frozenDays}}function Ce(e){return be.find(t=>t>e)??null}function j(e=Date.now()){let t=e>>>0,n=()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296};return{next:n,int:e=>Math.floor(n()*e),pick:e=>e[Math.floor(n()*e.length)],shuffle(e){let t=[...e];for(let e=t.length-1;e>0;--e){let r=Math.floor(n()*(e+1));[t[e],t[r]]=[t[r],t[e]]}return t},sample(e,t){return this.shuffle(e).slice(0,t)}}}var M=[{id:`bronze`,name:`Bronze`},{id:`silver`,name:`Silver`},{id:`gold`,name:`Gold`},{id:`sapphire`,name:`Sapphire`},{id:`ruby`,name:`Ruby`},{id:`emerald`,name:`Emerald`},{id:`diamond`,name:`Diamond`}],we=`Kato.Babirye.Nalubega.Ssempa.Namutebi.Kizza.Nansubuga.Lubega.Akello.Opio.Nabukenya.Mugisha.Atim.Wasswa.Nakimuli.Okello.Grace.Daniel.Aisha.Samuel.Ritah.Brian.Mariam.Joel.Esther.Ivan.Sophie.Tom.Lena.Yusuf`.split(`.`),Te=[`vermillion`,`ink`,`butter`,`sky`,`sage`,`lilac`,`blush`],Ee=Object.keys(r);function De(e){let t=2166136261;for(let n=0;n<e.length;n+=1)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function Oe(e,t){return j(De(`${e}:${t}`)).sample(we,14).map((n,r)=>{let i=j(De(`${e}:${t}:${r}`)),a=i.next(),o=a<.2?i.int(8):Math.round((10+i.int(30))*(1+t*.35)*(.5+a));return{id:`bot-${r}`,name:n,avatar:{character:Ee[i.int(Ee.length)],color:Te[i.int(Te.length)]},pace:o,seed:De(`${e}:${t}:${r}:xp`)}})}function ke(e,t,n=new Date){let r=0,i=O(t);for(let t=0;t<7;t+=1){let a=new Date(i);if(a.setDate(i.getDate()+t),a>n)break;let o=j(e.seed+t),s=o.next(),c=s<.18?0:Math.round(e.pace*(s>.9?2.2:.6+o.next()*.8)),l=Math.min(1,(n-a)/864e5);r+=Math.round(c*l)}return r}function Ae(e,t,n=new Date){let r=0,i=D(n);for(let n=0;n<7;n+=1){let a=k(t,n);if(a>i)break;r+=e.xp.byDay[a]??0}return r}function je(e,t,n,r=new Date){let i=[{id:`me`,name:e.profile?.name??`You`,me:!0,avatar:e.profile?.avatar,xp:Ae(e,t,r)},...Oe(t,n).map(e=>({...e,xp:ke(e,t,r)}))];return i.sort((e,t)=>t.xp-e.xp||(e.me?-1:t.me?1:e.name.localeCompare(t.name))),i.map((e,t)=>({...e,rank:t+1}))}function Me(e,t){return e<=5&&t<M.length-1?`promote`:e>12&&t>0?`demote`:`stay`}function Ne(e,t=new Date){let n=ye(t),r=e.league;if(!r.week)return e.league={week:n,tier:0,history:[],pendingResult:null},e;if(r.week===n)return e;let i=O(k(r.week,7)),a=je(e,r.week,r.tier,new Date(i-1)).find(e=>e.me),o=a.xp===0&&r.tier>0?`demote`:a.xp===0?`stay`:Me(a.rank,r.tier),s=Math.max(0,Math.min(M.length-1,r.tier+(o===`promote`?1:o===`demote`?-1:0))),c={week:r.week,tier:r.tier,rank:a.rank,xp:a.xp,result:o,newTier:s};return e.league={week:n,tier:s,history:[c,...r.history??[]].slice(0,26),pendingResult:c},e}function Pe(e=new Date){return O(k(ye(e),7))-e}function Fe(t,n){return({root:r})=>{r.innerHTML=`
      <section class="empty-state">
        <div class="empty-state__art">${e({pose:`thinking`})}</div>
        <h1>${p(t)}</h1>
        <p class="muted">${p(n)}</p>
        ${m({label:`Back to learning`,href:`#/learn`,variant:`secondary`})}
      </section>`}}function Ie({root:t}){t.innerHTML=`
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
    </div>`,t.addEventListener(`click`,async t=>{let n=t.target.closest(`[data-sg]`)?.dataset.sg;n===`toast`&&b(`Weebale! That’s a toast.`),n===`modal`&&b(`You chose: ${await x({title:`Quit lesson?`,body:`<p>You’ll lose your progress in this lesson.</p>`,art:e({pose:`sad`}),actions:[{label:`Keep learning`,value:`stay`},{label:`End session`,value:`quit`,variant:`ghost`}]})??`dismissed`}`)})}var Le=[{icon:`bolt`,title:`Bite-sized lessons`,text:`Five-minute lessons with pictures, word tiles, listening and matching games.`},{icon:`flame`,title:`Daily streaks`,text:`Practise a little every day. Your streak and daily goal keep you coming back.`},{icon:`heart`,title:`Hearts`,text:`Mistakes cost a heart, so every answer counts. Practice wins them back.`},{icon:`target`,title:`Spaced review`,text:`Words return just before you’d forget them, so they stick for good.`}],N=[[`Oli otya?`,`How are you?`],[`Gyendi`,`I’m fine`],[`Weebale`,`Thank you`],[`Kale`,`Okay`],[`Mukwano`,`Friend`],[`Amazzi`,`Water`],[`Emmere`,`Food`],[`Ssebo`,`Sir`],[`Nnyabo`,`Madam`],[`Webale kujja`,`Welcome`]],Re=[[`Is it free?`,`Yes. Learn Luganda is free, with no ads and no account.`],[`Where is my progress saved?`,`In your browser’s local storage on this device. You can export it to a file and import it on another device from Settings.`],[`Who is it for?`,`Complete beginners, diaspora families reconnecting with the language, and visitors to Uganda who want more than “hello”.`],[`What will I learn first?`,`Greetings, introductions and numbers, then family, food, the market, time, places and more, unit by unit.`],[`Does it work offline?`,`Once installed, lessons work without a connection.`]],P={prompt:`Which one means “thank you”?`,options:[`Oli otya?`,`Weebale`,`Nedda`],answer:`Weebale`};function ze({hasProgress:o=()=>!1}={}){return function({root:s}){let c=o(),l=m(c?{label:`Continue learning`,size:`lg`,href:`#/learn`}:{label:`Get started`,size:`lg`,href:`#/onboarding`}),u=c?``:m({label:`I already have progress`,variant:`secondary`,size:`lg`,href:`#/settings?import=1`}),d=Object.keys(r);s.innerHTML=`
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
            ${[...N,...N].map(([e,t],n)=>`<span class="ticker__item"${n>=N.length?` aria-hidden="true"`:``}><strong>${p(e)}</strong> ${p(t)}</span>`).join(``)}
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
            ${Le.map((e,t)=>`
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
            <h2>${p(P.prompt)}</h2>
            <div class="try__options" role="group" aria-label="Answers">
              ${P.options.map((e,t)=>`<button class="choice" type="button" data-answer="${p(e)}"><span class="choice__key">${t+1}</span>${p(e)}</button>`).join(``)}
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
            ${Re.map(([e,t])=>`<details class="faq__item"><summary>${p(e)}</summary><p>${p(t)}</p></details>`).join(``)}
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
      </div>`,s.addEventListener(`click`,t=>{let n=t.target.closest(`a[href^="#"]:not([href^="#/"])`);if(n){t.preventDefault(),s.querySelector(n.getAttribute(`href`))?.scrollIntoView({behavior:`smooth`});return}let r=t.target.closest(`[data-answer]`);if(!r)return;let i=r.dataset.answer===P.answer;s.querySelectorAll(`[data-answer]`).forEach(e=>e.classList.remove(`is-correct`,`is-wrong`)),r.classList.add(i?`is-correct`:`is-wrong`),s.querySelector(`.try__feedback`).innerHTML=i?`${f(`check`,{size:18})} Correct! <em>Weebale</em> means thank you.`:`${f(`cross`,{size:18})} Not quite. Try again!`,s.querySelector(`.try__feedback`).className=`try__feedback try__feedback--${i?`good`:`bad`}`,s.querySelector(`[data-try-art]`).innerHTML=e({pose:i?`cheering`:`sad`})})}}function Be(e,t){let n=URL.createObjectURL(new Blob([t],{type:`application/json`})),r=Object.assign(document.createElement(`a`),{href:n,download:e});document.body.append(r),r.click(),r.remove(),URL.revokeObjectURL(n)}function Ve({root:t,query:n,navigate:r}){t.innerHTML=`
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
    </div>`;let i=t.querySelector(`[data-import-file]`);i.addEventListener(`change`,async()=>{let e=i.files?.[0];if(i.value=``,!e)return;let t=await e.text();if(await x({title:`Replace your progress?`,body:`<p>Importing replaces everything saved on this device with the file’s progress.</p>`,actions:[{label:`Import`,value:`yes`},{label:`Cancel`,value:`no`,variant:`ghost`}]})===`yes`)try{let e=T.importJSON(t);re(),b(`Progress imported. Weebale!`,{variant:`success`}),r(e.profile?`/learn`:`/onboarding`)}catch(e){b(e.message,{variant:`error`,duration:4e3})}}),t.addEventListener(`click`,async t=>{let n=t.target.closest(`[data-action]`)?.dataset.action;n===`export`&&(Be(`learn-luganda-${T.get().profile?.name?.toLowerCase().replace(/[^a-z0-9]+/g,`-`)||`learner`}-${new Date().toISOString().slice(0,10)}.json`,T.exportJSON()),b(`Progress exported.`)),n===`import`&&i.click(),n===`reset`&&await x({title:`Reset all progress?`,body:`<p>This can’t be undone. Export first if you might want it back.</p>`,art:e({pose:`sad`}),actions:[{label:`Keep my progress`,value:`keep`},{label:`Reset everything`,value:`reset`,variant:`danger`}]})===`reset`&&(T.reset(),b(`Progress reset.`),r(`/`))}),n.import&&i.click()}var F=[{xp:10,label:`Casual`,minutes:5},{xp:20,label:`Regular`,minutes:10},{xp:30,label:`Serious`,minutes:15},{xp:50,label:`Intense`,minutes:20}],He=[`vermillion`,`ink`,`butter`,`sky`,`sage`,`lilac`,`blush`];function Ue({name:e,avatar:t,dailyGoal:n=20,motivation:r=null,level:i=`new`},a=new Date){return{name:String(e??``).trim().slice(0,30)||`Learner`,avatar:{character:t?.character??`nakato`,color:t?.color??`vermillion`},dailyGoal:n,motivation:r,level:i,joinedAt:D(a)}}var We=`Crane`;function I({character:e=`nakato`,color:n=`vermillion`,frame:r}={},{size:i=48,label:a=``}={}){return`<span class="avatar avatar--${p(n)}${r?` avatar--${p(r)}`:``}" style="--avatar-size:${i}px"${a?` title="${p(a)}"`:``}>
    ${t(e,{shape:`circle`,expression:`happy`,label:a||`Avatar`})}
  </span>`}var Ge=[{id:`family`,label:`Talk with family`,icon:`profile`},{id:`travel`,label:`Travel to Uganda`,icon:`arrow`},{id:`friends`,label:`Connect with friends`,icon:`heart`},{id:`culture`,label:`Explore the culture`,icon:`book`},{id:`work`,label:`Work or study`,icon:`target`},{id:`fun`,label:`Just for fun`,icon:`star`}],Ke=[{id:`new`,label:`I’m new to Luganda`,detail:`Start from the very first lesson.`},{id:`some`,label:`I know some words`,detail:`Start with a quick greetings review.`}],L=[`welcome`,`motivation`,`goal`,`level`,`avatar`,`ready`];function qe(e){T.update(t=>{t.onboarding={...t.onboarding,...e,answers:{...t.onboarding.answers,...e.answers??{}}}})}function Je(e,t){switch(e){case`welcome`:return{pose:`happy`,say:`Oli otya! I’m ${p(We)}, your guide to Luganda.`,body:`<p class="onb__lead">A few quick questions and we’ll set up your course.</p>`,ready:!0,cta:`Let’s go`};case`motivation`:return{pose:`thinking`,say:`Why are you learning Luganda?`,body:`<div class="onb__options onb__options--grid" role="radiogroup" aria-label="Why are you learning">
          ${Ge.map(e=>`<button class="choice" type="button" role="radio" aria-checked="${t.motivation===e.id}" data-pick="motivation" data-value="${e.id}">${f(e.icon,{size:22})}<span>${e.label}</span></button>`).join(``)}
        </div>`,ready:!!t.motivation};case`goal`:return{pose:`idle`,say:`What’s your daily goal?`,body:`<div class="onb__options" role="radiogroup" aria-label="Daily goal">
          ${F.map(e=>`<button class="choice onb__goal" type="button" role="radio" aria-checked="${Number(t.dailyGoal)===e.xp}" data-pick="dailyGoal" data-value="${e.xp}">
            <strong>${e.label}</strong><span>${e.minutes} min a day</span><span class="onb__xp">${e.xp} XP</span></button>`).join(``)}
        </div>`,ready:!!t.dailyGoal};case`level`:return{pose:`thinking`,say:`How much Luganda do you know?`,body:`<div class="onb__options" role="radiogroup" aria-label="Your level">
          ${Ke.map(e=>`<button class="choice onb__level" type="button" role="radio" aria-checked="${t.level===e.id}" data-pick="level" data-value="${e.id}">
            <strong>${e.label}</strong><span>${e.detail}</span></button>`).join(``)}
        </div>`,ready:!!t.level};case`avatar`:{let e=t.character??`nakato`,n=t.color??`vermillion`;return{pose:`happy`,say:`Make it yours. What should I call you?`,body:`
          <div class="onb__avatar-preview">${I({character:e,color:n},{size:120,label:`Your avatar`})}</div>
          <div class="field">
            <label for="onb-name">Your name</label>
            <input id="onb-name" class="input" type="text" maxlength="30" autocomplete="given-name" placeholder="e.g. Amani" value="${p(t.name??``)}" />
          </div>
          <fieldset class="onb__fieldset">
            <legend>Character</legend>
            <div class="onb__characters" role="radiogroup" aria-label="Character">
              ${Object.keys(r).map(t=>`<button class="onb__character" type="button" role="radio" aria-checked="${e===t}" aria-label="${r[t].name}" data-pick="character" data-value="${t}">${I({character:t,color:`paper`},{size:64})}</button>`).join(``)}
            </div>
          </fieldset>
          <fieldset class="onb__fieldset">
            <legend>Colour</legend>
            <div class="onb__colors" role="radiogroup" aria-label="Colour">
              ${He.map(e=>`<button class="onb__color avatar--${e}" type="button" role="radio" aria-checked="${n===e}" aria-label="${e}" data-pick="color" data-value="${e}"></button>`).join(``)}
            </div>
          </fieldset>`,ready:!!(t.name??``).trim(),cta:`Continue`}}default:{let e=F.find(e=>e.xp===Number(t.dailyGoal))??F[1];return{pose:`cheering`,say:`Weebale, ${p(t.name??``)}! You’re all set.`,body:`<div class="onb__summary card">
            ${I({character:t.character??`nakato`,color:t.color??`vermillion`},{size:72})}
            <div><strong>${p(t.name??``)}</strong><p class="muted">${e.label} goal · ${e.xp} XP a day</p></div>
          </div>
          <p class="onb__lead">Your first lesson: greetings. You’ll learn to say <em>Oli otya?</em> in under five minutes.</p>`,ready:!0,cta:`Start learning`}}}}function Ye({root:t,navigate:n}){if(T.get().profile){n(`/learn`,{replace:!0});return}function r(){let{step:n=0,answers:r={}}=T.get().onboarding,i=Math.min(n,L.length-1),a=L[i],o=Je(a,r);t.innerHTML=`
      <div class="onb">
        <header class="onb__top">
          ${i>0?`<button class="icon-btn" type="button" data-nav="back" aria-label="Back">${f(`back`)}</button>`:`<a class="icon-btn" href="#/" aria-label="Close">${f(`close`)}</a>`}
          ${h(i/(L.length-1),{label:`Setup progress`})}
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
      </div>`,t.querySelector(`#onb-name`)?.focus()}function i(){let{step:e=0,answers:t}=T.get().onboarding;L[e]===`ready`?(T.update(e=>{e.profile=Ue({name:t.name,avatar:{character:t.character,color:t.color},dailyGoal:Number(t.dailyGoal)||20,motivation:t.motivation,level:t.level}),e.onboarding={step:0,answers:{}}}),n(`/learn`)):(qe({step:e+1}),r())}t.addEventListener(`click`,e=>{let n=e.target.closest(`[data-pick]`);if(n){qe({answers:{[n.dataset.pick]:n.dataset.value}});let e=`[data-pick="${n.dataset.pick}"][data-value="${n.dataset.value}"]`;r(),t.querySelector(e)?.focus();return}let a=e.target.closest(`[data-nav]`)?.dataset.nav;a===`back`&&(qe({step:Math.max(0,T.get().onboarding.step-1)}),r()),a===`next`&&!e.target.closest(`[disabled]`)&&i()}),t.addEventListener(`input`,e=>{if(e.target.id!==`onb-name`)return;let n=e.target.value;T.update(e=>{e.onboarding.answers.name=n}),t.querySelector(`[data-nav="next"]`).disabled=!n.trim()}),t.addEventListener(`keydown`,e=>{e.key===`Enter`&&e.target.id===`onb-name`&&e.target.value.trim()&&i()}),r()}var Xe=[{id:`u1`,title:`Greetings`,description:`Say hello, introduce yourself and count to ten.`,color:`vermillion`,character:`nakato`,words:[[`oli-otya`,`Oli otya?`,`How are you?`,{altEn:[`how are you doing`,`hello`],notes:`The everyday greeting to one person.`}],[`gyendi`,`Gyendi`,`I’m fine`,{altEn:[`i am fine`,`fine`,`i am well`,`i’m well`],notes:`The usual reply to Oli otya?`}],[`bulungi`,`Bulungi`,`Good`,{altEn:[`fine`,`well`,`okay`]}],[`weebale`,`Weebale`,`Thank you`,{altEn:[`thanks`,`thank you`]}],[`nnyo`,`nnyo`,`very much`,{altEn:[`very`,`a lot`,`so much`]}],[`kale`,`Kale`,`Okay`,{altEn:[`ok`,`alright`,`all right`]}],[`ssebo`,`ssebo`,`sir`,{notes:`A polite way to address a man.`}],[`nnyabo`,`nnyabo`,`madam`,{altEn:[`ma’am`,`maam`],notes:`A polite way to address a woman.`}],[`yee`,`Yee`,`Yes`],[`nedda`,`Nedda`,`No`],[`wasuze-otya`,`Wasuze otya?`,`Good morning`,{altEn:[`how did you sleep`,`morning`],notes:`Literally “how did you sleep?”, said to one person in the morning.`}],[`nsuze-bulungi`,`Nsuze bulungi`,`I slept well`,{altEn:[`slept well`]}],[`osiibye-otya`,`Osiibye otya?`,`Good afternoon`,{altEn:[`good evening`,`how was your day`,`how has your day been`],notes:`Literally “how have you spent the day?”`}],[`gyebale-ko`,`Gyebale ko`,`Well done`,{altEn:[`thank you for your work`,`good work`],notes:`Said to greet someone who is working.`}],[`weraba`,`Weraba`,`Goodbye`,{altEn:[`bye`],notes:`To one person.`}],[`tunaalabagana`,`Tunaalabagana`,`See you later`,{altEn:[`see you`,`we will see each other`,`see you soon`]}],[`nze`,`Nze`,`I`,{altEn:[`me`,`i am`]}],[`ggwe`,`Ggwe`,`You`,{notes:`One person.`}],[`erinnya`,`erinnya`,`name`],[`lyange`,`lyange`,`my`,{notes:`Agrees with erinnya: erinnya lyange, my name.`}],[`lyo`,`lyo`,`your`,{notes:`Agrees with erinnya: erinnya lyo, your name.`}],[`ani`,`ani`,`who`,{altEn:[`what`]}],[`mbeera`,`Mbeera`,`I live`,{altEn:[`i stay`]}],[`ova-wa`,`Ova wa?`,`Where are you from?`,{altEn:[`where do you come from`]}],[`nva`,`Nva`,`I come from`,{altEn:[`i am from`,`i’m from`]}],[`ndi`,`Ndi`,`I am`,{altEn:[`i’m`]}],[`muyizi`,`muyizi`,`student`,{altEn:[`learner`,`a student`]}],[`nsanyuse-okukulaba`,`Nsanyuse okukulaba`,`Nice to meet you`,{altEn:[`i am happy to see you`,`i’m happy to see you`,`pleased to meet you`,`glad to see you`]}],[`emu`,`emu`,`one`,{altEn:[`1`]}],[`bbiri`,`bbiri`,`two`,{altEn:[`2`]}],[`ssatu`,`ssatu`,`three`,{altEn:[`3`]}],[`nnya`,`nnya`,`four`,{altEn:[`4`]}],[`ttaano`,`ttaano`,`five`,{altEn:[`5`]}],[`mukaaga`,`mukaaga`,`six`,{altEn:[`6`]}],[`musanvu`,`musanvu`,`seven`,{altEn:[`7`]}],[`munaana`,`munaana`,`eight`,{altEn:[`8`]}],[`mwenda`,`mwenda`,`nine`,{altEn:[`9`]}],[`kkumi`,`kkumi`,`ten`,{altEn:[`10`]}]],sentences:[[`s-oli-otya-ssebo`,`Oli otya, ssebo?`,`How are you, sir?`,{altEn:[`Hello, sir`]}],[`s-oli-otya-nnyabo`,`Oli otya, nnyabo?`,`How are you, madam?`,{altEn:[`How are you, ma’am?`]}],[`s-gyendi-weebale`,`Gyendi, weebale.`,`I’m fine, thank you.`,{altEn:[`I am fine, thank you.`,`I’m fine, thanks.`,`I am fine, thanks.`,`Fine, thank you.`]}],[`s-weebale-nnyo`,`Weebale nnyo.`,`Thank you very much.`,{altEn:[`Thanks a lot.`,`Thank you so much.`,`Thanks very much.`]}],[`s-yee-ssebo`,`Yee, ssebo.`,`Yes, sir.`],[`s-nedda-nnyabo`,`Nedda, nnyabo.`,`No, madam.`,{altEn:[`No, ma’am.`]}],[`s-wasuze-otya-nnyabo`,`Wasuze otya, nnyabo?`,`Good morning, madam.`,{altEn:[`Good morning, ma’am.`,`How did you sleep, madam?`]}],[`s-nsuze-bulungi`,`Nsuze bulungi, weebale.`,`I slept well, thank you.`,{altEn:[`I slept well, thanks.`]}],[`s-osiibye-otya-ssebo`,`Osiibye otya, ssebo?`,`Good afternoon, sir.`,{altEn:[`Good evening, sir.`,`How was your day, sir?`]}],[`s-gyebale-ko-ssebo`,`Gyebale ko, ssebo.`,`Well done, sir.`,{altEn:[`Good work, sir.`]}],[`s-kale-weraba`,`Kale, weraba.`,`Okay, goodbye.`,{altEn:[`Ok, goodbye.`,`Okay, bye.`,`Alright, goodbye.`]}],[`s-weraba-tunaalabagana`,`Weraba, tunaalabagana.`,`Goodbye, see you later.`,{altEn:[`Bye, see you later.`,`Goodbye, see you soon.`]}],[`s-nze-nakato`,`Nze Nakato.`,`I am Nakato.`,{altEn:[`I’m Nakato.`,`My name is Nakato.`]}],[`s-erinnya-lyo-ani`,`Erinnya lyo ani?`,`What is your name?`,{altEn:[`What’s your name?`]}],[`s-erinnya-lyange-mukasa`,`Erinnya lyange Mukasa.`,`My name is Mukasa.`,{altEn:[`My name’s Mukasa.`]}],[`s-ggwe-ani`,`Ggwe ani?`,`Who are you?`],[`s-mbeera-kampala`,`Mbeera Kampala.`,`I live in Kampala.`,{altEn:[`I stay in Kampala.`]}],[`s-nva-masaka`,`Nva Masaka.`,`I come from Masaka.`,{altEn:[`I am from Masaka.`,`I’m from Masaka.`]}],[`s-ndi-muyizi`,`Ndi muyizi.`,`I am a student.`,{altEn:[`I’m a student.`,`I am a learner.`]}],[`s-nsanyuse-okukulaba`,`Nsanyuse okukulaba, Ssali.`,`Nice to meet you, Ssali.`,{altEn:[`Pleased to meet you, Ssali.`,`I am happy to see you, Ssali.`,`I’m happy to see you, Ssali.`]}]],skills:[{id:`u1s1`,title:`Hello`,icon:`star`,lessons:[{id:`u1s1l1`,newWords:[`oli-otya`,`gyendi`,`weebale`,`ssebo`,`nnyabo`],sentences:[`s-oli-otya-ssebo`,`s-oli-otya-nnyabo`,`s-gyendi-weebale`]},{id:`u1s1l2`,newWords:[`yee`,`nedda`,`nnyo`,`kale`,`bulungi`],sentences:[`s-weebale-nnyo`,`s-yee-ssebo`,`s-nedda-nnyabo`,`s-gyendi-weebale`]},{id:`u1s1l3`,newWords:[`wasuze-otya`,`nsuze-bulungi`,`osiibye-otya`,`gyebale-ko`],sentences:[`s-wasuze-otya-nnyabo`,`s-nsuze-bulungi`,`s-osiibye-otya-ssebo`,`s-gyebale-ko-ssebo`],dialogues:[{speaker:`jjajja`,line:`Wasuze otya, mwana wange?`,translation:`Good morning, my child.`,options:[`Nsuze bulungi, nnyabo.`,`Weraba, nnyabo.`,`Nedda, ssebo.`],answer:`Nsuze bulungi, nnyabo.`}]},{id:`u1s1l4`,newWords:[`weraba`,`tunaalabagana`],sentences:[`s-kale-weraba`,`s-weraba-tunaalabagana`,`s-weebale-nnyo`,`s-gyebale-ko-ssebo`],dialogues:[{speaker:`ssali`,line:`Kale, weraba!`,translation:`Okay, goodbye!`,options:[`Weraba, tunaalabagana.`,`Wasuze otya?`,`Gyendi.`],answer:`Weraba, tunaalabagana.`}]}]},{id:`u1s2`,title:`Introductions`,icon:`profile`,lessons:[{id:`u1s2l1`,newWords:[`nze`,`ggwe`,`erinnya`,`lyange`,`lyo`,`ani`],sentences:[`s-nze-nakato`,`s-erinnya-lyo-ani`,`s-erinnya-lyange-mukasa`,`s-ggwe-ani`]},{id:`u1s2l2`,newWords:[`mbeera`,`ova-wa`,`nva`],sentences:[`s-mbeera-kampala`,`s-nva-masaka`,`s-nze-nakato`]},{id:`u1s2l3`,newWords:[`ndi`,`muyizi`,`nsanyuse-okukulaba`],sentences:[`s-ndi-muyizi`,`s-nsanyuse-okukulaba`,`s-erinnya-lyo-ani`,`s-mbeera-kampala`],dialogues:[{speaker:`mukasa`,line:`Erinnya lyo ani?`,translation:`What is your name?`,options:[`Nze Amara.`,`Mbeera Kampala.`,`Gyebale ko.`],answer:`Nze Amara.`},{speaker:`emma`,line:`Nze Emma. Ova wa?`,translation:`I am Emma. Where are you from?`,options:[`Nva Masaka.`,`Ndi muyizi.`,`Weebale nnyo.`],answer:`Nva Masaka.`}]}]},{id:`u1s3`,title:`Numbers 1–10`,icon:`target`,lessons:[{id:`u1s3l1`,newWords:[`emu`,`bbiri`,`ssatu`,`nnya`,`ttaano`],sentences:[]},{id:`u1s3l2`,newWords:[`mukaaga`,`musanvu`,`munaana`,`mwenda`,`kkumi`],sentences:[]}]}]},{id:`u2`,title:`People and things`,description:`Family, everyday things and your first verbs.`,color:`ink`,character:`jjajja`,words:[[`maama`,`maama`,`mother`,{altEn:[`mom`,`mum`,`mama`]}],[`taata`,`taata`,`father`,{altEn:[`dad`,`papa`]}],[`jjajja`,`jjajja`,`grandparent`,{altEn:[`grandmother`,`grandfather`,`grandma`,`grandpa`]}],[`wange`,`wange`,`my`,{notes:`Agrees with people nouns (mu-/ba- class, singular): maama wange, my mother.`}],[`omwana`,`omwana`,`child`,{altEn:[`a child`,`the child`,`kid`]}],[`abaana`,`abaana`,`children`,{altEn:[`the children`,`kids`]}],[`omusajja`,`omusajja`,`man`,{altEn:[`a man`,`the man`]}],[`abasajja`,`abasajja`,`men`,{altEn:[`the men`]}],[`omukazi`,`omukazi`,`woman`,{altEn:[`a woman`,`the woman`]}],[`abakazi`,`abakazi`,`women`,{altEn:[`the women`]}],[`omuntu`,`omuntu`,`person`,{altEn:[`a person`,`the person`]}],[`abantu`,`abantu`,`people`,{altEn:[`the people`]}],[`omuyizi`,`omuyizi`,`student`,{altEn:[`a student`,`the student`,`learner`]}],[`abayizi`,`abayizi`,`students`,{altEn:[`the students`,`learners`]}],[`omusomesa`,`omusomesa`,`teacher`,{altEn:[`a teacher`,`the teacher`]}],[`abasomesa`,`abasomesa`,`teachers`,{altEn:[`the teachers`]}],[`ekitabo`,`ekitabo`,`book`,{altEn:[`a book`,`the book`]}],[`ebitabo`,`ebitabo`,`books`,{altEn:[`the books`]}],[`ekikopo`,`ekikopo`,`cup`,{altEn:[`a cup`,`the cup`]}],[`ebikopo`,`ebikopo`,`cups`,{altEn:[`the cups`]}],[`ekintu`,`ekintu`,`thing`,{altEn:[`a thing`,`the thing`]}],[`ebintu`,`ebintu`,`things`,{altEn:[`the things`]}],[`ekitanda`,`ekitanda`,`bed`,{altEn:[`a bed`,`the bed`]}],[`ebitanda`,`ebitanda`,`beds`,{altEn:[`the beds`]}],[`amazzi`,`amazzi`,`water`,{altEn:[`the water`]}],[`emmere`,`emmere`,`food`,{altEn:[`the food`]}],[`caayi`,`caayi`,`tea`,{altEn:[`the tea`]}],[`oluganda`,`Oluganda`,`Luganda`,{notes:`The language. A Muganda person speaks Oluganda.`}],[`njagala`,`Njagala`,`I want`,{altEn:[`i like`,`i love`]}],[`ndya`,`Ndya`,`I eat`,{altEn:[`i am eating`,`i’m eating`]}],[`nnywa`,`Nnywa`,`I drink`,{altEn:[`i am drinking`,`i’m drinking`]}],[`nsoma`,`Nsoma`,`I read`,{altEn:[`i am reading`,`i’m reading`,`i study`]}],[`njiga`,`Njiga`,`I learn`,{altEn:[`i am learning`,`i’m learning`]}],[`oyagala-ki`,`Oyagala ki?`,`What do you want?`,{altEn:[`what would you like`]}]],sentences:[[`s-maama-wange`,`Maama wange.`,`My mother.`,{altEn:[`My mom.`,`My mum.`]}],[`s-taata-wange`,`Taata wange.`,`My father.`,{altEn:[`My dad.`]}],[`s-jjajja-wange`,`Jjajja wange.`,`My grandparent.`,{altEn:[`My grandmother.`,`My grandfather.`,`My grandma.`,`My grandpa.`]}],[`s-omwana-wange`,`Omwana wange.`,`My child.`],[`s-omusajja-omukazi`,`Omusajja n’omukazi.`,`A man and a woman.`,{altEn:[`The man and the woman.`]}],[`s-abaana-abayizi`,`Abaana bayizi.`,`The children are students.`,{altEn:[`Children are students.`]}],[`s-omusomesa-wange`,`Omusomesa wange.`,`My teacher.`],[`s-ekitabo-kyange`,`Ekitabo kyange.`,`My book.`,{notes:`ki- class nouns take kyange.`}],[`s-ebitabo-byange`,`Ebitabo byange.`,`My books.`,{notes:`bi- class nouns take byange.`}],[`s-njagala-amazzi`,`Njagala amazzi.`,`I want water.`,{altEn:[`I would like water.`,`I want some water.`]}],[`s-njagala-emmere`,`Njagala emmere.`,`I want food.`,{altEn:[`I would like food.`,`I want some food.`]}],[`s-nnywa-caayi`,`Nnywa caayi.`,`I drink tea.`,{altEn:[`I am drinking tea.`,`I’m drinking tea.`]}],[`s-ndya-emmere`,`Ndya emmere.`,`I eat food.`,{altEn:[`I am eating food.`,`I’m eating food.`,`I am eating.`]}],[`s-nsoma-ekitabo`,`Nsoma ekitabo.`,`I read a book.`,{altEn:[`I am reading a book.`,`I’m reading a book.`,`I read the book.`]}],[`s-njiga-oluganda`,`Njiga Oluganda.`,`I am learning Luganda.`,{altEn:[`I’m learning Luganda.`,`I learn Luganda.`]}],[`s-oyagala-ki`,`Oyagala ki?`,`What do you want?`,{altEn:[`What would you like?`]}],[`s-njagala-ekikopo`,`Njagala ekikopo.`,`I want a cup.`,{altEn:[`I want the cup.`]}]],skills:[{id:`u2s1`,title:`Family`,icon:`heart`,lessons:[{id:`u2s1l1`,newWords:[`maama`,`taata`,`jjajja`,`wange`,`omwana`],sentences:[`s-maama-wange`,`s-taata-wange`,`s-jjajja-wange`,`s-omwana-wange`]},{id:`u2s1l2`,newWords:[`abaana`,`omusajja`,`omukazi`,`abasajja`,`abakazi`],sentences:[`s-omusajja-omukazi`,`s-omwana-wange`,`s-maama-wange`],dialogues:[{speaker:`jjajja`,line:`Ono ani?`,translation:`Who is this?`,options:[`Maama wange.`,`Njagala amazzi.`,`Ebitabo byange.`],answer:`Maama wange.`}]}]},{id:`u2s2`,title:`People and things`,icon:`book`,tip:`noun-classes`,lessons:[{id:`u2s2l1`,newWords:[`omuntu`,`abantu`,`omuyizi`,`abayizi`,`omusomesa`,`abasomesa`],sentences:[`s-abaana-abayizi`,`s-omusomesa-wange`]},{id:`u2s2l2`,newWords:[`ekitabo`,`ebitabo`,`ekikopo`,`ebikopo`],sentences:[`s-ekitabo-kyange`,`s-ebitabo-byange`]},{id:`u2s2l3`,newWords:[`ekintu`,`ebintu`,`ekitanda`,`ebitanda`],sentences:[`s-ekitabo-kyange`,`s-ebitabo-byange`,`s-omusomesa-wange`]}]},{id:`u2s3`,title:`First verbs`,icon:`bolt`,lessons:[{id:`u2s3l1`,newWords:[`njagala`,`amazzi`,`emmere`,`oyagala-ki`],sentences:[`s-njagala-amazzi`,`s-njagala-emmere`,`s-oyagala-ki`]},{id:`u2s3l2`,newWords:[`ndya`,`nnywa`,`caayi`],sentences:[`s-nnywa-caayi`,`s-ndya-emmere`,`s-njagala-amazzi`]},{id:`u2s3l3`,newWords:[`nsoma`,`njiga`,`oluganda`],sentences:[`s-nsoma-ekitabo`,`s-njiga-oluganda`,`s-njagala-ekikopo`],dialogues:[{speaker:`nakato`,line:`Oyagala ki?`,translation:`What do you want?`,options:[`Njagala caayi.`,`Nze Nakato.`,`Wasuze otya?`],answer:`Njagala caayi.`}]}]}]}];function Ze([e,t,n,r={}],i){return{id:e,lg:t,en:n,altLg:r.altLg??[],altEn:r.altEn??[],notes:r.notes??``,audio:r.audio??null,unit:i}}function Qe(e){let t={},n={},r={},i={},a=[];return{units:e.map((e,o)=>{for(let n of e.words)t[n[0]]=Ze(n,e.id);for(let t of e.sentences)n[t[0]]=Ze(t,e.id);let s=e.skills.map((t,n)=>{let o={...t,unit:e.id,index:n,lessons:t.lessons.map((n,i)=>{let o={...n,dialogues:n.dialogues??[],skill:t.id,unit:e.id,index:i,order:a.length};return r[n.id]=o,a.push(n.id),o})};return i[t.id]=o,o});return{id:e.id,title:e.title,description:e.description,color:e.color,character:e.character,index:o,skills:s}}),words:t,sentences:n,lessons:r,skills:i,order:a}}var R=Qe(Xe);function $e(e,t=R){let n=t.lessons[e]?.order??-1,r=[];for(let e=0;e<=n;e+=1)r.push(...t.lessons[t.order[e]].newWords);return r}function z(e,t){return(e.lessons[t]?.completions??0)>0}function et(e,t,n){return e.profile?.level===`some`&&t.skill===n.units[0].skills[0].id}function B(e,t,n=R){let r=n.lessons[t];return r?r.order===0||z(e,t)||et(e,r,n)?!0:z(e,n.order[r.order-1]):!1}function tt(e,t=R){return t.order.find(n=>!z(e,n)&&B(e,n,t))??null}function nt(e,t,n=R){let r=n.skills[t].lessons,i=r.filter(t=>z(e,t.id)).length;return{done:i,total:r.length,complete:i===r.length}}function V(e,t,n=R){let r=n.units.find(e=>e.id===t).skills.flatMap(e=>e.lessons),i=r.filter(t=>z(e,t.id)).length;return{done:i,total:r.length,complete:i===r.length}}function rt(e,t,n=R){return B(e,n.units.find(e=>e.id===t).skills[0].lessons[0].id,n)}function H(e,t=R){return t.order.filter(t=>z(e,t)).flatMap(e=>t.lessons[e].newWords)}var U={lesson:10,replay:5,perfectBonus:5,practice:10,checkpoint:20};function it(e,{replay:t=!1,base:n}={}){let r=[{label:t?`Practice`:`Lesson`,xp:n??(t?U.replay:U.lesson)}];return e.perfect&&r.push({label:`Perfect bonus`,xp:U.perfectBonus}),{total:r.reduce((e,t)=>e+t.xp,0),parts:r}}function at(e,t,n=new Date){let r=D(n);return e.xp.total+=t,e.xp.byDay[r]=(e.xp.byDay[r]??0)+t,e}function ot(e,t=new Date){return e.xp.byDay[D(t)]??0}function W(e,t=new Date){let n=e.profile?.dailyGoal??20,r=ot(e,t);return{today:r,goal:n,met:r>=n,ratio:Math.min(1,r/n)}}var st=[0,1,3,7,14,30];function ct(e,t,n,r=D()){let i=e.words[t]??{box:0,due:r,seen:0,correct:0,wrong:0,lastSeen:null};return i.seen+=1,n?(i.correct+=1,i.box=Math.min(st.length-1,i.box+1)):(i.wrong+=1,i.box=1),i.due=k(r,st[i.box]),i.lastSeen=r,e.words[t]=i,e}function lt(e,{wordIds:t=[],missed:n={}},r=D()){for(let i of t)ct(e,i,!n[i],r);let i=Object.keys(n);return i.length&&(e.mistakes=[...i,...e.mistakes.filter(e=>!n[e])].slice(0,40)),e}function ut(e,{wordIds:t=[],missed:n={}}){return e.mistakes=e.mistakes.filter(e=>!t.includes(e)||n[e]),e}function dt(e,t=D()){return!!e&&ve(e.due,t)>=0}function G(e,t=D()){return Object.entries(e.words).filter(([,e])=>dt(e,t)).sort(([,e],[,t])=>e.due.localeCompare(t.due)||e.box-t.box).map(([e])=>e)}function ft(e){return Object.entries(e.words).sort(([,e],[,t])=>e.box-t.box||t.wrong-t.correct-(e.wrong-e.correct)).map(([e])=>e)}function pt(e,t){let n=t.filter(t=>e.words[t]);return n.length?n.reduce((t,n)=>t+e.words[n].box,0)/(n.length*(st.length-1)):0}var K=[0,44,72,44,0,-44,-72,-44];function mt(e,t,n,r){let i=z(e,t.id),a=B(e,t.id),o=i?`done`:t.id===r?`current`:a?`open`:`locked`,s=R.skills[t.skill],c=`${s.title}, lesson ${t.index+1} of ${s.lessons.length}: ${o===`locked`?`locked`:o===`done`?`completed`:`start`}`,l=o===`locked`?`lock`:o===`done`?`check`:s.icon??`star`;return`
    <li class="node-wrap" style="--x:${K[n%K.length]}px">
      ${o===`current`?`<span class="node__bubble" aria-hidden="true">Start</span>`:``}
      <button class="node node--${o}" type="button" data-lesson="${t.id}" aria-label="${p(c)}">
        ${f(l,{size:30})}
      </button>
    </li>`}function ht(e,t,n){let r=V(e,t.id),i=e.lessons[`checkpoint-${t.id}`]?.completions?`done`:r.complete?`current`:`locked`;return`
    <li class="node-wrap" style="--x:${K[n%K.length]}px">
      <button class="node node--checkpoint node--${i}" type="button" data-checkpoint="${t.id}" aria-label="${p(`${t.title} checkpoint${i===`locked`?`, locked`:``}`)}">
        ${f(`trophy`,{size:34})}
      </button>
    </li>`}function gt(e,t,n){return nt(e,t.id).complete&&t.lessons.some(e=>e.newWords.some(e=>n.has(e)))}function _t(e,n,r){let i=new Set(G(e)),a=V(e,n.id),o=rt(e,n.id),s=0,c=n.skills.map(t=>{let n=nt(e,t.id),a=t.lessons.map(t=>mt(e,t,s++,r)).join(``);return`
        <li class="skill${n.complete?` skill--complete`:``}">
          <h3 class="skill__title"><span>${p(t.title)}</span><span class="skill__count">${n.done}/${n.total}</span>${gt(e,t,i)?`<a class="pill pill--primary skill__review" href="#/practice/session?mode=skill&id=${t.id}">${f(`target`,{size:14})}Review</a>`:``}</h3>
          <ol class="trail">${a}</ol>
        </li>`}).join(``),l=[n.character,...n.skills.map(e=>e.character).filter(Boolean)];return`
    <section class="unit unit--${n.color}${o?``:` unit--locked`}" aria-labelledby="unit-${n.id}">
      <header class="unit__banner">
        <div>
          <p class="unit__eyebrow">Unit ${n.index+1}</p>
          <h2 id="unit-${n.id}">${p(n.title)}</h2>
          <p class="unit__desc">${p(n.description)}</p>
        </div>
        <a class="unit__guide" href="#/guidebook/${n.id}" aria-label="${p(n.title)} guidebook">${f(`book`,{size:22})}<span>Guidebook</span></a>
        <div class="unit__meter" aria-label="${a.done} of ${a.total} lessons complete"><span style="width:${a.done/a.total*100}%"></span></div>
      </header>
      <div class="unit__body">
        <div class="unit__cast" aria-hidden="true">${l.map(e=>`<div class="unit__character">${t(e,{expression:a.complete?`happy`:`neutral`})}</div>`).join(``)}</div>
        <ol class="skills">${c}</ol>
        <ol class="trail trail--checkpoint">${ht(e,n,s)}</ol>
      </div>
    </section>`}function vt(e){let t=A(e);return t.atRisk?`<div class="risk-banner" role="status">
    ${f(`flame`,{size:28})}
    <p><strong>Your ${t.current} day streak is at risk!</strong> Finish a lesson today to keep it${t.freezes?` (you have ${t.freezes} streak freeze${t.freezes>1?`s`:``})`:``}.</p>
  </div>`:``}function yt(e){let t=W(e);return`<a class="goal-strip" href="#/profile">
    ${g(t.ratio,{size:40,stroke:5,content:f(`bolt`,{size:16}),label:`Daily goal`})}
    <span><strong>${t.met?`Daily goal met!`:`Daily goal`}</strong> ${Math.min(t.today,t.goal)} / ${t.goal} XP</span>
  </a>`}function bt(e){let{goal:t,today:n}=W(e),r=A(e);return`
    <aside class="learn__side">
      <div class="card side-card">
        ${g(n/t,{size:64,content:f(`bolt`,{size:26}),label:`Daily goal`})}
        <div>
          <h3>Daily goal</h3>
          <p class="muted">${Math.min(n,t)} / ${t} XP today</p>
        </div>
      </div>
      <a class="card side-card side-card--link" href="#/streak">
        <span class="side-card__icon${r.doneToday?``:` is-dim`}">${f(`flame`,{size:34})}</span>
        <div>
          <h3>${r.current} day streak</h3>
          <p class="muted">${r.doneToday?`Done for today. Weebale!`:r.current?`Do a lesson to extend it.`:`Finish a lesson to start one.`}</p>
        </div>
      </a>
    </aside>`}function xt({root:e,navigate:t}){let n=T.get(),r=tt(n);e.innerHTML=`
    <div class="learn">
      <div class="learn__path">
        ${vt(n)}
        ${yt(n)}
        ${R.units.map(e=>_t(n,e,r)).join(``)}
        <p class="learn__more caption">More units are on the way. Weebale for learning!</p>
      </div>
      ${bt(n)}
    </div>`,e.querySelector(`.node--current`)?.scrollIntoView({block:`center`});let i=null;function a(){i?.remove(),i=null}e.addEventListener(`click`,e=>{let n=e.target.closest(`[data-checkpoint]`);if(n){n.classList.contains(`node--locked`)?b(`Finish every lesson in this unit to unlock the checkpoint.`):t(`/checkpoint/${n.dataset.checkpoint}`);return}let r=e.target.closest(`[data-lesson]`);if(!r){e.target.closest(`.node-pop`)||a();return}let o=R.lessons[r.dataset.lesson];if(r.classList.contains(`node--locked`)){b(`Complete the lessons before this one to unlock it.`);return}a();let s=R.skills[o.skill],c=z(T.get(),o.id);i=document.createElement(`div`),i.className=`node-pop`,i.setAttribute(`role`,`dialog`),i.setAttribute(`aria-label`,s.title),i.innerHTML=`
      <h3>${p(s.title)}</h3>
      <p>Lesson ${o.index+1} of ${s.lessons.length}</p>
      ${m({label:c?`Practise again +5 XP`:`Start +10 XP`,block:!0,href:`#/lesson/${o.id}`,variant:c?`secondary`:`primary`})}`,r.closest(`.node-wrap`).append(i),i.querySelector(`.btn`).focus()}),e.addEventListener(`keydown`,e=>{e.key===`Escape`&&a()})}function q(e){return String(e??``).toLowerCase().normalize(`NFC`).replace(/[’‘`´]/g,`'`).replace(/[.,!?¿¡;:"“”()–—-]/g,` `).replace(/(^|\s)'+|'+(\s|$)/g,`$1$2`).replace(/\s+/g,` `).trim()}function St(e,t){let n=q(e);return n.length>0&&t.some(e=>q(e)===n)}function J(e){return String(e).split(/\s+/).map(e=>e.replace(/^[.,!?¿¡;:"“”()'’‘]+|[.,!?¿¡;:"“”()'’‘]+$/g,``)).filter(Boolean)}function Ct(e,t){if(e===t)return 0;let n=Array.from({length:t.length+1},(e,t)=>t);for(let r=1;r<=e.length;r+=1){let i=[r];for(let a=1;a<=t.length;a+=1)i[a]=Math.min(n[a]+1,i[a-1]+1,n[a-1]+(e[r-1]===t[a-1]?0:1));n=i}return n[t.length]}function wt(e,t){let n=q(e);if(!n)return{correct:!1,typo:!1,closest:t[0]};let r={distance:1/0,answer:t[0]};for(let e of t){let t=Ct(n,q(e));if(t===0)return{correct:!0,typo:!1,closest:e};t<r.distance&&(r={distance:t,answer:e})}let i=Math.max(1,Math.floor(q(r.answer).length/10)),a=r.distance<=i;return{correct:a,typo:a,closest:r.answer}}var Tt=e=>`“${e.replace(/[?.!]$/,``)}”`;function Y(e,t,n,r){let i=n.sample(t.filter(t=>t.id!==e.id&&q(t.lg)!==q(e.lg)&&q(t.en)!==q(e.en)),3),a=r===`toLg`,o=n.shuffle([e,...i]).map(e=>({text:a?e.lg:e.en,value:e.id}));return{type:`choice`,prompt:a?`Which one means ${Tt(e.en)}?`:`What does ${Tt(e.lg)} mean?`,lang:a?`lg`:`en`,options:o,answer:e.id,answerText:a?e.lg:e.en,wordIds:[e.id]}}function X(e,t,n,r){let i=r===`toEn`,a=i?e.en:e.lg,o=J(a),s=new Set(o.map(e=>q(e))),c=(i?t.enTokens:t.lgTokens).filter(e=>!s.has(q(e))),l=n.sample([...new Set(c)],Math.min(4,Math.max(2,6-o.length)));return{type:`translate`,prompt:`Write this in `+(i?`English`:`Luganda`),source:i?e.lg:e.en,sourceLang:i?`lg`:`en`,lang:i?`en`:`lg`,accepted:[a,...i?e.altEn:e.altLg],answerText:a,bank:n.shuffle([...o,...l]),sentenceId:e.id,wordIds:e.wordIds??[]}}function Et(e,t){let n=t.sample(e,Math.min(5,e.length));return{type:`match`,prompt:`Tap the matching pairs`,pairs:n.map(e=>({id:e.id,lg:e.lg,en:e.en})),left:t.shuffle(n.map(e=>e.id)),right:t.shuffle(n.map(e=>e.id)),wordIds:n.map(e=>e.id)}}function Z(e){return{type:`type`,prompt:`Type this in English`,source:e.lg,sourceLang:`lg`,lang:`en`,accepted:[e.en,...e.altEn],answerText:e.en,sentenceId:e.id,wordIds:e.wordIds??[]}}function Dt(e,t,n){let r=J(e.lg),i=t.filter(e=>!e.lg.includes(` `)&&r.some(t=>q(t)===q(e.lg)));if(!i.length)return null;let a=n.pick(i),o=RegExp(`(^|[\\s,])${a.lg.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}(?=$|[\\s,.?!])`,`i`),s=o.exec(e.lg);if(!s)return null;let c=s[0].slice(s[1].length),l=e.lg.replace(o,`$1___`),u=e=>c[0]===c[0].toUpperCase()?e[0].toUpperCase()+e.slice(1):e[0].toLowerCase()+e.slice(1),d=n.sample(t.filter(e=>e.id!==a.id&&!e.lg.includes(` `)&&q(e.lg)!==q(a.lg)),2);return d.length<2?null:{type:`fill`,prompt:`Fill in the blank`,sentence:l,translation:e.en,full:e.lg,options:n.shuffle([c,...d.map(e=>u(e.lg))]),answer:c,lang:`lg`,wordIds:[a.id]}}function Ot(e,t){return{type:`dialogue`,prompt:`Choose the best reply`,speaker:e.speaker,line:e.line,translation:e.translation,options:t.shuffle(e.options),answer:e.answer,lang:`lg`,wordIds:[]}}function kt(e,t,n){return{...X(e,t,n,`toLg`),type:`listen`,prompt:`Tap what you hear`,audio:e.audio}}function At(e,t){let n=` ${q(e.lg)} `;return t.filter(e=>n.includes(` ${q(e.lg)} `)).map(e=>e.id)}function jt(e,t,n){let r=Object.fromEntries(e.units.map((e,t)=>[e.id,t])),i=Object.values(e.sentences).filter(e=>r[e.unit]<=r[n]);return{lgTokens:[...t.flatMap(e=>J(e.lg)),...i.flatMap(e=>J(e.lg))],enTokens:[...t.flatMap(e=>J(e.en.toLowerCase())),...i.flatMap(e=>J(e.en))]}}function Mt(e,{course:t=R,seed:n,firstTime:r=!0,extras:i=[]}={}){let a=t.lessons[e];if(!a)throw Error(`Unknown lesson: ${e}`);let o=j(n??Date.now()),s=$e(e,t).map(e=>t.words[e]),c=a.newWords.map(e=>t.words[e]),l=s.filter(e=>!a.newWords.includes(e.id)),u=a.sentences.map(e=>({...t.sentences[e],wordIds:At(t.sentences[e],s)})),d=jt(t,s,a.unit),f=s.length>=4?s:Object.values(t.words).filter(e=>e.unit===a.unit),p=[];c.forEach((e,t)=>{r&&p.push({type:`intro`,word:e,wordIds:[e.id]}),p.push(Y(e,f,o,t%2?`toEn`:`toLg`))});let m=c.length>=3?c:[...c,...o.sample(l,5-c.length)];m.length>=3&&p.push(Et(m,o)),u.forEach((e,t)=>p.push(X(e,d,o,t%2?`toLg`:`toEn`)));for(let e of o.shuffle(u)){let t=Dt(e,s,o);if(t){p.push(t);break}}for(let e of a.dialogues)p.push(Ot(e,o));if(u.length)p.push(Z(o.pick(u)));else if(c.length){let e=o.pick(c);p.push(Z({...e,wordIds:[e.id]}))}for(let e of[...u,...c].filter(e=>e.audio).slice(0,2))p.push(kt(e,d,o));for(let e of i)p.push(...e({lesson:a,course:t,rng:o,known:s,newWords:c,sentences:u,pools:d}));for(let[e,t]of u.entries()){if(p.length>=12)break;p.push(X(t,d,o,e%2?`toEn`:`toLg`))}for(let e of o.shuffle(c)){if(p.length>=10)break;p.push(Y(e,f,o,`toEn`))}for(let e of o.sample(l,2)){if(p.length>=18)break;p.push(Y(e,f,o,o.next()<.5?`toLg`:`toEn`))}return p.slice(0,18)}function Nt(e,{now:t=()=>Date.now()}={}){let n=e.map((e,t)=>({...e,key:t})),r=n.length,i=new Set,a=0,o=0,s=0,c=0,l=0,u=new Map,d=t();return{get current(){return n[a]??null},get done(){return a>=n.length},get progress(){return Math.min(1,l/r)},get total(){return r},answer(e){let t=n[a];if((e!==!1||i.has(t.key))&&(l+=1),e===!0)o+=1,i.has(t.key)||(c+=1);else if(e===!1){s+=1;for(let e of t.wordIds??[])u.set(e,(u.get(e)??0)+1);i.has(t.key)||(i.add(t.key),n.push(t))}},next(){a+=1},noteMiss(e){for(let t of e)u.set(t,(u.get(t)??0)+1)},result(){let e=n.filter(e=>e.type!==`intro`),r=new Set(e.map(e=>e.key)).size;return{correct:o,wrong:s,firstTry:c,accuracy:r?c/r:1,perfect:s===0,seconds:Math.round((t()-d)/1e3),missed:Object.fromEntries(u),wordIds:[...new Set(n.flatMap(e=>e.wordIds??[]))]}}}}function Pt(e,t,n){let r=e.word;return t.innerHTML=`
    <div class="ex ex--intro">
      ${_(`New word`,{variant:`primary`,iconName:`star`})}
      <p class="ex-intro__lg" lang="lg">${p(r.lg)}</p>
      <p class="ex-intro__en">${p(r.en)}</p>
      ${r.notes?`<p class="ex-intro__notes caption">${p(r.notes)}</p>`:``}
    </div>`,n.setReady(!0),{check:()=>({correct:null})}}function Ft(e,t,n){let r=null;t.innerHTML=`
    <div class="ex ex--choice">
      <h2 class="ex__prompt">${p(e.prompt)}</h2>
      <div class="ex-choice__options" role="radiogroup" aria-label="Answers">
        ${e.options.map((t,n)=>`<button class="choice" type="button" role="radio" aria-checked="false" data-value="${p(t.value)}" ${e.lang===`lg`?`lang="lg"`:``}><span class="choice__key">${n+1}</span><span>${p(t.text)}</span></button>`).join(``)}
      </div>
    </div>`;let i=[...t.querySelectorAll(`[data-value]`)];function a(e){n.locked()||(r=e.dataset.value,i.forEach(t=>t.setAttribute(`aria-checked`,String(t===e))),n.setReady(!0))}return t.addEventListener(`click`,e=>{let t=e.target.closest(`[data-value]`);t&&a(t)}),{keydown(e){let t=Number(e.key);return t>=1&&t<=i.length&&(a(i[t-1]),!0)},check(){let t=r===e.answer;return i.forEach(t=>{t.dataset.value===e.answer?t.classList.add(`is-correct`):t.dataset.value===r&&t.classList.add(`is-wrong`)}),{correct:t,answerText:e.answerText}}}}function It(e,t,n){let r=[];t.innerHTML=`
    <div class="ex ex--translate">
      <h2 class="ex__prompt">${p(e.prompt)}</h2>
      <div class="ex-translate__source">
        <p class="speech speech--left" ${e.sourceLang===`lg`?`lang="lg"`:``}>${p(e.source)}</p>
      </div>
      <div class="ex-translate__answer" data-answer aria-label="Your answer" aria-live="polite"></div>
      <div class="ex-translate__bank" data-bank>
        ${e.bank.map((t,n)=>`<button class="tile" type="button" data-tile="${n}" ${e.lang===`lg`?`lang="lg"`:``}>${p(t)}</button>`).join(``)}
      </div>
    </div>`;let i=t.querySelector(`[data-answer]`),a=[...t.querySelectorAll(`[data-tile]`)];function o(){i.innerHTML=r.map((t,n)=>`<button class="tile" type="button" data-placed="${n}" ${e.lang===`lg`?`lang="lg"`:``}>${p(e.bank[t])}</button>`).join(``),a.forEach((e,t)=>{let n=r.includes(t);e.classList.toggle(`is-used`,n),e.disabled=n}),n.setReady(r.length>0)}return t.addEventListener(`click`,e=>{if(n.locked())return;let t=e.target.closest(`[data-tile]`);if(t&&!t.disabled){r.push(Number(t.dataset.tile)),o();return}let i=e.target.closest(`[data-placed]`);i&&(r.splice(Number(i.dataset.placed),1),o())}),{keydown(e){return e.key===`Backspace`&&r.length?(r.pop(),o(),!0):!1},check(){return{correct:St(r.map(t=>e.bank[t]).join(` `),e.accepted),answerText:e.answerText}}}}function Lt(e,t,n){let r=Object.fromEntries(e.pairs.map(e=>[e.id,e])),i=null,a=0;t.innerHTML=`
    <div class="ex ex--match">
      <h2 class="ex__prompt">${p(e.prompt)}</h2>
      <div class="ex-match__grid">
        <div class="ex-match__col">${e.left.map((e,t)=>`<button class="tile" type="button" data-side="lg" data-id="${e}" lang="lg"><span class="choice__key">${t+1}</span>${p(r[e].lg)}</button>`).join(``)}</div>
        <div class="ex-match__col">${e.right.map((t,n)=>`<button class="tile" type="button" data-side="en" data-id="${t}"><span class="choice__key">${n+1+e.left.length}</span>${p(r[t].en)}</button>`).join(``)}</div>
      </div>
    </div>`;let o=[...t.querySelectorAll(`[data-side]`)];function s(t){if(t.disabled)return;if(!i||i.side===t.dataset.side){o.forEach(e=>e.classList.remove(`is-selected`)),t.classList.add(`is-selected`),i={side:t.dataset.side,id:t.dataset.id,el:t};return}let r=i.el;if(i=null,r.classList.remove(`is-selected`),r.dataset.id===t.dataset.id){for(let e of[r,t])e.classList.add(`is-correct`),e.disabled=!0,setTimeout(()=>e.classList.add(`is-used`),350);a+=1,a===e.pairs.length&&setTimeout(()=>n.complete(!0),450)}else{n.miss([r.dataset.id,t.dataset.id]);for(let e of[r,t])e.classList.add(`is-wrong`),setTimeout(()=>e.classList.remove(`is-wrong`),400)}}return t.addEventListener(`click`,e=>{let t=e.target.closest(`[data-side]`);t&&s(t)}),n.setReady(!1,{hideCheck:!0}),{keydown(e){let t=Number(e.key);return t>=1&&t<=o.length&&(s(o[t-1]),!0)},check:()=>({correct:!0})}}function Rt(e,t,n){t.innerHTML=`
    <div class="ex ex--type">
      <h2 class="ex__prompt">${p(e.prompt)}</h2>
      <div class="ex-translate__source"><p class="speech speech--left" ${e.sourceLang===`lg`?`lang="lg"`:``}>${p(e.source)}</p></div>
      <label class="visually-hidden" for="ex-type-input">Your answer</label>
      <textarea id="ex-type-input" class="input ex-type__input" rows="3" autocomplete="off" autocapitalize="off" spellcheck="false" ${e.lang===`lg`?`lang="lg"`:``} placeholder="Type in ${e.lang===`lg`?`Luganda`:`English`}"></textarea>
    </div>`;let r=t.querySelector(`textarea`);return r.addEventListener(`input`,()=>n.setReady(r.value.trim().length>0)),r.addEventListener(`keydown`,e=>{e.key===`Enter`&&e.preventDefault()}),{check(){r.readOnly=!0;let{correct:t,typo:n,closest:i}=wt(r.value,e.accepted);return{correct:t,answerText:t&&!n?null:i,note:n?`You have a typo.`:``}}}}function zt(e,t,n){let r=null,[i,a]=e.sentence.split(`___`);t.innerHTML=`
    <div class="ex ex--fill">
      <h2 class="ex__prompt">${p(e.prompt)}</h2>
      <p class="ex-fill__hint muted">${p(e.translation)}</p>
      <p class="ex-fill__sentence" lang="lg">${p(i)}<span class="ex-fill__blank" data-blank>&nbsp;</span>${p(a)}</p>
      <div class="ex-fill__options" role="radiogroup" aria-label="Answers">
        ${e.options.map((e,t)=>`<button class="tile" type="button" role="radio" aria-checked="false" data-value="${p(e)}" lang="lg"><span class="choice__key">${t+1}</span>${p(e)}</button>`).join(``)}
      </div>
    </div>`;let o=[...t.querySelectorAll(`[data-value]`)],s=t.querySelector(`[data-blank]`);function c(e){n.locked()||(r=e.dataset.value,o.forEach(t=>{t.setAttribute(`aria-checked`,String(t===e)),t.classList.toggle(`is-selected`,t===e)}),s.textContent=r,s.classList.add(`is-filled`),n.setReady(!0))}return t.addEventListener(`click`,e=>{let t=e.target.closest(`[data-value]`);t&&c(t)}),{keydown(e){let t=Number(e.key);return t>=1&&t<=o.length&&(c(o[t-1]),!0)},check(){let t=r===e.answer;return s.classList.add(t?`is-correct`:`is-wrong`),{correct:t,answerText:e.full}}}}function Bt(e,n,i){let a=null,o=r[e.speaker]?.name??``;n.innerHTML=`
    <div class="ex ex--dialogue">
      <h2 class="ex__prompt">${p(e.prompt)}</h2>
      <div class="ex-dialogue__scene">
        <div class="ex-dialogue__speaker">${t(e.speaker,{expression:`happy`})}<span>${p(o)}</span></div>
        <div class="speech speech--left ex-dialogue__line">
          <p lang="lg">${p(e.line)}</p>
          <button class="ex-dialogue__reveal" type="button" data-reveal aria-expanded="false">${f(`book`,{size:16})} Show translation</button>
          <p class="ex-dialogue__translation muted" hidden>${p(e.translation)}</p>
        </div>
      </div>
      <div class="ex-choice__options" role="radiogroup" aria-label="Replies">
        ${e.options.map((e,t)=>`<button class="choice" type="button" role="radio" aria-checked="false" data-value="${p(e)}" lang="lg"><span class="choice__key">${t+1}</span><span>${p(e)}</span></button>`).join(``)}
      </div>
    </div>`;let s=[...n.querySelectorAll(`[data-value]`)];function c(e){i.locked()||(a=e.dataset.value,s.forEach(t=>t.setAttribute(`aria-checked`,String(t===e))),i.setReady(!0))}return n.addEventListener(`click`,e=>{let t=e.target.closest(`[data-reveal]`);if(t){n.querySelector(`.ex-dialogue__translation`).hidden=!1,t.setAttribute(`aria-expanded`,`true`),t.hidden=!0;return}let r=e.target.closest(`[data-value]`);r&&c(r)}),{keydown(e){let t=Number(e.key);return t>=1&&t<=s.length&&(c(s[t-1]),!0)},check(){let t=a===e.answer;return s.forEach(t=>{t.dataset.value===e.answer?t.classList.add(`is-correct`):t.dataset.value===a&&t.classList.add(`is-wrong`)}),{correct:t,answerText:e.answer}}}}function Vt(e,t,n){let r=[],i=new Audio(e.audio);t.innerHTML=`
    <div class="ex ex--listen">
      <h2 class="ex__prompt">${p(e.prompt)}</h2>
      <div class="ex-listen__controls">
        <button class="btn btn--blue ex-listen__play" type="button" data-play aria-label="Play audio">${f(`speaker`,{size:40})}</button>
      </div>
      <div class="ex-translate__answer" data-answer aria-live="polite"></div>
      <div class="ex-translate__bank">${e.bank.map((e,t)=>`<button class="tile" type="button" data-tile="${t}" lang="lg">${p(e)}</button>`).join(``)}</div>
    </div>`;let a=t.querySelector(`[data-answer]`),o=[...t.querySelectorAll(`[data-tile]`)],s=()=>{i.currentTime=0,i.play().catch(()=>{})};function c(){a.innerHTML=r.map((t,n)=>`<button class="tile" type="button" data-placed="${n}" lang="lg">${p(e.bank[t])}</button>`).join(``),o.forEach((e,t)=>{e.disabled=r.includes(t),e.classList.toggle(`is-used`,e.disabled)}),n.setReady(r.length>0)}return t.addEventListener(`click`,e=>{if(e.target.closest(`[data-play]`))return s();if(n.locked())return;let t=e.target.closest(`[data-tile]`);t&&!t.disabled&&r.push(Number(t.dataset.tile));let i=e.target.closest(`[data-placed]`);i&&r.splice(Number(i.dataset.placed),1),c()}),setTimeout(s,300),{check:()=>({correct:St(r.map(t=>e.bank[t]).join(` `),e.accepted),answerText:e.answerText})}}var Ht={intro:Pt,choice:Ft,translate:It,match:Lt,type:Rt,fill:zt,dialogue:Bt,listen:Vt},Ut={lesson:5,practice:3,perfect:5},Wt={3:10,7:25,14:35,30:50,50:75,100:150,200:200,365:365},Gt=[{id:`freeze`,title:`Streak freeze`,icon:`snowflake`,price:60,description:`Keeps your streak if you miss a day. Hold up to 2.`},{id:`refill`,title:`Heart refill`,icon:`heart`,price:40,description:`Refill to 5 hearts right away.`},{id:`frame-gold`,title:`Gold frame`,icon:`star`,price:100,description:`A gold ring around your avatar.`,cosmetic:!0},{id:`frame-bauhaus`,title:`Bauhaus frame`,icon:`target`,price:150,description:`Vermillion, ink and gold quarters around your avatar.`,cosmetic:!0}];function Kt(e,{practice:t=!1}={}){return(t?Ut.practice:Ut.lesson)+(e.perfect?Ut.perfect:0)}function qt(e,t,n=Date.now()){return e.gems<t.price?{ok:!1,reason:`Not enough gems`}:t.id===`freeze`&&e.streak.freezes>=2?{ok:!1,reason:`Fully stocked`}:t.id===`refill`&&E(e,n).full?{ok:!1,reason:`Hearts are full`}:t.cosmetic&&e.inventory[t.id]?{ok:!1,reason:`Owned`}:{ok:!0}}function Jt(e,t,n=Date.now()){let r=Gt.find(e=>e.id===t);return!r||!qt(e,r,n).ok?!1:r.id===`refill`?ge(e,n):(e.gems-=r.price,r.id===`freeze`&&(e.streak.freezes+=1),r.cosmetic&&(e.inventory[r.id]=!0,e.profile&&(e.profile.avatar={...e.profile.avatar,frame:r.id})),!0)}var Yt=[{id:`wildfire`,title:`Wildfire`,icon:`flame`,shape:`circle`,describe:e=>`Reach a ${e} day streak`,tiers:[3,7,14,30,100],value:e=>e.streak.longest},{id:`sage`,title:`Sage`,icon:`bolt`,shape:`square`,describe:e=>`Earn ${e} XP`,tiers:[100,250,500,1e3,2500],value:e=>e.xp.total},{id:`scholar`,title:`Scholar`,icon:`book`,shape:`triangle`,describe:e=>`Learn ${e} words`,tiers:[10,25,50,100,200],value:e=>Object.keys(e.words).length},{id:`perfectionist`,title:`Perfectionist`,icon:`star`,shape:`half`,describe:e=>`Finish ${e} lesson${e>1?`s`:``} with no mistakes`,tiers:[1,5,10,25,50],value:e=>e.stats.perfectLessons},{id:`reviewer`,title:`Sharp Mind`,icon:`target`,shape:`circle`,describe:e=>`Complete ${e} practice session${e>1?`s`:``}`,tiers:[1,5,10,25,50],value:e=>e.stats.practiceSessions??0},{id:`explorer`,title:`Explorer`,icon:`trophy`,shape:`square`,describe:e=>`Complete ${e} unit${e>1?`s`:``}`,tiers:[1,2,4,6,8],value:(e,t=R)=>t.units.filter(n=>V(e,n.id,t).complete).length}];function Xt(e,t){let n=t.value(e),r=t.tiers.filter(e=>n>=e).length,i=t.tiers[r]??null,a=t.tiers[r-1]??0;return{value:n,tier:r,maxTier:t.tiers.length,next:i,ratio:i?(n-a)/(i-a):1}}function Zt(e){let t=[];for(let n of Yt){let{tier:r}=Xt(e,n),i=e.achievements[n.id]??0;for(let a=i+1;a<=r;a+=1){let r=10*a;e.gems+=r,t.push({id:n.id,title:n.title,tier:a,gems:r,description:n.describe(n.tiers[a-1])})}r>i&&(e.achievements[n.id]=r)}return t}function Qt(e,t,n,r=new Date){let i=e.lessons[t]??{completions:0,bestAccuracy:0};return e.lessons[t]={completions:i.completions+1,bestAccuracy:Math.max(i.bestAccuracy??0,n.accuracy),lastCompletedAt:r.toISOString()},e.stats.lessonsCompleted+=1,n.perfect&&(e.stats.perfectLessons+=1),e.stats.answers+=n.correct+n.wrong,e.stats.correctAnswers+=n.correct,e.stats.secondsLearning+=n.seconds,e}function $t(e,t,{replay:n=!1,base:r,practice:i=!1,now:a=new Date}={}){let o=T.get(),s=it(t,{replay:n,base:r}),c,l=0,u=[],d=T.update(n=>{e&&Qt(n,e,t,a),at(n,s.total,a),c=Se(n,D(a)),lt(n,t,D(a)),i&&(ut(n,t),he(n,1,a.getTime()),n.stats.practiceSessions+=1),l=Kt(t,{practice:i})+(c.extended&&c.milestone?Wt[c.milestone]??0:0),n.gems+=l,u=Zt(n)});return{xp:s,streak:c,gems:l,achievements:u,before:o,after:d,goalBefore:W(o,a),goalAfter:W(d,a)}}var en=[`var(--color-primary)`,`var(--color-ink-900)`,`var(--color-gold)`,`var(--color-paper-400)`,`var(--color-vermillion-300)`],tn=[`circle`,`square`,`triangle`,`half`];function Q(e=document.body,{count:t=48,duration:n=2600}={}){if(window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches)return;let r=document.createElement(`div`);r.className=`confetti`,r.setAttribute(`aria-hidden`,`true`);for(let e=0;e<t;e+=1){let t=document.createElement(`i`);t.className=`confetti__piece confetti__piece--${tn[e%tn.length]}`,t.style.setProperty(`--x`,`${Math.random()*100}vw`),t.style.setProperty(`--drift`,`${(Math.random()-.5)*30}vw`),t.style.setProperty(`--spin`,`${(Math.random()-.5)*1080}deg`),t.style.setProperty(`--delay`,`${Math.random()*400}ms`),t.style.setProperty(`--size`,`${8+Math.random()*10}px`),t.style.setProperty(`--c`,en[e%en.length]),r.append(t)}e.append(r),setTimeout(()=>r.remove(),n+500)}var nn=[`var(--color-paper-300)`,`var(--color-vermillion-300)`,`var(--color-primary)`,`var(--color-gold)`,`var(--color-ink-900)`,`var(--color-bauhaus-blue)`],rn=[``,`I`,`II`,`III`,`IV`,`V`],an={circle:`<circle cx="50" cy="50" r="44"/>`,square:`<rect x="8" y="8" width="84" height="84" rx="10"/>`,triangle:`<path d="M50 4 L96 88 H4 Z"/>`,half:`<path d="M6 70 A44 44 0 0 1 94 70 V92 H6 Z"/>`};function on({shape:e=`circle`,iconName:t=`star`,tier:n=0,size:r=72,label:i=``}){let a=nn[Math.min(n,nn.length-1)];return`<span class="badge${n?``:` badge--locked`}" style="--badge-size:${r}px;--badge-fg:${n===0?`var(--color-ink-500)`:n===3?`var(--color-ink-900)`:`#fff`}" ${i?`role="img" aria-label="${i}"`:`aria-hidden="true"`}>
    <svg viewBox="0 0 100 100" aria-hidden="true"><g fill="${a}">${an[e]}</g><circle cx="82" cy="18" r="10" fill="var(--color-surface)" stroke="var(--color-ink-900)" stroke-width="2"/></svg>
    <span class="badge__icon">${f(t,{size:Math.round(r*.38)})}</span>
    ${n?`<span class="badge__tier">${rn[n]}</span>`:``}
  </span>`}var sn=[];function cn(e,t,n=700){if(window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches){e.textContent=t;return}let r=performance.now(),i=a=>{let o=Math.min(1,(a-r)/n);e.textContent=Math.round(t*o),o<1&&requestAnimationFrame(i)};requestAnimationFrame(i)}function ln({result:e,xp:t,gems:r=0,title:i,subtitle:a}){let o=Math.round(e.accuracy*100),s=Math.floor(e.seconds/60),c=String(e.seconds%60).padStart(2,`0`);return{html:`
      <div class="complete__art">${n({xp:t.total})}</div>
      <h1>${p(i??(e.perfect?`Perfect lesson!`:`Lesson complete!`))}</h1>
      <p class="complete__sub muted">${p(a??(e.perfect?`Not a single mistake. Weebale nnyo!`:`Weebale! Every lesson makes the words stick.`))}</p>
      <div class="complete__stats">
        <div class="complete__stat complete__stat--xp"><span>Total XP</span><strong>${f(`bolt`,{size:20})}<b data-count="${t.total}">0</b></strong></div>
        <div class="complete__stat complete__stat--acc"><span>${o===100?`Perfect`:o>=80?`Amazing`:o>=60?`Good`:`Accuracy`}</span><strong>${f(`target`,{size:20})}${o}%</strong></div>
        <div class="complete__stat complete__stat--time"><span>Time</span><strong>${f(`clock`,{size:20})}${s}:${c}</strong></div>
      </div>
      <ul class="complete__parts">${t.parts.map(e=>`<li><span>${p(e.label)}</span><span>+${e.xp} XP</span></li>`).join(``)}${r?`<li class="complete__gems"><span>${f(`gem`,{size:16})} Gems</span><span>+${r}</span></li>`:``}</ul>`,after(e){e.querySelectorAll(`[data-count]`).forEach(e=>cn(e,Number(e.dataset.count))),Q()}}}function un({goalAfter:t}){return{html:`
      <div class="complete__art complete__art--small">${e({pose:`cheering`})}</div>
      <h1>Daily goal met!</h1>
      <div class="complete__ring">${g(1,{size:140,stroke:12,content:`<strong class="complete__ring-num">${t.today}</strong><span>XP today</span>`,label:`Daily goal`})}</div>
      <p class="complete__sub muted">You reached your ${t.goal} XP goal. Come back tomorrow to keep learning.</p>`,after:()=>Q()}}function dn({streak:e}){let t=Ce(e.current),n=e.milestone?`A ${e.milestone} day milestone. Amazing commitment!`:e.current===1?`Your streak starts today. Come back tomorrow to grow it.`:`You’ve learned ${e.current} days in a row.${t?` ${t-e.current} more to reach ${t}!`:``}`;return{html:`
      <div class="complete__art">${i({days:e.current})}</div>
      <h1>${e.current} day streak!</h1>
      <p class="complete__sub muted">${n}</p>`,after:()=>e.milestone&&Q()}}function fn(e){let t=e.map(e=>{let t=Yt.find(t=>t.id===e.id);return`<li class="unlock">
      ${on({shape:t.shape,iconName:t.icon,tier:e.tier,size:88,label:`${t.title} level ${e.tier}`})}
      <div><strong>${p(t.title)}</strong><p class="muted">${p(e.description)}</p><span class="pill pill--blue">${f(`gem`,{size:14})} +${e.gems} gems</span></div>
    </li>`});return{html:`
      <h1>Achievement${e.length>1?`s`:``} unlocked!</h1>
      <ul class="unlocks">${t.join(``)}</ul>`,after:()=>Q()}}function pn(e,t){let n=[ln(t)];t.streak?.extended&&n.push(dn(t)),!t.goalBefore.met&&t.goalAfter.met&&n.push(un(t)),t.achievements?.length&&n.push(fn(t.achievements));for(let e of sn){let r=e(t);r&&n.push(r)}let r=0;function i(){let a=n[r];e.innerHTML=`
      <div class="complete">
        ${a.html}
        <div class="complete__actions">${m({label:`Continue`,size:`lg`,block:!0,attrs:`data-continue`})}</div>
      </div>`,a.after?.(e);let o=e.querySelector(`[data-continue]`);o.focus(),o.addEventListener(`click`,()=>{r+=1,r<n.length?i():t.onDone()})}i()}var mn=[`Nice!`,`Great job!`,`Correct!`,`Kale!`,`Well done!`,`Excellent!`];function hn({root:t,exercises:n,onQuit:r,onFinish:i,hearts:a=!1,navigate:o}){let s=Nt(n),c=null,l=`answer`,u=!1;t.innerHTML=`
    <div class="lesson">
      <header class="lesson__top">
        <button class="icon-btn" type="button" data-quit aria-label="Quit lesson">${f(`close`)}</button>
        <div class="lesson__progress" data-progress></div>
        <div class="lesson__extra" data-extra></div>
      </header>
      <main class="lesson__stage" data-stage aria-live="polite"></main>
      <footer class="lesson__footer" data-footer>
        <div class="lesson__feedback" data-feedback></div>
        <div class="lesson__actions">${m({label:`Check`,size:`lg`,block:!0,disabled:!0,attrs:`data-main`})}</div>
      </footer>
    </div>`;let d=t.querySelector(`[data-stage]`),g=t.querySelector(`[data-footer]`),_=t.querySelector(`[data-feedback]`),v=t.querySelector(`[data-main]`),y=v.querySelector(`span`);function b(e=!1){if(!a)return;let{count:n}=E(T.get());t.querySelector(`[data-extra]`).innerHTML=`<span class="lesson__hearts${e?` is-lost`:``}" aria-label="${n} hearts left">${f(`heart`,{size:26})}<span>${n}</span></span>`}function ee(){t.querySelector(`[data-progress]`).innerHTML=h(s.progress,{label:`Lesson progress`})}let te={setReady(e,{hideCheck:t=!1}={}){v.disabled=!e,g.classList.toggle(`is-hidden`,t)},locked:()=>u,complete(e){s.answer(e),C()},miss(e){s.noteMiss(e)}};function ne(){let e=s.current;l=`answer`,u=!1,g.className=`lesson__footer`,_.innerHTML=``,y.textContent=e.type===`intro`?`Continue`:`Check`,v.className=`btn btn--primary btn--lg btn--block`,d.innerHTML=`<div class="lesson__exercise" data-ex></div>`,c=Ht[e.type](e,d.querySelector(`[data-ex]`),te),ee(),d.querySelector(`button, input, textarea`)?.focus({preventScroll:!0})}function S(){let e=s.current,{correct:t,answerText:n,note:r}=c.check();u=!0,t===null?(s.answer(null),C()):(s.answer(t),!t&&a&&(T.update(e=>me(e)),b(!0)),l=`feedback`,g.className=`lesson__footer lesson__footer--${t?`good`:`bad`}`,_.innerHTML=t?`<div class="fb"><span class="fb__icon">${f(`check`,{size:26})}</span><div><strong>${r?p(r):mn[Math.floor(Math.random()*mn.length)]}</strong>${(e.type===`translate`||r)&&n?`<p class="fb__answer">${p(n)}</p>`:``}</div></div>`:`<div class="fb"><span class="fb__icon">${f(`cross`,{size:26})}</span><div><strong>Correct answer:</strong><p class="fb__answer" ${e.lang===`lg`?`lang="lg"`:``}>${p(n??``)}</p></div></div>`,y.textContent=`Continue`,v.className=`btn btn--${t?`success`:`danger`} btn--lg btn--block`,v.disabled=!1,v.focus({preventScroll:!0}),ee())}async function C(){if(a&&E(T.get()).count===0){if(!await gn({navigate:o,onQuit:r}))return;b()}s.next(),s.done?i(s.result()):ne()}v.addEventListener(`click`,()=>{v.disabled||(l===`answer`?S():C())});async function re(){await x({title:`Wait, don’t go!`,body:`<p>You’ll lose your progress in this lesson if you quit now.</p>`,art:e({pose:`sad`}),actions:[{label:`Keep learning`,value:`stay`},{label:`End session`,value:`quit`,variant:`ghost`}]})===`quit`&&r()}t.querySelector(`[data-quit]`).addEventListener(`click`,re);function ie(e){document.querySelector(`.modal-backdrop`)||e.target.matches(`input, textarea`)&&e.key!==`Enter`||(e.key===`Enter`&&!v.disabled&&e.target.tagName!==`BUTTON`?(e.preventDefault(),v.click()):l===`answer`&&!e.target.matches(`input, textarea`)&&c.keydown?.(e)&&e.preventDefault())}return document.addEventListener(`keydown`,ie),b(),ne(),{extraEl:t.querySelector(`[data-extra]`),cleanup:()=>document.removeEventListener(`keydown`,ie)}}async function gn({navigate:t,onQuit:n}){let r=T.get(),i=E(r),a=r.gems>=40,o=await x({title:`You’re out of hearts`,body:`<p>Your next heart arrives in ${_e(i.nextAt-Date.now())}.</p><p>Practise words you know to earn hearts back${a?`, or refill now for 40 gems`:``}.</p>`,art:e({pose:`sad`}),dismissible:!1,actions:[...a?[{label:`Refill for 40 gems`,value:`refill`,variant:`blue`}]:[],{label:`Practise to earn hearts`,value:`practice`,variant:a?`secondary`:`primary`},{label:`End lesson`,value:`quit`,variant:`ghost`}]});return o===`refill`?(T.update(e=>{ge(e)}),!0):(o===`practice`?t?.(`/practice`):n(),!1)}function _n(t){let n=E(T.get()),r=T.get().gems>=40;t.innerHTML=`
    <section class="empty-state">
      <div class="empty-state__art">${e({pose:`sad`})}</div>
      <h1>Out of hearts</h1>
      <p class="muted">Your next heart arrives in ${_e(n.nextAt-Date.now())}. Practise to earn hearts now${r?`, or refill for 40 gems`:``}.</p>
      ${r?m({label:`Refill for 40 gems`,variant:`blue`,size:`lg`,attrs:`data-refill`}):``}
      ${m({label:`Practise to earn hearts`,href:`#/practice`,variant:r?`secondary`:`primary`})}
      ${m({label:`Back to the path`,href:`#/learn`,variant:`ghost`})}
    </section>`}function vn({root:e,params:t,navigate:n}){let r=R.lessons[t.id],i=T.get();if(!r||!B(i,t.id)){n(`/learn`,{replace:!0});return}let a=!z(i,r.id);if(E(i).count===0){_n(e),e.querySelector(`[data-refill]`)?.addEventListener(`click`,()=>{T.update(e=>{ge(e)}),vn({root:e,params:t,navigate:n})});return}let o=hn({root:e,hearts:!0,navigate:n,exercises:Mt(r.id,{firstTime:a}),onQuit:()=>n(`/learn`),onFinish:t=>{o.cleanup(),pn(e,{result:t,...$t(r.id,t,{replay:!a}),onDone:()=>n(`/learn`)})}});return o.cleanup}var yn=[`M`,`T`,`W`,`T`,`F`,`S`,`S`];function bn(e,t,n,r){let i=new Date(e,t,1),a=new Date(e,t+1,0).getDate(),o=(i.getDay()+6)%7,s=D(),c=[];for(let e=0;e<o;e+=1)c.push(`<span class="cal__cell cal__cell--empty"></span>`);for(let o=1;o<=a;o+=1){let a=D(new Date(e,t,o)),l=(n.xp.byDay[a]??0)>0,u=r.includes(a),d=[`cal__cell`,l&&`is-active`,u&&`is-frozen`,a===s&&`is-today`].filter(Boolean).join(` `),p=`${i.toLocaleString(`en`,{month:`long`})} ${o}${l?`, practised`:u?`, streak freeze used`:``}`;c.push(`<span class="${d}" aria-label="${p}">${u?f(`snowflake`,{size:14}):o}</span>`)}return c.join(``)}function xn({root:e}){let t=T.get(),n=A(t),r=Ce(n.current),a=new Date,o=a.getFullYear(),s=a.getMonth();function c(){let a=new Date(o,s,1).toLocaleString(`en`,{month:`long`,year:`numeric`});e.innerHTML=`
      <div class="page streak-page">
        <header class="streak-hero">
          <div>
            <p class="eyebrow">Streak</p>
            <h1><strong>${n.current}</strong> day${n.current===1?``:`s`}</h1>
            <p class="muted">${n.doneToday?`You’ve practised today. See you tomorrow!`:n.current?`Finish a lesson today to extend your streak.`:`Finish a lesson to start a streak.`}</p>
          </div>
          <div class="streak-hero__art">${i({days:n.current})}</div>
        </header>

        ${r?`<section class="card streak-next">
          <h2>Next milestone: ${r} days</h2>
          ${h(n.current/r,{label:`Progress to next milestone`,variant:`gold`})}
          <p class="muted">${r-n.current} day${r-n.current===1?``:`s`} to go</p>
        </section>`:``}

        <section class="streak-stats">
          <div class="card"><span class="streak-stats__icon">${f(`flame`,{size:26})}</span><strong>${n.longest}</strong><span class="muted">Longest streak</span></div>
          <div class="card"><span class="streak-stats__icon streak-stats__icon--freeze">${f(`snowflake`,{size:26})}</span><strong>${n.freezes} / 2</strong><span class="muted">Streak freezes</span></div>
        </section>
        ${n.freezes<2?`<p class="streak-shop">A streak freeze covers a day you miss. ${m({label:`Get one in the shop`,href:`#/shop`,variant:`ghost`})}</p>`:``}

        <section class="card cal">
          <header class="cal__head">
            <button class="icon-btn" type="button" data-month="-1" aria-label="Previous month">${f(`back`,{size:20})}</button>
            <h2>${p(a)}</h2>
            <button class="icon-btn" type="button" data-month="1" aria-label="Next month">${f(`arrow`,{size:20})}</button>
          </header>
          <div class="cal__grid" role="grid">
            ${yn.map(e=>`<span class="cal__dow" aria-hidden="true">${e}</span>`).join(``)}
            ${bn(o,s,t,n.frozenDays)}
          </div>
          <p class="cal__legend"><span class="cal__key is-active"></span> Practised <span class="cal__key is-frozen"></span> Freeze used</p>
        </section>
      </div>`}e.addEventListener(`click`,e=>{let t=e.target.closest(`[data-month]`);t&&(s+=Number(t.dataset.month),s<0?(s=11,--o):s>11&&(s=0,o+=1),c())}),c()}function Sn(e,{course:t=R,seed:n,size:r=12,knownIds:i=e}={}){let a=j(n??Date.now()),o=e.map(e=>t.words[e]).filter(Boolean);if(!o.length)return[];let s=[...new Set([...i,...e])].map(e=>t.words[e]).filter(Boolean),c=jt(t,s,t.units.findLast(e=>s.some(t=>t.unit===e.id))?.id??t.units[0].id),l=s.length>=4?s:Object.values(t.words).filter(e=>e.unit===t.units[0].id),u=o.slice(0,8),d=new Set(u.map(e=>e.id)),f=new Set(s.map(e=>e.id)),p=Object.values(t.sentences).map(e=>({...e,wordIds:At(e,s)})).filter(e=>e.wordIds.some(e=>d.has(e))&&e.wordIds.every(e=>f.has(e))),m=[];u.forEach((e,t)=>m.push(Y(e,l,a,t%2?`toEn`:`toLg`))),u.length>=3&&m.push(Et(u,a));for(let[e,t]of a.sample(p,4).entries())m.push(X(t,c,a,e%2?`toLg`:`toEn`));let h=a.pick(p),g=h&&Dt(h,s,a);return g&&m.push(g),p.length?m.push(Z(a.pick(p))):m.push(Z({...u[0],wordIds:[u[0].id]})),a.shuffle(m).slice(0,r)}function Cn(e,{course:t=R,seed:n,knownIds:r}={}){let i=t.units.find(t=>t.id===e).skills.flatMap(e=>e.lessons.flatMap(e=>e.newWords)),a=j(n??Date.now());return Sn(a.shuffle(i),{course:t,seed:a.int(1e9),size:15,knownIds:r??i})}function wn(e){return R.skills[e].lessons.flatMap(e=>e.newWords)}function Tn({root:t}){let n=T.get(),r=H(n),i=G(n).filter(e=>R.words[e]),a=n.mistakes.filter(e=>R.words[e]);if(!r.length){t.innerHTML=`
      <section class="empty-state">
        <div class="empty-state__art">${e({pose:`thinking`})}</div>
        <h1>Nothing to practise yet</h1>
        <p class="muted">Finish your first lesson and the words you learn will show up here for review.</p>
        ${m({label:`Start learning`,href:`#/learn`})}
      </section>`;return}let o=R.units.filter(e=>rt(n,e.id));t.innerHTML=`
    <div class="page">
      <header class="page__header">
        <p class="eyebrow">Practice hub</p>
        <h1>Keep words <strong>fresh.</strong></h1>
        <p class="muted">Practice doesn’t cost hearts, and each session earns one back.</p>
      </header>

      <div class="practice-cards">
        <a class="practice-card practice-card--review" href="#/practice/session?mode=review">
          <span class="practice-card__icon">${f(`target`,{size:30})}</span>
          <span><strong>Review</strong><small>${i.length?`${i.length} word${i.length===1?``:`s`} due today`:`Strengthen your weakest words`}</small></span>
          ${f(`arrow`,{size:22})}
        </a>
        <a class="practice-card practice-card--mistakes${a.length?``:` is-disabled`}" href="${a.length?`#/practice/session?mode=mistakes`:`#/practice`}" ${a.length?``:`aria-disabled="true"`}>
          <span class="practice-card__icon">${f(`cross`,{size:26})}</span>
          <span><strong>Mistakes</strong><small>${a.length?`${a.length} word${a.length===1?``:`s`} to fix`:`No recent mistakes. Nice!`}</small></span>
          ${f(`arrow`,{size:22})}
        </a>
      </div>

      <h2 class="practice-heading">Practise a skill</h2>
      ${o.map(e=>`
        <section class="practice-unit">
          <h3>Unit ${e.index+1} · ${p(e.title)}</h3>
          <ul class="practice-skills">
            ${e.skills.filter(e=>nt(n,e.id).done>0).map(e=>{let t=wn(e.id),r=pt(n,t),a=t.filter(e=>i.includes(e)).length;return`<li><a class="practice-skill" href="#/practice/session?mode=skill&id=${e.id}">
                <span class="practice-skill__icon">${f(e.icon??`star`,{size:22})}</span>
                <span class="practice-skill__body"><strong>${p(e.title)}</strong>${h(r,{label:`${e.title} strength`,variant:r>.6?`success`:`gold`})}</span>
                ${a?`<span class="pill pill--primary">${a} due</span>`:``}
              </a></li>`}).join(``)||`<li class="muted">Finish a lesson in this unit to practise it.</li>`}
          </ul>
        </section>`).join(``)}
    </div>`}function En(e,t){let n=H(e);if(t.mode===`mistakes`)return e.mistakes.filter(e=>R.words[e]);if(t.mode===`skill`&&R.skills[t.id]){let r=wn(t.id).filter(e=>n.includes(e)),i=new Set(G(e));return[...r.filter(e=>i.has(e)),...r.filter(e=>!i.has(e))]}let r=G(e).filter(e=>n.includes(e)),i=ft(e).filter(e=>n.includes(e)&&!r.includes(e)),a=n.filter(e=>!r.includes(e)&&!i.includes(e));return[...r,...i,...a]}function Dn({root:e,query:t,navigate:n}){let r=T.get(),i=Sn(En(r,t),{knownIds:H(r)});if(!i.length){n(`/practice`,{replace:!0});return}let a=hn({root:e,exercises:i,onQuit:()=>n(`/practice`),onFinish:t=>{a.cleanup(),pn(e,{result:t,...$t(null,t,{base:U.practice,practice:!0}),title:`Practice complete!`,subtitle:`You earned a heart back. Those words will stick better now.`,onDone:()=>n(`/practice`)})}});return a.cleanup}function On({root:e,params:t,navigate:n}){let r=T.get(),i=R.units.find(e=>e.id===t.unit);if(!i||!V(r,i.id).complete||E(r).count===0){n(E(r).count===0&&i?`/lesson/${i.skills[0].lessons[0].id}`:`/learn`,{replace:!0});return}let a=`checkpoint-${i.id}`,o=!!r.lessons[a]?.completions,s=hn({root:e,hearts:!0,navigate:n,exercises:Cn(i.id,{knownIds:H(r)}),onQuit:()=>n(`/learn`),onFinish:t=>{s.cleanup(),pn(e,{result:t,...$t(a,t,{base:o?U.replay:U.checkpoint}),title:`Unit ${i.index+1} complete!`,subtitle:`You passed the ${i.title} checkpoint. Weebale nnyo!`,onDone:()=>n(`/learn`)})}});return s.cleanup}function kn(e,t){return e.cosmetic?I({...t.profile.avatar,frame:e.id},{size:56}):`<span class="shop-item__icon shop-item__icon--${e.id}">${f(e.icon,{size:30})}</span>`}function An(e,t){if(e.id===`freeze`)return`${t.streak.freezes} of 2 equipped`;if(e.id===`refill`){let e=E(t);return e.full?`Hearts are full`:`${e.count} of ${e.max} · next in ${_e(e.nextAt-Date.now())}`}return e.cosmetic&&t.inventory[e.id]?t.profile.avatar.frame===e.id?`Equipped`:`Owned`:``}function jn({root:e}){function t(){let t=T.get();e.innerHTML=`
      <div class="page">
        <header class="page__header shop-header">
          <div>
            <p class="eyebrow">Shop</p>
            <h1>Spend your <strong>gems.</strong></h1>
          </div>
          <span class="shop-balance" aria-label="${t.gems} gems">${f(`gem`,{size:26})}${t.gems}</span>
        </header>
        <p class="muted shop-earn">Earn gems by finishing lessons, practising, reaching streak milestones and unlocking achievements.</p>
        <ul class="shop-list">
          ${Gt.map(e=>{let n=qt(t,e),r=e.cosmetic&&t.inventory[e.id],i=r&&t.profile.avatar.frame===e.id,a=m(r?{label:i?`Unequip`:`Equip`,variant:`secondary`,attrs:`data-equip="${e.id}"`}:{label:`${e.price}`,iconName:`gem`,variant:n.ok?`blue`:`secondary`,disabled:!n.ok,attrs:`data-buy="${e.id}" aria-label="Buy ${p(e.title)} for ${e.price} gems${n.ok?``:`, ${n.reason}`}"`});return`<li class="shop-item">
              ${kn(e,t)}
              <div class="shop-item__body">
                <h2>${p(e.title)}</h2>
                <p class="muted">${p(e.description)}</p>
                ${An(e,t)?`<p class="shop-item__note">${p(An(e,t))}</p>`:``}
              </div>
              <div class="shop-item__action">${a}</div>
            </li>`}).join(``)}
        </ul>
      </div>`}e.addEventListener(`click`,e=>{let n=e.target.closest(`[data-buy]`);if(n&&!n.disabled){let e=Gt.find(e=>e.id===n.dataset.buy),r=!1;T.update(t=>{r=Jt(t,e.id)}),b(r?`${e.title} bought!`:`Couldn’t buy that right now.`,{variant:r?`success`:`error`}),t();return}let r=e.target.closest(`[data-equip]`);r&&(T.update(e=>{e.profile.avatar.frame=e.profile.avatar.frame===r.dataset.equip?null:r.dataset.equip}),t())}),t()}function Mn(e){return`<ul class="achievements">
    ${Yt.map(t=>{let n=Xt(e,t);return`<li class="achievement">
        ${on({shape:t.shape,iconName:t.icon,tier:n.tier,size:64,label:`${t.title}, level ${n.tier} of ${n.maxTier}`})}
        <div class="achievement__body">
          <h3>${p(t.title)} <span class="muted">${n.tier?`Level ${n.tier}`:`Locked`}</span></h3>
          <p class="muted">${p(n.next?t.describe(n.next):`All levels complete!`)}</p>
          ${n.next?`${h(n.ratio,{label:`${t.title} progress`,variant:`gold`})}<span class="achievement__count">${n.value} / ${n.next}</span>`:``}
        </div>
      </li>`}).join(``)}
  </ul>`}function Nn({root:e}){let t=T.get(),n=t.profile;e.innerHTML=`
    <div class="page">
      <header class="profile-head">
        ${I(n.avatar,{size:96,label:n.name})}
        <div>
          <h1><strong>${p(n.name)}</strong></h1>
          <p class="muted">Learning Luganda since ${new Date(n.joinedAt).toLocaleDateString(`en`,{month:`long`,year:`numeric`})}</p>
        </div>
      </header>
      <h2 class="profile-section">Achievements</h2>
      ${Mn(t)}
    </div>`}function Pn(e,{size:t=56,current:n=!1,locked:r=!1}={}){return`<span class="tier-shield tier-shield--${M[e].id}${n?` is-current`:``}${r?` is-locked`:``}" style="--size:${t}px" aria-hidden="true">
    <svg class="tier-shield__bg" viewBox="0 0 40 46"><path d="M20 2 L37 8 V22 C37 33 29 40 20 44 C11 40 3 33 3 22 V8 Z"/></svg>
    ${r?f(`lock`,{size:Math.round(t*.36)}):f(`star`,{size:Math.round(t*.42)})}
  </span>`}function Fn(e){let t=Math.floor(e/36e5);return t>=24?`${Math.floor(t/24)} day${t>=48?`s`:``}`:t>=1?`${t} hour${t>1?`s`:``}`:`${Math.max(1,Math.round(e/6e4))} min`}function In(e,t){return`<li class="league-row league-row--${Me(e.rank,t)}${e.me?` is-me`:``}">
    <span class="league-row__rank">${e.rank}</span>
    ${I(e.avatar??{},{size:40,label:e.name})}
    <span class="league-row__name">${p(e.name)}${e.me?` <span class="pill">You</span>`:``}</span>
    <span class="league-row__xp">${e.xp} XP</span>
  </li>`}function Ln(e,t){return`<li class="league-divider league-divider--${t}">${f(t===`promote`?`up`:`down`,{size:14})}${e}</li>`}function Rn(e,t){let n=[];return e.forEach(e=>{n.push(In(e,t)),e.rank===5&&t<M.length-1&&n.push(Ln(`Promotion zone`,`promote`)),e.rank===12&&t>0&&n.push(Ln(`Demotion zone`,`demote`))}),n.join(``)}function zn(e){let t=M[e.tier].name,n=M[e.newTier].name;return x({title:e.result===`promote`?`Promoted to ${n}!`:e.result===`demote`?`Back to ${n}`:`You stay in ${n}`,body:`<p>${p(e.result===`promote`?`You finished #${e.rank} in the ${t} League with ${e.xp} XP. Kale, keep climbing!`:e.result===`demote`?`You finished #${e.rank} with ${e.xp} XP. A few lessons a day will lift you back up.`:`You finished #${e.rank} in the ${t} League with ${e.xp} XP.`)}</p>`,art:`<div class="league-modal__art">${Pn(e.newTier,{size:96,current:!0})}</div>`,actions:[{label:`Continue`,value:!0,variant:`primary`}]})}function Bn({root:t}){T.update(e=>Ne(e));let n=T.get(),{tier:r,week:i}=n.league,a=je(n,i,r),o=a.find(e=>e.me);if(t.innerHTML=`
    <div class="page leagues">
      <header class="leagues__head">
        <ol class="tier-strip" aria-label="Leagues">
          ${M.map((e,t)=>`<li title="${e.name} League">${Pn(t,{size:t===r?64:40,current:t===r,locked:t>r})}</li>`).join(``)}
        </ol>
        <h1>${M[r].name} League</h1>
        <p class="muted">Top 5 move up${r>0?`, bottom 3 move down`:``}. ${f(`clock`,{size:16})} ${Fn(Pe())} left.</p>
        <p class="leagues__rank">You're <strong>#${o.rank}</strong> with ${o.xp} XP this week.</p>
      </header>
      ${o.xp===0?`<div class="card leagues__empty">
              <div class="leagues__empty-art">${e({pose:`cheering`})}</div>
              <div>
                <h2>Earn XP to climb</h2>
                <p class="muted">Every lesson and practice session this week counts toward your league place.</p>
                ${m({label:`Start a lesson`,href:`#/learn`})}
              </div>
            </div>`:``}
      <ol class="league-table">${Rn(a,r)}</ol>
      <p class="caption leagues__note">${f(`info`,{size:14})} Leagues are practice leagues: the other learners are simulated on your device, since Learn Luganda keeps everything offline. Your XP is real.</p>
    </div>`,n.league.pendingResult){let e=n.league.pendingResult;T.update(e=>{e.league.pendingResult=null}),zn(e)}}var Vn=[{path:`/`,view:ze({hasProgress:de}),layout:`bare`,public:!0},{path:`/onboarding`,view:Ye,layout:`bare`,public:!0,title:`Get started`},{path:`/learn`,view:xt,title:`Learn`},{path:`/lesson/:id`,view:vn,layout:`bare`,title:`Lesson`},{path:`/checkpoint/:unit`,view:On,layout:`bare`,title:`Checkpoint`},{path:`/guidebook/:unit`,view:Fe(`Guidebook`,`Unit guidebooks arrive soon.`),title:`Guidebook`},{path:`/streak`,view:xn,title:`Streak`},{path:`/practice`,view:Tn,title:`Practice`},{path:`/practice/session`,view:Dn,layout:`bare`,title:`Practice`},{path:`/leagues`,view:Bn,title:`Leagues`},{path:`/shop`,view:jn,title:`Shop`},{path:`/profile`,view:Nn,title:`Profile`},{path:`/settings`,view:Ve,public:!0,title:`Settings`},{path:`/styleguide`,view:Ie,public:!0,title:`Style guide`}];ne(()=>{let e=T.get(),t=E(e),n=A(e);return{streak:n.current,gems:e.gems,hearts:t.count,maxHearts:t.max,streakToday:n.doneToday}}),T.get().streak.lastDay&&T.update(e=>xe(e)),T.get().profile&&T.update(e=>Ne(e)),T.subscribe(re);var Hn=oe(document.querySelector(`#app`)),$=l({routes:Vn,onChange:e=>{!e.route.public&&!de()?$.navigate(`/onboarding`,{replace:!0}):Hn.render(e,$.navigate)}});$.start();