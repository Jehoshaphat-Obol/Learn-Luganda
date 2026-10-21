import"./base-D1ZtIADK.js";var e=0;function t(t=`ill`){return e+=1,`${t}-${e}`}function n(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function r({viewBox:e,label:r,body:i,className:a=``}){let o=t(`title`);return`<svg class="ill ${a}" viewBox="${e}" role="img" aria-labelledby="${o}" xmlns="http://www.w3.org/2000/svg"><title id="${o}">${n(r)}</title>${i}</svg>`}function i(e){let t={hatch:`${e}-hatch`,dots:`${e}-dots`,grid:`${e}-grid`};return{defs:`
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
  </g>`}function u(e,t,n,r){let i=r*Math.PI/180;return[+(e+n*Math.cos(i)).toFixed(2),+(t+n*Math.sin(i)).toFixed(2)]}var d={nakato:{name:`Nakato`,role:`Your guide, a university student in Kampala`,skin:`#7a4a2e`,shade:`#5e3720`,hair:`puffs`,hairColor:`#1c1512`,top:`f-verm`,card:`f-cream`,backdrop:`circle`,texture:`dots`,extras:[`earrings`]},mukasa:{name:`Mukasa`,role:`A patient teacher from Masaka`,skin:`#a8714a`,shade:`#8a5735`,hair:`short`,hairColor:`#1c1512`,top:`f-ink`,card:`f-lavender`,backdrop:`quarter`,texture:`grid`,extras:[`glasses`]},jjajja:{name:`Jjajja Nalwoga`,role:`A grandmother who loves proverbs`,skin:`#5c3622`,shade:`#452616`,hair:`headwrap`,hairColor:`#d9d3ca`,top:`f-lavender`,card:`f-blush`,backdrop:`arch`,backdropColor:`f-ink`,texture:`hatch`,extras:[`gomesi`,`earrings`]},ssali:{name:`Ssali`,role:`A boda boda rider who knows every road`,skin:`#6b3f26`,shade:`#52301b`,hair:`cap`,hairColor:`#1c1512`,top:`f-ink-soft`,card:`f-sage`,backdrop:`half`,texture:`dots`,extras:[`beard`]},amara:{name:`Amara`,role:`A secondary school student who loves music`,skin:`#8f5a37`,shade:`#724427`,hair:`braids`,hairColor:`#211814`,top:`f-lavender`,card:`f-paper-light`,backdrop:`circle`,texture:`hatch`,extras:[]},emma:{name:`Emma`,role:`A visitor learning Luganda before her trip`,skin:`#f0c9a8`,shade:`#d9a986`,hair:`bob`,hairColor:`#b8532a`,top:`f-ink`,card:`f-cream`,backdrop:`quarter`,texture:`grid`,extras:[]}},f=[`neutral`,`happy`,`sad`],p={circle:e=>`<circle cx="104" cy="84" r="50" class="${e}"/>`,quarter:e=>`<path d="M156 70 A126 126 0 0 0 30 196 H156 Z" class="${e}"/>`,half:e=>`<path d="M4 34 A72 72 0 0 1 4 178 Z" class="${e}"/>`,arch:e=>`<path d="M34 196 V84 A46 46 0 0 1 126 84 V196 Z" class="${e}"/>`};function m(e){let t=`fill="${e.hairColor}"`;switch(e.hair){case`puffs`:return`<g ${t}>
        <circle cx="80" cy="70" r="30"/>
        <circle cx="58" cy="62" r="16"/><circle cx="72" cy="50" r="16"/>
        <circle cx="90" cy="49" r="16"/><circle cx="104" cy="61" r="16"/>
        <circle cx="50" cy="80" r="11"/><circle cx="110" cy="80" r="11"/>
      </g>`;case`braids`:{let e=``;for(let t=0;t<6;t+=1){let n=92+t*11;e+=`<circle cx="51" cy="${n}" r="6"/><circle cx="109" cy="${n}" r="6"/>`}return`<g ${t}>${e}</g>
        <circle cx="51" cy="160" r="3.4" class="f-verm"/><circle cx="109" cy="160" r="3.4" class="f-verm"/>`}case`bob`:return`<path ${t} d="M48 124 V82 A32 32 0 0 1 112 82 V124 Z"/>`;default:return``}}function h(e,t){let n=`fill="${e.hairColor}"`;switch(e.hair){case`puffs`:return`<g ${n}>
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
        <circle cx="110" cy="52" r="6" class="f-verm-deep"/>`;default:return``}}function g(e){let t=e===`happy`,n=e=>t?`<path d="M${e-4} 90 Q${e} 85 ${e+4} 90" class="s-ink" stroke-width="2" stroke-linecap="round"/>`:`<g class="anim-blink"><ellipse cx="${e}" cy="89" rx="4" ry="2.4" fill="#fbf9f5"/><circle cx="${e+.4}" cy="89" r="1.9" class="f-ink"/></g>`;return n(70)+n(90)}function _(e,t){return`<path d="${{neutral:`M63 81 Q69 78 76 80 M84 80 Q91 78 97 81`,happy:`M63 79 Q69 75 76 78 M84 78 Q91 75 97 79`,sad:`M63 80 Q69 80 76 76 M84 76 Q91 80 97 80`}[e]}" stroke="${t}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`}function v(e){switch(e){case`happy`:return`<path d="M71 107 Q80 118 89 107 Z" class="f-verm-deep"/>
        <path d="M73 108 H87" stroke="#fbf9f5" stroke-width="1.6"/>
        <circle cx="64" cy="101" r="4" class="f-verm" opacity="0.35"/>
        <circle cx="96" cy="101" r="4" class="f-verm" opacity="0.35"/>`;case`sad`:return`<path d="M73 112 Q80 106 87 112" class="s-verm-deep" stroke-width="2.2" stroke-linecap="round"/>`;default:return`<path d="M73 109 Q80 112 87 109" class="s-verm-deep" stroke-width="2.2" stroke-linecap="round"/>`}}function y(e){return e.extras.includes(`gomesi`)?`<path d="M16 200 C16 162 28 144 44 140 L38 122 L62 135 C70 133 90 133 98 135 L122 122 L116 140 C132 144 144 162 144 200 Z" class="${e.top}"/>
      <path d="M68 134 L80 152 L92 134 Z" fill="${e.skin}"/>
      <rect x="16" y="182" width="128" height="9" class="f-verm"/>`:`<path d="M22 200 C24 152 46 134 80 132 C114 134 136 152 138 200 Z" class="${e.top}"/>
    <path d="M70 132 L80 148 L90 132 Z" fill="${e.skin}"/>`}function b(e){return e.extras.includes(`beard`)?`<path d="M57 98 C59 121 70 130 80 130 C90 130 101 121 103 98 C98 109 90 113 80 113 C70 113 62 109 57 98 Z" fill="${e.hairColor}"/>`:``}function x(e){let t=``;return e.extras.includes(`glasses`)&&(t+=`<g class="s-ink" stroke-width="1.8">
      <circle cx="70" cy="89" r="8"/><circle cx="90" cy="89" r="8"/>
      <path d="M78 89 Q80 86.5 82 89 M62 88 L55 85 M98 88 L105 85"/>
    </g>`),e.extras.includes(`earrings`)&&(t+=`<circle cx="55" cy="104" r="3" class="f-verm"/><circle cx="105" cy="104" r="3" class="f-verm"/>`),t}function S(e,t,n){return`
    ${m(e)}
    ${y(e)}
    <path d="M80 134 C104 135 128 150 134 200 H80 Z" fill="#000" opacity="0.14"/>
    <rect x="70" y="106" width="20" height="30" rx="4" fill="${e.skin}"/>
    <rect x="80" y="106" width="10" height="30" fill="${e.shade}"/>
    <ellipse cx="55" cy="92" rx="4.5" ry="7" fill="${e.skin}"/>
    <ellipse cx="105" cy="92" rx="4.5" ry="7" fill="${e.shade}"/>
    <ellipse cx="80" cy="88" rx="25" ry="30" fill="${e.skin}"/>
    <path d="M80 50 V88 L85 101 L80 104 V125 H112 V50 Z" fill="${e.shade}" clip-path="url(#${n.face})"/>
    ${b(e)}
    ${g(t)}
    ${_(t,e.hair===`headwrap`?`#3a2a20`:e.hairColor)}
    <path d="M77 101.5 Q80 103.5 83 101.5" stroke="#000" stroke-opacity="0.35" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    ${v(t)}
    ${h(e,n)}
    ${x(e)}`}function C(e,{expression:n=`neutral`,shape:a=`card`,label:o}={}){let s=d[e];if(!s)throw Error(`Unknown character: ${e}`);let c=t(e),l=i(c),u={face:`${c}-face`,frame:`${c}-frame`,hatch:l.hatch},f={dots:`<rect x="110" y="14" width="36" height="30" fill="${l.dots}"/>`,grid:`<rect x="116" y="150" width="30" height="26" fill="${l.grid}"/>`,hatch:`<rect x="14" y="14" width="30" height="24" fill="${l.hatch}"/>`},m=`<defs>${l.defs}
    <clipPath id="${u.face}"><ellipse cx="80" cy="88" rx="25" ry="30"/></clipPath>
    ${a===`circle`?`<clipPath id="${u.frame}"><circle cx="80" cy="92" r="62"/></clipPath>`:`<clipPath id="${u.frame}"><rect x="4" y="4" width="152" height="192" rx="16"/></clipPath>`}</defs>`,h=`<g clip-path="url(#${u.frame})">
      <rect width="160" height="200" class="${s.card}"/>
      ${p[s.backdrop](s.backdropColor??`f-verm`)}
      ${f[s.texture]}
      <g transform="translate(80 200) scale(1.1) translate(-80 -200)">${S(s,n,u)}</g>
    </g>`,g=o??`${s.name}, ${n===`neutral`?`smiling softly`:n}`;return r(a===`circle`?{viewBox:`16 28 128 128`,label:g,className:`ill--avatar`,body:`${m}${h}<circle cx="80" cy="92" r="62" class="card-edge" fill="none"/>`}:{viewBox:`0 0 160 200`,label:g,className:`ill--portrait`,body:`${m}
      <rect x="6" y="7" width="152" height="192" rx="16" class="f-ink"/>
      ${h}
      <rect x="4" y="4" width="152" height="192" rx="16" class="card-edge" fill="none"/>`})}function w(e,{expression:t=`neutral`,x:n=0,y:r=0,scale:i=1,rotate:a=0}={}){return`<g transform="translate(${n} ${r}) rotate(${a} 80 100) scale(${i})">${C(e,{expression:t}).replace(/^<svg[^>]*>/,``).replace(/<\/svg>$/,``).replace(/<title[^>]*>.*?<\/title>/,``)}</g>`}var T=[`idle`,`happy`,`sad`,`cheering`,`thinking`],E=`89 74`;function D(e){let t=e===`sad`?13:20,n=e===`sad`?[-150,-60]:[-160,-20],r=``,i=``;for(let e=0;e<=8;e+=1){let a=n[0]+(n[1]-n[0])*e/8,[o,s]=u(90,38,t-Math.abs(e-4)*1.2,a);r+=`M90 38 L${o} ${s} `,i+=`<circle cx="${o}" cy="${s}" r="2.2" class="f-verm"/>`}return`<path d="${r}" class="s-ink" stroke-width="1.2"/>${i}`}function O(e){return e===`happy`||e===`cheering`?`<path d="M86.5 56 Q90 51.5 93.5 56" class="s-ink" stroke-width="2" stroke-linecap="round"/>`:`<g class="anim-blink"><circle cx="90.5" cy="55.5" r="2.7" class="f-ink"/></g>${e===`sad`?`<path d="M85.5 51.5 L94 54" class="s-ink" stroke-width="1.8" stroke-linecap="round"/>`:``}`}function k(e){return e===`happy`||e===`cheering`?`<path d="M72 51 L47 57 L72 58 Z" class="f-grey"/>
      <path d="M72 61 L52 67 L72 66 Z" class="f-grey"/>
      <path d="M72 58 L58 62 L72 61 Z" class="f-verm-deep"/>`:`<path d="M72 51 L47 60 L72 64 Z" class="f-grey"/>`}function A(e){return`
    <rect x="80" y="62" width="18" height="70" rx="9" class="f-grey-light"/>
    <path d="M76 66 C71 75 71 82 76.5 85 C82 82 82 75 79 66 Z" class="f-verm"/>
    ${k(e)}
    <circle cx="88" cy="56" r="19" class="f-ink"/>
    <circle cx="93" cy="58" r="9.5" class="f-white"/>
    <path d="M85 49 A8 8 0 0 1 101 49 Z" class="f-verm"/>
    ${O(e)}
    ${D(e)}`}function j(e,{mirrored:t=!1,raised:n=!1}={}){return`<g transform="${t?`translate(200 0) scale(-1 1)`:``} ${n?`translate(16 -46)`:``} rotate(${e} 100 140)">
      <path d="M100 140 H148 A48 48 0 0 0 100 92 Z" class="f-ink"/>
      <path d="M100 140 H125 A25 25 0 0 0 100 115 Z" class="f-white"/>
      <path d="M100 140 H112 A12 12 0 0 0 100 128 Z" class="f-verm"/>
    </g>`}var M={idle:{head:0,wing:0,raised:!1,bob:!0},happy:{head:6,wing:-10,raised:!1,bob:!0},sad:{head:-18,wing:12,raised:!1,bob:!1},cheering:{head:8,wing:28,raised:!0,bob:!0},thinking:{head:12,wing:0,raised:!1,bob:!1}};function N(e){return e===`thinking`?`<g class="anim-drift">
      <circle cx="122" cy="34" r="3.5" class="f-white card-edge"/>
      <circle cx="134" cy="20" r="5.5" class="f-white card-edge"/>
      <circle cx="152" cy="6" r="8.5" class="f-white card-edge"/>
    </g>`:e===`cheering`?`<g class="anim-drift">
      <path d="M30 40 L40 22 L48 42 Z" class="f-verm"/>
      <rect x="160" y="28" width="11" height="11" transform="rotate(20 165 33)" class="f-ink"/>
      <circle cx="176" cy="80" r="6" class="s-ink" stroke-width="1.5"/>
      <path d="M10 150 A9 9 0 0 1 28 150 Z" class="f-ink"/>
      <circle cx="150" cy="10" r="3" class="f-verm"/>
    </g>`:e===`sad`?`<path d="M98 66 C96 71 96 74 98.5 75 C101 74 101 71 99 66 Z" class="f-lavender" stroke="#5a5687" stroke-width="0.6"/>`:``}function P({pose:e=`idle`,label:t,animate:n=!0}={}){if(!M[e])throw Error(`Unknown mascot pose: ${e}`);return r({viewBox:`0 0 200 220`,label:t??`The crane mascot, ${e}`,className:`ill--mascot`,body:F({pose:e,animate:n})})}function F({pose:e=`idle`,animate:n=!0,x:r=0,y:a=0,scale:o=1}={}){let s=M[e],c=i(t(`crane`));return`<g transform="translate(${r} ${a}) scale(${o})">
    <defs>${c.defs}</defs>
    <ellipse cx="102" cy="208" rx="48" ry="4.5" class="f-rule" opacity="0.14"/>
    <g class="${n&&s.bob?`anim-bob`:``}">
      <path d="M93 170 L89 206 M109 170 L113 206" class="s-ink" stroke-width="3" stroke-linecap="round"/>
      <path d="M80 206 H97 M105 206 H122" class="s-ink" stroke-width="3" stroke-linecap="round"/>
      <path d="M138 146 L176 176 L134 168 Z" class="f-ink"/>
      <circle cx="100" cy="140" r="48" class="f-grey"/>
      <path d="M52 140 A48 48 0 0 0 100 188 V140 Z" fill="${c.hatch}" opacity="0.55"/>
      ${s.raised?j(s.wing,{mirrored:!0,raised:!0}):``}
      ${j(s.wing,{raised:s.raised})}
      <g transform="rotate(${s.head} ${E})">${A(e)}</g>
    </g>
    ${N(e)}
  </g>`}function I({label:e=`Nakato and Mukasa greet you beside the crane mascot`}={}){let n=i(t(`hero`));return r({viewBox:`0 0 560 420`,label:e,className:`ill--scene`,body:`<defs>${n.defs}</defs>
      <circle cx="70" cy="58" r="9" class="s-rule" stroke-width="1.4"/>
      ${o(522,40)}
      <g>
        <rect x="206" y="52" width="196" height="226" class="f-paper-light"/>
        <rect x="224" y="70" width="44" height="40" fill="${n.hatch}"/>
        <g class="anim-spin"><circle cx="336" cy="122" r="62" class="f-verm"/></g>
        <circle cx="336" cy="122" r="9" class="f-white"/>
        <path d="M206 170 H402" class="s-ink" stroke-width="1"/>
        <path d="M218 268 V184 A84 84 0 0 1 302 268 Z" class="f-ink"/>
        <rect x="312" y="178" width="46" height="14" fill="${n.grid}"/>
      </g>
      ${a(196,42,216,246,12)}
      <path d="M446 150 L459 174 L433 174 Z" class="f-verm anim-drift"/>
      ${w(`nakato`,{x:84,y:82,scale:.86,rotate:-4,expression:`happy`})}
      ${w(`mukasa`,{x:316,y:200,scale:.68,rotate:4})}
      ${l(150,300,`Oli otya?`)}
      <rect x="250" y="306" width="24" height="24" fill="${n.grid}"/>
      ${F({pose:`happy`,x:12,y:238,scale:.72})}
      ${c(476,360,`okuyiga — v. to learn, a little every day`,{anchor:`end`})}
      ${s(436,392,78,{step:6,label:`LESSON Nº 001`})}`})}function L({xp:e=15,label:n}={}){let o=i(t(`done`));return r({viewBox:`0 0 400 360`,label:n??`Lesson complete. The crane cheers. You earned ${e} XP.`,className:`ill--scene`,body:`<defs>${o.defs}</defs>
      ${a(16,16,368,328,14)}
      <path d="M40 300 V200 A100 100 0 0 1 140 300 Z" class="f-ink"/>
      <rect x="306" y="40" width="48" height="40" fill="${o.hatch}"/>
      <rect x="48" y="52" width="40" height="30" fill="${o.dots}"/>
      <g class="anim-spin"><circle cx="210" cy="160" r="104" class="f-verm"/></g>
      <path d="M100 236 H330" class="s-rule" stroke-width="1"/>
      ${F({pose:`cheering`,x:86,y:34,scale:1.12})}
      ${l(140,282,`Weebale nnyo!  +${e} XP`,{size:10})}
      ${c(364,330,`weebale — thank you, well done`,{anchor:`end`})}
      <text class="mono" x="36" y="34" font-size="7">Nº 01 — LESSON COMPLETE</text>`})}function R({days:e=7,label:o}={}){let l=i(t(`streak`)),u=Math.min(e,7),d=``;for(let e=0;e<7;e+=1){let t=110+e*30;d+=e<u?`<circle cx="${t}" cy="318" r="9" class="f-verm"/>`:`<circle cx="${t}" cy="318" r="9" class="s-rule" stroke-width="1.2"/>`}return r({viewBox:`0 0 400 360`,label:o??`A ${e} day streak flame`,className:`ill--scene`,body:`<defs>${l.defs}</defs>
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
      <text class="mono" x="308" y="38" font-size="7" text-anchor="end">STREAK Nº ${n(e)}</text>`})}var z=Object.entries(d).map(([e,t])=>`
    <figure class="gallery__item">
      <div class="gallery__row">
        ${f.map(t=>`<div class="gallery__art">${C(e,{expression:t})}</div>`).join(``)}
      </div>
      <figcaption><strong>${t.name}</strong> <em>${t.role}</em></figcaption>
    </figure>`).join(``),B=Object.keys(d).map(e=>`<div class="gallery__avatar">${C(e,{shape:`circle`})}</div>`).join(``),V=T.map(e=>`
    <figure class="gallery__item gallery__item--small">
      <div class="gallery__art">${P({pose:e})}</div>
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
        <figure class="gallery__item gallery__item--wide"><div class="gallery__art">${I()}</div><figcaption><code>heroScene()</code></figcaption></figure>
        <figure class="gallery__item"><div class="gallery__art">${L({xp:15})}</div><figcaption><code>lessonCompleteScene({ xp })</code></figcaption></figure>
        <figure class="gallery__item"><div class="gallery__art">${R({days:7})}</div><figcaption><code>streakScene({ days })</code></figcaption></figure>
      </div>
    </section>

    <section>
      <h2>Mascot poses</h2>
      <div class="gallery__poses">${V}</div>
    </section>

    <section>
      <h2>Cast and expressions</h2>
      <p class="gallery__note"><code>portrait(id, { expression })</code> with neutral, happy and sad.</p>
      <div class="gallery__cast">${z}</div>
    </section>

    <section>
      <h2>Profile avatars</h2>
      <p class="gallery__note"><code>portrait(id, { shape: 'circle' })</code></p>
      <div class="gallery__avatars">${B}</div>
    </section>
  </main>
`;