/*
 * Courses composed from the shared catalog. Every language fills the same
 * structure, so any two languages with packs make a course without a
 * hand-built pair:
 *
 *   src/packs/curriculum/course.json      sections, cast, version, migrations
 *   src/packs/curriculum/units/uN.json    skills, lessons, word and sentence ids,
 *                                         dialogue and story skeletons
 *   src/packs/lang/<code>/course.json     everything in <code> that frames the
 *                                         course: path headings (sections, units,
 *                                         skills, cast roles, the same shape as
 *                                         course labels), course title, cheers,
 *                                         and settings for learning <code>
 *   src/packs/lang/<code>/units/uN.json   lesson text in <code>, keyed by the
 *                                         curriculum's ids
 *   src/packs/lang/<from>/about/<to>/     optional notes about <to> written in
 *     course.json, uN.json                <from>: description, landing copy,
 *                                         word notes, guidebook, story glosses
 *
 * `composePack` turns those files into the same `{ meta, units }` a
 * hand-built course pack has (src/packs/courses/<from>-<to>/), and
 * `composeLabels` turns a language's headings into course labels
 * (./labels.js), so everything after it (buildFromPack, the views, the
 * validators) is unchanged.
 *
 * Text roles: target text comes from lang/<to>, base text from
 * lang/<from>. A few rules keep one text per language working both ways:
 * - A trailing "(…)" in a word is a hint for the meaning ("Read (all of
 *   you)") and is left out when the word is the one being learned.
 * - Words whose target text repeats an earlier word's are left out: they
 *   would be two questions with one answer.
 * - `{to}` and `{from}` in any text stand for the course's languages, named
 *   in the text's own language (`languageNames` in lang/<code>/course.json);
 *   `{to.mu}` picks another form of the name, for languages that inflect it.
 * - `{@nakato}`, `{@city}` and the other culture slots stand for the cast's
 *   names and the places they live in and travel to (see cultureOf), so a
 *   Swahili course meets Amani in Dar es Salaam where a Luganda one meets
 *   Nakato in Kampala. `{@jjajja.name}` is a cast member's full name.
 */
import { LANDING_TEXT } from './labels.js';

/** The share of text a language needs before courses are offered in it. */
export const COVERAGE_THRESHOLD = 0.95;

/** The pack format of curriculum and lang packs (see ./format.js). */
export const CATALOG_FORMAT = 2;

const QUALIFIER = /\s*\([^()]*\)\s*$/;

/** A word as the thing being learned: without its hint for the meaning. */
export const asTarget = (text) => text.replace(QUALIFIER, '');

const normal = (text) => asTarget(text).trim().toLowerCase().replace(/\s+/g, ' ');

/**
 * `text` with `{to}`/`{from}` (and forms like `{to.mu}`) filled in from
 * `names`, the language names of the text's own language.
 */
export function fillNames(text, names, codes) {
  if (typeof text !== 'string' || !text.includes('{')) return text;
  return text.replace(/\{(to|from)(?:\.([a-z]+))?\}/g, (match, role, form) => {
    const entry = names?.[codes[role]];
    const value = typeof entry === 'string' ? (form ? undefined : entry) : entry?.[form ?? 'name'];
    return value ?? match;
  });
}

/**
 * The cast names and places for a course from `from` to `to` (lang pack
 * metas): the `culture` of the target language, else of the base language
 * (English has none, so English for Swahili speakers keeps the Swahili
 * cast), over the curriculum's defaults, which are the culture of the
 * curriculum's `culture` language (Luganda). Returns `{ code, cast, places }`:
 * `code` names the culture (stories tagged with another one are left out),
 * cast is `{ id: { name, short } }`.
 */
