import { Badge, Reward, UserRewardStats, AchievementType } from '@/types/rewards';
import { checkNewBadges } from './badges';
import { ACHIEVEMENT_STARS } from '@/lib/rules/achievement-definitions';

/**
 * 奖励服务
 * Reward Service
 * Handles star awards, badge unlocks, and progress tracking
 */

// 内存存储 (生产环境应使用数据库)
const userStatsMap = new Map<string, UserRewardStats>();
const rewardHistoryMap = new Map<string, Reward[]>();

/**
 * 获取用户奖励统计
 * Get user reward statistics
 */
export function getUserStats(childId: string): UserRewardStats {
  if (!userStatsMap.has(childId)) {
    // 初始化新用户统计
    userStatsMap.set(childId, {
      totalStars: 0,
      todayStars: 0,
      currentStreak: 0,
      totalWords: 0,
      totalConversations: 0,
      badges: [],
      lastActiveDate: undefined,
    });
  }
  return userStatsMap.get(childId)!;
}

/**
 * 更新用户统计
 * Update user statistics
 */
function updateUserStats(childId: string, updates: Partial<UserRewardStats>): void {
  const stats = getUserStats(childId);
  userStatsMap.set(childId, { ...stats, ...updates });
}

/**
 * 记录奖励历史
 * Record reward history
 */
function recordReward(childId: string, reward: Reward): void {
  const history = rewardHistoryMap.get(childId) || [];
  history.push(reward);
  rewardHistoryMap.set(childId, history);
}

/**
 * 获取奖励历史
 * Get reward history
 */
export function getRewardHistory(childId: string): Reward[] {
  return rewardHistoryMap.get(childId) || [];
}

/**
 * 检查并更新连续学习天数
 * Check and update learning streak
 */
function updateStreak(childId: string): void {
  const stats = getUserStats(childId);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastActive = stats.lastActiveDate ? new Date(stats.lastActiveDate) : null;
  if (lastActive) {
    lastActive.setHours(0, 0, 0, 0);
  }

  if (!lastActive) {
    // 第一次活跃
    updateUserStats(childId, { currentStreak: 1, lastActiveDate: today });
  } else {
    const diffDays = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // 今天已经活跃过，不更新
      return;
    } else if (diffDays === 1) {
      // 连续学习
      updateUserStats(childId, { currentStreak: stats.currentStreak + 1, lastActiveDate: today });
    } else {
      // 中断了，重新开始
      updateUserStats(childId, { currentStreak: 1, lastActiveDate: today });
    }
  }
}

/**
 * 检查是否是新的一天，重置今日星星
 * Check if it's a new day, reset today's stars
 */
function checkNewDay(childId: string): void {
  const stats = getUserStats(childId);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastActive = stats.lastActiveDate ? new Date(stats.lastActiveDate) : null;
  if (lastActive) {
    lastActive.setHours(0, 0, 0, 0);
  }

  if (lastActive && today.getTime() > lastActive.getTime()) {
    // 新的一天，重置今日星星
    updateUserStats(childId, { todayStars: 0 });
  }
}

/**
 * 授予星星奖励
 * Award star reward
 */
export function awardStars(
  childId: string,
  achievementType: AchievementType,
  metadata?: {
    word?: string;
    category?: string;
  }
): { stars: number; newBadges: Badge[] } {
  // 检查新的一天
  checkNewDay(childId);

  const stats = getUserStats(childId);
  const stars = ACHIEVEMENT_STARS[achievementType] || 1;

  // 更新星星数量
  const newTotalStars = stats.totalStars + stars;
  const newTodayStars = stats.todayStars + stars;
  updateUserStats(childId, {
    totalStars: newTotalStars,
    todayStars: newTodayStars,
  });

  // 记录奖励
  recordReward(childId, {
    id: `reward_${Date.now()}_${Math.random()}`,
    type: 'star',
    timestamp: new Date(),
    reason: achievementType,
    metadata,
  });

  // 检查新徽章
  const updatedStats = getUserStats(childId);
  const newBadges = checkNewBadges(updatedStats);

  // 解锁新徽章
  if (newBadges.length > 0) {
    const unlockedBadges = newBadges.map((badge) => ({
      ...badge,
      unlockedAt: new Date(),
    }));

    updateUserStats(childId, {
      badges: [...updatedStats.badges, ...unlockedBadges],
    });

    // 记录徽章奖励
    unlockedBadges.forEach((badge) => {
      recordReward(childId, {
        id: `reward_${Date.now()}_${Math.random()}`,
        type: 'badge',
        timestamp: new Date(),
        reason: badge.id,
        metadata: { badgeId: badge.id },
      });
    });
  }

  return { stars, newBadges };
}

/**
 * 记录学习单词
 * Record learning a word
 */
export function recordWordLearned(childId: string, word: string, category: string): void {
  const stats = getUserStats(childId);
  updateUserStats(childId, {
    totalWords: stats.totalWords + 1,
  });

  // 更新连续学习天数
  updateStreak(childId);

  // 判断是第一次学习还是复习
  const achievementType: AchievementType = stats.totalWords === 0 ? 'first_word' : 'new_word';

  // 授予星星
  awardStars(childId, achievementType, { word, category });
}

/**
 * 记录完成对话
 * Record completing a conversation
 */
export function recordConversationCompleted(
  childId: string,
  messageCount: number
): { stars: number; newBadges: Badge[] } {
  const stats = getUserStats(childId);
  updateUserStats(childId, {
    totalConversations: stats.totalConversations + 1,
  });

  // 更新连续学习天数
  updateStreak(childId);

  // 判断是否是长对话
  const achievementType: AchievementType =
    messageCount >= 5 ? 'long_conversation' : 'conversation';

  // 授予星星
  return awardStars(childId, achievementType);
}

/**
 * 重置用户数据（用于测试）
 * Reset user data (for testing)
 */
export function resetUserData(childId: string): void {
  userStatsMap.delete(childId);
  rewardHistoryMap.delete(childId);
}
