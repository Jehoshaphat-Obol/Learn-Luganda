# Language catalog and build plan

This folder lists the languages Learn-Luganda could teach or be used in, and
the order we build them in. The data lives in [`catalog.json`](catalog.json);
the tables at the bottom of this page are generated from it with
`npm run catalog` (a unit test fails if they drift).

The catalog is a planning document. The app does not load it: what the app
knows is `src/packs/languages.json` (names, greetings, flags), `regions.json`
(the region guess) and the packs themselves. How to write a pack is in the
[pack authoring guide](../packs/README.md).

## How complete is "every language in Africa"?

Africa has somewhere around 2,000 living languages, most of them spoken by a
few thousand to a few hundred thousand people and many with no written
standard. Listing all of them would not help us build anything, so the
catalog covers the **137 African languages** that are official or national
languages, widely used lingua francas, or have roughly half a million
speakers or more, plus every language of Uganda with a sizeable community and
a few smaller ones of particular interest. The **48 global languages** are
the most widely spoken languages in the world (by first plus second-language
speakers), and the ones African learners most often need (English, French,
Portuguese, Arabic).

Speaker counts are rough, rounded L1+L2 estimates from Ethnologue and recent
censuses. They are only used to order the work, not to make claims.

Any language not in the catalog can be added the same way: add an entry to
`catalog.json`, regenerate the tables, and open an issue for its packs.

## What "adding a language" means

A language is fully supported when it has four things, built in this order:

1. **Registry entry** in `src/packs/languages.json`: code, English and native
   name, an everyday greeting, text direction and `country` (with a flag
   drawing in `src/illustrations/flags.js`), plus its countries in
   `regions.json` so the region guess can suggest it.
2. **UI pack** `src/packs/ui/<code>.json`: every string of the app (landing
   page, onboarding, lessons, profile) in that language, so its speakers can
   use the app in it. Strings it leaves out fall back to English.
3. **Course "X for English speakers"** `src/packs/courses/en-<code>/`.
4. **Course "English for X speakers"** `src/packs/courses/<code>-en/`, which
   needs the UI pack from step 2.

Every course starts with **Section 1, Foundations (units 1 to 8)** and grows
by one section per issue until it matches the Luganda course (five sections,
40 units). That way a new language reaches learners quickly and each pull
request stays reviewable.

Courses between two non-English languages (Swahili for Luganda speakers,
French for Lingala speakers and so on) come after both languages have their
English courses, because they reuse the same lesson plan.

## Build order

The app is built in Uganda for Ugandans first, so the order follows that:
the languages of Uganda, then the region's big lingua francas, then the rest
of Africa by reach, then the world.

| Wave | Region | Why this order |
| --- | --- | --- |
| 1 | Uganda | Our first learners. Luganda both ways, Swahili (Uganda's second official language and East Africa's lingua franca), then the largest languages of each part of Uganda. |
| 2 | East Africa and the Horn | Neighbours of Uganda, mostly Bantu and Nilotic languages close to wave 1, plus the big Horn languages (Amharic, Oromo, Somali, Tigrinya). |
| 3 | West Africa | The largest audience in Africa: Hausa, Yoruba, Igbo, Nigerian Pidgin, Akan, Wolof, Fula, Bambara. |
| 4 | Central and Southern Africa | Lingala, Zulu, Xhosa, Shona, Chichewa, Sesotho, Setswana, Malagasy and the other Bantu languages of the south. |
| 5 | North Africa | Standard and spoken Arabic (right-to-left) and the Amazigh languages (Tifinagh script). |
| 6 | Global | UI packs for the world's major languages, so visitors can use the app in their own language, then courses where there is demand. French, Portuguese and Arabic come first because much of Africa reads them. |
| 7 | Later | Small, liturgical or endangered languages, best built with a community partner. |

Inside a wave, languages go roughly by speaker count, but one that Claude can
draft well (`draftConfidence` high or medium) may come ahead of a larger one
it drafts poorly.

