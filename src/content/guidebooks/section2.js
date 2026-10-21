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
};
