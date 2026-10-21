import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/layout.css';

import { createRouter } from './app/router.js';
import { createShell, refreshTopBar, setStatsProvider } from './app/shell.js';
import { store, hasProfile } from './state/store.js';
import { heartStatus } from './state/hearts.js';
import { routes } from './app/routes.js';

setStatsProvider(() => {
  const s = store.get();
  const hearts = heartStatus(s);
  return { streak: s.streak.current, gems: s.gems, hearts: hearts.count, maxHearts: hearts.max, streakToday: false };
});
store.subscribe(refreshTopBar);

const shell = createShell(document.querySelector('#app'));
const router = createRouter({
  routes,
  onChange: (match) => {
    if (!match.route.public && !hasProfile()) {
      router.navigate('/onboarding', { replace: true });
      return;
    }
    shell.render(match, router.navigate);
  },
});
router.start();
