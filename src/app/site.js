/*
 * Site details shown on the About, Contact, Terms and Privacy pages.
 * `contactEmail` stays empty until the owner picks a public address; the
 * Contact page then falls back to GitHub issues.
 */
export const SITE = {
  name: 'Learn Luganda',
  contactEmail: import.meta.env?.VITE_CONTACT_EMAIL ?? '',
  repoUrl: 'https://github.com/Jehoshaphat-Obol/Learn-Luganda',
  issuesUrl: 'https://github.com/Jehoshaphat-Obol/Learn-Luganda/issues/new',
};

export const SITE_PAGES = [
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/privacy', label: 'Privacy' },
  { path: '/terms', label: 'Terms' },
];

/** A row of links to the site pages, for footers. */
export function siteLinks(className = 'site-links') {
  return `<nav class="${className}" aria-label="About this site">${SITE_PAGES.map((p) => `<a href="#${p.path}">${p.label}</a>`).join('')}</nav>`;
}
