// Daily Tasks System Types
// 每日任务系统类型定义

// Task Types
export type TaskType = 'words' | 'conversations' | 'stars' | 'streak' | 'time' | 'scene';
export type TaskDifficulty = 'easy' | 'medium' | 'hard';

// Individual Task
export interface DailyTask {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  emoji: string;
  difficulty: TaskDifficulty;
  target: number;
  current: number;
  rewardStars: number;
  rewardBadge?: string;
  isCompleted: boolean;
  completedAt?: Date;
}

// Daily Tasks Container
export interface DailyTasks {
  id: string;
  childId: string;
  taskDate: Date;
  tasks: DailyTask[];
  isCompleted: boolean;
  completedAt?: Date;
  streakCount: number;
  totalCompleted: number;
  createdAt: Date;
  updatedAt: Date;
}

// Task Template
export interface TaskTemplate {
  id: string;
  taskType: TaskType;
  title: string;
  description: string;
  emoji: string;
  difficulty: TaskDifficulty;
  defaultTarget: number;
  rewardStars: number;
  rewardBadge?: string;
  isActive: boolean;
  weight: number;
}

// User Badge
export interface UserBadge {
  id: string;
  childId: string;
  badgeId: string;
  badgeName: string;
  badgeEmoji: string;
  badgeDescription: string;
  earnedAt: Date;
}

// Task Progress State
export interface TaskProgressState {
  wordsLearned: number;
  conversationsCompleted: number;
  starsCollected: number;
  currentStreak: number;
  timeSpentMinutes: number;
  scenesVisited: string[];
}

