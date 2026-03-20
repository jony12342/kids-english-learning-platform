# Database Migration Guide - Phase 2 Parent Dashboard

## Migration: 008_add_parent_features.sql

This migration creates the database tables needed for the Parent Dashboard and Controls.

## Tables Created

### 1. parent_settings
Stores parental control settings for each child

**Columns:**
- `id` - UUID primary key
- `child_id` - References children table (unique)
- `daily_time_limit` - Daily time limit in minutes (default: 30)
- `allowed_hours` - Array of allowed hours (0-23, 24-hour format)
- `content_restrictions` - JSONB with content control settings
- `pin_code` - 4-digit PIN for parental access
- `notifications_enabled` - Enable/disable notifications
- `weekly_report_day` - Day for weekly report (saturday, sunday, etc.)
- `created_at`, `updated_at` - Timestamps

**Content Restrictions Structure:**
```json
{
  "allowGarden": true,
  "allowForest": true,
  "allowKitchen": true,
  "maxDifficulty": "all" // or "easy", "medium", "hard"
}
```

### 2. learning_statistics
Daily learning statistics for reporting

**Columns:**
- `id` - UUID primary key
- `child_id` - References children table
- `stat_date` - Date of the statistics
- `words_learned` - Number of words learned
- `conversations_completed` - Number of conversations
- `stars_earned` - Stars collected
- `time_spent_minutes` - Time spent learning
- `scenes_visited` - Array of visited scenes
- `tasks_completed` - Number of tasks completed
- `badges_earned` - Array of badge IDs earned
- `created_at` - Timestamp

**Unique Constraint:** One record per child per day

### 3. activity_logs
Activity log for tracking child actions

**Columns:**
- `id` - UUID primary key
- `child_id` - References children table
- `activity_type` - Type of activity
- `activity_details` - JSONB with activity-specific data
- `timestamp` - When the activity occurred

**Activity Types:**
- `login` - User logged in
- `logout` - User logged out
- `scene_visit` - Visited a learning scene
- `task_complete` - Completed a task
- `badge_earn` - Earned a badge
- `character_create` - Created/edited character

## Database Functions

### get_weekly_statistics
Aggregates statistics for a week range

**Parameters:**
- `child_param` - Child UUID
- `start_date_param` - Start date (Sunday)

**Returns:**
- `words_learned` - Total words learned
- `conversations_completed` - Total conversations
- `stars_earned` - Total stars
- `time_spent_minutes` - Total time
- `tasks_completed` - Total tasks
- `badges_earned_count` - Unique badges earned

**Usage:**
```sql
SELECT * FROM get_weekly_statistics(
  'child-uuid',
  '2026-03-15'::DATE
);
```

## How to Execute

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"

### Step 2: Copy and Execute the Migration
1. Open the file: `supabase/migrations/008_add_parent_features.sql`
2. Copy the entire contents
3. Paste into the SQL Editor
4. Click "Run" or press Cmd+Enter (Mac) / Ctrl+Enter (Windows)

### Step 3: Verify Success
You should see output like:
```
Parent Settings:      | 0
Learning Statistics:  | 0
Activity Logs:        | 0
```

(0 is expected as these tables start empty)

## Troubleshooting

**Error: "function uuid_generate_v4() does not exist"**
- Solution: Enable the UUID extension by running:
  ```sql
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  ```

**Error: "function update_updated_at_column() does not exist"**
- Solution: This function should exist from previous migrations

## Feature Highlights

### 1. PIN Authentication
- 4-digit PIN required for parental access
- Prevents children from accessing controls
- Secure entry screen
- Demo mode accepts any 4 digits

### 2. Dashboard Tab
**Today's Statistics:**
- Words learned today
- Conversations completed
- Stars earned
- Time spent

**Weekly Overview:**
- Total words learned
- Total conversations
- Total stars
- Total time spent
- Tasks completed
- Badges earned

**Recent Activity:**
- Login/logout events
- Scene visits with duration
- Task completions
- Badge achievements
- Timestamp for each activity

