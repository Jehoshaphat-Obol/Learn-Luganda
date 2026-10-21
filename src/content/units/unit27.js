/*
 * Unit 27: Village and farming. The garden, crops and harvest, and the
 * applicative -ir-/-er- ("for, to, at") that extends a verb.
 */
export default {
  id: 'u27',
  title: 'Village and farming',
  description: 'Work the garden, name the crops and bring in the harvest.',
  color: 'sage',
  character: 'jjajja',
  words: [
    ['olusuku', 'olusuku', 'banana garden', { altEn: ['plantation', 'banana plantation', 'garden'] }],
    ['enkumbi', 'enkumbi', 'hoe', { altEn: ['the hoe', 'a hoe'] }],
    ['ndima', 'Ndima', 'I dig', { altEn: ['i farm', 'i cultivate', 'i am digging'] }],
    ['ensigo', 'ensigo', 'seeds', { altEn: ['seed', 'the seeds'] }],
    ['okusiga', 'okusiga', 'to plant', { altEn: ['to sow', 'planting', 'sowing'] }],
    ['kasooli', 'kasooli', 'maize', { altEn: ['corn', 'the maize'] }],
    ['ebinyeebwa', 'ebinyeebwa', 'groundnuts', { altEn: ['peanuts', 'the groundnuts'] }],
    ['emmwanyi', 'emmwanyi', 'coffee', { altEn: ['coffee beans', 'coffee plants'], notes: 'The crop. A cup of coffee is kaawa.' }],
    ['amakungula', 'amakungula', 'harvest', { altEn: ['the harvest', 'harvest time'] }],
    ['okukungula', 'okukungula', 'to harvest', { altEn: ['harvesting', 'to reap'] }],
    ['ndimira', 'Ndimira', 'I dig for', { altEn: ['i farm for', 'i dig in'], notes: 'Ndima + -ir-: for someone or somewhere.' }],
    ['nfumbira', 'Nfumbira', 'I cook for', { altEn: ['i am cooking for'] }],
    ['ntundira', 'Ntundira', 'I sell at', { altEn: ['i sell for', 'i sell in'] }],
    ['mpandiikira', 'Mpandiikira', 'I write to', { altEn: ['i write for'] }],
  ],
  sentences: [
    ['s27-olusuku-lwange', 'Olusuku lwange lunene.', 'My banana garden is big.', { altEn: ['My plantation is big.', 'My garden is big.'] }],
    ['s27-ndima-n-enkumbi', 'Ndima n’enkumbi ku makya.', 'I dig with a hoe in the morning.', { altLg: ['Ndima nenkumbi ku makya.'], altEn: ['I dig with the hoe in the morning.', 'I farm with a hoe in the morning.'] }],
    ['s27-okusiga-ensigo', 'Tusiga ensigo mu ttoggo.', 'We plant seeds in the rainy season.', { altEn: ['We sow seeds in the rainy season.'] }],
    ['s27-kasooli', 'Kasooli akuze bulungi.', 'The maize has grown well.', { altEn: ['The maize grew well.', 'The corn has grown well.'] }],
    ['s27-ebinyeebwa', 'Ntunda ebinyeebwa ne kasooli.', 'I sell groundnuts and maize.', { altEn: ['I sell peanuts and maize.', 'I sell groundnuts and corn.'] }],
    ['s27-emmwanyi', 'Emmwanyi ya Buganda nnungi nnyo.', 'Buganda’s coffee is very good.', { altEn: ['The coffee of Buganda is very good.'] }],
    ['s27-amakungula', 'Amakungula gatuuse!', 'The harvest has come!', { altEn: ['Harvest time has come!', 'The harvest is here!'] }],
    ['s27-okukungula', 'Enkya tujja kukungula ebinyeebwa.', 'Tomorrow we will harvest the groundnuts.', { altEn: ['We will harvest the groundnuts tomorrow.'] }],
    ['s27-ndimira-jjajja', 'Ndimira jjajja olusuku.', 'I dig the garden for grandparent.', { altEn: ['I dig the banana garden for grandma.', 'I dig the garden for my grandparent.', 'I dig the garden for grandpa.'] }],
    ['s27-nfumbira-abaana', 'Nfumbira abaana emmere.', 'I cook food for the children.', { altEn: ['I cook for the children.'] }],
    ['s27-ntundira-mu-katale', 'Ntundira emmwanyi mu katale.', 'I sell coffee at the market.', { altEn: ['I sell the coffee at the market.'] }],
    ['s27-mpandiikira-maama', 'Mpandiikira maama obubaka.', 'I write a message to mother.', { altEn: ['I write mum a message.', 'I write a message to my mother.'] }],
  ],
  skills: [
    {
      id: 'u27s1',
      title: 'The garden',
      icon: 'home',
      lessons: [
        { id: 'u27s1l1', newWords: ['olusuku', 'enkumbi', 'ndima'], sentences: ['s27-olusuku-lwange', 's27-ndima-n-enkumbi'] },
        { id: 'u27s1l2', newWords: ['ensigo', 'okusiga'], sentences: ['s27-okusiga-ensigo'] },
        { id: 'u27s1l3', newWords: [], sentences: ['s27-olusuku-lwange', 's27-okusiga-ensigo', 's27-ndima-n-enkumbi'] },
      ],
    },
    {
      id: 'u27s2',
      title: 'Crops',
      icon: 'star',
      lessons: [
        { id: 'u27s2l1', newWords: ['kasooli', 'ebinyeebwa'], sentences: ['s27-kasooli', 's27-ebinyeebwa'] },
        { id: 'u27s2l2', newWords: ['emmwanyi'], sentences: ['s27-emmwanyi', 's27-ebinyeebwa'] },
        { id: 'u27s2l3', newWords: ['amakungula', 'okukungula'], sentences: ['s27-amakungula', 's27-okukungula'] },
      ],
    },
    {
      id: 'u27s3',
      title: 'Doing it for someone',
      icon: 'heart',
      tip: 'applicative',
      lessons: [
        { id: 'u27s3l1', newWords: ['ndimira', 'nfumbira'], sentences: ['s27-ndimira-jjajja', 's27-nfumbira-abaana'] },
        { id: 'u27s3l2', newWords: ['ntundira', 'mpandiikira'], sentences: ['s27-ntundira-mu-katale', 's27-mpandiikira-maama'] },
        {
          id: 'u27s3l3',
          newWords: [],
          sentences: ['s27-ndimira-jjajja', 's27-amakungula', 's27-nfumbira-abaana'],
          dialogues: [
            {
              speaker: 'jjajja',
              line: 'Gyebale ko! Okola ki?',
              translation: 'Well done! What are you doing?',
              options: ['Ndimira jjajja olusuku.', 'Ndi wa Lugave.', 'Kabaka awangaale!'],
              answer: 'Ndimira jjajja olusuku.',
            },
          ],
        },
      ],
    },
  ],
};
