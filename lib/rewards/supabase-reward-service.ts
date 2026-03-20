import { Badge, Reward, UserRewardStats } from '@/types/rewards';
import { checkNewBadges } from './badges';
import { ACHIEVEMENT_STARS } from '@/lib/rules/achievement-definitions';
import {
  getChildById,
  getRewardsByChildId,
  getStarRewardsByChildId,
  getTodayStarsByChildId,
  getBadgesByChildId,
  getWordCountByChildId,
  getConversationCountByChildId,
  getTodayLearningStats,
  upsertLearningStats,
  createReward,
  unlockBadge,
  addLearningWord,
  createConversation,
  addConversationMessage,
} from '@/lib/supabase/queries';

/**
 * Supabase Reward Service
 * 基于Supabase的奖励服务
 * Replaces in-memory storage with persistent database
 * 用持久化数据库替换内存存储
 */

/**
 * Get user reward statistics from database
 * 从数据库获取用户奖励统计
 */
export async function getUserStats(childId: string): Promise<UserRewardStats> {
  const child = await getChildById(childId);

  if (!child) {
    // Return empty stats if child doesn't exist
    return {
      totalStars: 0,
      todayStars: 0,
      currentStreak: 0,
      totalWords: 0,
      totalConversations: 0,
      badges: [],
      lastActiveDate: undefined,
    };
  }

  const [totalStars, todayStars, badges, totalWords, totalConversations, todayStats] =
    await Promise.all([
      getStarRewardsByChildId(childId),
      getTodayStarsByChildId(childId),
      getBadgesByChildId(childId),
      getWordCountByChildId(childId),
      getConversationCountByChildId(childId),
      getTodayLearningStats(childId),
    ]);

  // Convert database badges to Badge interface
  const badgeList: Badge[] = badges.map((ub) => ({
    id: ub.badge_id,
    name: ub.badge_id, // TODO: Map badge_id to actual badge name
    description: '',
    icon: '',
    color: '',
    requirement: { type: 'stars', count: 0 },
    unlockedAt: new Date(ub.unlocked_at),
  }));

  return {
    totalStars,
    todayStars,
    currentStreak: todayStats?.current_streak || 0,
    totalWords,
    totalConversations,
    badges: badgeList,
    lastActiveDate: child.updated_at ? new Date(child.updated_at) : undefined,
  };
}

/**
 * Record a learning word
 * 记录学习单词
 */
export async function recordWordLearned(
  childId: string,
  word: string,
  category: string
): Promise<void> {
  // Check if word already exists
  // TODO: Add check for existing word

  // Add the learning word
  await addLearningWord({
    child_id: childId,
    word,
    category,
    learned_at: new Date().toISOString(),
  });

  // Determine achievement type
  const stats = await getUserStats(childId);
  const achievementType = stats.totalWords === 0 ? 'first_word' : 'new_word';

  // Award stars
  await awardStars(childId, achievementType as any, { word, category });

  // Update learning stats
  await updateLearningStatsForWord(childId);
}

/**
 * Record a completed conversation
 * 记录完成对话
 */
export async function recordConversationCompleted(
  childId: string,
  messageCount: number,
  messages: Array<{ role: string; content: string }>
): Promise<{ stars: number; newBadges: Badge[] }> {
  // Create conversation record
  const conversation = await createConversation({
    child_id: childId,
    started_at: new Date().toISOString(),
    message_count: messageCount,
  });

  if (conversation) {
    // Add all messages
    for (const msg of messages) {
      await addConversationMessage({
        conversation_id: conversation.id,
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
        is_ai: msg.role === 'assistant',
      });
    }

    // Update conversation end time
    // TODO: Add updateConversation function
  }

  // Determine achievement type
  const achievementType: any = messageCount >= 5 ? 'long_conversation' : 'conversation';

  // Award stars and return result
  const result = await awardStars(childId, achievementType);

  // Update learning stats
  await updateLearningStatsForConversation(childId);

  return result;
}

/**
 * Award stars to a child
 * 给儿童授予星星
 */
