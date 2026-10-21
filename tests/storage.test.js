import { beforeEach, describe, expect, it } from 'vitest';
import { createStore, withDefaults } from '../src/state/storage.js';

function fakeStorage(initial = {}) {
  const map = new Map(Object.entries(initial));
  return {
    map,
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
  };
}

const defaults = { profile: null, xp: { total: 0, byDay: {} }, gems: 50 };

describe('withDefaults', () => {
  it('fills missing nested keys and keeps existing ones', () => {
    expect(withDefaults({ xp: { total: 5 } }, defaults)).toEqual({ profile: null, xp: { total: 5, byDay: {} }, gems: 50 });
  });

  it('keeps values in null (optional) slots', () => {
    expect(withDefaults({ profile: { name: 'A' } }, defaults).profile).toEqual({ name: 'A' });
  });

  it('replaces wrong types with defaults', () => {
    expect(withDefaults({ xp: 'nope' }, defaults).xp).toEqual({ total: 0, byDay: {} });
  });
});

describe('createStore', () => {
  let storage;
  beforeEach(() => {
    storage = fakeStorage();
  });

  it('starts from defaults when nothing is saved', () => {
    const s = createStore({ key: 'k', version: 1, defaults, storage });
    expect(s.get()).toEqual({ ...defaults, version: 1 });
  });

  it('persists updates and notifies subscribers', () => {
    const s = createStore({ key: 'k', version: 1, defaults, storage });
    const seen = [];
    s.subscribe((st) => seen.push(st.gems));
    s.update((st) => {
      st.gems += 10;
    });
    expect(JSON.parse(storage.getItem('k')).gems).toBe(60);
    expect(seen).toEqual([60]);
    expect(createStore({ key: 'k', version: 1, defaults, storage }).get().gems).toBe(60);
  });

  it('does not mutate the previous state object', () => {
    const s = createStore({ key: 'k', version: 1, defaults, storage });
    const before = s.get();
    s.update((st) => {
      st.xp.total = 99;
    });
    expect(before.xp.total).toBe(0);
  });

  it('runs migrations in order and fills new defaults', () => {
    storage.setItem('k', JSON.stringify({ version: 1, coins: 7 }));
    const s = createStore({
      key: 'k',
      version: 3,
      defaults,
      storage,
      migrations: {
        2: (doc) => ({ ...doc, gems: doc.coins, coins: undefined }),
        3: (doc) => ({ ...doc, gems: doc.gems * 2 }),
      },
    });
    expect(s.get().gems).toBe(14);
    expect(s.get().version).toBe(3);
    expect(s.get().xp).toEqual({ total: 0, byDay: {} });
  });

  it('recovers from corrupt data and keeps a backup', () => {
    storage.setItem('k', '{not json');
    const s = createStore({ key: 'k', version: 1, defaults, storage });
    expect(s.get().gems).toBe(50);
    const backups = [...storage.map.keys()].filter((k) => k.startsWith('k:corrupt:'));
    expect(backups).toHaveLength(1);
    expect(storage.getItem(backups[0])).toBe('{not json');
  });

  it('treats non-object data as corrupt', () => {
    storage.setItem('k', '42');
    expect(createStore({ key: 'k', version: 1, defaults, storage }).get().gems).toBe(50);
  });

  it('falls back to memory when storage throws', () => {
    const broken = { getItem() { throw new Error('x'); }, setItem() { throw new Error('x'); }, removeItem() {} };
    const s = createStore({ key: 'k', version: 1, defaults, storage: broken });
    s.update((st) => {
      st.gems = 1;
    });
    expect(s.get().gems).toBe(1);
  });

  it('round-trips export and import', () => {
    const a = createStore({ key: 'a', version: 1, defaults, storage });
    a.update((st) => {
      st.profile = { name: 'Nakato' };
      st.gems = 5;
    });
    const b = createStore({ key: 'b', version: 1, defaults, storage });
    b.importJSON(a.exportJSON());
    expect(b.get().profile).toEqual({ name: 'Nakato' });
    expect(b.get().gems).toBe(5);
  });

  it('rejects files that are not exports', () => {
    const s = createStore({ key: 'k', version: 1, defaults, storage });
    expect(() => s.importJSON('nope')).toThrow(/valid JSON/);
    expect(() => s.importJSON('{"hello":1}')).toThrow(/progress export/);
    expect(() => s.importJSON(JSON.stringify({ app: 'learn-luganda', data: { version: 9 } }))).toThrow(/newer version/);
  });

  it('reset clears saved data', () => {
    const s = createStore({ key: 'k', version: 1, defaults, storage });
    s.update((st) => {
      st.gems = 1;
    });
    s.reset();
    expect(s.get().gems).toBe(50);
    expect(storage.getItem('k')).toBeNull();
  });
});
