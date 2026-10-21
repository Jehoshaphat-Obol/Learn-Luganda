/*
 * Shared SVG building blocks for the Bauhaus illustration set: unique ids,
 * texture patterns, and the editorial furniture (crosshairs, tick rulers,
 * captions) that frames the art.
 */

let counter = 0;

/** A document-unique id prefix so several SVGs can share one page. */
export function uid(name = 'ill') {
  counter += 1;
  return `${name}-${counter}`;
}

export function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Wraps drawing markup in an accessible, responsive <svg>. */
export function svg({ viewBox, label, body, className = '' }) {
  const id = uid('title');
  return `<svg class="ill ${className}" viewBox="${viewBox}" role="img" aria-labelledby="${id}" xmlns="http://www.w3.org/2000/svg"><title id="${id}">${escapeXml(label)}</title>${body}</svg>`;
}

/**
 * Texture patterns. Returns the <defs> markup and the url() for each one.
 * `hatch` is diagonal lines, `dots` a fine dot grid, `grid` a stitched mesh.
 */
export function patterns(prefix) {
  const ids = {
    hatch: `${prefix}-hatch`,
    dots: `${prefix}-dots`,
    grid: `${prefix}-grid`,
  };
  const defs = `
    <pattern id="${ids.hatch}" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="4" height="4" class="f-paper-light"/>
      <line x1="0" y1="0" x2="0" y2="4" class="s-ink" stroke-width="1.1"/>
    </pattern>
    <pattern id="${ids.dots}" width="5" height="5" patternUnits="userSpaceOnUse">
      <circle cx="2.5" cy="2.5" r="0.8" class="f-ink"/>
    </pattern>
    <pattern id="${ids.grid}" width="3" height="3" patternUnits="userSpaceOnUse">
      <rect width="3" height="3" class="f-paper-light"/>
      <rect width="1.6" height="1.6" class="f-grey"/>
    </pattern>`;
  return {
    defs,
    hatch: `url(#${ids.hatch})`,
    dots: `url(#${ids.dots})`,
    grid: `url(#${ids.grid})`,
  };
}

/** Thin L-shaped corner marks around a box, like a print crop frame. */
export function cropMarks(x, y, w, h, size = 10) {
  const s = size;
  return `<g class="s-rule" stroke-width="1">
    <path d="M${x} ${y + s} V${y} H${x + s}"/>
    <path d="M${x + w - s} ${y} H${x + w} V${y + s}"/>
    <path d="M${x} ${y + h - s} V${y + h} H${x + s}"/>
    <path d="M${x + w - s} ${y + h} H${x + w} V${y + h - s}"/>
  </g>`;
}

/** A small plus-shaped registration crosshair. */
export function crosshair(x, y, size = 5) {
  return `<path class="s-rule" stroke-width="0.8" d="M${x - size} ${y} H${x + size} M${x} ${y - size} V${y + size}"/>`;
}

/** A measuring ruler: a baseline with ticks, every fifth one taller. */
export function tickRuler(x, y, width, { step = 6, label = '' } = {}) {
  let ticks = '';
  for (let i = 0, tx = x; tx <= x + width + 0.01; i += 1, tx += step) {
    const h = i % 5 === 0 ? 7 : 4;
    ticks += `M${tx} ${y} V${y - h} `;
  }
  const text = label
    ? `<text class="mono" x="${x + width}" y="${y + 11}" font-size="6.5" text-anchor="end">${escapeXml(label)}</text>`
    : '';
  return `<g><path class="s-rule" stroke-width="0.8" d="M${x} ${y} H${x + width} ${ticks}"/>${text}</g>`;
}

/** An italic serif caption, e.g. "okusoma — v. to read, to learn". */
export function caption(x, y, text, { size = 9, anchor = 'start' } = {}) {
  return `<text class="caption" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${escapeXml(text)}</text>`;
}

/** A pill label with a vermillion dot, like the "Welcome back" chip. */
export function pill(x, y, text, { width, size = 9 } = {}) {
  const w = width ?? text.length * size * 0.56 + 30;
  const h = size * 2.4;
  return `<g transform="translate(${x} ${y})">
    <rect x="1.5" y="2" width="${w}" height="${h}" rx="${h / 2}" class="f-ink"/>
    <rect width="${w}" height="${h}" rx="${h / 2}" class="f-white card-edge"/>
    <circle cx="${h / 2 + 2}" cy="${h / 2}" r="${size * 0.28}" class="f-verm"/>
    <text class="label" x="${h / 2 + 2 + size * 0.9}" y="${h / 2 + size * 0.35}" font-size="${size}">${escapeXml(text)}</text>
  </g>`;
}

/** A rotated point around (cx, cy), used to fan out crests and confetti. */
export function polar(cx, cy, r, degrees) {
  const a = (degrees * Math.PI) / 180;
  return [+(cx + r * Math.cos(a)).toFixed(2), +(cy + r * Math.sin(a)).toFixed(2)];
}
