'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useChild } from '@/lib/hooks/use-child';
import {
  getDailyTasksClient,
  upsertDailyTasksClient,
  getOrCreateTodayStatisticsClient,
  logActivityClient
} from '@/lib/supabase/client-queries';
import {
  DailyTasks,
  DailyTask,
  TaskProgressState,
  generateDailyTasks,
  updateTaskProgress,
  calculateTaskCompletionPercentage,
  getTotalRewards,
  getDifficultyColor,
  getDifficultyLabel,
  BADGE_DEFINITIONS,
} from '@/types/daily-tasks';
import { Home, Flame, Trophy, Target, Clock, CheckCircle2, Circle, Award } from 'lucide-react';

export default function TasksPage() {
  const router = useRouter();
  const { childId } = useChild();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dailyTasks, setDailyTasks] = useState<DailyTasks | null>(null);
  const [currentProgress, setCurrentProgress] = useState<TaskProgressState>({
    wordsLearned: 0,
    conversationsCompleted: 0,
    starsCollected: 0,
    currentStreak: 0,
    timeSpentMinutes: 0,
    scenesVisited: []
  });
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (childId) {
      loadTasksAndProgress();
      logActivityClient(childId, 'scene_visit', { scene: 'tasks' });
    }
  }, [childId]);

  async function loadTasksAndProgress() {
    if (!childId) {
      setLoading(false);
      return;
    }

    try {
      // Load today's tasks from database
      let tasks = await getDailyTasksClient(childId);

      if (!tasks) {
        console.log('No tasks found for today, generating new tasks...');
        // Generate new tasks for today
        const today = new Date();
        const generatedTasks = generateDailyTasks(childId, today);

        console.log('Generated tasks:', generatedTasks);

        // Save to database
        tasks = await upsertDailyTasksClient(
          childId,
          today.toISOString().split('T')[0],
          generatedTasks.tasks,
          0
        );

        console.log('Saved tasks to database:', tasks);
      }

      // Load today's statistics
      const stats = await getOrCreateTodayStatisticsClient(childId);

      console.log('Today stats:', stats);

      if (stats) {
        const progress: TaskProgressState = {
          wordsLearned: stats.words_learned || 0,
          conversationsCompleted: stats.conversations_completed || 0,
          starsCollected: stats.stars_earned || 0,
          currentStreak: stats.current_streak || 0,
          timeSpentMinutes: stats.time_spent_minutes || 0,
          scenesVisited: stats.scenes_visited || []
        };

        setCurrentProgress(progress);

        // Update tasks with current progress
        if (tasks && tasks.tasks) {
          const taskData = {
            id: tasks.id,
            childId: tasks.child_id,
            taskDate: new Date(tasks.task_date),
            tasks: tasks.tasks,
            isCompleted: tasks.is_completed || false,
            completedAt: tasks.completed_at ? new Date(tasks.completed_at) : undefined,
            streakCount: tasks.streak_count || 0,
            totalCompleted: 0,
            createdAt: new Date(tasks.created_at),
            updatedAt: new Date(tasks.updated_at)
          };

          const updatedTasks = updateTaskProgress(taskData, progress);
          setDailyTasks(updatedTasks);
        }
      } else if (tasks && tasks.tasks) {
        setDailyTasks({
          id: tasks.id,
          childId: tasks.child_id,
          taskDate: new Date(tasks.task_date),
          tasks: tasks.tasks,
          isCompleted: tasks.is_completed || false,
          completedAt: tasks.completed_at ? new Date(tasks.completed_at) : undefined,
          streakCount: tasks.streak_count || 0,
          totalCompleted: 0,
          createdAt: new Date(tasks.created_at),
          updatedAt: new Date(tasks.updated_at)
        });
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
      // Show error to user or create mock data as fallback
      console.error('Error details:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!isClient || loading || !dailyTasks) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
        <div className="text-4xl font-bold text-blue-700 animate-pulse">
          Loading Tasks... 📋
        </div>
      </div>
    );
  }

  const totalRewards = getTotalRewards(dailyTasks);
  const completedTasks = dailyTasks.tasks.filter(t => t.isCompleted);
  const totalTasks = dailyTasks.tasks.length;
  const overallProgress = Math.round((completedTasks.length / totalTasks) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <Home className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-blue-600">Home</span>
          </button>

          <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
            <span>📋</span>
            <span>Daily Tasks</span>
            <span>🎯</span>
          </h1>

          <div className="flex items-center gap-4">
            <div className="text-center bg-white rounded-full px-4 py-2 shadow-md">
              <div className="text-sm text-gray-600">Streak</div>
              <div className="text-xl font-bold text-orange-500 flex items-center gap-1">
                <Flame className="w-5 h-5" />
                <span>{dailyTasks.streakCount} days</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Overall Progress */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Today's Progress</h3>
                <Target className="w-6 h-6 text-blue-600" />
              </div>

              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-blue-600 mb-2">{overallProgress}%</div>
                <div className="text-sm text-gray-600">{completedTasks.length} of {totalTasks} tasks</div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            {/* Rewards */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Rewards</h3>
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Stars</span>
                  <span className="text-2xl font-bold text-yellow-500">⭐ {totalRewards.stars}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Badges</span>
                  <span className="text-2xl font-bold text-purple-500">🏆 {totalRewards.badges.length}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Your Stats</h3>
                <Clock className="w-6 h-6 text-green-600" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Words</span>
                  <span className="font-bold">{currentProgress.wordsLearned}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Conversations</span>
                  <span className="font-bold">{currentProgress.conversationsCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stars</span>
                  <span className="font-bold">{currentProgress.starsCollected}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-bold">{currentProgress.timeSpentMinutes} min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks List */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
              <span>📋</span>
              <span>Today's Tasks</span>
            </h2>

            <div className="space-y-4">
              {dailyTasks.tasks.map((task) => {
                const progress = calculateTaskCompletionPercentage(task);
                const difficultyColor = getDifficultyColor(task.difficulty);

                return (
                  <div
                    key={task.id}
                    className={`
                      bg-gradient-to-r rounded-2xl p-5 shadow-md border-2
                      transition-all
                      ${task.isCompleted
                        ? 'from-green-50 to-emerald-50 border-green-300'
                        : 'from-white to-gray-50 border-gray-200'
                      }
                    `}
                  >
                    <div className="flex items-start gap-4">
                      {/* Task Icon */}
                      <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-3xl
                        ${task.isCompleted ? 'bg-green-100' : 'bg-blue-100'}`}>
                        {task.emoji}
                      </div>

                      {/* Task Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className={`text-xl font-bold mb-1 ${task.isCompleted ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                              {task.title}
                            </h3>
                            <p className="text-sm text-gray-600">{task.description}</p>
                          </div>

                          {/* Completion Status */}
                          <div className="flex-shrink-0">
                            {task.isCompleted ? (
                              <CheckCircle2 className="w-8 h-8 text-green-500" />
                            ) : (
                              <Circle className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                        </div>

                        {/* Progress & Rewards */}
                        <div className="space-y-2">
                          {/* Progress Bar */}
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-bold">{task.current} / {task.target}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                              <div
                                className={`h-full transition-all duration-500 ${
                                  task.isCompleted
                                    ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                                    : 'bg-gradient-to-r from-blue-400 to-purple-500'
                                }`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>

                          {/* Rewards & Difficulty */}
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded-full">
                              <span className="font-bold text-yellow-700">⭐ {task.rewardStars}</span>
                            </div>

                            {task.rewardBadge && (
                              <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 rounded-full">
                                <Award className="w-4 h-4 text-purple-600" />
                                <span className="font-bold text-purple-700">Badge</span>
                              </div>
                            )}

                            <div
                              className="px-2 py-1 rounded-full font-bold text-white"
                              style={{ backgroundColor: difficultyColor }}
                            >
                              {getDifficultyLabel(task.difficulty)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Earned Badges */}
          {earnedBadges.length > 0 && (
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 shadow-lg border-2 border-yellow-300">
              <h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
                <span>🏆</span>
                <span>Badges Earned Today</span>
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {earnedBadges.map((badgeId) => {
                  const badge = BADGE_DEFINITIONS[badgeId];
                  if (!badge) return null;

                  return (
                    <div
                      key={badgeId}
                      className="bg-white rounded-2xl p-4 shadow-md text-center border-2 border-yellow-200"
                    >
                      <div className="text-5xl mb-2">{badge.emoji}</div>
                      <div className="font-bold text-gray-800 text-sm">{badge.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
