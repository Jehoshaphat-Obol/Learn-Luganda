// Reads course packs from disk for Node scripts and e2e tests (the browser
// uses src/content/load.js). Same result as the app's loader.
//
// Scripts run with `--root <dir>` read packs from another folder laid out
// like src/packs (ui/ and courses/), such as the example in
// docs/packs/example. The language registry always comes from src/packs.
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildFromPack, useCourse } from '../src/content/course.js';

const app = new URL('../src/packs/', import.meta.url);
const flag = process.argv.indexOf('--root');
/** The folder the packs are read from. */
export const packRoot = flag > 0 ? pathToFileURL(`${resolve(process.argv[flag + 1])}/`) : app;
const readJson = (path, base = packRoot) => JSON.parse(readFileSync(new URL(path, base), 'utf8'));

export const courseIds = () => readdirSync(new URL('courses/', packRoot)).sort();
export const readLanguages = () => readJson('languages.json', app).languages;

/** The raw files of course pack `id`: `{ meta, units: { [unitId]: unit } }`. */
export function readPack(id) {
  const meta = readJson(`courses/${id}/course.json`);
  const units = {};
  for (const file of readdirSync(new URL(`courses/${id}/units/`, packRoot)).filter((f) => f.endsWith('.json'))) {
    const unit = readJson(`courses/${id}/units/${file}`);
    units[unit.id] = unit;
  }
  return { meta, units };
}

/** Builds course pack `id`; with `activate`, also makes it the active course. */
export function loadPack(id = 'en-lg', { activate = true } = {}) {
  const { meta, units } = readPack(id);
  const name = (code) => readLanguages().find((l) => l.code === code)?.name ?? code;
  const course = buildFromPack(meta, units, { from: name(meta.from), to: name(meta.to) });
  return activate ? useCourse(course) : course;
}
