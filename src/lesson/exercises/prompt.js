/* An exercise's heading, from the UI pack's `lesson.prompt.<id>`. */
import { t } from '../../i18n/index.js';
import { escapeHtml } from '../../ui/components.js';

export const promptText = (ex) => t(`lesson.prompt.${ex.prompt.id}`, ex.prompt.params);

export const promptHtml = (ex) => `<h2 class="ex__prompt">${escapeHtml(promptText(ex))}</h2>`;
