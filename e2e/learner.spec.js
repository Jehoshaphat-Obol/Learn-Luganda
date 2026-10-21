import { expect, test } from '@playwright/test';
import { answer, continueToPath, exercisesFor, openWith, readState, savedState, sectionTestFor, today, yesterday } from './helpers.js';

test('a new visitor signs up through onboarding', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('link', { name: 'Get started' }).first().click();
  await page.getByRole('button', { name: /Let’s go/ }).click();
  await page.locator('[data-pick="motivation"]').first().click();
  await page.locator('[data-nav="next"]').click();
  await page.locator('[data-pick="dailyGoal"][data-value="20"]').click();
  await page.locator('[data-nav="next"]').click();
  await page.locator('[data-pick="level"]').first().click();
  await page.locator('[data-nav="next"]').click();
  await page.locator('#onb-name').fill('Amani');
  await page.locator('[data-nav="next"]').click();
  await page.locator('[data-nav="next"]').click();
  await expect(page).toHaveURL(/#\/learn/);
  await expect(page.locator('.node--current').first()).toBeVisible();
  const s = await readState(page);
  expect(s.profile).toMatchObject({ name: 'Amani', dailyGoal: 20 });
});

test('a full lesson, answered perfectly, earns XP, gems and a streak', async ({ page }) => {
  const seed = 42;
  await openWith(page, savedState(), `#/lesson/u1s1l1?seed=${seed}`);
  for (const ex of exercisesFor('u1s1l1', seed)) await answer(page, ex);
  await expect(page.getByRole('heading', { name: 'Perfect lesson!' })).toBeVisible();
  await continueToPath(page);
  const s = await readState(page);
  expect(s.lessons.u1s1l1.completions).toBe(1);
  expect(s.xp.total).toBe(15);
  expect(s.streak).toMatchObject({ current: 1, lastDay: today() });
  // 50 to start, +5 lesson, +5 perfect, plus any first achievement level.
  expect(s.gems).toBeGreaterThanOrEqual(60);
});

test('running out of hearts pauses the lesson', async ({ page }) => {
  const seed = 7;
  await openWith(page, savedState({ hearts: { count: 1, updatedAt: Date.now() }, gems: 0 }), `#/lesson/u1s1l1?seed=${seed}`);
  const exercises = exercisesFor('u1s1l1', seed);
  const first = exercises.findIndex((e) => e.type === 'choice');
  for (const ex of exercises.slice(0, first)) await answer(page, ex);
  await answer(page, exercises[first], { correct: false });
  await expect(page.getByRole('dialog')).toContainText(/hearts/i);
  expect((await readState(page)).hearts.count).toBe(0);
});

test('finishing a lesson the day after extends the streak', async ({ page }) => {
  const seed = 3;
  await openWith(page, savedState({ streak: { current: 3, longest: 3, lastDay: yesterday(), freezes: 0, frozenDays: [] }, lessons: { u1s1l1: { completions: 1, bestAccuracy: 1 } } }), `#/lesson/u1s1l2?seed=${seed}`);
  for (const ex of exercisesFor('u1s1l2', seed)) await answer(page, ex);
  await page.locator('[data-continue]').click();
  await expect(page.getByRole('heading', { name: '4 day streak!' })).toBeVisible();
  expect((await readState(page)).streak.current).toBe(4);
});

test('a review session in the practice hub earns a heart back', async ({ page }) => {
  test.setTimeout(90_000);
  const done = Object.fromEntries(['u1s1l1', 'u1s1l2'].map((id) => [id, { completions: 1, bestAccuracy: 1 }]));
  await openWith(page, savedState({ lessons: done, hearts: { count: 3, updatedAt: Date.now() } }), '#/practice');
  await page.getByRole('link', { name: /Review/ }).click();
  await expect(page).toHaveURL(/practice\/session/);
  // Answer whatever is shown until the session ends; practice never costs hearts.
  for (let i = 0; i < 60 && !(await page.locator('.complete').count()); i += 1) {
    const textarea = page.locator('[data-stage] textarea:visible');
    if (await textarea.count()) await textarea.fill('hello');
    else if (await page.locator('[data-stage] .ex--match').count()) {
      // Both columns carry the word id, so pairs can be matched directly.
      const ids = await page.locator('[data-stage] [data-side="lg"]').evaluateAll((els) => els.map((e) => e.dataset.id));
      for (const id of ids) {
        await page.locator(`[data-stage] [data-side="lg"][data-id="${id}"]`).click();
        await page.locator(`[data-stage] [data-side="en"][data-id="${id}"]`).click();
      }
      await page.waitForTimeout(700);
      continue;
    } else await page.locator('[data-stage] [data-value], [data-stage] [data-tile]:not([disabled])').first().click();
    await page.locator('[data-main]').click();
    await page.locator('[data-main]').click();
  }
  await expect(page.getByRole('heading', { name: 'Practice complete!' })).toBeVisible();
  const s = await readState(page);
  expect(s.stats.practiceSessions).toBe(1);
  expect(s.hearts.count).toBe(4);
});

test('progress exports and imports', async ({ page }, testInfo) => {
  await openWith(page, savedState({ xp: { total: 321, byDay: {} }, gems: 77 }), '#/settings');
  const [download] = await Promise.all([page.waitForEvent('download'), page.locator('[data-action="export"]').click()]);
  const path = testInfo.outputPath('progress.json');
  await download.saveAs(path);

  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.goto('./#/settings');
  await page.locator('[data-import-file]').setInputFiles(path);
  await page.getByRole('dialog').getByRole('button', { name: 'Import', exact: true }).click();
  await expect(page).toHaveURL(/#\/learn/);
  const s = await readState(page);
  expect(s.xp.total).toBe(321);
  expect(s.gems).toBe(77);
  expect(s.profile.name).toBe('Amani');
});

test('passing a section test jumps ahead to Section 2', async ({ page }) => {
  const seed = 11;
  await openWith(page, savedState());
  await page.getByRole('link', { name: 'Jump to Section 2' }).click();
  await expect(page).toHaveURL(/#\/jump\/s2/);
  // Reload with a fixed seed so the questions are predictable.
  await page.goto(`./#/jump/s2?seed=${seed}`);
  for (const ex of sectionTestFor('s2', seed)) await answer(page, ex);
  await expect(page.getByRole('heading', { name: 'Welcome to Section 2!' })).toBeVisible();
  await continueToPath(page);
  const s = await readState(page);
  expect(s.jumps).toEqual(['s2']);
  await expect(page.locator('[data-lesson="u9s1l1"]')).toHaveClass(/node--current/);
  await expect(page.locator('[data-section="s1"] .pill')).toHaveText('Complete');
});
