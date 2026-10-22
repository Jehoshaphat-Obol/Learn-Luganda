/*
 * Copies the flag drawing for every `flag` in the language registry from the
 * flag-icons package (MIT) into src/ui/flags/, so only the flags the app
 * shows are bundled. Run after giving a language a flag: `npm run flags`.
 */
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';

const registry = JSON.parse(readFileSync('src/packs/languages.json', 'utf8'));
const out = 'src/ui/flags';
mkdirSync(out, { recursive: true });
const flags = [...new Set(registry.languages.map((l) => l.flag).filter(Boolean))].sort();
for (const cc of flags) copyFileSync(`node_modules/flag-icons/flags/4x3/${cc}.svg`, `${out}/${cc}.svg`);
copyFileSync('node_modules/flag-icons/LICENSE', `${out}/LICENSE`);
console.log(`Copied ${flags.length} flags: ${flags.join(' ')}`);
