/*
 * National flags, kept simple but true to the real ones: the right colours
 * in the right order and proportion, with emblems reduced to a shape or two.
 * Flags use their official colours rather than the theme, so they stay
 * recognisable.
 *
 * Which flag the art shows is data, not drawing: the country of the
 * language being learned (`country` in src/packs/languages.json), else the
 * learner's guessed home country, else a plain pennant that is no nation's
 * flag. The app sets it with `setFlagCountry()` when a course loads.
 */
import { uid, polar } from './core.js';

/** A five-pointed star centred on (cx, cy), point up. */
function star(cx, cy, r, fill) {
  const pts = [];
  for (let i = 0; i < 10; i += 1) pts.push(polar(cx, cy, i % 2 ? r * 0.4 : r, -90 + i * 36).join(','));
  return `<polygon points="${pts.join(' ')}" fill="${fill}"/>`;
}

const bands = (colors, { vertical = false, w = 30, h = 20 } = {}) =>
  colors
    .map((c, i) => {
      const n = colors.length;
      return vertical
        ? `<rect x="${(w / n) * i}" width="${w / n + 0.05}" height="${h}" fill="${c}"/>`
        : `<rect y="${(h / n) * i}" width="${w}" height="${h / n + 0.05}" fill="${c}"/>`;
    })
    .join('');

/*
 * Each flag: `ratio` is width / height, `draw` returns markup in a
 * `0 0 30 (30/ratio)` box. `id` is a unique prefix for any clip paths.
 */
