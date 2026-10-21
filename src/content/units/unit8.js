/*
 * Unit 8: Health and the body. Body parts, saying what hurts, and a visit
 * to the doctor.
 */
export default {
  id: 'u8',
  title: 'Health and the body',
  description: 'Name parts of the body, say what hurts and see a doctor.',
  color: 'vermillion',
  character: 'mukasa',
  words: [
    ['omutwe', 'omutwe', 'head', { altEn: ['the head'] }],
    ['eriiso', 'eriiso', 'eye', { altEn: ['the eye'] }],
    ['amaaso', 'amaaso', 'eyes', { altEn: ['the eyes', 'face'] }],
    ['okutu', 'okutu', 'ear', { altEn: ['the ear'] }],
    ['ennyindo', 'ennyindo', 'nose', { altEn: ['the nose'] }],
    ['akamwa', 'akamwa', 'mouth', { altEn: ['the mouth'] }],
    ['omukono', 'omukono', 'arm', { altEn: ['hand', 'the arm', 'the hand'] }],
    ['okugulu', 'okugulu', 'leg', { altEn: ['the leg', 'foot'] }],
    ['olubuto', 'olubuto', 'stomach', { altEn: ['belly', 'tummy', 'the stomach'] }],
    ['gunnuma', 'gunnuma', 'it hurts me', { altEn: ['hurts', 'it hurts', 'is aching'], notes: 'For mu-/gu- nouns: omutwe gunnuma, my head hurts.' }],
    ['lunnuma', 'lunnuma', 'it hurts me', { altEn: ['hurts', 'it hurts', 'is aching'], notes: 'For lu- nouns: olubuto lunnuma, my stomach hurts.' }],
    ['ndi-mulwadde', 'Ndi mulwadde', 'I am sick', { altEn: ['i’m sick', 'i am ill', 'i’m ill', 'i am unwell'] }],
    ['ssennyiga', 'ssennyiga', 'flu', { altEn: ['a cold', 'cold', 'the flu'] }],
    ['omusujja', 'omusujja', 'fever', { altEn: ['a fever', 'malaria'], notes: 'Often used for malaria too.' }],
    ['omusawo', 'omusawo', 'doctor', { altEn: ['the doctor', 'nurse', 'health worker'] }],
    ['eddagala', 'eddagala', 'medicine', { altEn: ['the medicine', 'medication', 'drugs'] }],
    ['wona-mangu', 'Wona mangu!', 'Get well soon!', { altEn: ['get better soon', 'get well quickly'] }],
    ['wummula', 'Wummula', 'Rest', { altEn: ['rest', 'take a rest'] }],
  ],
  sentences: [
    ['s-omutwe-gunnuma', 'Omutwe gunnuma.', 'My head hurts.', { altEn: ['I have a headache.', 'My head is aching.'] }],
    ['s-olubuto-lunnuma', 'Olubuto lunnuma.', 'My stomach hurts.', { altEn: ['I have a stomach ache.', 'My stomach is aching.'] }],
    ['s-omukono-gunnuma', 'Omukono gunnuma.', 'My arm hurts.', { altEn: ['My hand hurts.'] }],
    ['s-amaaso-gange', 'Amaaso gange.', 'My eyes.', { notes: 'ma- class nouns take gange.' }],
    ['s-ndi-mulwadde', 'Ndi mulwadde.', 'I am sick.', { altEn: ['I’m sick.', 'I am ill.'] }],
    ['s-nnina-ssennyiga', 'Nnina ssennyiga.', 'I have the flu.', { altEn: ['I have a cold.', 'I have flu.'] }],
    ['s-nnina-omusujja', 'Nnina omusujja.', 'I have a fever.', { altEn: ['I have malaria.'] }],
    ['s-ngenda-eri-omusawo', 'Ŋŋenda mu ddwaliro.', 'I am going to the hospital.', { altLg: ['Ngenda mu ddwaliro.'], altEn: ['I’m going to the hospital.', 'I am going to hospital.'] }],
    ['s-omusawo-wange', 'Omusawo wange.', 'My doctor.'],
    ['s-nnywa-eddagala', 'Nnywa eddagala.', 'I take medicine.', { altEn: ['I am taking medicine.', 'I drink medicine.'] }],
    ['s-wummula-wona-mangu', 'Wummula. Wona mangu!', 'Rest. Get well soon!', { altEn: ['Rest. Get better soon!'] }],
  ],
  skills: [
    {
      id: 'u8s1',
      title: 'The body',
      icon: 'profile',
      lessons: [
        { id: 'u8s1l1', newWords: ['omutwe', 'eriiso', 'amaaso', 'okutu', 'ennyindo'], sentences: ['s-amaaso-gange'] },
        { id: 'u8s1l2', newWords: ['akamwa', 'omukono', 'okugulu', 'olubuto'], sentences: ['s-amaaso-gange'] },
      ],
    },
    {
      id: 'u8s2',
      title: 'Feeling unwell',
      icon: 'heart',
      tip: 'it-hurts',
      lessons: [
        { id: 'u8s2l1', newWords: ['gunnuma', 'lunnuma'], sentences: ['s-omutwe-gunnuma', 's-olubuto-lunnuma', 's-omukono-gunnuma'] },
        { id: 'u8s2l2', newWords: ['ndi-mulwadde', 'ssennyiga', 'omusujja'], sentences: ['s-ndi-mulwadde', 's-nnina-ssennyiga', 's-nnina-omusujja'] },
      ],
    },
    {
      id: 'u8s3',
      title: 'At the doctor',
      icon: 'plus',
      lessons: [
        { id: 'u8s3l1', newWords: ['omusawo', 'eddagala'], sentences: ['s-ngenda-eri-omusawo', 's-omusawo-wange', 's-nnywa-eddagala'] },
        {
          id: 'u8s3l2',
          newWords: ['wona-mangu', 'wummula'],
          sentences: ['s-wummula-wona-mangu', 's-nnywa-eddagala', 's-omutwe-gunnuma'],
          dialogues: [
            {
              speaker: 'mukasa',
              line: 'Oli otya?',
              translation: 'How are you?',
              options: ['Ndi mulwadde. Omutwe gunnuma.', 'Kyuka ku ddyo.', 'Ntunda emicungwa.'],
              answer: 'Ndi mulwadde. Omutwe gunnuma.',
            },
          ],
        },
      ],
    },
  ],
};
