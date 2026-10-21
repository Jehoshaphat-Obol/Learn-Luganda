import { expect, test } from '@playwright/test';
import { openWith, readState, savedState } from './helpers.js';

// Test browsers ship no voices: give the page a Swahili one (the Luganda
// course's stand-in) and record what it's asked to say.
async function fakeVoices(page) {
  await page.addInitScript(() => {
    window.__said = [];
    const voices = [{ name: 'Rehema (Female)', lang: 'sw-KE', localService: true }];
    // The real one is a read-only property, so redefine it.
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
      getVoices: () => voices,
      speak: (u) => {
        window.__said.push({ text: u.text, pitch: u.pitch, rate: u.rate, lang: u.lang });
        setTimeout(() => u.onend?.(), 10);
      },
      cancel: () => {},
      addEventListener: () => {},
    } });
    window.SpeechSynthesisUtterance = class {
      constructor(text) {
        this.text = text;
      }
    };
  });
}

const said = (page) => page.evaluate(() => window.__said);

test('a new word is read aloud and can be replayed', async ({ page }) => {
  await fakeVoices(page);
  await openWith(page, savedState(), '#/lesson/u1s1l1?seed=1');
  const button = page.locator('.ex-intro__lg [data-speak]');
  await expect(button).toBeVisible();
  await expect.poll(async () => (await said(page)).length).toBe(1);
  await button.click();
  await expect.poll(async () => (await said(page)).length).toBe(2);
  expect((await said(page))[0].lang).toBe('sw-KE');
});

test('with no voice and no recording, no speaker buttons appear', async ({ page }) => {
  await openWith(page, savedState(), '#/lesson/u1s1l1?seed=1');
  await expect(page.locator('.ex-intro__lg')).toBeVisible();
  await expect(page.locator('[data-speak]')).toHaveCount(0);
});

test('spoken words can be turned off and slowed down in Settings', async ({ page }) => {
  await fakeVoices(page);
  await openWith(page, savedState(), '#/settings');
  await page.getByRole('switch', { name: /Slower speech/ }).check();
  await expect.poll(async () => (await said(page)).length).toBe(1);
  expect((await said(page))[0].rate).toBeLessThan(0.9);
  await page.getByRole('switch', { name: /Spoken words/ }).uncheck();
  await expect(page.getByRole('switch', { name: /Slower speech/ })).toBeHidden();
  const s = await readState(page);
  expect(s.settings).toMatchObject({ speech: false, speechSlow: true });
});
