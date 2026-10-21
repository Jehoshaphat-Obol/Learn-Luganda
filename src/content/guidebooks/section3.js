/* Guidebooks for Section 3: Conversations. Same shape as ../guidebooks.js. */
export const SECTION3_GUIDEBOOKS = {
  u17: {
    intro: 'Saying no politely is a big step towards real conversation. Luganda makes a verb negative with a small prefix.',
    phrases: [
      ['Saagala kaawa.', 'I don’t want coffee.'],
      ['Sirya nnyama.', 'I don’t eat meat.'],
      ['Simanyi, ssebo.', 'I don’t know, sir.'],
      ['Sitegeera. Ddamu.', 'I don’t understand. Repeat.'],
      ['Sirina ssente.', 'I don’t have money.'],
      ['Tewali mazzi.', 'There is no water.'],
      ['Totya!', 'Don’t be afraid!'],
    ],
    tips: [
      {
        id: 'negatives',
        title: 'si-, to-, ta-',
        body: [
          'Put **si-** in front for “I don’t”: **simanyi**, **sirina**, **sigenda**. When the verb starts with a vowel, the sounds merge: **si + yagala** becomes **saagala**.',
          'For “you don’t” use **to-** (**toyagala**), for “he/she doesn’t” use **ta-** (**tagenda**), and for “we don’t” use **tetu-** (**tetulina**). A **to-** command means “don’t!”: **Togenda!**, **Totya!**',
          'After a negative verb, the noun usually drops its first vowel: **Sinywa mata** (not *amata*), **Tewali mazzi**.',
        ],
        table: [
          ['', 'Yes', 'No'],
          ['I', 'njagala', 'saagala'],
          ['you', 'oyagala', 'toyagala'],
          ['he / she', 'ayagala', 'tayagala'],
          ['we', 'twagala', 'tetwagala'],
          ['there is', 'waliwo', 'tewali'],
        ],
      },
    ],
    culture: [
      {
        title: 'A soft no',
        body: ['A flat **Nedda** can feel abrupt. People soften a refusal with thanks and a reason: **Weebale, naye saagala kaawa** (thank you, but I don’t want coffee). Refusing food entirely can seem unfriendly, so taking a little is kind.'],
      },
    ],
  },
  u18: {
    intro: 'Luganda questions keep the same word order as statements. The question word simply goes where the answer would be, usually at the end.',
    phrases: [
      ['Kino kiki?', 'What is this?'],
      ['Ani oyo?', 'Who is that?'],
      ['Oli wa kati?', 'Where are you now?'],
      ['Ojja ddi?', 'When are you coming?'],
      ['Lwaki osoma Oluganda?', 'Why are you learning Luganda?'],
      ['Oyogera Oluganda?', 'Do you speak Luganda?'],
      ['Kino kiyitibwa kitya mu Luganda?', 'What is this called in Luganda?'],
    ],
    tips: [
      {
        id: 'question-words',
        title: 'The answer goes in the same place',
        body: [
          'Ask **Ogenda wa?** (you-go where?) and answer **Ŋŋenda Jinja** (I-go Jinja). Swap the question word for the answer and the sentence is done.',
          'A yes/no question is a statement with a rising voice: **Oyogera Oluganda?** Add **oba** (or) to offer a choice: **Caayi oba kaawa?**',
        ],
        table: [
          ['Word', 'Meaning', 'Example'],
          ['ki', 'what', 'Oyagala ki?'],
          ['ani', 'who', 'Ani oyo?'],
          ['wa', 'where', 'Oli wa?'],
          ['ddi', 'when', 'Ojja ddi?'],
          ['lwaki', 'why', 'Lwaki osoma?'],
          ['mmeka', 'how many / how much', 'Ssente mmeka?'],
        ],
      },
      {
        id: 'ask-about-words',
        title: 'Learning from people',
        body: ['The best phrase for a learner: point and ask **Kino kiyitibwa kitya mu Luganda?** (What is this called in Luganda?). If you miss the answer, say **Ddamu mpola** (repeat slowly). People love helping a learner.'],
      },
    ],
    culture: [
      {
        title: 'Njogera katono',
        body: ['Answering **Njogera katono** (I speak a little) to **Oyogera Oluganda?** almost always gets a smile, and often a long conversation. Ugandans are proud when visitors try their language.'],
      },
    ],
  },
  u19: {
    intro: 'Luganda has several past tenses. Two will carry you a long way: one for today, one for yesterday and before.',
    phrases: [
      ['Olidde? Yee, ndidde.', 'Have you eaten? Yes, I have.'],
      ['Leero nkoze nnyo.', 'Today I have worked hard.'],
      ['Mmaze omulimu gwange.', 'I have finished my work.'],
      ['Jjo nnagenda mu kibuga.', 'Yesterday I went to town.'],
      ['Wiiki ewedde twagenda e Jinja.', 'Last week we went to Jinja.'],
      ['Edda nnali muyizi.', 'Long ago I was a student.'],
    ],
    tips: [
      {
        id: 'perfect',
        title: 'Today’s past: -dde, -ze, -ye',
        body: [
          'For something done earlier today, or just now, the verb ending changes: **-lya** (eat) becomes **ndidde**, **-kola** becomes **nkoze**, **-soma** becomes **nsomye**, **-mala** (finish) becomes **mmaze**.',
          'The endings are irregular, so learn each verb as a pair. The same form also says something is done and still true: **Ntuuse** (I have arrived, I’m here).',
        ],
        table: [
          ['Verb', 'Present', 'Today’s past'],
          ['-lya (eat)', 'ndya', 'ndidde'],
          ['-nywa (drink)', 'nnywa', 'nnywedde'],
          ['-kola (work)', 'nkola', 'nkoze'],
          ['-soma (read)', 'nsoma', 'nsomye'],
          ['-mala (finish)', 'mmala', 'mmaze'],
        ],
      },
      {
        id: 'far-past',
        title: 'Yesterday and before: na-',
        body: [
          'For yesterday or earlier, put **-a-** after the person prefix: **nna-** (I), **wa-** (you), **ya-** (he/she), **twa-** (we), **ba-** (they). The verb stays regular: **nnagenda**, **nnalya**, **nnasoma**.',
          '**Nnali** means “I was”. **Nkyali** means “I am still”.',
        ],
      },
    ],
    culture: [
      {
        title: 'Olidde?',
        body: ['**Olidde?** (have you eaten?) is as much a greeting of care as a question. If you say no, expect to be fed.'],
      },
    ],
  },
  u20: {
    intro: 'Talking about the future lets you make plans, promises and dreams. Luganda has a near future and a far one.',
    phrases: [
      ['Enkya nja kugenda e Masaka.', 'Tomorrow I will go to Masaka.'],
      ['Tujja kusoma awamu.', 'We will study together.'],
      ['Oteekateeka ki ku wiikendi?', 'What are you planning for the weekend?'],
      ['Ku wiikendi nja kukyalira jjajja.', 'At the weekend I will visit grandparent.'],
      ['Olunaku lumu ndyogera Oluganda bulungi.', 'One day I will speak Luganda well.'],
      ['Nsuubira okulaba Kabaka.', 'I hope to see the Kabaka.'],
    ],
    tips: [
      {
        id: 'near-future',
        title: 'Soon: ja + ku-',
        body: [
          'The near future uses **-jja** (come) with the **ku-** form, a bit like English “going to”: **nja kugenda** (I will go), **ojja kugenda**, **ajja kugenda**, **tujja kugenda**, **bajja kugenda**.',
          'The **o-** of the infinitive drops: **okulya** becomes **kulya** after **nja**.',
        ],
      },
      {
        id: 'far-future',
        title: 'Someday: li-',
        body: ['For the distant or less certain future, add **-li-**: **ndigenda** (I will go, someday), **ndyogera** (I will speak). Pair it with **olunaku lumu** (one day).'],
      },
    ],
    culture: [
      {
        title: 'Plans and “Katonda bw’anaayagala”',
        body: ['Many Ugandans add **Katonda bw’anaayagala** (God willing) when talking about the future, much like “inshallah”. You’ll hear it at the end of plans of every size.'],
      },
    ],
  },
};
