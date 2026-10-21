/*
 * About, Contact and Terms: the plain pages every site needs, and which
 * AdSense reviewers look for alongside the privacy policy.
 */
import { SITE, siteLinks } from '../app/site.js';
import { escapeHtml } from '../ui/components.js';

function page(root, { eyebrow, title, body }) {
  root.innerHTML = `
    <div class="page prose">
      <header class="page__header">
        <p class="eyebrow">${eyebrow}</p>
        <h1>${title}</h1>
      </header>
      ${body}
      ${siteLinks('site-links site-links--page')}
    </div>`;
}

export function aboutView({ root }) {
  page(root, {
    eyebrow: 'About',
    title: 'Luganda, <strong>a little every day.</strong>',
    body: `
      <p>${SITE.name} is a free course for anyone who wants to speak Luganda, the most widely spoken language in Uganda. Short, game-like lessons take you from greetings to everyday conversations about family, food, the market, travel, health and more.</p>
      <h2>How it works</h2>
      <p>Each unit introduces a handful of words and phrases, then practises them in many ways: picking pictures, building sentences, listening, typing and matching. Words you find hard come back for review at the right time, and stories let you read along with the cast. Streaks, XP and a daily goal help you keep going.</p>
      <h2>No account needed</h2>
      <p>There is nothing to sign up for. Your progress is saved on your own device, and the app keeps working offline once it has loaded. You can export your progress in <a href="#/settings">Settings</a> to back it up or move it to another device.</p>
      <h2>Free, with a few ads</h2>
      <p>Lessons are free. To cover running costs, a few clearly marked sponsored cards may appear between sections of the path and after a lesson, never during one. See the <a href="#/privacy">privacy policy</a> for how ads work.</p>
      <h2>Open source</h2>
      <p>The app is built in the open on <a href="${SITE.repoUrl}" target="_blank" rel="noopener">GitHub</a>. Corrections to the Luganda are always welcome.</p>`,
  });
}

export function contactView({ root }) {
  const email = SITE.contactEmail
    ? `<p>Email us at <a href="mailto:${escapeHtml(SITE.contactEmail)}">${escapeHtml(SITE.contactEmail)}</a>. We usually reply within a few days.</p>`
    : '';
  page(root, {
    eyebrow: 'Contact',
    title: 'Say <strong>hello.</strong>',
    body: `
      <p>Spotted a mistake in a lesson, have an idea, or a question about the app or its ads? We’d love to hear from you.</p>
      ${email}
      <p>You can also <a href="${SITE.issuesUrl}" target="_blank" rel="noopener">open an issue on GitHub</a>. For a language correction, include the unit and the sentence so we can find it quickly.</p>
      <p>We can’t see your progress, so if you’re asking about it, describe what happened in your message.</p>`,
  });
}

export function termsView({ root }) {
  page(root, {
    eyebrow: 'Terms',
    title: 'Terms of <strong>use.</strong>',
    body: `
      <p class="caption">Last updated 21 October 2026</p>
      <p>By using ${SITE.name} you agree to these terms. If you don’t agree, please don’t use the app.</p>
      <h2>Using the app</h2>
      <p>${SITE.name} is free for personal learning. Please don’t try to disrupt the site, copy it to pass off as your own, or click ads on purpose to inflate them.</p>
      <h2>Your data</h2>
      <p>Your progress lives in your browser. Clearing your browser data, or using a different device or browser, starts you afresh unless you export and import your progress. We can’t recover lost progress for you. See the <a href="#/privacy">privacy policy</a> for more.</p>
      <h2>Ads</h2>
      <p>The app may show ads from Google AdSense, always marked Sponsored. Products and services in ads come from their advertisers, not from us, and we don’t endorse them.</p>
      <h2>Content</h2>
      <p>We work hard to keep translations accurate, but Luganda varies between speakers and regions and mistakes happen. The course is offered as it is, without any warranty. The app’s code is published on <a href="${SITE.repoUrl}" target="_blank" rel="noopener">GitHub</a>.</p>
      <h2>Changes</h2>
      <p>We may update the app and these terms. When the terms change, the date at the top changes too. Questions? <a href="#/contact">Contact us</a>.</p>`,
  });
}
