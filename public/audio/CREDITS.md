# Audio credits

Every audio file in the app is free to use, change and share. They are
bundled here (not streamed) so the app works offline.

## Sound effects: `sfx/playful/` and `sfx/soft/`

From **UI SFX** by Romain Simon, version 0.4.0, the `arcade` pack (here
"playful") and the `soft` pack. Files are copied unchanged.

- Source: https://github.com/romainsimon/uisfx (npm: https://www.npmjs.com/package/uisfx, previews: https://uisfx.com)
- License: CC0 1.0 Universal, public domain dedication (https://creativecommons.org/publicdomain/zero/1.0/)

| App effect | File | UI SFX cue |
| --- | --- | --- |
| correct | `success.mp3` | success |
| wrong | `error.mp3` | error |
| tap | `press.mp3` | press |
| select | `select.mp3` | select |
| start (lesson) | `start.mp3` | start |
| toggle | `toggle-on.mp3` | toggle-on |
| back | `back.mp3` | back |
| complete (lesson) | `complete.mp3` | complete |
| streak | `streak.mp3` | streak |
| unlock | `unlock.mp3` | unlock |
| reward (shop) | `reward.mp3` | reward |
| achievement | `achievement.mp3` | achievement |
| levelup (daily goal) | `level-up.mp3` | level-up |

## Music: `music/amadinda-loop.mp3`

An original loop written for Learn Luganda, in the style of Kiganda
amadinda xylophone music: two interlocking parts on a five note scale in
near-equal steps, a low drum and a thumb piano melody. It is rendered by
[`scripts/compose-music.py`](../../scripts/compose-music.py), so it can be
regenerated or changed.

- Source: this repository, https://github.com/Jehoshaphat-Obol/Learn-Luganda
- License: CC0 1.0 Universal, public domain dedication (https://creativecommons.org/publicdomain/zero/1.0/)

## Adding more

Only add audio with a license that allows free redistribution (CC0 is
best). Good places to look: [Kenney](https://kenney.nl/assets/category:Audio)
(CC0), [OpenGameArt](https://opengameart.org/art-search-advanced?field_art_type_tid%5B%5D=12&field_art_licenses_tid%5B%5D=4)
(filter by CC0), [Freesound](https://freesound.org/search/?f=license:%22Creative+Commons+0%22)
(filter by CC0) and [Pixabay](https://pixabay.com/music/). Add a row
here with the source URL and license for every new file, and keep files
small since the service worker caches them all.
