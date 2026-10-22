// Differences between a composed course and the hand-built pack it replaced,
// as `path: legacy -> composed` lines. Shared by tests/compose.test.js.
const SKIP = new Set(['$schema', 'formatVersion']);

/** The pack with what can't matter dropped: schema links, empty lists, alternative answers' order. */
export function normalize(value, key = '') {
  if (Array.isArray(value)) {
    const items = value.map((v) => normalize(v));
    return key === 'altTarget' || key === 'altBase' ? [...items].sort() : items;
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const k of Object.keys(value).sort()) {
      if (SKIP.has(k)) continue;
      const v = normalize(value[k], k);
      if (v === undefined || v === '' || (Array.isArray(v) && !v.length)) continue;
      out[k] = v;
    }
    return out;
  }
  return value;
}

export function diff(a, b, path = '', out = []) {
  if (JSON.stringify(a) === JSON.stringify(b)) return out;
  const isObj = (x) => x && typeof x === 'object' && !Array.isArray(x);
  if (isObj(a) && isObj(b)) {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) diff(a[k], b[k], path ? `${path}.${k}` : k, out);
  } else if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
    a.forEach((x, i) => diff(x, b[i], `${path}[${i}]`, out));
  } else out.push(`${path}: ${JSON.stringify(a)} -> ${JSON.stringify(b)}`);
  return out;
}
