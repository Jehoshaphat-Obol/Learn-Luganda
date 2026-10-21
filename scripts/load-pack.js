// Reads course packs from disk for Node scripts and e2e tests (the browser
// uses src/content/load.js). Same result as the app's loader.
import { readFileSync, readdirSync } from 'node:fs';
import { buildFromPack, useCourse } from '../src/content/course.js';

const root = new URL('../src/packs/', import.meta.url);
const readJson = (path) => JSON.parse(readFileSync(new URL(path, root), 'utf8'));

export const courseIds = () => readdirSync(new URL('courses/', root)).sort();
export const readLanguages = () => readJson('languages.json').languages;

/** The raw files of course pack `id`: `{ meta, units: { [unitId]: unit } }`. */
export function readPack(id) {
  const meta = readJson(`courses/${id}/course.json`);
  const units = {};
  for (const file of readdirSync(new URL(`courses/${id}/units/`, root)).filter((f) => f.endsWith('.json'))) {
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
