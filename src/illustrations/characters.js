/*
 * The cast: flat Bauhaus portraits built from circles, arcs and blocks.
 * Each face is split down the nose into a lit and a shaded half, the way
 * the promada portraits are. Characters are data; `portrait()` draws them.
 */
import { svg, uid, patterns } from './core.js';
import { craneHead } from './mascot.js';
import { delay } from './random.js';

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
  kato: {
    name: 'Kato',
    role: 'Nakato’s twin brother, mad about football',
    skin: '#7a4a2e',
    shade: '#5e3720',
    hair: 'afro',
    hairColor: '#1c1512',
    top: 'f-cream',
    card: 'f-sky',
    backdrop: 'sun',
    backdropColor: 'f-blue',
    texture: 'dots',
    extras: ['uniform'],
  },
  namuli: {
    name: 'Maama Namuli',
    role: 'Sells matooke and gossip at the market',
    skin: '#6e4129',
    shade: '#55301c',
    hair: 'bun',
    hairColor: '#1c1512',
    top: 'f-verm',
    card: 'f-sage',
    backdrop: 'diamond',
    backdropColor: 'f-yellow',
    texture: 'hatch',
    extras: ['apron', 'necklace'],
  },
  musoke: {
    name: 'Musoke',
    role: 'A fisherman on Lake Victoria',
    skin: '#5f3824',
    shade: '#472816',
    hair: 'bucket',
    hairColor: '#1c1512',
    top: 'f-ink-soft',
    card: 'f-lavender',
    backdrop: 'wave',
    backdropColor: 'f-blue',
    texture: 'grid',
    extras: ['mustache'],
  },
  kizza: {
    name: 'Jjajja Kizza',
    role: 'A grandfather in his Sunday kanzu',
    skin: '#5c3622',
    shade: '#452616',
    hair: 'kufi',
    hairColor: '#d9d3ca',
    top: 'f-ink',
    card: 'f-cream',
    backdrop: 'arch',
    texture: 'dots',
    extras: ['kanzu', 'glasses', 'mustache'],
  },
  nansubuga: {
    name: 'Dr Nansubuga',
    role: 'A doctor who teaches body words',
    skin: '#845234',
    shade: '#683d23',
    hair: 'locks',
    hairColor: '#211814',
    top: 'f-white',
    card: 'f-blush',
    backdrop: 'half',
    texture: 'grid',
    extras: ['stethoscope', 'earrings'],
  },
};

/*
 * Animal avatars for the profile picker. They share the portrait card but
 * draw a creature instead of a person.
 */
export const CRITTERS = {
  ente: {
    name: 'Ente',
    role: 'An Ankole cow with record-breaking horns',
    species: 'cow',
    card: 'f-sage',
    backdrop: 'circle',
    backdropColor: 'f-yellow',
    texture: 'hatch',
  },
  engo: {
    name: 'Engo',
    role: 'A leopard who never forgets a word',
    species: 'leopard',
    card: 'f-lavender',
    backdrop: 'quarter',
    backdropColor: 'f-blue',
    texture: 'dots',
  },
  crane: {
    name: 'Crane',
    role: 'The crowned crane, your study buddy',
    species: 'crane',
    card: 'f-cream',
    backdrop: 'sun',
    texture: 'grid',
  },
};

export const EXPRESSIONS = ['neutral', 'happy', 'sad', 'surprised', 'wink'];

/** Everything a character spec may use, so course packs can be validated. */
export const CHARACTER_OPTIONS = {
  hair: ['puffs', 'short', 'braids', 'bob', 'cap', 'headwrap', 'afro', 'bun', 'locks', 'bald', 'kufi', 'bucket'],
  extras: ['earrings', 'glasses', 'gomesi', 'beard', 'kanzu', 'apron', 'necklace', 'uniform', 'stethoscope', 'mustache'],
  backdrops: ['circle', 'quarter', 'half', 'arch', 'sun', 'wave', 'diamond'],
  textures: ['dots', 'grid', 'hatch'],
  colors: ['f-verm', 'f-verm-deep', 'f-ink', 'f-ink-soft', 'f-grey', 'f-white', 'f-paper-light', 'f-cream', 'f-lavender', 'f-blush', 'f-sage', 'f-sky', 'f-yellow', 'f-blue'],
};

