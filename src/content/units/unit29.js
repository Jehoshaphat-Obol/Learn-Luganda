/*
 * Unit 29: Music and dance. Ganda drums and instruments, songs and dances,
 * and relative clauses ("the people who sing") with the initial vowel.
 */
export default {
  id: 'u29',
  title: 'Music and dance',
  description: 'Drums, songs and dances, and describing people by what they do.',
  color: 'lilac',
  character: 'amara',
  words: [
    ['engoma', 'engoma', 'drum', { altEn: ['drums', 'the drum'] }],
    ['okukuba', 'okukuba', 'to beat', { altEn: ['to play', 'to hit', 'to strike', 'beating'], notes: 'Okukuba engoma: to play the drum.' }],
    ['endingidi', 'endingidi', 'tube fiddle', { altEn: ['fiddle', 'the endingidi'] }],
    ['amadinda', 'amadinda', 'xylophone', { altEn: ['the xylophone', 'amadinda'] }],
    ['ennanga', 'ennanga', 'harp', { altEn: ['the harp', 'bow harp'] }],
    ['oluyimba', 'oluyimba', 'song', { altEn: ['a song', 'the song'] }],
    ['omuyimbi', 'omuyimbi', 'singer', { altEn: ['musician', 'a singer', 'the singer'] }],
    ['amazina', 'amazina', 'dance', { altEn: ['dances', 'dancing', 'the dance'] }],
    ['bakisimba', 'Bakisimba', 'Bakisimba', { altEn: ['bakisimba dance', 'royal dance'], notes: 'The best-known Ganda dance.' }],
    ['abayimba', 'abayimba', 'who sing', { altEn: ['that sing', 'singing', 'who are singing'], notes: 'Relative: abantu abayimba, the people who sing.' }],
    ['abazina', 'abazina', 'who dance', { altEn: ['that dance', 'dancing', 'who are dancing'] }],
    ['akuba', 'akuba', 'who plays', { altEn: ['plays', 'who beats', 'beats', 'who is playing'] }],
    ['kinyuma', 'kinyuma', 'it’s fun', { altEn: ['it is fun', 'it’s enjoyable', 'it is enjoyable', 'fun', 'enjoyable'] }],
  ],
  sentences: [
    ['s29-kuba-engoma', 'Kuba engoma!', 'Play the drum!', { altEn: ['Beat the drum!'] }],
    ['s29-njagala-okukuba-engoma', 'Njagala okukuba engoma.', 'I want to play the drum.', { altEn: ['I like playing the drum.', 'I like to play the drums.'] }],
    ['s29-endingidi', 'Endingidi n’amadinda.', 'The tube fiddle and the xylophone.', { altLg: ['Endingidi namadinda.'], altEn: ['Fiddle and xylophone.'] }],
    ['s29-ennanga', 'Ennanga nnungi nnyo.', 'The harp is very beautiful.', { altEn: ['The harp is very nice.', 'The harp sounds very good.'] }],
    ['s29-oluyimba-lwe', 'Oluyimba luno lulungi.', 'This song is good.', { altEn: ['This song is nice.', 'This song is beautiful.'] }],
    ['s29-omuyimbi', 'Omuyimbi ayimba bulungi.', 'The singer sings well.', { altEn: ['The singer is singing well.'] }],
    ['s29-amazina-kinyuma', 'Amazina gano ganyuma!', 'This dance is fun!', { altEn: ['These dances are fun!', 'This dancing is fun!'] }],
    ['s29-bakisimba', 'Tuzina Bakisimba.', 'We dance Bakisimba.', { altEn: ['We are dancing Bakisimba.'] }],
    ['s29-abantu-abayimba', 'Abantu abayimba bangi.', 'The people who are singing are many.', { altEn: ['There are many people singing.', 'Many people are singing.'] }],
    ['s29-abaana-abazina', 'Abaana abazina basanyuse.', 'The children who are dancing are happy.', { altEn: ['The dancing children are happy.'] }],
    ['s29-omusajja-akuba', 'Omusajja akuba engoma ye taata.', 'The man who plays the drum is father.', { altEn: ['The man playing the drum is father.', 'The man who plays the drum is my father.', 'The man playing the drum is dad.'] }],
    ['s29-kinyuma', 'Kinyuma nnyo!', 'It’s great fun!', { altEn: ['It is very enjoyable!', 'It’s very fun!', 'It is a lot of fun!'] }],
  ],
  skills: [
    {
      id: 'u29s1',
      title: 'Drums',
      icon: 'speaker',
      lessons: [
        { id: 'u29s1l1', newWords: ['engoma', 'okukuba'], sentences: ['s29-kuba-engoma', 's29-njagala-okukuba-engoma'] },
        { id: 'u29s1l2', newWords: ['endingidi', 'amadinda'], sentences: ['s29-endingidi'] },
        { id: 'u29s1l3', newWords: ['ennanga'], sentences: ['s29-ennanga', 's29-endingidi'] },
      ],
    },
    {
      id: 'u29s2',
      title: 'Songs and dances',
      icon: 'star',
      lessons: [
        { id: 'u29s2l1', newWords: ['oluyimba', 'omuyimbi'], sentences: ['s29-oluyimba-lwe', 's29-omuyimbi'] },
        { id: 'u29s2l2', newWords: ['amazina', 'kinyuma'], sentences: ['s29-amazina-kinyuma', 's29-kinyuma'] },
        { id: 'u29s2l3', newWords: ['bakisimba'], sentences: ['s29-bakisimba', 's29-amazina-kinyuma'] },
      ],
    },
    {
      id: 'u29s3',
      title: 'Who does what',
      icon: 'profile',
      tip: 'relatives',
      lessons: [
        { id: 'u29s3l1', newWords: ['abayimba', 'abazina'], sentences: ['s29-abantu-abayimba', 's29-abaana-abazina'] },
        { id: 'u29s3l2', newWords: ['akuba'], sentences: ['s29-omusajja-akuba'] },
        {
          id: 'u29s3l3',
          newWords: [],
          sentences: ['s29-abantu-abayimba', 's29-omusajja-akuba', 's29-kinyuma'],
          dialogues: [
            {
              speaker: 'amara',
              line: 'Omusajja akuba engoma y’ani?',
              translation: 'Who is the man playing the drum?',
              options: ['Ye taata wange!', 'Engoma nnene.', 'Mwebale okujja.'],
              answer: 'Ye taata wange!',
            },
          ],
        },
      ],
    },
  ],
};
