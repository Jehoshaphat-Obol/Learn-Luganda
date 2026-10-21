/* Guidebooks for Section 2: Everyday life. Same shape as ../guidebooks.js. */
export const SECTION2_GUIDEBOOKS = {
  u9: {
    intro: 'Describing words in Luganda follow the noun, and they wear the noun’s class prefix. Learn the root once and you can describe anything.',
    phrases: [
      ['Langi ki?', 'Which colour?'],
      ['Ekikopo kimyufu.', 'The cup is red.'],
      ['Ekitabo kya kiragala.', 'The book is green.'],
      ['Njagala ekikopo ekimyufu.', 'I want the red cup.'],
      ['Kirungi nnyo!', 'It’s very good!'],
      ['Omukazi mulungi.', 'The woman is beautiful.'],
      ['Abaana balungi.', 'The children are good.'],
    ],
    tips: [
      {
        id: 'colours',
        title: 'Two kinds of colour word',
        body: [
          'Some colours are adjectives with a root that takes the noun’s prefix: **-myufu** (red), **-ddugavu** (black), **-eru** (white) and **-yenvu** (yellow). With an **eki-** noun they become **kimyufu**, **kiddugavu**, **kyeru**, **kyenvu**.',
          'Others are nouns, so you say “of green”: **kya kiragala**, **kya bbulu**, **kya kakobe**. The **kya** changes with the class too: **emmeeza ya kitaka** (a brown table).',
        ],
        table: [
          ['Colour', 'eki- noun'],
          ['red', 'ekikopo kimyufu'],
          ['black', 'ekitabo kiddugavu'],
          ['white', 'ekitanda kyeru'],
          ['green', 'ekitabo kya kiragala'],
          ['blue', 'ekikopo kya bbulu'],
        ],
      },
      {
        id: 'agreement',
        title: 'Saying “is” and “the red one”',
        body: [
          'To say a thing **is** big, put the adjective after the noun with no initial vowel: **Ekibuga kinene** (the town is big).',
          'To describe it inside a sentence, keep the initial vowel: **ekikopo ekimyufu** (the red cup). **Njagala ekikopo ekimyufu** means “I want the red cup”.',
        ],
      },
      {
        id: 'people-adjectives',
        title: 'Describing people',
        body: ['People take **mu-** for one person and **ba-** for many, just like **omuntu** and **abantu**. The same roots you used for things work here.'],
        table: [
          ['Root', 'One person', 'People', 'Things (eki-)'],
          ['-lungi (good)', 'mulungi', 'balungi', 'kirungi'],
          ['-wanvu (tall)', 'muwanvu', 'bawanvu', 'kiwanvu'],
          ['-nene (big)', 'munene', 'banene', 'kinene'],
          ['-kadde (old)', 'mukadde', 'bakadde', 'kikadde'],
        ],
      },
    ],
    culture: [
      {
        title: 'Mukadde is a compliment',
        body: ['Calling an elder **mukadde** (old one) is respectful, not rude. Age brings standing, and the word **abakadde** (the elders) is used for respected senior people in a family or village.'],
      },
      {
        title: 'Kirungi, the all-purpose word',
        body: ['**Kirungi** (it’s good) is one of the most useful words you’ll hear: to agree, to approve, to say “that’s fine”. **Kirungi nnyo!** is “excellent!”.'],
      },
    ],
  },
  u10: {
    intro: 'Clothes words bring in the n- class, one of the largest noun classes. Its nouns usually start with **en-**, **em-** or a doubled consonant like **essaati**.',
    phrases: [
      ['Essaati yange.', 'My shirt.'],
      ['Engatto zange.', 'My shoes.'],
      ['Nnyambala gomesi.', 'I am wearing a gomesi.'],
      ['Yambala essweta.', 'Put on a sweater.'],
      ['Yambula engatto.', 'Take off your shoes.'],
      ['Essaati eno ssente mmeka?', 'How much is this shirt?'],
      ['Kale, ngitwala.', 'Okay, I’ll take it.'],
    ],
    tips: [
      {
        id: 'my-n-class',
        title: '“My” with n- nouns',
        body: [
          'One n- thing takes **yange**: **essaati yange**, **empale yange**. Many n- things take **zange**: **engatto zange**, **engoye zange**.',
          'Many n- nouns look the same in the singular and the plural. **Engatto** is one shoe or several; **zange** or **yange** tells you which.',
        ],
        table: [
          ['Class', 'One', 'Many'],
          ['omu-/aba- (people)', 'wange', 'bange'],
          ['eki-/ebi-', 'kyange', 'byange'],
          ['en-', 'yange', 'zange'],
          ['eri-/ama-', 'lyange', 'gange'],
        ],
      },
      {
        id: 'this-n-class',
        title: '“This” agrees too',
        body: ['You learnt **kino** (this) for eki- things in Unit 4. For an n- thing it is **eno**: **essaati eno** (this shirt). And “I’ll take it” changes its middle: **nkitwala** for an eki- thing, **ngitwala** for an n- thing.'],
      },
    ],
    culture: [
      {
        title: 'Gomesi and kanzu',
        body: [
          'The **gomesi** (or **busuuti**) is a long, brightly coloured dress with puffed shoulders and a sash, worn by women at weddings, introductions and church. The **kkanzu** is a long white robe for men, often with a jacket over it.',
          'Wearing them to a ceremony is a sign of respect, and visitors who do are warmly welcomed.',
        ],
      },
      {
        title: 'Shoes off',
        body: ['In many homes, guests take off their shoes at the door. If you see shoes lined up outside, **yambula engatto**.'],
      },
    ],
  },
  u11: {
    intro: 'With a handful of verbs and the subject prefixes, you can describe a whole day. The verb stem stays the same; only the front changes.',
    phrases: [
      ['Nzuukuka ku makya.', 'I wake up in the morning.'],
      ['Ndya ekyenkya.', 'I eat breakfast.'],
      ['Ŋŋenda ku mulimu.', 'I am going to work.'],
      ['Maama akola mu ddwaliro.', 'Mother works in a hospital.'],
      ['Abaana bazannya.', 'The children are playing.'],
      ['Oluvannyuma nsoma.', 'Afterwards I study.'],
      ['Nneebaka ssaawa ssatu ekiro.', 'I sleep at nine at night.'],
    ],
    tips: [
      {
        id: 'subject-prefixes',
        title: 'Who is doing it',
        body: [
          'You know **n-** (I) and **o-** (you). Add **a-** (he or she), **tu-** (we), **mu-** (you all) and **ba-** (they). Luganda has no separate word for he and she.',
          'The **ku-** form is the infinitive, “to …”: **okusoma** (to read), **okukola** (to work). Use it after **Njagala**: **Njagala okusoma**, I want to read.',
        ],
        table: [
          ['Person', '-kola (work)', '-soma (read)'],
          ['I', 'nkola', 'nsoma'],
          ['you', 'okola', 'osoma'],
          ['he / she', 'akola', 'asoma'],
          ['we', 'tukola', 'tusoma'],
          ['you all', 'mukola', 'musoma'],
          ['they', 'bakola', 'basoma'],
        ],
      },
    ],
    culture: [
      {
        title: 'Three meals',
        body: ['**Ekyenkya** (breakfast) is often tea with bread or a snack, **ekyemisana** (lunch) is the main meal for many, and **ekyeggulo** (supper) is eaten after dark. Each name comes from the time of day.'],
      },
    ],
  },
  u12: {
    intro: 'Uganda sits on the equator, so the year is shaped by rain rather than by summer and winter.',
    phrases: [
      ['Enkuba etonnya.', 'It’s raining.'],
      ['Omusana gwaka.', 'The sun is shining.'],
      ['Leero obudde bulungi.', 'Today the weather is good.'],
      ['Mpulira empewo.', 'I feel cold.'],
      ['Obudde bwokya nnyo nnyo!', 'It’s really very hot!'],
      ['Twala ekiwempe.', 'Take an umbrella.'],
    ],
    tips: [
      {
        id: 'weather-verbs',
        title: 'The weather does things',
        body: [
          'Weather words are nouns that act: the rain falls (**enkuba etonnya**), the sun burns (**omusana gwaka**). Each verb agrees with its noun: **e-** for enkuba, **gu-** for omusana, **bu-** for obudde.',
          '**Obudde** means both weather and time. **Obudde bulungi** is “the weather is good”.',
        ],
      },
      {
        id: 'seasons',
        title: 'Wet and dry',
        body: ['**Ttoggo** is the long rainy season, around March to May. **Ekyeya** is the dry season, when it is hot and dusty. There is a second, shorter rainy season later in the year.'],
      },
    ],
    culture: [
      {
        title: 'Rain stops everything',
        body: ['Heavy rain in Kampala can stop traffic and meetings, and nobody minds waiting it out. “The rain held me up” is a perfectly good reason to be late.'],
      },
    ],
  },
  u13: {
    intro: 'Most animal names belong to the n- class, so the agreement you learnt for clothes works for animals too.',
    phrases: [
      ['Waliwo ebisolo bingi.', 'There are many animals.'],
      ['Nnina embuzi bbiri.', 'I have two goats.'],
      ['Ente zirya omuddo.', 'The cows eat grass.'],
      ['Enjovu nnene nnyo.', 'The elephant is very big.'],
      ['Ntya omusota!', 'I’m afraid of the snake!'],
      ['Engaali ebuuka.', 'The crested crane is flying.'],
    ],
    tips: [
      {
        id: 'same-plural',
        title: 'One cow, many cows',
        body: [
          'Many n- nouns are the same in the singular and the plural: **ente** is one cow or a herd. The words around the noun tell you which. **Ente erya** is “the cow eats”, **ente zirya** is “the cows eat”.',
          '**Waliwo** means “there is” or “there are”, for any noun: **Waliwo empologoma?** (Is there a lion?).',
        ],
        table: [
          ['', 'One', 'Many'],
          ['eats', 'ente erya', 'ente zirya'],
          ['is here / are here', 'embwa eri wano', 'embwa ziri wano'],
          ['my', 'embuzi yange', 'embuzi zange'],
        ],
      },
    ],
    culture: [
      {
        title: 'The crested crane',
        body: ['The grey crowned crane, **engaali**, stands on Uganda’s flag and coat of arms. It mates for life and dances to court, which is why it is a symbol of the nation. (It is also our mascot’s inspiration.)'],
      },
      {
        title: 'Cattle as wealth',
        body: ['Cows have long meant wealth and status. They feature in bride price, in proverbs and in many clan totems you’ll meet in Section 4.'],
      },
    ],
  },
  u14: {
    intro: 'Job titles are people nouns, so they take **omu-** for one person and **aba-** for many. Many come straight from a verb.',
    phrases: [
      ['Okola mulimu ki?', 'What work do you do?'],
      ['Ndi mulimi.', 'I am a farmer.'],
      ['Maama musuubuzi.', 'Mother is a trader.'],
      ['Nkola mu ofiisi.', 'I work in an office.'],
      ['Nkolera kampuni ennene.', 'I work for a big company.'],
      ['Nfuna omusaala buli mwezi.', 'I get a salary every month.'],
    ],
    tips: [
      {
        id: 'people-nouns',
        title: 'From verb to job',
        body: [
          'Put **omu-** on a verb stem and change the last **-a** to **-i** to get the person who does it: **-lima** (dig) gives **omulimi** (farmer), **-zimba** (build) gives **omuzimbi** (builder), **-fumba** (cook) gives **omufumbi** (cook).',
          'To say what someone is, drop the first vowel: **Ndi mulimi** (I am a farmer), **Ssali muvuzi** (Ssali is a driver).',
        ],
        table: [
          ['Verb', 'One person', 'Many people'],
          ['-lima (dig)', 'omulimi', 'abalimi'],
          ['-zimba (build)', 'omuzimbi', 'abazimbi'],
          ['-vuga (drive)', 'omuvuzi', 'abavuzi'],
          ['-kola (work)', 'omukozi', 'abakozi'],
        ],
      },
    ],
    culture: [
      {
        title: 'Everyone farms',
        body: ['Even people with office jobs often keep a garden, **ennimiro**, in the village. Weekends “at the farm” are common, and the harvest feeds the family in town.'],
      },
      {
        title: 'Gyebale ko again',
        body: ['Remember **Gyebale ko** from Unit 1? It thanks someone for their work. Say it to any worker you meet: the builder, the trader, the cook.'],
      },
    ],
  },
  u15: {
    intro: 'School vocabulary is full of commands. Teachers speak to the whole class, so you’ll hear plural commands all day.',
    phrases: [
      ['Musome ekitabo.', 'Read the book, everyone.'],
      ['Muwulirize omusomesa.', 'Listen to the teacher, everyone.'],
      ['Nnina ekibuuzo.', 'I have a question.'],
      ['Otegeera?', 'Do you understand?'],
      ['Ddamu mpola, ssebo.', 'Repeat slowly, sir.'],
      ['Nnyagala nnyo okubala.', 'I really like maths.'],
    ],
    tips: [
      {
        id: 'class-commands',
        title: 'Commands to a group',
        body: [
          'To one person, a command is the bare verb: **Soma** (read), **Wandiika** (write). To a group, add **mu-** in front and change the final **-a** to **-e**: **Musome**, **Muwandiike**, **Muwulirize**.',
          'The same **-e** ending makes “let’s”: **Tusome** (let’s read). You’ll meet it again in **Tugende** (let’s go).',
        ],
        table: [
          ['One person', 'Everyone', 'Let’s'],
          ['Soma', 'Musome', 'Tusome'],
          ['Wandiika', 'Muwandiike', 'Tuwandiike'],
          ['Wuliriza', 'Muwulirize', 'Tuwulirize'],
        ],
      },
      {
        id: 'n-sound-changes',
        title: 'n- changes the sound after it',
        body: ['When **n-** (I) meets **w**, it becomes **mp**: **wandiika** gives **mpandiika** (I write). With **l** or **r** it becomes **nd**: **laba** gives **ndaba** (I see). You have seen this in **mpulira** and **mpa** too.'],
      },
    ],
    culture: [
      {
        title: 'Languages at school',
        body: ['Uganda has over forty languages. Schools teach in English, and many in central Uganda also teach Luganda. It is common to grow up speaking three languages.'],
      },
    ],
  },
  u16: {
    intro: 'Travel in Uganda means shared taxis, long-distance buses and boda bodas. Knowing a few words makes every journey easier.',
    phrases: [
      ['Ttakisi eno egenda wa?', 'Where does this taxi go?'],
      ['Yimirira ku siteegi.', 'Stop at the stage.'],
      ['Genda mpola, ssebo!', 'Go slowly, sir!'],
      ['Okuva e Kampala okutuuka e Masaka.', 'From Kampala to Masaka.'],
      ['Ntuuse bulungi.', 'I have arrived safely.'],
      ['Olugendo olulungi!', 'Have a good journey!'],
    ],
    tips: [
      {
        id: 'taxis',
        title: 'Taxi, stage and park',
        body: ['A **ttakisi** is a shared minibus that runs a fixed route from a **paaka** (taxi park). Along the way it stops at a **siteegi** (stage). Tell the conductor **Yimirira wano** when you want to get off.'],
      },
      {
        id: 'from-to',
        title: 'From … to …',
        body: [
          'Use **okuva** (from) and **okutuuka** (until, up to) for a journey: **Okuva e Kampala okutuuka e Jinja**.',
          'Before a town name, Luganda often adds **e**: **e Kampala**, **e Masaka**. It works like “at” or “to” for places.',
        ],
      },
    ],
    culture: [
      {
        title: 'Safe arrival',
        body: ['When someone arrives from a journey, people say **Kulika olugendo** (well done for the journey). The traveller answers **Weebale**. Calling to say **Ntuuse** (I’ve arrived) is a kindness.'],
      },
    ],
  },
};
