/**
 * Vocabulary Word Library
 * 词汇单词库（500个常用单词）
 *
 * 使用 Unsplash API 获取相关图片
 * 图片搜索关键词: {word} animal/food/object/etc
 */

import { Word, WordCategory, WordDifficulty } from './vocabulary';

/**
 * EASY WORDS (150 words) - 简单单词
 * 适合初学者，3-4岁
 */
export const EASY_WORDS: Word[] = [
  // Animals (20)
  {
    wordId: 'word_001',
    word: 'dog',
    chinese: '狗',
    category: 'animals',
    difficulty: 'easy',
    phonetic: '/dɔːɡ/',
    exampleSentence: 'I have a dog.',
    imageUrl: '/images/words/animals/word_001.jpg'
  },
  {
    wordId: 'word_002',
    word: 'cat',
    chinese: '猫',
    category: 'animals',
    difficulty: 'easy',
    phonetic: '/kæt/',
    exampleSentence: 'The cat is cute.',
    imageUrl: '/images/words/animals/word_002.jpg'
  },
  {
    wordId: 'word_003',
    word: 'bird',
    chinese: '鸟',
    category: 'animals',
    difficulty: 'easy',
    phonetic: '/bɜːrd/',
    exampleSentence: 'Look at the bird!',
    imageUrl: '/images/words/animals/word_003.jpg'
  },
  {
    wordId: 'word_004',
    word: 'fish',
    chinese: '鱼',
    category: 'animals',
    difficulty: 'easy',
    phonetic: '/fɪʃ/',
    exampleSentence: 'I like fish.',
    imageUrl: '/images/words/animals/word_004.jpg'
  },
  {
    wordId: 'word_005',
    word: 'duck',
    chinese: '鸭子',
    category: 'animals',
    difficulty: 'easy',
    phonetic: '/dʌk/',
    exampleSentence: 'The duck says quack.',
    imageUrl: '/images/words/animals/word_005.jpg'
  },
  {
    wordId: 'word_006',
    word: 'cow',
    chinese: '奶牛',
    category: 'animals',
    difficulty: 'easy',
    phonetic: '/kaʊ/',
    exampleSentence: 'The cow gives milk.',
    imageUrl: '/images/words/animals/word_006.jpg'
  },
  {
    wordId: 'word_007',
    word: 'pig',
    chinese: '猪',
    category: 'animals',
    difficulty: 'easy',
    phonetic: '/pɪɡ/',
    exampleSentence: 'The pig is pink.',
    imageUrl: '/images/words/animals/word_007.jpg'
  },
  {
    wordId: 'word_008',
    word: 'horse',
    chinese: '马',
    category: 'animals',
    difficulty: 'easy',
    phonetic: '/hɔːrs/',
    exampleSentence: 'The horse runs fast.',
    imageUrl: '/images/words/animals/word_008.jpg'
  },
  {
    wordId: 'word_009',
    word: 'sheep',
    chinese: '羊',
    category: 'animals',
    difficulty: 'easy',
    phonetic: '/ʃiːp/',
    exampleSentence: 'The sheep says baa.',
    imageUrl: '/images/words/animals/word_009.jpg'
  },
  {
    wordId: 'word_010',
    word: 'chicken',
    chinese: '鸡',
    category: 'animals',
    difficulty: 'easy',
    phonetic: '/ˈtʃɪkɪn/',
    exampleSentence: 'The chicken lays eggs.',
    imageUrl: '/images/words/animals/word_010.jpg'
  },

  // Food (20)
  {
    wordId: 'word_011',
    word: 'apple',
    chinese: '苹果',
    category: 'food',
    difficulty: 'easy',
    phonetic: '/ˈæpəl/',
    exampleSentence: 'I like apples.',
    imageUrl: '/images/words/food/word_011.jpg'
  },
  {
    wordId: 'word_012',
    word: 'banana',
    chinese: '香蕉',
    category: 'food',
    difficulty: 'easy',
    phonetic: '/bəˈnænə/',
    exampleSentence: 'Bananas are yellow.',
    imageUrl: '/images/words/food/word_012.jpg'
  },
  {
    wordId: 'word_013',
    word: 'orange',
    chinese: '橙子',
    category: 'food',
    difficulty: 'easy',
    phonetic: '/ˈɔːrɪndʒ/',
    exampleSentence: 'Oranges are sweet.',
    imageUrl: '/images/words/food/word_013.jpg'
  },
  {
    wordId: 'word_014',
    word: 'grape',
    chinese: '葡萄',
    category: 'food',
    difficulty: 'easy',
    phonetic: '/ɡreɪp/',
    exampleSentence: 'I love grapes!',
    imageUrl: '/images/words/food/word_014.jpg'
  },
  {
    wordId: 'word_015',
    word: 'bread',
    chinese: '面包',
    category: 'food',
    difficulty: 'easy',
    phonetic: '/brɛd/',
    exampleSentence: 'I eat bread for breakfast.',
    imageUrl: '/images/words/food/word_015.jpg'
  },
  {
    wordId: 'word_016',
    word: 'milk',
    chinese: '牛奶',
    category: 'food',
    difficulty: 'easy',
    phonetic: '/mɪlk/',
    exampleSentence: 'Milk is white.',
    imageUrl: '/images/words/food/word_016.jpg'
  },
  {
    wordId: 'word_017',
    word: 'egg',
    chinese: '鸡蛋',
    category: 'food',
    difficulty: 'easy',
    phonetic: '/eɡ/',
    exampleSentence: 'I eat eggs for breakfast.',
    imageUrl: '/images/words/food/word_017.jpg'
  },
  {
    wordId: 'word_018',
    word: 'cake',
    chinese: '蛋糕',
    category: 'food',
    difficulty: 'easy',
    phonetic: '/keɪk/',
    exampleSentence: 'The cake is sweet.',
    imageUrl: '/images/words/food/word_018.jpg'
  },
  {
    wordId: 'word_019',
    word: 'cookie',
    chinese: '饼干',
    category: 'food',
    difficulty: 'easy',
    phonetic: '/ˈkʊki/',
    exampleSentence: 'I want a cookie.',
    imageUrl: '/images/words/food/word_019.jpg'
  },
  {
    wordId: 'word_020',
    word: 'water',
    chinese: '水',
    category: 'food',
    difficulty: 'easy',
    phonetic: '/ˈwɔːtər/',
    exampleSentence: 'I drink water.',
    imageUrl: '/images/words/food/word_020.jpg'
  },

  // Colors (10)
  {
    wordId: 'word_021',
    word: 'red',
    chinese: '红色',
    category: 'colors',
    difficulty: 'easy',
    phonetic: '/red/',
    exampleSentence: 'The apple is red.',
    imageUrl: '/images/words/colors/word_021.jpg'
  },
  {
    wordId: 'word_022',
    word: 'blue',
    chinese: '蓝色',
    category: 'colors',
    difficulty: 'easy',
    phonetic: '/bluː/',
    exampleSentence: 'The sky is blue.',
    imageUrl: '/images/words/colors/word_022.jpg'
  },
  {
    wordId: 'word_023',
    word: 'yellow',
    chinese: '黄色',
    category: 'colors',
    difficulty: 'easy',
    phonetic: '/ˈjɛloʊ/',
    exampleSentence: 'The sun is yellow.',
    imageUrl: '/images/words/colors/word_023.jpg'
  },
  {
    wordId: 'word_024',
    word: 'green',
    chinese: '绿色',
    category: 'colors',
    difficulty: 'easy',
    phonetic: '/ɡriːn/',
    exampleSentence: 'The grass is green.',
    imageUrl: '/images/words/colors/word_024.jpg'
  },
  {
    wordId: 'word_025',
    word: 'orange',
    chinese: '橙色',
    category: 'colors',
    difficulty: 'easy',
    phonetic: '/ˈɔːrɪndʒ/',
    exampleSentence: 'Oranges are orange.',
    imageUrl: '/images/words/colors/word_025.jpg'
  },
  {
    wordId: 'word_026',
    word: 'purple',
    chinese: '紫色',
    category: 'colors',
    difficulty: 'easy',
    phonetic: '/ˈpɜːrpəl/',
    exampleSentence: 'Grapes can be purple.',
    imageUrl: '/images/words/colors/word_026.jpg'
  },
  {
    wordId: 'word_027',
    word: 'pink',
    chinese: '粉色',
    category: 'colors',
    difficulty: 'easy',
    phonetic: '/pɪŋk/',
    exampleSentence: 'The flower is pink.',
    imageUrl: '/images/words/colors/word_027.jpg'
  },
  {
    wordId: 'word_028',
    word: 'black',
    chinese: '黑色',
    category: 'colors',
    difficulty: 'easy',
    phonetic: '/blæk/',
    exampleSentence: 'The cat is black.',
    imageUrl: '/images/words/colors/word_028.jpg'
  },
  {
    wordId: 'word_029',
    word: 'white',
    chinese: '白色',
    category: 'colors',
    difficulty: 'easy',
    phonetic: '/waɪt/',
    exampleSentence: 'Snow is white.',
    imageUrl: '/images/words/colors/word_029.jpg'
  },
  {
    wordId: 'word_030',
    word: 'brown',
    chinese: '棕色',
    category: 'colors',
    difficulty: 'easy',
    phonetic: '/braʊn/',
    exampleSentence: 'The dog is brown.',
    imageUrl: '/images/words/colors/word_030.jpg'
  },

  // Numbers (10)
  {
    wordId: 'word_031',
    word: 'one',
    chinese: '一',
    category: 'numbers',
    difficulty: 'easy',
    phonetic: '/wʌn/',
    exampleSentence: 'I have one dog.',
    imageUrl: '/images/words/numbers/word_031.jpg'
  },
  {
    wordId: 'word_032',
    word: 'two',
    chinese: '二',
    category: 'numbers',
    difficulty: 'easy',
    phonetic: '/tuː/',
    exampleSentence: 'I see two birds.',
    imageUrl: '/images/words/numbers/word_032.jpg'
  },
  {
    wordId: 'word_033',
    word: 'three',
    chinese: '三',
    category: 'numbers',
    difficulty: 'easy',
    phonetic: '/θriː/',
    exampleSentence: 'I have three cats.',
    imageUrl: '/images/words/numbers/word_033.jpg'
  },
  {
    wordId: 'word_034',
    word: 'four',
    chinese: '四',
    category: 'numbers',
    difficulty: 'easy',
    phonetic: '/fɔːr/',
    exampleSentence: 'I see four ducks.',
    imageUrl: '/images/words/numbers/word_034.jpg'
  },
  {
    wordId: 'word_035',
    word: 'five',
    chinese: '五',
    category: 'numbers',
    difficulty: 'easy',
    phonetic: '/faɪv/',
    exampleSentence: 'Five apples!',
    imageUrl: '/images/words/numbers/word_035.jpg'
  },
  {
    wordId: 'word_036',
    word: 'six',
    chinese: '六',
    category: 'numbers',
    difficulty: 'easy',
    phonetic: '/sɪks/',
    exampleSentence: 'Six eggs.',
    imageUrl: '/images/words/numbers/word_036.jpg'
  },
  {
    wordId: 'word_037',
    word: 'seven',
    chinese: '七',
    category: 'numbers',
    difficulty: 'easy',
    phonetic: '/ˈsɛvən/',
    exampleSentence: 'Seven days in a week.',
    imageUrl: '/images/words/numbers/word_037.jpg'
  },
  {
    wordId: 'word_038',
    word: 'eight',
    chinese: '八',
    category: 'numbers',
    difficulty: 'easy',
    phonetic: '/eɪt/',
    exampleSentence: 'Eight o\'clock.',
    imageUrl: '/images/words/numbers/word_038.jpg'
  },
  {
    wordId: 'word_039',
    word: 'nine',
    chinese: '九',
    category: 'numbers',
    difficulty: 'easy',
    phonetic: '/naɪn/',
    exampleSentence: 'Nine cats.',
    imageUrl: '/images/words/numbers/word_039.jpg'
  },
  {
    wordId: 'word_040',
    word: 'ten',
    chinese: '十',
    category: 'numbers',
    difficulty: 'easy',
    phonetic: '/tɛn/',
    exampleSentence: 'Ten fingers!',
    imageUrl: '/images/words/numbers/word_040.jpg'
  },

  // Family (10)
  {
    wordId: 'word_041',
    word: 'mom',
    chinese: '妈妈',
    category: 'family',
    difficulty: 'easy',
    phonetic: '/mɑm/',
    exampleSentence: 'I love my mom.',
    imageUrl: '/images/words/family/word_041.jpg'
  },
  {
    wordId: 'word_042',
    word: 'dad',
    chinese: '爸爸',
    category: 'family',
    difficulty: 'easy',
    phonetic: '/dæd/',
    exampleSentence: 'I love my dad.',
    imageUrl: '/images/words/family/word_042.jpg'
  },
  {
    wordId: 'word_043',
    word: 'baby',
    chinese: '宝宝',
    category: 'family',
    difficulty: 'easy',
    phonetic: '/ˈbeɪbi/',
    exampleSentence: 'The baby is cute.',
    imageUrl: '/images/words/family/word_043.jpg'
  },
  {
    wordId: 'word_044',
    word: 'boy',
    chinese: '男孩',
    category: 'family',
    difficulty: 'easy',
    phonetic: '/bɔɪ/',
    exampleSentence: 'He is a boy.',
    imageUrl: '/images/words/family/word_044.jpg'
  },
  {
    wordId: 'word_045',
    word: 'girl',
    chinese: '女孩',
    category: 'family',
    difficulty: 'easy',
    phonetic: '/ɡɜːl/',
    exampleSentence: 'She is a girl.',
    imageUrl: '/images/words/family/word_045.jpg'
  },
  {
    wordId: 'word_046',
    word: 'brother',
    chinese: '哥哥/弟弟',
    category: 'family',
    difficulty: 'easy',
    phonetic: '/ˈbrʌðər/',
    exampleSentence: 'This is my brother.',
    imageUrl: '/images/words/family/word_046.jpg'
  },
  {
    wordId: 'word_047',
    word: 'sister',
    chinese: '姐姐/妹妹',
    category: 'family',
    difficulty: 'easy',
    phonetic: '/ˈsɪstər/',
    exampleSentence: 'This is my sister.',
    imageUrl: '/images/words/family/word_047.jpg'
  },
  {
    wordId: 'word_048',
    word: 'grandma',
    chinese: '奶奶/外婆',
    category: 'family',
    difficulty: 'easy',
    phonetic: '/ˈɡrændmɑː/',
    exampleSentence: 'I love my grandma.',
    imageUrl: '/images/words/family/word_048.jpg'
  },
  {
    wordId: 'word_049',
    word: 'grandpa',
    chinese: '爷爷/外公',
    category: 'family',
    difficulty: 'easy',
    phonetic: '/ˈɡrændpɑː/',
    exampleSentence: 'I love my grandpa.',
    imageUrl: '/images/words/family/word_049.jpg'
  },
  {
    wordId: 'word_050',
    word: 'friend',
    chinese: '朋友',
    category: 'family',
    difficulty: 'easy',
    phonetic: '/frɛnd/',
    exampleSentence: 'She is my friend.',
    imageUrl: '/images/words/family/word_050.jpg'
  },

  // Body (20)
  {
    wordId: 'word_051',
    word: 'eye',
    chinese: '眼睛',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/aɪ/',
    exampleSentence: 'I have two eyes.',
    imageUrl: '/images/words/body/word_051.jpg'
  },
  {
    wordId: 'word_052',
    word: 'ear',
    chinese: '耳朵',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/ɪr/',
    exampleSentence: 'I can hear with my ears.',
    imageUrl: '/images/words/body/word_052.jpg'
  },
  {
    wordId: 'word_053',
    word: 'nose',
    chinese: '鼻子',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/noʊz/',
    exampleSentence: 'I smell with my nose.',
    imageUrl: '/images/words/body/word_053.jpg'
  },
  {
    wordId: 'word_054',
    word: 'mouth',
    chinese: '嘴巴',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/maʊθ/',
    exampleSentence: 'I eat with my mouth.',
    imageUrl: '/images/words/body/word_054.jpg'
  },
  {
    wordId: 'word_055',
    word: 'hand',
    chinese: '手',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/hænd/',
    exampleSentence: 'I wave my hand.',
    imageUrl: '/images/words/body/word_055.jpg'
  },
  {
    wordId: 'word_056',
    word: 'foot',
    chinese: '脚',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/fʊt/',
    exampleSentence: 'I walk with my feet.',
    imageUrl: '/images/words/body/word_056.jpg'
  },
  {
    wordId: 'word_057',
    word: 'head',
    chinese: '头',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/hɛd/',
    exampleSentence: 'I nod my head.',
    imageUrl: '/images/words/body/word_057.jpg'
  },
  {
    wordId: 'word_058',
    word: 'hair',
    chinese: '头发',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/hɛr/',
    exampleSentence: 'I comb my hair.',
    imageUrl: '/images/words/body/word_058.jpg'
  },
  {
    wordId: 'word_059',
    word: 'arm',
    chinese: '手臂',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/ɑrm/',
    exampleSentence: 'I raise my arm.',
    imageUrl: '/images/words/body/word_059.jpg'
  },
  {
    wordId: 'word_060',
    word: 'leg',
    chinese: '腿',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/lɛɡ/',
    exampleSentence: 'I kick with my leg.',
    imageUrl: '/images/words/body/word_060.jpg'
  },
  {
    wordId: 'word_061',
    word: 'tooth',
    chinese: '牙齿',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/tuːθ/',
    exampleSentence: 'I brush my teeth.',
    imageUrl: '/images/words/body/word_061.jpg'
  },
  {
    wordId: 'word_062',
    word: 'face',
    chinese: '脸',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/feɪs/',
    exampleSentence: 'I wash my face.',
    imageUrl: '/images/words/body/word_062.jpg'
  },
  {
    wordId: 'word_063',
    word: 'finger',
    chinese: '手指',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/ˈfɪŋɡər/',
    exampleSentence: 'I count with my fingers.',
    imageUrl: '/images/words/body/word_063.jpg'
  },
  {
    wordId: 'word_064',
    word: 'tummy',
    chinese: '肚子',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/ˈtʌmi/',
    exampleSentence: 'My tummy is full.',
    imageUrl: '/images/words/body/word_064.jpg'
  },
  {
    wordId: 'word_065',
    word: 'back',
    chinese: '后背',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/bæk/',
    exampleSentence: 'I scratch my back.',
    imageUrl: '/images/words/body/word_065.jpg'
  },
  {
    wordId: 'word_066',
    word: 'neck',
    chinese: '脖子',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/nɛk/',
    exampleSentence: 'I turn my neck.',
    imageUrl: '/images/words/body/word_066.jpg'
  },
  {
    wordId: 'word_067',
    word: 'shoulder',
    chinese: '肩膀',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/ˈʃoʊldər/',
    exampleSentence: 'I shrug my shoulders.',
    imageUrl: '/images/words/body/word_067.jpg'
  },
  {
    wordId: 'word_068',
    word: 'knee',
    chinese: '膝盖',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/niː/',
    exampleSentence: 'I scrape my knee.',
    imageUrl: '/images/words/body/word_068.jpg'
  },
  {
    wordId: 'word_069',
    word: 'toe',
    chinese: '脚趾',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/toʊ/',
    exampleSentence: 'I wiggle my toes.',
    imageUrl: '/images/words/body/word_069.jpg'
  },
  {
    wordId: 'word_070',
    word: 'tongue',
    chinese: '舌头',
    category: 'body',
    difficulty: 'easy',
    phonetic: '/tʌŋ/',
    exampleSentence: 'I stick out my tongue.',
    imageUrl: '/images/words/body/word_070.jpg'
  },

  // Nature (20)
  {
    wordId: 'word_071',
    word: 'sun',
    chinese: '太阳',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/sʌn/',
    exampleSentence: 'The sun is bright.',
    imageUrl: '/images/words/nature/word_071.jpg'
  },
  {
    wordId: 'word_072',
    word: 'moon',
    chinese: '月亮',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/muːn/',
    exampleSentence: 'I see the moon.',
    imageUrl: '/images/words/nature/word_072.jpg'
  },
  {
    wordId: 'word_073',
    word: 'star',
    chinese: '星星',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/stɑr/',
    exampleSentence: 'Twinkle, twinkle, little star.',
    imageUrl: '/images/words/nature/word_073.jpg'
  },
  {
    wordId: 'word_074',
    word: 'cloud',
    chinese: '云',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/klaʊd/',
    exampleSentence: 'Look at the clouds.',
    imageUrl: '/images/words/nature/word_074.jpg'
  },
  {
    wordId: 'word_075',
    word: 'rain',
    chinese: '雨',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/reɪn/',
    exampleSentence: 'I like the rain.',
    imageUrl: '/images/words/nature/word_075.jpg'
  },
  {
    wordId: 'word_076',
    word: 'snow',
    chinese: '雪',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/snoʊ/',
    exampleSentence: 'The snow is white.',
    imageUrl: '/images/words/nature/word_076.jpg'
  },
  {
    wordId: 'word_077',
    word: 'wind',
    chinese: '风',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/wɪnd/',
    exampleSentence: 'The wind blows.',
    imageUrl: '/images/words/nature/word_077.jpg'
  },
  {
    wordId: 'word_078',
    word: 'tree',
    chinese: '树',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/triː/',
    exampleSentence: 'I climb trees.',
    imageUrl: '/images/words/nature/word_078.jpg'
  },
  {
    wordId: 'word_079',
    word: 'flower',
    chinese: '花',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/ˈflaʊər/',
    exampleSentence: 'The flower is pretty.',
    imageUrl: '/images/words/nature/word_079.jpg'
  },
  {
    wordId: 'word_080',
    word: 'grass',
    chinese: '草',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/ɡræs/',
    exampleSentence: 'The grass is green.',
    imageUrl: '/images/words/nature/word_080.jpg'
  },
  {
    wordId: 'word_081',
    word: 'mountain',
    chinese: '山',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/ˈmaʊntən/',
    exampleSentence: 'I see mountains.',
    imageUrl: '/images/words/nature/word_081.jpg'
  },
  {
    wordId: 'word_082',
    word: 'river',
    chinese: '河流',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/ˈrɪvər/',
    exampleSentence: 'The river flows.',
    imageUrl: '/images/words/nature/word_082.jpg'
  },
  {
    wordId: 'word_083',
    word: 'ocean',
    chinese: '海洋',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/ˈoʊʃən/',
    exampleSentence: 'I love the ocean.',
    imageUrl: '/images/words/nature/word_083.jpg'
  },
  {
    wordId: 'word_084',
    word: 'beach',
    chinese: '海滩',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/biːtʃ/',
    exampleSentence: 'I play at the beach.',
    imageUrl: '/images/words/nature/word_084.jpg'
  },
  {
    wordId: 'word_085',
    word: 'sky',
    chinese: '天空',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/skaɪ/',
    exampleSentence: 'The sky is blue.',
    imageUrl: '/images/words/nature/word_085.jpg'
  },
  {
    wordId: 'word_086',
    word: 'fire',
    chinese: '火',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/faɪər/',
    exampleSentence: 'Fire is hot.',
    imageUrl: '/images/words/nature/word_086.jpg'
  },
  {
    wordId: 'word_087',
    word: 'leaf',
    chinese: '树叶',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/liːf/',
    exampleSentence: 'The leaf falls.',
    imageUrl: '/images/words/nature/word_087.jpg'
  },
  {
    wordId: 'word_088',
    word: 'rock',
    chinese: '石头',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/rɑk/',
    exampleSentence: 'I pick up a rock.',
    imageUrl: '/images/words/nature/word_088.jpg'
  },
  {
    wordId: 'word_089',
    word: 'sand',
    chinese: '沙子',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/sænd/',
    exampleSentence: 'I play in the sand.',
    imageUrl: '/images/words/nature/word_089.jpg'
  },
  {
    wordId: 'word_090',
    word: 'garden',
    chinese: '花园',
    category: 'nature',
    difficulty: 'easy',
    phonetic: '/ˈɡɑrdən/',
    exampleSentence: 'I have a garden.',
    imageUrl: '/images/words/nature/word_090.jpg'
  },

  // Vehicles (15)
  {
    wordId: 'word_091',
    word: 'car',
    chinese: '汽车',
    category: 'vehicles',
    difficulty: 'easy',
    phonetic: '/kɑr/',
    exampleSentence: 'I see a car.',
    imageUrl: '/images/words/vehicles/word_091.jpg'
  },
  {
    wordId: 'word_092',
    word: 'bus',
    chinese: '公共汽车',
    category: 'vehicles',
    difficulty: 'easy',
    phonetic: '/bʌs/',
    exampleSentence: 'I ride the bus.',
    imageUrl: '/images/words/vehicles/word_092.jpg'
  },
  {
    wordId: 'word_093',
    word: 'train',
    chinese: '火车',
    category: 'vehicles',
    difficulty: 'easy',
    phonetic: '/treɪn/',
    exampleSentence: 'The train is long.',
    imageUrl: '/images/words/vehicles/word_093.jpg'
  },
  {
    wordId: 'word_094',
    word: 'plane',
    chinese: '飞机',
    category: 'vehicles',
    difficulty: 'easy',
    phonetic: '/pleɪn/',
    exampleSentence: 'The plane flies high.',
    imageUrl: '/images/words/vehicles/word_094.jpg'
  },
  {
    wordId: 'word_095',
    word: 'boat',
    chinese: '船',
    category: 'vehicles',
    difficulty: 'easy',
    phonetic: '/boʊt/',
    exampleSentence: 'The boat floats.',
    imageUrl: '/images/words/vehicles/word_095.jpg'
  },
  {
    wordId: 'word_096',
    word: 'bike',
    chinese: '自行车',
    category: 'vehicles',
    difficulty: 'easy',
    phonetic: '/baɪk/',
    exampleSentence: 'I ride my bike.',
    imageUrl: '/images/words/vehicles/word_096.jpg'
  },
  {
    wordId: 'word_097',
    word: 'truck',
    chinese: '卡车',
    category: 'vehicles',
    difficulty: 'easy',
    phonetic: '/trʌk/',
    exampleSentence: 'The truck is big.',
    imageUrl: '/images/words/vehicles/word_097.jpg'
  },
  {
    wordId: 'word_098',
    word: 'taxi',
    chinese: '出租车',
    category: 'vehicles',
    difficulty: 'easy',
    phonetic: '/ˈtæksi/',
    exampleSentence: 'I take a taxi.',
    imageUrl: '/images/words/vehicles/word_098.jpg'
  },
  {
    wordId: 'word_099',
    word: 'rocket',
    chinese: '火箭',
    category: 'vehicles',
    difficulty: 'easy',
    phonetic: '/ˈrɑkət/',
    exampleSentence: 'The rocket goes up!',
    imageUrl: '/images/words/vehicles/word_099.jpg'
  },
  {
    wordId: 'word_100',
    word: 'jeep',
    chinese: '吉普车',
    category: 'vehicles',
    difficulty: 'easy',
    phonetic: '/dʒiːp/',
    exampleSentence: 'The jeep goes off-road.',
    imageUrl: '/images/words/vehicles/word_100.jpg'
  },
  {
    wordId: 'word_101',
    word: 'scooter',
    chinese: '滑板车',
    category: 'vehicles',
    difficulty: 'easy',
    phonetic: '/ˈskuːtər/',
    exampleSentence: 'I ride my scooter.',
    imageUrl: '/images/words/vehicles/word_101.jpg'
  },
  {
    wordId: 'word_102',
    word: 'ambulance',
    chinese: '救护车',
    category: 'vehicles',
    difficulty: 'easy',
    phonetic: '/ˈæmbjələns/',
    exampleSentence: 'The ambulance helps people.',
    imageUrl: '/images/words/vehicles/word_102.jpg'
  },
  {
    wordId: 'word_103',
    word: 'police car',
    chinese: '警车',
    category: 'vehicles',
    difficulty: 'easy',
    phonetic: '/pəˈliːs kɑr/',
    exampleSentence: 'The police car has lights.',
    imageUrl: '/images/words/vehicles/word_103.jpg'
  },
  {
    wordId: 'word_104',
    word: 'fire truck',
    chinese: '消防车',
    category: 'vehicles',
    difficulty: 'easy',
    phonetic: '/faɪər trʌk/',
    exampleSentence: 'The fire truck puts out fires.',
    imageUrl: '/images/words/vehicles/word_104.jpg'
  },
  {
    wordId: 'word_105',
    word: 'tractor',
    chinese: '拖拉机',
    category: 'vehicles',
    difficulty: 'easy',
    phonetic: '/ˈtræktər/',
    exampleSentence: 'The tractor works on the farm.',
    imageUrl: '/images/words/vehicles/word_105.jpg'
  },

  // School (15)
  {
    wordId: 'word_106',
    word: 'school',
    chinese: '学校',
    category: 'school',
    difficulty: 'easy',
    phonetic: '/skuːl/',
    exampleSentence: 'I go to school.',
    imageUrl: '/images/words/school/word_106.jpg'
  },
  {
    wordId: 'word_107',
    word: 'book',
    chinese: '书',
    category: 'school',
    difficulty: 'easy',
    phonetic: '/bʊk/',
    exampleSentence: 'I read a book.',
    imageUrl: '/images/words/school/word_107.jpg'
  },
  {
    wordId: 'word_108',
    word: 'pencil',
    chinese: '铅笔',
    category: 'school',
    difficulty: 'easy',
    phonetic: '/ˈpɛnsəl/',
    exampleSentence: 'I write with a pencil.',
    imageUrl: '/images/words/school/word_108.jpg'
  },
  {
    wordId: 'word_109',
    word: 'paper',
    chinese: '纸',
    category: 'school',
    difficulty: 'easy',
    phonetic: '/ˈpeɪpər/',
    exampleSentence: 'I draw on paper.',
    imageUrl: '/images/words/school/word_109.jpg'
  },
  {
    wordId: 'word_110',
    word: 'bag',
    chinese: '书包',
    category: 'school',
    difficulty: 'easy',
    phonetic: '/bæɡ/',
    exampleSentence: 'I carry my bag.',
    imageUrl: '/images/words/school/word_110.jpg'
  },
  {
    wordId: 'word_111',
    word: 'teacher',
    chinese: '老师',
    category: 'school',
    difficulty: 'easy',
    phonetic: '/ˈtiːtʃər/',
    exampleSentence: 'My teacher is nice.',
    imageUrl: '/images/words/school/word_111.jpg'
  },
  {
    wordId: 'word_112',
    word: 'desk',
    chinese: '课桌',
    category: 'school',
    difficulty: 'easy',
    phonetic: '/dɛsk/',
    exampleSentence: 'I sit at my desk.',
    imageUrl: '/images/words/school/word_112.jpg'
  },
  {
    wordId: 'word_113',
    word: 'chair',
    chinese: '椅子',
    category: 'school',
    difficulty: 'easy',
    phonetic: '/tʃɛr/',
    exampleSentence: 'I sit on a chair.',
    imageUrl: '/images/words/school/word_113.jpg'
  },
  {
    wordId: 'word_114',
    word: 'ruler',
    chinese: '尺子',
    category: 'school',
    difficulty: 'easy',
    phonetic: '/ˈruːlər/',
    exampleSentence: 'I measure with a ruler.',
    imageUrl: '/images/words/school/word_114.jpg'
  },
  {
    wordId: 'word_115',
    word: 'eraser',
    chinese: '橡皮',
    category: 'school',
    difficulty: 'easy',
    phonetic: '/ɪˈreɪsər/',
    exampleSentence: 'I use an eraser.',
    imageUrl: '/images/words/school/word_115.jpg'
  },
  {
    wordId: 'word_116',
    word: 'scissors',
    chinese: '剪刀',
    category: 'school',
    difficulty: 'easy',
    phonetic: '/ˈsɪzərz/',
    exampleSentence: 'I cut with scissors.',
    imageUrl: '/images/words/school/word_116.jpg'
  },
  {
    wordId: 'word_117',
    word: 'glue',
    chinese: '胶水',
    category: 'school',
    difficulty: 'easy',
    phonetic: '/ɡluː/',
    exampleSentence: 'I use glue.',
    imageUrl: '/images/words/school/word_117.jpg'
  },
  {
    wordId: 'word_118',
    word: 'notebook',
    chinese: '笔记本',
    category: 'school',
    difficulty: 'easy',
    phonetic: '/ˈnoʊtbʊk/',
    exampleSentence: 'I write in my notebook.',
    imageUrl: '/images/words/school/word_118.jpg'
  },
  {
    wordId: 'word_119',
    word: 'blackboard',
    chinese: '黑板',
    category: 'school',
    difficulty: 'easy',
    phonetic: '/ˈblækbɔːrd/',
    exampleSentence: 'The teacher writes on the blackboard.',
    imageUrl: '/images/words/school/word_119.jpg'
  },
  {
    wordId: 'word_120',
    word: 'classroom',
    chinese: '教室',
    category: 'school',
    difficulty: 'easy',
    phonetic: '/ˈklæsruːm/',
    exampleSentence: 'The classroom is big.',
    imageUrl: '/images/words/school/word_120.jpg'
  },

  // Home (15)
  {
    wordId: 'word_121',
    word: 'house',
    chinese: '房子',
    category: 'home',
    difficulty: 'easy',
    phonetic: '/haʊs/',
    exampleSentence: 'This is my house.',
    imageUrl: '/images/words/home/word_121.jpg'
  },
  {
    wordId: 'word_122',
    word: 'room',
    chinese: '房间',
    category: 'home',
    difficulty: 'easy',
    phonetic: '/ruːm/',
    exampleSentence: 'This is my room.',
    imageUrl: '/images/words/home/word_122.jpg'
  },
  {
    wordId: 'word_123',
    word: 'bed',
    chinese: '床',
    category: 'home',
    difficulty: 'easy',
    phonetic: '/bɛd/',
    exampleSentence: 'I sleep in a bed.',
    imageUrl: '/images/words/home/word_123.jpg'
  },
  {
    wordId: 'word_124',
    word: 'table',
    chinese: '桌子',
    category: 'home',
    difficulty: 'easy',
    phonetic: '/ˈteɪbəl/',
    exampleSentence: 'I eat at the table.',
    imageUrl: '/images/words/home/word_124.jpg'
  },
  {
    wordId: 'word_125',
    word: 'chair',
    chinese: '椅子',
    category: 'home',
    difficulty: 'easy',
    phonetic: '/tʃɛr/',
    exampleSentence: 'I sit on a chair.',
    imageUrl: '/images/words/home/word_125.jpg'
  },
  {
    wordId: 'word_126',
    word: 'door',
    chinese: '门',
    category: 'home',
    difficulty: 'easy',
    phonetic: '/dɔr/',
    exampleSentence: 'I open the door.',
    imageUrl: '/images/words/home/word_126.jpg'
  },
  {
    wordId: 'word_127',
    word: 'window',
    chinese: '窗户',
    category: 'home',
    difficulty: 'easy',
    phonetic: '/ˈwɪndoʊ/',
    exampleSentence: 'I look out the window.',
    imageUrl: '/images/words/home/word_127.jpg'
  },
  {
    wordId: 'word_128',
    word: 'lamp',
    chinese: '灯',
    category: 'home',
    difficulty: 'easy',
    phonetic: '/læmp/',
    exampleSentence: 'I turn on the lamp.',
    imageUrl: '/images/words/home/word_128.jpg'
  },
  {
    wordId: 'word_129',
    word: 'clock',
    chinese: '时钟',
    category: 'home',
    difficulty: 'easy',
    phonetic: '/klɑk/',
    exampleSentence: 'The clock tells time.',
    imageUrl: '/images/words/home/word_129.jpg'
  },
  {
    wordId: 'word_130',
    word: 'bathroom',
    chinese: '浴室',
    category: 'home',
    difficulty: 'easy',
    phonetic: '/ˈbæθruːm/',
    exampleSentence: 'I brush my teeth in the bathroom.',
    imageUrl: '/images/words/home/word_130.jpg'
  },
  {
    wordId: 'word_131',
    word: 'kitchen',
    chinese: '厨房',
    category: 'home',
    difficulty: 'easy',
    phonetic: '/ˈkɪtʃən/',
    exampleSentence: 'I cook in the kitchen.',
    imageUrl: '/images/words/home/word_131.jpg'
  },
  {
    wordId: 'word_132',
    word: 'sofa',
    chinese: '沙发',
    category: 'home',
    difficulty: 'easy',
    phonetic: '/ˈsoʊfə/',
    exampleSentence: 'I sit on the sofa.',
    imageUrl: '/images/words/home/word_132.jpg'
  },
  {
    wordId: 'word_133',
    word: 'tv',
    chinese: '电视',
    category: 'home',
    difficulty: 'easy',
    phonetic: '/tiː viː/',
    exampleSentence: 'I watch TV.',
    imageUrl: '/images/words/home/word_133.jpg'
  },
  {
    wordId: 'word_134',
    word: 'phone',
    chinese: '电话',
    category: 'home',
    difficulty: 'easy',
    phonetic: '/foʊn/',
    exampleSentence: 'I talk on the phone.',
    imageUrl: '/images/words/home/word_134.jpg'
  },
  {
    wordId: 'word_135',
    word: 'key',
    chinese: '钥匙',
    category: 'home',
    difficulty: 'easy',
    phonetic: '/kiː/',
    exampleSentence: 'I unlock the door with a key.',
    imageUrl: '/images/words/home/word_135.jpg'
  },

  // Feelings (15)
  {
    wordId: 'word_136',
    word: 'happy',
    chinese: '快乐',
    category: 'feelings',
    difficulty: 'easy',
    phonetic: '/ˈhæpi/',
    exampleSentence: 'I am happy.',
    imageUrl: '/images/words/feelings/word_136.jpg'
  },
  {
    wordId: 'word_137',
    word: 'sad',
    chinese: '伤心',
    category: 'feelings',
    difficulty: 'easy',
    phonetic: '/sæd/',
    exampleSentence: 'I am sad.',
    imageUrl: '/images/words/feelings/word_137.jpg'
  },
  {
    wordId: 'word_138',
    word: 'angry',
    chinese: '生气',
    category: 'feelings',
    difficulty: 'easy',
    phonetic: '/ˈæŋɡri/',
    exampleSentence: 'I am angry.',
    imageUrl: '/images/words/feelings/word_138.jpg'
  },
  {
    wordId: 'word_139',
    word: 'scared',
    chinese: '害怕',
    category: 'feelings',
    difficulty: 'easy',
    phonetic: '/skɛrd/',
    exampleSentence: 'I am scared.',
    imageUrl: '/images/words/feelings/word_139.jpg'
  },
  {
    wordId: 'word_140',
    word: 'tired',
    chinese: '累',
    category: 'feelings',
    difficulty: 'easy',
    phonetic: '/ˈtaɪərd/',
    exampleSentence: 'I am tired.',
    imageUrl: '/images/words/feelings/word_140.jpg'
  },
  {
    wordId: 'word_141',
    word: 'hungry',
    chinese: '饿',
    category: 'feelings',
    difficulty: 'easy',
    phonetic: '/ˈhʌŋɡri/',
    exampleSentence: 'I am hungry.',
    imageUrl: '/images/words/feelings/word_141.jpg'
  },
  {
    wordId: 'word_142',
    word: 'thirsty',
    chinese: '渴',
    category: 'feelings',
    difficulty: 'easy',
    phonetic: '/ˈθɜrsti/',
    exampleSentence: 'I am thirsty.',
    imageUrl: '/images/words/feelings/word_142.jpg'
  },
  {
    wordId: 'word_143',
    word: 'excited',
    chinese: '兴奋',
    category: 'feelings',
    difficulty: 'easy',
    phonetic: '/ɪkˈsaɪtəd/',
    exampleSentence: 'I am excited!',
    imageUrl: '/images/words/feelings/word_143.jpg'
  },
  {
    wordId: 'word_144',
    word: 'surprised',
    chinese: '惊讶',
    category: 'feelings',
    difficulty: 'easy',
    phonetic: '/sərˈpraɪzd/',
    exampleSentence: 'I am surprised.',
    imageUrl: '/images/words/feelings/word_144.jpg'
  },
  {
    wordId: 'word_145',
    word: 'sick',
    chinese: '生病',
    category: 'feelings',
    difficulty: 'easy',
    phonetic: '/sɪk/',
    exampleSentence: 'I am sick.',
    imageUrl: '/images/words/feelings/word_145.jpg'
  },
  {
    wordId: 'word_146',
    word: 'bored',
    chinese: '无聊',
    category: 'feelings',
    difficulty: 'easy',
    phonetic: '/bɔrd/',
    exampleSentence: 'I am bored.',
    imageUrl: '/images/words/feelings/word_146.jpg'
  },
  {
    wordId: 'word_147',
    word: 'proud',
    chinese: '骄傲',
    category: 'feelings',
    difficulty: 'easy',
    phonetic: '/praʊd/',
    exampleSentence: 'I am proud.',
    imageUrl: '/images/words/feelings/word_147.jpg'
  },
  {
    wordId: 'word_148',
    word: 'brave',
    chinese: '勇敢',
    category: 'feelings',
    difficulty: 'easy',
    phonetic: '/breɪv/',
    exampleSentence: 'I am brave.',
    imageUrl: '/images/words/feelings/word_148.jpg'
  },
  {
    wordId: 'word_149',
    word: 'shy',
    chinese: '害羞',
    category: 'feelings',
    difficulty: 'easy',
    phonetic: '/ʃaɪ/',
    exampleSentence: 'I am shy.',
    imageUrl: '/images/words/feelings/word_149.jpg'
  },
  {
    wordId: 'word_150',
    word: 'love',
    chinese: '爱',
    category: 'feelings',
    difficulty: 'easy',
    phonetic: '/lʌv/',
    exampleSentence: 'I feel love.',
    imageUrl: '/images/words/feelings/word_150.jpg'
  },

  // Actions (20)
  {
    wordId: 'word_151',
    word: 'eat',
    chinese: '吃',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/iːt/',
    exampleSentence: 'I eat an apple.',
    imageUrl: '/images/words/actions/word_151.jpg'
  },
  {
    wordId: 'word_152',
    word: 'drink',
    chinese: '喝',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/drɪŋk/',
    exampleSentence: 'I drink water.',
    imageUrl: '/images/words/actions/word_152.jpg'
  },
  {
    wordId: 'word_153',
    word: 'sleep',
    chinese: '睡觉',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/sliːp/',
    exampleSentence: 'I sleep at night.',
    imageUrl: '/images/words/actions/word_153.jpg'
  },
  {
    wordId: 'word_154',
    word: 'play',
    chinese: '玩',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/pleɪ/',
    exampleSentence: 'I play outside.',
    imageUrl: '/images/words/actions/word_154.jpg'
  },
  {
    wordId: 'word_155',
    word: 'run',
    chinese: '跑',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/rʌn/',
    exampleSentence: 'I run fast.',
    imageUrl: '/images/words/actions/word_155.jpg'
  },
  {
    wordId: 'word_156',
    word: 'walk',
    chinese: '走',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/wɔk/',
    exampleSentence: 'I walk to school.',
    imageUrl: '/images/words/actions/word_156.jpg'
  },
  {
    wordId: 'word_157',
    word: 'jump',
    chinese: '跳',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/dʒʌmp/',
    exampleSentence: 'I jump high!',
    imageUrl: '/images/words/actions/word_157.jpg'
  },
  {
    wordId: 'word_158',
    word: 'dance',
    chinese: '跳舞',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/dæns/',
    exampleSentence: 'I like to dance.',
    imageUrl: '/images/words/actions/word_158.jpg'
  },
  {
    wordId: 'word_159',
    word: 'sing',
    chinese: '唱歌',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/sɪŋ/',
    exampleSentence: 'I sing a song.',
    imageUrl: '/images/words/actions/word_159.jpg'
  },
  {
    wordId: 'word_160',
    word: 'draw',
    chinese: '画画',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/drɔː/',
    exampleSentence: 'I draw a picture.',
    imageUrl: '/images/words/actions/word_160.jpg'
  },
  {
    wordId: 'word_161',
    word: 'read',
    chinese: '阅读',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/riːd/',
    exampleSentence: 'I read books.',
    imageUrl: '/images/words/actions/word_161.jpg'
  },
  {
    wordId: 'word_162',
    word: 'write',
    chinese: '写',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/raɪt/',
    exampleSentence: 'I write my name.',
    imageUrl: '/images/words/actions/word_162.jpg'
  },
  {
    wordId: 'word_163',
    word: 'talk',
    chinese: '说话',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/tɔk/',
    exampleSentence: 'I talk to my friend.',
    imageUrl: '/images/words/actions/word_163.jpg'
  },
  {
    wordId: 'word_164',
    word: 'listen',
    chinese: '听',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/ˈlɪsən/',
    exampleSentence: 'I listen to music.',
    imageUrl: '/images/words/actions/word_164.jpg'
  },
  {
    wordId: 'word_165',
    word: 'watch',
    chinese: '看',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/wɑtʃ/',
    exampleSentence: 'I watch TV.',
    imageUrl: '/images/words/actions/word_165.jpg'
  },
  {
    wordId: 'word_166',
    word: 'help',
    chinese: '帮助',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/hɛlp/',
    exampleSentence: 'I help my mom.',
    imageUrl: '/images/words/actions/word_166.jpg'
  },
  {
    wordId: 'word_167',
    word: 'give',
    chinese: '给',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/ɡɪv/',
    exampleSentence: 'I give a gift.',
    imageUrl: '/images/words/actions/word_167.jpg'
  },
  {
    wordId: 'word_168',
    word: 'take',
    chinese: '拿',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/teɪk/',
    exampleSentence: 'I take a cookie.',
    imageUrl: '/images/words/actions/word_168.jpg'
  },
  {
    wordId: 'word_169',
    word: 'make',
    chinese: '做',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/meɪk/',
    exampleSentence: 'I make a cake.',
    imageUrl: '/images/words/actions/word_169.jpg'
  },
  {
    wordId: 'word_170',
    word: 'clean',
    chinese: '打扫',
    category: 'actions',
    difficulty: 'easy',
    phonetic: '/kliːn/',
    exampleSentence: 'I clean my room.',
    imageUrl: '/images/words/actions/word_170.jpg'
  },
];

