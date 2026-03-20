import {
  DailyStats,
  ProgressSummary,
  WeeklyReport,
  MonthlyReport,
  ReviewReminder,
} from '@/types/progress';
import {
  getLearningStatsByChildId,
  getTodayLearningStats,
  getWordCountByChildId,
  getConversationCountByChildId,
  getStarRewardsByChildId,
  getLearningWordsByChildId,
} from '@/lib/supabase/queries';

/**
 * Progress Tracking Service
 * 学习进度追踪服务
 */

/**
 * Get progress summary for a child
 * 获取儿童的学习进度摘要
 */
export async function getProgressSummary(childId: string): Promise<ProgressSummary> {
  const [stats, todayStats] = await Promise.all([
    getLearningStatsByChildId(childId),
    getTodayLearningStats(childId),
  ]);

  const totalWords = await getWordCountByChildId(childId);
  const totalConversations = await getConversationCountByChildId(childId);
  const totalStars = await getStarRewardsByChildId(childId);

  // Calculate current streak
  const currentStreak = todayStats?.current_streak || 0;

  // Calculate longest streak
  const longestStreak = Math.max(
    ...stats.map((s) => s.current_streak),
    currentStreak
  );

  // Calculate total active days
  const totalDaysActive = stats.filter(
    (s) => s.words_learned > 0 || s.conversations_completed > 0
  ).length;

  // Calculate average daily time
  const totalTimeMinutes = stats.reduce((sum, s) => sum + s.time_spent_minutes, 0);
  const averageDailyMinutes = totalDaysActive > 0 ? Math.round(totalTimeMinutes / totalDaysActive) : 0;

  return {
    totalWords,
    totalConversations,
    totalStars,
    currentStreak,
    longestStreak,
    totalDaysActive,
    averageDailyMinutes,
    todayStats: todayStats
      ? {
          date: todayStats.date,
          wordsLearned: todayStats.words_learned,
          conversationsCompleted: todayStats.conversations_completed,
          starsEarned: todayStats.stars_earned,
          timeSpentMinutes: todayStats.time_spent_minutes,
          currentStreak: todayStats.current_streak,
        }
      : undefined,
  };
}

/**
 * Get weekly progress report
 * 获取周进度报告
 */
export async function getWeeklyReport(childId: string): Promise<WeeklyReport> {
  const stats = await getLearningStatsByChildId(childId);
  const learningWords = await getLearningWordsByChildId(childId);

  // Get last 7 days of stats
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);

  const weekStats = stats
    .filter((s) => {
      const statDate = new Date(s.date);
      return statDate >= sevenDaysAgo && statDate <= today;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const dailyStats: DailyStats[] = weekStats.map((s) => ({
    date: s.date,
    wordsLearned: s.words_learned,
    conversationsCompleted: s.conversations_completed,
    starsEarned: s.stars_earned,
    timeSpentMinutes: s.time_spent_minutes,
    currentStreak: s.current_streak,
  }));

  // Calculate totals
  const totalWords = weekStats.reduce((sum, s) => sum + s.words_learned, 0);
  const totalConversations = weekStats.reduce((sum, s) => sum + s.conversations_completed, 0);
  const totalStars = weekStats.reduce((sum, s) => sum + s.stars_earned, 0);
  const totalTimeMinutes = weekStats.reduce((sum, s) => sum + s.time_spent_minutes, 0);

  // Calculate top categories
  const weekWords = learningWords.filter((lw) => {
    const learnedDate = new Date(lw.learned_at);
    return learnedDate >= sevenDaysAgo && learnedDate <= today;
  });

  const categoryCount: Record<string, number> = {};
  weekWords.forEach((w) => {
    if (w.category) {
      categoryCount[w.category] = (categoryCount[w.category] || 0) + 1;
    }
  });

  const topCategories = Object.entries(categoryCount)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Calculate words to review (words learned > 3 days ago with mastery < 3)
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 3);

  const wordsToReview = learningWords.filter(
    (w) => new Date(w.learned_at) <= threeDaysAgo && w.mastery_level < 3
  ).length;

  return {
    weekStart: sevenDaysAgo.toISOString().split('T')[0],
    weekEnd: today.toISOString().split('T')[0],
    dailyStats,
    totalWords,
    totalConversations,
    totalStars,
    totalTimeMinutes,
    topCategories,
    wordsToReview,
  };
}

/**
 * Get monthly progress report
 * 获取月度进度报告
 */
