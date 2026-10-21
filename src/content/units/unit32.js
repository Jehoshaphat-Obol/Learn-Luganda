/*
 * Unit 32: Nature. Lakes and rivers, forests and hills, and caring for the
 * land, with locatives mu (in), ku (on) and e (at).
 */
export default {
  id: 'u32',
  title: 'Nature',
  description: 'Lakes, rivers, forests and hills, and caring for the land.',
  color: 'sky',
  character: 'emma',
  words: [
    ['ennyanja', 'ennyanja', 'lake', { altEn: ['the lake', 'sea'] }],
    ['nnalubaale', 'Nnalubaale', 'Lake Victoria', { altEn: ['lake victoria', 'nalubaale'] }],
    ['omugga', 'omugga', 'river', { altEn: ['the river', 'stream'] }],
    ['kiyira', 'Kiyira', 'the Nile', { altEn: ['nile', 'the river nile'] }],
    ['ekibira', 'ekibira', 'forest', { altEn: ['the forest', 'woods'] }],
    ['omuti', 'omuti', 'tree', { altEn: ['the tree', 'a tree'] }],
    ['emiti', 'emiti', 'trees', { altEn: ['the trees'] }],
    ['olusozi', 'olusozi', 'hill', { altEn: ['mountain', 'the hill'] }],
    ['ensozi', 'ensozi', 'hills', { altEn: ['mountains', 'the hills'] }],
    ['ebimuli', 'ebimuli', 'flowers', { altEn: ['the flowers', 'flower'] }],
    ['ettaka', 'ettaka', 'land', { altEn: ['soil', 'earth', 'the land', 'ground'] }],
    ['okusimba', 'okusimba', 'to plant', { altEn: ['planting'], notes: 'For trees and bananas. Seeds use okusiga.' }],
    ['okukuuma', 'okukuuma', 'to protect', { altEn: ['to look after', 'to care for', 'to keep', 'protecting'] }],
    ['kasasiro', 'kasasiro', 'rubbish', { altEn: ['trash', 'garbage', 'litter', 'waste'] }],
    ['tosuula', 'Tosuula', 'Don’t throw', { altEn: ['do not throw', 'don’t drop', 'do not dump'] }],
  ],
  sentences: [
    ['s32-ennyanja-nnene', 'Nnalubaale ye nnyanja ennene.', 'Lake Victoria is a big lake.', { altEn: ['Lake Victoria is the big lake.', 'Nnalubaale is a big lake.'] }],
    ['s32-ebyennyanja', 'Ebyennyanja biva mu nnyanja.', 'Fish come from the lake.', { altEn: ['The fish come from the lake.'] }],
    ['s32-omugga-kiyira', 'Kiyira gwe mugga omuwanvu.', 'The Nile is a long river.', { altEn: ['The Nile is the long river.'] }],
    ['s32-kiyira-jinja', 'Kiyira gutandikira e Jinja.', 'The Nile starts at Jinja.', { altEn: ['The Nile begins at Jinja.', 'The Nile starts in Jinja.'] }],
    ['s32-ekibira', 'Enkima ziri mu kibira.', 'The monkeys are in the forest.', { altEn: ['Monkeys are in the forest.'] }],
    ['s32-omuti-omunene', 'Omuti guno munene nnyo.', 'This tree is very big.', { altEn: ['This tree is huge.'] }],
    ['s32-ensozi-musanvu', 'Kampala erina ensozi musanvu.', 'Kampala has seven hills.', { altEn: ['Kampala has 7 hills.'] }],
    ['s32-ku-lusozi', 'Ennyumba yange eri ku lusozi.', 'My house is on the hill.', { altEn: ['My house is on a hill.'] }],
    ['s32-ebimuli', 'Ebimuli birungi nnyo.', 'The flowers are very beautiful.', { altEn: ['The flowers are very nice.', 'The flowers are very pretty.'] }],
    ['s32-tusimbe-emiti', 'Tusimbe emiti!', 'Let’s plant trees!', { altEn: ['Let us plant trees!'] }],
    ['s32-tukuume-ettaka', 'Tukuume ettaka lyaffe.', 'Let’s protect our land.', { altEn: ['Let us protect our land.', 'Let’s look after our land.'] }],
    ['s32-tosuula-kasasiro', 'Tosuula kasasiro wano!', 'Don’t throw rubbish here!', { altEn: ['Do not throw rubbish here!', 'Don’t litter here!', 'Don’t dump rubbish here!'] }],
  ],
  skills: [
    {
      id: 'u32s1',
      title: 'Lakes and rivers',
      icon: 'target',
      tip: 'locatives',
      lessons: [
        { id: 'u32s1l1', newWords: ['ennyanja', 'nnalubaale'], sentences: ['s32-ennyanja-nnene', 's32-ebyennyanja'] },
        { id: 'u32s1l2', newWords: ['omugga', 'kiyira'], sentences: ['s32-omugga-kiyira', 's32-kiyira-jinja'] },
        { id: 'u32s1l3', newWords: [], sentences: ['s32-kiyira-jinja', 's32-ennyanja-nnene', 's32-ebyennyanja'] },
      ],
    },
    {
      id: 'u32s2',
      title: 'Forests and hills',
      icon: 'star',
      lessons: [
        { id: 'u32s2l1', newWords: ['ekibira', 'omuti', 'emiti'], sentences: ['s32-ekibira', 's32-omuti-omunene'] },
        { id: 'u32s2l2', newWords: ['olusozi', 'ensozi'], sentences: ['s32-ensozi-musanvu', 's32-ku-lusozi'] },
        { id: 'u32s2l3', newWords: ['ebimuli'], sentences: ['s32-ebimuli', 's32-ku-lusozi'] },
      ],
    },
    {
      id: 'u32s3',
      title: 'Caring for the land',
      icon: 'heart',
      lessons: [
        { id: 'u32s3l1', newWords: ['ettaka', 'okusimba'], sentences: ['s32-tusimbe-emiti'] },
        { id: 'u32s3l2', newWords: ['okukuuma'], sentences: ['s32-tukuume-ettaka', 's32-tusimbe-emiti'] },
        {
          id: 'u32s3l3',
          newWords: ['kasasiro', 'tosuula'],
          sentences: ['s32-tosuula-kasasiro', 's32-tukuume-ettaka'],
          dialogues: [
            {
              speaker: 'emma',
              line: 'Tukole ki okukuuma ettaka?',
              translation: 'What should we do to protect the land?',
              options: ['Tusimbe emiti, tosuula kasasiro.', 'Kabaka awangaale!', 'Nnywesa ente amazzi.'],
              answer: 'Tusimbe emiti, tosuula kasasiro.',
            },
          ],
        },
      ],
    },
  ],
};