const HEX = /^#[0-9a-f]{6}$/i;

/** Returns a list of problems with a character spec (empty when valid). */
export function validateCharacter(spec) {
  const errors = [];
  const oneOf = (key, list, optional = false) => {
    if (optional && spec[key] === undefined) return;
    if (!list.includes(spec[key])) errors.push(`${key} must be one of ${list.join(', ')}`);
  };
  if (typeof spec?.name !== 'string' || !spec.name) return ['name is required'];
  for (const key of ['skin', 'shade', 'hairColor']) {
    if (!HEX.test(spec[key] ?? '')) errors.push(`${key} must be a #rrggbb colour`);
  }
  oneOf('hair', CHARACTER_OPTIONS.hair);
  oneOf('backdrop', CHARACTER_OPTIONS.backdrops);
  oneOf('texture', CHARACTER_OPTIONS.textures);
  oneOf('top', CHARACTER_OPTIONS.colors);
  oneOf('card', CHARACTER_OPTIONS.colors);
  oneOf('backdropColor', CHARACTER_OPTIONS.colors, true);
  for (const extra of spec.extras ?? []) {
    if (!CHARACTER_OPTIONS.extras.includes(extra)) errors.push(`unknown extra: ${extra}`);
  }
  return errors;
}

/**
 * Adds a character from plain data (for example a course pack's cast).
 * Throws when the spec uses a part the drawing code does not know.
 */
export function defineCharacter(id, spec) {
  const errors = validateCharacter(spec);
  if (errors.length) throw new Error(`Character ${id}: ${errors.join('; ')}`);
  CAST[id] = { role: '', extras: [], ...spec };
  return CAST[id];
}

/** Ids a learner can pick as their avatar: the cast plus the animals. */
export function avatarIds() {
  return [...Object.keys(CAST), ...Object.keys(CRITTERS)];
}

/** Name and role for a cast member or critter. */
export function characterInfo(id) {
  return CAST[id] ?? CRITTERS[id];
}

