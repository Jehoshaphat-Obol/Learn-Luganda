/*
 * Unit 31: Business. A small shop, customers, saving and borrowing, and
 * the causative -is-/-es- ("make someone do").
 */
export default {
  id: 'u31',
  title: 'Business',
  description: 'Run a small shop, serve customers, save money and teach others.',
  color: 'butter',
  character: 'ssali',
  words: [
    ['bizinensi', 'bizinensi', 'business', { altEn: ['the business', 'trade'] }],
    ['omuguzi', 'omuguzi', 'customer', { altEn: ['buyer', 'client', 'a customer'] }],
    ['abaguzi', 'abaguzi', 'customers', { altEn: ['buyers', 'clients'] }],
    ['amagoba', 'amagoba', 'profit', { altEn: ['profits', 'gain', 'the profit'] }],
    ['nfunye', 'Nfunye', 'I have got', { altEn: ['i got', 'i’ve got', 'i have made', 'i made', 'i received'] }],
    ['okutereka', 'okutereka', 'to save', { altEn: ['saving', 'to keep', 'to store'] }],
    ['bbanka', 'bbanka', 'bank', { altEn: ['the bank'] }],
    ['ebbanja', 'ebbanja', 'debt', { altEn: ['loan', 'a debt', 'the debt'] }],
    ['okwewola', 'okwewola', 'to borrow', { altEn: ['borrowing', 'to take a loan'] }],
    ['nsomesa', 'Nsomesa', 'I teach', { altEn: ['i am teaching'], notes: '-soma (read) + -es-: make someone read.' }],
    ['ndisa', 'Ndisa', 'I feed', { altEn: ['i am feeding'], notes: '-lya (eat) + -is-: make someone eat.' }],
    ['nnywesa', 'Nnywesa', 'I give a drink to', { altEn: ['i water', 'i give water to'], notes: '-nywa (drink) + -es-.' }],
    ['ntunza', 'Ntunza', 'I sell', { altEn: ['i trade', 'i market'], notes: 'Often used for selling as a business.' }],
  ],
  sentences: [
    ['s31-nnina-bizinensi', 'Nnina bizinensi entono.', 'I have a small business.', { altEn: ['I own a small business.'] }],
    ['s31-ntunza-engoye', 'Ntunza engoye mu katale.', 'I sell clothes at the market.', { altEn: ['I sell clothes in the market.'] }],
    ['s31-omuguzi', 'Omuguzi ajja!', 'A customer is coming!', { altEn: ['The customer is coming!'] }],
    ['s31-abaguzi-bangi', 'Leero abaguzi bangi.', 'Today there are many customers.', { altEn: ['There are many customers today.'] }],
    ['s31-nfunye-amagoba', 'Nfunye amagoba mangi.', 'I have made a lot of profit.', { altEn: ['I made a lot of profit.', 'I’ve made lots of profit.'] }],
    ['s31-ntereka-ssente', 'Ntereka ssente mu bbanka.', 'I save money in the bank.', { altEn: ['I keep money in the bank.'] }],
    ['s31-ebbanja', 'Sirina bbanja.', 'I don’t have any debt.', { altEn: ['I have no debt.', 'I do not have a debt.'] }],
    ['s31-okwewola', 'Njagala okwewola ssente.', 'I want to borrow money.', { altEn: ['I would like to borrow money.'] }],
    ['s31-nsomesa-abaana', 'Nsomesa abaana Oluganda.', 'I teach the children Luganda.', { altEn: ['I teach children Luganda.'] }],
    ['s31-ndisa-abaana', 'Ndisa abaana ku makya.', 'I feed the children in the morning.', { altEn: ['I feed the children every morning.'] }],
    ['s31-nnywesa-ente', 'Nnywesa ente amazzi.', 'I give the cows water.', { altEn: ['I water the cows.', 'I give water to the cows.'] }],
  ],
  skills: [
    {
      id: 'u31s1',
      title: 'A small shop',
      icon: 'shop',
      lessons: [
        { id: 'u31s1l1', newWords: ['bizinensi', 'ntunza'], sentences: ['s31-nnina-bizinensi', 's31-ntunza-engoye'] },
        { id: 'u31s1l2', newWords: ['omuguzi', 'abaguzi'], sentences: ['s31-omuguzi', 's31-abaguzi-bangi'] },
        {
          id: 'u31s1l3',
          newWords: [],
          sentences: ['s31-ntunza-engoye', 's31-abaguzi-bangi'],
          dialogues: [
            {
              speaker: 'ssali',
              line: 'Gyebale ko! Bizinensi egenda etya?',
              translation: 'Well done! How is business going?',
              options: ['Bulungi. Leero abaguzi bangi.', 'Amiina.', 'Kuba engoma!'],
              answer: 'Bulungi. Leero abaguzi bangi.',
            },
          ],
        },
      ],
    },
    {
      id: 'u31s2',
      title: 'Money matters',
      icon: 'gem',
      lessons: [
        { id: 'u31s2l1', newWords: ['amagoba', 'nfunye'], sentences: ['s31-nfunye-amagoba'] },
        { id: 'u31s2l2', newWords: ['okutereka', 'bbanka'], sentences: ['s31-ntereka-ssente'] },
        { id: 'u31s2l3', newWords: ['ebbanja', 'okwewola'], sentences: ['s31-ebbanja', 's31-okwewola'] },
      ],
    },
    {
      id: 'u31s3',
      title: 'Making others do',
      icon: 'bolt',
      tip: 'causative',
      lessons: [
        { id: 'u31s3l1', newWords: ['nsomesa'], sentences: ['s31-nsomesa-abaana'] },
        { id: 'u31s3l2', newWords: ['ndisa', 'nnywesa'], sentences: ['s31-ndisa-abaana', 's31-nnywesa-ente'] },
        { id: 'u31s3l3', newWords: [], sentences: ['s31-nsomesa-abaana', 's31-nnywesa-ente', 's31-nfunye-amagoba'] },
      ],
    },
  ],
};
