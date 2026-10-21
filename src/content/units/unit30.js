/*
 * Unit 30: Faith and holidays. Church and mosque, the main holidays and
 * the greetings and blessings that go with them.
 */
export default {
  id: 'u30',
  title: 'Faith and holidays',
  description: 'Places of worship, Christmas, Eid, Martyrs Day and blessings.',
  color: 'sage',
  character: 'mukasa',
  words: [
    ['katonda', 'Katonda', 'God', { altEn: ['the lord'] }],
    ['okusaba', 'okusaba', 'to pray', { altEn: ['praying', 'to ask', 'to request'] }],
    ['nsaba', 'Nsaba', 'I pray', { altEn: ['i ask', 'i request', 'please'], notes: 'Also “I ask”: Nsaba amazzi, may I have water.' }],
    ['bbayibuli', 'Bbayibuli', 'Bible', { altEn: ['the bible'] }],
    ['kulaani', 'Kulaani', 'Quran', { altEn: ['the quran', 'koran'] }],
    ['amiina', 'Amiina', 'Amen'],
    ['ssekukkulu', 'Ssekukkulu', 'Christmas', { altEn: ['xmas'] }],
    ['paasika', 'Paasika', 'Easter'],
    ['iddi', 'Iddi', 'Eid', { altEn: ['eid al-fitr', 'idd'] }],
    ['okusiiba', 'okusiiba', 'to fast', { altEn: ['fasting'] }],
    ['abajulizi', 'Abajulizi', 'Martyrs', { altEn: ['the martyrs', 'uganda martyrs'] }],
    ['omukisa', 'omukisa', 'blessing', { altEn: ['luck', 'a blessing', 'grace'] }],
    ['akuwe', 'akuwe', 'may he give you', { altEn: ['give you', 'may god give you'] }],
    ['omwaka-omuggya', 'omwaka omuggya', 'new year', { altEn: ['the new year'] }],
  ],
  sentences: [
    ['s30-tusaba-katonda', 'Tusaba Katonda buli lunaku.', 'We pray to God every day.', { altEn: ['We pray every day.'] }],
    ['s30-ssabbiiti-ekkanisa', 'Ku Ssabbiiti ŋŋenda mu kkanisa.', 'On Sunday I go to church.', { altLg: ['Ku Ssabbiiti ngenda mu kkanisa.'], altEn: ['On Sundays I go to church.', 'I go to church on Sunday.'] }],
    ['s30-lwakutaano-omuzigiti', 'Ku Lwakutaano agenda mu muzigiti.', 'On Friday he goes to the mosque.', { altEn: ['On Fridays she goes to the mosque.', 'On Friday she goes to the mosque.'] }],
    ['s30-nsaba-amazzi', 'Nsaba amazzi, nnyabo.', 'May I have some water, madam?', { altEn: ['I ask for water, madam.', 'Please may I have water, madam?', 'Water please, madam.'] }],
    ['s30-bbayibuli-kulaani', 'Bbayibuli ne Kulaani.', 'The Bible and the Quran.'],
    ['s30-ssekukkulu-ennungi', 'Ssekukkulu ennungi!', 'Happy Christmas!', { altEn: ['Merry Christmas!'] }],
    ['s30-omwaka-omuggya', 'Omwaka omuggya omulungi!', 'Happy New Year!', { altEn: ['A good new year!'] }],
    ['s30-paasika', 'Paasika ennungi!', 'Happy Easter!'],
    ['s30-iddi', 'Iddi ennungi!', 'Happy Eid!', { altEn: ['Eid Mubarak!'] }],
    ['s30-okusiiba', 'Mu Ramadaani tusiiba.', 'In Ramadan we fast.', { altEn: ['We fast during Ramadan.'] }],
    ['s30-abajulizi', 'Olunaku lw’Abajulizi luli ku 3 Ssebaaseka.', 'Martyrs Day is on 3 June.', { altLg: ['Olunaku lwAbajulizi luli ku 3 Ssebaaseka.'], altEn: ['Martyrs Day is the third of June.', 'Martyrs’ Day is on 3 June.'] }],
    ['s30-katonda-akuwe-omukisa', 'Katonda akuwe omukisa!', 'God bless you!', { altEn: ['May God bless you!', 'May God give you blessings!'] }],
    ['s30-amiina', 'Amiina.', 'Amen.'],
  ],
  skills: [
    {
      id: 'u30s1',
      title: 'Church and mosque',
      icon: 'home',
      lessons: [
        { id: 'u30s1l1', newWords: ['katonda', 'okusaba'], sentences: ['s30-tusaba-katonda', 's30-ssabbiiti-ekkanisa'] },
        { id: 'u30s1l2', newWords: ['nsaba'], sentences: ['s30-nsaba-amazzi', 's30-lwakutaano-omuzigiti'] },
        { id: 'u30s1l3', newWords: ['bbayibuli', 'kulaani'], sentences: ['s30-bbayibuli-kulaani', 's30-lwakutaano-omuzigiti'] },
      ],
    },
    {
      id: 'u30s2',
      title: 'Holidays',
      icon: 'gem',
      tip: 'holiday-greetings',
      lessons: [
        { id: 'u30s2l1', newWords: ['ssekukkulu', 'omwaka-omuggya'], sentences: ['s30-ssekukkulu-ennungi', 's30-omwaka-omuggya'] },
        { id: 'u30s2l2', newWords: ['paasika', 'iddi', 'okusiiba'], sentences: ['s30-paasika', 's30-iddi', 's30-okusiiba'] },
        { id: 'u30s2l3', newWords: ['abajulizi'], sentences: ['s30-abajulizi', 's30-ssekukkulu-ennungi'] },
      ],
    },
    {
      id: 'u30s3',
      title: 'Blessings',
      icon: 'heart',
      lessons: [
        { id: 'u30s3l1', newWords: ['omukisa', 'akuwe'], sentences: ['s30-katonda-akuwe-omukisa'] },
        { id: 'u30s3l2', newWords: ['amiina'], sentences: ['s30-amiina', 's30-katonda-akuwe-omukisa'] },
        {
          id: 'u30s3l3',
          newWords: [],
          sentences: ['s30-iddi', 's30-omwaka-omuggya', 's30-tusaba-katonda'],
          dialogues: [
            {
              speaker: 'mukasa',
              line: 'Ssekukkulu ennungi!',
              translation: 'Happy Christmas!',
              options: ['Naawe, Ssekukkulu ennungi!', 'Nkkuse.', 'Sitegeera omupiira.'],
              answer: 'Naawe, Ssekukkulu ennungi!',
            },
          ],
        },
      ],
    },
  ],
};
