/*
 * Unit 33: Comparing. "More than" with okusinga, the best, the same and
 * different, and "looks like".
 */
export default {
  id: 'u33',
  title: 'Comparing',
  description: 'Say what is bigger, better, the same or different.',
  color: 'ink',
  character: 'mukasa',
  words: [
    ['okusinga', 'okusinga', 'more than', { altEn: ['than', 'to surpass', 'to exceed'], notes: 'Literally “to surpass”.' }],
    ['asinga', 'asinga', 'is the most', { altEn: ['surpasses', 'is more', 'beats', 'the most'], notes: 'For a person.' }],
    ['kisinga', 'kisinga', 'is more', { altEn: ['surpasses', 'is the most', 'it is more'], notes: 'For eki- things.' }],
    ['obuwanvu', 'obuwanvu', 'height', { altEn: ['length', 'tallness'] }],
    ['obunene', 'obunene', 'size', { altEn: ['bigness', 'largeness'] }],
    ['obulungi', 'obulungi', 'goodness', { altEn: ['beauty', 'quality'] }],
    ['ekisinga', 'ekisinga', 'the most', { altEn: ['the best', 'which is most'], notes: 'Ekisinga obulungi: the best (thing).' }],
    ['okusinga-byonna', 'okusinga byonna', 'most of all', { altEn: ['above all', 'more than everything'] }],
    ['kye-kimu', 'kye kimu', 'the same', { altEn: ['it’s the same', 'it is the same', 'same thing'] }],
    ['enjawulo', 'enjawulo', 'difference', { altEn: ['the difference', 'different'] }],
    ['afaanana', 'afaanana', 'looks like', { altEn: ['resembles', 'he looks like', 'she looks like'] }],
    ['nga', 'nga', 'like', { altEn: ['as', 'such as'] }],
  ],
  sentences: [
    ['s33-enjovu-okusinga-ente', 'Enjovu nnene okusinga ente.', 'An elephant is bigger than a cow.', { altEn: ['The elephant is bigger than the cow.', 'Elephants are bigger than cows.'] }],
    ['s33-kampala-okusinga-masaka', 'Kampala nnene okusinga Masaka.', 'Kampala is bigger than Masaka.'],
    ['s33-ani-asinga-obuwanvu', 'Ani asinga obuwanvu?', 'Who is the tallest?', { altEn: ['Who is tallest?', 'Who is taller?'] }],
    ['s33-ssali-asinga', 'Ssali y’asinga obuwanvu.', 'Ssali is the tallest.', { altEn: ['Ssali is tallest.'] }],
    ['s33-kisinga-obunene', 'Ekitabo kino kisinga obunene.', 'This book is the biggest.', { altEn: ['This book is bigger.', 'This book is the largest.'] }],
    ['s33-ekisinga-obulungi', 'Kino kye kisinga obulungi.', 'This is the best one.', { altEn: ['This is the best.', 'This one is the best.'] }],
    ['s33-njagala-matooke-okusinga-byonna', 'Njagala matooke okusinga byonna.', 'I like matooke most of all.', { altEn: ['I like matooke more than anything.', 'I love matooke most of all.'] }],
    ['s33-kye-kimu', 'Bino byombi kye kimu.', 'These two are the same.', { altEn: ['Both of these are the same.', 'These are the same.'] }],
    ['s33-si-kye-kimu', 'Si kye kimu!', 'It’s not the same!', { altEn: ['It is not the same!', 'That’s not the same!'] }],
    ['s33-enjawulo', 'Enjawulo eri wa?', 'Where is the difference?', { altEn: ['What is the difference?', 'What’s the difference?'] }],
    ['s33-afaanana-maama-we', 'Afaanana nga maama we.', 'She looks like her mother.', { altEn: ['He looks like his mother.', 'She resembles her mother.', 'He resembles his mother.'] }],
  ],
  skills: [
    {
      id: 'u33s1',
      title: 'Bigger and smaller',
      icon: 'up',
      tip: 'comparing',
      lessons: [
        { id: 'u33s1l1', newWords: ['okusinga'], sentences: ['s33-enjovu-okusinga-ente', 's33-kampala-okusinga-masaka'] },
        { id: 'u33s1l2', newWords: ['asinga', 'obuwanvu'], sentences: ['s33-ani-asinga-obuwanvu', 's33-ssali-asinga'] },
        { id: 'u33s1l3', newWords: ['kisinga', 'obunene'], sentences: ['s33-kisinga-obunene', 's33-enjovu-okusinga-ente'] },
      ],
    },
    {
      id: 'u33s2',
      title: 'The best',
      icon: 'trophy',
      lessons: [
        { id: 'u33s2l1', newWords: ['obulungi', 'ekisinga'], sentences: ['s33-ekisinga-obulungi'] },
        { id: 'u33s2l2', newWords: ['okusinga-byonna'], sentences: ['s33-njagala-matooke-okusinga-byonna', 's33-ekisinga-obulungi'] },
        {
          id: 'u33s2l3',
          newWords: [],
          sentences: ['s33-ani-asinga-obuwanvu', 's33-njagala-matooke-okusinga-byonna'],
          dialogues: [
            {
              speaker: 'mukasa',
              line: 'Oyagala ki okusinga byonna?',
              translation: 'What do you like most of all?',
              options: ['Njagala ennyimba okusinga byonna.', 'Si kye kimu.', 'Enjovu nnene.'],
              answer: 'Njagala ennyimba okusinga byonna.',
            },
          ],
        },
      ],
    },
    {
      id: 'u33s3',
      title: 'Same and different',
      icon: 'target',
      lessons: [
        { id: 'u33s3l1', newWords: ['kye-kimu'], sentences: ['s33-kye-kimu', 's33-si-kye-kimu'] },
        { id: 'u33s3l2', newWords: ['enjawulo'], sentences: ['s33-enjawulo', 's33-si-kye-kimu'] },
        { id: 'u33s3l3', newWords: ['afaanana', 'nga'], sentences: ['s33-afaanana-maama-we', 's33-kye-kimu'] },
      ],
    },
  ],
};