### Wave 1, issue by issue

Worked one at a time, in this order. Each has its own branch, pull request
and journal entry.

| # | Issue | Pack |
| --- | --- | --- |
| 1 | #121 | Luganda UI pack (`ui/lg.json`) |
| 2 | #122 | English for Luganda speakers, Section 1 (`lg-en`) |
| 3 | #124 | Swahili UI pack (`ui/sw.json`) |
| 4 | #125 | Swahili for English speakers, Section 1 (`en-sw`) |
| 5 | #126 | English for Swahili speakers, Section 1 (`sw-en`) |
| 6 | #127 | English for Luganda speakers, Sections 2 to 5 (`lg-en`) |
| 7 | #128 | Runyankore-Rukiga for English speakers, Section 1 (`en-nyn`) |
| 8 | #129 | Lusoga for English speakers, Section 1 (`en-xog`) |
| 9 | #130 | Acholi for English speakers, Section 1 (`en-ach`) |
| 10 | #131 | Ateso for English speakers, Section 1 (`en-teo`) |
| 11 | #132 | Lugbara for English speakers, Section 1 (`en-lgg`) |
| 12 | #133 | French UI pack (`ui/fr.json`), the gateway for francophone Africa |

The remaining sections of each wave 1 course, the UI packs for the smaller
Ugandan languages, and waves 2 to 7 get their issues when the wave before
them is done, so the tracker only holds work we are about to do.

## Quality

- Everything Claude writes in a language other than English is a draft.
  Each pack is `"status": "draft"` until a native speaker has reviewed it,
  and each journal entry carries a review checklist.
- `draftConfidence` in the catalog says how much to trust the draft: **high**
  for languages with a large written corpus (Swahili, French, Arabic),
  **medium** for well-documented African languages (Luganda, Yoruba, Zulu),
  **low** for languages with little written material. Low-confidence packs
  start smaller (fewer words, simpler sentences) and should be reviewed
  before they are promoted on the landing page.
- Each language must feel like itself: its own cast, places, food, proverbs
  and greetings, not the Luganda course with words swapped.

<!-- catalog:start -->

## Languages spoken in Africa (137)

### Wave 1: Uganda (18)

| Code | Language | Native name | Family | Script | Main countries | Speakers | Draft | In app |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `sw` | Swahili | Kiswahili | Niger-Congo › Bantu | Latin | TZ KE UG CD RW BI MZ KM | 90M | high | yes |
| `lg` | Luganda | Luganda | Niger-Congo › Bantu | Latin | UG | 11M | medium | yes |
| `nyn` | Runyankore | Runyankore | Niger-Congo › Bantu | Latin | UG | 3.4M | low | yes |
| `xog` | Lusoga | Lusoga | Niger-Congo › Bantu | Latin | UG | 3.1M | low | yes |
| `cgg` | Rukiga | Rukiga | Niger-Congo › Bantu | Latin | UG | 2.4M | low |  |
| `teo` | Ateso | Ateso | Nilo-Saharan › Nilotic | Latin | UG KE | 2.4M | low |  |
| `lgg` | Lugbara | Lugbarati | Nilo-Saharan › Central Sudanic | Latin | UG CD | 2.2M | low |  |
| `laj` | Lango | Leb Lango | Nilo-Saharan › Nilotic | Latin | UG | 2.1M | low |  |
| `ach` | Acholi | Lwo | Nilo-Saharan › Nilotic | Latin | UG SS | 1.6M | low |  |
| `alz` | Alur | Dho Alur | Nilo-Saharan › Nilotic | Latin | UG CD | 1.4M | low |  |
| `myx` | Lumasaba | Lumasaaba | Niger-Congo › Bantu | Latin | UG | 1.1M | low |  |
| `ttj` | Rutooro | Rutooro | Niger-Congo › Bantu | Latin | UG | 900k | low |  |
| `nyo` | Runyoro | Runyoro | Niger-Congo › Bantu | Latin | UG | 800k | low |  |
| `koo` | Lhukonzo | Olhukonzo | Niger-Congo › Bantu | Latin | UG CD | 800k | low |  |
| `gwr` | Lugwere | Lugwere | Niger-Congo › Bantu | Latin | UG | 600k | low |  |
| `lsm` | Lusamia | Olusamia | Niger-Congo › Bantu | Latin | UG KE | 600k | low |  |
| `kdj` | Karamojong | Ngakarimojong | Nilo-Saharan › Nilotic | Latin | UG | 500k | low |  |
| `keo` | Kakwa | Kakwa | Nilo-Saharan › Nilotic | Latin | UG SS CD | 300k | low |  |

