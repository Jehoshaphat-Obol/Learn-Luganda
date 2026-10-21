import { describe, expect, it } from 'vitest';
import { addDays, dayKey, daysBetween, weekKey } from '../src/state/dates.js';

describe('dates', () => {
  it('formats local day keys', () => {
    expect(dayKey(new Date(2026, 0, 5, 23, 59))).toBe('2026-01-05');
  });

  it('counts days across month and DST boundaries', () => {
    expect(daysBetween('2026-01-31', '2026-02-01')).toBe(1);
    expect(daysBetween('2026-03-28', '2026-04-02')).toBe(5);
    expect(daysBetween('2026-01-02', '2026-01-01')).toBe(-1);
  });

  it('adds days', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
  });

  it('finds the Monday of the week', () => {
    expect(weekKey(new Date(2026, 9, 21))).toBe('2026-10-19');
    expect(weekKey(new Date(2026, 9, 25))).toBe('2026-10-19');
    expect(weekKey(new Date(2026, 9, 19))).toBe('2026-10-19');
  });
});
