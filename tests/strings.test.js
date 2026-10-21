/*
 * Every word a screen shows must come from a pack. The interface switches to
 * a pseudo-language where each UI pack string is wrapped in ⟦…⟧; after
 * removing those, and text the course pack or language registry supplies
 * (target-language words, cast names, language names), no English may be
 * left. A hard-coded string in a view fails here. Course content (unit
 * titles, words, stories) is allowed: it comes from the course pack.
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
import { learnView } from '../src/views/learn.js';
import { runExercises } from '../src/views/lesson.js';
import { practiceHubView } from '../src/views/practice.js';
import { completeView } from '../src/views/complete.js';
import { guidebookView } from '../src/views/guidebook.js';
import { storiesView, storyView } from '../src/views/stories.js';
import { streakView } from '../src/views/streak.js';
import { shopView } from '../src/views/shop.js';
import { profileView } from '../src/views/profile.js';
import { showRewards } from '../src/views/rewards.js';
import { settingsView } from '../src/views/settings.js';
import { heartGate } from '../src/views/heart-review.js';
import { RENDERERS } from '../src/lesson/exercises/index.js';
import { buildLesson } from '../src/lesson/generate.js';
import { createProfile } from '../src/state/profile.js';
import { askForConsent } from '../src/ads/ads.js';
import { askPixelConsent } from '../src/marketing/pixel.js';
import { moodLabel } from '../src/app/brand-mood.js';
import { pickSnippet } from '../src/reminders/rules.js';

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
  // Everything the course pack says: words, sentences, unit titles, stories.
  ...strings({ units: course.units, words: course.words, sentences: course.sentences, stories: course.stories, guidebooks: course.guidebooks, sections: course.sections, skills: course.skills }).filter((x) => x.length > 2),
  ...course.cheers,
  ...Object.values(course.phrases),
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

// Dates and weekdays come from Intl, in the interface language.
const INTL = [
  ...Array.from({ length: 12 }, (_, m) => new Date(2026, m, 1).toLocaleDateString('en', { month: 'long' })),
  ...Array.from({ length: 7 }, (_, d) => ['long', 'short'].map((weekday) => new Date(2026, 0, 5 + d).toLocaleDateString('en', { weekday }))).flat(),
];

// One pass over all allowed text, matched as whole words only.
const escapeRe = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const ALLOWED_RE = new RegExp(`(?<![A-Za-z])(?:${[...ALLOWED, ...INTL].map(escapeRe).join('|')})(?![A-Za-z])`, 'g');

/** What's left of `text` once pack strings and allowed text are removed. */
function leftover(text, extra = []) {
  let rest = text;
  let before;
  do {
    before = rest;
    rest = rest.replace(/⟦[^⟦⟧]*⟧/g, ' ');
  } while (rest !== before);
  rest = rest.replace(ALLOWED_RE, ' ');
  for (const x of extra) rest = rest.split(x).join(' ');
  return rest.match(/[A-Za-z][A-Za-z’']{2,}/g) ?? [];
}

const INLINE = new Set(['STRONG', 'EM', 'A', 'B', 'I']);

/** Visible text and labels of `root`, ignoring illustrations. */
function texts(root) {
  const copy = root.cloneNode(true);
  copy.querySelectorAll('svg, style, script').forEach((n) => n.remove());
  const attrs = [...copy.querySelectorAll('[aria-label], [title], [placeholder], [alt]')].flatMap((el) =>
    ['aria-label', 'title', 'placeholder', 'alt'].map((a) => el.getAttribute(a)).filter(Boolean),
  );
  // A space around each element except inline formatting, so words in
  // neighbouring blocks stay apart while **bold** text stays in its sentence.
  copy.querySelectorAll('*').forEach((el) => {
    if (INLINE.has(el.tagName)) return;
    el.before(' ');
    el.after(' ');
  });
  return [copy.textContent.replace(/\s+/g, ' '), ...attrs];
}

function expectNoStrayEnglish(root, extra = []) {
  expect(texts(root).flatMap((x) => leftover(x, extra))).toEqual([]);
}

const mount = () => {
  const root = document.createElement('div');
  document.body.replaceChildren(root);
  return root;
};

beforeAll(() => {
  useUiPack({ meta: en.meta, strings: pseudo(en.strings) });
  Element.prototype.scrollIntoView ??= () => {};
});
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

  describe('learning screens', () => {
    const unit = course.units[0];
    const learner = () =>
      store.update((s) => {
        s.profile = createProfile({ name: 'Amani', avatar: { character: 'nakato', color: 'vermillion' } });
        for (const l of unit.skills.flatMap((sk) => sk.lessons)) s.lessons[l.id] = { completions: 1, bestAccuracy: 1, lastCompletedAt: Date.now() };
        for (const l of unit.skills.flatMap((sk) => sk.lessons)) for (const w of l.newWords) s.words[w] = { box: 1, due: '2000-01-01', seen: 2, correct: 1, wrong: 1, lastSeen: '2026-10-20' };
        s.mistakes = Object.keys(s.words).slice(0, 2);
        s.streak = { current: 3, longest: 5, lastDay: null, freezes: 1, frozenDays: [] };
        s.xp = { total: 120, byDay: {} };
      });
    beforeAll(learner);

    it.each([
      ['learn path', (root) => learnView({ root, navigate: () => {} })],
      ['practice hub', (root) => practiceHubView({ root })],
      ['guidebook', (root) => guidebookView({ root, params: { unit: unit.id }, query: {}, navigate: () => {} })],
      ['stories', (root) => storiesView({ root })],
      ['story', (root) => {
        storyView({ root, params: { id: course.stories[0].id }, navigate: () => {} });
        root.querySelector('[data-next]').click();
      }],
      ['streak', (root) => streakView({ root })],
      ['shop', (root) => shopView({ root })],
      ['profile', (root) => profileView({ root })],
      ['settings', (root) => settingsView({ root, query: {}, navigate: () => {} })],
      ['heart warm-up', (root) => {
        store.update((s) => {
          s.hearts = { count: 0, updatedAt: Date.now() };
        });
        heartGate({ root, navigate: () => {}, onReady: () => {} });
        store.update((s) => {
          s.hearts = { count: 5, updatedAt: 0 };
        });
      }],
    ])('%s', (_, draw) => {
      const root = mount();
      draw(root);
      expectNoStrayEnglish(root);
    });

    // One exercise of each type, from the course's own lessons (built once
    // the pseudo-language is on, since prompts come from the UI pack).
    const exercises = {};
    beforeAll(() => {
      for (const id of Object.keys(course.lessons).slice(0, 60)) {
        for (const ex of buildLesson(id, { seed: 7, speakable: true })) exercises[ex.type] ??= ex;
      }
      // Listening needs a recording or a voice; build one from a translation.
      exercises.listen ??= { ...exercises.translate, type: 'listen', prompt: { id: 'listen' }, lang: 'target', bank: exercises.translate.bank.slice(0, 2) };
    });
    // An exercise's own answers and tiles come from the course too.
    const own = (ex) => strings(Object.fromEntries(Object.entries(ex).filter(([k]) => k !== 'prompt'))).filter((x) => x.length > 1).sort((a, b) => b.length - a.length);
    it.each(Object.keys(RENDERERS))('exercise: %s', (type) => {
      expect(exercises[type], `no ${type} exercise in the first lessons`).toBeTruthy();
      const root = mount();
      RENDERERS[type](exercises[type], root, { setReady() {}, locked: () => false, complete() {}, miss() {} });
      expectNoStrayEnglish(root, own(exercises[type]));
    });

    it('lesson screen and feedback', () => {
      const root = mount();
      const { cleanup } = runExercises({ root, exercises: [exercises.choice, exercises.translate], hearts: true, onQuit() {}, onFinish() {} });
      expectNoStrayEnglish(root, own(exercises.choice));
      root.querySelector('.choice').click();
      root.querySelector('[data-main]').click();
      expectNoStrayEnglish(root, own(exercises.choice));
      cleanup();
    });

    it('rewards', () => {
      const root = mount();
      showRewards(root, {
        result: { accuracy: 0.9, perfect: false, seconds: 75 },
        xp: { total: 15, parts: [{ id: 'lesson', xp: 10 }, { id: 'perfect', xp: 5 }] },
        gems: 5,
        streak: { extended: true, current: 3, milestone: 3 },
        goalBefore: { met: false },
        goalAfter: { met: true, today: 20, goal: 20 },
        achievements: [{ id: 'wildfire', tier: 1, gems: 10, description: 'x' }].map((a) => ({ ...a, description: '⟦x⟧' })),
        onDone() {},
      });
      for (let i = 0; i < 4; i += 1) {
        expectNoStrayEnglish(root);
        root.querySelector('[data-continue]').click();
      }
    });

    it('course complete', () => {
      store.update((s) => {
        for (const l of Object.keys(course.lessons)) s.lessons[l] = { completions: 1 };
        for (const u of course.units) s.lessons[`checkpoint-${u.id}`] = { completions: 1 };
      });
      const root = mount();
      completeView({ root, navigate: () => {} });
      expectNoStrayEnglish(root);
    });

    it('consent cards, logo label and reminders', () => {
      askForConsent();
      askPixelConsent({ ...askPixelConsent.config, pixelId: '1' });
      expectNoStrayEnglish(document.body);
      expect(leftover(moodLabel('sleepy'))).toEqual([]);
      const snip = pickSnippet(store.get(), '2026-10-21', { rand: () => 0.99 });
      expect(leftover(snip.body)).toEqual([]);
    });
  });

  it('catches a hard-coded string', () => {
    const root = mount();
    root.innerHTML = '<p>⟦From the pack⟧ <span>Qwerty zxcvb</span></p>';
    expect(texts(root).flatMap((x) => leftover(x))).toEqual(['Qwerty', 'zxcvb']);
  });
});
