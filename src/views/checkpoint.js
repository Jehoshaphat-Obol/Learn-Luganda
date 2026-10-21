/* Unit checkpoint: a longer test over a whole unit, with hearts. */
import { course } from '../content/course.js';
import { store } from '../state/store.js';
import { isCourseComplete, learnedWordIds, unitProgress } from '../state/progress.js';
import { finishLesson } from '../state/lessons.js';
import { XP } from '../state/xp.js';
import { heartStatus } from '../state/hearts.js';
import { buildCheckpoint } from '../lesson/practice.js';
import { runExercises } from './lesson.js';
import { heartGate } from './heart-review.js';
import { showRewards } from './rewards.js';
import { t } from '../i18n/index.js';

export function checkpointView({ root, params, navigate }) {
  const state = store.get();
  const unit = course.units.find((u) => u.id === params.unit);
  if (!unit || !unitProgress(state, unit.id).passed) {
    navigate('/learn', { replace: true });
    return undefined;
  }
  // No hearts: warm up with a heart review first, then start.
  if (unit.settings.checkpoint.hearts && heartStatus(state).count === 0) return heartGate({ root, navigate, onReady: () => checkpointView({ root, params, navigate }) });
  const id = `checkpoint-${unit.id}`;
  const replay = Boolean(state.lessons[id]?.completions);
  const runner = runExercises({
    root,
    hearts: unit.settings.checkpoint.hearts,
    exercises: buildCheckpoint(unit.id, { knownIds: learnedWordIds(state) }),
    onQuit: () => navigate('/learn'),
    onFinish: (result) => {
      runner.cleanup();
      const summary = finishLesson(id, result, { base: replay ? XP.replay : XP.checkpoint });
      showRewards(root, {
        result,
        ...summary,
        title: t('checkpoint.title', { number: unit.index + 1 }),
        subtitle: t('checkpoint.subtitle', { unit: unit.title, thanks: course.phrases.thanks }),
        // Passing the last checkpoint for the first time ends the course.
        onDone: () => navigate(!replay && isCourseComplete(store.get()) ? '/complete' : '/learn'),
      });
    },
  });
  return runner.cleanup;
}
