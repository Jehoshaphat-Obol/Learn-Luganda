/*
 * The brand mark: the crane mascot's head reduced to a few bold shapes so it
 * fills its tile and still reads at 16px. A big ink head with the white
 * cheek, a red cap and wattle, a grey beak and a five-ray crown. Colours are
 * literal so the mark doesn't depend on the illustration stylesheet;
 * public/favicon.svg and the PNG app icons are drawn from the same shapes.
 *
 * Inside the app the mark has moods (see brand-mood.js) and a scene (see
 * brand-scene.js): a sky for the time of day and the weather in the top
 * corner, and a holiday prop in the bottom corner. The installed app's
 * home-screen icon comes from the manifest and always shows the idle crane.
 */
import { polar } from '../illustrations/core.js';

const INK = '#1c1a18';
const GREY = '#8a857c';
const GREY_LIGHT = '#b9b3a8';
const VERM = '#e34234';
const WHITE = '#fbfaf8';
const PAPER = '#ebe8e2';
const AMBER = '#f2b134';
const BLUE = '#3d6fb6';
const GREEN = '#2f7d4a';
const PURPLE = '#7b4fa0';
const CLOUD = '#d6d1c7';

// The favicon tile takes on the sky's colour.
const TILES = { dawn: '#f6dcc6', day: PAPER, dusk: '#efc0a6', night: '#c3c8d6' };

export const MOODS = ['idle', 'happy', 'sleepy', 'celebrating'];

function crown() {
  const rays = [-150, -118, -90, -62, -30];
  let lines = '';
  let dots = '';
  for (const angle of rays) {
    const r = angle === -90 ? 25 : Math.abs(angle) > 100 || Math.abs(angle) < 80 ? 22 : 24;
    const [x, y] = polar(60, 32, r, angle);
    lines += `M60 32 L${x} ${y} `;
    dots += `<circle cx="${x}" cy="${y}" r="5.5" fill="${VERM}"/>`;
  }
  return `<path d="${lines}" stroke="${INK}" stroke-width="5" stroke-linecap="round" fill="none"/>${dots}`;
}

function eye(mood) {
  if (mood === 'happy' || mood === 'celebrating') {
    return `<path d="M55 61 Q62 51 69 61" stroke="${INK}" stroke-width="4.6" stroke-linecap="round" fill="none"/>`;
  }
  if (mood === 'sleepy') {
    return `<path d="M55 58 Q62 64 69 58" stroke="${INK}" stroke-width="4.2" stroke-linecap="round" fill="none"/>`;
  }
  return `<circle cx="62" cy="58" r="4.6" fill="${INK}"/>`;
}

