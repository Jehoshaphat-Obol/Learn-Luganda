import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/layout.css';

import { createRouter } from './app/router.js';
import { createShell, refreshTopBar, setStatsProvider } from './app/shell.js';
import { store } from './state/store.js';
import { routes } from './app/routes.js';

setStatsProvider(() => {
  const s = store.get();
  return { streak: s.streak.current, gems: s.gems, hearts: s.hearts.count, maxHearts: 5, streakToday: false };
});
store.subscribe(refreshTopBar);

const shell = createShell(document.querySelector('#app'));
const router = createRouter({
  routes,
  onChange: (match) => shell.render(match, router.navigate),
});
router.start();
