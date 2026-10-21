/*
 * The cast: flat Bauhaus portraits built from circles, arcs and blocks.
 * Each face is split down the nose into a lit and a shaded half, the way
 * the promada portraits are. Characters are data; `portrait()` draws them.
 */
import { svg, uid, patterns } from './core.js';

export const CAST = {
  nakato: {
    name: 'Nakato',
    role: 'Your guide, a university student in Kampala',
    skin: '#7a4a2e',
    shade: '#5e3720',
    hair: 'puffs',
    hairColor: '#1c1512',
    top: 'f-verm',
    card: 'f-cream',
    backdrop: 'circle',
    texture: 'dots',
    extras: ['earrings'],
  },
  mukasa: {
    name: 'Mukasa',
    role: 'A patient teacher from Masaka',
    skin: '#a8714a',
    shade: '#8a5735',
    hair: 'short',
    hairColor: '#1c1512',
    top: 'f-ink',
    card: 'f-lavender',
    backdrop: 'quarter',
    texture: 'grid',
    extras: ['glasses'],
  },
  jjajja: {
    name: 'Jjajja Nalwoga',
    role: 'A grandmother who loves proverbs',
    skin: '#5c3622',
    shade: '#452616',
    hair: 'headwrap',
    hairColor: '#d9d3ca',
    top: 'f-lavender',
    card: 'f-blush',
    backdrop: 'arch',
    backdropColor: 'f-ink',
    texture: 'hatch',
    extras: ['gomesi', 'earrings'],
  },
  ssali: {
    name: 'Ssali',
    role: 'A boda boda rider who knows every road',
    skin: '#6b3f26',
    shade: '#52301b',
    hair: 'cap',
    hairColor: '#1c1512',
    top: 'f-ink-soft',
    card: 'f-sage',
    backdrop: 'half',
    texture: 'dots',
    extras: ['beard'],
  },
  amara: {
    name: 'Amara',
    role: 'A secondary school student who loves music',
    skin: '#8f5a37',
    shade: '#724427',
    hair: 'braids',
    hairColor: '#211814',
    top: 'f-lavender',
    card: 'f-paper-light',
    backdrop: 'circle',
    texture: 'hatch',
    extras: [],
  },
  emma: {
    name: 'Emma',
    role: 'A visitor learning Luganda before her trip',
    skin: '#f0c9a8',
    shade: '#d9a986',
    hair: 'bob',
    hairColor: '#b8532a',
    top: 'f-ink',
    card: 'f-cream',
    backdrop: 'quarter',
    texture: 'grid',
    extras: [],
  },
};

export const EXPRESSIONS = ['neutral', 'happy', 'sad'];

const BACKDROPS = {
  circle: (cls) => `<circle cx="104" cy="84" r="50" class="${cls}"/>`,
  quarter: (cls) => `<path d="M156 70 A126 126 0 0 0 30 196 H156 Z" class="${cls}"/>`,
  half: (cls) => `<path d="M4 34 A72 72 0 0 1 4 178 Z" class="${cls}"/>`,
  arch: (cls) => `<path d="M34 196 V84 A46 46 0 0 1 126 84 V196 Z" class="${cls}"/>`,
};

/* Hair drawn behind the head. */
function hairBack(c) {
  const fill = `fill="${c.hairColor}"`;
  switch (c.hair) {
    case 'puffs':
      return `<g ${fill}>
        <circle cx="80" cy="70" r="30"/>
        <circle cx="58" cy="62" r="16"/><circle cx="72" cy="50" r="16"/>
        <circle cx="90" cy="49" r="16"/><circle cx="104" cy="61" r="16"/>
        <circle cx="50" cy="80" r="11"/><circle cx="110" cy="80" r="11"/>
      </g>`;
    case 'braids': {
      let beads = '';
      for (let i = 0; i < 6; i += 1) {
        const y = 92 + i * 11;
        beads += `<circle cx="51" cy="${y}" r="6"/><circle cx="109" cy="${y}" r="6"/>`;
      }
      return `<g ${fill}>${beads}</g>
        <circle cx="51" cy="160" r="3.4" class="f-verm"/><circle cx="109" cy="160" r="3.4" class="f-verm"/>`;
    }
    case 'bob':
      return `<path ${fill} d="M48 124 V82 A32 32 0 0 1 112 82 V124 Z"/>`;
    default:
      return '';
  }
}

