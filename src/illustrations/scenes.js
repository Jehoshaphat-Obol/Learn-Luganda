/*
 * Scene compositions: the cast and mascot arranged with the editorial
 * furniture (paper panels, crop marks, rulers, captions) for the landing
 * hero, the lesson complete screen and the streak celebration.
 */
import { svg, uid, patterns, cropMarks, crosshair, tickRuler, caption, pill, escapeXml } from './core.js';
import { portraitGroup } from './characters.js';
import { mascotGroup } from './mascot.js';

/** Landing page hero: two learners, the crane and a Bauhaus still life. */
export function heroScene({ label = 'Nakato and Mukasa greet you beside the crane mascot' } = {}) {
  const tex = patterns(uid('hero'));
  return svg({
    viewBox: '0 0 560 420',
    label,
    className: 'ill--scene',
    body: `<defs>${tex.defs}</defs>
      <circle cx="70" cy="58" r="9" class="s-rule" stroke-width="1.4"/>
      ${crosshair(522, 40)}
      <g>
        <rect x="206" y="52" width="196" height="226" class="f-paper-light"/>
        <rect x="224" y="70" width="44" height="40" fill="${tex.hatch}"/>
        <g class="anim-spin"><circle cx="336" cy="122" r="62" class="f-verm"/></g>
        <circle cx="336" cy="122" r="9" class="f-white"/>
        <path d="M206 170 H402" class="s-ink" stroke-width="1"/>
        <path d="M218 268 V184 A84 84 0 0 1 302 268 Z" class="f-ink"/>
        <rect x="312" y="178" width="46" height="14" fill="${tex.grid}"/>
      </g>
      ${cropMarks(196, 42, 216, 246, 12)}
      <path d="M446 150 L459 174 L433 174 Z" class="f-verm anim-drift"/>
      ${portraitGroup('nakato', { x: 84, y: 82, scale: 0.86, rotate: -4, expression: 'happy' })}
      ${portraitGroup('mukasa', { x: 316, y: 200, scale: 0.68, rotate: 4 })}
      ${pill(150, 300, 'Oli otya?')}
      <rect x="250" y="306" width="24" height="24" fill="${tex.grid}"/>
      ${mascotGroup({ pose: 'happy', x: 12, y: 238, scale: 0.72 })}
      ${caption(476, 360, 'okuyiga — v. to learn, a little every day', { anchor: 'end' })}
      ${tickRuler(436, 392, 78, { step: 6, label: 'LESSON Nº 001' })}`,
  });
}

/** Lesson complete: the crane cheers on a vermillion sun. */
export function lessonCompleteScene({ xp = 15, label } = {}) {
  const tex = patterns(uid('done'));
  return svg({
    viewBox: '0 0 400 360',
    label: label ?? `Lesson complete. The crane cheers. You earned ${xp} XP.`,
    className: 'ill--scene',
    body: `<defs>${tex.defs}</defs>
      ${cropMarks(16, 16, 368, 328, 14)}
      <path d="M40 300 V200 A100 100 0 0 1 140 300 Z" class="f-ink"/>
      <rect x="306" y="40" width="48" height="40" fill="${tex.hatch}"/>
      <rect x="48" y="52" width="40" height="30" fill="${tex.dots}"/>
      <g class="anim-spin"><circle cx="210" cy="160" r="104" class="f-verm"/></g>
      <path d="M100 236 H330" class="s-rule" stroke-width="1"/>
      ${mascotGroup({ pose: 'cheering', x: 86, y: 34, scale: 1.12 })}
      ${pill(140, 282, `Weebale nnyo!  +${xp} XP`, { size: 10 })}
      ${caption(364, 330, 'weebale — thank you, well done', { anchor: 'end' })}
      <text class="mono" x="36" y="34" font-size="7">Nº 01 — LESSON COMPLETE</text>`,
  });
}

/** Streak celebration: a Bauhaus flame and a week of day dots. */
export function streakScene({ days = 7, label } = {}) {
  const tex = patterns(uid('streak'));
  const week = Math.min(days, 7);
  let dots = '';
  for (let i = 0; i < 7; i += 1) {
    const cx = 110 + i * 30;
    dots +=
      i < week
        ? `<circle cx="${cx}" cy="318" r="9" class="f-verm"/>`
        : `<circle cx="${cx}" cy="318" r="9" class="s-rule" stroke-width="1.2"/>`;
  }
  return svg({
    viewBox: '0 0 400 360',
    label: label ?? `A ${days} day streak flame`,
    className: 'ill--scene',
    body: `<defs>${tex.defs}</defs>
      ${cropMarks(70, 24, 260, 266, 12)}
      <rect x="92" y="44" width="216" height="226" class="f-paper-light"/>
      <rect x="250" y="56" width="44" height="34" fill="${tex.dots}"/>
      <path d="M92 270 V214 A56 56 0 0 1 148 270 Z" class="f-ink"/>
      <g class="anim-bob">
        <path d="M200 58 C200 58 266 132 266 190 A66 66 0 0 1 134 190 C134 132 200 58 200 58 Z" class="f-verm"/>
        <path d="M200 58 C200 58 266 132 266 190 A66 66 0 0 1 200 256 Z" class="f-verm-deep" opacity="0.35"/>
        <path d="M200 136 C200 136 234 176 234 206 A34 34 0 0 1 166 206 C166 176 200 136 200 136 Z" class="f-ink"/>
        <circle cx="200" cy="210" r="22" class="f-paper-light"/>
        <text x="200" y="219" text-anchor="middle" font-size="26" font-weight="700" class="f-ink" style="font-family: var(--font-display, system-ui, sans-serif)">${escapeXml(days)}</text>
      </g>
      <path d="M92 270 H308" class="s-ink" stroke-width="1"/>
      ${dots}
      ${caption(308, 350, 'olunaku — n. day; keep the fire going', { anchor: 'end' })}
      ${tickRuler(92, 296, 66, { step: 6 })}
      <text class="mono" x="308" y="38" font-size="7" text-anchor="end">STREAK Nº ${escapeXml(days)}</text>`,
  });
}
