/*
 * Unit 23: On the phone. Calling, messages and meeting up, with object
 * markers inside the verb: -ku- (you), -mu- (him, her), n- (me).
 */
export default {
  id: 'u23',
  title: 'On the phone',
  description: 'Make calls, send messages and arrange to meet.',
  color: 'lilac',
  character: 'nakato',
  words: [
    ['essimu', 'essimu', 'phone', { altEn: ['telephone', 'the phone', 'mobile', 'phone call'] }],
    ['halo', 'Halo', 'Hello', { altEn: ['hallo', 'hi'], notes: 'Used to answer the phone.' }],
    ['ani-ayogera', 'Ani ayogera?', 'Who is speaking?', { altEn: ['who’s speaking', 'who is this', 'who is calling'] }],
    ['nkukubira', 'nkukubira', 'I call you', { altEn: ['i’ll call you', 'i am calling you', 'i phone you'], notes: 'n- (I) + -ku- (you) + kubira (call). Use with essimu.' }],
    ['nkubira', 'Nkubira', 'Call me', { altEn: ['phone me', 'ring me'], notes: 'n- here means “me”.' }],
    ['mmukubira', 'mmukubira', 'I call him', { altEn: ['i call her', 'i’ll call him', 'i’ll call her'], notes: '-mu- means him or her.' }],
    ['sikuwulira', 'Sikuwulira', 'I can’t hear you', { altEn: ['i cannot hear you', 'i don’t hear you', 'i do not hear you'] }],
    ['obubaka', 'obubaka', 'message', { altEn: ['a message', 'text', 'the message', 'news'] }],
    ['mpeereza', 'Mpeereza', 'Send me', { altEn: ['send to me'] }],
    ['nnamba', 'nnamba', 'number', { altEn: ['phone number', 'the number'] }],
    ['tusisinkane', 'Tusisinkane', 'Let’s meet', { altEn: ['let us meet', 'we should meet'] }],
    ['nkulinze', 'Nkulinze', 'I’m waiting for you', { altEn: ['i am waiting for you', 'i’m waiting'] }],
    ['ndi-mu-kkubo', 'Ndi mu kkubo', 'I’m on the way', { altEn: ['i am on the way', 'i’m on my way', 'i am on my way'] }],
  ],
  sentences: [
    ['s23-halo', 'Halo? Ani ayogera?', 'Hello? Who is speaking?', { altEn: ['Hello? Who’s speaking?', 'Hello? Who is this?'] }],
    ['s23-nze-nakato-ayogera', 'Nze Nakato ayogera.', 'It’s Nakato speaking.', { altEn: ['This is Nakato speaking.', 'Nakato speaking.', 'It is Nakato speaking.'] }],
    ['s23-nja-kukukubira', 'Nja kukukubira essimu enkya.', 'I will call you tomorrow.', { altEn: ['I’ll call you tomorrow.', 'I will phone you tomorrow.'] }],
    ['s23-nkubira-ekiro', 'Nkubira essimu ekiro.', 'Call me at night.', { altEn: ['Call me tonight.', 'Phone me in the evening.'] }],
    ['s23-mmukubira', 'Mmukubira essimu buli lunaku.', 'I call her every day.', { altEn: ['I call him every day.', 'I phone her every day.'] }],
    ['s23-sikuwulira', 'Sikuwulira bulungi. Ddamu.', 'I can’t hear you well. Repeat.', { altEn: ['I cannot hear you well. Repeat.', 'I can’t hear you well. Say it again.'] }],
    ['s23-mpeereza-obubaka', 'Mpeereza obubaka.', 'Send me a message.', { altEn: ['Send me a text.'] }],
    ['s23-mpa-nnamba', 'Mpa nnamba yo.', 'Give me your number.', { altEn: ['Give me your phone number.'] }],
    ['s23-tusisinkane', 'Tusisinkane ku ssaawa nnya.', 'Let’s meet at ten o’clock.', { altEn: ['Let us meet at ten o’clock.', 'Let’s meet at ten.'] }],
    ['s23-nkulinze', 'Nkulinze ku siteegi.', 'I’m waiting for you at the stage.', { altEn: ['I am waiting for you at the stage.'] }],
    ['s23-ndi-mu-kkubo', 'Ndi mu kkubo, nzija!', 'I’m on the way, I’m coming!', { altEn: ['I am on the way, I am coming!', 'I’m on my way, I’m coming!'] }],
  ],
  skills: [
    {
      id: 'u23s1',
      title: 'Calling',
      icon: 'speaker',
      tip: 'object-markers',
      lessons: [
        { id: 'u23s1l1', newWords: ['essimu', 'halo', 'ani-ayogera'], sentences: ['s23-halo', 's23-nze-nakato-ayogera'] },
        { id: 'u23s1l2', newWords: ['nkukubira', 'nkubira'], sentences: ['s23-nja-kukukubira', 's23-nkubira-ekiro'] },
        { id: 'u23s1l3', newWords: ['mmukubira', 'sikuwulira'], sentences: ['s23-mmukubira', 's23-sikuwulira'] },
      ],
    },
    {
      id: 'u23s2',
      title: 'Messages',
      icon: 'stories',
      lessons: [
        { id: 'u23s2l1', newWords: ['obubaka', 'mpeereza'], sentences: ['s23-mpeereza-obubaka'] },
        { id: 'u23s2l2', newWords: ['nnamba'], sentences: ['s23-mpa-nnamba', 's23-mpeereza-obubaka'] },
        {
          id: 'u23s2l3',
          newWords: [],
          sentences: ['s23-nja-kukukubira', 's23-mpa-nnamba', 's23-halo'],
          dialogues: [
            {
              speaker: 'nakato',
              line: 'Halo? Ani ayogera?',
              translation: 'Hello? Who is speaking?',
              options: ['Nze Ssali. Oli otya, Nakato?', 'Ndi mu kkubo.', 'Sirina ssente.'],
              answer: 'Nze Ssali. Oli otya, Nakato?',
            },
          ],
        },
      ],
    },
    {
      id: 'u23s3',
      title: 'Meeting up',
      icon: 'clock',
      lessons: [
        { id: 'u23s3l1', newWords: ['tusisinkane'], sentences: ['s23-tusisinkane'] },
        { id: 'u23s3l2', newWords: ['nkulinze', 'ndi-mu-kkubo'], sentences: ['s23-nkulinze', 's23-ndi-mu-kkubo'] },
        {
          id: 'u23s3l3',
          newWords: [],
          sentences: ['s23-tusisinkane', 's23-ndi-mu-kkubo', 's23-sikuwulira'],
          dialogues: [
            {
              speaker: 'nakato',
              line: 'Oli wa? Nkulinze!',
              translation: 'Where are you? I’m waiting for you!',
              options: ['Nsonyiwa, ndi mu kkubo. Nzija!', 'Tusisinkane jjo.', 'Mpa ekkalaamu.'],
              answer: 'Nsonyiwa, ndi mu kkubo. Nzija!',
            },
          ],
        },
      ],
    },
  ],
};
