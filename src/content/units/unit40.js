/*
 * Unit 40: Folktales. Wakayima the clever hare, the legend of Kintu and
 * Nnambi, and retelling a story and its lesson. The last unit.
 */
export default {
  id: 'u40',
  title: 'Folktales',
  description: 'Meet Wakayima the hare and Kintu, and tell a story’s lesson.',
  color: 'butter',
  character: 'amara',
  words: [
    ['wakayima', 'Wakayima', 'the hare', { altEn: ['hare', 'mr hare'], notes: 'The clever trickster of Ganda folktales.' }],
    ['omugezi', 'omugezi', 'clever', { altEn: ['wise', 'smart', 'a wise person'] }],
    ['yalimba', 'yalimba', 'tricked', { altEn: ['lied to', 'deceived', 'he tricked', 'she tricked'] }],
    ['akakodyo', 'akakodyo', 'trick', { altEn: ['a trick', 'the trick', 'plan'] }],
    ['kintu', 'Kintu', 'Kintu', { notes: 'The first man in the Ganda creation story.' }],
    ['nnambi', 'Nnambi', 'Nnambi', { altEn: ['nambi'], notes: 'Kintu’s wife, daughter of Ggulu (the sky).' }],
    ['walumbe', 'Walumbe', 'Death', { altEn: ['walumbe'], notes: 'Nnambi’s brother: death, in the legend.' }],
    ['yeerabira', 'yeerabira', 'forgot', { altEn: ['she forgot', 'he forgot'] }],
    ['obulo', 'obulo', 'millet', { altEn: ['the millet'] }],
    ['etuyigiriza', 'etuyigiriza', 'it teaches us', { altEn: ['teaches us'] }],
  ],
  sentences: [
    ['s40-wakayima-mugezi', 'Wakayima yali mugezi nnyo.', 'The hare was very clever.', { altEn: ['Hare was very clever.', 'The hare was very wise.'] }],
    ['s40-yalimba-enjovu', 'Wakayima yalimba enjovu.', 'The hare tricked the elephant.', { altEn: ['Hare tricked the elephant.', 'The hare deceived the elephant.'] }],
    ['s40-akakodyo', 'Yalina akakodyo.', 'He had a trick.', { altEn: ['He had a plan.', 'She had a trick.'] }],
    ['s40-kintu-eyasooka', 'Kintu ye muntu eyasooka.', 'Kintu was the first person.', { altEn: ['Kintu is the first person.', 'Kintu was the first man.'] }],
    ['s40-kintu-nnambi', 'Kintu yawasa Nnambi, muwala wa Ggulu.', 'Kintu married Nnambi, the daughter of Ggulu.', { altEn: ['Kintu married Nnambi, Ggulu’s daughter.', 'Kintu married Nambi, the daughter of Ggulu.'] }],
    ['s40-yeerabira-obulo', 'Nnambi yeerabira obulo bw’enkoko.', 'Nnambi forgot the chicken’s millet.', { altEn: ['Nnambi forgot the millet for the chicken.', 'Nambi forgot the chicken’s millet.'] }],
    ['s40-walumbe', 'Walumbe n’abagoberera.', 'And Death followed them.', { altEn: ['Death followed them.', 'Then Death followed them.'] }],
    ['s40-etuyigiriza-ki', 'Enfumo eno etuyigiriza ki?', 'What does this story teach us?', { altEn: ['What does this folktale teach us?', 'What is the lesson of this story?'] }],
    ['s40-etuyigiriza-nti', 'Etuyigiriza nti obugezi businga amaanyi.', 'It teaches us that wisdom beats strength.', { altEn: ['It teaches us that cleverness beats strength.', 'It teaches that wisdom is better than strength.'] }],
  ],
  skills: [
    {
      id: 'u40s1',
      title: 'Wakayima the hare',
      icon: 'stories',
      tip: 'wakayima',
      lessons: [
        { id: 'u40s1l1', newWords: ['wakayima', 'omugezi'], sentences: ['s40-wakayima-mugezi'] },
        { id: 'u40s1l2', newWords: ['yalimba', 'akakodyo'], sentences: ['s40-yalimba-enjovu', 's40-akakodyo'] },
        { id: 'u40s1l3', newWords: [], sentences: ['s40-wakayima-mugezi', 's40-yalimba-enjovu', 's40-akakodyo'] },
      ],
    },
    {
      id: 'u40s2',
      title: 'Kintu and Nnambi',
      icon: 'book',
      tip: 'kintu-legend',
      lessons: [
        { id: 'u40s2l1', newWords: ['kintu', 'nnambi'], sentences: ['s40-kintu-eyasooka', 's40-kintu-nnambi'] },
        { id: 'u40s2l2', newWords: ['yeerabira', 'obulo'], sentences: ['s40-yeerabira-obulo'] },
        { id: 'u40s2l3', newWords: ['walumbe'], sentences: ['s40-walumbe', 's40-yeerabira-obulo'] },
      ],
    },
    {
      id: 'u40s3',
      title: 'The lesson',
      icon: 'target',
      lessons: [
        { id: 'u40s3l1', newWords: ['etuyigiriza'], sentences: ['s40-etuyigiriza-ki', 's40-etuyigiriza-nti'] },
        { id: 'u40s3l2', newWords: [], sentences: ['s40-kintu-nnambi', 's40-etuyigiriza-ki', 's40-yalimba-enjovu'] },
        {
          id: 'u40s3l3',
          newWords: [],
          sentences: ['s40-etuyigiriza-nti', 's40-walumbe'],
          dialogues: [
            {
              speaker: 'amara',
              line: 'Wakayima yalimba enjovu. Enfumo eno etuyigiriza ki?',
              translation: 'The hare tricked the elephant. What does this story teach us?',
              options: ['Etuyigiriza nti obugezi businga amaanyi.', 'Mwasuze mutya?', 'Kubira poliisi essimu!'],
              answer: 'Etuyigiriza nti obugezi businga amaanyi.',
            },
          ],
        },
      ],
    },
  ],
};
