import { Badge, UserRewardStats } from '@/types/rewards';

/**
 * 徽章定义库
 * Badge Library
 */
export const BADGES: Badge[] = [
  // ========== 学习里程碑 ==========
  {
    id: 'badge_first_word',
    name: 'First Word',
    description: 'Learn your first word!',
    icon: '🌟',
    color: 'yellow',
    requirement: { type: 'words', count: 1 },
  },
  {
    id: 'badge_word_master_10',
    name: 'Word Explorer',
    description: 'Learn 10 different words!',
    icon: '📚',
    color: 'blue',
    requirement: { type: 'words', count: 10 },
  },
  {
    id: 'badge_word_master_50',
    name: 'Vocabulary Star',
    description: 'Learn 50 different words!',
    icon: '⭐',
    color: 'purple',
    requirement: { type: 'words', count: 50 },
  },
  {
    id: 'badge_word_master_100',
    name: 'Word Master',
    description: 'Learn 100 different words!',
    icon: '🏆',
    color: 'gold',
    requirement: { type: 'words', count: 100 },
  },

  // ========== 对话里程碑 ==========
  {
    id: 'badge_conversation_starter',
    name: 'Conversation Starter',
    description: 'Have your first conversation!',
    icon: '💬',
    color: 'green',
    requirement: { type: 'conversations', count: 1 },
  },
  {
    id: 'badge_social_butterfly',
    name: 'Social Butterfly',
    description: 'Have 10 conversations!',
    icon: '🦋',
    color: 'pink',
    requirement: { type: 'conversations', count: 10 },
  },
  {
    id: 'badge_chat_champion',
    name: 'Chat Champion',
    description: 'Have 50 conversations!',
    icon: '🎯',
    color: 'red',
    requirement: { type: 'conversations', count: 50 },
  },

  // ========== 连续学习 ==========
  {
    id: 'badge_streak_3',
    name: 'Consistent Learner',
    description: 'Learn for 3 days in a row!',
    icon: '🔥',
    color: 'orange',
    requirement: { type: 'streak', count: 3 },
  },
  {
    id: 'badge_streak_7',
    name: 'Weekly Warrior',
    description: 'Learn for 7 days in a row!',
    icon: '⚡',
    color: 'blue',
    requirement: { type: 'streak', count: 7 },
  },
  {
    id: 'badge_streak_30',
    name: 'Monthly Champion',
    description: 'Learn for 30 days in a row!',
    icon: '👑',
    color: 'purple',
    requirement: { type: 'streak', count: 30 },
  },

  // ========== 星星里程碑 ==========
  {
    id: 'badge_star_10',
    name: 'Rising Star',
    description: 'Earn 10 stars!',
    icon: '✨',
    color: 'yellow',
    requirement: { type: 'stars', count: 10 },
  },
  {
    id: 'badge_star_50',
    name: 'Super Star',
    description: 'Earn 50 stars!',
    icon: '💫',
    color: 'blue',
    requirement: { type: 'stars', count: 50 },
  },
  {
    id: 'badge_star_100',
    name: 'Mega Star',
    description: 'Earn 100 stars!',
    icon: '🌟',
    color: 'purple',
    requirement: { type: 'stars', count: 100 },
  },
  {
    id: 'badge_star_500',
    name: 'Star Legend',
    description: 'Earn 500 stars!',
    icon: '🏅',
    color: 'gold',
    requirement: { type: 'stars', count: 500 },
  },

  // ========== 特殊徽章 ==========
  {
    id: 'badge_early_bird',
    name: 'Early Bird',
    description: 'Learn before 8 AM!',
    icon: '🌅',
    color: 'orange',
    requirement: { type: 'stars', count: 5 },
  },
  {
    id: 'badge_night_owl',
    name: 'Night Owl',
    description: 'Learn after 8 PM!',
    icon: '🦉',
    color: 'indigo',
    requirement: { type: 'stars', count: 5 },
  },
  {
    id: 'badge_animal_friend',
    name: 'Animal Friend',
    description: 'Learn 10 animal names!',
    icon: '🐾',
    color: 'brown',
    requirement: { type: 'words', count: 10 },
  },
  {
    id: 'badge_color_artist',
    name: 'Color Artist',
    description: 'Learn 10 color words!',
    icon: '🎨',
    color: 'rainbow',
    requirement: { type: 'words', count: 10 },
  },
  {
    id: 'badge_number_wizard',
    name: 'Number Wizard',
    description: 'Learn to count to 10!',
    icon: '🔢',
    color: 'green',
    requirement: { type: 'words', count: 10 },
  },
];

/**
 * 获取徽章进度
 * Get badge progress
 */
export function getBadgeProgress(stats: UserRewardStats): Array<{
  badge: Badge;
  progress: number;
  unlocked: boolean;
}> {
  return BADGES.map((badge) => {
    const { type, count } = badge.requirement;
    let current = 0;

    switch (type) {
      case 'stars':
        current = stats.totalStars;
        break;
      case 'words':
        current = stats.totalWords;
        break;
      case 'conversations':
        current = stats.totalConversations;
        break;
      case 'streak':
        current = stats.currentStreak;
        break;
    }

    return {
      badge,
      progress: Math.min(current / count, 1),
      unlocked: current >= count && stats.badges.some((b) => b.id === badge.id),
    };
  });
}

/**
 * 检查是否应该解锁新徽章
 * Check if any new badges should be unlocked
 */
export function checkNewBadges(stats: UserRewardStats): Badge[] {
  const newBadges: Badge[] = [];
  const unlockedBadgeIds = stats.badges.map((b) => b.id);

  for (const badge of BADGES) {
    // 如果已经解锁，跳过
    if (unlockedBadgeIds.includes(badge.id)) {
      continue;
    }

    // 检查是否满足要求
    const { type, count } = badge.requirement;
    let current = 0;

    switch (type) {
      case 'stars':
        current = stats.totalStars;
        break;
      case 'words':
        current = stats.totalWords;
        break;
      case 'conversations':
        current = stats.totalConversations;
        break;
      case 'streak':
        current = stats.currentStreak;
        break;
    }

    if (current >= count) {
      newBadges.push(badge);
    }
  }

  return newBadges;
}
