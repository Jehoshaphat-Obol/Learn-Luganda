/*
 * Unit 21: Feelings. How you feel, using stative perfect verbs
 * (nsanyuse, nkooye), and words of care for others.
 */
export default {
  id: 'u21',
  title: 'Feelings',
  description: 'Say how you feel and show care for others.',
  color: 'vermillion',
  character: 'amara',
  words: [
    ['nsanyuse', 'Nsanyuse', 'I am happy', { altEn: ['i’m happy', 'i am glad', 'i’m glad', 'i am pleased'] }],
    ['nnakuwadde', 'Nnakuwadde', 'I am sad', { altEn: ['i’m sad', 'i am unhappy', 'i’m upset'] }],
    ['oli-bulungi', 'Oli bulungi?', 'Are you okay?', { altEn: ['are you ok', 'are you alright', 'are you well', 'are you fine'] }],
    ['nneewuunya', 'Nneewuunya', 'I am surprised', { altEn: ['i’m surprised', 'i’m amazed', 'i am amazed', 'i wonder'] }],
    ['nkooye', 'Nkooye', 'I am tired', { altEn: ['i’m tired', 'i am exhausted', 'i’m exhausted'] }],
    ['ntidde', 'Ntidde', 'I am scared', { altEn: ['i’m scared', 'i am afraid', 'i’m afraid', 'i am frightened'] }],
    ['nneeraliikirira', 'Nneeraliikirira', 'I am worried', { altEn: ['i’m worried', 'i worry', 'i am anxious', 'i’m anxious'] }],
    ['nnyiize', 'Nnyiize', 'I am angry', { altEn: ['i’m angry', 'i am cross', 'i’m upset', 'i am mad'] }],
    ['ali-atya', 'Ali atya?', 'How is he?', { altEn: ['how is she', 'how is he doing', 'how is she doing', 'how are they'] }],
    ['bambi', 'Bambi', 'Sorry', { altEn: ['so sorry', 'poor thing', 'please'], notes: 'Sympathy: said when something bad happens to someone.' }],
    ['nsonyiwa', 'Nsonyiwa', 'Forgive me', { altEn: ['i’m sorry', 'excuse me', 'pardon me', 'sorry'], notes: 'An apology for something you did.' }],
    ['nkwagala', 'Nkwagala', 'I love you', { altEn: ['i like you'] }],
    ['nkusubwa', 'Nkusubwa', 'I miss you', { altEn: ['i’ve missed you', 'i have missed you'] }],
    ['mukwano-gwange', 'mukwano gwange', 'my friend', { altEn: ['friend', 'dear friend'] }],
    ['tokaaba', 'Tokaaba', 'Don’t cry', { altEn: ['do not cry', 'stop crying'] }],
  ],
  sentences: [
    ['s21-nsanyuse-nnyo', 'Nsanyuse nnyo leero!', 'I am very happy today!', { altEn: ['I’m very happy today!', 'I am so happy today!'] }],
    ['s21-lwaki-onakuwadde', 'Lwaki onakuwadde?', 'Why are you sad?', { altEn: ['Why are you unhappy?'] }],
    ['s21-oli-bulungi', 'Oli bulungi, mukwano gwange?', 'Are you okay, my friend?', { altEn: ['Are you alright, my friend?', 'Are you ok, my friend?'] }],
    ['s21-nneewuunya', 'Nneewuunya! Ojja leero?', 'I’m surprised! You’re coming today?', { altEn: ['I am surprised! Are you coming today?', 'What a surprise! You are coming today?'] }],
    ['s21-nkooye-nnyo', 'Nkooye nnyo. Nja kwebaka.', 'I am very tired. I will sleep.', { altEn: ['I’m very tired. I’m going to sleep.', 'I am very tired. I will go to sleep.'] }],
    ['s21-ntidde', 'Ntidde, eggulu libwatuka.', 'I’m scared, it’s thundering.', { altEn: ['I am scared, it is thundering.', 'I am afraid, there is thunder.'] }],
    ['s21-nneeraliikirira', 'Nneeraliikirira ekigezo.', 'I am worried about the exam.', { altEn: ['I’m worried about the exam.', 'I’m worried about the test.'] }],
    ['s21-nnyiize', 'Nnyiize kubanga ttakisi teyajja.', 'I am angry because the taxi didn’t come.', { altEn: ['I’m angry because the taxi did not come.'] }],
    ['s21-maama-ali-atya', 'Maama wo ali atya?', 'How is your mother?', { altEn: ['How’s your mother?', 'How is your mum?'] }],
    ['s21-bambi', 'Bambi! Wona mangu.', 'So sorry! Get well soon.', { altEn: ['Sorry! Get well soon.', 'Poor thing! Get well soon.'] }],
    ['s21-nsonyiwa', 'Nsonyiwa, nzize kikeerezi.', 'Forgive me, I have come late.', { altEn: ['Sorry, I am late.', 'Forgive me, I’m late.', 'I’m sorry, I came late.'] }],
    ['s21-nkwagala-maama', 'Nkwagala nnyo, Maama.', 'I love you very much, Mum.', { altEn: ['I love you so much, Mum.', 'I love you very much, Mother.'] }],
    ['s21-nkusubwa', 'Nkusubwa, mukwano gwange.', 'I miss you, my friend.', { altEn: ['I’ve missed you, my friend.'] }],
    ['s21-tokaaba', 'Tokaaba, mwana wange.', 'Don’t cry, my child.', { altEn: ['Do not cry, my child.'] }],
  ],
  skills: [
    {
      id: 'u21s1',
      title: 'Happy and sad',
      icon: 'heart',
      tip: 'feeling-verbs',
      lessons: [
        { id: 'u21s1l1', newWords: ['nsanyuse', 'nnakuwadde'], sentences: ['s21-nsanyuse-nnyo', 's21-lwaki-onakuwadde'] },
        { id: 'u21s1l2', newWords: ['oli-bulungi', 'mukwano-gwange'], sentences: ['s21-oli-bulungi'] },
        { id: 'u21s1l3', newWords: ['nneewuunya'], sentences: ['s21-nneewuunya', 's21-nsanyuse-nnyo'] },
      ],
    },
    {
      id: 'u21s2',
      title: 'Tired and worried',
      icon: 'flame',
      lessons: [
        { id: 'u21s2l1', newWords: ['nkooye', 'ntidde'], sentences: ['s21-nkooye-nnyo', 's21-ntidde'] },
        { id: 'u21s2l2', newWords: ['nneeraliikirira', 'nnyiize'], sentences: ['s21-nneeraliikirira', 's21-nnyiize'] },
        {
          id: 'u21s2l3',
          newWords: ['ali-atya'],
          sentences: ['s21-maama-ali-atya', 's21-nkooye-nnyo'],
          dialogues: [
            {
              speaker: 'amara',
              line: 'Oli bulungi? Olabika okooye.',
              translation: 'Are you okay? You look tired.',
              options: ['Yee, nkooye nnyo. Nkoze nnyo leero.', 'Nsanyuse okukulaba.', 'Tokaaba.'],
              answer: 'Yee, nkooye nnyo. Nkoze nnyo leero.',
            },
          ],
        },
      ],
    },
    {
      id: 'u21s3',
      title: 'Showing care',
      icon: 'star',
      tip: 'sorry',
      lessons: [
        { id: 'u21s3l1', newWords: ['bambi', 'nsonyiwa'], sentences: ['s21-bambi', 's21-nsonyiwa'] },
        { id: 'u21s3l2', newWords: ['nkwagala', 'nkusubwa'], sentences: ['s21-nkwagala-maama', 's21-nkusubwa'] },
        {
          id: 'u21s3l3',
          newWords: ['tokaaba'],
          sentences: ['s21-tokaaba', 's21-bambi'],
          dialogues: [
            {
              speaker: 'amara',
              line: 'Nnakuwadde. Jjajja mulwadde.',
              translation: 'I’m sad. Grandma is sick.',
              options: ['Bambi! Nja kumukyalira.', 'Nsanyuse nnyo!', 'Nnyiize.'],
              answer: 'Bambi! Nja kumukyalira.',
            },
          ],
        },
      ],
    },
  ],
};
