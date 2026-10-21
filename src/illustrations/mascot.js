/*
 * The mascot: a grey crowned crane, Uganda's national bird, reduced to
 * Bauhaus geometry. The body is a circle, the wing a quarter-circle, the
 * beak a triangle and the crown a fan of rules tipped with vermillion dots.
 */
import { svg, uid, patterns, polar } from './core.js';
import { delay } from './random.js';
import { propGroup } from './props.js';

export const MASCOT_POSES = ['idle', 'happy', 'sad', 'cheering', 'thinking', 'waving', 'dancing', 'sleeping'];

const HEAD_PIVOT = '89 74';

function crown(pose) {
  const length = pose === 'sad' ? 13 : 20;
  const spread = pose === 'sad' ? [-150, -60] : [-160, -20];
  let lines = '';
  let dots = '';
  const steps = 8;
  for (let i = 0; i <= steps; i += 1) {
    const angle = spread[0] + ((spread[1] - spread[0]) * i) / steps;
    const r = length - Math.abs(i - steps / 2) * 1.2;
    const [x, y] = polar(90, 38, r, angle);
    lines += `M90 38 L${x} ${y} `;
    dots += `<circle cx="${x}" cy="${y}" r="2.2" class="f-verm"/>`;
  }
  return `<path d="${lines}" class="s-ink" stroke-width="1.2"/>${dots}`;
}

function eye(pose) {
  if (pose === 'sleeping') {
    return '<path d="M86.5 55 Q90 58.5 93.5 55" class="s-ink" stroke-width="2" stroke-linecap="round"/>';
  }
  if (pose === 'happy' || pose === 'cheering' || pose === 'dancing' || pose === 'waving') {
    return '<path d="M86.5 56 Q90 51.5 93.5 56" class="s-ink" stroke-width="2" stroke-linecap="round"/>';
  }
  const lid =
    pose === 'sad'
      ? '<path d="M85.5 51.5 L94 54" class="s-ink" stroke-width="1.8" stroke-linecap="round"/>'
      : '';
  return `<g class="anim-blink"><circle cx="90.5" cy="55.5" r="2.7" class="f-ink"/></g>${lid}`;
}

function beak(pose) {
  if (pose === 'happy' || pose === 'cheering' || pose === 'dancing' || pose === 'waving') {
    return `<path d="M72 51 L47 57 L72 58 Z" class="f-grey"/>
      <path d="M72 61 L52 67 L72 66 Z" class="f-grey"/>
      <path d="M72 58 L58 62 L72 61 Z" class="f-verm-deep"/>`;
  }
  return '<path d="M72 51 L47 60 L72 64 Z" class="f-grey"/>';
}

/** The crane's head and neck on their own, for the crane avatar. */
export function craneHead(pose = 'idle') {
  return head(pose);
}

function head(pose) {
  return `
    <rect x="80" y="62" width="18" height="70" rx="9" class="f-grey-light"/>
    <path d="M76 66 C71 75 71 82 76.5 85 C82 82 82 75 79 66 Z" class="f-verm"/>
    ${beak(pose)}
    <circle cx="88" cy="56" r="19" class="f-ink"/>
    <circle cx="93" cy="58" r="9.5" class="f-white"/>
    <path d="M85 49 A8 8 0 0 1 101 49 Z" class="f-verm"/>
    ${eye(pose)}
    ${crown(pose)}`;
}

function wing(rotation, { mirrored = false, raised = false, flap = '' } = {}) {
  const flip = mirrored ? 'translate(200 0) scale(-1 1)' : '';
  const lift = raised ? 'translate(16 -46)' : '';
  // The flap class sits on an untransformed wrapper: a CSS animation would
  // otherwise replace the transform attribute.
  return `<g class="${flap}"><g transform="${flip} ${lift} rotate(${rotation} 100 140)">
      <path d="M100 140 H148 A48 48 0 0 0 100 92 Z" class="f-ink"/>
      <path d="M100 140 H125 A25 25 0 0 0 100 115 Z" class="f-white"/>
      <path d="M100 140 H112 A12 12 0 0 0 100 128 Z" class="f-verm"/>
    </g></g>`;
}

const POSES = {
  idle: { head: 0, wing: 0, raised: false, bob: true, nod: true },
  happy: { head: 6, wing: -10, raised: false, bob: true },
  sad: { head: -18, wing: 12, raised: false, bob: false },
  cheering: { head: 8, wing: 28, raised: true, bob: true, flap: true },
  thinking: { head: 12, wing: 0, raised: false, bob: false, nod: true },
  waving: { head: 6, wing: 20, raised: false, bob: true, wave: true },
  dancing: { head: 10, wing: 20, raised: true, bob: false, flap: true, dance: true },
  sleeping: { head: -14, wing: 8, raised: false, bob: false, breathe: true },
};

