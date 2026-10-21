/*
 * Unit 39: Respect and etiquette. Kneeling greetings, the respectful
 * plural for one elder (Mwasuze mutya, Mwebale), and being a good guest.
 */
export default {
  id: 'u39',
  title: 'Respect and etiquette',
  description: 'Greet elders with respect and be a good guest.',
  color: 'lilac',
  character: 'jjajja',
  words: [
    ['okufukamira', 'okufukamira', 'to kneel', { altEn: ['kneeling', 'kneel'] }],
    ['abakadde', 'abakadde', 'elders', { altEn: ['old people', 'the elders'] }],
    ['ekitiibwa', 'ekitiibwa', 'respect', { altEn: ['honour', 'honor', 'dignity'] }],
    ['mwasuze', 'Mwasuze mutya?', 'Good morning (respectful)', { altEn: ['how did you sleep', 'good morning', 'how did you all sleep'], notes: 'Plural “you”, used for one elder out of respect.' }],
    ['mwebale', 'Mwebale', 'Thank you (respectful)', { altEn: ['thank you', 'thanks', 'thank you all'], notes: 'Plural “you”, used for one elder out of respect.' }],
    ['mwattu', 'mwattu', 'please', { altEn: ['kindly'] }],
    ['webale-okujja', 'Webale okujja', 'Thanks for coming', { altEn: ['thank you for coming', 'welcome'] }],
    ['omugenyi', 'omugenyi', 'guest', { altEn: ['visitor', 'the guest', 'a guest'] }],
    ['olyeko', 'Olyeko', 'Have some food', { altEn: ['eat a little', 'please eat', 'have something to eat'] }],
  ],
  sentences: [
    ['s39-bafukamira', 'Abaana bafukamira nga babuuza abakadde.', 'Children kneel when they greet elders.', { altEn: ['Children kneel when greeting elders.', 'The children kneel when they greet the elders.'] }],
    ['s39-mwasuze-ssebo', 'Mwasuze mutya, ssebo?', 'Good morning, sir.', { altEn: ['How did you sleep, sir?', 'Good morning, sir?'] }],
    ['s39-mwebale-nnyabo', 'Mwebale nnyo, nnyabo.', 'Thank you very much, madam.', { altEn: ['Thanks a lot, madam.', 'Thank you so much, madam.'] }],
    ['s39-ekitiibwa', 'Tulina okuwa abakadde ekitiibwa.', 'We must give elders respect.', { altEn: ['We have to respect elders.', 'We must respect the elders.', 'We have to give the elders respect.'] }],
    ['s39-mwattu', 'Mwattu, mpa amazzi.', 'Please give me water.', { altEn: ['Please give me some water.', 'Give me water, please.'] }],
    ['s39-webale-okujja', 'Webale okujja! Tusanyuse okukulaba.', 'Thanks for coming! We are happy to see you.', { altEn: ['Thank you for coming! We are happy to see you.', 'Thanks for coming! We’re glad to see you.'] }],
    ['s39-omugenyi', 'Omugenyi ye mukulu.', 'The guest is the important one.', { altEn: ['The guest comes first.', 'The guest is the most important.'], notes: 'A saying: guests are honoured above everyone.' }],
    ['s39-olyeko', 'Tuula, olyeko.', 'Sit down and have some food.', { altEn: ['Sit and eat a little.', 'Sit down, have something to eat.'] }],
    ['s39-yingira-otuule', 'Yingira otuule.', 'Come in and sit down.', { altEn: ['Come in and sit.', 'Come in and have a seat.'] }],
  ],
  skills: [
    {
      id: 'u39s1',
      title: 'Greeting elders',
      icon: 'star',
      tip: 'kneeling',
      lessons: [
        { id: 'u39s1l1', newWords: ['okufukamira', 'abakadde'], sentences: ['s39-bafukamira'] },
        { id: 'u39s1l2', newWords: ['mwasuze', 'mwebale'], sentences: ['s39-mwasuze-ssebo', 's39-mwebale-nnyabo'] },
        { id: 'u39s1l3', newWords: ['ekitiibwa'], sentences: ['s39-ekitiibwa', 's39-bafukamira'] },
      ],
    },
    {
      id: 'u39s2',
      title: 'Polite words',
      icon: 'heart',
      tip: 'respect-plural',
      lessons: [
        { id: 'u39s2l1', newWords: ['mwattu'], sentences: ['s39-mwattu', 's39-mwebale-nnyabo'] },
        { id: 'u39s2l2', newWords: [], sentences: ['s39-mwasuze-ssebo', 's39-ekitiibwa', 's39-mwattu'] },
        {
          id: 'u39s2l3',
          newWords: [],
          sentences: ['s39-mwebale-nnyabo'],
          dialogues: [
            {
              speaker: 'jjajja',
              line: 'Mwana wange, wasuze otya?',
              translation: 'My child, how did you sleep?',
              options: ['Bulungi, ssebo. Mwasuze mutya?', 'Nzikiriza naawe.', 'Yanguwa!'],
              answer: 'Bulungi, ssebo. Mwasuze mutya?',
            },
          ],
        },
      ],
    },
    {
      id: 'u39s3',
      title: 'Being a guest',
      icon: 'home',
      lessons: [
        { id: 'u39s3l1', newWords: ['webale-okujja'], sentences: ['s39-webale-okujja', 's39-yingira-otuule'] },
        { id: 'u39s3l2', newWords: ['omugenyi', 'olyeko'], sentences: ['s39-omugenyi', 's39-olyeko'] },
        {
          id: 'u39s3l3',
          newWords: [],
          sentences: ['s39-yingira-otuule', 's39-webale-okujja'],
          dialogues: [
            {
              speaker: 'jjajja',
              line: 'Webale okujja! Tuula, olyeko.',
              translation: 'Thanks for coming! Sit down and have some food.',
              options: ['Mwebale nnyo, ssebo.', 'Omubbi! Mumukwate!', 'Sikkiriza.'],
              answer: 'Mwebale nnyo, ssebo.',
            },
          ],
        },
      ],
    },
  ],
};
