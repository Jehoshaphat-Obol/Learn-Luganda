/*
 * Keeping saved progress in step with a course pack as its content changes.
 *
 * Progress is keyed by stable ids (word, lesson, story, unit and section
 * ids), never by position. When authors rename or remove ids they raise the
 * pack's `version` and add a step to `migrations` in course.json:
 *
 *   { "version": 2,
 *     "rename": { "words": { "old-id": "new-id", "split-id": ["a", "b"] } },
 *     "remove": { "lessons": ["gone-id"] } }
 *
 * A rename moves progress to the new id; several old ids pointing at one new
 * id merge, and one old id pointing at a list splits (each gets a copy).
 * Removed ids, and any id the pack no longer knows, move to the course's
 * `archive` instead of being deleted, so a later pack can bring them back.
 */

export const KINDS = ['words', 'lessons', 'stories', 'units', 'sections'];

/** Progress keys under `lessons` that belong to stories, units and sections. */
const PREFIXES = { stories: 'story-', units: 'checkpoint-', sections: 'jump-' };

/** The kind and id behind a `lessons` progress key. */
export function kindOfKey(key) {
  for (const [kind, prefix] of Object.entries(PREFIXES)) if (key.startsWith(prefix)) return { kind, id: key.slice(prefix.length) };
  return { kind: 'lessons', id: key };
}

const keyOf = (kind, id) => (PREFIXES[kind] ?? '') + id;

/** Combines two records for the same item: the best of each. */
function mergeRecord(a, b) {
  if (!a) return b;
  if (!b) return a;
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) {
    const mine = out[k];
    if (typeof v === 'number' && typeof mine === 'number') out[k] = ['seen', 'correct', 'wrong', 'completions'].includes(k) ? mine + v : Math.max(mine, v);
    else if (typeof v === 'string' && typeof mine === 'string') out[k] = k === 'due' ? (v < mine ? v : mine) : v > mine ? v : mine;
    else out[k] ??= v;
  }
  return out;
}

const uniq = (list) => [...new Set(list)];

/** Applies one step's renames and removals to the slices (returns new slices). */
function applyStep(slices, step) {
  const rename = step.rename ?? {};
  const remove = step.remove ?? {};
  const target = (kind, id) => {
    if (remove[kind]?.includes(id)) return null;
    const to = rename[kind]?.[id];
    return to === undefined ? [id] : [to].flat();
  };
  const archive = structuredClone(slices.archive);

  const words = {};
  for (const [id, rec] of Object.entries(slices.words)) {
    const to = target('words', id);
    if (!to) archive.words[id] = mergeRecord(archive.words[id], rec);
    else for (const t of to) words[t] = mergeRecord(words[t], rec);
  }
  const lessons = {};
  for (const [key, rec] of Object.entries(slices.lessons)) {
    const { kind, id } = kindOfKey(key);
    const to = target(kind, id);
    if (!to) archive.lessons[key] = mergeRecord(archive.lessons[key], rec);
    else for (const t of to) lessons[keyOf(kind, t)] = mergeRecord(lessons[keyOf(kind, t)], rec);
  }
  const mapList = (list, kind, archived) => {
    const out = [];
    for (const id of list) {
      const to = target(kind, id);
      if (to) out.push(...to);
      else archived.push(id);
    }
    return uniq(out);
  };
  const mistakes = mapList(slices.mistakes, 'words', archive.mistakes);
  const jumps = mapList(slices.jumps, 'sections', archive.jumps);
  archive.mistakes = uniq(archive.mistakes);
  archive.jumps = uniq(archive.jumps);
  return { ...slices, words, lessons, mistakes, jumps, archive };
}

/** Ids a built course knows, by kind. */
export function knownIds(course) {
  return {
    words: new Set(Object.keys(course.words)),
    lessons: new Set(Object.keys(course.lessons)),
    stories: new Set(course.stories.map((s) => s.id)),
    units: new Set(course.units.map((u) => u.id)),
    sections: new Set(course.sections.map((s) => s.id)),
  };
}

/**
 * Parks progress for ids the course doesn't know in the archive, and brings
 * back archived progress for ids it knows again.
 */
