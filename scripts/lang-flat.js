/*
 * Draft a new lang pack as plain text (#184): one tab-separated line per
 * text, so a unit can be translated line by line from a language the
 * catalog already has, then built back into JSON with the reference's shape.
 *
 *   node scripts/lang-flat.js dump en u4 > drafts/nyn/u4.txt
 *   node scripts/lang-flat.js build nyn drafts/nyn/u4.txt [--ref en] [--typography fr]
 *
 * `build` writes src/packs/lang/<code>/units/<unit>.json (the unit id comes
 * from the file name). Lines are `KEY<TAB>text[<TAB>alt | alt]`:
 *   W <id>              a word: text, then accepted answers
 *   S <id>              a sentence, the same way
 *   P <i>               the guidebook's phrase i
 *   D <lesson> <i> line a dialogue line; `D <lesson> <i> o` its replies
 *   T <story> title|summary|L<i>|Q<i>|Q<i>o   a story's text
 * Options and accepted answers are ` | `-separated. Blank lines and lines
 * starting with # are ignored. Every key of the reference unit is needed and
 * no other key is allowed, so a draft can't silently drop or invent text.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { formatJson } from './format-json.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../src/packs/lang');
const SEP = ' | ';
const split = (s) => s.split('|').map((x) => x.trim());

export const readUnit = (code, unit) => JSON.parse(readFileSync(join(ROOT, code, 'units', `${unit}.json`), 'utf8'));

/** Tab lines for one lang unit. */
export function dump(unit) {
  const out = [];
  for (const [tag, sec] of [['W', 'words'], ['S', 'sentences']]) {
    for (const [id, v] of Object.entries(unit[sec] ?? {})) out.push([`${tag} ${id}`, v.text, ...(v.alts?.length ? [v.alts.join(SEP)] : [])].join('\t'));
  }
  (unit.phrases ?? []).forEach((p, i) => out.push(`P ${i}\t${p}`));
  for (const [lesson, lines] of Object.entries(unit.dialogues ?? {})) {
    lines.forEach((x, i) => {
      out.push(`D ${lesson} ${i} line\t${x.line}`);
      if (x.options) out.push(`D ${lesson} ${i} o\t${x.options.join(SEP)}`);
    });
  }
  for (const [id, st] of Object.entries(unit.stories ?? {})) {
    for (const f of ['title', 'summary']) if (f in st) out.push(`T ${id} ${f}\t${st[f]}`);
    (st.lines ?? []).forEach((x, i) => out.push(`T ${id} L${i}\t${x}`));
    (st.questions ?? []).forEach((q, i) => {
      if ('question' in q) out.push(`T ${id} Q${i}\t${q.question}`);
      if ('options' in q) out.push(`T ${id} Q${i}o\t${q.options.join(SEP)}`);
    });
  }
  return out.join('\n') + '\n';
}

/** French spacing: typographic apostrophe, no-break space before ? ! : ; » and after «. */
const TYPOGRAPHY = {
  fr: (t) => t.replace(/'/g, '’').replace(/ ([?!:;»])/g, ' $1').replace(/« /g, '« '),
};

/** A lang unit from tab lines, in the reference unit's shape. */
export function build(text, ref, { typography } = {}) {
  const fix = TYPOGRAPHY[typography] ?? ((t) => t);
  const rows = new Map();
  for (const raw of text.split('\n')) {
    if (!raw.trim() || raw.startsWith('#')) continue;
    const [key, ...rest] = raw.split('\t');
    if (rows.has(key.trim())) throw new Error(`${ref.id}: ${key.trim()} appears twice`);
    rows.set(key.trim(), rest.map((p) => split(p).map(fix).join(SEP)));
  }
  const used = new Set();
  const get = (key) => {
    if (!rows.has(key)) throw new Error(`${ref.id}: missing ${key}`);
    used.add(key);
    return rows.get(key);
  };
  const options = (key, want) => {
    const opts = split(get(key)[0]);
    if (opts.length !== want) throw new Error(`${ref.id}: ${key} has ${opts.length} options, needs ${want}`);
    return opts;
  };
  const unit = { $schema: ref.$schema, id: ref.id };
  for (const [tag, sec] of [['W', 'words'], ['S', 'sentences']]) {
    if (!ref[sec]) continue;
    unit[sec] = {};
    for (const id of Object.keys(ref[sec])) {
      const [main, alts = ''] = get(`${tag} ${id}`);
      const list = [...new Set(split(alts).filter(Boolean))];
      unit[sec][id] = list.length ? { text: main, alts: list } : { text: main };
    }
  }
  if (ref.phrases) unit.phrases = ref.phrases.map((_, i) => get(`P ${i}`)[0]);
  if (ref.dialogues) {
    unit.dialogues = {};
    for (const [lesson, lines] of Object.entries(ref.dialogues)) {
      unit.dialogues[lesson] = lines.map((x, i) => ({
        line: get(`D ${lesson} ${i} line`)[0],
        ...(x.options ? { options: options(`D ${lesson} ${i} o`, x.options.length) } : {}),
      }));
    }
  }
  if (ref.stories) {
    unit.stories = {};
    for (const [id, st] of Object.entries(ref.stories)) {
      const s = {};
      for (const f of ['title', 'summary']) if (f in st) s[f] = get(`T ${id} ${f}`)[0];
      if (st.lines) s.lines = st.lines.map((_, i) => get(`T ${id} L${i}`)[0]);
      if (st.questions) {
        s.questions = st.questions.map((q, i) => ({
          ...('question' in q ? { question: get(`T ${id} Q${i}`)[0] } : {}),
          ...('options' in q ? { options: options(`T ${id} Q${i}o`, q.options.length) } : {}),
        }));
      }
      unit.stories[id] = s;
    }
  }
  const extra = [...rows.keys()].filter((k) => !used.has(k));
  if (extra.length) throw new Error(`${ref.id}: unknown keys ${extra.slice(0, 5).join(', ')}`);
  return unit;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [cmd, a, b] = process.argv.slice(2);
  const flag = (name, fallback) => {
    const i = process.argv.indexOf(`--${name}`);
    return i > 0 ? process.argv[i + 1] : fallback;
  };
  if (cmd === 'dump' && a && b) process.stdout.write(dump(readUnit(a, b)));
  else if (cmd === 'build' && a && b) {
    const id = basename(b, '.txt');
    const unit = build(readFileSync(b, 'utf8'), readUnit(flag('ref', 'en'), id), { typography: flag('typography') });
    mkdirSync(join(ROOT, a, 'units'), { recursive: true });
    writeFileSync(join(ROOT, a, 'units', `${id}.json`), formatJson(unit) + '\n');
    console.log(`wrote src/packs/lang/${a}/units/${id}.json`);
  } else {
    console.error('usage: node scripts/lang-flat.js dump <code> <unit> | build <code> <file.txt> [--ref en] [--typography fr]');
    process.exit(1);
  }
}
