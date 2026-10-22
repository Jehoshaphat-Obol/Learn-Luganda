// Writes src/packs/lang/coverage.json: how much of the shared curriculum
// each lang pack fills, which decides the composed courses the app offers
// (src/content/compose.js). `npm run validate` fails when it's out of date.
import { writeFileSync } from 'node:fs';
import { coverageReport } from '../src/content/compose.js';
import { formatJson } from './format-json.js';
import { packRoot, readCatalog, composedCourseIds } from './load-pack.js';

const catalog = readCatalog();
if (!catalog) {
  console.log('No shared catalog here.');
  process.exit(0);
}
writeFileSync(new URL('lang/coverage.json', packRoot), `${formatJson(coverageReport(catalog))}\n`);
const report = coverageReport(catalog);
for (const [code, c] of Object.entries(report.languages)) console.log(`${code}: ${Math.round(c.target * 100)}% as target, ${Math.round(c.base * 100)}% as base`);
catalog.coverage = report;
console.log(`Composed courses: ${composedCourseIds().join(', ') || 'none'}`);
