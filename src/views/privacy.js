/*
 * Privacy policy. Learn Luganda keeps learning data in the browser; the only
 * third parties are Google Fonts and, once configured, Google AdSense and
 * the Meta Pixel. Text comes from the UI pack (`pages.privacy.*`).
 */
import { adsConfigured } from '../ads/ads.js';
import { siteLinks } from '../app/site.js';
import { pixelConfigured } from '../marketing/pixel.js';
import { t, tHtml } from '../i18n/index.js';
import { escapeHtml } from '../ui/components.js';
import { pageParams, part, updated } from './info.js';

export function privacyView({ root }) {
  const p = pageParams();
  const text = (key) => tHtml(`pages.privacy.${key}`, p);
  root.innerHTML = `
    <div class="page prose">
      <header class="page__header">
        <p class="eyebrow">${escapeHtml(t('pages.privacy.eyebrow'))}</p>
        <h1>${text('title')}</h1>
        <p class="caption">${escapeHtml(updated())}</p>
      </header>

      ${part('privacy', 'keep', p)}

      <h2 id="ads">${escapeHtml(t('pages.privacy.adsTitle'))}</h2>
      <p>${text(adsConfigured() ? 'adsOn' : 'adsOff')} ${text('adsWhere')}</p>
      <p>${text('cookies')}</p>
      <p>${text('google')}</p>
      <p>${text('offline')}</p>

      <h2 id="pixel">${escapeHtml(t('pages.privacy.pixelTitle'))}</h2>
      <p>${text(pixelConfigured() ? 'pixelOn' : 'pixelOff')} ${text('pixel')}</p>
      <p>${text('meta')}</p>

      ${['fonts', 'children', 'changes'].map((k) => part('privacy', k, p)).join('')}
      ${siteLinks('site-links site-links--page')}
    </div>`;
}
