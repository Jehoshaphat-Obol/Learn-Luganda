/*
 * The course-complete celebration, shown after the last unit's checkpoint
 * and reachable from the end of the path. Sends unfinished learners back.
 */
import '../styles/lesson.css';
import { course, courseStats } from '../content/course.js';
import { store } from '../state/store.js';
import { isCourseComplete, learnedWordIds } from '../state/progress.js';
import { mascot, randomPose } from '../illustrations/index.js';
import { button, escapeHtml } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { confetti } from '../ui/confetti.js';
import { play } from '../ui/sound.js';

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
      <h1>Course complete!</h1>
      <p class="complete__sub">Wayita bulungi${name ? `, ${escapeHtml(name)}` : ''}! You finished all ${stats.units} units of Learn Luganda.</p>
      <ul class="complete__parts">
        <li><span>${icon('book', { size: 16 })} Words learned</span><span>${learnedWordIds(state).length}</span></li>
        <li><span>${icon('bolt', { size: 16 })} Total XP</span><span>${state.xp.total}</span></li>
        <li><span>${icon('flame', { size: 16 })} Longest streak</span><span>${state.streak.longest} days</span></li>
      </ul>
      <p class="muted">Keep your Luganda fresh with daily practice, retell the stories, and greet someone in Luganda today. Weebale nnyo!</p>
      ${button({ label: 'Keep practising', href: '#/practice', size: 'lg' })}
      ${button({ label: 'Back to the path', href: '#/learn', variant: 'ghost' })}
    </section>`;
  play('complete');
  confetti();
}
