import { describe, expect, it } from 'vitest';
import { brandLabel, brandMood } from '../src/app/brand-mood.js';
import { brandMark, faviconSvg, MOODS } from '../src/app/brand-mark.js';
import { HOLIDAYS, PHASES, WEATHERS, brandScene, dayPhase, easter, holidayFor, refreshWeather, setWeatherPlace, weatherKind } from '../src/app/brand-scene.js';

const NOW = new Date(2026, 9, 21, 12);
const learner = ({ streak = {}, xpToday = 0, goal = 20 } = {}) => ({
  profile: { name: 'A', dailyGoal: goal },
  streak: { current: 0, longest: 0, lastDay: null, freezes: 0, frozenDays: [], ...streak },
  xp: { total: xpToday, byDay: xpToday ? { '2026-10-21': xpToday } : {} },
});

describe('brand mood', () => {
  it('is idle before there is a profile or any streak', () => {
    expect(brandMood({}, NOW)).toBe('idle');
    expect(brandMood(learner(), NOW)).toBe('idle');
  });

  it('naps while a streak waits for today’s lesson', () => {
    expect(brandMood(learner({ streak: { current: 4, lastDay: '2026-10-20' } }), NOW)).toBe('sleepy');
  });

  it('is idle once the streak is safe but the goal is not met', () => {
    expect(brandMood(learner({ streak: { current: 4, lastDay: '2026-10-21' }, xpToday: 10 }), NOW)).toBe('idle');
  });

  it('is happy when today’s goal is met', () => {
    expect(brandMood(learner({ streak: { current: 4, lastDay: '2026-10-21' }, xpToday: 25 }), NOW)).toBe('happy');
  });

  it('celebrates on a streak milestone day', () => {
    expect(brandMood(learner({ streak: { current: 7, lastDay: '2026-10-21' }, xpToday: 10 }), NOW)).toBe('celebrating');
  });

  it('does not nap after a broken streak', () => {
    expect(brandMood(learner({ streak: { current: 4, lastDay: '2026-10-18' } }), NOW)).toBe('idle');
  });

  it('draws every mood', () => {
    const marks = MOODS.map((m) => brandMark(m));
    expect(new Set(marks).size).toBe(MOODS.length);
    expect(faviconSvg('happy')).toMatch(/^<svg xmlns/);
  });
});

describe('brand scene', () => {
  const at = (h, m = 0, date = [2026, 9, 21]) => new Date(...date, h, m);

  it('follows the clock through the day', () => {
    expect(dayPhase(at(5, 50))).toBe('dawn');
    expect(dayPhase(at(12))).toBe('day');
    expect(dayPhase(at(18, 20))).toBe('dusk');
    expect(dayPhase(at(22))).toBe('night');
    expect(dayPhase(at(3))).toBe('night');
  });

  it('uses the real sunrise and sunset when the weather knows them', () => {
    const sun = { sunrise: 7.5, sunset: 16.5 };
    expect(dayPhase(at(7), sun)).toBe('dawn');
    expect(dayPhase(at(16, 30), sun)).toBe('dusk');
    expect(dayPhase(at(18), sun)).toBe('night');
  });

  it('finds fixed holidays and Easter', () => {
    expect(easter(2026)).toEqual([4, 5]);
    expect(easter(2027)).toEqual([3, 28]);
    expect(holidayFor(at(9, 0, [2026, 9, 9]))).toBe('independence');
    expect(holidayFor(at(9, 0, [2026, 11, 25]))).toBe('christmas');
    expect(holidayFor(at(9, 0, [2026, 3, 3]))).toBe('easter');
    expect(holidayFor(at(9, 0, [2026, 3, 6]))).toBe('easter');
    expect(holidayFor(at(9, 0, [2026, 3, 7]))).toBeNull();
    expect(holidayFor(at(9))).toBeNull();
  });

  it('maps weather codes', () => {
    expect([0, 2, 45, 61, 73, 95].map(weatherKind)).toEqual(['clear', 'cloudy', 'fog', 'rain', 'snow', 'storm']);
    expect(weatherKind(undefined)).toBeNull();
  });

  it('shows weather only when turned on and fetched', async () => {
    localStorage.clear();
    const now = at(13);
    expect(brandScene(now, { weather: true }).weather).toBeNull();
    setWeatherPlace({ lat: 0.3, lon: 32.6 });
    const fetchImpl = async (url) => {
      expect(url).toContain('latitude=0.3&longitude=32.6');
      return { ok: true, json: async () => ({ current: { weather_code: 61 }, daily: { sunrise: ['2026-10-21T06:40'], sunset: ['2026-10-21T18:50'] } }) };
    };
    expect(await refreshWeather({ now: now.getTime(), fetchImpl })).toBe(true);
    expect(await refreshWeather({ now: now.getTime() + 1000, fetchImpl })).toBe(false);
    expect(brandScene(now, { weather: true }).weather).toBe('rain');
    expect(brandScene(now, { weather: false }).weather).toBeNull();
    expect(await refreshWeather({ now: now.getTime() + 2 * 3600e3, fetchImpl: async () => { throw new Error('offline'); } })).toBe(false);
    expect(brandScene(new Date(now.getTime() + 2 * 3600e3), { weather: true }).weather).toBe('rain');
    setWeatherPlace(null);
    expect(brandScene(now, { weather: true }).weather).toBeNull();
  });

  it('draws every scene and labels it', () => {
    for (const phase of PHASES) {
      for (const weather of WEATHERS) {
        expect(faviconSvg('idle', { phase, weather })).toMatch(/^<svg[^]*<\/svg>\n$/);
      }
    }
    for (const holiday of HOLIDAYS) {
      expect(brandMark('celebrating', { phase: 'day', holiday }).length).toBeGreaterThan(brandMark('celebrating').length - 120);
      expect(brandLabel('idle', { phase: 'night', holiday })).not.toMatch(/brandScene\./);
    }
    expect(brandMark('idle', {})).toBe(brandMark('idle'));
    expect(faviconSvg('idle', { phase: 'night' })).toContain('#c3c8d6');
    expect(brandLabel('happy', { phase: 'dusk', weather: 'rain' })).not.toMatch(/brandScene\./);
  });
});
