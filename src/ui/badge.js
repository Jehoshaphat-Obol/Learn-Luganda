/*
 * Achievement badges drawn from Bauhaus shapes: the achievement's shape in
 * a tier colour, its icon in the middle and the tier as Roman numerals.
 */
import { icon } from './icons.js';

const TIER_COLORS = ['var(--color-paper-300)', 'var(--color-vermillion-300)', 'var(--color-primary)', 'var(--color-gold)', 'var(--color-ink-900)', 'var(--color-bauhaus-blue)'];
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V'];

const SHAPES = {
  circle: '<circle cx="50" cy="50" r="44"/>',
  square: '<rect x="8" y="8" width="84" height="84" rx="10"/>',
  triangle: '<path d="M50 4 L96 88 H4 Z"/>',
  half: '<path d="M6 70 A44 44 0 0 1 94 70 V92 H6 Z"/>',
};

export function badge({ shape = 'circle', iconName = 'star', tier = 0, size = 72, label = '' }) {
  const fill = TIER_COLORS[Math.min(tier, TIER_COLORS.length - 1)];
  const fg = tier === 0 ? 'var(--color-ink-500)' : tier === 3 ? 'var(--color-ink-900)' : '#fff';
  return `<span class="badge${tier ? '' : ' badge--locked'}" style="--badge-size:${size}px;--badge-fg:${fg}" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}>
    <svg viewBox="0 0 100 100" aria-hidden="true"><g fill="${fill}">${SHAPES[shape]}</g><circle cx="82" cy="18" r="10" fill="var(--color-surface)" stroke="var(--color-ink-900)" stroke-width="2"/></svg>
    <span class="badge__icon">${icon(iconName, { size: Math.round(size * 0.38) })}</span>
    ${tier ? `<span class="badge__tier">${ROMAN[tier]}</span>` : ''}
  </span>`;
}
