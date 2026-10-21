# 2026-10-21: More animated illustrations, places and random art

Issue: #99 · Branch: `feat/99-animated-illustrations`

The owner asked for more assets and avatars, different places, fun motion,
and a site that feels less predictable.

## Done

- **Cast** (`characters.js`): five new people. Kato (Nakato's twin, school
  uniform), Maama Namuli (market seller, apron and beads), Musoke (fisherman,
  bucket hat), Jjajja Kizza (kanzu, jacket and kufi) and Dr Nansubuga
  (locks, stethoscope). New hair (afro, bun, locks, bald, kufi, bucket),
  outfits, backdrops (sun, wave, diamond) and two expressions (surprised,
  wink).
- **Animal avatars**: Ente the Ankole cow, Engo the leopard and the crane.
  They share the portrait card, so `portrait()` and `avatar()` take their
  ids; onboarding and settings list them via `avatarIds()`.
- **Data-driven characters** for course packs (#88): `CHARACTER_OPTIONS`,
  `validateCharacter(spec)` and `defineCharacter(id, spec)`. A pack's cast is
  plain JSON using these parts; no drawing code per language.
- **Places** (`places.js`): market, taxi park, lake, school, village and
  kitchen. `placeScene(id, { cast, pose, caption })` puts up to two cast
  members and the crane in front. Captions default to the Luganda word and
  can be overridden by a pack.
- **Props** (`props.js`): drum, matooke, pot, book, tea, basket, ball, radio,
  sun. `mascot({ prop })` stands one at the crane's feet.
- **Crane**: new poses `waving`, `dancing`, `sleeping`; wings flap when
  cheering; the head nods when idle or thinking.
- **Motion**: about twenty CSS loops (breathe, flap, sway, hop, steam,
  ripple, flag, peck…). Each animated element has no transform attribute of
  its own (a unit test enforces this) and gets a random negative delay so
  copies never move in lockstep. Off under `prefers-reduced-motion` and the
  app's own motion setting.
- **Randomness** (`random.js`, `moods.js`): the landing hero (pair, crane
  pose, greeting), cast order and faces, a new "Practise where Luganda
  lives" strip of three random places, lesson complete (pose, cheer, a
  friend, a prop, or a whole place party), daily goal and course-complete
  poses, empty states (pose and prop) and a prop per unit on the path.
  Tests swap in `seededRandom` via `setArtRandom`.
- Gallery (`illustrations.html`) shows every place, prop, pose and avatar.

All inline SVG: the shared illustrations chunk grew by about 5 kB gzipped and
nothing new needs caching.

## Native-speaker review

- [ ] Place words: *akatale* (market), *ppaaka* (taxi park), *ennyanja*
      (lake), *essomero* (school), *ekyalo* (village), *effumbiro* (kitchen).
- [ ] Hero greetings: *Gyebale ko!*, *Wasuze otya?*; cheers: *Kirungi nnyo!*,
      *Bulungi!*
- [ ] Animal names *Ente* (cow) and *Engo* (leopard).

## Next

- #88 can register each pack's cast with `defineCharacter` and pick places
  per unit (for example the market unit at the market).
