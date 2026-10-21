/*
 * Unit 18: Asking questions. Question words come at the end of the
 * sentence in Luganda: ki, ani, wa, ddi, lwaki, mmeka.
 */
export default {
  id: 'u18',
  title: 'Asking questions',
  description: 'Ask who, what, where, when and why, and ask about words.',
  color: 'butter',
  character: 'emma',
  words: [
    ['ki', 'ki', 'what', { altEn: ['which'], notes: 'Comes after the verb: Oyagala ki?' }],
    ['kiki', 'kiki', 'what is it', { altEn: ['what', 'what is'], notes: 'Kino kiki? What is this?' }],
    ['ekyo', 'ekyo', 'that', { altEn: ['that one', 'that thing'], notes: 'For eki- things. Kino is “this”.' }],
    ['oyo', 'oyo', 'that person', { altEn: ['that', 'that one', 'he', 'she'], notes: 'Ani oyo? Who is that?' }],
    ['wa', 'wa', 'where', { notes: 'Comes after the verb: Ogenda wa?' }],
    ['oli-wa', 'Oli wa?', 'Where are you?', { altEn: ['where are you now'] }],
    ['ddi', 'ddi', 'when', { notes: 'Ojja ddi? When are you coming?' }],
    ['ojja', 'ojja', 'you are coming', { altEn: ['you come', 'are you coming'] }],
    ['lwaki', 'lwaki', 'why', { altEn: ['for what reason'] }],
    ['kubanga', 'kubanga', 'because', { altEn: ['since', 'as'] }],
    ['oba', 'oba', 'or', { altEn: ['whether', 'maybe', 'perhaps'] }],
    ['okwogera', 'okwogera', 'to speak', { altEn: ['speaking', 'to talk', 'talking'] }],
    ['njogera', 'Njogera', 'I speak', { altEn: ['i talk', 'i am speaking'] }],
    ['oyogera', 'Oyogera', 'You speak', { altEn: ['do you speak', 'you talk', 'you are speaking'] }],
    ['katono', 'katono', 'a little', { altEn: ['a bit', 'little', 'slightly'] }],
    ['kiyitibwa', 'kiyitibwa', 'it is called', { altEn: ['is called', 'it’s called'] }],
    ['kitya', 'kitya', 'how', { altEn: ['what', 'how is it'], notes: 'For eki- things: kiyitibwa kitya? what is it called?' }],
  ],
  sentences: [
    ['s18-oyagala-ki', 'Oyagala ki leero?', 'What do you want today?'],
    ['s18-kino-kiki', 'Kino kiki?', 'What is this?', { altEn: ['What’s this?'] }],
    ['s18-ekyo-kiki', 'Ekyo kiki?', 'What is that?', { altEn: ['What’s that?'] }],
    ['s18-ani-oyo', 'Ani oyo?', 'Who is that?', { altEn: ['Who’s that?'] }],
    ['s18-ekitabo-kiri-wa', 'Ekitabo kyange kiri wa?', 'Where is my book?', { altEn: ['Where’s my book?'] }],
    ['s18-oli-wa', 'Oli wa kati?', 'Where are you now?'],
    ['s18-ojja-ddi', 'Ojja ddi?', 'When are you coming?', { altEn: ['When will you come?', 'When do you come?'] }],
    ['s18-njija-enkya', 'Nzija enkya.', 'I am coming tomorrow.', { altEn: ['I’m coming tomorrow.', 'I will come tomorrow.', 'I come tomorrow.'] }],
    ['s18-lwaki-osoma', 'Lwaki osoma Oluganda?', 'Why are you learning Luganda?', { altEn: ['Why do you study Luganda?', 'Why do you learn Luganda?'] }],
    ['s18-kubanga', 'Kubanga njagala okwogera n’abantu.', 'Because I want to speak with people.', { altLg: ['Kubanga njagala okwogera nabantu.'], altEn: ['Because I want to talk to people.', 'Because I want to talk with people.'] }],
    ['s18-caayi-oba-kaawa', 'Caayi oba kaawa?', 'Tea or coffee?'],
    ['s18-oyogera-oluganda', 'Oyogera Oluganda?', 'Do you speak Luganda?', { altEn: ['You speak Luganda?'] }],
    ['s18-njogera-katono', 'Njogera katono.', 'I speak a little.', { altEn: ['I speak a bit.'] }],
    ['s18-kiyitibwa-kitya', 'Kino kiyitibwa kitya mu Luganda?', 'What is this called in Luganda?', { altEn: ['How do you say this in Luganda?', 'What’s this called in Luganda?'] }],
  ],
  skills: [
    {
      id: 'u18s1',
      title: 'Who and what',
      icon: 'info',
      tip: 'question-words',
      lessons: [
        { id: 'u18s1l1', newWords: ['ki', 'kiki'], sentences: ['s18-oyagala-ki', 's18-kino-kiki'] },
        { id: 'u18s1l2', newWords: ['ekyo', 'oyo'], sentences: ['s18-ekyo-kiki', 's18-ani-oyo'] },
        { id: 'u18s1l3', newWords: ['okwogera', 'njogera', 'oyogera', 'katono'], sentences: ['s18-oyogera-oluganda', 's18-njogera-katono'] },
      ],
    },
    {
      id: 'u18s2',
      title: 'Where and when',
      icon: 'clock',
      lessons: [
        { id: 'u18s2l1', newWords: ['wa', 'oli-wa'], sentences: ['s18-ekitabo-kiri-wa', 's18-oli-wa'] },
        { id: 'u18s2l2', newWords: ['ddi', 'ojja'], sentences: ['s18-ojja-ddi', 's18-njija-enkya'] },
        {
          id: 'u18s2l3',
          newWords: [],
          sentences: ['s18-oli-wa', 's18-ojja-ddi', 's18-ani-oyo'],
          dialogues: [
            {
              speaker: 'emma',
              line: 'Oli wa kati?',
              translation: 'Where are you now?',
              options: ['Ndi ku paaka. Nzija!', 'Simanyi Oluganda.', 'Kino kiki?'],
              answer: 'Ndi ku paaka. Nzija!',
            },
          ],
        },
      ],
    },
    {
      id: 'u18s3',
      title: 'Why and how',
      icon: 'target',
      tip: 'ask-about-words',
      lessons: [
        { id: 'u18s3l1', newWords: ['lwaki', 'kubanga'], sentences: ['s18-lwaki-osoma', 's18-kubanga'] },
        { id: 'u18s3l2', newWords: ['oba'], sentences: ['s18-caayi-oba-kaawa', 's18-oyagala-ki'] },
        {
          id: 'u18s3l3',
          newWords: ['kiyitibwa', 'kitya'],
          sentences: ['s18-kiyitibwa-kitya', 's18-kino-kiki'],
          dialogues: [
            {
              speaker: 'emma',
              line: 'Lwaki osoma Oluganda?',
              translation: 'Why are you learning Luganda?',
              options: ['Kubanga njagala okwogera ne jjajja wange.', 'Caayi oba kaawa?', 'Ojja ddi?'],
              answer: 'Kubanga njagala okwogera ne jjajja wange.',
            },
          ],
        },
      ],
    },
  ],
};
