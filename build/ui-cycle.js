/*
 * Vite plugin for `virtual:ui-cycle`: the few strings listed in
 * src/i18n/cycle-keys.js, taken from every UI pack at build time as
 * `{ code: { key: text } }`, so the entry screens can show them in every
 * language without downloading every whole pack.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { CYCLE_KEYS } from '../src/i18n/cycle-keys.js';
import { lookup } from '../src/i18n/format.js';

const ID = 'virtual:ui-cycle';
const RESOLVED = `\0${ID}`;

export function uiCycle({ dir = fileURLToPath(new URL('../src/packs/ui/', import.meta.url)) } = {}) {
  return {
    name: 'learn-luganda-ui-cycle',
    resolveId(id) {
      return id === ID ? RESOLVED : undefined;
    },
    load(id) {
      if (id !== RESOLVED) return undefined;
      const strings = {};
      for (const file of readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
        const path = join(dir, file);
        this.addWatchFile(path);
        const pack = JSON.parse(readFileSync(path, 'utf8'));
        const found = CYCLE_KEYS.map((key) => [key, lookup(pack.strings, key)]).filter(([, text]) => typeof text === 'string');
        strings[pack.meta.code] = Object.fromEntries(found);
      }
      return `export default ${JSON.stringify(strings)};`;
    },
  };
}
