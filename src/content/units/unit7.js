/*
 * Unit 7: The home. Rooms and furniture, welcoming a visitor, and simple
 * requests around the house.
 */
export default {
  id: 'u7',
  title: 'The home',
  description: 'Rooms and furniture, welcoming guests and asking for things.',
  color: 'blush',
  character: 'jjajja',
  words: [
    ['ennyumba', 'ennyumba', 'house', { altEn: ['the house', 'a house', 'home'] }],
    ['ekisenge', 'ekisenge', 'room', { altEn: ['the room', 'a room'] }],
    ['effumbiro', 'effumbiro', 'kitchen', { altEn: ['the kitchen'] }],
    ['oluggi', 'oluggi', 'door', { altEn: ['the door'] }],
    ['eddirisa', 'eddirisa', 'window', { altEn: ['the window'] }],
    ['entebe', 'entebe', 'chair', { altEn: ['the chair', 'a chair', 'seat'] }],
    ['emmeeza', 'emmeeza', 'table', { altEn: ['the table', 'a table'] }],
    ['ettaala', 'ettaala', 'lamp', { altEn: ['the lamp', 'light', 'the light'] }],
    ['kkodi', 'Kkodi!', 'Knock knock!', { altEn: ['hello in there', 'is anyone home'], notes: 'Called out at a door instead of knocking.' }],
    ['yingira', 'Yingira', 'Come in', { altEn: ['come in', 'enter'] }],
    ['tuula', 'Tuula', 'Sit', { altEn: ['sit down', 'have a seat'] }],
    ['wansi', 'wansi', 'down', { altEn: ['below', 'on the floor'] }],
    ['tusanyuse', 'Tusanyuse', 'We are happy', { altEn: ['we are glad', 'we’re happy', 'we’re glad'] }],
    ['ggalawo', 'Ggalawo', 'Close', { altEn: ['shut'] }],
    ['ggulawo', 'Ggulawo', 'Open', { altEn: ['open'] }],
    ['ndeetera', 'Ndeetera', 'Bring me', { altEn: ['bring me', 'fetch me'] }],
    ['mpa', 'Mpa', 'Give me', { altEn: ['give me', 'pass me'] }],
    ['ssaako', 'Ssaako', 'Put on', { altEn: ['switch on', 'turn on'] }],
  ],
  sentences: [
    ['s-ennyumba-yange', 'Ennyumba yange.', 'My house.', { altEn: ['My home.'], notes: 'n- class nouns take yange.' }],
    ['s-ekisenge-kyange', 'Ekisenge kyange.', 'My room.'],
    ['s-maama-mu-ffumbiro', 'Maama ali mu ffumbiro.', 'Mother is in the kitchen.', { altEn: ['Mom is in the kitchen.', 'My mother is in the kitchen.'], notes: 'ali = he or she is (somewhere)' }],
    ['s-kkodi-yingira', 'Kkodi! Yingira!', 'Knock knock! Come in!', { altEn: ['Hello! Come in!'] }],
    ['s-tuula-wansi', 'Tuula wansi.', 'Sit down.', { altEn: ['Have a seat.', 'Please sit down.'] }],
    ['s-tuula-ku-ntebe', 'Tuula ku ntebe.', 'Sit on the chair.', { altEn: ['Sit on a chair.'] }],
    ['s-tusanyuse-okukulaba', 'Tusanyuse okukulaba.', 'We are happy to see you.', { altEn: ['We’re happy to see you.', 'We are glad to see you.', 'Nice to see you.'] }],
    ['s-ggalawo-oluggi', 'Ggalawo oluggi.', 'Close the door.', { altEn: ['Shut the door.'] }],
    ['s-ggulawo-eddirisa', 'Ggulawo eddirisa.', 'Open the window.'],
    ['s-ndeetera-amazzi', 'Ndeetera amazzi.', 'Bring me water.', { altEn: ['Bring me some water.', 'Fetch me water.'] }],
    ['s-mpa-ekikopo', 'Mpa ekikopo.', 'Give me the cup.', { altEn: ['Give me a cup.', 'Pass me the cup.'] }],
    ['s-ssaako-ettaala', 'Ssaako ettaala.', 'Switch on the lamp.', { altEn: ['Turn on the light.', 'Switch on the light.', 'Turn on the lamp.'] }],
  ],
  skills: [
    {
      id: 'u7s1',
      title: 'Rooms',
      icon: 'home',
      lessons: [
        { id: 'u7s1l1', newWords: ['ennyumba', 'ekisenge', 'effumbiro'], sentences: ['s-ennyumba-yange', 's-ekisenge-kyange', 's-maama-mu-ffumbiro'] },
        { id: 'u7s1l2', newWords: ['oluggi', 'eddirisa', 'entebe', 'emmeeza', 'ettaala'], sentences: ['s-ennyumba-yange', 's-ekisenge-kyange'] },
      ],
    },
    {
      id: 'u7s2',
      title: 'Welcoming guests',
      icon: 'heart',
      tip: 'visiting',
      lessons: [
        { id: 'u7s2l1', newWords: ['kkodi', 'yingira', 'tuula', 'wansi'], sentences: ['s-kkodi-yingira', 's-tuula-wansi', 's-tuula-ku-ntebe'] },
        {
          id: 'u7s2l2',
          newWords: ['tusanyuse'],
          sentences: ['s-tusanyuse-okukulaba', 's-kkodi-yingira', 's-tuula-ku-ntebe'],
          dialogues: [
            {
              speaker: 'jjajja',
              line: 'Kkodi!',
              translation: 'Knock knock!',
              options: ['Yingira! Tusanyuse okukulaba.', 'Ggalawo oluggi.', 'Ssaawa mmeka?'],
              answer: 'Yingira! Tusanyuse okukulaba.',
            },
          ],
        },
      ],
    },
    {
      id: 'u7s3',
      title: 'Around the house',
      icon: 'bolt',
      tip: 'commands',
      lessons: [
        { id: 'u7s3l1', newWords: ['ggalawo', 'ggulawo', 'ssaako'], sentences: ['s-ggalawo-oluggi', 's-ggulawo-eddirisa', 's-ssaako-ettaala'] },
        { id: 'u7s3l2', newWords: ['ndeetera', 'mpa'], sentences: ['s-ndeetera-amazzi', 's-mpa-ekikopo', 's-ggalawo-oluggi'] },
      ],
    },
  ],
};
