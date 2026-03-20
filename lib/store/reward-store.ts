import { create } from 'zustand';
import { Badge, Reward, UserRewardStats } from '@/types/rewards';
import {
  getUserStats as getSupabaseUserStats,
  awardStars as supabaseAwardStars,
  recordWordLearned as supabaseRecordWordLearned,
  recordConversationCompleted as supabaseRecordConversationCompleted,
  getRewardHistory as getSupabaseRewardHistory,
} from '@/lib/rewards/supabase-reward-service';
import { getBadgeProgress } from '@/lib/rewards/badges';

interface RewardState {
  // 用户统计
  stats: UserRewardStats;

  // 徽章进度
  badgeProgress: Array<{
    badge: Badge;
    progress: number;
    unlocked: boolean;
  }>;

  // 奖励历史
  rewardHistory: Reward[];

  // 新获得的徽章（用于显示通知）
  newBadges: Badge[];

  // 是否显示奖励通知
  showRewardNotification: boolean;
  currentReward: {
    type: 'star' | 'badge';
    count?: number;
    badge?: Badge;
  } | null;

  // 初始化
  initialize: (childId: string) => void;

  // 授予星星
  awardStars: (
    achievementType: string,
    metadata?: {
      word?: string;
      category?: string;
    }
  ) => void;

  // 记录学习单词
  recordWord: (word: string, category: string) => void;

  // 记录完成对话
  recordConversation: (messageCount: number) => void;

  // 隐藏通知
  hideNotification: () => void;

  // 刷新数据
  refresh: () => void;
}

export const useRewardStore = create<RewardState>((set, get) => ({
  // 初始状态
  stats: {
    totalStars: 0,
    todayStars: 0,
    currentStreak: 0,
    totalWords: 0,
    totalConversations: 0,
    badges: [],
    lastActiveDate: undefined,
  },
  badgeProgress: [],
  rewardHistory: [],
  newBadges: [],
  showRewardNotification: false,
  currentReward: null,

  // 初始化
  initialize: async (childId: string) => {
    const stats = await getSupabaseUserStats(childId);
    const progress = getBadgeProgress(stats);
    const history = await getSupabaseRewardHistory(childId);

    set({
      stats,
      badgeProgress: progress,
      rewardHistory: history,
    });
  },

  // 授予星星
  awardStars: async (achievementType: string, metadata?) => {
    // TODO: 这里需要 childId，暂时使用固定值
    const childId = 'demo_child';
    const result = await supabaseAwardStars(childId, achievementType as any, metadata);

    // 刷新数据
    await get().refresh();

    // 显示奖励通知
    set({
      showRewardNotification: true,
      currentReward: {
        type: 'star',
        count: result.stars,
      },
      newBadges: result.newBadges,
    });

    // 如果有新徽章，3秒后显示徽章通知
    if (result.newBadges.length > 0) {
      setTimeout(() => {
        set({
          currentReward: {
            type: 'badge',
            badge: result.newBadges[0],
          },
        });
      }, 3000);
    }
  },

  // 记录学习单词
  recordWord: async (word: string, category: string) => {
    const childId = 'demo_child';
    await supabaseRecordWordLearned(childId, word, category);
    await get().refresh();
  },

  // 记录完成对话
  recordConversation: async (messageCount: number) => {
    const childId = 'demo_child';
    const result = await supabaseRecordConversationCompleted(childId, messageCount, []);
    await get().refresh();

    // 显示奖励通知
    if (result.stars > 0 || result.newBadges.length > 0) {
      set({
        showRewardNotification: true,
        currentReward: {
          type: 'star',
          count: result.stars,
        },
        newBadges: result.newBadges,
      });

      // 如果有新徽章，3秒后显示徽章通知
      if (result.newBadges.length > 0) {
        setTimeout(() => {
          set({
            currentReward: {
              type: 'badge',
              badge: result.newBadges[0],
            },
          });
        }, 3000);
      }
    }
  },

  // 隐藏通知
  hideNotification: () => {
    set({
      showRewardNotification: false,
      currentReward: null,
      newBadges: [],
    });
  },

  // 刷新数据
  refresh: async () => {
    const childId = 'demo_child';
    const stats = await getSupabaseUserStats(childId);
    const progress = getBadgeProgress(stats);
    const history = await getSupabaseRewardHistory(childId);

    set({
      stats,
      badgeProgress: progress,
      rewardHistory: history,
    });
  },
}));