/* Hair and headwear drawn over the forehead. */
function hairFront(c, ids) {
  const fill = `fill="${c.hairColor}"`;
  switch (c.hair) {
    case 'puffs':
      return `<g ${fill}>
        <path d="M55 86 C54 64 66 56 80 56 C94 56 106 64 105 86 C100 74 92 68 80 68 C68 68 60 74 55 86 Z"/>
        <circle cx="61" cy="72" r="6"/><circle cx="70" cy="63" r="6"/><circle cx="80" cy="60" r="6"/>
        <circle cx="90" cy="63" r="6"/><circle cx="99" cy="72" r="6"/>
      </g>`;
    case 'short':
      return `<path ${fill} d="M55 86 C52 60 68 53 82 54 C98 55 108 65 105 86 C103 76 98 71 91 69 C80 74 66 73 58 78 Z"/>
        <path d="M91 69 C86 63 80 60 74 60" class="s-ink-soft" stroke-width="1"/>`;
    case 'braids':
      return `<path ${fill} d="M55 88 C52 62 66 54 80 54 C94 54 108 62 105 88 C102 74 92 67 80 66 C68 67 58 74 55 88 Z"/>
        <path d="M80 55 V66" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.2"/>`;
    case 'bob':
      return `<path ${fill} d="M53 90 V82 A27 29 0 0 1 107 82 V90 H101 L98 76 C90 70 70 70 62 76 L59 90 Z"/>
        <path ${fill} d="M80 57 L62 77 L80 72 Z"/>`;
    case 'cap':
      return `<path d="M54 82 C54 58 67 50 80 50 C93 50 106 58 106 82 Z" class="f-ink"/>
        <rect x="54" y="74" width="52" height="8" class="f-verm"/>
        <path d="M102 80 L131 85 Q122 92 102 87 Z" class="f-ink-soft"/>
        <circle cx="80" cy="51" r="2.6" class="f-verm"/>`;
    case 'headwrap':
      return `<path d="M51 86 C45 58 60 40 80 40 C100 40 115 58 109 86 C104 73 94 66 80 66 C66 66 56 73 51 86 Z" class="f-verm"/>
        <path d="M54 66 C66 58 94 58 106 66 L104 60 C92 52 68 52 56 60 Z" fill="${ids.hatch}"/>
        <circle cx="99" cy="44" r="10" class="f-verm"/>
        <circle cx="110" cy="52" r="6" class="f-verm-deep"/>`;
    default:
      return '';
  }
}

function eyes(expression) {
  const lid = expression === 'happy';
  const eye = (x) =>
    lid
      ? `<path d="M${x - 4} 90 Q${x} 85 ${x + 4} 90" class="s-ink" stroke-width="2" stroke-linecap="round"/>`
      : `<g class="anim-blink"><ellipse cx="${x}" cy="89" rx="4" ry="2.4" fill="#fbf9f5"/><circle cx="${x + 0.4}" cy="89" r="1.9" class="f-ink"/></g>`;
  return eye(70) + eye(90);
}

