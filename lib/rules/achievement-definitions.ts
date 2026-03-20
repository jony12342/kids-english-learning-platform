import { AchievementType } from '@/types/rewards';

/**
 * 成就定义
 * Achievement Definitions
 * Defines star rewards for different achievement types
 */

export const ACHIEVEMENT_STARS: Record<AchievementType, number> = {
  // 学习单词
  first_word: 5, // 第一个单词 - 额外奖励
  new_word: 1, // 学习新单词
  repeat_word: 1, // 复习单词

  // 发音（TODO）
  perfect_pronunciation: 2, // 完美发音

  // 对话
  conversation: 2, // 完成对话
  long_conversation: 5, // 长对话（5轮以上）

  // 每日目标
  daily_goal: 10, // 每日目标（10颗星）

  // 连续学习
  streak_3: 10, // 连续3天
  streak_7: 20, // 连续7天

  // 里程碑
  milestone_100: 30, // 100颗星
  milestone_500: 50, // 500颗星
  milestone_1000: 100, // 1000颗星
};

/**
 * 获取成就的星星奖励
 * Get star reward for achievement
 */
export function getAchievementStars(achievementType: AchievementType): number {
  return ACHIEVEMENT_STARS[achievementType] || 1;
}

/**
 * 获取成就描述
 * Get achievement description
 */
export function getAchievementDescription(achievementType: AchievementType): string {
  const descriptions: Record<AchievementType, string> = {
    first_word: 'Learned your first word! 🌟',
    new_word: 'Learned a new word! 📚',
    repeat_word: 'Reviewed a word! 🔄',
    perfect_pronunciation: 'Perfect pronunciation! 🎯',
    conversation: 'Had a conversation! 💬',
    long_conversation: 'Had a long conversation! 🎉',
    daily_goal: 'Reached daily goal! ⭐',
    streak_3: '3-day streak! 🔥',
    streak_7: '7-day streak! ⚡',
    milestone_100: 'Earned 100 stars! 🏆',
    milestone_500: 'Earned 500 stars! 👑',
    milestone_1000: 'Earned 1000 stars! 🏅',
  };

  return descriptions[achievementType] || 'Achievement unlocked!';
}
