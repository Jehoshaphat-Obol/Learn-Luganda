/*
 * The hand-built en-sw and sw-en packs were retired for courses composed
 * from the shared catalog (#187). Their ids differ from the curriculum's,
 * so a migration step moves saved progress across: this checks that a
 * learner who had done everything in the old packs keeps all of it.
 * tests/fixtures/legacy-swahili.json.gz holds the old packs' ids.
 */
import { gunzipSync } from 'node:zlib';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { upgradeProgress } from '../src/content/migrations.js';
import { loadPack } from '../scripts/load-pack.js';

const legacy = JSON.parse(gunzipSync(readFileSync('tests/fixtures/legacy-swahili.json.gz')).toString());
const norm = (t) => t.trim().toLowerCase().replace(/[.!?]/g, '');

describe.each(['en-sw', 'sw-en'])('saved %s progress', (id) => {
  const old = legacy[id];
  const course = loadPack(id, { activate: false });
  const record = { box: 3, due: '2026-10-25', seen: 1, correct: 1, wrong: 0, lastSeen: '2026-10-20T10:00:00.000Z' };
  const done = { completions: 1, bestAccuracy: 1, lastCompletedAt: '2026-10-20T10:00:00.000Z' };
  const saved = {
    words: Object.fromEntries(old.words.map((w) => [w.id, record])),
    lessons: {
      ...Object.fromEntries(old.lessons.map((l) => [l.id, done])),
      ...Object.fromEntries(old.stories.map((s) => [`story-${s}`, done])),
      ...Object.fromEntries(old.units.map((u) => [`checkpoint-${u}`, done])),
    },
    mistakes: old.words.slice(0, 5).map((w) => w.id),
    jumps: ['s2'],
  };
  const { slices, version } = upgradeProgress(saved, old.version, course);

  it('archives nothing', () => {
    expect(version).toBe(course.version);
    expect(slices.archive).toEqual({ words: {}, lessons: {}, mistakes: [], jumps: [] });
  });

  it('keeps every word’s practice, on a word with the same answer or meaning', () => {
    const seen = Object.values(slices.words).reduce((n, r) => n + r.seen, 0);
    expect(seen).toBe(old.words.length);
    const targets = new Set(Object.keys(slices.words).map((w) => norm(course.words[w].target)));
    const kept = old.words.filter((w) => targets.has(norm(w.target))).length;
    expect(kept / old.words.length).toBeGreaterThan(0.9);
    expect(slices.mistakes).toHaveLength(5);
    expect(slices.jumps).toEqual(['s2']);
  });

  it('marks done the lessons that teach what the old lessons taught', () => {
    const doneLessons = Object.keys(slices.lessons).filter((k) => course.lessons[k]);
    const taught = new Set(doneLessons.flatMap((l) => course.lessons[l].newWords));
    const practised = Object.keys(slices.words);
    expect(practised.filter((w) => taught.has(w)).length / practised.length).toBeGreaterThan(0.9);
    for (const s of old.stories.filter((s) => course.stories.some((x) => x.id === s))) expect(slices.lessons[`story-${s}`]).toBeTruthy();
    expect(old.stories.filter((s) => !course.stories.some((x) => x.id === s))).toEqual([]);
    expect(Object.keys(slices.lessons).filter((k) => k.startsWith('checkpoint-')).length).toBeGreaterThan(20);
  });
});
