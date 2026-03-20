-- =====================================================
-- Phase 2 完整数据库迁移 - 一次性执行
-- Complete Phase 2 Database Migration - Execute All at Once
-- =====================================================
-- 此文件包含了004-008所有迁移的合并内容
-- This file contains merged content from migrations 004-008
--
-- 执行方法 / How to execute:
-- 1. 打开 Supabase Dashboard -> SQL Editor
-- 2. 复制此文件全部内容
-- 3. 粘贴到SQL Editor
-- 4. 点击 Run
-- =====================================================

-- ============================================
-- 004: Scene Progress & Forest Animals
-- ============================================

-- Create scene_progress table
CREATE TABLE IF NOT EXISTS scene_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    scene_type TEXT NOT NULL, -- 'forest', 'kitchen', 'garden', etc.
    unlocked_areas TEXT[] DEFAULT '{}',
    completed_tasks TEXT[] DEFAULT '{}',
    total_score INTEGER DEFAULT 0,
    conversations_completed INTEGER DEFAULT 0,
    stars_earned INTEGER DEFAULT 0,
    last_played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(child_id, scene_type)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_scene_progress_child ON scene_progress(child_id);
CREATE INDEX IF NOT EXISTS idx_scene_progress_type ON scene_progress(scene_type);

-- Enable RLS
ALTER TABLE scene_progress ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "anon_full_access" ON scene_progress;
CREATE POLICY "anon_full_access" ON scene_progress
    FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON scene_progress;
CREATE POLICY "service_role_all_access" ON scene_progress
    FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 005: Kitchen Scene Tables
-- ============================================

-- Create kitchen_ingredients table
CREATE TABLE IF NOT EXISTS kitchen_ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    emoji TEXT NOT NULL,
    category TEXT NOT NULL, -- 'dry', 'wet', 'decoration'
    difficulty TEXT DEFAULT 'easy', -- 'easy', 'medium', 'hard'
    calories_per_100g INTEGER,
    is_healthy BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create kitchen_utensils table