### Wave 2: East Africa and the Horn (24)

| Code | Language | Native name | Family | Script | Main countries | Speakers | Draft | In app |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `am` | Amharic | አማርኛ | Afro-Asiatic › Semitic | Ge'ez (Ethiopic) | ET | 57M | medium | yes |
| `om` | Oromo | Afaan Oromoo | Afro-Asiatic › Cushitic | Latin | ET KE | 45M | medium | yes |
| `so` | Somali | Soomaali | Afro-Asiatic › Cushitic | Latin | SO ET KE DJ | 24M | medium |  |
| `rw` | Kinyarwanda | Ikinyarwanda | Niger-Congo › Bantu | Latin | RW UG CD | 15M | medium | yes |
| `rn` | Kirundi | Ikirundi | Niger-Congo › Bantu | Latin | BI | 12M | medium |  |
| `ti` | Tigrinya | ትግርኛ | Afro-Asiatic › Semitic | Ge'ez (Ethiopic) | ER ET | 10M | medium |  |
| `ki` | Kikuyu | Gĩkũyũ | Niger-Congo › Bantu | Latin | KE | 8M | medium |  |
| `suk` | Sukuma | Kisukuma | Niger-Congo › Bantu | Latin | TZ | 8M | low |  |
| `luy` | Luhya | Oluluhya | Niger-Congo › Bantu | Latin | KE | 7M | low |  |
| `kln` | Kalenjin | Kalenjin | Nilo-Saharan › Nilotic | Latin | KE | 6M | low |  |
| `luo` | Dholuo | Dholuo | Nilo-Saharan › Nilotic | Latin | KE TZ | 5M | low |  |
| `kam` | Kamba | Kikamba | Niger-Congo › Bantu | Latin | KE | 4.7M | low |  |
| `din` | Dinka | Thuɔŋjäŋ | Nilo-Saharan › Nilotic | Latin | SS | 4.5M | low |  |
| `sid` | Sidamo | Sidaamu Afoo | Afro-Asiatic › Cushitic | Latin | ET | 4M | low |  |
| `guz` | Ekegusii | Ekegusii | Niger-Congo › Bantu | Latin | KE | 2.7M | low |  |
| `aa` | Afar | Qafaraf | Afro-Asiatic › Cushitic | Latin | ET ER DJ | 2.5M | low |  |
| `wal` | Wolaytta | Wolaytta | Afro-Asiatic › Omotic | Latin | ET | 2.4M | low |  |
| `mer` | Kimeru | Kĩmĩĩrũ | Niger-Congo › Bantu | Latin | KE | 2M | low |  |
| `nus` | Nuer | Thok Naath | Nilo-Saharan › Nilotic | Latin | SS ET | 1.9M | low |  |
| `mas` | Maasai | Maa | Nilo-Saharan › Nilotic | Latin | KE TZ | 1.5M | low |  |
| `nym` | Nyamwezi | Kinyamwezi | Niger-Congo › Bantu | Latin | TZ | 1.5M | low |  |
| `hay` | Haya | Kihaya | Niger-Congo › Bantu | Latin | TZ | 1.3M | low |  |
| `heh` | Hehe | Kihehe | Niger-Congo › Bantu | Latin | TZ | 1.2M | low |  |
| `jmc` | Chaga (Machame) | Kimashami | Niger-Congo › Bantu | Latin | TZ | 600k | low |  |

