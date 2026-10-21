import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/layout.css';

import { createRouter } from './app/router.js';
import { createShell, refreshMusicButton, refreshTopBar, setStatsProvider } from './app/shell.js';
import { store, hasProfile } from './state/store.js';
import { heartStatus } from './state/hearts.js';
import { settleStreak, streakStatus } from './state/streak.js';
import { routes } from './app/routes.js';
import { applyMotion } from './ui/motion.js';
import { preload } from './ui/sound.js';
import { initMusic, setMusicScene, toggleMusic } from './ui/music.js';
import { registerServiceWorker } from './app/pwa.js';
import { startReminders } from './reminders/reminders.js';

setStatsProvider(() => {
  const s = store.get();
  const hearts = heartStatus(s);
  const streak = streakStatus(s);
  return { streak: streak.current, gems: s.gems, hearts: hearts.count, maxHearts: hearts.max, streakToday: streak.doneToday };
});
// Apply any missed days (freezes or a reset) as soon as the app opens.
if (store.get().streak.lastDay) store.update((s) => settleStreak(s));
store.subscribe(refreshTopBar);
applyMotion();
store.subscribe(applyMotion);

const shell = createShell(document.querySelector('#app'));
const router = createRouter({
  routes,
  onChange: (match) => {
    if (!match.route.public && !hasProfile()) {
      router.navigate('/onboarding', { replace: true });
      return;
    }
    shell.render(match, router.navigate);
    setMusicScene((match.route.layout ?? 'app') === 'app' && hasProfile());
  },
});
initMusic();
// Effects load after the first interaction, when audio is allowed to start.
document.addEventListener('pointerdown', () => preload(), { once: true });
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-music-toggle]')) toggleMusic();
});
store.subscribe(refreshMusicButton);
router.start();
registerServiceWorker();
startReminders();
