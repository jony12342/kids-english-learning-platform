# Database Schema Design
# 数据库结构设计

## Overview
This document describes the database schema for the Kids English Learning Platform.
本文档描述儿童英语学习平台的数据库结构。

## Database: PostgreSQL (via Supabase)

---

## Tables / 数据表

### 1. children / 儿童用户表
Stores child profile information and account settings.
存储儿童档案信息和账户设置。

```sql
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID NOT NULL REFERENCES parents(id),
  name VARCHAR(50) NOT NULL,
  avatar_url TEXT,
  birth_date DATE,
  language_level VARCHAR(20) DEFAULT 'beginner', -- beginner, intermediate, advanced
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Indexes
CREATE INDEX idx_children_parent_id ON children(parent_id);
CREATE INDEX idx_children_created_at ON children(created_at);
```

### 2. parents / 家长表
Stores parent account information.
存储家长账户信息。

```sql
CREATE TABLE parents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_parents_email ON parents(email);
```

### 3. learning_words / 学习单词记录表
Tracks words learned by each child.
追踪每个儿童学习的单词。

```sql
CREATE TABLE learning_words (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  word VARCHAR(100) NOT NULL,
  category VARCHAR(50), -- animal, color, number, food, etc.
  translation TEXT, -- Chinese translation
  example_sentence TEXT,
  pronunciation_url TEXT,
  image_url TEXT,
  learned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  review_count INTEGER DEFAULT 0,
  last_reviewed_at TIMESTAMP WITH TIME ZONE,
  mastery_level INTEGER DEFAULT 0; -- 0-5 scale

-- Indexes
CREATE INDEX idx_learning_words_child_id ON learning_words(child_id);
CREATE INDEX idx_learning_words_word ON learning_words(word);
CREATE INDEX idx_learning_words_category ON learning_words(category);
CREATE UNIQUE INDEX idx_learning_words_child_word ON learning_words(child_id, word);
```

### 4. conversations / 对话记录表
Stores conversation history between children and AI.
存储儿童与AI的对话历史。

```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  message_count INTEGER DEFAULT 0,
  topic VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_conversations_child_id ON conversations(child_id);
CREATE INDEX idx_conversations_started_at ON conversations(started_at);
```

### 5. conversation_messages / 对话消息表
Stores individual messages within conversations.
存储对话中的单条消息。

```sql
CREATE TABLE conversation_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  audio_url TEXT,
  is_ai BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_conversation_messages_conversation_id ON conversation_messages(conversation_id);
CREATE INDEX idx_conversation_messages_created_at ON conversation_messages(created_at);
```

### 6. rewards / 奖励记录表
Tracks all rewards earned by children.
追踪儿童获得的所有奖励。

```sql
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL, -- 'star' or 'badge'
  reason VARCHAR(100) NOT NULL, -- achievement type
  count INTEGER DEFAULT 1, -- number of stars
  metadata JSONB, -- additional data (word, category, badge_id, etc.)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_rewards_child_id ON rewards(child_id);
CREATE INDEX idx_rewards_type ON rewards(type);
CREATE INDEX idx_rewards_created_at ON rewards(created_at);
```

### 7. user_badges / 用户徽章表
Stores badges unlocked by children.
存储儿童解锁的徽章。

```sql
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  badge_id VARCHAR(100) NOT NULL, -- matches badge ID from badge definitions
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress INTEGER DEFAULT 0, -- 0-100 for badges with progress
  UNIQUE(child_id, badge_id)
);

-- Indexes
CREATE INDEX idx_user_badges_child_id ON user_badges(child_id);
CREATE INDEX idx_user_badges_badge_id ON user_badges(badge_id);
```

### 8. learning_stats / 学习统计表
Aggregated daily learning statistics for each child.
每个儿童的每日学习统计汇总。

```sql
CREATE TABLE learning_stats (
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

-- Indexes
CREATE INDEX idx_learning_stats_child_id ON learning_stats(child_id);
CREATE INDEX idx_learning_stats_date ON learning_stats(date);
CREATE UNIQUE INDEX idx_learning_stats_child_date ON learning_stats(child_id, date);
```

### 9. vocabulary_progress / 单词进度表
Detailed progress tracking for each vocabulary word.
每个单词的详细进度追踪。