function brows(expression, color) {
  const d = {
    neutral: 'M63 81 Q69 78 76 80 M84 80 Q91 78 97 81',
    happy: 'M63 79 Q69 75 76 78 M84 78 Q91 75 97 79',
    sad: 'M63 80 Q69 80 76 76 M84 76 Q91 80 97 80',
  }[expression];
  return `<path d="${d}" stroke="${color}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
}

function mouth(expression) {
  switch (expression) {
    case 'happy':
      return `<path d="M71 107 Q80 118 89 107 Z" class="f-verm-deep"/>
        <path d="M73 108 H87" stroke="#fbf9f5" stroke-width="1.6"/>
        <circle cx="64" cy="101" r="4" class="f-verm" opacity="0.35"/>
        <circle cx="96" cy="101" r="4" class="f-verm" opacity="0.35"/>`;
    case 'sad':
      return '<path d="M73 112 Q80 106 87 112" class="s-verm-deep" stroke-width="2.2" stroke-linecap="round"/>';
    default:
      return '<path d="M73 109 Q80 112 87 109" class="s-verm-deep" stroke-width="2.2" stroke-linecap="round"/>';
  }
}

function clothing(c) {
  if (c.extras.includes('gomesi')) {
    // Busuuti / gomesi: the raised, pointed shoulders are its signature.
    return `<path d="M16 200 C16 162 28 144 44 140 L38 122 L62 135 C70 133 90 133 98 135 L122 122 L116 140 C132 144 144 162 144 200 Z" class="${c.top}"/>
      <path d="M68 134 L80 152 L92 134 Z" fill="${c.skin}"/>
      <rect x="16" y="182" width="128" height="9" class="f-verm"/>`;
  }
  return `<path d="M22 200 C24 152 46 134 80 132 C114 134 136 152 138 200 Z" class="${c.top}"/>
    <path d="M70 132 L80 148 L90 132 Z" fill="${c.skin}"/>`;
}

function beard(c) {
  if (!c.extras.includes('beard')) return '';
  return `<path d="M57 98 C59 121 70 130 80 130 C90 130 101 121 103 98 C98 109 90 113 80 113 C70 113 62 109 57 98 Z" fill="${c.hairColor}"/>`;
}

function accessories(c) {
  let out = '';
  if (c.extras.includes('glasses')) {
    out += `<g class="s-ink" stroke-width="1.8">
      <circle cx="70" cy="89" r="8"/><circle cx="90" cy="89" r="8"/>
      <path d="M78 89 Q80 86.5 82 89 M62 88 L55 85 M98 88 L105 85"/>
    </g>`;
  }
  if (c.extras.includes('earrings')) {
    out += '<circle cx="55" cy="104" r="3" class="f-verm"/><circle cx="105" cy="104" r="3" class="f-verm"/>';
  }
  return out;
}

function figure(c, expression, ids) {
  return `
    ${hairBack(c)}
    ${clothing(c)}
    <path d="M80 134 C104 135 128 150 134 200 H80 Z" fill="#000" opacity="0.14"/>
    <rect x="70" y="106" width="20" height="30" rx="4" fill="${c.skin}"/>
    <rect x="80" y="106" width="10" height="30" fill="${c.shade}"/>
    <ellipse cx="55" cy="92" rx="4.5" ry="7" fill="${c.skin}"/>
    <ellipse cx="105" cy="92" rx="4.5" ry="7" fill="${c.shade}"/>
    <ellipse cx="80" cy="88" rx="25" ry="30" fill="${c.skin}"/>
    <path d="M80 50 V88 L85 101 L80 104 V125 H112 V50 Z" fill="${c.shade}" clip-path="url(#${ids.face})"/>
    ${beard(c)}
    ${eyes(expression)}
    ${brows(expression, c.hair === 'headwrap' ? '#3a2a20' : c.hairColor)}
    <path d="M77 101.5 Q80 103.5 83 101.5" stroke="#000" stroke-opacity="0.35" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    ${mouth(expression)}
    ${hairFront(c, ids)}
    ${accessories(c)}`;
}

/**
 * Draws a cast member.
 * @param {keyof CAST} id
 * @param {{ expression?: 'neutral'|'happy'|'sad', shape?: 'card'|'circle', label?: string }} [options]
 *   `card` is the framed portrait used in scenes and stories; `circle` is the
 *   compact profile avatar.
 */
export function portrait(id, { expression = 'neutral', shape = 'card', label } = {}) {
  const c = CAST[id];
  if (!c) throw new Error(`Unknown character: ${id}`);
  const p = uid(id);
  const tex = patterns(p);
  const ids = { face: `${p}-face`, frame: `${p}-frame`, hatch: tex.hatch };
  const textures = {
    dots: `<rect x="110" y="14" width="36" height="30" fill="${tex.dots}"/>`,
    grid: `<rect x="116" y="150" width="30" height="26" fill="${tex.grid}"/>`,
    hatch: `<rect x="14" y="14" width="30" height="24" fill="${tex.hatch}"/>`,
  };
  const defs = `<defs>${tex.defs}
    <clipPath id="${ids.face}"><ellipse cx="80" cy="88" rx="25" ry="30"/></clipPath>
    ${
      shape === 'circle'
        ? `<clipPath id="${ids.frame}"><circle cx="80" cy="92" r="62"/></clipPath>`
        : `<clipPath id="${ids.frame}"><rect x="4" y="4" width="152" height="192" rx="16"/></clipPath>`
    }</defs>`;
  const inner = `<g clip-path="url(#${ids.frame})">
      <rect width="160" height="200" class="${c.card}"/>
      ${BACKDROPS[c.backdrop](c.backdropColor ?? 'f-verm')}
      ${textures[c.texture]}
      <g transform="translate(80 200) scale(1.1) translate(-80 -200)">${figure(c, expression, ids)}</g>
    </g>`;
  const name = label ?? `${c.name}, ${expression === 'neutral' ? 'smiling softly' : expression}`;
  if (shape === 'circle') {
    return svg({
      viewBox: '16 28 128 128',
      label: name,
      className: 'ill--avatar',
      body: `${defs}${inner}<circle cx="80" cy="92" r="62" class="card-edge" fill="none"/>`,
    });
  }
  return svg({
    viewBox: '0 0 160 200',
    label: name,
    className: 'ill--portrait',
    body: `${defs}
      <rect x="6" y="7" width="152" height="192" rx="16" class="f-ink"/>
      ${inner}
      <rect x="4" y="4" width="152" height="192" rx="16" class="card-edge" fill="none"/>`,
  });
}

/** Just the inner drawing of a card, for composing into larger scenes. */
export function portraitGroup(id, { expression = 'neutral', x = 0, y = 0, scale = 1, rotate = 0 } = {}) {
  const markup = portrait(id, { expression });
  const body = markup.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '').replace(/<title[^>]*>.*?<\/title>/, '');
  return `<g transform="translate(${x} ${y}) rotate(${rotate} 80 100) scale(${scale})">${body}</g>`;
}
