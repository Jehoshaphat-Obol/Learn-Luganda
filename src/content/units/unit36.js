/*
 * Unit 36: Proverbs. Well-known Ganda proverbs (engero), what they mean,
 * and how to bring one into conversation.
 */
export default {
  id: 'u36',
  title: 'Proverbs',
  description: 'Learn well-known Ganda proverbs, their meaning and when to use them.',
  color: 'vermillion',
  character: 'jjajja',
  words: [
    ['olugero', 'olugero', 'proverb', { altEn: ['saying', 'a proverb'] }],
    ['engero', 'engero', 'proverbs', { altEn: ['sayings', 'the proverbs'] }],
    ['amakulu', 'amakulu', 'meaning', { altEn: ['the meaning', 'sense'] }],
    ['kitegeeza', 'kitegeeza', 'it means', { altEn: ['means', 'it signifies'] }],
    ['nga-bwe-bagamba', 'nga bwe bagamba', 'as they say', { altEn: ['as people say', 'as the saying goes'] }],
    ['prov-kamu-kamu', 'Kamu kamu gwe muganda.', 'Little by little makes a bundle.', { altEn: ['one by one makes a bundle', 'bit by bit makes a bundle', 'little by little'], notes: 'Small steps add up. Like learning a language!' }],
    ['prov-akwata-mpola', 'Akwata empola atuuka wala.', 'Slow and steady goes far.', { altEn: ['he who goes slowly goes far', 'whoever goes slowly arrives far', 'slowly but surely'], notes: 'Patience wins.' }],
    ['prov-agali-awamu', 'Agali awamu ge galuma ennyama.', 'Teeth together bite the meat.', { altEn: ['unity is strength', 'together we are strong', 'the teeth that are together bite the meat'], notes: 'Unity is strength.' }],
    ['prov-olugalo-olumu', 'Olugalo olumu terutta nda.', 'One finger can’t kill a louse.', { altEn: ['one finger does not kill a louse', 'you can’t do it alone'], notes: 'You need others to get things done.' }],
    ['prov-atannayitaayita', 'Atannayitaayita y’atenda nnyina okufumba.', 'Who hasn’t travelled thinks mother cooks best.', { altEn: ['he who has not travelled praises his mother’s cooking', 'travel opens your eyes'], notes: 'Travel and you’ll see the world is wider.' }],
  ],
  sentences: [
    ['s36-olugero-luno', 'Olugero luno lutegeeza ki?', 'What does this proverb mean?', { altEn: ['What is the meaning of this proverb?'] }],
    ['s36-jjajja-amanyi-engero', 'Jjajja amanyi engero nnyingi.', 'Grandparent knows many proverbs.', { altEn: ['Grandma knows many proverbs.', 'Grandpa knows lots of proverbs.', 'My grandparent knows many proverbs.'] }],
    ['s36-amakulu', 'Njagala okumanya amakulu.', 'I want to know the meaning.', { altEn: ['I would like to know the meaning.'] }],
    ['s36-kitegeeza-okwegatta', 'Kitegeeza nti okwegatta maanyi.', 'It means unity is strength.', { altEn: ['It means that unity is strength.'] }],
    ['s36-kamu-kamu', 'Nga bwe bagamba, kamu kamu gwe muganda.', 'As they say, little by little makes a bundle.', { altEn: ['As the saying goes, little by little makes a bundle.'] }],
    ['s36-akwata-mpola', 'Totya. Akwata empola atuuka wala.', 'Don’t worry. Slow and steady goes far.', { altEn: ['Don’t be afraid. Slow and steady goes far.'] }],
    ['s36-agali-awamu', 'Tukolere wamu! Agali awamu ge galuma ennyama.', 'Let’s work together! Teeth together bite the meat.', { altEn: ['Let’s work together! Unity is strength.'] }],
    ['s36-olugalo-olumu', 'Nnyamba. Olugalo olumu terutta nda.', 'Help me. One finger can’t kill a louse.', { altEn: ['Help me. One finger does not kill a louse.'] }],
  ],
  skills: [
    {
      id: 'u36s1',
      title: 'Everyday proverbs',
      icon: 'book',
      tip: 'engero',
      lessons: [
        { id: 'u36s1l1', newWords: ['olugero', 'engero'], sentences: ['s36-jjajja-amanyi-engero', 's36-olugero-luno'] },
        { id: 'u36s1l2', newWords: ['prov-kamu-kamu'], sentences: ['s36-jjajja-amanyi-engero'] },
        { id: 'u36s1l3', newWords: ['prov-akwata-mpola'], sentences: ['s36-akwata-mpola'] },
      ],
    },
    {
      id: 'u36s2',
      title: 'Proverbs about people',
      icon: 'profile',
      lessons: [
        { id: 'u36s2l1', newWords: ['prov-agali-awamu'], sentences: ['s36-agali-awamu'] },
        { id: 'u36s2l2', newWords: ['prov-olugalo-olumu'], sentences: ['s36-olugalo-olumu', 's36-agali-awamu'] },
        { id: 'u36s2l3', newWords: ['prov-atannayitaayita'], sentences: ['s36-akwata-mpola', 's36-olugalo-olumu'] },
      ],
    },
    {
      id: 'u36s3',
      title: 'Using proverbs',
      icon: 'speaker',
      tip: 'using-proverbs',
      lessons: [
        { id: 'u36s3l1', newWords: ['amakulu', 'kitegeeza'], sentences: ['s36-amakulu', 's36-kitegeeza-okwegatta'] },
        { id: 'u36s3l2', newWords: ['nga-bwe-bagamba'], sentences: ['s36-kamu-kamu', 's36-olugero-luno'] },
        {
          id: 'u36s3l3',
          newWords: [],
          sentences: ['s36-kamu-kamu', 's36-agali-awamu', 's36-kitegeeza-okwegatta'],
          dialogues: [
            {
              speaker: 'jjajja',
              line: 'Oluganda luzibu. Nkooye!',
              translation: 'Luganda is hard. I’m tired!',
              options: ['Totya. Kamu kamu gwe muganda.', 'Olugalo olumu terutta nda.', 'Atannayitaayita y’atenda nnyina okufumba.'],
              answer: 'Totya. Kamu kamu gwe muganda.',
            },
          ],
        },
      ],
    },
  ],
};