export function cultureOf(curriculumMeta, from, to) {
  const has = (l) => Boolean(l && (l.culture || l.code === curriculumMeta.culture));
  const lang = has(to) ? to : has(from) ? from : null;
  const own = lang?.culture ?? {};
  const person = (c) => (typeof c === 'string' ? { name: c } : c ?? {});
  const cast = {};
  for (const [id, c] of Object.entries(curriculumMeta.cast ?? {})) {
    const mine = own.cast?.[id];
    cast[id] = mine ? person(mine) : { name: c.name, short: c.short };
  }
  return { code: lang?.code ?? curriculumMeta.culture ?? null, cast, places: { ...curriculumMeta.places, ...own.places } };
}

/** `text` with its culture slots (`{@id}`, `{@id.name}`) filled from `culture`. */
export function fillCulture(text, culture) {
  if (typeof text !== 'string' || !text.includes('{@')) return text;
  return text.replace(/\{@([a-z0-9-]+)(?:\.(name))?\}/g, (match, id, form) => {
    const person = culture.cast[id];
    if (person) return (form ? person.name : person.short ?? person.name) ?? match;
    return (!form && culture.places[id]) || match;
  });
}

/** The about-notes languages to try for `from`, best first: itself, its pivot, then English. */
export function aboutChain(from, registry = []) {
  const pivot = registry.find((l) => l.code === from)?.pivot;
  return [...new Set([from, pivot, 'en'].filter(Boolean))];
}

/**
 * The about notes for a course, unit by unit: each unit uses the first
 * language in `chain` that has notes for it. `about` maps a language code to
 * `{ meta, units }` (or nothing) for the course's target language.
 */
export function pickAbout(chain, about) {
  const meta = chain.map((c) => about[c]?.meta).find(Boolean) ?? null;
  const units = {};
  for (const code of chain) for (const [id, u] of Object.entries(about[code]?.units ?? {})) units[id] ??= u;
  return { meta, units };
}

const list = (x) => (Array.isArray(x) && x.length ? x : undefined);
const clean = (obj) => Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== ''));

/**
 * Composes course `<from>-<to>` in the hand-built pack shape. `curriculum`,
 * `from`, `to` and `about` are `{ meta, units }`, units keyed by id; `about`
 * is optional (see pickAbout).
 */
