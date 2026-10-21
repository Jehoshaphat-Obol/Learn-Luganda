// Validates the course content; exits non-zero with a list of problems.
import { UNITS_RAW } from '../src/content/course.js';
import { validateUnits } from '../src/content/validate.js';

const errors = validateUnits(UNITS_RAW);
if (errors.length) {
  console.error(`Content has ${errors.length} problem(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
const words = UNITS_RAW.reduce((n, u) => n + u.words.length, 0);
const lessons = UNITS_RAW.reduce((n, u) => n + u.skills.reduce((m, s) => m + s.lessons.length, 0), 0);
console.log(`Content OK: ${UNITS_RAW.length} units, ${lessons} lessons, ${words} words.`);
