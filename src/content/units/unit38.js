/*
 * Unit 38: Emergencies. Calling for help, accidents and theft, urgent
 * commands, and the passive -ibwa / -ebwa ("was stolen", "is injured").
 */
export default {
  id: 'u38',
  title: 'Emergencies',
  description: 'Call for help, deal with accidents and report a theft.',
  color: 'vermillion',
  character: 'ssali',
  words: [
    ['nnyamba', 'Nnyamba!', 'Help me!', { altEn: ['help', 'help!'] }],
    ['yanguwa', 'Yanguwa!', 'Hurry!', { altEn: ['hurry up', 'quickly', 'be quick'] }],
    ['omubbi', 'omubbi', 'thief', { altEn: ['robber', 'a thief', 'the thief'] }],
    ['poliisi', 'poliisi', 'police', { altEn: ['the police'] }],
    ['ebbiddwa', 'ebbiddwa', 'has been stolen', { altEn: ['was stolen', 'is stolen', 'stolen'], notes: 'For n- nouns: essimu ebbiddwa.' }],
    ['akabenje', 'akabenje', 'accident', { altEn: ['an accident', 'the accident', 'crash'] }],
    ['alumiziddwa', 'alumiziddwa', 'is injured', { altEn: ['has been hurt', 'is hurt', 'injured', 'was injured'] }],
    ['omusaayi', 'omusaayi', 'blood', { altEn: ['the blood', 'bleeding'] }],
    ['ambulensi', 'ambulensi', 'ambulance', { altEn: ['the ambulance', 'an ambulance'] }],
    ['linda', 'Linda', 'Wait', { altEn: ['wait here', 'hold on'] }],
    ['tewali-kizibu', 'Tewali kizibu', 'No problem', { altEn: ['there is no problem', 'it’s fine', 'no worries'] }],
    ['ndi-bulungi', 'Ndi bulungi', 'I’m okay', { altEn: ['i am fine', 'i’m fine', 'i am okay', 'i am ok', 'i’m ok'] }],
  ],
  sentences: [
    ['s38-nnyamba', 'Nnyamba! Nnyamba!', 'Help me! Help me!', { altEn: ['Help! Help!'] }],
    ['s38-omuliro', 'Omuliro! Yanguwa!', 'Fire! Hurry!', { altEn: ['Fire! Hurry up!', 'Fire! Quick!'] }],
    ['s38-omubbi', 'Omubbi! Mumukwate!', 'Thief! Catch him!', { altEn: ['Thief! Catch her!', 'A thief! Catch him!'] }],
    ['s38-kubira-poliisi', 'Kubira poliisi essimu!', 'Call the police!', { altEn: ['Phone the police!', 'Ring the police!'] }],
    ['s38-essimu-ebbiddwa', 'Essimu yange ebbiddwa.', 'My phone has been stolen.', { altEn: ['My phone was stolen.', 'Someone stole my phone.'] }],
    ['s38-akabenje', 'Waliwo akabenje ku kkubo.', 'There is an accident on the road.', { altEn: ['There’s been an accident on the road.', 'There’s an accident on the road.'] }],
    ['s38-alumiziddwa', 'Omusajja alumiziddwa. Alina omusaayi.', 'The man is injured. He is bleeding.', { altEn: ['The man is hurt. He is bleeding.', 'The man has been injured. He has blood.'] }],
    ['s38-ambulensi', 'Tukubire ambulensi mangu!', 'Let’s call an ambulance quickly!', { altEn: ['Let us call an ambulance quickly!', 'Call an ambulance fast!'] }],
    ['s38-linda-wano', 'Tuula wano, linda.', 'Sit here and wait.', { altEn: ['Sit here, wait.', 'Sit here and hold on.'] }],
    ['s38-oli-bulungi', 'Oli bulungi? Yee, ndi bulungi.', 'Are you okay? Yes, I’m okay.', { altEn: ['Are you alright? Yes, I am fine.', 'Are you ok? Yes, I am ok.'] }],
    ['s38-tewali-kizibu', 'Weebale nnyo! Tewali kizibu.', 'Thank you very much! No problem.', { altEn: ['Thanks a lot! No problem.'] }],
  ],
  skills: [
    {
      id: 'u38s1',
      title: 'Help!',
      icon: 'bolt',
      lessons: [
        { id: 'u38s1l1', newWords: ['nnyamba', 'yanguwa'], sentences: ['s38-nnyamba', 's38-omuliro'] },
        { id: 'u38s1l2', newWords: ['omubbi', 'poliisi'], sentences: ['s38-omubbi', 's38-kubira-poliisi'] },
        { id: 'u38s1l3', newWords: ['ebbiddwa'], sentences: ['s38-essimu-ebbiddwa', 's38-kubira-poliisi'] },
      ],
    },
    {
      id: 'u38s2',
      title: 'Accidents',
      icon: 'plus',
      tip: 'passive',
      lessons: [
        { id: 'u38s2l1', newWords: ['akabenje', 'alumiziddwa'], sentences: ['s38-akabenje', 's38-alumiziddwa'] },
        { id: 'u38s2l2', newWords: ['omusaayi', 'ambulensi'], sentences: ['s38-ambulensi', 's38-alumiziddwa'] },
        { id: 'u38s2l3', newWords: ['linda'], sentences: ['s38-linda-wano', 's38-akabenje'] },
      ],
    },
    {
      id: 'u38s3',
      title: 'After the danger',
      icon: 'heart',
      lessons: [
        { id: 'u38s3l1', newWords: ['ndi-bulungi'], sentences: ['s38-oli-bulungi'] },
        { id: 'u38s3l2', newWords: ['tewali-kizibu'], sentences: ['s38-tewali-kizibu', 's38-oli-bulungi'] },
        {
          id: 'u38s3l3',
          newWords: [],
          sentences: ['s38-essimu-ebbiddwa', 's38-ambulensi', 's38-nnyamba'],
          dialogues: [
            {
              speaker: 'ssali',
              line: 'Waliwo akabenje! Omusajja alumiziddwa.',
              translation: 'There’s an accident! A man is injured.',
              options: ['Tukubire ambulensi mangu!', 'Nzikiriza naawe.', 'Tewali kizibu.'],
              answer: 'Tukubire ambulensi mangu!',
            },
          ],
        },
      ],
    },
  ],
};
