/*
 * Randomness for the art. Every visit can show a different character, pose,
 * place or prop, so the site never looks the same twice. Tests swap the
 * generator for a seeded one with `setArtRandom`.
 */

let rng = Math.random;

/** Replaces the random source; pass nothing to go back to Math.random. */
export function setArtRandom(fn) {
  rng = fn ?? Math.random;
}

/** A small seeded generator (mulberry32), handy for tests and previews. */
export function seededRandom(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function chance(p = 0.5) {
  return rng() < p;
}

export function pick(list) {
  return list[Math.floor(rng() * list.length)];
}

export function shuffle(list) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function sample(list, n) {
  return shuffle(list).slice(0, n);
}

/**
 * A negative animation delay as an inline style, so loops that share a
 * keyframe start at different points and never move in lockstep.
 */
export function delay(max = 4) {
  return `style="--d:-${(rng() * max).toFixed(2)}s"`;
}
