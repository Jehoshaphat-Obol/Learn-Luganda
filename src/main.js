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
import { startTheme } from './ui/theme.js';
import { preload } from './ui/sound.js';
import { initMusic, setMusicScene, toggleMusic } from './ui/music.js';
import { initInstall, registerServiceWorker } from './app/pwa.js';
import { startReminders } from './reminders/reminders.js';
import { applyBrandMood, brandMood } from './app/brand-mood.js';
import { brandScene, refreshWeather } from './app/brand-scene.js';
import { startLanguages } from './app/languages.js';
import { pixelOnRoute } from './marketing/pixel.js';
import { startSpeech } from './audio/speech.js';

setStatsProvider(() => {
  const s = store.get();
  const hearts = heartStatus(s);
  const streak = streakStatus(s);
  return { streak: streak.current, gems: s.gems, hearts: hearts.count, maxHearts: hearts.max, streakToday: streak.doneToday };
});
// Apply any missed days (freezes or a reset) as soon as the app opens.
if (store.get().streak.lastDay) store.update((s) => settleStreak(s));
store.subscribe(refreshTopBar);
const refreshBrand = () => {
  const s = store.get();
  const weather = s.settings.weather === true;
  applyBrandMood(brandMood(s), document, brandScene(new Date(), { weather }));
  // New weather (at most hourly, only if the learner turned it on) redraws the crane.
  if (weather) refreshWeather().then((fresh) => fresh && refreshBrand());
};
store.subscribe(refreshBrand);
// The mood and sky depend on the time, so re-check when the app comes back
// into view and every few minutes while it stays open.
document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && refreshBrand());
setInterval(() => document.visibilityState === 'visible' && refreshBrand(), 5 * 60 * 1000);
applyMotion();
store.subscribe(applyMotion);
startTheme();

const shell = createShell(document.querySelector('#app'));
const router = createRouter({
  routes,
  onChange: (match) => {
    if (!match.route.public && !hasProfile()) {
      router.navigate('/onboarding', { replace: true });
      return;
    }
    shell.render(match, router.navigate);
    refreshBrand();
    setMusicScene((match.route.layout ?? 'app') === 'app' && hasProfile());
    pixelOnRoute(match);
  },
});
initMusic();
// Effects load after the first interaction, when audio is allowed to start.
document.addEventListener('pointerdown', () => preload(), { once: true });
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-music-toggle]')) toggleMusic();
});
store.subscribe(refreshMusicButton);
// The UI language and the course load before the first screen renders.
// Device voices load too, so speaker buttons know whether they can speak.
Promise.all([startLanguages(() => router.refresh()), startSpeech()]).then(() => {
  router.start();
  startReminders();
});
initInstall();
registerServiceWorker();
