import { describe, expect, it } from 'vitest';
import { kindOfKey, reconcile, upgradeProgress, validateMigrations } from '../src/content/migrations.js';
import { upgradePack } from '../src/content/format.js';
import { DEFAULTS, MIGRATIONS } from '../src/state/store.js';
import { switchCourse, syncCourse } from '../src/state/courses.js';
import { course } from '../src/content/course.js';

/** A tiny built course: just the ids the migrations look at. */
function fakeCourse({ words = [], lessons = [], stories = [], units = ['u1'], sections = ['s1'], version = 1, migrations = [] }) {
  return {
    version,
    migrations,
    words: Object.fromEntries(words.map((id) => [id, {}])),
    lessons: Object.fromEntries(lessons.map((id) => [id, {}])),
    stories: stories.map((id) => ({ id })),
    units: units.map((id) => ({ id })),
    sections: sections.map((id) => ({ id })),
  };
}

const word = (box, extra = {}) => ({ box, due: '2026-10-25', seen: 3, correct: 2, wrong: 1, lastSeen: '2026-10-20T10:00:00.000Z', ...extra });
const done = (n, acc, at = '2026-10-20T10:00:00.000Z') => ({ completions: n, bestAccuracy: acc, lastCompletedAt: at });

describe('progress keys', () => {
  it('tells stories, checkpoints and section jumps from lessons', () => {
    expect(kindOfKey('u1s1l1')).toEqual({ kind: 'lessons', id: 'u1s1l1' });
    expect(kindOfKey('story-market')).toEqual({ kind: 'stories', id: 'market' });
    expect(kindOfKey('checkpoint-u3')).toEqual({ kind: 'units', id: 'u3' });
    expect(kindOfKey('jump-s2')).toEqual({ kind: 'sections', id: 's2' });
  });
});

describe('upgrading saved progress', () => {
  it('follows a rename', () => {
    const c = fakeCourse({ words: ['ssebo'], lessons: ['greet-1'], stories: ['market'], version: 2, migrations: [{ version: 2, rename: { words: { sebo: 'ssebo' }, lessons: { 'l-1': 'greet-1' }, stories: { shop: 'market' } } }] });
    const { slices, version } = upgradeProgress({ words: { sebo: word(2) }, lessons: { 'l-1': done(1, 0.9), 'story-shop': done(1, 1) }, mistakes: ['sebo'], jumps: [] }, 1, c);
    expect(version).toBe(2);
    expect(slices.words).toEqual({ ssebo: word(2) });
    expect(slices.lessons).toEqual({ 'greet-1': done(1, 0.9), 'story-market': done(1, 1) });
    expect(slices.mistakes).toEqual(['ssebo']);
    expect(slices.archive.words).toEqual({});
  });

  it('merges two items into one, keeping the best of each', () => {
    const c = fakeCourse({ words: ['mukwano'], version: 2, migrations: [{ version: 2, rename: { words: { friend1: 'mukwano', friend2: 'mukwano' } } }] });
    const { slices } = upgradeProgress({ words: { friend1: word(1, { due: '2026-10-22' }), friend2: word(3, { lastSeen: '2026-10-21T08:00:00.000Z' }) } }, 1, c);
    expect(slices.words.mukwano).toEqual({ box: 3, due: '2026-10-22', seen: 6, correct: 4, wrong: 2, lastSeen: '2026-10-21T08:00:00.000Z' });
  });

  it('splits one item into several, each keeping the progress', () => {
    const c = fakeCourse({ lessons: ['greet-a', 'greet-b'], version: 2, migrations: [{ version: 2, rename: { lessons: { greet: ['greet-a', 'greet-b'] } } }] });
    const { slices } = upgradeProgress({ lessons: { greet: done(2, 0.8) } }, 1, c);
    expect(slices.lessons).toEqual({ 'greet-a': done(2, 0.8), 'greet-b': done(2, 0.8) });
  });

  it('archives removed and unknown ids instead of deleting them', () => {
    const c = fakeCourse({ words: ['kale'], version: 2, migrations: [{ version: 2, remove: { words: ['old'], sections: ['s9'] } }] });
    const { slices } = upgradeProgress({ words: { old: word(4), kale: word(1), stray: word(2) }, mistakes: ['old', 'kale'], jumps: ['s9'] }, 1, c);
    expect(slices.words).toEqual({ kale: word(1) });
    expect(slices.mistakes).toEqual(['kale']);
    expect(slices.jumps).toEqual([]);
    expect(slices.archive).toEqual({ words: { old: word(4), stray: word(2) }, lessons: {}, mistakes: ['old'], jumps: ['s9'] });
  });

  it('brings archived progress back when a pack has the id again', () => {
    const archive = { words: { old: word(4) }, lessons: { 'checkpoint-u2': done(1, 1) }, mistakes: ['old'], jumps: [] };
    const back = reconcile({ words: {}, lessons: {}, mistakes: [], jumps: [], archive }, { words: new Set(['old']), lessons: new Set(), stories: new Set(), units: new Set(['u2']), sections: new Set() });
    expect(back.words).toEqual({ old: word(4) });
    expect(back.lessons).toEqual({ 'checkpoint-u2': done(1, 1) });
    expect(back.mistakes).toEqual(['old']);
    expect(back.archive).toEqual({ words: {}, lessons: {}, mistakes: [], jumps: [] });
  });

  it('applies every skipped version in order', () => {
    const c = fakeCourse({
      words: ['c'],
      version: 4,
      migrations: [
        { version: 2, rename: { words: { a: 'b' } } },
        { version: 3, note: 'nothing for words' },
        { version: 4, rename: { words: { b: 'c' } } },
      ],
    });
    expect(upgradeProgress({ words: { a: word(2) } }, 1, c).slices.words).toEqual({ c: word(2) });
    // Saved at version 3: only the last step runs.
    expect(upgradeProgress({ words: { b: word(1) } }, 3, c).slices.words).toEqual({ c: word(1) });
  });

  it('keeps a newer saved version when an older pack loads', () => {
    const c = fakeCourse({ words: ['a'], version: 1 });
    const { slices, version } = upgradeProgress({ words: { a: word(1), b: word(2) } }, 2, c);
    expect(version).toBe(2);
    expect(slices.archive.words).toEqual({ b: word(2) });
  });
});

