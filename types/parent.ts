// Parent Dashboard Types
// 家长端类型定义

// Parent Settings
export interface ParentSettings {
  id: string;
  childId: string;
  dailyTimeLimit: number; // minutes
  allowedHours: number[]; // 0-23 (24-hour format)
  contentRestrictions: {
    allowGarden?: boolean;
    allowForest?: boolean;
    allowKitchen?: boolean;
    maxDifficulty?: 'easy' | 'medium' | 'hard' | 'all';
  };
  pinCode?: string;
  notificationsEnabled: boolean;
  weeklyReportDay: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  createdAt: Date;
  updatedAt: Date;
}

// Learning Statistics
export interface LearningStatistics {
  id: string;
  childId: string;
  statDate: Date;
  wordsLearned: number;
  conversationsCompleted: number;
  starsEarned: number;
  timeSpentMinutes: number;
  scenesVisited: string[];
  tasksCompleted: number;
  badgesEarned: string[];
}

// Activity Log
export interface ActivityLog {
  id: string;
  childId: string;
  activityType: 'login' | 'scene_visit' | 'task_complete' | 'badge_earn' | 'character_create' | 'logout';
  activityDetails: {
    scene?: string;
    taskType?: string;
    badgeId?: string;
    duration?: number;
    [key: string]: any;
  };
  timestamp: Date;
}

// Weekly Statistics Summary
export interface WeeklyStatistics {
  wordsLearned: number;
  conversationsCompleted: number;
  starsEarned: number;
  timeSpentMinutes: number;
  tasksCompleted: number;
  badgesEarned: number;
}

// Dashboard Data
export interface ParentDashboard {
  childInfo: {
    name: string;
    age: number;
    avatar?: string;
  };
  todayStats: {
    wordsLearned: number;
    conversationsCompleted: number;
    starsEarned: number;
    timeSpentMinutes: number;
  };
  weeklyStats: WeeklyStatistics;
  recentActivity: ActivityLog[];
  settings: ParentSettings;
}

// Time Usage Data
export interface TimeUsageData {
  date: Date;
  timeSpent: number;
  limit: number;
}

// Learning Progress Report
export interface LearningProgressReport {
  period: 'week' | 'month';
  startDate: Date;
  endDate: Date;
  statistics: WeeklyStatistics;
  topScenes: { name: string; visits: number }[];
  badgesEarned: string[];
  averageDailyTime: number;
  streakDays: number;
  improvements: {
    area: string;
    before: number;
    after: number;
  }[];
}

// Content Control Options
export interface ContentControlOptions {
  enabled: boolean;
  allowedScenes: {
    garden: boolean;
    forest: boolean;
    kitchen: boolean;
  };
  maxDifficulty: 'easy' | 'medium' | 'hard' | 'all';
  dailyTimeLimit: number;
  allowedTimeSlots: {
    start: number; // hour 0-23
    end: number; // hour 0-23
  }[];
}

// Default Parent Settings
export const DEFAULT_PARENT_SETTINGS: Omit<ParentSettings, 'id' | 'childId' | 'createdAt' | 'updatedAt'> = {
  dailyTimeLimit: 30,
  allowedHours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  contentRestrictions: {
    allowGarden: true,
    allowForest: true,
    allowKitchen: true,
    maxDifficulty: 'all'
  },
  notificationsEnabled: true,
  weeklyReportDay: 'sunday'
};

// Helper Functions
export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}m`;
  } else if (mins === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${mins}m`;
  }
}

export function calculateAverageTime(dailyData: { timeSpent: number }[]): number {
  if (dailyData.length === 0) return 0;
  const total = dailyData.reduce((sum, day) => sum + day.timeSpent, 0);
  return Math.round(total / dailyData.length);
}

export function getTopScenes(stats: LearningStatistics[]): { name: string; visits: number }[] {
  const sceneCounts: Record<string, number> = {};

  stats.forEach(stat => {
    stat.scenesVisited.forEach(scene => {
      sceneCounts[scene] = (sceneCounts[scene] || 0) + 1;
    });
  });

  return Object.entries(sceneCounts)
    .map(([name, visits]) => ({ name, visits }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 5);
}

export function isTimeWithinAllowedHours(currentHour: number, allowedHours: number[]): boolean {
  return allowedHours.includes(currentHour);
}

export function getTimeSlotStatus(
  currentHour: number,
  allowedHours: number[]
): 'allowed' | 'outside' | 'limit-reached' {
  if (!isTimeWithinAllowedHours(currentHour, allowedHours)) {
    return 'outside';
  }
  return 'allowed';
}

export function generateWeeklyReport(
  stats: LearningStatistics[],
  streakDays: number
): LearningProgressReport {
  const totalStats = stats.reduce(
    (acc, stat) => ({
      wordsLearned: acc.wordsLearned + stat.wordsLearned,
      conversationsCompleted: acc.conversationsCompleted + stat.conversationsCompleted,
      starsEarned: acc.starsEarned + stat.starsEarned,
      timeSpentMinutes: acc.timeSpentMinutes + stat.timeSpentMinutes,
      tasksCompleted: acc.tasksCompleted + stat.tasksCompleted,
      badgesEarned: [...acc.badgesEarned, ...stat.badgesEarned]
    }),
    {
      wordsLearned: 0,
      conversationsCompleted: 0,
      starsEarned: 0,
      timeSpentMinutes: 0,
      tasksCompleted: 0,
      badgesEarned: [] as string[]
    }
  );

  const uniqueBadges = Array.from(new Set(totalStats.badgesEarned));
  const avgDailyTime = calculateAverageTime(stats.map(s => ({ timeSpent: s.timeSpentMinutes })));
  const topScenes = getTopScenes(stats);

  return {
    period: 'week',
    startDate: stats[0]?.statDate || new Date(),
    endDate: stats[stats.length - 1]?.statDate || new Date(),
    statistics: {
      wordsLearned: totalStats.wordsLearned,
      conversationsCompleted: totalStats.conversationsCompleted,
      starsEarned: totalStats.starsEarned,
      timeSpentMinutes: totalStats.timeSpentMinutes,
      tasksCompleted: totalStats.tasksCompleted,
      badgesEarned: uniqueBadges.length
    },
    topScenes,
    badgesEarned: uniqueBadges,
    averageDailyTime: avgDailyTime,
    streakDays,
    improvements: [] // Will be calculated based on historical data
  };
}

// Activity Type Labels
export const ACTIVITY_TYPE_LABELS: Record<string, { label: string; emoji: string }> = {
  login: { label: 'Logged In', emoji: '👋' },
  logout: { label: 'Logged Out', emoji: '👋' },
  scene_visit: { label: 'Visited Scene', emoji: '📍' },
  task_complete: { label: 'Completed Task', emoji: '✅' },
  badge_earn: { label: 'Earned Badge', emoji: '🏆' },
  character_create: { label: 'Created Character', emoji: '🎨' }
};

// Scene Names
export const SCENE_NAMES: Record<string, { name: string; emoji: string }> = {
  garden: { name: 'Magic Garden', emoji: '🌸' },
  forest: { name: 'Forest Adventure', emoji: '🌲' },
  kitchen: { name: 'Kitchen', emoji: '🧁' }
};

// Week Day Labels
export const WEEK_DAY_LABELS: Record<string, string> = {
  sunday: 'Sunday',
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday'
};
