/*
 * Places: everyday settings drawn on a 400 × 264 panel with the same
 * editorial furniture as the other scenes. A place can host up to two
 * cast members and the crane, so dialogues and celebrations can happen
 * somewhere. The word under each place is the Luganda default; course
 * packs pass their own `caption`.
 */
import { svg, uid, patterns, cropMarks, caption as captionText, escapeXml } from './core.js';
import { portraitGroup } from './characters.js';
import { mascotGroup } from './mascot.js';
import { propGroup } from './props.js';
import { delay } from './random.js';
import { flag } from './flags.js';

const GROUND = 200;

/* A blue and white checker for the taxi band, the one place it is needed. */
function checker(id) {
  return `<pattern id="${id}" width="8" height="8" patternUnits="userSpaceOnUse">
    <rect width="8" height="8" class="f-white"/><rect width="4" height="4" class="f-blue"/><rect x="4" y="4" width="4" height="4" class="f-blue"/>
  </pattern>`;
}

function taxi(x, y, fill, d) {
  return `<g transform="translate(${x} ${y})">
    <g class="anim-steam" ${d}><circle cx="-6" cy="44" r="5" class="f-grey-light"/><circle cx="-14" cy="38" r="3.5" class="f-grey-light"/></g>
    <g class="anim-idle" ${d}>
      <path d="M0 50 V14 Q0 4 10 4 H96 Q106 4 112 14 L124 34 V50 Z" class="f-white card-edge"/>
      <rect x="0" y="34" width="124" height="8" fill="${fill}"/>
      <path d="M8 12 H90 V28 H8 Z" class="f-ink"/>
      <path d="M96 12 H106 L116 28 H96 Z" class="f-ink"/>
      <path d="M30 12 V28 M52 12 V28 M74 12 V28" class="s-white" stroke-width="2"/>
      <rect x="118" y="38" width="6" height="5" class="f-yellow"/>
    </g>
    <circle cx="26" cy="52" r="10" class="f-ink"/><circle cx="26" cy="52" r="4" class="f-grey-light"/>
    <circle cx="98" cy="52" r="10" class="f-ink"/><circle cx="98" cy="52" r="4" class="f-grey-light"/>
  </g>`;
}

function hut(x, y, s, t, d) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <g class="anim-steam" ${d}><circle cx="58" cy="-8" r="6" class="f-grey-light"/><circle cx="66" cy="-22" r="4.5" class="f-grey-light"/><circle cx="60" cy="-34" r="3" class="f-grey-light"/></g>
    <rect x="6" y="40" width="88" height="60" class="f-paper"/>
    <rect x="6" y="40" width="88" height="60" class="card-edge" fill="none"/>
    <path d="M38 100 V74 A12 12 0 0 1 62 74 V100 Z" class="f-ink"/>
    <path d="M-6 44 L50 0 L106 44 Z" fill="${t.hatch}"/>
    <path d="M-6 44 L50 0 L106 44 Z" class="card-edge" fill="none"/>
  </g>`;
}

function bananaPlant(x, y, s, d) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-4" y="0" width="8" height="70" class="f-grey"/>
    <g class="anim-sway-base" ${d}>
      <path d="M0 4 C-20 -20 -50 -16 -62 4 C-40 -4 -20 0 0 8 Z" class="f-sage card-edge"/>
      <path d="M0 4 C20 -26 50 -24 62 -6 C40 -10 20 -4 0 8 Z" class="f-sage card-edge"/>
      <path d="M0 2 C-6 -26 2 -46 14 -54 C10 -34 6 -16 2 4 Z" class="f-sage card-edge"/>
    </g>
  </g>`;
}

