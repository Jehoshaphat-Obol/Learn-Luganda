/* Sound effects, background music and the music toggle, in a real browser. */
import { test, expect } from '@playwright/test';
import { openWith, readState, savedState } from './helpers.js';

// Counts looping (music) and one-shot (effect) sources that start and stop.
async function trackAudio(page) {
  await page.addInitScript(() => {
    window.__audio = { loops: 0, stops: 0, effects: 0 };
    const { start, stop } = AudioBufferSourceNode.prototype;
    AudioBufferSourceNode.prototype.start = function (...args) {
      if (this.loop) window.__audio.loops++;
      else window.__audio.effects++;
      return start.apply(this, args);
    };
    AudioBufferSourceNode.prototype.stop = function (...args) {
      if (this.loop) window.__audio.stops++;
      return stop.apply(this, args);
    };
  });
}
const audio = (page) => page.evaluate(() => window.__audio);

test('music starts after the first tap on home screens and stops in lessons', async ({ page }) => {
  await trackAudio(page);
  await openWith(page, savedState());
  await page.waitForTimeout(500);
  expect((await audio(page)).loops).toBe(0);
  await page.keyboard.press('Shift');
  await expect.poll(async () => (await audio(page)).loops).toBe(1);

  await page.goto('./#/lesson/u1s1l1?seed=1');
  await expect.poll(async () => (await audio(page)).stops).toBe(1);
});

test('the top bar button turns music off and remembers it', async ({ page }) => {
  await trackAudio(page);
  await openWith(page, savedState());
  const button = page.getByRole('button', { name: 'Background music' });
  await expect(button).toHaveAttribute('aria-pressed', 'true');
  await button.click();
  await expect(button).toHaveAttribute('aria-pressed', 'false');
  expect((await readState(page)).settings.music).toBe(false);
  await page.waitForTimeout(500);
  const { loops, stops } = await audio(page);
  expect(loops).toBe(stops);
});

test('recorded effects load and play in lessons', async ({ page }) => {
  await trackAudio(page);
  const loaded = [];
  page.on('response', (r) => {
    if (r.url().includes('/audio/sfx/')) loaded.push(r.status());
  });
  await openWith(page, savedState({ settings: { music: false } }), '#/lesson/u1s1l1?seed=1');
  const next = page.getByRole('button', { name: 'Continue' });
  await next.click();
  await expect.poll(() => loaded.length).toBe(13);
  expect(loaded.every((s) => s === 200)).toBe(true);
  // Once decoded, picking an option plays a recording rather than the synth.
  await page.waitForTimeout(300);
  const option = page.locator('[data-stage] button:not([data-play])').first();
  while (!(await option.isVisible())) await next.click();
  await option.click();
  await expect.poll(async () => (await audio(page)).effects).toBeGreaterThan(0);
});