// Task Templates Data
export const TASK_TEMPLATES: TaskTemplate[] = [
  // Word learning tasks
  {
    id: 'words-5-easy',
    taskType: 'words',
    title: 'Learn 5 New Words',
    description: 'Discover and learn 5 new English words!',
    emoji: '📚',
    difficulty: 'easy',
    defaultTarget: 5,
    rewardStars: 2,
    isActive: true,
    weight: 10
  },
  {
    id: 'words-10-medium',
    taskType: 'words',
    title: 'Learn 10 New Words',
    description: 'Master 10 new English words today!',
    emoji: '📖',
    difficulty: 'medium',
    defaultTarget: 10,
    rewardStars: 5,
    rewardBadge: 'word_master',
    isActive: true,
    weight: 8
  },
  {
    id: 'words-15-hard',
    taskType: 'words',
    title: 'Learn 15 New Words',
    description: 'Challenge yourself with 15 new words!',
    emoji: '✨',
    difficulty: 'hard',
    defaultTarget: 15,
    rewardStars: 10,
    rewardBadge: 'word_champion',
    isActive: true,
    weight: 5
  },

  // Conversation tasks
  {
    id: 'conv-3-easy',
    taskType: 'conversations',
    title: 'Complete 3 Conversations',
    description: 'Have 3 conversations with AI teachers!',
    emoji: '💬',
    difficulty: 'easy',
    defaultTarget: 3,
    rewardStars: 2,
    isActive: true,
    weight: 10
  },
  {
    id: 'conv-5-medium',
    taskType: 'conversations',
    title: 'Complete 5 Conversations',
    description: 'Practice speaking with 5 conversations!',
    emoji: '🎤',
    difficulty: 'medium',
    defaultTarget: 5,
    rewardStars: 5,
    rewardBadge: 'chat_star',
    isActive: true,
    weight: 8
  },
  {
    id: 'conv-7-hard',
    taskType: 'conversations',
    title: 'Complete 7 Conversations',
    description: 'Become a conversation expert!',
    emoji: '🌟',
    difficulty: 'hard',
    defaultTarget: 7,
    rewardStars: 10,
    rewardBadge: 'chat_master',
    isActive: true,
    weight: 5
  },

  // Star collection tasks
  {
    id: 'stars-10-easy',
    taskType: 'stars',
    title: 'Collect 10 Stars',
    description: 'Earn 10 stars through learning activities!',
    emoji: '⭐',
    difficulty: 'easy',
    defaultTarget: 10,
    rewardStars: 2,
    isActive: true,
    weight: 10
  },
  {
    id: 'stars-25-medium',
    taskType: 'stars',
    title: 'Collect 25 Stars',
    description: 'Reach for the stars - collect 25!',
    emoji: '🌟',
    difficulty: 'medium',
    defaultTarget: 25,
    rewardStars: 5,
    rewardBadge: 'star_collector',
    isActive: true,
    weight: 8
  },
  {
    id: 'stars-50-hard',
    taskType: 'stars',
    title: 'Collect 50 Stars',
    description: 'Star champion - collect 50 stars!',
    emoji: '💫',
    difficulty: 'hard',
    defaultTarget: 50,
    rewardStars: 10,
    rewardBadge: 'star_legend',
    isActive: true,
    weight: 5
  },

  // Scene-specific tasks
  {
    id: 'scene-garden-easy',
    taskType: 'scene',
    title: 'Visit Magic Garden',
    description: 'Explore the Magic Garden and learn words!',
    emoji: '🌸',
    difficulty: 'easy',
    defaultTarget: 1,
    rewardStars: 1,
    isActive: true,
    weight: 10
  },
  {
    id: 'scene-forest-easy',
    taskType: 'scene',
    title: 'Visit Forest Adventure',
    description: 'Talk with animals in the forest!',
    emoji: '🌲',
    difficulty: 'easy',
    defaultTarget: 1,
    rewardStars: 1,
    isActive: true,
    weight: 10
  },
  {
    id: 'scene-kitchen-medium',
    taskType: 'scene',
    title: 'Bake a Cake',
    description: 'Go to the kitchen and bake a cake!',
    emoji: '🧁',
    difficulty: 'medium',
    defaultTarget: 1,
    rewardStars: 3,
    rewardBadge: 'baker_badge',
    isActive: true,
    weight: 8
  },
  {
    id: 'scene-2-medium',
    taskType: 'scene',
    title: 'Complete 2 Different Scenes',
    description: 'Try out 2 different learning scenes!',
    emoji: '🎯',
    difficulty: 'medium',
    defaultTarget: 2,
    rewardStars: 3,
    rewardBadge: 'explorer',
    isActive: true,
    weight: 7
  },

  // Streak tasks
  {
    id: 'streak-1-easy',
    taskType: 'streak',
    title: 'Maintain Your Streak',
    description: 'Keep your learning streak alive!',
    emoji: '🔥',
    difficulty: 'easy',
    defaultTarget: 1,
    rewardStars: 1,
    isActive: true,
    weight: 10
  },
  {
    id: 'streak-3-medium',
    taskType: 'streak',
    title: '3-Day Streak',
    description: 'Complete tasks for 3 days in a row!',
    emoji: '⚡',
    difficulty: 'medium',
    defaultTarget: 3,
    rewardStars: 5,
    rewardBadge: 'streak_keeper',
    isActive: true,
    weight: 8
  },
  {
    id: 'streak-7-hard',
    taskType: 'streak',
    title: '7-Day Streak',
    description: 'Week warrior - 7 day streak!',
    emoji: '💪',
    difficulty: 'hard',
    defaultTarget: 7,
    rewardStars: 15,
    rewardBadge: 'streak_master',
    isActive: true,
    weight: 5
  },

  // Time-based tasks
  {
    id: 'time-10-easy',
    taskType: 'time',
    title: 'Learn for 10 Minutes',
    description: 'Spend 10 minutes learning today!',
    emoji: '⏱️',
    difficulty: 'easy',
    defaultTarget: 10,
    rewardStars: 2,
    isActive: true,
    weight: 10
  },
  {
    id: 'time-20-medium',
    taskType: 'time',
    title: 'Learn for 20 Minutes',
    description: 'Dedicate 20 minutes to learning!',
    emoji: '⏰',
    difficulty: 'medium',
    defaultTarget: 20,
    rewardStars: 5,
    rewardBadge: 'time_master',
    isActive: true,
    weight: 8
  },
  {
    id: 'time-30-hard',
    taskType: 'time',
    title: 'Learn for 30 Minutes',
    description: 'Super learner - 30 minutes!',
    emoji: '🏆',
    difficulty: 'hard',
    defaultTarget: 30,
    rewardStars: 10,
    rewardBadge: 'time_legend',
    isActive: true,
    weight: 5
  }
];

// Badge Definitions
export const BADGE_DEFINITIONS: Record<string, { name: string; emoji: string; description: string }> = {
  word_master: { name: 'Word Master', emoji: '📖', description: 'Learned 10 words in one day!' },
  word_champion: { name: 'Word Champion', emoji: '✨', description: 'Learned 15 words in one day!' },
  chat_star: { name: 'Chat Star', emoji: '🎤', description: 'Completed 5 conversations!' },
  chat_master: { name: 'Chat Master', emoji: '🌟', description: 'Completed 7 conversations!' },
  star_collector: { name: 'Star Collector', emoji: '🌟', description: 'Collected 25 stars!' },
  star_legend: { name: 'Star Legend', emoji: '💫', description: 'Collected 50 stars!' },
  baker_badge: { name: 'Master Baker', emoji: '🧁', description: 'Baked a cake!' },
  explorer: { name: 'Explorer', emoji: '🎯', description: 'Completed 2 different scenes!' },
  streak_keeper: { name: 'Streak Keeper', emoji: '⚡', description: '3-day learning streak!' },
  streak_master: { name: 'Streak Master', emoji: '💪', description: '7-day learning streak!' },
  time_master: { name: 'Time Master', emoji: '⏰', description: 'Learned for 20 minutes!' },
  time_legend: { name: 'Time Legend', emoji: '🏆', description: 'Learned for 30 minutes!' }
};

