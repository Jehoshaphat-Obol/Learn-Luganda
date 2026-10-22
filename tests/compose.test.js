/*
 * Courses composed from the shared catalog (src/content/compose.js).
 *
 * The golden test pins phase 1 of #185: en-lg, sw-lg and lg-en, rebuilt from
 * curriculum/ and lang/<code>/, against the hand-built packs they replaced
 * (tests/fixtures/legacy-courses.json.gz, written from the packs at the
 * commit before they were deleted). Every difference must be one of the
 * deliberate ones listed here. When shared text is changed on purpose
 * later, add the path to INTENDED.
 *
 * Phase 2 (#187) grows the curriculum: concepts, skills and headings the
 * legacy packs didn't have are left out before comparing (see `known`), so
 * what learners already had must stay as it was.
 */
import { gunzipSync } from 'node:zlib';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { asTarget, composePack, composedIds, coverage, cultureOf, fillCulture, fillNames, pickAbout, aboutChain } from '../src/content/compose.js';
import { COURSE_IDS } from '../src/content/load.js';
import { readCatalog, readLanguages, readPack } from '../scripts/load-pack.js';
import { composeCourse } from '../src/content/compose.js';
import { diff, normalize } from './golden-diff.js';

const legacy = JSON.parse(gunzipSync(readFileSync('tests/fixtures/legacy-courses.json.gz')).toString());

// Text settled by hand where two courses disagreed (scripts/split-course.js PREFER).
const INTENDED = {
  'en-lg': [
    'units.u9.words[15].base', // mulungi: "beautiful", as in lg-en ("good" is bulungi)
    'units.u27.words[7].base', // emmwanyi: "coffee beans", as in lg-en ("coffee" is kaawa)
    'units.u20.sentences[4].base', // "…visit my grandparent."
    'units.u20.guidebook.phrases[3].base',
  ],
  'sw-lg': [],
  'lg-en': [],
};

/**
 * Accepted answers merge every course's, so they may only grow: the item's
 * own text counts as accepted.
 */
function accepted(pack) {
  const copy = structuredClone(pack);
  for (const u of Object.values(copy.units)) {
    for (const item of [...u.words, ...u.sentences]) {
      item.altTarget = [...new Set([item.target, ...(item.altTarget ?? [])])];
      item.altBase = [...new Set([item.base, ...(item.altBase ?? [])])];
    }
  }
  return normalize(copy);
}

/** `pack` without the units' words, sentences and skills `old` doesn't have, nor their headings. */
function known(pack, old) {
  const copy = structuredClone(pack);
  for (const [id, u] of Object.entries(copy.units)) {
    const was = old.units[id];
    for (const kind of ['words', 'sentences', 'skills']) u[kind] = u[kind].filter((x) => was[kind].some((y) => y.id === x.id));
  }
  for (const [ui, l] of Object.entries(copy.labels ?? {})) if (l.skills) l.skills = Object.fromEntries(Object.entries(l.skills).filter(([k]) => k in (old.labels[ui]?.skills ?? {})));
  return copy;
}

describe('composed courses match the hand-built packs they replaced', () => {
  it.each(Object.keys(legacy))('%s', (id) => {
    const old = accepted(legacy[id]);
    const now = accepted(known(composeCourse(id, readCatalog(), { registry: readLanguages(), uis: Object.keys(legacy[id].labels) }), legacy[id]));
    const unexpected = diff(old, now).filter((line) => {
      const [path] = line.split(': ');
      if (INTENDED[id].includes(path)) return false;
      // Phase 2 raised the curriculum version (new skills carry `since`).
      if (path === 'meta.version') return false;
      // Landing copy in another interface language now comes from the notes
      // about the target language in that language, not a per-course copy.
      if (/^labels\.[a-z]+\.landing\./.test(path)) return false;
      // Accepted answers may only grow.
      const alts = path.match(/^(units\.u\d+\.(?:words|sentences)\[\d+\])\.(altTarget|altBase)/);
      if (alts) {
        const get = (p, x) => p.split(/\.|\[|\]/).filter(Boolean).reduce((o, k) => o?.[k], x);
        const before = get(`${alts[1]}.${alts[2]}`, old) ?? [];
        const after = get(`${alts[1]}.${alts[2]}`, now) ?? [];
        const changedText = INTENDED[id].includes(`${alts[1]}.${alts[2] === 'altBase' ? 'base' : 'target'}`);
        return !changedText && !before.every((a) => after.includes(a));
      }
      return true;
    });
    expect(unexpected).toEqual([]);
  });

  it('the app loads them like any other course', () => {
    expect(readPack('en-lg').meta).toMatchObject({ id: 'en-lg', from: 'en', to: 'lg', title: 'Luganda for English speakers' });
    expect(Object.keys(readPack('lg-en').units)).toHaveLength(40);
  });
});

