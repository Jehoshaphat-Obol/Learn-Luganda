import { describe, expect, it } from 'vitest';
import { isAccepted, normalise, tokens } from '../src/lesson/answers.js';
import { buildLesson, MAX_EXERCISES } from '../src/lesson/generate.js';
import { createSession } from '../src/lesson/session.js';
import { course } from '../src/content/course.js';

describe('answers', () => {
  it('ignores case, punctuation, apostrophe style and spacing', () => {
    expect(normalise('  Oli otya,  SSEBO? ')).toBe('oli otya ssebo');
    expect(normalise('Omusajja n’omukazi.')).toBe("omusajja n'omukazi");
    expect(normalise('“Weebale”')).toBe('weebale');
    expect(isAccepted('i’m fine thank you', ['I’m fine, thank you.'])).toBe(true);
    expect(isAccepted("I'm fine, thanks", ['I’m fine, thank you.', 'I’m fine, thanks.'])).toBe(true);
  });

  it('rejects empty and different answers', () => {
    expect(isAccepted('', ['Gyendi'])).toBe(false);
    expect(isAccepted('Gyendi nnyo', ['Gyendi'])).toBe(false);
  });

  it('splits tiles without punctuation', () => {
    expect(tokens('Oli otya, ssebo?')).toEqual(['Oli', 'otya', 'ssebo']);
    expect(tokens('Omusajja n’omukazi.')).toEqual(['Omusajja', 'n’omukazi']);
  });
});

describe('buildLesson', () => {
  it('builds every lesson in the course', () => {
    for (const id of course.order) {
      const exercises = buildLesson(id, { seed: 1 });
      expect(exercises.length).toBeGreaterThanOrEqual(8);
      expect(exercises.length).toBeLessThanOrEqual(MAX_EXERCISES);
    }
  }, 60_000);

  it('introduces each new word before testing it', () => {
    const ex = buildLesson('u1s1l1', { seed: 3 });
    const firstIntro = ex.findIndex((e) => e.type === 'intro' && e.word.id === 'weebale');
    const firstTest = ex.findIndex((e) => e.type !== 'intro' && e.wordIds?.includes('weebale'));
    expect(firstIntro).toBeGreaterThanOrEqual(0);
    expect(firstIntro).toBeLessThan(firstTest);
  });

  it('skips intro cards on a repeat', () => {
    expect(buildLesson('u1s1l1', { seed: 3, firstTime: false }).some((e) => e.type === 'intro')).toBe(false);
  });

  it('makes choice options with exactly one right answer', () => {
    for (const e of buildLesson('u2s3l1', { seed: 5 }).filter((x) => x.type === 'choice')) {
      expect(e.options.filter((o) => o.value === e.answer)).toHaveLength(1);
      expect(new Set(e.options.map((o) => o.text.toLowerCase())).size).toBe(e.options.length);
    }
  });

  it('puts every tile of the answer in the word bank', () => {
    for (const e of buildLesson('u1s2l3', { seed: 9 }).filter((x) => x.type === 'translate')) {
      const bank = [...e.bank];
      for (const t of tokens(e.answerText)) {
        const i = bank.indexOf(t);
        expect(i).toBeGreaterThanOrEqual(0);
        bank.splice(i, 1);
      }
      expect(isAccepted(tokens(e.answerText).join(' '), e.accepted)).toBe(true);
    }
  });

  it('is reproducible for a seed', () => {
    expect(buildLesson('u1s1l2', { seed: 42 })).toEqual(buildLesson('u1s1l2', { seed: 42 }));
  });
});

describe('session', () => {
  const ex = [{ type: 'intro', wordIds: ['a'] }, { type: 'choice', wordIds: ['a'] }, { type: 'choice', wordIds: ['b'] }];

  it('re-queues a wrong answer once and tallies results', () => {
    let t = 0;
    const s = createSession(ex, { now: () => (t += 1000) });
    s.answer(null); s.next();
    s.answer(false); s.next();
    expect(s.progress).toBeCloseTo(1 / 3);
    s.answer(true); s.next();
    expect(s.done).toBe(false);
    expect(s.current.wordIds).toEqual(['a']);
    s.answer(false); s.next();
    expect(s.done).toBe(true);
    expect(s.progress).toBe(1);
    const r = s.result();
    expect(r).toMatchObject({ correct: 1, wrong: 2, firstTry: 1, perfect: false, missed: { a: 2 } });
    expect(r.accuracy).toBe(0.5);
  });

  it('reports a perfect lesson', () => {
    const s = createSession(ex);
    for (const v of [null, true, true]) {
      s.answer(v);
      s.next();
    }
    expect(s.result()).toMatchObject({ perfect: true, accuracy: 1 });
  });
});

import { checkTyped, levenshtein } from '../src/lesson/answers.js';

describe('typed answers', () => {
  it('measures edit distance', () => {
    expect(levenshtein('weebale', 'webale')).toBe(1);
    expect(levenshtein('abc', 'abc')).toBe(0);
  });

  it('accepts exact answers and flags small typos', () => {
    expect(checkTyped('How are you sir', ['How are you, sir?'])).toMatchObject({ correct: true, typo: false });
    expect(checkTyped('How are yuo, sir', ['How are you, sir?'])).toMatchObject({ correct: false });
    expect(checkTyped('How ar you, sir', ['How are you, sir?'])).toMatchObject({ correct: true, typo: true });
    expect(checkTyped('Good bye', ['Goodbye'])).toMatchObject({ correct: true, typo: true });
    expect(checkTyped('thank', ['Thank you'])).toMatchObject({ correct: false });
  });
});

describe('new exercise types', () => {
  it('includes fill, dialogue and typing where content allows', () => {
    const types = new Set(buildLesson('u1s2l3', { seed: 2 }).map((e) => e.type));
    expect(types.has('dialogue')).toBe(true);
    expect(types.has('type')).toBe(true);
    const all = new Set(course.order.flatMap((id) => buildLesson(id, { seed: 4 }).map((e) => e.type)));
    expect(all.has('fill')).toBe(true);
  });

  it('builds fill exercises whose answer completes the sentence', () => {
    for (const id of course.order) {
      for (const e of buildLesson(id, { seed: 7 }).filter((x) => x.type === 'fill')) {
        expect(e.options).toContain(e.answer);
        expect(e.sentence.replace('___', e.answer)).toBe(e.full);
      }
    }
  });

  it('keeps every authored dialogue in its lesson', () => {
    for (const id of course.order) {
      const n = course.lessons[id].dialogues.length;
      expect(buildLesson(id, { seed: 1 }).filter((e) => e.type === 'dialogue')).toHaveLength(n);
    }
  });
});