const BACKDROPS = {
  circle: (cls) => `<circle cx="104" cy="84" r="50" class="${cls}"/>`,
  quarter: (cls) => `<path d="M156 70 A126 126 0 0 0 30 196 H156 Z" class="${cls}"/>`,
  half: (cls) => `<path d="M4 34 A72 72 0 0 1 4 178 Z" class="${cls}"/>`,
  arch: (cls) => `<path d="M34 196 V84 A46 46 0 0 1 126 84 V196 Z" class="${cls}"/>`,
  sun: (cls) => `<circle cx="80" cy="120" r="66" class="${cls}"/>`,
  wave: (cls) => `<path d="M0 120 q20 -14 40 0 t40 0 t40 0 t40 0 V200 H0 Z" class="${cls}"/><path d="M0 98 q20 -14 40 0 t40 0 t40 0 t40 0" class="s-white" stroke-width="3" opacity="0.6"/>`,
  diamond: (cls) => `<path d="M80 22 L148 100 L80 178 L12 100 Z" class="${cls}"/>`,
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
    case 'afro':
      return `<circle ${fill} cx="80" cy="76" r="39"/>`;
    case 'bun':
      return `<circle ${fill} cx="80" cy="46" r="14"/>`;
    case 'locks': {
      let locks = '';
      [44, 52, 108, 116].forEach((x, i) => {
        const h = 58 + (i % 2) * 14;
        locks += `<rect x="${x - 4.5}" y="72" width="9" height="${h}" rx="4.5"/>`;
      });
      return `<g ${fill}>${locks}</g>
        <circle cx="44" cy="128" r="3" class="f-yellow"/><circle cx="116" cy="128" r="3" class="f-yellow"/>`;
    }
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
    case 'afro':
      return `<path ${fill} d="M53 90 C49 62 64 50 80 50 C96 50 111 62 107 90 C103 74 93 67 80 67 C67 67 57 74 53 90 Z"/>
        <path d="M60 48 A40 40 0 0 1 100 46" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2" fill="none"/>`;
    case 'bun':
      return `<path ${fill} d="M55 88 C52 62 66 55 80 55 C94 55 108 62 105 88 C101 74 92 68 80 68 C68 68 59 74 55 88 Z"/>
        <rect x="70" y="54" width="20" height="5" rx="2.5" class="f-yellow"/>`;
    case 'locks':
      return `<path ${fill} d="M54 90 C50 60 66 52 80 52 C94 52 110 60 106 90 C102 76 96 72 92 70 L88 78 L84 69 L76 78 L72 69 L66 78 C60 80 56 84 54 90 Z"/>`;
    case 'bald':
      return `<path ${fill} d="M55 92 C54 82 57 76 61 73 L62 92 Z M105 92 C106 82 103 76 99 73 L98 92 Z"/>
        <path d="M68 64 Q76 60 84 61" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    case 'kufi':
      return `<path ${fill} d="M55 92 C54 82 57 77 61 75 L62 92 Z M105 92 C106 82 103 77 99 75 L98 92 Z"/>
        <path d="M56 74 C56 58 66 51 80 51 C94 51 104 58 104 74 Z" class="f-white card-edge"/>
        <rect x="56" y="67" width="48" height="7" class="f-verm"/>
        <path d="M64 61 H96" stroke="#1c1a18" stroke-width="1.4" stroke-dasharray="2 3"/>`;
    case 'bucket':
      return `<ellipse cx="80" cy="72" rx="38" ry="7" class="f-ink-soft"/>
        <path d="M60 72 L64 50 C70 46 90 46 96 50 L100 72 Z" class="f-ink"/>
        <rect x="61.5" y="62" width="37" height="6" class="f-yellow"/>
        <path d="M100 72 Q112 80 108 92" class="s-ink" stroke-width="1.2"/>`;
    default:
      return '';
  }
}

function eyes(expression) {
  const closed = (x) => `<path d="M${x - 4} 90 Q${x} 85 ${x + 4} 90" class="s-ink" stroke-width="2" stroke-linecap="round"/>`;
  const open = (x) =>
    expression === 'surprised'
      ? `<g class="anim-blink"><circle cx="${x}" cy="88.5" r="4" fill="#fbf9f5"/><circle cx="${x}" cy="88.5" r="2.2" class="f-ink"/></g>`
      : `<g class="anim-blink"><ellipse cx="${x}" cy="89" rx="4" ry="2.4" fill="#fbf9f5"/><circle cx="${x + 0.4}" cy="89" r="1.9" class="f-ink"/></g>`;
  if (expression === 'happy') return closed(70) + closed(90);
  if (expression === 'wink') return closed(70) + open(90);
  return open(70) + open(90);
}

function brows(expression, color) {
  const d = {
    neutral: 'M63 81 Q69 78 76 80 M84 80 Q91 78 97 81',
    happy: 'M63 79 Q69 75 76 78 M84 78 Q91 75 97 79',
    sad: 'M63 80 Q69 80 76 76 M84 76 Q91 80 97 80',
    surprised: 'M63 76 Q69 71 76 74 M84 74 Q91 71 97 76',
    wink: 'M63 81 Q69 79 76 82 M84 77 Q91 73 97 77',
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
    case 'surprised':
      return '<ellipse cx="80" cy="110" rx="4" ry="5" class="f-verm-deep"/>';
    case 'wink':
      return `<path d="M71 107 Q81 116 90 105" class="s-verm-deep" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="96" cy="101" r="4" class="f-verm" opacity="0.35"/>`;
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
  if (c.extras.includes('kanzu')) {
    // A white kanzu under an open jacket, with the embroidered neck band.
    return `<path d="M22 200 C24 152 46 134 80 132 C114 134 136 152 138 200 Z" class="f-white"/>
      <path d="M22 200 C24 152 46 134 66 133 L70 200 Z M138 200 C136 152 114 134 94 133 L90 200 Z" class="${c.top}"/>
      <path d="M70 132 L80 148 L90 132 Z" fill="${c.skin}"/>
      <path d="M80 148 V200" class="s-verm-deep" stroke-width="4"/>
      <path d="M80 148 V200" stroke="#fbfaf8" stroke-width="1.2" stroke-dasharray="2 2.5"/>`;
  }
  return `<path d="M22 200 C24 152 46 134 80 132 C114 134 136 152 138 200 Z" class="${c.top}"/>
    <path d="M70 132 L80 148 L90 132 Z" fill="${c.skin}"/>`;
}

function beard(c) {
  if (!c.extras.includes('beard')) return '';
  return `<path d="M57 98 C59 121 70 130 80 130 C90 130 101 121 103 98 C98 109 90 113 80 113 C70 113 62 109 57 98 Z" fill="${c.hairColor}"/>`;
}

function mustache(c) {
  if (!c.extras.includes('mustache')) return '';
  return `<path d="M68 106 C72 101 78 102 80 104 C82 102 88 101 92 106 C87 106 83 106 80 105 C77 106 73 106 68 106 Z" fill="${c.hairColor}"/>`;
}

/* Things worn over the clothes. */
function outerwear(c) {
  let out = '';
  if (c.extras.includes('uniform')) {
    out += `<path d="M66 134 L80 150 L72 156 Z M94 134 L80 150 L88 156 Z" class="f-white card-edge"/>
      <path d="M80 150 L76 156 L80 186 L84 156 Z" class="f-verm"/>`;
  }
  if (c.extras.includes('apron')) {
    out += `<path d="M58 160 H102 V200 H58 Z" class="f-white"/>
      <path d="M58 160 L52 140 M102 160 L108 140" class="s-ink" stroke-width="1.6"/>
      <rect x="70" y="172" width="20" height="14" class="f-yellow"/>
      <path d="M58 160 H102" class="s-ink" stroke-width="1"/>`;
  }
  if (c.extras.includes('necklace')) {
    let beads = '';
    for (let i = 0; i < 7; i += 1) {
      const a = Math.PI * (0.15 + (0.7 * i) / 6);
      beads += `<circle cx="${(80 - 16 * Math.cos(a)).toFixed(1)}" cy="${(134 + 10 * Math.sin(a)).toFixed(1)}" r="2.6" class="${i % 2 ? 'f-ink' : 'f-yellow'}"/>`;
    }
    out += beads;
  }
  if (c.extras.includes('stethoscope')) {
    out += `<path d="M64 136 C60 158 70 168 80 168 C90 168 100 158 96 136" class="s-ink" stroke-width="2.4"/>
      <path d="M96 150 C110 160 108 176 98 180" class="s-ink" stroke-width="2.4"/>
      <circle cx="96" cy="182" r="5.5" class="f-grey card-edge"/>`;
  }
  return out;
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
    ${outerwear(c)}
    <rect x="70" y="106" width="20" height="30" rx="4" fill="${c.skin}"/>
    <rect x="80" y="106" width="10" height="30" fill="${c.shade}"/>
    <ellipse cx="55" cy="92" rx="4.5" ry="7" fill="${c.skin}"/>
    <ellipse cx="105" cy="92" rx="4.5" ry="7" fill="${c.shade}"/>
    <ellipse cx="80" cy="88" rx="25" ry="30" fill="${c.skin}"/>
    <path d="M80 50 V88 L85 101 L80 104 V125 H112 V50 Z" fill="${c.shade}" clip-path="url(#${ids.face})"/>
    ${beard(c)}
    ${eyes(expression)}
    ${brows(expression, c.hair === 'headwrap' || c.hair === 'bucket' ? '#3a2a20' : c.hairColor)}
    <path d="M77 101.5 Q80 103.5 83 101.5" stroke="#000" stroke-opacity="0.35" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    ${mouth(expression)}
    ${mustache(c)}
    ${hairFront(c, ids)}
    ${accessories(c)}`;
}

