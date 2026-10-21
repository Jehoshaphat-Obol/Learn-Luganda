/*
 * Unit 26: The kingdom. The Kabaka and the royal household, places of
 * Buganda, and respectful ways to speak about them.
 */
export default {
  id: 'u26',
  title: 'The kingdom',
  description: 'The Kabaka, his government and the historic places of Buganda.',
  color: 'vermillion',
  character: 'mukasa',
  words: [
    ['kabaka', 'Kabaka', 'king', { altEn: ['the king', 'the kabaka'], notes: 'The king of Buganda.' }],
    ['nnaabagereka', 'Nnaabagereka', 'queen', { altEn: ['the queen'], notes: 'The Kabaka’s wife.' }],
    ['ssaabasajja', 'Ssaabasajja', 'His Majesty', { altEn: ['chief of men', 'the king'], notes: 'A title for the Kabaka.' }],
    ['obwakabaka', 'obwakabaka', 'kingdom', { altEn: ['the kingdom', 'monarchy'] }],
    ['afuga', 'afuga', 'rules', { altEn: ['he rules', 'governs', 'reigns'] }],
    ['awangaale', 'awangaale', 'long live', { altEn: ['may he live long'], notes: 'Kabaka awangaale! Long live the Kabaka!' }],
    ['katikkiro', 'Katikkiro', 'prime minister', { altEn: ['the prime minister', 'chief minister'] }],
    ['lukiiko', 'Lukiiko', 'parliament', { altEn: ['the parliament', 'council', 'assembly'], notes: 'Buganda’s parliament.' }],
    ['olubiri', 'olubiri', 'palace', { altEn: ['the palace', 'royal compound'] }],
    ['bulange', 'Bulange', 'Bulange', { altEn: ['parliament building'], notes: 'The building where the Lukiiko meets, in Mengo.' }],
    ['amasiro', 'amasiro', 'royal tombs', { altEn: ['tombs', 'the royal tombs'] }],
    ['essaza', 'essaza', 'county', { altEn: ['district', 'the county'] }],
    ['amasaza', 'amasaza', 'counties', { altEn: ['districts', 'the counties'] }],
    ['edda-ennyo', 'edda ennyo', 'very long ago', { altEn: ['long long ago', 'a very long time ago'] }],
  ],
  sentences: [
    ['s26-kabaka-afuga', 'Kabaka afuga Buganda.', 'The Kabaka rules Buganda.', { altEn: ['The king rules Buganda.'] }],
    ['s26-kabaka-awangaale', 'Kabaka awangaale!', 'Long live the Kabaka!', { altEn: ['Long live the king!'] }],
    ['s26-nnaabagereka', 'Nnaabagereka ajja leero.', 'The queen is coming today.', { altEn: ['The queen comes today.'] }],
    ['s26-ssaabasajja', 'Ssaabasajja Kabaka atuuse.', 'His Majesty the Kabaka has arrived.', { altEn: ['The king has arrived.', 'His Majesty has arrived.'] }],
    ['s26-obwakabaka-bwa-buganda', 'Obwakabaka bwa Buganda bukadde nnyo.', 'The kingdom of Buganda is very old.', { altEn: ['Buganda kingdom is very old.'] }],
    ['s26-katikkiro', 'Katikkiro ayogera mu Lukiiko.', 'The prime minister speaks in parliament.', { altEn: ['The prime minister is speaking in parliament.', 'The Katikkiro speaks in the Lukiiko.'] }],
    ['s26-olubiri-e-mengo', 'Olubiri luli e Mengo.', 'The palace is in Mengo.', { altEn: ['The palace is at Mengo.'] }],
    ['s26-bulange', 'Lukiiko lutuula mu Bulange.', 'The parliament sits in Bulange.', { altEn: ['The Lukiiko meets in Bulange.', 'Parliament meets in Bulange.'] }],
    ['s26-amasiro-e-kasubi', 'Amasiro g’e Kasubi.', 'The royal tombs at Kasubi.', { altLg: ['Amasiro ge Kasubi.'], altEn: ['The Kasubi tombs.', 'The royal tombs of Kasubi.'] }],
    ['s26-amasaza', 'Buganda erina amasaza kkumi na munaana.', 'Buganda has eighteen counties.', { altEn: ['Buganda has 18 counties.'] }],
    ['s26-essaza-lyange', 'Essaza lyange Kyaddondo.', 'My county is Kyaddondo.'],
    ['s26-edda-ennyo', 'Edda ennyo, Kintu ye yali Kabaka eyasooka.', 'Very long ago, Kintu was the first Kabaka.', { altEn: ['Long long ago, Kintu was the first king.', 'A very long time ago, Kintu was the first Kabaka.'] }],
  ],
  skills: [
    {
      id: 'u26s1',
      title: 'The Kabaka',
      icon: 'trophy',
      tip: 'royal-words',
      lessons: [
        { id: 'u26s1l1', newWords: ['kabaka', 'afuga', 'awangaale'], sentences: ['s26-kabaka-afuga', 's26-kabaka-awangaale'] },
        { id: 'u26s1l2', newWords: ['nnaabagereka', 'ssaabasajja'], sentences: ['s26-nnaabagereka', 's26-ssaabasajja'] },
        { id: 'u26s1l3', newWords: ['obwakabaka', 'katikkiro', 'lukiiko'], sentences: ['s26-obwakabaka-bwa-buganda', 's26-katikkiro'] },
      ],
    },
    {
      id: 'u26s2',
      title: 'Places of Buganda',
      icon: 'home',
      lessons: [
        { id: 'u26s2l1', newWords: ['olubiri', 'bulange'], sentences: ['s26-olubiri-e-mengo', 's26-bulange'] },
        { id: 'u26s2l2', newWords: ['amasiro'], sentences: ['s26-amasiro-e-kasubi', 's26-olubiri-e-mengo'] },
        { id: 'u26s2l3', newWords: ['essaza', 'amasaza'], sentences: ['s26-amasaza', 's26-essaza-lyange'] },
      ],
    },
    {
      id: 'u26s3',
      title: 'History',
      icon: 'book',
      tip: 'kintu',
      lessons: [
        { id: 'u26s3l1', newWords: ['edda-ennyo'], sentences: ['s26-edda-ennyo', 's26-obwakabaka-bwa-buganda'] },
        { id: 'u26s3l2', newWords: [], sentences: ['s26-kabaka-afuga', 's26-amasiro-e-kasubi', 's26-katikkiro'] },
        {
          id: 'u26s3l3',
          newWords: [],
          sentences: ['s26-edda-ennyo', 's26-amasaza', 's26-ssaabasajja'],
          dialogues: [
            {
              speaker: 'mukasa',
              line: 'Kabaka awangaale!',
              translation: 'Long live the Kabaka!',
              options: ['Awangaale!', 'Sikuwulira.', 'Nkkuse.'],
              answer: 'Awangaale!',
            },
          ],
        },
      ],
    },
  ],
};
