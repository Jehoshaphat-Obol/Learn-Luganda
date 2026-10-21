/* A learner's avatar: a cast portrait in a circle on their chosen colour. */
import { portrait } from '../illustrations/index.js';
import { escapeHtml } from './components.js';

export function avatar({ character = 'nakato', color = 'vermillion' } = {}, { size = 48, label = '' } = {}) {
  return `<span class="avatar avatar--${escapeHtml(color)}" style="--avatar-size:${size}px"${label ? ` title="${escapeHtml(label)}"` : ''}>
    ${portrait(character, { shape: 'circle', expression: 'happy', label: label || 'Avatar' })}
  </span>`;
}
