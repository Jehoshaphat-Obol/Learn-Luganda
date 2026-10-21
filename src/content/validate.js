/*
 * Content checks, run by `npm run validate` and the unit tests. Returns a
 * list of human-readable problems; an empty list means the course is valid.
 */
const ID = /^[a-z0-9-]+$/;

export function validateUnits(rawUnits) {
  const errors = [];
  const seen = new Map();
  const taught = new Map();
  const claim = (kind, id, where) => {
    if (!ID.test(id)) errors.push(`${where}: ${kind} id "${id}" must be lowercase letters, digits and dashes`);
    if (seen.has(id)) errors.push(`${where}: duplicate id "${id}" (also ${seen.get(id)})`);
    seen.set(id, where);
  };

  for (const u of rawUnits) {
    claim('unit', u.id, u.id);
    if (!u.title) errors.push(`${u.id}: missing title`);
    const words = new Set();
    const sentences = new Set();
    for (const entry of u.words) {
      const [id, lg, en, extras] = entry;
      claim('word', id, `${u.id} words`);
      if (!lg || !en) errors.push(`${u.id}: word "${id}" needs Luganda and English`);
      if (extras && typeof extras !== 'object') errors.push(`${u.id}: word "${id}" extras must be an object`);
      words.add(id);
    }
    for (const [id, lg, en] of u.sentences) {
      claim('sentence', id, `${u.id} sentences`);
      if (!lg || !en) errors.push(`${u.id}: sentence "${id}" needs Luganda and English`);
      sentences.add(id);
    }
    if (!u.skills?.length) errors.push(`${u.id}: needs at least one skill`);
    for (const sk of u.skills ?? []) {
      claim('skill', sk.id, u.id);
      if (!sk.lessons?.length) errors.push(`${sk.id}: needs at least one lesson`);
      for (const l of sk.lessons ?? []) {
        claim('lesson', l.id, sk.id);
        if (!l.newWords?.length && !l.sentences?.length) errors.push(`${l.id}: needs new words or sentences`);
        for (const w of l.newWords ?? []) {
          if (!words.has(w)) errors.push(`${l.id}: unknown word "${w}" (words must be defined in the same unit)`);
          if (taught.has(w)) errors.push(`${l.id}: word "${w}" already introduced in ${taught.get(w)}`);
          taught.set(w, l.id);
        }
        for (const s of l.sentences ?? []) {
          if (!sentences.has(s)) errors.push(`${l.id}: unknown sentence "${s}"`);
        }
        for (const [i, d] of (l.dialogues ?? []).entries()) {
          if (!d.line || !d.translation) errors.push(`${l.id} dialogue ${i + 1}: needs line and translation`);
          if (!d.options?.includes(d.answer)) errors.push(`${l.id} dialogue ${i + 1}: answer must be one of the options`);
          if (d.options?.length < 2) errors.push(`${l.id} dialogue ${i + 1}: needs at least two options`);
        }
      }
    }
    for (const w of words) {
      if (!taught.has(w)) errors.push(`${u.id}: word "${w}" is never introduced in a lesson`);
    }
  }
  return errors;
}
