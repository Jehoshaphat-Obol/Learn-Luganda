/*
 * Loads course packs in the browser. Each pack's JSON is split into its own
 * chunks by the bundler, so learners only download the course they take.
 * Scripts and e2e tests use scripts/load-pack.js, which reads the same files
 * from disk.
 */
import { buildFromPack, useCourse } from './course.js';
import { languageInfo } from '../i18n/languages.js';

export const DEFAULT_COURSE = 'en-lg';

const metas = import.meta.glob('../packs/courses/*/course.json', { import: 'default' });
const units = import.meta.glob('../packs/courses/*/units/*.json', { import: 'default' });
const idOf = (path) => path.split('/').at(-2);

/** Ids of every course pack the app ships. */
export const COURSE_IDS = Object.freeze(Object.keys(metas).map(idOf).sort());

/**
 * Loads course pack `id` and makes it the active course. An unknown id, or a
 * pack that can't be read (say, a newer format than this app knows), falls
 * back to the default course.
 */
export async function loadCourse(id = DEFAULT_COURSE) {
  if (id !== DEFAULT_COURSE) {
    try {
      if (COURSE_IDS.includes(id)) return await loadPack(id);
    } catch (err) {
      console.error(err);
    }
  }
  return loadPack(DEFAULT_COURSE);
}

async function loadPack(key) {
  const meta = await metas[`../packs/courses/${key}/course.json`]();
  const prefix = `../packs/courses/${key}/units/`;
  const files = await Promise.all(Object.entries(units).filter(([p]) => p.startsWith(prefix)).map(([, load]) => load()));
  const byId = Object.fromEntries(files.map((u) => [u.id, u]));
  const names = { from: languageInfo(meta.from).name, to: languageInfo(meta.to).name };
  return useCourse(buildFromPack(meta, byId, names));
}
