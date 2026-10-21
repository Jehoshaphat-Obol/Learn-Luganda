/*
 * Unit 5: Time and days. Today and tomorrow, parts of the day, the days
 * of the week and telling the time the Ugandan way.
 */
export default {
  id: 'u5',
  title: 'Time and days',
  description: 'Talk about today, the days of the week and the time.',
  color: 'sky',
  character: 'amara',
  words: [
    ['leero', 'leero', 'today'],
    ['enkya', 'enkya', 'tomorrow', { notes: 'Enkya is also “morning”. Context tells you which.' }],
    ['jjo', 'jjo', 'yesterday', { notes: 'Jjo can also mean the day after tomorrow, or the day before yesterday; context decides.' }],
    ['olunaku', 'olunaku', 'day', { altEn: ['the day', 'a day'] }],
    ['wiiki', 'wiiki', 'week', { altEn: ['the week', 'a week'] }],
    ['omwezi', 'omwezi', 'month', { altEn: ['the month', 'moon'] }],
    ['omwaka', 'omwaka', 'year', { altEn: ['the year', 'a year'] }],
    ['makya', 'ku makya', 'in the morning', { altEn: ['morning', 'this morning'] }],
    ['olweggulo', 'olweggulo', 'in the afternoon', { altEn: ['afternoon', 'evening', 'in the evening'] }],
    ['ekiro', 'ekiro', 'at night', { altEn: ['night', 'the night'] }],
    ['bbalaza', 'Bbalaza', 'Monday'],
    ['lwakubiri', 'Lwakubiri', 'Tuesday'],
    ['lwakusatu', 'Lwakusatu', 'Wednesday'],
    ['lwakuna', 'Lwakuna', 'Thursday'],
    ['lwakutaano', 'Lwakutaano', 'Friday'],
    ['lwamukaaga', 'Lwamukaaga', 'Saturday'],
    ['ssabbiiti', 'Ssabbiiti', 'Sunday'],
    ['essaawa', 'essaawa', 'hour', { altEn: ['clock', 'watch', 'time', 'the time'] }],
    ['ssaawa-mmeka', 'Ssaawa mmeka?', 'What time is it?', { altEn: ['what’s the time', 'what is the time'] }],
    ['ssaawa-emu', 'ssaawa emu', 'seven o’clock', { altEn: ['7 o’clock', '7:00', 'seven'], notes: 'Ugandan time starts at 7: “hour one” is 7 o’clock.' }],
    ['ssaawa-nnya', 'ssaawa nnya', 'ten o’clock', { altEn: ['10 o’clock', '10:00', 'ten'] }],
    ['ssaawa-mukaaga', 'ssaawa mukaaga', 'twelve o’clock', { altEn: ['12 o’clock', '12:00', 'noon', 'midday', 'midnight'] }],
  ],
  sentences: [
    ['s-nsoma-leero', 'Nsoma leero.', 'I am studying today.', { altEn: ['I study today.', 'I’m studying today.'] }],
    ['s-tunaalabagana-enkya', 'Tunaalabagana enkya.', 'See you tomorrow.', { altEn: ['We will see each other tomorrow.'] }],
    ['s-buli-lunaku', 'Njiga Oluganda buli lunaku.', 'I learn Luganda every day.', { altEn: ['I am learning Luganda every day.'], notes: 'buli = every' }],
    ['s-nnywa-caayi-ku-makya', 'Nnywa caayi ku makya.', 'I drink tea in the morning.'],
    ['s-ndya-olweggulo', 'Ndya matooke olweggulo.', 'I eat matooke in the afternoon.', { altEn: ['I eat matooke in the evening.'] }],
    ['s-nsoma-ekiro', 'Nsoma ekitabo ekiro.', 'I read a book at night.', { altEn: ['I read the book at night.'] }],
    ['s-ku-bbalaza', 'Nsoma ku Bbalaza.', 'I study on Monday.', { altEn: ['I study on Mondays.'] }],
    ['s-ku-lwakutaano', 'Tunaalabagana ku Lwakutaano.', 'See you on Friday.', { altEn: ['We will see each other on Friday.'] }],
    ['s-ssaawa-mmeka', 'Ssaawa mmeka?', 'What time is it?', { altEn: ['What’s the time?'] }],
    ['s-ssaawa-nnya', 'Ssaawa nnya.', 'It’s ten o’clock.', { altEn: ['It is ten o’clock.', 'Ten o’clock.'] }],
    ['s-ssaawa-emu-ku-makya', 'Ssaawa emu ku makya.', 'Seven in the morning.', { altEn: ['Seven o’clock in the morning.', '7 in the morning.'] }],
  ],
  skills: [
    {
      id: 'u5s1',
      title: 'Today and tomorrow',
      icon: 'clock',
      lessons: [
        { id: 'u5s1l1', newWords: ['leero', 'enkya', 'jjo', 'olunaku'], sentences: ['s-nsoma-leero', 's-tunaalabagana-enkya', 's-buli-lunaku'] },
        { id: 'u5s1l2', newWords: ['wiiki', 'omwezi', 'omwaka', 'makya', 'olweggulo', 'ekiro'], sentences: ['s-nnywa-caayi-ku-makya', 's-ndya-olweggulo', 's-nsoma-ekiro'] },
      ],
    },
    {
      id: 'u5s2',
      title: 'Days of the week',
      icon: 'star',
      tip: 'days',
      lessons: [
        { id: 'u5s2l1', newWords: ['bbalaza', 'lwakubiri', 'lwakusatu', 'lwakuna'], sentences: ['s-ku-bbalaza'] },
        { id: 'u5s2l2', newWords: ['lwakutaano', 'lwamukaaga', 'ssabbiiti'], sentences: ['s-ku-lwakutaano', 's-ku-bbalaza'] },
      ],
    },
    {
      id: 'u5s3',
      title: 'Telling the time',
      icon: 'target',
      tip: 'ugandan-time',
      lessons: [
        { id: 'u5s3l1', newWords: ['essaawa', 'ssaawa-mmeka', 'ssaawa-emu'], sentences: ['s-ssaawa-mmeka', 's-ssaawa-emu-ku-makya'] },
        {
          id: 'u5s3l2',
          newWords: ['ssaawa-nnya', 'ssaawa-mukaaga'],
          sentences: ['s-ssaawa-nnya', 's-ssaawa-mmeka', 's-nnywa-caayi-ku-makya'],
          dialogues: [
            {
              speaker: 'amara',
              line: 'Ssaawa mmeka?',
              translation: 'What time is it?',
              options: ['Ssaawa nnya.', 'Ssente nkumi bbiri.', 'Ku Bbalaza.'],
              answer: 'Ssaawa nnya.',
            },
          ],
        },
      ],
    },
  ],
};