### 3. Settings Tab
**Time Limits:**
- Daily time limit slider (10-120 minutes)
- Visual progress indicator
- Real-time updates
- Automatic enforcement

**Allowed Hours:**
- Select allowed hours (0-23)
- Visual grid display
- Restricts access outside hours
- Helps manage screen time

**Content Control:**
- Enable/disable each scene
- Set maximum difficulty
- Block specific content
- Age-appropriate filters

**Security:**
- Change PIN code
- Enable/disable notifications
- Manage security settings

### 4. Reports Tab
**Learning Progress:**
- Strong areas identification
- Areas for improvement
- Visual progress indicators
- Trend analysis

**Weekly Reports:**
- Configurable report day
- Email delivery option
- PDF export
- CSV data export

**Data Export:**
- PDF Report - Detailed formatted report
- CSV Data - Raw data for analysis
- Email Report - Send to inbox

## Educational Value for Parents

### Progress Monitoring
- Real-time activity tracking
- Daily/weekly statistics
- Learning trends
- Achievement tracking

### Control & Safety
- Screen time management
- Content filtering
- Age-appropriate settings
- Safe learning environment

### Insight & Analysis
- Learning patterns
- Strength identification
- Area improvement tracking
- Data-driven decisions

## Implementation Notes

### Activity Logging
Activities should be logged throughout the app:
```typescript
// Example: Logging scene visit
await supabase.from('activity_logs').insert({
  child_id: childId,
  activity_type: 'scene_visit',
  activity_details: {
    scene: 'garden',
    duration: 15 // minutes
  }
});
```

### Statistics Updates
Update learning statistics daily or on key events:
```typescript
// Example: Daily stat update
await supabase.from('learning_statistics').upsert({
  child_id: childId,
  stat_date: new Date().toISOString().split('T')[0],
  words_learned: newWordsCount,
  conversations_completed: newConvCount,
  stars_earned: newStarsCount,
  time_spent_minutes: totalTimeSpent,
  scenes_visited: visitedScenes,
  tasks_completed: completedTasks,
  badges_earned: earnedBadges
});
```

### Time Limit Enforcement
Check time limit before allowing access:
```typescript
// Check daily time limit
const todayStats = await getTodayStats(childId);
if (todayStats.timeSpentMinutes >= settings.dailyTimeLimit) {
  // Show time limit reached message
  return;
}
```

### Hour Restrictions
Validate current time against allowed hours:
```typescript
// Check if current hour is allowed
const currentHour = new Date().getHours();
if (!settings.allowedHours.includes(currentHour)) {
  // Show outside allowed hours message
  return;
}
```

## Parent Dashboard Features

### Three Main Tabs

1. **Dashboard** - Overview and monitoring
   - Today's stats at a glance
   - Weekly summary
   - Recent activity feed

2. **Settings** - Configuration and control
   - Time limits
   - Content restrictions
   - Security settings

3. **Reports** - Analysis and export
   - Progress reports
   - Data export
   - Report scheduling

### Visual Design
- Clean, professional interface
- Color-coded statistics
- Icon-based navigation
- Mobile-responsive
- Intuitive controls

## Next Steps

After successful migration:
1. Start the development server: `npm run dev`
2. Visit http://localhost:3001/parent
3. Enter any 4-digit PIN (demo mode)
4. Explore dashboard tab
5. Test settings controls
6. View reports tab
7. Export sample data

## Rollback (if needed)

If you need to rollback this migration:

```sql
DROP TRIGGER IF EXISTS update_parent_settings_updated_at ON parent_settings;
DROP FUNCTION IF EXISTS get_weekly_statistics;
DROP TABLE IF EXISTS activity_logs;
DROP TABLE IF EXISTS learning_statistics;
DROP TABLE IF EXISTS parent_settings;
```

## Future Enhancements

Potential additions to parent features:
- Push notifications for reports
- Multiple children management
- Comparison with peers (anonymized)
- AI-powered learning insights
- Goal setting and tracking
- Reward management
- Screen time graphs
- Learning streak visualization
- Custom report templates
- Alert thresholds
