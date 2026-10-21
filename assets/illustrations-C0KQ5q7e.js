(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=0;function t(t=`ill`){return e+=1,`${t}-${e}`}function n(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function r({viewBox:e,label:r,body:i,className:a=``}){let o=t(`title`);return`<svg class="ill ${a}" viewBox="${e}" role="img" aria-labelledby="${o}" xmlns="http://www.w3.org/2000/svg"><title id="${o}">${n(r)}</title>${i}</svg>`}function i(e){let t={hatch:`${e}-hatch`,dots:`${e}-dots`,grid:`${e}-grid`};return{defs:`
    <pattern id="${t.hatch}" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="4" height="4" class="f-paper-light"/>
      <line x1="0" y1="0" x2="0" y2="4" class="s-ink" stroke-width="1.1"/>
    </pattern>
    <pattern id="${t.dots}" width="5" height="5" patternUnits="userSpaceOnUse">
      <circle cx="2.5" cy="2.5" r="0.8" class="f-ink"/>
    </pattern>
    <pattern id="${t.grid}" width="3" height="3" patternUnits="userSpaceOnUse">
      <rect width="3" height="3" class="f-paper-light"/>
      <rect width="1.6" height="1.6" class="f-grey"/>
    </pattern>`,hatch:`url(#${t.hatch})`,dots:`url(#${t.dots})`,grid:`url(#${t.grid})`}}function a(e,t,n,r,i=10){let a=i;return`<g class="s-rule" stroke-width="1">
    <path d="M${e} ${t+a} V${t} H${e+a}"/>
    <path d="M${e+n-a} ${t} H${e+n} V${t+a}"/>
    <path d="M${e} ${t+r-a} V${t+r} H${e+a}"/>
    <path d="M${e+n-a} ${t+r} H${e+n} V${t+r-a}"/>
  </g>`}function o(e,t,n=5){return`<path class="s-rule" stroke-width="0.8" d="M${e-n} ${t} H${e+n} M${e} ${t-n} V${t+n}"/>`}function s(e,t,r,{step:i=6,label:a=``}={}){let o=``;for(let n=0,a=e;a<=e+r+.01;n+=1,a+=i){let e=n%5==0?7:4;o+=`M${a} ${t} V${t-e} `}let s=a?`<text class="mono" x="${e+r}" y="${t+11}" font-size="6.5" text-anchor="end">${n(a)}</text>`:``;return`<g><path class="s-rule" stroke-width="0.8" d="M${e} ${t} H${e+r} ${o}"/>${s}</g>`}function c(e,t,r,{size:i=9,anchor:a=`start`}={}){return`<text class="caption" x="${e}" y="${t}" font-size="${i}" text-anchor="${a}">${n(r)}</text>`}function l(e,t,r,{width:i,size:a=9}={}){let o=i??r.length*a*.56+30,s=a*2.4;return`<g transform="translate(${e} ${t})">
    <rect x="1.5" y="2" width="${o}" height="${s}" rx="${s/2}" class="f-ink"/>
    <rect width="${o}" height="${s}" rx="${s/2}" class="f-white card-edge"/>
    <circle cx="${s/2+2}" cy="${s/2}" r="${a*.28}" class="f-verm"/>
    <text class="label" x="${s/2+2+a*.9}" y="${s/2+a*.35}" font-size="${a}">${n(r)}</text>
  </g>`}function u(e,t,n,r){let i=r*Math.PI/180;return[+(e+n*Math.cos(i)).toFixed(2),+(t+n*Math.sin(i)).toFixed(2)]}var d=Math.random;function f(e=.5){return d()<e}function p(e){return e[Math.floor(d()*e.length)]}function m(e){let t=[...e];for(let e=t.length-1;e>0;--e){let n=Math.floor(d()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function h(e,t){return m(e).slice(0,t)}function g(e=4){return`style="--d:-${(d()*e).toFixed(2)}s"`}var _={drum:{label:`An engoma drum`,body:e=>`
      <ellipse cx="32" cy="58" rx="20" ry="3" class="f-rule" opacity="0.14"/>
      <g class="anim-beat" ${g(1)}>
        <path d="M12 18 H52 L46 56 H18 Z" class="f-verm-deep"/>
        <path d="M14 22 L24 54 M24 22 L14 40 M32 22 L40 54 M40 22 L28 54 M50 22 L42 54" class="s-ink" stroke-width="1.2"/>
        <ellipse cx="32" cy="18" rx="20" ry="6" class="f-paper-light card-edge"/>
        <rect x="16" y="50" width="32" height="6" fill="${e.hatch}"/>
      </g>`},matooke:{label:`A bunch of matooke`,body:()=>{let e=[[6,12],[5,22],[4,32],[3,42]].map(([e,t])=>Array.from({length:e},(n,r)=>{let i=32+(r-(e-1)/2)*8.5,a=(r-(e-1)/2)*8;return`<rect x="${i-3.6}" y="${t-9}" width="7.2" height="16" rx="3.6" transform="rotate(${a} ${i} ${t+7})" class="f-sage card-edge"/>`}).join(``)).join(``);return`<g class="anim-sway" ${g(3)}>
        <path d="M32 0 V8" class="s-ink" stroke-width="3" stroke-linecap="round"/>
        ${e}
        <path d="M32 50 V60" class="s-ink" stroke-width="3" stroke-linecap="round"/>
        <circle cx="32" cy="61" r="3" class="f-verm-deep"/>
      </g>`}},pot:{label:`A clay pot, steaming`,body:e=>`
      <g class="anim-steam" ${g(2)}><path d="M26 14 Q22 8 26 2 M38 14 Q34 8 38 2" class="s-ink-soft" stroke-width="2" stroke-linecap="round"/></g>
      <path d="M18 20 H46 L48 26 C60 34 58 56 32 58 C6 56 4 34 16 26 Z" class="f-verm-deep"/>
      <path d="M12 38 H52" class="s-white" stroke-width="2" stroke-dasharray="3 3"/>
      <rect x="16" y="18" width="32" height="5" rx="2" class="f-ink"/>
      <path d="M32 26 C48 30 52 44 44 54 C52 44 46 30 32 26 Z" fill="${e.dots}" opacity="0.4"/>`},book:{label:`An open book`,body:()=>`
      <ellipse cx="32" cy="56" rx="24" ry="3" class="f-rule" opacity="0.14"/>
      <path d="M32 18 C24 12 12 12 4 16 V52 C12 48 24 48 32 54 Z" class="f-white card-edge"/>
      <path d="M32 18 C40 12 52 12 60 16 V52 C52 48 40 48 32 54 Z" class="f-cream card-edge"/>
      <path d="M10 24 H26 M10 30 H26 M10 36 H22" class="s-ink" stroke-width="1.4"/>
      <g class="anim-flip" ${g(4)}><path d="M32 18 C38 10 48 8 54 10 V44 C46 44 38 46 32 54 Z" class="f-verm card-edge"/></g>`},tea:{label:`A mug of chai`,body:()=>`
      <g class="anim-steam" ${g(2)}><path d="M24 18 Q20 12 24 6 M34 18 Q30 12 34 6" class="s-ink-soft" stroke-width="2" stroke-linecap="round"/></g>
      <path d="M44 30 A8 8 0 0 1 44 46" class="s-ink" stroke-width="4"/>
      <path d="M12 22 H46 V50 A8 8 0 0 1 38 58 H20 A8 8 0 0 1 12 50 Z" class="f-white card-edge"/>
      <rect x="12" y="32" width="34" height="8" class="f-verm"/>
      <ellipse cx="29" cy="22" rx="17" ry="3" fill="#8a5a3a"/>`},basket:{label:`A woven basket`,body:e=>`
      <g class="anim-sway" ${g(3)}>
        <path d="M16 26 A16 16 0 0 1 48 26" class="s-ink" stroke-width="3"/>
        <path d="M6 26 H58 L50 58 H14 Z" fill="${e.hatch}"/>
        <path d="M6 26 H58 L50 58 H14 Z" class="card-edge" fill="none"/>
        <rect x="8" y="36" width="48" height="6" class="f-verm"/>
        <circle cx="24" cy="22" r="7" class="f-verm"/><circle cx="38" cy="22" r="6" class="f-yellow"/>
      </g>`},ball:{label:`A football`,body:()=>`
      <ellipse class="f-rule anim-shadow" cx="32" cy="60" rx="14" ry="2.5" opacity="0.14"/>
      <g class="anim-hop">
        <circle cx="32" cy="30" r="20" class="f-white card-edge"/>
        <path d="M32 21 L40.6 27.2 L37.3 37.3 H26.7 L23.4 27.2 Z" class="f-ink"/>
        <path d="M32 21 V10 M40.6 27.2 L51 24 M37.3 37.3 L44 46 M26.7 37.3 L20 46 M23.4 27.2 L13 24" class="s-ink" stroke-width="1.6"/>
      </g>`},radio:{label:`A radio playing music`,body:e=>`
      <g class="anim-pulse" ${g(1)}><path d="M50 10 A10 10 0 0 1 56 22 M54 4 A16 16 0 0 1 62 24" class="s-verm" stroke-width="2.4" stroke-linecap="round"/></g>
      <path d="M18 22 L40 6" class="s-ink" stroke-width="2" stroke-linecap="round"/>
      <rect x="6" y="22" width="52" height="34" rx="6" class="f-ink"/>
      <circle cx="22" cy="39" r="11" fill="${e.dots}"/>
      <circle cx="22" cy="39" r="11" class="s-white" stroke-width="1.4"/>
      <rect x="38" y="30" width="14" height="6" class="f-yellow"/>
      <circle cx="42" cy="46" r="3" class="f-verm"/><circle cx="50" cy="46" r="3" class="f-white"/>`},sun:{label:`A Bauhaus sun`,body:()=>`
      <g class="anim-spin">${Array.from({length:12},(e,t)=>`<rect x="30.5" y="2" width="3" height="10" class="f-ink" transform="rotate(${t*30} 32 32)"/>`).join(``)}</g>
      <circle cx="32" cy="32" r="16" class="f-verm"/>
      <path d="M16 32 A16 16 0 0 0 48 32 Z" class="f-yellow"/>`}},v=Object.keys(_);function y(e,{label:n}={}){let a=_[e];if(!a)throw Error(`Unknown prop: ${e}`);let o=i(t(`prop`));return r({viewBox:`0 0 64 64`,label:n??a.label,className:`ill--prop`,body:`<defs>${o.defs}</defs>${a.body(o)}`})}function b(e,{x:n=0,y:r=0,scale:a=1}={}){let o=_[e];if(!o)throw Error(`Unknown prop: ${e}`);let s=i(t(`prop`));return`<g transform="translate(${n} ${r}) scale(${a})"><defs>${s.defs}</defs>${o.body(s)}</g>`}var x=[`idle`,`happy`,`sad`,`cheering`,`thinking`,`waving`,`dancing`,`sleeping`],S=`89 74`;function ee(e){let t=e===`sad`?13:20,n=e===`sad`?[-150,-60]:[-160,-20],r=``,i=``;for(let e=0;e<=8;e+=1){let a=n[0]+(n[1]-n[0])*e/8,[o,s]=u(90,38,t-Math.abs(e-4)*1.2,a);r+=`M90 38 L${o} ${s} `,i+=`<circle cx="${o}" cy="${s}" r="2.2" class="f-verm"/>`}return`<path d="${r}" class="s-ink" stroke-width="1.2"/>${i}`}function C(e){return e===`sleeping`?`<path d="M86.5 55 Q90 58.5 93.5 55" class="s-ink" stroke-width="2" stroke-linecap="round"/>`:e===`happy`||e===`cheering`||e===`dancing`||e===`waving`?`<path d="M86.5 56 Q90 51.5 93.5 56" class="s-ink" stroke-width="2" stroke-linecap="round"/>`:`<g class="anim-blink"><circle cx="90.5" cy="55.5" r="2.7" class="f-ink"/></g>${e===`sad`?`<path d="M85.5 51.5 L94 54" class="s-ink" stroke-width="1.8" stroke-linecap="round"/>`:``}`}function te(e){return e===`happy`||e===`cheering`||e===`dancing`||e===`waving`?`<path d="M72 51 L47 57 L72 58 Z" class="f-grey"/>
      <path d="M72 61 L52 67 L72 66 Z" class="f-grey"/>
      <path d="M72 58 L58 62 L72 61 Z" class="f-verm-deep"/>`:`<path d="M72 51 L47 60 L72 64 Z" class="f-grey"/>`}function ne(e=`idle`){return w(e)}function w(e){return`
    <rect x="80" y="62" width="18" height="70" rx="9" class="f-grey-light"/>
    <path d="M76 66 C71 75 71 82 76.5 85 C82 82 82 75 79 66 Z" class="f-verm"/>
    ${te(e)}
    <circle cx="88" cy="56" r="19" class="f-ink"/>
    <circle cx="93" cy="58" r="9.5" class="f-white"/>
    <path d="M85 49 A8 8 0 0 1 101 49 Z" class="f-verm"/>
    ${C(e)}
    ${ee(e)}`}function T(e,{mirrored:t=!1,raised:n=!1,flap:r=``}={}){return`<g class="${r}"><g transform="${t?`translate(200 0) scale(-1 1)`:``} ${n?`translate(16 -46)`:``} rotate(${e} 100 140)">
      <path d="M100 140 H148 A48 48 0 0 0 100 92 Z" class="f-ink"/>
      <path d="M100 140 H125 A25 25 0 0 0 100 115 Z" class="f-white"/>
      <path d="M100 140 H112 A12 12 0 0 0 100 128 Z" class="f-verm"/>
    </g></g>`}var E={idle:{head:0,wing:0,raised:!1,bob:!0,nod:!0},happy:{head:6,wing:-10,raised:!1,bob:!0},sad:{head:-18,wing:12,raised:!1,bob:!1},cheering:{head:8,wing:28,raised:!0,bob:!0,flap:!0},thinking:{head:12,wing:0,raised:!1,bob:!1,nod:!0},waving:{head:6,wing:20,raised:!1,bob:!0,wave:!0},dancing:{head:10,wing:20,raised:!0,bob:!1,flap:!0,dance:!0},sleeping:{head:-14,wing:8,raised:!1,bob:!1,breathe:!0}};function re(e){return e===`thinking`?`<g class="anim-drift">
      <circle cx="122" cy="34" r="3.5" class="f-white card-edge"/>
      <circle cx="134" cy="20" r="5.5" class="f-white card-edge"/>
      <circle cx="152" cy="6" r="8.5" class="f-white card-edge"/>
    </g>`:e===`cheering`?`<g class="anim-drift">
      <path d="M30 40 L40 22 L48 42 Z" class="f-verm"/>
      <rect x="160" y="28" width="11" height="11" transform="rotate(20 165 33)" class="f-ink"/>
      <circle cx="176" cy="80" r="6" class="s-ink" stroke-width="1.5"/>
      <path d="M10 150 A9 9 0 0 1 28 150 Z" class="f-ink"/>
      <circle cx="150" cy="10" r="3" class="f-verm"/>
    </g>`:e===`sleeping`?[0,1,2].map(e=>`<g class="anim-zzz" style="--d:-${e*.9}s"><text x="${118+e*10}" y="${40-e*12}" font-size="${10+e*3}" font-weight="700" class="f-ink" style="font-family: var(--font-display, system-ui, sans-serif)">z</text></g>`).join(``):e===`dancing`?`<g class="anim-drift"><path d="M24 54 V30 L34 27 V50" class="s-ink" stroke-width="2"/><circle cx="21" cy="54" r="4" class="f-ink"/><circle cx="31" cy="50" r="4" class="f-ink"/></g>
      <g class="anim-drift" ${g(9)}><path d="M168 30 V12" class="s-verm" stroke-width="2"/><circle cx="165" cy="30" r="4" class="f-verm"/></g>`:e===`sad`?`<path d="M98 66 C96 71 96 74 98.5 75 C101 74 101 71 99 66 Z" class="f-lavender" stroke="#5a5687" stroke-width="0.6"/>`:``}function D({pose:e=`idle`,label:t,animate:n=!0,prop:i}={}){if(!E[e])throw Error(`Unknown mascot pose: ${e}`);return r({viewBox:`0 0 200 220`,label:t??`The crane mascot, ${e}`,className:`ill--mascot`,body:O({pose:e,animate:n,prop:i})})}function O({pose:e=`idle`,animate:n=!0,x:r=0,y:a=0,scale:o=1,prop:s}={}){let c=E[e],l=i(t(`crane`)),u=(e,t=!0)=>n&&t?e:``,d=`
      <path d="M93 170 L89 206 M109 170 L113 206" class="s-ink" stroke-width="3" stroke-linecap="round"/>
      <path d="M80 206 H97 M105 206 H122" class="s-ink" stroke-width="3" stroke-linecap="round"/>
      <path d="M138 146 L176 176 L134 168 Z" class="f-ink"/>
      <circle cx="100" cy="140" r="48" class="f-grey"/>
      <path d="M52 140 A48 48 0 0 0 100 188 V140 Z" fill="${l.hatch}" opacity="0.55"/>
      ${c.raised?T(c.wing,{mirrored:!0,raised:!0,flap:u(`anim-flap-r`,c.flap)}):``}
      ${T(c.wing,{raised:c.raised||c.wave,flap:u(c.wave?`anim-wave-wing`:`anim-flap`,c.flap||c.wave)})}
      <g transform="rotate(${c.head} ${S})"><g class="${u(`anim-nod`,c.nod)}" ${g(6)}>${w(e)}</g></g>`,f=c.dance?`anim-dance`:c.breathe?`anim-breathe`:c.bob?`anim-bob`:``;return`<g transform="translate(${r} ${a}) scale(${o})">
    <defs>${l.defs}</defs>
    <ellipse cx="102" cy="208" rx="48" ry="4.5" class="f-rule" opacity="0.14"/>
    <g class="${u(f)}">${d}</g>
    ${re(e)}
    ${s?b(s,{x:2,y:150,scale:.9}):``}
  </g>`}var k={nakato:{name:`Nakato`,role:`Your guide, a university student in Kampala`,skin:`#7a4a2e`,shade:`#5e3720`,hair:`puffs`,hairColor:`#1c1512`,top:`f-verm`,card:`f-cream`,backdrop:`circle`,texture:`dots`,extras:[`earrings`]},mukasa:{name:`Mukasa`,role:`A patient teacher from Masaka`,skin:`#a8714a`,shade:`#8a5735`,hair:`short`,hairColor:`#1c1512`,top:`f-ink`,card:`f-lavender`,backdrop:`quarter`,texture:`grid`,extras:[`glasses`]},jjajja:{name:`Jjajja Nalwoga`,role:`A grandmother who loves proverbs`,skin:`#5c3622`,shade:`#452616`,hair:`headwrap`,hairColor:`#d9d3ca`,top:`f-lavender`,card:`f-blush`,backdrop:`arch`,backdropColor:`f-ink`,texture:`hatch`,extras:[`gomesi`,`earrings`]},ssali:{name:`Ssali`,role:`A boda boda rider who knows every road`,skin:`#6b3f26`,shade:`#52301b`,hair:`cap`,hairColor:`#1c1512`,top:`f-ink-soft`,card:`f-sage`,backdrop:`half`,texture:`dots`,extras:[`beard`]},amara:{name:`Amara`,role:`A secondary school student who loves music`,skin:`#8f5a37`,shade:`#724427`,hair:`braids`,hairColor:`#211814`,top:`f-lavender`,card:`f-paper-light`,backdrop:`circle`,texture:`hatch`,extras:[]},emma:{name:`Emma`,role:`A visitor learning Luganda before her trip`,skin:`#f0c9a8`,shade:`#d9a986`,hair:`bob`,hairColor:`#b8532a`,top:`f-ink`,card:`f-cream`,backdrop:`quarter`,texture:`grid`,extras:[]},kato:{name:`Kato`,role:`Nakato’s twin brother, mad about football`,skin:`#7a4a2e`,shade:`#5e3720`,hair:`afro`,hairColor:`#1c1512`,top:`f-cream`,card:`f-sky`,backdrop:`sun`,backdropColor:`f-blue`,texture:`dots`,extras:[`uniform`]},namuli:{name:`Maama Namuli`,role:`Sells matooke and gossip at the market`,skin:`#6e4129`,shade:`#55301c`,hair:`bun`,hairColor:`#1c1512`,top:`f-verm`,card:`f-sage`,backdrop:`diamond`,backdropColor:`f-yellow`,texture:`hatch`,extras:[`apron`,`necklace`]},musoke:{name:`Musoke`,role:`A fisherman on Lake Victoria`,skin:`#5f3824`,shade:`#472816`,hair:`bucket`,hairColor:`#1c1512`,top:`f-ink-soft`,card:`f-lavender`,backdrop:`wave`,backdropColor:`f-blue`,texture:`grid`,extras:[`mustache`]},kizza:{name:`Jjajja Kizza`,role:`A grandfather in his Sunday kanzu`,skin:`#5c3622`,shade:`#452616`,hair:`kufi`,hairColor:`#d9d3ca`,top:`f-ink`,card:`f-cream`,backdrop:`arch`,texture:`dots`,extras:[`kanzu`,`glasses`,`mustache`]},nansubuga:{name:`Dr Nansubuga`,role:`A doctor who teaches body words`,skin:`#845234`,shade:`#683d23`,hair:`locks`,hairColor:`#211814`,top:`f-white`,card:`f-blush`,backdrop:`half`,texture:`grid`,extras:[`stethoscope`,`earrings`]}},A={ente:{name:`Ente`,role:`An Ankole cow with record-breaking horns`,species:`cow`,card:`f-sage`,backdrop:`circle`,backdropColor:`f-yellow`,texture:`hatch`},engo:{name:`Engo`,role:`A leopard who never forgets a word`,species:`leopard`,card:`f-lavender`,backdrop:`quarter`,backdropColor:`f-blue`,texture:`dots`},crane:{name:`Crane`,role:`The crowned crane, your study buddy`,species:`crane`,card:`f-cream`,backdrop:`sun`,texture:`grid`}},ie=[`neutral`,`happy`,`sad`,`surprised`,`wink`];function ae(){return[...Object.keys(k),...Object.keys(A)]}function oe(e){return k[e]??A[e]}var se={circle:e=>`<circle cx="104" cy="84" r="50" class="${e}"/>`,quarter:e=>`<path d="M156 70 A126 126 0 0 0 30 196 H156 Z" class="${e}"/>`,half:e=>`<path d="M4 34 A72 72 0 0 1 4 178 Z" class="${e}"/>`,arch:e=>`<path d="M34 196 V84 A46 46 0 0 1 126 84 V196 Z" class="${e}"/>`,sun:e=>`<circle cx="80" cy="120" r="66" class="${e}"/>`,wave:e=>`<path d="M0 120 q20 -14 40 0 t40 0 t40 0 t40 0 V200 H0 Z" class="${e}"/><path d="M0 98 q20 -14 40 0 t40 0 t40 0 t40 0" class="s-white" stroke-width="3" opacity="0.6"/>`,diamond:e=>`<path d="M80 22 L148 100 L80 178 L12 100 Z" class="${e}"/>`};function ce(e){let t=`fill="${e.hairColor}"`;switch(e.hair){case`puffs`:return`<g ${t}>
        <circle cx="80" cy="70" r="30"/>
        <circle cx="58" cy="62" r="16"/><circle cx="72" cy="50" r="16"/>
        <circle cx="90" cy="49" r="16"/><circle cx="104" cy="61" r="16"/>
        <circle cx="50" cy="80" r="11"/><circle cx="110" cy="80" r="11"/>
      </g>`;case`braids`:{let e=``;for(let t=0;t<6;t+=1){let n=92+t*11;e+=`<circle cx="51" cy="${n}" r="6"/><circle cx="109" cy="${n}" r="6"/>`}return`<g ${t}>${e}</g>
        <circle cx="51" cy="160" r="3.4" class="f-verm"/><circle cx="109" cy="160" r="3.4" class="f-verm"/>`}case`bob`:return`<path ${t} d="M48 124 V82 A32 32 0 0 1 112 82 V124 Z"/>`;case`afro`:return`<circle ${t} cx="80" cy="76" r="39"/>`;case`bun`:return`<circle ${t} cx="80" cy="46" r="14"/>`;case`locks`:{let e=``;return[44,52,108,116].forEach((t,n)=>{let r=58+n%2*14;e+=`<rect x="${t-4.5}" y="72" width="9" height="${r}" rx="4.5"/>`}),`<g ${t}>${e}</g>
        <circle cx="44" cy="128" r="3" class="f-yellow"/><circle cx="116" cy="128" r="3" class="f-yellow"/>`}default:return``}}function le(e,t){let n=`fill="${e.hairColor}"`;switch(e.hair){case`puffs`:return`<g ${n}>
        <path d="M55 86 C54 64 66 56 80 56 C94 56 106 64 105 86 C100 74 92 68 80 68 C68 68 60 74 55 86 Z"/>
        <circle cx="61" cy="72" r="6"/><circle cx="70" cy="63" r="6"/><circle cx="80" cy="60" r="6"/>
        <circle cx="90" cy="63" r="6"/><circle cx="99" cy="72" r="6"/>
      </g>`;case`short`:return`<path ${n} d="M55 86 C52 60 68 53 82 54 C98 55 108 65 105 86 C103 76 98 71 91 69 C80 74 66 73 58 78 Z"/>
        <path d="M91 69 C86 63 80 60 74 60" class="s-ink-soft" stroke-width="1"/>`;case`braids`:return`<path ${n} d="M55 88 C52 62 66 54 80 54 C94 54 108 62 105 88 C102 74 92 67 80 66 C68 67 58 74 55 88 Z"/>
        <path d="M80 55 V66" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.2"/>`;case`bob`:return`<path ${n} d="M53 90 V82 A27 29 0 0 1 107 82 V90 H101 L98 76 C90 70 70 70 62 76 L59 90 Z"/>
        <path ${n} d="M80 57 L62 77 L80 72 Z"/>`;case`cap`:return`<path d="M54 82 C54 58 67 50 80 50 C93 50 106 58 106 82 Z" class="f-ink"/>
        <rect x="54" y="74" width="52" height="8" class="f-verm"/>
        <path d="M102 80 L131 85 Q122 92 102 87 Z" class="f-ink-soft"/>
        <circle cx="80" cy="51" r="2.6" class="f-verm"/>`;case`headwrap`:return`<path d="M51 86 C45 58 60 40 80 40 C100 40 115 58 109 86 C104 73 94 66 80 66 C66 66 56 73 51 86 Z" class="f-verm"/>
        <path d="M54 66 C66 58 94 58 106 66 L104 60 C92 52 68 52 56 60 Z" fill="${t.hatch}"/>
        <circle cx="99" cy="44" r="10" class="f-verm"/>
        <circle cx="110" cy="52" r="6" class="f-verm-deep"/>`;case`afro`:return`<path ${n} d="M53 90 C49 62 64 50 80 50 C96 50 111 62 107 90 C103 74 93 67 80 67 C67 67 57 74 53 90 Z"/>
        <path d="M60 48 A40 40 0 0 1 100 46" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2" fill="none"/>`;case`bun`:return`<path ${n} d="M55 88 C52 62 66 55 80 55 C94 55 108 62 105 88 C101 74 92 68 80 68 C68 68 59 74 55 88 Z"/>
        <rect x="70" y="54" width="20" height="5" rx="2.5" class="f-yellow"/>`;case`locks`:return`<path ${n} d="M54 90 C50 60 66 52 80 52 C94 52 110 60 106 90 C102 76 96 72 92 70 L88 78 L84 69 L76 78 L72 69 L66 78 C60 80 56 84 54 90 Z"/>`;case`bald`:return`<path ${n} d="M55 92 C54 82 57 76 61 73 L62 92 Z M105 92 C106 82 103 76 99 73 L98 92 Z"/>
        <path d="M68 64 Q76 60 84 61" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2" fill="none" stroke-linecap="round"/>`;case`kufi`:return`<path ${n} d="M55 92 C54 82 57 77 61 75 L62 92 Z M105 92 C106 82 103 77 99 75 L98 92 Z"/>
        <path d="M56 74 C56 58 66 51 80 51 C94 51 104 58 104 74 Z" class="f-white card-edge"/>
        <rect x="56" y="67" width="48" height="7" class="f-verm"/>
        <path d="M64 61 H96" stroke="#1c1a18" stroke-width="1.4" stroke-dasharray="2 3"/>`;case`bucket`:return`<ellipse cx="80" cy="72" rx="38" ry="7" class="f-ink-soft"/>
        <path d="M60 72 L64 50 C70 46 90 46 96 50 L100 72 Z" class="f-ink"/>
        <rect x="61.5" y="62" width="37" height="6" class="f-yellow"/>
        <path d="M100 72 Q112 80 108 92" class="s-ink" stroke-width="1.2"/>`;default:return``}}function ue(e){let t=e=>`<path d="M${e-4} 90 Q${e} 85 ${e+4} 90" class="s-ink" stroke-width="2" stroke-linecap="round"/>`,n=t=>e===`surprised`?`<g class="anim-blink"><circle cx="${t}" cy="88.5" r="4" fill="#fbf9f5"/><circle cx="${t}" cy="88.5" r="2.2" class="f-ink"/></g>`:`<g class="anim-blink"><ellipse cx="${t}" cy="89" rx="4" ry="2.4" fill="#fbf9f5"/><circle cx="${t+.4}" cy="89" r="1.9" class="f-ink"/></g>`;return e===`happy`?t(70)+t(90):e===`wink`?t(70)+n(90):n(70)+n(90)}function de(e,t){return`<path d="${{neutral:`M63 81 Q69 78 76 80 M84 80 Q91 78 97 81`,happy:`M63 79 Q69 75 76 78 M84 78 Q91 75 97 79`,sad:`M63 80 Q69 80 76 76 M84 76 Q91 80 97 80`,surprised:`M63 76 Q69 71 76 74 M84 74 Q91 71 97 76`,wink:`M63 81 Q69 79 76 82 M84 77 Q91 73 97 77`}[e]}" stroke="${t}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`}function j(e){switch(e){case`happy`:return`<path d="M71 107 Q80 118 89 107 Z" class="f-verm-deep"/>
        <path d="M73 108 H87" stroke="#fbf9f5" stroke-width="1.6"/>
        <circle cx="64" cy="101" r="4" class="f-verm" opacity="0.35"/>
        <circle cx="96" cy="101" r="4" class="f-verm" opacity="0.35"/>`;case`sad`:return`<path d="M73 112 Q80 106 87 112" class="s-verm-deep" stroke-width="2.2" stroke-linecap="round"/>`;case`surprised`:return`<ellipse cx="80" cy="110" rx="4" ry="5" class="f-verm-deep"/>`;case`wink`:return`<path d="M71 107 Q81 116 90 105" class="s-verm-deep" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="96" cy="101" r="4" class="f-verm" opacity="0.35"/>`;default:return`<path d="M73 109 Q80 112 87 109" class="s-verm-deep" stroke-width="2.2" stroke-linecap="round"/>`}}function M(e){return e.extras.includes(`gomesi`)?`<path d="M16 200 C16 162 28 144 44 140 L38 122 L62 135 C70 133 90 133 98 135 L122 122 L116 140 C132 144 144 162 144 200 Z" class="${e.top}"/>
      <path d="M68 134 L80 152 L92 134 Z" fill="${e.skin}"/>
      <rect x="16" y="182" width="128" height="9" class="f-verm"/>`:e.extras.includes(`kanzu`)?`<path d="M22 200 C24 152 46 134 80 132 C114 134 136 152 138 200 Z" class="f-white"/>
      <path d="M22 200 C24 152 46 134 66 133 L70 200 Z M138 200 C136 152 114 134 94 133 L90 200 Z" class="${e.top}"/>
      <path d="M70 132 L80 148 L90 132 Z" fill="${e.skin}"/>
      <path d="M80 148 V200" class="s-verm-deep" stroke-width="4"/>
      <path d="M80 148 V200" stroke="#fbfaf8" stroke-width="1.2" stroke-dasharray="2 2.5"/>`:`<path d="M22 200 C24 152 46 134 80 132 C114 134 136 152 138 200 Z" class="${e.top}"/>
    <path d="M70 132 L80 148 L90 132 Z" fill="${e.skin}"/>`}function N(e){return e.extras.includes(`beard`)?`<path d="M57 98 C59 121 70 130 80 130 C90 130 101 121 103 98 C98 109 90 113 80 113 C70 113 62 109 57 98 Z" fill="${e.hairColor}"/>`:``}function P(e){return e.extras.includes(`mustache`)?`<path d="M68 106 C72 101 78 102 80 104 C82 102 88 101 92 106 C87 106 83 106 80 105 C77 106 73 106 68 106 Z" fill="${e.hairColor}"/>`:``}function F(e){let t=``;if(e.extras.includes(`uniform`)&&(t+=`<path d="M66 134 L80 150 L72 156 Z M94 134 L80 150 L88 156 Z" class="f-white card-edge"/>
      <path d="M80 150 L76 156 L80 186 L84 156 Z" class="f-verm"/>`),e.extras.includes(`apron`)&&(t+=`<path d="M58 160 H102 V200 H58 Z" class="f-white"/>
      <path d="M58 160 L52 140 M102 160 L108 140" class="s-ink" stroke-width="1.6"/>
      <rect x="70" y="172" width="20" height="14" class="f-yellow"/>
      <path d="M58 160 H102" class="s-ink" stroke-width="1"/>`),e.extras.includes(`necklace`)){let e=``;for(let t=0;t<7;t+=1){let n=Math.PI*(.15+.7*t/6);e+=`<circle cx="${(80-16*Math.cos(n)).toFixed(1)}" cy="${(134+10*Math.sin(n)).toFixed(1)}" r="2.6" class="${t%2?`f-ink`:`f-yellow`}"/>`}t+=e}return e.extras.includes(`stethoscope`)&&(t+=`<path d="M64 136 C60 158 70 168 80 168 C90 168 100 158 96 136" class="s-ink" stroke-width="2.4"/>
      <path d="M96 150 C110 160 108 176 98 180" class="s-ink" stroke-width="2.4"/>
      <circle cx="96" cy="182" r="5.5" class="f-grey card-edge"/>`),t}function I(e){let t=``;return e.extras.includes(`glasses`)&&(t+=`<g class="s-ink" stroke-width="1.8">
      <circle cx="70" cy="89" r="8"/><circle cx="90" cy="89" r="8"/>
      <path d="M78 89 Q80 86.5 82 89 M62 88 L55 85 M98 88 L105 85"/>
    </g>`),e.extras.includes(`earrings`)&&(t+=`<circle cx="55" cy="104" r="3" class="f-verm"/><circle cx="105" cy="104" r="3" class="f-verm"/>`),t}function L(e,t,n){return`
    ${ce(e)}
    ${M(e)}
    <path d="M80 134 C104 135 128 150 134 200 H80 Z" fill="#000" opacity="0.14"/>
    ${F(e)}
    <rect x="70" y="106" width="20" height="30" rx="4" fill="${e.skin}"/>
    <rect x="80" y="106" width="10" height="30" fill="${e.shade}"/>
    <ellipse cx="55" cy="92" rx="4.5" ry="7" fill="${e.skin}"/>
    <ellipse cx="105" cy="92" rx="4.5" ry="7" fill="${e.shade}"/>
    <ellipse cx="80" cy="88" rx="25" ry="30" fill="${e.skin}"/>
    <path d="M80 50 V88 L85 101 L80 104 V125 H112 V50 Z" fill="${e.shade}" clip-path="url(#${n.face})"/>
    ${N(e)}
    ${ue(t)}
    ${de(t,e.hair===`headwrap`||e.hair===`bucket`?`#3a2a20`:e.hairColor)}
    <path d="M77 101.5 Q80 103.5 83 101.5" stroke="#000" stroke-opacity="0.35" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    ${j(t)}
    ${P(e)}
    ${le(e,n)}
    ${I(e)}`}function R(e,t,n,r=3){return n.map((n,i)=>e===`happy`||e===`wink`&&i===0?`<path d="M${n-4} ${t+1} Q${n} ${t-4} ${n+4} ${t+1}" class="s-ink" stroke-width="2" stroke-linecap="round"/>`:`<g class="anim-blink"><circle cx="${n}" cy="${t}" r="${e===`surprised`?r+1:r}" class="f-ink"/></g>`).join(``)}var z={cow:e=>`
    <path d="M24 200 C28 160 50 140 80 138 C110 140 132 160 136 200 Z" class="f-verm-deep"/>
    <path d="M63 72 C40 70 20 52 14 16 C28 42 46 56 66 60 Z" class="f-white card-edge"/>
    <path d="M97 72 C120 70 140 52 146 16 C132 42 114 56 94 60 Z" class="f-white card-edge"/>
    <path d="M14 16 L20 30 L24 26 Z M146 16 L140 30 L136 26 Z" class="f-ink"/>
    <ellipse cx="50" cy="84" rx="13" ry="6" transform="rotate(-20 50 84)" fill="#7a3d22"/>
    <ellipse cx="110" cy="84" rx="13" ry="6" transform="rotate(20 110 84)" fill="#7a3d22"/>
    <path d="M58 66 H102 L96 124 Q80 136 64 124 Z" fill="#8f4a2a"/>
    <path d="M80 66 H102 L96 124 Q88 130 80 131 Z" fill="#000" opacity="0.15"/>
    <path d="M70 66 L80 82 L90 66 Z" class="f-white"/>
    <ellipse cx="80" cy="122" rx="17" ry="11" class="f-blush"/>
    <circle cx="73" cy="122" r="2.4" class="f-ink"/><circle cx="87" cy="122" r="2.4" class="f-ink"/>
    ${R(e,92,[69,91])}`,leopard:e=>`
    <path d="M24 200 C28 160 50 140 80 138 C110 140 132 160 136 200 Z" class="f-yellow"/>
    <circle cx="54" cy="62" r="11" class="f-yellow card-edge"/><circle cx="106" cy="62" r="11" class="f-yellow card-edge"/>
    <circle cx="54" cy="62" r="5" class="f-ink"/><circle cx="106" cy="62" r="5" class="f-ink"/>
    <circle cx="80" cy="94" r="36" class="f-yellow"/>
    <g class="f-ink">
      <circle cx="62" cy="72" r="3"/><circle cx="96" cy="70" r="3.5"/><circle cx="80" cy="64" r="2.5"/>
      <circle cx="52" cy="98" r="3"/><circle cx="108" cy="100" r="3"/><circle cx="58" cy="116" r="2.4"/>
      <circle cx="104" cy="118" r="2.6"/><circle cx="50" cy="168" r="5"/><circle cx="104" cy="160" r="4"/><circle cx="120" cy="186" r="5"/>
    </g>
    <ellipse cx="80" cy="112" rx="16" ry="12" class="f-white"/>
    <path d="M74 104 H86 L80 111 Z" class="f-verm"/>
    <path d="M80 111 V116 M74 118 Q80 122 86 118" class="s-ink" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M60 110 H40 M60 115 L42 120 M100 110 H120 M100 115 L118 120" class="s-ink" stroke-width="1"/>
    ${R(e,92,[68,92],3.4)}`,crane:e=>`
    <circle cx="84" cy="214" r="56" class="f-grey"/>
    <g transform="translate(-8 46)">${ne(e===`happy`||e===`wink`?`happy`:e===`sad`?`sad`:`idle`)}</g>`};function B(e,{expression:n=`neutral`,shape:a=`card`,label:o,animate:s=!0}={}){let c=k[e]??A[e];if(!c)throw Error(`Unknown character: ${e}`);let l=t(e),u=i(l),d={face:`${l}-face`,frame:`${l}-frame`,hatch:u.hatch},f={dots:`<rect x="110" y="14" width="36" height="30" fill="${u.dots}"/>`,grid:`<rect x="116" y="150" width="30" height="26" fill="${u.grid}"/>`,hatch:`<rect x="14" y="14" width="30" height="24" fill="${u.hatch}"/>`},p=`<defs>${u.defs}
    <clipPath id="${d.face}"><ellipse cx="80" cy="88" rx="25" ry="30"/></clipPath>
    ${a===`circle`?`<clipPath id="${d.frame}"><circle cx="80" cy="92" r="62"/></clipPath>`:`<clipPath id="${d.frame}"><rect x="4" y="4" width="152" height="192" rx="16"/></clipPath>`}</defs>`,m=`<g clip-path="url(#${d.frame})">
      <rect width="160" height="200" class="${c.card}"/>
      ${se[c.backdrop](c.backdropColor??`f-verm`)}
      ${f[c.texture]}
      <g transform="translate(80 200) scale(1.1) translate(-80 -200)"><g class="${s?`anim-breathe`:``}" ${g()}>${c.species?z[c.species](n):L(c,n,d)}</g></g>
    </g>`,h=o??`${c.name}, ${{neutral:`smiling softly`,wink:`winking`}[n]??n}`;return r(a===`circle`?{viewBox:`16 28 128 128`,label:h,className:`ill--avatar`,body:`${p}${m}<circle cx="80" cy="92" r="62" class="card-edge" fill="none"/>`}:{viewBox:`0 0 160 200`,label:h,className:`ill--portrait`,body:`${p}
      <rect x="6" y="7" width="152" height="192" rx="16" class="f-ink"/>
      ${m}
      <rect x="4" y="4" width="152" height="192" rx="16" class="card-edge" fill="none"/>`})}function V(e,{expression:t=`neutral`,x:n=0,y:r=0,scale:i=1,rotate:a=0,animate:o=!0}={}){return`<g transform="translate(${n} ${r}) rotate(${a} 80 100) scale(${i})">${B(e,{expression:t,animate:o}).replace(/^<svg[^>]*>/,``).replace(/<\/svg>$/,``).replace(/<title[^>]*>.*?<\/title>/,``)}</g>`}var H=200;function fe(e){return`<pattern id="${e}" width="8" height="8" patternUnits="userSpaceOnUse">
    <rect width="8" height="8" class="f-white"/><rect width="4" height="4" class="f-blue"/><rect x="4" y="4" width="4" height="4" class="f-blue"/>
  </pattern>`}function U(e,t,n,r){return`<g transform="translate(${e} ${t})">
    <g class="anim-steam" ${r}><circle cx="-6" cy="44" r="5" class="f-grey-light"/><circle cx="-14" cy="38" r="3.5" class="f-grey-light"/></g>
    <g class="anim-idle" ${r}>
      <path d="M0 50 V14 Q0 4 10 4 H96 Q106 4 112 14 L124 34 V50 Z" class="f-white card-edge"/>
      <rect x="0" y="34" width="124" height="8" fill="${n}"/>
      <path d="M8 12 H90 V28 H8 Z" class="f-ink"/>
      <path d="M96 12 H106 L116 28 H96 Z" class="f-ink"/>
      <path d="M30 12 V28 M52 12 V28 M74 12 V28" class="s-white" stroke-width="2"/>
      <rect x="118" y="38" width="6" height="5" class="f-yellow"/>
    </g>
    <circle cx="26" cy="52" r="10" class="f-ink"/><circle cx="26" cy="52" r="4" class="f-grey-light"/>
    <circle cx="98" cy="52" r="10" class="f-ink"/><circle cx="98" cy="52" r="4" class="f-grey-light"/>
  </g>`}function W(e,t,n,r,i){return`<g transform="translate(${e} ${t}) scale(${n})">
    <g class="anim-steam" ${i}><circle cx="58" cy="-8" r="6" class="f-grey-light"/><circle cx="66" cy="-22" r="4.5" class="f-grey-light"/><circle cx="60" cy="-34" r="3" class="f-grey-light"/></g>
    <rect x="6" y="40" width="88" height="60" class="f-paper"/>
    <rect x="6" y="40" width="88" height="60" class="card-edge" fill="none"/>
    <path d="M38 100 V74 A12 12 0 0 1 62 74 V100 Z" class="f-ink"/>
    <path d="M-6 44 L50 0 L106 44 Z" fill="${r.hatch}"/>
    <path d="M-6 44 L50 0 L106 44 Z" class="card-edge" fill="none"/>
  </g>`}function G(e,t,n,r){return`<g transform="translate(${e} ${t}) scale(${n})">
    <rect x="-4" y="0" width="8" height="70" class="f-grey"/>
    <g class="anim-sway-base" ${r}>
      <path d="M0 4 C-20 -20 -50 -16 -62 4 C-40 -4 -20 0 0 8 Z" class="f-sage card-edge"/>
      <path d="M0 4 C20 -26 50 -24 62 -6 C40 -10 20 -4 0 8 Z" class="f-sage card-edge"/>
      <path d="M0 2 C-6 -26 2 -46 14 -54 C10 -34 6 -16 2 4 Z" class="f-sage card-edge"/>
    </g>
  </g>`}var K={market:{name:`The market`,word:`akatale — n. market`,draw:e=>`
      <path d="M16 34 Q200 64 384 34" class="s-ink" stroke-width="1"/>
      ${Array.from({length:11},(e,t)=>{let n=36+t*32,r=34+Math.sin(t/10*Math.PI)*15;return`<g class="anim-sway" ${g(3)}><path d="M${n-8} ${r} H${n+8} L${n} ${r+14} Z" class="${[`f-verm`,`f-ink`,`f-yellow`][t%3]}"/></g>`}).join(``)}
      <g>
        ${Array.from({length:10},(e,t)=>`<rect x="${40+t*15}" y="70" width="15" height="24" class="${t%2?`f-white`:`f-verm`}"/>`).join(``)}
        ${Array.from({length:10},(e,t)=>`<path d="M${40+t*15} 94 A7.5 7.5 0 0 0 ${55+t*15} 94 Z" class="${t%2?`f-white`:`f-verm`}"/>`).join(``)}
        <path d="M40 70 H190 V94 H40 Z" class="card-edge" fill="none"/>
        <path d="M46 94 V${H} M184 94 V${H}" class="s-ink" stroke-width="3"/>
        <rect x="36" y="150" width="158" height="10" class="f-ink"/>
        <rect x="44" y="160" width="142" height="40" fill="${e.hatch}"/>
        ${[[70,142],[84,142],[98,142],[77,130],[91,130],[84,118]].map(([e,t])=>`<circle cx="${e}" cy="${t}" r="7" class="f-verm card-edge"/>`).join(``)}
        ${b(`matooke`,{x:122,y:92,scale:.85})}
      </g>
      <g>
        ${Array.from({length:9},(e,t)=>`<rect x="${226+t*15}" y="82" width="15" height="20" class="${t%2?`f-yellow`:`f-ink`}"/>`).join(``)}
        <path d="M232 102 V${H} M354 102 V${H}" class="s-ink" stroke-width="3"/>
        <rect x="222" y="156" width="140" height="10" class="f-ink"/>
        ${b(`basket`,{x:238,y:104,scale:.75})}
        ${b(`pot`,{x:296,y:108,scale:.7})}
      </g>`},taxipark:{name:`The taxi park`,word:`ppaaka — n. taxi park`,draw:(e,t)=>`
      <defs>${fe(t.checker)}</defs>
      <g class="f-grey-light">
        <rect x="30" y="60" width="50" height="140"/><rect x="88" y="84" width="40" height="116"/>
        <rect x="250" y="50" width="60" height="150"/><rect x="318" y="76" width="44" height="124"/>
      </g>
      <rect x="36" y="70" width="38" height="80" fill="${e.dots}" opacity="0.5"/>
      <rect x="258" y="60" width="44" height="90" fill="${e.dots}" opacity="0.5"/>
      <g class="anim-drift" ${g(9)}><rect x="140" y="40" width="70" height="16" rx="8" class="f-white card-edge"/></g>
      <path d="M352 ${H} V96" class="s-ink" stroke-width="3"/>
      <rect x="318" y="80" width="68" height="22" class="f-verm"/>
      <text class="mono" x="352" y="94.5" font-size="8" text-anchor="middle" fill="#fbfaf8" style="fill:#fbfaf8">PPAAKA</text>
      ${U(150,126,`url(#${t.checker})`,g(2))}
      ${U(24,136,`url(#${t.checker})`,g(2))}`},lake:{name:`The lake`,word:`ennyanja — n. lake`,draw:()=>`
      <path d="M220 120 A64 64 0 0 1 348 120 Z" class="f-verm"/>
      <path d="M252 120 A32 32 0 0 1 316 120 Z" class="f-yellow"/>
      <g class="anim-drift" ${g(9)}><path d="M80 50 l8 6 l8 -6 M104 40 l6 4 l6 -4" class="s-ink" stroke-width="1.6"/></g>
      <rect x="16" y="120" width="368" height="116" class="f-sky"/>
      ${[134,152,170,188].map((e,t)=>`<g class="anim-ripple" ${g(6)}><path d="M${30+t%2*20} ${e} q12 -6 24 0 t24 0 M${200+t%2*30} ${e} q12 -6 24 0 t24 0" class="s-white" stroke-width="2.4"/></g>`).join(``)}
      <g class="anim-bob" ${g(3)}>
        <path d="M60 150 H190 Q170 172 128 172 H96 Q72 172 60 150 Z" class="f-ink"/>
        <path d="M150 150 L176 96" class="s-ink-soft" stroke-width="2.4"/>
        <path d="M176 96 Q196 120 186 150" class="s-ink-soft" stroke-width="0.8" stroke-dasharray="3 3"/>
      </g>
      <g class="anim-hop" ${g(3)}><path d="M250 166 C262 156 278 156 286 166 C278 176 262 176 250 166 Z M286 166 L296 158 V174 Z" class="f-verm"/><circle cx="260" cy="164" r="1.6" class="f-ink"/></g>
      ${[340,352,364].map((e,t)=>`<g class="anim-sway-base" ${g(4)}><path d="M${e} 230 V${100+t*10}" class="s-ink" stroke-width="2"/><path d="M${e} ${100+t*10} l-10 -14 M${e} ${100+t*10} l0 -16 M${e} ${100+t*10} l10 -14" class="s-ink" stroke-width="1.4"/></g>`).join(``)}`},school:{name:`The school`,word:`essomero — n. school`,draw:e=>`
      <path d="M140 84 L250 34 L360 84 Z" class="f-ink-soft"/>
      <rect x="150" y="84" width="200" height="116" class="f-cream"/>
      <rect x="150" y="84" width="200" height="116" class="card-edge" fill="none"/>
      <path d="M232 ${H} V150 A18 18 0 0 1 268 150 V${H} Z" class="f-verm"/>
      ${[164,300].map(t=>`<rect x="${t}" y="110" width="36" height="30" fill="${e.hatch}"/><rect x="${t}" y="110" width="36" height="30" class="card-edge" fill="none"/>`).join(``)}
      <circle cx="250" cy="66" r="13" class="f-white card-edge"/>
      <g class="anim-spin" style="animation-duration: 12s"><path d="M250 66 V56" class="s-ink" stroke-width="1.8" stroke-linecap="round"/></g>
      <path d="M250 66 H257" class="s-ink" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M82 ${H} V34" class="s-ink" stroke-width="3"/>
      <circle cx="82" cy="32" r="3.5" class="f-yellow"/>
      <g class="anim-flag" ${g(2)}>
        ${[`f-ink`,`f-yellow`,`f-verm`,`f-ink`,`f-yellow`,`f-verm`].map((e,t)=>`<rect x="84" y="${38+t*6}" width="54" height="6" class="${e}"/>`).join(``)}
        <circle cx="111" cy="56" r="8" class="f-white"/>
      </g>
      ${b(`book`,{x:30,y:150,scale:.7})}`},village:{name:`The village`,word:`ekyalo — n. village`,draw:e=>`
      <circle cx="300" cy="58" r="22" class="f-verm"/>
      <path d="M16 160 Q110 90 210 160 Q300 110 384 150 V${H} H16 Z" class="f-sage"/>
      <g class="anim-drift" ${g(9)}><rect x="60" y="44" width="80" height="16" rx="8" class="f-white card-edge"/></g>
      ${W(150,96,1,e,g(2))}
      ${W(286,126,.7,e,g(2))}
      ${G(70,130,1,g(4))}
      ${G(350,146,.7,g(4))}
      <g transform="translate(266 186)"><g class="anim-peck" ${g(2)}>
        <circle cx="0" cy="0" r="10" class="f-white card-edge"/>
        <circle cx="-9" cy="-8" r="5" class="f-white card-edge"/>
        <path d="M-12 -14 l3 -4 l3 4" class="f-verm"/>
        <path d="M-14 -8 l-5 2 l5 2 Z" class="f-yellow"/>
      </g></g>`},kitchen:{name:`The kitchen`,word:`effumbiro — n. kitchen`,draw:e=>`
      <rect x="16" y="120" width="368" height="22" fill="${e.grid}"/>
      <rect x="40" y="36" width="90" height="70" class="f-sky card-edge"/>
      <circle cx="98" cy="64" r="16" class="f-verm"/>
      <path d="M85 36 V106 M40 71 H130" class="s-ink" stroke-width="3"/>
      <path d="M200 76 H364" class="s-ink" stroke-width="3"/>
      ${[[210,`f-verm`],[236,`f-yellow`],[262,`f-blue`],[288,`f-verm`]].map(([e,t],n)=>`<rect x="${e}" y="${52+n%2*6}" width="18" height="${24-n%2*6}" class="f-white card-edge"/><rect x="${e}" y="${50+n%2*6}" width="18" height="5" class="${t}"/>`).join(``)}
      <path d="M322 52 L330 76 H344 L352 52 Z" class="f-ink"/>
      <g class="anim-sway" ${g(3)}><path d="M170 16 V40" class="s-ink" stroke-width="1.2"/>${b(`basket`,{x:150,y:30,scale:.6})}</g>
      <path d="M40 ${H} L52 172 H88 L100 ${H} Z" class="f-ink"/>
      <path d="M46 150 H94 L86 172 H54 Z" class="f-ink-soft"/>
      <g class="anim-pulse" ${g(1)}><rect x="56" y="156" width="28" height="8" class="f-verm"/></g>
      ${b(`pot`,{x:46,y:92,scale:.75})}
      <rect x="250" y="160" width="120" height="8" class="f-ink"/>
      <path d="M260 168 V${H} M360 168 V${H}" class="s-ink" stroke-width="3"/>
      ${b(`tea`,{x:254,y:128,scale:.5})}
      ${b(`matooke`,{x:300,y:108,scale:.75})}`}},q=Object.keys(K);function pe(e){let t=K[e];return t&&{name:t.name,word:t.word}}var J=[{x:24,y:128},{x:314,y:128}];function Y(e,{cast:o=[],expression:s=`happy`,pose:l,caption:u,label:d,number:f}={}){let p=K[e];if(!p)throw Error(`Unknown place: ${e}`);let m=t(`place-${e}`),h=i(m),g={checker:`${m}-checker`},_=o.slice(0,2).map((e,t)=>V(e,{expression:s,x:J[t].x,y:J[t].y,scale:.44,rotate:t?4:-4})).join(``),v=l?O({pose:l,x:o.length?150:140,y:120,scale:.46}):``,y=String(f??q.indexOf(e)+1).padStart(2,`0`);return r({viewBox:`0 0 400 264`,label:d??p.name,className:`ill--scene ill--place`,body:`<defs>${h.defs}</defs>
      <rect x="16" y="16" width="368" height="220" class="f-paper-light"/>
      <g>${p.draw(h,g)}</g>
      <path d="M16 ${H} H384" class="s-ink" stroke-width="1"/>
      <rect x="16" y="${H}" width="368" height="36" fill="${h.dots}" opacity="0.35"/>
      ${a(8,8,384,236,12)}
      ${v}
      ${_}
      <text class="mono" x="20" y="10" font-size="7">PLACE Nº ${y} — ${n(p.name.toUpperCase())}</text>
      ${c(384,258,u??p.word,{anchor:`end`})}`})}var me=[`Oli otya?`,`Gyebale ko!`,`Wasuze otya?`],X=[[`Weebale nnyo!`,`weebale — thank you, well done`],[`Kirungi nnyo!`,`kirungi nnyo — very good`],[`Bulungi!`,`bulungi — well, nicely done`]];function he({pair:e,pose:n,greeting:u,label:d}={}){let f=i(t(`hero`)),[m,g]=e??h(Object.keys(k),2),_=n??p([`happy`,`waving`,`idle`,`dancing`]),v=u??p(me);return r({viewBox:`0 0 560 420`,label:d??`${k[m].name} and ${k[g].name} greet you beside the crane mascot`,className:`ill--scene`,body:`<defs>${f.defs}</defs>
      <circle cx="70" cy="58" r="9" class="s-rule" stroke-width="1.4"/>
      ${o(522,40)}
      <g>
        <rect x="206" y="52" width="196" height="226" class="f-paper-light"/>
        <rect x="224" y="70" width="44" height="40" fill="${f.hatch}"/>
        <g class="anim-spin"><circle cx="336" cy="122" r="62" class="f-verm"/></g>
        <circle cx="336" cy="122" r="9" class="f-white"/>
        <path d="M206 170 H402" class="s-ink" stroke-width="1"/>
        <path d="M218 268 V184 A84 84 0 0 1 302 268 Z" class="f-ink"/>
        <rect x="312" y="178" width="46" height="14" fill="${f.grid}"/>
      </g>
      ${a(196,42,216,246,12)}
      <path d="M446 150 L459 174 L433 174 Z" class="f-verm anim-drift"/>
      ${V(m,{x:84,y:82,scale:.86,rotate:-4,expression:p([`happy`,`wink`])})}
      ${V(g,{x:316,y:200,scale:.68,rotate:4,expression:p([`neutral`,`happy`,`surprised`])})}
      ${l(150,300,v)}
      <rect x="250" y="306" width="24" height="24" fill="${f.grid}"/>
      ${O({pose:_,x:12,y:238,scale:.72})}
      ${c(476,360,`okuyiga — v. to learn, a little every day`,{anchor:`end`})}
      ${s(436,392,78,{step:6,label:`LESSON Nº 001`})}`})}function Z({xp:e=15,label:n,pose:o,friend:s,prop:u}={}){let d=i(t(`done`)),m=o??p([`cheering`,`dancing`,`cheering`,`waving`]),[h,g]=p(X),_=s===void 0?f(.6)?p(Object.keys(k)):null:s,y=u===void 0?p(v):u;return r({viewBox:`0 0 400 360`,label:n??`Lesson complete. The crane cheers${_?` with ${k[_].name}`:``}. You earned ${e} XP.`,className:`ill--scene`,body:`<defs>${d.defs}</defs>
      ${a(16,16,368,328,14)}
      <path d="M40 300 V200 A100 100 0 0 1 140 300 Z" class="f-ink"/>
      <rect x="306" y="40" width="48" height="40" fill="${d.hatch}"/>
      <rect x="48" y="52" width="40" height="30" fill="${d.dots}"/>
      <g class="anim-spin"><circle cx="210" cy="160" r="104" class="f-verm"/></g>
      <path d="M100 236 H330" class="s-rule" stroke-width="1"/>
      ${y?b(y,{x:316,y:176,scale:.8}):``}
      ${O({pose:m,x:86,y:34,scale:1.12})}
      ${_?V(_,{expression:p([`happy`,`wink`,`surprised`]),x:18,y:150,scale:.5,rotate:-8}):``}
      ${l(140,282,`${h}  +${e} XP`,{size:10})}
      ${c(364,330,g,{anchor:`end`})}
      <text class="mono" x="36" y="34" font-size="7">Nº 01 — LESSON COMPLETE</text>`})}function ge({days:e=7,label:o}={}){let l=i(t(`streak`)),u=Math.min(e,7),d=``;for(let e=0;e<7;e+=1){let t=110+e*30;d+=e<u?`<circle cx="${t}" cy="318" r="9" class="f-verm"/>`:`<circle cx="${t}" cy="318" r="9" class="s-rule" stroke-width="1.2"/>`}return r({viewBox:`0 0 400 360`,label:o??`A ${e} day streak flame`,className:`ill--scene`,body:`<defs>${l.defs}</defs>
      ${a(70,24,260,266,12)}
      <rect x="92" y="44" width="216" height="226" class="f-paper-light"/>
      <rect x="250" y="56" width="44" height="34" fill="${l.dots}"/>
      <path d="M92 270 V214 A56 56 0 0 1 148 270 Z" class="f-ink"/>
      <g class="anim-bob">
        <path d="M200 58 C200 58 266 132 266 190 A66 66 0 0 1 134 190 C134 132 200 58 200 58 Z" class="f-verm"/>
        <path d="M200 58 C200 58 266 132 266 190 A66 66 0 0 1 200 256 Z" class="f-verm-deep" opacity="0.35"/>
        <path d="M200 136 C200 136 234 176 234 206 A34 34 0 0 1 166 206 C166 176 200 136 200 136 Z" class="f-ink"/>
        <circle cx="200" cy="210" r="22" class="f-paper-light"/>
        <text x="200" y="219" text-anchor="middle" font-size="26" font-weight="700" class="f-ink" style="font-family: var(--font-display, system-ui, sans-serif)">${n(e)}</text>
      </g>
      <path d="M92 270 H308" class="s-ink" stroke-width="1"/>
      ${d}
      ${c(308,350,`olunaku — n. day; keep the fire going`,{anchor:`end`})}
      ${s(92,296,66,{step:6})}
      <text class="mono" x="308" y="38" font-size="7" text-anchor="end">STREAK Nº ${n(e)}</text>`})}var Q={celebrate:[`cheering`,`dancing`,`waving`,`happy`],greet:[`waving`,`happy`,`idle`],empty:[`thinking`,`sleeping`,`idle`],ponder:[`thinking`,`idle`],sad:[`sad`]};function $(e=`greet`){return p(Q[e]??Q.greet)}function _e(e=`empty`,{label:t}={}){return D({pose:$(e),prop:f(.6)?p(v):void 0,label:t})}function ve({xp:e=15}={}){return f(.35)?Y(p(q),{cast:h(Object.keys(k),2),pose:p(Q.celebrate),label:`Lesson complete. The crane and friends celebrate. You earned ${e} XP.`}):Z({xp:e})}export{u as C,m as S,D as _,Z as a,p as b,pe as c,A as d,ie as f,x as g,B as h,he as i,Y as l,oe as m,_e as n,ge as o,ae as p,$ as r,q as s,ve as t,k as u,v,h as x,y};