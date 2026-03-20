import { createServerClient } from './client';
import type { Database } from './client';

/**
 * Data Access Layer (DAL)
 * 数据访问层
 * Provides typed functions for database operations
 * 为数据库操作提供类型安全的函数
 */

type Tables = Database['public']['Tables'];
type Children = Tables['children']['Row'];
type Rewards = Tables['rewards']['Row'];
type UserBadges = Tables['user_badges']['Row'];
type LearningWords = Tables['learning_words']['Row'];
type Conversations = Tables['conversations']['Row'];
type ConversationMessages = Tables['conversation_messages']['Row'];
type LearningStats = Tables['learning_stats']['Row'];

// ============================================
// Children Operations / 儿童用户操作
// ============================================

/**
 * Get child by ID
 */
export async function getChildById(childId: string): Promise<Children | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('id', childId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching child:', error);
    return null;
  }

  return data;
}

/**
 * Get child by parent ID
 */
export async function getChildrenByParentId(parentId: string): Promise<Children[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('parent_id', parentId)
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching children:', error);
    return [];
  }

  return data || [];
}

/**
 * Create a new child
 */
export async function createChild(child: Tables['children']['Insert']): Promise<Children | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('children')
    .insert(child)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating child:', error);
    return null;
  }

  return data;
}

// ============================================
// Rewards Operations / 奖励操作
// ============================================

/**
 * Get all rewards for a child
 */
export async function getRewardsByChildId(childId: string): Promise<Rewards[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('rewards')
    .select('*')
    .eq('child_id', childId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching rewards:', error);
    return [];
  }

  return data || [];
}

/**
 * Get star rewards for a child
 */
export async function getStarRewardsByChildId(childId: string): Promise<number> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('rewards')
    .select('count')
    .eq('child_id', childId)
    .eq('type', 'star');

  if (error) {
    console.error('Error fetching star rewards:', error);
    return 0;
  }

  return data?.reduce((sum, reward) => sum + reward.count, 0) || 0;
}

/**
 * Get today's star rewards for a child
 */
export async function getTodayStarsByChildId(childId: string): Promise<number> {
  const supabase = createServerClient();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('rewards')
    .select('count')
    .eq('child_id', childId)
    .eq('type', 'star')
    .gte('created_at', today.toISOString());

  if (error) {
    console.error('Error fetching today\'s stars:', error);
    return 0;
  }

  return data?.reduce((sum, reward) => sum + reward.count, 0) || 0;
}

/**
 * Create a new reward
 */
export async function createReward(reward: Tables['rewards']['Insert']): Promise<Rewards | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('rewards')
    .insert(reward)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating reward:', error);
    return null;
  }

  return data;
}

// ============================================
// Badges Operations / 徽章操作
// ============================================

/**
 * Get all badges for a child
 */
export async function getBadgesByChildId(childId: string): Promise<UserBadges[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('user_badges')
    .select('*')
    .eq('child_id', childId)
    .order('unlocked_at', { ascending: false });

  if (error) {
    console.error('Error fetching badges:', error);
    return [];
  }

  return data || [];
}

/**
 * Get a specific badge for a child
 */
export async function getUserBadge(childId: string, badgeId: string): Promise<UserBadges | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('user_badges')
    .select('*')
    .eq('child_id', childId)
    .eq('badge_id', badgeId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching user badge:', error);
    return null;
  }

  return data;
}

/**
 * Unlock a new badge for a child
 */
export async function unlockBadge(
  childId: string,
  badgeId: string
): Promise<UserBadges | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('user_badges')
    .insert({
      child_id: childId,
      badge_id: badgeId,
      progress: 100,
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error unlocking badge:', error);
    return null;
  }

  return data;
}

/**
 * Update badge progress
 */
export async function updateBadgeProgress(
  childId: string,
  badgeId: string,
  progress: number
): Promise<UserBadges | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('user_badges')
    .update({ progress })
    .eq('child_id', childId)
    .eq('badge_id', badgeId)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error updating badge progress:', error);
    return null;
  }

  return data;
}

