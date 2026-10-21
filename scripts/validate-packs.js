// Validates the language packs; exits non-zero with a list of problems.
import { readFileSync, readdirSync } from 'node:fs';
import { Ajv2020 } from 'ajv/dist/2020.js';
import { validateUiPack } from '../src/i18n/validate.js';

const root = new URL('../', import.meta.url);
const readJson = (path) => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const ajv = new Ajv2020({ allErrors: true });
// Shared parts other schemas point at.
ajv.addSchema(readJson('docs/packs/schema/settings.schema.json'), 'settings.schema.json');
const compiled = new Map();
const schemaErrors = (schemaPath, data, where) => {
  if (!compiled.has(schemaPath)) compiled.set(schemaPath, ajv.compile(readJson(schemaPath)));
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
const uiFiles = readdirSync(new URL('src/packs/ui/', root)).filter((f) => f.endsWith('.json'));
for (const file of uiFiles) {
  const code = file.replace(/\.json$/, '');
  const pack = readJson(`src/packs/ui/${file}`);
  errors.push(...schemaErrors('docs/packs/schema/ui-pack.schema.json', pack, `ui/${code}`));
  const result = validateUiPack(pack, english, { code, languages: registry.languages });
  errors.push(...result.errors);
  if (result.missing.length) notes.push(`ui/${code}: ${result.missing.length} string(s) fall back to English`);
}

const coursesDir = new URL('src/packs/courses/', root);
const courseDirs = readdirSync(coursesDir);
for (const id of courseDirs) {
  const meta = readJson(`src/packs/courses/${id}/course.json`);
  errors.push(...schemaErrors('docs/packs/schema/course.schema.json', meta, `courses/${id}/course.json`));
  if (meta.id !== id) errors.push(`courses/${id}: id "${meta.id}" doesn't match the folder name`);
  if (meta.id !== `${meta.from}-${meta.to}`) errors.push(`courses/${id}: id must be "${meta.from}-${meta.to}"`);
  for (const code of [meta.from, meta.to]) if (!codes.includes(code)) errors.push(`courses/${id}: "${code}" is not in languages.json`);
  for (const file of readdirSync(new URL(`${id}/units/`, coursesDir)).filter((f) => f.endsWith('.json'))) {
    const unit = readJson(`src/packs/courses/${id}/units/${file}`);
    errors.push(...schemaErrors('docs/packs/schema/course-unit.schema.json', unit, `courses/${id}/units/${file}`));
    if (`${unit.id}.json` !== file) errors.push(`courses/${id}/units/${file}: id "${unit.id}" doesn't match the file name`);
  }
}

if (errors.length) {
  console.error(`Packs have ${errors.length} problem(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
for (const n of notes) console.log(n);
console.log(`Packs OK: ${uiFiles.length} UI pack(s), ${courseDirs.length} course pack(s), ${registry.languages.length} languages in the registry.`);