CREATE TABLE IF NOT EXISTS kitchen_utensils (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    emoji TEXT NOT NULL,
    category TEXT NOT NULL, -- 'measuring', 'mixing', 'baking', 'decorating'
    difficulty TEXT DEFAULT 'easy',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create kitchen_verbs table
CREATE TABLE IF NOT EXISTS kitchen_verbs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    word TEXT NOT NULL UNIQUE,
    past_tense TEXT,
    category TEXT NOT NULL, -- 'action', 'state', 'measurement'
    difficulty TEXT DEFAULT 'easy',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cake_recipes table
CREATE TABLE IF NOT EXISTS cake_recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    emoji TEXT NOT NULL,
    description TEXT,
    difficulty TEXT DEFAULT 'easy', -- 'easy', 'medium', 'hard'
    ingredients JSONB NOT NULL, -- Array of ingredient IDs
    utensils JSONB NOT NULL, -- Array of utensil IDs
    verbs JSONB NOT NULL, -- Array of verb IDs
    steps TEXT[] NOT NULL,
    prep_time_minutes INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for kitchen tables
ALTER TABLE kitchen_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE kitchen_utensils ENABLE ROW LEVEL SECURITY;
ALTER TABLE kitchen_verbs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cake_recipes ENABLE ROW LEVEL SECURITY;

-- Create policies for kitchen tables
DROP POLICY IF EXISTS "anon_full_access" ON kitchen_ingredients;
CREATE POLICY "anon_full_access" ON kitchen_ingredients FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON kitchen_utensils;
CREATE POLICY "anon_full_access" ON kitchen_utensils FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON kitchen_verbs;
CREATE POLICY "anon_full_access" ON kitchen_verbs FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON cake_recipes;
CREATE POLICY "anon_full_access" ON cake_recipes FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 006: Character System Tables
-- ============================================

-- Create avatar_configurations table
CREATE TABLE IF NOT EXISTS avatar_configurations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    emoji TEXT NOT NULL,
    description TEXT,
    base_color TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create character_accessories table
CREATE TABLE IF NOT EXISTS character_accessories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    emoji TEXT NOT NULL,
    category TEXT NOT NULL, -- 'hat', 'glasses', 'clothing', 'accessory'
    color_variants TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create characters table
CREATE TABLE IF NOT EXISTS characters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    avatar_type TEXT NOT NULL REFERENCES avatar_configurations(name),
    color_config JSONB NOT NULL DEFAULT '{}',
    accessory_ids UUID[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_characters_child ON characters(child_id);
CREATE INDEX IF NOT EXISTS idx_characters_active ON characters(is_active);

-- Enable RLS
ALTER TABLE avatar_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_accessories ENABLE ROW LEVEL SECURITY;
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "anon_full_access" ON avatar_configurations;
CREATE POLICY "anon_full_access" ON avatar_configurations FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON character_accessories;
CREATE POLICY "anon_full_access" ON character_accessories FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON characters;
CREATE POLICY "anon_full_access" ON characters FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 007: Daily Tasks Tables
-- ============================================

-- Create task_templates table
CREATE TABLE IF NOT EXISTS task_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    task_type TEXT NOT NULL, -- 'words', 'conversations', 'time', 'scenes'
    difficulty TEXT DEFAULT 'easy',
    target_value INTEGER NOT NULL,
    star_reward INTEGER DEFAULT 1,
    emoji TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create daily_tasks table
CREATE TABLE IF NOT EXISTS daily_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    task_date DATE NOT NULL,
    tasks JSONB NOT NULL DEFAULT '{}',
    streak_count INTEGER DEFAULT 0,
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(child_id, task_date)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_daily_tasks_child ON daily_tasks(child_id);
CREATE INDEX IF NOT EXISTS idx_daily_tasks_date ON daily_tasks(task_date);

-- Enable RLS
ALTER TABLE task_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tasks ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "anon_full_access" ON task_templates;
CREATE POLICY "anon_full_access" ON task_templates FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON daily_tasks;
CREATE POLICY "anon_full_access" ON daily_tasks FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 008: Parent Features & Activity Logs
-- ============================================

-- Create learning_statistics table
CREATE TABLE IF NOT EXISTS learning_statistics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    stat_date DATE NOT NULL,
    words_learned INTEGER DEFAULT 0,
    conversations_completed INTEGER DEFAULT 0,
    stars_earned INTEGER DEFAULT 0,
    time_spent_minutes INTEGER DEFAULT 0,
    scenes_visited TEXT[] DEFAULT '{}',
    tasks_completed INTEGER DEFAULT 0,
    badges_earned TEXT[] DEFAULT '{}',
    current_streak INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(child_id, stat_date)
);

-- Create parent_settings table
CREATE TABLE IF NOT EXISTS parent_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    daily_time_limit INTEGER DEFAULT 30, -- minutes
    allowed_hours INTEGER[] DEFAULT ARRAY[9,10,11,12,13,14,15,16,17,18,19,20],
    content_restrictions JSONB DEFAULT '{}',
    pin_code TEXT,
    notifications_enabled BOOLEAN DEFAULT true,
    weekly_report_day TEXT DEFAULT 'sunday',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(child_id)
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL, -- 'login', 'scene_visit', 'task_complete', 'badge_earn', etc.
    activity_details JSONB DEFAULT '{}',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_learning_stats_child ON learning_statistics(child_id);
CREATE INDEX IF NOT EXISTS idx_learning_stats_date ON learning_statistics(stat_date);
CREATE INDEX IF NOT EXISTS idx_parent_settings_child ON parent_settings(child_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_child ON activity_logs(child_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_type ON activity_logs(activity_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON activity_logs(timestamp);

-- Enable RLS
ALTER TABLE learning_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "anon_full_access" ON learning_statistics;
CREATE POLICY "anon_full_access" ON learning_statistics FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON parent_settings;
CREATE POLICY "anon_full_access" ON parent_settings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON activity_logs;
CREATE POLICY "anon_full_access" ON activity_logs FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- Create Test Child User
-- ============================================

INSERT INTO children (id, parent_id, name, language_level, is_active)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
    '测试儿童',
    'beginner',
    true
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- Verification Query
-- ============================================

SELECT 'Phase 2 Tables Created Successfully!' as status;
SELECT
    'scene_progress' as table_name, COUNT(*) as count FROM scene_progress
UNION ALL
SELECT 'kitchen_ingredients', COUNT(*) FROM kitchen_ingredients
UNION ALL
SELECT 'kitchen_utensils', COUNT(*) FROM kitchen_utensils
UNION ALL
SELECT 'kitchen_verbs', COUNT(*) FROM kitchen_verbs
UNION ALL
SELECT 'cake_recipes', COUNT(*) FROM cake_recipes
UNION ALL
SELECT 'avatar_configurations', COUNT(*) FROM avatar_configurations
UNION ALL
SELECT 'character_accessories', COUNT(*) FROM character_accessories
UNION ALL
SELECT 'characters', COUNT(*) FROM characters
UNION ALL
SELECT 'task_templates', COUNT(*) FROM task_templates
UNION ALL
SELECT 'daily_tasks', COUNT(*) FROM daily_tasks
UNION ALL
SELECT 'learning_statistics', COUNT(*) FROM learning_statistics
UNION ALL
SELECT 'parent_settings', COUNT(*) FROM parent_settings
UNION ALL
SELECT 'activity_logs', COUNT(*) FROM activity_logs
UNION ALL
SELECT 'children (test user)', COUNT(*) FROM children WHERE id = '00000000-0000-0000-0000-000000000001';