### Wave 3: West Africa (35)

| Code | Language | Native name | Family | Script | Main countries | Speakers | Draft | In app |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `pcm` | Nigerian Pidgin | Naijá | English-based creole | Latin | NG | 120M | medium |  |
| `ha` | Hausa | Hausa | Afro-Asiatic › Chadic | Latin (Boko), Arabic (Ajami) | NG NE GH CM TD | 80M | medium | yes |
| `yo` | Yoruba | Yorùbá | Niger-Congo › Volta-Niger | Latin | NG BJ TG | 47M | medium | yes |
| `ff` | Fula | Fulfulde / Pulaar | Niger-Congo › Atlantic | Latin, Arabic (Ajami), Adlam | SN GN ML NG NE CM MR BF GM | 40M | low |  |
| `ig` | Igbo | Igbo | Niger-Congo › Volta-Niger | Latin | NG | 31M | medium | yes |
| `tw` | Twi (Akan) | Twi | Niger-Congo › Kwa | Latin | GH CI | 17M | medium | yes |
| `bm` | Bambara | Bamanankan | Niger-Congo › Mande | Latin, N'Ko | ML | 15M | low |  |
| `dyu` | Dioula | Jula | Niger-Congo › Mande | Latin | CI BF ML | 12M | low |  |
| `wo` | Wolof | Wolof | Niger-Congo › Atlantic | Latin, Arabic (Wolofal) | SN GM MR | 12M | medium | yes |
| `mos` | Mooré | Mòoré | Niger-Congo › Gur | Latin | BF | 11M | low |  |
| `kr` | Kanuri | Kanuri | Nilo-Saharan › Saharan | Latin, Arabic | NG NE TD CM | 10M | low |  |
| `kri` | Krio | Krio | English-based creole | Latin | SL | 8M | medium |  |
| `ee` | Ewe | Eʋegbe | Niger-Congo › Kwa | Latin | GH TG | 7M | low |  |
| `dje` | Zarma | Zarmaciine | Nilo-Saharan › Songhay | Latin | NE | 6M | low |  |
| `ibb` | Ibibio | Ibibio | Niger-Congo › Cross River | Latin | NG | 5M | low |  |
| `bci` | Baoulé | Wawle | Niger-Congo › Kwa | Latin | CI | 5M | low |  |
| `tiv` | Tiv | Tiv | Niger-Congo › Benue-Congo | Latin | NG | 4M | low |  |
| `son` | Songhay | Soŋay | Nilo-Saharan › Songhay | Latin | ML NE | 3.5M | low |  |
| `sus` | Susu | Sosoxui | Niger-Congo › Mande | Latin | GN SL | 2.5M | low |  |
| `men` | Mende | Mɛnde | Niger-Congo › Mande | Latin | SL | 2.5M | low |  |
| `fon` | Fon | Fɔngbe | Niger-Congo › Kwa | Latin | BJ TG | 2.3M | low |  |
| `tem` | Temne | Kʌthemnɛ | Niger-Congo › Atlantic | Latin | SL | 2.3M | low |  |
| `man` | Mandinka | Mandinka | Niger-Congo › Mande | Latin, Arabic (Ajami), N'Ko | GM SN GW | 2.1M | low |  |
| `ijo` | Ijaw | Izọn | Niger-Congo › Ijoid | Latin | NG | 2M | low |  |
| `bin` | Edo | Ẹ̀dó | Niger-Congo › Edoid | Latin | NG | 2M | low |  |
| `nup` | Nupe | Nupe | Niger-Congo › Volta-Niger | Latin | NG | 1.5M | low |  |
| `srr` | Serer | Seereer | Niger-Congo › Atlantic | Latin | SN | 1.4M | low |  |
| `kpe` | Kpelle | Kpɛlɛɛ | Niger-Congo › Mande | Latin | LR GN | 1.3M | low |  |
| `dag` | Dagbani | Dagbanli | Niger-Congo › Gur | Latin | GH | 1.2M | low |  |
| `kea` | Cape Verdean Creole | Kriolu | Portuguese-based creole | Latin | CV | 1.2M | low |  |
| `bet` | Bété | Bété | Niger-Congo › Kru | Latin | CI | 1M | low |  |
| `pov` | Guinea-Bissau Creole | Kriol | Portuguese-based creole | Latin | GW | 1M | low |  |
| `efi` | Efik | Efik | Niger-Congo › Cross River | Latin | NG | 800k | low |  |
| `gaa` | Ga | Gã | Niger-Congo › Kwa | Latin | GH | 800k | low |  |
| `dyo` | Jola-Fonyi | Joola | Niger-Congo › Atlantic | Latin | SN GM | 500k | low |  |

