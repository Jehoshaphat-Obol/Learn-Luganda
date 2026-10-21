// Validates the course content; exits non-zero with a list of problems.
import { UNITS_RAW, course } from '../src/content/course.js';
import { validateGuidebooks, validateStories, validateUnits } from '../src/content/validate.js';
import { STORIES } from '../src/content/stories.js';
import { GUIDEBOOKS } from '../src/content/guidebooks.js';
import { CAST } from '../src/illustrations/characters.js';

const errors = [
  ...validateUnits(UNITS_RAW),
  ...validateStories(STORIES, { lessons: Object.keys(course.lessons), units: UNITS_RAW.map((u) => u.id), cast: Object.keys(CAST) }),
  ...validateGuidebooks(GUIDEBOOKS, UNITS_RAW),
];
if (errors.length) {
  console.error(`Content has ${errors.length} problem(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
const words = UNITS_RAW.reduce((n, u) => n + u.words.length, 0);
const lessons = UNITS_RAW.reduce((n, u) => n + u.skills.reduce((m, s) => m + s.lessons.length, 0), 0);
console.log(`Content OK: ${UNITS_RAW.length} units, ${lessons} lessons, ${words} words, ${STORIES.length} stories.`);
