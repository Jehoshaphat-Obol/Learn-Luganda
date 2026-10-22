/*
 * The first get-started screen: the crane says hello in many languages,
 * makes a guess at one the learner knows (from the device's time zone and
 * browser languages), and asks whether they speak it or came to learn it.
 * The answer decides the other side: what to learn, or which language to
 * learn it from. "Something else" opens the full picker.
 *
 * `languageFlow()` is the pure decision; `languageScreen()` draws it for
 * the onboarding view, which saves picks under `answers`:
 *   langAnswer  'learn' | 'speak' | 'other' (the reply to the guess)
 *   speak       base language code      learn  target language code
 *   course      the chosen course id
 *
 * Long lists get a search box (`filterLanguages()` narrows them as the
 * learner types), and each language shows a small flag beside its name.
 */
import regions from '../packs/regions.json';
import { detectUiLanguage, languageLabel, t, UI_LANGUAGES } from '../i18n/index.js';
import { LANGUAGES, languageInfo } from '../i18n/languages.js';
import { baseLanguages, coursesFrom, coursesTo, deviceTimeZone, likelyLanguages, suggestLanguage } from '../i18n/catalog.js';
import { COURSES, changeCourse, changeUiLanguage } from '../app/languages.js';
import { DEFAULT_COURSE } from '../content/load.js';
import { escapeHtml } from '../ui/components.js';
import { languageFlag } from '../ui/flags.js';
import { icon } from '../ui/icons.js';
import { languageSearchText, matchesSearch } from '../i18n/search.js';

const nameOf = languageLabel;
const nativeOf = (code) => languageInfo(code).nativeName;

/** Lists longer than this get a search box (the full picker always has one). */
export const SEARCH_FROM = 7;

/** What the learner typed in the search box, kept across redraws. */
let query = '';

/** The learner's likely language, worked out once per visit. */
let guess;
export function currentGuess(pairs = COURSES) {
  guess ??= suggestLanguage({ timeZone: deviceTimeZone(), preferred: globalThis.navigator?.languages ?? [], regions, pairs });
  return guess;
}

/**
 * What to ask next. Returns `{ stage, ... }`:
 *   'guess'   ask about `suggestion` (speak it, learn it, or something else)
 *   'base'    learning `learn`: pick which language to learn it from (`options`)
 *   'target'  speaking `speak`: pick what to learn (`options`, `none` when no
 *             course is taught from it yet, so every course is offered)
 *   'pick'    the full picker: `bases` and `options` for the chosen base
 * and `course` once a course is chosen.
 */
export function languageFlow(answers, { suggestion, pairs }) {
  const course = pairs.find((p) => p.id === answers.course) ?? null;
  if (suggestion && !answers.langAnswer) return { stage: 'guess', suggestion, course };
  if (answers.langAnswer === 'learn') return { stage: 'base', learn: answers.learn, options: coursesTo(answers.learn, pairs), course };
  if (answers.langAnswer === 'speak') {
    const from = coursesFrom(answers.speak, pairs);
    return { stage: 'target', speak: answers.speak, options: from.length ? from : pairs, none: !from.length, course };
  }
  const bases = baseLanguages(pairs);
  const speak = answers.speak && bases.includes(answers.speak) ? answers.speak : bases[0];
  return { stage: 'pick', bases, speak, options: coursesFrom(speak, pairs), course };
}

/**
 * The course to pre-select among `options`: the one whose other language is
 * most likely for this learner (Luganda before Swahili in Uganda), else
 * `fallback` if it is an option. Null leaves the choice to the learner.
 */
export function likelyCourse(options, other, { likely = [], fallback = null } = {}) {
  if (options.length === 1) return options[0].id;
  const rank = (p) => (likely.includes(p[other]) ? likely.indexOf(p[other]) : Infinity);
  const best = [...options].sort((a, b) => rank(a) - rank(b))[0];
  if (best && rank(best) < Infinity) return best.id;
  return options.some((p) => p.id === fallback) ? fallback : null;
}

/**
 * Answers implied by a reply to the guess: a single possible course is
 * picked straight away, and among several the likeliest is pre-selected.
 */
