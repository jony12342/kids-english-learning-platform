-- ============================================
-- Add RLS Policies for Anonymous Users
-- 为匿名用户添加 RLS 策略
-- ============================================
-- This script enables the client application to access the database
-- 此脚本允许客户端应用程序访问数据库
-- Note: In production, you should restrict access to authenticated users only
-- 注意：在生产环境中，你应该限制为只有经过身份验证的用户才能访问

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "anon_read_access" ON parents;
DROP POLICY IF EXISTS "anon_full_access" ON parents;
CREATE POLICY "anon_read_access" ON parents
  FOR SELECT
  TO anon
  USING (true);

DROP POLICY IF EXISTS "anon_full_access" ON children;
CREATE POLICY "anon_full_access" ON children
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON learning_words;
CREATE POLICY "anon_full_access" ON learning_words
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON conversations;
CREATE POLICY "anon_full_access" ON conversations
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON conversation_messages;
CREATE POLICY "anon_full_access" ON conversation_messages
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON rewards;
CREATE POLICY "anon_full_access" ON rewards
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON user_badges;
CREATE POLICY "anon_full_access" ON user_badges
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON learning_stats;
CREATE POLICY "anon_full_access" ON learning_stats
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON vocabulary_progress;
CREATE POLICY "anon_full_access" ON vocabulary_progress
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON sessions;
CREATE POLICY "anon_full_access" ON sessions
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Verify Policies / 验证策略
-- ============================================

-- Check if policies were created successfully
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND policyname LIKE 'anon_%'
ORDER BY tablename, policyname;
