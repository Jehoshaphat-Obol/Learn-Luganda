/* Exercise renderers by type. */
import { renderIntro } from './intro.js';
import { renderChoice } from './choice.js';
import { renderTranslate } from './translate.js';
import { renderMatch } from './match.js';
import { renderType } from './type.js';
import { renderFill } from './fill.js';
import { renderDialogue } from './dialogue.js';
import { renderListen } from './listen.js';

export const RENDERERS = {
  intro: renderIntro,
  choice: renderChoice,
  translate: renderTranslate,
  match: renderMatch,
  type: renderType,
  fill: renderFill,
  dialogue: renderDialogue,
  listen: renderListen,
};
