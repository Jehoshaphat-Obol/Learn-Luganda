/*
 * A little formatting inside pack strings, so translators never write HTML:
 *
 *   **bold**  → <strong>      _italic_ → <em>
 *   [label](#/settings)       → a link (in-app paths, https: and mailto: only;
 *                               https opens in a new tab)
 *
 * The text is escaped first, so a pack can't inject markup.
 */

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ESCAPES[c]);

const SAFE_HREF = /^(#|https:\/\/|mailto:)/;

/** Turns a formatted pack string into safe HTML. */
export function rich(text) {
  return escape(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(“"])_(.+?)_(?=$|[\s.,;:!?)”"])/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, href) => {
      if (!SAFE_HREF.test(href)) return label;
      const external = href.startsWith('https://') ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${href}"${external}>${label}</a>`;
    });
}

/** Strips the formatting marks, for plain-text uses such as aria labels. */
export const plain = (text) =>
  String(text)
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/(^|[\s(“"])_(.+?)_(?=$|[\s.,;:!?)”"])/g, '$1$2')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '$1');
