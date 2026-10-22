// Validates the language packs; exits non-zero with a list of problems.
import { readFileSync, readdirSync } from 'node:fs';
import { Ajv2020 } from 'ajv/dist/2020.js';
import { validateUiPack } from '../src/i18n/validate.js';
import { checkLabels } from '../src/content/labels.js';
import { coverageReport } from '../src/content/compose.js';
import { composedCourseIds, legacyIds, packRoot, readCatalog, readPack } from './load-pack.js';

const root = new URL('../', import.meta.url);
// Paths under the packs being checked (src/packs, or --root <dir>).
const packPath = (path) => new URL(path, packRoot).pathname.slice(new URL(root).pathname.length);
const readJson = (path) => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const ajv = new Ajv2020({ allErrors: true });
// Shared parts other schemas point at.
for (const name of ['settings', 'course', 'course-unit', 'course-labels']) ajv.addSchema(readJson(`docs/packs/schema/${name}.schema.json`));
const compiled = new Map();
const schemaErrors = (schemaPath, data, where) => {
  if (!compiled.has(schemaPath)) {
    const schema = readJson(schemaPath);
    compiled.set(schemaPath, ajv.getSchema(schema.$id) ?? ajv.compile(schema));
  }
  const check = compiled.get(schemaPath);
  return check(data) ? [] : check.errors.map((e) => `${where}${e.instancePath || ''}: ${e.message}`);
};

const errors = [];
const notes = [];

const registry = readJson('src/packs/languages.json');
errors.push(...schemaErrors('docs/packs/schema/languages.schema.json', registry, 'languages.json'));
const codes = registry.languages.map((l) => l.code);
for (const c of new Set(codes)) if (codes.filter((x) => x === c).length > 1) errors.push(`languages.json: "${c}" is listed twice`);

const regions = readJson('src/packs/regions.json');
errors.push(...schemaErrors('docs/packs/schema/regions.schema.json', regions, 'regions.json'));
for (const [country, langs] of Object.entries(regions.countries)) for (const c of langs) if (!codes.includes(c)) errors.push(`regions.json: ${country} lists "${c}", which is not in languages.json`);
for (const [zone, country] of Object.entries(regions.timeZones)) if (!regions.countries[country]) errors.push(`regions.json: ${zone} maps to ${country}, which has no languages`);

const english = readJson('src/packs/ui/en.json');
const uiFiles = readdirSync(new URL('ui/', packRoot)).filter((f) => f.endsWith('.json'));
for (const file of uiFiles) {
  const code = file.replace(/\.json$/, '');
  const pack = readJson(packPath(`ui/${file}`));
  errors.push(...schemaErrors('docs/packs/schema/ui-pack.schema.json', pack, `ui/${code}`));
  const result = validateUiPack(pack, english, { code, languages: registry.languages });
  errors.push(...result.errors);
  if (result.missing.length) notes.push(`ui/${code}: ${result.missing.length} string(s) fall back to English`);
}

// The shared catalog (src/content/compose.js): every id a lang pack or
// note uses must be in the curriculum, and coverage.json must be current.
const catalog = readCatalog();
if (catalog) {
  const { curriculum, lang, about } = catalog;
  errors.push(...schemaErrors('docs/packs/schema/curriculum.schema.json', curriculum.meta, 'curriculum/course.json'));
  const sectionUnits = curriculum.meta.sections.flatMap((s) => s.units);
  for (const id of sectionUnits) if (!curriculum.units[id]) errors.push(`curriculum/course.json: unit ${id} has no file`);
  const ids = { units: new Set(Object.keys(curriculum.units)), skills: new Set(), lessons: new Set(), words: new Set(), sentences: new Set(), stories: new Set() };
  for (const u of Object.values(curriculum.units)) {
    errors.push(...schemaErrors('docs/packs/schema/curriculum-unit.schema.json', u, `curriculum/units/${u.id}.json`));
    if (!sectionUnits.includes(u.id)) errors.push(`curriculum/units/${u.id}.json: not in any section`);
    u.words.forEach((w) => ids.words.add(w));
    u.sentences.forEach((w) => ids.sentences.add(w));
    for (const sk of u.skills) {
      ids.skills.add(sk.id);
      for (const l of sk.lessons) ids.lessons.add(l.id);
    }
    for (const st of u.stories ?? []) ids.stories.add(st.id);
  }
  const unknown = (where, kind, keys) => {
    for (const k of Object.keys(keys ?? {})) if (!ids[kind].has(k)) errors.push(`${where}: no ${kind.replace(/s$/, '')} "${k}" in the curriculum`);
  };
  for (const [code, pack] of Object.entries(lang)) {
    const where = `lang/${code}`;
    errors.push(...schemaErrors('docs/packs/schema/lang.schema.json', pack.meta, `${where}/course.json`));
    if (pack.meta.code !== code) errors.push(`${where}/course.json: code "${pack.meta.code}" doesn't match the folder name`);
    if (!codes.includes(code)) errors.push(`${where}: "${code}" is not in languages.json`);
    unknown(`${where}/course.json units`, 'units', pack.meta.units);
    unknown(`${where}/course.json skills`, 'skills', pack.meta.skills);
    for (const [id, u] of Object.entries(pack.units)) {
      const file = `${where}/units/${id}.json`;
      errors.push(...schemaErrors('docs/packs/schema/lang-unit.schema.json', u, file));
      if (!ids.units.has(id)) errors.push(`${file}: no unit "${id}" in the curriculum`);
      unknown(file, 'words', u.words);
      unknown(file, 'sentences', u.sentences);
      unknown(file, 'lessons', u.dialogues);
      unknown(file, 'stories', u.stories);
    }
    for (const [to, ab] of Object.entries(about[code] ?? {})) {
      const dir = `${where}/about/${to}`;
      if (!lang[to] && !codes.includes(to)) errors.push(`${dir}: "${to}" is not in languages.json`);
      if (ab.meta) errors.push(...schemaErrors('docs/packs/schema/about.schema.json', ab.meta, `${dir}/course.json`));
      for (const [id, u] of Object.entries(ab.units)) {
        const file = `${dir}/units/${id}.json`;
        errors.push(...schemaErrors('docs/packs/schema/about-unit.schema.json', u, file));
        if (!ids.units.has(id)) errors.push(`${file}: no unit "${id}" in the curriculum`);
        for (const k of Object.keys(u.notes ?? {})) if (!ids.words.has(k) && !ids.sentences.has(k)) errors.push(`${file}: notes for "${k}", which isn't a word or sentence`);
        unknown(file, 'skills', u.tips);
        unknown(file, 'stories', u.glosses);
        const tipIds = new Set((u.guidebook?.tips ?? []).map((t) => t.id));
        for (const [skill, tip] of Object.entries(u.tips ?? {})) if (tip && !tipIds.has(tip)) errors.push(`${file}: skill ${skill} links to tip "${tip}", which the guidebook doesn't have`);
      }
    }
  }
  const report = coverageReport(catalog);
  if (JSON.stringify(report) !== JSON.stringify(catalog.coverage)) errors.push('lang/coverage.json is out of date: run `npm run coverage`');
  for (const [code, c] of Object.entries(report.languages)) notes.push(`lang/${code}: ${Math.round(c.target * 100)}% as target, ${Math.round(c.base * 100)}% as base`);
}

