-- ============================================
-- Phase 2: Daily Tasks System
-- 每日任务系统
-- ============================================

-- Daily tasks table
CREATE TABLE IF NOT EXISTS daily_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  task_date DATE NOT NULL,
  tasks JSONB NOT NULL, -- Task details and progress
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  streak_count INTEGER DEFAULT 0, -- Consecutive days completed
  total_completed INTEGER DEFAULT 0, -- Total tasks ever completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(child_id, task_date)
);

-- Task templates (for generating daily tasks)
CREATE TABLE IF NOT EXISTS task_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_type VARCHAR(50) NOT NULL, -- 'words', 'conversations', 'stars', 'streak', 'time', 'scene'
  title VARCHAR(200) NOT NULL,
  description TEXT,
  emoji VARCHAR(10) NOT NULL,
  difficulty VARCHAR(20) NOT NULL, -- 'easy', 'medium', 'hard'
  default_target INTEGER NOT NULL, -- Default target value
  reward_stars INTEGER DEFAULT 1, -- Base star reward
  reward_badge TEXT, -- Optional badge reward
  is_active BOOLEAN DEFAULT true,
  weight INTEGER DEFAULT 1, -- Probability weight (higher = more likely)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert task templates
INSERT INTO task_templates (task_type, title, description, emoji, difficulty, default_target, reward_stars, reward_badge, weight) VALUES
  -- Word learning tasks
  ('words', 'Learn 5 New Words', 'Discover and learn 5 new English words!', '📚', 'easy', 5, 2, NULL, 10),
  ('words', 'Learn 10 New Words', 'Master 10 new English words today!', '📖', 'medium', 10, 5, 'word_master', 8),
  ('words', 'Learn 15 New Words', 'Challenge yourself with 15 new words!', '✨', 'hard', 15, 10, 'word_champion', 5),

  -- Conversation tasks
  ('conversations', 'Complete 3 Conversations', 'Have 3 conversations with AI teachers!', '💬', 'easy', 3, 2, NULL, 10),
  ('conversations', 'Complete 5 Conversations', 'Practice speaking with 5 conversations!', '🎤', 'medium', 5, 5, 'chat_star', 8),
  ('conversations', 'Complete 7 Conversations', 'Become a conversation expert!', '🌟', 'hard', 7, 10, 'chat_master', 5),

  -- Star collection tasks
  ('stars', 'Collect 10 Stars', 'Earn 10 stars through learning activities!', '⭐', 'easy', 10, 2, NULL, 10),
  ('stars', 'Collect 25 Stars', 'Reach for the stars - collect 25!', '🌟', 'medium', 25, 5, 'star_collector', 8),
  ('stars', 'Collect 50 Stars', 'Star champion - collect 50 stars!', '💫', 'hard', 50, 10, 'star_legend', 5),

  -- Scene-specific tasks
  ('scene', 'Visit Magic Garden', 'Explore the Magic Garden and learn words!', '🌸', 'easy', 1, 1, NULL, 10),
  ('scene', 'Visit Forest Adventure', 'Talk with animals in the forest!', '🌲', 'easy', 1, 1, NULL, 10),
  ('scene', 'Bake a Cake', 'Go to the kitchen and bake a cake!', '🧁', 'medium', 1, 3, 'baker_badge', 8),
  ('scene', 'Complete 2 Different Scenes', 'Try out 2 different learning scenes!', '🎯', 'medium', 2, 3, 'explorer', 7),

  -- Streak tasks
  ('streak', 'Maintain Your Streak', 'Keep your learning streak alive!', '🔥', 'easy', 1, 1, NULL, 10),
  ('streak', '3-Day Streak', 'Complete tasks for 3 days in a row!', '⚡', 'medium', 3, 5, 'streak_keeper', 8),
  ('streak', '7-Day Streak', 'Week warrior - 7 day streak!', '💪', 'hard', 7, 15, 'streak_master', 5),

  -- Time-based tasks
  ('time', 'Learn for 10 Minutes', 'Spend 10 minutes learning today!', '⏱️', 'easy', 10, 2, NULL, 10),
  ('time', 'Learn for 20 Minutes', 'Dedicate 20 minutes to learning!', '⏰', 'medium', 20, 5, 'time_master', 8),
  ('time', 'Learn for 30 Minutes', 'Super learner - 30 minutes!', '🏆', 'hard', 30, 10, 'time_legend', 5)
ON CONFLICT (id) DO NOTHING;

-- Badges table (for tracking earned badges)
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  badge_id VARCHAR(50) NOT NULL,
  badge_name VARCHAR(100) NOT NULL,
  badge_emoji VARCHAR(10) NOT NULL,
  badge_description TEXT,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(child_id, badge_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_daily_tasks_child ON daily_tasks(child_id);
CREATE INDEX IF NOT EXISTS idx_daily_tasks_date ON daily_tasks(task_date);
CREATE INDEX IF NOT EXISTS idx_daily_tasks_completed ON daily_tasks(is_completed);
CREATE INDEX IF NOT EXISTS idx_task_templates_type ON task_templates(task_type);
CREATE INDEX IF NOT EXISTS idx_task_templates_difficulty ON task_templates(difficulty);
CREATE INDEX IF NOT EXISTS idx_user_badges_child ON user_badges(child_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_badge ON user_badges(badge_id);

-- RLS Policies
ALTER TABLE daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_full_access" ON daily_tasks;
CREATE POLICY "anon_full_access" ON daily_tasks
  FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON task_templates;
CREATE POLICY "anon_full_access" ON task_templates
  FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON user_badges;
CREATE POLICY "anon_full_access" ON user_badges
  FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON daily_tasks;
CREATE POLICY "service_role_all_access" ON daily_tasks
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON task_templates;
CREATE POLICY "service_role_all_access" ON task_templates
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON user_badges;
CREATE POLICY "service_role_all_access" ON user_badges
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================
-- Update trigger for updated_at
-- ============================================
CREATE TRIGGER update_daily_tasks_updated_at
  BEFORE UPDATE ON daily_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Verification
-- ============================================
SELECT 'Task Templates:' as info, COUNT(*) as count FROM task_templates;
SELECT * FROM task_templates ORDER BY difficulty, weight DESC;
