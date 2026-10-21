/* Unit checkpoint: a longer test over a whole unit, with hearts. */
import { course } from '../content/course.js';
import { store } from '../state/store.js';
import { isCourseComplete, learnedWordIds, unitProgress } from '../state/progress.js';
import { finishLesson } from '../state/lessons.js';
import { XP } from '../state/xp.js';
import { heartStatus } from '../state/hearts.js';
import { buildCheckpoint } from '../lesson/practice.js';
import { runExercises } from './lesson.js';
import { showRewards } from './rewards.js';

export function checkpointView({ root, params, navigate }) {
  const state = store.get();
  const unit = course.units.find((u) => u.id === params.unit);
  if (!unit || !unitProgress(state, unit.id).passed || heartStatus(state).count === 0) {
    navigate(heartStatus(state).count === 0 && unit ? `/lesson/${unit.skills[0].lessons[0].id}` : '/learn', { replace: true });
    return undefined;
  }
  const id = `checkpoint-${unit.id}`;
  const replay = Boolean(state.lessons[id]?.completions);
  const runner = runExercises({
    root,
    hearts: true,
    navigate,
    exercises: buildCheckpoint(unit.id, { knownIds: learnedWordIds(state) }),
    onQuit: () => navigate('/learn'),
    onFinish: (result) => {
      runner.cleanup();
      const summary = finishLesson(id, result, { base: replay ? XP.replay : XP.checkpoint });
      showRewards(root, {
        result,
        ...summary,
        title: `Unit ${unit.index + 1} complete!`,
        subtitle: `You passed the ${unit.title} checkpoint. Weebale nnyo!`,
        // Passing the last checkpoint for the first time ends the course.
        onDone: () => navigate(!replay && isCourseComplete(store.get()) ? '/complete' : '/learn'),
      });
    },
  });
  return runner.cleanup;
}
