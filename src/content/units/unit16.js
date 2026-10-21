/*
 * Unit 16: Travel and transport. Taxis and buses, the boda boda and the
 * car, and a journey from one town to another.
 */
export default {
  id: 'u16',
  title: 'Travel and transport',
  description: 'Catch a taxi or bus and plan a journey across Uganda.',
  color: 'sky',
  character: 'ssali',
  words: [
    ['ttakisi', 'ttakisi', 'taxi', { altEn: ['minibus', 'the taxi', 'matatu'], notes: 'A shared minibus that runs a fixed route.' }],
    ['bbaasi', 'bbaasi', 'bus', { altEn: ['the bus', 'coach'] }],
    ['paaka', 'paaka', 'taxi park', { altEn: ['park', 'bus park', 'the park', 'station'] }],
    ['siteegi', 'siteegi', 'stage', { altEn: ['stop', 'bus stop', 'the stage'], notes: 'Where taxis and boda bodas wait.' }],
    ['egenda', 'egenda', 'it goes', { altEn: ['goes', 'is going'], notes: 'For n- nouns: ttakisi egenda, the taxi goes.' }],
    ['mmotoka', 'mmotoka', 'car', { altEn: ['the car', 'vehicle', 'motor car'] }],
    ['bodaboda', 'bodaboda', 'boda boda', { altEn: ['motorbike taxi', 'motorcycle', 'bike taxi', 'boda'] }],
    ['eggaali', 'eggaali', 'bicycle', { altEn: ['bike', 'the bicycle'] }],
    ['mpola', 'mpola', 'slowly', { altEn: ['slow', 'carefully', 'gently'] }],
    ['mangu', 'mangu', 'quickly', { altEn: ['fast', 'quick', 'soon'] }],
    ['olugendo', 'olugendo', 'journey', { altEn: ['trip', 'the journey', 'travel'] }],
    ['okuva', 'okuva', 'from', { altEn: ['to come from', 'leaving'] }],
    ['okutuuka', 'okutuuka', 'to arrive', { altEn: ['until', 'up to', 'to reach'] }],
    ['ntuuse', 'Ntuuse', 'I have arrived', { altEn: ['i’ve arrived', 'i am here', 'i arrived'] }],
    ['ennyonyi', 'ennyonyi', 'aeroplane', { altEn: ['airplane', 'plane', 'the plane'], notes: 'Not a bird! A bird is ekinyonyi.' }],
    ['tugende', 'Tugende', 'Let’s go', { altEn: ['let us go'] }],
    ['olugendo-olulungi', 'Olugendo olulungi!', 'Have a good journey!', { altEn: ['safe journey', 'have a good trip', 'bon voyage', 'safe travels'] }],
  ],
  sentences: [
    ['s16-ttakisi-egenda-wa', 'Ttakisi eno egenda wa?', 'Where does this taxi go?', { altEn: ['Where is this taxi going?'] }],
    ['s16-ttakisi-egenda-entebbe', 'Ttakisi egenda Entebbe.', 'The taxi goes to Entebbe.', { altEn: ['The taxi is going to Entebbe.'] }],
    ['s16-bbaasi-eri-ku-paaka', 'Bbaasi eri ku paaka.', 'The bus is at the park.', { altEn: ['The bus is at the bus park.', 'The bus is at the station.'] }],
    ['s16-yimirira-ku-siteegi', 'Yimirira ku siteegi.', 'Stop at the stage.', { altEn: ['Stop at the bus stop.'] }],
    ['s16-mmotoka-yange', 'Mmotoka yange mpya.', 'My car is new.'],
    ['s16-ntwala-ku-bodaboda', 'Ŋŋenda ku bodaboda.', 'I am going by boda boda.', { altLg: ['Ngenda ku bodaboda.'], altEn: ['I go by boda boda.', 'I am going on a boda boda.'] }],
    ['s16-genda-mpola', 'Genda mpola, ssebo!', 'Go slowly, sir!', { altEn: ['Drive slowly, sir!', 'Slow down, sir!'] }],
    ['s16-tugende-mangu', 'Tugende mangu!', 'Let’s go quickly!', { altEn: ['Let us go quickly!', 'Let’s go fast!'] }],
    ['s16-okuva-kampala', 'Okuva e Kampala okutuuka e Masaka.', 'From Kampala to Masaka.', { altEn: ['From Kampala up to Masaka.'] }],
    ['s16-olugendo-luwanvu', 'Olugendo luwanvu.', 'The journey is long.', { altEn: ['It’s a long journey.', 'It is a long trip.'] }],
    ['s16-ntuuse', 'Ntuuse bulungi.', 'I have arrived safely.', { altEn: ['I arrived well.', 'I’ve arrived safely.', 'I arrived safely.'] }],
    ['s16-ennyonyi-ebuuka', 'Ennyonyi ebuuka.', 'The plane is flying.', { altEn: ['The aeroplane flies.', 'The plane flies.'] }],
    ['s16-olugendo-olulungi', 'Weraba! Olugendo olulungi!', 'Goodbye! Have a good journey!', { altEn: ['Bye! Safe journey!', 'Goodbye! Have a good trip!'] }],
  ],
  skills: [
    {
      id: 'u16s1',
      title: 'Taxi and bus',
      icon: 'arrow',
      tip: 'taxis',
      lessons: [
        { id: 'u16s1l1', newWords: ['ttakisi', 'bbaasi', 'egenda'], sentences: ['s16-ttakisi-egenda-wa', 's16-ttakisi-egenda-entebbe'] },
        { id: 'u16s1l2', newWords: ['paaka', 'siteegi'], sentences: ['s16-bbaasi-eri-ku-paaka', 's16-yimirira-ku-siteegi'] },
        {
          id: 'u16s1l3',
          newWords: ['tugende'],
          sentences: ['s16-ttakisi-egenda-wa', 's16-yimirira-ku-siteegi'],
          dialogues: [
            {
              speaker: 'ssali',
              line: 'Ogenda wa?',
              translation: 'Where are you going?',
              options: ['Ŋŋenda Entebbe. Ttakisi eno egenda Entebbe?', 'Ntya omusota!', 'Nnina ekibuuzo.'],
              answer: 'Ŋŋenda Entebbe. Ttakisi eno egenda Entebbe?',
            },
          ],
        },
      ],
    },
    {
      id: 'u16s2',
      title: 'Boda boda and car',
      icon: 'bolt',
      lessons: [
        { id: 'u16s2l1', newWords: ['mmotoka', 'bodaboda', 'eggaali'], sentences: ['s16-mmotoka-yange', 's16-ntwala-ku-bodaboda'] },
        { id: 'u16s2l2', newWords: ['mpola', 'mangu'], sentences: ['s16-genda-mpola', 's16-tugende-mangu'] },
        { id: 'u16s2l3', newWords: ['ennyonyi'], sentences: ['s16-ennyonyi-ebuuka', 's16-tugende-mangu', 's16-mmotoka-yange'] },
      ],
    },
    {
      id: 'u16s3',
      title: 'A journey',
      icon: 'flame',
      tip: 'from-to',
      lessons: [
        { id: 'u16s3l1', newWords: ['olugendo', 'okuva', 'okutuuka'], sentences: ['s16-okuva-kampala', 's16-olugendo-luwanvu'] },
        { id: 'u16s3l2', newWords: ['ntuuse'], sentences: ['s16-ntuuse', 's16-okuva-kampala'] },
        { id: 'u16s3l3', newWords: ['olugendo-olulungi'], sentences: ['s16-olugendo-olulungi', 's16-ntuuse', 's16-olugendo-luwanvu'] },
      ],
    },
  ],
};
