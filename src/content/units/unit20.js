/*
 * Unit 20: Plans. The near future with ja ku- (nja kugenda), the far
 * future with li- (ndigenda), and time words for what's ahead.
 */
export default {
  id: 'u20',
  title: 'Plans',
  description: 'Talk about tomorrow, the weekend and your dreams.',
  color: 'blush',
  character: 'ssali',
  words: [
    ['nja', 'nja', 'I will', { altEn: ['i’ll', 'i am going to'], notes: 'nja + ku- verb: nja kugenda, I will go.' }],
    ['kugenda', 'kugenda', 'go', { altEn: ['to go'], notes: 'The ku- form after nja: nja kugenda.' }],
    ['tujja', 'tujja', 'we will', { altEn: ['we’ll', 'we are going to', 'we are coming'] }],
    ['ajja', 'ajja', 'he will', { altEn: ['she will', 'he’ll', 'she’ll', 'he is coming', 'she is coming'] }],
    ['awamu', 'awamu', 'together', { altEn: ['with each other'] }],
    ['wiikendi', 'wiikendi', 'weekend', { altEn: ['the weekend'] }],
    ['wiiki-ejja', 'wiiki ejja', 'next week', { altEn: ['the coming week'] }],
    ['omwaka-ogujja', 'omwaka ogujja', 'next year', { altEn: ['the coming year'] }],
    ['okukyalira', 'okukyalira', 'to visit', { altEn: ['visit', 'to go and see'] }],
    ['ndigenda', 'Ndigenda', 'I will go', { altEn: ['i’ll go', 'i shall go'], notes: 'Far future: someday, not soon.' }],
    ['ndyogera', 'Ndyogera', 'I will speak', { altEn: ['i’ll speak', 'i shall speak'] }],
    ['olunaku-lumu', 'olunaku lumu', 'one day', { altEn: ['someday', 'some day'] }],
    ['nsuubira', 'Nsuubira', 'I hope', { altEn: ['i expect', 'i am hoping'] }],
    ['oteekateeka-ki', 'Oteekateeka ki?', 'What are you planning?', { altEn: ['what are your plans', 'what do you plan', 'what are you preparing'] }],
  ],
  sentences: [
    ['s20-nja-kugenda-masaka', 'Enkya nja kugenda e Masaka.', 'Tomorrow I will go to Masaka.', { altEn: ['I will go to Masaka tomorrow.', 'Tomorrow I’m going to Masaka.', 'I’m going to Masaka tomorrow.'] }],
    ['s20-nja-kulya', 'Nja kulya matooke.', 'I will eat matooke.', { altEn: ['I’ll eat matooke.', 'I am going to eat matooke.'] }],
    ['s20-tujja-kusoma', 'Tujja kusoma awamu.', 'We will study together.', { altEn: ['We’ll study together.', 'We are going to study together.'] }],
    ['s20-ajja-kujja', 'Nakato ajja kujja enkya.', 'Nakato will come tomorrow.', { altEn: ['Nakato is coming tomorrow.', 'Nakato will come tomorrow.'] }],
    ['s20-wiikendi', 'Ku wiikendi nja kukyalira jjajja.', 'At the weekend I will visit grandparent.', { altEn: ['At the weekend I will visit grandma.', 'On the weekend I will visit grandpa.', 'This weekend I will visit my grandparent.', 'At the weekend I’ll visit grandma.'] }],
    ['s20-wiiki-ejja', 'Wiiki ejja tujja kugenda e Jinja.', 'Next week we will go to Jinja.', { altEn: ['We will go to Jinja next week.', 'Next week we’re going to Jinja.'] }],
    ['s20-omwaka-ogujja', 'Omwaka ogujja nja kusoma ssaayansi.', 'Next year I will study science.', { altEn: ['I will study science next year.'] }],
    ['s20-olunaku-lumu-ndigenda', 'Olunaku lumu ndigenda e Buganda.', 'One day I will go to Buganda.', { altEn: ['Someday I will go to Buganda.', 'One day I’ll go to Buganda.'] }],
    ['s20-ndyogera-oluganda', 'Olunaku lumu ndyogera Oluganda bulungi.', 'One day I will speak Luganda well.', { altEn: ['Someday I will speak Luganda well.', 'One day I’ll speak Luganda well.'] }],
    ['s20-nsuubira', 'Nsuubira okulaba Kabaka.', 'I hope to see the Kabaka.', { altEn: ['I hope to see the king.'] }],
    ['s20-oteekateeka-ki', 'Oteekateeka ki ku wiikendi?', 'What are you planning for the weekend?', { altEn: ['What are your plans for the weekend?', 'What are you planning at the weekend?'] }],
  ],
  skills: [
    {
      id: 'u20s1',
      title: 'Tomorrow',
      icon: 'arrow',
      tip: 'near-future',
      lessons: [
        { id: 'u20s1l1', newWords: ['nja', 'kugenda'], sentences: ['s20-nja-kugenda-masaka', 's20-nja-kulya'] },
        { id: 'u20s1l2', newWords: ['tujja', 'awamu'], sentences: ['s20-tujja-kusoma'] },
        { id: 'u20s1l3', newWords: ['ajja'], sentences: ['s20-ajja-kujja', 's20-nja-kugenda-masaka'] },
      ],
    },
    {
      id: 'u20s2',
      title: 'This weekend',
      icon: 'star',
      lessons: [
        { id: 'u20s2l1', newWords: ['wiikendi', 'okukyalira'], sentences: ['s20-wiikendi'] },
        { id: 'u20s2l2', newWords: ['wiiki-ejja', 'omwaka-ogujja'], sentences: ['s20-wiiki-ejja', 's20-omwaka-ogujja'] },
        {
          id: 'u20s2l3',
          newWords: ['oteekateeka-ki'],
          sentences: ['s20-oteekateeka-ki', 's20-wiikendi'],
          dialogues: [
            {
              speaker: 'ssali',
              line: 'Oteekateeka ki ku wiikendi?',
              translation: 'What are you planning for the weekend?',
              options: ['Nja kukyalira jjajja.', 'Jjo nnagenda e Jinja.', 'Simanyi omusota.'],
              answer: 'Nja kukyalira jjajja.',
            },
          ],
        },
      ],
    },
    {
      id: 'u20s3',
      title: 'Someday',
      icon: 'trophy',
      tip: 'far-future',
      lessons: [
        { id: 'u20s3l1', newWords: ['ndigenda', 'olunaku-lumu'], sentences: ['s20-olunaku-lumu-ndigenda'] },
        { id: 'u20s3l2', newWords: ['ndyogera', 'nsuubira'], sentences: ['s20-ndyogera-oluganda', 's20-nsuubira'] },
        { id: 'u20s3l3', newWords: [], sentences: ['s20-ndyogera-oluganda', 's20-wiiki-ejja', 's20-ajja-kujja', 's20-olunaku-lumu-ndigenda'] },
      ],
    },
  ],
};
