/*
 * Unit 4: Numbers and money. Counting past ten, tens, hundreds and
 * thousands, and haggling in shillings.
 */
export default {
  id: 'u4',
  title: 'Numbers and money',
  description: 'Count to thousands and pay in shillings.',
  color: 'butter',
  character: 'ssali',
  words: [
    ['kkumi-na-emu', 'kkumi n’emu', 'eleven', { altEn: ['11'], altLg: ['kkumi na emu'] }],
    ['kkumi-na-bbiri', 'kkumi na bbiri', 'twelve', { altEn: ['12'] }],
    ['kkumi-na-ttaano', 'kkumi na ttaano', 'fifteen', { altEn: ['15'] }],
    ['abiri', 'amakumi abiri', 'twenty', { altEn: ['20'] }],
    ['asatu', 'amakumi asatu', 'thirty', { altEn: ['30'] }],
    ['ataano', 'amakumi ataano', 'fifty', { altEn: ['50'] }],
    ['kikumi', 'kikumi', 'one hundred', { altEn: ['a hundred', '100', 'hundred'] }],
    ['bikumi-bibiri', 'bikumi bibiri', 'two hundred', { altEn: ['200'] }],
    ['bikumi-bitaano', 'bikumi bitaano', 'five hundred', { altEn: ['500'] }],
    ['lukumi', 'lukumi', 'one thousand', { altEn: ['a thousand', '1000', '1,000', 'thousand'] }],
    ['nkumi-bbiri', 'nkumi bbiri', 'two thousand', { altEn: ['2000', '2,000'] }],
    ['nkumi-ttaano', 'nkumi ttaano', 'five thousand', { altEn: ['5000', '5,000'] }],
    ['omutwalo', 'omutwalo', 'ten thousand', { altEn: ['10000', '10,000'] }],
    ['ssente', 'ssente', 'money', { altEn: ['the money', 'cash'] }],
    ['ssiringi', 'ssiringi', 'shillings', { altEn: ['shilling', 'the shillings'] }],
    ['mmeka', 'mmeka', 'how much', { altEn: ['how many'] }],
    ['kino', 'kino', 'this', { altEn: ['this one'], notes: 'For ki- class things: kino kitabo, this book.' }],
    ['bbeeyi', 'bbeeyi', 'price', { altEn: ['the price', 'cost'] }],
    ['kya-bbeeyi', 'kya bbeeyi', 'expensive', { altEn: ['it’s expensive', 'it is expensive', 'too expensive'] }],
    ['kya-buseere', 'kya buseere', 'cheap', { altEn: ['it’s cheap', 'it is cheap'] }],
    ['kendeezaako', 'Kendeezaako', 'Lower the price a bit', { altEn: ['reduce the price', 'give me a discount', 'lower it a little'] }],
    ['kale-nkitwala-w', 'Kale, nkitwala', 'Okay, I’ll take it', { altEn: ['ok, i’ll take it', 'okay, i will take it', 'ok, i will take it'] }],
  ],
  sentences: [
    ['s-ebitabo-kkumi-na-bbiri', 'Ebitabo kkumi na bbiri.', 'Twelve books.'],
    ['s-abaana-abiri', 'Abaana amakumi abiri.', 'Twenty children.'],
    ['s-ssiringi-kikumi', 'Ssiringi kikumi.', 'One hundred shillings.', { altEn: ['100 shillings.', 'A hundred shillings.'] }],
    ['s-ssiringi-bikumi-bitaano', 'Ssiringi bikumi bitaano.', 'Five hundred shillings.', { altEn: ['500 shillings.'] }],
    ['s-ssiringi-lukumi', 'Ssiringi lukumi.', 'One thousand shillings.', { altEn: ['1000 shillings.', 'A thousand shillings.'] }],
    ['s-ssente-nkumi-ttaano', 'Ssente nkumi ttaano.', 'Five thousand shillings.', { altEn: ['5000 shillings.', 'Five thousand.'] }],
    ['s-omutwalo-gumu', 'Omutwalo gumu.', 'Ten thousand.', { altEn: ['10,000.', 'Ten thousand shillings.'] }],
    ['s-ssente-mmeka', 'Ssente mmeka?', 'How much money?', { altEn: ['How much is it?', 'How much?'] }],
    ['s-kino-ssente-mmeka', 'Kino ssente mmeka?', 'How much is this?', { altEn: ['How much does this cost?'] }],
    ['s-kya-bbeeyi-nnyo', 'Kya bbeeyi nnyo!', 'It’s very expensive!', { altEn: ['It is very expensive!', 'That’s too expensive!'] }],
    ['s-kendeezaako-ssebo', 'Kendeezaako, ssebo.', 'Lower the price a bit, sir.', { altEn: ['Reduce the price, sir.', 'Give me a discount, sir.'] }],
    ['s-kale-nkitwala', 'Kale, nkitwala.', 'Okay, I’ll take it.', { altEn: ['Ok, I’ll take it.', 'Okay, I will take it.'] }],
  ],
  skills: [
    {
      id: 'u4s1',
      title: 'Numbers 11–100',
      icon: 'target',
      tip: 'counting',
      lessons: [
        { id: 'u4s1l1', newWords: ['kkumi-na-emu', 'kkumi-na-bbiri', 'kkumi-na-ttaano'], sentences: ['s-ebitabo-kkumi-na-bbiri'] },
        { id: 'u4s1l2', newWords: ['abiri', 'asatu', 'ataano', 'kikumi'], sentences: ['s-abaana-abiri'] },
      ],
    },
    {
      id: 'u4s2',
      title: 'Shillings',
      icon: 'gem',
      lessons: [
        { id: 'u4s2l1', newWords: ['ssente', 'ssiringi', 'bikumi-bibiri', 'bikumi-bitaano'], sentences: ['s-ssiringi-kikumi', 's-ssiringi-bikumi-bitaano'] },
        { id: 'u4s2l2', newWords: ['lukumi', 'nkumi-bbiri', 'nkumi-ttaano', 'omutwalo'], sentences: ['s-ssiringi-lukumi', 's-ssente-nkumi-ttaano', 's-omutwalo-gumu'] },
      ],
    },
    {
      id: 'u4s3',
      title: 'Haggling',
      icon: 'shop',
      lessons: [
        { id: 'u4s3l1', newWords: ['mmeka', 'kino', 'bbeeyi'], sentences: ['s-ssente-mmeka', 's-kino-ssente-mmeka'] },
        {
          id: 'u4s3l2',
          newWords: ['kya-bbeeyi', 'kya-buseere', 'kendeezaako', 'kale-nkitwala-w'],
          sentences: ['s-kya-bbeeyi-nnyo', 's-kendeezaako-ssebo', 's-kale-nkitwala'],
          dialogues: [
            {
              speaker: 'mukasa',
              line: 'Ssente nkumi ttaano.',
              translation: 'Five thousand shillings.',
              options: ['Kya bbeeyi nnyo! Kendeezaako.', 'Nnina ennyonta.', 'Wasuze otya?'],
              answer: 'Kya bbeeyi nnyo! Kendeezaako.',
            },
          ],
        },
      ],
    },
  ],
};
