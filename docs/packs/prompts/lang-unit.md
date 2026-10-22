# Prompt: translate one unit

Make the draft with `node scripts/lang-flat.js dump en {{unit}} > {{unit}}.txt`
and attach it with `src/packs/lang/{{code}}/course.json` (for the culture
names) and the previous units already written (for words already taught).
Save the reply as `{{unit}}.txt`, then run
`node scripts/lang-flat.js build {{code}} {{unit}}.txt`.

---

Translate this unit of a language course into **{{language}}**. Each line
is `KEY<TAB>text[<TAB>accepted answers]`.

1. Keep every line and its `KEY` exactly; replace only the text after the
   first tab. Add no lines and drop none.
2. `W` lines are words and `S` lines sentences. After a second tab, list
   other correct ways to say it, separated by ` | `: spellings, word orders,
   with and without the polite form. Learners are marked right if they
   type any of them.
3. A trailing hint in brackets, like `Read (all of you)`, stays a hint in
   {{language}}: keep the brackets.
4. `D … o` and `T … Q<i>o` lines are answer options: keep their number and
   order, since the right answer is chosen by position.
5. Keep `{to}`, `{from}`, `{to.mu}` and `{@nakato}`-style slots as they are;
   the app fills them in.
6. Write natural {{language}}, not word-for-word English. If the unit's
   topic has a local way of saying something (greetings, prices, kinship),
   use it.
7. Never invent a word. If unsure, use the simplest form you are sure of
   and add a line `# check: <key> <why>`; those lines are ignored by the
   build and become the review list.
