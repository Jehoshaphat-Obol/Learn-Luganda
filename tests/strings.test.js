/*
 * Every word a screen shows must come from a pack. The interface switches to
 * a pseudo-language where each UI pack string is wrapped in ⟦…⟧; after
 * removing those, and text the course pack or language registry supplies
 * (target-language words, cast names, language names), no English may be
 * left. A hard-coded string in a view fails here.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import en from '../src/packs/ui/en.json';
import languages from '../src/packs/languages.json';
import { setLanguage, useUiPack } from '../src/i18n/index.js';
import { plain } from '../src/i18n/rich.js';
import { course } from '../src/content/course.js';
import { CAST, avatarIds, characterInfo } from '../src/illustrations/index.js';
import { MASCOT_NAME } from '../src/app/brand.js';
import { store } from '../src/state/store.js';
import { createShell } from '../src/app/shell.js';
import { createLandingView } from '../src/views/landing.js';
import { onboardingView } from '../src/views/onboarding.js';
import { aboutView, contactView, termsView } from '../src/views/info.js';
import { privacyView } from '../src/views/privacy.js';

/** Wraps every string (and plural form) in ⟦…⟧. */
function pseudo(node) {
  if (typeof node === 'string') return `⟦${node}⟧`;
  return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, pseudo(v)]));
}

/** Every string anywhere in a value. */
const strings = (v) => (typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : []);

// Text that legitimately comes from outside the UI pack, longest first so
// "Oli otya?" goes before "Oli".
const ALLOWED = [
  ...strings(course.landing),
  ...Object.values(course.cast).flatMap((c) => [c.name, c.role]),
  ...Object.values(CAST).map((c) => c.name),
  ...avatarIds().map((id) => characterInfo(id).name),
  ...languages.languages.flatMap((l) => [l.name, l.nativeName, l.greeting]),
  course.pack.meta.description,
  MASCOT_NAME,
  'Amani', // the learner's name in these tests
]
  .filter(Boolean)
  .map(plain)
  .sort((a, b) => b.length - a.length);

/** What's left of `text` once pack strings and allowed text are removed. */
function leftover(text) {
  let rest = text;
  let before;
  do {
    before = rest;
    rest = rest.replace(/⟦[^⟦⟧]*⟧/g, ' ');
  } while (rest !== before);
  for (const a of ALLOWED) rest = rest.split(a).join(' ');
  return rest.match(/[A-Za-z][A-Za-z’']{2,}/g) ?? [];
}

/** Visible text and labels of `root`, ignoring illustrations. */
function texts(root) {
  const copy = root.cloneNode(true);
  copy.querySelectorAll('svg, style, script').forEach((n) => n.remove());
  const attrs = [...copy.querySelectorAll('[aria-label], [title], [placeholder], [alt]')].flatMap((el) =>
    ['aria-label', 'title', 'placeholder', 'alt'].map((a) => el.getAttribute(a)).filter(Boolean),
  );
  return [copy.textContent, ...attrs];
}

function expectNoStrayEnglish(root) {
  expect(texts(root).flatMap(leftover)).toEqual([]);
}

const mount = () => {
  const root = document.createElement('div');
  document.body.replaceChildren(root);
  return root;
};

beforeAll(() => useUiPack({ meta: en.meta, strings: pseudo(en.strings) }));
afterAll(() => setLanguage('en'));

describe('no English outside the packs', () => {
  it('landing page', () => {
    const root = mount();
    createLandingView()({ root });
    expectNoStrayEnglish(root);
  });

  it('app shell and navigation', () => {
    const root = mount();
    createShell(root).render({ route: { view: () => {}, title: 'titles.learn' }, params: {}, query: {}, path: '/learn' }, () => {});
    expectNoStrayEnglish(root);
    expect(document.title).toMatch(/^⟦/);
  });

  it.each(['languages', 'welcome', 'motivation', 'goal', 'level', 'avatar', 'ready'].map((s, i) => [s, i]))('onboarding: %s', (_, step) => {
    store.update((s) => {
      s.profile = null;
      s.onboarding = { step, answers: { name: 'Amani', dailyGoal: 20, motivation: 'family', level: 'new' } };
    });
    const root = mount();
    onboardingView({ root, navigate: () => {} });
    expectNoStrayEnglish(root);
  });

  it.each([
    ['about', aboutView],
    ['contact', contactView],
    ['terms', termsView],
    ['privacy', privacyView],
  ])('%s page', (_, view) => {
    const root = mount();
    view({ root });
    expectNoStrayEnglish(root);
  });

  it('catches a hard-coded string', () => {
    const root = mount();
    root.innerHTML = '<p>⟦From the pack⟧ but not this</p>';
    expect(texts(root).flatMap(leftover)).toEqual(['but', 'not', 'this']);
  });
});