export function reconcile(slices, known) {
  const isKnown = (kind, id) => known[kind].has(id);
  const archive = structuredClone(slices.archive);
  const words = { ...slices.words };
  const lessons = { ...slices.lessons };

  for (const [id, rec] of Object.entries(archive.words)) {
    if (!isKnown('words', id)) continue;
    words[id] = mergeRecord(words[id], rec);
    delete archive.words[id];
  }
  for (const [key, rec] of Object.entries(archive.lessons)) {
    const { kind, id } = kindOfKey(key);
    if (!isKnown(kind, id)) continue;
    lessons[key] = mergeRecord(lessons[key], rec);
    delete archive.lessons[key];
  }
  for (const [id, rec] of Object.entries(words)) {
    if (isKnown('words', id)) continue;
    archive.words[id] = mergeRecord(archive.words[id], rec);
    delete words[id];
  }
  for (const [key, rec] of Object.entries(lessons)) {
    const { kind, id } = kindOfKey(key);
    if (isKnown(kind, id)) continue;
    archive.lessons[key] = mergeRecord(archive.lessons[key], rec);
    delete lessons[key];
  }
  const split = (list, archived, kind) => {
    const all = uniq([...list, ...archived]);
    return [all.filter((id) => isKnown(kind, id)), all.filter((id) => !isKnown(kind, id))];
  };
  // Mistakes keep their order: current ones first, then any coming back.
  const [mistakes, lostMistakes] = split(slices.mistakes, archive.mistakes, 'words');
  const [jumps, lostJumps] = split(slices.jumps, archive.jumps, 'sections');
  archive.mistakes = lostMistakes;
  archive.jumps = lostJumps;
  return { ...slices, words, lessons, mistakes, jumps, archive };
}

export const emptyArchive = () => ({ words: {}, lessons: {}, mistakes: [], jumps: [] });

/**
 * Brings a course's saved slices from `fromVersion` up to the course's
 * version, then reconciles them with the ids it has now. A saved version
 * newer than the pack (an older app or pack) skips the steps but still
 * reconciles, and keeps the newer version so nothing is replayed later.
 * @returns {{ slices: object, version: number }}
 */
export function upgradeProgress(saved, fromVersion, course) {
  let slices = { words: {}, lessons: {}, mistakes: [], jumps: [], ...saved, archive: { ...emptyArchive(), ...saved.archive } };
  const to = course.version ?? 1;
  const from = fromVersion ?? to;
  const steps = [...(course.migrations ?? [])].filter((m) => m.version > from && m.version <= to).sort((a, b) => a.version - b.version);
  for (const step of steps) slices = applyStep(slices, step);
  slices = reconcile(slices, knownIds(course));
  return { slices, version: Math.max(from, to) };
}

/** Checks a pack's migrations against its version and current ids; returns problems. */
export function validateMigrations(migrations = [], version, known) {
  const errors = [];
  let last = 1;
  for (const [i, step] of migrations.entries()) {
    const where = `migration ${i + 1}`;
    if (!(step.version > last)) errors.push(`${where}: version ${step.version} must be above ${last} (steps go in order, one per content version)`);
    if (step.version > version) errors.push(`${where}: version ${step.version} is above the pack's version ${version}`);
    last = Math.max(last, step.version);
    for (const field of ['rename', 'remove']) for (const kind of Object.keys(step[field] ?? {})) if (!KINDS.includes(kind)) errors.push(`${where}: unknown kind "${kind}" in ${field}`);
  }
  // Where each id ends up after every step: renames must land on ids that exist now.
  for (const [i, step] of migrations.entries()) {
    for (const [kind, map] of Object.entries(step.rename ?? {})) {
      if (!KINDS.includes(kind)) continue;
      for (const [from, to] of Object.entries(map)) {
        for (const id of [to].flat()) {
          const final = followRenames(kind, id, migrations.slice(i + 1));
          if (final.some((f) => f !== null && !known[kind].has(f))) errors.push(`migration ${i + 1}: ${kind} "${from}" → "${id}", which isn't in the pack`);
        }
      }
    }
  }
  return errors;
}

/** Follows an id through later steps: its final ids, or null where it's removed. */
function followRenames(kind, id, steps) {
  let ids = [id];
  for (const step of steps) {
    ids = ids.flatMap((x) => (x === null ? [null] : step.remove?.[kind]?.includes(x) ? [null] : [step.rename?.[kind]?.[x] ?? x].flat()));
  }
  return ids;
}