export const FLAGS = {
  UG: {
    name: 'Uganda',
    ratio: 3 / 2,
    draw: () => `${bands(['#000', '#fcdc04', '#d90000', '#000', '#fcdc04', '#d90000'])}
      <circle cx="15" cy="10" r="4.6" fill="#fff"/>
      <path d="M15.6 12.6 V14.2 M16.6 12.6 V14.2" stroke="#000" stroke-width="0.3"/>
      <path d="M13.4 11.6 Q14 9.6 16 9.8 Q18.2 10.2 17.6 12.4 Q16 13.2 13.4 11.6 Z" fill="#9ca3a8"/>
      <path d="M14.4 10 Q14 8.4 14.6 7" stroke="#9ca3a8" stroke-width="0.7" fill="none"/>
      <circle cx="14.8" cy="7" r="0.85" fill="#000"/>
      <path d="M14 7.1 L12.9 7.6 L14.1 7.5 Z" fill="#000"/>
      <circle cx="15" cy="7.4" r="0.32" fill="#d90000"/>
      <path d="M14.8 6.2 l-0.7 -1.1 M15 6.2 l0 -1.3 M15.2 6.2 l0.7 -1.1" stroke="#fcdc04" stroke-width="0.3"/>`,
  },
  KE: {
    name: 'Kenya',
    ratio: 3 / 2,
    draw: () => `<rect width="30" height="20" fill="#fff"/>
      <rect width="30" height="6" fill="#000"/><rect y="7" width="30" height="6" fill="#bb0000"/><rect y="14" width="30" height="6" fill="#006600"/>
      <path d="M11.5 16 L18.5 4 M18.5 16 L11.5 4" stroke="#fff" stroke-width="0.6"/>
      <ellipse cx="15" cy="10" rx="2.8" ry="6" fill="#000"/>
      <path d="M15 4 Q17.8 10 15 16 Q12.2 10 15 4 Z" fill="#bb0000"/>
      <ellipse cx="15" cy="10" rx="0.9" ry="1.6" fill="#fff"/>`,
  },
  TZ: {
    name: 'Tanzania',
    ratio: 3 / 2,
    draw: () => `<rect width="30" height="20" fill="#00a3dd"/>
      <path d="M0 0 H30 L0 20 Z" fill="#1eb53a"/>
      <path d="M0 20 L30 0" stroke="#fcd116" stroke-width="7"/>
      <path d="M0 20 L30 0" stroke="#000" stroke-width="4.6"/>`,
  },
  RW: {
    name: 'Rwanda',
    ratio: 3 / 2,
    draw: () => `<rect width="30" height="10" fill="#00a1de"/><rect y="10" width="30" height="5" fill="#fad201"/><rect y="15" width="30" height="5" fill="#20603d"/>
      <circle cx="24.5" cy="5" r="3.2" fill="none" stroke="#e5be01" stroke-width="1.4" stroke-dasharray="0.7 0.6"/>
      <circle cx="24.5" cy="5" r="1.6" fill="#e5be01" stroke="#00a1de" stroke-width="0.3"/>`,
  },
  BI: {
    name: 'Burundi',
    ratio: 5 / 3,
    draw: () => `<rect width="30" height="18" fill="#1eb53a"/>
      <path d="M0 0 H30 L15 9 Z M0 18 H30 L15 9 Z" fill="#ce1126"/>
      <path d="M0 0 L30 18 M30 0 L0 18" stroke="#fff" stroke-width="2.2"/>
      <circle cx="15" cy="9" r="4.4" fill="#fff"/>
      ${star(15, 7, 1, '#ce1126')}${star(13.3, 10.1, 1, '#ce1126')}${star(16.7, 10.1, 1, '#ce1126')}`,
  },
  SS: {
    name: 'South Sudan',
    ratio: 2,
    draw: () => `<rect width="30" height="15" fill="#fff"/>
      <rect width="30" height="4.3" fill="#000"/><rect y="5.35" width="30" height="4.3" fill="#da121a"/><rect y="10.7" width="30" height="4.3" fill="#078930"/>
      <path d="M0 0 L13 7.5 L0 15 Z" fill="#0f47af"/>${star(4.4, 7.5, 2.4, '#fcdd09')}`,
  },
  CD: {
    name: 'DR Congo',
    ratio: 4 / 3,
    draw: () => `<rect width="30" height="22.5" fill="#007fff"/>
      <path d="M0 22.5 L30 0" stroke="#f7d618" stroke-width="7"/>
      <path d="M0 22.5 L30 0" stroke="#ce1021" stroke-width="5"/>
      ${star(5.4, 5, 3.4, '#f7d618')}`,
  },
  NG: { name: 'Nigeria', ratio: 2, draw: () => bands(['#008751', '#fff', '#008751'], { vertical: true, h: 15 }) },
  GH: {
    name: 'Ghana',
    ratio: 3 / 2,
    draw: () => `${bands(['#ce1126', '#fcd116', '#006b3f'])}${star(15, 10, 3.2, '#000')}`,
  },
  SN: {
    name: 'Senegal',
    ratio: 3 / 2,
    draw: () => `${bands(['#00853f', '#fdef42', '#e31b23'], { vertical: true })}${star(15, 10, 3, '#00853f')}`,
  },
  ET: {
    name: 'Ethiopia',
    ratio: 2,
    draw: () => `${bands(['#078930', '#fcdd09', '#da121a'], { h: 15 })}
      <circle cx="15" cy="7.5" r="4" fill="#0f47af"/>
      <g fill="none" stroke="#fcdd09" stroke-width="0.4">${(() => {
        const p = [];
        for (let i = 0; i < 5; i += 1) p.push(polar(15, 7.5, 2.6, -90 + i * 144).join(','));
        return `<polygon points="${p.join(' ')}"/>`;
      })()}</g>`,
  },
  ZA: {
    name: 'South Africa',
    ratio: 3 / 2,
    draw: () => `<rect width="30" height="10" fill="#e03c31"/><rect y="10" width="30" height="10" fill="#001489"/>
      <path d="M0 0 L12 10 L0 20 M12 10 H30" stroke="#fff" stroke-width="6.7" fill="none"/>
      <path d="M0 0 L12 10 L0 20 M12 10 H30" stroke="#007749" stroke-width="4" fill="none"/>
      <path d="M0 3.3 L8 10 L0 16.7 Z" fill="#ffb81c"/>
      <path d="M0 4.8 L6.2 10 L0 15.2 Z" fill="#000"/>`,
  },
  LS: {
    name: 'Lesotho',
    ratio: 3 / 2,
    draw: () => `<rect width="30" height="6" fill="#00209f"/><rect y="6" width="30" height="8" fill="#fff"/><rect y="14" width="30" height="6" fill="#009543"/>
      <path d="M12 12.4 H18 L15.6 10.6 L15 8.6 L14.4 10.6 Z" fill="#000"/>
      <path d="M15 8.6 V7.6" stroke="#000" stroke-width="0.6"/>`,
  },
  ZW: {
    name: 'Zimbabwe',
    ratio: 2,
    draw: () => `${bands(['#006400', '#ffd200', '#d40000', '#000', '#d40000', '#ffd200', '#006400'], { h: 15 })}
      <path d="M0 0 L10 7.5 L0 15 Z" fill="#fff" stroke="#000" stroke-width="0.5"/>
      ${star(3.6, 7.5, 2.2, '#d40000')}`,
  },
  MW: {
    name: 'Malawi',
    ratio: 3 / 2,
    draw: () => `${bands(['#000', '#ce1126', '#339e35'])}
      <path d="M10 6.67 A5 5 0 0 1 20 6.67 Z" fill="#ce1126"/>
      <g stroke="#ce1126" stroke-width="0.6">${[-160, -135, -110, -90, -70, -45, -20].map((a) => { const [x1, y1] = polar(15, 6.67, 5.6, a); const [x2, y2] = polar(15, 6.67, 6.4, a); return `<path d="M${x1} ${y1} L${x2} ${y2}"/>`; }).join('')}</g>`,
  },
  MG: {
    name: 'Madagascar',
    ratio: 3 / 2,
    draw: () => `<rect width="10" height="20" fill="#fff"/><rect x="10" width="20" height="10" fill="#fc3d32"/><rect x="10" y="10" width="20" height="10" fill="#007e3a"/>`,
  },
  CI: { name: 'Côte d’Ivoire', ratio: 3 / 2, draw: () => bands(['#f77f00', '#fff', '#009e60'], { vertical: true }) },
  ML: { name: 'Mali', ratio: 3 / 2, draw: () => bands(['#14b53a', '#fcd116', '#ce1126'], { vertical: true }) },
  GN: { name: 'Guinea', ratio: 3 / 2, draw: () => bands(['#ce1126', '#fcd116', '#009460'], { vertical: true }) },
  CM: {
    name: 'Cameroon',
    ratio: 3 / 2,
    draw: () => `${bands(['#007a5e', '#ce1126', '#fcd116'], { vertical: true })}${star(15, 10, 2.6, '#fcd116')}`,
  },
  BF: {
    name: 'Burkina Faso',
    ratio: 3 / 2,
    draw: () => `<rect width="30" height="10" fill="#ef2b2d"/><rect y="10" width="30" height="10" fill="#009e49"/>${star(15, 10, 3.4, '#fcd116')}`,
  },
  SO: { name: 'Somalia', ratio: 3 / 2, draw: () => `<rect width="30" height="20" fill="#4189dd"/>${star(15, 10.4, 5, '#fff')}` },
  FR: { name: 'France', ratio: 3 / 2, draw: () => bands(['#002654', '#fff', '#ce1126'], { vertical: true }) },
  BE: { name: 'Belgium', ratio: 15 / 13, draw: () => bands(['#000', '#fdda24', '#ef3340'], { vertical: true, h: 26 }) },
  PT: {
    name: 'Portugal',
    ratio: 3 / 2,
    draw: () => `<rect width="12" height="20" fill="#046a38"/><rect x="12" width="18" height="20" fill="#da291c"/>
      <circle cx="12" cy="10" r="4.4" fill="none" stroke="#ffe900" stroke-width="1.2"/>
      <path d="M10 7.6 H14 V11 Q14 13 12 13.4 Q10 13 10 11 Z" fill="#fff" stroke="#da291c" stroke-width="0.7"/>`,
  },
  US: {
    name: 'United States',
    ratio: 19 / 10,
    draw: () => {
      const h = 300 / 19;
      const s = h / 13;
      let out = `<rect width="30" height="${h}" fill="#fff"/>`;
      for (let i = 0; i < 13; i += 2) out += `<rect y="${i * s}" width="30" height="${s}" fill="#b22234"/>`;
      out += `<rect width="12" height="${7 * s}" fill="#3c3b6e"/><g fill="#fff">`;
      for (let r = 0; r < 9; r += 1) for (let c = 0; c < (r % 2 ? 5 : 6); c += 1) out += `<circle cx="${1 + c * 2 + (r % 2)}" cy="${0.6 + r * 0.87}" r="0.28"/>`;
      return `${out}</g>`;
    },
  },
  GB: {
    name: 'United Kingdom',
    ratio: 2,
    draw: (id) => `<clipPath id="${id}-t"><path d="M15 7.5 H30 V15 Z V15 H0 Z H0 V0 Z V0 H30 Z"/></clipPath>
      <rect width="30" height="15" fill="#012169"/>
      <path d="M0 0 L30 15 M30 0 L0 15" stroke="#fff" stroke-width="3"/>
      <path d="M0 0 L30 15 M30 0 L0 15" stroke="#c8102e" stroke-width="2" clip-path="url(#${id}-t)"/>
      <path d="M15 0 V15 M0 7.5 H30" stroke="#fff" stroke-width="5"/>
      <path d="M15 0 V15 M0 7.5 H30" stroke="#c8102e" stroke-width="3"/>`,
  },
};

