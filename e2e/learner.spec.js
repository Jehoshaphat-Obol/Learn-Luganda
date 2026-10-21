import { expect, test } from '@playwright/test';
import { answer, continueToPath, exercisesFor, openWith, readState, savedState, sectionTestFor, today, yesterday } from './helpers.js';

test('a new visitor signs up through onboarding', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('link', { name: 'Get started' }).first().click();
  // The browser speaks English, the one language courses are taught from today.
  await page.getByRole('radio', { name: /I speak English/ }).click();
  await page.locator('[data-nav="next"]').click();
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

/** Answers whatever exercise is shown until `done` matches (practice and heart reviews). */
async function answerUntil(page, done) {
  for (let i = 0; i < 60 && !(await done.count()); i += 1) {
    const textarea = page.locator('[data-stage] textarea:visible');
    if (await textarea.count()) await textarea.fill('hello');
    else if (await page.locator('[data-stage] .ex--match:visible').count()) {
      // Both columns carry the word id, so pairs can be matched directly.
      const ids = await page.locator('[data-stage] [data-side="target"]:visible').evaluateAll((els) => els.map((e) => e.dataset.id));
      for (const id of ids) {
        await page.locator(`[data-stage] [data-side="target"][data-id="${id}"]:visible`).click();
        await page.locator(`[data-stage] [data-side="base"][data-id="${id}"]:visible`).click();
      }
      await page.waitForTimeout(700);
      continue;
    } else await page.locator('[data-stage] [data-value]:visible, [data-stage] [data-tile]:not([disabled]):visible').first().click();
    await page.locator('[data-main]:visible').click();
    await page.locator('[data-main]:visible').click();
  }
}

test('running out of hearts steps back to a review, then the lesson goes on', async ({ page }) => {
  test.setTimeout(90_000);
  const seed = 7;
  await openWith(page, savedState({ hearts: { count: 1, updatedAt: Date.now() }, gems: 0 }), `#/lesson/u1s1l1?seed=${seed}`);
  const exercises = exercisesFor('u1s1l1', seed);
  const first = exercises.findIndex((e) => e.type === 'choice');
  for (const ex of exercises.slice(0, first)) await answer(page, ex);
  await answer(page, exercises[first], { correct: false });
  expect((await readState(page)).hearts.count).toBe(0);
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText(/step back/i);
  await expect(dialog).not.toContainText(/gems/); // can't afford a refill, and doesn't need one
  await dialog.getByRole('button', { name: 'Review to refill hearts' }).click();
  await expect(page.locator('[data-heart-review]')).toBeVisible();
  await answerUntil(page, page.getByRole('heading', { name: 'Hearts refilled!' }));
  await expect(page.getByRole('heading', { name: 'Hearts refilled!' })).toBeVisible();
  expect((await readState(page)).hearts.count).toBe(5);
  await page.getByRole('button', { name: 'Continue lesson' }).click();
  await expect(page.locator('[data-heart-review]')).toHaveCount(0);
  await expect(page.locator('.lesson__hearts')).toContainText('5');
  await expect(page.locator('[data-stage] .lesson__exercise')).toBeVisible();
});

test('opening a lesson with no hearts offers a warm-up review, never a wait', async ({ page }) => {
  const done = Object.fromEntries(['u1s1l1', 'u1s1l2'].map((id) => [id, { completions: 1, bestAccuracy: 1 }]));
  await openWith(page, savedState({ lessons: done, hearts: { count: 0, updatedAt: Date.now() }, gems: 100 }), '#/lesson/u1s1l3');
  await expect(page.getByRole('heading', { name: 'Warm up first' })).toBeVisible();
  await expect(page.locator('#view')).not.toContainText(/arrives in/);
  await page.getByRole('button', { name: /Use 40 gems/ }).click();
  await expect(page.locator('.lesson__hearts')).toContainText('5');
  expect((await readState(page)).gems).toBe(60);
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
  await answerUntil(page, page.locator('.complete'));
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
