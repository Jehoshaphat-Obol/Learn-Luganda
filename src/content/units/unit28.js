/*
 * Unit 28: Celebrations. The introduction ceremony (kwanjula), weddings
 * and birthdays, with wishes and congratulations.
 */
export default {
  id: 'u28',
  title: 'Celebrations',
  description: 'The kwanjula, weddings, birthdays and wishing people well.',
  color: 'blush',
  character: 'nakato',
  words: [
    ['kwanjula', 'kwanjula', 'introduction ceremony', { altEn: ['introduction', 'the kwanjula'], notes: 'When a bride introduces her groom to her family.' }],
    ['ssenga', 'ssenga', 'paternal aunt', { altEn: ['aunt', 'auntie', 'father’s sister'] }],
    ['omukolo', 'omukolo', 'ceremony', { altEn: ['function', 'event', 'party'] }],
    ['ekirabo', 'ekirabo', 'gift', { altEn: ['present', 'a gift', 'the gift'] }],
    ['embaga', 'embaga', 'wedding', { altEn: ['the wedding', 'a wedding'] }],
    ['omugole', 'omugole', 'bride', { altEn: ['groom', 'the bride', 'bridegroom', 'newlywed'] }],
    ['kulika', 'Kulika!', 'Congratulations!', { altEn: ['well done', 'congrats'] }],
    ['okujaguza', 'okujaguza', 'to celebrate', { altEn: ['celebrating', 'to rejoice'] }],
    ['tujaguze', 'Tujaguze!', 'Let’s celebrate!', { altEn: ['let us celebrate', 'let’s party'] }],
    ['amazaalibwa', 'amazaalibwa', 'birthday', { altEn: ['the birthday', 'birth'] }],
    ['nkwagaliza', 'Nkwagaliza', 'I wish you', { altEn: ['i want for you'] }],
    ['keeki', 'keeki', 'cake', { altEn: ['the cake', 'a cake'] }],
    ['mwebale-okujja', 'Mwebale okujja', 'Thank you for coming', { altEn: ['thanks for coming', 'thank you all for coming'], notes: 'To several people.' }],
  ],
  sentences: [
    ['s28-kwanjula-ku-lwamukaaga', 'Kwanjula eri ku Lwamukaaga.', 'The introduction is on Saturday.', { altEn: ['The kwanjula is on Saturday.'] }],
    ['s28-ssenga', 'Ssenga ayamba omugole.', 'The aunt helps the bride.', { altEn: ['Auntie helps the bride.', 'The paternal aunt helps the bride.'] }],
    ['s28-omukolo-mulungi', 'Omukolo mulungi nnyo!', 'The ceremony is very nice!', { altEn: ['The function is very good!', 'The event is very nice!'] }],
    ['s28-ekirabo', 'Ndeese ekirabo.', 'I have brought a gift.', { altEn: ['I brought a gift.', 'I have brought a present.'] }],
    ['s28-embaga', 'Embaga ejja kuba mu kkanisa.', 'The wedding will be in church.', { altEn: ['The wedding will be at the church.'] }],
    ['s28-kulika-omugole', 'Kulika, mugole!', 'Congratulations, bride!', { altEn: ['Congratulations to the bride!', 'Congratulations, groom!'] }],
    ['s28-tujaguze', 'Tujaguze awamu!', 'Let’s celebrate together!', { altEn: ['Let us celebrate together!'] }],
    ['s28-amazaalibwa', 'Leero mazaalibwa gange.', 'Today is my birthday.', { altEn: ['It’s my birthday today.', 'It is my birthday today.'] }],
    ['s28-nkwagaliza', 'Nkwagaliza amazaalibwa amalungi!', 'Happy birthday!', { altEn: ['I wish you a happy birthday!', 'I wish you a good birthday!'] }],
    ['s28-keeki', 'Keeki eno nnungi nnyo.', 'This cake is very nice.', { altEn: ['This cake is very good.', 'This cake is delicious.'] }],
    ['s28-mwebale-okujja', 'Mwebale okujja!', 'Thank you for coming!', { altEn: ['Thanks for coming, everyone!', 'Thank you all for coming!'] }],
  ],
  skills: [
    {
      id: 'u28s1',
      title: 'Kwanjula',
      icon: 'heart',
      tip: 'kwanjula',
      lessons: [
        { id: 'u28s1l1', newWords: ['kwanjula', 'ssenga'], sentences: ['s28-kwanjula-ku-lwamukaaga', 's28-ssenga'] },
        { id: 'u28s1l2', newWords: ['omukolo', 'ekirabo'], sentences: ['s28-omukolo-mulungi', 's28-ekirabo'] },
        { id: 'u28s1l3', newWords: ['mwebale-okujja'], sentences: ['s28-mwebale-okujja', 's28-omukolo-mulungi'] },
      ],
    },
    {
      id: 'u28s2',
      title: 'Weddings',
      icon: 'star',
      lessons: [
        { id: 'u28s2l1', newWords: ['embaga', 'omugole'], sentences: ['s28-embaga', 's28-ssenga'] },
        { id: 'u28s2l2', newWords: ['kulika'], sentences: ['s28-kulika-omugole'] },
        { id: 'u28s2l3', newWords: ['okujaguza', 'tujaguze'], sentences: ['s28-tujaguze', 's28-kulika-omugole'] },
      ],
    },
    {
      id: 'u28s3',
      title: 'Birthdays',
      icon: 'gem',
      tip: 'wishes',
      lessons: [
        { id: 'u28s3l1', newWords: ['amazaalibwa', 'nkwagaliza'], sentences: ['s28-amazaalibwa', 's28-nkwagaliza'] },
        { id: 'u28s3l2', newWords: ['keeki'], sentences: ['s28-keeki', 's28-nkwagaliza'] },
        {
          id: 'u28s3l3',
          newWords: [],
          sentences: ['s28-amazaalibwa', 's28-tujaguze', 's28-ekirabo'],
          dialogues: [
            {
              speaker: 'nakato',
              line: 'Leero mazaalibwa gange!',
              translation: 'Today is my birthday!',
              options: ['Nkwagaliza amazaalibwa amalungi!', 'Bambi!', 'Ndi mu kkubo.'],
              answer: 'Nkwagaliza amazaalibwa amalungi!',
            },
          ],
        },
      ],
    },
  ],
};
