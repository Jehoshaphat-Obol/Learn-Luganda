/*
 * Unit 14: Work and jobs. People nouns in omu-/aba-, asking what someone
 * does, and talking about pay.
 */
export default {
  id: 'u14',
  title: 'Work and jobs',
  description: 'Say what you do, ask about jobs and talk about pay.',
  color: 'ink',
  character: 'mukasa',
  words: [
    ['omulimi', 'omulimi', 'farmer', { altEn: ['a farmer', 'the farmer'] }],
    ['abalimi', 'abalimi', 'farmers', { altEn: ['the farmers'] }],
    ['omusuubuzi', 'omusuubuzi', 'trader', { altEn: ['businessperson', 'merchant', 'shopkeeper', 'a trader'] }],
    ['omuvuzi', 'omuvuzi', 'driver', { altEn: ['a driver', 'rider', 'the driver'], notes: 'From okuvuga, to drive or ride.' }],
    ['omufumbi', 'omufumbi', 'cook', { altEn: ['chef', 'a cook', 'the cook'] }],
    ['omuzimbi', 'omuzimbi', 'builder', { altEn: ['a builder', 'the builder'] }],
    ['omupoliisi', 'omupoliisi', 'police officer', { altEn: ['policeman', 'policewoman', 'police'] }],
    ['omukozi', 'omukozi', 'worker', { altEn: ['employee', 'a worker'] }],
    ['abakozi', 'abakozi', 'workers', { altEn: ['employees', 'staff', 'the workers'] }],
    ['okola-mulimu-ki', 'Okola mulimu ki?', 'What work do you do?', { altEn: ['what is your job', 'what do you do', 'what’s your job'] }],
    ['ofiisi', 'ofiisi', 'office', { altEn: ['the office', 'an office'] }],
    ['ennimiro', 'ennimiro', 'garden', { altEn: ['farm', 'field', 'the garden'], notes: 'A food garden or small farm.' }],
    ['okulima', 'okulima', 'to farm', { altEn: ['to dig', 'farming', 'to cultivate'] }],
    ['okuvuga', 'okuvuga', 'to drive', { altEn: ['to ride', 'driving'] }],
    ['omusaala', 'omusaala', 'salary', { altEn: ['pay', 'wages', 'the salary'] }],
    ['nfuna', 'Nfuna', 'I get', { altEn: ['i receive', 'i earn', 'i obtain'] }],
    ['nkolera', 'Nkolera', 'I work for', { altEn: ['i am working for'], notes: 'Nkola + -er-: “work for”. More of these in Unit 27.' }],
    ['kampuni', 'kampuni', 'company', { altEn: ['the company', 'a company', 'firm'] }],
    ['nkola-nnyo', 'Nkola nnyo', 'I work hard', { altEn: ['i work a lot', 'i work very hard'] }],
  ],
  sentences: [
    ['s14-ndi-mulimi', 'Ndi mulimi.', 'I am a farmer.', { altEn: ['I’m a farmer.'] }],
    ['s14-abalimi-balima', 'Abalimi balima mu nnimiro.', 'The farmers dig in the garden.', { altEn: ['The farmers farm in the garden.', 'Farmers dig in the garden.', 'The farmers work in the field.'] }],
    ['s14-maama-musuubuzi', 'Maama musuubuzi.', 'Mother is a trader.', { altEn: ['Mum is a trader.', 'My mother is a trader.', 'Mother is a businesswoman.'] }],
    ['s14-ssali-muvuzi', 'Ssali muvuzi.', 'Ssali is a driver.', { altEn: ['Ssali is a rider.'] }],
    ['s14-omufumbi-afumba', 'Omufumbi afumba emmere.', 'The cook cooks food.', { altEn: ['The cook is cooking food.', 'The chef cooks food.'] }],
    ['s14-omuzimbi-azimba', 'Omuzimbi azimba ennyumba.', 'The builder builds a house.', { altEn: ['The builder is building a house.'] }],
    ['s14-omupoliisi-ali-wano', 'Omupoliisi ali wano.', 'The police officer is here.', { altEn: ['The policeman is here.', 'The policewoman is here.'] }],
    ['s14-okola-mulimu-ki', 'Okola mulimu ki?', 'What work do you do?', { altEn: ['What is your job?', 'What do you do?', 'What’s your job?'] }],
    ['s14-nkola-mu-ofiisi', 'Nkola mu ofiisi.', 'I work in an office.', { altEn: ['I work in the office.', 'I work at an office.'] }],
    ['s14-njagala-okuvuga', 'Njagala okuvuga.', 'I like to drive.', { altEn: ['I want to drive.', 'I like driving.'] }],
    ['s14-nfuna-omusaala', 'Nfuna omusaala buli mwezi.', 'I get a salary every month.', { altEn: ['I earn a salary every month.', 'I am paid every month.'] }],
    ['s14-abakozi-bangi', 'Kampuni erina abakozi bangi.', 'The company has many workers.', { altEn: ['The company has lots of workers.', 'The company has many employees.'] }],
    ['s14-nkolera-kampuni', 'Nkolera kampuni ennene.', 'I work for a big company.', { altEn: ['I work for a large company.'] }],
    ['s14-nkola-nnyo', 'Nkola nnyo buli lunaku.', 'I work hard every day.', { altEn: ['I work a lot every day.'] }],
  ],
  skills: [
    {
      id: 'u14s1',
      title: 'Jobs',
      icon: 'profile',
      tip: 'people-nouns',
      lessons: [
        { id: 'u14s1l1', newWords: ['omulimi', 'abalimi', 'omusuubuzi'], sentences: ['s14-ndi-mulimi', 's14-maama-musuubuzi'] },
        { id: 'u14s1l2', newWords: ['omuvuzi', 'omufumbi', 'omuzimbi'], sentences: ['s14-ssali-muvuzi', 's14-omufumbi-afumba', 's14-omuzimbi-azimba'] },
        { id: 'u14s1l3', newWords: ['omupoliisi', 'omukozi', 'abakozi'], sentences: ['s14-omupoliisi-ali-wano'] },
      ],
    },
    {
      id: 'u14s2',
      title: 'At work',
      icon: 'target',
      lessons: [
        { id: 'u14s2l1', newWords: ['okola-mulimu-ki', 'ofiisi'], sentences: ['s14-okola-mulimu-ki', 's14-nkola-mu-ofiisi'] },
        { id: 'u14s2l2', newWords: ['ennimiro', 'okulima'], sentences: ['s14-abalimi-balima', 's14-ndi-mulimi'] },
        {
          id: 'u14s2l3',
          newWords: ['okuvuga'],
          sentences: ['s14-njagala-okuvuga', 's14-okola-mulimu-ki'],
          dialogues: [
            {
              speaker: 'mukasa',
              line: 'Okola mulimu ki?',
              translation: 'What work do you do?',
              options: ['Ndi musomesa.', 'Ente zirya omuddo.', 'Mpulira empewo.'],
              answer: 'Ndi musomesa.',
            },
          ],
        },
      ],
    },
    {
      id: 'u14s3',
      title: 'Earning a living',
      icon: 'gem',
      lessons: [
        { id: 'u14s3l1', newWords: ['omusaala', 'nfuna'], sentences: ['s14-nfuna-omusaala'] },
        { id: 'u14s3l2', newWords: ['kampuni', 'nkolera'], sentences: ['s14-abakozi-bangi', 's14-nkolera-kampuni'] },
        { id: 'u14s3l3', newWords: ['nkola-nnyo'], sentences: ['s14-nkola-nnyo', 's14-nfuna-omusaala', 's14-maama-musuubuzi'] },
      ],
    },
  ],
};
