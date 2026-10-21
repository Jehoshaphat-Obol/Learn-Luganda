/* Shared helpers: seeding saved progress and answering exercises correctly. */
import { buildLesson } from '../src/lesson/generate.js';
import { course } from '../src/content/course.js';
import { dayKey, addDays } from '../src/state/dates.js';
import { tokens } from '../src/lesson/answers.js';

export const KEY = 'learn-luganda';
export const today = () => dayKey();
export const yesterday = () => addDays(dayKey(), -1);

/** A saved state with a profile, merged with `extra`. */
export function savedState(extra = {}) {
  return {
    version: 1,
    profile: { name: 'Amani', avatar: { character: 'nakato', color: 'vermillion' }, dailyGoal: 20, joinedAt: today() },
    ...extra,
  };
}

/** Opens the app with `state` saved, before any app code runs. */
export async function openWith(page, state, hash = '#/learn') {
  await page.addInitScript(
    ([key, value]) => {
      if (!sessionStorage.getItem('seeded')) {
        localStorage.setItem(key, value);
        sessionStorage.setItem('seeded', '1');
      }
    },
    [KEY, JSON.stringify(state)],
  );
  await page.goto(`./${hash}`);
}

export const readState = (page) => page.evaluate((key) => JSON.parse(localStorage.getItem(key)), KEY);

/** The exercises the app will show for `lessonId` with `seed`. */
export const exercisesFor = (lessonId, seed, firstTime = true) => buildLesson(lessonId, { seed, firstTime });

export { course };

const main = (page) => page.locator('[data-main]');

/** Answers the current exercise correctly (or wrongly) and presses Check. */
export async function answer(page, ex, { correct = true } = {}) {
  const stage = page.locator('[data-stage]');
  switch (ex.type) {
    case 'intro':
      await main(page).click();
      return;
    case 'choice':
    case 'dialogue':
    case 'fill': {
      const value = correct ? ex.answer : (ex.options.map((o) => o.value ?? o).find((v) => v !== ex.answer));
      await stage.locator(`[data-value="${cssEscape(value)}"]`).first().click();
      break;
    }
    case 'match': {
      for (const pair of ex.pairs) {
        await stage.locator(`[data-side="lg"][data-id="${pair.id}"]`).click();
        await stage.locator(`[data-side="en"][data-id="${pair.id}"]`).click();
      }
      // Matching finishes the exercise by itself.
      await page.waitForTimeout(700);
      return;
    }
    case 'translate':
    case 'listen': {
      const words = correct ? tokens(ex.answerText) : [ex.bank.find((t) => !tokens(ex.answerText).includes(t)) ?? ex.bank[0]];
      for (const w of words) {
        await stage.locator('[data-bank] [data-tile]:not([disabled])', { hasText: new RegExp(`^${escapeRe(w)}$`) }).first().click();
      }
      break;
    }
    case 'type':
      await stage.locator('textarea').fill(correct ? ex.accepted[0] : 'zzz');
      break;
    default:
      throw new Error(`No helper for ${ex.type}`);
  }
  await main(page).click();
  // Continue past the feedback.
  await main(page).click();
}

const cssEscape = (v) => String(v).replace(/["\\]/g, '\\$&');
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
