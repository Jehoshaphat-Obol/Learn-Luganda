/*
 * A lesson in progress: walks the exercise queue, re-queues anything
 * answered wrongly (once) so the learner gets another go at the end, and
 * tallies results for the completion screen.
 */
export function createSession(exercises, { now = () => Date.now() } = {}) {
  const queue = exercises.map((ex, i) => ({ ...ex, key: i }));
  const total = queue.length;
  const retried = new Set();
  let index = 0;
  let correct = 0;
  let wrong = 0;
  let firstTry = 0;
  let finished = 0;
  const missed = new Map(); // wordId -> times wrong
  const startedAt = now();

  return {
    get current() {
      return queue[index] ?? null;
    },
    get done() {
      return index >= queue.length;
    },
    /** Share of exercises finished: right, or wrong on their second try. */
    get progress() {
      return Math.min(1, finished / total);
    },
    get total() {
      return total;
    },

    /** Records the answer to the current exercise. Intro cards pass `null`. */
    answer(isCorrect) {
      const ex = queue[index];
      if (isCorrect !== false || retried.has(ex.key)) finished += 1;
      if (isCorrect === true) {
        correct += 1;
        if (!retried.has(ex.key)) firstTry += 1;
      } else if (isCorrect === false) {
        wrong += 1;
        for (const id of ex.wordIds ?? []) missed.set(id, (missed.get(id) ?? 0) + 1);
        if (!retried.has(ex.key)) {
          retried.add(ex.key);
          queue.push(ex);
        }
      }
    },

    next() {
      index += 1;
    },

    /** Notes words got wrong without failing the exercise (e.g. a bad match). */
    noteMiss(wordIds) {
      for (const id of wordIds) missed.set(id, (missed.get(id) ?? 0) + 1);
    },

    result() {
      const graded = queue.filter((q) => q.type !== 'intro');
      const gradedFirst = new Set(graded.map((q) => q.key)).size;
      return {
        correct,
        wrong,
        firstTry,
        accuracy: gradedFirst ? firstTry / gradedFirst : 1,
        perfect: wrong === 0,
        seconds: Math.round((now() - startedAt) / 1000),
        missed: Object.fromEntries(missed),
        wordIds: [...new Set(queue.flatMap((q) => q.wordIds ?? []))],
      };
    },
  };
}
