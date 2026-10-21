import { expect, test } from '@playwright/test';
import { answer, exercisesFor, openWith, readState, savedState } from './helpers.js';

// Headless Chromium reports notifications as denied whatever the context
// grants, so stand in for the browser's permission prompt.
const fakePermission = (page) =>
  page.addInitScript(() => {
    let permission = 'default';
    Object.defineProperty(Notification, 'permission', { get: () => permission });
    Notification.requestPermission = async () => (permission = 'granted');
  });

test('after a second lesson the app offers word reminders, and yes turns them on', async ({ page }) => {
  await fakePermission(page);
  const seed = 5;
  const stats = { lessonsCompleted: 1, perfectLessons: 1, practiceSessions: 0, answers: 10, correctAnswers: 10, secondsLearning: 60 };
  await openWith(page, savedState({ stats, lessons: { u1s1l1: { completions: 1, bestAccuracy: 1 } } }), `#/lesson/u1s1l2?seed=${seed}`);
  for (const ex of exercisesFor('u1s1l2', seed)) await answer(page, ex);
  const offer = page.getByRole('heading', { name: 'A word a day?' });
  for (let i = 0; i < 6 && !(await offer.isVisible()); i += 1) await page.locator('[data-continue]').click();
  await expect(offer).toBeVisible();
  await page.getByRole('button', { name: 'Yes, send me words' }).click();
  await expect(page.locator('[data-offer-text]')).toContainText('first word arrives soon');
  const s = await readState(page);
  expect(s.reminders).toMatchObject({ on: true, consent: 'granted' });
  expect(s.reminders.hours.reduce((a, b) => a + b, 0)).toBe(1);
});

test('the first lesson never asks about reminders', async ({ page }) => {
  await fakePermission(page);
  const seed = 42;
  await openWith(page, savedState(), `#/lesson/u1s1l1?seed=${seed}`);
  for (const ex of exercisesFor('u1s1l1', seed)) await answer(page, ex);
  for (let i = 0; i < 6 && (await page.locator('[data-continue]').count()); i += 1) {
    await expect(page.getByRole('heading', { name: 'A word a day?' })).toHaveCount(0);
    await page.locator('[data-continue]').click();
  }
  expect((await readState(page)).reminders.on).toBe(false);
});
