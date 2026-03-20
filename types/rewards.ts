// 奖励系统类型定义

// 徽章类型
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirement: {
    type: 'stars' | 'words' | 'conversations' | 'streak';
    count: number;
  };
  unlockedAt?: Date;
}

// 奖励类别
export const BadgeCategories = {
  FIRST_WORD: 'first_word',
  WORD_MASTER: 'word_master',
  CONVERSATION_STARTER: 'conversation_starter',
  SOCIAL_BUTTERFLY: 'social_butterfly',
  WEEKLY_WARRIOR: 'weekly_warrior',
  MONTHLY_CHAMPION: 'monthly_champion',
  EARLY_BIRD: 'early_bird',
  NIGHT_OWL: 'night_owl',
  VOCABULARY_EXPLORER: 'vocabulary_explorer',
  ANIMAL_FRIEND: 'animal_friend',
  COLOR_ARTIST: 'color_artist',
  NUMBER_WIZARD: 'number_wizard',
  PERFECT_ATTENDANCE: 'perfect_attendance',
} as const;

// 奖励记录
export interface Reward {
  id: string;
  type: 'star' | 'badge';
  timestamp: Date;
  reason: string;
  metadata?: {
    word?: string;
    category?: string;
    badgeId?: string;
  };
}

// 用户奖励统计
export interface UserRewardStats {
  totalStars: number;
  todayStars: number;
  currentStreak: number; // 连续学习天数
  totalWords: number;
  totalConversations: number;
  badges: Badge[];
  lastActiveDate?: Date;
}

// 获得星星的成就类型
export type AchievementType =
  | 'first_word'          // 第一个单词
  | 'new_word'            // 学习新单词
  | 'repeat_word'         // 复习单词
  | 'perfect_pronunciation' // 完美发音（TODO）
  | 'conversation'        // 完成对话
  | 'long_conversation'   // 长对话（5轮以上）
  | 'daily_goal'         // 每日目标（10颗星）
  | 'streak_3'            // 连续3天
  | 'streak_7'            // 连续7天
  | 'milestone_100'       // 100颗星
  | 'milestone_500'       // 500颗星
  | 'milestone_1000';     // 1000颗星
