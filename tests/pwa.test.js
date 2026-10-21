import { describe, expect, it, vi } from 'vitest';
import { installButton, installCard, installSection, installState, isIos, isStandalone, promptInstall, syncInstall } from '../src/app/pwa.js';

function offer(outcome = 'accepted') {
  const e = new Event('beforeinstallprompt');
  e.prompt = vi.fn();
  e.userChoice = Promise.resolve({ outcome });
  window.dispatchEvent(e);
  return e;
}

describe('install button', () => {
  it('knows iPhones and iPads, which install from the Share sheet', () => {
    expect(isIos({ userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)' })).toBe(true);
    expect(isIos({ userAgent: 'Mozilla/5.0 (Macintosh)', platform: 'MacIntel', maxTouchPoints: 5 })).toBe(true);
    expect(isIos({ userAgent: 'Mozilla/5.0 (Macintosh)', platform: 'MacIntel', maxTouchPoints: 0 })).toBe(false);
    expect(isIos({ userAgent: 'Mozilla/5.0 (Linux; Android 15)' })).toBe(false);
  });

  it('knows when it runs as the installed app', () => {
    expect(isStandalone({ matchMedia: () => ({ matches: true }), navigator: {} })).toBe(true);
    expect(isStandalone({ matchMedia: () => ({ matches: false }), navigator: { standalone: true } })).toBe(true);
    expect(isStandalone({ matchMedia: () => ({ matches: false }), navigator: {} })).toBe(false);
  });

  it('is offered before the browser prompt, then switches to the prompt without a reload', async () => {
    document.body.innerHTML = `${installButton()}<section data-install-section>${installSection()}</section>`;
    const btn = document.querySelector('[data-install]');
    expect(installState()).toBe('manual');
    expect(btn.hidden).toBe(false);
    // Settings explains the browser menu while there is no prompt.
    expect(document.querySelector('.install-steps')).not.toBeNull();

    const e = offer('dismissed');
    expect(installState()).toBe('prompt');
    expect(btn.hidden).toBe(false);
    expect(document.querySelector('[data-install="always"]')).not.toBeNull();

    expect(await promptInstall()).toBe(false);
    expect(e.prompt).toHaveBeenCalled();
    // A dismissed prompt can't be reused: back to the steps until Chrome offers again.
    expect(installState()).toBe('manual');
    expect(btn.hidden).toBe(false);
  });

  it('shows the Get the app card until "Not now"', () => {
    localStorage.clear();
    expect(installCard()).toContain('data-install-card');
    localStorage.setItem('learn-luganda-install-card', String(Date.now()));
    expect(installCard()).toBe('');
    localStorage.setItem('learn-luganda-install-card', String(Date.now() - 15 * 24 * 60 * 60 * 1000));
    expect(installCard()).toContain('data-install-card');
  });

  it('hides everywhere once installed', async () => {
    document.body.innerHTML = `${installButton()}${installCard()}<section data-install-section></section>`;
    offer('accepted');
    expect(await promptInstall()).toBe(true);
    syncInstall();
    expect(installState()).toBe('installed');
    expect(document.querySelector('[data-install]').hidden).toBe(true);
    expect(document.querySelector('[data-install-card]')).toBeNull();
    expect(installCard()).toBe('');
    expect(document.querySelector('[data-install-section]').textContent).toMatch(/installed/i);
  });
});
