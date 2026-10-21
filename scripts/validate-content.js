// Validates every course pack; exits non-zero with a list of problems.
import { validateGuidebooks, validateSections, validateStories, validateUnits } from '../src/content/validate.js';
import { courseStats } from '../src/content/course.js';
import { PATHS } from '../src/ui/icons.js';
import { CAST } from '../src/illustrations/characters.js';
import { courseIds, loadPack, readPack } from './load-pack.js';

const errors = [];
const summaries = [];
for (const id of courseIds()) {
  const { meta, units } = readPack(id);
  const course = loadPack(id, { activate: false });
  const raw = course.pack.units;
  const at = (list) => list.map((e) => `${id}: ${e}`);
  errors.push(
    ...at(Object.entries(units).filter(([unitId]) => !meta.sections.some((s) => s.units.includes(unitId))).map(([unitId]) => `unit file ${unitId} is not in any section`)),
    ...at(validateUnits(raw)),
    ...at(validateStories(course.stories, { lessons: Object.keys(course.lessons), units: raw.map((u) => u.id), cast: Object.keys(CAST) })),
    ...at(validateGuidebooks(course.guidebooks, raw)),
    ...at(validateSections(meta.sections, raw)),
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
