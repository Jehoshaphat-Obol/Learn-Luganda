/*
 * The landing page in every interface language. Most of its text comes from
 * the UI pack, but the "why" section, the ticker's meanings, the sample
 * question, captions, cast roles and two FAQ answers come from the course
 * pack, written in the course's base language. For any other interface
 * language the course's labels file must translate them (src/content/labels.js),
 * and none of the course's own copy may be left on the page.
 */
import { afterAll, describe, expect, it } from 'vitest';
import { LANDING_TEXT, checkLabels } from '../src/content/labels.js';
import { COURSE_IDS, loadCourse } from '../src/content/load.js';
import { UI_LANGUAGES, setLanguage } from '../src/i18n/index.js';
import { plain } from '../src/i18n/rich.js';
import { createLandingView } from '../src/views/landing.js';
import { aboutView } from '../src/views/info.js';

const metas = import.meta.glob('../src/packs/courses/*/course.json', { eager: true, import: 'default' });
const unitFiles = import.meta.glob('../src/packs/courses/*/units/*.json', { eager: true, import: 'default' });
const labelFiles = import.meta.glob('../src/packs/courses/*/labels/*.json', { eager: true, import: 'default' });

const metaOf = (id) => metas[`../src/packs/courses/${id}/course.json`];
const unitsOf = (id) =>
  Object.fromEntries(Object.entries(unitFiles).filter(([p]) => p.startsWith(`../src/packs/courses/${id}/units/`)).map(([, u]) => [u.id, u]));
const get = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj);

/** Every course with each interface language it isn't written in. */
const PAIRS = COURSE_IDS.flatMap((id) => UI_LANGUAGES.filter((ui) => ui !== metaOf(id).from).map((ui) => [id, ui]));

/** The course pack's own base-language copy that the landing page shows. */
function baseCopy(meta, ui) {
  const { landing } = meta;
  return [
    ...LANDING_TEXT.map((path) => get(landing, path)),
    ...landing.why.cards.flatMap((c) => [c.title, c.text]),
    ...(ui === meta.to ? [] : landing.words.map(([, meaning]) => meaning)),
    ...Object.values(meta.cast).map((c) => c.role),
  ]
    .filter(Boolean)
    .map(plain);
}

/** Whether `text` holds `phrase` as whole words ("Madame" doesn’t hold "Madam"). */
const holds = (text, phrase) => new RegExp(`(?<!\\p{L})${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\p{L})`, 'u').test(text);

const pageText = (root) => {
  const copy = root.cloneNode(true);
  copy.querySelectorAll('svg, style, script').forEach((n) => n.remove());
  return copy.textContent.replace(/\s+/g, ' ');
};

describe('landing copy in every interface language', () => {
  afterAll(async () => {
    await setLanguage('en');
    await loadCourse('en-lg');
  });

  it.each(PAIRS)('%s has landing, cast and description labels for %s', (id, ui) => {
    const labels = labelFiles[`../src/packs/courses/${id}/labels/${ui}.json`];
    expect(labels, `courses/${id}/labels/${ui}.json is missing`).toBeTruthy();
    const { missing } = checkLabels(labels, { meta: metaOf(id), units: unitsOf(id) }, ui);
    expect(missing.filter((m) => /^(landing|cast|description)\b/.test(m))).toEqual([]);
  });

  it.each(PAIRS)('the %s landing page in %s shows none of the course’s own copy', async (id, ui) => {
    await Promise.all([setLanguage(ui), loadCourse(id, ui)]);
    const root = document.createElement('div');
    document.body.replaceChildren(root);
    createLandingView()({ root });
    root.querySelectorAll('details').forEach((d) => d.setAttribute('open', ''));
    const text = pageText(root);
    expect(baseCopy(metaOf(id), ui).filter((x) => holds(text, x))).toEqual([]);

    aboutView({ root });
    expect(pageText(root)).not.toContain(metaOf(id).description);
  });
});
