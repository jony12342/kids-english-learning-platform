-- ============================================
-- Phase 2: Parent Dashboard & Controls
-- 家长端仪表盘和控制功能
-- ============================================

-- Parent settings table
CREATE TABLE IF NOT EXISTS parent_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL UNIQUE REFERENCES children(id) ON DELETE CASCADE,
  daily_time_limit INTEGER DEFAULT 30, -- Daily time limit in minutes
  allowed_hours INTEGER[] DEFAULT '{9,10,11,12,13,14,15,16,17,18,19,20}', -- Allowed hours (24-hour format)
  content_restrictions JSONB DEFAULT '{}', -- Content control settings
  pin_code VARCHAR(10), -- 4-digit PIN for parental controls
  notifications_enabled BOOLEAN DEFAULT true,
  weekly_report_day VARCHAR(10) DEFAULT 'sunday', -- Day for weekly report
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learning statistics table (for reports)
CREATE TABLE IF NOT EXISTS learning_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  stat_date DATE NOT NULL,
  words_learned INTEGER DEFAULT 0,
  conversations_completed INTEGER DEFAULT 0,
  stars_earned INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  scenes_visited TEXT[] DEFAULT '{}',
  tasks_completed INTEGER DEFAULT 0,
  badges_earned TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(child_id, stat_date)
);

-- Activity log table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL, -- 'login', 'scene_visit', 'task_complete', 'badge_earn', etc.
  activity_details JSONB DEFAULT '{}', -- Activity-specific data
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings for new children (will be triggered by application logic)
-- This is a template that the app will use when creating parent settings

-- Indexes
CREATE INDEX IF NOT EXISTS idx_parent_settings_child ON parent_settings(child_id);
CREATE INDEX IF NOT EXISTS idx_learning_stats_child ON learning_statistics(child_id);
CREATE INDEX IF NOT EXISTS idx_learning_stats_date ON learning_statistics(stat_date);
CREATE INDEX IF NOT EXISTS idx_activity_logs_child ON activity_logs(child_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_type ON activity_logs(activity_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON activity_logs(timestamp);

-- RLS Policies
ALTER TABLE parent_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_full_access" ON parent_settings;
CREATE POLICY "anon_full_access" ON parent_settings
  FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON learning_statistics;
CREATE POLICY "anon_full_access" ON learning_statistics
  FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON activity_logs;
CREATE POLICY "anon_full_access" ON activity_logs
  FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON parent_settings;
CREATE POLICY "service_role_all_access" ON parent_settings
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON learning_statistics;
CREATE POLICY "service_role_all_access" ON learning_statistics
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON activity_logs;
CREATE POLICY "service_role_all_access" ON activity_logs
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================
-- Update trigger for updated_at
-- ============================================
CREATE TRIGGER update_parent_settings_updated_at
  BEFORE UPDATE ON parent_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Helper function to get weekly statistics
-- ============================================
CREATE OR REPLACE FUNCTION get_weekly_statistics(child_param UUID, start_date_param DATE)
RETURNS TABLE (
  words_learned BIGINT,
  conversations_completed BIGINT,
  stars_earned BIGINT,
  time_spent_minutes BIGINT,
  tasks_completed BIGINT,
  badges_earned_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(SUM(ls.words_learned), 0)::BIGINT,
    COALESCE(SUM(ls.conversations_completed), 0)::BIGINT,
    COALESCE(SUM(ls.stars_earned), 0)::BIGINT,
    COALESCE(SUM(ls.time_spent_minutes), 0)::BIGINT,
    COALESCE(SUM(ls.tasks_completed), 0)::BIGINT,
    COALESCE(SUM(array_length(ls.badges_earned, 1)), 0)::BIGINT
  FROM learning_statistics ls
  WHERE ls.child_id = child_param
    AND ls.stat_date >= start_date_param
    AND ls.stat_date <= start_date_param + INTERVAL '6 days';
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Verification
-- ============================================
SELECT 'Parent Settings:' as info, COUNT(*) as count FROM parent_settings;
SELECT 'Learning Statistics:' as info, COUNT(*) as count FROM learning_statistics;
SELECT 'Activity Logs:' as info, COUNT(*) as count FROM activity_logs;
