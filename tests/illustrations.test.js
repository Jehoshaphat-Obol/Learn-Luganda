import { afterEach, describe, expect, it } from 'vitest';
import {
  CAST,
  CRITTERS,
  EXPRESSIONS,
  MASCOT_POSES,
  PLACE_IDS,
  PROP_IDS,
  avatarIds,
  celebrationArt,
  defineCharacter,
  emptyStateArt,
  heroScene,
  lessonCompleteScene,
  mascot,
  placeScene,
  portrait,
  prop,
  randomPose,
  seededRandom,
  setArtRandom,
  validateCharacter,
} from '../src/illustrations/index.js';

const parse = (markup) => new DOMParser().parseFromString(markup, 'image/svg+xml');

function expectValidSvg(markup) {
  const doc = parse(markup);
  expect(doc.querySelector('parsererror')).toBeNull();
  const root = doc.documentElement;
  expect(root.getAttribute('role')).toBe('img');
  expect(doc.querySelector('title')?.textContent).toBeTruthy();
  // Animated elements must not carry a transform attribute, or the CSS
  // animation would wipe out their placement.
  for (const el of doc.querySelectorAll('[class*="anim-"]')) {
    expect(el.hasAttribute('transform')).toBe(false);
  }
  return doc;
}

afterEach(() => setArtRandom());

describe('illustrations', () => {
  it('draws every cast member and critter in every expression and shape', () => {
    for (const id of avatarIds()) {
      for (const expression of EXPRESSIONS) expectValidSvg(portrait(id, { expression }));
      expectValidSvg(portrait(id, { shape: 'circle' }));
    }
    expect(avatarIds()).toEqual([...Object.keys(CAST), ...Object.keys(CRITTERS)]);
  });

  it('draws every mascot pose, with and without a prop', () => {
    for (const pose of MASCOT_POSES) {
      expectValidSvg(mascot({ pose }));
      expectValidSvg(mascot({ pose, prop: 'drum' }));
    }
  });

  it('draws every prop and place', () => {
    for (const id of PROP_IDS) expectValidSvg(prop(id));
    for (const id of PLACE_IDS) {
      expectValidSvg(placeScene(id));
      const doc = expectValidSvg(placeScene(id, { cast: ['nakato', 'kato'], pose: 'waving', caption: 'custom' }));
      expect(doc.documentElement.textContent).toContain('custom');
    }
  });

  it('keeps ids unique across several drawings on one page', () => {
    const markup = PLACE_IDS.map((id) => placeScene(id, { cast: ['musoke'] })).join('') + heroScene() + heroScene();
    const ids = [...markup.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('randomizes scenes, and repeats them under the same seed', () => {
    setArtRandom(seededRandom(7));
    const a = [heroScene(), lessonCompleteScene(), randomPose('celebrate')].map((s) => s.replace(/-\d+/g, ''));
    setArtRandom(seededRandom(7));
    const b = [heroScene(), lessonCompleteScene(), randomPose('celebrate')].map((s) => s.replace(/-\d+/g, ''));
    expect(a).toEqual(b);

    setArtRandom();
    const labels = new Set(Array.from({ length: 30 }, () => parse(heroScene()).querySelector('title').textContent));
    expect(labels.size).toBeGreaterThan(1);
  });

  it('gives each mood a fitting pose', () => {
    for (let i = 0; i < 20; i += 1) {
      expect(['cheering', 'dancing', 'waving', 'happy']).toContain(randomPose('celebrate'));
      expect(randomPose('sad')).toBe('sad');
      expectValidSvg(emptyStateArt());
      expectValidSvg(celebrationArt({ xp: 12 }));
    }
  });

  it('accepts new characters as data and rejects unknown parts', () => {
    const spec = {
      name: 'Ade',
      role: 'A tailor in Lagos',
      skin: '#6b3f26',
      shade: '#52301b',
      hair: 'kufi',
      hairColor: '#1c1512',
      top: 'f-blue',
      card: 'f-cream',
      backdrop: 'wave',
      texture: 'dots',
      extras: ['mustache'],
    };
    expect(validateCharacter(spec)).toEqual([]);
    expect(validateCharacter({ ...spec, hair: 'mohawk', extras: ['cape'] })).toHaveLength(2);
    expect(() => defineCharacter('bad', { ...spec, skin: 'brown' })).toThrow(/skin/);
    defineCharacter('test-ade', spec);
    try {
      expectValidSvg(portrait('test-ade', { expression: 'wink' }));
    } finally {
      delete CAST['test-ade'];
    }
  });
});
