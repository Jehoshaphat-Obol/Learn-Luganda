/*
 * Section test: jump ahead to a later section by showing you know the ones
 * before it. No hearts, but you need 80% first-try accuracy to pass.
 */
import { course } from '../content/course.js';
import { store } from '../state/store.js';
import { canJumpTo } from '../state/progress.js';
import { finishLesson } from '../state/lessons.js';
import { XP } from '../state/xp.js';
import { buildSectionTest } from '../lesson/practice.js';
import { runExercises } from './lesson.js';
import { showRewards } from './rewards.js';
import { mascot } from '../illustrations/index.js';
import { button } from '../ui/components.js';

export const JUMP_PASS = 0.8;

export function jumpView({ root, params, query = {}, navigate }) {
  const section = course.sections.find((s) => s.id === params.section);
  if (!section || !canJumpTo(store.get(), section.id)) {
    navigate('/learn', { replace: true });
    return undefined;
  }
  const runner = runExercises({
    root,
    navigate,
    exercises: buildSectionTest(section.id, { seed: Number(query.seed) || undefined }),
    onQuit: () => navigate('/learn'),
    onFinish: (result) => {
      runner.cleanup();
      if (result.accuracy < JUMP_PASS) {
        root.innerHTML = `
          <section class="empty-state">
            <div class="empty-state__art">${mascot({ pose: 'thinking' })}</div>
            <h1>Not quite yet</h1>
            <p class="muted">You got ${Math.round(result.accuracy * 100)}% right first time, and you need ${JUMP_PASS * 100}% to jump to Section ${section.index + 1}. Keep going on the path, or try again.</p>
            ${button({ label: 'Try again', size: 'lg', attrs: 'data-retry' })}
            ${button({ label: 'Back to the path', href: '#/learn', variant: 'ghost' })}
          </section>`;
        root.querySelector('[data-retry]').addEventListener('click', () => jumpView({ root, params, navigate }));
        return;
      }
      store.update((s) => {
        if (!s.jumps.includes(section.id)) s.jumps.push(section.id);
      });
      const summary = finishLesson(`jump-${section.id}`, result, { base: XP.checkpoint });
      showRewards(root, {
        result,
        ...summary,
        title: `Welcome to Section ${section.index + 1}!`,
        subtitle: `You jumped ahead to ${section.title}. Earlier lessons stay open for review.`,
        onDone: () => navigate('/learn'),
      });
    },
  });
  return runner.cleanup;
}
