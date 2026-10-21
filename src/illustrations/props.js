/*
 * Props: small still-life drawings on a 64 × 64 grid that sit beside the
 * crane on empty states, decorate the learning path and fill out places.
 * Each one carries its own idle loop.
 */
import { svg, uid, patterns } from './core.js';
import { delay } from './random.js';

const DRAW = {
  drum: {
    label: 'An engoma drum',
    body: (t) => `
      <ellipse cx="32" cy="58" rx="20" ry="3" class="f-rule" opacity="0.14"/>
      <g class="anim-beat" ${delay(1)}>
        <path d="M12 18 H52 L46 56 H18 Z" class="f-verm-deep"/>
        <path d="M14 22 L24 54 M24 22 L14 40 M32 22 L40 54 M40 22 L28 54 M50 22 L42 54" class="s-ink" stroke-width="1.2"/>
        <ellipse cx="32" cy="18" rx="20" ry="6" class="f-paper-light card-edge"/>
        <rect x="16" y="50" width="32" height="6" fill="${t.hatch}"/>
      </g>`,
  },
  matooke: {
    label: 'A bunch of matooke',
    body: () => {
      // Hands of green bananas, fingers pointing up, narrowing to the stalk.
      const rows = [[6, 12], [5, 22], [4, 32], [3, 42]];
      const fingers = rows
        .map(([n, y]) =>
          Array.from({ length: n }, (_, i) => {
            const x = 32 + (i - (n - 1) / 2) * 8.5;
            const tilt = (i - (n - 1) / 2) * 8;
            return `<rect x="${x - 3.6}" y="${y - 9}" width="7.2" height="16" rx="3.6" transform="rotate(${tilt} ${x} ${y + 7})" class="f-sage card-edge"/>`;
          }).join(''),
        )
        .join('');
      return `<g class="anim-sway" ${delay(3)}>
        <path d="M32 0 V8" class="s-ink" stroke-width="3" stroke-linecap="round"/>
        ${fingers}
        <path d="M32 50 V60" class="s-ink" stroke-width="3" stroke-linecap="round"/>
        <circle cx="32" cy="61" r="3" class="f-verm-deep"/>
      </g>`;
    },
  },
  pot: {
    label: 'A clay pot, steaming',
    body: (t) => `
      <g class="anim-steam" ${delay(2)}><path d="M26 14 Q22 8 26 2 M38 14 Q34 8 38 2" class="s-ink-soft" stroke-width="2" stroke-linecap="round"/></g>
      <path d="M18 20 H46 L48 26 C60 34 58 56 32 58 C6 56 4 34 16 26 Z" class="f-verm-deep"/>
      <path d="M12 38 H52" class="s-white" stroke-width="2" stroke-dasharray="3 3"/>
      <rect x="16" y="18" width="32" height="5" rx="2" class="f-ink"/>
      <path d="M32 26 C48 30 52 44 44 54 C52 44 46 30 32 26 Z" fill="${t.dots}" opacity="0.4"/>`,
  },
  book: {
    label: 'An open book',
    body: () => `
      <ellipse cx="32" cy="56" rx="24" ry="3" class="f-rule" opacity="0.14"/>
      <path d="M32 18 C24 12 12 12 4 16 V52 C12 48 24 48 32 54 Z" class="f-white card-edge"/>
      <path d="M32 18 C40 12 52 12 60 16 V52 C52 48 40 48 32 54 Z" class="f-cream card-edge"/>
      <path d="M10 24 H26 M10 30 H26 M10 36 H22" class="s-ink" stroke-width="1.4"/>
      <g class="anim-flip" ${delay(4)}><path d="M32 18 C38 10 48 8 54 10 V44 C46 44 38 46 32 54 Z" class="f-verm card-edge"/></g>`,
  },
  tea: {
    label: 'A mug of chai',
    body: () => `
      <g class="anim-steam" ${delay(2)}><path d="M24 18 Q20 12 24 6 M34 18 Q30 12 34 6" class="s-ink-soft" stroke-width="2" stroke-linecap="round"/></g>
      <path d="M44 30 A8 8 0 0 1 44 46" class="s-ink" stroke-width="4"/>
      <path d="M12 22 H46 V50 A8 8 0 0 1 38 58 H20 A8 8 0 0 1 12 50 Z" class="f-white card-edge"/>
      <rect x="12" y="32" width="34" height="8" class="f-verm"/>
      <ellipse cx="29" cy="22" rx="17" ry="3" fill="#8a5a3a"/>`,
  },
  basket: {
    label: 'A woven basket',
    body: (t) => `
      <g class="anim-sway" ${delay(3)}>
        <path d="M16 26 A16 16 0 0 1 48 26" class="s-ink" stroke-width="3"/>
        <path d="M6 26 H58 L50 58 H14 Z" fill="${t.hatch}"/>
        <path d="M6 26 H58 L50 58 H14 Z" class="card-edge" fill="none"/>
        <rect x="8" y="36" width="48" height="6" class="f-verm"/>
        <circle cx="24" cy="22" r="7" class="f-verm"/><circle cx="38" cy="22" r="6" class="f-yellow"/>
      </g>`,
  },
  ball: {
    label: 'A football',
    body: () => `
      <ellipse class="f-rule anim-shadow" cx="32" cy="60" rx="14" ry="2.5" opacity="0.14"/>
      <g class="anim-hop">
        <circle cx="32" cy="30" r="20" class="f-white card-edge"/>
        <path d="M32 21 L40.6 27.2 L37.3 37.3 H26.7 L23.4 27.2 Z" class="f-ink"/>
        <path d="M32 21 V10 M40.6 27.2 L51 24 M37.3 37.3 L44 46 M26.7 37.3 L20 46 M23.4 27.2 L13 24" class="s-ink" stroke-width="1.6"/>
      </g>`,
  },
  radio: {
    label: 'A radio playing music',
    body: (t) => `
      <g class="anim-pulse" ${delay(1)}><path d="M50 10 A10 10 0 0 1 56 22 M54 4 A16 16 0 0 1 62 24" class="s-verm" stroke-width="2.4" stroke-linecap="round"/></g>
      <path d="M18 22 L40 6" class="s-ink" stroke-width="2" stroke-linecap="round"/>
      <rect x="6" y="22" width="52" height="34" rx="6" class="f-ink"/>
      <circle cx="22" cy="39" r="11" fill="${t.dots}"/>
      <circle cx="22" cy="39" r="11" class="s-white" stroke-width="1.4"/>
      <rect x="38" y="30" width="14" height="6" class="f-yellow"/>
      <circle cx="42" cy="46" r="3" class="f-verm"/><circle cx="50" cy="46" r="3" class="f-white"/>`,
  },
  sun: {
    label: 'A Bauhaus sun',
    body: () => `
      <g class="anim-spin">${Array.from({ length: 12 }, (_, i) => `<rect x="30.5" y="2" width="3" height="10" class="f-ink" transform="rotate(${i * 30} 32 32)"/>`).join('')}</g>
      <circle cx="32" cy="32" r="16" class="f-verm"/>
      <path d="M16 32 A16 16 0 0 0 48 32 Z" class="f-yellow"/>`,
  },
};

export const PROP_IDS = Object.keys(DRAW);

/** A prop as its own <svg>. */
export function prop(id, { label } = {}) {
  const p = DRAW[id];
  if (!p) throw new Error(`Unknown prop: ${id}`);
  const tex = patterns(uid('prop'));
  return svg({
    viewBox: '0 0 64 64',
    label: label ?? p.label,
    className: 'ill--prop',
    body: `<defs>${tex.defs}</defs>${p.body(tex)}`,
  });
}

/** A prop without its <svg>, placed inside a larger drawing. */
export function propGroup(id, { x = 0, y = 0, scale = 1 } = {}) {
  const p = DRAW[id];
  if (!p) throw new Error(`Unknown prop: ${id}`);
  const tex = patterns(uid('prop'));
  return `<g transform="translate(${x} ${y}) scale(${scale})"><defs>${tex.defs}</defs>${p.body(tex)}</g>`;
}
