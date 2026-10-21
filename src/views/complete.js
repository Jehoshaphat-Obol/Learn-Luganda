/*
 * The course-complete celebration, shown after the last unit's checkpoint
 * and reachable from the end of the path. Sends unfinished learners back.
 */
import '../styles/lesson.css';
import { course, courseStats, languageName } from '../content/course.js';
import { store } from '../state/store.js';
import { isCourseComplete, learnedWordIds } from '../state/progress.js';
import { mascot, randomPose } from '../illustrations/index.js';
import { button, escapeHtml } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { confetti } from '../ui/confetti.js';
import { play } from '../ui/sound.js';
import { t } from '../i18n/index.js';

export function completeView({ root, navigate }) {
  const state = store.get();
  if (!isCourseComplete(state)) {
    navigate('/learn', { replace: true });
    return;
  }
  const stats = courseStats(course);
  const name = state.profile?.name;
  root.innerHTML = `
    <section class="empty-state course-complete">
      <div class="empty-state__art">${mascot({ pose: randomPose('celebrate'), prop: 'drum' })}</div>
      <h1>${escapeHtml(t('complete.title'))}</h1>
      <p class="complete__sub">${escapeHtml(t(name ? 'complete.subNamed' : 'complete.sub', { congrats: course.phrases.congrats, name, units: stats.units, app: t('app.name') }))}</p>
      <ul class="complete__parts">
        <li><span>${icon('book', { size: 16 })} ${escapeHtml(t('complete.words'))}</span><span>${learnedWordIds(state).length}</span></li>
        <li><span>${icon('bolt', { size: 16 })} ${escapeHtml(t('complete.xp'))}</span><span>${state.xp.total}</span></li>
        <li><span>${icon('flame', { size: 16 })} ${escapeHtml(t('complete.longest'))}</span><span>${escapeHtml(t('complete.days', { count: state.streak.longest }))}</span></li>
      </ul>
      <p class="muted">${escapeHtml(t('complete.outro', { language: languageName('target'), thanks: course.phrases.thanks }))}</p>
      ${button({ label: t('complete.keep'), href: '#/practice', size: 'lg' })}
      ${button({ label: t('ui.backToPath'), href: '#/learn', variant: 'ghost' })}
    </section>`;
  play('complete');
  confetti();
}
