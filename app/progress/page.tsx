'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressDisplay, WeeklyProgressChart, StreakDisplay } from '@/components/progress/progress-display';
import { Home, Trophy, BookOpen, Target } from 'lucide-react';

export default function ProgressPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const childId = 'demo_child'; // TODO: Get from auth/context

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
        <div className="text-4xl font-bold text-primary animate-pulse">
          Loading Progress... ✨
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      {/* 顶部导航栏 */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg p-4 flex justify-between items-center">
        <button
          onClick={() => router.push('/garden')}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all min-touch-target"
        >
          <Home className="w-6 h-6 text-primary" />
          <span className="font-bold text-primary">Garden</span>
        </button>

        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <Trophy className="w-8 h-8" />
          <span>My Progress</span>
        </h1>

        <button
          onClick={() => router.push('/garden')}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all min-touch-target"
        >
          <BookOpen className="w-6 h-6 text-primary" />
          <span className="font-bold text-primary">Learn</span>
        </button>
      </header>

      {/* 主内容区域 */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* 连续学习天数 */}
        <div className="max-w-4xl mx-auto">
          <StreakDisplay currentStreak={0} longestStreak={0} />
        </div>

        {/* 进度展示 */}
        <div className="max-w-4xl mx-auto">
          <ProgressDisplay childId={childId} />
        </div>

        {/* 周进度图表 */}
        <div className="max-w-4xl mx-auto">
          <WeeklyProgressChart childId={childId} />
        </div>

        {/* 学习目标 */}
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-primary-blue mb-4 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Learning Goals
          </h2>

          <div className="space-y-4">
            {/* 每日目标 */}
            <GoalCard
              title="Daily Goal"
              description="Learn 5 new words every day"
              icon="📚"
              current={3}
              target={5}
              unit="words"
            />

            {/* 周目标 */}
            <GoalCard
              title="Weekly Goal"
              description="Have 10 conversations this week"
              icon="💬"
              current={4}
              target={10}
              unit="chats"
            />

            {/* 月目标 */}
            <GoalCard
              title="Monthly Goal"
              description="Earn 500 stars this month"
              icon="⭐"
              current={120}
              target={500}
              unit="stars"
            />
          </div>
        </div>

        {/* 成就展示 */}
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-primary-blue mb-4">Recent Achievements</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AchievementCard
              icon="🌟"
              title="First Word"
              description="Learned your first word!"
              date="Today"
            />
            <AchievementCard
              icon="🔥"
              title="3-Day Streak"
              description="Learned for 3 days in a row!"
              date="Yesterday"
            />
            <AchievementCard
              icon="💬"
              title="Chat Starter"
              description="Had your first conversation!"
              date="2 days ago"
            />
            <AchievementCard
              icon="⭐"
              title="Rising Star"
              description="Earned 10 stars!"
              date="3 days ago"
            />
          </div>
        </div>
      </main>

      {/* 底部提示 */}
      <footer className="bg-white/90 backdrop-blur-sm shadow-lg p-4 text-center">
        <p className="text-sm text-gray-600">
          Keep learning to unlock more achievements! 🎉
        </p>
      </footer>
    </div>
  );
}

/**
 * Goal Card Component
 */
function GoalCard({
  title,
  description,
  icon,
  current,
  target,
  unit,
}: {
  title: string;
  description: string;
  icon: string;
  current: number;
  target: number;
  unit: string;
}) {
  const progress = Math.min((current / target) * 100, 100);

  return (
    <div className="bg-gray-50 rounded-2xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">{icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-primary-blue">
            {current}/{target}
          </div>
          <div className="text-xs text-gray-600">{unit}</div>
        </div>
      </div>

      {/* 进度条 */}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all ${
            progress >= 100
              ? 'bg-gradient-to-r from-green-400 to-green-600'
              : 'bg-gradient-to-r from-primary-blue to-primary-blue/60'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {progress >= 100 && (
        <div className="mt-2 text-center text-sm font-bold text-green-600">
          🎉 Goal Completed!
        </div>
      )}
    </div>
  );
}

/**
 * Achievement Card Component
 */
function AchievementCard({
  icon,
  title,
  description,
  date,
}: {
  icon: string;
  title: string;
  description: string;
  date: string;
}) {
  return (
    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-4 text-center shadow-md hover:shadow-lg transition-all">
      <div className="text-4xl mb-2 animate-wiggle">{icon}</div>
      <h3 className="font-bold text-sm text-gray-800 mb-1">{title}</h3>
      <p className="text-xs text-gray-600 mb-2">{description}</p>
      <div className="text-xs text-gray-500">{date}</div>
    </div>
  );
}