export function composePack({ curriculum, from, to, about = { meta: null, units: {} } }) {
  const codes = { from: from.meta.code, to: to.meta.code };
  const culture = cultureOf(curriculum.meta, from.meta, to.meta);
  const base = (text) => fillCulture(fillNames(text, from.meta.languageNames, codes), culture);
  const target = (text) => fillCulture(fillNames(text, to.meta.languageNames, codes), culture);
  const fill = (text) => fillCulture(fillNames(text, about.meta?.languageNames ?? from.meta.languageNames, codes), culture);
  const alts = (item, f) => list((item?.alts ?? []).map(f));
  const cm = curriculum.meta;
  const order = cm.sections.flatMap((s) => s.units).filter((id) => curriculum.units[id]);

  // Words whose answer repeats another's are left out. Words from skills an
  // older curriculum version had come first, so a concept added later
  // never pushes out one learners already have.
  const dropped = new Set();
  const seen = new Set();
  const candidates = order.flatMap((id) => {
    const cu = curriculum.units[id];
    const since = {};
    for (const sk of cu.skills) for (const l of sk.lessons) for (const w of l.newWords) since[w] ??= sk.since ?? 1;
    return cu.words.map((wid) => ({ id, wid, since: since[wid] ?? 1 }));
  });
  for (const { id, wid } of candidates.sort((a, b) => a.since - b.since)) {
    const t = to.units[id]?.words?.[wid];
    if (!t || !from.units[id]?.words?.[wid]) continue;
    const key = normal(asTarget(target(t.text)));
    if (seen.has(key)) dropped.add(wid);
    else seen.add(key);
  }

  const units = {};
  for (const id of order) {
    const cu = curriculum.units[id];
    const fu = from.units[id] ?? {};
    const tu = to.units[id] ?? {};
    const au = about.units[id] ?? {};
    const item = (kind, iid) => {
      const t = tu[kind]?.[iid];
      const b = fu[kind]?.[iid];
      if (!t || !b) return null;
      const text = kind === 'words' ? asTarget(target(t.text)) : target(t.text);
      return clean({
        id: iid,
        target: text,
        base: base(b.text),
        altTarget: alts(t, target),
        altBase: alts(b, base),
        notes: fill(au.notes?.[iid]),
        audio: t.audio,
      });
    };
    const words = [];
    for (const wid of cu.words) {
      const w = !dropped.has(wid) && item('words', wid);
      if (w) words.push(w);
    }
    const sentences = cu.sentences.map((sid) => item('sentences', sid)).filter(Boolean);
    const skills = cu.skills.map((sk) => {
      const tip = au.tips && sk.id in au.tips ? au.tips[sk.id] : undefined;
      return clean({
        id: sk.id,
        title: base(from.meta.skills?.[sk.id] ?? ''),
        icon: sk.icon,
        tip: tip ?? undefined,
        lessons: sk.lessons.map((l) => {
          const lesson = { id: l.id, newWords: l.newWords.filter((w) => !dropped.has(w)), sentences: l.sentences ?? [] };
          if (l.dialogues) {
            lesson.dialogues = l.dialogues.map((d, i) => {
              const t = tu.dialogues?.[l.id]?.[i];
              const b = fu.dialogues?.[l.id]?.[i];
              const options = (t?.options ?? []).map(target);
              return { speaker: d.speaker, target: target(t?.line ?? ''), base: base(b?.line ?? ''), options, answer: options[d.answer] ?? '' };
            });
          }
          return lesson;
        }),
      });
    });
    const phrases = Array.from({ length: cu.phrases ?? 0 }, (_, i) => ({ target: asTarget(target(tu.phrases?.[i] ?? '')), base: base(fu.phrases?.[i] ?? '') })).filter((p) => p.target && p.base);
    const gb = au.guidebook;
    const guidebook = gb ? clean({ intro: fill(gb.intro), phrases, tips: gb.tips, culture: gb.culture }) : undefined;
    // A story tagged with a culture is told only in courses of that culture,
    // and one tagged `teaches` only in courses teaching that language.
    const told = (st) => (!st.culture || (st.culture === culture.code && tu.stories?.[st.id] && fu.stories?.[st.id])) && (!st.teaches || st.teaches === codes.to);
    const stories = (cu.stories ?? []).filter(told).map((st) => {
      const t = tu.stories?.[st.id] ?? {};
      const b = fu.stories?.[st.id] ?? {};
      let line = 0;
      let question = 0;
      const steps = st.steps.map((step, k) => {
        const gloss = au.glosses?.[st.id]?.[k];
        if (step.speaker) {
          const i = line++;
          return { line: { speaker: step.speaker, target: target(t.lines?.[i] ?? ''), base: base(b.lines?.[i] ?? '') }, ...(gloss ? { gloss } : {}) };
        }
        const i = question++;
        const own = b.questions?.[i]?.options;
        const inTarget = step.optionsLang === 'target' || !own;
        const options = inTarget ? (t.questions?.[i]?.options ?? []).map(target) : own.map(base);
        return clean({ question: base(b.questions?.[i]?.question ?? ''), options, optionsLang: inTarget ? 'target' : undefined, answer: step.answer, gloss });
      });
      return { id: st.id, title: base(b.title ?? ''), unlockAfter: st.unlockAfter, cast: st.cast, summary: base(b.summary ?? ''), steps };
    });
    const heading = from.meta.units?.[id] ?? {};
    units[id] = clean({
      id,
      title: base(heading.title ?? ''),
      description: base(heading.description ?? ''),
      color: cu.color,
      character: cu.character,
      words,
      sentences,
      skills,
      guidebook,
      stories: list(stories),
    });
  }

  const am = about.meta ?? {};
  const meta = clean({
    formatVersion: CATALOG_FORMAT,
    id: `${codes.from}-${codes.to}`,
    version: cm.version,
    migrations: list((cm.migrations ?? []).filter((m) => !m.courses || m.courses.includes(`${codes.from}-${codes.to}`)).map(({ courses, ...m }) => m)),
    from: codes.from,
    to: codes.to,
    status: am.status ?? 'draft',
    title: am.title ?? base(from.meta.courseTitle ?? ''),
    description: fill(am.description),
    notes: am.notes,
    cheers: list(to.meta.cheers),
    phrases: to.meta.phrases,
    landing: am.landing,
    settings: to.meta.settings,
    cast: Object.fromEntries(Object.entries(cm.cast ?? {}).map(([cid, c]) => [cid, clean({ name: culture.cast[cid].name, role: fill(about.meta?.cast?.[cid] ?? from.meta.cast?.[cid]), look: c.look, voice: c.voice })])),
    sections: cm.sections.map((s) => clean({ id: s.id, ...from.meta.sections?.[s.id], units: s.units })),
  });
  return { meta, units };
}

