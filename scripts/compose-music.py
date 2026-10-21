#!/usr/bin/env python3
"""
Renders the app's background music loop to public/audio/music/.

The piece is original and written for this project, so it is dedicated
to the public domain (CC0) along with this script. It borrows the shape
of Kiganda amadinda (log xylophone) music: two parts interlock note for
note, okunaga on the beats and okwawula between them, on a five note
scale tuned in near-equal steps the way Ganda xylophones are. A soft
low drum keeps the pulse and a thumb piano adds a slow melody on top.

Usage: python3 scripts/compose-music.py   (needs numpy and ffmpeg)
"""
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np

RATE = 44100
BPM = 92
PULSE = 60 / BPM / 2  # one interlocking note
BARS = 8
STEPS_PER_BAR = 12
STEPS = BARS * STEPS_PER_BAR
LENGTH = STEPS * PULSE
ROOT = 196.0  # around G3

rng = np.random.default_rng(71)


def pitch(degree):
    """Equipentatonic: five even steps of 240 cents per octave."""
    return ROOT * 2 ** (degree / 5)


def xylophone(freq, dur=0.9, gain=0.3):
    t = np.arange(int(dur * RATE)) / RATE
    tone = (
        np.sin(2 * np.pi * freq * t) * np.exp(-t * 6)
        + 0.35 * np.sin(2 * np.pi * freq * 3.93 * t) * np.exp(-t * 22)
        + 0.12 * np.sin(2 * np.pi * freq * 9.2 * t) * np.exp(-t * 45)
    )
    attack = np.minimum(1, t / 0.003)
    return gain * tone * attack


def thumb_piano(freq, dur=1.6, gain=0.22):
    t = np.arange(int(dur * RATE)) / RATE
    tone = (
        np.sin(2 * np.pi * freq * t) * np.exp(-t * 2.6)
        + 0.25 * np.sin(2 * np.pi * freq * 5.4 * t) * np.exp(-t * 14)
    )
    # The small rattle a lukeme's bottle caps give each note.
    buzz = rng.normal(0, 1, t.size) * np.exp(-t * 30) * 0.05
    return gain * (tone + buzz) * np.minimum(1, t / 0.004)


def drum(dur=0.5, gain=0.35):
    t = np.arange(int(dur * RATE)) / RATE
    sweep = 90 * np.exp(-t * 9) + 55
    phase = 2 * np.pi * np.cumsum(sweep) / RATE
    body = np.sin(phase) * np.exp(-t * 7)
    slap = rng.normal(0, 1, t.size) * np.exp(-t * 60) * 0.15
    return gain * (body + slap)


def place(track, sound, at):
    """Adds a sound at `at` seconds, wrapping its tail to the start so the loop is seamless."""
    start = int(at * RATE) % track.size
    end = start + sound.size
    if end <= track.size:
        track[start:end] += sound
    else:
        split = track.size - start
        track[start:] += sound[:split]
        track[: end - track.size] += sound[split:]


def compose():
    n = int(LENGTH * RATE)
    left = np.zeros(n)
    right = np.zeros(n)
    # Two six note cycles in each 12 pulse bar: okunaga on even pulses,
    # okwawula on odd ones, each a little to its own side.
    okunaga = [[0, 2, 4, 2, 1, 3], [0, 2, 4, 5, 3, 1]]
    okwawula = [[5, 3, 6, 4, 7, 5], [7, 5, 6, 4, 3, 2]]
    for bar in range(BARS):
        a = okunaga[(bar // 2) % 2]
        b = okwawula[(bar // 4) % 2]
        for i in range(STEPS_PER_BAR):
            step = bar * STEPS_PER_BAR + i
            at = step * PULSE + rng.normal(0, 0.004)
            if i % 2 == 0:
                note = xylophone(pitch(a[(i // 2) % 6]), gain=0.24 + rng.uniform(-0.03, 0.03))
                place(left, note * 0.9, at)
                place(right, note * 0.6, at)
            else:
                note = xylophone(pitch(b[(i // 2) % 6]), gain=0.2 + rng.uniform(-0.03, 0.03))
                place(left, note * 0.6, at)
                place(right, note * 0.9, at)
        # Low drum on the main beats, lighter in between.
        for beat, g in [(0, 0.34), (3, 0.16), (6, 0.26), (9, 0.16)]:
            d = drum(gain=g)
            place(left, d, (bar * STEPS_PER_BAR + beat) * PULSE)
            place(right, d, (bar * STEPS_PER_BAR + beat) * PULSE)
    # A slow thumb piano line an octave up, two notes a bar.
    melody = [10, 9, 7, 8, 10, 12, 11, 9, 10, 9, 7, 6, 7, 8, 7, 5]
    for k, deg in enumerate(melody):
        tone = thumb_piano(pitch(deg))
        at = k * 6 * PULSE + 0.01
        place(left, tone * 0.75, at)
        place(right, tone, at)
    mix = np.stack([left, right], axis=1)
    mix /= np.abs(mix).max() / 0.7
    return mix


def main():
    out = Path(__file__).resolve().parent.parent / 'public' / 'audio' / 'music'
    out.mkdir(parents=True, exist_ok=True)
    mix = compose()
    wav = out / 'amadinda-loop.wav'
    with wave.open(str(wav), 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(RATE)
        w.writeframes((mix * 32767).astype('<i2').tobytes())
    mp3 = out / 'amadinda-loop.mp3'
    subprocess.run(
        ['ffmpeg', '-y', '-loglevel', 'error', '-i', str(wav), '-codec:a', 'libmp3lame', '-b:a', '80k', str(mp3)],
        check=True,
    )
    wav.unlink()
    print(f'{mp3} ({mp3.stat().st_size // 1024} KB, {LENGTH:.1f}s)')


if __name__ == '__main__':
    sys.exit(main())
