/**
 * Vocabulary and Sentence Learning Types
 * 词汇和短句学习类型定义
 */

// Word categories / 单词分类
export type WordCategory =
  | 'animals'      // 动物
  | 'food'          // 食物
  | 'colors'        // 颜色
  | 'numbers'       // 数字
  | 'family'        // 家庭
  | 'body'          // 身体部位
  | 'clothes'       // 衣服
  | 'toys'          // 玩具
  | 'nature'        // 自然
  | 'vehicles'      // 交通工具
  | 'school'        // 学校
  | 'home'          // 家
  | 'feelings'      // 情感
  | 'actions';      // 动作

// Word difficulty levels / 单词难度
export type WordDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Word interface / 单词接口
 */
export interface Word {
  wordId: string;           // Unique ID
  word: string;             // English word
  chinese: string;          // Chinese translation
  category: WordCategory;   // Category
  difficulty: WordDifficulty; // Difficulty level
  phonetic: string;         // Phonetic notation (音标)
  exampleSentence: string;  // Example sentence
  imageUrl: string;         // Unsplash image URL
  audioUrl?: string;        // Optional: custom audio URL (use TTS if not provided)
}

/**
 * Sentence categories / 短句分类
 */
export type SentenceCategory =
  | 'greetings'     // 问候语
  | 'introduction'   // 自我介绍
  | 'daily'          // 日常用语
  | 'questions'      // 提问
  | 'feelings'       // 表达情感
  | 'requests'       // 请求
  | 'manners'        // 礼貌用语
  | 'activities'     // 活动;

/**
 * Sentence interface / 短句接口
 */
export interface Sentence {
  sentenceId: string;       // Unique ID
  sentence: string;         // English sentence
  chinese: string;          // Chinese translation
  category: SentenceCategory; // Category
  difficulty: WordDifficulty; // Difficulty level
  audioUrl?: string;        // Optional: custom audio URL
}

/**
 * Learning progress / 学习进度
 */
export interface VocabularyProgress {
  wordId?: string;
  sentenceId?: string;
  attempts: number;         // Number of attempts
  correctCount: number;     // Number of correct pronunciations
  lastAttemptAt: Date;      // Last attempt timestamp
  mastered: boolean;        // Whether mastered (pronounced correctly 3 times in a row)
}

/**
 * Pronunciation assessment result / 发音评估结果
 */
export interface PronunciationResult {
  isCorrect: boolean;       // Whether pronunciation is correct
  confidence: number;       // Confidence score (0-1)
  feedback: string;         // Feedback message
  detectedText?: string;    // What was detected (for debugging)
}

/**
 * Word category labels / 单词分类标签
 */
export const WORD_CATEGORY_LABELS: Record<WordCategory, { emoji: string; name: string; chinese: string }> = {
  animals: { emoji: '🐾', name: 'Animals', chinese: '动物' },
  food: { emoji: '🍎', name: 'Food', chinese: '食物' },
  colors: { emoji: '🌈', name: 'Colors', chinese: '颜色' },
  numbers: { emoji: '🔢', name: 'Numbers', chinese: '数字' },
  family: { emoji: '👨‍👩‍👧‍👦', name: 'Family', chinese: '家庭' },
  body: { emoji: '👂', name: 'Body', chinese: '身体' },
  clothes: { emoji: '👕', name: 'Clothes', chinese: '衣服' },
  toys: { emoji: '🧸', name: 'Toys', chinese: '玩具' },
  nature: { emoji: '🌳', name: 'Nature', chinese: '自然' },
  vehicles: { emoji: '🚗', name: 'Vehicles', chinese: '交通工具' },
  school: { emoji: '📚', name: 'School', chinese: '学校' },
  home: { emoji: '🏠', name: 'Home', chinese: '家' },
  feelings: { emoji: '😊', name: 'Feelings', chinese: '情感' },
  actions: { emoji: '🏃', name: 'Actions', chinese: '动作' },
};

/**
 * Sentence category labels / 短句分类标签
 */
export const SENTENCE_CATEGORY_LABELS: Record<SentenceCategory, { emoji: string; name: string; chinese: string }> = {
  greetings: { emoji: '👋', name: 'Greetings', chinese: '问候语' },
  introduction: { emoji: '🙋', name: 'Introduction', chinese: '自我介绍' },
  daily: { emoji: '💬', name: 'Daily', chinese: '日常用语' },
  questions: { emoji: '❓', name: 'Questions', chinese: '提问' },
  feelings: { emoji: '😊', name: 'Feelings', chinese: '表达情感' },
  requests: { emoji: '🙏', name: 'Requests', chinese: '请求' },
  manners: { emoji: '🤝', name: 'Manners', chinese: '礼貌用语' },
  activities: { emoji: '🎮', name: 'Activities', chinese: '活动' },
};

/**
 * Difficulty color mapping / 难度颜色映射
 */
export function getDifficultyColor(difficulty: WordDifficulty): string {
  switch (difficulty) {
    case 'easy':
      return '#10B981'; // green
    case 'medium':
      return '#F59E0B'; // yellow
    case 'hard':
      return '#EF4444'; // red
  }
}

/**
 * Get difficulty label / 获取难度标签
 */
export function getDifficultyLabel(difficulty: WordDifficulty): string {
  switch (difficulty) {
    case 'easy':
      return '简单';
    case 'medium':
      return '中等';
    case 'hard':
      return '困难';
  }
}