/**
 * MEDIUM WORDS (200 words) - 中等单词
 * 适合有一定基础，4-5岁
 */
export const MEDIUM_WORDS: Word[] = [
  // More animals
  {
    wordId: 'word_101',
    word: 'elephant',
    chinese: '大象',
    category: 'animals',
    difficulty: 'medium',
    phonetic: '/ˈelɪfənt/',
    exampleSentence: 'The elephant is big.',
    imageUrl: '/images/words/animals/word_101.jpg'
  },
  {
    wordId: 'word_102',
    word: 'lion',
    chinese: '狮子',
    category: 'animals',
    difficulty: 'medium',
    phonetic: '/ˈlaɪən/',
    exampleSentence: 'The lion is strong.',
    imageUrl: '/images/words/animals/word_102.jpg'
  },
  {
    wordId: 'word_103',
    word: 'tiger',
    chinese: '老虎',
    category: 'animals',
    difficulty: 'medium',
    phonetic: '/ˈtaɪɡər/',
    exampleSentence: 'The tiger is fast.',
    imageUrl: '/images/words/animals/word_103.jpg'
  },
  {
    wordId: 'word_104',
    word: 'monkey',
    chinese: '猴子',
    category: 'animals',
    difficulty: 'medium',
    phonetic: '/ˈmʌŋki/',
    exampleSentence: 'The monkey climbs trees.',
    imageUrl: '/images/words/animals/word_104.jpg'
  },
  {
    wordId: 'word_105',
    word: 'panda',
    chinese: '熊猫',
    category: 'animals',
    difficulty: 'medium',
    phonetic: '/ˈpændə/',
    exampleSentence: 'I love pandas!',
    imageUrl: '/images/words/animals/word_105.jpg'
  },

  // More food
  {
    wordId: 'word_106',
    word: 'pizza',
    chinese: '披萨',
    category: 'food',
    difficulty: 'medium',
    phonetic: '/ˈpiːtsə/',
    exampleSentence: 'I love pizza!',
    imageUrl: '/images/words/food/word_106.jpg'
  },
  {
    wordId: 'word_107',
    word: 'hamburger',
    chinese: '汉堡包',
    category: 'food',
    difficulty: 'medium',
    phonetic: '/ˈhæmbɜːrɡər/',
    exampleSentence: 'The hamburger is yummy.',
    imageUrl: '/images/words/food/word_107.jpg'
  },
  {
    wordId: 'word_108',
    word: 'ice cream',
    chinese: '冰淇淋',
    category: 'food',
    difficulty: 'medium',
    phonetic: '/ˈaɪs kriːm/',
    exampleSentence: 'Ice cream is cold.',
    imageUrl: '/images/words/food/word_108.jpg'
  },
  {
    wordId: 'word_109',
    word: 'chocolate',
    chinese: '巧克力',
    category: 'food',
    difficulty: 'medium',
    phonetic: '/ˈtʃɔkələt/',
    exampleSentence: 'Chocolate is sweet.',
    imageUrl: '/images/words/food/word_109.jpg'
  },
  {
    wordId: 'word_110',
    word: 'strawberry',
    chinese: '草莓',
    category: 'food',
    difficulty: 'medium',
    phonetic: '/ˈstrɔːberi/',
    exampleSentence: 'Strawberries are red.',
    imageUrl: '/images/words/food/word_110.jpg'
  },

  // Clothes
  {
    wordId: 'word_111',
    word: 'shirt',
    chinese: '衬衫',
    category: 'clothes',
    difficulty: 'medium',
    phonetic: '/ʃɜːrt/',
    exampleSentence: 'I wear a blue shirt.',
    imageUrl: '/images/words/clothes/word_111.jpg'
  },
  {
    wordId: 'word_112',
    word: 'pants',
    chinese: '裤子',
    category: 'clothes',
    difficulty: 'medium',
    phonetic: '/pænts/',
    exampleSentence: 'These pants are blue.',
    imageUrl: '/images/words/clothes/word_112.jpg'
  },
  {
    wordId: 'word_113',
    word: 'dress',
    chinese: '连衣裙',
    category: 'clothes',
    difficulty: 'medium',
    phonetic: '/dres/',
    exampleSentence: 'The dress is beautiful.',
    imageUrl: '/images/words/clothes/word_113.jpg'
  },
  {
    wordId: 'word_114',
    word: 'shoes',
    chinese: '鞋子',
    category: 'clothes',
    difficulty: 'medium',
    phonetic: '/ʃuːz/',
    exampleSentence: 'I put on my shoes.',
    imageUrl: '/images/words/clothes/word_114.jpg'
  },
  {
    wordId: 'word_115',
    word: 'hat',
    chinese: '帽子',
    category: 'clothes',
    difficulty: 'medium',
    phonetic: '/hæt/',
    exampleSentence: 'I wear a hat.',
    imageUrl: '/images/words/clothes/word_115.jpg'
  },

  // Toys
  {
    wordId: 'word_116',
    word: 'ball',
    chinese: '球',
    category: 'toys',
    difficulty: 'medium',
    phonetic: '/bɔːl/',
    exampleSentence: 'Let\'s play ball!',
    imageUrl: '/images/words/toys/word_116.jpg'
  },
  {
    wordId: 'word_117',
    word: 'doll',
    chinese: '洋娃娃',
    category: 'toys',
    difficulty: 'medium',
    phonetic: '/dɔl/',
    exampleSentence: 'This is my doll.',
    imageUrl: '/images/words/toys/word_117.jpg'
  },
  {
    wordId: 'word_118',
    word: 'car',
    chinese: '小汽车',
    category: 'toys',
    difficulty: 'medium',
    phonetic: '/kɑːr/',
    exampleSentence: 'The car is red.',
    imageUrl: '/images/words/toys/word_118.jpg'
  },
  {
    wordId: 'word_119',
    word: 'book',
    chinese: '书',
    category: 'toys',
    difficulty: 'medium',
    phonetic: '/bʊk/',
    exampleSentence: 'I read books.',
    imageUrl: '/images/words/toys/word_119.jpg'
  },
  {
    wordId: 'word_120',
    word: 'kite',
    chinese: '风筝',
    category: 'toys',
    difficulty: 'medium',
    phonetic: '/kaɪt/',
    exampleSentence: 'Let\'s fly a kite!',
    imageUrl: '/images/words/toys/word_120.jpg'
  },

  // More medium words - Body parts
  {
    wordId: 'word_121',
    word: 'elbow',
    chinese: '肘部',
    category: 'body',
    difficulty: 'medium',
    phonetic: '/ˈelboʊ/',
    exampleSentence: 'I bend my elbow.',
    imageUrl: '/images/words/body/word_121.jpg'
  },
  {
    wordId: 'word_122',
    word: 'wrist',
    chinese: '手腕',
    category: 'body',
    difficulty: 'medium',
    phonetic: '/rɪst/',
    exampleSentence: 'I wear a watch on my wrist.',
    imageUrl: '/images/words/body/word_122.jpg'
  },
  {
    wordId: 'word_123',
    word: 'ankle',
    chinese: '脚踝',
    category: 'body',
    difficulty: 'medium',
    phonetic: '/ˈæŋkəl/',
    exampleSentence: 'I hurt my ankle.',
    imageUrl: '/images/words/body/word_123.jpg'
  },
  {
    wordId: 'word_124',
    word: 'cheek',
    chinese: '脸颊',
    category: 'body',
    difficulty: 'medium',
    phonetic: '/tʃiːk/',
    exampleSentence: 'I kiss your cheek.',
    imageUrl: '/images/words/body/word_124.jpg'
  },
  {
    wordId: 'word_125',
    word: 'chin',
    chinese: '下巴',
    category: 'body',
    difficulty: 'medium',
    phonetic: '/tʃɪn/',
    exampleSentence: 'I rest my chin on my hand.',
    imageUrl: '/images/words/body/word_125.jpg'
  },

  // More medium words - Nature
  {
    wordId: 'word_126',
    word: 'forest',
    chinese: '森林',
    category: 'nature',
    difficulty: 'medium',
    phonetic: '/ˈfɔrəst/',
    exampleSentence: 'I walk in the forest.',
    imageUrl: '/images/words/nature/word_126.jpg'
  },
  {
    wordId: 'word_127',
    word: 'desert',
    chinese: '沙漠',
    category: 'nature',
    difficulty: 'medium',
    phonetic: '/ˈdɛzərt/',
    exampleSentence: 'The desert is hot.',
    imageUrl: '/images/words/nature/word_127.jpg'
  },
  {
    wordId: 'word_128',
    word: 'island',
    chinese: '岛屿',
    category: 'nature',
    difficulty: 'medium',
    phonetic: '/ˈaɪlənd/',
    exampleSentence: 'I live on an island.',
    imageUrl: '/images/words/nature/word_128.jpg'
  },
  {
    wordId: 'word_129',
    word: 'waterfall',
    chinese: '瀑布',
    category: 'nature',
    difficulty: 'medium',
    phonetic: '/ˈwɔtərfɔl/',
    exampleSentence: 'The waterfall is beautiful.',
    imageUrl: '/images/words/nature/word_129.jpg'
  },
  {
    wordId: 'word_130',
    word: 'volcano',
    chinese: '火山',
    category: 'nature',
    difficulty: 'medium',
    phonetic: '/vɑlˈkeɪnoʊ/',
    exampleSentence: 'The volcano erupts!',
    imageUrl: '/images/words/nature/word_130.jpg'
  },

  // More medium words - School
  {
    wordId: 'word_131',
    word: 'library',
    chinese: '图书馆',
    category: 'school',
    difficulty: 'medium',
    phonetic: '/ˈlaɪbreri/',
    exampleSentence: 'I read in the library.',
    imageUrl: '/images/words/school/word_131.jpg'
  },
  {
    wordId: 'word_132',
    word: 'playground',
    chinese: '操场',
    category: 'school',
    difficulty: 'medium',
    phonetic: '/ˈpleɪɡraʊnd/',
    exampleSentence: 'I play on the playground.',
    imageUrl: '/images/words/school/word_132.jpg'
  },
  {
    wordId: 'word_133',
    word: 'canteen',
    chinese: '食堂',
    category: 'school',
    difficulty: 'medium',
    phonetic: '/kænˈtiːn/',
    exampleSentence: 'I eat in the canteen.',
    imageUrl: '/images/words/school/word_133.jpg'
  },
  {
    wordId: 'word_134',
    word: 'lesson',
    chinese: '课程',
    category: 'school',
    difficulty: 'medium',
    phonetic: '/ˈlɛsən/',
    exampleSentence: 'I have a math lesson.',
    imageUrl: '/images/words/school/word_134.jpg'
  },
  {
    wordId: 'word_135',
    word: 'homework',
    chinese: '作业',
    category: 'school',
    difficulty: 'medium',
    phonetic: '/ˈhoʊmwɜrk/',
    exampleSentence: 'I do my homework.',
    imageUrl: '/images/words/school/word_135.jpg'
  },

  // More medium words - Food
  {
    wordId: 'word_136',
    word: 'sandwich',
    chinese: '三明治',
    category: 'food',
    difficulty: 'medium',
    phonetic: '/ˈsændwɪtʃ/',
    exampleSentence: 'I eat a sandwich.',
    imageUrl: '/images/words/food/word_136.jpg'
  },
  {
    wordId: 'word_137',
    word: 'noodles',
    chinese: '面条',
    category: 'food',
    difficulty: 'medium',
    phonetic: '/ˈnuːdəlz/',
    exampleSentence: 'I like noodles.',
    imageUrl: '/images/words/food/word_137.jpg'
  },
  {
    wordId: 'word_138',
    word: 'soup',
    chinese: '汤',
    category: 'food',
    difficulty: 'medium',
    phonetic: '/suːp/',
    exampleSentence: 'The soup is hot.',
    imageUrl: '/images/words/food/word_138.jpg'
  },
  {
    wordId: 'word_139',
    word: 'salad',
    chinese: '沙拉',
    category: 'food',
    difficulty: 'medium',
    phonetic: '/ˈsæləd/',
    exampleSentence: 'I eat salad.',
    imageUrl: '/images/words/food/word_139.jpg'
  },
  {
    wordId: 'word_140',
    word: 'cheese',
    chinese: '奶酪',
    category: 'food',
    difficulty: 'medium',
    phonetic: '/tʃiːz/',
    exampleSentence: 'I like cheese.',
    imageUrl: '/images/words/food/word_140.jpg'
  },

  // More medium words - Clothes
  {
    wordId: 'word_141',
    word: 'jacket',
    chinese: '夹克',
    category: 'clothes',
    difficulty: 'medium',
    phonetic: '/ˈdʒækət/',
    exampleSentence: 'I wear a jacket.',
    imageUrl: '/images/words/clothes/word_141.jpg'
  },
  {
    wordId: 'word_142',
    word: 'coat',
    chinese: '外套',
    category: 'clothes',
    difficulty: 'medium',
    phonetic: '/koʊt/',
    exampleSentence: 'I wear a coat in winter.',
    imageUrl: '/images/words/clothes/word_142.jpg'
  },
  {
    wordId: 'word_143',
    word: 'socks',
    chinese: '袜子',
    category: 'clothes',
    difficulty: 'medium',
    phonetic: '/sɑks/',
    exampleSentence: 'I wear socks.',
    imageUrl: '/images/words/clothes/word_143.jpg'
  },
  {
    wordId: 'word_144',
    word: 'gloves',
    chinese: '手套',
    category: 'clothes',
    difficulty: 'medium',
    phonetic: '/ɡlʌvz/',
    exampleSentence: 'I wear gloves.',
    imageUrl: '/images/words/clothes/word_144.jpg'
  },
  {
    wordId: 'word_145',
    word: 'scarf',
    chinese: '围巾',
    category: 'clothes',
    difficulty: 'medium',
    phonetic: '/skɑrf/',
    exampleSentence: 'I wear a scarf.',
    imageUrl: '/images/words/clothes/word_145.jpg'
  },

  // More medium words - Animals
  {
    wordId: 'word_146',
    word: 'giraffe',
    chinese: '长颈鹿',
    category: 'animals',
    difficulty: 'medium',
    phonetic: '/dʒəˈræf/',
    exampleSentence: 'The giraffe is tall.',
    imageUrl: '/images/words/animals/word_146.jpg'
  },
  {
    wordId: 'word_147',
    word: 'zebra',
    chinese: '斑马',
    category: 'animals',
    difficulty: 'medium',
    phonetic: '/ˈziːbrə/',
    exampleSentence: 'The zebra has stripes.',
    imageUrl: '/images/words/animals/word_147.jpg'
  },
  {
    wordId: 'word_148',
    word: 'penguin',
    chinese: '企鹅',
    category: 'animals',
    difficulty: 'medium',
    phonetic: '/ˈpɛŋɡwɪn/',
    exampleSentence: 'The penguin walks funny.',
    imageUrl: '/images/words/animals/word_148.jpg'
  },
  {
    wordId: 'word_149',
    word: 'kangaroo',
    chinese: '袋鼠',
    category: 'animals',
    difficulty: 'medium',
    phonetic: '/ˌkæŋɡəˈruː/',
    exampleSentence: 'The kangaroo jumps.',
    imageUrl: '/images/words/animals/word_149.jpg'
  },
  {
    wordId: 'word_150',
    word: 'dolphin',
    chinese: '海豚',
    category: 'animals',
    difficulty: 'medium',
    phonetic: '/ˈdɑlfən/',
    exampleSentence: 'The dolphin swims.',
    imageUrl: '/images/words/animals/word_150.jpg'
  },

  // More medium words - Vehicles
  {
    wordId: 'word_151',
    word: 'helicopter',
    chinese: '直升机',
    category: 'vehicles',
    difficulty: 'medium',
    phonetic: '/ˈhɛləkɑptər/',
    exampleSentence: 'The helicopter flies.',
    imageUrl: '/images/words/vehicles/word_151.jpg'
  },
  {
    wordId: 'word_152',
    word: 'subway',
    chinese: '地铁',
    category: 'vehicles',
    difficulty: 'medium',
    phonetic: '/ˈsʌbweɪ/',
    exampleSentence: 'I take the subway.',
    imageUrl: '/images/words/vehicles/word_152.jpg'
  },
  {
    wordId: 'word_153',
    word: 'motorcycle',
    chinese: '摩托车',
    category: 'vehicles',
    difficulty: 'medium',
    phonetic: '/ˈmoʊtərsaɪkəl/',
    exampleSentence: 'The motorcycle is fast.',
    imageUrl: '/images/words/vehicles/word_153.jpg'
  },
  {
    wordId: 'word_154',
    word: 'bicycle',
    chinese: '自行车',
    category: 'vehicles',
    difficulty: 'medium',
    phonetic: '/ˈbaɪsɪkəl/',
    exampleSentence: 'I ride my bicycle.',
    imageUrl: '/images/words/vehicles/word_154.jpg'
  },
  {
    wordId: 'word_155',
    word: 'ship',
    chinese: '大船',
    category: 'vehicles',
    difficulty: 'medium',
    phonetic: '/ʃɪp/',
    exampleSentence: 'The ship is big.',
    imageUrl: '/images/words/vehicles/word_155.jpg'
  },

  // More medium words - Home
  {
    wordId: 'word_156',
    word: 'bedroom',
    chinese: '卧室',
    category: 'home',
    difficulty: 'medium',
    phonetic: '/ˈbɛdruːm/',
    exampleSentence: 'I sleep in my bedroom.',
    imageUrl: '/images/words/home/word_156.jpg'
  },
  {
    wordId: 'word_157',
    word: 'living room',
    chinese: '客厅',
    category: 'home',
    difficulty: 'medium',
    phonetic: '/ˈlɪvɪŋ ruːm/',
    exampleSentence: 'I watch TV in the living room.',
    imageUrl: '/images/words/home/word_157.jpg'
  },
  {
    wordId: 'word_158',
    word: 'garage',
    chinese: '车库',
    category: 'home',
    difficulty: 'medium',
    phonetic: '/ɡəˈrɑʒ/',
    exampleSentence: 'The car is in the garage.',
    imageUrl: '/images/words/home/word_158.jpg'
  },
  {
    wordId: 'word_159',
    word: 'yard',
    chinese: '院子',
    category: 'home',
    difficulty: 'medium',
    phonetic: '/jɑrd/',
    exampleSentence: 'I play in the yard.',
    imageUrl: '/images/words/home/word_159.jpg'
  },
  {
    wordId: 'word_160',
    word: 'roof',
    chinese: '屋顶',
    category: 'home',
    difficulty: 'medium',
    phonetic: '/ruːf/',
    exampleSentence: 'The roof is high.',
    imageUrl: '/images/words/home/word_160.jpg'
  },

  // More medium words - Family
  {
    wordId: 'word_161',
    word: 'aunt',
    chinese: '阿姨/姑姑',
    category: 'family',
    difficulty: 'medium',
    phonetic: '/ænt/',
    exampleSentence: 'This is my aunt.',
    imageUrl: '/images/words/family/word_161.jpg'
  },
  {
    wordId: 'word_162',
    word: 'uncle',
    chinese: '叔叔/舅舅',
    category: 'family',
    difficulty: 'medium',
    phonetic: '/ˈʌŋkəl/',
    exampleSentence: 'This is my uncle.',
    imageUrl: '/images/words/family/word_162.jpg'
  },
  {
    wordId: 'word_163',
    word: 'cousin',
    chinese: '堂/表兄弟姐妹',
    category: 'family',
    difficulty: 'medium',
    phonetic: '/ˈkʌzən/',
    exampleSentence: 'This is my cousin.',
    imageUrl: '/images/words/family/word_163.jpg'
  },
  {
    wordId: 'word_164',
    word: 'niece',
    chinese: '侄女/外甥女',
    category: 'family',
    difficulty: 'medium',
    phonetic: '/niːs/',
    exampleSentence: 'This is my niece.',
    imageUrl: '/images/words/family/word_164.jpg'
  },
  {
    wordId: 'word_165',
    word: 'nephew',
    chinese: '侄子/外甥',
    category: 'family',
    difficulty: 'medium',
    phonetic: '/ˈnɛfjuː/',
    exampleSentence: 'This is my nephew.',
    imageUrl: '/images/words/family/word_165.jpg'
  },

  // More medium words - Actions
  {
    wordId: 'word_166',
    word: 'climb',
    chinese: '攀爬',
    category: 'actions',
    difficulty: 'medium',
    phonetic: '/klaɪm/',
    exampleSentence: 'I climb the tree.',
    imageUrl: '/images/words/actions/word_166.jpg'
  },
  {
    wordId: 'word_167',
    word: 'swim',
    chinese: '游泳',
    category: 'actions',
    difficulty: 'medium',
    phonetic: '/swɪm/',
    exampleSentence: 'I swim in the water.',
    imageUrl: '/images/words/actions/word_167.jpg'
  },
  {
    wordId: 'word_168',
    word: 'fly',
    chinese: '飞',
    category: 'actions',
    difficulty: 'medium',
    phonetic: '/flaɪ/',
    exampleSentence: 'Birds fly in the sky.',
    imageUrl: '/images/words/actions/word_168.jpg'
  },
  {
    wordId: 'word_169',
    word: 'throw',
    chinese: '扔',
    category: 'actions',
    difficulty: 'medium',
    phonetic: '/θroʊ/',
    exampleSentence: 'I throw the ball.',
    imageUrl: '/images/words/actions/word_169.jpg'
  },
  {
    wordId: 'word_170',
    word: 'catch',
    chinese: '接/抓',
    category: 'actions',
    difficulty: 'medium',
    phonetic: '/kætʃ/',
    exampleSentence: 'I catch the ball.',
    imageUrl: '/images/words/actions/word_170.jpg'
  },

  // More medium words - Feelings
  {
    wordId: 'word_171',
    word: 'worried',
    chinese: '担心',
    category: 'feelings',
    difficulty: 'medium',
    phonetic: '/ˈwɜrid/',
    exampleSentence: 'I am worried.',
    imageUrl: '/images/words/feelings/word_171.jpg'
  },
  {
    wordId: 'word_172',
    word: 'calm',
    chinese: '平静',
    category: 'feelings',
    difficulty: 'medium',
    phonetic: '/kɑm/',
    exampleSentence: 'I stay calm.',
    imageUrl: '/images/words/feelings/word_172.jpg'
  },
  {
    wordId: 'word_173',
    word: 'lonely',
    chinese: '孤独',
    category: 'feelings',
    difficulty: 'medium',
    phonetic: '/ˈloʊnli/',
    exampleSentence: 'I feel lonely.',
    imageUrl: '/images/words/feelings/word_173.jpg'
  },
  {
    wordId: 'word_174',
    word: 'nervous',
    chinese: '紧张',
    category: 'feelings',
    difficulty: 'medium',
    phonetic: '/ˈnɜrvəs/',
    exampleSentence: 'I am nervous.',
    imageUrl: '/images/words/feelings/word_174.jpg'
  },
  {
    wordId: 'word_175',
    word: 'confident',
    chinese: '自信',
    category: 'feelings',
    difficulty: 'medium',
    phonetic: '/ˈkɑnfədənt/',
    exampleSentence: 'I am confident.',
    imageUrl: '/images/words/feelings/word_175.jpg'
  },

  // More medium words - Toys
  {
    wordId: 'word_176',
    word: 'teddy bear',
    chinese: '泰迪熊',
    category: 'toys',
    difficulty: 'medium',
    phonetic: '/ˈtɛdi bɛr/',
    exampleSentence: 'I sleep with my teddy bear.',
    imageUrl: '/images/words/toys/word_176.jpg'
  },
  {
    wordId: 'word_177',
    word: 'robot',
    chinese: '机器人',
    category: 'toys',
    difficulty: 'medium',
    phonetic: '/ˈroʊbɑt/',
    exampleSentence: 'I have a robot.',
    imageUrl: '/images/words/toys/word_177.jpg'
  },
  {
    wordId: 'word_178',
    word: 'puzzle',
    chinese: '拼图',
    category: 'toys',
    difficulty: 'medium',
    phonetic: '/ˈpʌzəl/',
    exampleSentence: 'I do a puzzle.',
    imageUrl: '/images/words/toys/word_178.jpg'
  },
  {
    wordId: 'word_179',
    word: 'lego',
    chinese: '乐高',
    category: 'toys',
    difficulty: 'medium',
    phonetic: '/ˈlɛɡoʊ/',
    exampleSentence: 'I build with lego.',
    imageUrl: '/images/words/toys/word_179.jpg'
  },
  {
    wordId: 'word_180',
    word: 'yo-yo',
    chinese: '溜溜球',
    category: 'toys',
    difficulty: 'medium',
    phonetic: '/ˈjoʊ joʊ/',
    exampleSentence: 'I play with a yo-yo.',
    imageUrl: '/images/words/toys/word_180.jpg'
  },
];

