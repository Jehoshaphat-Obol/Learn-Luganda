/*
 * Loads courses in the browser. A course is either a hand-built pack
 * (src/packs/courses/<from>-<to>/) or composed from the shared catalog
 * (src/packs/curriculum/ and src/packs/lang/<code>/, see ./compose.js).
 * Each JSON file is split into its own chunk by the bundler, so learners
 * only download the languages they use. Scripts and e2e tests use
 * scripts/load-pack.js, which reads the same files from disk.
 */
import { buildFromPack, useCourse } from './course.js';
import { composeCourse, composedIds, aboutChain } from './compose.js';
import { languageInfo, LANGUAGES } from '../i18n/languages.js';
import coverage from '../packs/lang/coverage.json';

export const DEFAULT_COURSE = 'en-lg';

const glob = {
  metas: import.meta.glob('../packs/courses/*/course.json', { import: 'default' }),
  units: import.meta.glob('../packs/courses/*/units/*.json', { import: 'default' }),
  labels: import.meta.glob('../packs/courses/*/labels/*.json', { import: 'default' }),
  curriculum: import.meta.glob('../packs/curriculum/course.json', { import: 'default' }),
  curriculumUnits: import.meta.glob('../packs/curriculum/units/*.json', { import: 'default' }),
  lang: import.meta.glob('../packs/lang/*/course.json', { import: 'default' }),
  langUnits: import.meta.glob('../packs/lang/*/units/*.json', { import: 'default' }),
  about: import.meta.glob('../packs/lang/*/about/*/course.json', { import: 'default' }),
  aboutUnits: import.meta.glob('../packs/lang/*/about/*/units/*.json', { import: 'default' }),
};
const idOf = (path) => path.split('/').at(-2);

const LEGACY_IDS = Object.keys(glob.metas).map(idOf);

/** Ids of every course the app offers: hand-built packs, then composed ones. */
export const COURSE_IDS = Object.freeze([...new Set([...LEGACY_IDS, ...composedIds(coverage, LANGUAGES)])].sort());

/**
 * Loads course `id` and makes it the active course, with its headings
 * in interface language `ui` where there are labels for it. An unknown
 * id, or a pack that can't be read (say, a newer format than this app
 * knows), falls back to the default course.
 */
export async function loadCourse(id = DEFAULT_COURSE, ui = null) {
  if (id !== DEFAULT_COURSE) {
    try {
      if (COURSE_IDS.includes(id)) return await loadPack(id, ui);
    } catch (err) {
      console.error(err);
    }
  }
  return loadPack(DEFAULT_COURSE, ui);
}

async function loadPack(key, ui) {
  const { meta, units, labels } = LEGACY_IDS.includes(key) ? await readLegacy(key, ui) : await readComposed(key, ui);
  const names = { from: languageInfo(meta.from).name, to: languageInfo(meta.to).name };
  return useCourse(buildFromPack(meta, units, names, labels));
}

/** Loads every file in `files` whose path starts with `prefix`, as `{ [id]: unit }`. */
async function unitsIn(files, prefix) {
  const loaded = await Promise.all(Object.entries(files).filter(([p]) => p.startsWith(prefix)).map(([, load]) => load()));
  return Object.fromEntries(loaded.map((u) => [u.id, u]));
}

/** A file that may be missing or fail to load: its content, or null. */
async function optional(load) {
  if (!load) return null;
  try {
    return await load();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function readLegacy(key, ui) {
  const [meta, units, labels] = await Promise.all([
    glob.metas[`../packs/courses/${key}/course.json`](),
    unitsIn(glob.units, `../packs/courses/${key}/units/`),
    optional(ui && glob.labels[`../packs/courses/${key}/labels/${ui}.json`]),
  ]);
  return { meta, units, labels };
}

async function readComposed(key, ui) {
  const [from, to] = key.split('-');
  const langPack = async (code) => ({ meta: await glob.lang[`../packs/lang/${code}/course.json`](), units: await unitsIn(glob.langUnits, `../packs/lang/${code}/units/`) });
  const aboutPack = async (code) => {
    const dir = `../packs/lang/${code}/about/${to}/`;
    const units = await unitsIn(glob.aboutUnits, `${dir}units/`);
    const meta = await optional(glob.about[`${dir}course.json`]);
    return meta || Object.keys(units).length ? { meta, units } : null;
  };
  const chain = aboutChain(from, LANGUAGES);
  const uiMeta = ui && ui !== from && ui !== to ? optional(glob.lang[`../packs/lang/${ui}/course.json`]) : null;
  const [curriculumMeta, curriculumUnits, fromPack, toPack, notes, uiPack, uiAbout] = await Promise.all([
    glob.curriculum['../packs/curriculum/course.json'](),
    unitsIn(glob.curriculumUnits, '../packs/curriculum/units/'),
    langPack(from),
    langPack(to),
    Promise.all(chain.map(aboutPack)),
    uiMeta,
    ui && ui !== from ? optional(glob.about[`../packs/lang/${ui}/about/${to}/course.json`]) : null,
  ]);
  const lang = { [from]: fromPack, [to]: toPack };
  if (uiPack) lang[ui] = { meta: uiPack, units: {} };
  const about = Object.fromEntries(chain.map((c, i) => [c, notes[i] ? { [to]: notes[i] } : {}]));
  if (ui && uiAbout) about[ui] = { ...about[ui], [to]: { units: {}, ...about[ui]?.[to], meta: uiAbout } };
  const catalog = { curriculum: { meta: curriculumMeta, units: curriculumUnits }, lang, about };
  const pack = composeCourse(key, catalog, { registry: LANGUAGES, uis: ui ? [ui] : [] });
  return { meta: pack.meta, units: pack.units, labels: (ui && pack.labels[ui]) || null };
}