```sql
CREATE TABLE vocabulary_progress (
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

-- Indexes
CREATE INDEX idx_vocabulary_progress_child_id ON vocabulary_progress(child_id);
CREATE INDEX idx_vocabulary_progress_next_review ON vocabulary_progress(next_review_at);
```

### 10. sessions / 会话表
Tracks user sessions for analytics.
追踪用户会话用于分析。

```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  device_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_sessions_child_id ON sessions(child_id);
CREATE INDEX idx_sessions_started_at ON sessions(started_at);
```

---

## Functions and Triggers / 函数和触发器

### Update updated_at timestamp
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON children
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_parents_updated_at BEFORE UPDATE ON parents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Calculate daily stats
```sql
CREATE OR REPLACE FUNCTION calculate_daily_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO learning_stats (child_id, date, words_learned, conversations_completed, stars_earned)
  VALUES (
    NEW.child_id,
    CURRENT_DATE,
    CASE WHEN NEW.type = 'word' THEN 1 ELSE 0 END,
    CASE WHEN NEW.type = 'conversation' THEN 1 ELSE 0 END,
    CASE WHEN NEW.type = 'star' THEN NEW.count ELSE 0 END
  )
  ON CONFLICT (child_id, date) DO UPDATE SET
    words_learned = learning_stats.words_learned +
      CASE WHEN NEW.type = 'word' THEN 1 ELSE 0 END,
    conversations_completed = learning_stats.conversations_completed +
      CASE WHEN NEW.type = 'conversation' THEN 1 ELSE 0 END,
    stars_earned = learning_stats.stars_earned +
      CASE WHEN NEW.type = 'star' THEN NEW.count ELSE 0 END;

  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_daily_stats AFTER INSERT ON rewards
  FOR EACH ROW EXECUTE FUNCTION calculate_daily_stats();
```

---

## RLS (Row Level Security) Policies
启用行级安全策略

```sql
-- Enable RLS
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Parents can only access their children's data
CREATE POLICY "Parents can view their children" ON children
  FOR SELECT USING (parent_id IN (SELECT id FROM parents WHERE id = auth.uid()));

CREATE POLICY "Parents can view their children's rewards" ON rewards
  FOR SELECT USING (
    child_id IN (SELECT id FROM children WHERE parent_id IN (SELECT id FROM parents WHERE id = auth.uid()))
  );

-- Service role can access everything (for backend operations)
CREATE POLICY "Service role full access" ON ALL TABLES
  TO service_role
  USING (true) WITH CHECK (true);
```

---

## Views / 视图

### Child Progress Summary
```sql
CREATE OR REPLACE VIEW child_progress_summary AS
SELECT
  c.id AS child_id,
  c.name,
  c.created_at AS joined_date,
  COUNT(DISTINCT lw.word) AS total_words,
  COUNT(DISTINCT conv.id) AS total_conversations,
  SUM(r.count) AS total_stars,
  COUNT(ub.id) AS total_badges,
  MAX(ls.current_streak) AS current_streak
FROM children c
LEFT JOIN learning_words lw ON c.id = lw.child_id
LEFT JOIN conversations conv ON c.id = conv.child_id
LEFT JOIN rewards r ON c.id = r.child_id AND r.type = 'star'
LEFT JOIN user_badges ub ON c.id = ub.child_id
LEFT JOIN learning_stats ls ON c.id = ls.child_id AND ls.date = CURRENT_DATE
GROUP BY c.id, c.name, c.created_at;
```

---

## Notes / 说明

1. **UUID**: All primary keys use UUID for better distribution and security
   所有主键使用UUID以获得更好的分布和安全性

2. **Timestamps**: All timestamps use TIME ZONE for consistency
   所有时间戳使用时区以保持一致性

3. **Indexes**: Added on foreign keys and frequently queried columns
   在外键和经常查询的列上添加索引

4. **Cascade Delete**: Child records cascade delete to maintain data integrity
   子记录级联删除以维护数据完整性

5. **JSONB**: Used for flexible metadata storage
   JSONB用于灵活的元数据存储

6. **Row Level Security**: Enabled for all tables to ensure data isolation
   所有表启用行级安全以确保数据隔离

7. **Stats Tracking**: Automated through triggers for real-time updates
   通过触发器自动更新以实现实时统计
