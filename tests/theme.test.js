import { describe, expect, it } from 'vitest';
import { THEME_COLORS, applyTheme, resolvedTheme, themePreference } from '../src/ui/theme.js';

describe('theme', () => {
  it('defaults to light, including for unknown values', () => {
    expect(themePreference({ settings: {} })).toBe('light');
    expect(themePreference({ settings: { theme: 'purple' } })).toBe('light');
    expect(themePreference({ settings: { theme: 'dark' } })).toBe('dark');
  });

  it('resolves System from the device', () => {
    expect(resolvedTheme('system', true)).toBe('dark');
    expect(resolvedTheme('system', false)).toBe('light');
    expect(resolvedTheme('dark', false)).toBe('dark');
    expect(resolvedTheme('light', true)).toBe('light');
  });

  it('sets data-theme and the browser colour', () => {
    document.head.innerHTML = '<meta name="theme-color" content="" /><meta name="color-scheme" content="light" />';
    applyTheme({ settings: { theme: 'dark' } });
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(document.querySelector('meta[name="theme-color"]').content).toBe(THEME_COLORS.dark);
    expect(document.querySelector('meta[name="color-scheme"]').content).toBe('dark');
    applyTheme({ settings: { theme: 'light' } });
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});
