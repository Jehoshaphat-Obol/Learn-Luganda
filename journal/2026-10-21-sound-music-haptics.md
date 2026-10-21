# 2026-10-21: Sound effects, background music and haptics

Issue: #71 · Branch: `feat/71-sound-music-haptics`

## Context

The owner asked for free, open source sound effects and music to make the
app more fun, and haptics if the web allows it. Until now the app only had
a handful of chimes synthesised with Web Audio (from #23), and one sound
toggle.

## Done

- Recorded effects: 13 cues in two packs, `public/audio/sfx/playful/` and
  `public/audio/sfx/soft/`, copied unchanged from UI SFX 0.4.0 (arcade and
  soft packs, CC0). About 185 KB for both packs.
- `src/ui/sound.js`: `play(name)` now plays the decoded recording through
  Web Audio. Effects preload after the first tap; until then, or if a file
  can't be decoded, the old synth plays instead. New cues: tap (picking an
  option or tile in a lesson), start (lesson opens), reward (shop
  purchase), achievement, levelup (daily goal met).
- Haptics: the same `play(name)` buzzes a short pattern through
  `navigator.vibrate` (Android Chrome, Firefox Android). iOS Safari and
  desktop browsers have no Vibration API, so it does nothing there.
- Background music: `src/ui/music.js` loops `public/audio/music/
  amadinda-loop.mp3` (31 s, 306 KB) at low volume on the app layout
  screens (path, practice hub, shop, profile, stories list, settings). It
  fades out in lessons, stories and tests so recordings stay clear, waits
  for the first tap or key press, and pauses while the tab is hidden.
- The loop is original, rendered by `scripts/compose-music.py` (numpy and
  ffmpeg) and dedicated CC0. It follows Kiganda amadinda music: two
  interlocking parts (okunaga and okwawula) on an equipentatonic scale,
  with a low drum and a thumb piano line.
- Settings: Sound style (Playful or Soft), Background music, and
  Vibration toggles, plus an "Audio credits" link. A music note button in
  the top bar flips music on and off.
- `public/audio/CREDITS.md`: source URL and license for every file, and
  where to find more CC0 audio.
- Tests: `tests/audio.test.js` (packs, haptics gating, bundle size under
  700 KB) and `e2e/audio.spec.js` (music starts after a gesture and stops
  in lessons, the top bar toggle, effects load and play).

## Decisions

- CC0 only, so nothing needs attribution in the UI and the files can be
  redistributed with the app. Kenney, OpenGameArt, Freesound and Pixabay
  could not be reached from the build environment, so the effects come
  from UI SFX (published on npm and GitHub) and the music was composed for
  the project. CREDITS.md lists those sites for anyone adding more.
- MP3 for everything: it decodes in every browser, including Safari.
- Music plays through Web Audio with `loopEnd` set to the rendered length,
  which avoids the gap `<audio loop>` leaves at mp3 padding.
- Vibration follows its own toggle but stays off when the system asks for
  reduced motion, like animations do.
- Music is on by default but only after the learner interacts, and the
  top bar button keeps a one tap way to stop it (WCAG 1.4.2).

## Next

- Listen on a real phone and tune volumes if any cue is too loud.
- More music (for example a story theme) if the owner wants it.
