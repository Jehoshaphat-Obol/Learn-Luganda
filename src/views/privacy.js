/*
 * Privacy policy. Learn Luganda keeps learning data in the browser; the only
 * third parties are Google Fonts and, once configured, Google AdSense and
 * the Meta Pixel.
 */
import { adsConfigured } from '../ads/ads.js';
import { siteLinks } from '../app/site.js';
import { pixelConfigured } from '../marketing/pixel.js';

export function privacyView({ root }) {
  root.innerHTML = `
    <div class="page prose">
      <header class="page__header">
        <p class="eyebrow">Privacy</p>
        <h1>Your data <strong>stays with you.</strong></h1>
        <p class="caption">Last updated 21 October 2026</p>
      </header>

      <h2>What we keep</h2>
      <p>Learn Luganda has no accounts and no server of its own. Your name, avatar, progress, streak, XP and settings are saved in your browser’s local storage on this device. We never see them. You can export, import or erase them at any time in <a href="#/settings">Settings</a>.</p>

      <h2 id="ads">Ads</h2>
      <p>${adsConfigured() ? 'Learn Luganda is free and is supported by ads from Google AdSense.' : 'Learn Luganda may show ads from Google AdSense to stay free.'} Ads appear only in a few places, such as between sections of the learning path and on the lesson complete screen, and are always marked <strong>Sponsored</strong>. They never appear inside a lesson, practice session or story.</p>
      <p>Google and its partners use cookies to serve ads. If you choose <em>Allow</em>, Google may use cookies to show ads based on your visits to this and other websites. If you choose <em>Basic ads only</em>, Google shows non-personalised ads, though it may still use cookies to limit how often an ad appears and to prevent fraud. You can change your choice in <a href="#/settings">Settings</a> at any time.</p>
      <p>Learn more in <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">how Google uses information from sites that use its services</a>, and manage personalised ads at <a href="https://adssettings.google.com" target="_blank" rel="noopener">Google Ads Settings</a>.</p>
      <p>When you’re offline, no ads are loaded.</p>

      <h2 id="pixel">Facebook (Meta Pixel)</h2>
      <p>${pixelConfigured() ? 'We use the Meta Pixel to see whether our Facebook and Instagram ads bring new learners.' : 'We may use the Meta Pixel to see whether our Facebook and Instagram ads bring new learners.'} It loads only if you choose <em>Allow</em> on the Facebook card or in <a href="#/settings">Settings</a>. When allowed, Meta receives which screens you open, when you finish onboarding, when you finish a lesson (its type and XP) and streak milestones, along with what your browser normally sends, such as your IP address and Meta cookies. Your name, avatar, answers and progress are never sent. Choose <em>No thanks</em>, or switch it off in Settings, and nothing more goes to Meta.</p>
      <p>Learn more in <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener">Meta’s privacy policy</a>.</p>

      <h2>Fonts</h2>
      <p>Text is set in fonts served by Google Fonts, so your browser requests them from Google the first time you visit. After that they’re cached on your device.</p>

      <h2>Children</h2>
      <p>We don’t knowingly collect personal information from anyone. Because ads may be personalised only with your consent, parents can choose <em>Basic ads only</em> for younger learners.</p>

      <h2>Changes</h2>
      <p>If this policy changes, the date at the top changes with it. Questions? <a href="#/contact">Contact us</a>.</p>
      ${siteLinks('site-links site-links--page')}
    </div>`;
}