// Labels for composed courses come from each language's lang pack.
const composed = composedCourseIds().filter((id) => !legacyIds().includes(id));
for (const id of composed) {
  const pack = readPack(id);
  for (const [ui, labels] of Object.entries(pack.labels)) {
    if (!uiFiles.includes(`${ui}.json`)) continue;
    const result = checkLabels(labels, pack, ui);
    errors.push(...result.errors.map((e) => `${id} labels from lang/${ui}: ${e}`));
    if (result.missing.length) notes.push(`${id} in ${ui}: ${result.missing.length} label(s) fall back to the course's own text`);
  }
}

const coursesDir = new URL('courses/', packRoot);
const courseDirs = legacyIds();
for (const id of courseDirs) {
  const meta = readJson(packPath(`courses/${id}/course.json`));
  errors.push(...schemaErrors('docs/packs/schema/course.schema.json', meta, `courses/${id}/course.json`));
  if (meta.id !== id) errors.push(`courses/${id}: id "${meta.id}" doesn't match the folder name`);
  if (meta.id !== `${meta.from}-${meta.to}`) errors.push(`courses/${id}: id must be "${meta.from}-${meta.to}"`);
  for (const code of [meta.from, meta.to]) if (!codes.includes(code)) errors.push(`courses/${id}: "${code}" is not in languages.json`);
  for (const file of readdirSync(new URL(`${id}/units/`, coursesDir)).filter((f) => f.endsWith('.json'))) {
    const unit = readJson(packPath(`courses/${id}/units/${file}`));
    errors.push(...schemaErrors('docs/packs/schema/course-unit.schema.json', unit, `courses/${id}/units/${file}`));
    if (`${unit.id}.json` !== file) errors.push(`courses/${id}/units/${file}: id "${unit.id}" doesn't match the file name`);
  }
  const pack = readPack(id);
  for (const [ui, labels] of Object.entries(pack.labels)) {
    const where = `courses/${id}/labels/${ui}.json`;
    errors.push(...schemaErrors('docs/packs/schema/course-labels.schema.json', labels, where));
    if (!uiFiles.includes(`${ui}.json`)) errors.push(`${where}: there is no ${ui} interface pack`);
    if (ui === meta.from) errors.push(`${where}: the course is already written in ${ui}`);
    const result = checkLabels(labels, pack, ui);
    errors.push(...result.errors.map((e) => `${where}: ${e}`));
    if (result.missing.length) notes.push(`${where}: ${result.missing.length} label(s) fall back to the course's own text`);
  }
}

if (errors.length) {
  console.error(`Packs have ${errors.length} problem(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
for (const n of notes) console.log(n);
console.log(`Packs OK${packRoot.href.endsWith('/src/packs/') ? '' : ` (${packPath('')})`}: ${uiFiles.length} UI pack(s), ${courseDirs.length} course pack(s), ${Object.keys(catalog?.lang ?? {}).length} lang pack(s) composing ${composed.length} course(s), ${registry.languages.length} languages in the registry.`);
