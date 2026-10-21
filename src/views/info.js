/*
 * About, Contact and Terms: the plain pages every site needs, and which
 * AdSense reviewers look for alongside the privacy policy. All text comes
 * from the UI pack (`pages.*`), with the course's language filled in.
 */
import { SITE, siteLinks } from '../app/site.js';
import { course, languageName } from '../content/course.js';
import { t, tHtml } from '../i18n/index.js';
import { escapeHtml } from '../ui/components.js';

/** When the Terms and Privacy pages last changed. */
export const UPDATED = new Date(2026, 9, 21);

/** "Last updated …" in the interface language. */
export const updated = () => t('pages.updated', { date: UPDATED.toLocaleDateString(document.documentElement.lang || 'en', { day: 'numeric', month: 'long', year: 'numeric' }) });

/** Values every page's text can use. */
export const pageParams = () => ({ app: t('app.name'), language: languageName('target'), repo: SITE.repoUrl, issues: SITE.issuesUrl, description: course.pack?.meta?.description ?? '' });

/** A heading and paragraph from `pages.<page>.<key>Title` and `.<key>`. */
export const part = (page, key, params = pageParams()) => `<h2>${escapeHtml(t(`pages.${page}.${key}Title`))}</h2><p>${tHtml(`pages.${page}.${key}`, params)}</p>`;

export function page(root, name, body) {
  root.innerHTML = `
    <div class="page prose">
      <header class="page__header">
        <p class="eyebrow">${escapeHtml(t(`pages.${name}.eyebrow`))}</p>
        <h1>${tHtml(`pages.${name}.title`, pageParams())}</h1>
      </header>
      ${body}
      ${siteLinks('site-links site-links--page')}
    </div>`;
}

export function aboutView({ root }) {
  const p = pageParams();
  page(root, 'about', `
    <p>${tHtml('pages.about.intro', p)}</p>
    ${['how', 'account', 'ads', 'open'].map((k) => part('about', k, p)).join('')}`);
}

export function contactView({ root }) {
  const p = { ...pageParams(), email: SITE.contactEmail };
  page(root, 'contact', `
    <p>${tHtml('pages.contact.intro', p)}</p>
    ${SITE.contactEmail ? `<p>${tHtml('pages.contact.email', p)}</p>` : ''}
    <p>${tHtml('pages.contact.issues', p)}</p>
    <p>${tHtml('pages.contact.progress', p)}</p>`);
}

export function termsView({ root }) {
  const p = pageParams();
  page(root, 'terms', `
    <p class="caption">${escapeHtml(updated())}</p>
    <p>${tHtml('pages.terms.intro', p)}</p>
    ${['use', 'data', 'ads', 'content', 'changes'].map((k) => part('terms', k, p)).join('')}`);
}