// ============================================
// Learning Words Operations / 学习单词操作
// ============================================

/**
 * Get all words learned by a child
 */
export async function getLearningWordsByChildId(childId: string): Promise<LearningWords[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('learning_words')
    .select('*')
    .eq('child_id', childId)
    .order('learned_at', { ascending: false });

  if (error) {
    console.error('Error fetching learning words:', error);
    return [];
  }

  return data || [];
}

/**
 * Get total word count for a child
 */
export async function getWordCountByChildId(childId: string): Promise<number> {
  const supabase = createServerClient();

  const { count, error } = await supabase
    .from('learning_words')
    .select('*', { count: 'exact', head: true })
    .eq('child_id', childId);

  if (error) {
    console.error('Error counting words:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Add a new learned word
 */
export async function addLearningWord(
  word: Tables['learning_words']['Insert']
): Promise<LearningWords | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('learning_words')
    .insert(word)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error adding learning word:', error);
    return null;
  }

  return data;
}

// ============================================
// Conversations Operations / 对话操作
// ============================================

/**
 * Get all conversations for a child
 */
export async function getConversationsByChildId(childId: string): Promise<Conversations[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('child_id', childId)
    .order('started_at', { ascending: false });

  if (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }

  return data || [];
}

/**
 * Get conversation count for a child
 */
export async function getConversationCountByChildId(childId: string): Promise<number> {
  const supabase = createServerClient();

  const { count, error } = await supabase
    .from('conversations')
    .select('*', { count: 'exact', head: true })
    .eq('child_id', childId);

  if (error) {
    console.error('Error counting conversations:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Create a new conversation
 */
export async function createConversation(
  conversation: Tables['conversations']['Insert']
): Promise<Conversations | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('conversations')
    .insert(conversation)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating conversation:', error);
    return null;
  }

  return data;
}

/**
 * Add a message to a conversation
 */
export async function addConversationMessage(
  message: Tables['conversation_messages']['Insert']
): Promise<ConversationMessages | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('conversation_messages')
    .insert(message)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error adding conversation message:', error);
    return null;
  }

  return data;
}

// ============================================
// Learning Stats Operations / 学习统计操作
// ============================================

/**
 * Get learning stats for a child
 */
export async function getLearningStatsByChildId(childId: string): Promise<LearningStats[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('learning_stats')
    .select('*')
    .eq('child_id', childId)
    .order('date', { ascending: false })
    .limit(30); // Last 30 days

  if (error) {
    console.error('Error fetching learning stats:', error);
    return [];
  }

  return data || [];
}

/**
 * Get today's learning stats for a child
 */
export async function getTodayLearningStats(childId: string): Promise<LearningStats | null> {
  const supabase = createServerClient();

  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('learning_stats')
    .select('*')
    .eq('child_id', childId)
    .eq('date', today)
    .maybeSingle();

  if (error) {
    console.error('Error fetching today\'s stats:', error);
    return null;
  }

  return data;
}

/**
 * Update or create today's learning stats
 */
export async function upsertLearningStats(
  stats: Tables['learning_stats']['Insert']
): Promise<LearningStats | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('learning_stats')
    .upsert(stats)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error upserting learning stats:', error);
    return null;
  }

  return data;
}

// ============================================
// Phase 2: Scene Progress Operations / 场景进度操作
// ============================================

/**
 * Get scene progress for a child
 */
export async function getSceneProgress(childId: string, sceneType: string) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('scene_progress')
    .select('*')
    .eq('child_id', childId)
    .eq('scene_type', sceneType)
    .maybeSingle();

  if (error) {
    console.error('Error fetching scene progress:', error);
    return null;
  }

  return data;
}

/**
 * Create or update scene progress
 */
