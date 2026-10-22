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
  const base = (text) => fillNames(text, from.meta.languageNames, codes);
  const target = (text) => fillNames(text, to.meta.languageNames, codes);
  const fill = (text) => fillNames(text, about.meta?.languageNames ?? from.meta.languageNames, codes);
  const alts = (item, f) => list((item?.alts ?? []).map(f));
  const seen = new Set();
  const dropped = new Set();
  const cm = curriculum.meta;

  const units = {};
  for (const id of cm.sections.flatMap((s) => s.units)) {
    const cu = curriculum.units[id];
    if (!cu) continue;
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
      const w = item('words', wid);
      if (!w) continue;
      const key = normal(w.target);
      if (seen.has(key)) {
        dropped.add(wid);
        continue;
      }
      seen.add(key);
      words.push(w);
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
    const stories = (cu.stories ?? []).map((st) => {
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
    migrations: list(cm.migrations),
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
    cast: Object.fromEntries(Object.entries(cm.cast ?? {}).map(([cid, c]) => [cid, clean({ name: c.name, role: about.meta?.cast?.[cid] ?? from.meta.cast?.[cid], look: c.look, voice: c.voice })])),
    sections: cm.sections.map((s) => clean({ id: s.id, ...from.meta.sections?.[s.id], units: s.units })),
  });
  return { meta, units };
}

/**
 * Course labels (./labels.js) in interface language `ui`, made from its
 * lang pack and, for the landing copy, its notes about the course's target
 * language. `lang` is lang/<ui>/course.json; `about` is
 * lang/<ui>/about/<to>/course.json or null; `learning` is true when
 * <ui> is the course's target language.
 */
export function composeLabels(lang, about, { learning = false } = {}) {
  const labels = clean({ sections: lang.sections, units: lang.units, skills: lang.skills, cast: about?.cast ? { ...lang.cast, ...about.cast } : lang.cast, description: about?.description });
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
    for (const st of cu.stories ?? []) {
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
  for (const ui of uis ?? Object.keys(lang)) if (ui !== from && lang[ui]) labels[ui] = composeLabels(lang[ui].meta, about[ui]?.[to]?.meta ?? null, { learning: ui === to });
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
