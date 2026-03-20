/**
 * Progress Tracking Types
 * 学习进度追踪类型定义
 */

// 每日学习统计
export interface DailyStats {
  date: string; // YYYY-MM-DD
  wordsLearned: number;
  conversationsCompleted: number;
  starsEarned: number;
  timeSpentMinutes: number;
  currentStreak: number;
}

// 单词学习进度
export interface WordProgress {
  word: string;
  category: string;
  learnedAt: Date;
  reviewCount: number;
  lastReviewedAt?: Date;
  masteryLevel: number; // 0-5
  nextReviewAt?: Date;
}

// 学习进度摘要
export interface ProgressSummary {
  totalWords: number;
  totalConversations: number;
  totalStars: number;
  currentStreak: number;
  longestStreak: number;
  totalDaysActive: number;
  averageDailyMinutes: number;
  todayStats?: DailyStats;
}

// 周进度报告
export interface WeeklyReport {
  weekStart: string;
  weekEnd: string;
  dailyStats: DailyStats[];
  totalWords: number;
  totalConversations: number;
  totalStars: number;
  totalTimeMinutes: number;
  topCategories: Array<{
    category: string;
    count: number;
  }>;
  wordsToReview: number;
}

// 月度进度报告
export interface MonthlyReport {
  month: string; // YYYY-MM
  totalWords: number;
  totalConversations: number;
  totalStars: number;
  totalTimeMinutes: number;
  activeDays: number;
  averageDailyMinutes: number;
  badgesUnlocked: number;
  topCategories: Array<{
    category: string;
    count: number;
  }>;
}

// 学习成就
export interface LearningAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  progress: number; // 0-100
}

// 复习提醒
export interface ReviewReminder {
  wordId: string;
  word: string;
  category: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  reason: string; // "First review", "Spaced repetition", etc.
}
