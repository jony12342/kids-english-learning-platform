/**
 * Sentence Library
 * 短句库（100个常用短句）
 *
 * 适合3-6岁儿童学习的日常英语短句
 */

import { Sentence, SentenceCategory, WordDifficulty } from '../types/vocabulary';

/**
 * EASY SENTENCES (40) - 简单短句
 * 适合初学者，3-4岁
 */
export const EASY_SENTENCES: Sentence[] = [
  // Greetings (10)
  {
    sentenceId: 'sent_001',
    sentence: 'Hello!',
    chinese: '你好！',
    category: 'greetings',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_002',
    sentence: 'Hi!',
    chinese: '嗨！',
    category: 'greetings',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_003',
    sentence: 'Good morning!',
    chinese: '早上好！',
    category: 'greetings',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_004',
    sentence: 'Good night!',
    chinese: '晚安！',
    category: 'greetings',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_005',
    sentence: 'How are you?',
    chinese: '你好吗？',
    category: 'greetings',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_006',
    sentence: 'I am fine.',
    chinese: '我很好。',
    category: 'greetings',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_007',
    sentence: 'Nice to meet you.',
    chinese: '很高兴见到你。',
    category: 'greetings',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_008',
    sentence: 'See you later!',
    chinese: '回头见！',
    category: 'greetings',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_009',
    sentence: 'Goodbye!',
    chinese: '再见！',
    category: 'greetings',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_010',
    sentence: 'Bye bye!',
    chinese: '拜拜！',
    category: 'greetings',
    difficulty: 'easy'
  },

  // Introduction (5)
  {
    sentenceId: 'sent_011',
    sentence: 'I am Tom.',
    chinese: '我是汤姆。',
    category: 'introduction',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_012',
    sentence: 'My name is Lucy.',
    chinese: '我叫露西。',
    category: 'introduction',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_013',
    sentence: 'I am five years old.',
    chinese: '我五岁了。',
    category: 'introduction',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_014',
    sentence: 'I am a boy.',
    chinese: '我是个男孩。',
    category: 'introduction',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_015',
    sentence: 'I am a girl.',
    chinese: '我是个女孩。',
    category: 'introduction',
    difficulty: 'easy'
  },

  // Daily (10)
  {
    sentenceId: 'sent_016',
    sentence: 'Thank you.',
    chinese: '谢谢你。',
    category: 'daily',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_017',
    sentence: 'You are welcome.',
    chinese: '不客气。',
    category: 'daily',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_018',
    sentence: 'Please help me.',
    chinese: '请帮帮我。',
    category: 'daily',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_019',
    sentence: 'Excuse me.',
    chinese: '打扰一下。',
    category: 'daily',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_020',
    sentence: 'I am sorry.',
    chinese: '对不起。',
    category: 'daily',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_021',
    sentence: 'It is okay.',
    chinese: '没关系。',
    category: 'daily',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_022',
    sentence: 'Yes, please.',
    chinese: '是的，请。',
    category: 'daily',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_023',
    sentence: 'No, thank you.',
    chinese: '不，谢谢。',
    category: 'daily',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_024',
    sentence: 'I do not know.',
    chinese: '我不知道。',
    category: 'daily',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_025',
    sentence: 'I understand.',
    chinese: '我明白了。',
    category: 'daily',
    difficulty: 'easy'
  },

  // Manners (5)
  {
    sentenceId: 'sent_026',
    sentence: 'Thank you very much.',
    chinese: '非常感谢。',
    category: 'manners',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_027',
    sentence: 'You are so kind.',
    chinese: '你真好。',
    category: 'manners',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_028',
    sentence: 'May I come in?',
    chinese: '我可以进来吗？',
    category: 'manners',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_029',
    sentence: 'After you.',
    chinese: '你先请。',
    category: 'manners',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_030',
    sentence: 'Ladies first.',
    chinese: '女士优先。',
    category: 'manners',
    difficulty: 'easy'
  },

  // Activities (10)
  {
    sentenceId: 'sent_031',
    sentence: 'Let us play!',
    chinese: '我们一起玩吧！',
    category: 'activities',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_032',
    sentence: 'Let us go!',
    chinese: '我们走吧！',
    category: 'activities',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_033',
    sentence: 'I like to play.',
    chinese: '我喜欢玩。',
    category: 'activities',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_034',
    sentence: 'I like to run.',
    chinese: '我喜欢跑步。',
    category: 'activities',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_035',
    sentence: 'I like to jump.',
    chinese: '我喜欢跳。',
    category: 'activities',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_036',
    sentence: 'Let us eat.',
    chinese: '我们吃饭吧。',
    category: 'activities',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_037',
    sentence: 'Time to sleep.',
    chinese: '该睡觉了。',
    category: 'activities',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_038',
    sentence: 'Time to go home.',
    chinese: '该回家了。',
    category: 'activities',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_039',
    sentence: 'I am ready.',
    chinese: '我准备好了。',
    category: 'activities',
    difficulty: 'easy'
  },
  {
    sentenceId: 'sent_040',
    sentence: 'Wait for me!',
    chinese: '等等我！',
    category: 'activities',
    difficulty: 'easy'
  },
];

