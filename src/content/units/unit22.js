/*
 * Unit 22: Hobbies and sport. Free time, football, music and games, with
 * okunyumirwa (to enjoy) and linking words.
 */
export default {
  id: 'u22',
  title: 'Hobbies and sport',
  description: 'Talk about free time, football, music and games.',
  color: 'sky',
  character: 'ssali',
  words: [
    ['nnyumirwa', 'Nnyumirwa', 'I enjoy', { altEn: ['i like', 'i love', 'i am enjoying'] }],
    ['okudduka', 'okudduka', 'to run', { altEn: ['running', 'to jog'] }],
    ['okuwuga', 'okuwuga', 'to swim', { altEn: ['swimming'] }],
    ['era', 'era', 'and', { altEn: ['also', 'and also'], notes: 'Links two sentences or ideas.' }],
    ['omupiira', 'omupiira', 'football', { altEn: ['soccer', 'ball', 'the ball', 'the match'] }],
    ['nzannya', 'Nzannya', 'I play', { altEn: ['i am playing'] }],
    ['ttiimu', 'ttiimu', 'team', { altEn: ['the team', 'side'] }],
    ['goolo', 'goolo', 'goal', { altEn: ['a goal', 'the goal'] }],
    ['ewangudde', 'ewangudde', 'has won', { altEn: ['won', 'it has won', 'it won'], notes: 'For n- nouns like ttiimu.' }],
    ['awangudde', 'awangudde', 'has won', { altEn: ['won', 'he has won', 'she has won', 'who won'], notes: 'For a person: Ani awangudde? Who won?' }],
    ['okuyimba', 'okuyimba', 'to sing', { altEn: ['singing'] }],
    ['okuzina', 'okuzina', 'to dance', { altEn: ['dancing'] }],
    ['ennyimba', 'ennyimba', 'songs', { altEn: ['music', 'the songs'] }],
    ['omuzannyo', 'omuzannyo', 'game', { altEn: ['a game', 'play', 'sport'] }],
    ['omweso', 'omweso', 'omweso', { altEn: ['board game', 'mancala'], notes: 'A traditional board game played with seeds.' }],
  ],
  sentences: [
    ['s22-nnyumirwa-okusoma', 'Nnyumirwa okusoma ebitabo.', 'I enjoy reading books.', { altEn: ['I like reading books.', 'I love reading books.'] }],
    ['s22-ndduka-ku-makya', 'Nnyumirwa okudduka ku makya.', 'I enjoy running in the morning.', { altEn: ['I like running in the morning.', 'I like to run in the morning.'] }],
    ['s22-okuwuga', 'Njagala okuwuga mu nnyanja.', 'I like swimming in the lake.', { altEn: ['I want to swim in the lake.', 'I like to swim in the lake.'] }],
    ['s22-era', 'Nsoma, era nzannya.', 'I study, and I play.', { altEn: ['I read and I play.', 'I study and also play.'] }],
    ['s22-nzannya-omupiira', 'Nzannya omupiira ku Lwamukaaga.', 'I play football on Saturday.', { altEn: ['I play soccer on Saturday.', 'I play football on Saturdays.'] }],
    ['s22-ttiimu-yange', 'Ttiimu yange ewangudde!', 'My team has won!', { altEn: ['My team won!'] }],
    ['s22-goolo', 'Goolo! Goolo bbiri!', 'Goal! Two goals!'],
    ['s22-ani-awangudde', 'Ani awangudde?', 'Who has won?', { altEn: ['Who won?'] }],
    ['s22-okuyimba', 'Nnyumirwa okuyimba n’okuzina.', 'I enjoy singing and dancing.', { altLg: ['Nnyumirwa okuyimba nokuzina.'], altEn: ['I like singing and dancing.', 'I love singing and dancing.'] }],
    ['s22-ennyimba-za-luganda', 'Njagala ennyimba z’Oluganda.', 'I like Luganda songs.', { altLg: ['Njagala ennyimba zOluganda.'], altEn: ['I love Luganda songs.', 'I want Luganda songs.'] }],
    ['s22-omuzannyo', 'Omuzannyo gutandika ssaawa kkumi.', 'The game starts at four o’clock.', { altEn: ['The match starts at four o’clock.', 'The game starts at 4 pm.', 'The game starts at four.'] }],
    ['s22-omweso', 'Jjajja azannya omweso.', 'Grandparent plays omweso.', { altEn: ['Grandpa plays omweso.', 'Grandma plays omweso.', 'Grandparent is playing omweso.'] }],
  ],
  skills: [
    {
      id: 'u22s1',
      title: 'Free time',
      icon: 'star',
      tip: 'enjoy',
      lessons: [
        { id: 'u22s1l1', newWords: ['nnyumirwa', 'okudduka'], sentences: ['s22-nnyumirwa-okusoma', 's22-ndduka-ku-makya'] },
        { id: 'u22s1l2', newWords: ['okuwuga', 'era'], sentences: ['s22-okuwuga', 's22-era'] },
        {
          id: 'u22s1l3',
          newWords: [],
          sentences: ['s22-nnyumirwa-okusoma', 's22-era', 's22-okuwuga'],
          dialogues: [
            {
              speaker: 'ssali',
              line: 'Onyumirwa ki?',
              translation: 'What do you enjoy?',
              options: ['Nnyumirwa okudduka n’okuwuga.', 'Nkooye nnyo.', 'Simanyi omweso.'],
              answer: 'Nnyumirwa okudduka n’okuwuga.',
            },
          ],
        },
      ],
    },
    {
      id: 'u22s2',
      title: 'Football',
      icon: 'trophy',
      lessons: [
        { id: 'u22s2l1', newWords: ['omupiira', 'nzannya'], sentences: ['s22-nzannya-omupiira'] },
        { id: 'u22s2l2', newWords: ['ttiimu', 'goolo', 'ewangudde'], sentences: ['s22-ttiimu-yange', 's22-goolo'] },
        { id: 'u22s2l3', newWords: ['awangudde'], sentences: ['s22-ani-awangudde', 's22-ttiimu-yange'] },
      ],
    },
    {
      id: 'u22s3',
      title: 'Music and games',
      icon: 'speaker',
      lessons: [
        { id: 'u22s3l1', newWords: ['okuyimba', 'okuzina'], sentences: ['s22-okuyimba'] },
        { id: 'u22s3l2', newWords: ['ennyimba'], sentences: ['s22-ennyimba-za-luganda', 's22-okuyimba'] },
        { id: 'u22s3l3', newWords: ['omuzannyo', 'omweso'], sentences: ['s22-omuzannyo', 's22-omweso'] },
      ],
    },
  ],
};
