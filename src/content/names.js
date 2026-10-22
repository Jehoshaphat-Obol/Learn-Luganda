/*
 * The course's language names as the screens show them: in the interface
 * language ("Olungereza" in Luganda), from the UI pack's `languageNames`.
 * `languageName` in ./course.js keeps the registry's English names for
 * scripts and tests, which run without the UI packs.
 */
import { languageLabel } from '../i18n/index.js';
import { course, langCode } from './course.js';

/** The name of the course's 'target' or 'base' language. */
export const courseLanguage = (role, c = course) => languageLabel(langCode(role, c));
