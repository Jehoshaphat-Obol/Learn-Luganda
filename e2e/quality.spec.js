import { createRequire } from 'node:module';
import { expect, test } from '@playwright/test';
import { course } from '../src/content/course.js';
import { openWith, savedState } from './helpers.js';

const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');

const everything = Object.fromEntries(course.order.map((id) => [id, { completions: 1, bestAccuracy: 1 }]));
const SCREENS = ['#/learn', '#/lesson/u1s1l1', '#/practice', '#/shop', '#/profile', '#/streak', '#/settings', '#/stories', '#/story/new-friend', '#/guidebook/u2', '#/guidebook/u9', '#/story/new-gomesi', '#/lesson/u10s3l3', '#/guidebook/u15', '#/guidebook/u19', '#/story/weekend-plans', '#/guidebook/u23', '#/story/cooking-luwombo', '#/guidebook/u25', '#/story/kasubi-visit'];

test('the landing page has no accessibility violations', async ({ page }) => {
  await page.goto('./');
  await page.addScriptTag({ path: axePath });
  const violations = await page.evaluate(async () => (await window.axe.run()).violations.map((v) => v.id));
  expect(violations).toEqual([]);
});

for (const hash of SCREENS) {
  test(`${hash} has no accessibility violations`, async ({ page }) => {
    await openWith(page, savedState({ lessons: everything }), hash);
    await page.waitForTimeout(300);
    await page.keyboard.press('Escape');
    await page.addScriptTag({ path: axePath });
    const violations = await page.evaluate(async () => (await window.axe.run()).violations.map((v) => `${v.id}: ${v.nodes[0]?.target}`));
    expect(violations).toEqual([]);
  });
}

test('lessons still work offline after the first visit', async ({ page, context }) => {
  await openWith(page, savedState(), '#/learn');
  await page.waitForFunction(() => navigator.serviceWorker?.controller, null, { timeout: 15_000 });
  await context.setOffline(true);
  await page.reload();
  await page.goto('./#/lesson/u1s1l1');
  await expect(page.locator('[data-stage] .ex, [data-stage] [data-ex]').first()).toBeVisible();
});

test('the app is installable: manifest and icons load', async ({ page, request }) => {
  await page.goto('./');
  const href = await page.locator('link[rel="manifest"]').getAttribute('href');
  const manifest = await (await request.get(href)).json();
  expect(manifest.display).toBe('standalone');
  for (const icon of manifest.icons) expect((await request.get(icon.src)).ok()).toBe(true);
});
