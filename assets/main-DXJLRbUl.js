import{C as e,S as t,_ as n,a as r,b as i,c as a,h as o,i as s,l as c,m as l,n as u,o as d,p as f,r as p,s as m,t as h,u as g,v as _,x as v,y as ee}from"./illustrations-zkF5YppP.js";function te(e){let t=[],n=e.split(`/`).map(e=>e.startsWith(`:`)?(t.push(e.slice(1)),`([^/]+)`):e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)).join(`/`),r=RegExp(`^${n}/?$`);return e=>{let n=r.exec(e);return n?Object.fromEntries(t.map((e,t)=>[e,decodeURIComponent(n[t+1])])):null}}function ne(e){let[t,n=``]=(e.replace(/^#/,``)||`/`).split(`?`);return{path:t.startsWith(`/`)?t:`/${t}`,query:Object.fromEntries(new URLSearchParams(n))}}function re(e,t){for(let n of e){n.match??=te(n.path);let e=n.match(t);if(e)return{route:n,params:e}}return null}function ie({routes:e,onChange:t,fallback:n=`/`}){function r(){let{path:r,query:a}=ne(window.location.hash),o=re(e,r);o?t({...o,query:a,path:r}):i(n,{replace:!0})}function i(e,{replace:t=!1}={}){let n=`#${e}`;window.location.hash===n?r():t?(window.history.replaceState(null,``,n),r()):window.location.hash=n}return{start(){window.addEventListener(`hashchange`,r),r()},navigate:i,refresh:r}}var ae={home:`<path d="M4 11 L12 4 L20 11 V20 H14 V14 H10 V20 H4 Z"/>`,practice:`<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="12" cy="12" r="3.2"/>`,profile:`<circle cx="12" cy="8" r="4.2"/><path d="M4 21 A8 8 0 0 1 20 21 Z"/>`,shop:`<path d="M5 8 H19 L18 20 H6 Z"/><path d="M9 8 V6.5 A3 3 0 0 1 15 6.5 V8" fill="none" stroke="currentColor" stroke-width="2"/>`,settings:`<circle cx="12" cy="12" r="3.4"/><path d="M12 2.5 L14 6 H10 Z M12 21.5 L10 18 H14 Z M2.5 12 L6 10 V14 Z M21.5 12 L18 14 V10 Z" /><circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/>`,flame:`<path d="M12 2 C12 2 19 9.5 19 14.5 A7 7 0 0 1 5 14.5 C5 9.5 12 2 12 2 Z"/><circle cx="12" cy="15.5" r="3" fill="var(--icon-inner, #fff)" opacity="0.55"/>`,gem:`<path d="M6 4 H18 L22 9 L12 21 L2 9 Z"/><path d="M2 9 H22 M8.5 9 L12 21 L15.5 9" fill="none" stroke="var(--icon-inner, #fff)" stroke-width="1.2" opacity="0.55"/>`,heart:`<path d="M12 21 L3.5 12.5 A4.8 4.8 0 0 1 12 6 A4.8 4.8 0 0 1 20.5 12.5 Z"/>`,bolt:`<path d="M13 2 L4 14 H11 L10 22 L20 9 H13 Z"/>`,close:`<path d="M5 5 L19 19 M19 5 L5 19" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>`,check:`<path d="M4 12.5 L9.5 18 L20 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,cross:`<path d="M6 6 L18 18 M18 6 L6 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`,lock:`<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10 V7.5 A4 4 0 0 1 16 7.5 V10" fill="none" stroke="currentColor" stroke-width="2.2"/>`,star:`<path d="M12 2.5 L14.9 8.6 L21.5 9.3 L16.6 13.8 L18 20.4 L12 17 L6 20.4 L7.4 13.8 L2.5 9.3 L9.1 8.6 Z"/>`,book:`<path d="M3 5 Q7.5 3.5 12 6 V20 Q7.5 17.5 3 19 Z M21 5 Q16.5 3.5 12 6 V20 Q16.5 17.5 21 19 Z"/>`,music:`<path d="M9 17.5 V5.5 L20 3 V15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><circle cx="6.5" cy="17.5" r="3"/><circle cx="17.5" cy="15" r="3"/>`,"music-off":`<path d="M9 17.5 V5.5 L20 3 V15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" opacity="0.45"/><circle cx="6.5" cy="17.5" r="3" opacity="0.45"/><circle cx="17.5" cy="15" r="3" opacity="0.45"/><path d="M3 3 L21 21" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>`,speaker:`<path d="M3 9 H7 L12 5 V19 L7 15 H3 Z"/><path d="M15.5 8.5 A5 5 0 0 1 15.5 15.5 M18 6 A8.5 8.5 0 0 1 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,trophy:`<path d="M7 3 H17 V9 A5 5 0 0 1 7 9 Z"/><path d="M7 5 H4 A3 3 0 0 0 7 10 M17 5 H20 A3 3 0 0 1 17 10" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="10.5" y="13.5" width="3" height="4"/><rect x="7" y="18" width="10" height="3"/>`,arrow:`<path d="M4 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,back:`<path d="M20 12 H5 M11 6 L5 12 L11 18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,snowflake:`<path d="M12 2 V22 M3.3 7 L20.7 17 M3.3 17 L20.7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="12" r="2.6"/>`,stories:`<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8 H16 M8 12 H16 M8 16 H13" stroke="var(--icon-inner, #fff)" stroke-width="1.6" stroke-linecap="round" opacity="0.75"/>`,plus:`<path d="M12 4 V20 M4 12 H20" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>`,up:`<path d="M12 20 V5 M6 11 L12 5 L18 11" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,down:`<path d="M12 4 V19 M6 13 L12 19 L18 13" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,info:`<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="10.8" y="10.5" width="2.4" height="7" rx="1"/><circle cx="12" cy="7.3" r="1.5"/>`,clock:`<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 7 V12 L15.5 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`,target:`<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="1.8"/>`},oe=Object.keys(ae);function y(e,{size:t=24,label:n,className:r=``}={}){let i=ae[e];if(!i)throw Error(`Unknown icon: ${e}`);return`<svg class="icon ${r}" width="${t}" height="${t}" viewBox="0 0 24 24" fill="currentColor" ${n?`role="img" aria-label="${n}"`:`aria-hidden="true" focusable="false"`}>${i}</svg>`}function b(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function x({label:e,variant:t=`primary`,size:n=`md`,href:r,attrs:i=``,block:a=!1,disabled:o=!1,iconName:s}){let c=`btn btn--${t}${n===`lg`?` btn--lg`:``}${a?` btn--block`:``}`,l=`${s?y(s,{size:20}):``}<span>${b(e)}</span>`;return r?`<a class="${c}" href="${r}" ${i}>${l}</a>`:`<button class="${c}" type="button" ${o?`disabled`:``} ${i}>${l}</button>`}function S(e,{label:t=`Progress`,variant:n=`primary`}={}){let r=Math.round(Math.max(0,Math.min(1,e))*100);return`<div class="progress progress--${n}" role="progressbar" aria-label="${b(t)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${r}">
    <div class="progress__fill" style="width:${r}%"></div>
  </div>`}function se(e,{size:t=56,stroke:n=6,content:r=``,label:i=`Progress`}={}){let a=(t-n)/2,o=2*Math.PI*a,s=Math.max(0,Math.min(1,e));return`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label="${b(i)}: ${Math.round(s*100)}%">
    <svg width="${t}" height="${t}" viewBox="0 0 ${t} ${t}" aria-hidden="true">
      <circle cx="${t/2}" cy="${t/2}" r="${a}" class="ring__track" stroke-width="${n}" fill="none"/>
      <circle cx="${t/2}" cy="${t/2}" r="${a}" class="ring__fill" stroke-width="${n}" fill="none"
        stroke-dasharray="${o}" stroke-dashoffset="${o*(1-s)}" transform="rotate(-90 ${t/2} ${t/2})" stroke-linecap="round"/>
    </svg>
    <div class="ring__content">${r}</div>
  </div>`}function ce(e,{variant:t=`neutral`,iconName:n}={}){return`<span class="pill pill--${t}">${n?y(n,{size:16}):``}${b(e)}</span>`}function le(e,{tail:t=`left`}={}){return`<div class="speech speech--${t}">${e}</div>`}var C;function w(e,{variant:t=`neutral`,duration:n=2600}={}){C||(C=document.createElement(`div`),C.className=`toast-host`,C.setAttribute(`role`,`status`),C.setAttribute(`aria-live`,`polite`),document.body.append(C));let r=document.createElement(`div`);r.className=`toast toast--${t}`,r.textContent=e,C.append(r),setTimeout(()=>{r.classList.add(`toast--leaving`),setTimeout(()=>r.remove(),300)},n)}function T({title:e,body:t=``,art:n=``,actions:r=[{label:`OK`,value:`ok`}],dismissible:i=!0}){return new Promise(a=>{let o=document.activeElement,s=document.createElement(`div`);s.className=`modal-backdrop`,s.innerHTML=`
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        ${i?`<button class="icon-btn modal__close" type="button" data-value="" aria-label="Close">${y(`close`,{size:20})}</button>`:``}
        ${n?`<div class="modal__art">${n}</div>`:``}
        <h2 id="modal-title" class="modal__title">${b(e)}</h2>
        ${t?`<div class="modal__body">${t}</div>`:``}
        <div class="modal__actions">
          ${r.map(e=>x({label:e.label,variant:e.variant??`primary`,block:!0,attrs:`data-value="${b(e.value)}"`})).join(``)}
        </div>
      </div>`;function c(e){document.removeEventListener(`keydown`,l),s.remove(),o?.focus?.(),a(e||null)}function l(e){if(e.key===`Escape`&&i&&c(null),e.key===`Tab`){let t=[...s.querySelectorAll(`button, a, input, select, textarea`)],n=t[0],r=t[t.length-1];e.shiftKey&&document.activeElement===n?(e.preventDefault(),r.focus()):!e.shiftKey&&document.activeElement===r&&(e.preventDefault(),n.focus())}}s.addEventListener(`click`,e=>{let t=e.target.closest(`[data-value]`);t?c(t.dataset.value):e.target===s&&i&&c(null)}),document.addEventListener(`keydown`,l),document.body.append(s),s.querySelector(`.modal__actions .btn`)?.focus()})}var E=`#1c1a18`,ue=`#8a857c`,de=`#b9b3a8`,fe=`#e34234`,pe=`#fbfaf8`,me=`#ebe8e2`;function he(){let t=[-150,-118,-90,-62,-30],n=``,r=``;for(let i of t){let[t,a]=e(60,32,i===-90?25:Math.abs(i)>100||Math.abs(i)<80?22:24,i);n+=`M60 32 L${t} ${a} `,r+=`<circle cx="${t}" cy="${a}" r="5.5" fill="${fe}"/>`}return`<path d="${n}" stroke="${E}" stroke-width="5" stroke-linecap="round" fill="none"/>${r}`}function ge(e){return e===`happy`||e===`celebrating`?`<path d="M55 61 Q62 51 69 61" stroke="${E}" stroke-width="4.6" stroke-linecap="round" fill="none"/>`:e===`sleepy`?`<path d="M55 58 Q62 64 69 58" stroke="${E}" stroke-width="4.2" stroke-linecap="round" fill="none"/>`:`<circle cx="62" cy="58" r="4.6" fill="${E}"/>`}function _e(e){return e===`celebrating`?`<path d="M8 30 L16 12 L24 30 Z" fill="${fe}"/>
      <rect x="84" y="84" width="11" height="11" transform="rotate(20 89.5 89.5)" fill="${E}"/>
      <circle cx="12" cy="88" r="5" fill="${fe}"/>`:e===`sleepy`?`<path d="M10 8 H24 L10 22 H24" stroke="${E}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`:``}function ve(e=`idle`){return`${he()}
    <rect x="50" y="70" width="22" height="60" rx="11" fill="${de}"/>
    <path d="M45 74 C38 84 38 94 45 98 C52 94 52 84 49 74 Z" fill="${fe}"/>
    <path d="M36 48 L3 66 L38 72 Z" fill="${ue}"/>
    <circle cx="58" cy="58" r="29" fill="${E}"/>
    <circle cx="65" cy="61" r="14.5" fill="${pe}"/>
    <path d="M52 44 A13 13 0 0 1 78 44 Z" fill="${fe}"/>
    ${ge(e)}
    ${_e(e)}`}function ye(e=`idle`){return`<svg class="brand-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${ve(e)}</svg>`}function be(e=`idle`){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n  <rect width="100" height="100" rx="22" fill="${me}"/>\n  ${ve(e).replace(/\n\s*/g,``)}\n</svg>\n`}var xe=e=>typeof e==`object`&&!!e&&!Array.isArray(e);function Se(e,t){if(!xe(t))return e===void 0?structuredClone(t):e;if(!xe(e))return structuredClone(t);let n={...e};for(let[r,i]of Object.entries(t))n[r]=i===null?e[r]??null:Se(e[r],i);return n}function Ce(){let e=new Map;return{getItem:t=>e.has(t)?e.get(t):null,setItem:(t,n)=>e.set(t,String(n)),removeItem:t=>e.delete(t)}}function we(e){try{let t=e??globalThis.localStorage,n=`__ll_probe__`;return t.setItem(n,`1`),t.removeItem(n),t}catch{return Ce()}}function Te({key:e,version:t,defaults:n,migrations:r={},storage:i}){let a=we(i),o=new Set,s=u();function c(e){let n=e,i=Number(n.version)||0;for(;i<t;)i+=1,r[i]&&(n=r[i](n)),n={...n,version:i};return n}function l(e){if(!xe(e))throw Error(`Saved progress is not an object`);if(Number(e.version)>t)throw Error(`Saved progress is from a newer version of the app`);return Se(c(e),{...n,version:t})}function u(){let r=a.getItem(e);if(r==null)return structuredClone({...n,version:t});try{return l(JSON.parse(r))}catch{return a.setItem(`${e}:corrupt:${Date.now()}`,r),structuredClone({...n,version:t})}}function d(){try{a.setItem(e,JSON.stringify(s))}catch{}}function f(){for(let e of o)e(s)}return{get:()=>s,update(e){let t=structuredClone(s);return s=e(t)??t,d(),f(),s},subscribe(e){return o.add(e),()=>o.delete(e)},reset(){s=structuredClone({...n,version:t}),a.removeItem(e),f()},exportJSON(){return JSON.stringify({app:`learn-luganda`,exportedAt:new Date().toISOString(),data:s},null,2)},importJSON(e){let t;try{t=JSON.parse(e)}catch{throw Error(`That file isn’t valid JSON.`)}if(t?.app!==`learn-luganda`||!xe(t.data))throw Error(`That file isn’t a Learn Luganda progress export.`);return s=l(t.data),d(),f(),s}}}var Ee=`learn-luganda`,De={profile:null,onboarding:{step:0,answers:{}},settings:{sound:!0,soundPack:`playful`,music:!0,haptics:!0,motion:!0,uiLang:null,course:`en-lg`},courses:{},reminders:{on:!1,hour:null,consent:`unasked`,askedAt:null,asks:0,sent:[],hours:Array(24).fill(0)},lessons:{},xp:{total:0,byDay:{}},gems:50,hearts:{count:5,updatedAt:0},streak:{current:0,longest:0,lastDay:null,freezes:0,frozenDays:[]},words:{},mistakes:[],jumps:[],achievements:{},inventory:{},stats:{lessonsCompleted:0,perfectLessons:0,practiceSessions:0,answers:0,correctAnswers:0,secondsLearning:0}},D=Te({key:Ee,version:3,defaults:De,migrations:{2:({league:e,...t})=>t,3:e=>{let{reminder:t=!1,reminderHour:n=19,lastReminder:r=null,...i}=e.settings??{},a=Array(24).fill(0);for(let t of Object.values(e.lessons??{}))t?.lastCompletedAt&&(a[new Date(t.lastCompletedAt).getHours()]+=1);let o={on:!!t,hour:n===19?null:n,consent:t?`granted`:`unasked`,askedAt:null,asks:0,sent:r?[r]:[],hours:a};return{...e,settings:i,reminders:o}}}}),Oe=()=>!!D.get().profile,ke={playful:`Playful`,soft:`Soft`},Ae=`playful`,je=.7,Me={correct:`success`,wrong:`error`,tap:`press`,select:`select`,start:`start`,toggle:`toggle-on`,back:`back`,complete:`complete`,streak:`streak`,unlock:`unlock`,reward:`reward`,achievement:`achievement`,levelup:`level-up`},Ne={tap:8,select:8,correct:20,wrong:[40,60,40],complete:[25,50,25,50,60],streak:[30,50,80],unlock:[20,40,20],reward:[20,40,20],achievement:[25,50,25,50,90],levelup:[25,50,25,50,90]},Pe=[[520,0,.04,`sine`,.12]],Fe=[[784,0,.1,`sine`,.18],[1175,.09,.1,`sine`,.18],[1568,.18,.3,`sine`,.16]],Ie=[[523,0,.12,`triangle`,.2],[659,.11,.12,`triangle`,.2],[784,.22,.12,`triangle`,.2],[1047,.33,.32,`triangle`,.22]],Le={correct:[[660,0,.09,`triangle`,.22],[990,.08,.16,`triangle`,.22]],wrong:[[220,0,.12,`square`,.08],[185,.11,.2,`square`,.08]],tap:Pe,select:Pe,start:Pe,toggle:Pe,back:Pe,complete:Ie,levelup:Ie,streak:[[392,0,.1,`sawtooth`,.08],[587,.09,.1,`sawtooth`,.08],[784,.18,.28,`triangle`,.2]],unlock:Fe,reward:Fe,achievement:Fe},Re=null,ze=new Map,Be=new Map;function Ve(){let e=globalThis.AudioContext??globalThis.webkitAudioContext;return e?(Re??=new e,Re.state===`suspended`&&Re.resume().catch(()=>{}),Re):null}function He(e){let t=Ve();return!t||typeof fetch!=`function`?Promise.resolve(null):fetch(new URL(e,document.baseURI)).then(e=>e.ok?e.arrayBuffer():Promise.reject(Error(e.statusText))).then(e=>t.decodeAudioData(e)).catch(()=>null)}function Ue(e=D.get()){return e.settings?.sound!==!1}function We(e=D.get()){return ke[e.settings?.soundPack]?e.settings.soundPack:Ae}function Ge(){return typeof globalThis.navigator?.vibrate==`function`}function Ke(e=D.get()){let t=!!globalThis.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches;return e.settings?.haptics!==!1&&!t&&Ge()}function qe(e=We()){for(let[t,n]of Object.entries(Me)){let r=`${e}/${t}`;Be.has(r)||Be.set(r,He(`audio/sfx/${e}/${n}.mp3`).then(e=>(e&&ze.set(r,e),e)))}}function Je(e,t){let n=e.currentTime+.01;for(let[r,i,a,o,s]of Le[t]??[]){let t=e.createOscillator(),c=e.createGain();t.type=o,t.frequency.value=r,c.gain.setValueAtTime(1e-4,n+i),c.gain.exponentialRampToValueAtTime(s,n+i+.01),c.gain.exponentialRampToValueAtTime(1e-4,n+i+a),t.connect(c).connect(e.destination),t.start(n+i),t.stop(n+i+a+.02)}}function Ye(e){let t=Ne[e];if(t!==void 0&&Ke())try{navigator.vibrate(t)}catch{}}function O(e){if(!Me[e]||(Ye(e),!Ue()))return;let t=Ve();if(!t)return;let n=We(),r=ze.get(`${n}/${e}`);if(!r){qe(n),Je(t,e);return}let i=t.createBufferSource(),a=t.createGain();i.buffer=r,a.gain.value=je,i.connect(a).connect(t.destination),i.start()}Object.keys(Me);var Xe=`audio/music/amadinda-loop.mp3`,Ze=31.3,Qe=.22,$e=!1,et=!1,tt=null,k=null,nt=0;function rt(e=D.get()){return e.settings?.music!==!1}function it(){return $e&&et&&rt()&&globalThis.document?.visibilityState!==`hidden`}async function at(){let e=Ve();if(!e||k)return;let t=++nt;tt??=He(Xe);let n=await tt;if(n||(tt=null),!n||t!==nt||k||!it())return;let r=e.createBufferSource(),i=e.createGain();r.buffer=n,r.loop=!0,r.loopEnd=Math.min(Ze,n.duration),i.gain.setValueAtTime(1e-4,e.currentTime),i.gain.exponentialRampToValueAtTime(Qe,e.currentTime+1.5),r.connect(i).connect(e.destination),r.start(),k={src:r,amp:i}}function ot(){if(nt++,!k)return;let{src:e,amp:t}=k;k=null;let n=e.context.currentTime;t.gain.cancelScheduledValues(n),t.gain.setValueAtTime(Math.max(t.gain.value,1e-4),n),t.gain.exponentialRampToValueAtTime(1e-4,n+.6),e.stop(n+.65)}function st(){it()?at():ot()}function ct(e){$e=e,st()}function lt(){let e=()=>{et=!0,st(),document.removeEventListener(`pointerdown`,e),document.removeEventListener(`keydown`,e)};document.addEventListener(`pointerdown`,e),document.addEventListener(`keydown`,e),document.addEventListener(`visibilitychange`,st),D.subscribe(st)}function ut(){D.update(e=>{e.settings.music=!rt(e)})}var dt={$schema:`../../../docs/packs/schema/ui-pack.schema.json`,meta:{code:`en`,status:`reviewed`},strings:{app:{name:`Learn Luganda`,shortName:`luganda`,home:`Learn Luganda home`,pageTitle:`{page} · {app}`},nav:{main:`Main`,learn:`Learn`,practice:`Practice`,gems:`Gems`,profile:`Profile`},stats:{streak:{one:`{count} day streak`,other:`{count} day streak`},gems:{one:`{count} gem`,other:`{count} gems`},hearts:{one:`{count} of {max} hearts`,other:`{count} of {max} hearts`}},music:{label:`Background music`,turnOff:`Turn music off`,turnOn:`Turn music on`},picker:{other:`Something else`,course:`{target}, taught in {base}`,guess:{label:`Your languages`,both:`Hey there! I have a hunch you know {language}. Do you speak it, or are you here to learn it?`,learn:`Hey there! Fancy learning {language}? I know a few good words to start with.`,speak:`Hello there! Do you read {language}? I can teach you from it.`,learnIt:`Teach me {language}`,learnDetail:`Start from the very first greeting.`,speakIt:`I speak {language}`,speakDetail:`Use {native} for the lessons.`},base:{label:`Learn it from`,ask:`Lovely choice! Which language should I explain {language} in?`,one:`Lovely choice! I’ll teach you {language} in {base}.`,option:`In {base}`},target:{label:`What to learn`,ask:`Wonderful! Which language shall we learn together?`,none:`Courses taught in {language} are still on their way. Until then, any of these could be your first:`},pick:{say:`No problem! Tell me which languages are yours.`,speak:`I speak`,learn:`I want to learn`}},settings:{languages:{title:`Languages`,ui:`App language`,uiHint:`The language for menus, buttons and explanations.`,automatic:`Automatic ({language})`,course:`Course`,courseHint:`Each course keeps its own progress. Your XP, streak and gems stay with you.`,switched:`Now learning {target}.`}}}};function ft(e){if(typeof e!=`object`||!e||Object.isFrozen(e))return e;for(let t of Object.values(e))ft(t);return Object.freeze(e)}var pt=/\{(\w+)\}/g,mt=e=>typeof e==`object`&&!!e&&!Array.isArray(e)&&typeof e.other==`string`;function ht(e,t){let n=e;for(let e of t.split(`.`)){if(typeof n!=`object`||!n)return;n=n[e]}return typeof n==`string`||mt(n)?n:void 0}function gt(e){try{return new Intl.PluralRules(e)}catch{return new Intl.PluralRules(`en`)}}function _t(e){try{return new Intl.NumberFormat(e)}catch{return new Intl.NumberFormat(`en`)}}function vt(e,t={},n=`en`){let r=e;if(mt(e)){let i=Number(t.count??0);r=e[i===0&&e.zero?`zero`:gt(n).select(i)]??e.other}let i=_t(n);return r.replace(pt,(e,n)=>{if(!(n in t))return e;let r=t[n];return typeof r==`number`?i.format(r):String(r)})}function yt(e,t,n=`en`){let r=new Map(t.map(e=>[e.toLowerCase(),e]));for(let t of e??[]){let e=String(t).toLowerCase();if(r.has(e))return r.get(e);let n=e.split(`-`)[0];if(r.has(n))return r.get(n)}return n}var bt=ft({$schema:`../../docs/packs/schema/languages.schema.json`,$comment:"Every language the app knows how to name and greet in. A language only becomes selectable once a UI pack (src/packs/ui/<code>.json) or a course pack (src/packs/courses/<from>-<to>/) exists for it. `code` is a BCP 47 language tag; `dir` is the text direction.",languages:[{code:`en`,name:`English`,nativeName:`English`,greeting:`Hello`,dir:`ltr`},{code:`lg`,name:`Luganda`,nativeName:`Luganda`,greeting:`Oli otya`,dir:`ltr`},{code:`sw`,name:`Swahili`,nativeName:`Kiswahili`,greeting:`Habari`,dir:`ltr`},{code:`nyn`,name:`Runyankore`,nativeName:`Runyankore`,greeting:`Agandi`,dir:`ltr`},{code:`rw`,name:`Kinyarwanda`,nativeName:`Ikinyarwanda`,greeting:`Muraho`,dir:`ltr`},{code:`ha`,name:`Hausa`,nativeName:`Hausa`,greeting:`Sannu`,dir:`ltr`},{code:`yo`,name:`Yoruba`,nativeName:`Yorùbá`,greeting:`Báwo ni`,dir:`ltr`},{code:`ig`,name:`Igbo`,nativeName:`Igbo`,greeting:`Ndewo`,dir:`ltr`},{code:`tw`,name:`Twi`,nativeName:`Twi`,greeting:`Akwaaba`,dir:`ltr`},{code:`wo`,name:`Wolof`,nativeName:`Wolof`,greeting:`Na nga def`,dir:`ltr`},{code:`am`,name:`Amharic`,nativeName:`አማርኛ`,greeting:`ሰላም`,dir:`ltr`},{code:`om`,name:`Oromo`,nativeName:`Afaan Oromoo`,greeting:`Akkam`,dir:`ltr`},{code:`ln`,name:`Lingala`,nativeName:`Lingála`,greeting:`Mbote`,dir:`ltr`},{code:`zu`,name:`Zulu`,nativeName:`isiZulu`,greeting:`Sawubona`,dir:`ltr`},{code:`xh`,name:`Xhosa`,nativeName:`isiXhosa`,greeting:`Molo`,dir:`ltr`},{code:`st`,name:`Sesotho`,nativeName:`Sesotho`,greeting:`Dumela`,dir:`ltr`},{code:`sn`,name:`Shona`,nativeName:`chiShona`,greeting:`Mhoro`,dir:`ltr`},{code:`ny`,name:`Chichewa`,nativeName:`Chichewa`,greeting:`Moni`,dir:`ltr`},{code:`mg`,name:`Malagasy`,nativeName:`Malagasy`,greeting:`Manao ahoana`,dir:`ltr`},{code:`af`,name:`Afrikaans`,nativeName:`Afrikaans`,greeting:`Hallo`,dir:`ltr`},{code:`fr`,name:`French`,nativeName:`Français`,greeting:`Bonjour`,dir:`ltr`},{code:`pt`,name:`Portuguese`,nativeName:`Português`,greeting:`Olá`,dir:`ltr`},{code:`ar`,name:`Arabic`,nativeName:`العربية`,greeting:`مرحبا`,dir:`rtl`}]}.languages),xt=new Map(bt.map(e=>[e.code,e]));function A(e){return xt.get(e)??Object.freeze({code:e,name:e,nativeName:e,greeting:``,dir:`ltr`})}var St=ft(dt),Ct=Object.assign({}),wt=e=>e.match(/([^/]+)\.json$/)[1],Tt=Object.fromEntries(Object.entries(Ct).map(([e,t])=>[wt(e),t])),Et=Object.freeze([`en`,...Object.keys(Tt).sort()]),j=St,Dt=new Set;function Ot(e=globalThis.navigator?.languages??[globalThis.navigator?.language].filter(Boolean)){return yt(e,Et,`en`)}async function kt(e){let t=St;if(e!==`en`&&Tt[e])try{t=ft(await Tt[e]())}catch{t=St}let n=t!==j;if(j=t,typeof document<`u`&&(document.documentElement.lang=j.meta.code,document.documentElement.dir=A(j.meta.code).dir),n)for(let e of Dt)e(j.meta.code);return j.meta.code}function M(e,t){let n=ht(j.strings,e)??ht(St.strings,e);return n===void 0?e:vt(n,t,j.meta.code)}var At=[{path:`/learn`,label:`nav.learn`,icon:`home`},{path:`/practice`,label:`nav.practice`,icon:`practice`},{path:`/shop`,label:`nav.gems`,icon:`gem`},{path:`/profile`,label:`nav.profile`,icon:`profile`}],jt=()=>({streak:0,gems:0,hearts:5,maxHearts:5,streakToday:!1});function Mt(e){jt=e}function Nt(e,t,n,r=``){return`<a class="stat stat--${e} ${r}" href="#/${e===`streak`?`streak`:`shop`}" aria-label="${b(n)}">
    ${y(e===`streak`?`flame`:e===`gems`?`gem`:`heart`,{size:22})}<span>${b(t)}</span>
  </a>`}function Pt(){let e=jt();return`
    ${Nt(`streak`,e.streak,M(`stats.streak`,{count:e.streak}),e.streakToday?``:`stat--dim`)}
    ${Nt(`gems`,e.gems,M(`stats.gems`,{count:e.gems}))}
    ${Nt(`hearts`,e.hearts,M(`stats.hearts`,{count:e.hearts,max:e.maxHearts}))}`}function Ft(){let e=rt();return`<button class="icon-btn topbar__music" type="button" data-music-toggle aria-pressed="${e}" aria-label="${b(M(`music.label`))}" title="${b(M(e?`music.turnOff`:`music.turnOn`))}">${y(e?`music`:`music-off`,{size:22})}</button>`}function It(){let e=document.querySelector(`[data-music-toggle]`);e&&e.getAttribute(`aria-pressed`)!==String(rt())&&(e.outerHTML=Ft())}function Lt(){let e=document.querySelector(`[data-topbar-stats]`);e&&(e.innerHTML=Pt())}function Rt(e){return At.map(t=>`<a class="nav__link${e.startsWith(t.path)?` is-active`:``}" href="#${t.path}" ${e.startsWith(t.path)?`aria-current="page"`:``}>
      ${y(t.icon,{size:26})}<span>${b(M(t.label))}</span></a>`).join(``)}function zt(e){return`
    <div class="layout">
      <nav class="nav" aria-label="${b(M(`nav.main`))}">
        <a class="nav__brand" href="#/learn" aria-label="${b(M(`app.home`))}">
          <span class="nav__mark" data-brand data-mood="idle">${ye()}</span><span>${b(M(`app.shortName`))}</span>
        </a>
        ${Rt(e)}
      </nav>
      <div class="layout__main">
        <header class="topbar">
          <a class="topbar__brand" href="#/learn" aria-label="${b(M(`app.home`))}" data-brand data-mood="idle">${ye()}</a>
          <div class="topbar__stats" data-topbar-stats>${Pt()}</div>
          ${Ft()}
        </header>
        <main id="view" class="view" tabindex="-1"></main>
      </div>
    </div>`}function Bt(e){let t=null,n=null;return{render({route:r,params:i,query:a,path:o},s){typeof t==`function`&&t(),t=null;let c=r.layout??`app`,l;c===`app`?(e.innerHTML=zt(o),l=e.querySelector(`#view`)):(e.innerHTML=`<main id="view" class="view view--bare" tabindex="-1"></main>`,l=e.querySelector(`#view`)),n=c,document.title=r.title?M(`app.pageTitle`,{page:r.title,app:M(`app.name`)}):M(`app.name`),window.scrollTo(0,0),t=r.view({root:l,params:i,query:a,path:o,navigate:s})??null,n&&document.activeElement===document.body&&l.focus({preventScroll:!0})}}}function N(e=new Date){let t=new Date(e),n=String(t.getMonth()+1).padStart(2,`0`),r=String(t.getDate()).padStart(2,`0`);return`${t.getFullYear()}-${n}-${r}`}function Vt(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function Ht(e,t){let n=Vt(t)-Vt(e);return Math.round(n/864e5)}function P(e,t){let n=Vt(e);return n.setDate(n.getDate()+t),N(n)}var Ut=[0,1,3,7,14,30];function Wt(e,t,n,r=N()){let i=e.words[t]??{box:0,due:r,seen:0,correct:0,wrong:0,lastSeen:null};return i.seen+=1,n?(i.correct+=1,i.box=Math.min(Ut.length-1,i.box+1)):(i.wrong+=1,i.box=1),i.due=P(r,Ut[i.box]),i.lastSeen=r,e.words[t]=i,e}function Gt(e,{wordIds:t=[],missed:n={}},r=N()){for(let i of t)Wt(e,i,!n[i],r);let i=Object.keys(n);return i.length&&(e.mistakes=[...i,...e.mistakes.filter(e=>!n[e])].slice(0,40)),e}function Kt(e,{wordIds:t=[],missed:n={}}){return e.mistakes=e.mistakes.filter(e=>!t.includes(e)||n[e]),e}function qt(e,t=N()){return!!e&&Ht(e.due,t)>=0}function Jt(e,t=N()){return Object.entries(e.words).filter(([,e])=>qt(e,t)).sort(([,e],[,t])=>e.due.localeCompare(t.due)||e.box-t.box).map(([e])=>e)}function Yt(e){return Object.entries(e.words).sort(([,e],[,t])=>e.box-t.box||t.wrong-t.correct-(e.wrong-e.correct)).map(([e])=>e)}function Xt(e,t){let n=t.filter(t=>e.words[t]);return n.length?n.reduce((t,n)=>t+e.words[n].box,0)/(n.length*(Ut.length-1)):0}var Zt=144e5;function Qt(e,t=Date.now()){let n=e.hearts;if(n.count>=5)return n.count=5,e;let r=Math.max(0,t-n.updatedAt),i=Math.floor(r/Zt);return i>0&&(n.count=Math.min(5,n.count+i),n.updatedAt=n.count>=5?t:n.updatedAt+i*Zt),e}function F(e,t=Date.now()){let n={hearts:{...e.hearts}};Qt(n,t);let{count:r,updatedAt:i}=n.hearts;return{count:r,max:5,full:r>=5,nextAt:r>=5?null:i+Zt}}function $t(e,t=Date.now()){return Qt(e,t),e.hearts.count>=5&&(e.hearts.updatedAt=t),e.hearts.count=Math.max(0,e.hearts.count-1),e}function en(e,t=1,n=Date.now()){return Qt(e,n),e.hearts.count=Math.min(5,e.hearts.count+t),e.hearts.count>=5&&(e.hearts.updatedAt=n),e}function tn(e,t=Date.now()){return e.gems<40?!1:(e.gems-=40,e.hearts={count:5,updatedAt:t},!0)}function nn(e,{missed:t=[],seen:n=[],learned:r=[],exists:i=()=>!0}={}){let a=new Set(r),o=Yt(e).filter(e=>a.has(e)),s=r.filter(t=>!e.words[t]);return[...new Set([...t,...e.mistakes,...o,...s,...n])].filter(i).slice(0,8)}function rn(e,t,n=Date.now()){return Gt(e,t,N(new Date(n))),Kt(e,t),e.hearts={count:5,updatedAt:n},e}function an(e){let t=Math.max(1,Math.ceil(e/6e4)),n=Math.floor(t/60),r=t%60;return n?`${n}h ${r}m`:`${r}m`}var on=[3,7,14,30,50,100,200,365];function sn(e,t=N()){let n=e.streak;if(!n.lastDay||n.current===0)return e;let r=Ht(n.lastDay,t);if(r<=1)return e;let i=r-1;if(n.freezes>=i){n.freezes-=i;for(let e=1;e<=i;e+=1)n.frozenDays.push(P(n.lastDay,e));n.lastDay=P(t,-1)}else n.current=0;return e}function cn(e,t=N()){sn(e,t);let n=e.streak;return n.lastDay===t&&n.current>0?{extended:!1,current:n.current,milestone:null}:(n.current+=1,n.longest=Math.max(n.longest,n.current),n.lastDay=t,{extended:!0,current:n.current,milestone:on.includes(n.current)?n.current:null})}function I(e,t=N()){let n={streak:{...e.streak,frozenDays:[...e.streak.frozenDays]}};sn(n,t);let r=n.streak,i=r.lastDay===t&&r.current>0;return{current:r.current,longest:Math.max(r.longest,r.current),freezes:r.freezes,doneToday:i,atRisk:!i&&r.current>0,frozenDays:r.frozenDays}}function ln(e){return on.find(t=>t>e)??null}function un({root:e}){e.innerHTML=`
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
          ${x({label:`Continue`})}
          ${x({label:`Secondary`,variant:`secondary`})}
          ${x({label:`Correct`,variant:`success`})}
          ${x({label:`Wrong`,variant:`danger`})}
          ${x({label:`Blue`,variant:`blue`})}
          ${x({label:`Ghost`,variant:`ghost`})}
          ${x({label:`Disabled`,disabled:!0})}
        </div>
        <div class="sg-row">${x({label:`Start lesson`,size:`lg`,iconName:`arrow`})}</div>
        <div class="sg-row">
          <button class="tile" type="button">ssebo</button>
          <button class="tile is-selected" type="button">nnyabo</button>
          <button class="tile is-used" type="button">mukwano</button>
        </div>
      </section>

      <section class="sg-section">
        <h2>Progress</h2>
        ${S(.35)}
        <div class="sg-row">
          ${se(.7,{content:y(`bolt`,{size:22}),label:`Daily goal`})}
          ${se(1,{size:72,content:`<strong>20</strong>`,label:`Daily goal`})}
        </div>
      </section>

      <section class="sg-section">
        <h2>Pills and cards</h2>
        <div class="sg-row">
          ${ce(`New word`,{variant:`primary`})}
          ${ce(`3 day streak`,{variant:`yellow`,iconName:`flame`})}
          ${ce(`Unit 1`,{})}
          ${ce(`Legendary`,{variant:`blue`,iconName:`star`})}
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
          <div class="talk__art">${n({pose:`happy`})}</div>
          ${le(`Oli otya! Let’s learn a few words of <strong>Luganda</strong>.`)}
        </div>
      </section>

      <section class="sg-section">
        <h2>Overlays</h2>
        <div class="sg-row">
          ${x({label:`Open modal`,variant:`secondary`,attrs:`data-sg="modal"`})}
          ${x({label:`Show toast`,variant:`secondary`,attrs:`data-sg="toast"`})}
        </div>
      </section>

      <section class="sg-section">
        <h2>Icons</h2>
        <div class="sg-icons">
          ${oe.map(e=>`<figure>${y(e,{size:28})}<figcaption>${e}</figcaption></figure>`).join(``)}
        </div>
      </section>
    </div>`,e.addEventListener(`click`,async e=>{let t=e.target.closest(`[data-sg]`)?.dataset.sg;t===`toast`&&w(`Weebale! That’s a toast.`),t===`modal`&&w(`You chose: ${await T({title:`Quit lesson?`,body:`<p>You’ll lose your progress in this lesson.</p>`,art:n({pose:`sad`}),actions:[{label:`Keep learning`,value:`stay`},{label:`End session`,value:`quit`,variant:`ghost`}]})??`dismissed`}`)})}function dn(e=D.get()){return e.settings?.motion===!1||!!globalThis.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches}function fn(e=D.get()){document.documentElement.dataset.motion=dn(e)?`reduce`:`full`}var pn={};function mn(e,t=pn,n=1){let r=e.meta.formatVersion??1;if(r>n)throw Error(`Course pack ${e.meta.id} uses format ${r}; this app reads up to ${n}`);let i=e;for(;r<n;){r+=1;let e=t[r];if(!e)throw Error(`No upgrade to pack format ${r}`);i=e(i),i={...i,meta:{...i.meta,formatVersion:r}}}return i}Object.freeze([`newWords`,`match`,`sentences`,`fill`,`dialogues`,`type`,`listen`,`reverse`,`newWordReview`,`earlierReview`]),Object.freeze([`choice`,`match`,`translate`,`fill`,`type`]);var hn=ft({lesson:{steps:[`newWords`,`match`,`sentences`,`fill`,`dialogues`,`type`,`listen`,`reverse`,`newWordReview`,`earlierReview`],maxExercises:18,hearts:!0,introCards:!0,newWords:{directions:[`toTarget`,`toBase`]},match:{pairs:5,minPairs:3},sentences:{directions:[`toBase`,`toTarget`]},fill:{count:1,distractors:2},type:{count:1,direction:`toBase`},listen:{count:2},reverse:{upTo:12,directions:[`toTarget`,`toBase`]},newWordReview:{upTo:10,direction:`toBase`},earlierReview:{count:2}},exercises:{choice:{options:4},translate:{minDistractors:2,maxDistractors:4}},practice:{steps:[`choice`,`match`,`translate`,`fill`,`type`],size:12,focusWords:8,sentences:4,shuffle:!0},checkpoint:{size:15,hearts:!0},sectionTest:{size:15,passMark:.8,hearts:!1},answers:{equivalents:{},ignoreDiacritics:!1,lettersPerTypo:10},stories:{translations:`tap`}}),gn=e=>typeof e==`object`&&!!e&&!Array.isArray(e);function _n(...e){let t={};for(let n of e)if(gn(n))for(let[e,r]of Object.entries(n))t[e]=gn(r)&&gn(t[e])?_n(t[e],r):r;return t}function vn(e,t){return{id:e.id,target:e.target,base:e.base,altTarget:e.altTarget??[],altBase:e.altBase??[],notes:e.notes??``,audio:e.audio??null,unit:t}}function yn(e,t=[{id:`s1`,title:`Course`,level:``,description:``,units:e.map(e=>e.id)}],n={}){let r={},i={},a={},o={},s=[],c=[],l={},u=_n(hn,n.settings),d=e.map((e,t)=>{let n=_n(u,e.settings);for(let t of e.words)r[t.id]=vn(t,e.id);for(let t of e.sentences)i[t.id]=vn(t,e.id);e.guidebook&&(l[e.id]=e.guidebook);for(let t of e.stories??[])c.push({...t,unit:e.id});let d=e.skills.map((t,r)=>{let i={...t,unit:e.id,index:r,lessons:t.lessons.map((r,i)=>{let o={...r,sentences:r.sentences??[],dialogues:r.dialogues??[],settings:r.settings?_n(n,r.settings):n,skill:t.id,unit:e.id,index:i,order:s.length};return a[r.id]=o,s.push(r.id),o})};return o[t.id]=i,i});return{id:e.id,title:e.title,description:e.description,color:e.color,character:e.character,index:t,settings:n,skills:d}}),f=Object.fromEntries(d.map(e=>[e.id,e])),p=t.map(e=>({...e,units:e.units.map(e=>f[e]).filter(Boolean)})).filter(e=>e.units.length).map((e,t)=>{for(let t of e.units)t.section=e.id;return{...e,index:t}});return ft({id:n.id??`course`,version:n.version??1,from:n.from??`en`,to:n.to??`lg`,title:n.title??``,names:n.names??{from:n.from??`en`,to:n.to??`lg`},settings:u,cast:n.cast??{},units:d,sections:p,words:r,sentences:i,lessons:a,skills:o,order:s,stories:c,storyById:Object.fromEntries(c.map(e=>[e.id,e])),guidebooks:l,pack:{meta:n,units:e}})}function bn(e,t,n){let{meta:r,units:i}=mn({meta:e,units:t});return yn(r.sections.flatMap(e=>e.units).map(e=>i[e]).filter(Boolean),r.sections,{...r,names:n??{from:r.from,to:r.to}})}var L=yn([]);function xn(e){return L=e,e}var Sn=(e,t=L)=>e===`target`?t.to:t.from,R=(e,t=L)=>` lang="${Sn(e,t)}"`;function Cn(e=L){return{sections:e.sections.length,units:e.units.length,lessons:e.order.length,words:Object.keys(e.words).length,stories:e.stories.length}}function wn(e,t=L){let n=t.lessons[e]?.order??-1,r=[];for(let e=0;e<=n;e+=1)r.push(...t.lessons[t.order[e]].newWords);return r}var Tn=(e,t=L)=>e===`target`?t.names.to:t.names.from;function En(e,t=L){let n=t.cast[e],r=typeof n?.look==`object`?{extras:[],...n.look,id:`${t.id}-${e}`}:g[n?.look??e];if(!r)return{id:e,name:n?.name??e,role:n?.role??``,look:g.nakato};let i=n?.name??r.name;return{id:e,name:i,role:n?.role??r.role??``,look:{...r,name:i}}}var z={name:`Learn Luganda`,contactEmail:``,repoUrl:`https://github.com/Jehoshaphat-Obol/Learn-Luganda`,issuesUrl:`https://github.com/Jehoshaphat-Obol/Learn-Luganda/issues/new`},Dn=[{path:`/about`,label:`About`},{path:`/contact`,label:`Contact`},{path:`/privacy`,label:`Privacy`},{path:`/terms`,label:`Terms`}];function On(e=`site-links`){return`<nav class="${e}" aria-label="About this site">${Dn.map(e=>`<a href="#${e.path}">${e.label}</a>`).join(``)}</nav>`}var kn=[{icon:`bolt`,title:`Bite-sized lessons`,text:`Five-minute lessons with pictures, word tiles, listening and matching games.`},{icon:`flame`,title:`Daily streaks`,text:`Practise a little every day. Your streak and daily goal keep you coming back.`},{icon:`heart`,title:`Hearts`,text:`Mistakes cost a heart, so every answer counts. Run out and a quick look back at earlier words fills them up again. You never have to stop learning.`},{icon:`target`,title:`Spaced review`,text:`Words return just before you’d forget them, so they stick for good.`}],An=[[`Oli otya?`,`How are you?`],[`Gyendi`,`I’m fine`],[`Weebale`,`Thank you`],[`Kale`,`Okay`],[`Mukwano`,`Friend`],[`Amazzi`,`Water`],[`Emmere`,`Food`],[`Ssebo`,`Sir`],[`Nnyabo`,`Madam`],[`Webale kujja`,`Welcome`]],jn=(e=Cn())=>[[`Is it free?`,`Yes. Learn Luganda is free, with no ads and no account.`],[`Where is my progress saved?`,`In your browser’s local storage on this device. You can export it to a file and import it on another device from Settings.`],[`Who is it for?`,`Complete beginners, diaspora families reconnecting with the language, and visitors to Uganda who want more than “hello”.`],[`What will I learn first?`,`Greetings, introductions and numbers, then family, food, the market, time, places and more, unit by unit.`],[`How long is the course?`,`${e.units} units in ${e.sections} section${e.sections>1?`s`:``}: ${e.lessons} lessons and ${e.words} words, from first greetings to real conversations. Already know some? Take a section test to jump ahead.`],[`Does it work offline?`,`Once installed, lessons work without a connection.`]],Mn={prompt:`Which one means “thank you”?`,options:[`Oli otya?`,`Weebale`,`Nedda`],answer:`Weebale`};function Nn({hasProgress:e=()=>!1}={}){return function({root:l}){let u=e(),f=x(u?{label:`Continue learning`,size:`lg`,href:`#/learn`}:{label:`Get started`,size:`lg`,href:`#/onboarding`}),h=u?``:x({label:`I already have progress`,variant:`secondary`,size:`lg`,href:`#/settings?import=1`}),_=t(Object.keys(L.cast)).map(e=>En(e)),ee=v(m,3);l.innerHTML=`
      <div class="landing">
        <header class="landing__header">
          <a class="landing__brand" href="#/">${ye()}<span>luganda</span></a>
          <nav class="landing__links" aria-label="Page">
            <a href="#how">How it works</a>
            <a href="#cast">Meet the cast</a>
            <a href="#faq">FAQ</a>
          </nav>
          ${x({label:u?`Continue`:`Get started`,href:u?`#/learn`:`#/onboarding`})}
        </header>

        <section class="hero">
          <div class="hero__copy">
            <p class="eyebrow">Free · Bite-sized · Fun</p>
            <h1>The playful way to <strong>learn Luganda.</strong></h1>
            <p class="hero__lead">Short, game-like lessons that take you from <em>Oli otya?</em> to real conversations, one day at a time.</p>
            <div class="hero__ctas">${f}${h}</div>
            <p class="caption">okuyiga — v. to learn</p>
          </div>
          <div class="hero__art">${s()}</div>
          <span class="shape shape--circle" aria-hidden="true"></span>
          <span class="shape shape--square" aria-hidden="true"></span>
          <span class="shape shape--triangle" aria-hidden="true"></span>
        </section>

        <div class="ticker" aria-label="Sample words">
          <div class="ticker__track">
            ${[...An,...An].map(([e,t],n)=>`<span class="ticker__item"${n>=An.length?` aria-hidden="true"`:``}><strong>${b(e)}</strong> ${b(t)}</span>`).join(``)}
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
            ${kn.map((e,t)=>`
              <li class="how__step">
                <span class="how__icon how__icon--${t}">${y(e.icon,{size:28})}</span>
                <h3>${e.title}</h3>
                <p>${e.text}</p>
              </li>`).join(``)}
          </ol>
        </section>

        <section class="landing__section try">
          <div class="try__card">
            <p class="eyebrow">Try it</p>
            <h2>${b(Mn.prompt)}</h2>
            <div class="try__options" role="group" aria-label="Answers">
              ${Mn.options.map((e,t)=>`<button class="choice" type="button" data-answer="${b(e)}"><span class="choice__key">${t+1}</span>${b(e)}</button>`).join(``)}
            </div>
            <p class="try__feedback" aria-live="polite"></p>
          </div>
          <div class="try__art" data-try-art>${n({pose:`thinking`})}</div>
        </section>

        <section class="landing__section showcase">
          <article class="showcase__item">
            <div class="showcase__art">${d({days:7})}</div>
            <h3>Keep your <strong>streak</strong> alive</h3>
            <p class="muted">Hit your daily goal to grow your streak. Busy day? A streak freeze has your back.</p>
          </article>
          <article class="showcase__item">
            <div class="showcase__art">${r({xp:20})}</div>
            <h3>Earn <strong>XP</strong> and unlock achievements</h3>
            <p class="muted">Every lesson earns XP. Hit milestones to unlock achievement badges and earn gems. Gems are never sold: you earn every one.</p>
          </article>
        </section>

        <section class="landing__section cast" id="cast">
          <p class="eyebrow">Meet the cast</p>
          <h2>Friends who’ll <strong>talk with you.</strong></h2>
          <div class="cast__grid">
            ${_.map(e=>`
              <figure class="cast__item">
                <div class="cast__art">${o(e.look,{expression:i([`happy`,`happy`,`wink`,`neutral`,`surprised`])})}</div>
                <figcaption><strong>${b(e.name)}</strong><span>${b(e.role)}</span></figcaption>
              </figure>`).join(``)}
          </div>
        </section>

        <section class="landing__section places">
          <p class="eyebrow">Out and about</p>
          <h2>Practise where <strong>Luganda lives.</strong></h2>
          <div class="places__grid">
            ${ee.map(e=>`
              <figure class="places__item">
                <div class="places__art">${c(e,{cast:v(Object.keys(g),2),pose:p(`greet`)})}</div>
                <figcaption>${b(a(e).name)}</figcaption>
              </figure>`).join(``)}
          </div>
        </section>

        <section class="landing__section faq" id="faq">
          <p class="eyebrow">Questions</p>
          <h2>Good to <strong>know.</strong></h2>
          <div class="faq__list">
            ${jn().map(([e,t])=>`<details class="faq__item"><summary>${b(e)}</summary><p>${b(t)}</p></details>`).join(``)}
          </div>
        </section>

        <section class="final-cta">
          <div class="final-cta__art">${n({pose:p(`celebrate`)})}</div>
          <h2>Ready? <strong>Tandika!</strong></h2>
          <p class="caption">tandika — v. start, begin</p>
          ${f}
        </section>

        <footer class="landing__footer">
          <span class="landing__brand">${ye()}<span>luganda</span></span>
          <p>Made with care for Luganda learners. Your progress stays on your device.</p>
          <p class="caption">Weebale nnyo — thank you very much.</p>
          ${On()}
        </footer>
      </div>`,l.addEventListener(`click`,e=>{let t=e.target.closest(`a[href^="#"]:not([href^="#/"])`);if(t){e.preventDefault(),l.querySelector(t.getAttribute(`href`))?.scrollIntoView({behavior:dn()?`auto`:`smooth`});return}let r=e.target.closest(`[data-answer]`);if(!r)return;let i=r.dataset.answer===Mn.answer;l.querySelectorAll(`[data-answer]`).forEach(e=>e.classList.remove(`is-correct`,`is-wrong`)),r.classList.add(i?`is-correct`:`is-wrong`),l.querySelector(`.try__feedback`).innerHTML=i?`${y(`check`,{size:18})} Correct! <em>Weebale</em> means thank you.`:`${y(`cross`,{size:18})} Not quite. Try again!`,l.querySelector(`.try__feedback`).className=`try__feedback try__feedback--${i?`good`:`bad`}`,l.querySelector(`[data-try-art]`).innerHTML=n({pose:i?p(`celebrate`):`sad`})})}}var Pn=[{xp:10,label:`Casual`,minutes:5},{xp:20,label:`Regular`,minutes:10},{xp:30,label:`Serious`,minutes:15},{xp:50,label:`Intense`,minutes:20}],Fn=[`vermillion`,`ink`,`butter`,`sky`,`sage`,`lilac`,`blush`];function In({name:e,avatar:t,dailyGoal:n=20,motivation:r=null,level:i=`new`},a=new Date){return{name:String(e??``).trim().slice(0,30)||`Learner`,avatar:{character:t?.character??`nakato`,color:t?.color??`vermillion`},dailyGoal:n,motivation:r,level:i,joinedAt:N(a)}}function Ln(e){D.update(t=>{t.profile=t.profile?{...t.profile,...e,avatar:{...t.profile.avatar,...e.avatar}}:In(e)})}function B({character:e=`nakato`,color:t=`vermillion`,frame:n}={},{size:r=48,label:i=``}={}){return`<span class="avatar avatar--${b(t)}${n?` avatar--${b(n)}`:``}" style="--avatar-size:${r}px"${i?` title="${b(i)}"`:``}>
    ${o(e,{shape:`circle`,expression:`happy`,label:i||`Avatar`})}
  </span>`}var V=null;window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),V=e}),window.addEventListener(`appinstalled`,()=>{V=null});var Rn=()=>!!V;async function zn(){if(!V)return!1;V.prompt();let{outcome:e}=await V.userChoice;return V=null,e===`accepted`}function Bn(){`serviceWorker`in navigator&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`./sw.js`).catch(()=>{})})}var Vn=[`var(--color-primary)`,`var(--color-ink-900)`,`var(--color-gold)`,`var(--color-paper-400)`,`var(--color-vermillion-300)`],Hn=[`circle`,`square`,`triangle`,`half`];function Un(e=document.body,{count:t=48,duration:n=2600}={}){if(dn())return;let r=document.createElement(`div`);r.className=`confetti`,r.setAttribute(`aria-hidden`,`true`);for(let e=0;e<t;e+=1){let t=document.createElement(`i`);t.className=`confetti__piece confetti__piece--${Hn[e%Hn.length]}`,t.style.setProperty(`--x`,`${Math.random()*100}vw`),t.style.setProperty(`--drift`,`${(Math.random()-.5)*30}vw`),t.style.setProperty(`--spin`,`${(Math.random()-.5)*1080}deg`),t.style.setProperty(`--delay`,`${Math.random()*400}ms`),t.style.setProperty(`--size`,`${8+Math.random()*10}px`),t.style.setProperty(`--c`,Vn[e%Vn.length]),r.append(t)}e.append(r),setTimeout(()=>r.remove(),n+500)}var Wn=[`var(--color-paper-300)`,`var(--color-vermillion-300)`,`var(--color-primary)`,`var(--color-gold)`,`var(--color-ink-900)`,`var(--color-bauhaus-blue)`],Gn=[``,`I`,`II`,`III`,`IV`,`V`],Kn={circle:`<circle cx="50" cy="50" r="44"/>`,square:`<rect x="8" y="8" width="84" height="84" rx="10"/>`,triangle:`<path d="M50 4 L96 88 H4 Z"/>`,half:`<path d="M6 70 A44 44 0 0 1 94 70 V92 H6 Z"/>`};function qn({shape:e=`circle`,iconName:t=`star`,tier:n=0,size:r=72,label:i=``}){let a=Wn[Math.min(n,Wn.length-1)];return`<span class="badge${n?``:` badge--locked`}" style="--badge-size:${r}px;--badge-fg:${n===0?`var(--color-ink-500)`:n===3?`var(--color-ink-900)`:`#fff`}" ${i?`role="img" aria-label="${i}"`:`aria-hidden="true"`}>
    <svg viewBox="0 0 100 100" aria-hidden="true"><g fill="${a}">${Kn[e]}</g><circle cx="82" cy="18" r="10" fill="var(--color-surface)" stroke="var(--color-ink-900)" stroke-width="2"/></svg>
    <span class="badge__icon">${y(t,{size:Math.round(r*.38)})}</span>
    ${n?`<span class="badge__tier">${Gn[n]}</span>`:``}
  </span>`}function H(e,t){return(e.lessons[t]?.completions??0)>0}function Jn(e,t=L){return Math.max(-1,...(e.jumps??[]).map(e=>t.sections.findIndex(t=>t.id===e)))}var Yn=(e,t)=>t.sections.findIndex(t=>t.units.some(t=>t.id===e));function Xn(e,t,n=L){let r=n.lessons[t];return!!r&&!H(e,t)&&Yn(r.unit,n)<Jn(e,n)}function U(e,t,n=L){return H(e,t)||Xn(e,t,n)}function Zn(e,t,n){return e.profile?.level===`some`&&t.skill===n.units[0].skills[0].id}function Qn(e,t,n=L){let r=n.lessons[t];return r?r.order===0||U(e,t,n)||Zn(e,r,n)?!0:U(e,n.order[r.order-1],n):!1}function $n(e,t=L){return t.order.find(n=>!U(e,n,t)&&Qn(e,n,t))??null}function er(e,t,n=L){let r=n.skills[t].lessons,i=r.filter(t=>H(e,t.id)).length;return{done:i,total:r.length,complete:i===r.length}}function tr(e,t,n=L){let r=n.units.find(e=>e.id===t).skills.flatMap(e=>e.lessons),i=r.filter(t=>H(e,t.id)).length,a=r.every(t=>U(e,t.id,n));return{done:i,total:r.length,complete:i===r.length,passed:a}}function nr(e,t,n=L){let r=n.sections.find(e=>e.id===t).units.flatMap(e=>e.skills.flatMap(e=>e.lessons)),i=r.filter(t=>H(e,t.id)).length,a=r.filter(t=>U(e,t.id,n)).length;return{done:i,passed:a,total:r.length,complete:a===r.length}}function rr(e,t,n=L){return ar(e,n.sections.find(e=>e.id===t).units[0].id,n)}function ir(e,t,n=L){let r=n.sections.find(e=>e.id===t);return!!r&&r.index>0&&!rr(e,t,n)}function ar(e,t,n=L){return Qn(e,n.units.find(e=>e.id===t).skills[0].lessons[0].id,n)}function W(e,t=L){return t.order.filter(t=>H(e,t)).flatMap(e=>t.lessons[e].newWords)}function or(e,t=L){let n=t.units[t.units.length-1];return!!(n&&e.lessons[`checkpoint-${n.id}`]?.completions)&&t.order.every(n=>U(e,n,t))}var sr=[{id:`wildfire`,title:`Wildfire`,icon:`flame`,shape:`circle`,describe:e=>`Reach a ${e} day streak`,tiers:[3,7,14,30,100],value:e=>e.streak.longest},{id:`sage`,title:`Sage`,icon:`bolt`,shape:`square`,describe:e=>`Earn ${e} XP`,tiers:[100,250,500,1e3,2500],value:e=>e.xp.total},{id:`scholar`,title:`Scholar`,icon:`book`,shape:`triangle`,describe:e=>`Learn ${e} words`,tiers:[10,25,50,100,200],value:e=>Object.keys(e.words).length},{id:`perfectionist`,title:`Perfectionist`,icon:`star`,shape:`half`,describe:e=>`Finish ${e} lesson${e>1?`s`:``} with no mistakes`,tiers:[1,5,10,25,50],value:e=>e.stats.perfectLessons},{id:`reviewer`,title:`Sharp Mind`,icon:`target`,shape:`circle`,describe:e=>`Complete ${e} practice session${e>1?`s`:``}`,tiers:[1,5,10,25,50],value:e=>e.stats.practiceSessions??0},{id:`explorer`,title:`Explorer`,icon:`trophy`,shape:`square`,describe:e=>`Complete ${e} unit${e>1?`s`:``}`,tiers:[1,2,4,6,8],value:(e,t=L)=>t.units.filter(n=>tr(e,n.id,t).complete).length}];function cr(e,t){let n=t.value(e),r=t.tiers.filter(e=>n>=e).length,i=t.tiers[r]??null,a=t.tiers[r-1]??0;return{value:n,tier:r,maxTier:t.tiers.length,next:i,ratio:i?(n-a)/(i-a):1}}function lr(e){let t=[];for(let n of sr){let{tier:r}=cr(e,n),i=e.achievements[n.id]??0;for(let a=i+1;a<=r;a+=1){let r=10*a;e.gems+=r,t.push({id:n.id,title:n.title,tier:a,gems:r,description:n.describe(n.tiers[a-1])})}r>i&&(e.achievements[n.id]=r)}return t}var ur={BASE_URL:`./`,DEV:!1,MODE:`production`,PROD:!0,SSR:!1},dr=Object.freeze({client:ur.VITE_ADSENSE_CLIENT??``,units:Object.freeze({inFeed:Object.freeze({slot:ur.VITE_ADSENSE_SLOT_IN_FEED??``,format:`fluid`,layoutKey:ur.VITE_ADSENSE_LAYOUT_KEY??``}),display:Object.freeze({slot:ur.VITE_ADSENSE_SLOT_DISPLAY??``,format:`auto`})})}),fr=Object.freeze({inFeed:`inFeed`,display:`display`}),pr={off:{impact:`No ads anywhere.`,placements:{path:!1,stories:!1,complete:!1},graceSessions:1/0,cooldownMinutes:1/0,maxPerDay:0,everyNthSession:1/0,minAccuracy:1,adBreak:{hours:0,perWeek:0,streakDays:1/0,streakHours:0}},gentle:{impact:`About 3 ads a day at most; never in the first 5 lessons; complete-screen ads after every 4th session.`,placements:{path:!0,stories:!1,complete:!0},graceSessions:5,cooldownMinutes:15,maxPerDay:3,everyNthSession:4,minAccuracy:.8,adBreak:{hours:24,perWeek:3,streakDays:7,streakHours:48}},balanced:{impact:`Up to 6 ads a day, at least 8 minutes apart; complete-screen ads after every 3rd session.`,placements:{path:!0,stories:!0,complete:!0},graceSessions:3,cooldownMinutes:8,maxPerDay:6,everyNthSession:3,minAccuracy:.6,adBreak:{hours:12,perWeek:2,streakDays:7,streakHours:24}},generous:{impact:`Up to 10 ads a day, at least 4 minutes apart; complete-screen ads after every 2nd session.`,placements:{path:!0,stories:!0,complete:!0},graceSessions:1,cooldownMinutes:4,maxPerDay:10,everyNthSession:2,minAccuracy:.5,adBreak:{hours:6,perWeek:2,streakDays:7,streakHours:12}}},mr=`gentle`,hr={path:fr.inFeed,stories:fr.inFeed,complete:fr.display};function gr(e){for(let t of Object.values(e))t&&typeof t==`object`&&gr(t);return Object.freeze(e)}function _r(e){let t=pr[e];if(!t)throw Error(`Unknown ad level "${e}"`);let n=Object.fromEntries(Object.entries(hr).map(([e,n])=>[e,{enabled:t.placements[e],type:n}]));return gr({...structuredClone(t),level:e,placements:n})}Object.freeze(Object.keys(pr));var G=_r(mr),vr=`learn-luganda:ads-log`;function yr(e=Date.now()){try{let t=JSON.parse(localStorage.getItem(vr))??{},n=N(new Date(e));return{day:n,shown:t.day===n&&Number(t.shown)||0,last:Number(t.last)||0}}catch{return{day:N(new Date(e)),shown:0,last:0}}}function br(e=Date.now()){let t=yr(e);try{localStorage.setItem(vr,JSON.stringify({day:t.day,shown:t.shown+1,last:e}))}catch{}}var xr=`learn-luganda:ads-consent`;function Sr(){try{let e=localStorage.getItem(xr);return e===`granted`||e===`denied`?e:null}catch{return null}}function Cr(e){try{localStorage.setItem(xr,e)}catch{}}var wr=`learn-luganda:ad-breaks`,Tr=36e5,Er=168*Tr;function Dr(){try{let e=JSON.parse(localStorage.getItem(wr))??{};return{until:Number(e.until)||0,taken:Array.isArray(e.taken)?e.taken.map(Number).filter(Boolean):[]}}catch{return{until:0,taken:[]}}}function Or(e){try{localStorage.setItem(wr,JSON.stringify(e))}catch{}}function kr(e=Date.now()){let{until:t}=Dr();return t>e?t:0}function Ar({streak:e=0,now:t=Date.now(),policy:n=G}={}){let r=n.adBreak,{until:i,taken:a}=Dr(),o=a.filter(e=>t-e<Er).sort((e,t)=>e-t),s=Math.max(0,r.perWeek-o.length),c=e>=r.streakDays;return{active:i>t,until:i>t?i:0,left:s,hours:c?r.streakHours:r.hours,streakBonus:c,nextAt:s?t:o[o.length-r.perWeek]+Er,available:r.perWeek>0&&s>0&&i<=t}}function jr({streak:e=0,now:t=Date.now(),policy:n=G}={}){let r=Ar({streak:e,now:t,policy:n});if(!r.available)return 0;let{taken:i}=Dr(),a=t+r.hours*Tr;return Or({until:a,taken:[...i.filter(e=>t-e<Er),t]}),a}function Mr(){Or({...Dr(),until:0})}var K={cardButton:`Ad break`,cardButtonLabel:`Take a break from ads`,offer:{title:`Fancy an ad break?`,body:`{mascot} here. These sponsored cards pay for my birdseed and keep every lesson free for everyone. Between you and me, I’d rather be teaching than advertising. Want me to shoo them away for {duration}? It’s on the house.`,streak:`Your {streak} day streak earned you the long version.`,left:`Ad breaks left this week: {left}.`,yes:`Clear the skies`,no:`Ads are fine`},done:`Clear skies until {time}. Weebale for keeping me flying!`,none:{title:`All out of ad breaks`,body:`You’ve had all {perWeek} of this week’s breaks. The next one lands {when}. Until then, the sponsored cards keep the lessons free. Weebale for sticking with me!`,ok:`Fair enough`},settings:{title:`Ad breaks`,hint:`Pause ads for {duration}, free. {left} left this week.`,active:`Ads are on a break until {time}.`,take:`Take an ad break`,end:`Bring ads back early`,ended:`Ads are back. Weebale, that helps keep the lessons free!`}};function Nr(e){return e===24?`a whole day`:e===48?`two whole days`:`${e} hours`}var Pr=`Crane`,Fr={title:`{target} — {base}`,review:[`Say it out loud once today.`,`Two minutes of practice keeps it fresh.`,`Tap to practise a few words.`,`A quick review is ready when you are.`],learned:[`One you already know. Can you use it today?`,`Tap for a short practice.`,`Try it on someone today.`],fresh:[`A word from your next lesson.`,`New today. Tap to learn it properly.`],consent:{title:`A word a day?`,body:`We can send one short Luganda word, like “Weebale — Thank you”, around the time you usually learn. Never more than once a day, and never on days you’ve already practised.`,yes:`Yes, send me words`,later:`Tap Continue if you’d rather not. You can turn this on in Settings any time.`,on:`Done. Your first word arrives soon. Weebale!`,blocked:`Notifications are blocked for this site. Allow them in your browser settings to get word reminders.`},settings:{label:`Word reminders`,hint:`One short Luganda word a day, around when you usually learn. Skipped on days you’ve practised, and less often if you’re busy.`,time:`Reminder time`,auto:`Automatic (learns your routine)`,limited:`This browser only shows reminders while the app is open in the background. Install the app in Chrome or Edge for reminders when it’s closed.`}};function q(e,t){return e.replace(/\{(\w+)\}/g,(e,n)=>t[n]??``)}var Ir=/^ca-pub-\d{10,20}$/,Lr=null;function Rr(e,t=dr){return Ir.test(t.client)?e?!!t.units[e]?.slot:Object.values(t.units).some(e=>e.slot):!1}var zr=()=>typeof navigator>`u`||navigator.onLine!==!1,Br=()=>Object.values(D.get().lessons??{}).reduce((e,t)=>e+(t.completions||0),0);function Vr(e,t={},{policy:n=G,log:r=yr(),now:i=Date.now(),breakUntil:a=kr(i)}={}){if(!n.placements[e]?.enabled||a>i)return!1;let o=t.sessions??Br();return!(o<n.graceSessions||r.shown>=n.maxPerDay||r.last&&i-r.last<n.cooldownMinutes*6e4||e===`complete`&&(o%n.everyNthSession!==0||(t.accuracy??1)<n.minAccuracy))}function Hr(e,t={},{config:n=dr,policy:r=G,log:i,now:a}={}){let o=r.placements[e]?.type;if(!o||!Rr(o,n)||!zr()||!Vr(e,t,{policy:r,log:i,now:a}))return``;let s=n.units[o],c=s.format===`fluid`&&s.layoutKey?` data-ad-layout-key="${b(s.layoutKey)}"`:``,l=s.format===`fluid`&&!s.layoutKey?`auto`:s.format;return`<aside class="ad-card ad-card--${e}" data-ad aria-label="Sponsored">
    <header class="ad-card__head">
      <span class="ad-card__label">Sponsored</span>
      <a class="ad-card__about" href="#/privacy">About ads</a>
      ${r.adBreak.perWeek?`<button class="ad-card__break" type="button" data-ad-break aria-label="${K.cardButtonLabel}">${K.cardButton}</button>`:``}
    </header>
    <ins class="adsbygoogle ad-card__unit" style="display:block" data-ad-client="${b(n.client)}" data-ad-slot="${b(s.slot)}" data-ad-format="${l}"${c}${l===`auto`?` data-full-width-responsive="true"`:``}></ins>
  </aside>`}function Ur(e){return window.adsbygoogle=window.adsbygoogle||[],window.adsbygoogle.requestNonPersonalizedAds=Sr()===`granted`?0:1,Lr||(Lr=new Promise((t,n)=>{let r=document.createElement(`script`);r.async=!0,r.crossOrigin=`anonymous`,r.src=`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(e.client)}`,r.onload=t,r.onerror=()=>{Lr=null,n(Error(`Ads blocked or offline`))},document.head.append(r)}),Lr)}var Wr=e=>e.querySelectorAll(`[data-ad]`).forEach(e=>e.remove());function Gr(e){let t=e.querySelector(`ins`),n=()=>{let n=t.getAttribute(`data-ad-status`);n===`filled`&&!e.classList.contains(`is-filled`)?(e.classList.add(`is-filled`),br()):n===`unfilled`&&e.remove()};new MutationObserver(n).observe(t,{attributes:!0,attributeFilter:[`data-ad-status`]}),n()}function Kr(e,t){let n=[...e.querySelectorAll(`[data-ad]`)];n.length&&Ur(t).then(()=>{for(let e of n)if(e.isConnected){Gr(e);try{window.adsbygoogle.push({})}catch{e.remove()}}}).catch(()=>Wr(e))}function qr(e){Cr(e),window.adsbygoogle&&(window.adsbygoogle.requestNonPersonalizedAds=e===`granted`?0:1)}var Jr=()=>document.querySelector(`.consent`)?.remove();function Yr(){return Jr(),new Promise(e=>{let t=document.createElement(`section`);t.className=`consent`,t.setAttribute(`role`,`region`),t.setAttribute(`aria-label`,`Ad choices`),t.innerHTML=`
      <p><strong>Ads keep Learn Luganda free.</strong> May our ad partner, Google, use cookies to show ads that suit you? Your lessons and progress never leave this device. <a href="#/privacy">Privacy policy</a></p>
      <div class="consent__actions">
        <button class="btn btn--secondary" type="button" data-consent="denied">Basic ads only</button>
        <button class="btn" type="button" data-consent="granted">Allow</button>
      </div>`,t.addEventListener(`click`,n=>{let r=n.target.closest(`[data-consent]`)?.dataset.consent;r&&(qr(r),t.remove(),e(r))}),document.body.append(t)})}function Xr(e,{ask:t=!0,config:n=dr}={}){return e.querySelector(`[data-ad]`)&&(Sr()?Kr(e,n):t?Yr().then(()=>Kr(e,n)):Wr(e)),Jr}var Zr=e=>new Date(e).toLocaleString(`en`,{weekday:`long`,hour:`numeric`,minute:`2-digit`}),Qr=()=>I(D.get()).current,$r=(e=G)=>Ar({streak:Qr(),policy:e});async function ei({policy:e=G}={}){let t=Qr(),r=Ar({streak:t,policy:e});if(r.active)return r.until;if(!r.available)return await T({title:K.none.title,art:n({pose:`thinking`}),body:`<p>${q(K.none.body,{perWeek:e.adBreak.perWeek,when:Zr(r.nextAt)})}</p>`,actions:[{label:K.none.ok,value:`ok`}]}),0;let i=[q(K.offer.body,{mascot:Pr,duration:Nr(r.hours)}),r.streakBonus?q(K.offer.streak,{streak:t}):``,q(K.offer.left,{left:r.left})].filter(Boolean);if(await T({title:K.offer.title,art:n({pose:`happy`}),body:i.map(e=>`<p>${b(e)}</p>`).join(``),actions:[{label:K.offer.no,value:`no`,variant:`secondary`},{label:K.offer.yes,value:`yes`}]})!==`yes`)return 0;let a=jr({streak:t,policy:e});return a&&(Wr(document),w(q(K.done,{time:Zr(a)}))),a}typeof window<`u`&&(window.addEventListener(`offline`,()=>Wr(document)),document.addEventListener(`click`,e=>{e.target.closest?.(`[data-ad-break]`)&&ei()}));var ti=[];function ni(e){ti.push(e)}function ri(e,t,n=700){if(dn()){e.textContent=t;return}let r=performance.now(),i=a=>{let o=Math.min(1,(a-r)/n);e.textContent=Math.round(t*o),o<1&&requestAnimationFrame(i)};requestAnimationFrame(i)}function ii({result:e,xp:t,gems:n=0,title:r,subtitle:i}){let a=Math.round(e.accuracy*100),o=Math.floor(e.seconds/60),s=String(e.seconds%60).padStart(2,`0`);return{html:`
      <div class="complete__art">${h({xp:t.total})}</div>
      <h1>${b(r??(e.perfect?`Perfect lesson!`:`Lesson complete!`))}</h1>
      <p class="complete__sub muted">${b(i??(e.perfect?`Not a single mistake. Weebale nnyo!`:`Weebale! Every lesson makes the words stick.`))}</p>
      <div class="complete__stats">
        <div class="complete__stat complete__stat--xp"><span>Total XP</span><strong>${y(`bolt`,{size:20})}<b data-count="${t.total}">0</b></strong></div>
        <div class="complete__stat complete__stat--acc"><span>${a===100?`Perfect`:a>=80?`Amazing`:a>=60?`Good`:`Accuracy`}</span><strong>${y(`target`,{size:20})}${a}%</strong></div>
        <div class="complete__stat complete__stat--time"><span>Time</span><strong>${y(`clock`,{size:20})}${o}:${s}</strong></div>
      </div>
      <ul class="complete__parts">${t.parts.map(e=>`<li><span>${b(e.label)}</span><span>+${e.xp} XP</span></li>`).join(``)}${n?`<li class="complete__gems"><span>${y(`gem`,{size:16})} Gems</span><span>+${n}</span></li>`:``}</ul>
      ${Hr(`complete`,{accuracy:e.accuracy})}`,after(e){Xr(e,{ask:!1}),e.querySelectorAll(`[data-count]`).forEach(e=>ri(e,Number(e.dataset.count))),O(`complete`),Un()}}}function ai({goalAfter:e}){return{html:`
      <div class="complete__art complete__art--small">${n({pose:p(`celebrate`)})}</div>
      <h1>Daily goal met!</h1>
      <div class="complete__ring">${se(1,{size:140,stroke:12,content:`<strong class="complete__ring-num">${e.today}</strong><span>XP today</span>`,label:`Daily goal`})}</div>
      <p class="complete__sub muted">You reached your ${e.goal} XP goal. Come back tomorrow to keep learning.</p>`,after:()=>{O(`levelup`),Un()}}}function oi({streak:e}){let t=ln(e.current),n=e.milestone?`A ${e.milestone} day milestone. Amazing commitment!`:e.current===1?`Your streak starts today. Come back tomorrow to grow it.`:`You’ve learned ${e.current} days in a row.${t?` ${t-e.current} more to reach ${t}!`:``}`;return{html:`
      <div class="complete__art">${d({days:e.current})}</div>
      <h1>${e.current} day streak!</h1>
      <p class="complete__sub muted">${n}</p>`,after:()=>{O(`streak`),e.milestone&&Un()}}}function si(e){let t=e.map(e=>{let t=sr.find(t=>t.id===e.id);return`<li class="unlock">
      ${qn({shape:t.shape,iconName:t.icon,tier:e.tier,size:88,label:`${t.title} level ${e.tier}`})}
      <div><strong>${b(t.title)}</strong><p class="muted">${b(e.description)}</p><span class="pill pill--blue">${y(`gem`,{size:14})} +${e.gems} gems</span></div>
    </li>`});return{html:`
      <h1>Achievement${e.length>1?`s`:``} unlocked!</h1>
      <ul class="unlocks">${t.join(``)}</ul>`,after:()=>{O(`achievement`),Un()}}}function ci(e,t){let n=[ii(t)];t.streak?.extended&&n.push(oi(t)),!t.goalBefore.met&&t.goalAfter.met&&n.push(ai(t)),t.achievements?.length&&n.push(si(t.achievements));for(let e of ti){let r=e(t);r&&n.push(r)}let r=0;function i(){let a=n[r];e.innerHTML=`
      <div class="complete">
        ${a.html}
        <div class="complete__actions">${x({label:`Continue`,size:`lg`,block:!0,attrs:`data-continue`})}</div>
      </div>`,a.after?.(e);let o=e.querySelector(`[data-continue]`);o.focus(),o.addEventListener(`click`,()=>{r+=1,r<n.length?i():t.onDone()})}i()}var li={start:22,end:8},ui=23.5,di=[1,2,3,5,7],fi=30,pi=40;function mi(e,t=new Date){let n=Array.isArray(e.reminders.hours)&&e.reminders.hours.length===24?e.reminders.hours:Array(24).fill(0);return n[t.getHours()]+=1,e.reminders.hours=n,e}function hi(e=[]){if(e.reduce((e,t)=>e+t,0)<3)return null;let t=null,n=-1;for(let r=0;r<24;r+=1){let i=2*(e[r]??0)+(e[(r+23)%24]??0)+(e[(r+1)%24]??0);i>n&&(t=r,n=i)}return t}function gi(e){let t=2166136261;for(let n of e)t=Math.imul(t^n.charCodeAt(0),16777619);return(t>>>0)%1e4/1e4}function _i(e,t){let n=Number.isInteger(e.hour),r=n?e.hour:hi(e.hours)??19,i=r>=li.start-1?ui:li.start,a=r*60+(n?0:fi)+Math.round((gi(t)*2-1)*pi);a=Math.max(li.end*60,Math.min(a,i*60-45));let o=Vt(t).getTime();return{from:o+a*6e4,latest:o+i*36e5}}function vi(e){let t=Object.keys(e.xp?.byDay??{}).filter(t=>e.xp.byDay[t]>0);return e.streak?.lastDay&&t.push(e.streak.lastDay),t.sort().at(-1)??null}function yi(e){let t=vi(e);return(e.reminders.sent??[]).filter(e=>!t||e>t).length}var bi=e=>di[Math.min(e,di.length-1)],xi=(e,t)=>e[Math.floor(t()*e.length)%e.length];function Si(e,t,{rand:n=Math.random,c:r=L}={}){let i=e=>e.filter(e=>r.words[e]),a=i(Jt(e,t)).slice(0,6),o=i(Object.keys(e.words??{})),s=$n(e,r),c=i(r.lessons[s]?.newWords??r.lessons[r.order[0]]?.newWords??[]).filter(t=>!e.words?.[t]),l=n(),u,d;a.length&&l<.6?[u,d]=[`review`,xi(a,n)]:o.length&&(l<.85||!c.length)?[u,d]=[`learned`,xi(o,n)]:c.length?[u,d]=[`fresh`,xi(c,n)]:[u,d]=[`learned`,Object.keys(r.words)[0]];let f=r.words[d],p=f.notes&&n()<.4?f.notes:xi(Fr[u],n);return{wordId:d,title:q(Fr.title,{target:f.target,base:f.base}),body:p,url:u===`fresh`?`#/learn`:`#/practice`}}function Ci(e,t=new Date,{count:n=3,rand:r=Math.random,c:i=L}={}){let a=e.reminders;if(!a?.on||!e.profile)return[];let o=N(t),s=a.sent??[],c=yi(e),l=s.at(-1),u=l?P(l,bi(c)):o;Ht(u,o)>0&&(u=o),u===o&&(vi(e)===o||s.includes(o))&&(u=P(o,1));let d=[];for(;d.length<n;){let n=_i(a,u);n.latest>t.getTime()?(d.push({day:u,...n,...Si(e,u,{rand:r,c:i})}),c+=1,u=P(u,bi(c))):u=P(u,1)}return d}function wi(e,t=[],n=new Date){let r=n.getTime();return e.find(e=>e.from<=r&&r<e.latest&&e.day===N(n)&&!t.includes(e.day))??null}function Ti(e,t){return e.reminders.sent=[...new Set([...e.reminders.sent??[],t])].sort().slice(-10),e}function Ei(e,{supported:t,permission:n},r=new Date){let i=e.reminders;return!t||n===`denied`||!e.profile||i.on||i.consent===`declined`||i.asks>=2||(e.stats?.lessonsCompleted??0)<2?!1:!i.askedAt||Ht(i.askedAt,N(r))>=7}var Di=3e5,Oi=`learn-luganda-reminders`,ki=`learn-luganda-reminder`,Ai=`./icons/icon-192.png`,ji=()=>`Notification`in window&&`serviceWorker`in navigator,Mi=()=>ji()?Notification.permission:`denied`,Ni=()=>typeof ServiceWorkerRegistration<`u`&&`periodicSync`in ServiceWorkerRegistration.prototype;async function Pi(){return`serviceWorker`in navigator?await navigator.serviceWorker.getRegistration()??null:null}async function Fi(e,t,n){if(!e||!(`caches`in window))return;let r=await caches.open(Oi),i=new URL(`__reminders/${t}.json`,e.scope).href;return n===void 0?(await r.match(i))?.json():(await r.put(i,new Response(JSON.stringify(n),{headers:{"content-type":`application/json`}})),n)}async function Ii(){await Fi(await Pi(),`plan`,{slots:Ci(D.get()),updatedAt:Date.now()}).catch(()=>{})}async function Li(){let e=((await Fi(await Pi(),`sent`).catch(()=>null))?.days??[]).filter(e=>!(D.get().reminders.sent??[]).includes(e));e.length&&D.update(t=>e.reduce(Ti,t))}async function Ri(e){let t=await Pi();if(t&&Ni())try{e?await t.periodicSync.register(ki,{minInterval:216e5}):await t.periodicSync.unregister(ki)}catch{}}async function zi(e){let t=await Pi(),n={body:e.body,icon:Ai,badge:Ai,tag:`word-reminder`,data:{url:e.url}};t?await t.showNotification(e.title,n):new Notification(e.title,n),D.update(t=>Ti(t,e.day)),await Fi(t,`sent`,{days:D.get().reminders.sent}).catch(()=>{})}async function Bi(){if(document.visibilityState===`visible`||Mi()!==`granted`)return;let e=D.get(),t=wi(Ci(e),e.reminders.sent);t&&await zi(t).catch(()=>{})}async function Vi(e){let t=!1;return e&&ji()&&(t=(Mi()==="default"?await Notification.requestPermission():Mi())===`granted`),D.update(n=>{n.reminders.on=t,e&&(n.reminders.consent=t?`granted`:`declined`,n.reminders.askedAt=N())}),await Ri(t),t}function Hi(e){D.update(t=>{t.reminders.hour=Number.isInteger(e)?e:null})}ni(()=>{if(!Ei(D.get(),{supported:ji(),permission:Mi()}))return null;let e=Fr.consent;return{html:`
      <div class="complete__art complete__art--small reminder-offer__art" aria-hidden="true">${le(`Weebale!`,{tail:`right`})}${n({pose:`happy`})}</div>
      <h1>${e.title}</h1>
      <p class="complete__sub muted" data-offer-text>${e.body}</p>
      <div class="reminder-offer__yes">${x({label:e.yes,variant:`secondary`,size:`lg`,block:!0,attrs:`data-offer-yes`})}</div>
      <p class="muted reminder-offer__later" data-offer-later>${e.later}</p>`,after(t){let n=!1;t.querySelector(`[data-offer-yes]`).addEventListener(`click`,async r=>{n=!0,r.currentTarget.disabled=!0;let i=await Vi(!0);t.querySelector(`[data-offer-text]`).textContent=i?e.on:e.blocked,t.querySelector(`[data-offer-later]`).hidden=!0,r.currentTarget.parentElement.hidden=!0,t.querySelector(`[data-continue]`)?.focus()}),t.querySelector(`[data-continue]`)?.addEventListener(`click`,()=>{n||D.update(e=>{e.reminders.consent=`later`,e.reminders.asks+=1,e.reminders.askedAt=N()})})}}});function Ui(){if(!ji())return;let e=null;D.subscribe(()=>{clearTimeout(e),e=setTimeout(Ii,500)}),navigator.serviceWorker.ready.then(Li).then(()=>Promise.all([Ii(),Ri(D.get().reminders.on&&Mi()===`granted`)])).catch(()=>{}),setInterval(Bi,Di)}var Wi=[`lessons`,`words`,`mistakes`,`jumps`];function Gi(e,t){let n=e.settings.course;if(n===t)return e;e.courses??={},e.courses[n]=Object.fromEntries(Wi.map(t=>[t,e[t]]));let r=e.courses[t]??{};for(let t of Wi)e[t]=r[t]??structuredClone(De[t]);return delete e.courses[t],e.settings.course=t,e}var Ki=`modulepreload`,qi=function(e,t){return new URL(e,t).href},Ji={},Yi=function(e){return e.pathname.endsWith(`.css`)},Xi=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},J=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=qi(t,n);let r=s(t),i=Yi(r);return Xi(Ji,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Ki,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Zi=`en-lg`,Qi=Object.assign({"../packs/courses/en-lg/course.json":()=>J(()=>import(`./course-DQA-42QF.js`).then(e=>e.default),[],import.meta.url)}),$i=Object.assign({"../packs/courses/en-lg/units/u1.json":()=>J(()=>import(`./u1-GiE9xdew.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u10.json":()=>J(()=>import(`./u10-BE7_dolO.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u11.json":()=>J(()=>import(`./u11-CSOudtpm.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u12.json":()=>J(()=>import(`./u12-HXZYOMSh.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u13.json":()=>J(()=>import(`./u13-D9Ud7sJV.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u14.json":()=>J(()=>import(`./u14-DHWqMkDJ.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u15.json":()=>J(()=>import(`./u15-BMVK0P-4.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u16.json":()=>J(()=>import(`./u16-BxTmga-K.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u17.json":()=>J(()=>import(`./u17-lZdXHnP9.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u18.json":()=>J(()=>import(`./u18-BafnesuU.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u19.json":()=>J(()=>import(`./u19-D1-n4qdZ.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u2.json":()=>J(()=>import(`./u2-CHbMmr9Y.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u20.json":()=>J(()=>import(`./u20-DUXQLv_X.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u21.json":()=>J(()=>import(`./u21-CrrdwHWL.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u22.json":()=>J(()=>import(`./u22-YADlVEsE.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u23.json":()=>J(()=>import(`./u23-CgcvitgE.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u24.json":()=>J(()=>import(`./u24-DQx_sfEi.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u25.json":()=>J(()=>import(`./u25-Ux0v4cxc.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u26.json":()=>J(()=>import(`./u26-DCQ1dvcT.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u27.json":()=>J(()=>import(`./u27-Cjf3nP3n.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u28.json":()=>J(()=>import(`./u28-DK4ER20Q.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u29.json":()=>J(()=>import(`./u29-B2N0LIY2.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u3.json":()=>J(()=>import(`./u3-0h1FOcFY.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u30.json":()=>J(()=>import(`./u30-wbd8QAZd.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u31.json":()=>J(()=>import(`./u31-BEoqASFQ.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u32.json":()=>J(()=>import(`./u32-DPGFQzlp.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u33.json":()=>J(()=>import(`./u33-Br-NZsNY.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u34.json":()=>J(()=>import(`./u34-BUIPh6BR.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u35.json":()=>J(()=>import(`./u35-rlaIFWIT.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u36.json":()=>J(()=>import(`./u36-CphcNscI.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u37.json":()=>J(()=>import(`./u37-xENFPAHs.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u38.json":()=>J(()=>import(`./u38-BfTmUebs.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u39.json":()=>J(()=>import(`./u39-DHwQcyAk.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u4.json":()=>J(()=>import(`./u4-6rmVVz8R.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u40.json":()=>J(()=>import(`./u40-QJRUoGQR.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u5.json":()=>J(()=>import(`./u5-CQB8TdD6.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u6.json":()=>J(()=>import(`./u6-lNkO8Cr5.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u7.json":()=>J(()=>import(`./u7-B01WHk-3.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u8.json":()=>J(()=>import(`./u8-B8hoOw_M.js`).then(e=>e.default),[],import.meta.url),"../packs/courses/en-lg/units/u9.json":()=>J(()=>import(`./u9-DD2wU7qb.js`).then(e=>e.default),[],import.meta.url)}),ea=Object.freeze(Object.keys(Qi).map(e=>e.split(`/`).at(-2)).sort());async function ta(e=Zi){if(e!==`en-lg`)try{if(ea.includes(e))return await na(e)}catch(e){console.error(e)}return na(Zi)}async function na(e){let t=await Qi[`../packs/courses/${e}/course.json`](),n=`../packs/courses/${e}/units/`,r=await Promise.all(Object.entries($i).filter(([e])=>e.startsWith(n)).map(([,e])=>e()));return xn(bn(t,Object.fromEntries(r.map(e=>[e.id,e])),{from:A(t.from).name,to:A(t.to).name}))}var ra=e=>e.map(e=>({id:e,from:e.split(`-`)[0],to:e.split(`-`).slice(1).join(`-`)}));function ia(e,t){return{canLearn:t.some(t=>t.to===e),canSpeak:t.some(t=>t.from===e)}}function aa(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone??null}catch{return null}}function oa({timeZone:e,preferred:t=[],regions:n}){let r=n.timeZones[e]??null,i=r?n.countries[r]??[]:[],a=t.map(e=>String(e).toLowerCase().split(`-`)[0]);return{country:r,languages:[...new Set([...i,...a])]}}function sa({timeZone:e,preferred:t,regions:n,pairs:r}){let{country:i,languages:a}=oa({timeZone:e,preferred:t,regions:n});for(let e of a){let t=ia(e,r);if(t.canLearn||t.canSpeak)return{code:e,country:i,...t}}return null}var ca=e=>[...new Set(e.map(e=>e.from))],la=(e,t)=>t.filter(t=>t.from===e),ua=(e,t)=>t.filter(t=>t.to===e),da=()=>{},fa=Object.freeze(ra(ea));async function pa(e){da=e;let{uiLang:t,course:n}=D.get().settings,[,r]=await Promise.all([kt(t??Ot()),ta(n)]);r.id!==n&&D.update(e=>Gi(e,r.id))}async function ma(e){D.update(t=>{t.settings.uiLang=e}),await kt(e??Ot()),da()}async function ha(e){if(D.get().settings.course===e)return;let t=await ta(e);D.update(e=>Gi(e,t.id)),da()}function ga(e,t){let n=URL.createObjectURL(new Blob([t],{type:`application/json`})),r=Object.assign(document.createElement(`a`),{href:n,download:e});document.body.append(r),r.click(),r.remove(),URL.revokeObjectURL(n)}var _a=e=>new Date(2026,0,1,e).toLocaleTimeString(`en`,{hour:`numeric`});function va(e,t,n,r,i=!1){return`<label class="switch-row">
    <span class="switch-row__text"><strong>${t}</strong><small>${n}</small></span>
    <input class="switch" type="checkbox" role="switch" data-setting="${e}"${r?` checked`:``}${i?` disabled`:``} />
  </label>`}function ya(e){let t=Fr.settings,n=[...Array(14).keys()].map(e=>e+8);return`${va(`reminder`,t.label,`${t.hint}${Ni()?``:` ${t.limited}`}`,e.on)}
    <label class="switch-row" ${e.on?``:`hidden`} data-hour-row>
      <span class="switch-row__text"><strong>${t.time}</strong></span>
      <select class="input settings-hour" data-hour>
        <option value="auto"${e.hour==null?` selected`:``}>${t.auto}</option>
        ${n.map(t=>`<option value="${t}"${t===e.hour?` selected`:``}>${_a(t)}</option>`).join(``)}
      </select>
    </label>`}function ba(e){let{character:t,color:n}=e.avatar;return`<section class="settings-group" id="profile">
    <h2>Profile</h2>
    <div class="settings-profile">
      <div class="settings-profile__preview" data-preview>${B(e.avatar,{size:88,label:`Your avatar`})}</div>
      <div class="field">
        <label for="settings-name">Name</label>
        <input id="settings-name" class="input" type="text" maxlength="30" autocomplete="given-name" value="${b(e.name)}" data-name />
      </div>
    </div>
    <fieldset class="onb__fieldset">
      <legend>Character</legend>
      <div class="onb__characters" role="radiogroup" aria-label="Character">
        ${f().map(e=>`<button class="onb__character" type="button" role="radio" aria-checked="${t===e}" aria-label="${l(e).name}" data-pick="character" data-value="${e}">${B({character:e,color:`paper`},{size:56})}</button>`).join(``)}
      </div>
    </fieldset>
    <fieldset class="onb__fieldset">
      <legend>Colour</legend>
      <div class="onb__colors" role="radiogroup" aria-label="Colour">
        ${Fn.map(e=>`<button class="onb__color avatar--${e}" type="button" role="radio" aria-checked="${n===e}" aria-label="${e}" data-pick="color" data-value="${e}"></button>`).join(``)}
      </div>
    </fieldset>
  </section>
  <section class="settings-group" id="goal">
    <h2>Daily goal</h2>
    <div class="goal-options" role="radiogroup" aria-label="Daily goal">
      ${Pn.map(t=>`<button class="choice" type="button" role="radio" aria-checked="${e.dailyGoal===t.xp}" data-goal="${t.xp}"><span><strong>${t.label}</strong> · ${t.xp} XP a day</span><span class="muted">${t.minutes} min</span></button>`).join(``)}
    </div>
  </section>`}function xa(e){let t=(e,t,n)=>`<option value="${e}"${n?` selected`:``}>${b(t)}</option>`,n=e=>A(e).nativeName,r=[t(`auto`,M(`settings.languages.automatic`,{language:n(Ot())}),!e.uiLang),...Et.map(r=>t(r,n(r),e.uiLang===r))],i=fa.map(n=>t(n.id,M(`picker.course`,{target:A(n.to).name,base:A(n.from).name}),n.id===e.course));return`<section class="settings-group" id="languages">
    <h2>${b(M(`settings.languages.title`))}</h2>
    <div>
      <label class="switch-row">
        <span class="switch-row__text"><strong>${b(M(`settings.languages.ui`))}</strong><small>${b(M(`settings.languages.uiHint`))}</small></span>
        <select class="input settings-hour" data-ui-lang>${r.join(``)}</select>
      </label>
      <label class="switch-row">
        <span class="switch-row__text"><strong>${b(M(`settings.languages.course`))}</strong><small>${b(M(`settings.languages.courseHint`))}</small></span>
        <select class="input settings-hour" data-course>${i.join(``)}</select>
      </label>
    </div>
  </section>`}function Sa(){let e=$r(),t=K.settings,n=e.active?q(t.active,{time:Zr(e.until)}):q(t.hint,{duration:Nr(e.hours),left:e.left});return`<span class="switch-row__text"><strong>${t.title}</strong><small>${b(n)}</small></span>
    ${e.active?x({label:t.end,variant:`secondary`,attrs:`data-action="ad-break-end"`}):x({label:t.take,variant:`secondary`,attrs:`data-action="ad-break"`})}`}function Ca({root:e,query:t,navigate:r}){let{settings:i,profile:a,reminders:o}=D.get(),s=!!window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches;e.innerHTML=`
    <div class="page">
      <header class="page__header">
        <h1><strong>Settings</strong></h1>
      </header>

      ${a?ba(a):``}
      ${xa(i)}
      <section class="settings-group" id="preferences">
        <h2>Preferences</h2>
        <div>
          ${va(`sound`,`Sound effects`,`Sounds for taps, right and wrong answers, and rewards.`,i.sound!==!1)}
          <label class="switch-row">
            <span class="switch-row__text"><strong>Sound style</strong><small>Playful is bright and bouncy, soft is gentle and warm.</small></span>
            <select class="input settings-hour" data-pack>${Object.entries(ke).map(([e,t])=>`<option value="${e}"${e===(i.soundPack??`playful`)?` selected`:``}>${t}</option>`).join(``)}</select>
          </label>
          ${va(`music`,`Background music`,`A quiet amadinda loop on the home screens. Lessons and stories stay quiet.`,i.music!==!1)}
          ${va(`haptics`,`Vibration`,Ge()?s?`Your device asks for reduced motion, so vibration stays off.`:`A small buzz for taps, answers and rewards.`:`This device or browser can’t vibrate (iPhones and most computers don’t allow it).`,Ge()&&!s&&i.haptics!==!1,!Ge()||s)}
          ${a&&ji()?ya(o):``}
          ${va(`motion`,`Animations`,s?`Your device asks for reduced motion, so animations stay minimal.`:`Confetti, bouncing and sliding.`,i.motion!==!1&&!s,s)}
          <p class="muted settings-credits">Sounds and music are free and openly licensed (CC0). <a href="./audio/CREDITS.md" target="_blank" rel="noopener">Audio credits</a></p>
        </div>
      </section>

      ${Rn()?`<section class="settings-group" id="install">
              <h2>Install the app</h2>
              <p class="muted">Add Learn Luganda to your home screen. Lessons work offline after your first visit.</p>
              ${x({label:`Install app`,variant:`secondary`,attrs:`data-action="install"`})}
            </section>`:``}
      <section class="settings-group" id="privacy">
        <h2>Ads and privacy</h2>
        ${Rr()?`<div>${va(`personalisedAds`,`Personalised ads`,`Let Google use cookies to show ads that suit you. Off means basic, non-personalised ads.`,Sr()===`granted`)}</div>`:``}
        ${Rr()&&G.adBreak.perWeek?`<div class="ad-break-row" data-ad-break-row>${Sa()}</div>`:``}
        <p class="muted">Your lessons and progress never leave this device. <a href="#/privacy">Read the privacy policy</a>.</p>
        ${On()}
      </section>

      <section class="settings-group" id="data">
        <h2>Your progress</h2>
        <p class="muted">Progress is saved in this browser only. Export it to keep a backup or to move to another device, then import it there.</p>
        <div class="settings-actions">
          ${x({label:`Export progress`,variant:`secondary`,iconName:`arrow`,attrs:`data-action="export"`})}
          ${x({label:`Import progress`,variant:`secondary`,attrs:`data-action="import"`})}
          <input type="file" accept="application/json,.json" hidden data-import-file />
        </div>
      </section>

      <section class="settings-group settings-group--danger">
        <h2>Start over</h2>
        <p class="muted">Erase your profile, XP, streak and everything you’ve learned on this device.</p>
        ${x({label:`Reset progress`,variant:`danger`,attrs:`data-action="reset"`})}
      </section>
    </div>`;let c=e.querySelector(`[data-import-file]`),l=e.querySelector(`[data-name]`);l?.addEventListener(`change`,()=>{let e=l.value.trim();e?(Ln({name:e}),w(`Name saved.`)):l.value=D.get().profile.name}),e.addEventListener(`click`,t=>{let n=t.target.closest(`[data-pick]`);if(n){Ln({avatar:{[n.dataset.pick]:n.dataset.value}}),n.parentElement.querySelectorAll(`[data-pick]`).forEach(e=>e.setAttribute(`aria-checked`,String(e===n))),e.querySelector(`[data-preview]`).innerHTML=B(D.get().profile.avatar,{size:88,label:`Your avatar`});return}let r=t.target.closest(`[data-goal]`);r&&(Ln({dailyGoal:Number(r.dataset.goal)}),r.parentElement.querySelectorAll(`[data-goal]`).forEach(e=>e.setAttribute(`aria-checked`,String(e===r))),Lt())}),t.section&&e.querySelector(`#${CSS.escape(t.section)}`)?.scrollIntoView({block:`start`}),e.addEventListener(`change`,async t=>{if(t.target.matches(`[data-ui-lang]`)){await ma(t.target.value===`auto`?null:t.target.value);return}if(t.target.matches(`[data-course]`)){let e=fa.find(e=>e.id===t.target.value)?.to;await ha(t.target.value),w(M(`settings.languages.switched`,{target:A(e).name}));return}if(t.target.matches(`[data-pack]`)){D.update(e=>{e.settings.soundPack=t.target.value}),qe(t.target.value),O(`correct`);return}if(t.target.matches(`[data-hour]`)){Hi(t.target.value===`auto`?null:Number(t.target.value));return}let n=t.target.dataset?.setting;if(n){if(n===`personalisedAds`)qr(t.target.checked?`granted`:`denied`),w(t.target.checked?`Personalised ads allowed.`:`You’ll see basic ads only.`);else if(n===`reminder`){let n=t.target.checked,r=await Vi(n);t.target.checked=r,n&&!r&&w(Fr.consent.blocked,{duration:4e3}),e.querySelector(`[data-hour-row]`).hidden=!r}else D.update(e=>{e.settings[n]=t.target.checked}),n===`sound`&&t.target.checked&&O(`correct`),n===`haptics`&&t.target.checked&&O(`tap`)}}),c.addEventListener(`change`,async()=>{let e=c.files?.[0];if(c.value=``,!e)return;let t=await e.text();if(await T({title:`Replace your progress?`,body:`<p>Importing replaces everything saved on this device with the file’s progress.</p>`,actions:[{label:`Import`,value:`yes`},{label:`Cancel`,value:`no`,variant:`ghost`}]})===`yes`)try{let e=D.importJSON(t);Lt(),w(`Progress imported. Weebale!`,{variant:`success`}),r(e.profile?`/learn`:`/onboarding`)}catch(e){w(e.message,{variant:`error`,duration:4e3})}}),e.addEventListener(`click`,async t=>{let i=t.target.closest(`[data-action]`)?.dataset.action;i===`ad-break`||i===`ad-break-end`?(i===`ad-break`?await ei():(Mr(),w(K.settings.ended)),e.querySelector(`[data-ad-break-row]`).innerHTML=Sa()):(i===`export`&&(ga(`learn-luganda-${D.get().profile?.name?.toLowerCase().replace(/[^a-z0-9]+/g,`-`)||`learner`}-${new Date().toISOString().slice(0,10)}.json`,D.exportJSON()),w(`Progress exported.`)),i===`import`&&c.click(),i===`install`&&await zn()&&e.querySelector(`#install`)?.remove(),i===`reset`&&await T({title:`Reset all progress?`,body:`<p>This can’t be undone. Export first if you might want it back.</p>`,art:n({pose:`sad`}),actions:[{label:`Keep my progress`,value:`keep`},{label:`Reset everything`,value:`reset`,variant:`danger`}]})===`reset`&&(D.reset(),w(`Progress reset.`),r(`/`)))}),t.import&&c.click()}var wa={$schema:`../../docs/packs/schema/regions.schema.json`,$comment:`A rough, offline guess at where a learner is, from the device's time zone (no location permission, no server), and the languages people there commonly read or speak, most common first. Codes must be in languages.json. Only used to suggest a language on the get-started screen; the learner always confirms or changes it.`,timeZones:{"Africa/Abidjan":`CI`,"Africa/Accra":`GH`,"Africa/Addis_Ababa":`ET`,"Africa/Algiers":`DZ`,"Africa/Asmara":`ER`,"Africa/Bamako":`ML`,"Africa/Bangui":`CF`,"Africa/Banjul":`GM`,"Africa/Bissau":`GW`,"Africa/Blantyre":`MW`,"Africa/Brazzaville":`CG`,"Africa/Bujumbura":`BI`,"Africa/Cairo":`EG`,"Africa/Casablanca":`MA`,"Africa/Conakry":`GN`,"Africa/Dakar":`SN`,"Africa/Dar_es_Salaam":`TZ`,"Africa/Djibouti":`DJ`,"Africa/Douala":`CM`,"Africa/El_Aaiun":`EH`,"Africa/Freetown":`SL`,"Africa/Gaborone":`BW`,"Africa/Harare":`ZW`,"Africa/Johannesburg":`ZA`,"Africa/Juba":`SS`,"Africa/Kampala":`UG`,"Africa/Khartoum":`SD`,"Africa/Kigali":`RW`,"Africa/Kinshasa":`CD`,"Africa/Lagos":`NG`,"Africa/Libreville":`GA`,"Africa/Lome":`TG`,"Africa/Luanda":`AO`,"Africa/Lubumbashi":`CD`,"Africa/Lusaka":`ZM`,"Africa/Malabo":`GQ`,"Africa/Maputo":`MZ`,"Africa/Maseru":`LS`,"Africa/Mbabane":`SZ`,"Africa/Mogadishu":`SO`,"Africa/Monrovia":`LR`,"Africa/Nairobi":`KE`,"Africa/Ndjamena":`TD`,"Africa/Niamey":`NE`,"Africa/Nouakchott":`MR`,"Africa/Ouagadougou":`BF`,"Africa/Porto-Novo":`BJ`,"Africa/Sao_Tome":`ST`,"Africa/Tripoli":`LY`,"Africa/Tunis":`TN`,"Africa/Windhoek":`NA`,"Indian/Antananarivo":`MG`,"Indian/Mauritius":`MU`,"Indian/Mahe":`SC`,"Indian/Comoro":`KM`,"Indian/Mayotte":`YT`,"Indian/Reunion":`RE`,"Atlantic/Cape_Verde":`CV`,"Asia/Dubai":`AE`,"Asia/Riyadh":`SA`,"Asia/Qatar":`QA`,"Asia/Kuwait":`KW`,"Asia/Bahrain":`BH`,"Asia/Muscat":`OM`,"Asia/Amman":`JO`,"Asia/Beirut":`LB`,"Asia/Baghdad":`IQ`,"Asia/Damascus":`SY`,"Asia/Aden":`YE`,"Europe/London":`GB`,"Europe/Paris":`FR`,"Europe/Lisbon":`PT`,"Europe/Brussels":`BE`,"America/New_York":`US`,"America/Chicago":`US`,"America/Denver":`US`,"America/Los_Angeles":`US`,"America/Toronto":`CA`,"America/Sao_Paulo":`BR`},countries:{UG:[`lg`,`en`,`sw`,`nyn`],KE:[`sw`,`en`],TZ:[`sw`,`en`],RW:[`rw`,`en`,`fr`,`sw`],BI:[`fr`,`sw`],NG:[`en`,`ha`,`yo`,`ig`],GH:[`en`,`tw`],SN:[`fr`,`wo`],GM:[`en`,`wo`],ET:[`am`,`om`],ER:[`ar`,`en`],ZA:[`en`,`zu`,`xh`,`af`,`st`],LS:[`st`,`en`],ZW:[`en`,`sn`],MW:[`ny`,`en`],ZM:[`en`,`ny`],BW:[`en`],SZ:[`en`],NA:[`en`,`af`],CD:[`fr`,`ln`,`sw`],CG:[`fr`,`ln`],CM:[`fr`,`en`],CI:[`fr`],ML:[`fr`],BF:[`fr`],NE:[`fr`,`ha`],TD:[`fr`,`ar`],GN:[`fr`],TG:[`fr`],BJ:[`fr`,`yo`],GA:[`fr`],CF:[`fr`],GQ:[`fr`,`pt`],MR:[`ar`,`wo`,`fr`],EH:[`ar`],EG:[`ar`],MA:[`ar`,`fr`],DZ:[`ar`,`fr`],TN:[`ar`,`fr`],LY:[`ar`],SD:[`ar`,`en`],SS:[`en`],DJ:[`fr`,`ar`],SO:[`ar`],AO:[`pt`],MZ:[`pt`],GW:[`pt`],CV:[`pt`],ST:[`pt`],BR:[`pt`],PT:[`pt`],MG:[`mg`,`fr`],MU:[`en`,`fr`],SC:[`en`,`fr`],KM:[`ar`,`fr`],RE:[`fr`],YT:[`fr`],LR:[`en`],SL:[`en`],AE:[`ar`,`en`],SA:[`ar`],QA:[`ar`],KW:[`ar`],BH:[`ar`],OM:[`ar`],JO:[`ar`],LB:[`ar`,`fr`],IQ:[`ar`],SY:[`ar`],YE:[`ar`],GB:[`en`],US:[`en`],CA:[`en`,`fr`],FR:[`fr`],BE:[`fr`]}},Y=e=>A(e).name,Ta=e=>A(e).nativeName,Ea;function Da(e=fa){return Ea??=sa({timeZone:aa(),preferred:globalThis.navigator?.languages??[],regions:wa,pairs:e}),Ea}function Oa(e,{suggestion:t,pairs:n}){let r=n.find(t=>t.id===e.course)??null;if(t&&!e.langAnswer)return{stage:`guess`,suggestion:t,course:r};if(e.langAnswer===`learn`)return{stage:`base`,learn:e.learn,options:ua(e.learn,n),course:r};if(e.langAnswer===`speak`){let t=la(e.speak,n);return{stage:`target`,speak:e.speak,options:t.length?t:n,none:!t.length,course:r}}let i=ca(n),a=e.speak&&i.includes(e.speak)?e.speak:i[0];return{stage:`pick`,bases:i,speak:a,options:la(a,n),course:r}}function ka(e,t,n){if(e===`learn`){let e=ua(t.code,n);return{langAnswer:`learn`,learn:t.code,course:e.length===1?e[0].id:null}}if(e===`speak`){let e=la(t.code,n);return{langAnswer:`speak`,speak:t.code,course:e.length===1?e[0].id:null}}return{langAnswer:`other`,course:null}}function Aa(e){return`<p class="onb-langs__hellos" aria-hidden="true">${bt.map(t=>`<span class="onb-langs__hello${t.code===e?` is-guess`:``}" lang="${t.code}" dir="${t.dir}">${b(t.greeting)}</span>`).join(``)}</p>`}var ja=(e,t,n=``,r=!1)=>`<button class="choice onb__level" type="button" role="radio" aria-checked="${r}" ${e}><strong>${t}</strong>${n?`<span>${n}</span>`:``}</button>`,Ma=(e,t,n)=>ja(`data-pick="course" data-value="${e.id}"`,n,``,t.course?.id===e.id);function Na(e){let t=Oa(e,{suggestion:Da(),pairs:fa}),n=`<button class="btn btn--ghost onb-langs__other" type="button" data-lang-reply="other">${b(M(`picker.other`))}</button>`,r=Aa(t.suggestion?.code??e.learn??e.speak),i=!!t.course;if(t.stage===`guess`){let{code:e,canLearn:a,canSpeak:o}=t.suggestion;return{pose:`happy`,say:b(M(`picker.guess.${a&&o?`both`:a?`learn`:`speak`}`,{language:Y(e)})),body:`${r}<div class="onb__options" role="radiogroup" aria-label="${b(M(`picker.guess.label`))}">
        ${a?ja(`data-lang-reply="learn"`,b(M(`picker.guess.learnIt`,{language:Y(e)})),b(M(`picker.guess.learnDetail`))):``}
        ${o?ja(`data-lang-reply="speak"`,b(M(`picker.guess.speakIt`,{language:Y(e)})),b(M(`picker.guess.speakDetail`,{native:Ta(e)}))):``}
        </div>${n}`,ready:i}}if(t.stage===`base`)return{pose:`cheering`,say:b(M(t.options.length>1?`picker.base.ask`:`picker.base.one`,{language:Y(t.learn),base:Y(t.options[0]?.from??`en`)})),body:`${r}<div class="onb__options" role="radiogroup" aria-label="${b(M(`picker.base.label`))}">
        ${t.options.map(e=>Ma(e,t,b(M(`picker.base.option`,{base:Ta(e.from)})))).join(``)}
        </div>${n}`,ready:i};if(t.stage===`target`){let e=t.none?M(`picker.target.none`,{language:Y(t.speak)}):M(`picker.target.ask`);return{pose:t.none?`thinking`:`happy`,say:b(e),body:`${r}<div class="onb__options" role="radiogroup" aria-label="${b(M(`picker.target.label`))}">
        ${t.options.map(e=>Ma(e,t,b(M(`picker.course`,{target:Y(e.to),base:Y(e.from)})))).join(``)}
        </div>${n}`,ready:i}}return{pose:`thinking`,say:b(M(`picker.pick.say`)),body:`${r}
      <fieldset class="onb__fieldset">
        <legend>${b(M(`picker.pick.speak`))}</legend>
        <div class="onb__options onb__options--grid" role="radiogroup" aria-label="${b(M(`picker.pick.speak`))}">
          ${t.bases.map(e=>ja(`data-pick="speak" data-value="${e}"`,b(Ta(e)),Ta(e)===Y(e)?``:b(Y(e)),e===t.speak)).join(``)}
        </div>
      </fieldset>
      <fieldset class="onb__fieldset">
        <legend>${b(M(`picker.pick.learn`))}</legend>
        <div class="onb__options" role="radiogroup" aria-label="${b(M(`picker.pick.learn`))}">
          ${t.options.map(e=>Ma(e,t,b(Y(e.to)))).join(``)}
        </div>
      </fieldset>`,ready:i}}function Pa(e){let t=Da();return e===`other`||!t?ka(`other`):ka(e,t,fa)}async function Fa(e){let t=fa.find(t=>t.id===e.course);t&&(Et.includes(t.from)&&await ma(t.from===Ot()?null:t.from),await ha(t.id))}var Ia=[{id:`family`,label:`Talk with family`,icon:`profile`},{id:`travel`,label:`Travel to Uganda`,icon:`arrow`},{id:`friends`,label:`Connect with friends`,icon:`heart`},{id:`culture`,label:`Explore the culture`,icon:`book`},{id:`work`,label:`Work or study`,icon:`target`},{id:`fun`,label:`Just for fun`,icon:`star`}],La=[{id:`new`,label:`I’m new to Luganda`,detail:`Start from the very first lesson.`},{id:`some`,label:`I know some words`,detail:`Start with a quick greetings review.`}],Ra=[`languages`,`welcome`,`motivation`,`goal`,`level`,`avatar`,`ready`];function za(e){D.update(t=>{t.onboarding={...t.onboarding,...e,answers:{...t.onboarding.answers,...e.answers??{}}}})}function Ba(e,t){switch(e){case`languages`:return Na(t);case`welcome`:return{pose:`happy`,say:`Oli otya! I’m ${b(Pr)}, your guide to Luganda.`,body:`<p class="onb__lead">A few quick questions and we’ll set up your course.</p>`,ready:!0,cta:`Let’s go`};case`motivation`:return{pose:`thinking`,say:`Why are you learning Luganda?`,body:`<div class="onb__options onb__options--grid" role="radiogroup" aria-label="Why are you learning">
          ${Ia.map(e=>`<button class="choice" type="button" role="radio" aria-checked="${t.motivation===e.id}" data-pick="motivation" data-value="${e.id}">${y(e.icon,{size:22})}<span>${e.label}</span></button>`).join(``)}
        </div>`,ready:!!t.motivation};case`goal`:return{pose:`idle`,say:`What’s your daily goal?`,body:`<div class="onb__options" role="radiogroup" aria-label="Daily goal">
          ${Pn.map(e=>`<button class="choice onb__goal" type="button" role="radio" aria-checked="${Number(t.dailyGoal)===e.xp}" data-pick="dailyGoal" data-value="${e.xp}">
            <strong>${e.label}</strong><span>${e.minutes} min a day</span><span class="onb__xp">${e.xp} XP</span></button>`).join(``)}
        </div>`,ready:!!t.dailyGoal};case`level`:return{pose:`thinking`,say:`How much Luganda do you know?`,body:`<div class="onb__options" role="radiogroup" aria-label="Your level">
          ${La.map(e=>`<button class="choice onb__level" type="button" role="radio" aria-checked="${t.level===e.id}" data-pick="level" data-value="${e.id}">
            <strong>${e.label}</strong><span>${e.detail}</span></button>`).join(``)}
        </div>`,ready:!!t.level};case`avatar`:{let e=t.character??`nakato`,n=t.color??`vermillion`;return{pose:`happy`,say:`Make it yours. What should I call you?`,body:`
          <div class="onb__avatar-preview">${B({character:e,color:n},{size:120,label:`Your avatar`})}</div>
          <div class="field">
            <label for="onb-name">Your name</label>
            <input id="onb-name" class="input" type="text" maxlength="30" autocomplete="given-name" placeholder="e.g. Amani" value="${b(t.name??``)}" />
          </div>
          <fieldset class="onb__fieldset">
            <legend>Character</legend>
            <div class="onb__characters" role="radiogroup" aria-label="Character">
              ${f().map(t=>`<button class="onb__character" type="button" role="radio" aria-checked="${e===t}" aria-label="${l(t).name}" data-pick="character" data-value="${t}">${B({character:t,color:`paper`},{size:64})}</button>`).join(``)}
            </div>
          </fieldset>
          <fieldset class="onb__fieldset">
            <legend>Colour</legend>
            <div class="onb__colors" role="radiogroup" aria-label="Colour">
              ${Fn.map(e=>`<button class="onb__color avatar--${e}" type="button" role="radio" aria-checked="${n===e}" aria-label="${e}" data-pick="color" data-value="${e}"></button>`).join(``)}
            </div>
          </fieldset>`,ready:!!(t.name??``).trim(),cta:`Continue`}}default:{let e=Pn.find(e=>e.xp===Number(t.dailyGoal))??Pn[1];return{pose:`cheering`,say:`Weebale, ${b(t.name??``)}! You’re all set.`,body:`<div class="onb__summary card">
            ${B({character:t.character??`nakato`,color:t.color??`vermillion`},{size:72})}
            <div><strong>${b(t.name??``)}</strong><p class="muted">${e.label} goal · ${e.xp} XP a day</p></div>
          </div>
          <p class="onb__lead">Your first lesson: greetings. You’ll learn to say <em>Oli otya?</em> in under five minutes.</p>`,ready:!0,cta:`Start learning`}}}}function Va({root:e,navigate:t}){if(D.get().profile){t(`/learn`,{replace:!0});return}function r(){let{step:t=0,answers:r={}}=D.get().onboarding,i=Math.min(t,Ra.length-1),a=Ra[i],o=Ba(a,r);e.innerHTML=`
      <div class="onb">
        <header class="onb__top">
          ${i>0?`<button class="icon-btn" type="button" data-nav="back" aria-label="Back">${y(`back`)}</button>`:`<a class="icon-btn" href="#/" aria-label="Close">${y(`close`)}</a>`}
          ${S(i/(Ra.length-1),{label:`Setup progress`})}
        </header>
        <section class="onb__main onb__main--${a}">
          <div class="talk onb__talk">
            <div class="talk__art">${n({pose:o.pose})}</div>
            ${le(`<h1 class="onb__say">${o.say}</h1>`)}
          </div>
          <div class="onb__body">${o.body}</div>
        </section>
        <footer class="onb__footer">
          ${x({label:o.cta??`Continue`,size:`lg`,block:!0,disabled:!o.ready,attrs:`data-nav="next"`})}
        </footer>
      </div>`,e.querySelector(`#onb-name`)?.focus()}async function i(){let{step:e=0,answers:n}=D.get().onboarding;Ra[e]===`languages`?(za({step:e+1}),await Fa(n),r()):Ra[e]===`ready`?(D.update(e=>{e.profile=In({name:n.name,avatar:{character:n.character,color:n.color},dailyGoal:Number(n.dailyGoal)||20,motivation:n.motivation,level:n.level}),e.onboarding={step:0,answers:{}}}),t(`/learn`)):(za({step:e+1}),r())}e.addEventListener(`click`,t=>{let n=t.target.closest(`[data-lang-reply]`);if(n){za({answers:Pa(n.dataset.langReply)}),r(),e.querySelector(`.onb__body [role="radio"], .onb__body button`)?.focus();return}let a=t.target.closest(`[data-pick]`);if(a){let t=a.dataset.pick===`speak`?{course:null}:{};za({answers:{[a.dataset.pick]:a.dataset.value,...t}});let n=`[data-pick="${a.dataset.pick}"][data-value="${a.dataset.value}"]`;r(),e.querySelector(n)?.focus();return}let o=t.target.closest(`[data-nav]`)?.dataset.nav;o===`back`&&(za({step:Math.max(0,D.get().onboarding.step-1)}),r()),o===`next`&&!t.target.closest(`[disabled]`)&&i()}),e.addEventListener(`input`,t=>{if(t.target.id!==`onb-name`)return;let n=t.target.value;D.update(e=>{e.onboarding.answers.name=n}),e.querySelector(`[data-nav="next"]`).disabled=!n.trim()}),e.addEventListener(`keydown`,e=>{e.key===`Enter`&&e.target.id===`onb-name`&&e.target.value.trim()&&i()}),r()}var X={lesson:10,replay:5,perfectBonus:5,practice:10,checkpoint:20,story:15};function Ha(e,{replay:t=!1,base:n}={}){let r=[{label:t?`Practice`:`Lesson`,xp:n??(t?X.replay:X.lesson)}];return e.perfect&&r.push({label:`Perfect bonus`,xp:X.perfectBonus}),{total:r.reduce((e,t)=>e+t.xp,0),parts:r}}function Ua(e,t,n=new Date){let r=N(n);return e.xp.total+=t,e.xp.byDay[r]=(e.xp.byDay[r]??0)+t,e}function Wa(e,t=new Date){return e.xp.byDay[N(t)]??0}function Ga(e,t=new Date){let n=e.profile?.dailyGoal??20,r=Wa(e,t);return{today:r,goal:n,met:r>=n,ratio:Math.min(1,r/n)}}function Ka(e,t=7,n=new Date){let r=[];for(let i=t-1;i>=0;--i){let t=new Date(n);t.setDate(t.getDate()-i);let a=N(t);r.push({day:a,xp:e.xp.byDay[a]??0})}return r}var qa=e=>`story-${e}`;function Ja(e,t){return U(e,t.unlockAfter)}function Ya(e,t){return!!e.lessons[qa(t.id)]?.completions}function Xa(e,t=L){return t.stories.map(t=>({story:t,unlocked:Ja(e,t),done:Ya(e,t)}))}var Za=[0,44,72,44,0,-44,-72,-44];function Qa(e,t,n,r){let i=H(e,t.id),a=Qn(e,t.id),o=i?`done`:t.id===r?`current`:Xn(e,t.id)?`skipped`:a?`open`:`locked`,s=L.skills[t.skill],c=`${s.title}, lesson ${t.index+1} of ${s.lessons.length}: ${{locked:`locked`,done:`completed`,skipped:`skipped`}[o]??`start`}`,l=o===`locked`?`lock`:o===`done`?`check`:s.icon??`star`;return`
    <li class="node-wrap" style="--x:${Za[n%Za.length]}px">
      ${o===`current`?`<span class="node__bubble" aria-hidden="true">Start</span>`:``}
      <button class="node node--${o}" type="button" data-lesson="${t.id}" aria-label="${b(c)}">
        ${y(l,{size:30})}
      </button>
    </li>`}function $a(e,t,n){let r=tr(e,t.id),i=e.lessons[`checkpoint-${t.id}`]?.completions?`done`:r.passed?`current`:`locked`;return`
    <li class="node-wrap" style="--x:${Za[n%Za.length]}px">
      <button class="node node--checkpoint node--${i}" type="button" data-checkpoint="${t.id}" aria-label="${b(`${t.title} checkpoint${i===`locked`?`, locked`:``}`)}">
        ${y(`trophy`,{size:34})}
      </button>
    </li>`}function eo(e,t,n){return er(e,t.id).complete&&t.lessons.some(e=>e.newWords.some(e=>n.has(e)))}function to(e,t,n,r){let a=tr(e,t.id),s=ar(e,t.id),c=0,l=t.skills.map(i=>{let a=er(e,i.id),o=i.lessons.map(t=>Qa(e,t,c++,n)).join(``);return`
        <li class="skill${a.complete?` skill--complete`:``}">
          <h4 class="skill__title"><span>${b(i.title)}</span><span class="skill__count">${a.done}/${a.total}</span>${i.tip?`<a class="pill skill__review" href="#/guidebook/${t.id}?tip=${i.tip}" aria-label="${b(i.title)} tip">${y(`bolt`,{size:14})}Tip</a>`:``}${eo(e,i,r)?`<a class="pill pill--primary skill__review" href="#/practice/session?mode=skill&id=${i.id}">${y(`target`,{size:14})}Review</a>`:``}</h4>
          <ol class="trail">${o}</ol>
        </li>`}).join(``),u=[t.character,...t.skills.map(e=>e.character).filter(Boolean)];return`
    <section class="unit unit--${t.color}${s?``:` unit--locked`}" aria-labelledby="unit-${t.id}">
      <header class="unit__banner">
        <div>
          <p class="unit__eyebrow">Unit ${t.index+1}</p>
          <h3 id="unit-${t.id}">${b(t.title)}</h3>
          <p class="unit__desc">${b(t.description)}</p>
        </div>
        <a class="unit__guide" href="#/guidebook/${t.id}" aria-label="${b(t.title)} guidebook">${y(`book`,{size:22})}<span>Guidebook</span></a>
        <div class="unit__meter" role="progressbar" aria-valuemin="0" aria-valuemax="${a.total}" aria-valuenow="${a.done}" aria-label="${b(t.title)}: ${a.done} of ${a.total} lessons complete"><span style="width:${a.done/a.total*100}%"></span></div>
      </header>
      <div class="unit__body">
        <div class="unit__cast" aria-hidden="true">${u.map(e=>`<div class="unit__character">${o(e,{expression:a.complete?i([`happy`,`wink`]):i([`neutral`,`neutral`,`happy`,`surprised`])})}</div>`).join(``)}<div class="unit__prop">${ee(i(_))}</div></div>
        <ol class="skills">${l}</ol>
        <ol class="trail trail--checkpoint">${$a(e,t,c)}</ol>
      </div>
    </section>`}function no(e,t){return t?L.units.find(e=>e.id===L.lessons[t].unit).section:L.sections.findLast(t=>rr(e,t.id))?.id??L.sections[0].id}function ro(e,t,n){let r=new Set(Jt(e));return t.units.map(t=>to(e,t,n,r)).join(``)}function io(e,t,n,r){let i=nr(e,t.id),a=rr(e,t.id),o=i.complete?`Complete`:a?`${i.passed} of ${i.total} lessons`:`Locked`,s=ir(e,t.id)?x({label:`Jump to Section ${t.index+1}`,variant:`secondary`,href:`#/jump/${t.id}`}):``;return`
    <section class="course-section${a?``:` course-section--locked`}" aria-labelledby="section-${t.id}" data-section="${t.id}">
      <header class="course-section__head">
        <p class="course-section__eyebrow">Section ${t.index+1}${t.level?` · ${b(t.level)}`:``}</p>
        <h2 id="section-${t.id}">${b(t.title)}</h2>
        <p class="course-section__desc">${b(t.description)}</p>
        <div class="course-section__meta">
          <span class="pill">${a?``:y(`lock`,{size:14})}${o}</span>
          <span class="caption">${t.units.length} units</span>
          ${s}
        </div>
      </header>
      <details class="course-section__units"${r?` open`:``}>
        <summary>${r?`Hide units`:`Show units`}</summary>
        <div data-units>${r?ro(e,t,n):``}</div>
      </details>
    </section>`}function ao(e){let t=I(e);return t.atRisk?`<div class="risk-banner" role="status">
    ${y(`flame`,{size:28})}
    <p><strong>Your ${t.current} day streak is at risk!</strong> Finish a lesson today to keep it${t.freezes?` (you have ${t.freezes} streak freeze${t.freezes>1?`s`:``})`:``}.</p>
  </div>`:``}function oo(e){let t=Ga(e);return`<a class="goal-strip" href="#/profile">
    ${se(t.ratio,{size:40,stroke:5,content:y(`bolt`,{size:16}),label:`Daily goal`})}
    <span><strong>${t.met?`Daily goal met!`:`Daily goal`}</strong> ${Math.min(t.today,t.goal)} / ${t.goal} XP</span>
  </a>`}function so(e){let{goal:t,today:n}=Ga(e),r=I(e),i=Xa(e).filter(e=>e.unlocked&&!e.done).length;return`
    <aside class="learn__side">
      <div class="card side-card">
        ${se(n/t,{size:64,content:y(`bolt`,{size:26}),label:`Daily goal`})}
        <div>
          <h3>Daily goal</h3>
          <p class="muted">${Math.min(n,t)} / ${t} XP today</p>
        </div>
      </div>
      <a class="card side-card side-card--link" href="#/streak">
        <span class="side-card__icon${r.doneToday?``:` is-dim`}">${y(`flame`,{size:34})}</span>
        <div>
          <h3>${r.current} day streak</h3>
          <p class="muted">${r.doneToday?`Done for today. Weebale!`:r.current?`Do a lesson to extend it.`:`Finish a lesson to start one.`}</p>
        </div>
      </a>
      <a class="card side-card side-card--link" href="#/stories">
        <span class="side-card__icon">${y(`stories`,{size:34})}</span>
        <div>
          <h3>Stories</h3>
          <p class="muted">${i?`${i} new to read`:`Read along with the cast.`}</p>
        </div>
      </a>
      ${On()}
    </aside>`}function co({root:e,navigate:t}){let n=D.get(),r=$n(n),i=no(n,r);e.innerHTML=`
    <div class="learn">
      <div class="learn__path">
        <h1 class="visually-hidden">Your learning path</h1>
        ${ao(n)}
        ${oo(n)}
        ${L.sections.map(e=>io(n,e,r,e.id===i)+(e.id===i?Hr(`path`):``)).join(``)}
        ${or(n)?`<p class="learn__more caption"><a href="#/complete">You finished the course! See your celebration.</a></p>`:`<p class="learn__more caption">The course ends with Unit 40. Weebale for learning!</p>`}
      </div>
      ${so(n)}
    </div>`,e.querySelector(`.node--current`)?.scrollIntoView({block:`center`});for(let t of e.querySelectorAll(`.course-section__units`))t.addEventListener(`toggle`,()=>{let e=L.sections.find(e=>e.id===t.closest(`[data-section]`).dataset.section),n=t.querySelector(`[data-units]`);t.open&&!n.childElementCount&&(n.innerHTML=ro(D.get(),e,$n(D.get()))),t.querySelector(`summary`).textContent=t.open?`Hide units`:`Show units`});let a=Xr(e),o=null;function s(){o?.remove(),o=null}return e.addEventListener(`click`,e=>{let n=e.target.closest(`[data-checkpoint]`);if(n){n.classList.contains(`node--locked`)?w(`Finish every lesson in this unit to unlock the checkpoint.`):t(`/checkpoint/${n.dataset.checkpoint}`);return}let r=e.target.closest(`[data-lesson]`);if(!r){e.target.closest(`.node-pop`)||s();return}let i=L.lessons[r.dataset.lesson];if(r.classList.contains(`node--locked`)){w(`Complete the lessons before this one to unlock it.`);return}s();let a=L.skills[i.skill],c=H(D.get(),i.id);o=document.createElement(`div`),o.className=`node-pop`,o.setAttribute(`role`,`dialog`),o.setAttribute(`aria-label`,a.title),o.innerHTML=`
      <h3>${b(a.title)}</h3>
      <p>Lesson ${i.index+1} of ${a.lessons.length}</p>
      ${x({label:c?`Practise again +5 XP`:`Start +10 XP`,block:!0,href:`#/lesson/${i.id}`,variant:c?`secondary`:`primary`})}`,r.closest(`.node-wrap`).append(o),o.querySelector(`.btn`).focus()}),e.addEventListener(`keydown`,e=>{e.key===`Escape`&&s()}),a}var lo=new Map,uo=null,fo=e=>e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`);function po(e){let{equivalents:t,ignoreDiacritics:n}=e.settings.answers,r=Object.keys(t).map(e=>e.toLowerCase().normalize(`NFC`));return{pattern:r.length?new RegExp(r.map(fo).join(`|`),`g`):null,map:Object.fromEntries(Object.entries(t).map(([e,t])=>[e.toLowerCase().normalize(`NFC`),t.toLowerCase()])),ignoreDiacritics:n}}function Z(e){uo?.course!==L&&(lo.clear(),uo={course:L,rules:po(L)});let t=String(e??``),n=lo.get(t);return n===void 0&&(lo.size>2e4&&lo.clear(),n=mo(t,uo.rules),lo.set(t,n)),n}function mo(e,{pattern:t,map:n,ignoreDiacritics:r}){let i=e.toLowerCase().normalize(`NFC`);return t&&(i=i.replace(t,e=>n[e])),r&&(i=i.normalize(`NFD`).replace(/\p{M}/gu,``).normalize(`NFC`)),i.replace(/[’‘`´]/g,`'`).replace(/[.,!?¿¡;:"“”()–—-]/g,` `).replace(/(^|\s)'+|'+(\s|$)/g,`$1$2`).replace(/\s+/g,` `).trim()}function ho(e,t){let n=Z(e);return n.length>0&&t.some(e=>Z(e)===n)}function go(e){return String(e).split(/\s+/).map(e=>e.replace(/^[.,!?¿¡;:"“”()'’‘]+|[.,!?¿¡;:"“”()'’‘]+$/g,``)).filter(Boolean)}function _o(e,t){if(e===t)return 0;let n=Array.from({length:t.length+1},(e,t)=>t);for(let r=1;r<=e.length;r+=1){let i=[r];for(let a=1;a<=t.length;a+=1)i[a]=Math.min(n[a]+1,i[a-1]+1,n[a-1]+(e[r-1]===t[a-1]?0:1));n=i}return n[t.length]}function vo(e,t){let n=Z(e);if(!n)return{correct:!1,typo:!1,closest:t[0]};let r={distance:1/0,answer:t[0]};for(let e of t){let t=_o(n,Z(e));if(t===0)return{correct:!0,typo:!1,closest:e};t<r.distance&&(r={distance:t,answer:e})}let i=Math.max(1,Math.floor(Z(r.answer).length/L.settings.answers.lettersPerTypo)),a=r.distance<=i;return{correct:a,typo:a,closest:r.answer}}function yo(e=Date.now()){let t=e>>>0,n=()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296};return{next:n,int:e=>Math.floor(n()*e),pick:e=>e[Math.floor(n()*e.length)],shuffle(e){let t=[...e];for(let e=t.length-1;e>0;--e){let r=Math.floor(n()*(e+1));[t[e],t[r]]=[t[r],t[e]]}return t},sample(e,t){return this.shuffle(e).slice(0,t)}}}hn.lesson.maxExercises;var bo=hn.exercises,xo=(e,t)=>e[t%e.length],So=e=>`“${e.replace(/[?.!]$/,``)}”`;function Co(e,t,n,r,{options:i=bo.choice.options}={}){let a=n.sample(t.filter(t=>t.id!==e.id&&Z(t.target)!==Z(e.target)&&Z(t.base)!==Z(e.base)),i-1),o=r===`toTarget`,s=n.shuffle([e,...a]).map(e=>({text:o?e.target:e.base,value:e.id}));return{type:`choice`,prompt:o?`Which one means ${So(e.base)}?`:`What does ${So(e.target)} mean?`,lang:o?`target`:`base`,options:s,answer:e.id,answerText:o?e.target:e.base,wordIds:[e.id]}}function wo(e,t,n,r,{minDistractors:i=bo.translate.minDistractors,maxDistractors:a=bo.translate.maxDistractors}={}){let o=r===`toBase`,s=o?e.base:e.target,c=go(s),l=new Set(c.map(e=>Z(e))),u=(o?t.baseTokens:t.targetTokens).filter(e=>!l.has(Z(e))),d=n.sample([...new Set(u)],Math.min(a,Math.max(i,6-c.length)));return{type:`translate`,prompt:`Write this in `+(o?L.names.from:L.names.to),source:o?e.target:e.base,sourceLang:o?`target`:`base`,lang:o?`base`:`target`,accepted:[s,...o?e.altBase:e.altTarget],answerText:s,bank:n.shuffle([...c,...d]),sentenceId:e.id,wordIds:e.wordIds??[]}}function To(e,t,{pairs:n=hn.lesson.match.pairs}={}){let r=new Set,i=t.shuffle(e).filter(e=>{let t=[`t:${Z(e.target)}`,`b:${Z(e.base)}`];return!t.some(e=>r.has(e))&&(t.forEach(e=>r.add(e)),!0)}).slice(0,n);return{type:`match`,prompt:`Tap the matching pairs`,pairs:i.map(e=>({id:e.id,target:e.target,base:e.base})),left:t.shuffle(i.map(e=>e.id)),right:t.shuffle(i.map(e=>e.id)),wordIds:i.map(e=>e.id)}}function Eo(e,t=`toBase`){let n=t===`toBase`;return{type:`type`,prompt:`Type this in ${n?L.names.from:L.names.to}`,source:n?e.target:e.base,sourceLang:n?`target`:`base`,lang:n?`base`:`target`,accepted:n?[e.base,...e.altBase]:[e.target,...e.altTarget],answerText:n?e.base:e.target,sentenceId:e.id,wordIds:e.wordIds??[]}}function Do(e,t,n,{distractors:r=hn.lesson.fill.distractors}={}){let i=go(e.target),a=t.filter(e=>!e.target.includes(` `)&&i.some(t=>Z(t)===Z(e.target)));if(!a.length)return null;let o=n.pick(a),s=RegExp(`(^|[\\s,])${o.target.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}(?=$|[\\s,.?!])`,`i`),c=s.exec(e.target);if(!c)return null;let l=c[0].slice(c[1].length),u=e.target.replace(s,`$1___`),d=e=>l[0]===l[0].toUpperCase()?e[0].toUpperCase()+e.slice(1):e[0].toLowerCase()+e.slice(1),f=n.sample(t.filter(e=>e.id!==o.id&&!e.target.includes(` `)&&Z(e.target)!==Z(o.target)),r);return f.length<r?null:{type:`fill`,prompt:`Fill in the blank`,sentence:u,translation:e.base,full:e.target,options:n.shuffle([l,...f.map(e=>d(e.target))]),answer:l,lang:`target`,wordIds:[o.id]}}function Oo(e,t){return{type:`dialogue`,prompt:`Choose the best reply`,speaker:e.speaker,line:e.target,translation:e.base,options:t.shuffle(e.options),answer:e.answer,lang:`target`,wordIds:[]}}function ko(e,t,n){return{...wo(e,t,n,`toTarget`),type:`listen`,prompt:`Tap what you hear`,audio:e.audio}}function Ao(e,t){let n=` ${Z(e.target)} `;return t.filter(e=>n.includes(` ${Z(e.target)} `)).map(e=>e.id)}function jo(e,t,n){let r=Object.fromEntries(e.units.map((e,t)=>[e.id,t])),i=Object.values(e.sentences).filter(e=>r[e.unit]<=r[n]);return{targetTokens:[...new Set([...t.flatMap(e=>go(e.target)),...i.flatMap(e=>go(e.target))])],baseTokens:[...new Set([...t.flatMap(e=>go(e.base.toLowerCase())),...i.flatMap(e=>go(e.base))])]}}var Mo={newWords({out:e,newWords:t,choicePool:n,rng:r,firstTime:i,settings:a,exercises:o},s){t.forEach((t,c)=>{i&&a.introCards&&e.push({type:`intro`,word:t,wordIds:[t.id]}),e.push(Co(t,n,r,xo(s.directions,c),o.choice))})},match({out:e,newWords:t,earlier:n,rng:r},i){let a=t.length>=i.minPairs?t:[...t,...r.sample(n,i.pairs-t.length)];a.length>=i.minPairs&&e.push(To(a,r,i))},sentences({out:e,sentences:t,pools:n,rng:r,exercises:i},a){t.forEach((t,o)=>e.push(wo(t,n,r,xo(a.directions,o),i.translate)))},fill({out:e,sentences:t,known:n,rng:r},i){let a=0;for(let o of r.shuffle(t)){if(a>=i.count)break;let t=Do(o,n,r,i);t&&(e.push(t),a+=1)}},dialogues({out:e,lesson:t,rng:n}){for(let r of t.dialogues)e.push(Oo(r,n))},type({out:e,sentences:t,newWords:n,rng:r},i){for(let a=0;a<i.count;a+=1)if(t.length)e.push(Eo(r.pick(t),i.direction));else if(n.length){let t=r.pick(n);e.push(Eo({...t,wordIds:[t.id]},i.direction))}},listen({out:e,sentences:t,newWords:n,pools:r,rng:i},a){for(let o of[...t,...n].filter(e=>e.audio).slice(0,a.count))e.push(ko(o,r,i))},reverse({out:e,sentences:t,pools:n,rng:r,exercises:i},a){for(let[o,s]of t.entries()){if(e.length>=a.upTo)break;e.push(wo(s,n,r,xo(a.directions,o),i.translate))}},newWordReview({out:e,newWords:t,choicePool:n,rng:r,exercises:i},a){for(let o of r.shuffle(t)){if(e.length>=a.upTo)break;e.push(Co(o,n,r,a.direction,i.choice))}},earlierReview({out:e,earlier:t,choicePool:n,rng:r,settings:i,exercises:a},o){for(let s of r.sample(t,o.count)){if(e.length>=i.maxExercises)break;e.push(Co(s,n,r,r.next()<.5?`toTarget`:`toBase`,a.choice))}}};function No(e,{course:t=L,seed:n,firstTime:r=!0}={}){let i=t.lessons[e];if(!i)throw Error(`Unknown lesson: ${e}`);let a=yo(n??Date.now()),{lesson:o,exercises:s}=i.settings,c=wn(e,t).map(e=>t.words[e]),l=i.newWords.map(e=>t.words[e]),u=c.filter(e=>!i.newWords.includes(e.id)),d=i.sentences.map(e=>({...t.sentences[e],wordIds:Ao(t.sentences[e],c)})),f=jo(t,c,i.unit),p=c.length>=s.choice.options?c:Object.values(t.words).filter(e=>e.unit===i.unit),m=[],h={out:m,lesson:i,course:t,rng:a,firstTime:r,settings:o,exercises:s,known:c,newWords:l,earlier:u,sentences:d,pools:f,choicePool:p};for(let e of o.steps)Mo[e](h,o[e]??{});return m.slice(0,o.maxExercises)}function Po(e,{now:t=()=>Date.now()}={}){let n=e.map((e,t)=>({...e,key:t})),r=n.length,i=new Set,a=0,o=0,s=0,c=0,l=0,u=new Map,d=t();return{get current(){return n[a]??null},get done(){return a>=n.length},get progress(){return Math.min(1,l/r)},get total(){return r},answer(e){let t=n[a];if((e!==!1||i.has(t.key))&&(l+=1),e===!0)o+=1,i.has(t.key)||(c+=1);else if(e===!1){s+=1;for(let e of t.wordIds??[])u.set(e,(u.get(e)??0)+1);i.has(t.key)||(i.add(t.key),n.push(t))}},next(){a+=1},seenWordIds(){return[...new Set(n.slice(0,a+1).flatMap(e=>e.wordIds??[]))]},noteMiss(e){for(let t of e)u.set(t,(u.get(t)??0)+1)},result(){let e=n.filter(e=>e.type!==`intro`),r=new Set(e.map(e=>e.key)).size;return{correct:o,wrong:s,firstTry:c,accuracy:r?c/r:1,perfect:s===0,seconds:Math.round((t()-d)/1e3),missed:Object.fromEntries(u),wordIds:[...new Set(n.flatMap(e=>e.wordIds??[]))]}}}}function Fo(e,t,n){let r=e.word;return t.innerHTML=`
    <div class="ex ex--intro">
      ${ce(`New word`,{variant:`primary`,iconName:`star`})}
      <p class="ex-intro__lg" ${R(`target`)}>${b(r.target)}</p>
      <p class="ex-intro__en"${R(`base`)}>${b(r.base)}</p>
      ${r.notes?`<p class="ex-intro__notes caption">${b(r.notes)}</p>`:``}
    </div>`,n.setReady(!0),{check:()=>({correct:null})}}function Io(e,t,n){let r=null;t.innerHTML=`
    <div class="ex ex--choice">
      <h2 class="ex__prompt">${b(e.prompt)}</h2>
      <div class="ex-choice__options" role="radiogroup" aria-label="Answers">
        ${e.options.map((t,n)=>`<button class="choice" type="button" role="radio" aria-checked="false" data-value="${b(t.value)}" ${R(e.lang)}><span class="choice__key">${n+1}</span><span>${b(t.text)}</span></button>`).join(``)}
      </div>
    </div>`;let i=[...t.querySelectorAll(`[data-value]`)];function a(e){n.locked()||(r=e.dataset.value,i.forEach(t=>t.setAttribute(`aria-checked`,String(t===e))),n.setReady(!0))}return t.addEventListener(`click`,e=>{let t=e.target.closest(`[data-value]`);t&&a(t)}),{keydown(e){let t=Number(e.key);return t>=1&&t<=i.length&&(a(i[t-1]),!0)},check(){let t=r===e.answer;return i.forEach(t=>{t.dataset.value===e.answer?t.classList.add(`is-correct`):t.dataset.value===r&&t.classList.add(`is-wrong`)}),{correct:t,answerText:e.answerText}}}}var Lo=!1;function Ro(e,t,n){let r=[],i=!1;t.innerHTML=`
    <div class="ex ex--translate">
      <h2 class="ex__prompt">${b(e.prompt)}</h2>
      <div class="ex-translate__source">
        <p class="speech speech--left"${R(e.sourceLang)}>${b(e.source)}</p>
      </div>
      <div class="ex-translate__answer" data-answer aria-label="Your answer" aria-live="polite"></div>
      <div class="ex-translate__bank" data-bank>
        ${e.bank.map((t,n)=>`<button class="tile" type="button" data-tile="${n}"${R(e.lang)}>${b(t)}</button>`).join(``)}
      </div>
      <label class="visually-hidden" for="ex-translate-input">Your answer</label>
      <textarea id="ex-translate-input" class="input ex-type__input" rows="3" autocomplete="off" autocapitalize="off" spellcheck="false" hidden${R(e.lang)} placeholder="Type in ${b(Tn(e.lang))}"></textarea>
      <button class="btn btn--ghost btn--sm ex-translate__mode" type="button" data-mode>Use keyboard</button>
    </div>`;let a=t.querySelector(`[data-answer]`),o=t.querySelector(`[data-bank]`),s=[...t.querySelectorAll(`[data-tile]`)],c=t.querySelector(`textarea`),l=t.querySelector(`[data-mode]`);function u(e,{focus:t=!0}={}){i=e,Lo=e,a.hidden=e,o.hidden=e,c.hidden=!e,l.textContent=e?`Use word bank`:`Use keyboard`,n.setReady(e?c.value.trim().length>0:r.length>0),t&&(e?c:s.find(e=>!e.disabled))?.focus()}c.addEventListener(`input`,()=>n.setReady(c.value.trim().length>0)),c.addEventListener(`keydown`,e=>{e.key===`Enter`&&e.preventDefault()});function d(){a.innerHTML=r.map((t,n)=>`<button class="tile" type="button" data-placed="${n}"${R(e.lang)}>${b(e.bank[t])}</button>`).join(``),s.forEach((e,t)=>{let n=r.includes(t);e.classList.toggle(`is-used`,n),e.disabled=n}),n.setReady(r.length>0)}return t.addEventListener(`click`,e=>{if(n.locked())return;if(e.target.closest(`[data-mode]`)){u(!i);return}let t=e.target.closest(`[data-tile]`);if(t&&!t.disabled){r.push(Number(t.dataset.tile)),d(),(document.activeElement===t||document.activeElement===document.body)&&s.find(e=>!e.disabled)?.focus();return}let a=e.target.closest(`[data-placed]`);a&&(r.splice(Number(a.dataset.placed),1),d())}),Lo&&u(!0,{focus:!1}),{keydown(e){return i?!1:e.key===`Backspace`&&r.length?(r.pop(),d(),!0):!1},check(){if(l.disabled=!0,i){c.readOnly=!0;let{correct:t,typo:n}=vo(c.value,e.accepted);return{correct:t,answerText:e.answerText,note:n?`You have a typo.`:``}}return{correct:ho(r.map(t=>e.bank[t]).join(` `),e.accepted),answerText:e.answerText}}}}function zo(e,t,n){let r=Object.fromEntries(e.pairs.map(e=>[e.id,e])),i=null,a=0;t.innerHTML=`
    <div class="ex ex--match">
      <h2 class="ex__prompt">${b(e.prompt)}</h2>
      <div class="ex-match__grid">
        <div class="ex-match__col">${e.left.map((e,t)=>`<button class="tile" type="button" data-side="target" data-id="${e}"${R(`target`)}><span class="choice__key">${t+1}</span>${b(r[e].target)}</button>`).join(``)}</div>
        <div class="ex-match__col">${e.right.map((t,n)=>`<button class="tile" type="button" data-side="base" data-id="${t}"${R(`base`)}><span class="choice__key">${(n+1+e.left.length)%10}</span>${b(r[t].base)}</button>`).join(``)}</div>
      </div>
    </div>`;let o=[...t.querySelectorAll(`[data-side]`)];function s(t){if(t.disabled)return;if(!i||i.side===t.dataset.side){o.forEach(e=>e.classList.remove(`is-selected`)),t.classList.add(`is-selected`),i={side:t.dataset.side,id:t.dataset.id,el:t};return}let r=i.el;if(i=null,r.classList.remove(`is-selected`),r.dataset.id===t.dataset.id){for(let e of[r,t])e.classList.add(`is-correct`),e.disabled=!0,setTimeout(()=>e.classList.add(`is-used`),350);a+=1,a===e.pairs.length&&setTimeout(()=>n.complete(!0),450)}else{n.miss([r.dataset.id,t.dataset.id]);for(let e of[r,t])e.classList.add(`is-wrong`),setTimeout(()=>e.classList.remove(`is-wrong`),400)}}return t.addEventListener(`click`,e=>{let t=e.target.closest(`[data-side]`);t&&s(t)}),n.setReady(!1,{hideCheck:!0}),{keydown(e){let t=e.key===`0`?10:Number(e.key);return t>=1&&t<=o.length&&(s(o[t-1]),!0)},check:()=>({correct:!0})}}function Bo(e,t,n){t.innerHTML=`
    <div class="ex ex--type">
      <h2 class="ex__prompt">${b(e.prompt)}</h2>
      <div class="ex-translate__source"><p class="speech speech--left"${R(e.sourceLang)}>${b(e.source)}</p></div>
      <label class="visually-hidden" for="ex-type-input">Your answer</label>
      <textarea id="ex-type-input" class="input ex-type__input" rows="3" autocomplete="off" autocapitalize="off" spellcheck="false"${R(e.lang)} placeholder="Type in ${b(Tn(e.lang))}"></textarea>
    </div>`;let r=t.querySelector(`textarea`);return r.addEventListener(`input`,()=>n.setReady(r.value.trim().length>0)),r.addEventListener(`keydown`,e=>{e.key===`Enter`&&e.preventDefault()}),{check(){r.readOnly=!0;let{correct:t,typo:n,closest:i}=vo(r.value,e.accepted);return{correct:t,answerText:t&&!n?null:i,note:n?`You have a typo.`:``}}}}function Vo(e,t,n){let r=null,[i,a]=e.sentence.split(`___`);t.innerHTML=`
    <div class="ex ex--fill">
      <h2 class="ex__prompt">${b(e.prompt)}</h2>
      <p class="ex-fill__hint muted">${b(e.translation)}</p>
      <p class="ex-fill__sentence"${R(`target`)}>${b(i)}<span class="ex-fill__blank" data-blank>&nbsp;</span>${b(a)}</p>
      <div class="ex-fill__options" role="radiogroup" aria-label="Answers">
        ${e.options.map((e,t)=>`<button class="tile" type="button" role="radio" aria-checked="false" data-value="${b(e)}"${R(`target`)}><span class="choice__key">${t+1}</span>${b(e)}</button>`).join(``)}
      </div>
    </div>`;let o=[...t.querySelectorAll(`[data-value]`)],s=t.querySelector(`[data-blank]`);function c(e){n.locked()||(r=e.dataset.value,o.forEach(t=>{t.setAttribute(`aria-checked`,String(t===e)),t.classList.toggle(`is-selected`,t===e)}),s.textContent=r,s.classList.add(`is-filled`),n.setReady(!0))}return t.addEventListener(`click`,e=>{let t=e.target.closest(`[data-value]`);t&&c(t)}),{keydown(e){let t=Number(e.key);return t>=1&&t<=o.length&&(c(o[t-1]),!0)},check(){let t=r===e.answer;return s.classList.add(t?`is-correct`:`is-wrong`),{correct:t,answerText:e.full}}}}function Ho(e,t,n){let r=null,i=En(e.speaker),a=i.name;t.innerHTML=`
    <div class="ex ex--dialogue">
      <h2 class="ex__prompt">${b(e.prompt)}</h2>
      <div class="ex-dialogue__scene">
        <div class="ex-dialogue__speaker">${o(i.look,{expression:`happy`})}<span>${b(a)}</span></div>
        <div class="speech speech--left ex-dialogue__line">
          <p${R(`target`)}>${b(e.line)}</p>
          <button class="ex-dialogue__reveal" type="button" data-reveal aria-expanded="false">${y(`book`,{size:16})} Show translation</button>
          <p class="ex-dialogue__translation muted" hidden>${b(e.translation)}</p>
        </div>
      </div>
      <div class="ex-choice__options" role="radiogroup" aria-label="Replies">
        ${e.options.map((e,t)=>`<button class="choice" type="button" role="radio" aria-checked="false" data-value="${b(e)}"${R(`target`)}><span class="choice__key">${t+1}</span><span>${b(e)}</span></button>`).join(``)}
      </div>
    </div>`;let s=[...t.querySelectorAll(`[data-value]`)];function c(e){n.locked()||(r=e.dataset.value,s.forEach(t=>t.setAttribute(`aria-checked`,String(t===e))),n.setReady(!0))}return t.addEventListener(`click`,e=>{let n=e.target.closest(`[data-reveal]`);if(n){t.querySelector(`.ex-dialogue__translation`).hidden=!1,n.setAttribute(`aria-expanded`,`true`),n.hidden=!0;return}let r=e.target.closest(`[data-value]`);r&&c(r)}),{keydown(e){let t=Number(e.key);return t>=1&&t<=s.length&&(c(s[t-1]),!0)},check(){let t=r===e.answer;return s.forEach(t=>{t.dataset.value===e.answer?t.classList.add(`is-correct`):t.dataset.value===r&&t.classList.add(`is-wrong`)}),{correct:t,answerText:e.answer}}}}function Uo(e,t,n){let r=[],i=new Audio(e.audio);t.innerHTML=`
    <div class="ex ex--listen">
      <h2 class="ex__prompt">${b(e.prompt)}</h2>
      <div class="ex-listen__controls">
        <button class="btn btn--blue ex-listen__play" type="button" data-play aria-label="Play audio">${y(`speaker`,{size:40})}</button>
      </div>
      <div class="ex-translate__answer" data-answer aria-live="polite"></div>
      <div class="ex-translate__bank">${e.bank.map((e,t)=>`<button class="tile" type="button" data-tile="${t}"${R(`target`)}>${b(e)}</button>`).join(``)}</div>
    </div>`;let a=t.querySelector(`[data-answer]`),o=[...t.querySelectorAll(`[data-tile]`)],s=()=>{i.currentTime=0,i.play().catch(()=>{})};function c(){a.innerHTML=r.map((t,n)=>`<button class="tile" type="button" data-placed="${n}"${R(`target`)}>${b(e.bank[t])}</button>`).join(``),o.forEach((e,t)=>{e.disabled=r.includes(t),e.classList.toggle(`is-used`,e.disabled)}),n.setReady(r.length>0)}return t.addEventListener(`click`,e=>{if(e.target.closest(`[data-play]`))return s();if(n.locked())return;let t=e.target.closest(`[data-tile]`);t&&!t.disabled&&r.push(Number(t.dataset.tile));let i=e.target.closest(`[data-placed]`);i&&r.splice(Number(i.dataset.placed),1),c()}),setTimeout(s,300),{check:()=>({correct:ho(r.map(t=>e.bank[t]).join(` `),e.accepted),answerText:e.answerText})}}var Wo={intro:Fo,choice:Io,translate:Ro,match:zo,type:Bo,fill:Vo,dialogue:Ho,listen:Uo},Go={lesson:5,practice:3,perfect:5},Ko={3:10,7:25,14:35,30:50,50:75,100:150,200:200,365:365},qo=[{id:`freeze`,title:`Streak freeze`,icon:`snowflake`,price:60,description:`Keeps your streak if you miss a day. Hold up to 2.`},{id:`refill`,title:`Heart refill`,icon:`heart`,price:40,description:`Refill to 5 hearts right away.`},{id:`frame-gold`,title:`Gold frame`,icon:`star`,price:100,description:`A gold ring around your avatar.`,cosmetic:!0},{id:`frame-bauhaus`,title:`Bauhaus frame`,icon:`target`,price:150,description:`Vermillion, ink and gold quarters around your avatar.`,cosmetic:!0},{id:`frame-sky`,title:`Lake frame`,icon:`target`,price:200,description:`A deep blue ring, like Lake Nalubaale at dusk.`,cosmetic:!0},{id:`frame-sun`,title:`Sunburst frame`,icon:`star`,price:300,description:`Yellow and vermillion rays around your avatar.`,cosmetic:!0}];function Jo({perTier:e=10}={}){let t=Object.entries(Ko),[n,r]=t[0],[i,a]=t[t.length-1];return[{label:`Finish a lesson`,gems:`+${Go.lesson}`},{label:`Finish a practice session`,gems:`+${Go.practice}`},{label:`No mistakes in a session`,gems:`+${Go.perfect} bonus`},{label:`Streak milestones (${n} to ${i} days)`,gems:`+${r} to +${a}`},{label:`Achievement levels`,gems:`+${e} per level`}]}function Yo(e,{practice:t=!1}={}){return(t?Go.practice:Go.lesson)+(e.perfect?Go.perfect:0)}function Xo(e,t,n=Date.now()){return e.gems<t.price?{ok:!1,reason:`Not enough gems`}:t.id===`freeze`&&e.streak.freezes>=2?{ok:!1,reason:`Fully stocked`}:t.id===`refill`&&F(e,n).full?{ok:!1,reason:`Hearts are full`}:t.cosmetic&&e.inventory[t.id]?{ok:!1,reason:`Owned`}:{ok:!0}}function Zo(e,t,n=Date.now()){let r=qo.find(e=>e.id===t);return!r||!Xo(e,r,n).ok?!1:r.id===`refill`?tn(e,n):(e.gems-=r.price,r.id===`freeze`&&(e.streak.freezes+=1),r.cosmetic&&(e.inventory[r.id]=!0,e.profile&&(e.profile.avatar={...e.profile.avatar,frame:r.id})),!0)}function Qo(e,t,n,r=new Date){let i=e.lessons[t]??{completions:0,bestAccuracy:0};return e.lessons[t]={completions:i.completions+1,bestAccuracy:Math.max(i.bestAccuracy??0,n.accuracy),lastCompletedAt:r.toISOString()},e.stats.lessonsCompleted+=1,n.perfect&&(e.stats.perfectLessons+=1),e.stats.answers+=n.correct+n.wrong,e.stats.correctAnswers+=n.correct,e.stats.secondsLearning+=n.seconds,e}function $o(e,t,{replay:n=!1,base:r,practice:i=!1,now:a=new Date}={}){let o=D.get(),s=Ha(t,{replay:n,base:r}),c,l=0,u=[],d=D.update(n=>{e&&Qo(n,e,t,a),Ua(n,s.total,a),c=cn(n,N(a)),Gt(n,t,N(a)),mi(n,a),i&&(Kt(n,t),en(n,1,a.getTime()),n.stats.practiceSessions+=1),l=Yo(t,{practice:i})+(c.extended&&c.milestone?Ko[c.milestone]??0:0),n.gems+=l,u=lr(n)});return{xp:s,streak:c,gems:l,achievements:u,before:o,after:d,goalBefore:Ga(o,a),goalAfter:Ga(d,a)}}var es={choice({out:e,focus:t,choicePool:n,rng:r,exercises:i}){t.forEach((t,a)=>e.push(Co(t,n,r,a%2?`toBase`:`toTarget`,i.choice)))},match({out:e,focus:t,rng:n,lesson:r}){t.length>=r.match.minPairs&&e.push(To(t,n,r.match))},translate({out:e,sentences:t,pools:n,rng:r,practice:i,exercises:a}){for(let[o,s]of r.sample(t,i.sentences).entries())e.push(wo(s,n,r,o%2?`toTarget`:`toBase`,a.translate))},fill({out:e,sentences:t,known:n,rng:r,lesson:i}){let a=r.pick(t),o=a&&Do(a,n,r,i.fill);o&&e.push(o)},type({out:e,sentences:t,focus:n,rng:r,lesson:i}){t.length?e.push(Eo(r.pick(t),i.type.direction)):e.push(Eo({...n[0],wordIds:[n[0].id]},i.type.direction))}};function ts(e,{course:t=L,seed:n,size:r,knownIds:i=e}={}){let{practice:a,lesson:o,exercises:s}=t.settings,c=yo(n??Date.now()),l=e.map(e=>t.words[e]).filter(Boolean);if(!l.length)return[];let u=[...new Set([...i,...e])].map(e=>t.words[e]).filter(Boolean),d=jo(t,u,t.units.findLast(e=>u.some(t=>t.unit===e.id))?.id??t.units[0].id),f=u.length>=s.choice.options?u:Object.values(t.words).filter(e=>e.unit===t.units[0].id),p=l.slice(0,a.focusWords),m=new Set(p.map(e=>e.id)),h=new Set(u.map(e=>e.id)),g=Object.values(t.sentences).map(e=>({...e,wordIds:Ao(e,u)})).filter(e=>e.wordIds.some(e=>m.has(e))&&e.wordIds.every(e=>h.has(e))),_=[],v={out:_,focus:p,choicePool:f,known:u,sentences:g,pools:d,rng:c,practice:a,lesson:o,exercises:s};for(let e of a.steps)es[e](v);return(a.shuffle?c.shuffle(_):_).slice(0,r??a.size)}function ns(e,{course:t=L,seed:n}={}){let r=t.sections.find(t=>t.id===e),i=t.sections.slice(0,r.index),a=e=>e.units.flatMap(e=>e.skills.flatMap(e=>e.lessons.flatMap(e=>e.newWords))),o=yo(n??Date.now()),s=a(i.at(-1)),c=i.slice(0,-1).flatMap(a),l=[...o.sample(s,6),...o.sample(c,2)],u=i.flatMap(a);return ts(l.length?l:o.sample(u,8),{course:t,seed:o.int(1e9),size:t.settings.sectionTest.size,knownIds:u})}function rs(e,{course:t=L,seed:n,knownIds:r}={}){let i=t.units.find(t=>t.id===e),a=i.skills.flatMap(e=>e.lessons.flatMap(e=>e.newWords)),o=yo(n??Date.now());return ts(o.shuffle(a),{course:t,seed:o.int(1e9),size:i.settings.checkpoint.size,knownIds:r??a})}var Q={out:{title:`Let’s take a quick step back`,body:`That was your last heart. A short look back at words you’ve already met fills them all up again, then you carry on right where you left off.`,review:`Review to refill hearts`,refill:`Use {cost} gems instead`,quit:`Leave for now`},gate:{title:`Warm up first`,body:`Your hearts are empty, so start with a quick review of earlier words. Finish it and your hearts fill up for the next lesson.`,review:`Start warm-up review`,refill:`Use {cost} gems instead`,back:`Back to the path`},session:`Heart review`,quit:{label:`Leave heart review`,title:`Leave the review?`,body:`Your hearts only refill when you finish it. It’s just a few questions.`,stay:`Keep reviewing`,leave:`Leave`},done:{title:`Hearts refilled!`,body:`Those words are fresher now. Back to it!`,next:`Continue lesson`,start:`Let’s go`}};function is(e,t){return e.replace(/\{(\w+)\}/g,(e,n)=>t[n]??``)}function as({missed:e=[],seen:t=[]}={}){let n=D.get();return nn(n,{missed:e,seen:t,learned:W(n),exists:e=>!!L.words[e]})}var os=e=>D.get().gems>=40?[{label:is(e,{cost:40}),value:`refill`,variant:`secondary`}]:[];function ss(){D.update(e=>{tn(e)})}function cs({root:e,words:t,onDone:n,onQuit:r}){let i=ts(t,{knownIds:[...W(D.get()),...t],size:8});if(!i.length)return D.update(e=>{e.hearts={count:5,updatedAt:Date.now()}}),n(),()=>{};let a=ms({root:e,exercises:i,title:Q.session,quitPrompt:Q.quit,onQuit:r,onFinish:e=>{a.cleanup(),D.update(t=>rn(t,e)),O(`reward`),n(e)}});return a.cleanup}function ls(e){return T({title:Q.done.title,body:`<p>${b(Q.done.body)}</p>`,art:n({pose:`cheering`}),dismissible:!1,actions:[{label:e,value:`go`}]})}async function us({root:e,lessonEl:t,missed:r,seen:i,onQuit:a,track:o}){let s=as({missed:r,seen:i}),c=await T({title:Q.out.title,body:`<p>${b(Q.out.body)}</p>`,art:n({pose:`thinking`}),dismissible:!1,actions:[{label:Q.out.review,value:`review`},...os(Q.out.refill),{label:Q.out.quit,value:`quit`,variant:`ghost`}]});if(c===`refill`)return ss(),!0;if(c!==`review`)return a(),!1;let l=document.createElement(`div`);l.dataset.heartReview=``,t.hidden=!0,e.append(l);let u=await new Promise(e=>{o(cs({root:l,words:s,onDone:()=>e(!0),onQuit:()=>e(!1)}))});return o(null),l.remove(),u?(t.hidden=!1,await ls(Q.done.next),!0):(a(),!1)}function ds({root:e,navigate:t,onReady:r}){let i=as(),a=()=>{};if(!i.length)return D.update(e=>{e.hearts={count:5,updatedAt:Date.now()}}),a=r()??a,()=>a();let o=D.get().gems>=40;return e.innerHTML=`
    <section class="empty-state">
      <div class="empty-state__art">${n({pose:`thinking`})}</div>
      <h1>${b(Q.gate.title)}</h1>
      <p class="muted">${b(Q.gate.body)}</p>
      ${x({label:Q.gate.review,size:`lg`,attrs:`data-review`})}
      ${o?x({label:is(Q.gate.refill,{cost:40}),variant:`secondary`,attrs:`data-refill`}):``}
      ${x({label:Q.gate.back,href:`#/learn`,variant:`ghost`})}
    </section>`,e.querySelector(`[data-refill]`)?.addEventListener(`click`,()=>{ss(),a=r()??a}),e.querySelector(`[data-review]`).addEventListener(`click`,()=>{a=cs({root:e,words:i,onQuit:()=>t(`/learn`),onDone:async()=>{await ls(Q.done.start),a=r()??(()=>{})}})}),()=>a()}var fs={label:`Quit lesson`,title:`Wait, don’t go!`,body:`You’ll lose your progress in this lesson if you quit now.`,stay:`Keep learning`,leave:`End session`},ps=[`Nice!`,`Great job!`,`Correct!`,`Kale!`,`Well done!`,`Excellent!`];function ms({root:e,exercises:t,onQuit:r,onFinish:i,hearts:a=!1,title:o=`Lesson`,quitPrompt:s=fs}){let c=Po(t),l=null,u=`answer`,d=!1,f=null;e.innerHTML=`
    <div class="lesson">
      <h1 class="visually-hidden">${b(o)}</h1>
      <header class="lesson__top">
        <button class="icon-btn" type="button" data-quit aria-label="${b(s.label)}">${y(`close`)}</button>
        <div class="lesson__progress" data-progress></div>
        <div class="lesson__extra" data-extra></div>
      </header>
      <div class="lesson__stage" data-stage></div>
      <footer class="lesson__footer" data-footer>
        <div class="lesson__feedback" data-feedback role="status" aria-live="polite"></div>
        <div class="lesson__actions">${x({label:`Check`,size:`lg`,block:!0,disabled:!0,attrs:`data-main`})}</div>
      </footer>
    </div>`;let p=e.querySelector(`[data-stage]`),m=e.querySelector(`[data-footer]`),h=e.querySelector(`[data-feedback]`),g=e.querySelector(`[data-main]`),_=g.querySelector(`span`);O(`start`),p.addEventListener(`click`,e=>{let t=e.target.closest(`button`);t&&!t.disabled&&!t.matches(`[data-play]`)&&!d&&O(`tap`)});function v(t=!1){if(!a)return;let{count:n}=F(D.get());e.querySelector(`[data-extra]`).innerHTML=`<span class="lesson__hearts${t?` is-lost`:``}" aria-label="${n} hearts left">${y(`heart`,{size:26})}<span>${n}</span></span>`}function ee(){e.querySelector(`[data-progress]`).innerHTML=S(c.progress,{label:`Lesson progress`})}let te={setReady(e,{hideCheck:t=!1}={}){g.disabled=!e,m.classList.toggle(`is-hidden`,t)},locked:()=>d,complete(e){c.answer(e),ie()},miss(e){c.noteMiss(e)}};function ne(){let e=c.current;u=`answer`,d=!1,m.className=`lesson__footer`,h.innerHTML=``,_.textContent=e.type===`intro`?`Continue`:`Check`,g.className=`btn btn--primary btn--lg btn--block`,p.innerHTML=`<div class="lesson__exercise" data-ex></div>`,l=Wo[e.type](e,p.querySelector(`[data-ex]`),te),ee(),[...p.querySelectorAll(`button, input, textarea`)].find(e=>e.offsetParent!==null&&!e.disabled)?.focus({preventScroll:!0})}function re(){let e=c.current,{correct:t,answerText:n,note:r}=l.check();d=!0,t===null?(c.answer(null),ie()):(c.answer(t),O(t?`correct`:`wrong`),!t&&a&&(D.update(e=>$t(e)),v(!0)),u=`feedback`,m.className=`lesson__footer lesson__footer--${t?`good`:`bad`}`,h.innerHTML=t?`<div class="fb"><span class="fb__icon">${y(`check`,{size:26})}</span><div><strong>${r?b(r):ps[Math.floor(Math.random()*ps.length)]}</strong>${(e.type===`translate`||r)&&n?`<p class="fb__answer">${b(n)}</p>`:``}</div></div>`:`<div class="fb"><span class="fb__icon">${y(`cross`,{size:26})}</span><div><strong>Correct answer:</strong><p class="fb__answer"${e.lang?R(e.lang):``}>${b(n??``)}</p></div></div>`,_.textContent=`Continue`,g.className=`btn btn--${t?`success`:`danger`} btn--lg btn--block`,g.disabled=!1,g.focus({preventScroll:!0}),ee())}async function ie(){if(a&&F(D.get()).count===0){if(!await us({root:e,lessonEl:e.querySelector(`.lesson`),missed:Object.keys(c.result().missed),seen:c.seenWordIds(),onQuit:r,track:e=>{f=e}}))return;v()}c.next(),c.done?i(c.result()):ne()}g.addEventListener(`click`,()=>{g.disabled||(u===`answer`?re():ie())});async function ae(){await T({title:s.title,body:`<p>${b(s.body)}</p>`,art:n({pose:`sad`}),actions:[{label:s.stay,value:`stay`},{label:s.leave,value:`quit`,variant:`ghost`}]})===`quit`&&r()}e.querySelector(`[data-quit]`).addEventListener(`click`,ae);function oe(e){f||document.querySelector(`.modal-backdrop`)||e.target.matches(`input, textarea`)&&e.key!==`Enter`||(e.key===`Enter`&&!g.disabled&&(e.target.tagName!==`BUTTON`||e.target.closest(`[role="radio"]`))?(e.preventDefault(),g.click()):u===`answer`&&!e.target.matches(`input, textarea`)&&l.keydown?.(e)&&e.preventDefault())}return document.addEventListener(`keydown`,oe),v(),ne(),{extraEl:e.querySelector(`[data-extra]`),cleanup:()=>{f?.(),document.removeEventListener(`keydown`,oe)}}}function hs({root:e,params:t,query:n={},navigate:r}){let i=L.lessons[t.id],a=D.get();if(!i||!Qn(a,t.id)){r(`/learn`,{replace:!0});return}let o=!H(a,i.id);if(i.settings.lesson.hearts&&F(a).count===0)return ds({root:e,navigate:r,onReady:()=>hs({root:e,params:t,query:n,navigate:r})});let s=ms({root:e,hearts:i.settings.lesson.hearts,exercises:No(i.id,{firstTime:o,seed:Number(n.seed)||void 0}),onQuit:()=>r(`/learn`),onFinish:t=>{s.cleanup(),ci(e,{result:t,...$o(i.id,t,{replay:!o}),onDone:()=>r(`/learn`)})}});return s.cleanup}var gs=[`M`,`T`,`W`,`T`,`F`,`S`,`S`];function _s(e,t,n,r){let i=new Date(e,t,1),a=new Date(e,t+1,0).getDate(),o=(i.getDay()+6)%7,s=N(),c=[];for(let e=0;e<o;e+=1)c.push(`<span class="cal__cell cal__cell--empty" aria-hidden="true"></span>`);for(let o=1;o<=a;o+=1){let a=N(new Date(e,t,o)),l=(n.xp.byDay[a]??0)>0,u=r.includes(a),d=[`cal__cell`,l&&`is-active`,u&&`is-frozen`,a===s&&`is-today`].filter(Boolean).join(` `),f=`${i.toLocaleString(`en`,{month:`long`})} ${o}${l?`, practised`:u?`, streak freeze used`:``}`;c.push(`<span class="${d}" role="listitem" aria-label="${f}">${u?y(`snowflake`,{size:14}):o}</span>`)}return c.join(``)}function vs({root:e}){let t=D.get(),n=I(t),r=ln(n.current),i=new Date,a=i.getFullYear(),o=i.getMonth();function s(){let i=new Date(a,o,1).toLocaleString(`en`,{month:`long`,year:`numeric`});e.innerHTML=`
      <div class="page streak-page">
        <header class="streak-hero">
          <div>
            <p class="eyebrow">Streak</p>
            <h1><strong>${n.current}</strong> day${n.current===1?``:`s`}</h1>
            <p class="muted">${n.doneToday?`You’ve practised today. See you tomorrow!`:n.current?`Finish a lesson today to extend your streak.`:`Finish a lesson to start a streak.`}</p>
          </div>
          <div class="streak-hero__art">${d({days:n.current})}</div>
        </header>

        ${r?`<section class="card streak-next">
          <h2>Next milestone: ${r} days</h2>
          ${S(n.current/r,{label:`Progress to next milestone`,variant:`gold`})}
          <p class="muted">${r-n.current} day${r-n.current===1?``:`s`} to go</p>
        </section>`:``}

        <section class="streak-stats">
          <div class="card"><span class="streak-stats__icon">${y(`flame`,{size:26})}</span><strong>${n.longest}</strong><span class="muted">Longest streak</span></div>
          <div class="card"><span class="streak-stats__icon streak-stats__icon--freeze">${y(`snowflake`,{size:26})}</span><strong>${n.freezes} / 2</strong><span class="muted">Streak freezes</span></div>
        </section>
        ${n.freezes<2?`<p class="streak-shop">A streak freeze covers a day you miss. ${x({label:`Get one with gems`,href:`#/shop`,variant:`ghost`})}</p>`:``}

        <section class="card cal">
          <header class="cal__head">
            <button class="icon-btn" type="button" data-month="-1" aria-label="Previous month">${y(`back`,{size:20})}</button>
            <h2>${b(i)}</h2>
            <button class="icon-btn" type="button" data-month="1" aria-label="Next month">${y(`arrow`,{size:20})}</button>
          </header>
          <div class="cal__grid" role="list" aria-label="${b(i)}">
            ${gs.map(e=>`<span class="cal__dow" aria-hidden="true">${e}</span>`).join(``)}
            ${_s(a,o,t,n.frozenDays)}
          </div>
          <p class="cal__legend"><span class="cal__key is-active"></span> Practised <span class="cal__key is-frozen"></span> Freeze used</p>
        </section>
      </div>`}e.addEventListener(`click`,e=>{let t=e.target.closest(`[data-month]`);t&&(o+=Number(t.dataset.month),o<0?(o=11,--a):o>11&&(o=0,a+=1),s())}),s()}function ys(e){let t=Xa(e),n=t.filter(e=>e.unlocked&&!e.done).length;return n?`${n} new stor${n===1?`y`:`ies`} to read`:`${t.filter(e=>e.done).length} of ${t.length} read`}function bs(e){return L.skills[e].lessons.flatMap(e=>e.newWords)}function xs({root:e}){let t=D.get(),n=W(t),r=Jt(t).filter(e=>L.words[e]),i=t.mistakes.filter(e=>L.words[e]);if(!n.length){e.innerHTML=`
      <section class="empty-state">
        <div class="empty-state__art">${u(`empty`)}</div>
        <h1>Nothing to practise yet</h1>
        <p class="muted">Finish your first lesson and the words you learn will show up here for review.</p>
        ${x({label:`Start learning`,href:`#/learn`})}
      </section>`;return}let a=L.units.filter(e=>ar(t,e.id));e.innerHTML=`
    <div class="page">
      <header class="page__header">
        <p class="eyebrow">Practice hub</p>
        <h1>Keep words <strong>fresh.</strong></h1>
        <p class="muted">Practice doesn’t cost hearts, and each session earns one back.</p>
      </header>

      <div class="practice-cards">
        <a class="practice-card practice-card--review" href="#/practice/session?mode=review">
          <span class="practice-card__icon">${y(`target`,{size:30})}</span>
          <span><strong>Review</strong><small>${r.length?`${r.length} word${r.length===1?``:`s`} due today`:`Strengthen your weakest words`}</small></span>
          ${y(`arrow`,{size:22})}
        </a>
        <a class="practice-card practice-card--mistakes${i.length?``:` is-disabled`}" href="${i.length?`#/practice/session?mode=mistakes`:`#/practice`}" ${i.length?``:`aria-disabled="true"`}>
          <span class="practice-card__icon">${y(`cross`,{size:26})}</span>
          <span><strong>Mistakes</strong><small>${i.length?`${i.length} word${i.length===1?``:`s`} to fix`:`No recent mistakes. Nice!`}</small></span>
          ${y(`arrow`,{size:22})}
        </a>
        <a class="practice-card practice-card--stories" href="#/stories">
          <span class="practice-card__icon">${y(`stories`,{size:26})}</span>
          <span><strong>Stories</strong><small>${ys(t)}</small></span>
          ${y(`arrow`,{size:22})}
        </a>
      </div>

      <h2 class="practice-heading">Practise a skill</h2>
      ${a.map(e=>`
        <section class="practice-unit">
          <h3>Unit ${e.index+1} · ${b(e.title)}</h3>
          <ul class="practice-skills">
            ${e.skills.filter(e=>er(t,e.id).done>0).map(e=>{let n=bs(e.id),i=Xt(t,n),a=n.filter(e=>r.includes(e)).length;return`<li><a class="practice-skill" href="#/practice/session?mode=skill&id=${e.id}">
                <span class="practice-skill__icon">${y(e.icon??`star`,{size:22})}</span>
                <span class="practice-skill__body"><strong>${b(e.title)}</strong>${S(i,{label:`${e.title} strength`,variant:i>.6?`success`:`gold`})}</span>
                ${a?`<span class="pill pill--primary">${a} due</span>`:``}
              </a></li>`}).join(``)||`<li class="muted">Finish a lesson in this unit to practise it.</li>`}
          </ul>
        </section>`).join(``)}
    </div>`}function Ss(e,t){let n=W(e);if(t.mode===`mistakes`)return e.mistakes.filter(e=>L.words[e]);if(t.mode===`skill`&&L.skills[t.id]){let r=bs(t.id).filter(e=>n.includes(e)),i=new Set(Jt(e));return[...r.filter(e=>i.has(e)),...r.filter(e=>!i.has(e))]}let r=Jt(e).filter(e=>n.includes(e)),i=Yt(e).filter(e=>n.includes(e)&&!r.includes(e)),a=n.filter(e=>!r.includes(e)&&!i.includes(e));return[...r,...i,...a]}function Cs({root:e,query:t,navigate:n}){let r=D.get(),i=ts(Ss(r,t),{knownIds:W(r)});if(!i.length){n(`/practice`,{replace:!0});return}let a=ms({root:e,exercises:i,onQuit:()=>n(`/practice`),onFinish:t=>{a.cleanup(),ci(e,{result:t,...$o(null,t,{base:X.practice,practice:!0}),title:`Practice complete!`,subtitle:`You earned a heart back. Those words will stick better now.`,onDone:()=>n(`/practice`)})}});return a.cleanup}function ws({root:e,params:t,navigate:n}){let r=D.get(),i=L.units.find(e=>e.id===t.unit);if(!i||!tr(r,i.id).passed){n(`/learn`,{replace:!0});return}if(i.settings.checkpoint.hearts&&F(r).count===0)return ds({root:e,navigate:n,onReady:()=>ws({root:e,params:t,navigate:n})});let a=`checkpoint-${i.id}`,o=!!r.lessons[a]?.completions,s=ms({root:e,hearts:i.settings.checkpoint.hearts,exercises:rs(i.id,{knownIds:W(r)}),onQuit:()=>n(`/learn`),onFinish:t=>{s.cleanup(),ci(e,{result:t,...$o(a,t,{base:o?X.replay:X.checkpoint}),title:`Unit ${i.index+1} complete!`,subtitle:`You passed the ${i.title} checkpoint. Weebale nnyo!`,onDone:()=>n(!o&&or(D.get())?`/complete`:`/learn`)})}});return s.cleanup}function Ts({root:e,params:t,query:n={},navigate:r}){let i=L.sections.find(e=>e.id===t.section);if(!i||!ir(D.get(),i.id)){r(`/learn`,{replace:!0});return}let{passMark:a,hearts:o}=L.settings.sectionTest,s=ms({root:e,hearts:o,navigate:r,exercises:ns(i.id,{seed:Number(n.seed)||void 0}),onQuit:()=>r(`/learn`),onFinish:n=>{s.cleanup(),n.accuracy<a?(e.innerHTML=`
          <section class="empty-state">
            <div class="empty-state__art">${u(`ponder`)}</div>
            <h1>Not quite yet</h1>
            <p class="muted">You got ${Math.round(n.accuracy*100)}% right first time, and you need ${Math.round(a*100)}% to jump to Section ${i.index+1}. Keep going on the path, or try again.</p>
            ${x({label:`Try again`,size:`lg`,attrs:`data-retry`})}
            ${x({label:`Back to the path`,href:`#/learn`,variant:`ghost`})}
          </section>`,e.querySelector(`[data-retry]`).addEventListener(`click`,()=>Ts({root:e,params:t,navigate:r}))):(D.update(e=>{e.jumps.includes(i.id)||e.jumps.push(i.id)}),ci(e,{result:n,...$o(`jump-${i.id}`,n,{base:X.checkpoint}),title:`Welcome to Section ${i.index+1}!`,subtitle:`You jumped ahead to ${i.title}. Earlier lessons stay open for review.`,onDone:()=>r(`/learn`)}))}});return s.cleanup}function Es({root:e,navigate:t}){let r=D.get();if(!or(r)){t(`/learn`,{replace:!0});return}let i=Cn(L),a=r.profile?.name;e.innerHTML=`
    <section class="empty-state course-complete">
      <div class="empty-state__art">${n({pose:p(`celebrate`),prop:`drum`})}</div>
      <h1>Course complete!</h1>
      <p class="complete__sub">Wayita bulungi${a?`, ${b(a)}`:``}! You finished all ${i.units} units of Learn Luganda.</p>
      <ul class="complete__parts">
        <li><span>${y(`book`,{size:16})} Words learned</span><span>${W(r).length}</span></li>
        <li><span>${y(`bolt`,{size:16})} Total XP</span><span>${r.xp.total}</span></li>
        <li><span>${y(`flame`,{size:16})} Longest streak</span><span>${r.streak.longest} days</span></li>
      </ul>
      <p class="muted">Keep your Luganda fresh with daily practice, retell the stories, and greet someone in Luganda today. Weebale nnyo!</p>
      ${x({label:`Keep practising`,href:`#/practice`,size:`lg`})}
      ${x({label:`Back to the path`,href:`#/learn`,variant:`ghost`})}
    </section>`,O(`complete`),Un()}function Ds(e,t){return e.cosmetic?B({...t.profile.avatar,frame:e.id},{size:56}):`<span class="shop-item__icon shop-item__icon--${e.id}">${y(e.icon,{size:30})}</span>`}function Os(e,t){if(e.id===`freeze`)return`${t.streak.freezes} of 2 equipped`;if(e.id===`refill`){let e=F(t);return e.full?`Hearts are full`:`${e.count} of ${e.max} · next in ${an(e.nextAt-Date.now())}`}return e.cosmetic&&t.inventory[e.id]?t.profile.avatar.frame===e.id?`Equipped`:`Owned`:``}function ks({root:e}){function t(){let t=D.get();e.innerHTML=`
      <div class="page">
        <header class="page__header shop-header">
          <div>
            <p class="eyebrow">Gems</p>
            <h1>Use your <strong>gems.</strong></h1>
          </div>
          <span class="shop-balance" aria-label="${t.gems} gems">${y(`gem`,{size:26})}${t.gems}</span>
        </header>
        <p class="muted shop-earn">Gems can’t be bought. You earn every one by learning, then use them to protect your streak, refill hearts or decorate your avatar.</p>
        <ul class="shop-list">
          ${qo.map(e=>{let n=Xo(t,e),r=e.cosmetic&&t.inventory[e.id],i=r&&t.profile.avatar.frame===e.id,a=x(r?{label:i?`Unequip`:`Equip`,variant:`secondary`,attrs:`data-equip="${e.id}"`}:{label:`${e.price}`,iconName:`gem`,variant:n.ok?`blue`:`secondary`,disabled:!n.ok,attrs:`data-buy="${e.id}" aria-label="Get ${b(e.title)} for ${e.price} gems${n.ok?``:`, ${n.reason}`}"`});return`<li class="shop-item">
              ${Ds(e,t)}
              <div class="shop-item__body">
                <h2>${b(e.title)}</h2>
                <p class="muted">${b(e.description)}</p>
                ${Os(e,t)?`<p class="shop-item__note">${b(Os(e,t))}</p>`:``}
              </div>
              <div class="shop-item__action">${a}</div>
            </li>`}).join(``)}
        </ul>
        <section class="shop-rules" aria-labelledby="shop-rules-title">
          <h2 id="shop-rules-title">How to earn gems</h2>
          <ul>${Jo({perTier:10}).map(e=>`<li><span>${b(e.label)}</span><span class="shop-rules__gems">${y(`gem`,{size:14})}${b(e.gems)}</span></li>`).join(``)}</ul>
        </section>
      </div>`}e.addEventListener(`click`,e=>{let n=e.target.closest(`[data-buy]`);if(n&&!n.disabled){let e=qo.find(e=>e.id===n.dataset.buy),r=!1;D.update(t=>{r=Zo(t,e.id)}),O(r?`reward`:`wrong`),w(r?`${e.title} unlocked!`:`Not available right now.`,{variant:r?`success`:`error`}),t();return}let r=e.target.closest(`[data-equip]`);r&&(D.update(e=>{e.profile.avatar.frame=e.profile.avatar.frame===r.dataset.equip?null:r.dataset.equip}),t())}),t()}function As(e,{unit:t=``,caption:n,goal:r}={}){let i=Math.max(r??0,...e.map(e=>e.value),1)*1.1,a=e=>`${e/i*100}%`;return`<figure class="chart" aria-label="${b(n)}">
    <div class="chart__plot" aria-hidden="true">
      ${r?`<div class="chart__goal" style="bottom:${a(r)}"><span>Goal ${r}</span></div>`:``}
      ${e.map(e=>`<div class="bar${e.highlight?` bar--today`:``}" title="${b(`${e.long}: ${e.value} ${t}`)}">
            <span class="bar__mark" style="height:${e.value?`max(3px, ${a(e.value)})`:`0`}"><span class="bar__value">${e.value}</span></span>
          </div>`).join(``)}
    </div>
    <div class="chart__labels" aria-hidden="true">${e.map(e=>`<span${e.highlight?` class="is-today"`:``}>${b(e.label)}</span>`).join(``)}</div>
    <figcaption class="visually-hidden">${b(n)}</figcaption>
    <table class="visually-hidden">
      <thead><tr><th scope="col">Day</th><th scope="col">${b(t)}</th></tr></thead>
      <tbody>${e.map(e=>`<tr><td>${b(e.long)}</td><td>${e.value}</td></tr>`).join(``)}</tbody>
    </table>
  </figure>`}function js(e,t=new Date){let{answers:n,correctAnswers:r,lessonsCompleted:i,perfectLessons:a,secondsLearning:o}=e.stats;return{totalXp:e.xp.total,streak:I(e,N(t)).current,longestStreak:e.streak.longest,words:W(e).length,lessons:i,perfect:a,accuracy:n?r/n:null,minutes:Math.round(o/60),stories:L.stories.filter(t=>e.lessons[qa(t.id)]?.completions).length}}function Ms(e){return`<ul class="achievements">
    ${sr.map(t=>{let n=cr(e,t);return`<li class="achievement">
        ${qn({shape:t.shape,iconName:t.icon,tier:n.tier,size:64,label:`${t.title}, level ${n.tier} of ${n.maxTier}`})}
        <div class="achievement__body">
          <h3>${b(t.title)} <span class="muted">${n.tier?`Level ${n.tier}`:`Locked`}</span></h3>
          <p class="muted">${b(n.next?t.describe(n.next):`All levels complete!`)}</p>
          ${n.next?`${S(n.ratio,{label:`${t.title} progress`,variant:`gold`})}<span class="achievement__count">${n.value} / ${n.next}</span>`:``}
        </div>
      </li>`}).join(``)}
  </ul>`}function $(e,t,n,r=``){return`<li class="stat-tile ${r}">${y(e,{size:26})}<div><strong>${t}</strong><span>${n}</span></div></li>`}function Ns({root:e}){let t=D.get(),n=t.profile,r=js(t),i=Ka(t,7),a=i.reduce((e,t)=>e+t.xp,0),o=i.map((e,t)=>{let n=Vt(e.day);return{label:t===i.length-1?`Today`:n.toLocaleDateString(`en`,{weekday:`short`}),long:n.toLocaleDateString(`en`,{weekday:`long`,month:`long`,day:`numeric`}),value:e.xp,highlight:t===i.length-1}});e.innerHTML=`
    <div class="page">
      <header class="profile-head">
        ${B(n.avatar,{size:96,label:n.name})}
        <div class="profile-head__text">
          <h1><strong>${b(n.name)}</strong></h1>
          <p class="muted">Learning Luganda since ${new Date(n.joinedAt).toLocaleDateString(`en`,{month:`long`,year:`numeric`})}</p>
        </div>
        ${x({label:`Edit`,variant:`secondary`,href:`#/settings?section=profile`,attrs:`aria-label="Edit profile"`})}
      </header>

      <h2 class="profile-section">Statistics</h2>
      <ul class="stat-tiles">
        ${$(`flame`,r.streak,`day streak${r.longestStreak>r.streak?` · best ${r.longestStreak}`:``}`,`stat-tile--flame`)}
        ${$(`bolt`,r.totalXp,`total XP`,`stat-tile--xp`)}
        ${$(`book`,r.words,`words learned`)}
        ${$(`check`,r.lessons,`lessons · ${r.perfect} perfect`)}
        ${$(`target`,r.accuracy===null?`—`:`${Math.round(r.accuracy*100)}%`,`accuracy`)}
        ${$(`clock`,r.minutes,`minutes learning`)}
        ${$(`stories`,r.stories,`stories read`)}
      </ul>

      <section class="card xp-week" aria-labelledby="xp-week-title">
        <header class="xp-week__head">
          <h2 id="xp-week-title">XP this week</h2>
          <span class="muted">${a} XP in 7 days</span>
        </header>
        ${As(o,{unit:`XP`,caption:`XP earned each day for the last 7 days`,goal:Ga(t).goal})}
      </section>

      <h2 class="profile-section">Achievements</h2>
      ${Ms(t)}
    </div>`}var Ps=[`vermillion`,`butter`,`sky`,`sage`];function Fs(e,t){return`<span class="cast-row">${e.map((e,n)=>{let r=En(e);return B({character:r.look,color:Ps[n%Ps.length]},{size:t,label:r.name})}).join(``)}</span>`}function Is(e){return b(e).replace(/\*\*(.+?)\*\*/g,`<strong${R(`target`)}>$1</strong>`)}function Ls(e){let t=L.lessons[e.unlockAfter];return`Finish ${L.skills[t.skill].title}, lesson ${t.index+1}`}function Rs({story:e,unlocked:t,done:n}){let r=n?`${y(`check`,{size:16})} Read`:t?`New`:`${y(`lock`,{size:14})} ${b(Ls(e))}`,i=`
    <span class="story-card__art" aria-hidden="true">${Fs(e.cast,56)}</span>
    <span class="story-card__text">
      <strong>${b(e.title)}</strong>
      <small>${b(e.summary)}</small>
      <span class="story-card__status${n?` is-done`:t?` is-new`:``}">${r}</span>
    </span>`;return t?`<a class="story-card" href="#/story/${e.id}">${i}</a>`:`<div class="story-card is-locked" aria-disabled="true">${i}</div>`}function zs({root:e}){let t=Xa(D.get());return e.innerHTML=`
    <div class="page">
      <header class="page__header">
        <p class="eyebrow">Stories</p>
        <h1>Read <strong>with the cast.</strong></h1>
        <p class="muted">Short conversations that use what you’ve learned. Tap any line to see it in English. Stories never cost hearts.</p>
      </header>
      ${L.units.map(e=>{let n=t.filter(t=>t.story.unit===e.id);return n.length?`<section class="stories-unit">
            <h2 class="stories-unit__title">Unit ${e.index+1}: ${b(e.title)}</h2>
            <div class="story-list">${n.map(Rs).join(``)}</div>
          </section>`:``}).map((e,t,n)=>t===n.findIndex(Boolean)?e+Hr(`stories`):e).join(``)}
    </div>`,Xr(e)}function Bs({speaker:e,target:t,base:n},r,i){let a=En(e),s=r?`<span class="story-line__gloss">${Object.entries(r).map(([e,t])=>`<span><strong${R(`target`)}>${b(e)}</strong> ${b(t)}</span>`).join(``)}</span>`:``;return`<div class="story-line story-line--${i}">
    <span class="story-line__who">${o(a.look,{shape:`circle`,expression:`happy`,label:a.name})}</span>
    <button class="story-line__bubble" type="button" aria-expanded="${L.settings.stories.translations===`always`}">
      <span class="story-line__name">${b(a.name)}</span>
      <span class="story-line__lg"${R(`target`)}>${b(t)}</span>
      <span class="story-line__en"${R(`base`)}>${b(n)}</span>
      ${s}
    </button>
  </div>`}function Vs(e,t){return`<div class="story-q" role="group" aria-labelledby="story-q-${t}">
    <p class="story-q__prompt" id="story-q-${t}">${y(`target`,{size:18})} ${b(e.question)}</p>
    <div class="story-q__options">
      ${e.options.map((t,n)=>`<button class="choice" type="button" data-opt="${n}"${R(e.optionsLang??`base`)}><span class="choice__key">${n+1}</span><span>${b(t)}</span></button>`).join(``)}
    </div>
  </div>`}function Hs({root:e,params:t,navigate:n}){let r=L.storyById[t.id],i=D.get();if(!r||!Ja(i,r)){n(`/stories`,{replace:!0});return}let a=Ya(i,r),o=Date.now(),s=Object.fromEntries(r.cast.map((e,t)=>[e,t%2?`right`:`left`])),c=-1,l=!1,u=0,d=0,f=0,p=!1;e.innerHTML=`
    <div class="lesson story">
      <header class="lesson__top">
        <button class="icon-btn" type="button" data-quit aria-label="Close story">${y(`close`)}</button>
        <div class="lesson__progress" data-progress></div>
      </header>
      <div class="lesson__stage">
        <div class="story__script" data-script aria-live="polite">
          <header class="story__title">
            <div class="story__cast" aria-hidden="true">${Fs(r.cast,88)}</div>
            <h1>${b(r.title)}</h1>
            <p class="muted">${b(r.summary)}</p>
          </header>
        </div>
      </div>
      <footer class="lesson__footer">
        <div class="lesson__actions">${x({label:`Start`,size:`lg`,block:!0,attrs:`data-next`})}</div>
      </footer>
    </div>`;let m=e.querySelector(`[data-script]`),h=e.querySelector(`[data-next]`),g=h.querySelector(`span`);function _(){e.querySelector(`[data-progress]`).innerHTML=S((c+1)/r.steps.length,{label:`Story progress`})}function v(){let t=Math.round((Date.now()-o)/1e3),i={correct:d,wrong:f,firstTry:d,accuracy:u?d/u:1,perfect:f===0,seconds:t,missed:{},wordIds:[]};ci(e,{result:i,...$o(qa(r.id),i,{base:a?X.replay:X.story}),title:`Story complete!`,subtitle:`You finished “${r.title}”. Weebale nnyo!`,onDone:()=>n(`/stories`)})}function ee(){if(l)return;if(c+=1,c>=r.steps.length){v();return}g.textContent=`Continue`;let e=r.steps[c],t=document.createElement(`div`);t.className=`story__step`,e.line?t.innerHTML=Bs(e.line,e.gloss,s[e.line.speaker]??`left`):(t.innerHTML=Vs(e,c),l=!0,u+=1,p=!1,h.disabled=!0),m.append(t),_(),t.scrollIntoView({block:`end`,behavior:dn()?`auto`:`smooth`}),e.question?t.querySelector(`[data-opt]`).focus():h.focus()}function te(e){let t=r.steps[c];l&&!e.disabled&&(Number(e.dataset.opt)===t.answer?(e.classList.add(`is-correct`),O(`correct`),e.closest(`.story-q`).querySelectorAll(`[data-opt]`).forEach(e=>e.disabled=!0),p||(d+=1),l=!1,h.disabled=!1,h.focus()):(e.classList.add(`is-wrong`),O(`wrong`),e.disabled=!0,p=!0,f+=1))}function ne(e){if(e.target.closest(`[data-quit]`))n(`/stories`);else if(e.target.closest(`[data-next]`))ee();else if(e.target.closest(`[data-opt]`))te(e.target.closest(`[data-opt]`));else{let t=e.target.closest(`.story-line__bubble`);t&&t.setAttribute(`aria-expanded`,String(t.getAttribute(`aria-expanded`)!==`true`))}}function re(e){if(l&&/^[1-9]$/.test(e.key)){let t=m.querySelector(`.story__step:last-child [data-opt="${Number(e.key)-1}"]`);t&&te(t)}}return e.addEventListener(`click`,ne),document.addEventListener(`keydown`,re),_(),h.focus(),()=>document.removeEventListener(`keydown`,re)}function Us(e,t=[0,1]){let[n,...r]=e;return`<div class="guide-table"><table>
    <thead><tr>${n.map(e=>`<th scope="col">${b(e)}</th>`).join(``)}</tr></thead>
    <tbody>${r.map(e=>`<tr>${e.map((e,n)=>`<td${R(t.includes(n)?`target`:`base`)}>${b(e)}</td>`).join(``)}</tr>`).join(``)}</tbody>
  </table></div>`}function Ws(e,t){return`<article class="card guide-note guide-note--${t}"${e.id?` id="tip-${e.id}"`:``}>
    <h3>${y(t===`tip`?`bolt`:`star`,{size:18})}${b(e.title)}</h3>
    ${e.body.map(e=>`<p>${Is(e)}</p>`).join(``)}
    ${e.table?Us(e.table,e.targetColumns):``}
  </article>`}function Gs({root:e,params:t,query:n,navigate:r}){let i=L.units.find(e=>e.id===t.unit),a=L.guidebooks[t.unit];if(!i||!a){r(`/learn`,{replace:!0});return}let s=Xa(D.get()).filter(e=>e.story.unit===i.id);if(e.innerHTML=`
    <div class="page guide">
      <header class="guide__head">
        <div>
          <p class="eyebrow">Unit ${i.index+1} guidebook</p>
          <h1>${b(i.title)}</h1>
          <p class="muted">${b(a.intro)}</p>
        </div>
        <div class="guide__art" aria-hidden="true">${o(i.character,{expression:`happy`})}</div>
      </header>

      <section class="guide__section" aria-labelledby="guide-phrases">
        <h2 id="guide-phrases">Key phrases</h2>
        <ul class="phrase-list">
          ${a.phrases.map(e=>`<li><strong${R(`target`)}>${b(e.target)}</strong><span${R(`base`)}>${b(e.base)}</span></li>`).join(``)}
        </ul>
      </section>

      <section class="guide__section" aria-labelledby="guide-tips">
        <h2 id="guide-tips">Tips</h2>
        ${a.tips.map(e=>Ws(e,`tip`)).join(``)}
      </section>

      <section class="guide__section" aria-labelledby="guide-culture">
        <h2 id="guide-culture">Culture</h2>
        ${a.culture.map(e=>Ws(e,`culture`)).join(``)}
      </section>

      ${s.length?`<section class="guide__section" aria-labelledby="guide-stories">
              <h2 id="guide-stories">Stories</h2>
              <div class="story-list">${s.map(Rs).join(``)}</div>
            </section>`:``}
      <p class="guide__back">${x({label:`Back to the path`,href:`#/learn`,variant:`secondary`,iconName:`back`})}</p>
    </div>`,n.tip){let t=e.querySelector(`#tip-${CSS.escape(n.tip)}`);t&&(t.classList.add(`is-highlighted`),t.scrollIntoView({block:`start`}))}}function Ks({root:e}){e.innerHTML=`
    <div class="page prose">
      <header class="page__header">
        <p class="eyebrow">Privacy</p>
        <h1>Your data <strong>stays with you.</strong></h1>
        <p class="caption">Last updated 21 October 2026</p>
      </header>

      <h2>What we keep</h2>
      <p>Learn Luganda has no accounts and no server of its own. Your name, avatar, progress, streak, XP and settings are saved in your browser’s local storage on this device. We never see them. You can export, import or erase them at any time in <a href="#/settings">Settings</a>.</p>

      <h2 id="ads">Ads</h2>
      <p>${Rr()?`Learn Luganda is free and is supported by ads from Google AdSense.`:`Learn Luganda may show ads from Google AdSense to stay free.`} Ads appear only in a few places, such as between sections of the learning path and on the lesson complete screen, and are always marked <strong>Sponsored</strong>. They never appear inside a lesson, practice session or story.</p>
      <p>Google and its partners use cookies to serve ads. If you choose <em>Allow</em>, Google may use cookies to show ads based on your visits to this and other websites. If you choose <em>Basic ads only</em>, Google shows non-personalised ads, though it may still use cookies to limit how often an ad appears and to prevent fraud. You can change your choice in <a href="#/settings">Settings</a> at any time.</p>
      <p>Learn more in <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">how Google uses information from sites that use its services</a>, and manage personalised ads at <a href="https://adssettings.google.com" target="_blank" rel="noopener">Google Ads Settings</a>.</p>
      <p>When you’re offline, no ads are loaded.</p>

      <h2>Fonts</h2>
      <p>Text is set in fonts served by Google Fonts, so your browser requests them from Google the first time you visit. After that they’re cached on your device.</p>

      <h2>Children</h2>
      <p>We don’t knowingly collect personal information from anyone. Because ads may be personalised only with your consent, parents can choose <em>Basic ads only</em> for younger learners.</p>

      <h2>Changes</h2>
      <p>If this policy changes, the date at the top changes with it. Questions? <a href="#/contact">Contact us</a>.</p>
      ${On(`site-links site-links--page`)}
    </div>`}function qs(e,{eyebrow:t,title:n,body:r}){e.innerHTML=`
    <div class="page prose">
      <header class="page__header">
        <p class="eyebrow">${t}</p>
        <h1>${n}</h1>
      </header>
      ${r}
      ${On(`site-links site-links--page`)}
    </div>`}function Js({root:e}){qs(e,{eyebrow:`About`,title:`Luganda, <strong>a little every day.</strong>`,body:`
      <p>${z.name} is a free course for anyone who wants to speak Luganda, the most widely spoken language in Uganda. Short, game-like lessons take you from greetings to everyday conversations about family, food, the market, travel, health and more.</p>
      <h2>How it works</h2>
      <p>Each unit introduces a handful of words and phrases, then practises them in many ways: picking pictures, building sentences, listening, typing and matching. Words you find hard come back for review at the right time, and stories let you read along with the cast. Streaks, XP and a daily goal help you keep going.</p>
      <h2>No account needed</h2>
      <p>There is nothing to sign up for. Your progress is saved on your own device, and the app keeps working offline once it has loaded. You can export your progress in <a href="#/settings">Settings</a> to back it up or move it to another device.</p>
      <h2>Free, with a few ads</h2>
      <p>Lessons are free. To cover running costs, a few clearly marked sponsored cards may appear between sections of the path and after a lesson, never during one. See the <a href="#/privacy">privacy policy</a> for how ads work.</p>
      <h2>Open source</h2>
      <p>The app is built in the open on <a href="${z.repoUrl}" target="_blank" rel="noopener">GitHub</a>. Corrections to the Luganda are always welcome.</p>`})}function Ys({root:e}){qs(e,{eyebrow:`Contact`,title:`Say <strong>hello.</strong>`,body:`
      <p>Spotted a mistake in a lesson, have an idea, or a question about the app or its ads? We’d love to hear from you.</p>
      ${z.contactEmail?`<p>Email us at <a href="mailto:${b(z.contactEmail)}">${b(z.contactEmail)}</a>. We usually reply within a few days.</p>`:``}
      <p>You can also <a href="${z.issuesUrl}" target="_blank" rel="noopener">open an issue on GitHub</a>. For a language correction, include the unit and the sentence so we can find it quickly.</p>
      <p>We can’t see your progress, so if you’re asking about it, describe what happened in your message.</p>`})}function Xs({root:e}){qs(e,{eyebrow:`Terms`,title:`Terms of <strong>use.</strong>`,body:`
      <p class="caption">Last updated 21 October 2026</p>
      <p>By using ${z.name} you agree to these terms. If you don’t agree, please don’t use the app.</p>
      <h2>Using the app</h2>
      <p>${z.name} is free for personal learning. Please don’t try to disrupt the site, copy it to pass off as your own, or click ads on purpose to inflate them.</p>
      <h2>Your data</h2>
      <p>Your progress lives in your browser. Clearing your browser data, or using a different device or browser, starts you afresh unless you export and import your progress. We can’t recover lost progress for you. See the <a href="#/privacy">privacy policy</a> for more.</p>
      <h2>Ads</h2>
      <p>The app may show ads from Google AdSense, always marked Sponsored. Products and services in ads come from their advertisers, not from us, and we don’t endorse them.</p>
      <h2>Content</h2>
      <p>We work hard to keep translations accurate, but Luganda varies between speakers and regions and mistakes happen. The course is offered as it is, without any warranty. The app’s code is published on <a href="${z.repoUrl}" target="_blank" rel="noopener">GitHub</a>.</p>
      <h2>Changes</h2>
      <p>We may update the app and these terms. When the terms change, the date at the top changes too. Questions? <a href="#/contact">Contact us</a>.</p>`})}var Zs=[{path:`/`,view:Nn({hasProgress:Oe}),layout:`bare`,public:!0},{path:`/onboarding`,view:Va,layout:`bare`,public:!0,title:`Get started`},{path:`/learn`,view:co,title:`Learn`},{path:`/lesson/:id`,view:hs,layout:`bare`,title:`Lesson`},{path:`/checkpoint/:unit`,view:ws,layout:`bare`,title:`Checkpoint`},{path:`/jump/:section`,view:Ts,layout:`bare`,title:`Section test`},{path:`/complete`,view:Es,layout:`bare`,title:`Course complete`},{path:`/guidebook/:unit`,view:Gs,title:`Guidebook`},{path:`/stories`,view:zs,title:`Stories`},{path:`/story/:id`,view:Hs,layout:`bare`,title:`Story`},{path:`/streak`,view:vs,title:`Streak`},{path:`/practice`,view:xs,title:`Practice`},{path:`/practice/session`,view:Cs,layout:`bare`,title:`Practice`},{path:`/shop`,view:ks,title:`Gems`},{path:`/profile`,view:Ns,title:`Profile`},{path:`/settings`,view:Ca,public:!0,title:`Settings`},{path:`/privacy`,view:Ks,public:!0,title:`Privacy`},{path:`/about`,view:Js,public:!0,title:`About`},{path:`/contact`,view:Ys,public:!0,title:`Contact`},{path:`/terms`,view:Xs,public:!0,title:`Terms`},{path:`/styleguide`,view:un,public:!0,title:`Style guide`}],Qs={idle:`Learn Luganda home`,happy:`Learn Luganda home. Today's goal is done!`,sleepy:`Learn Luganda home. Your streak is waiting for today’s lesson.`,celebrating:`Learn Luganda home. Streak milestone today!`};function $s(e,t=new Date){if(!e?.profile)return`idle`;let n=I(e,N(t));return n.doneToday&&on.includes(n.current)?`celebrating`:Ga(e,t).met?`happy`:n.atRisk?`sleepy`:`idle`}var ec=e=>Qs[e]??Qs.idle,tc=`idle`;function nc(e,t=document){if(t.querySelectorAll(`[data-brand]`).forEach(t=>{t.dataset.mood!==e&&(t.dataset.mood=e,t.innerHTML=ye(e),(t.closest(`a`)??t).setAttribute(`aria-label`,ec(e)))}),e===tc)return;tc=e;let n=t.querySelector(`link[rel="icon"]`);n&&(n.href=e===`idle`?`./favicon.svg`:`data:image/svg+xml,${encodeURIComponent(be(e))}`)}Mt(()=>{let e=D.get(),t=F(e),n=I(e);return{streak:n.current,gems:e.gems,hearts:t.count,maxHearts:t.max,streakToday:n.doneToday}}),D.get().streak.lastDay&&D.update(e=>sn(e)),D.subscribe(Lt);var rc=()=>nc($s(D.get()));D.subscribe(rc),document.addEventListener(`visibilitychange`,()=>document.visibilityState===`visible`&&rc()),fn(),D.subscribe(fn);var ic=Bt(document.querySelector(`#app`)),ac=ie({routes:Zs,onChange:e=>{!e.route.public&&!Oe()?ac.navigate(`/onboarding`,{replace:!0}):(ic.render(e,ac.navigate),rc(),ct((e.route.layout??`app`)===`app`&&Oe()))}});lt(),document.addEventListener(`pointerdown`,()=>qe(),{once:!0}),document.addEventListener(`click`,e=>{e.target.closest(`[data-music-toggle]`)&&ut()}),D.subscribe(It),pa(()=>ac.refresh()).then(()=>{ac.start(),Ui()}),Bn();