export async function getMonthlyReport(childId: string, year: number, month: number): Promise<MonthlyReport> {
  const stats = await getLearningStatsByChildId(childId);
  const learningWords = await getLearningWordsByChildId(childId);

  // Filter stats for the specified month
  const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
  const monthStats = stats.filter((s) => s.date.startsWith(monthStr));

  const totalWords = monthStats.reduce((sum, s) => sum + s.words_learned, 0);
  const totalConversations = monthStats.reduce((sum, s) => sum + s.conversations_completed, 0);
  const totalStars = monthStats.reduce((sum, s) => sum + s.stars_earned, 0);
  const totalTimeMinutes = monthStats.reduce((sum, s) => sum + s.time_spent_minutes, 0);

  const activeDays = monthStats.filter(
    (s) => s.words_learned > 0 || s.conversations_completed > 0
  ).length;

  const averageDailyMinutes = activeDays > 0 ? Math.round(totalTimeMinutes / activeDays) : 0;

  // Count badges unlocked this month
  // TODO: Add badges query with date filter
  const badgesUnlocked = 0;

  // Calculate top categories
  const monthWords = learningWords.filter((w) => w.learned_at.startsWith(monthStr));

  const categoryCount: Record<string, number> = {};
  monthWords.forEach((w) => {
    if (w.category) {
      categoryCount[w.category] = (categoryCount[w.category] || 0) + 1;
    }
  });

  const topCategories = Object.entries(categoryCount)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    month: monthStr,
    totalWords,
    totalConversations,
    totalStars,
    totalTimeMinutes,
    activeDays,
    averageDailyMinutes,
    badgesUnlocked,
    topCategories,
  };
}

/**
 * Get review reminders for words that need review
 * 获取需要复习的单词提醒
 */
export async function getReviewReminders(childId: string): Promise<ReviewReminder[]> {
  const learningWords = await getLearningWordsByChildId(childId);
  const reminders: ReviewReminder[] = [];
  const now = new Date();

  learningWords.forEach((word) => {
    const learnedAt = new Date(word.learned_at);
    const daysSinceLearned = Math.floor((now.getTime() - learnedAt.getTime()) / (1000 * 60 * 60 * 24));
    const masteryLevel = word.mastery_level;

    // Calculate next review date based on spaced repetition
    let nextReviewDate: Date;
    let priority: 'high' | 'medium' | 'low';
    let reason: string;

    if (masteryLevel < 2) {
      // Low mastery - review soon
      nextReviewDate = new Date(learnedAt);
      nextReviewDate.setDate(nextReviewDate.getDate() + 1);
      priority = 'high';
      reason = 'Needs more practice';
    } else if (masteryLevel < 4) {
      // Medium mastery - review in a few days
      nextReviewDate = new Date(learnedAt);
      nextReviewDate.setDate(nextReviewDate.getDate() + 3);
      priority = 'medium';
      reason = 'Spaced repetition';
    } else {
      // High mastery - review in a week
      nextReviewDate = new Date(learnedAt);
      nextReviewDate.setDate(nextReviewDate.getDate() + 7);
      priority = 'low';
      reason = 'Keep it fresh';
    }

    // Check if review is due or overdue
    if (nextReviewDate <= now) {
      reminders.push({
        wordId: word.id,
        word: word.word,
        category: word.category || 'general',
        dueDate: nextReviewDate,
        priority,
        reason,
      });
    }
  });

  // Sort by priority and due date
  return reminders.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return a.dueDate.getTime() - b.dueDate.getTime();
  });
}

/**
 * Get today's learning stats
 * 获取今日学习统计
 */
export async function getTodayStats(childId: string): Promise<DailyStats | null> {
  const stats = await getTodayLearningStats(childId);

  if (!stats) {
    return null;
  }

  return {
    date: stats.date,
    wordsLearned: stats.words_learned,
    conversationsCompleted: stats.conversations_completed,
    starsEarned: stats.stars_earned,
    timeSpentMinutes: stats.time_spent_minutes,
    currentStreak: stats.current_streak,
  };
}

/**
 * Record learning time
 * 记录学习时间
 */
export async function recordLearningTime(childId: string, minutes: number): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  const stats = await getTodayLearningStats(childId);

  const { upsertLearningStats } = await import('@/lib/supabase/queries');

  if (stats) {
    await upsertLearningStats({
      child_id: childId,
      date: today,
      words_learned: stats.words_learned,
      conversations_completed: stats.conversations_completed,
      stars_earned: stats.stars_earned,
      time_spent_minutes: stats.time_spent_minutes + minutes,
      current_streak: stats.current_streak,
    });
  } else {
    await upsertLearningStats({
      child_id: childId,
      date: today,
      words_learned: 0,
      conversations_completed: 0,
      stars_earned: 0,
      time_spent_minutes: minutes,
      current_streak: 1,
    });
  }
}
