/*
 * Switching the interface language and the course while the app runs. Both
 * load their pack on demand, save the choice, and redraw the current screen.
 */
import { store } from '../state/store.js';
import { switchCourse, syncCourse } from '../state/courses.js';
import { detectUiLanguage, setLanguage } from '../i18n/index.js';
import { COURSE_IDS, loadCourse } from '../content/load.js';
import { pairsOf } from '../i18n/catalog.js';

let redraw = () => {};

/** Every course the app ships, as `{ id, from, to }`. */
export const COURSES = Object.freeze(pairsOf(COURSE_IDS));

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
  const { uiLang, course } = store.get().settings;
  const [, loaded] = await Promise.all([setLanguage(uiLang ?? detectUiLanguage()), loadCourse(course)]);
  // A saved course that's no longer shipped: park its progress, don't mix it in.
  store.update((s) => syncCourse(loaded.id === course ? s : switchCourse(s, loaded.id), loaded));
}

/** Changes the interface language (`null` goes back to the browser's). */
export async function changeUiLanguage(code) {
  store.update((s) => {
    s.settings.uiLang = code;
  });
  await setLanguage(code ?? detectUiLanguage());
  redraw();
}

/** Switches to course `id`, keeping each course's progress separate. */
export async function changeCourse(id) {
  if (store.get().settings.course === id) return;
  const loaded = await loadCourse(id);
  store.update((s) => syncCourse(switchCourse(s, loaded.id), loaded));
  redraw();
}