describe('composing', () => {
  const curriculum = {
    meta: { version: 1, cast: { nakato: { name: 'Nakato', look: 'nakato' } }, sections: [{ id: 's1', units: ['u1'] }] },
    units: {
      u1: {
        id: 'u1',
        words: ['musome', 'soma', 'bulungi'],
        sentences: ['s-lang'],
        phrases: 0,
        skills: [{ id: 'u1s1', lessons: [{ id: 'u1s1l1', newWords: ['musome', 'soma', 'bulungi'], dialogues: [{ speaker: 'nakato', answer: 1 }] }] }],
      },
    },
  };
  const en = {
    meta: { code: 'en', courseTitle: '{to} for English speakers', languageNames: { lg: 'Luganda', en: 'English' }, units: { u1: { title: 'Class' } }, skills: { u1s1: 'Reading' }, cast: { nakato: 'Your guide' } },
    units: {
      u1: {
        words: { musome: { text: 'Read (all of you)' }, soma: { text: 'Read' }, bulungi: { text: 'well', alts: ['fine'] } },
        sentences: { 's-lang': { text: 'Do you speak {to}?' } },
        dialogues: { u1s1l1: [{ line: 'Hello', options: ['No', 'Hi!'] }] },
      },
    },
  };
  const lg = {
    meta: { code: 'lg', languageNames: { lg: { name: 'Oluganda', mu: 'Luganda' }, en: { name: 'Olungereza', mu: 'Lungereza' } }, cheers: ['Kale!'] },
    units: {
      u1: {
        words: { musome: { text: 'Musome' }, soma: { text: 'Soma' }, bulungi: { text: 'bulungi' } },
        sentences: { 's-lang': { text: 'Oyogera {to}?' } },
        dialogues: { u1s1l1: [{ line: 'Oli otya', options: ['Nedda', 'Gyendi!'] }] },
      },
    },
  };

  it('keeps a word’s hint in its meaning and leaves it out of the answer', () => {
    expect(asTarget('Read (all of you)')).toBe('Read');
    const { units } = composePack({ curriculum, from: lg, to: en });
    expect(units.u1.words.map((w) => w.target)).toEqual(['Read', 'well']);
    const back = composePack({ curriculum, from: en, to: lg });
    expect(back.units.u1.words.find((w) => w.id === 'musome').base).toBe('Read (all of you)');
  });

  it('leaves out words whose answer repeats an earlier one, in lessons too', () => {
    const { units } = composePack({ curriculum, from: lg, to: en });
    expect(units.u1.words.map((w) => w.id)).toEqual(['musome', 'bulungi']);
    expect(units.u1.skills[0].lessons[0].newWords).toEqual(['musome', 'bulungi']);
  });

  it('names the language being learned in each text’s own language', () => {
    expect(composePack({ curriculum, from: en, to: lg }).units.u1.sentences[0]).toMatchObject({ target: 'Oyogera Oluganda?', base: 'Do you speak Luganda?' });
    expect(composePack({ curriculum, from: lg, to: en }).units.u1.sentences[0]).toMatchObject({ target: 'Do you speak English?', base: 'Oyogera Olungereza?' });
    expect(fillNames('mu {to.mu}', lg.meta.languageNames, { to: 'en' })).toBe('mu Lungereza');
    expect(fillNames('{to}', {}, { to: 'fr' })).toBe('{to}');
  });

  it('takes headings, title and cast roles from the base language, cheers and replies from the target', () => {
    const { meta, units } = composePack({ curriculum, from: en, to: lg });
    expect(meta).toMatchObject({ id: 'en-lg', title: 'Luganda for English speakers', cheers: ['Kale!'], cast: { nakato: { name: 'Nakato', role: 'Your guide' } } });
    expect(units.u1).toMatchObject({ title: 'Class', skills: [{ title: 'Reading' }] });
    expect(units.u1.skills[0].lessons[0].dialogues[0]).toEqual({ speaker: 'nakato', target: 'Oli otya', base: 'Hello', options: ['Nedda', 'Gyendi!'], answer: 'Gyendi!' });
  });

  it('fills culture slots from the target language, else the base, else the curriculum', () => {
    const cm = { cast: { nakato: { name: 'Nakato' }, jjajja: { name: 'Jjajja Nalwoga', short: 'Jjajja' } }, places: { city: 'Kampala', island: 'Ssese' } };
    const sw = { culture: { cast: { jjajja: { name: 'Bibi Mwanaisha', short: 'Bibi' } }, places: { city: 'Dar es Salaam' } } };
    const swahili = cultureOf(cm, {}, sw);
    expect(fillCulture('{@nakato} and {@jjajja} ({@jjajja.name}) live in {@city}, not {@island}.', swahili)).toBe('Nakato and Bibi (Bibi Mwanaisha) live in Dar es Salaam, not Ssese.');
    expect(cultureOf(cm, sw, {}).places.city).toBe('Dar es Salaam');
    expect(cultureOf(cm, sw, { culture: {} }).places.city).toBe('Kampala');
    expect(fillCulture('{@nobody}', swahili)).toBe('{@nobody}');
  });

  it('gives each real course its target language’s cast and places', () => {
    const lgSw = readPack('lg-sw');
    const enLg = readPack('en-lg');
    const text = (pack) => JSON.stringify(pack.units);
    expect(lgSw.meta.cast.nakato.name).toBe('Amani');
    expect(text(lgSw)).toContain('Ninaishi Dar es Salaam.');
    expect(text(lgSw)).not.toMatch(/\bNakato\b/);
    expect(enLg.meta.cast.nakato.name).toBe('Nakato');
    expect(text(enLg)).not.toMatch(/\b(Amani|Baraka|Neema)\b/);
    expect(text(readPack('sw-lg'))).toContain('Ninaishi Kampala.');
  });

  it('falls back to notes in the pivot language, then English', () => {
    expect(aboutChain('lg', [{ code: 'lg', pivot: 'sw' }])).toEqual(['lg', 'sw', 'en']);
    expect(aboutChain('en')).toEqual(['en']);
    const notes = pickAbout(['lg', 'en'], { en: { meta: { description: 'English notes' }, units: { u1: { notes: { musome: 'plural' } } } } });
    expect(notes.meta.description).toBe('English notes');
    expect(notes.units.u1.notes.musome).toBe('plural');
  });

  it('offers a pair once both languages are covered and there are notes', () => {
    expect(coverage(curriculum, lg).base).toBeLessThan(1);
    const report = { languages: { en: { target: 1, base: 1 }, lg: { target: 1, base: 1 }, fr: { target: 0, base: 0.1 } }, about: { en: { lg: 1 } } };
    expect(composedIds(report)).toEqual(['en-lg']);
    report.about.en.en = 1;
    expect(composedIds(report)).toEqual(['en-lg', 'lg-en']);
  });

  it('the app offers the composed Luganda courses', () => {
    expect(COURSE_IDS).toEqual(expect.arrayContaining(['en-lg', 'lg-en', 'sw-lg', 'en-sw', 'sw-en']));
  });
});
