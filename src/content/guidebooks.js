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
};
