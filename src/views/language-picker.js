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
 */
import regions from '../packs/regions.json';
import { detectUiLanguage, languageLabel, t, UI_LANGUAGES } from '../i18n/index.js';
import { LANGUAGES, languageInfo } from '../i18n/languages.js';
import { baseLanguages, coursesFrom, coursesTo, deviceTimeZone, suggestLanguage } from '../i18n/catalog.js';
import { COURSES, changeCourse, changeUiLanguage } from '../app/languages.js';
import { escapeHtml } from '../ui/components.js';

const nameOf = languageLabel;
const nativeOf = (code) => languageInfo(code).nativeName;

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

/** Answers implied by a reply to the guess: a single possible course is picked straight away. */
export function replyToGuess(reply, suggestion, pairs) {
  if (reply === 'learn') {
    const options = coursesTo(suggestion.code, pairs);
    return { langAnswer: 'learn', learn: suggestion.code, course: options.length === 1 ? options[0].id : null };
  }
  if (reply === 'speak') {
    const options = coursesFrom(suggestion.code, pairs);
    return { langAnswer: 'speak', speak: suggestion.code, course: options.length === 1 ? options[0].id : null };
  }
  return { langAnswer: 'other', course: null };
}

function hellos(highlight) {
  return `<p class="onb-langs__hellos" aria-hidden="true">${LANGUAGES.map(
    (l) => `<span class="onb-langs__hello${l.code === highlight ? ' is-guess' : ''}" lang="${l.code}" dir="${l.dir}">${escapeHtml(l.greeting)}</span>`,
  ).join('')}</p>`;
}

const choice = (attrs, label, detail = '', checked = false) =>
  `<button class="choice onb__level" type="button" role="radio" aria-checked="${checked}" ${attrs}><strong>${label}</strong>${detail ? `<span>${detail}</span>` : ''}</button>`;

const courseChoice = (p, flow, label) => choice(`data-pick="course" data-value="${p.id}"`, label, '', flow.course?.id === p.id);

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
        ${canLearn ? choice('data-lang-reply="learn"', escapeHtml(t('picker.guess.learnIt', { language: nameOf(code) })), escapeHtml(t('picker.guess.learnDetail'))) : ''}
        ${canSpeak ? choice('data-lang-reply="speak"', escapeHtml(t('picker.guess.speakIt', { language: nameOf(code) })), escapeHtml(t('picker.guess.speakDetail', { native: nativeOf(code) }))) : ''}
        </div>${other}`,
      ready,
    };
  }

  if (flow.stage === 'base') {
    return {
      pose: 'cheering',
      say: escapeHtml(t(flow.options.length > 1 ? 'picker.base.ask' : 'picker.base.one', { language: nameOf(flow.learn), base: nameOf(flow.options[0]?.from ?? 'en') })),
      body: `${head}<div class="onb__options" role="radiogroup" aria-label="${escapeHtml(t('picker.base.label'))}">
        ${flow.options.map((p) => courseChoice(p, flow, escapeHtml(t('picker.base.option', { base: nativeOf(p.from) })))).join('')}
        </div>${other}`,
      ready,
    };
  }

  if (flow.stage === 'target') {
    const say = flow.none ? t('picker.target.none', { language: nameOf(flow.speak) }) : t('picker.target.ask');
    return {
      pose: flow.none ? 'thinking' : 'happy',
      say: escapeHtml(say),
      body: `${head}<div class="onb__options" role="radiogroup" aria-label="${escapeHtml(t('picker.target.label'))}">
        ${flow.options.map((p) => courseChoice(p, flow, escapeHtml(t('picker.course', { target: nameOf(p.to), base: nameOf(p.from) })))).join('')}
        </div>${other}`,
      ready,
    };
  }

  return {
    pose: 'thinking',
    say: escapeHtml(t('picker.pick.say')),
    body: `${head}
      <fieldset class="onb__fieldset">
        <legend>${escapeHtml(t('picker.pick.speak'))}</legend>
        <div class="onb__options onb__options--grid" role="radiogroup" aria-label="${escapeHtml(t('picker.pick.speak'))}">
          ${flow.bases.map((code) => choice(`data-pick="speak" data-value="${code}"`, escapeHtml(nativeOf(code)), nativeOf(code) === nameOf(code) ? '' : escapeHtml(nameOf(code)), code === flow.speak)).join('')}
        </div>
      </fieldset>
      <fieldset class="onb__fieldset">
        <legend>${escapeHtml(t('picker.pick.learn'))}</legend>
        <div class="onb__options" role="radiogroup" aria-label="${escapeHtml(t('picker.pick.learn'))}">
          ${flow.options.map((p) => courseChoice(p, flow, escapeHtml(nameOf(p.to)))).join('')}
        </div>
      </fieldset>`,
    ready,
  };
}

/** Handles a reply to the guess; returns the answers to save, or null. */
export function onGuessReply(reply) {
  const suggestion = currentGuess();
  if (reply === 'other' || !suggestion) return replyToGuess('other');
  return replyToGuess(reply, suggestion, COURSES);
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
