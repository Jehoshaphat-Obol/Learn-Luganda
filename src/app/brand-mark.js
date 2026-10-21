/*
 * The brand mark: the crane mascot's head reduced to a few bold shapes so it
 * fills its tile and still reads at 16px. A big ink head with the white
 * cheek, a red cap and wattle, a grey beak and a five-ray crown. Colours are
 * literal so the mark doesn't depend on the illustration stylesheet;
 * public/favicon.svg and the PNG app icons are drawn from the same shapes.
 *
 * Inside the app the mark has moods (see brand-mood.js). The installed app's
 * home-screen icon comes from the manifest and always shows the idle crane.
 */
import { polar } from '../illustrations/core.js';

const INK = '#1c1a18';
const GREY = '#8a857c';
const GREY_LIGHT = '#b9b3a8';
const VERM = '#e34234';
const WHITE = '#fbfaf8';
const PAPER = '#ebe8e2';

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

function extras(mood) {
  if (mood === 'celebrating') {
    return `<path d="M8 30 L16 12 L24 30 Z" fill="${VERM}"/>
      <rect x="84" y="84" width="11" height="11" transform="rotate(20 89.5 89.5)" fill="${INK}"/>
      <circle cx="12" cy="88" r="5" fill="${VERM}"/>`;
  }
  if (mood === 'sleepy') {
    return `<path d="M10 8 H24 L10 22 H24" stroke="${INK}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  }
  return '';
}

/** The crane head shapes in a 100x100 box. */
export function brandMarkShapes(mood = 'idle') {
  return `${crown()}
    <rect x="50" y="70" width="22" height="60" rx="11" fill="${GREY_LIGHT}"/>
    <path d="M45 74 C38 84 38 94 45 98 C52 94 52 84 49 74 Z" fill="${VERM}"/>
    <path d="M36 48 L3 66 L38 72 Z" fill="${GREY}"/>
    <circle cx="58" cy="58" r="29" fill="${INK}"/>
    <circle cx="65" cy="61" r="14.5" fill="${WHITE}"/>
    <path d="M52 44 A13 13 0 0 1 78 44 Z" fill="${VERM}"/>
    ${eye(mood)}
    ${extras(mood)}`;
}

/** The brand mark as an inline, decorative SVG. */
export function brandMark(mood = 'idle') {
  return `<svg class="brand-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${brandMarkShapes(mood)}</svg>`;
}

/** The favicon: the mark on a rounded paper tile, as a standalone SVG. */
export function faviconSvg(mood = 'idle') {
  const shapes = brandMarkShapes(mood).replace(/\n\s*/g, '');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n  <rect width="100" height="100" rx="22" fill="${PAPER}"/>\n  ${shapes}\n</svg>\n`;
}
