/*
 * Stable, readable JSON for packs: anything that fits on one line (a word,
 * a short list) stays on one line; bigger objects and arrays break over
 * several, two-space indented. Used by the pack tools so diffs stay small.
 */
const WIDTH = 140;

/** One-line JSON with a space after commas and colons. */
function inline(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(inline).join(', ')}]`;
  const entries = Object.entries(value).filter(([, v]) => v !== undefined);
  return entries.length ? `{ ${entries.map(([k, v]) => `${JSON.stringify(k)}: ${inline(v)}`).join(', ')} }` : '{}';
}

export function formatJson(value, indent = '') {
  const flat = inline(value);
  if (value === null || typeof value !== 'object' || indent.length + flat.length <= WIDTH) return flat;
  const inner = indent + '  ';
  if (Array.isArray(value)) {
    if (!value.length) return '[]';
    return `[\n${value.map((v) => inner + formatJson(v, inner)).join(',\n')}\n${indent}]`;
  }
  const entries = Object.entries(value).filter(([, v]) => v !== undefined);
  if (!entries.length) return '{}';
  return `{\n${entries.map(([k, v]) => `${inner}${JSON.stringify(k)}: ${formatJson(v, inner)}`).join(',\n')}\n${indent}}`;
}