/**
 * Course labels (./labels.js) in interface language `ui`, made from its
 * lang pack and, for the landing copy, its notes about the course's target
 * language. `lang` is lang/<ui>/course.json; `about` is
 * lang/<ui>/about/<to>/course.json or null; `learning` is true when
 * <ui> is the course's target language; `culture` (cultureOf) fills the
 * cast roles' culture slots.
 */
export function composeLabels(lang, about, { learning = false, culture = null } = {}) {
  const cast = about?.cast ? { ...lang.cast, ...about.cast } : lang.cast;
  const roles = cast && culture ? Object.fromEntries(Object.entries(cast).map(([id, role]) => [id, fillCulture(role, culture)])) : cast;
  const labels = clean({ sections: lang.sections, units: lang.units, skills: lang.skills, cast: roles, description: about?.description });
  const landing = about?.landing;
  if (landing) {
    const out = {};
    for (const path of LANDING_TEXT) {
      const value = path.split('.').reduce((o, k) => o?.[k], landing);
      if (typeof value !== 'string') continue;
      const keys = path.split('.');
      keys.slice(0, -1).reduce((o, k) => (o[k] ??= {}), out)[keys.at(-1)] = value;
    }
    // A reader of the target language needs no meanings for its words.
    if (landing.words && !learning) out.words = landing.words.map(([, meaning]) => meaning);
    if (landing.why?.cards) (out.why ??= {}).cards = landing.why.cards.map((c) => ({ title: c.title, text: c.text }));
    labels.landing = out;
  }
  return labels;
}

/**
 * How much of the curriculum lang pack `lang` (`{ meta, units }`) fills:
 * `{ target, base }`, each a share from 0 to 1. `target` counts the text a
 * course needs to teach the language, `base` the text it needs to teach
 * from it.
 */
export function coverage(curriculum, lang) {
  const tally = { target: [0, 0], base: [0, 0] };
  const count = (roles, ok) => {
    for (const role of roles) {
      tally[role][1] += 1;
      if (ok) tally[role][0] += 1;
    }
  };
  const both = ['target', 'base'];
  const m = lang.meta;
  for (const s of curriculum.meta.sections) count(['base'], m.sections?.[s.id]?.title);
  for (const cid of Object.keys(curriculum.meta.cast ?? {})) count(['base'], m.cast?.[cid]);
  count(['base'], m.courseTitle);
  count(['target'], m.cheers?.length);
  for (const cu of Object.values(curriculum.units)) {
    const u = lang.units[cu.id] ?? {};
    count(['base'], m.units?.[cu.id]?.title);
    for (const id of cu.words) count(both, u.words?.[id]?.text);
    for (const id of cu.sentences) count(both, u.sentences?.[id]?.text);
    for (let i = 0; i < (cu.phrases ?? 0); i += 1) count(both, u.phrases?.[i]);
    for (const sk of cu.skills) {
      count(['base'], m.skills?.[sk.id]);
      for (const l of sk.lessons) {
        (l.dialogues ?? []).forEach((_, i) => {
          const d = u.dialogues?.[l.id]?.[i];
          count(['base'], d?.line);
          count(['target'], d?.line && d.options?.length);
        });
      }
    }
    // Culture stories are extras: a language needn't tell them all.
    for (const st of (cu.stories ?? []).filter((x) => !x.culture)) {
      const s = u.stories?.[st.id] ?? {};
      count(['base'], s.title && s.summary);
      let line = 0;
      let question = 0;
      for (const step of st.steps) {
        if (step.speaker) count(both, s.lines?.[line++]);
        else {
          const q = s.questions?.[question++];
          count(['base'], q?.question);
          if (step.optionsLang === 'target') count(['target'], q?.options?.length);
        }
      }
    }
  }
  const share = ([have, need]) => (need ? Math.round((have / need) * 1000) / 1000 : 0);
  return { target: share(tally.target), base: share(tally.base) };
}

