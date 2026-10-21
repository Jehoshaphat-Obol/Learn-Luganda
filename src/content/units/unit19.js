/*
 * Unit 19: What I did. The perfect for things done today (-dde, -ze, -ye)
 * and the far past with na- for yesterday and before.
 */
export default {
  id: 'u19',
  title: 'What I did',
  description: 'Say what you’ve done today, what you did yesterday and long ago.',
  color: 'sage',
  character: 'nakato',
  words: [
    ['ndidde', 'Ndidde', 'I have eaten', { altEn: ['i’ve eaten', 'i ate'], notes: 'Today’s past. From -lya, to eat.' }],
    ['nnywedde', 'Nnywedde', 'I have drunk', { altEn: ['i’ve drunk', 'i drank'] }],
    ['olidde', 'Olidde?', 'Have you eaten?', { altEn: ['did you eat', 'you have eaten'] }],
    ['nkoze', 'Nkoze', 'I have worked', { altEn: ['i’ve worked', 'i have done', 'i’ve done', 'i worked', 'i did'] }],
    ['nsomye', 'Nsomye', 'I have read', { altEn: ['i’ve read', 'i have studied', 'i’ve studied', 'i read', 'i studied'] }],
    ['mmaze', 'Mmaze', 'I have finished', { altEn: ['i’ve finished', 'i’m done', 'i am done', 'i finished'] }],
    ['nnagenda', 'Nnagenda', 'I went', { altEn: ['i had gone'], notes: 'Far past: yesterday or earlier.' }],
    ['nnalya', 'Nnalya', 'I ate', { altEn: ['i had eaten'], notes: 'Far past.' }],
    ['nnasoma', 'Nnasoma', 'I studied', { altEn: ['i read', 'i learned', 'i learnt'] }],
    ['twagenda', 'twagenda', 'we went', { altEn: ['we had gone'] }],
    ['yagenda', 'yagenda', 'he went', { altEn: ['she went', 'he/she went'] }],
    ['nnali', 'Nnali', 'I was', { altEn: ['i used to be'] }],
    ['edda', 'edda', 'long ago', { altEn: ['in the past', 'a long time ago', 'formerly'] }],
    ['wiiki-ewedde', 'wiiki ewedde', 'last week', { altEn: ['the past week'] }],
    ['omwaka-oguwedde', 'omwaka oguwedde', 'last year', { altEn: ['the past year'] }],
    ['nkyali', 'nkyali', 'I am still', { altEn: ['still', 'i’m still'] }],
  ],
  sentences: [
    ['s19-ndidde-matooke', 'Ndidde matooke.', 'I have eaten matooke.', { altEn: ['I ate matooke.', 'I’ve eaten matooke.'] }],
    ['s19-nnywedde-caayi', 'Nnywedde caayi.', 'I have drunk tea.', { altEn: ['I drank tea.', 'I’ve had tea.', 'I have had tea.'] }],
    ['s19-olidde', 'Olidde? Yee, ndidde.', 'Have you eaten? Yes, I have eaten.', { altEn: ['Have you eaten? Yes, I have.', 'Did you eat? Yes, I ate.'] }],
    ['s19-nkoze-nnyo', 'Leero nkoze nnyo.', 'Today I have worked hard.', { altEn: ['I have worked hard today.', 'I worked hard today.', 'Today I worked a lot.'] }],
    ['s19-nsomye-ekitabo', 'Nsomye ekitabo.', 'I have read the book.', { altEn: ['I read the book.', 'I’ve read the book.'] }],
    ['s19-mmaze', 'Mmaze omulimu gwange.', 'I have finished my work.', { altEn: ['I finished my work.', 'I’ve finished my work.', 'I have finished my job.'] }],
    ['s19-jjo-nnagenda', 'Jjo nnagenda mu kibuga.', 'Yesterday I went to town.', { altEn: ['I went to town yesterday.', 'Yesterday I went into town.'] }],
    ['s19-jjo-nnalya', 'Jjo nnalya ennyama.', 'Yesterday I ate meat.', { altEn: ['I ate meat yesterday.'] }],
    ['s19-nnasoma', 'Nnasoma Olungereza ku ssomero.', 'I studied English at school.', { altEn: ['I learned English at school.', 'I learnt English at school.'] }],
    ['s19-twagenda-jinja', 'Wiiki ewedde twagenda e Jinja.', 'Last week we went to Jinja.', { altEn: ['We went to Jinja last week.'] }],
    ['s19-yagenda-awaka', 'Maama yagenda awaka.', 'Mother went home.', { altEn: ['Mum went home.', 'My mother went home.'] }],
    ['s19-edda-nnali', 'Edda nnali muyizi.', 'Long ago I was a student.', { altEn: ['I used to be a student.', 'In the past I was a student.'] }],
    ['s19-omwaka-oguwedde', 'Omwaka oguwedde nnali mu Masaka.', 'Last year I was in Masaka.', { altEn: ['I was in Masaka last year.'] }],
    ['s19-nkyali-muyizi', 'Nkyali muyizi.', 'I am still a student.', { altEn: ['I’m still a student.'] }],
  ],
  skills: [
    {
      id: 'u19s1',
      title: 'Today so far',
      icon: 'check',
      tip: 'perfect',
      lessons: [
        { id: 'u19s1l1', newWords: ['ndidde', 'nnywedde', 'olidde'], sentences: ['s19-ndidde-matooke', 's19-nnywedde-caayi', 's19-olidde'] },
        { id: 'u19s1l2', newWords: ['nkoze', 'nsomye'], sentences: ['s19-nkoze-nnyo', 's19-nsomye-ekitabo'] },
        { id: 'u19s1l3', newWords: ['mmaze'], sentences: ['s19-mmaze', 's19-olidde', 's19-nkoze-nnyo'] },
      ],
    },
    {
      id: 'u19s2',
      title: 'Yesterday',
      icon: 'clock',
      tip: 'far-past',
      lessons: [
        { id: 'u19s2l1', newWords: ['nnagenda', 'nnalya'], sentences: ['s19-jjo-nnagenda', 's19-jjo-nnalya'] },
        { id: 'u19s2l2', newWords: ['nnasoma', 'twagenda'], sentences: ['s19-nnasoma', 's19-twagenda-jinja'] },
        { id: 'u19s2l3', newWords: ['yagenda', 'wiiki-ewedde'], sentences: ['s19-yagenda-awaka', 's19-twagenda-jinja'] },
      ],
    },
    {
      id: 'u19s3',
      title: 'Long ago',
      icon: 'book',
      lessons: [
        { id: 'u19s3l1', newWords: ['nnali', 'edda'], sentences: ['s19-edda-nnali'] },
        { id: 'u19s3l2', newWords: ['omwaka-oguwedde', 'nkyali'], sentences: ['s19-omwaka-oguwedde', 's19-nkyali-muyizi'] },
        {
          id: 'u19s3l3',
          newWords: [],
          sentences: ['s19-jjo-nnagenda', 's19-mmaze', 's19-edda-nnali'],
          dialogues: [
            {
              speaker: 'nakato',
              line: 'Jjo wakola ki?',
              translation: 'What did you do yesterday?',
              options: ['Nnagenda mu kibuga.', 'Nja kugenda enkya.', 'Sirya nnyama.'],
              answer: 'Nnagenda mu kibuga.',
            },
          ],
        },
      ],
    },
  ],
};