/**
 * HARD WORDS (150 words) - 困难单词
 * 适合进阶学习，5-6岁
 */
export const HARD_WORDS: Word[] = [
  {
    wordId: 'word_201',
    word: 'butterfly',
    chinese: '蝴蝶',
    category: 'animals',
    difficulty: 'hard',
    phonetic: '/ˈbʌtərflaɪ/',
    exampleSentence: 'The butterfly is beautiful.',
    imageUrl: '/images/words/animals/word_201.jpg'
  },
  {
    wordId: 'word_202',
    word: 'crocodile',
    chinese: '鳄鱼',
    category: 'animals',
    difficulty: 'hard',
    phonetic: '/ˈkrɔkədaɪl/',
    exampleSentence: 'The crocodile swims.',
    imageUrl: '/images/words/animals/word_202.jpg'
  },
  {
    wordId: 'word_203',
    word: 'pineapple',
    chinese: '菠萝',
    category: 'food',
    difficulty: 'hard',
    phonetic: '/ˈpaɪnæpəl/',
    exampleSentence: 'Pineapples are sweet.',
    imageUrl: '/images/words/food/word_203.jpg'
  },
  {
    wordId: 'word_204',
    word: 'watermelon',
    chinese: '西瓜',
    category: 'food',
    difficulty: 'hard',
    phonetic: '/ˈwɔːtərmelən/',
    exampleSentence: 'Watermelon is my favorite fruit.',
    imageUrl: '/images/words/food/word_204.jpg'
  },
  {
    wordId: 'word_205',
    word: 'strawberry',
    chinese: '草莓',
    category: 'food',
    difficulty: 'hard',
    phonetic: '/ˈstrɔːberi/',
    exampleSentence: 'I love strawberries!',
    imageUrl: '/images/words/food/word_205.jpg'
  },

  // More hard words - Animals
  {
    wordId: 'word_206',
    word: 'octopus',
    chinese: '章鱼',
    category: 'animals',
    difficulty: 'hard',
    phonetic: '/ˈɑktəpəs/',
    exampleSentence: 'The octopus has eight arms.',
    imageUrl: '/images/words/animals/word_206.jpg'
  },
  {
    wordId: 'word_207',
    word: 'shark',
    chinese: '鲨鱼',
    category: 'animals',
    difficulty: 'hard',
    phonetic: '/ʃɑrk/',
    exampleSentence: 'The shark swims fast.',
    imageUrl: '/images/words/animals/word_207.jpg'
  },
  {
    wordId: 'word_208',
    word: 'whale',
    chinese: '鲸鱼',
    category: 'animals',
    difficulty: 'hard',
    phonetic: '/weɪl/',
    exampleSentence: 'The whale is huge.',
    imageUrl: '/images/words/animals/word_208.jpg'
  },
  {
    wordId: 'word_209',
    word: 'flamingo',
    chinese: '火烈鸟',
    category: 'animals',
    difficulty: 'hard',
    phonetic: '/fləˈmɪŋɡoʊ/',
    exampleSentence: 'The flamingo is pink.',
    imageUrl: '/images/words/animals/word_209.jpg'
  },
  {
    wordId: 'word_210',
    word: 'peacock',
    chinese: '孔雀',
    category: 'animals',
    difficulty: 'hard',
    phonetic: '/ˈpiːkɑk/',
    exampleSentence: 'The peacock is beautiful.',
    imageUrl: '/images/words/animals/word_210.jpg'
  },
  {
    wordId: 'word_211',
    word: 'leopard',
    chinese: '豹子',
    category: 'animals',
    difficulty: 'hard',
    phonetic: '/ˈlɛpərd/',
    exampleSentence: 'The leopard has spots.',
    imageUrl: '/images/words/animals/word_211.jpg'
  },
  {
    wordId: 'word_212',
    word: 'rhinoceros',
    chinese: '犀牛',
    category: 'animals',
    difficulty: 'hard',
    phonetic: '/raɪˈnɑsərəs/',
    exampleSentence: 'The rhinoceros is strong.',
    imageUrl: '/images/words/animals/word_212.jpg'
  },
  {
    wordId: 'word_213',
    word: 'hippopotamus',
    chinese: '河马',
    category: 'animals',
    difficulty: 'hard',
    phonetic: '/ˌhɪpəˈpɑtəməs/',
    exampleSentence: 'The hippopotamus likes water.',
    imageUrl: '/images/words/animals/word_213.jpg'
  },
  {
    wordId: 'word_214',
    word: 'chameleon',
    chinese: '变色龙',
    category: 'animals',
    difficulty: 'hard',
    phonetic: '/kəˈmiːliən/',
    exampleSentence: 'The chameleon changes colors.',
    imageUrl: '/images/words/animals/word_214.jpg'
  },
  {
    wordId: 'word_215',
    word: 'mosquito',
    chinese: '蚊子',
    category: 'animals',
    difficulty: 'hard',
    phonetic: '/məˈskiːtoʊ/',
    exampleSentence: 'The mosquito bites.',
    imageUrl: '/images/words/animals/word_215.jpg'
  },

  // More hard words - Food
  {
    wordId: 'word_216',
    word: 'broccoli',
    chinese: '西兰花',
    category: 'food',
    difficulty: 'hard',
    phonetic: '/ˈbrɑkəli/',
    exampleSentence: 'I eat broccoli.',
    imageUrl: '/images/words/food/word_216.jpg'
  },
  {
    wordId: 'word_217',
    word: 'cucumber',
    chinese: '黄瓜',
    category: 'food',
    difficulty: 'hard',
    phonetic: '/ˈkjuːkʌmbər/',
    exampleSentence: 'I like cucumber.',
    imageUrl: '/images/words/food/word_217.jpg'
  },
  {
    wordId: 'word_218',
    word: 'mushroom',
    chinese: '蘑菇',
    category: 'food',
    difficulty: 'hard',
    phonetic: '/ˈmʌʃrum/',
    exampleSentence: 'I eat mushrooms.',
    imageUrl: '/images/words/food/word_218.jpg'
  },
  {
    wordId: 'word_219',
    word: 'yogurt',
    chinese: '酸奶',
    category: 'food',
    difficulty: 'hard',
    phonetic: '/ˈjoʊɡərt/',
    exampleSentence: 'I eat yogurt.',
    imageUrl: '/images/words/food/word_219.jpg'
  },
  {
    wordId: 'word_220',
    word: 'spaghetti',
    chinese: '意大利面',
    category: 'food',
    difficulty: 'hard',
    phonetic: '/spəˈɡɛti/',
    exampleSentence: 'I like spaghetti.',
    imageUrl: '/images/words/food/word_220.jpg'
  },
  {
    wordId: 'word_221',
    word: 'popcorn',
    chinese: '爆米花',
    category: 'food',
    difficulty: 'hard',
    phonetic: '/ˈpɑpkɔrn/',
    exampleSentence: 'I eat popcorn.',
    imageUrl: '/images/words/food/word_221.jpg'
  },
  {
    wordId: 'word_222',
    word: 'honey',
    chinese: '蜂蜜',
    category: 'food',
    difficulty: 'hard',
    phonetic: '/ˈhʌni/',
    exampleSentence: 'I like honey.',
    imageUrl: '/images/words/food/word_222.jpg'
  },
  {
    wordId: 'word_223',
    word: 'pancake',
    chinese: '煎饼',
    category: 'food',
    difficulty: 'hard',
    phonetic: '/ˈpænkeɪk/',
    exampleSentence: 'I eat pancakes.',
    imageUrl: '/images/words/food/word_223.jpg'
  },
  {
    wordId: 'word_224',
    word: 'dumpling',
    chinese: '饺子',
    category: 'food',
    difficulty: 'hard',
    phonetic: '/ˈdʌmplɪŋ/',
    exampleSentence: 'I eat dumplings.',
    imageUrl: '/images/words/food/word_224.jpg'
  },
  {
    wordId: 'word_225',
    word: 'lemonade',
    chinese: '柠檬水',
    category: 'food',
    difficulty: 'hard',
    phonetic: '/ˌlɛməˈneɪd/',
    exampleSentence: 'I drink lemonade.',
    imageUrl: '/images/words/food/word_225.jpg'
  },

  // More hard words - Nature
  {
    wordId: 'word_226',
    word: 'rainbow',
    chinese: '彩虹',
    category: 'nature',
    difficulty: 'hard',
    phonetic: '/ˈreɪnboʊ/',
    exampleSentence: 'I see a rainbow.',
    imageUrl: '/images/words/nature/word_226.jpg'
  },
  {
    wordId: 'word_227',
    word: 'thunder',
    chinese: '雷',
    category: 'nature',
    difficulty: 'hard',
    phonetic: '/ˈθʌndər/',
    exampleSentence: 'I hear thunder.',
    imageUrl: '/images/words/nature/word_227.jpg'
  },
  {
    wordId: 'word_228',
    word: 'lightning',
    chinese: '闪电',
    category: 'nature',
    difficulty: 'hard',
    phonetic: '/ˈlaɪtnɪŋ/',
    exampleSentence: 'I see lightning.',
    imageUrl: '/images/words/nature/word_228.jpg'
  },
  {
    wordId: 'word_229',
    word: 'earthquake',
    chinese: '地震',
    category: 'nature',
    difficulty: 'hard',
    phonetic: '/ˈɜrθkweɪk/',
    exampleSentence: 'The earthquake shakes.',
    imageUrl: '/images/words/nature/word_229.jpg'
  },
  {
    wordId: 'word_230',
    word: 'tornado',
    chinese: '龙卷风',
    category: 'nature',
    difficulty: 'hard',
    phonetic: '/tɔrˈneɪdoʊ/',
    exampleSentence: 'The tornado spins.',
    imageUrl: '/images/words/nature/word_230.jpg'
  },
  {
    wordId: 'word_231',
    word: 'avalanche',
    chinese: '雪崩',
    category: 'nature',
    difficulty: 'hard',
    phonetic: '/ˈævəlæntʃ/',
    exampleSentence: 'The avalanche falls.',
    imageUrl: '/images/words/nature/word_231.jpg'
  },
  {
    wordId: 'word_232',
    word: 'canyon',
    chinese: '峡谷',
    category: 'nature',
    difficulty: 'hard',
    phonetic: '/ˈkænjən/',
    exampleSentence: 'The canyon is deep.',
    imageUrl: '/images/words/nature/word_232.jpg'
  },
  {
    wordId: 'word_233',
    word: 'waterfall',
    chinese: '瀑布',
    category: 'nature',
    difficulty: 'hard',
    phonetic: '/ˈwɔtərfɔl/',
    exampleSentence: 'The waterfall is beautiful.',
    imageUrl: '/images/words/nature/word_233.jpg'
  },
  {
    wordId: 'word_234',
    word: 'sunshine',
    chinese: '阳光',
    category: 'nature',
    difficulty: 'hard',
    phonetic: '/ˈsʌnʃaɪn/',
    exampleSentence: 'I like sunshine.',
    imageUrl: '/images/words/nature/word_234.jpg'
  },
  {
    wordId: 'word_235',
    word: 'moonlight',
    chinese: '月光',
    category: 'nature',
    difficulty: 'hard',
    phonetic: '/ˈmuːnlaɪt/',
    exampleSentence: 'I see moonlight.',
    imageUrl: '/images/words/nature/word_235.jpg'
  },

  // More hard words - School
  {
    wordId: 'word_236',
    word: 'university',
    chinese: '大学',
    category: 'school',
    difficulty: 'hard',
    phonetic: '/ˌjuːnəˈvɜrsəti/',
    exampleSentence: 'I go to university.',
    imageUrl: '/images/words/school/word_236.jpg'
  },
  {
    wordId: 'word_237',
    word: 'dictionary',
    chinese: '字典',
    category: 'school',
    difficulty: 'hard',
    phonetic: '/ˈdɪkəˌneri/',
    exampleSentence: 'I use a dictionary.',
    imageUrl: '/images/words/school/word_237.jpg'
  },
  {
    wordId: 'word_238',
    word: 'calendar',
    chinese: '日历',
    category: 'school',
    difficulty: 'hard',
    phonetic: '/ˈkæləndər/',
    exampleSentence: 'I check the calendar.',
    imageUrl: '/images/words/school/word_238.jpg'
  },
  {
    wordId: 'word_239',
    word: 'computer',
    chinese: '电脑',
    category: 'school',
    difficulty: 'hard',
    phonetic: '/kəmˈpjuːtər/',
    exampleSentence: 'I use a computer.',
    imageUrl: '/images/words/school/word_239.jpg'
  },
  {
    wordId: 'word_240',
    word: 'project',
    chinese: '项目',
    category: 'school',
    difficulty: 'hard',
    phonetic: '/ˈprɑdʒɛkt/',
    exampleSentence: 'I do a project.',
    imageUrl: '/images/words/school/word_240.jpg'
  },
  {
    wordId: 'word_241',
    word: 'experiment',
    chinese: '实验',
    category: 'school',
    difficulty: 'hard',
    phonetic: '/əkˈspɛrəmənt/',
    exampleSentence: 'I do an experiment.',
    imageUrl: '/images/words/school/word_241.jpg'
  },
  {
    wordId: 'word_242',
    word: 'gymnasium',
    chinese: '体育馆',
    category: 'school',
    difficulty: 'hard',
    phonetic: '/dʒɪmˈneɪziəm/',
    exampleSentence: 'I play in the gymnasium.',
    imageUrl: '/images/words/school/word_242.jpg'
  },
  {
    wordId: 'word_243',
    word: 'auditorium',
    chinese: '礼堂',
    category: 'school',
    difficulty: 'hard',
    phonetic: '/ˌɔdəˈtɔriəm/',
    exampleSentence: 'I sit in the auditorium.',
    imageUrl: '/images/words/school/word_243.jpg'
  },
  {
    wordId: 'word_244',
    word: 'cafeteria',
    chinese: '自助餐厅',
    category: 'school',
    difficulty: 'hard',
    phonetic: '/ˌkæfəˈtɪriə/',
    exampleSentence: 'I eat in the cafeteria.',
    imageUrl: '/images/words/school/word_244.jpg'
  },
  {
    wordId: 'word_245',
    word: 'laboratory',
    chinese: '实验室',
    category: 'school',
    difficulty: 'hard',
    phonetic: '/ləˈbɔrətɔri/',
    exampleSentence: 'I work in the laboratory.',
    imageUrl: '/images/words/school/word_245.jpg'
  },

  // More hard words - Vehicles
  {
    wordId: 'word_246',
    word: 'airplane',
    chinese: '飞机',
    category: 'vehicles',
    difficulty: 'hard',
    phonetic: '/ˈɛrpleɪn/',
    exampleSentence: 'The airplane flies.',
    imageUrl: '/images/words/vehicles/word_246.jpg'
  },
  {
    wordId: 'word_247',
    word: 'helicopter',
    chinese: '直升机',
    category: 'vehicles',
    difficulty: 'hard',
    phonetic: '/ˈhɛləkɑptər/',
    exampleSentence: 'The helicopter flies.',
    imageUrl: '/images/words/vehicles/word_247.jpg'
  },
  {
    wordId: 'word_248',
    word: 'spaceship',
    chinese: '宇宙飞船',
    category: 'vehicles',
    difficulty: 'hard',
    phonetic: '/ˈspeɪsʃɪp/',
    exampleSentence: 'The spaceship goes to space.',
    imageUrl: '/images/words/vehicles/word_248.jpg'
  },
  {
    wordId: 'word_249',
    word: 'tractor',
    chinese: '拖拉机',
    category: 'vehicles',
    difficulty: 'hard',
    phonetic: '/ˈtræktər/',
    exampleSentence: 'The tractor works.',
    imageUrl: '/images/words/vehicles/word_249.jpg'
  },
  {
    wordId: 'word_250',
    word: 'ambulance',
    chinese: '救护车',
    category: 'vehicles',
    difficulty: 'hard',
    phonetic: '/ˈæmbjələns/',
    exampleSentence: 'The ambulance helps.',
    imageUrl: '/images/words/vehicles/word_250.jpg'
  },

  // More hard words - Actions
  {
    wordId: 'word_251',
    word: 'decorate',
    chinese: '装饰',
    category: 'actions',
    difficulty: 'hard',
    phonetic: '/ˈdɛkəreɪt/',
    exampleSentence: 'I decorate the room.',
    imageUrl: '/images/words/actions/word_251.jpg'
  },
  {
    wordId: 'word_252',
    word: 'celebrate',
    chinese: '庆祝',
    category: 'actions',
    difficulty: 'hard',
    phonetic: '/ˈsɛləbreɪt/',
    exampleSentence: 'We celebrate together.',
    imageUrl: '/images/words/actions/word_252.jpg'
  },
  {
    wordId: 'word_253',
    word: 'exercise',
    chinese: '锻炼',
    category: 'actions',
    difficulty: 'hard',
    phonetic: '/ˈɛksərsaɪz/',
    exampleSentence: 'I exercise every day.',
    imageUrl: '/images/words/actions/word_253.jpg'
  },
  {
    wordId: 'word_254',
    word: 'meditate',
    chinese: '冥想',
    category: 'actions',
    difficulty: 'hard',
    phonetic: '/ˈmɛdəteɪt/',
    exampleSentence: 'I meditate quietly.',
    imageUrl: '/images/words/actions/word_254.jpg'
  },
  {
    wordId: 'word_255',
    word: 'investigate',
    chinese: '调查',
    category: 'actions',
    difficulty: 'hard',
    phonetic: '/ɪnˈvɛstəɡeɪt/',
    exampleSentence: 'I investigate the mystery.',
    imageUrl: '/images/words/actions/word_255.jpg'
  },
  {
    wordId: 'word_256',
    word: 'communicate',
    chinese: '交流',
    category: 'actions',
    difficulty: 'hard',
    phonetic: '/kəˈmjuːnəkeɪt/',
    exampleSentence: 'I communicate with friends.',
    imageUrl: '/images/words/actions/word_256.jpg'
  },
  {
    wordId: 'word_257',
    word: 'appreciate',
    chinese: '感激',
    category: 'actions',
    difficulty: 'hard',
    phonetic: '/əˈpriːʃieɪt/',
    exampleSentence: 'I appreciate your help.',
    imageUrl: '/images/words/actions/word_257.jpg'
  },
  {
    wordId: 'word_258',
    word: 'demonstrate',
    chinese: '演示',
    category: 'actions',
    difficulty: 'hard',
    phonetic: '/ˈdɛmənstreɪt/',
    exampleSentence: 'I demonstrate how to do it.',
    imageUrl: '/images/words/actions/word_258.jpg'
  },
  {
    wordId: 'word_259',
    word: 'concentrate',
    chinese: '集中注意力',
    category: 'actions',
    difficulty: 'hard',
    phonetic: '/ˈkɑnsəntreɪt/',
    exampleSentence: 'I concentrate on my work.',
    imageUrl: '/images/words/actions/word_259.jpg'
  },
  {
    wordId: 'word_260',
    word: 'imagine',
    chinese: '想象',
    category: 'actions',
    difficulty: 'hard',
    phonetic: '/əˈmædʒən/',
    exampleSentence: 'I imagine a new world.',
    imageUrl: '/images/words/actions/word_260.jpg'
  },

  // More hard words - Feelings
  {
    wordId: 'word_261',
    word: 'frustrated',
    chinese: '沮丧',
    category: 'feelings',
    difficulty: 'hard',
    phonetic: '/ˈfrʌstreɪtəd/',
    exampleSentence: 'I feel frustrated.',
    imageUrl: '/images/words/feelings/word_261.jpg'
  },
  {
    wordId: 'word_262',
    word: 'disappointed',
    chinese: '失望',
    category: 'feelings',
    difficulty: 'hard',
    phonetic: '/ˌdɪsəˈpɔɪntəd/',
    exampleSentence: 'I am disappointed.',
    imageUrl: '/images/words/feelings/word_262.jpg'
  },
  {
    wordId: 'word_263',
    word: 'embarrassed',
    chinese: '尴尬',
    category: 'feelings',
    difficulty: 'hard',
    phonetic: '/əmˈbærəst/',
    exampleSentence: 'I am embarrassed.',
    imageUrl: '/images/words/feelings/word_263.jpg'
  },
  {
    wordId: 'word_264',
    word: 'exhausted',
    chinese: '筋疲力尽',
    category: 'feelings',
    difficulty: 'hard',
    phonetic: '/əɡˈzɔstəd/',
    exampleSentence: 'I am exhausted.',
    imageUrl: '/images/words/feelings/word_264.jpg'
  },
  {
    wordId: 'word_265',
    word: 'delighted',
    chinese: '高兴',
    category: 'feelings',
    difficulty: 'hard',
    phonetic: '/dɪˈlaɪtəd/',
    exampleSentence: 'I am delighted.',
    imageUrl: '/images/words/feelings/word_265.jpg'
  },
  {
    wordId: 'word_266',
    word: 'terrified',
    chinese: '恐惧',
    category: 'feelings',
    difficulty: 'hard',
    phonetic: '/ˈtɛrəfaɪd/',
    exampleSentence: 'I am terrified.',
    imageUrl: '/images/words/feelings/word_266.jpg'
  },
  {
    wordId: 'word_267',
    word: 'satisfied',
    chinese: '满意',
    category: 'feelings',
    difficulty: 'hard',
    phonetic: '/ˈsætəsfaɪd/',
    exampleSentence: 'I am satisfied.',
    imageUrl: '/images/words/feelings/word_267.jpg'
  },
  {
    wordId: 'word_268',
    word: 'confused',
    chinese: '困惑',
    category: 'feelings',
    difficulty: 'hard',
    phonetic: '/kənˈfjuzd/',
    exampleSentence: 'I am confused.',
    imageUrl: '/images/words/feelings/word_268.jpg'
  },
  {
    wordId: 'word_269',
    word: 'relieved',
    chinese: '如释重负',
    category: 'feelings',
    difficulty: 'hard',
    phonetic: '/rɪˈliːvd/',
    exampleSentence: 'I am relieved.',
    imageUrl: '/images/words/feelings/word_269.jpg'
  },
  {
    wordId: 'word_270',
    word: 'grateful',
    chinese: '感激',
    category: 'feelings',
    difficulty: 'hard',
    phonetic: '/ˈɡreɪtfəl/',
    exampleSentence: 'I am grateful.',
    imageUrl: '/images/words/feelings/word_270.jpg'
  },

  // More hard words - Body
  {
    wordId: 'word_271',
    word: 'muscle',
    chinese: '肌肉',
    category: 'body',
    difficulty: 'hard',
    phonetic: '/ˈmʌsəl/',
    exampleSentence: 'I have strong muscles.',
    imageUrl: '/images/words/body/word_271.jpg'
  },
  {
    wordId: 'word_272',
    word: 'skeleton',
    chinese: '骨骼',
    category: 'body',
    difficulty: 'hard',
    phonetic: '/ˈskɛlətən/',
    exampleSentence: 'I have a skeleton.',
    imageUrl: '/images/words/body/word_272.jpg'
  },
  {
    wordId: 'word_273',
    word: 'stomach',
    chinese: '胃',
    category: 'body',
    difficulty: 'hard',
    phonetic: '/ˈstʌmək/',
    exampleSentence: 'My stomach hurts.',
    imageUrl: '/images/words/body/word_273.jpg'
  },
  {
    wordId: 'word_274',
    word: 'throat',
    chinese: '喉咙',
    category: 'body',
    difficulty: 'hard',
    phonetic: '/θroʊt/',
    exampleSentence: 'My throat hurts.',
    imageUrl: '/images/words/body/word_274.jpg'
  },
  {
    wordId: 'word_275',
    word: 'lungs',
    chinese: '肺',
    category: 'body',
    difficulty: 'hard',
    phonetic: '/lʌŋz/',
    exampleSentence: 'I breathe with my lungs.',
    imageUrl: '/images/words/body/word_275.jpg'
  },

  // More hard words - Home
  {
    wordId: 'word_276',
    word: 'apartment',
    chinese: '公寓',
    category: 'home',
    difficulty: 'hard',
    phonetic: '/əˈpɑrtmənt/',
    exampleSentence: 'I live in an apartment.',
    imageUrl: '/images/words/home/word_276.jpg'
  },
  {
    wordId: 'word_277',
    word: 'basement',
    chinese: '地下室',
    category: 'home',
    difficulty: 'hard',
    phonetic: '/ˈbeɪsmənt/',
    exampleSentence: 'I go to the basement.',
    imageUrl: '/images/words/home/word_277.jpg'
  },
  {
    wordId: 'word_278',
    word: 'attic',
    chinese: '阁楼',
    category: 'home',
    difficulty: 'hard',
    phonetic: '/ˈætək/',
    exampleSentence: 'I go to the attic.',
    imageUrl: '/images/words/home/word_278.jpg'
  },
  {
    wordId: 'word_279',
    word: 'balcony',
    chinese: '阳台',
    category: 'home',
    difficulty: 'hard',
    phonetic: '/ˈbælkəni/',
    exampleSentence: 'I stand on the balcony.',
    imageUrl: '/images/words/home/word_279.jpg'
  },
  {
    wordId: 'word_280',
    word: 'chimney',
    chinese: '烟囱',
    category: 'home',
    difficulty: 'hard',
    phonetic: '/ˈtʃɪmni/',
    exampleSentence: 'The chimney has smoke.',
    imageUrl: '/images/words/home/word_280.jpg'
  },

  // More hard words - Clothes
  {
    wordId: 'word_281',
    word: 'underwear',
    chinese: '内衣',
    category: 'clothes',
    difficulty: 'hard',
    phonetic: '/ˈʌndərwɛr/',
    exampleSentence: 'I wear underwear.',
    imageUrl: '/images/words/clothes/word_281.jpg'
  },
  {
    wordId: 'word_282',
    word: 'uniform',
    chinese: '校服',
    category: 'clothes',
    difficulty: 'hard',
    phonetic: '/ˈjuːnəfɔrm/',
    exampleSentence: 'I wear a uniform.',
    imageUrl: '/images/words/clothes/word_282.jpg'
  },
  {
    wordId: 'word_283',
    word: 'sunglasses',
    chinese: '太阳镜',
    category: 'clothes',
    difficulty: 'hard',
    phonetic: '/ˈsʌnɡlæsəz/',
    exampleSentence: 'I wear sunglasses.',
    imageUrl: '/images/words/clothes/word_283.jpg'
  },
  {
    wordId: 'word_284',
    word: 'backpack',
    chinese: '背包',
    category: 'clothes',
    difficulty: 'hard',
    phonetic: '/ˈbækpæk/',
    exampleSentence: 'I carry a backpack.',
    imageUrl: '/images/words/clothes/word_284.jpg'
  },
  {
    wordId: 'word_285',
    word: 'umbrella',
    chinese: '雨伞',
    category: 'clothes',
    difficulty: 'hard',
    phonetic: '/əmˈbrɛlə/',
    exampleSentence: 'I use an umbrella.',
    imageUrl: '/images/words/clothes/word_285.jpg'
  },
];

/**
 * Get all words / 获取所有单词
 */
export function getAllWords(): Word[] {
  return [...EASY_WORDS, ...MEDIUM_WORDS, ...HARD_WORDS];
}

/**
 * Get words by category / 按分类获取单词
 */
export function getWordsByCategory(category: WordCategory): Word[] {
  return getAllWords().filter(word => word.category === category);
}

/**
 * Get words by difficulty / 按难度获取单词
 */
export function getWordsByDifficulty(difficulty: WordDifficulty): Word[] {
  return getAllWords().filter(word => word.difficulty === difficulty);
}

/**
 * Get random words / 获取随机单词
 */
export function getRandomWords(count: number): Word[] {
  const allWords = getAllWords();
  const shuffled = [...allWords].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
