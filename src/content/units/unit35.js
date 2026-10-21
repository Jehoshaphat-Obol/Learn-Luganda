/*
 * Unit 35: Telling stories. Story openings, the narrative ne- ("and
 * then he…"), and endings.
 */
export default {
  id: 'u35',
  title: 'Telling stories',
  description: 'Open a story, keep it moving with “and then” and bring it to an end.',
  color: 'blush',
  character: 'amara',
  words: [
    ['enfumo', 'enfumo', 'folktale', { altEn: ['story', 'fable', 'tale'] }],
    ['olwatuuka', 'Olwatuuka', 'Once upon a time', { altEn: ['it happened', 'it came to pass', 'once'] }],
    ['olwali-olumu', 'olwali olumu', 'one day', { altEn: ['once', 'on one day'] }],
    ['waaliwo', 'waaliwo', 'there was', { altEn: ['there were', 'there once was'] }],
    ['awo', 'Awo', 'Then', { altEn: ['and then', 'so'] }],
    ['nagenda', 'n’agenda', 'and he went', { altLg: ['nagenda'], altEn: ['and she went', 'then he went', 'then she went'] }],
    ['nalaba', 'n’alaba', 'and he saw', { altLg: ['nalaba'], altEn: ['and she saw', 'then he saw', 'then she saw'] }],
    ['nagamba', 'n’agamba', 'and he said', { altLg: ['nagamba'], altEn: ['and she said', 'then he said', 'then she said'] }],
    ['ekyavaamu', 'Ekyavaamu', 'In the end', { altEn: ['finally', 'the result', 'at last'] }],
    ['kale-nno', 'Kale nno', 'Well then', { altEn: ['so then', 'well', 'okay then'] }],
    ['enfumo-ewedde', 'Enfumo yange ekomye awo', 'My story ends there', { altEn: ['the end', 'that is the end of my story', 'my story ends here'] }],
  ],
  sentences: [
    ['s35-olwatuuka', 'Olwatuuka olwali olumu…', 'Once upon a time, one day…', { altEn: ['It happened one day…', 'Once upon a time…'] }],
    ['s35-waaliwo-omusajja', 'Waaliwo omusajja omu.', 'There was a man.', { altEn: ['There was one man.', 'There once was a man.'] }],
    ['s35-waaliwo-omukazi', 'Waaliwo omukazi n’omwana we.', 'There was a woman and her child.', { altLg: ['Waaliwo omukazi nomwana we.'], altEn: ['There was a woman with her child.'] }],
    ['s35-nagenda-mu-kibira', 'Awo n’agenda mu kibira.', 'Then he went into the forest.', { altLg: ['Awo nagenda mu kibira.'], altEn: ['Then she went into the forest.', 'And he went to the forest.'] }],
    ['s35-nalaba-empologoma', 'N’alaba empologoma!', 'And he saw a lion!', { altLg: ['Nalaba empologoma!'], altEn: ['And she saw a lion!', 'Then he saw a lion!'] }],
    ['s35-nagamba', 'N’agamba nti, “Totya!”', 'And he said, “Don’t be afraid!”', { altLg: ['Nagamba nti, “Totya!”'], altEn: ['And she said, “Don’t be afraid!”', 'Then he said, “Don’t be afraid!”'] }],
    ['s35-ekyavaamu', 'Ekyavaamu, n’addayo awaka.', 'In the end, he went back home.', { altLg: ['Ekyavaamu, naddayo awaka.'], altEn: ['In the end, she went back home.', 'Finally, he went back home.'] }],
    ['s35-kale-nno', 'Kale nno, wuliriza enfumo eno.', 'Well then, listen to this story.', { altEn: ['Well, listen to this story.', 'So then, listen to this folktale.'] }],
    ['s35-enfumo-ekomye', 'Enfumo yange ekomye awo.', 'My story ends there.', { altEn: ['That’s the end of my story.', 'My story ends here.'] }],
  ],
  skills: [
    {
      id: 'u35s1',
      title: 'Once upon a time',
      icon: 'book',
      tip: 'story-openings',
      lessons: [
        { id: 'u35s1l1', newWords: ['enfumo', 'olwatuuka', 'olwali-olumu'], sentences: ['s35-olwatuuka', 's35-kale-nno'] },
        { id: 'u35s1l2', newWords: ['waaliwo'], sentences: ['s35-waaliwo-omusajja', 's35-waaliwo-omukazi'] },
        { id: 'u35s1l3', newWords: ['kale-nno'], sentences: ['s35-kale-nno', 's35-olwatuuka', 's35-waaliwo-omusajja'] },
      ],
    },
    {
      id: 'u35s2',
      title: 'And then',
      icon: 'arrow',
      tip: 'narrative-ne',
      lessons: [
        { id: 'u35s2l1', newWords: ['awo', 'nagenda'], sentences: ['s35-nagenda-mu-kibira'] },
        { id: 'u35s2l2', newWords: ['nalaba'], sentences: ['s35-nalaba-empologoma', 's35-nagenda-mu-kibira'] },
        { id: 'u35s2l3', newWords: ['nagamba'], sentences: ['s35-nagamba', 's35-nalaba-empologoma'] },
      ],
    },
    {
      id: 'u35s3',
      title: 'The end',
      icon: 'check',
      lessons: [
        { id: 'u35s3l1', newWords: ['ekyavaamu'], sentences: ['s35-ekyavaamu'] },
        { id: 'u35s3l2', newWords: ['enfumo-ewedde'], sentences: ['s35-enfumo-ekomye', 's35-ekyavaamu'] },
        {
          id: 'u35s3l3',
          newWords: [],
          sentences: ['s35-olwatuuka', 's35-nagenda-mu-kibira', 's35-nalaba-empologoma', 's35-enfumo-ekomye'],
          dialogues: [
            {
              speaker: 'amara',
              line: 'Waaliwo omusajja omu. Awo n’agenda mu kibira…',
              translation: 'There was a man. Then he went into the forest…',
              options: ['N’alaba ki?', 'Nnandyagadde caayi.', 'Kye kimu.'],
              answer: 'N’alaba ki?',
            },
          ],
        },
      ],
    },
  ],
};