export const FLAG_COUNTRIES = Object.keys(FLAGS);

let current = null;

/** Sets the country whose flag the art shows (an ISO 3166 code, or null). */
export function setFlagCountry(code) {
  current = code && FLAGS[code] ? code : null;
}

export const flagCountry = () => current;

/**
 * Picks the flag country: the learned language's country, else the
 * learner's home country, as long as there is a drawing for it.
 */
export function chooseFlagCountry({ languageCountry, homeCountry } = {}) {
  return [languageCountry, homeCountry].find((c) => c && FLAGS[c]) ?? null;
}

/**
 * A flag with its top-left corner at (x, y), up to `width` wide and
 * `maxHeight` tall, in the flag's own proportions. With no known country it draws a
 * plain vermillion pennant that is nobody's flag.
 */
export function flag(code = current, { x = 0, y = 0, width = 54, maxHeight = width / 1.5 } = {}) {
  const f = FLAGS[code];
  if (!f) {
    const h = width * 0.66;
    return `<path d="M${x} ${y} H${x + width} L${x + width * 0.72} ${y + h / 2} L${x + width} ${y + h} H${x} Z" class="f-verm"/>
      <circle cx="${x + width * 0.3}" cy="${y + h / 2}" r="${h * 0.18}" class="f-white"/>`;
  }
  // Squarer flags (Belgium) shrink to fit the space instead of growing taller.
  const vh = +(30 / f.ratio).toFixed(3);
  const h = +Math.min(width / f.ratio, maxHeight).toFixed(2);
  const w = +(h * f.ratio).toFixed(2);
  return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 30 ${vh}" preserveAspectRatio="none" overflow="hidden">${f.draw(uid(`flag-${code}`))}
    <rect width="30" height="${vh}" fill="none" stroke="#000" stroke-opacity="0.25" stroke-width="0.3"/>
  </svg>`;
}
