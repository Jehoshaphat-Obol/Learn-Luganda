import { afterAll, describe, expect, it } from 'vitest';
import { applyLabels, checkLabels } from '../src/content/labels.js';
import { course } from '../src/content/course.js';
import { loadCourse } from '../src/content/load.js';

const metas = import.meta.glob('../src/packs/courses/*/course.json', { eager: true, import: 'default' });
const unitFiles = import.meta.glob('../src/packs/courses/*/units/*.json', { eager: true, import: 'default' });
const labelFiles = import.meta.glob('../src/packs/courses/*/labels/*.json', { eager: true, import: 'default' });
const dirOf = (path) => path.split('/').slice(0, 5).join('/');

const pack = {
  meta: { sections: [{ id: 's1', title: 'Foundations', level: 'Beginner', description: 'Basics.', units: ['u1'] }] },
  units: { u1: { id: 'u1', title: 'Greetings', description: 'Say hello.', skills: [{ id: 'u1s1', title: 'Hello' }, { id: 'u1s2', title: 'Introductions' }] } },
};

describe('course labels', () => {
  it('lays translated headings over the pack and keeps the rest', () => {
    const out = applyLabels(pack, { sections: { s1: { title: 'Misingi' } }, units: { u1: { title: 'Salamu' } }, skills: { u1s1: 'Habari' } });
    expect(out.meta.sections[0]).toMatchObject({ title: 'Misingi', level: 'Beginner', description: 'Basics.', units: ['u1'] });
    expect(out.units.u1).toMatchObject({ title: 'Salamu', description: 'Say hello.' });
    expect(out.units.u1.skills.map((s) => s.title)).toEqual(['Habari', 'Introductions']);
    expect(pack.units.u1.title).toBe('Greetings');
  });

  it('lays translated landing copy, cast roles and description over the pack', () => {
    const meta = {
      ...pack.meta,
      to: 'lg',
      description: 'Luganda is…',
      cast: { nakato: { name: 'Nakato', role: 'Your guide' } },
      landing: {
        hello: 'Oli otya?',
        words: [['Weebale', 'Thank you'], ['Kale', 'Okay']],
        why: { title: 'Why', text: 'Because.', cards: [{ title: 'For families', text: 'Reconnect.' }] },
        sample: { prompt: 'Which one?', options: ['Weebale'], answer: 'Weebale', explain: 'It means thanks.' },
      },
    };
    const labels = {
      description: 'Kiganda ni…',
      cast: { nakato: 'Kiongozi wako' },
      landing: { words: ['Asante'], why: { title: 'Kwa nini', cards: [{ title: 'Kwa familia' }] }, sample: { prompt: 'Lipi?' } },
    };
    const out = applyLabels({ meta, units: pack.units }, labels).meta;
    expect(out.description).toBe('Kiganda ni…');
    expect(out.cast.nakato).toEqual({ name: 'Nakato', role: 'Kiongozi wako' });
    expect(out.landing.words).toEqual([['Weebale', 'Asante'], ['Kale', 'Okay']]);
    expect(out.landing.why).toEqual({ title: 'Kwa nini', text: 'Because.', cards: [{ title: 'Kwa familia', text: 'Reconnect.' }] });
    expect(out.landing.sample).toMatchObject({ prompt: 'Lipi?', options: ['Weebale'], answer: 'Weebale', explain: 'It means thanks.' });
    expect(out.landing.hello).toBe('Oli otya?');
    expect(meta.landing.words[0][1]).toBe('Thank you');

    const { missing } = checkLabels(labels, { meta, units: pack.units }, 'sw');
    expect(missing.filter((m) => !/^(sections|units|skills)/.test(m))).toEqual([
      'landing.why.text',
      'landing.sample.explain',
      'landing.words.1',
      'landing.why.cards.0.text',
    ]);
    // Readers of the target language need no meanings for the ticker's words.
    expect(checkLabels(labels, { meta, units: pack.units }, 'lg').missing).not.toContain('landing.words.1');
  });

  it('without labels, returns the pack as it is', () => {
    expect(applyLabels(pack, null)).toBe(pack);
  });

  it('reports unknown ids and headings that fall back', () => {
    const { errors, missing } = checkLabels({ units: { u9: { title: 'X' } }, skills: { u1s1: 'Habari' } }, pack);
    expect(errors).toEqual(['units.u9: no such unit']);
    expect(missing).toEqual(['sections.s1.title', 'sections.s1.level', 'sections.s1.description', 'units.u1.title', 'units.u1.description', 'skills.u1s2']);
  });

  it.each(Object.keys(labelFiles))('%s names only real sections, units and skills', (path) => {
    const dir = dirOf(path);
    const units = Object.fromEntries(Object.entries(unitFiles).filter(([p]) => dirOf(p) === dir).map(([, u]) => [u.id, u]));
    expect(checkLabels(labelFiles[path], { meta: metas[`${dir}/course.json`], units }, path.split('/').at(-1).replace('.json', '')).errors).toEqual([]);
  });

  describe('loading a course in another interface language', () => {
    afterAll(() => loadCourse('en-lg'));

    it('puts the path headings in that language', async () => {
      await loadCourse('en-lg', 'sw');
      expect(course.sections[0].title).toBe('Misingi');
      expect(course.units[0].title).toBe('Salamu');
      expect(course.skills.u1s1.title).toBe('Salamu za kwanza');
      // Lesson content stays in the course's own language.
      expect(course.words['oli-otya'].base).toBe('How are you?');
    });

    it('keeps the course’s own text when there are no labels for the language', async () => {
      await loadCourse('en-lg', 'fr');
      expect(course.units[0].title).toBe('Greetings');
    });
  });
});
