-- ============================================
-- Phase 2: Character System
-- 虚拟角色系统
-- ============================================

-- Characters table
CREATE TABLE IF NOT EXISTS characters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  avatar_type VARCHAR(50) NOT NULL DEFAULT 'owl', -- 'owl', 'bear', 'cat', 'rabbit'
  color_config JSONB DEFAULT '{"primary": "#FF6B6B", "secondary": "#4ECDC4", "accent": "#FFE66D"}', -- Custom colors
  accessory_ids TEXT[] DEFAULT '{}', -- ['hat', 'glasses', 'bow']
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Character accessories table
CREATE TABLE IF NOT EXISTS character_accessories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  accessory_id VARCHAR(50) UNIQUE NOT NULL, -- 'hat', 'glasses', 'bow', 'crown', 'wand'
  name VARCHAR(100) NOT NULL,
  emoji VARCHAR(10) NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'head', 'face', 'hand'
  rarity VARCHAR(20) NOT NULL DEFAULT 'common', -- 'common', 'rare', 'epic'
  unlock_condition JSONB DEFAULT '{}', -- Unlock requirements
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert character accessories
INSERT INTO character_accessories (accessory_id, name, emoji, category, rarity, unlock_condition) VALUES
  -- Head accessories
  ('hat', 'Party Hat', '🎉', 'head', 'common', '{"type": "free"}'),
  ('crown', 'Crown', '👑', 'head', 'epic', '{"type": "stars", "amount": 50}'),
  ('cap', 'Cap', '🧢', 'head', 'common', '{"type": "free"}'),

  -- Face accessories
  ('glasses', 'Glasses', '👓', 'face', 'rare', '{"type": "words", "amount": 20}'),
  ('sunglasses', 'Sunglasses', '🕶️', 'face', 'rare', '{"type": "words", "amount": 30}'),

  -- Hand accessories
  ('wand', 'Magic Wand', '🪄', 'hand', 'rare', '{"type": "conversations", "amount": 10}'),
  ('bow', 'Bow Tie', '🎀', 'hand', 'common', '{"type": "free"}'),
  ('star', 'Star', '⭐', 'hand', 'common', '{"type": "free"}')
ON CONFLICT (accessory_id) DO NOTHING;

-- Avatar configurations
CREATE TABLE IF NOT EXISTS avatar_configurations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  avatar_type VARCHAR(50) UNIQUE NOT NULL, -- 'owl', 'bear', 'cat', 'rabbit'
  name VARCHAR(100) NOT NULL,
  emoji VARCHAR(10) NOT NULL,
  base_color VARCHAR(20) NOT NULL,
  available_colors JSONB NOT NULL, -- Array of color options
  description TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert avatar configurations
INSERT INTO avatar_configurations (avatar_type, name, emoji, base_color, available_colors, description) VALUES
  ('owl', 'Owl', '🦉', '#8B4513',
  '["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#F38181", "#AA96DA", "#FCBAD3", "#FFFFD2"]',
  'Wise owl teacher, perfect for learning!'),

  ('bear', 'Bear', '🐻', '#8B4513',
  '["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#F38181", "#AA96DA", "#FCBAD3", "#FFFFD2"]',
  'Friendly bear, great companion for adventures!'),

  ('cat', 'Cat', '🐱', '#FFA500',
  '["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#F38181", "#AA96DA", "#FCBAD3", "#FFFFD2"]',
  'Curious cat, loves exploring new things!'),

  ('rabbit', 'Rabbit', '🐰', '#F5F5DC',
  '["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#F38181", "#AA96DA", "#FCBAD3", "#FFFFD2"]',
  'Playful rabbit, always ready for fun!')
ON CONFLICT (avatar_type) DO NOTHING;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_characters_child ON characters(child_id);
CREATE INDEX IF NOT EXISTS idx_characters_active ON characters(is_active);
CREATE INDEX IF NOT EXISTS idx_accessories_category ON character_accessories(category);
CREATE INDEX IF NOT EXISTS idx_accessories_rarity ON character_accessories(rarity);
CREATE INDEX IF NOT EXISTS idx_avatar_type ON avatar_configurations(avatar_type);

-- RLS Policies
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_accessories ENABLE ROW LEVEL SECURITY;
ALTER TABLE avatar_configurations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_full_access" ON characters;
CREATE POLICY "anon_full_access" ON characters
  FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON character_accessories;
CREATE POLICY "anon_full_access" ON character_accessories
  FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON avatar_configurations;
CREATE POLICY "anon_full_access" ON avatar_configurations
  FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON characters;
CREATE POLICY "service_role_all_access" ON characters
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON character_accessories;
CREATE POLICY "service_role_all_access" ON character_accessories
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON avatar_configurations;
CREATE POLICY "service_role_all_access" ON avatar_configurations
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================
-- Update trigger for updated_at
-- ============================================
CREATE TRIGGER update_characters_updated_at
  BEFORE UPDATE ON characters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Verification
-- ============================================
SELECT 'Accessories:' as info, COUNT(*) as count FROM character_accessories;
SELECT 'Avatars:' as info, COUNT(*) as count FROM avatar_configurations;

SELECT * FROM character_accessories ORDER BY category, rarity;
SELECT * FROM avatar_configurations ORDER BY avatar_type;