export function replyToGuess(reply, suggestion, pairs, hints) {
  if (reply === 'learn') {
    const options = coursesTo(suggestion.code, pairs);
    return { langAnswer: 'learn', learn: suggestion.code, course: likelyCourse(options, 'from', hints) };
  }
  if (reply === 'speak') {
    const options = coursesFrom(suggestion.code, pairs);
    return { langAnswer: 'speak', speak: suggestion.code, course: likelyCourse(options, 'to', hints) };
  }
  return { langAnswer: 'other', course: null };
}

function hellos(highlight) {
  return `<p class="onb-langs__hellos" aria-hidden="true">${LANGUAGES.map(
    (l) => `<span class="onb-langs__hello${l.code === highlight ? ' is-guess' : ''}" lang="${l.code}" dir="${l.dir}">${escapeHtml(l.greeting)}</span>`,
  ).join('')}</p>`;
}

/**
 * A choice button. `lang` (a language code) adds its flag and, when `search`
 * is on, the text the search box matches against.
 */
const choice = (attrs, label, detail = '', checked = false, { lang, search = false } = {}) => {
  const text = search && lang ? languageSearchText(lang, nameOf(lang)) : '';
  const hidden = text && query && !matchesSearch(text, query) ? ' hidden' : '';
  const found = text ? ` data-search="${escapeHtml(text)}"` : '';
  const flag = lang ? languageFlag(lang) : '';
  return `<button class="choice onb__level" type="button" role="radio" aria-checked="${checked}" ${attrs}${found}${hidden}><strong>${flag}${label}</strong>${detail ? `<span>${detail}</span>` : ''}</button>`;
};

const courseChoice = (p, flow, label, lang, search) =>
  choice(`data-pick="course" data-value="${p.id}"`, label, '', flow.course?.id === p.id, { lang, search });

/** The search box over the language lists. */
function searchBox() {
  const label = escapeHtml(t('picker.search.label'));
  return `<div class="onb-langs__search">
    ${icon('search', { size: 18 })}
    <input class="input" id="onb-lang-search" type="search" data-lang-search aria-label="${label}" placeholder="${label}" value="${escapeHtml(query)}" autocomplete="off" spellcheck="false" enterkeyhint="search">
  </div>`;
}

/** Shown in a list when nothing matches the search. */
const noMatches = (shown) => `<p class="onb-langs__none" data-search-none role="status"${shown ? '' : ' hidden'}>${escapeHtml(t('picker.search.none'))}</p>`;
const anyMatch = (codes) => !query || codes.some((code) => matchesSearch(languageSearchText(code, nameOf(code)), query));

/**
 * Narrows the drawn lists to the languages matching `text`, without a redraw
 * (so the caret stays put). Remembered for the next redraw too.
 */
export function filterLanguages(root, text) {
  query = text;
  for (const group of root.querySelectorAll('[role="radiogroup"]')) {
    const items = [...group.querySelectorAll('[data-search]')];
    if (!items.length) continue;
    let shown = 0;
    for (const item of items) {
      const match = matchesSearch(item.dataset.search, text);
      item.hidden = !match;
      shown += match;
    }
    const none = group.parentElement.querySelector('[data-search-none]');
    if (none) none.hidden = shown > 0;
  }
}