const PLACES = {
  market: {
    name: 'The market',
    word: 'akatale — n. market',
    draw: (t) => `
      <path d="M16 34 Q200 64 384 34" class="s-ink" stroke-width="1"/>
      ${Array.from({ length: 11 }, (_, i) => {
        const x = 36 + i * 32;
        const y = 34 + Math.sin((i / 10) * Math.PI) * 15;
        return `<g class="anim-sway" ${delay(3)}><path d="M${x - 8} ${y} H${x + 8} L${x} ${y + 14} Z" class="${['f-verm', 'f-ink', 'f-yellow'][i % 3]}"/></g>`;
      }).join('')}
      <g>
        ${Array.from({ length: 10 }, (_, i) => `<rect x="${40 + i * 15}" y="70" width="15" height="24" class="${i % 2 ? 'f-white' : 'f-verm'}"/>`).join('')}
        ${Array.from({ length: 10 }, (_, i) => `<path d="M${40 + i * 15} 94 A7.5 7.5 0 0 0 ${55 + i * 15} 94 Z" class="${i % 2 ? 'f-white' : 'f-verm'}"/>`).join('')}
        <path d="M40 70 H190 V94 H40 Z" class="card-edge" fill="none"/>
        <path d="M46 94 V${GROUND} M184 94 V${GROUND}" class="s-ink" stroke-width="3"/>
        <rect x="36" y="150" width="158" height="10" class="f-ink"/>
        <rect x="44" y="160" width="142" height="${GROUND - 160}" fill="${t.hatch}"/>
        ${[[70, 142], [84, 142], [98, 142], [77, 130], [91, 130], [84, 118]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="7" class="f-verm card-edge"/>`).join('')}
        ${propGroup('matooke', { x: 122, y: 92, scale: 0.85 })}
      </g>
      <g>
        ${Array.from({ length: 9 }, (_, i) => `<rect x="${226 + i * 15}" y="82" width="15" height="20" class="${i % 2 ? 'f-yellow' : 'f-ink'}"/>`).join('')}
        <path d="M232 102 V${GROUND} M354 102 V${GROUND}" class="s-ink" stroke-width="3"/>
        <rect x="222" y="156" width="140" height="10" class="f-ink"/>
        ${propGroup('basket', { x: 238, y: 104, scale: 0.75 })}
        ${propGroup('pot', { x: 296, y: 108, scale: 0.7 })}
      </g>`,
  },
  taxipark: {
    name: 'The taxi park',
    word: 'ppaaka — n. taxi park',
    draw: (t, ids) => `
      <defs>${checker(ids.checker)}</defs>
      <g class="f-grey-light">
        <rect x="30" y="60" width="50" height="${GROUND - 60}"/><rect x="88" y="84" width="40" height="${GROUND - 84}"/>
        <rect x="250" y="50" width="60" height="${GROUND - 50}"/><rect x="318" y="76" width="44" height="${GROUND - 76}"/>
      </g>
      <rect x="36" y="70" width="38" height="80" fill="${t.dots}" opacity="0.5"/>
      <rect x="258" y="60" width="44" height="90" fill="${t.dots}" opacity="0.5"/>
      <g class="anim-drift" ${delay(9)}><rect x="140" y="40" width="70" height="16" rx="8" class="f-white card-edge"/></g>
      <path d="M352 ${GROUND} V96" class="s-ink" stroke-width="3"/>
      <rect x="318" y="80" width="68" height="22" class="f-verm"/>
      <text class="mono" x="352" y="94.5" font-size="8" text-anchor="middle" fill="#fbfaf8" style="fill:#fbfaf8">PPAAKA</text>
      ${taxi(150, 126, `url(#${ids.checker})`, delay(2))}
      ${taxi(24, 136, `url(#${ids.checker})`, delay(2))}`,
  },
  lake: {
    name: 'The lake',
    word: 'ennyanja — n. lake',
    draw: () => `
      <path d="M220 120 A64 64 0 0 1 348 120 Z" class="f-verm"/>
      <path d="M252 120 A32 32 0 0 1 316 120 Z" class="f-yellow"/>
      <g class="anim-drift" ${delay(9)}><path d="M80 50 l8 6 l8 -6 M104 40 l6 4 l6 -4" class="s-ink" stroke-width="1.6"/></g>
      <rect x="16" y="120" width="368" height="${GROUND - 120 + 36}" class="f-sky"/>
      ${[134, 152, 170, 188].map((y, i) => `<g class="anim-ripple" ${delay(6)}><path d="M${30 + (i % 2) * 20} ${y} q12 -6 24 0 t24 0 M${200 + (i % 2) * 30} ${y} q12 -6 24 0 t24 0" class="s-white" stroke-width="2.4"/></g>`).join('')}
      <g class="anim-bob" ${delay(3)}>
        <path d="M60 150 H190 Q170 172 128 172 H96 Q72 172 60 150 Z" class="f-ink"/>
        <path d="M150 150 L176 96" class="s-ink-soft" stroke-width="2.4"/>
        <path d="M176 96 Q196 120 186 150" class="s-ink-soft" stroke-width="0.8" stroke-dasharray="3 3"/>
      </g>
      <g class="anim-hop" ${delay(3)}><path d="M250 166 C262 156 278 156 286 166 C278 176 262 176 250 166 Z M286 166 L296 158 V174 Z" class="f-verm"/><circle cx="260" cy="164" r="1.6" class="f-ink"/></g>
      ${[340, 352, 364].map((x, i) => `<g class="anim-sway-base" ${delay(4)}><path d="M${x} ${GROUND + 30} V${100 + i * 10}" class="s-ink" stroke-width="2"/><path d="M${x} ${100 + i * 10} l-10 -14 M${x} ${100 + i * 10} l0 -16 M${x} ${100 + i * 10} l10 -14" class="s-ink" stroke-width="1.4"/></g>`).join('')}`,
  },
  school: {
    name: 'The school',
    word: 'essomero — n. school',
    draw: (t) => `
      <path d="M140 84 L250 34 L360 84 Z" class="f-ink-soft"/>
      <rect x="150" y="84" width="200" height="${GROUND - 84}" class="f-cream"/>
      <rect x="150" y="84" width="200" height="${GROUND - 84}" class="card-edge" fill="none"/>
      <path d="M232 ${GROUND} V150 A18 18 0 0 1 268 150 V${GROUND} Z" class="f-verm"/>
      ${[164, 300].map((x) => `<rect x="${x}" y="110" width="36" height="30" fill="${t.hatch}"/><rect x="${x}" y="110" width="36" height="30" class="card-edge" fill="none"/>`).join('')}
      <circle cx="250" cy="66" r="13" class="f-white card-edge"/>
      <g class="anim-spin" style="animation-duration: 12s"><path d="M250 66 V56" class="s-ink" stroke-width="1.8" stroke-linecap="round"/></g>
      <path d="M250 66 H257" class="s-ink" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M82 ${GROUND} V34" class="s-ink" stroke-width="3"/>
      <circle cx="82" cy="32" r="3.5" class="f-yellow"/>
      <g class="anim-flag" ${delay(2)}>
        ${flag(undefined, { x: 84, y: 38, width: 54 })}
      </g>
      ${propGroup('book', { x: 30, y: 150, scale: 0.7 })}`,
  },
  village: {
    name: 'The village',
    word: 'ekyalo — n. village',
    draw: (t) => `
      <circle cx="300" cy="58" r="22" class="f-verm"/>
      <path d="M16 ${GROUND - 40} Q110 90 210 ${GROUND - 40} Q300 110 384 ${GROUND - 50} V${GROUND} H16 Z" class="f-sage"/>
      <g class="anim-drift" ${delay(9)}><rect x="60" y="44" width="80" height="16" rx="8" class="f-white card-edge"/></g>
      ${hut(150, 96, 1, t, delay(2))}
      ${hut(286, 126, 0.7, t, delay(2))}
      ${bananaPlant(70, 130, 1, delay(4))}
      ${bananaPlant(350, 146, 0.7, delay(4))}
      <g transform="translate(266 ${GROUND - 14})"><g class="anim-peck" ${delay(2)}>
        <circle cx="0" cy="0" r="10" class="f-white card-edge"/>
        <circle cx="-9" cy="-8" r="5" class="f-white card-edge"/>
        <path d="M-12 -14 l3 -4 l3 4" class="f-verm"/>
        <path d="M-14 -8 l-5 2 l5 2 Z" class="f-yellow"/>
      </g></g>`,
  },
  kitchen: {
    name: 'The kitchen',
    word: 'effumbiro — n. kitchen',
    draw: (t) => `
      <rect x="16" y="120" width="368" height="22" fill="${t.grid}"/>
      <rect x="40" y="36" width="90" height="70" class="f-sky card-edge"/>
      <circle cx="98" cy="64" r="16" class="f-verm"/>
      <path d="M85 36 V106 M40 71 H130" class="s-ink" stroke-width="3"/>
      <path d="M200 76 H364" class="s-ink" stroke-width="3"/>
      ${[[210, 'f-verm'], [236, 'f-yellow'], [262, 'f-blue'], [288, 'f-verm']].map(([x, c], i) => `<rect x="${x}" y="${52 + (i % 2) * 6}" width="18" height="${24 - (i % 2) * 6}" class="f-white card-edge"/><rect x="${x}" y="${50 + (i % 2) * 6}" width="18" height="5" class="${c}"/>`).join('')}
      <path d="M322 52 L330 76 H344 L352 52 Z" class="f-ink"/>
      <g class="anim-sway" ${delay(3)}><path d="M170 16 V40" class="s-ink" stroke-width="1.2"/>${propGroup('basket', { x: 150, y: 30, scale: 0.6 })}</g>
      <path d="M40 ${GROUND} L52 172 H88 L100 ${GROUND} Z" class="f-ink"/>
      <path d="M46 150 H94 L86 172 H54 Z" class="f-ink-soft"/>
      <g class="anim-pulse" ${delay(1)}><rect x="56" y="156" width="28" height="8" class="f-verm"/></g>
      ${propGroup('pot', { x: 46, y: 92, scale: 0.75 })}
      <rect x="250" y="160" width="120" height="8" class="f-ink"/>
      <path d="M260 168 V${GROUND} M360 168 V${GROUND}" class="s-ink" stroke-width="3"/>
      ${propGroup('tea', { x: 254, y: 128, scale: 0.5 })}
      ${propGroup('matooke', { x: 300, y: 108, scale: 0.75 })}`,
  },
};

export const PLACE_IDS = Object.keys(PLACES);

/** Name and default caption for a place. */
export function placeInfo(id) {
  const p = PLACES[id];
  return p && { name: p.name, word: p.word };
}

/* Where the cast and the crane stand, left to right. */
const STAGE = [
  { x: 26, y: 128 },
  { x: 306, y: 128 },
];

/**
 * Draws a place, optionally with cast members and the crane in front.
 * @param {string} id one of PLACE_IDS
 * @param {{ cast?: string[], expression?: string, pose?: string, caption?: string, label?: string, number?: number }} [options]
 */
export function placeScene(id, { cast = [], expression = 'happy', pose, caption, label, number } = {}) {
  const place = PLACES[id];
  if (!place) throw new Error(`Unknown place: ${id}`);
  const p = uid(`place-${id}`);
  const tex = patterns(p);
  const ids = { checker: `${p}-checker` };
  const people = cast
    .slice(0, 2)
    .map((who, i) => portraitGroup(who, { expression, x: STAGE[i].x, y: STAGE[i].y, scale: 0.44, rotate: i ? 4 : -4 }))
    .join('');
  const crane = pose ? mascotGroup({ pose, x: cast.length ? 150 : 140, y: 120, scale: 0.46 }) : '';
  const no = String(number ?? PLACE_IDS.indexOf(id) + 1).padStart(2, '0');
  return svg({
    viewBox: '0 0 400 264',
    label: label ?? place.name,
    className: 'ill--scene ill--place',
    body: `<defs>${tex.defs}</defs>
      <rect x="16" y="16" width="368" height="220" class="f-paper-light"/>
      <g>${place.draw(tex, ids)}</g>
      <path d="M16 ${GROUND} H384" class="s-ink" stroke-width="1"/>
      <rect x="16" y="${GROUND}" width="368" height="36" fill="${tex.dots}" opacity="0.35"/>
      ${cropMarks(8, 8, 384, 236, 12)}
      ${crane}
      ${people}
      <text class="mono" x="20" y="10" font-size="7">PLACE Nº ${no} — ${escapeXml(place.name.toUpperCase())}</text>
      ${captionText(384, 258, caption ?? place.word, { anchor: 'end' })}`,
  });
}
