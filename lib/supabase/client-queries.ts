import { supabase } from './client';

/**
 * Client-side Supabase Queries
 * 客户端Supabase查询
 * These functions are meant to be called from client components
 * 这些函数用于在客户端组件中调用
 */

// ============================================
// Phase 1: Child Operations / 儿童用户操作
// ============================================

/**
 * Get child by ID (client-side)
 */
export async function getChildByIdClient(childId: string) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return null;
  }

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

// ============================================
// Phase 2: Scene Progress Operations / 场景进度操作
// ============================================

/**
 * Get scene progress for a child (client-side)
 */
export async function getSceneProgressClient(childId: string, sceneType: string) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return null;
  }

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
 * Create or update scene progress (client-side)
 */
export async function upsertSceneProgressClient(
  childId: string,
  sceneType: string,
  updates: any
) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return null;
  }

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
 * Get today's daily tasks for a child (client-side)
 */
export async function getDailyTasksClient(childId: string) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return null;
  }

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
 * Create or update daily tasks (client-side)
 */
export async function upsertDailyTasksClient(
  childId: string,
  taskDate: string,
  tasks: any,
  streakCount: number
) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return null;
  }

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
// Phase 2: Learning Statistics / 学习统计（扩展）
// ============================================

/**
 * Get or create today's learning statistics (client-side)
 */
export async function getOrCreateTodayStatisticsClient(childId: string) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return null;
  }

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
 * Update today's learning statistics (client-side)
 */
export async function updateTodayStatisticsClient(
  childId: string,
  updates: any
) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return null;
  }

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
 * Log an activity (client-side)
 */
export async function logActivityClient(
  childId: string,
  activityType: string,
  activityDetails: any = {}
) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return null;
  }

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
 * Get recent activities for a child (client-side)
 */
export async function getRecentActivitiesClient(childId: string, limit: number = 10) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return [];
  }

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
