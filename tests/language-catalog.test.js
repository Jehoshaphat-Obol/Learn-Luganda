import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import catalog from '../docs/languages/catalog.json';
import registry from '../src/packs/languages.json';
import { renderReadme } from '../scripts/language-catalog.js';

const all = [...catalog.africa, ...catalog.global];

describe('language catalog', () => {
  it('lists each language once per list, with everything the plan needs', () => {
    for (const list of [catalog.africa, catalog.global]) {
      const codes = list.map((l) => l.code);
      expect(new Set(codes).size).toBe(codes.length);
    }
    for (const l of all) {
      expect(l.code, l.name).toMatch(/^[a-z]{2,3}$/);
      expect(l.countries.length, l.code).toBeGreaterThan(0);
      for (const c of l.countries) expect(c, l.code).toMatch(/^[A-Z]{2}$/);
      expect(Object.keys(catalog.waves), l.code).toContain(String(l.wave));
      expect(['high', 'medium', 'low'], l.code).toContain(l.draftConfidence);
      expect(l.speakersMillions, l.code).toBeGreaterThanOrEqual(0);
    }
  });

  it('knows every language the app registers, and which ones those are', () => {
    const codes = new Set(all.map((l) => l.code));
    for (const { code } of registry.languages) expect(codes, code).toContain(code);
    const registered = new Set(registry.languages.map((l) => l.code));
    for (const l of all) expect(l.inRegistry, l.code).toBe(registered.has(l.code));
  });

  it('has its README tables up to date (run npm run catalog)', () => {
    const readme = readFileSync('docs/languages/README.md', 'utf8');
    expect(renderReadme(readme, catalog)).toBe(readme);
  });
});