function extras(pose) {
  if (pose === 'thinking') {
    return `<g class="anim-drift">
      <circle cx="122" cy="34" r="3.5" class="f-white card-edge"/>
      <circle cx="134" cy="20" r="5.5" class="f-white card-edge"/>
      <circle cx="152" cy="6" r="8.5" class="f-white card-edge"/>
    </g>`;
  }
  if (pose === 'cheering') {
    return `<g class="anim-drift">
      <path d="M30 40 L40 22 L48 42 Z" class="f-verm"/>
      <rect x="160" y="28" width="11" height="11" transform="rotate(20 165 33)" class="f-ink"/>
      <circle cx="176" cy="80" r="6" class="s-ink" stroke-width="1.5"/>
      <path d="M10 150 A9 9 0 0 1 28 150 Z" class="f-ink"/>
      <circle cx="150" cy="10" r="3" class="f-verm"/>
    </g>`;
  }
  if (pose === 'sleeping') {
    return [0, 1, 2]
      .map((i) => `<g class="anim-zzz" style="--d:-${i * 0.9}s"><text x="${118 + i * 10}" y="${40 - i * 12}" font-size="${10 + i * 3}" font-weight="700" class="f-ink" style="font-family: var(--font-display, system-ui, sans-serif)">z</text></g>`)
      .join('');
  }
  if (pose === 'dancing') {
    return `<g class="anim-drift"><path d="M24 54 V30 L34 27 V50" class="s-ink" stroke-width="2"/><circle cx="21" cy="54" r="4" class="f-ink"/><circle cx="31" cy="50" r="4" class="f-ink"/></g>
      <g class="anim-drift" ${delay(9)}><path d="M168 30 V12" class="s-verm" stroke-width="2"/><circle cx="165" cy="30" r="4" class="f-verm"/></g>`;
  }
  if (pose === 'sad') {
    return '<path d="M98 66 C96 71 96 74 98.5 75 C101 74 101 71 99 66 Z" class="f-lavender" stroke="#5a5687" stroke-width="0.6"/>';
  }
  return '';
}

/**
 * Draws the crane mascot.
 * @param {{ pose?: string, label?: string, animate?: boolean, prop?: string }} [options]
 *   `prop` stands one of the props (see props.js) at the crane's feet.
 */
export function mascot({ pose = 'idle', label, animate = true, prop } = {}) {
  const config = POSES[pose];
  if (!config) throw new Error(`Unknown mascot pose: ${pose}`);
  return svg({
    viewBox: '0 0 200 220',
    label: label ?? `The crane mascot, ${pose}`,
    className: 'ill--mascot',
    body: mascotGroup({ pose, animate, prop }),
  });
}

/** The crane without its <svg> wrapper, for composing into scenes. */
export function mascotGroup({ pose = 'idle', animate = true, x = 0, y = 0, scale = 1, prop } = {}) {
  const config = POSES[pose];
  const tex = patterns(uid('crane'));
  const a = (name, on = true) => (animate && on ? name : '');
  const body = `
      <path d="M93 170 L89 206 M109 170 L113 206" class="s-ink" stroke-width="3" stroke-linecap="round"/>
      <path d="M80 206 H97 M105 206 H122" class="s-ink" stroke-width="3" stroke-linecap="round"/>
      <path d="M138 146 L176 176 L134 168 Z" class="f-ink"/>
      <circle cx="100" cy="140" r="48" class="f-grey"/>
      <path d="M52 140 A48 48 0 0 0 100 188 V140 Z" fill="${tex.hatch}" opacity="0.55"/>
      ${config.raised ? wing(config.wing, { mirrored: true, raised: true, flap: a('anim-flap-r', config.flap) }) : ''}
      ${wing(config.wing, { raised: config.raised || config.wave, flap: a(config.wave ? 'anim-wave-wing' : 'anim-flap', config.flap || config.wave) })}
      <g transform="rotate(${config.head} ${HEAD_PIVOT})"><g class="${a('anim-nod', config.nod)}" ${delay(6)}>${head(pose)}</g></g>`;
  const motion = config.dance ? 'anim-dance' : config.breathe ? 'anim-breathe' : config.bob ? 'anim-bob' : '';
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <defs>${tex.defs}</defs>
    <ellipse cx="102" cy="208" rx="48" ry="4.5" class="f-rule" opacity="0.14"/>
    <g class="${a(motion)}">${body}</g>
    ${extras(pose)}
    ${prop ? propGroup(prop, { x: 2, y: 150, scale: 0.9 }) : ''}
  </g>`;
}
