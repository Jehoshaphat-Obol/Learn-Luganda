/*
 * Unit 37: News and community. The news, community meetings, giving your
 * opinion, and reporting what people say with nti (that).
 */
export default {
  id: 'u37',
  title: 'News and community',
  description: 'Follow the news, speak at a meeting and give your opinion.',
  color: 'sky',
  character: 'mukasa',
  words: [
    ['amawulire', 'amawulire', 'news', { altEn: ['the news'] }],
    ['owulidde', 'Owulidde', 'Have you heard', { altEn: ['did you hear', 'you have heard'] }],
    ['leediyo', 'leediyo', 'radio', { altEn: ['the radio'] }],
    ['nti', 'nti', 'that', { notes: 'Introduces what someone says or thinks: agamba nti…' }],
    ['agamba', 'agamba', 'he says', { altEn: ['she says', 'he/she says', 'says'] }],
    ['bagamba', 'bagamba', 'they say', { altEn: ['people say'] }],
    ['olukiiko', 'olukiiko', 'meeting', { altEn: ['council', 'the meeting', 'assembly'] }],
    ['ssentebe', 'ssentebe', 'chairperson', { altEn: ['chairman', 'chair', 'the chairperson'] }],
    ['ndowooza', 'Ndowooza', 'I think', { altEn: ['i believe', 'i suppose'] }],
    ['endowooza', 'endowooza', 'opinion', { altEn: ['idea', 'view', 'thought', 'the opinion'] }],
    ['nzikiriza', 'Nzikiriza', 'I agree', { altEn: ['i accept', 'i believe'] }],
    ['sikkiriza', 'Sikkiriza', 'I don’t agree', { altEn: ['i disagree', 'i do not agree', 'i don’t accept'] }],
  ],
  sentences: [
    ['s37-owulidde-amawulire', 'Owulidde amawulire?', 'Have you heard the news?', { altEn: ['Did you hear the news?'] }],
    ['s37-ku-leediyo', 'Mpulidde ku leediyo.', 'I heard it on the radio.', { altEn: ['I have heard it on the radio.', 'I heard on the radio.'] }],
    ['s37-agamba-nti', 'Agamba nti enkuba ejja.', 'He says that rain is coming.', { altEn: ['She says that rain is coming.', 'He says rain is coming.', 'She says the rain is coming.'] }],
    ['s37-bagamba-nti', 'Bagamba nti ekkubo eriggya liwedde.', 'They say that the new road is finished.', { altEn: ['People say the new road is finished.', 'They say the new road is complete.'] }],
    ['s37-olukiiko', 'Olukiiko luli ku Lwamukaaga.', 'The meeting is on Saturday.'],
    ['s37-ssentebe', 'Ssentebe ayogera mu lukiiko.', 'The chairperson speaks at the meeting.', { altEn: ['The chairman is speaking at the meeting.', 'The chairperson is speaking in the meeting.'] }],
    ['s37-ndowooza-nti', 'Ndowooza nti kirungi.', 'I think that it is good.', { altEn: ['I think it is good.', 'I think it’s good.'] }],
    ['s37-endowooza-yo', 'Endowooza yo ki?', 'What is your opinion?', { altEn: ['What do you think?', 'What’s your opinion?'] }],
    ['s37-nzikiriza', 'Nzikiriza naawe.', 'I agree with you.'],
    ['s37-sikkiriza', 'Sikkiriza. Ndowooza nti si kirungi.', 'I don’t agree. I think it isn’t good.', { altEn: ['I disagree. I think it’s not good.', 'I do not agree. I think that it is not good.'] }],
  ],
  skills: [
    {
      id: 'u37s1',
      title: 'Headlines',
      icon: 'speaker',
      lessons: [
        { id: 'u37s1l1', newWords: ['amawulire', 'owulidde', 'leediyo'], sentences: ['s37-owulidde-amawulire', 's37-ku-leediyo'] },
        { id: 'u37s1l2', newWords: ['nti', 'agamba'], sentences: ['s37-agamba-nti'] },
        { id: 'u37s1l3', newWords: ['bagamba'], sentences: ['s37-bagamba-nti', 's37-agamba-nti'] },
      ],
    },
    {
      id: 'u37s2',
      title: 'Meetings',
      icon: 'profile',
      tip: 'reported-speech',
      lessons: [
        { id: 'u37s2l1', newWords: ['olukiiko', 'ssentebe'], sentences: ['s37-olukiiko', 's37-ssentebe'] },
        { id: 'u37s2l2', newWords: [], sentences: ['s37-ssentebe', 's37-bagamba-nti', 's37-owulidde-amawulire'] },
        {
          id: 'u37s2l3',
          newWords: [],
          sentences: ['s37-olukiiko', 's37-agamba-nti'],
          dialogues: [
            {
              speaker: 'mukasa',
              line: 'Owulidde amawulire?',
              translation: 'Have you heard the news?',
              options: ['Yee! Bagamba nti ekkubo eriggya liwedde.', 'Nnandyagadde caayi.', 'Olwatuuka olwali olumu.'],
              answer: 'Yee! Bagamba nti ekkubo eriggya liwedde.',
            },
          ],
        },
      ],
    },
    {
      id: 'u37s3',
      title: 'Giving opinions',
      icon: 'info',
      lessons: [
        { id: 'u37s3l1', newWords: ['ndowooza', 'endowooza'], sentences: ['s37-ndowooza-nti', 's37-endowooza-yo'] },
        { id: 'u37s3l2', newWords: ['nzikiriza', 'sikkiriza'], sentences: ['s37-nzikiriza', 's37-sikkiriza'] },
        {
          id: 'u37s3l3',
          newWords: [],
          sentences: ['s37-endowooza-yo', 's37-nzikiriza', 's37-ndowooza-nti'],
          dialogues: [
            {
              speaker: 'mukasa',
              line: 'Ndowooza nti tusimbe emiti ku kyalo. Endowooza yo ki?',
              translation: 'I think we should plant trees in the village. What is your opinion?',
              options: ['Nzikiriza naawe!', 'Owulidde ku leediyo?', 'Nkkuse.'],
              answer: 'Nzikiriza naawe!',
            },
          ],
        },
      ],
    },
  ],
};
