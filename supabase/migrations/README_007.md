# Database Migration Guide - Phase 2 Daily Tasks System

## Migration: 007_add_daily_tasks.sql

This migration creates the database tables needed for the Daily Tasks System.

## Tables Created

### 1. daily_tasks
Stores daily tasks and progress for each child

**Columns:**
- `id` - UUID primary key
- `child_id` - References children table
- `task_date` - Date of the tasks
- `tasks` - JSONB array of task objects with progress
- `is_completed` - Whether all daily tasks are completed
- `completed_at` - Timestamp when all tasks completed
- `streak_count` - Consecutive days completed
- `total_completed` - Total tasks ever completed
- `created_at`, `updated_at` - Timestamps

**Unique Constraint:** One record per child per day (UNIQUE(child_id, task_date))

### 2. task_templates
Template tasks for generating daily tasks

**Columns:**
- `id` - UUID primary key
- `task_type` - 'words', 'conversations', 'stars', 'streak', 'time', 'scene'
- `title` - Task title
- `description` - Task description
- `emoji` - Emoji icon
- `difficulty` - 'easy', 'medium', 'hard'
- `default_target` - Default target value
- `reward_stars` - Base star reward
- `reward_badge` - Optional badge reward
- `is_active` - Whether template is active
- `weight` - Probability weight (higher = more likely to be selected)

**Task Types Inserted:**

**Word Learning Tasks:**
- Learn 5 New Words (📚) - Easy - 2 stars
- Learn 10 New Words (📖) - Medium - 5 stars + badge
- Learn 15 New Words (✨) - Hard - 10 stars + badge

**Conversation Tasks:**
- Complete 3 Conversations (💬) - Easy - 2 stars
- Complete 5 Conversations (🎤) - Medium - 5 stars + badge
- Complete 7 Conversations (🌟) - Hard - 10 stars + badge

**Star Collection Tasks:**
- Collect 10 Stars (⭐) - Easy - 2 stars
- Collect 25 Stars (🌟) - Medium - 5 stars + badge
- Collect 50 Stars (💫) - Hard - 10 stars + badge

**Scene-Specific Tasks:**
- Visit Magic Garden (🌸) - Easy - 1 star
- Visit Forest Adventure (🌲) - Easy - 1 star
- Bake a Cake (🧁) - Medium - 3 stars + badge
- Complete 2 Different Scenes (🎯) - Medium - 3 stars + badge

**Streak Tasks:**
- Maintain Your Streak (🔥) - Easy - 1 star
- 3-Day Streak (⚡) - Medium - 5 stars + badge
- 7-Day Streak (💪) - Hard - 15 stars + badge

**Time-Based Tasks:**
- Learn for 10 Minutes (⏱️) - Easy - 2 stars
- Learn for 20 Minutes (⏰) - Medium - 5 stars + badge
- Learn for 30 Minutes (🏆) - Hard - 10 stars + badge

### 3. user_badges
Tracks badges earned by users

**Columns:**
- `id` - UUID primary key
- `child_id` - References children table
- `badge_id` - Unique badge identifier
- `badge_name` - Display name
- `badge_emoji` - Emoji icon
- `badge_description` - Description
- `earned_at` - Timestamp when earned

**Unique Constraint:** One record per badge per child

## How to Execute

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"

### Step 2: Copy and Execute the Migration
1. Open the file: `supabase/migrations/007_add_daily_tasks.sql`
2. Copy the entire contents
3. Paste into the SQL Editor
4. Click "Run" or press Cmd+Enter (Mac) / Ctrl+Enter (Windows)

### Step 3: Verify Success
You should see output like:
```
Task Templates: | 18
```

And a table showing all 18 task templates.

## Troubleshooting

**Error: "function uuid_generate_v4() does not exist"**
- Solution: Enable the UUID extension by running:
  ```sql
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  ```

**Error: "function update_updated_at_column() does not exist"**
- Solution: This function should exist from previous migrations. If not, create it:
  ```sql
  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ language 'plpgsql';
  ```

## Task Generation System

### Weighted Random Selection
Tasks are selected based on their `weight` value:
- Higher weight = more likely to be selected
- Easy tasks have weight 10
- Medium tasks have weight 8
- Hard tasks have weight 5

### Daily Task Generation
1. Each day, 4 random tasks are selected from templates
2. Selection uses weighted random algorithm
3. Ensures variety in task types
4. Different difficulties every day

### Task Types