export async function awardStars(
  childId: string,
  achievementType: string,
  metadata?: {
    word?: string;
    category?: string;
  }
): Promise<{ stars: number; newBadges: Badge[] }> {
  const stars = ACHIEVEMENT_STARS[achievementType as keyof typeof ACHIEVEMENT_STARS] || 1;

  // Create reward record
  await createReward({
    child_id: childId,
    type: 'star',
    reason: achievementType,
    count: stars,
    metadata: metadata as any,
  });

  // Check for new badges
  const stats = await getUserStats(childId);
  const newBadgeDefinitions = checkNewBadges(stats);

  // Unlock new badges
  const newBadges: Badge[] = [];
  for (const badge of newBadgeDefinitions) {
    const existing = await getUserBadge(childId, badge.id);
    if (!existing) {
      await unlockBadge(childId, badge.id);
      newBadges.push({
        ...badge,
        unlockedAt: new Date(),
      });
    }
  }

  return { stars, newBadges };
}

/**
 * Get reward history for a child
 * 获取儿童的奖励历史
 */
export async function getRewardHistory(childId: string): Promise<Reward[]> {
  const rewards = await getRewardsByChildId(childId);

  return rewards.map((r) => ({
    id: r.id,
    type: r.type as 'star' | 'badge',
    timestamp: new Date(r.created_at),
    reason: r.reason,
    metadata: r.metadata as
      | {
          word?: string;
          category?: string;
          badgeId?: string;
        }
      | undefined,
  }));
}

/**
 * Get a specific badge for a child
 */
export async function getUserBadge(childId: string, badgeId: string): Promise<any> {
  const { getBadgesByChildId } = await import('@/lib/supabase/queries');
  const badges = await getBadgesByChildId(childId);
  return badges.find((b) => b.badge_id === badgeId);
}

/**
 * Update learning stats for a learned word
 * 更新学习单词后的统计
 */
async function updateLearningStatsForWord(childId: string): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  const stats = await getTodayLearningStats(childId);

  if (stats) {
    // Update existing stats
    await upsertLearningStats({
      child_id: childId,
      date: today,
      words_learned: stats.words_learned + 1,
      conversations_completed: stats.conversations_completed,
      stars_earned: stats.stars_earned,
      time_spent_minutes: stats.time_spent_minutes,
      current_streak: await calculateCurrentStreak(childId),
    });
  } else {
    // Create new stats for today
    await upsertLearningStats({
      child_id: childId,
      date: today,
      words_learned: 1,
      conversations_completed: 0,
      stars_earned: 0,
      time_spent_minutes: 0,
      current_streak: 1,
    });
  }
}

/**
 * Update learning stats for a completed conversation
 * 更新完成对话后的统计
 */
async function updateLearningStatsForConversation(childId: string): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  const stats = await getTodayLearningStats(childId);

  if (stats) {
    // Update existing stats
    await upsertLearningStats({
      child_id: childId,
      date: today,
      words_learned: stats.words_learned,
      conversations_completed: stats.conversations_completed + 1,
      stars_earned: stats.stars_earned,
      time_spent_minutes: stats.time_spent_minutes,
      current_streak: await calculateCurrentStreak(childId),
    });
  } else {
    // Create new stats for today
    await upsertLearningStats({
      child_id: childId,
      date: today,
      words_learned: 0,
      conversations_completed: 1,
      stars_earned: 0,
      time_spent_minutes: 0,
      current_streak: 1,
    });
  }
}

/**
 * Calculate current learning streak
 * 计算当前学习连续天数
 */
async function calculateCurrentStreak(childId: string): Promise<number> {
  const stats = await getLearningStatsByChildId(childId);

  if (stats.length === 0) {
    return 0;
  }

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if there's activity today
  const todayStats = stats.find((s) => s.date === today.toISOString().split('T')[0]);

  if (!todayStats) {
    // No activity today, check if there was activity yesterday
    today.setDate(today.getDate() - 1);
    const yesterdayStats = stats.find((s) => s.date === today.toISOString().split('T')[0]);

    if (!yesterdayStats) {
      return 0;
    }
  }

  // Count consecutive days
  for (let i = 0; i < stats.length; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];

    const dayStats = stats.find((s) => s.date === dateStr);

    if (dayStats && (dayStats.words_learned > 0 || dayStats.conversations_completed > 0)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Get learning stats by child ID
 */
async function getLearningStatsByChildId(childId: string): Promise<any[]> {
  const { getLearningStatsByChildId: getStats } = await import('@/lib/supabase/queries');
  return getStats(childId);
}
