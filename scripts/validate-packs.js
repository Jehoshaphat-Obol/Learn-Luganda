// Validates the language packs; exits non-zero with a list of problems.
import { readFileSync, readdirSync } from 'node:fs';
import { Ajv2020 } from 'ajv/dist/2020.js';
import { validateUiPack } from '../src/i18n/validate.js';

const root = new URL('../', import.meta.url);
const readJson = (path) => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const ajv = new Ajv2020({ allErrors: true });
const schemaErrors = (schemaPath, data, where) => {
  const check = ajv.compile(readJson(schemaPath));
  return check(data) ? [] : check.errors.map((e) => `${where}${e.instancePath || ''}: ${e.message}`);
};

const errors = [];
const notes = [];

const registry = readJson('src/packs/languages.json');
errors.push(...schemaErrors('docs/packs/schema/languages.schema.json', registry, 'languages.json'));
const codes = registry.languages.map((l) => l.code);
for (const c of new Set(codes)) if (codes.filter((x) => x === c).length > 1) errors.push(`languages.json: "${c}" is listed twice`);

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

if (errors.length) {
  console.error(`Packs have ${errors.length} problem(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
for (const n of notes) console.log(n);
console.log(`Packs OK: ${uiFiles.length} UI pack(s), ${registry.languages.length} languages in the registry.`);
