import { expect, test } from '@playwright/test';
import { buildLesson } from '../src/lesson/generate.js';
import { loadPack } from '../scripts/load-pack.js';
import { answer, continueToPath, openWith, readState, savedState } from './helpers.js';

// English taught in Luganda: the same lessons, the other way round.
const lgEn = loadPack('lg-en', { activate: false });

test('a Luganda speaker finishes their first English lesson, all in Luganda', async ({ page }) => {
  const seed = 7;
  await openWith(page, savedState({ version: 4, settings: { course: 'lg-en', uiLang: 'lg' } }), `#/lesson/u1s1l1?seed=${seed}`);
  await expect(page.locator('html')).toHaveAttribute('lang', 'lg');
  for (const ex of buildLesson('u1s1l1', { course: lgEn, seed, listening: false })) await answer(page, ex);
  await expect(page.getByRole('heading', { name: 'Essomo lituukiridde!' })).toBeVisible();
  await continueToPath(page);
  const s = await readState(page);
  expect(s.settings.course).toBe('lg-en');
  expect(s.lessons.u1s1l1.completions).toBe(1);
});

test('the guidebook explains English in Luganda', async ({ page }) => {
  await openWith(page, savedState({ version: 4, settings: { course: 'lg-en', uiLang: 'lg' } }), '#/guidebook/u1');
  await expect(page.getByRole('heading', { name: 'Okulamusa kugoberera essaawa' })).toBeVisible();
  await expect(page.getByText('Good morning').first()).toBeVisible();
});