/* Critter eyes: closed arcs when happy, blinking dots otherwise. */
function critterEyes(expression, y, xs, r = 3) {
  return xs
    .map((x, i) =>
      expression === 'happy' || (expression === 'wink' && i === 0)
        ? `<path d="M${x - 4} ${y + 1} Q${x} ${y - 4} ${x + 4} ${y + 1}" class="s-ink" stroke-width="2" stroke-linecap="round"/>`
        : `<g class="anim-blink"><circle cx="${x}" cy="${y}" r="${expression === 'surprised' ? r + 1 : r}" class="f-ink"/></g>`,
    )
    .join('');
}

const SPECIES = {
  cow: (expression) => `
    <path d="M24 200 C28 160 50 140 80 138 C110 140 132 160 136 200 Z" class="f-verm-deep"/>
    <path d="M63 72 C40 70 20 52 14 16 C28 42 46 56 66 60 Z" class="f-white card-edge"/>
    <path d="M97 72 C120 70 140 52 146 16 C132 42 114 56 94 60 Z" class="f-white card-edge"/>
    <path d="M14 16 L20 30 L24 26 Z M146 16 L140 30 L136 26 Z" class="f-ink"/>
    <ellipse cx="50" cy="84" rx="13" ry="6" transform="rotate(-20 50 84)" fill="#7a3d22"/>
    <ellipse cx="110" cy="84" rx="13" ry="6" transform="rotate(20 110 84)" fill="#7a3d22"/>
    <path d="M58 66 H102 L96 124 Q80 136 64 124 Z" fill="#8f4a2a"/>
    <path d="M80 66 H102 L96 124 Q88 130 80 131 Z" fill="#000" opacity="0.15"/>
    <path d="M70 66 L80 82 L90 66 Z" class="f-white"/>
    <ellipse cx="80" cy="122" rx="17" ry="11" class="f-blush"/>
    <circle cx="73" cy="122" r="2.4" class="f-ink"/><circle cx="87" cy="122" r="2.4" class="f-ink"/>
    ${critterEyes(expression, 92, [69, 91])}`,
  leopard: (expression) => `
    <path d="M24 200 C28 160 50 140 80 138 C110 140 132 160 136 200 Z" class="f-yellow"/>
    <circle cx="54" cy="62" r="11" class="f-yellow card-edge"/><circle cx="106" cy="62" r="11" class="f-yellow card-edge"/>
    <circle cx="54" cy="62" r="5" class="f-ink"/><circle cx="106" cy="62" r="5" class="f-ink"/>
    <circle cx="80" cy="94" r="36" class="f-yellow"/>
    <g class="f-ink">
      <circle cx="62" cy="72" r="3"/><circle cx="96" cy="70" r="3.5"/><circle cx="80" cy="64" r="2.5"/>
      <circle cx="52" cy="98" r="3"/><circle cx="108" cy="100" r="3"/><circle cx="58" cy="116" r="2.4"/>
      <circle cx="104" cy="118" r="2.6"/><circle cx="50" cy="168" r="5"/><circle cx="104" cy="160" r="4"/><circle cx="120" cy="186" r="5"/>
    </g>
    <ellipse cx="80" cy="112" rx="16" ry="12" class="f-white"/>
    <path d="M74 104 H86 L80 111 Z" class="f-verm"/>
    <path d="M80 111 V116 M74 118 Q80 122 86 118" class="s-ink" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M60 110 H40 M60 115 L42 120 M100 110 H120 M100 115 L118 120" class="s-ink" stroke-width="1"/>
    ${critterEyes(expression, 92, [68, 92], 3.4)}`,
  crane: (expression) => `
    <circle cx="84" cy="214" r="56" class="f-grey"/>
    <g transform="translate(-8 46)">${craneHead(expression === 'happy' || expression === 'wink' ? 'happy' : expression === 'sad' ? 'sad' : 'idle')}</g>`,
};

/**
 * Draws a cast member.
 * @param {keyof CAST} id
 * @param {{ expression?: 'neutral'|'happy'|'sad', shape?: 'card'|'circle', label?: string }} [options]
 *   `card` is the framed portrait used in scenes and stories; `circle` is the
 *   compact profile avatar.
 */
export function portrait(id, { expression = 'neutral', shape = 'card', label, animate = true } = {}) {
  const c = CAST[id] ?? CRITTERS[id];
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
      <g transform="translate(80 200) scale(1.1) translate(-80 -200)"><g class="${animate ? 'anim-breathe' : ''}" ${delay()}>${c.species ? SPECIES[c.species](expression) : figure(c, expression, ids)}</g></g>
    </g>`;
  const name = label ?? `${c.name}, ${{ neutral: 'smiling softly', wink: 'winking' }[expression] ?? expression}`;
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
export function portraitGroup(id, { expression = 'neutral', x = 0, y = 0, scale = 1, rotate = 0, animate = true } = {}) {
  const markup = portrait(id, { expression, animate });
  const body = markup.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '').replace(/<title[^>]*>.*?<\/title>/, '');
  return `<g transform="translate(${x} ${y}) rotate(${rotate} 80 100) scale(${scale})">${body}</g>`;
}