function extras(mood, holiday) {
  if (mood === 'celebrating') {
    // The bottom-right confetti gives way to a holiday prop.
    const square = holiday ? '' : `<rect x="84" y="84" width="11" height="11" transform="rotate(20 89.5 89.5)" fill="${INK}"/>`;
    return `<path d="M86 19 L92 4 L98 19 Z" fill="${VERM}"/>
      ${square}
      <circle cx="12" cy="88" r="5" fill="${VERM}"/>`;
  }
  if (mood === 'sleepy') {
    return `<path d="M86 5 H97 L86 16 H97" stroke="${INK}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  }
  return '';
}

// The sky sits in the top-left corner, above the beak.
function sky(phase) {
  if (phase === 'day') return `<circle cx="19" cy="20" r="14" fill="${AMBER}"/>`;
  if (phase === 'dawn' || phase === 'dusk') {
    const sun = phase === 'dawn' ? AMBER : VERM;
    return `<path d="M4 25 A15 15 0 0 1 34 25 Z" fill="${sun}"/>
      <path d="M6 31 H32 M11 37 H27" stroke="${sun}" stroke-width="3.2" stroke-linecap="round"/>`;
  }
  if (phase === 'night') {
    return `<path d="M21 5 A15 15 0 1 0 21 35 A6 15 0 0 1 21 5 Z" fill="${INK}"/>
      <circle cx="33" cy="8" r="2.4" fill="${AMBER}"/><circle cx="31" cy="38" r="2" fill="${AMBER}"/>`;
  }
  return '';
}

function weatherShapes(weather) {
  if (!weather || weather === 'clear') return '';
  if (weather === 'fog') {
    return `<path d="M4 23 H30 M8 29 H34 M4 35 H28" stroke="${GREY}" stroke-width="3.4" stroke-linecap="round"/>`;
  }
  const cloud = `<g fill="${CLOUD}"><circle cx="13" cy="28" r="6.5"/><circle cx="21" cy="23" r="8.5"/><circle cx="29" cy="28" r="6"/><rect x="6.5" y="27" width="29" height="8" rx="4"/></g>`;
  if (weather === 'rain') {
    return `${cloud}<path d="M14 39 L12 45 M21 39 L19 45 M28 39 L26 45" stroke="${BLUE}" stroke-width="2.8" stroke-linecap="round"/>`;
  }
  if (weather === 'snow') {
    return `${cloud}<g fill="${GREY}"><circle cx="13" cy="41" r="2.2"/><circle cx="21" cy="45" r="2.2"/><circle cx="29" cy="41" r="2.2"/></g>`;
  }
  if (weather === 'storm') {
    return `${cloud}<path d="M23 35 L18 42 H23 L19 50" stroke="${VERM}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  }
  return cloud;
}

function star(cx, cy, outer, inner) {
  let d = '';
  for (let i = 0; i < 10; i += 1) {
    const [x, y] = polar(cx, cy, i % 2 ? inner : outer, -90 + i * 36);
    d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return `${d}Z`;
}

// Holiday props sit in the bottom-right corner, beside the neck.
function holidayShapes(holiday) {
  switch (holiday) {
    case 'christmas':
      return `<path d="M87 75 L79 87 H95 Z M87 80 L76 95 H98 Z" fill="${GREEN}"/>
        <rect x="85" y="95" width="4" height="3.5" fill="${INK}"/><circle cx="87" cy="75" r="2.8" fill="${AMBER}"/>`;
    case 'newYear': {
      let rays = '';
      for (let i = 0; i < 8; i += 1) {
        const [x1, y1] = polar(87, 87, 4.5, i * 45);
        const [x2, y2] = polar(87, 87, 11, i * 45);
        rays += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${i % 2 ? AMBER : VERM}" stroke-width="3" stroke-linecap="round"/>`;
      }
      return `${rays}<circle cx="87" cy="87" r="2.5" fill="${INK}"/>`;
    }
    case 'valentine':
      return `<path d="M87 97 C73 88 76 76 82.5 77 C85.5 77.5 87 80 87 82 C87 80 88.5 77.5 91.5 77 C98 76 101 88 87 97 Z" fill="${VERM}"/>`;
    case 'womensDay': {
      let petals = '';
      for (let i = 0; i < 5; i += 1) {
        const [x, y] = polar(87, 87, 6, -90 + i * 72);
        petals += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.6" fill="${PURPLE}"/>`;
      }
      return `${petals}<circle cx="87" cy="87" r="3.4" fill="${AMBER}"/>`;
    }
    case 'easter':
      return `<ellipse cx="87" cy="87" rx="8.5" ry="11" fill="${AMBER}"/>
        <path d="M78.8 86 L82 83 L85 86 L88 83 L91 86 L94 83 L95.3 85" stroke="${VERM}" stroke-width="2.4" stroke-linejoin="round" fill="none"/>`;
    case 'martyrsDay':
      return `<rect x="83" y="84" width="8" height="14" rx="1.5" fill="${WHITE}" stroke="${INK}" stroke-width="2"/>
        <path d="M87 72 C90.5 76 90.5 80 87 81.5 C83.5 80 83.5 76 87 72 Z" fill="${AMBER}"/>`;
    case 'heroesDay':
      return `<path d="${star(87, 87, 11, 4.6)}" fill="${AMBER}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>`;
    case 'independence':
      // Uganda's flag: black, yellow and red stripes with the white badge.
      return `<g><rect x="76" y="78" width="22" height="3" fill="${INK}"/><rect x="76" y="81" width="22" height="3" fill="#fcdc04"/>
        <rect x="76" y="84" width="22" height="3" fill="#d90000"/><rect x="76" y="87" width="22" height="3" fill="${INK}"/>
        <rect x="76" y="90" width="22" height="3" fill="#fcdc04"/><rect x="76" y="93" width="22" height="3" fill="#d90000"/>
        <circle cx="87" cy="87" r="4.2" fill="${WHITE}"/></g>`;
    default:
      return '';
  }
}

/**
 * The crane head shapes in a 100x100 box.
 * @param {string} mood
 * @param {{ phase?: string, weather?: string|null, holiday?: string|null }} [scene]
 */
export function brandMarkShapes(mood = 'idle', { phase, weather, holiday } = {}) {
  return `${sky(phase)}
    ${weatherShapes(weather)}
    ${crown()}
    <rect x="50" y="70" width="22" height="60" rx="11" fill="${GREY_LIGHT}"/>
    <path d="M45 74 C38 84 38 94 45 98 C52 94 52 84 49 74 Z" fill="${VERM}"/>
    <path d="M36 48 L3 66 L38 72 Z" fill="${GREY}"/>
    <circle cx="58" cy="58" r="29" fill="${INK}"/>
    <circle cx="65" cy="61" r="14.5" fill="${WHITE}"/>
    <path d="M52 44 A13 13 0 0 1 78 44 Z" fill="${VERM}"/>
    ${eye(mood)}
    ${extras(mood, holiday)}
    ${holidayShapes(holiday)}`.replace(/^\s*\n/gm, '').trimStart();
}

/** The brand mark as an inline, decorative SVG. */
export function brandMark(mood = 'idle', scene = {}) {
  return `<svg class="brand-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${brandMarkShapes(mood, scene)}</svg>`;
}

/** The favicon: the mark on a rounded tile coloured like the sky, as a standalone SVG. */
export function faviconSvg(mood = 'idle', scene = {}) {
  const shapes = brandMarkShapes(mood, scene).replace(/\n\s*/g, '');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n  <rect width="100" height="100" rx="22" fill="${TILES[scene.phase] ?? PAPER}"/>\n  ${shapes}\n</svg>\n`;
}
