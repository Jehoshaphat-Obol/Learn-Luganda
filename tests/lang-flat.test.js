/*
 * scripts/lang-flat.js turns a lang unit into tab lines for translating and
 * back (#184). Every unit of every lang pack must survive the round trip.
 */
import { readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { build, dump, readUnit } from '../scripts/lang-flat.js';

const root = 'src/packs/lang/';
const codes = readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
const units = (code) => readdirSync(`${root}${code}/units/`).map((f) => f.replace('.json', ''));
const strip = ({ $schema, ...rest }) => rest;

describe.each(codes)('lang/%s', (code) => {
  it('round-trips every unit through tab lines', () => {
    for (const id of units(code)) {
      const unit = readUnit(code, id);
      expect(strip(build(dump(unit), unit)), id).toEqual(strip(unit));
    }
  });
});

describe('build', () => {
  const ref = readUnit('en', 'u1');
  const lines = dump(ref).trimEnd().split('\n');

  it('refuses a draft with a missing line', () => {
    expect(() => build(lines.slice(1).join('\n'), ref)).toThrow(/missing/);
  });

  it('refuses unknown keys', () => {
    expect(() => build([...lines, 'W not-a-word\tx'].join('\n'), ref)).toThrow(/unknown keys/);
  });

  it('skips a story left out whole, but not half a story', () => {
    const story = Object.keys(ref.stories)[0];
    const without = lines.filter((l) => !l.startsWith(`T ${story} `));
    expect(build(without.join('\n'), ref).stories[story]).toBeUndefined();
    const half = lines.filter((l) => !l.startsWith(`T ${story} L0`));
    expect(() => build(half.join('\n'), ref)).toThrow(/missing/);
  });

  it('applies French typography when asked', () => {
    const fixed = build(lines.map((l, i) => (i === 0 ? `${l.split('\t')[0]}\tC'est vrai ?` : l)).join('\n'), ref, { typography: 'fr' });
    expect(Object.values(fixed.words)[0].text).toBe('C’est vrai ?');
  });
});
