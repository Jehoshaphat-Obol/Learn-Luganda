/*
 * A small single-series bar chart in HTML: one hue, thin bars with rounded
 * data ends on a quiet baseline, a value on hover/focus (always shown for
 * the highlighted bar), and a visually hidden table for screen readers.
 * HTML rather than SVG so text stays the same size at any width.
 */
import { escapeHtml } from './components.js';
import { t } from '../i18n/index.js';

/**
 * @param {Array<{ label: string, long: string, value: number, highlight?: boolean }>} data
 * @param {{ unit?: string, caption: string, goal?: number }} options
 */
export function barChart(data, { unit = '', caption, goal } = {}) {
  const max = Math.max(goal ?? 0, ...data.map((d) => d.value), 1) * 1.1;
  const pct = (v) => `${(v / max) * 100}%`;
  return `<figure class="chart" aria-label="${escapeHtml(caption)}">
    <div class="chart__plot" aria-hidden="true">
      ${goal ? `<div class="chart__goal" style="bottom:${pct(goal)}"><span>${escapeHtml(t('ui.chartGoal', { goal }))}</span></div>` : ''}
      ${data
        .map(
          (d) => `<div class="bar${d.highlight ? ' bar--today' : ''}" title="${escapeHtml(t('ui.chartBar', { day: d.long, value: d.value, unit }))}">
            <span class="bar__mark" style="height:${d.value ? `max(3px, ${pct(d.value)})` : '0'}"><span class="bar__value">${d.value}</span></span>
          </div>`,
        )
        .join('')}
    </div>
    <div class="chart__labels" aria-hidden="true">${data.map((d) => `<span${d.highlight ? ' class="is-today"' : ''}>${escapeHtml(d.label)}</span>`).join('')}</div>
    <figcaption class="visually-hidden">${escapeHtml(caption)}</figcaption>
    <table class="visually-hidden">
      <thead><tr><th scope="col">${escapeHtml(t('ui.chartDay'))}</th><th scope="col">${escapeHtml(unit)}</th></tr></thead>
      <tbody>${data.map((d) => `<tr><td>${escapeHtml(d.long)}</td><td>${d.value}</td></tr>`).join('')}</tbody>
    </table>
  </figure>`;
}