// Helper Functions
export function generateDailyTasks(childId: string, date: Date): DailyTasks {
  // Select 3-5 random tasks based on weights
  const selectedTemplates = selectRandomTasks(TASK_TEMPLATES, 4);

  const tasks: DailyTask[] = selectedTemplates.map((template, index) => ({
    id: `task-${date.getTime()}-${index}`,
    type: template.taskType,
    title: template.title,
    description: template.description,
    emoji: template.emoji,
    difficulty: template.difficulty,
    target: template.defaultTarget,
    current: 0,
    rewardStars: template.rewardStars,
    rewardBadge: template.rewardBadge,
    isCompleted: false
  }));

  return {
    id: `daily-${date.getTime()}-${childId}`,
    childId,
    taskDate: date,
    tasks,
    isCompleted: false,
    streakCount: 0,
    totalCompleted: 0,
    createdAt: date,
    updatedAt: date
  };
}

function selectRandomTasks(templates: TaskTemplate[], count: number): TaskTemplate[] {
  // Weighted random selection
  const weightedTemplates: TaskTemplate[] = [];

  templates.forEach(template => {
    for (let i = 0; i < template.weight; i++) {
      weightedTemplates.push(template);
    }
  });

  const selected: TaskTemplate[] = [];
  const used = new Set<string>();

  while (selected.length < count && selected.length < weightedTemplates.length) {
    const randomIndex = Math.floor(Math.random() * weightedTemplates.length);
    const template = weightedTemplates[randomIndex];

    if (!used.has(template.id)) {
      selected.push(template);
      used.add(template.id);
    }
  }

  return selected;
}

export function updateTaskProgress(
  tasks: DailyTasks,
  progress: TaskProgressState
): DailyTasks {
  const updatedTasks = tasks.tasks.map(task => {
    if (task.isCompleted) return task;

    let current = task.current;

    switch (task.type) {
      case 'words':
        current = Math.min(progress.wordsLearned, task.target);
        break;
      case 'conversations':
        current = Math.min(progress.conversationsCompleted, task.target);
        break;
      case 'stars':
        current = Math.min(progress.starsCollected, task.target);
        break;
      case 'streak':
        current = Math.min(progress.currentStreak, task.target);
        break;
      case 'time':
        current = Math.min(progress.timeSpentMinutes, task.target);
        break;
      case 'scene':
        current = Math.min(progress.scenesVisited.length, task.target);
        break;
    }

    const isCompleted = current >= task.target;

    return {
      ...task,
      current,
      isCompleted,
      completedAt: isCompleted ? new Date() : undefined
    };
  });

  const allCompleted = updatedTasks.every(t => t.isCompleted);

  return {
    ...tasks,
    tasks: updatedTasks,
    isCompleted: allCompleted,
    completedAt: allCompleted ? new Date() : undefined,
    updatedAt: new Date()
  };
}

export function calculateTaskCompletionPercentage(task: DailyTask): number {
  return Math.min(100, Math.round((task.current / task.target) * 100));
}

export function getTotalRewards(tasks: DailyTasks): { stars: number; badges: string[] } {
  const completedTasks = tasks.tasks.filter(t => t.isCompleted);

  return {
    stars: completedTasks.reduce((sum, t) => sum + t.rewardStars, 0),
    badges: completedTasks.filter(t => t.rewardBadge).map(t => t.rewardBadge!)
  };
}

export function getDifficultyColor(difficulty: TaskDifficulty): string {
  switch (difficulty) {
    case 'easy':
      return '#22C55E'; // Green
    case 'medium':
      return '#F59E0B'; // Yellow
    case 'hard':
      return '#EF4444'; // Red
    default:
      return '#6B7280';
  }
}

export function getDifficultyLabel(difficulty: TaskDifficulty): string {
  switch (difficulty) {
    case 'easy':
      return 'Easy';
    case 'medium':
      return 'Medium';
    case 'hard':
      return 'Hard';
    default:
      return 'Unknown';
  }
}
