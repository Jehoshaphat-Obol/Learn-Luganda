import { createRequire } from 'node:module';
import { expect, test } from '@playwright/test';
import { course, openWith, savedState } from './helpers.js';

const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');

const everything = Object.fromEntries(course.order.map((id) => [id, { completions: 1, bestAccuracy: 1 }]));
const SCREENS = ['#/learn', '#/lesson/u1s1l1', '#/practice', '#/shop', '#/profile', '#/streak', '#/settings', '#/privacy', '#/about', '#/contact', '#/terms', '#/stories', '#/story/new-friend', '#/guidebook/u2', '#/guidebook/u9', '#/story/new-gomesi', '#/lesson/u10s3l3', '#/guidebook/u15', '#/guidebook/u19', '#/story/weekend-plans', '#/guidebook/u23', '#/story/cooking-luwombo', '#/guidebook/u25', '#/story/kasubi-visit'];
// Content screens added with each new batch of units.
const CONTENT_SCREENS = ['#/guidebook/u29', '#/story/source-of-nile', '#/guidebook/u33', '#/story/jjajjas-advice', '#/guidebook/u39', '#/story/kintu-and-nnambi'];

test('the landing page has no accessibility violations', async ({ page }) => {
  await page.goto('./');
  await page.addScriptTag({ path: axePath });
  const violations = await page.evaluate(async () => (await window.axe.run()).violations.map((v) => v.id));
  expect(violations).toEqual([]);
});

for (const hash of [...SCREENS, ...CONTENT_SCREENS]) {
  test(`${hash} has no accessibility violations`, async ({ page }) => {
    await openWith(page, savedState({ lessons: everything }), hash);
    await page.waitForTimeout(300);
    await page.keyboard.press('Escape');
    await page.addScriptTag({ path: axePath });
    const violations = await page.evaluate(async () => (await window.axe.run()).violations.map((v) => `${v.id}: ${v.nodes[0]?.target}`));
    expect(violations).toEqual([]);
  });
}

test('finishing the course shows the celebration, without accessibility violations', async ({ page }) => {
  const last = course.units[course.units.length - 1].id;
  await openWith(page, savedState({ lessons: { ...everything, [`checkpoint-${last}`]: { completions: 1, bestAccuracy: 1 } } }), '#/learn');
  await page.getByRole('link', { name: /You finished the course/ }).click();
  await expect(page.getByRole('heading', { name: 'Course complete!' })).toBeVisible();
  await page.addScriptTag({ path: axePath });
  const violations = await page.evaluate(async () => (await window.axe.run()).violations.map((v) => `${v.id}: ${v.nodes[0]?.target}`));
  expect(violations).toEqual([]);
});

test('the celebration waits until the course is finished', async ({ page }) => {
  await openWith(page, savedState({ lessons: everything }), '#/complete');
  await expect(page).toHaveURL(/#\/learn/);
});

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

test('no ads, pixel or consent card while AdSense and the Meta Pixel are not configured', async ({ page }) => {
  const meta = [];
  page.on('request', (r) => r.url().includes('facebook') && meta.push(r.url()));
  await openWith(page, savedState(), '#/learn');
  await expect(page.locator('.course-section').first()).toBeVisible();
  await expect(page.locator('[data-ad], .consent')).toHaveCount(0);
  await page.goto('./#/stories');
  await expect(page.locator('[data-ad], .consent')).toHaveCount(0);
  expect(meta).toEqual([]);
  expect(await page.evaluate(() => typeof window.fbq)).toBe('undefined');
});

for (const width of [360, 412]) {
  test(`a long profile name never runs under the Edit button at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    const state = savedState();
    state.profile.name = 'JehoshaphatObolensky12345678';
    await openWith(page, state, '#/profile');
    const name = page.locator('.profile-head h1');
    const edit = page.getByRole('link', { name: 'Edit profile' });
    await expect(edit).toBeVisible();
    const [a, b] = [await name.boundingBox(), await edit.boundingBox()];
    const overlaps = a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
    expect(overlaps).toBe(false);
    expect(a.x + a.width).toBeLessThanOrEqual(width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}
