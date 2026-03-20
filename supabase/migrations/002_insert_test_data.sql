-- Insert Test Data for Demo
-- 插入演示数据

-- 1. Create a test parent
INSERT INTO parents (id, email, password_hash, name)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'demo@example.com',
  '$2a$10$demo_password_hash',
  'Demo Parent'
)
ON CONFLICT (email) DO NOTHING;

-- 2. Create a test child
INSERT INTO children (id, parent_id, name, language_level)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'Demo Child',
  'beginner'
)
ON CONFLICT DO NOTHING;

-- 3. Verify data
SELECT 'Parents:' as info, COUNT(*) as count FROM parents;
SELECT 'Children:' as info, COUNT(*) as count FROM children;
SELECT 'Learning Words:' as info, COUNT(*) as count FROM learning_words;
SELECT 'Conversations:' as info, COUNT(*) as count FROM conversations;
SELECT 'Rewards:' as info, COUNT(*) as count FROM rewards;