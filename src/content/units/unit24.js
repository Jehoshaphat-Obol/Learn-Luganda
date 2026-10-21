/*
 * Unit 24: Cooking. In the kitchen, steps of a recipe with sooka (first)
 * and oluvannyuma (then), and sharing a meal.
 */
export default {
  id: 'u24',
  title: 'Cooking',
  description: 'Follow a recipe, cook matooke in banana leaves and share a meal.',
  color: 'butter',
  character: 'jjajja',
  words: [
    ['okufumba', 'okufumba', 'to cook', { altEn: ['cooking'] }],
    ['entamu', 'entamu', 'cooking pot', { altEn: ['pot', 'saucepan', 'the pot'] }],
    ['omuliro', 'omuliro', 'fire', { altEn: ['the fire', 'heat', 'stove'] }],
    ['amafuta', 'amafuta', 'oil', { altEn: ['cooking oil', 'fat', 'the oil'] }],
    ['obutungulu', 'obutungulu', 'onions', { altEn: ['onion', 'the onions'] }],
    ['ennyaanya', 'ennyaanya', 'tomatoes', { altEn: ['tomato', 'the tomatoes'] }],
    ['sooka', 'Sooka', 'First', { altEn: ['first of all', 'start by'] }],
    ['sala', 'Sala', 'Cut', { altEn: ['chop', 'slice'] }],
    ['teeka', 'Teeka', 'Put', { altEn: ['place', 'put in'] }],
    ['gattako', 'Gattako', 'Add', { altEn: ['add some', 'add a little'] }],
    ['okusiika', 'okusiika', 'to fry', { altEn: ['frying'] }],
    ['endagala', 'endagala', 'banana leaves', { altEn: ['banana leaf', 'leaves', 'the banana leaves'] }],
    ['okusiba', 'okusiba', 'to wrap', { altEn: ['to tie', 'wrapping'] }],
    ['tulye', 'Tulye', 'Let’s eat', { altEn: ['let us eat'] }],
    ['nkkuse', 'Nkkuse', 'I am full', { altEn: ['i’m full', 'i have had enough', 'i’ve had enough'] }],
    ['webale-okufumba', 'Webale okufumba', 'Thanks for cooking', { altEn: ['thank you for cooking', 'thanks for the food'] }],
  ],
  sentences: [
    ['s24-njagala-okufumba', 'Njagala okufumba emmere.', 'I want to cook food.', { altEn: ['I like to cook food.', 'I like cooking food.'] }],
    ['s24-teeka-entamu', 'Teeka entamu ku muliro.', 'Put the pot on the fire.', { altEn: ['Put the pot on the stove.'] }],
    ['s24-gattako-amafuta', 'Gattako amafuta.', 'Add oil.', { altEn: ['Add some oil.', 'Add the oil.'] }],
    ['s24-sooka-sala', 'Sooka sala obutungulu.', 'First cut the onions.', { altEn: ['First chop the onions.', 'First, cut the onion.'] }],
    ['s24-oluvannyuma-ennyaanya', 'Oluvannyuma gattako ennyaanya.', 'Then add the tomatoes.', { altEn: ['Afterwards add the tomatoes.', 'Then add tomatoes.'] }],
    ['s24-gattako-omunnyo', 'Gattako omunnyo katono.', 'Add a little salt.', { altEn: ['Add some salt.', 'Add a bit of salt.'] }],
    ['s24-okusiika', 'Siika obutungulu mu mafuta.', 'Fry the onions in oil.', { altEn: ['Fry the onions in the oil.'] }],
    ['s24-okusiba', 'Tusiba matooke mu ndagala.', 'We wrap matooke in banana leaves.', { altEn: ['We wrap the matooke in banana leaves.'] }],
    ['s24-tulye', 'Emmere eyidde. Tulye!', 'The food is ready. Let’s eat!', { altEn: ['The food is done. Let’s eat!', 'Food is ready. Let us eat!'] }],
    ['s24-mpa-ku-mmere', 'Mpa ku mmere, nnyabo.', 'Give me some food, madam.', { altEn: ['Give me a little food, madam.'] }],
    ['s24-nkkuse', 'Nkkuse, weebale nnyo.', 'I’m full, thank you very much.', { altEn: ['I am full, thank you very much.', 'I’m full, thanks a lot.'] }],
    ['s24-webale-okufumba', 'Webale okufumba, Jjajja!', 'Thanks for cooking, Grandma!', { altEn: ['Thank you for cooking, Grandma!', 'Thanks for cooking, Grandpa!'] }],
  ],
  skills: [
    {
      id: 'u24s1',
      title: 'In the kitchen',
      icon: 'home',
      lessons: [
        { id: 'u24s1l1', newWords: ['okufumba', 'entamu', 'omuliro'], sentences: ['s24-njagala-okufumba', 's24-teeka-entamu'] },
        { id: 'u24s1l2', newWords: ['amafuta', 'teeka', 'gattako'], sentences: ['s24-gattako-amafuta', 's24-teeka-entamu'] },
        { id: 'u24s1l3', newWords: ['obutungulu', 'ennyaanya'], sentences: ['s24-gattako-omunnyo', 's24-gattako-amafuta'] },
      ],
    },
    {
      id: 'u24s2',
      title: 'Making matooke',
      icon: 'flame',
      tip: 'recipe-steps',
      lessons: [
        { id: 'u24s2l1', newWords: ['sooka', 'sala'], sentences: ['s24-sooka-sala', 's24-oluvannyuma-ennyaanya'] },
        { id: 'u24s2l2', newWords: ['okusiika'], sentences: ['s24-okusiika', 's24-sooka-sala'] },
        { id: 'u24s2l3', newWords: ['endagala', 'okusiba'], sentences: ['s24-okusiba', 's24-oluvannyuma-ennyaanya'] },
      ],
    },
    {
      id: 'u24s3',
      title: 'Sharing a meal',
      icon: 'heart',
      lessons: [
        { id: 'u24s3l1', newWords: ['tulye'], sentences: ['s24-tulye', 's24-mpa-ku-mmere'] },
        { id: 'u24s3l2', newWords: ['nkkuse'], sentences: ['s24-nkkuse', 's24-mpa-ku-mmere'] },
        {
          id: 'u24s3l3',
          newWords: ['webale-okufumba'],
          sentences: ['s24-webale-okufumba', 's24-tulye'],
          dialogues: [
            {
              speaker: 'jjajja',
              line: 'Oyagala emmere endala?',
              translation: 'Do you want more food?',
              options: ['Nedda, nkkuse. Webale okufumba!', 'Sooka sala obutungulu.', 'Nkulinze ku siteegi.'],
              answer: 'Nedda, nkkuse. Webale okufumba!',
            },
          ],
        },
      ],
    },
  ],
};
