/*
 * The crane logo's surroundings, so the app feels alive: the sky follows the
 * device clock (dawn, day, dusk, night), the crane dresses up on holidays,
 * and, only if the learner turns it on, the sky shows their local weather.
 * Everything runs on the device. Weather comes from Open-Meteo (no key, no
 * account) for a rounded location that never leaves the browser otherwise.
 */
import { dayKey } from '../state/dates.js';

export const PHASES = ['dawn', 'day', 'dusk', 'night'];
export const WEATHERS = ['clear', 'cloudy', 'fog', 'rain', 'snow', 'storm'];

/** Hours as fractions of a day, e.g. 6.5 is 06:30. */
const hours = (date) => date.getHours() + date.getMinutes() / 60;

/**
 * The part of the day. With today's sunrise and sunset (from the weather)
 * dawn and dusk sit around them; otherwise a 6:00 to 18:00 day is assumed,
 * which is close to right in Uganda all year.
 * @returns {'dawn'|'day'|'dusk'|'night'}
 */
export function dayPhase(now = new Date(), sun = null) {
  const h = hours(now);
  const rise = sun?.sunrise ?? 6.25;
  const set = sun?.sunset ?? 18.5;
  if (h >= rise - 0.75 && h < rise + 1) return 'dawn';
  if (h >= rise + 1 && h < set - 0.75) return 'day';
  if (h >= set - 0.75 && h < set + 0.75) return 'dusk';
  return 'night';
}

/** Easter Sunday (Gregorian), as [month 1-12, day]. */
export function easter(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return [month, day];
}

// Dates the crane dresses up for: worldwide days and Uganda's public holidays
// (the app's home). Holidays that follow the moon (Eid) are left out until the
// app can work out their dates reliably offline.
const FIXED = {
  '01-01': 'newYear',
  '02-14': 'valentine',
  '03-08': 'womensDay',
  '06-03': 'martyrsDay',
  '06-09': 'heroesDay',
  '10-09': 'independence',
  '12-24': 'christmas',
  '12-25': 'christmas',
  '12-26': 'christmas',
  '12-31': 'newYear',
};

export const HOLIDAYS = [...new Set([...Object.values(FIXED), 'easter'])];

/** Today's holiday id, or null. */
export function holidayFor(now = new Date()) {
  const key = dayKey(now).slice(5);
  if (FIXED[key]) return FIXED[key];
  const [month, day] = easter(now.getFullYear());
  const sunday = new Date(now.getFullYear(), month - 1, day);
  // Good Friday to Easter Monday.
  const diff = Math.round((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - sunday) / 86400000);
  return diff >= -2 && diff <= 1 ? 'easter' : null;
}

/** WMO weather code (Open-Meteo) to one of WEATHERS. */
export function weatherKind(code) {
  if (code == null) return null;
  if (code >= 95) return 'storm';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if (code === 45 || code === 48) return 'fog';
  if (code === 2 || code === 3) return 'cloudy';
  return 'clear';
}

// The weather cache lives apart from progress, so it isn't exported or synced.
const KEY = 'll.weather';
const FRESH = 60 * 60 * 1000;

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? 'null');
  } catch {
    return null;
  }
}

function writeCache(value) {
  try {
    if (value) localStorage.setItem(KEY, JSON.stringify(value));
    else localStorage.removeItem(KEY);
  } catch {
    // Private mode or full storage: the crane simply shows no weather.
  }
}

/** The cached weather if it's from the last few hours, else null. */
export function cachedWeather(now = Date.now()) {
  const w = readCache();
  if (!w?.at || now - w.at > 3 * FRESH) return null;
  return w;
}

const round = (n) => Math.round(n * 10) / 10;
const clock = (iso) => {
  const m = /T(\d\d):(\d\d)/.exec(iso ?? '');
  return m ? Number(m[1]) + Number(m[2]) / 60 : null;
};

/** Asks for a coarse location. Resolves to {lat, lon} or null. */
export function askLocation(geo = globalThis.navigator?.geolocation) {
  if (!geo) return Promise.resolve(null);
  return new Promise((resolve) => {
    geo.getCurrentPosition(
      (p) => resolve({ lat: round(p.coords.latitude), lon: round(p.coords.longitude) }),
      () => resolve(null),
      { enableHighAccuracy: false, maximumAge: 6 * FRESH, timeout: 15000 },
    );
  });
}

/** Remembers the place (rounded) and forgets any old weather. */
export function setWeatherPlace(place) {
  writeCache(place ? { lat: place.lat, lon: place.lon, at: 0 } : null);
}

let pending = null;

/**
 * Fetches the weather if the cache is older than an hour. Resolves to true
 * when new weather arrived. Offline or failed requests keep the old cache.
 */
export function refreshWeather({ now = Date.now(), fetchImpl = globalThis.fetch } = {}) {
  const w = readCache();
  if (w?.lat == null || w?.lon == null || !fetchImpl) return Promise.resolve(false);
  if (now - (w.at ?? 0) < FRESH) return Promise.resolve(false);
  if (pending) return pending;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${w.lat}&longitude=${w.lon}&current=weather_code&daily=sunrise,sunset&forecast_days=1&timezone=auto`;
  pending = fetchImpl(url)
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      const code = data?.current?.weather_code;
      if (code == null) return false;
      writeCache({ lat: w.lat, lon: w.lon, at: now, code, sunrise: clock(data.daily?.sunrise?.[0]), sunset: clock(data.daily?.sunset?.[0]) });
      return true;
    })
    .catch(() => false)
    .finally(() => {
      pending = null;
    });
  return pending;
}

/**
 * Everything around the crane right now.
 * @returns {{ phase: string, holiday: string|null, weather: string|null }}
 */
export function brandScene(now = new Date(), { weather: wantWeather = false } = {}) {
  const w = wantWeather ? cachedWeather(now.getTime()) : null;
  const sun = w?.sunrise != null && w?.sunset != null ? w : null;
  return { phase: dayPhase(now, sun), holiday: holidayFor(now), weather: weatherKind(w?.code) };
}
