/*
 * Route table. `layout: 'bare'` routes take the full screen; the rest sit
 * inside the app frame with stats and navigation. Routes not marked
 * `public` need a profile and send new visitors to onboarding.
 */
import { styleguideView } from '../views/styleguide.js';
import { createLandingView } from '../views/landing.js';
import { settingsView } from '../views/settings.js';
import { onboardingView } from '../views/onboarding.js';
import { learnView } from '../views/learn.js';
import { lessonView } from '../views/lesson.js';
import { streakView } from '../views/streak.js';
import { practiceHubView, practiceSessionView } from '../views/practice.js';
import { checkpointView } from '../views/checkpoint.js';
import { jumpView } from '../views/jump.js';
import { shopView } from '../views/shop.js';
import { profileView } from '../views/profile.js';
import { guidebookView } from '../views/guidebook.js';
import { storiesView, storyView } from '../views/stories.js';
import { hasProfile } from '../state/store.js';

export const routes = [
  { path: '/', view: createLandingView({ hasProgress: hasProfile }), layout: 'bare', public: true },
  { path: '/onboarding', view: onboardingView, layout: 'bare', public: true, title: 'Get started' },
  { path: '/learn', view: learnView, title: 'Learn' },
  { path: '/lesson/:id', view: lessonView, layout: 'bare', title: 'Lesson' },
  { path: '/checkpoint/:unit', view: checkpointView, layout: 'bare', title: 'Checkpoint' },
  { path: '/jump/:section', view: jumpView, layout: 'bare', title: 'Section test' },
  { path: '/guidebook/:unit', view: guidebookView, title: 'Guidebook' },
  { path: '/stories', view: storiesView, title: 'Stories' },
  { path: '/story/:id', view: storyView, layout: 'bare', title: 'Story' },
  { path: '/streak', view: streakView, title: 'Streak' },
  { path: '/practice', view: practiceHubView, title: 'Practice' },
  { path: '/practice/session', view: practiceSessionView, layout: 'bare', title: 'Practice' },
  { path: '/shop', view: shopView, title: 'Shop' },
  { path: '/profile', view: profileView, title: 'Profile' },
  { path: '/settings', view: settingsView, public: true, title: 'Settings' },
  { path: '/styleguide', view: styleguideView, public: true, title: 'Style guide' },
];
