/*
 * Switching the interface language and the course while the app runs. Both
 * load their pack on demand, save the choice, and redraw the current screen.
 */
import { store } from '../state/store.js';
import { switchCourse, syncCourse } from '../state/courses.js';
import { detectUiLanguage, setLanguage, UI_LANGUAGES } from '../i18n/index.js';
import { COURSE_IDS, loadCourse } from '../content/load.js';
import { pairsOf } from '../i18n/catalog.js';

let redraw = () => {};

/** Every course the app ships, as `{ id, from, to }`. */
export const COURSES = Object.freeze(pairsOf(COURSE_IDS));

/**
 * The interface language "Automatic" stands for. Once the learner has a
 * course, that's the language the course is taught in (when there's a pack
 * for it), so the menus match the lessons; before that, the browser's.
 */
export function autoUiLanguage(state = store.get()) {
  const from = state.profile ? COURSES.find((p) => p.id === state.settings.course)?.from : null;
  return UI_LANGUAGES.includes(from) ? from : detectUiLanguage();
}

const uiLanguage = (state = store.get()) => state.settings.uiLang ?? autoUiLanguage(state);

/** Loads the saved (or detected) language and course; call once before the first render. */
export async function startLanguages(onChange) {
  redraw = onChange;
  await loadSaved();
}

/**
 * Loads the language and course the saved document asks for (also after an
 * import) and brings that course's progress up to the pack's version.
 */
export async function loadSaved() {
  const { course } = store.get().settings;
  const ui = uiLanguage();
  const [, loaded] = await Promise.all([setLanguage(ui), loadCourse(course, ui)]);
  // A saved course that's no longer shipped: park its progress, don't mix it in.
  store.update((s) => syncCourse(loaded.id === course ? s : switchCourse(s, loaded.id), loaded));
}

/** Changes the interface language (`null` goes back to automatic), course headings included. */
export async function changeUiLanguage(code) {
  store.update((s) => {
    s.settings.uiLang = code;
  });
  const ui = uiLanguage();
  await Promise.all([setLanguage(ui), loadCourse(store.get().settings.course, ui)]);
  redraw();
}

/** Switches to course `id`, keeping each course's progress separate. */
export async function changeCourse(id) {
  const state = store.get();
  if (state.settings.course === id) return;
  // On Automatic, the interface follows the new course's language.
  const ui = uiLanguage({ ...state, settings: { ...state.settings, course: id } });
  const [, loaded] = await Promise.all([setLanguage(ui), loadCourse(id, ui)]);
  store.update((s) => syncCourse(switchCourse(s, loaded.id), loaded));
  redraw();
}
