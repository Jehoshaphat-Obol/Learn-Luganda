// Reads course packs from disk for Node scripts and e2e tests (the browser
// uses src/content/load.js). Same result as the app's loader.
//
// A course is either a hand-built pack (courses/<from>-<to>/) or composed
// from the shared catalog (curriculum/ and lang/<code>/, see
// src/content/compose.js); readPack returns the same shape for both.
//
// Scripts run with `--root <dir>` read packs from another folder laid out
// like src/packs (ui/, courses/, curriculum/, lang/), such as the example in
// docs/packs/example. The language registry always comes from src/packs.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildFromPack, useCourse } from '../src/content/course.js';
import { composeCourse, composedIds } from '../src/content/compose.js';

// Under vitest's browser-like environment the module URL isn't a file URL:
// fall back to the working directory, the repository root.
const here = import.meta.url.startsWith('file:') ? import.meta.url : pathToFileURL(`${process.cwd()}/scripts/`).href;
const app = new URL('../src/packs/', here);
const flag = process.argv.indexOf('--root');
/** The folder the packs are read from. */
export const packRoot = flag > 0 ? pathToFileURL(`${resolve(process.argv[flag + 1])}/`) : app;
const readJson = (path, base = packRoot) => JSON.parse(readFileSync(new URL(path, base), 'utf8'));
const has = (path) => existsSync(new URL(path, packRoot));
const list = (path) => (has(path) ? readdirSync(new URL(path, packRoot)).sort() : []);
const jsonIn = (path) => list(path).filter((f) => f.endsWith('.json'));

export const readLanguages = () => readJson('languages.json', app).languages;

/** `{ [id]: unit }` for the unit files in folder `path`. */
function readUnits(path) {
  const units = {};
  for (const file of jsonIn(path)) {
    const unit = readJson(`${path}${file}`);
    units[unit.id] = unit;
  }
  return units;
}

/** Ids of the hand-built course packs. */
export const legacyIds = () => list('courses/');

let catalog;
/**
 * The shared catalog: `{ curriculum, lang, about, coverage }`, or null when
 * the folder has none.
 */
export function readCatalog() {
  if (catalog !== undefined) return catalog;
  if (!has('curriculum/course.json')) return (catalog = null);
  const lang = {};
  const about = {};
  for (const code of list('lang/').filter((c) => has(`lang/${c}/course.json`))) {
    lang[code] = { meta: readJson(`lang/${code}/course.json`), units: readUnits(`lang/${code}/units/`) };
    for (const to of list(`lang/${code}/about/`)) {
      const dir = `lang/${code}/about/${to}/`;
      (about[code] ??= {})[to] = { meta: has(`${dir}course.json`) ? readJson(`${dir}course.json`) : null, units: readUnits(`${dir}units/`) };
    }
  }
  const coverage = has('lang/coverage.json') ? readJson('lang/coverage.json') : { languages: {}, about: {} };
  return (catalog = { curriculum: { meta: readJson('curriculum/course.json'), units: readUnits('curriculum/units/') }, lang, about, coverage });
}

/** Ids of the composed courses the app offers. */
export function composedCourseIds() {
  const c = readCatalog();
  return c ? composedIds(c.coverage, readLanguages()) : [];
}

/** Every course id: hand-built packs, and composed ones no hand-built pack overrides. */
export const courseIds = () => [...new Set([...legacyIds(), ...composedCourseIds()])].sort();

/** The raw files of course `id`: `{ meta, units: { [unitId]: unit }, labels: { [ui]: labels } }`. */
export function readPack(id) {
  if (!legacyIds().includes(id)) return composeCourse(id, readCatalog(), { registry: readLanguages() });
  const meta = readJson(`courses/${id}/course.json`);
  const units = readUnits(`courses/${id}/units/`);
  const labels = {};
  for (const file of jsonIn(`courses/${id}/labels/`)) labels[file.replace(/\.json$/, '')] = readJson(`courses/${id}/labels/${file}`);
  return { meta, units, labels };
}

/**
 * Builds course `id`, with its headings in interface language `ui`
 * when it has labels for it; with `activate`, also makes it the active course.
 */
export function loadPack(id = 'en-lg', { activate = true, ui = null } = {}) {
  const { meta, units, labels } = readPack(id);
  const name = (code) => readLanguages().find((l) => l.code === code)?.name ?? code;
  const course = buildFromPack(meta, units, { from: name(meta.from), to: name(meta.to) }, labels[ui]);
  return activate ? useCourse(course) : course;
}
