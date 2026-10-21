/*
 * Site details shown on the About, Contact, Terms and Privacy pages.
 * `contactEmail` stays empty until the owner picks a public address; the
 * Contact page then falls back to GitHub issues.
 */
import { t } from '../i18n/index.js';
import { escapeHtml } from '../ui/components.js';

export const SITE = {
  contactEmail: import.meta.env?.VITE_CONTACT_EMAIL ?? '',
  repoUrl: 'https://github.com/Jehoshaphat-Obol/Learn-Luganda',
  issuesUrl: 'https://github.com/Jehoshaphat-Obol/Learn-Luganda/issues/new',
};

// `label` is a UI pack key.
export const SITE_PAGES = [
  { path: '/about', label: 'site.about' },
  { path: '/contact', label: 'site.contact' },
  { path: '/privacy', label: 'site.privacy' },
  { path: '/terms', label: 'site.terms' },
];

/** A row of links to the site pages, for footers. */
export function siteLinks(className = 'site-links') {
  return `<nav class="${className}" aria-label="${escapeHtml(t('site.label'))}">${SITE_PAGES.map((p) => `<a href="#${p.path}">${escapeHtml(t(p.label))}</a>`).join('')}</nav>`;
}
