// Validates the course content; exits non-zero with a list of problems.
import { UNITS_RAW, course, courseStats } from '../src/content/course.js';
import { validateGuidebooks, validateSections, validateStories, validateUnits } from '../src/content/validate.js';
import { STORIES } from '../src/content/stories.js';
import { GUIDEBOOKS } from '../src/content/guidebooks.js';
import { SECTIONS } from '../src/content/sections.js';
import { CAST } from '../src/illustrations/characters.js';

const errors = [
  ...validateUnits(UNITS_RAW),
  ...validateStories(STORIES, { lessons: Object.keys(course.lessons), units: UNITS_RAW.map((u) => u.id), cast: Object.keys(CAST) }),
  ...validateGuidebooks(GUIDEBOOKS, UNITS_RAW),
  ...validateSections(SECTIONS, UNITS_RAW),
];
if (errors.length) {
  console.error(`Content has ${errors.length} problem(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
const { sections, units, lessons, words } = courseStats();
console.log(`Content OK: ${sections} sections, ${units} units, ${lessons} lessons, ${words} words, ${STORIES.length} stories.`);
