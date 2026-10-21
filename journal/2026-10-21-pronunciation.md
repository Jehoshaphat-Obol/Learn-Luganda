# 2026-10-21: Pronunciation audio with a voice for each character

Issue: #89 (epic #80) · Branch: `feat/89-pronunciation`

## Context

The owner asked for pronunciation audio that is free and needs no
external API or payment. They also asked for each character to have their
own voice, with pitch and rate adjusted through the browser's speech API.

## Done

- `src/audio/speech.js` decides what each line plays:
  - First, a recording the pack points to (`audio` on a word, sentence or
    line).
  - Otherwise, the browser's `speechSynthesis` with a device voice for the
    target language, or for a stand-in the pack allows
    (`settings.speech.fallbacks`; the Luganda course allows Swahili).
  - Otherwise, nothing: no speaker button is drawn.
- **A voice per character.** `cast.*.voice` in course.json sets pitch,
  rate, volume and name `hints`, matched on whole words so "male" doesn't
  match "Female". Hints pick between the device's voices, which can be
  female or male.
  - Nakato is bright, Mukasa low and unhurried, Jjajja slow, Ssali quick,
    Amara high and Emma gentle.
  - The narrator uses `settings.speech.voice`.
- Speaker buttons appear on new-word cards (each word is also read once as
  it appears), on target-language translate and type prompts, on dialogue
  lines in the speaker's voice, and on story lines. Each story line is read
  aloud as it appears, in that person's voice.
- Listening exercises play the recording or the device voice. A course
  can opt in to listening exercises built from the device voice for items
  with no recording (`lesson.listen.synthesized`, off by default, so lessons
  stay predictable). When spoken words are off, lessons build no listening
  exercises.
- Settings → Preferences gains "Spoken words" (on or off, with a hint when
  the device has no voice) and "Slower speech" (0.7×). Toggling either
  plays the course's first word as a sample. Speech stops on navigation.
- Schemas: `speech` in settings, `voice` on cast members, and
  `listen.synthesized`.
- Tests: unit tests cover voice choice, hints, profiles, slow speech, the
  off switch, buttons and listening opt-in. E2E tests use a fake Swahili
  voice, because test browsers ship none.

## Decisions

- Few devices have a Luganda voice. Swahili voices read Luganda spelling
  closely enough to help, so the pack allows them as a stand-in, and
  recordings stay the reliable path. Recording the core vocabulary is
  worth doing once a native speaker reviews the course.
- Listening exercises from device voices stay opt-in. If they were on,
  the same seed would build different lessons on different devices.

## Next

- #84 and #85: move the remaining UI strings into the UI pack.
