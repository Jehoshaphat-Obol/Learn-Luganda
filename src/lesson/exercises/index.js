/* Exercise renderers by type. */
import { renderIntro } from './intro.js';
import { renderChoice } from './choice.js';
import { renderTranslate } from './translate.js';
import { renderMatch } from './match.js';

export const RENDERERS = {
  intro: renderIntro,
  choice: renderChoice,
  translate: renderTranslate,
  match: renderMatch,
};
