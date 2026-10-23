# 2026-10-22: Runyankore (#128)

Runyankore (`nyn`) is the first language built the new way: one `lang/nyn` pack
in the shared catalog (#184) instead of a hand-built pair course. It is
`status: "draft"` until a native speaker reviews it.

## Done

- `src/packs/lang/nyn/course.json`: course title, languageNames (objects with
  `.mu` forms), Runyankore headings for every section, unit, skill and cast role,
  an Ankole cast (Kemigisha, Mugisha, Nyakuru Kyarisiima, Tumusiime, Ninsiima)
  and places (Mbarara, Bushenyi, Ntungamo, Kabale, Bushara, Ibanda).
  Speech falls back to Swahili voices.
- `languageNames.nyn` in the en, lg, sw and fr packs.
- Units u1–u40, translated from English with Luganda alongside, using
  `scripts/lang-flat.js`. Swahili-culture stories (`sw-*`) are left out.
- Every pairing composes (en, lg, sw, fr ↔ nyn), 40 units and 462 lessons, 0 errors.
  Coverage: nyn is 100% as target and as base.

Duplicate main answers are avoided so no word gets dropped. For example, u6
matatu is "kamunye" (u16 taxi is "takisi"), and u2 the language is "Luganda"
(u25 clan is "oruganda").

## Next

- `lang/en/about/nyn/` notes (course.json and u1–u40, the shape of
  `lang/en/about/fr`). Until they exist, courses that teach Runyankore are hidden.
  Runyankore-base courses (nyn-lg, nyn-sw, nyn-fr) already list.
- PR closing #128, then #129 Lusoga.

## For the reviewer

Each draft in the project handoff folder ends with a `# check:` line. These
are the words I'm least sure of:

- u1: karibu (welcome) Tukwakiire, jambo/shikamoo as Ndakuramukya, mambo/poa, gyebale-ko as Webale kukora, oha (who), Noorugahi / Ninduga
- u2: kaka/dada sibling terms (mwene waitu, munyaanyazi), nyinenkuru vs nyakuru, kiyonjo (clean), ekibiina (classroom), caai spelling
- u3: enva (sauce), enyoota (thirst), nikinuura (tasty), kamurari naashaarira (chilli is hot), eminekye (sweet bananas)
- u4: kyorobi (cheap), Kyendeezeho (lower the price), omuhendo (price), ekiruhuuko (holiday), noun agreement after numbers above ten
- u5: erizooba (today) vs eizooba (day), omu ihangwe (afternoon), weekday names, Itumba (long rains)
- u6: aha bulyo / aha bumoso (right/left), omu maisho (straight ahead), omutaahi (neighbour), ebicooli (maize), niyihuta (is quick)
- u7: ekiikoni (kitchen), Hodi, Ikara (sit), Hemba etaara (switch on the lamp), mmuhingire / ninkuteekyera (applicatives)
- u8: -shaasha (to hurt), Ndwaire, senyiga (flu), Okire bwangu (get well soon), Nimpurira obusaasi (I am in pain)
- u9: colour words (kijubwa green, kyenju yellow, kakobe purple), kirofa / oburofa (dirty), muhorofu (thin), mucureezi (gentle), kyanguhire (light)
- u10: omushanana for gomesi (Ankole dress), Juura (take off), Ninyoga (I bathe), Nikimpika (it fits me), endorerwamu (mirror), class agreement of 'this' (egi/ogu)
- u11: Ninsisimuka / Ninyimuka (wake / get up), Nimbyama (I sleep), Kombera (sweep), ebisahani (dishes), Tubuganire (let's meet)
- u12: season names (itumba long rains, omuhanga short rains, ekyanda dry season), buhoreire (cool), okuhinda (thunder), amburera (umbrella)
- u13: entuuha (crested crane), entuuro (zebra), enyamahanga (crocodile), empunu (pig), ebisoro
- u14: omuteeki (cook), omwombeki (builder), omujanjabi (nurse), Nintunga (I get)
- u15: Ninyetegyereza (I understand), Garukamu (repeat), negumire (is hard), ebyafaayo (history)
- u16: Nkyerereirwe (I'm late) and the apology after it, endegye (plane), Naahika (I have arrived)
- u17: negative forms throughout (Tinyenda, Tindikurya, Timmanyire, Tinkagyenda, Tindigyenda), tikakabaire (not yet), Cureera (calm down)
- u18: ekitukuru (basket), omuhyo (knife), nyenkya bwanyima (day after tomorrow), kukyari kare (early).
- u19: perfect vs remote past (Ndiire / Nkarya), Naaheza (I have finished), kuruga ira (already), Tinkariire (I haven't eaten yet), ebiro bibiri ebihwaire (day before yesterday)
- u20: future ninza/nituza/naaza vs Ndigyenda, kurambura (visit), Ninyesiga (I hope), Nakunda (I would like)
- u21: Nyine eshaari (I am sad), Natiina / Nyine obwoba (scared), Ihangane (sorry), Nsaasira (forgive me), Naakukumbura (I miss you), Otarira (don't cry)
- u22: Ninyesiimira (I enjoy), kuziha (to swim), yaasinga / Twasingwa (win / lose), omwanya (time)
- u23: -teerera esimu (to call), Ntumira (send me), Ninkurindiire (I'm waiting for you)
- u24: Ta (put), ebikoora (banana leaves for wrapping), Naiguta (I am full), Cumba (boil)
- u25: oruganda/enganda (clan) — Luganda the language is written "Luganda" to keep it apart; Buganda clan names kept as names
- u26: arame (long live), ekikaari (palace), naategyeka (rules); Buganda names kept
- u27: orutookye (banana garden), enfuka (hoe), embibo / kubiba (seeds / plant), amasharuro (harvest), omwani (coffee beans)
- u28: shwenkazi (paternal aunt), ekiconco (gift), obugyenyi (wedding), kuhimbisa (celebrate), Ninkwendeza (I wish you)
- u29: kuteera engoma (play the drum), omweshongozi (singer), emizina (dances), eiraka (voice), ekitaramo (concert), relative forms abarikuzina / orikuteera
- u30: Ruhanga (God), Noeri (Christmas), Buruguruba (East), month name Juuni
- u31: kwerima (to borrow), Ninsubuura (I trade), ebibiiko (savings), Ninyetenga (I need), causatives Nindiisa / Ninyweesa
- u32: omugyera (river), kutera emiti (plant trees), ebisaasiro (rubbish), Otanaga (don't throw), ebitwetoroire (environment), Tukonkomere (let's pick up)
- u33: comparison with kukira, enyawukano (difference), naashushana na (looks like)
- u34: conditional forms (ku nkaba … nkaaguzire / nkaagiire), Nkanaaba (if only), Ruhanga yaayenda (God willing)
- u35: story openers (Kare na kare, Hakaba hariho), Mbagambire? / Tugambire! for Paukwa/Pakawa, akakwaavu (hare), omwojo (boy), enku (firewood)
- u36: all proverbs are AI renderings of the Ganda/Swahili ones, not attested Runyankore proverbs; a native speaker should swap in real Kinyankore enfumu where they exist
- u37: Nimbona ngu (I think that), enteerane (meeting), okutoora / akaruru (election / vote), okusorooza (fundraising), Tuhwerane (help each other)
- u38: akabiihirizibwa (is injured), Mwakora (pole kwa kazi), yaibwa / yaibirwe (stolen / robbed)
- u39: okuteera evi (to kneel), ekitiinwa (respect), Hodi / Karibu (borrowed knock greeting), Ogaruke (come again), obugabe (hospitality)
- u40: Wakame (the hare in Runyakitara tales), orukwe (trick), akeebwa (forgot), omururu (greed), netwegyesa (teaches us); the story keeps the Ganda legend of Kintu

## 2026-10-23: guidebook notes and landing copy

- `lang/en/about/nyn/units/u1–u40`: guidebook intro, 1–3 tips, a culture
  note, skill→tip links and word notes about Runyankore, in English
  (noun classes, ni- present, ti- negatives, -ire / -ka- pasts, -za ku- and
  -ri- futures, -ir- / -is- / -w- extensions, kukira comparisons, the
  plural of respect). Luganda, Swahili and French speakers get these
  through the English fallback.
- `lang/{en,lg,sw,fr}/about/nyn/course.json`: description, landing copy
  and Emma's role about Runyankore in each interface language.
- `lang/nyn/about/{lg,sw,fr}/course.json`: landing copy in Runyankore for
  the Runyankore-base courses, so nyn-lg, nyn-sw and nyn-fr no longer show
  English copy (this fixed three landing-i18n failures on the branch).
- The catalog now composes 19 courses, adding en-nyn, lg-nyn, sw-nyn and
  fr-nyn. nyn-en still needs `lang/nyn/about/en` notes (a later issue).
- e2e: an English speaker now has four languages to learn.

All of it is a low-confidence draft for a native-speaker review. Doubts
beyond the word list above: the u36 proverbs and the u26 note on the
Omugabe and Bagyendanwa should be checked, and the clan names in u25
(Abahinda, Abashambo, Abagahe, Abasingo).

Drafting tools: project folder `handoff/nyn-notes/` (`ref.mjs N` prints a
unit's words in en and nyn; `sN.py` sources; `build.py sN`).