**Words (📚📖✨)**
- Track new words learned
- Updated when user learns words in Garden
- Progress: wordsLearned counter

**Conversations (💬🎤🌟)**
- Track conversations completed
- Updated after each conversation in Forest
- Progress: conversationsCompleted counter

**Stars (⭐🌟💫)**
- Track total stars collected
- Updated across all activities
- Progress: starsCollected counter

**Streak (🔥⚡💪)**
- Track consecutive days of learning
- Updated when daily tasks completed
- Progress: currentStreak counter

**Time (⏱️⏰🏆)**
- Track time spent learning
- Updated based on session duration
- Progress: timeSpentMinutes counter

**Scene (🌸🌲🧁🎯)**
- Track scene visits
- Updated when user visits scenes
- Progress: scenesVisited array

## Badge System

### Available Badges

**Learning Badges:**
- Word Master (📖) - Learn 10 words in one day
- Word Champion (✨) - Learn 15 words in one day

**Conversation Badges:**
- Chat Star (🎤) - Complete 5 conversations
- Chat Master (🌟) - Complete 7 conversations

**Collection Badges:**
- Star Collector (🌟) - Collect 25 stars
- Star Legend (💫) - Collect 50 stars

**Activity Badges:**
- Master Baker (🧁) - Bake a cake
- Explorer (🎯) - Complete 2 different scenes

**Streak Badges:**
- Streak Keeper (⚡) - 3-day learning streak
- Streak Master (💪) - 7-day learning streak

**Time Badges:**
- Time Master (⏰) - Learn for 20 minutes
- Time Legend (🏆) - Learn for 30 minutes

### Badge Rewards
- Awarded when task is completed
- Stored in user_badges table
- Displayed on profile page
- Permanent achievement record

## Feature Highlights

### 1. Task Variety
- 18 different task templates
- 6 task categories
- 3 difficulty levels
- 4 random tasks daily

### 2. Progress Tracking
- Real-time progress updates
- Visual progress bars
- Percentage completion
- Current vs target display

### 3. Reward System
- Stars for completing tasks
- Badges for achievements
- Streak tracking
- Daily completion bonus

### 4. Difficulty System
- Easy tasks (Green) - Quick wins
- Medium tasks (Yellow) - Moderate challenge
- Hard tasks (Red) - Significant challenge

### 5. Motivation Features
- Streak counter (consecutive days)
- Total completed tasks
- Badge collection
- Daily goals

## Educational Value

### Goal Setting
- Daily learning targets
- Achievable goals
- Progressive difficulty

### Consistency Building
- Streak system encourages daily use
- Habit formation
- Regular practice

### Achievement Recognition
- Badges for accomplishments
- Star collection
- Progress visualization

### Engagement
- Variety of tasks
- Different learning modes
- Clear objectives

## Next Steps

After successful migration:
1. Start the development server: `npm run dev`
2. Visit http://localhost:3001/tasks
3. View today's generated tasks
4. Test progress tracking (demo button)
5. Verify task completion logic
6. Check badge awarding system
7. Test streak calculation

## Rollback (if needed)

If you need to rollback this migration:

```sql
DROP TRIGGER IF EXISTS update_daily_tasks_updated_at ON daily_tasks;
DROP TABLE IF EXISTS daily_tasks;
DROP TABLE IF EXISTS task_templates;
DROP TABLE IF EXISTS user_badges;
```

## Implementation Notes

### Task Progress JSON Structure
```json
{
  "tasks": [
    {
      "id": "task-1234567890-0",
      "type": "words",
      "title": "Learn 5 New Words",
      "description": "Discover and learn 5 new English words!",
      "emoji": "📚",
      "difficulty": "easy",
      "target": 5,
      "current": 3,
      "rewardStars": 2,
      "isCompleted": false
    }
  ],
  "isCompleted": false,
  "streakCount": 2,
  "totalCompleted": 15
}
```

### Streak Calculation
1. Check if yesterday's tasks were completed
2. If yes, increment streak
3. If no, reset to 0
4. If today completed, streak continues

### Task Completion Logic
- Each task tracks its own progress
- Task marked complete when current >= target
- Daily tasks marked complete when ALL tasks complete
- Awards distributed upon completion

## Future Enhancements

Potential additions to the task system:
- Weekly challenges
- Special event tasks
- Multiplayer tasks
- Task leaderboards
- Custom task creation
- Task sharing
- Seasonal events
- Bonus tasks
