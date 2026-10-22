import { expect, test } from '@playwright/test';
import { openWith, readState, savedState } from './helpers.js';

test.describe('in Kampala', () => {
  test.use({ timezoneId: 'Africa/Kampala' });

  test('the crane guesses Luganda and picks the course on one tap', async ({ page }) => {
    await page.goto('./#/onboarding');
    await expect(page.locator('.onb-langs__hello.is-guess')).toHaveText('Oli otya');
    await expect(page.locator('[data-nav="next"]')).toBeDisabled();
    await page.getByRole('radio', { name: /Teach me Luganda/ }).click();
    await expect(page.getByRole('radio', { name: /In English/ })).toHaveAttribute('aria-checked', 'true');
    await page.locator('[data-nav="next"]').click();
    await expect(page.getByRole('button', { name: /Let’s go/ })).toBeVisible();
    const s = await readState(page);
    expect(s.settings).toMatchObject({ course: 'en-lg', uiLang: null });
    expect(s.onboarding.answers).toMatchObject({ langAnswer: 'learn', learn: 'lg', course: 'en-lg' });
  });
});

test.describe('in Dubai', () => {
  test.use({ timezoneId: 'Asia/Dubai', locale: 'en-AE' });

  test('with no Arabic course yet, the crane asks about English instead', async ({ page }) => {
    await page.goto('./#/onboarding');
    await expect(page.locator('.onb-langs__hello.is-guess')).toHaveText('Hello');
    await page.getByRole('radio', { name: /I speak English/ }).click();
    await expect(page.getByRole('radio', { name: /Luganda, taught in English/ })).toHaveAttribute('aria-checked', 'true');
    await page.locator('[data-nav="next"]').click();
    await expect(page.getByRole('button', { name: /Let’s go/ })).toBeVisible();
  });
});

test('“something else” opens the full picker', async ({ page }) => {
  await page.goto('./#/onboarding');
  await page.getByRole('button', { name: 'Something else' }).click();
  await expect(page.getByRole('group', { name: 'I speak' })).toBeVisible();
  await page.getByRole('radio', { name: 'Luganda', exact: true }).click();
  await page.locator('[data-nav="next"]').click();
  expect((await readState(page)).settings.course).toBe('en-lg');
});

test('Settings shows the languages and the course', async ({ page }) => {
  await openWith(page, savedState(), '#/settings');
  await expect(page.getByRole('heading', { name: 'Languages' })).toBeVisible();
  await expect(page.locator('[data-ui-lang]')).toHaveValue('auto');
  await expect(page.locator('[data-course]')).toHaveValue('en-lg');
  await page.locator('[data-ui-lang]').selectOption('en');
  await expect.poll(async () => (await readState(page)).settings.uiLang).toBe('en');
  await expect(page.locator('[data-ui-lang]')).toHaveValue('en');
});

test('switching the interface to Luganda translates the whole app', async ({ page }) => {
  await openWith(page, savedState(), '#/settings');
  await page.locator('[data-ui-lang]').selectOption('lg');
  await expect(page.getByRole('heading', { name: 'Ennimi' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'lg');
  await page.goto('./#/learn');
  await expect(page.getByRole('link', { name: 'Yiga' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Learn', exact: true })).toHaveCount(0);
});

test('old saved progress follows the course pack, and ids it lacks are archived', async ({ page }) => {
  const lessonId = 'u1s1l1';
  const stray = { box: 2, due: '2026-01-01', seen: 1, correct: 1, wrong: 0, lastSeen: null };
  await openWith(page, savedState({ lessons: { [lessonId]: { completions: 1, bestAccuracy: 1 } }, words: { 'no-such-word': stray } }));
  await expect(page.locator('.node--current').first()).toBeVisible();
  const s = await readState(page);
  expect(s.version).toBe(4);
  expect(s.courseVersion).toBe(1);
  expect(s.lessons[lessonId].completions).toBe(1);
  expect(s.words['no-such-word']).toBeUndefined();
  expect(s.archive.words['no-such-word']).toEqual(stray);
});

test.describe('with a Swahili browser', () => {
  test.use({ locale: 'sw-KE' });

  test('the interface is in Swahili, and English is one tap away', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('html')).toHaveAttribute('lang', 'sw');
    await expect(page.getByRole('link', { name: 'Anza sasa' }).first()).toBeVisible();
    await openWith(page, savedState(), '#/settings');
    await expect(page.getByRole('heading', { name: 'Lugha', exact: true })).toBeVisible();
    await page.locator('[data-ui-lang]').selectOption('en');
    await expect(page.getByRole('heading', { name: 'Languages' })).toBeVisible();
  });
});
