/*
 * Packs are configuration, not state: once loaded, nothing at runtime may
 * change them. `deepFreeze` locks an object and everything inside it, so a
 * stray write throws in strict mode (all ES modules) instead of quietly
 * changing the copy every screen reads.
 */
export function deepFreeze(value) {
  if (value === null || typeof value !== 'object' || Object.isFrozen(value)) return value;
  for (const child of Object.values(value)) deepFreeze(child);
  return Object.freeze(value);
}
