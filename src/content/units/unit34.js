/*
 * Unit 34: If and when. Real conditions with bwe (when, if), unreal ones
 * with singa and the -andi- conditional, and polite wishes.
 */
export default {
  id: 'u34',
  title: 'If and when',
  description: 'Talk about what happens when, what would happen if, and what you’d like.',
  color: 'sage',
  character: 'nakato',
  words: [
    ['bwe', 'bwe', 'when', { altEn: ['if', 'whenever'], notes: 'For real situations: Bwe nzuukuka… When I wake up…' }],
    ['bwe-nzuukuka', 'bwe nzuukuka', 'when I wake up', { altEn: ['whenever i wake up', 'if i wake up'] }],
    ['bw-etonnya', 'bw’etonnya', 'when it rains', { altLg: ['bwetonnya'], altEn: ['if it rains', 'whenever it rains'], notes: 'Enkuba bw’etonnya.' }],
    ['singa', 'singa', 'if', { altEn: ['if only', 'suppose'], notes: 'For imagined situations.' }],
    ['nnandiguze', 'nnandiguze', 'I would buy', { altEn: ['i would have bought', 'i’d buy'] }],
    ['nnandigenze', 'nnandigenze', 'I would go', { altEn: ['i would have gone', 'i’d go'] }],
    ['nnandyagadde', 'Nnandyagadde', 'I would like', { altEn: ['i’d like', 'i would love', 'i would want'] }],
    ['ka-tulabe', 'Ka tulabe', 'Let’s see', { altEn: ['let us see', 'we’ll see'] }],
    ['katonda-bwanaayagala', 'Katonda bw’anaayagala', 'God willing', { altLg: ['Katonda bwanaayagala'], altEn: ['if god wills', 'if god wants'] }],
  ],
  sentences: [
    ['s34-bwe-nzuukuka', 'Bwe nzuukuka, nnywa caayi.', 'When I wake up, I drink tea.', { altEn: ['When I wake up I drink tea.', 'Whenever I wake up, I drink tea.'] }],
    ['s34-bwe-ntuuka', 'Bwe ntuuka, nja kukukubira.', 'When I arrive, I will call you.', { altEn: ['When I arrive I will call you.', 'When I get there, I’ll call you.'] }],
    ['s34-enkuba-bwetonnya', 'Enkuba bw’etonnya, sigenda.', 'When it rains, I don’t go.', { altLg: ['Enkuba bwetonnya, sigenda.'], altEn: ['If it rains, I don’t go.', 'When it rains I do not go.'] }],
    ['s34-singa-nnina-ssente', 'Singa nnali nnina ssente, nnandiguze mmotoka.', 'If I had money, I would buy a car.', { altEn: ['If I had money I would buy a car.', 'If I had money, I’d buy a car.'] }],
    ['s34-singa-tewali-nkuba', 'Singa tewaali nkuba, nnandigenze.', 'If there were no rain, I would go.', { altEn: ['If it weren’t raining, I would go.', 'If there was no rain, I would have gone.'] }],
    ['s34-nnandyagadde-caayi', 'Nnandyagadde caayi, nsaba.', 'I would like tea, please.', { altEn: ['I’d like tea, please.', 'I would like some tea, please.'] }],
    ['s34-nnandyagadde-okugenda', 'Nnandyagadde okugenda e Jinja.', 'I would like to go to Jinja.', { altEn: ['I’d like to go to Jinja.', 'I would love to go to Jinja.'] }],
    ['s34-ka-tulabe', 'Ka tulabe enkya.', 'Let’s see tomorrow.', { altEn: ['We’ll see tomorrow.', 'Let us see tomorrow.'] }],
    ['s34-katonda-bwanaayagala', 'Nja kujja, Katonda bw’anaayagala.', 'I will come, God willing.', { altLg: ['Nja kujja, Katonda bwanaayagala.'], altEn: ['I’ll come, God willing.'] }],
  ],
  skills: [
    {
      id: 'u34s1',
      title: 'When…',
      icon: 'clock',
      tip: 'bwe',
      lessons: [
        { id: 'u34s1l1', newWords: ['bwe', 'bwe-nzuukuka'], sentences: ['s34-bwe-nzuukuka', 's34-bwe-ntuuka'] },
        { id: 'u34s1l2', newWords: ['bw-etonnya'], sentences: ['s34-enkuba-bwetonnya', 's34-bwe-nzuukuka'] },
        { id: 'u34s1l3', newWords: [], sentences: ['s34-bwe-ntuuka', 's34-enkuba-bwetonnya'] },
      ],
    },
    {
      id: 'u34s2',
      title: 'If…',
      icon: 'star',
      tip: 'singa',
      lessons: [
        { id: 'u34s2l1', newWords: ['singa', 'nnandiguze'], sentences: ['s34-singa-nnina-ssente'] },
        { id: 'u34s2l2', newWords: ['nnandigenze'], sentences: ['s34-singa-tewali-nkuba', 's34-singa-nnina-ssente'] },
        {
          id: 'u34s2l3',
          newWords: [],
          sentences: ['s34-singa-tewali-nkuba', 's34-enkuba-bwetonnya'],
          dialogues: [
            {
              speaker: 'nakato',
              line: 'Singa wali olina ssente nnyingi, wandiguze ki?',
              translation: 'If you had a lot of money, what would you buy?',
              options: ['Nnandiguze ennyumba ennene.', 'Bwe nzuukuka, nnywa caayi.', 'Ka tulabe ekibira.'],
              answer: 'Nnandiguze ennyumba ennene.',
            },
          ],
        },
      ],
    },
    {
      id: 'u34s3',
      title: 'Wishes',
      icon: 'heart',
      lessons: [
        { id: 'u34s3l1', newWords: ['nnandyagadde'], sentences: ['s34-nnandyagadde-caayi', 's34-nnandyagadde-okugenda'] },
        { id: 'u34s3l2', newWords: ['ka-tulabe', 'katonda-bwanaayagala'], sentences: ['s34-ka-tulabe', 's34-katonda-bwanaayagala'] },
        {
          id: 'u34s3l3',
          newWords: [],
          sentences: ['s34-nnandyagadde-okugenda', 's34-katonda-bwanaayagala', 's34-singa-nnina-ssente'],
          dialogues: [
            {
              speaker: 'nakato',
              line: 'Ojja ku mukolo enkya?',
              translation: 'Are you coming to the ceremony tomorrow?',
              options: ['Nja kujja, Katonda bw’anaayagala.', 'Nnandiguze mmotoka.', 'Afaanana nga maama we.'],
              answer: 'Nja kujja, Katonda bw’anaayagala.',
            },
          ],
        },
      ],
    },
  ],
};
