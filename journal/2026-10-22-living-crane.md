# 2026-10-22: Living crane icon

Issue: #205 · Branch: `feat/205-living-crane`

## Context

The owner asked for the crane app icon to change with the time of day,
holidays, the weather if possible, and the learner's progress, so the app
feels alive. It's a web app, so everything runs in the browser.

## Done

- `src/app/brand-scene.js`: the scene around the crane.
  - **Time of day** from the device clock: dawn, day, dusk, night (6:15 /
    18:30 assumed; the real sunrise and sunset once weather is on).
  - **Holidays**, worked out offline: New Year (31 Dec and 1 Jan),
    Valentine's, Women's Day, Easter (Good Friday to Easter Monday,
    computed), Uganda Martyrs Day, Heroes Day, Independence Day (9 Oct),
    Christmas (24 to 26 Dec).
  - **Weather**, opt-in in Settings (off by default): asks the browser for
    a rough location once, rounds it to about 10 km, keeps it in its own
    localStorage key (not exported with progress), and asks Open-Meteo (no
    key, no account) at most once an hour. Offline or failed requests keep
    the last weather for up to three hours, then the crane shows none.
- `src/app/brand-mark.js`: the sky (sun, rising/setting sun with horizon
  stripes, crescent moon and stars) sits top-left above the beak; weather
  (cloud, rain, snow, storm, fog) goes over it; a holiday prop (tree,
  firework, heart, flower, egg, candle, star, Uganda flag) sits bottom-right
  beside the neck. The favicon tile takes the sky's colour. The celebrating
  and sleepy extras moved top-right to make room.
- Progress moods (idle, happy, sleepy, celebrating, #93) still come from
  `brand-mood.js` and combine with the scene. The logo's label names the
  mood, holiday and sky for screen readers, in all four interface languages.
- The landing page's header logo is live too. The logo re-checks every five
  minutes while the app is open.
- Privacy page: a Weather section (off by default, rounded location, Open-Meteo).
- Preview sheet: project files `illustrations/crane-living-icon.png`.

## Decisions

- The installed home-screen icon comes from the manifest and can't change
  at runtime in any browser, so it stays the plain crane. The header logo
  and the browser-tab icon change.
- Eid is left out because its date follows the moon and can't be worked
  out reliably offline; it can come later from a small date table.
- Luganda strings (Ssekukkulu, Amazuukira, Olunaku lw'Okwefuga...) go on
  the native-speaker review list.

## Next

- Optional: more regional holidays per course language (e.g. Jamhuri Day
  for Swahili learners in Kenya).
