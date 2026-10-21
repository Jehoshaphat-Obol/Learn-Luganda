import { describe, expect, it } from 'vitest';
import { profileStats } from '../src/state/stats.js';
import { DEFAULTS } from '../src/state/store.js';

describe('profile stats', () => {
  it('summarises an empty profile', () => {
    const s = structuredClone(DEFAULTS);
    const st = profileStats(s);
    expect(st).toMatchObject({ totalXp: 0, streak: 0, words: 0, lessons: 0, accuracy: null, stories: 0 });
  });

  it('counts accuracy, words and stories', () => {
    const s = structuredClone(DEFAULTS);
    s.stats = { ...s.stats, answers: 20, correctAnswers: 15, secondsLearning: 600, lessonsCompleted: 1 };
    s.lessons = { u1s1l1: { completions: 1 }, 'story-new-friend': { completions: 2 } };
    const st = profileStats(s);
    expect(st.accuracy).toBe(0.75);
    expect(st.minutes).toBe(10);
    expect(st.words).toBe(5);
    expect(st.stories).toBe(1);
  });
});
