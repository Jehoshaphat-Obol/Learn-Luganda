/*
 * Unit guidebooks: key phrases, grammar tips and culture notes. Paragraphs
 * may use **bold** for Luganda words. A tip's `id` can be referenced from
 * a skill's `tip` so the path links straight to it.
 */
export const GUIDEBOOKS = {
  u1: {
    intro: 'Greetings are the heart of conversation in Buganda. Nobody asks for directions or buys a mango before saying hello first.',
    phrases: [
      ['Oli otya?', 'How are you?'],
      ['Gyendi, weebale.', 'I’m fine, thank you.'],
      ['Wasuze otya?', 'Good morning (how did you sleep?)'],
      ['Nsuze bulungi.', 'I slept well.'],
      ['Osiibye otya?', 'Good afternoon (how has your day been?)'],
      ['Gyebale ko!', 'Well done! (to someone working)'],
      ['Erinnya lyo ani?', 'What is your name?'],
      ['Nze Nakato.', 'I am Nakato.'],
      ['Nva Masaka.', 'I come from Masaka.'],
      ['Weraba, tunaalabagana.', 'Goodbye, see you later.'],
    ],
    tips: [
      {
        id: 'time-of-day',
        title: 'Greetings follow the clock',
        body: [
          'Until about midday, ask **Wasuze otya?**, literally “how did you sleep?”. Answer **Nsuze bulungi** (I slept well) or just **Bulungi**.',
          'Later in the day, switch to **Osiibye otya?**, “how have you spent the day?”. **Oli otya?** works at any time.',
        ],
      },
      {
        id: 'one-or-many',
        title: 'One person or many',
        body: ['Greetings change when you talk to a group. The singular forms in this unit start with **w-** or **o-**; the plural forms start with **mw-** or **mu-**.'],
        table: [
          ['One person', 'Many people', 'English'],
          ['Wasuze otya?', 'Mwasuze mutya?', 'Good morning'],
          ['Weebale', 'Mwebale', 'Thank you'],
          ['Weraba', 'Mweraba', 'Goodbye'],
        ],
      },
      {
        id: 'long-sounds',
        title: 'Double letters are long sounds',
        body: [
          'A doubled vowel (**aa**, **ee**, **ii**) is held a little longer, and a doubled consonant (**nn**, **ss**, **bb**, **kk**) is said with more weight. Length changes meaning, so say **Weebale** with a long **ee** and **kkumi** (ten) with a strong **kk**.',
          'Luganda is written as it sounds: every letter is pronounced, and vowels sound much like Spanish or Italian vowels.',
        ],
      },
    ],
    culture: [
      {
        title: 'Take time to greet',
        body: ['A greeting is a short conversation, not a single word. People ask after your health, your night and your work before getting to business. Rushing it can seem rude.'],
      },
      {
        title: 'Ssebo and nnyabo',
        body: ['Add **ssebo** (sir) or **nnyabo** (madam) to be polite with anyone older than you or anyone you don’t know. In traditional settings, people may kneel to greet elders as a sign of respect.'],
      },
      {
        title: 'Gyebale ko',
        body: ['Say **Gyebale ko** to anyone who is working: a shopkeeper, a farmer, a friend cooking. The usual reply is **Weebale** or **Kale**.'],
      },
    ],
  },
  u2: {
    intro: 'This unit introduces people, things and your first verbs, and with them the idea that drives Luganda grammar: noun classes.',
    phrases: [
      ['Maama wange.', 'My mother.'],
      ['Omwana wange.', 'My child.'],
      ['Abaana bayizi.', 'The children are students.'],
      ['Ekitabo kyange.', 'My book.'],
      ['Ebitabo byange.', 'My books.'],
      ['Oyagala ki?', 'What do you want?'],
      ['Njagala amazzi.', 'I want water.'],
      ['Nnywa caayi.', 'I drink tea.'],
      ['Njiga Oluganda.', 'I am learning Luganda.'],
    ],
    tips: [
      {
        id: 'noun-classes',
        title: 'Noun classes',
        body: [
          'Every Luganda noun belongs to a class, shown by its prefix. Classes come in singular and plural pairs. People usually take **omu-** in the singular and **aba-** in the plural; many things take **eki-** and **ebi-**.',
          'Words that go with a noun change to match its class. “My” is **wange** with one person, **bange** with people, **kyange** with an **eki-** thing and **byange** with **ebi-** things. You met another one in Unit 1: **erinnya lyange**, my name.',
        ],
        table: [
          ['Singular', 'Plural', 'My …'],
          ['omuntu (person)', 'abantu (people)', 'wange / bange'],
          ['omukazi (woman)', 'abakazi (women)', 'wange / bange'],
          ['ekitabo (book)', 'ebitabo (books)', 'kyange / byange'],
          ['ekikopo (cup)', 'ebikopo (cups)', 'kyange / byange'],
        ],
      },
      {
        id: 'initial-vowel',
        title: 'The first vowel comes and goes',
        body: [
          'Most nouns start with a vowel: **o**muyizi, **e**kitabo, **a**baana. This initial vowel drops in some places, for example after “I am”: **Ndi muyizi** (I am a student), or when the noun describes something: **Abaana bayizi** (the children are students).',
          'Family words like **maama**, **taata** and **jjajja** have no prefix and don’t change.',
        ],
      },
      {
        id: 'verb-prefixes',
        title: 'Who does it: n- and o-',
        body: ['Verbs show who is acting with a prefix. **n-** means “I” and **o-** means “you” (one person). The verb stem stays the same.'],
        table: [
          ['I', 'You', 'English'],
          ['njagala', 'oyagala', 'want'],
          ['nsoma', 'osoma', 'read'],
          ['njiga', 'oyiga', 'learn'],
        ],
      },
    ],
    culture: [
      {
        title: 'Family is wide',
        body: [
          'Kinship words cover more people than in English. Your father’s brothers are also **taata**, and your mother’s sisters are also **maama**. Your father’s sister is your **ssenga** and your mother’s brother your **kojja**.',
          '**Jjajja** means grandparent, and it is a warm, respectful way to address any elder.',
        ],
      },
      {
        title: 'Oluganda, Muganda, Buganda',
        body: ['The same root gives many words: **Oluganda** is the language, a **Muganda** is one person of the Baganda people, and **Buganda** is their kingdom in central Uganda.'],
      },
    ],
  },
  u3: {
    intro: 'Food is at the centre of Ganda hospitality. A meal is a staple with a sauce, and a guest is always offered something to eat.',
    phrases: [
      ['Nnina enjala.', 'I am hungry.'],
      ['Nnina ennyonta.', 'I am thirsty.'],
      ['Ndya matooke.', 'I eat matooke.'],
      ['Matooke n’ebijanjaalo.', 'Matooke and beans.'],
      ['Kiwooma nnyo!', 'It’s very tasty!'],
      ['Ogula ki?', 'What are you buying?'],
      ['Ngula ennanaasi.', 'I am buying a pineapple.'],
    ],
    tips: [
      {
        id: 'staples',
        title: 'A staple and a sauce',
        body: [
          'A Ganda meal pairs **emmere** (the staple: **matooke**, **lumonde**, **muwogo** or **omuceere**) with **enva**, the sauce or relish: beans, meat, fish or groundnut sauce.',
          'The word **emmere** means both “food” in general and the staple on the plate. People often say they haven’t eaten unless they’ve had matooke!',
        ],
      },
      {
        id: 'nnina',
        title: '“I have” for feelings',
        body: ['Luganda says “I have hunger” rather than “I am hungry”: **Nnina enjala**. The same pattern gives **Nnina ennyonta** (I’m thirsty), and in Unit 8 **Nnina ssennyiga** (I have the flu).'],
      },
      {
        id: 'i-and-you',
        title: 'Verbs again: n- and o-',
        body: ['The prefixes from Unit 2 work with every verb. Watch the sound changes: before **g** the n- stays (**ngula**, I buy), and before **t** too (**ntunda**, I sell).'],
        table: [
          ['I', 'You', 'English'],
          ['ngula', 'ogula', 'buy'],
          ['ntunda', 'otunda', 'sell'],
          ['nnywa', 'onywa', 'drink'],
        ],
      },
    ],
    culture: [
      {
        title: 'The market',
        body: ['Every town has an **akatale**, a busy open market. Sellers call out to passers-by, and it is normal to greet a seller before asking about prices. Buying from the same seller each week earns you better prices and a friend.'],
      },
      {
        title: 'Eat, eat!',
        body: ['Refusing food can seem impolite, so take a little even if you have eaten. When food is good, say **Kiwooma nnyo!**'],
      },
    ],
  },
  u4: {
    intro: 'Uganda uses shillings, and prices quickly run into thousands. Being able to hear and say big numbers makes the market much easier.',
    phrases: [
      ['Ssente mmeka?', 'How much money?'],
      ['Kino ssente mmeka?', 'How much is this?'],
      ['Ssiringi lukumi.', 'One thousand shillings.'],
      ['Ssente nkumi ttaano.', 'Five thousand shillings.'],
      ['Kya bbeeyi nnyo!', 'It’s very expensive!'],
      ['Kendeezaako, ssebo.', 'Lower the price a bit, sir.'],
      ['Kale, nkitwala.', 'Okay, I’ll take it.'],
    ],
    tips: [
      {
        id: 'counting',
        title: 'Building numbers',
        body: [
          'After ten, add with **na** (“and”): **kkumi na bbiri** is 12. Before a vowel, **na** shortens to **n’**: **kkumi n’emu** is 11.',
          'Tens are **amakumi** plus a number: **amakumi abiri** (20), **amakumi asatu** (30). Hundreds are **kikumi** and **bikumi**, thousands **lukumi** and **nkumi**, and ten thousand has its own word, **omutwalo**.',
        ],
        table: [
          ['Luganda', 'Number'],
          ['kikumi', '100'],
          ['bikumi bibiri', '200'],
          ['lukumi', '1,000'],
          ['nkumi bbiri', '2,000'],
          ['omutwalo', '10,000'],
        ],
      },
    ],
    culture: [
      {
        title: 'Haggling is expected',
        body: ['At markets and with boda boda riders, the first price is an opening offer. Smile, say **Kendeezaako**, and meet somewhere in the middle. Supermarkets and shops with price tags are fixed.'],
      },
      {
        title: 'Shillings',
        body: ['Common notes are 1,000, 2,000, 5,000, 10,000, 20,000 and 50,000 shillings, and coins go down to 50. People often say just the number: **nkumi bbiri** means 2,000 shillings.'],
      },
    ],
  },
  u5: {
    intro: 'Time words are short and useful. The big surprise is the clock: Ugandan time starts counting at sunrise.',
    phrases: [
      ['Leero', 'Today'],
      ['Enkya', 'Tomorrow'],
      ['Tunaalabagana enkya.', 'See you tomorrow.'],
      ['Nsoma ku Bbalaza.', 'I study on Monday.'],
      ['Ssaawa mmeka?', 'What time is it?'],
      ['Ssaawa nnya.', 'It’s ten o’clock.'],
    ],
    tips: [
      {
        id: 'days',
        title: 'Days of the week',
        body: ['Monday is **Bbalaza** and Sunday **Ssabbiiti**. Tuesday to Saturday count up from Monday: **Lwakubiri** (day two), **Lwakusatu** (three), **Lwakuna** (four), **Lwakutaano** (five), **Lwamukaaga** (six). Use **ku** for “on”: **ku Lwakutaano**, on Friday.'],
      },
      {
        id: 'ugandan-time',
        title: 'Ugandan time',
        body: [
          'The Luganda clock starts at 7 am, around sunrise. **Ssaawa emu** (hour one) is 7 o’clock, **ssaawa bbiri** is 8, and **ssaawa nnya** is 10. Noon and midnight are **ssaawa mukaaga**.',
          'Quick trick: add six to the English time (or subtract six) to get the Luganda hour. Add **ku makya** (morning), **olweggulo** (afternoon) or **ekiro** (night) to be clear.',
        ],
        table: [
          ['Luganda', 'Clock'],
          ['ssaawa emu', '7:00'],
          ['ssaawa nnya', '10:00'],
          ['ssaawa mukaaga', '12:00'],
          ['ssaawa kkumi', '4:00 pm'],
        ],
      },
    ],
    culture: [
      {
        title: 'Two kinds of jjo',
        body: ['**Jjo** means yesterday, but it can also point to the day after tomorrow or the day before yesterday. Listen for the verb tense, or ask to be sure.'],
      },
    ],
  },
  u6: {
    intro: 'Getting around means boda bodas, taxis and asking the way. A few direction words go a long way.',
    phrases: [
      ['Ogenda wa?', 'Where are you going?'],
      ['Ŋŋenda awaka.', 'I am going home.'],
      ['Eddwaliro liri wa?', 'Where is the hospital?'],
      ['Kyuka ku ddyo.', 'Turn right.'],
      ['Genda butereevu.', 'Go straight ahead.'],
      ['Yimirira wano.', 'Stop here.'],
      ['Ntwala mu kibuga.', 'Take me to town.'],
    ],
    tips: [
      {
        id: 'going-to',
        title: 'Ŋŋenda: the letter ŋ',
        body: [
          '**Ŋ** sounds like the “ng” in “sing”. **Ŋŋenda** (I am going) starts with a long ŋ. If your keyboard has no ŋ, typing **ng** is accepted.',
          'Use **ku** for going to a place you visit (**ku ssomero**, to school) and **mu** for going into a place (**mu kibuga**, into town). **Awaka** (home) needs neither.',
        ],
      },
      {
        id: 'where-is',
        title: 'Where is it?',
        body: ['“Is” agrees with the noun class again. Nouns like **eddwaliro** and **essomero** take **liri wa?**, and ki- nouns take **kiri wa?**: **Ekitabo kiri wa?** (Where is the book?).'],
      },
    ],
    culture: [
      {
        title: 'Boda bodas',
        body: ['Motorbike taxis, **boda bodas**, are the quickest way through traffic. Agree the price before you get on, ask for a helmet, and say **Yimirira wano** when you arrive.'],
      },
    ],
  },
  u7: {
    intro: 'Visiting someone’s home is a big part of social life. You will hear and use these words from the moment you arrive.',
    phrases: [
      ['Kkodi!', 'Knock knock!'],
      ['Yingira!', 'Come in!'],
      ['Tuula wansi.', 'Sit down.'],
      ['Tusanyuse okukulaba.', 'We are happy to see you.'],
      ['Ggalawo oluggi.', 'Close the door.'],
      ['Ndeetera amazzi.', 'Bring me water.'],
    ],
    tips: [
      {
        id: 'visiting',
        title: 'Arriving at a home',
        body: ['Instead of knocking, call **Kkodi!** at the door. The host answers **Yingira** (come in) and offers a seat: **Tuula**. Then come the long greetings from Unit 1.'],
      },
      {
        id: 'commands',
        title: 'Asking and telling',
        body: [
          'A command is just the verb stem: **Tuula** (sit), **Yingira** (come in), **Genda** (go). Add **m-** or **n-** for “me”: **Mpa** (give me), **Ndeetera** (bring me), **Ntwala** (take me).',
          'Ending a request with a polite word like **ssebo** or **nnyabo**, or starting with **Bambi** (please, kindly), makes it gentle.',
        ],
      },
    ],
    culture: [
      {
        title: 'Never visit empty-handed',
        body: ['Guests often bring sugar, bread, soap or fruit. Hosts offer tea or food, and a guest is walked part of the way home when they leave.'],
      },
    ],
  },
  u8: {
    intro: 'Knowing how to say what hurts is useful anywhere. These words also bring back the noun classes from Unit 2.',
    phrases: [
      ['Ndi mulwadde.', 'I am sick.'],
      ['Omutwe gunnuma.', 'My head hurts.'],
      ['Olubuto lunnuma.', 'My stomach hurts.'],
      ['Nnina omusujja.', 'I have a fever.'],
      ['Ŋŋenda mu ddwaliro.', 'I am going to the hospital.'],
      ['Wona mangu!', 'Get well soon!'],
    ],
    tips: [
      {
        id: 'it-hurts',
        title: '“It hurts me” agrees too',
        body: ['The body part decides the start of the verb. **Omutwe** and **omukono** take **gu-**: **gunnuma**. **Olubuto** takes **lu-**: **lunnuma**. **Okugulu** (leg) takes **ku-**: **kunnuma**.'],
        table: [
          ['Body part', 'It hurts me'],
          ['omutwe (head)', 'gunnuma'],
          ['omukono (arm)', 'gunnuma'],
          ['olubuto (stomach)', 'lunnuma'],
          ['okugulu (leg)', 'kunnuma'],
        ],
      },
    ],
    culture: [
      {
        title: 'Visiting the sick',
        body: ['When someone is ill, friends and family visit, bring food and wish them **Wona mangu**. A short visit matters more than a long one.'],
      },
    ],
  },
};
