/*
 * Route table. `layout: 'bare'` routes take the full screen; the rest sit
 * inside the app frame with stats and navigation.
 */
import { placeholderView } from '../views/placeholder.js';
import { styleguideView } from '../views/styleguide.js';
import { createLandingView } from '../views/landing.js';
import { settingsView } from '../views/settings.js';
import { hasProfile } from '../state/store.js';

export const routes = [
  { path: '/', view: createLandingView({ hasProgress: hasProfile }), layout: 'bare' },
  { path: '/onboarding', view: placeholderView('Onboarding', 'Setting up your profile arrives soon.'), layout: 'bare', title: 'Get started' },
  { path: '/learn', view: placeholderView('Your path', 'The learning path arrives soon.'), title: 'Learn' },
  { path: '/lesson/:id', view: placeholderView('Lesson', 'Lessons arrive soon.'), layout: 'bare', title: 'Lesson' },
  { path: '/practice', view: placeholderView('Practice', 'Review sessions arrive soon.'), title: 'Practice' },
  { path: '/leagues', view: placeholderView('Leagues', 'Weekly leagues arrive soon.'), title: 'Leagues' },
  { path: '/shop', view: placeholderView('Shop', 'The shop opens soon.'), title: 'Shop' },
  { path: '/profile', view: placeholderView('Profile', 'Your profile arrives soon.'), title: 'Profile' },
  { path: '/settings', view: settingsView, title: 'Settings' },
  { path: '/styleguide', view: styleguideView, title: 'Style guide' },
];
