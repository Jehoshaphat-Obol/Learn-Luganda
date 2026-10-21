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
];

export const storyById = Object.fromEntries(STORIES.map((s) => [s.id, s]));
