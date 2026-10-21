/*
 * Short stories with the cast. A story is a list of steps: a `line` is said
 * by a cast member (tap it for the English); a `question` checks the
 * learner is following. A story opens once `unlockAfter` is complete.
 * Like the units, every line needs a native-speaker review before launch.
 */
export const STORIES = [
  {
    id: 'new-friend',
    title: 'A new friend',
    unit: 'u1',
    unlockAfter: 'u1s2l1',
    cast: ['nakato', 'emma'],
    summary: 'Emma meets Nakato outside the library.',
    steps: [
      { line: ['nakato', 'Oli otya?', 'How are you?'] },
      { line: ['emma', 'Gyendi, weebale. Ggwe oli otya?', 'I’m fine, thank you. How are you?'] },
      { line: ['nakato', 'Bulungi. Erinnya lyo ani?', 'Good. What is your name?'] },
      {
        question: 'What did Nakato ask?',
        options: ['Emma’s name', 'Where Emma lives', 'If Emma is hungry'],
        answer: 0,
      },
      { line: ['emma', 'Nze Emma. Ggwe ani?', 'I am Emma. Who are you?'] },
      { line: ['nakato', 'Nze Nakato. Ova wa, Emma?', 'I am Nakato. Where are you from, Emma?'] },
      { line: ['emma', 'Nva Masaka. Ndi muyizi.', 'I come from Masaka. I am a student.'] },
      {
        question: 'Where does Emma come from?',
        options: ['Kampala', 'Masaka', 'The library'],
        answer: 1,
      },
      { line: ['nakato', 'Nange ndi muyizi! Nsanyuse okukulaba.', 'I am a student too! Nice to meet you.'], gloss: { Nange: 'me too' } },
      {
        question: 'How does Nakato say “nice to meet you”?',
        options: ['Weebale nnyo', 'Nsanyuse okukulaba', 'Tunaalabagana'],
        answer: 1,
        lang: 'lg',
      },
      { line: ['emma', 'Weebale nnyo. Tunaalabagana!', 'Thank you very much. See you later!'] },
    ],
  },
  {
    id: 'morning-jjajja',
    title: 'Good morning, Jjajja',
    unit: 'u1',
    unlockAfter: 'u1s1l4',
    cast: ['amara', 'jjajja'],
    summary: 'Amara greets her grandmother before school.',
    steps: [
      { line: ['amara', 'Wasuze otya, Jjajja?', 'Good morning, Grandma.'] },
      { line: ['jjajja', 'Nsuze bulungi, mwana wange. Ggwe wasuze otya?', 'I slept well, my child. How did you sleep?'] },
      {
        question: 'What time of day is it?',
        options: ['Morning', 'Evening', 'Night'],
        answer: 0,
      },
      { line: ['amara', 'Nsuze bulungi, Jjajja.', 'I slept well, Grandma.'] },
      { line: ['jjajja', 'Kale. Gyebale ko!', 'Okay. Well done!'], gloss: { 'Gyebale ko': 'said to someone busy or working' } },
      {
        question: 'How does Amara answer Jjajja’s greeting?',
        options: ['Nedda, nnyabo', 'Nsuze bulungi', 'Weraba'],
        answer: 1,
        lang: 'lg',
      },
      { line: ['amara', 'Weebale, Jjajja. Kale, weraba!', 'Thank you, Grandma. Okay, goodbye!'] },
      { line: ['jjajja', 'Weraba, mwana wange. Tunaalabagana.', 'Goodbye, my child. See you later.'] },
      {
        question: 'Is Amara leaving or arriving?',
        options: ['Arriving', 'Leaving'],
        answer: 1,
      },
    ],
  },
  {
    id: 'market-matooke',
    title: 'Matooke at the market',
    unit: 'u2',
    unlockAfter: 'u2s3l1',
    cast: ['emma', 'mukasa'],
    summary: 'Emma buys matooke for dinner.',
    steps: [
      { line: ['emma', 'Oli otya, ssebo?', 'How are you, sir?'] },
      { line: ['mukasa', 'Gyendi, nnyabo. Oyagala ki?', 'I’m fine, madam. What do you want?'] },
      { line: ['emma', 'Njagala matooke.', 'I want matooke.'], gloss: { matooke: 'cooking bananas, a Ganda staple' } },
      {
        question: 'What does Emma want?',
        options: ['Tea', 'Matooke', 'A book'],
        answer: 1,
      },
      { line: ['mukasa', 'Kale. Ssente nkumi ttaano.', 'Okay. Five thousand shillings.'], gloss: { Ssente: 'money', nkumi: 'thousands' } },
      {
        question: 'How much is the matooke?',
        options: ['Two thousand', 'Five thousand', 'Ten thousand'],
        answer: 1,
      },
      { line: ['emma', 'Kale. Njagala n’amazzi.', 'Okay. I want water too.'] },
      { line: ['mukasa', 'Gano amazzi. Weebale nnyo, nnyabo!', 'Here is the water. Thank you very much, madam!'], gloss: { Gano: 'here are (these)' } },
      {
        question: 'What else does Emma buy?',
        options: ['Water', 'Tea', 'Food for Jjajja'],
        answer: 0,
      },
      { line: ['emma', 'Weebale, ssebo. Weraba!', 'Thank you, sir. Goodbye!'] },
    ],
  },
  {
    id: 'boda-ride',
    title: 'A boda boda ride',
    unit: 'u6',
    unlockAfter: 'u6s3l2',
    cast: ['emma', 'ssali'],
    summary: 'Emma takes a boda boda into town.',
    steps: [
      { line: ['ssali', 'Ogenda wa, nnyabo?', 'Where are you going, madam?'] },
      { line: ['emma', 'Ntwala mu kibuga. Ssente mmeka?', 'Take me to town. How much?'] },
      { line: ['ssali', 'Nkumi ttaano.', 'Five thousand.'] },
      { line: ['emma', 'Kya bbeeyi nnyo! Kendeezaako.', 'That’s very expensive! Lower it a bit.'] },
      { line: ['ssali', 'Kale, nkumi ssatu.', 'Okay, three thousand.'], gloss: { ssatu: 'three (nkumi ssatu: 3,000)' } },
      {
        question: 'What price do they agree on?',
        options: ['Five thousand', 'Three thousand', 'One thousand'],
        answer: 1,
      },
      { line: ['ssali', 'Ndaga ekkubo.', 'Show me the way.'], gloss: { Ndaga: 'show me', ekkubo: 'road, way' } },
      { line: ['emma', 'Genda butereevu, kyuka ku ddyo.', 'Go straight, turn right.'] },
      {
        question: 'Which way does Emma say to turn?',
        options: ['Left', 'Right'],
        answer: 1,
      },
      { line: ['emma', 'Yimirira wano. Weebale nnyo, ssebo!', 'Stop here. Thank you very much, sir!'] },
      { line: ['ssali', 'Kale, nnyabo. Weraba!', 'Okay, madam. Goodbye!'] },
      {
        question: 'How does Emma ask Ssali to stop?',
        options: ['Genda butereevu', 'Yimirira wano', 'Kyuka ku kkono'],
        answer: 1,
        lang: 'lg',
      },
    ],
  },
  {
    id: 'doctor-visit',
    title: 'At the clinic',
    unit: 'u8',
    unlockAfter: 'u8s3l2',
    cast: ['amara', 'mukasa'],
    summary: 'Amara isn’t feeling well and sees a health worker.',
    steps: [
      { line: ['mukasa', 'Oli otya, Amara?', 'How are you, Amara?'] },
      { line: ['amara', 'Ndi mulwadde. Omutwe gunnuma.', 'I am sick. My head hurts.'] },
      {
        question: 'What hurts?',
        options: ['Her stomach', 'Her head', 'Her leg'],
        answer: 1,
      },
      { line: ['mukasa', 'Olina omusujja?', 'Do you have a fever?'], gloss: { Olina: 'you have' } },
      { line: ['amara', 'Yee, nnina omusujja.', 'Yes, I have a fever.'] },
      { line: ['mukasa', 'Nywa eddagala lino, owummule.', 'Take this medicine and rest.'], gloss: { lino: 'this (for li- nouns)', owummule: 'and rest' } },
      {
        question: 'What does Mukasa give Amara?',
        options: ['Medicine', 'Tea', 'Matooke'],
        answer: 0,
      },
      { line: ['amara', 'Weebale nnyo, musawo.', 'Thank you very much, doctor.'] },
      { line: ['mukasa', 'Kale. Wona mangu!', 'Okay. Get well soon!'] },
    ],
  },
];

export const storyById = Object.fromEntries(STORIES.map((s) => [s.id, s]));
