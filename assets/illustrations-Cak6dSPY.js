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
  </g>`}function u(e,t,n,r){let i=r*Math.PI/180;return[+(e+n*Math.cos(i)).toFixed(2),+(t+n*Math.sin(i)).toFixed(2)]}var d=[`idle`,`happy`,`sad`,`cheering`,`thinking`],f=`89 74`;function p(e){let t=e===`sad`?13:20,n=e===`sad`?[-150,-60]:[-160,-20],r=``,i=``;for(let e=0;e<=8;e+=1){let a=n[0]+(n[1]-n[0])*e/8,[o,s]=u(90,38,t-Math.abs(e-4)*1.2,a);r+=`M90 38 L${o} ${s} `,i+=`<circle cx="${o}" cy="${s}" r="2.2" class="f-verm"/>`}return`<path d="${r}" class="s-ink" stroke-width="1.2"/>${i}`}function m(e){return e===`happy`||e===`cheering`?`<path d="M86.5 56 Q90 51.5 93.5 56" class="s-ink" stroke-width="2" stroke-linecap="round"/>`:`<g class="anim-blink"><circle cx="90.5" cy="55.5" r="2.7" class="f-ink"/></g>${e===`sad`?`<path d="M85.5 51.5 L94 54" class="s-ink" stroke-width="1.8" stroke-linecap="round"/>`:``}`}function h(e){return e===`happy`||e===`cheering`?`<path d="M72 51 L47 57 L72 58 Z" class="f-grey"/>
      <path d="M72 61 L52 67 L72 66 Z" class="f-grey"/>
      <path d="M72 58 L58 62 L72 61 Z" class="f-verm-deep"/>`:`<path d="M72 51 L47 60 L72 64 Z" class="f-grey"/>`}function g(e){return`
    <rect x="80" y="62" width="18" height="70" rx="9" class="f-grey-light"/>
    <path d="M76 66 C71 75 71 82 76.5 85 C82 82 82 75 79 66 Z" class="f-verm"/>
    ${h(e)}
    <circle cx="88" cy="56" r="19" class="f-ink"/>
    <circle cx="93" cy="58" r="9.5" class="f-white"/>
    <path d="M85 49 A8 8 0 0 1 101 49 Z" class="f-verm"/>
    ${m(e)}
    ${p(e)}`}function _(e,{mirrored:t=!1,raised:n=!1}={}){return`<g transform="${t?`translate(200 0) scale(-1 1)`:``} ${n?`translate(16 -46)`:``} rotate(${e} 100 140)">
      <path d="M100 140 H148 A48 48 0 0 0 100 92 Z" class="f-ink"/>
      <path d="M100 140 H125 A25 25 0 0 0 100 115 Z" class="f-white"/>
      <path d="M100 140 H112 A12 12 0 0 0 100 128 Z" class="f-verm"/>
    </g>`}var v={idle:{head:0,wing:0,raised:!1,bob:!0},happy:{head:6,wing:-10,raised:!1,bob:!0},sad:{head:-18,wing:12,raised:!1,bob:!1},cheering:{head:8,wing:28,raised:!0,bob:!0},thinking:{head:12,wing:0,raised:!1,bob:!1}};function y(e){return e===`thinking`?`<g class="anim-drift">
      <circle cx="122" cy="34" r="3.5" class="f-white card-edge"/>
      <circle cx="134" cy="20" r="5.5" class="f-white card-edge"/>
      <circle cx="152" cy="6" r="8.5" class="f-white card-edge"/>
    </g>`:e===`cheering`?`<g class="anim-drift">
      <path d="M30 40 L40 22 L48 42 Z" class="f-verm"/>
      <rect x="160" y="28" width="11" height="11" transform="rotate(20 165 33)" class="f-ink"/>
      <circle cx="176" cy="80" r="6" class="s-ink" stroke-width="1.5"/>
      <path d="M10 150 A9 9 0 0 1 28 150 Z" class="f-ink"/>
      <circle cx="150" cy="10" r="3" class="f-verm"/>
    </g>`:e===`sad`?`<path d="M98 66 C96 71 96 74 98.5 75 C101 74 101 71 99 66 Z" class="f-lavender" stroke="#5a5687" stroke-width="0.6"/>`:``}function b({pose:e=`idle`,label:t,animate:n=!0}={}){if(!v[e])throw Error(`Unknown mascot pose: ${e}`);return r({viewBox:`0 0 200 220`,label:t??`The crane mascot, ${e}`,className:`ill--mascot`,body:x({pose:e,animate:n})})}function x({pose:e=`idle`,animate:n=!0,x:r=0,y:a=0,scale:o=1}={}){let s=v[e],c=i(t(`crane`));return`<g transform="translate(${r} ${a}) scale(${o})">
    <defs>${c.defs}</defs>
    <ellipse cx="102" cy="208" rx="48" ry="4.5" class="f-rule" opacity="0.14"/>
    <g class="${n&&s.bob?`anim-bob`:``}">
      <path d="M93 170 L89 206 M109 170 L113 206" class="s-ink" stroke-width="3" stroke-linecap="round"/>
      <path d="M80 206 H97 M105 206 H122" class="s-ink" stroke-width="3" stroke-linecap="round"/>
      <path d="M138 146 L176 176 L134 168 Z" class="f-ink"/>
      <circle cx="100" cy="140" r="48" class="f-grey"/>
      <path d="M52 140 A48 48 0 0 0 100 188 V140 Z" fill="${c.hatch}" opacity="0.55"/>
      ${s.raised?_(s.wing,{mirrored:!0,raised:!0}):``}
      ${_(s.wing,{raised:s.raised})}
      <g transform="rotate(${s.head} ${f})">${g(e)}</g>
    </g>
    ${y(e)}
  </g>`}export{a,i as c,s as d,t as f,c as i,l,b as n,o,x as r,n as s,d as t,r as u};