export async function upsertSceneProgress(
  childId: string,
  sceneType: string,
  updates: any
) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('scene_progress')
    .upsert({
      child_id: childId,
      scene_type: sceneType,
      ...updates
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error upserting scene progress:', error);
    return null;
  }

  return data;
}

// ============================================
// Phase 2: Daily Tasks Operations / 每日任务操作
// ============================================

/**
 * Get today's daily tasks for a child
 */
export async function getDailyTasks(childId: string) {
  const supabase = createServerClient();
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('daily_tasks')
    .select('*')
    .eq('child_id', childId)
    .eq('task_date', today)
    .maybeSingle();

  if (error) {
    console.error('Error fetching daily tasks:', error);
    return null;
  }

  return data;
}

/**
 * Create or update daily tasks
 */
export async function upsertDailyTasks(
  childId: string,
  taskDate: string,
  tasks: any,
  streakCount: number
) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('daily_tasks')
    .upsert({
      child_id: childId,
      task_date: taskDate,
      tasks,
      streak_count: streakCount
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error upserting daily tasks:', error);
    return null;
  }

  return data;
}

// ============================================
// Phase 2: Characters Operations / 角色操作
// ============================================

/**
 * Get all characters for a child
 */
export async function getCharactersByChildId(childId: string) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('child_id', childId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching characters:', error);
    return [];
  }

  return data || [];
}

/**
 * Create a new character
 */
export async function createCharacter(
  character: any
) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('characters')
    .insert(character)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating character:', error);
    return null;
  }

  return data;
}

// ============================================
// Phase 2: Parent Settings Operations / 家长设置操作
// ============================================

/**
 * Get parent settings for a child
 */
export async function getParentSettings(childId: string) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('parent_settings')
    .select('*')
    .eq('child_id', childId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching parent settings:', error);
    return null;
  }

  return data;
}

/**
 * Create or update parent settings
 */
export async function upsertParentSettings(
  childId: string,
  settings: any
) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('parent_settings')
    .upsert({
      child_id: childId,
      ...settings
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error upserting parent settings:', error);
    return null;
  }

  return data;
}

// ============================================
// Phase 2: Learning Statistics / 学习统计（扩展）
// ============================================

/**
 * Get or create today's learning statistics
 */
export async function getOrCreateTodayStatistics(childId: string) {
  const supabase = createServerClient();
  const today = new Date().toISOString().split('T')[0];

  let { data, error } = await supabase
    .from('learning_statistics')
    .select('*')
    .eq('child_id', childId)
    .eq('stat_date', today)
    .maybeSingle();

  if (error || !data) {
    const result = await supabase
      .from('learning_statistics')
      .insert({
        child_id: childId,
        stat_date: today,
        words_learned: 0,
        conversations_completed: 0,
        stars_earned: 0,
        time_spent_minutes: 0,
        scenes_visited: [],
        tasks_completed: 0,
        badges_earned: []
      })
      .select()
      .maybeSingle();

    data = result.data;
  }

  return data;
}

/**
 * Update today's learning statistics
 */
export async function updateTodayStatistics(
  childId: string,
  updates: any
) {
  const supabase = createServerClient();
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('learning_statistics')
    .update(updates)
    .eq('child_id', childId)
    .eq('stat_date', today)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error updating learning statistics:', error);
    return null;
  }

  return data;
}

// ============================================
// Phase 2: Activity Logs / 活动日志
// ============================================

/**
 * Log an activity
 */
export async function logActivity(
  childId: string,
  activityType: string,
  activityDetails: any = {}
) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('activity_logs')
    .insert({
      child_id: childId,
      activity_type: activityType,
      activity_details: activityDetails
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error logging activity:', error);
    return null;
  }

  return data;
}

/**
 * Get recent activities for a child
 */
export async function getRecentActivities(childId: string, limit: number = 10) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('activity_logs')
    .select('*')
    .eq('child_id', childId)
    .order('timestamp', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent activities:', error);
    return [];
  }

  return data || [];
}