### Wave 4: Central and Southern Africa (39)

| Code | Language | Native name | Family | Script | Main countries | Speakers | Draft | In app |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ln` | Lingala | Lingála | Niger-Congo › Bantu | Latin | CD CG | 40M | medium | yes |
| `zu` | Zulu | isiZulu | Niger-Congo › Bantu | Latin | ZA SZ LS | 28M | medium | yes |
| `mg` | Malagasy | Malagasy | Austronesian | Latin | MG | 25M | medium | yes |
| `xh` | Xhosa | isiXhosa | Niger-Congo › Bantu | Latin | ZA | 19M | medium | yes |
| `af` | Afrikaans | Afrikaans | Indo-European › Germanic | Latin | ZA NA | 17M | high | yes |
| `sn` | Shona | chiShona | Niger-Congo › Bantu | Latin | ZW MZ | 17M | medium | yes |
| `ny` | Chichewa | Chichewa | Niger-Congo › Bantu | Latin | MW ZM MZ | 15M | medium | yes |
| `st` | Sesotho | Sesotho | Niger-Congo › Bantu | Latin | LS ZA | 14M | medium | yes |
| `tn` | Setswana | Setswana | Niger-Congo › Bantu | Latin | BW ZA | 14M | medium |  |
| `nso` | Sepedi | Sesotho sa Leboa | Niger-Congo › Bantu | Latin | ZA | 14M | low |  |
| `bem` | Bemba | Ichibemba | Niger-Congo › Bantu | Latin | ZM CD | 10M | low |  |
| `vmw` | Makhuwa | Emakhuwa | Niger-Congo › Bantu | Latin | MZ | 9M | low |  |
| `kg` | Kikongo | Kikongo | Niger-Congo › Bantu | Latin | CD CG AO | 7M | low |  |
| `umb` | Umbundu | Umbundu | Niger-Congo › Bantu | Latin | AO | 7M | low |  |
| `ts` | Xitsonga | Xitsonga | Niger-Congo › Bantu | Latin | ZA MZ | 7M | low |  |
| `lua` | Tshiluba | Tshiluba | Niger-Congo › Bantu | Latin | CD | 6M | low |  |
| `ktu` | Kituba | Kikongo ya leta | Bantu-based creole | Latin | CD CG | 5M | low |  |
| `sg` | Sango | Sängö | Ngbandi-based creole | Latin | CF | 5M | low |  |
| `wes` | Cameroonian Pidgin | Kamtok | English-based creole | Latin | CM | 5M | low |  |
| `ss` | Swati | siSwati | Niger-Congo › Bantu | Latin | SZ ZA | 3M | low |  |
| `yao` | Yao | Chiyao | Niger-Congo › Bantu | Latin | MW MZ TZ | 3M | low |  |
| `nd` | Northern Ndebele | isiNdebele | Niger-Congo › Bantu | Latin | ZW | 2.6M | low |  |
| `ndc` | Ndau | Ndau | Niger-Congo › Bantu | Latin | MZ ZW | 2.4M | low |  |
| `tum` | Tumbuka | Chitumbuka | Niger-Congo › Bantu | Latin | MW ZM | 2M | low |  |
| `seh` | Sena | Cisena | Niger-Congo › Bantu | Latin | MZ MW | 1.9M | low |  |
| `kmb` | Kimbundu | Kimbundu | Niger-Congo › Bantu | Latin | AO | 1.7M | low |  |
| `nr` | Southern Ndebele | isiNdebele | Niger-Congo › Bantu | Latin | ZA | 1.6M | low |  |
| `toi` | Tonga (Zambia) | Chitonga | Niger-Congo › Bantu | Latin | ZM ZW | 1.6M | low |  |
| `ng` | Oshiwambo | Oshiwambo | Niger-Congo › Bantu | Latin | NA AO | 1.5M | low |  |
| `ve` | Tshivenda | Tshivenḓa | Niger-Congo › Bantu | Latin | ZA ZW | 1.3M | low |  |
| `mfe` | Mauritian Creole | Kreol Morisien | French-based creole | Latin | MU | 1.3M | low |  |
| `fan` | Fang | Fang | Niger-Congo › Bantu | Latin | GQ GA CM | 1.1M | low |  |
| `bum` | Bulu | Bulu | Niger-Congo › Bantu | Latin | CM | 900k | low |  |
| `zdj` | Comorian | Shikomori | Niger-Congo › Bantu | Latin, Arabic | KM | 800k | low |  |
| `loz` | Lozi | Silozi | Niger-Congo › Bantu | Latin | ZM NA | 700k | low |  |
| `ewo` | Ewondo | Ewondo | Niger-Congo › Bantu | Latin | CM | 600k | low |  |
| `bas` | Basaa | Ɓasaá | Niger-Congo › Bantu | Latin | CM | 300k | low |  |
| `hz` | Herero | Otjiherero | Niger-Congo › Bantu | Latin | NA BW | 250k | low |  |
| `dua` | Duala | Duálá | Niger-Congo › Bantu | Latin | CM | 100k | low |  |

### Wave 5: North Africa (16)

| Code | Language | Native name | Family | Script | Main countries | Speakers | Draft | In app |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ar` | Arabic (Modern Standard) | العربية | Afro-Asiatic › Semitic | Arabic | EG DZ SD MA TN LY MR TD SO DJ KM | 150M | high | yes |
| `arz` | Egyptian Arabic | مصري | Afro-Asiatic › Semitic | Arabic | EG | 110M | medium |  |
| `apd` | Sudanese Arabic | عربي سوداني | Afro-Asiatic › Semitic | Arabic | SD | 42M | low |  |
| `arq` | Algerian Arabic | الدزيرية | Afro-Asiatic › Semitic | Arabic | DZ | 36M | low |  |
| `ary` | Moroccan Arabic (Darija) | الدارجة | Afro-Asiatic › Semitic | Arabic, Latin | MA | 30M | medium |  |
| `aeb` | Tunisian Arabic | تونسي | Afro-Asiatic › Semitic | Arabic | TN | 12M | low |  |
| `ayl` | Libyan Arabic | ليبي | Afro-Asiatic › Semitic | Arabic | LY | 6M | low |  |
| `kab` | Kabyle | Taqbaylit | Afro-Asiatic › Berber | Latin, Tifinagh | DZ | 6M | low |  |
| `shi` | Tashelhit | Taclḥiyt | Afro-Asiatic › Berber | Tifinagh, Latin, Arabic | MA | 5M | low |  |
| `mey` | Hassaniya Arabic | حسانية | Afro-Asiatic › Semitic | Arabic | MR EH | 3.5M | low |  |
| `zgh` | Standard Moroccan Tamazight | ⵜⴰⵎⴰⵣⵉⵖⵜ | Afro-Asiatic › Berber | Tifinagh | MA | 3M | low |  |
| `tzm` | Central Atlas Tamazight | Tamaziɣt | Afro-Asiatic › Berber | Tifinagh, Latin | MA | 3M | low |  |
| `bej` | Beja | Bidhaawyeet | Afro-Asiatic › Cushitic | Latin, Arabic | SD ER EG | 2.5M | low |  |
| `shu` | Chadian Arabic | عربي تشادي | Afro-Asiatic › Semitic | Arabic, Latin | TD | 2M | low |  |
| `tmh` | Tamasheq | Tamajaq | Afro-Asiatic › Berber | Tifinagh, Latin | ML NE | 1.5M | low |  |
| `rif` | Tarifit | Tarifit | Afro-Asiatic › Berber | Tifinagh, Latin, Arabic | MA | 1.5M | low |  |

