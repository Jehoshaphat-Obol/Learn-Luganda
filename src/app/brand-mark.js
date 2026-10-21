/*
 * The brand mark: the crane mascot's head, cropped and simplified so it
 * still reads at 30px. Same geometry as src/illustrations/mascot.js, with a
 * heavier crown so the fan survives small sizes. Colours are literal so the
 * mark doesn't depend on the illustration stylesheet; public/favicon.svg and
 * the PNG app icons are drawn from the same shapes.
 */
import { polar } from '../illustrations/core.js';

const INK = '#1c1a18';
const GREY = '#8a857c';
const GREY_LIGHT = '#b9b3a8';
const VERM = '#e34234';
const WHITE = '#fbfaf8';

function crown() {
  const steps = 6;
  let lines = '';
  let dots = '';
  for (let i = 0; i <= steps; i += 1) {
    const angle = -160 + (140 * i) / steps;
    const r = 22 - Math.abs(i - steps / 2) * 1.6;
    const [x, y] = polar(90, 40, r, angle);
    lines += `M90 40 L${x} ${y} `;
    dots += `<circle cx="${x}" cy="${y}" r="3.4" fill="${VERM}"/>`;
  }
  return `<path d="${lines}" stroke="${INK}" stroke-width="2.6" stroke-linecap="round" fill="none"/>${dots}`;
}

/** The crane head shapes in a 78x78 box starting at (38, 10). */
export function brandMarkShapes() {
  return `${crown()}
    <rect x="80" y="62" width="18" height="200" rx="9" fill="${GREY_LIGHT}"/>
    <path d="M76 66 C71 75 71 82 76.5 85 C82 82 82 75 79 66 Z" fill="${VERM}"/>
    <path d="M72 50 L42 60 L72 65 Z" fill="${GREY}"/>
    <circle cx="88" cy="56" r="19" fill="${INK}"/>
    <circle cx="93" cy="58" r="9.5" fill="${WHITE}"/>
    <path d="M84 48 A9 9 0 0 1 102 48 Z" fill="${VERM}"/>
    <circle cx="90.5" cy="55.5" r="3" fill="${INK}"/>`;
}

/** The brand mark as an inline, decorative SVG. */
export function brandMark() {
  return `<svg class="brand-mark" viewBox="38 10 78 78" aria-hidden="true" focusable="false">${brandMarkShapes()}</svg>`;
}
