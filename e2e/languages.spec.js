import { expect, test } from '@playwright/test';
import { openWith, readState, savedState } from './helpers.js';

test.describe('in Kampala', () => {
  test.use({ timezoneId: 'Africa/Kampala', locale: 'en-UG' });

  test('the crane guesses English and asks whether you speak it or want to learn it', async ({ page }) => {
    await page.goto('./#/onboarding');
    await expect(page.locator('.onb-langs__hello.is-guess')).toHaveText('Hello');
    await expect(page.getByRole('radio', { name: /Teach me English/ })).toBeVisible();
    await page.getByRole('radio', { name: /I speak English/ }).click();
    await expect(page.getByRole('radio', { name: /Luganda, taught in English/ })).toHaveAttribute('aria-checked', 'true');
    await page.locator('[data-nav="next"]').click();
    await expect(page.getByRole('button', { name: /Let’s go/ })).toBeVisible();
    const s = await readState(page);
    expect(s.settings).toMatchObject({ course: 'en-lg', uiLang: null });
    expect(s.onboarding.answers).toMatchObject({ langAnswer: 'speak', speak: 'en', course: 'en-lg' });
  });

  test('learning English is taught in Luganda, and the whole app switches to Luganda', async ({ page }) => {
    await page.goto('./#/onboarding');
    await page.getByRole('radio', { name: /Teach me English/ }).click();
    await expect(page.getByRole('radio', { name: /In Luganda/ })).toHaveAttribute('aria-checked', 'true');
    await page.locator('[data-nav="next"]').click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'lg');
    await expect(page.getByRole('button', { name: 'Tugende' })).toBeVisible();
    await expect.poll(async () => (await readState(page)).settings.course).toBe('lg-en');
    const s = await readState(page);
    expect(s.settings.uiLang).toBe('lg');
    expect(s.onboarding.answers).toMatchObject({ langAnswer: 'learn', learn: 'en', course: 'lg-en' });
  });
});

test.describe('in Kampala, with a Luganda browser', () => {
  test.use({ timezoneId: 'Africa/Kampala', locale: 'lg-UG' });

  test('the crane greets in Luganda and the page is already in Luganda', async ({ page }) => {
    await page.goto('./#/onboarding');
    await expect(page.locator('html')).toHaveAttribute('lang', 'lg');
    await expect(page.locator('.onb-langs__hello.is-guess')).toHaveText('Oli otya');
  });
});

test.describe('in Nairobi', () => {
  test.use({ timezoneId: 'Africa/Nairobi', locale: 'en-KE' });

  test('an English speaker is offered Swahili first, and its first lesson opens', async ({ page }) => {
    await page.goto('./#/onboarding');
    await page.getByRole('radio', { name: /I speak English/ }).click();
    await expect(page.getByRole('radio', { name: /Swahili, taught in English/ })).toHaveAttribute('aria-checked', 'true');
    await expect(page.getByRole('radio', { name: /Luganda, taught in English/ })).toHaveAttribute('aria-checked', 'false');
    await page.locator('[data-nav="next"]').click();
    await expect.poll(async () => (await readState(page)).settings.course).toBe('en-sw');
    await expect(page.getByRole('heading', { name: /Habari\? .*your guide to Swahili/ })).toBeVisible();
  });

  test('the Swahili path and first lesson open', async ({ page }) => {
    await openWith(page, savedState({ settings: { course: 'en-sw' } }), '#/learn');
    await expect(page.getByText('Greetings').first()).toBeVisible();
    await page.goto('./#/lesson/u1s1l1?seed=1');
    await expect(page.getByRole('progressbar', { name: 'Lesson progress' })).toBeVisible();
    await expect(page.getByText(/Habari\?|Nzuri|Asante|Karibu|Sana/).first()).toBeVisible();
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
  await page.getByRole('group', { name: 'I speak' }).getByRole('radio', { name: 'English', exact: true }).click();
  await page.getByRole('group', { name: 'I want to learn' }).getByRole('radio', { name: 'Luganda', exact: true }).click();
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

  test('a Swahili speaker is offered English, taught in Swahili', async ({ page }) => {
    await page.goto('./#/onboarding');
    await page.getByRole('radio', { name: /Ninaongea Kiswahili/ }).click();
    await expect(page.getByRole('radio', { name: /Kiingereza, kwa kutumia Kiswahili/ })).toHaveAttribute('aria-checked', 'true');
  });

  test('the English path and first lesson open in Swahili', async ({ page }) => {
    await openWith(page, savedState({ settings: { course: 'sw-en' } }), '#/learn');
    await expect(page.getByText('Salamu').first()).toBeVisible();
    await page.goto('./#/lesson/u1s1l1?seed=1');
    await expect(page.getByRole('progressbar').first()).toBeVisible();
    await expect(page.getByText(/How are you\?|Fine|Thank you|Welcome|very much/).first()).toBeVisible();
  });
});
