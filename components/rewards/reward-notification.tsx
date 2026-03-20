'use client';

import { useEffect, useState } from 'react';
import { useRewardStore } from '@/lib/store/reward-store';
import { Badge } from '@/types/rewards';

/**
 * 奖励通知组件
 * Reward Notification Component
 * Displays pop-up notifications for earned stars and badges
 */

export function RewardNotification() {
  const {
    showRewardNotification,
    currentReward,
    hideNotification,
  } = useRewardStore();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showRewardNotification) {
      setIsVisible(true);
      // 5秒后自动隐藏
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          hideNotification();
        }, 300); // 等待动画完成
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showRewardNotification, hideNotification]);

  if (!showRewardNotification || !currentReward) {
    return null;
  }

  return (
    <div
      className={`fixed top-20 right-4 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm animate-bounce-gentle">
        {/* 星星奖励 */}
        {currentReward.type === 'star' && (
          <div className="text-center">
            <div className="text-6xl mb-4 animate-spin-slow">⭐</div>
            <h3 className="font-size-large font-bold text-primary-yellow mb-2">
              Awesome! 🎉
            </h3>
            <p className="font-size-medium text-gray-700">
              You earned {currentReward.count} {currentReward.count === 1 ? 'star' : 'stars'}!
            </p>
          </div>
        )}

        {/* 徽章奖励 */}
        {currentReward.type === 'badge' && currentReward.badge && (
          <div className="text-center">
            <div className="text-6xl mb-4 animate-wiggle">
              {currentReward.badge.icon}
            </div>
            <h3 className="font-size-large font-bold text-primary-blue mb-2">
              Badge Unlocked! 🏆
            </h3>
            <p className="font-size-medium font-bold text-gray-800 mb-1">
              {currentReward.badge.name}
            </p>
            <p className="font-size-small text-gray-600">
              {currentReward.badge.description}
            </p>
          </div>
        )}

        {/* 关闭按钮 */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => {
              hideNotification();
            }, 300);
          }}
          className="mt-4 w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-full min-touch-target"
        >
          Continue Learning! 📚
        </button>
      </div>
    </div>
  );
}

/**
 * 星星显示组件
 * Star Display Component
 * Shows current star count in the header
 */

interface StarDisplayProps {
  totalStars: number;
  todayStars: number;
}

export function StarDisplay({ totalStars, todayStars }: StarDisplayProps) {
  return (
    <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full shadow-md">
      <div className="text-2xl animate-spin-slow">⭐</div>
      <div className="flex flex-col">
        <span className="font-bold text-primary-yellow text-lg">
          {totalStars}
        </span>
        {todayStars > 0 && (
          <span className="text-xs text-gray-600">
            +{todayStars} today
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * 徽章展示组件
 * Badge Gallery Component
 * Displays all badges with progress
 */

interface BadgeGalleryProps {
  badges: Array<{
    badge: Badge;
    progress: number;
    unlocked: boolean;
  }>;
}

export function BadgeGallery({ badges }: BadgeGalleryProps) {
  const categories = [
    { id: 'learning', name: 'Learning', filter: (b: any) =>
        b.badge.requirement.type === 'words' ||
        b.badge.id.startsWith('badge_word')
    },
    { id: 'conversation', name: 'Chatting', filter: (b: any) =>
        b.badge.requirement.type === 'conversations'
    },
    { id: 'streak', name: 'Streak', filter: (b: any) =>
        b.badge.requirement.type === 'streak'
    },
    { id: 'stars', name: 'Stars', filter: (b: any) =>
        b.badge.requirement.type === 'stars'
    },
    { id: 'special', name: 'Special', filter: (b: any) =>
        b.badge.id.includes('early_bird') ||
        b.badge.id.includes('night_owl') ||
        b.badge.id.includes('animal_friend') ||
        b.badge.id.includes('color_artist') ||
        b.badge.id.includes('number_wizard')
    },
  ];

  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const categoryBadges = badges.filter(category.filter);
        if (categoryBadges.length === 0) return null;

        return (
          <div key={category.id}>
            <h3 className="font-size-medium font-bold text-primary-blue mb-3">
              {category.name}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryBadges.map(({ badge, progress, unlocked }) => (
                <div
                  key={badge.id}
                  className={`relative p-4 rounded-2xl shadow-lg ${
                    unlocked
                      ? 'bg-gradient-to-br from-yellow-100 to-orange-100'
                      : 'bg-gray-100 opacity-60'
                  }`}
                >
                  {/* 徽章图标 */}
                  <div className={`text-4xl mb-2 ${unlocked ? '' : 'grayscale'}`}>
                    {badge.icon}
                  </div>

                  {/* 徽章名称 */}
                  <div className="font-bold text-sm text-gray-800 mb-1">
                    {badge.name}
                  </div>

                  {/* 徽章描述 */}
                  <div className="text-xs text-gray-600 mb-2">
                    {badge.description}
                  </div>

                  {/* 进度条 */}
                  {!unlocked && (
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div
                        className="bg-primary-blue h-2 rounded-full transition-all"
                        style={{ width: `${progress * 100}%` }}
                      />
                    </div>
                  )}

                  {/* 已解锁标记 */}
                  {unlocked && (
                    <div className="absolute top-2 right-2 text-xl">
                      ✅
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