/** The screen for the onboarding view: `{ pose, say, body, ready }`. */
export function languageScreen(answers) {
  const suggestion = currentGuess();
  const flow = languageFlow(answers, { suggestion, pairs: COURSES });
  const other = `<button class="btn btn--ghost onb-langs__other" type="button" data-lang-reply="other">${escapeHtml(t('picker.other'))}</button>`;
  const head = hellos(flow.suggestion?.code ?? answers.learn ?? answers.speak);
  const ready = Boolean(flow.course);

  if (flow.stage === 'guess') {
    const { code, canLearn, canSpeak } = flow.suggestion;
    const key = canLearn && canSpeak ? 'both' : canLearn ? 'learn' : 'speak';
    return {
      pose: 'happy',
      say: escapeHtml(t(`picker.guess.${key}`, { language: nameOf(code) })),
      body: `${head}<div class="onb__options" role="radiogroup" aria-label="${escapeHtml(t('picker.guess.label'))}">
        ${canLearn ? choice('data-lang-reply="learn"', escapeHtml(t('picker.guess.learnIt', { language: nameOf(code) })), escapeHtml(t('picker.guess.learnDetail')), false, { lang: code }) : ''}
        ${canSpeak ? choice('data-lang-reply="speak"', escapeHtml(t('picker.guess.speakIt', { language: nameOf(code) })), escapeHtml(t('picker.guess.speakDetail', { native: nativeOf(code) })), false, { lang: code }) : ''}
        </div>${other}`,
      ready,
    };
  }

  if (flow.stage === 'base') {
    const search = flow.options.length >= SEARCH_FROM;
    return {
      pose: 'cheering',
      say: escapeHtml(t(flow.options.length > 1 ? 'picker.base.ask' : 'picker.base.one', { language: nameOf(flow.learn), base: nameOf(flow.options[0]?.from ?? 'en') })),
      body: `${head}${search ? searchBox() : ''}<div class="onb__options" role="radiogroup" aria-label="${escapeHtml(t('picker.base.label'))}">
        ${flow.options.map((p) => courseChoice(p, flow, escapeHtml(t('picker.base.option', { base: nativeOf(p.from) })), p.from, search)).join('')}
        </div>${search ? noMatches(!anyMatch(flow.options.map((p) => p.from))) : ''}${other}`,
      ready,
    };
  }

  if (flow.stage === 'target') {
    const say = flow.none ? t('picker.target.none', { language: nameOf(flow.speak) }) : t('picker.target.ask');
    const search = flow.options.length >= SEARCH_FROM;
    return {
      pose: flow.none ? 'thinking' : 'happy',
      say: escapeHtml(say),
      body: `${head}${search ? searchBox() : ''}<div class="onb__options" role="radiogroup" aria-label="${escapeHtml(t('picker.target.label'))}">
        ${flow.options.map((p) => courseChoice(p, flow, escapeHtml(t('picker.course', { target: nameOf(p.to), base: nameOf(p.from) })), p.to, search)).join('')}
        </div>${search ? noMatches(!anyMatch(flow.options.map((p) => p.to))) : ''}${other}`,
      ready,
    };
  }

  return {
    pose: 'thinking',
    say: escapeHtml(t('picker.pick.say')),
    body: `${head}${searchBox()}
      <fieldset class="onb__fieldset">
        <legend>${escapeHtml(t('picker.pick.speak'))}</legend>
        <div class="onb__options onb__options--grid" role="radiogroup" aria-label="${escapeHtml(t('picker.pick.speak'))}">
          ${flow.bases.map((code) => choice(`data-pick="speak" data-value="${code}"`, escapeHtml(nativeOf(code)), nativeOf(code) === nameOf(code) ? '' : escapeHtml(nameOf(code)), code === flow.speak, { lang: code, search: true })).join('')}
        </div>
        ${noMatches(!anyMatch(flow.bases))}
      </fieldset>
      <fieldset class="onb__fieldset">
        <legend>${escapeHtml(t('picker.pick.learn'))}</legend>
        <div class="onb__options" role="radiogroup" aria-label="${escapeHtml(t('picker.pick.learn'))}">
          ${flow.options.map((p) => courseChoice(p, flow, escapeHtml(nameOf(p.to)), p.to, true)).join('')}
        </div>
        ${noMatches(!anyMatch(flow.options.map((p) => p.to)))}
      </fieldset>`,
    ready,
  };
}

/** Handles a reply to the guess; returns the answers to save, or null. */
export function onGuessReply(reply) {
  const suggestion = currentGuess();
  query = '';
  if (reply === 'other' || !suggestion) return replyToGuess('other');
  const { languages } = likelyLanguages({ timeZone: deviceTimeZone(), preferred: globalThis.navigator?.languages ?? [], regions });
  return replyToGuess(reply, suggestion, COURSES, { likely: languages, fallback: DEFAULT_COURSE });
}

/** Applies the chosen course and interface language when the step is done. */
export async function applyLanguages(answers) {
  const course = COURSES.find((p) => p.id === answers.course);
  if (!course) return;
  // Show the app in the learner's language when there's a pack for it; when
  // that's what the browser asks for anyway, keep following the browser.
  if (UI_LANGUAGES.includes(course.from)) await changeUiLanguage(course.from === detectUiLanguage() ? null : course.from);
  await changeCourse(course.id);
}