/**
 * The composed course ids: every `<from>-<to>` pair of languages with lang
 * packs whose coverage (see coverage.json, written by `npm run coverage`)
 * reaches `threshold` as base and as target, and which have notes about the
 * target in the base language, its pivot or English.
 */
export function composedIds(report, registry = [], threshold = COVERAGE_THRESHOLD) {
  const ids = [];
  const codes = Object.keys(report.languages ?? {}).sort();
  for (const from of codes) {
    for (const to of codes) {
      if (from === to) continue;
      if (report.languages[from].base < threshold || report.languages[to].target < threshold) continue;
      if (!aboutChain(from, registry).some((c) => (report.about?.[c]?.[to] ?? 0) >= threshold)) continue;
      ids.push(`${from}-${to}`);
    }
  }
  return ids;
}

/**
 * Course `<from>-<to>` from the catalog, as `{ meta, units, labels }`, the
 * shape of a hand-built pack. `catalog` holds what's been read:
 * `{ curriculum, lang: { [code]: { meta, units } }, about: { [code]: { [to]: { meta, units } } } }`;
 * a lang pack needs only its meta when it's just there for labels. `uis`
 * lists the interface languages to make labels for (every lang pack by
 * default).
 */
export function composeCourse(id, catalog, { registry = [], uis } = {}) {
  const [from, to] = [id.split('-')[0], id.split('-').slice(1).join('-')];
  const { curriculum, lang, about = {} } = catalog;
  if (!lang[from] || !lang[to]) throw new Error(`No lang pack for ${lang[from] ? to : from}`);
  const chain = aboutChain(from, registry);
  const notes = pickAbout(chain, Object.fromEntries(chain.map((c) => [c, about[c]?.[to]])));
  const pack = composePack({ curriculum, from: lang[from], to: lang[to], about: notes });
  const labels = {};
  const culture = cultureOf(curriculum.meta, lang[from].meta, lang[to].meta);
  for (const ui of uis ?? Object.keys(lang)) if (ui !== from && lang[ui]) labels[ui] = composeLabels(lang[ui].meta, about[ui]?.[to]?.meta ?? null, { learning: ui === to, culture });
  return { ...pack, labels };
}

/**
 * The coverage report `npm run coverage` writes to src/packs/lang/coverage.json:
 * each language's share as target and base, and for each pair the share of
 * units with notes about the target.
 */
export function coverageReport({ curriculum, lang, about = {} }) {
  const unitIds = Object.keys(curriculum.units);
  const languages = {};
  for (const [code, pack] of Object.entries(lang)) languages[code] = coverage(curriculum, pack);
  const notes = {};
  for (const [code, byTo] of Object.entries(about)) {
    for (const [to, ab] of Object.entries(byTo)) {
      const share = unitIds.filter((id) => ab.units?.[id]?.guidebook).length / unitIds.length;
      (notes[code] ??= {})[to] = Math.round(share * 1000) / 1000;
    }
  }
  return { threshold: COVERAGE_THRESHOLD, languages, about: notes };
}
