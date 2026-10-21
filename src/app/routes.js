/*
 * Route table. `layout: 'bare'` routes take the full screen; the rest sit
 * inside the app frame with stats and navigation. Routes not marked
 * `public` need a profile and send new visitors to onboarding.
 */
import { placeholderView } from '../views/placeholder.js';
import { styleguideView } from '../views/styleguide.js';
import { createLandingView } from '../views/landing.js';
import { settingsView } from '../views/settings.js';
import { onboardingView } from '../views/onboarding.js';
import { learnView } from '../views/learn.js';
import { lessonView } from '../views/lesson.js';
import { hasProfile } from '../state/store.js';

export const routes = [
  { path: '/', view: createLandingView({ hasProgress: hasProfile }), layout: 'bare', public: true },
  { path: '/onboarding', view: onboardingView, layout: 'bare', public: true, title: 'Get started' },
  { path: '/learn', view: learnView, title: 'Learn' },
  { path: '/lesson/:id', view: lessonView, layout: 'bare', title: 'Lesson' },
  { path: '/checkpoint/:unit', view: placeholderView('Checkpoint', 'Unit checkpoints arrive soon.'), layout: 'bare', title: 'Checkpoint' },
  { path: '/guidebook/:unit', view: placeholderView('Guidebook', 'Unit guidebooks arrive soon.'), title: 'Guidebook' },
  { path: '/practice', view: placeholderView('Practice', 'Review sessions arrive soon.'), title: 'Practice' },
  { path: '/leagues', view: placeholderView('Leagues', 'Weekly leagues arrive soon.'), title: 'Leagues' },
  { path: '/shop', view: placeholderView('Shop', 'The shop opens soon.'), title: 'Shop' },
  { path: '/profile', view: placeholderView('Profile', 'Your profile arrives soon.'), title: 'Profile' },
  { path: '/settings', view: settingsView, public: true, title: 'Settings' },
  { path: '/styleguide', view: styleguideView, public: true, title: 'Style guide' },
];
