/*
 * Versioned persistence on top of localStorage. The saved document carries a
 * `version`; older documents run through `migrations` in order, and anything
 * missing is filled from `defaults` so new features get sane starting values
 * without a migration. Unreadable data is set aside under a backup key rather
 * than thrown away, and the app starts fresh.
 */

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

/** Fills keys missing from `value` with those from `defaults`, recursively. */
export function withDefaults(value, defaults) {
  if (!isObject(defaults)) return value === undefined ? structuredClone(defaults) : value;
  if (!isObject(value)) return structuredClone(defaults);
  const out = { ...value };
  for (const [k, d] of Object.entries(defaults)) {
    // `null` defaults mark optional slots (e.g. no profile yet): keep any value.
    out[k] = d === null ? (value[k] ?? null) : withDefaults(value[k], d);
  }
  return out;
}

function memoryStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
  };
}

function safeStorage(preferred) {
  try {
    const s = preferred ?? globalThis.localStorage;
    const probe = '__ll_probe__';
    s.setItem(probe, '1');
    s.removeItem(probe);
    return s;
  } catch {
    // Private mode or storage disabled: keep working for this visit.
    return memoryStorage();
  }
}

/**
 * @param {{ key: string, version: number, defaults: object,
 *   migrations?: Record<number, (doc: object) => object>, storage?: Storage }} options
 *   `migrations[n]` upgrades a document from version n-1 to n.
 */
export function createStore({ key, version, defaults, migrations = {}, storage }) {
  const backend = safeStorage(storage);
  const listeners = new Set();
  let state = load();

  function migrate(doc) {
    let current = doc;
    let v = Number(current.version) || 0;
    while (v < version) {
      v += 1;
      if (migrations[v]) current = migrations[v](current);
      current = { ...current, version: v };
    }
    return current;
  }

  function normalise(doc) {
    if (!isObject(doc)) throw new Error('Saved progress is not an object');
    if (Number(doc.version) > version) throw new Error('Saved progress is from a newer version of the app');
    return withDefaults(migrate(doc), { ...defaults, version });
  }

  function load() {
    const raw = backend.getItem(key);
    if (raw == null) return structuredClone({ ...defaults, version });
    try {
      return normalise(JSON.parse(raw));
    } catch {
      backend.setItem(`${key}:corrupt:${Date.now()}`, raw);
      return structuredClone({ ...defaults, version });
    }
  }

  function save() {
    try {
      backend.setItem(key, JSON.stringify(state));
    } catch {
      // Quota exceeded: the in-memory state still works for this session.
    }
  }

  function emit() {
    for (const fn of listeners) fn(state);
  }

  return {
    get: () => state,

    /** `fn` receives a draft copy and may mutate it or return a new state. */
    update(fn) {
      const draft = structuredClone(state);
      state = fn(draft) ?? draft;
      save();
      emit();
      return state;
    },

    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },

    reset() {
      state = structuredClone({ ...defaults, version });
      backend.removeItem(key);
      emit();
    },

    exportJSON() {
      return JSON.stringify({ app: 'learn-luganda', exportedAt: new Date().toISOString(), data: state }, null, 2);
    },

    /** Replaces the state with an exported file's contents. Throws on bad input. */
    importJSON(text) {
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        throw new Error('That file isn’t valid JSON.');
      }
      if (parsed?.app !== 'learn-luganda' || !isObject(parsed.data)) {
        throw new Error('That file isn’t a Learn Luganda progress export.');
      }
      state = normalise(parsed.data);
      save();
      emit();
      return state;
    },
  };
}
