// Validates every course pack; exits non-zero with a list of problems.
import { validateGuidebooks, validateSections, validateStories, validateUnits } from '../src/content/validate.js';
import { courseStats } from '../src/content/course.js';
import { PATHS } from '../src/ui/icons.js';
import { CAST } from '../src/illustrations/characters.js';
import { courseIds, loadPack, readPack } from './load-pack.js';
import { knownIds, validateMigrations } from '../src/content/migrations.js';

const errors = [];
const summaries = [];
for (const id of courseIds()) {
  const { meta, units } = readPack(id);
  const course = loadPack(id, { activate: false });
  const raw = course.pack.units;
  const at = (list) => list.map((e) => `${id}: ${e}`);
  // A course with its own cast may only use those characters.
  const castIds = Object.keys(meta.cast ?? {}).length ? Object.keys(meta.cast) : Object.keys(CAST);
  const speakers = raw.flatMap((u) => [
    ...(u.character ? [[u.character, `unit ${u.id}`]] : []),
    ...u.skills.flatMap((sk) => sk.lessons.flatMap((l) => (l.dialogues ?? []).map((d) => [d.speaker, `lesson ${l.id}`]))),
  ]);
  errors.push(
    ...at(Object.entries(units).filter(([unitId]) => !meta.sections.some((s) => s.units.includes(unitId))).map(([unitId]) => `unit file ${unitId} is not in any section`)),
    ...at(validateUnits(raw)),
    ...at(validateStories(course.stories, { lessons: Object.keys(course.lessons), units: raw.map((u) => u.id), cast: castIds })),
    ...at(speakers.filter(([who]) => !castIds.includes(who)).map(([who, where]) => `${where}: "${who}" is not in the cast`)),
    ...at(Object.entries(meta.cast ?? {}).filter(([, c]) => typeof c.look === 'string' && !CAST[c.look]).map(([who, c]) => `cast ${who}: unknown look "${c.look}"`)),
    ...at(validateGuidebooks(course.guidebooks, raw)),
    ...at(validateSections(meta.sections, raw)),
    ...at(validateMigrations(meta.migrations, meta.version, knownIds(course))),
    ...at(meta.landing && !meta.landing.sample.options.includes(meta.landing.sample.answer) ? ['landing.sample: the answer must be one of the options'] : []),
    ...at(raw.flatMap((u) => u.skills.filter((sk) => sk.icon && !PATHS[sk.icon]).map((sk) => `skill ${sk.id}: unknown icon "${sk.icon}"`))),
  );
  const { sections, units: n, lessons, words, stories } = courseStats(course);
  summaries.push(`${id}: ${sections} sections, ${n} units, ${lessons} lessons, ${words} words, ${stories} stories`);
}
if (errors.length) {
  console.error(`Content has ${errors.length} problem(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`Content OK: ${summaries.join('; ')}.`);
