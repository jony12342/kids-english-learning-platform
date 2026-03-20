'use client';

import { useEffect, useState } from 'react';
import { ProgressSummary, DailyStats } from '@/types/progress';
import { getProgressSummary } from '@/lib/progress/progress-service';
import { TrendingUp, Calendar, Clock, Award, Flame } from 'lucide-react';

/**
 * Progress Display Component
 * 学习进度展示组件
 */

export function ProgressDisplay({ childId }: { childId: string }) {
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true);
      try {
        const data = await getProgressSummary(childId);
        setProgress(data);
      } catch (error) {
        console.error('Failed to load progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [childId]);

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg animate-pulse">
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!progress) {
    return null;
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-primary-blue mb-4 flex items-center gap-2">
        <TrendingUp className="w-6 h-6" />
        Your Progress
      </h2>

      {/* 今日统计 */}
      {progress.todayStats && (
        <div className="mb-6 p-4 bg-gradient-to-r from-primary-yellow/20 to-primary-orange/20 rounded-2xl">
          <h3 className="font-bold text-lg text-primary-orange mb-3">Today</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon="📚"
              label="Words"
              value={progress.todayStats.wordsLearned.toString()}
            />
            <StatCard
              icon="💬"
              label="Chats"
              value={progress.todayStats.conversationsCompleted.toString()}
            />
            <StatCard
              icon="⭐"
              label="Stars"
              value={progress.todayStats.starsEarned.toString()}
            />
            <StatCard
              icon="⏱️"
              label="Minutes"
              value={progress.todayStats.timeSpentMinutes.toString()}
            />
          </div>
        </div>
      )}

      {/* 总体统计 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-2xl p-4 text-center">
          <div className="text-3xl mb-2">📖</div>
          <div className="text-2xl font-bold text-primary-blue">{progress.totalWords}</div>
          <div className="text-sm text-gray-600">Words Learned</div>
        </div>

        <div className="bg-green-50 rounded-2xl p-4 text-center">
          <div className="text-3xl mb-2">💬</div>
          <div className="text-2xl font-bold text-primary-green">{progress.totalConversations}</div>
          <div className="text-sm text-gray-600">Conversations</div>
        </div>

        <div className="bg-yellow-50 rounded-2xl p-4 text-center">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-primary-yellow">{progress.totalStars}</div>
          <div className="text-sm text-gray-600">Total Stars</div>
        </div>

        <div className="bg-orange-50 rounded-2xl p-4 text-center">
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-2xl font-bold text-orange-600">{progress.currentStreak}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>

        <div className="bg-purple-50 rounded-2xl p-4 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl font-bold text-purple-600">{progress.longestStreak}</div>
          <div className="text-sm text-gray-600">Best Streak</div>
        </div>

        <div className="bg-pink-50 rounded-2xl p-4 text-center">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-2xl font-bold text-pink-600">{progress.totalDaysActive}</div>
          <div className="text-sm text-gray-600">Active Days</div>
        </div>
      </div>

      {/* 平均时间 */}
      <div className="mt-4 p-4 bg-gray-50 rounded-2xl flex items-center gap-4">
        <Clock className="w-8 h-8 text-primary-blue" />
        <div>
          <div className="text-sm text-gray-600">Average Daily Time</div>
          <div className="text-xl font-bold text-primary-blue">
            {progress.averageDailyMinutes} minutes
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Stat Card Component
 */
function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-white/80 rounded-xl p-3 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xl font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}

/**
 * Weekly Progress Chart Component
 */
export function WeeklyProgressChart({ childId }: { childId: string }) {
  const [weeklyData, setWeeklyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeeklyData = async () => {
      setLoading(true);
      try {
        const { getWeeklyReport } = await import('@/lib/progress/progress-service');
        const data = await getWeeklyReport(childId);
        setWeeklyData(data);
      } catch (error) {
        console.error('Failed to load weekly data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWeeklyData();
  }, [childId]);

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg animate-pulse">
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!weeklyData) {
    return null;
  }

  const maxWords = Math.max(...weeklyData.dailyStats.map((d: DailyStats) => d.wordsLearned), 1);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-primary-blue mb-4 flex items-center gap-2">
        <Calendar className="w-6 h-6" />
        This Week
      </h2>

      {/* 周统计摘要 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon="📚" label="Words" value={weeklyData.totalWords.toString()} />
        <StatCard icon="💬" label="Chats" value={weeklyData.totalConversations.toString()} />
        <StatCard icon="⭐" label="Stars" value={weeklyData.totalStars.toString()} />
        <StatCard icon="⏱️" label="Minutes" value={weeklyData.totalTimeMinutes.toString()} />
      </div>

      {/* 每日柱状图 */}
      <div className="flex items-end justify-between gap-2 h-40">
        {weeklyData.dailyStats.map((day: DailyStats) => {
          const height = (day.wordsLearned / maxWords) * 100;
          const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });

          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full flex items-end justify-center h-32">
                <div
                  className="w-full bg-gradient-to-t from-primary-blue to-primary-blue/60 rounded-t-lg transition-all hover:from-primary-green hover:to-primary-green/60"
                  style={{ height: `${Math.max(height, 5)}%` }}
                >
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-700">
                    {day.wordsLearned}
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-600 font-medium">{dayName}</span>
            </div>
          );
        })}
      </div>

      {/* 待复习单词 */}
      {weeklyData.wordsToReview > 0 && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-xl flex items-center gap-3">
          <Award className="w-6 h-6 text-yellow-600" />
          <div className="flex-1">
            <div className="font-bold text-yellow-800">Words to Review</div>
            <div className="text-sm text-yellow-700">{weeklyData.wordsToReview} words need practice</div>
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full font-bold min-touch-target">
            Review Now
          </button>
        </div>
      )}

      {/* 热门分类 */}
      {weeklyData.topCategories.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold text-gray-700 mb-2">Top Categories This Week</h3>
          <div className="flex flex-wrap gap-2">
            {weeklyData.topCategories.map((cat: any) => (
              <span
                key={cat.category}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {cat.category}: {cat.count}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Streak Display Component
 */
export function StreakDisplay({ currentStreak, longestStreak }: { currentStreak: number; longestStreak: number }) {
  return (
    <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-4 text-white shadow-lg">
      <div className="flex items-center gap-3">
        <Flame className="w-10 h-10 animate-pulse" />
        <div className="flex-1">
          <div className="text-sm opacity-90">Current Streak</div>
          <div className="text-3xl font-bold">{currentStreak} days</div>
        </div>
        <div className="text-right">
          <div className="text-sm opacity-90">Best</div>
          <div className="text-xl font-bold">{longestStreak} days</div>
        </div>
      </div>
    </div>
  );
}
