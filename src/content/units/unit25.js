/*
 * Unit 25: Clans and totems. Buganda's clans (ebika), their totems
 * (emiziro), and the possessive "of" (-a) that links nouns.
 */
export default {
  id: 'u25',
  title: 'Clans and totems',
  description: 'Learn about Buganda’s clans, their totems and saying who you are.',
  color: 'ink',
  character: 'jjajja',
  words: [
    ['ekika', 'ekika', 'clan', { altEn: ['the clan', 'a clan'] }],
    ['ebika', 'ebika', 'clans', { altEn: ['the clans'] }],
    ['omuziro', 'omuziro', 'totem', { altEn: ['the totem', 'a totem'] }],
    ['emiziro', 'emiziro', 'totems', { altEn: ['the totems'] }],
    ['kya', 'kya', 'of', { notes: 'For eki- nouns: ekika kya Ffumbe, the clan of the civet cat.' }],
    ['gwa', 'gwa', 'of', { notes: 'For omu- (things) nouns: omuziro gwa…, the totem of…' }],
    ['ffumbe', 'Ffumbe', 'civet cat', { altEn: ['civet', 'the civet cat clan', 'ffumbe clan'], notes: 'A clan and its totem.' }],
    ['lugave', 'Lugave', 'pangolin', { altEn: ['the pangolin clan', 'lugave clan'], notes: 'A clan and its totem.' }],
    ['mmamba', 'Mmamba', 'lungfish', { altEn: ['the lungfish clan', 'mmamba clan'], notes: 'One of the largest clans.' }],
    ['ngeye', 'Ngeye', 'colobus monkey', { altEn: ['colobus', 'the colobus monkey clan', 'ngeye clan'] }],
    ['ndi-wa', 'Ndi wa', 'I am of', { altEn: ['i belong to', 'i’m of', 'i am from'], notes: 'Ndi wa Lugave: I am of the Lugave clan.' }],
    ['oli-wa-kika-ki', 'Oli wa kika ki?', 'Which clan are you?', { altEn: ['what is your clan', 'which clan are you from', 'what clan are you'] }],
    ['tetulya', 'tetulya', 'we don’t eat', { altEn: ['we do not eat'] }],
    ['owooluganda', 'owooluganda', 'relative', { altEn: ['brother', 'sister', 'sibling', 'kin', 'family member'] }],
    ['jjajja-omutaka', 'omutaka', 'clan head', { altEn: ['clan elder', 'clan leader', 'chief'] }],
  ],
  sentences: [
    ['s25-ekika-kyange', 'Ekika kyange Ffumbe.', 'My clan is Ffumbe.', { altEn: ['My clan is the civet cat.'] }],
    ['s25-ebika-bingi', 'Mu Buganda mulimu ebika bingi.', 'In Buganda there are many clans.', { altEn: ['There are many clans in Buganda.'] }],
    ['s25-omuziro-gwange', 'Omuziro gwange lugave.', 'My totem is the pangolin.', { altEn: ['My totem is pangolin.'] }],
    ['s25-ekika-kya-mmamba', 'Ekika kya Mmamba kinene.', 'The Mmamba clan is big.', { altEn: ['The lungfish clan is big.', 'The Mmamba clan is large.'] }],
    ['s25-ndi-wa-lugave', 'Ndi wa Lugave.', 'I am of the Lugave clan.', { altEn: ['I belong to the Lugave clan.', 'I’m Lugave.', 'I am Lugave.'] }],
    ['s25-oli-wa-kika-ki', 'Oli wa kika ki?', 'Which clan are you?', { altEn: ['What is your clan?', 'Which clan are you from?'] }],
    ['s25-tetulya-mmamba', 'Tetulya mmamba.', 'We don’t eat lungfish.', { altEn: ['We do not eat lungfish.'] }],
    ['s25-omuziro-gwa-ngeye', 'Omuziro gwa Ngeye ngeye.', 'The totem of Ngeye is the colobus monkey.', { altEn: ['The Ngeye clan’s totem is the colobus monkey.'] }],
    ['s25-tuli-booluganda', 'Tuli booluganda.', 'We are relatives.', { altEn: ['We are family.', 'We are related.', 'We are brothers.', 'We are sisters.'] }],
    ['s25-omutaka', 'Omutaka w’ekika ajja.', 'The clan head is coming.', { altLg: ['Omutaka wekika ajja.'], altEn: ['The clan elder is coming.', 'The clan head will come.'] }],
  ],
  skills: [
    {
      id: 'u25s1',
      title: 'Ebika',
      icon: 'trophy',
      tip: 'clans',
      lessons: [
        { id: 'u25s1l1', newWords: ['ekika', 'ebika'], sentences: ['s25-ebika-bingi'] },
        { id: 'u25s1l2', newWords: ['ffumbe', 'kya'], sentences: ['s25-ekika-kyange', 's25-ekika-kya-mmamba'] },
        { id: 'u25s1l3', newWords: ['mmamba', 'tetulya'], sentences: ['s25-tetulya-mmamba', 's25-ekika-kya-mmamba'] },
      ],
    },
    {
      id: 'u25s2',
      title: 'Totems',
      icon: 'star',
      tip: 'of',
      lessons: [
        { id: 'u25s2l1', newWords: ['omuziro', 'emiziro'], sentences: ['s25-omuziro-gwange'] },
        { id: 'u25s2l2', newWords: ['lugave', 'gwa'], sentences: ['s25-omuziro-gwange', 's25-omuziro-gwa-ngeye'] },
        { id: 'u25s2l3', newWords: ['ngeye'], sentences: ['s25-omuziro-gwa-ngeye', 's25-tetulya-mmamba'] },
      ],
    },
    {
      id: 'u25s3',
      title: 'Names and clans',
      icon: 'profile',
      lessons: [
        { id: 'u25s3l1', newWords: ['ndi-wa', 'oli-wa-kika-ki'], sentences: ['s25-ndi-wa-lugave', 's25-oli-wa-kika-ki'] },
        { id: 'u25s3l2', newWords: ['owooluganda'], sentences: ['s25-tuli-booluganda', 's25-ndi-wa-lugave'] },
        {
          id: 'u25s3l3',
          newWords: ['jjajja-omutaka'],
          sentences: ['s25-omutaka', 's25-oli-wa-kika-ki'],
          dialogues: [
            {
              speaker: 'jjajja',
              line: 'Oli wa kika ki, mwana wange?',
              translation: 'Which clan are you, my child?',
              options: ['Ndi wa Lugave, Jjajja.', 'Nkooye nnyo.', 'Gattako omunnyo.'],
              answer: 'Ndi wa Lugave, Jjajja.',
            },
          ],
        },
      ],
    },
  ],
};
