-- ============================================
-- Phase 2: Scene Progress Table
-- 场景进度表
-- ============================================

CREATE TABLE IF NOT EXISTS scene_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  scene_type VARCHAR(50) NOT NULL, -- 'forest', 'kitchen'
  unlocked_areas TEXT[] DEFAULT '{}',
  completed_tasks TEXT[] DEFAULT '{}',
  total_score INTEGER DEFAULT 0,
  conversations_completed INTEGER DEFAULT 0,
  stars_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(child_id, scene_type)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_scene_progress_child ON scene_progress(child_id);
CREATE INDEX IF NOT EXISTS idx_scene_progress_type ON scene_progress(scene_type);

-- RLS Policies
ALTER TABLE scene_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_full_access" ON scene_progress;
CREATE POLICY "anon_full_access" ON scene_progress
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON scene_progress;
CREATE POLICY "service_role_all_access" ON scene_progress
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Forest Animals Configuration
-- 森林动物配置（使用JSON存储）
-- ============================================

-- Forest scenes data will be stored in a separate table
CREATE TABLE IF NOT EXISTS forest_animals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id VARCHAR(50) UNIQUE NOT NULL, -- 'bear', 'rabbit', 'bird', 'deer'
  name VARCHAR(100) NOT NULL,
  emoji VARCHAR(10) NOT NULL,
  color VARCHAR(20) NOT NULL,
  position JSONB NOT NULL, -- {x: 0, y: 0}
  unlock_requirements JSONB DEFAULT '{}', -- 解锁条件
  dialogue_topics TEXT[] DEFAULT '{}', -- 对话主题
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert forest animals
INSERT INTO forest_animals (animal_id, name, emoji, color, position, dialogue_topics) VALUES
  ('bear', 'Bear', '🐻', '#8B4513', '{"x": 20, "y": 30}', ARRAY['greeting', 'favorite', 'help']),
  ('rabbit', 'Rabbit', '🐰', '#F5F5DC', '{"x": 50, "y": 40}', ARRAY['greeting', 'food', 'play']),
  ('bird', 'Bird', '🐦', '#87CEEB', '{"x": 70, "y": 20}', ARRAY['greeting', 'sing', 'fly']),
  ('deer', 'Deer', '🦌', '#D2691E', '{"x": 80, "y": 60}', ARRAY['greeting', 'forest', 'run'])
ON CONFLICT (animal_id) DO NOTHING;

-- ============================================
-- Update trigger for updated_at
-- ============================================
CREATE TRIGGER update_scene_progress_updated_at
  BEFORE UPDATE ON scene_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Verification
-- ============================================
SELECT 'Forest Animals:' as info, COUNT(*) as count FROM forest_animals;
SELECT * FROM forest_animals ORDER BY position->>'x';
