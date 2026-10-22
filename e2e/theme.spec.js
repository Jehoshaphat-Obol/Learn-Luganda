import { createRequire } from 'node:module';
import { expect, test } from '@playwright/test';
import { course, openWith, readState, savedState } from './helpers.js';

const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');
const everything = Object.fromEntries(course.order.map((id) => [id, { completions: 1, bestAccuracy: 1 }]));
const dark = (extra = {}) => savedState({ lessons: everything, settings: { theme: 'dark' }, ...extra });

test('light is the default, even on a dark-mode device', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('./');
  await expect(page.locator('main h1')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('a saved dark theme is applied before the app code runs', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('learn-luganda', JSON.stringify({ version: 4, settings: { theme: 'dark' } }));
    // Record the theme as soon as the body exists, before any module script.
    new MutationObserver((_, obs) => {
      if (document.body) {
        window.__firstTheme = document.documentElement.dataset.theme;
        obs.disconnect();
      }
    }).observe(document, { childList: true, subtree: true });
  });
  await page.goto('./');
  expect(await page.evaluate(() => window.__firstTheme)).toBe('dark');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#181614');
});

test('System follows the device', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await openWith(page, savedState({ settings: { theme: 'system' } }), '#/learn');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('the Appearance setting switches the theme and saves it', async ({ page }) => {
  await openWith(page, savedState(), '#/settings');
  const select = page.locator('[data-theme-pick]');
  await expect(select).toHaveValue('light');
  await select.selectOption('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect((await readState(page)).settings.theme).toBe('dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('[data-theme-pick]')).toHaveValue('dark');
});

test('the dark landing page has no accessibility violations', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('learn-luganda', JSON.stringify({ version: 4, settings: { theme: 'dark' } })));
  await page.goto('./');
  await expect(page.locator('main h1')).toBeVisible();
  await page.addScriptTag({ path: axePath });
  const violations = await page.evaluate(async () => (await window.axe.run()).violations.map((v) => `${v.id}: ${v.nodes[0]?.target}`));
  expect(violations).toEqual([]);
});

for (const hash of ['#/learn', '#/lesson/u1s1l1', '#/practice', '#/shop', '#/profile', '#/streak', '#/settings', '#/stories', '#/story/new-friend', '#/guidebook/u2']) {
  test(`dark ${hash} has no accessibility violations`, async ({ page }) => {
    await openWith(page, dark(), hash);
    await expect(page.locator('main h1, main h2').first()).toBeVisible();
    await page.waitForTimeout(300);
    await page.keyboard.press('Escape');
    await page.addScriptTag({ path: axePath });
    const violations = await page.evaluate(async () => (await window.axe.run()).violations.map((v) => `${v.id}: ${v.nodes[0]?.target}`));
    expect(violations).toEqual([]);
  });
}
