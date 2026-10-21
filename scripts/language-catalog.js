// Renders the tables in docs/languages/README.md from docs/languages/catalog.json.
// `node scripts/language-catalog.js` rewrites the README between the markers;
// tests/language-catalog.test.js fails when the two drift apart.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const START = '<!-- catalog:start -->';
const END = '<!-- catalog:end -->';

const status = (lang) => (lang.inRegistry ? 'yes' : '');
const speakers = (m) => (m >= 1 ? `${m}M` : m > 0 ? `${Math.round(m * 1000)}k` : 'few');

const table = (rows) => [
  '| Code | Language | Native name | Family | Script | Main countries | Speakers | Draft | In app |',
  '| --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  ...rows.map((l) => `| \`${l.code}\` | ${l.name} | ${l.nativeName} | ${l.family} | ${l.script} | ${l.countries.join(' ')} | ${speakers(l.speakersMillions)} | ${l.draftConfidence} | ${status(l)} |`),
].join('\n');

export function renderTables(catalog) {
  const out = [];
  const byWave = (list) => Object.keys(catalog.waves).map(Number)
    .map((wave) => [wave, list.filter((l) => l.wave === wave)])
    .filter(([, rows]) => rows.length);
  out.push(`## Languages spoken in Africa (${catalog.africa.length})`, '');
  for (const [wave, rows] of byWave(catalog.africa)) out.push(`### Wave ${wave}: ${catalog.waves[wave]} (${rows.length})`, '', table(rows), '');
  out.push(`## Major languages around the world (${catalog.global.length})`, '', table(catalog.global), '');
  return out.join('\n');
}

export function renderReadme(readme, catalog) {
  const start = readme.indexOf(START);
  const end = readme.indexOf(END);
  if (start < 0 || end < start) throw new Error(`README needs ${START} and ${END}`);
  return `${readme.slice(0, start + START.length)}\n\n${renderTables(catalog)}\n${readme.slice(end)}`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = new URL('../', import.meta.url);
  const catalog = JSON.parse(readFileSync(new URL('docs/languages/catalog.json', root), 'utf8'));
  const path = new URL('docs/languages/README.md', root);
  writeFileSync(path, renderReadme(readFileSync(path, 'utf8'), catalog));
}
