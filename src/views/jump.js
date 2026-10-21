/*
 * Section test: jump ahead to a later section by showing you know the ones
 * before it. By default no hearts, but you need 80% first-try accuracy to
 * pass; the course pack sets both (`settings.sectionTest`).
 */
import { course } from '../content/course.js';
import { store } from '../state/store.js';
import { canJumpTo } from '../state/progress.js';
import { finishLesson } from '../state/lessons.js';
import { XP } from '../state/xp.js';
import { buildSectionTest } from '../lesson/practice.js';
import { runExercises } from './lesson.js';
import { showRewards } from './rewards.js';
import { emptyStateArt } from '../illustrations/index.js';
import { button, escapeHtml } from '../ui/components.js';
import { t } from '../i18n/index.js';

export function jumpView({ root, params, query = {}, navigate }) {
  const section = course.sections.find((s) => s.id === params.section);
  if (!section || !canJumpTo(store.get(), section.id)) {
    navigate('/learn', { replace: true });
    return undefined;
  }
  const { passMark, hearts } = course.settings.sectionTest;
  const runner = runExercises({
    root,
    hearts,
    navigate,
    exercises: buildSectionTest(section.id, { seed: Number(query.seed) || undefined }),
    onQuit: () => navigate('/learn'),
    onFinish: (result) => {
      runner.cleanup();
      if (result.accuracy < passMark) {
        root.innerHTML = `
          <section class="empty-state">
            <div class="empty-state__art">${emptyStateArt('ponder')}</div>
            <h1>${escapeHtml(t('jump.failTitle'))}</h1>
            <p class="muted">${escapeHtml(t('jump.failBody', { score: Math.round(result.accuracy * 100), mark: Math.round(passMark * 100), number: section.index + 1 }))}</p>
            ${button({ label: t('ui.tryAgain'), size: 'lg', attrs: 'data-retry' })}
            ${button({ label: t('ui.backToPath'), href: '#/learn', variant: 'ghost' })}
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
        title: t('jump.title', { number: section.index + 1 }),
        subtitle: t('jump.subtitle', { section: section.title }),
        onDone: () => navigate('/learn'),
      });
    },
  });
  return runner.cleanup;
}
