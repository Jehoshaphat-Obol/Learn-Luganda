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
    await expect(page.getByText(/Habari|Nzuri|Asante|Karibu|Sana/).first()).toBeVisible();
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

test('search narrows the full picker, and flags stay small', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('./#/onboarding');
  await page.getByRole('button', { name: 'Something else' }).click();
  const speak = page.getByRole('group', { name: 'I speak' });
  const learn = page.getByRole('group', { name: 'I want to learn' });
  await expect(learn.getByRole('radio')).toHaveCount(5);

  const flag = learn.getByRole('radio', { name: 'Swahili', exact: true }).locator('img.flag');
  const box = await flag.boundingBox();
  expect(box.height).toBeLessThanOrEqual(20);
  expect(box.width).toBeLessThanOrEqual(26);

  const search = page.getByRole('searchbox', { name: 'Search languages' });
  await search.fill('kiswa');
  await expect(learn.getByRole('radio')).toHaveCount(1);
  await expect(learn.getByRole('radio', { name: 'Swahili', exact: true })).toBeVisible();
  await expect(speak.getByRole('radio')).toHaveCount(1);

  await expect(page.locator('[data-legend="speak"]')).toHaveText('Ninaongea · I speak');
  await expect(page.locator('[data-legend="learn"] [lang="sw"]')).toHaveText('Nataka kujifunza');

  await search.fill('klingon');
  await expect(page.locator('[data-legend="speak"]')).toHaveText('I speak');
  await expect(learn.getByText('No language matches your search.')).toBeVisible();
  await expect(speak.getByText('No language matches your search.')).toBeVisible();

  await search.fill('swa');
  await learn.getByRole('radio', { name: 'Swahili', exact: true }).click();
  await expect(page.getByRole('searchbox', { name: 'Search languages' })).toHaveValue('swa');
  await page.locator('[data-nav="next"]').click();
  expect((await readState(page)).onboarding.answers.course).toBe('en-sw');
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
  expect(s.courseVersion).toBe(2);
  expect(s.lessons[lessonId].completions).toBe(1);
  expect(s.words['no-such-word']).toBeUndefined();
  expect(s.archive.words['no-such-word']).toEqual(stray);
});

test.describe('with a Swahili browser', () => {
  test.use({ locale: 'sw-KE' });

  test('the landing page is in Swahili', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('html')).toHaveAttribute('lang', 'sw');
    await expect(page.getByRole('link', { name: 'Anza sasa' }).first()).toBeVisible();
  });

  test('a course taught in English shows the app in English, and Swahili is one tap away', async ({ page }) => {
    await openWith(page, savedState({ settings: { course: 'en-sw' } }), '#/learn');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByText('Unit 1', { exact: true })).toBeVisible();
    await page.goto('./#/settings');
    await expect(page.locator('[data-ui-lang] option[value="auto"]')).toHaveText('Automatic (English)');
    await page.locator('[data-ui-lang]').selectOption('sw');
    await expect(page.getByRole('heading', { name: 'Lugha', exact: true })).toBeVisible();
    expect((await readState(page)).settings.uiLang).toBe('sw');
  });

  test('the path headings follow the interface language', async ({ page }) => {
    await openWith(page, savedState({ settings: { course: 'en-lg', uiLang: 'sw' } }), '#/learn');
    await expect(page.getByRole('heading', { name: 'Misingi' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Salamu', exact: true })).toBeVisible();
    await page.goto('./#/settings');
    await page.locator('[data-ui-lang]').selectOption('lg');
    await expect(page.locator('html')).toHaveAttribute('lang', 'lg');
    await page.goto('./#/learn');
    await expect(page.getByRole('heading', { name: 'Omusingi' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Okulamusa', exact: true })).toBeVisible();
  });

  test('on Automatic, switching to a course taught in Luganda switches the app too', async ({ page }) => {
    await openWith(page, savedState({ settings: { course: 'en-lg' } }), '#/settings');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.locator('[data-course]').selectOption('lg-en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'lg');
  });

  test('a Swahili speaker is offered English and Luganda, taught in Swahili', async ({ page }) => {
    await page.goto('./#/onboarding');
    await page.getByRole('radio', { name: /Ninaongea Kiswahili/ }).click();
    await expect(page.getByRole('radio', { name: /Kiingereza, kwa kutumia Kiswahili/ })).toBeVisible();
    await expect(page.getByRole('radio', { name: /Kiganda, kwa kutumia Kiswahili/ })).toBeVisible();
  });

  test('the English path and first lesson open in Swahili', async ({ page }) => {
    await openWith(page, savedState({ settings: { course: 'sw-en' } }), '#/learn');
    await expect(page.getByText('Salamu').first()).toBeVisible();
    await page.goto('./#/lesson/u1s1l1?seed=1');
    await expect(page.getByRole('progressbar').first()).toBeVisible();
    await expect(page.getByText(/How are you\?|Fine|Thank you|Welcome|very much/).first()).toBeVisible();
  });
  test('a Swahili speaker can pick Luganda, taught in Swahili', async ({ page }) => {
    await page.goto('./#/onboarding');
    await page.getByRole('radio', { name: /Ninaongea Kiswahili/ }).click();
    const luganda = page.getByRole('radio', { name: /Kiganda, kwa kutumia Kiswahili/ });
    await luganda.click();
    await expect(luganda).toHaveAttribute('aria-checked', 'true');
  });

  test('the Luganda path and first lesson open in Swahili', async ({ page }) => {
    await openWith(page, savedState({ settings: { course: 'sw-lg' } }), '#/learn');
    await expect(page.locator('html')).toHaveAttribute('lang', 'sw');
    await expect(page.getByRole('heading', { name: 'Salamu', exact: true })).toBeVisible();
    await page.goto('./#/lesson/u1s1l1?seed=1');
    await expect(page.getByRole('progressbar').first()).toBeVisible();
    await expect(page.getByText(/Habari yako|Nzuri|Asante|bwana|mama|Oli otya|Gyendi|Weebale/).first()).toBeVisible();
  });
});

test.describe('with a French browser', () => {
  test.use({ locale: 'fr-CD' });

  test('the landing page is in French', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.getByRole('link', { name: 'Commencer' }).first()).toBeVisible();
  });

  test('French can be picked for the app, and the path headings follow', async ({ page }) => {
    await openWith(page, savedState({ settings: { course: 'en-lg' } }), '#/settings');
    await page.locator('[data-ui-lang]').selectOption('fr');
    await expect(page.getByRole('heading', { name: 'Langues', exact: true })).toBeVisible();
    await page.goto('./#/learn');
    await expect(page.getByText('Les bases').first()).toBeVisible();
  });
});