/**
 * MEDIUM SENTENCES (35) - 中等短句
 * 适合有一定基础，4-5岁
 */
export const MEDIUM_SENTENCES: Sentence[] = [
  // Questions (10)
  {
    sentenceId: 'sent_041',
    sentence: 'What is your name?',
    chinese: '你叫什么名字？',
    category: 'questions',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_042',
    sentence: 'How old are you?',
    chinese: '你几岁了？',
    category: 'questions',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_043',
    sentence: 'Where are you going?',
    chinese: '你去哪里？',
    category: 'questions',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_044',
    sentence: 'What is this?',
    chinese: '这是什么？',
    category: 'questions',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_045',
    sentence: 'What color is it?',
    chinese: '它是什么颜色？',
    category: 'questions',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_046',
    sentence: 'How many do you have?',
    chinese: '你有多少个？',
    category: 'questions',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_047',
    sentence: 'Who is that?',
    chinese: '那是谁？',
    category: 'questions',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_048',
    sentence: 'Where is my book?',
    chinese: '我的书在哪里？',
    category: 'questions',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_049',
    sentence: 'Can you help me?',
    chinese: '你能帮我吗？',
    category: 'questions',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_050',
    sentence: 'What time is it?',
    chinese: '现在几点了？',
    category: 'questions',
    difficulty: 'medium'
  },

  // Feelings (8)
  {
    sentenceId: 'sent_051',
    sentence: 'I am very happy.',
    chinese: '我很开心。',
    category: 'feelings',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_052',
    sentence: 'I am sad today.',
    chinese: '我今天很伤心。',
    category: 'feelings',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_053',
    sentence: 'I feel tired.',
    chinese: '我觉得很累。',
    category: 'feelings',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_054',
    sentence: 'I am hungry.',
    chinese: '我饿了。',
    category: 'feelings',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_055',
    sentence: 'I am thirsty.',
    chinese: '我渴了。',
    category: 'feelings',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_056',
    sentence: 'I am scared.',
    chinese: '我害怕。',
    category: 'feelings',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_057',
    sentence: 'I feel sick.',
    chinese: '我觉得不舒服。',
    category: 'feelings',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_058',
    sentence: 'I am excited!',
    chinese: '我很兴奋！',
    category: 'feelings',
    difficulty: 'medium'
  },

  // Requests (7)
  {
    sentenceId: 'sent_059',
    sentence: 'Can I have some water?',
    chinese: '我可以喝点水吗？',
    category: 'requests',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_060',
    sentence: 'May I go to the bathroom?',
    chinese: '我可以去洗手间吗？',
    category: 'requests',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_061',
    sentence: 'Can you open the door?',
    chinese: '你能打开门吗？',
    category: 'requests',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_062',
    sentence: 'Please give me the ball.',
    chinese: '请把球给我。',
    category: 'requests',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_063',
    sentence: 'Can we play together?',
    chinese: '我们可以一起玩吗？',
    category: 'requests',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_064',
    sentence: 'I want to go outside.',
    chinese: '我想出去。',
    category: 'requests',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_065',
    sentence: 'Can I have an apple?',
    chinese: '我可以吃个苹果吗？',
    category: 'requests',
    difficulty: 'medium'
  },

  // Daily (5)
  {
    sentenceId: 'sent_066',
    sentence: 'What do you want to eat?',
    chinese: '你想吃什么？',
    category: 'daily',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_067',
    sentence: 'I like this color.',
    chinese: '我喜欢这个颜色。',
    category: 'daily',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_068',
    sentence: 'This is my favorite toy.',
    chinese: '这是我最喜欢的玩具。',
    category: 'daily',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_069',
    sentence: 'I do not like this.',
    chinese: '我不喜欢这个。',
    category: 'daily',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_070',
    sentence: 'It is delicious!',
    chinese: '真好吃！',
    category: 'daily',
    difficulty: 'medium'
  },

  // Activities (5)
  {
    sentenceId: 'sent_071',
    sentence: 'I am drawing a picture.',
    chinese: '我在画画。',
    category: 'activities',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_072',
    sentence: 'We are playing games.',
    chinese: '我们在玩游戏。',
    category: 'activities',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_073',
    sentence: 'I am reading a book.',
    chinese: '我在看书。',
    category: 'activities',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_074',
    sentence: 'Look at the beautiful flower!',
    chinese: '看那朵美丽的花！',
    category: 'activities',
    difficulty: 'medium'
  },
  {
    sentenceId: 'sent_075',
    sentence: 'Listen to the music.',
    chinese: '听音乐。',
    category: 'activities',
    difficulty: 'medium'
  },
];

