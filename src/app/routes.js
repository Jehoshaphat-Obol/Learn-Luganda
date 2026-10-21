/*
 * Route table. `layout: 'bare'` routes take the full screen; the rest sit
 * inside the app frame with stats and navigation. Routes not marked
 * `public` need a profile and send new visitors to onboarding. `title` is
 * a UI pack key.
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
import { completeView } from '../views/complete.js';
import { shopView } from '../views/shop.js';
import { profileView } from '../views/profile.js';
import { guidebookView } from '../views/guidebook.js';
import { storiesView, storyView } from '../views/stories.js';
import { privacyView } from '../views/privacy.js';
import { aboutView, contactView, termsView } from '../views/info.js';
import { hasProfile } from '../state/store.js';

export const routes = [
  { path: '/', view: createLandingView({ hasProgress: hasProfile }), layout: 'bare', public: true },
  { path: '/onboarding', view: onboardingView, layout: 'bare', public: true, title: 'titles.onboarding' },
  { path: '/learn', view: learnView, title: 'titles.learn' },
  { path: '/lesson/:id', view: lessonView, layout: 'bare', title: 'titles.lesson' },
  { path: '/checkpoint/:unit', view: checkpointView, layout: 'bare', title: 'titles.checkpoint' },
  { path: '/jump/:section', view: jumpView, layout: 'bare', title: 'titles.jump' },
  { path: '/complete', view: completeView, layout: 'bare', title: 'titles.complete' },
  { path: '/guidebook/:unit', view: guidebookView, title: 'titles.guidebook' },
  { path: '/stories', view: storiesView, title: 'titles.stories' },
  { path: '/story/:id', view: storyView, layout: 'bare', title: 'titles.story' },
  { path: '/streak', view: streakView, title: 'titles.streak' },
  { path: '/practice', view: practiceHubView, title: 'titles.practice' },
  { path: '/practice/session', view: practiceSessionView, layout: 'bare', title: 'titles.practice' },
  { path: '/shop', view: shopView, title: 'titles.gems' },
  { path: '/profile', view: profileView, title: 'titles.profile' },
  { path: '/settings', view: settingsView, public: true, title: 'titles.settings' },
  { path: '/privacy', view: privacyView, public: true, title: 'titles.privacy' },
  { path: '/about', view: aboutView, public: true, title: 'titles.about' },
  { path: '/contact', view: contactView, public: true, title: 'titles.contact' },
  { path: '/terms', view: termsView, public: true, title: 'titles.terms' },
  { path: '/styleguide', view: styleguideView, public: true, title: 'titles.styleguide' },
];