describe('checking migrations', () => {
  const known = { words: new Set(['c']), lessons: new Set(), stories: new Set(), units: new Set(), sections: new Set() };

  it('accepts chains that end on ids the pack has', () => {
    expect(validateMigrations([{ version: 2, rename: { words: { a: 'b' } } }, { version: 3, rename: { words: { b: 'c' } } }], 3, known)).toEqual([]);
    expect(validateMigrations([{ version: 2, rename: { words: { a: 'b' } } }, { version: 3, remove: { words: ['b'] } }], 3, known)).toEqual([]);
  });

  it('reports out-of-order steps, steps past the version and dangling renames', () => {
    const errors = validateMigrations(
      [
        { version: 3, rename: { words: { a: 'missing' } } },
        { version: 2 },
        { version: 5, remove: { verbs: ['x'] } },
      ],
      4,
      known,
    );
    expect(errors.join('\n')).toMatch(/migration 2: version 2 must be above 3/);
    expect(errors.join('\n')).toMatch(/migration 3: version 5 is above the pack's version 4/);
    expect(errors.join('\n')).toMatch(/unknown kind "verbs"/);
    expect(errors.join('\n')).toMatch(/words "a" → "missing"/);
  });
});

describe('pack formats', () => {
  it('upgrades an older pack step by step and refuses a newer one', () => {
    const pack = { meta: { id: 'en-xx', formatVersion: 1, title: 'Old' }, units: {} };
    const upgrades = { 2: (p) => ({ ...p, meta: { ...p.meta, name: p.meta.title } }), 3: (p) => ({ ...p, units: { ...p.units, added: true } }) };
    const out = upgradePack(pack, upgrades, 3);
    expect(out.meta).toMatchObject({ formatVersion: 3, name: 'Old' });
    expect(out.units).toEqual({ added: true });
    expect(() => upgradePack({ meta: { id: 'en-xx', formatVersion: 4 }, units: {} }, upgrades, 3)).toThrow(/format 4/);
  });
});

describe('saved documents', () => {
  it('store v4 records that old progress was English→Luganda version 1', () => {
    const doc = MIGRATIONS[4]({ version: 3, settings: { sound: true }, lessons: { u1s1l1: done(1, 1) } });
    expect(doc).toMatchObject({ settings: { sound: true, course: 'en-lg' }, courseVersion: 1, courses: {} });
  });

  it('a course keeps its own version and archive when switching away and back', () => {
    const s = structuredClone(DEFAULTS);
    s.courseVersion = 1;
    s.words = { kale: word(1), stray: word(2) };
    syncCourse(s, course);
    expect(s.archive.words).toEqual({ stray: word(2) });
    expect(s.courseVersion).toBe(course.version);
    switchCourse(s, 'en-sw');
    expect(s.courseVersion).toBeNull();
    expect(s.archive.words).toEqual({});
    switchCourse(s, 'en-lg');
    expect(s.archive.words).toEqual({ stray: word(2) });
    expect(s.courseVersion).toBe(course.version);
  });
});
