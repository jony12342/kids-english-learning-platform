'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useChild } from '@/lib/hooks/use-child';
import {
  getParentSettingsClient,
  getOrCreateTodayStatisticsClient,
  getWeeklyLearningStatsClient,
  getRecentActivitiesClient,
  upsertParentSettingsClient,
} from '@/lib/supabase/client-queries';
import {
  ParentSettings,
  LearningStatistics,
  ActivityLog,
  ParentDashboard,
  formatTime,
  ACTIVITY_TYPE_LABELS,
  SCENE_NAMES,
  WEEK_DAY_LABELS,
  DEFAULT_PARENT_SETTINGS,
} from '@/types/parent';
import { Home, Shield, Clock, BarChart3, Settings, Lock, Eye, EyeOff } from 'lucide-react';

export default function ParentPage() {
  const router = useRouter();
  const { childId, child } = useChild();
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPinInput, setShowPinInput] = useState(true);
  const [pinInput, setPinInput] = useState('');
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'settings' | 'reports'>('dashboard');
  const [dashboard, setDashboard] = useState<ParentDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (childId) {
      setLoading(false);
    }
  }, [childId]);

  useEffect(() => {
    if (childId && isAuthenticated) {
      loadDashboardData();
    }
  }, [childId, isAuthenticated]);

  const handlePinSubmit = () => {
    // Demo: accept any 4-digit PIN
    if (pinInput.length === 4) {
      setIsAuthenticated(true);
      setShowPinInput(false);
      loadDashboardData();
    }
  };

  const loadDashboardData = async () => {
    if (!childId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Load today's statistics
      const todayStats = await getOrCreateTodayStatisticsClient(childId);

      // Load weekly statistics
      const weeklyStatsList = await getWeeklyLearningStatsClient(childId);

      // Calculate weekly totals
      const weeklyStats = {
        wordsLearned: weeklyStatsList.reduce((sum, s) => sum + (s.words_learned || 0), 0),
        conversationsCompleted: weeklyStatsList.reduce((sum, s) => sum + (s.conversations_completed || 0), 0),
        starsEarned: weeklyStatsList.reduce((sum, s) => sum + (s.stars_earned || 0), 0),
        timeSpentMinutes: weeklyStatsList.reduce((sum, s) => sum + (s.time_spent_minutes || 0), 0),
        tasksCompleted: weeklyStatsList.reduce((sum, s) => sum + (s.tasks_completed || 0), 0),
        badgesEarned: weeklyStatsList.reduce((sum, s) => sum + ((s.badges_earned as string[])?.length || 0), 0),
      };

      // Load recent activities
      const recentActivities = await getRecentActivitiesClient(childId, 10);

      // Load parent settings
      let settings = await getParentSettingsClient(childId);

      // Create default settings if not exist
      if (!settings) {
        settings = await upsertParentSettingsClient(childId, DEFAULT_PARENT_SETTINGS);
      }

      // Build dashboard
      const dashboardData: ParentDashboard = {
        childInfo: {
          name: child?.name || '测试儿童',
          age: 6,
          avatar: '🦉'
        },
        todayStats: {
          wordsLearned: todayStats?.words_learned || 0,
          conversationsCompleted: todayStats?.conversations_completed || 0,
          starsEarned: todayStats?.stars_earned || 0,
          timeSpentMinutes: todayStats?.time_spent_minutes || 0
        },
        weeklyStats,
        recentActivity: recentActivities.map((activity) => ({
          id: activity.id,
          childId: activity.child_id,
          activityType: activity.activity_type,
          activityDetails: activity.activity_details || {},
          timestamp: new Date(activity.timestamp)
        })),
        settings: settings ? {
          id: settings.id,
          childId: settings.child_id,
          dailyTimeLimit: settings.daily_time_limit ?? DEFAULT_PARENT_SETTINGS.dailyTimeLimit,
          allowedHours: settings.allowed_hours ?? DEFAULT_PARENT_SETTINGS.allowedHours,
          contentRestrictions: settings.content_restrictions ?? DEFAULT_PARENT_SETTINGS.contentRestrictions,
          notificationsEnabled: settings.notifications_enabled ?? DEFAULT_PARENT_SETTINGS.notificationsEnabled,
          weeklyReportDay: settings.weekly_report_day ?? DEFAULT_PARENT_SETTINGS.weeklyReportDay,
          createdAt: new Date(settings.created_at),
          updatedAt: new Date(settings.updated_at)
        } : {
          id: '',
          childId: childId || '',
          ...DEFAULT_PARENT_SETTINGS,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      };

      setDashboard(dashboardData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
        <div className="text-4xl font-bold text-indigo-700 animate-pulse">
          Loading Parent Dashboard... 👨‍👩‍👧
        </div>
      </div>
    );
  }

  // PIN Authentication Screen
  if (showPinInput) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Parent Access</h1>
            <p className="text-gray-600">Enter PIN to access parental controls</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">PIN Code</label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
                onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                className="w-full px-4 py-3 text-2xl text-center border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none tracking-widest"
                placeholder="••••"
                maxLength={4}
              />
            </div>

            <button
              onClick={handlePinSubmit}
              disabled={pinInput.length !== 4}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
            >
              Access Dashboard
            </button>

            <button
              onClick={() => router.push('/')}
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Demo: Enter any 4 digits
          </p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
        <div className="text-4xl font-bold text-indigo-700 animate-pulse">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <Home className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-indigo-600">Back to Home</span>
          </button>

          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
            <span>👨‍👩‍👧</span>
            <span>Parent Dashboard</span>
          </h1>

          <div className="flex items-center gap-2">
            <div className="bg-white rounded-full px-4 py-2 shadow-md flex items-center gap-2">
              <span className="text-2xl">{dashboard.childInfo.avatar}</span>
              <span className="font-bold text-gray-800">{dashboard.childInfo.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-2 shadow-lg mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentTab('dashboard')}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  currentTab === 'dashboard'
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setCurrentTab('settings')}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  currentTab === 'settings'
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <button
                onClick={() => setCurrentTab('reports')}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  currentTab === 'reports'
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span>Reports</span>
              </button>
            </div>
          </div>

          {/* Dashboard Tab */}
          {currentTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Today's Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Words Learned</h3>
                    <div className="text-3xl">📚</div>
                  </div>
                  <div className="text-4xl font-bold text-indigo-600">{dashboard.todayStats.wordsLearned}</div>
                  <div className="text-sm text-gray-600 mt-2">Today</div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Conversations</h3>
                    <div className="text-3xl">💬</div>
                  </div>
                  <div className="text-4xl font-bold text-green-600">{dashboard.todayStats.conversationsCompleted}</div>
                  <div className="text-sm text-gray-600 mt-2">Today</div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Stars Earned</h3>
                    <div className="text-3xl">⭐</div>
                  </div>
                  <div className="text-4xl font-bold text-yellow-600">{dashboard.todayStats.starsEarned}</div>
                  <div className="text-sm text-gray-600 mt-2">Today</div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Time Spent</h3>
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-4xl font-bold text-purple-600">
                    {formatTime(dashboard.todayStats.timeSpentMinutes)}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">Today</div>
                </div>
              </div>

              {/* Weekly Stats */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-indigo-700 mb-4">📊 This Week</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📚</div>
                    <div className="text-2xl font-bold text-gray-800">{dashboard.weeklyStats.wordsLearned}</div>
                    <div className="text-sm text-gray-600">Words</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">💬</div>
                    <div className="text-2xl font-bold text-gray-800">{dashboard.weeklyStats.conversationsCompleted}</div>
                    <div className="text-sm text-gray-600">Conversations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="text-2xl font-bold text-gray-800">{dashboard.weeklyStats.starsEarned}</div>
                    <div className="text-sm text-gray-600">Stars</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">⏱️</div>
                    <div className="text-2xl font-bold text-gray-800">{formatTime(dashboard.weeklyStats.timeSpentMinutes)}</div>
                    <div className="text-sm text-gray-600">Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">✅</div>
                    <div className="text-2xl font-bold text-gray-800">{dashboard.weeklyStats.tasksCompleted}</div>
                    <div className="text-sm text-gray-600">Tasks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🏆</div>
                    <div className="text-2xl font-bold text-gray-800">{dashboard.weeklyStats.badgesEarned}</div>
                    <div className="text-sm text-gray-600">Badges</div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-indigo-700 mb-4">🕐 Recent Activity</h2>

                <div className="space-y-3">
                  {dashboard.recentActivity.map((activity) => {
                    const label = ACTIVITY_TYPE_LABELS[activity.activityType];
                    const timeAgo = Math.floor((Date.now() - activity.timestamp.getTime()) / 60000);

                    return (
                      <div
                        key={activity.id}
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200"
                      >
                        <div className="text-3xl">{label.emoji}</div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-800">{label.label}</div>
                          {activity.activityType === 'scene_visit' && activity.activityDetails.scene && (
                            <div className="text-sm text-gray-600">
                              {SCENE_NAMES[activity.activityDetails.scene]?.name} ({activity.activityDetails.duration} min)
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{timeAgo}m ago</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {currentTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-indigo-700 mb-6">⏱️ Time Limits</h2>

                <div className="space-y-4">
                  <div>
                    <label className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-800">Daily Time Limit</span>
                      <span className="text-indigo-600 font-bold">{dashboard.settings.dailyTimeLimit} minutes</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="120"
                      step="10"
                      defaultValue={dashboard.settings.dailyTimeLimit}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>10 min</span>
                      <span>120 min</span>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-800 mb-2 block">Allowed Hours</label>
                    <div className="grid grid-cols-6 gap-2">
                      {dashboard.settings.allowedHours.map((hour) => (
                        <div
                          key={hour}
                          className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-center text-sm font-bold"
                        >
                          {hour}:00
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Child can only use the app during these hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-indigo-700 mb-6">🎮 Content Control</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🌸</span>
                      <span className="font-bold text-gray-800">Magic Garden</span>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-bold ${
                      dashboard.settings.contentRestrictions.allowGarden
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {dashboard.settings.contentRestrictions.allowGarden ? 'Allowed' : 'Blocked'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🌲</span>
                      <span className="font-bold text-gray-800">Forest Adventure</span>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-bold ${
                      dashboard.settings.contentRestrictions.allowForest
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {dashboard.settings.contentRestrictions.allowForest ? 'Allowed' : 'Blocked'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🧁</span>
                      <span className="font-bold text-gray-800">Kitchen</span>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-bold ${
                      dashboard.settings.contentRestrictions.allowKitchen
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {dashboard.settings.contentRestrictions.allowKitchen ? 'Allowed' : 'Blocked'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-indigo-700 mb-6">🔒 Security</h2>

                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                    <div className="flex items-center gap-3">
                      <Lock className="w-6 h-6 text-indigo-600" />
                      <span className="font-bold text-gray-800">Change PIN Code</span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </button>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-indigo-600" />
                      <span className="font-bold text-gray-800">Notifications</span>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-bold ${
                      dashboard.settings.notificationsEnabled
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {dashboard.settings.notificationsEnabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {currentTab === 'reports' && (
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-indigo-700 mb-4">📈 Learning Progress</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                    <h3 className="font-bold text-lg mb-3">Strong Areas</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span>📚</span>
                        <span>Vocabulary Building</span>
                        <span className="ml-auto font-bold text-green-600">+15%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>⏱️</span>
                        <span>Consistency</span>
                        <span className="ml-auto font-bold text-green-600">+20%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200">
                    <h3 className="font-bold text-lg mb-3">Areas for Improvement</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span>💬</span>
                        <span>Speaking Practice</span>
                        <span className="ml-auto font-bold text-yellow-600">Needs work</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>🎯</span>
                        <span>Task Completion</span>
                        <span className="ml-auto font-bold text-yellow-600">+5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-indigo-700 mb-4">📅 Weekly Report Schedule</h2>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-bold text-gray-800">Report Day</div>
                    <div className="text-sm text-gray-600">
                      Receive weekly learning reports every{' '}
                      {WEEK_DAY_LABELS[dashboard.settings.weeklyReportDay]}
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all">
                    Change
                  </button>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-indigo-700 mb-4">📊 Export Data</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-left">
                    <div className="text-2xl mb-2">📄</div>
                    <div className="font-bold text-gray-800">PDF Report</div>
                    <div className="text-sm text-gray-600">Download detailed report</div>
                  </button>
                  <button className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-left">
                    <div className="text-2xl mb-2">📈</div>
                    <div className="font-bold text-gray-800">CSV Data</div>
                    <div className="text-sm text-gray-600">Export raw data</div>
                  </button>
                  <button className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-left">
                    <div className="text-2xl mb-2">📧</div>
                    <div className="font-bold text-gray-800">Email Report</div>
                    <div className="text-sm text-gray-600">Send to inbox</div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
