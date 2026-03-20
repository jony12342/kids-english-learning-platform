-- Initial Database Schema
-- Kids English Learning Platform
-- 创建日期: 2026-03-20

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Tables / 数据表
-- ============================================

-- 1. Parents table / 家长表
CREATE TABLE IF NOT EXISTS parents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Children table / 儿童用户表
CREATE TABLE IF NOT EXISTS children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  avatar_url TEXT,
  birth_date DATE,
  language_level VARCHAR(20) DEFAULT 'beginner' CHECK (language_level IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- 3. Learning words table / 学习单词记录表
CREATE TABLE IF NOT EXISTS learning_words (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  word VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  translation TEXT,
  example_sentence TEXT,
  pronunciation_url TEXT,
  image_url TEXT,
  learned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  review_count INTEGER DEFAULT 0,
  last_reviewed_at TIMESTAMP WITH TIME ZONE,
  mastery_level INTEGER DEFAULT 0 CHECK (mastery_level >= 0 AND mastery_level <= 5),
  UNIQUE(child_id, word)
);

-- 4. Conversations table / 对话记录表
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  message_count INTEGER DEFAULT 0,
  topic VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Conversation messages table / 对话消息表
CREATE TABLE IF NOT EXISTS conversation_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  audio_url TEXT,
  is_ai BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Rewards table / 奖励记录表
CREATE TABLE IF NOT EXISTS rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('star', 'badge')),
  reason VARCHAR(100) NOT NULL,
  count INTEGER DEFAULT 1,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. User badges table / 用户徽章表
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  badge_id VARCHAR(100) NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  UNIQUE(child_id, badge_id)
);

-- 8. Learning stats table / 学习统计表
CREATE TABLE IF NOT EXISTS learning_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  words_learned INTEGER DEFAULT 0,
  conversations_completed INTEGER DEFAULT 0,
  stars_earned INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(child_id, date)
);

-- 9. Vocabulary progress table / 单词进度表
CREATE TABLE IF NOT EXISTS vocabulary_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  word VARCHAR(100) NOT NULL,
  attempts INTEGER DEFAULT 0,
  correct_attempts INTEGER DEFAULT 0,
  last_attempt_at TIMESTAMP WITH TIME ZONE,
  next_review_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(child_id, word)
);

-- 10. Sessions table / 会话表
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  device_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Indexes / 索引
-- ============================================

-- Parents indexes
CREATE INDEX IF NOT EXISTS idx_parents_email ON parents(email);

-- Children indexes
CREATE INDEX IF NOT EXISTS idx_children_parent_id ON children(parent_id);
CREATE INDEX IF NOT EXISTS idx_children_created_at ON children(created_at);

-- Learning words indexes
CREATE INDEX IF NOT EXISTS idx_learning_words_child_id ON learning_words(child_id);
CREATE INDEX IF NOT EXISTS idx_learning_words_word ON learning_words(word);
CREATE INDEX IF NOT EXISTS idx_learning_words_category ON learning_words(category);
CREATE INDEX IF NOT EXISTS idx_learning_words_learned_at ON learning_words(learned_at);

-- Conversations indexes
CREATE INDEX IF NOT EXISTS idx_conversations_child_id ON conversations(child_id);
CREATE INDEX IF NOT EXISTS idx_conversations_started_at ON conversations(started_at);

-- Conversation messages indexes
CREATE INDEX IF NOT EXISTS idx_conversation_messages_conversation_id ON conversation_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_conversation_messages_created_at ON conversation_messages(created_at);

-- Rewards indexes
CREATE INDEX IF NOT EXISTS idx_rewards_child_id ON rewards(child_id);
CREATE INDEX IF NOT EXISTS idx_rewards_type ON rewards(type);
CREATE INDEX IF NOT EXISTS idx_rewards_created_at ON rewards(created_at);

-- User badges indexes
CREATE INDEX IF NOT EXISTS idx_user_badges_child_id ON user_badges(child_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_badge_id ON user_badges(badge_id);

-- Learning stats indexes
CREATE INDEX IF NOT EXISTS idx_learning_stats_child_id ON learning_stats(child_id);
CREATE INDEX IF NOT EXISTS idx_learning_stats_date ON learning_stats(date);

-- Vocabulary progress indexes
CREATE INDEX IF NOT EXISTS idx_vocabulary_progress_child_id ON vocabulary_progress(child_id);
CREATE INDEX IF NOT EXISTS idx_vocabulary_progress_next_review ON vocabulary_progress(next_review_at);

-- Sessions indexes
CREATE INDEX IF NOT EXISTS idx_sessions_child_id ON sessions(child_id);
CREATE INDEX IF NOT EXISTS idx_sessions_started_at ON sessions(started_at);

-- ============================================
-- Functions and Triggers / 函数和触发器
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_parents_updated_at
  BEFORE UPDATE ON parents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_children_updated_at
  BEFORE UPDATE ON children
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to update conversation message count
CREATE OR REPLACE FUNCTION update_conversation_message_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations
  SET message_count = message_count + 1
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_conversation_message_count_trigger
  AFTER INSERT ON conversation_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_message_count();

-- ============================================
-- Views / 视图
-- ============================================

-- Child progress summary view
CREATE OR REPLACE VIEW child_progress_summary AS
SELECT
  c.id AS child_id,
  c.name,
  c.created_at AS joined_date,
  COUNT(DISTINCT lw.word) AS total_words,
  COUNT(DISTINCT conv.id) AS total_conversations,
  COALESCE(SUM(r.count), 0) AS total_stars,
  COUNT(ub.id) AS total_badges,
  COALESCE(MAX(ls.current_streak), 0) AS current_streak
FROM children c
LEFT JOIN learning_words lw ON c.id = lw.child_id
LEFT JOIN conversations conv ON c.id = conv.child_id
LEFT JOIN rewards r ON c.id = r.child_id AND r.type = 'star'
LEFT JOIN user_badges ub ON c.id = ub.child_id
LEFT JOIN learning_stats ls ON c.id = ls.child_id AND ls.date = CURRENT_DATE
GROUP BY c.id, c.name, c.created_at;

-- ============================================
-- Row Level Security (RLS) / 行级安全
-- ============================================

-- Enable RLS on all tables
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Service role can access everything (for backend operations)
DROP POLICY IF EXISTS "service_role_all_access" ON parents;
CREATE POLICY "service_role_all_access" ON parents
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON children;
CREATE POLICY "service_role_all_access" ON children
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON learning_words;
CREATE POLICY "service_role_all_access" ON learning_words
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON conversations;
CREATE POLICY "service_role_all_access" ON conversations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON conversation_messages;
CREATE POLICY "service_role_all_access" ON conversation_messages
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON rewards;
CREATE POLICY "service_role_all_access" ON rewards
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON user_badges;
CREATE POLICY "service_role_all_access" ON user_badges
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON learning_stats;
CREATE POLICY "service_role_all_access" ON learning_stats
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON vocabulary_progress;
CREATE POLICY "service_role_all_access" ON vocabulary_progress
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON sessions;
CREATE POLICY "service_role_all_access" ON sessions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Sample Data (for testing) / 示例数据（测试用）
-- ============================================

-- Insert a test parent
INSERT INTO parents (id, email, password_hash, name)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'test@example.com',
  '$2a$10$test', -- This should be a proper hash in production
  'Test Parent'
)
ON CONFLICT (email) DO NOTHING;

-- Insert a test child
INSERT INTO children (id, parent_id, name, language_level)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'Demo Child',
  'beginner'
)
ON CONFLICT DO NOTHING;
