/*
 * Unit 6: Places and directions. Places around town, going places, and
 * directions for a boda boda ride.
 */
export default {
  id: 'u6',
  title: 'Places and directions',
  description: 'Name places in town, say where you’re going and give directions.',
  color: 'lilac',
  character: 'ssali',
  words: [
    ['ekibuga', 'ekibuga', 'town', { altEn: ['city', 'the town', 'the city'] }],
    ['ekyalo', 'ekyalo', 'village', { altEn: ['the village', 'countryside'] }],
    ['essomero', 'essomero', 'school', { altEn: ['the school', 'a school'] }],
    ['eddwaliro', 'eddwaliro', 'hospital', { altEn: ['the hospital', 'clinic'] }],
    ['edduuka', 'edduuka', 'shop', { altEn: ['the shop', 'store'] }],
    ['ekkanisa', 'ekkanisa', 'church', { altEn: ['the church'] }],
    ['omuzigiti', 'omuzigiti', 'mosque', { altEn: ['the mosque'] }],
    ['awaka', 'awaka', 'home', { altEn: ['at home'] }],
    ['ngenda', 'Ŋŋenda', 'I am going', { altEn: ['i’m going', 'i go'], altLg: ['Ngenda', 'Nnenda'] }],
    ['ogenda-wa', 'Ogenda wa?', 'Where are you going?', { altEn: ['where do you go'] }],
    ['liri-wa', 'liri wa?', 'where is it?', { altEn: ['where is'], notes: 'For li- class nouns like eddwaliro and essomero.' }],
    ['ku-ddyo', 'ku ddyo', 'on the right', { altEn: ['right', 'to the right'] }],
    ['ku-kkono', 'ku kkono', 'on the left', { altEn: ['left', 'to the left'] }],
    ['butereevu', 'butereevu', 'straight ahead', { altEn: ['straight', 'straight on'] }],
    ['kyuka', 'Kyuka', 'Turn', { altEn: ['turn'] }],
    ['genda', 'Genda', 'Go', { altEn: ['go'] }],
    ['yimirira', 'Yimirira', 'Stop', { altEn: ['stop', 'stand'] }],
    ['wano', 'wano', 'here'],
    ['kumpi', 'kumpi', 'near', { altEn: ['nearby', 'close'] }],
    ['wala', 'wala', 'far', { altEn: ['far away'] }],
    ['ntwala', 'Ntwala', 'Take me', { altEn: ['take me'] }],
  ],
  sentences: [
    ['s-mbeera-mu-kibuga', 'Mbeera mu kibuga.', 'I live in town.', { altEn: ['I live in the city.', 'I stay in town.'] }],
    ['s-jjajja-ku-kyalo', 'Jjajja abeera ku kyalo.', 'Grandma lives in the village.', { altEn: ['Grandpa lives in the village.', 'My grandparent lives in the village.'], notes: 'a- means he or she: abeera, she lives.' }],
    ['s-ngenda-ku-ssomero', 'Ŋŋenda ku ssomero.', 'I am going to school.', { altLg: ['Ngenda ku ssomero.'], altEn: ['I’m going to school.', 'I go to school.'] }],
    ['s-ngenda-awaka', 'Ŋŋenda awaka.', 'I am going home.', { altLg: ['Ngenda awaka.'], altEn: ['I’m going home.', 'I go home.'] }],
    ['s-ngenda-ku-dduuka', 'Ŋŋenda ku dduuka.', 'I am going to the shop.', { altLg: ['Ngenda ku dduuka.'], altEn: ['I’m going to the shop.'] }],
    ['s-ogenda-wa', 'Ogenda wa?', 'Where are you going?'],
    ['s-eddwaliro-liri-wa', 'Eddwaliro liri wa?', 'Where is the hospital?'],
    ['s-essomero-liri-wa', 'Essomero liri wa?', 'Where is the school?'],
    ['s-kyuka-ku-ddyo', 'Kyuka ku ddyo.', 'Turn right.', { altEn: ['Turn to the right.'] }],
    ['s-kyuka-ku-kkono', 'Kyuka ku kkono.', 'Turn left.', { altEn: ['Turn to the left.'] }],
    ['s-genda-butereevu', 'Genda butereevu.', 'Go straight ahead.', { altEn: ['Go straight.', 'Go straight on.'] }],
    ['s-yimirira-wano', 'Yimirira wano.', 'Stop here.'],
    ['s-kiri-kumpi', 'Kiri kumpi.', 'It’s near.', { altEn: ['It is near.', 'It’s close.', 'It is close.'] }],
    ['s-kiri-wala', 'Kiri wala.', 'It’s far.', { altEn: ['It is far.', 'It’s far away.'] }],
    ['s-ntwala-mu-kibuga', 'Ntwala mu kibuga.', 'Take me to town.', { altEn: ['Take me to the city.', 'Take me into town.'] }],
  ],
  skills: [
    {
      id: 'u6s1',
      title: 'Around town',
      icon: 'home',
      lessons: [
        { id: 'u6s1l1', newWords: ['ekibuga', 'ekyalo', 'essomero', 'eddwaliro'], sentences: ['s-mbeera-mu-kibuga', 's-jjajja-ku-kyalo'] },
        { id: 'u6s1l2', newWords: ['edduuka', 'ekkanisa', 'omuzigiti', 'awaka'], sentences: ['s-mbeera-mu-kibuga'] },
      ],
    },
    {
      id: 'u6s2',
      title: 'Going places',
      icon: 'arrow',
      tip: 'going-to',
      lessons: [
        { id: 'u6s2l1', newWords: ['ngenda', 'ogenda-wa'], sentences: ['s-ngenda-ku-ssomero', 's-ngenda-awaka', 's-ogenda-wa'] },
        { id: 'u6s2l2', newWords: ['liri-wa', 'kumpi', 'wala'], sentences: ['s-eddwaliro-liri-wa', 's-essomero-liri-wa', 's-kiri-kumpi', 's-kiri-wala', 's-ngenda-ku-dduuka'] },
      ],
    },
    {
      id: 'u6s3',
      title: 'Directions',
      icon: 'target',
      lessons: [
        { id: 'u6s3l1', newWords: ['ku-ddyo', 'ku-kkono', 'butereevu', 'kyuka', 'genda'], sentences: ['s-kyuka-ku-ddyo', 's-kyuka-ku-kkono', 's-genda-butereevu'] },
        {
          id: 'u6s3l2',
          newWords: ['yimirira', 'wano', 'ntwala'],
          sentences: ['s-yimirira-wano', 's-ntwala-mu-kibuga', 's-genda-butereevu'],
          dialogues: [
            {
              speaker: 'ssali',
              line: 'Ogenda wa, nnyabo?',
              translation: 'Where are you going, madam?',
              options: ['Ntwala mu kibuga.', 'Kiwooma nnyo!', 'Ssaawa nnya.'],
              answer: 'Ntwala mu kibuga.',
            },
          ],
        },
      ],
    },
  ],
};