### Wave 7: Later, community-led (5)

| Code | Language | Native name | Family | Script | Main countries | Speakers | Draft | In app |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `naq` | Khoekhoe | Khoekhoegowab | Khoe-Kwadi | Latin | NA | 200k | low |  |
| `vai` | Vai | ꕙꔤ | Niger-Congo › Mande | Vai, Latin | LR SL | 100k | low |  |
| `crs` | Seychellois Creole | Kreol Seselwa | French-based creole | Latin | SC | 100k | low |  |
| `gez` | Ge'ez | ግዕዝ | Afro-Asiatic › Semitic | Ge'ez (Ethiopic) | ET ER | few | low |  |
| `cop` | Coptic | ⲙⲉⲧⲣⲉⲙⲛ̀ⲭⲏⲙⲓ | Afro-Asiatic › Egyptian | Coptic | EG | few | low |  |

## Major languages around the world (48)

| Code | Language | Native name | Family | Script | Main countries | Speakers | Draft | In app |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `en` | English | English | Indo-European › Germanic | Latin | GB US NG KE UG GH ZA | 1500M | high | yes |
| `ar` | Arabic (Modern Standard) | العربية | Afro-Asiatic › Semitic | Arabic | EG SA DZ MA IQ SD | 330M | high | yes |
| `zh` | Mandarin Chinese | 中文 | Sino-Tibetan | Han (Simplified, Traditional) | CN TW SG | 1140M | high |  |
| `hi` | Hindi | हिन्दी | Indo-European › Indo-Aryan | Devanagari | IN | 610M | high |  |
| `es` | Spanish | Español | Indo-European › Romance | Latin | ES MX CO AR US GQ | 560M | high |  |
| `fr` | French | Français | Indo-European › Romance | Latin | FR CD CI CM SN BE CA | 310M | high | yes |
| `bn` | Bengali | বাংলা | Indo-European › Indo-Aryan | Bengali | BD IN | 280M | high |  |
| `pt` | Portuguese | Português | Indo-European › Romance | Latin | BR PT AO MZ GW CV ST | 265M | high | yes |
| `ru` | Russian | Русский | Indo-European › Slavic | Cyrillic | RU BY KZ | 255M | high |  |
| `ur` | Urdu | اردو | Indo-European › Indo-Aryan | Arabic (Nastaliq) | PK IN | 230M | high |  |
| `id` | Indonesian | Bahasa Indonesia | Austronesian | Latin | ID | 200M | high |  |
| `de` | German | Deutsch | Indo-European › Germanic | Latin | DE AT CH | 135M | high |  |
| `ja` | Japanese | 日本語 | Japonic | Kanji, Hiragana, Katakana | JP | 125M | high |  |
| `pa` | Punjabi | ਪੰਜਾਬੀ | Indo-European › Indo-Aryan | Gurmukhi, Shahmukhi | IN PK | 120M | medium |  |
| `mr` | Marathi | मराठी | Indo-European › Indo-Aryan | Devanagari | IN | 99M | medium |  |
| `te` | Telugu | తెలుగు | Dravidian | Telugu | IN | 96M | medium |  |
| `tr` | Turkish | Türkçe | Turkic | Latin | TR CY | 90M | high |  |
| `ta` | Tamil | தமிழ் | Dravidian | Tamil | IN LK SG | 86M | medium |  |
| `vi` | Vietnamese | Tiếng Việt | Austroasiatic | Latin | VN | 86M | high |  |
| `yue` | Cantonese | 粵語 | Sino-Tibetan | Han (Traditional) | HK CN | 85M | medium |  |
| `tl` | Filipino (Tagalog) | Filipino | Austronesian | Latin | PH | 83M | high |  |
| `ko` | Korean | 한국어 | Koreanic | Hangul | KR KP | 82M | high |  |
| `fa` | Persian | فارسی | Indo-European › Iranian | Arabic | IR AF TJ | 80M | high |  |
| `ms` | Malay | Bahasa Melayu | Austronesian | Latin | MY BN SG | 80M | high |  |
| `it` | Italian | Italiano | Indo-European › Romance | Latin | IT CH | 68M | high |  |
| `jv` | Javanese | Basa Jawa | Austronesian | Latin, Javanese | ID | 68M | medium |  |
| `gu` | Gujarati | ગુજરાતી | Indo-European › Indo-Aryan | Gujarati | IN | 62M | medium |  |
| `th` | Thai | ไทย | Kra-Dai | Thai | TH | 61M | medium |  |
| `kn` | Kannada | ಕನ್ನಡ | Dravidian | Kannada | IN | 59M | medium |  |
| `ps` | Pashto | پښتو | Indo-European › Iranian | Arabic | AF PK | 50M | medium |  |
| `my` | Burmese | မြန်မာ | Sino-Tibetan | Burmese | MM | 43M | medium |  |
| `pl` | Polish | Polski | Indo-European › Slavic | Latin | PL | 40M | high |  |
| `uk` | Ukrainian | Українська | Indo-European › Slavic | Cyrillic | UA | 39M | high |  |
| `ml` | Malayalam | മലയാളം | Dravidian | Malayalam | IN | 37M | medium |  |
| `uz` | Uzbek | Oʻzbekcha | Turkic | Latin | UZ | 34M | medium |  |
| `ne` | Nepali | नेपाली | Indo-European › Indo-Aryan | Devanagari | NP | 32M | medium |  |
| `nl` | Dutch | Nederlands | Indo-European › Germanic | Latin | NL BE SR | 30M | high |  |
| `ro` | Romanian | Română | Indo-European › Romance | Latin | RO MD | 25M | high |  |
| `az` | Azerbaijani | Azərbaycanca | Turkic | Latin | AZ IR | 24M | medium |  |
| `km` | Khmer | ខ្មែរ | Austroasiatic | Khmer | KH | 18M | medium |  |
| `si` | Sinhala | සිංහල | Indo-European › Indo-Aryan | Sinhala | LK | 17M | medium |  |
| `kk` | Kazakh | Қазақша | Turkic | Cyrillic, Latin | KZ | 16M | medium |  |
| `el` | Greek | Ελληνικά | Indo-European › Hellenic | Greek | GR CY | 13M | high |  |
| `hu` | Hungarian | Magyar | Uralic | Latin | HU | 13M | high |  |
| `sv` | Swedish | Svenska | Indo-European › Germanic | Latin | SE FI | 13M | high |  |
| `ht` | Haitian Creole | Kreyòl ayisyen | French-based creole | Latin | HT | 13M | medium |  |
| `cs` | Czech | Čeština | Indo-European › Slavic | Latin | CZ | 11M | high |  |
| `he` | Hebrew | עברית | Afro-Asiatic › Semitic | Hebrew | IL | 9M | high |  |

<!-- catalog:end -->