/**
 * HARD SENTENCES (25) - 困难短句
 * 适合进阶学习，5-6岁
 */
export const HARD_SENTENCES: Sentence[] = [
  // Introduction (5)
  {
    sentenceId: 'sent_076',
    sentence: 'I live in a big house.',
    chinese: '我住在一个大房子里。',
    category: 'introduction',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_077',
    sentence: 'I have a big family.',
    chinese: '我有一个大家庭。',
    category: 'introduction',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_078',
    sentence: 'My favorite color is blue.',
    chinese: '我最喜欢的颜色是蓝色。',
    category: 'introduction',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_079',
    sentence: 'I like to play football.',
    chinese: '我喜欢踢足球。',
    category: 'introduction',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_080',
    sentence: 'I want to be a teacher.',
    chinese: '我想成为一名老师。',
    category: 'introduction',
    difficulty: 'hard'
  },

  // Daily (5)
  {
    sentenceId: 'sent_081',
    sentence: 'What did you do today?',
    chinese: '你今天做了什么？',
    category: 'daily',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_082',
    sentence: 'I had a great day!',
    chinese: '我今天过得很开心！',
    category: 'daily',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_083',
    sentence: 'The weather is beautiful today.',
    chinese: '今天天气很好。',
    category: 'daily',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_084',
    sentence: 'I learned many new things.',
    chinese: '我学到了很多新东西。',
    category: 'daily',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_085',
    sentence: 'Can you repeat that, please?',
    chinese: '请你再说一遍好吗？',
    category: 'daily',
    difficulty: 'hard'
  },

  // Questions (5)
  {
    sentenceId: 'sent_086',
    sentence: 'Why is the sky blue?',
    chinese: '为什么天空是蓝色的？',
    category: 'questions',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_087',
    sentence: 'When can we go home?',
    chinese: '我们什么时候可以回家？',
    category: 'questions',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_088',
    sentence: 'Which one do you like?',
    chinese: '你喜欢哪一个？',
    category: 'questions',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_089',
    sentence: 'How does this work?',
    chinese: '这个怎么用？',
    category: 'questions',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_090',
    sentence: 'Whose toy is this?',
    chinese: '这是谁的玩具？',
    category: 'questions',
    difficulty: 'hard'
  },

  // Feelings (5)
  {
    sentenceId: 'sent_091',
    sentence: 'I feel very proud of myself.',
    chinese: '我为自己感到骄傲。',
    category: 'feelings',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_092',
    sentence: 'I am a little bit nervous.',
    chinese: '我有点紧张。',
    category: 'feelings',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_093',
    sentence: 'I feel much better now.',
    chinese: '我现在感觉好多了。',
    category: 'feelings',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_094',
    sentence: 'I am so excited about the trip!',
    chinese: '我对这次旅行感到兴奋！',
    category: 'feelings',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_095',
    sentence: 'Sometimes I feel lonely.',
    chinese: '有时我会感到孤独。',
    category: 'feelings',
    difficulty: 'hard'
  },

  // Activities (5)
  {
    sentenceId: 'sent_096',
    sentence: 'We are going to the park.',
    chinese: '我们要去公园。',
    category: 'activities',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_097',
    sentence: 'I can count to one hundred!',
    chinese: '我能数到一百！',
    category: 'activities',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_098',
    sentence: 'Let us make a birthday card.',
    chinese: '我们来做一张生日卡片吧。',
    category: 'activities',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_099',
    sentence: 'I am learning to ride a bike.',
    chinese: '我在学骑自行车。',
    category: 'activities',
    difficulty: 'hard'
  },
  {
    sentenceId: 'sent_100',
    sentence: 'We had so much fun together!',
    chinese: '我们在一起玩得很开心！',
    category: 'activities',
    difficulty: 'hard'
  },
];

/**
 * Get all sentences / 获取所有短句
 */
export function getAllSentences(): Sentence[] {
  return [...EASY_SENTENCES, ...MEDIUM_SENTENCES, ...HARD_SENTENCES];
}

/**
 * Get sentences by category / 按分类获取短句
 */
export function getSentencesByCategory(category: SentenceCategory): Sentence[] {
  return getAllSentences().filter(sentence => sentence.category === category);
}

/**
 * Get sentences by difficulty / 按难度获取短句
 */
export function getSentencesByDifficulty(difficulty: WordDifficulty): Sentence[] {
  return getAllSentences().filter(sentence => sentence.difficulty === difficulty);
}

/**
 * Get random sentences / 获取随机短句
 */
export function getRandomSentences(count: number): Sentence[] {
  const allSentences = getAllSentences();
  const shuffled = [...allSentences].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
