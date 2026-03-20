# 执行数据库迁移指南

## 问题描述

当前应用尝试访问的数据库表还未在Supabase中创建，需要执行迁移文件。

## 需要执行的迁移文件

按照以下顺序在Supabase SQL Editor中执行：

### 1. 004_add_scene_progress.sql
创建场景进度表和森林动物配置

### 2. 005_add_kitchen_scene.sql
创建厨房场景相关表（食材、厨具、动词、配方）

### 3. 006_add_character_system.sql
创建角色系统相关表

### 4. 007_add_daily_tasks.sql
创建每日任务相关表

### 5. 008_add_parent_features.sql
创建家长端相关表（**包含 activity_logs 表**）

## 执行步骤

### 方法1: 通过Supabase Dashboard（推荐）

1. 访问你的Supabase项目：https://supabase.com/dashboard
2. 选择项目：`vdwvkfgqxyyncwcrzvmn`
3. 点击左侧菜单的 **SQL Editor**
4. 点击 **New Query**
5. 对于每个迁移文件（004-008）：
   - 打开迁移文件内容
   - 复制全部SQL代码
   - 粘贴到SQL Editor
   - 点击 **Run** 执行
   - 确认看到 "Success" 消息

### 方法2: 通过Supabase CLI

```bash
# 确保已登录Supabase CLI
npx supabase login

# 链接到远程项目
npx supabase link --project-ref vdwvkfgqxyyncwcrzvmn

# 推送迁移到远程数据库
npx supabase db push
```

## 验证迁移成功

执行完所有迁移后，在SQL Editor中运行：

```sql
-- 检查所有表是否创建成功
SELECT
    'scene_progress' as table_name, COUNT(*) as count FROM scene_progress
UNION ALL
SELECT 'daily_tasks', COUNT(*) FROM daily_tasks
UNION ALL
SELECT 'characters', COUNT(*) FROM characters
UNION ALL
SELECT 'parent_settings', COUNT(*) FROM parent_settings
UNION ALL
SELECT 'activity_logs', COUNT(*) FROM activity_logs
UNION ALL
SELECT 'learning_statistics', COUNT(*) FROM learning_statistics;
```

应该看到所有表都存在（即使count为0）。

## 创建测试用户

在SQL Editor中执行：

```sql
-- 创建一个测试儿童用户
INSERT INTO children (id, parent_id, name, language_level, is_active)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
    '测试儿童',
    'beginner',
    true
)
ON CONFLICT (id) DO NOTHING;
```

## 常见问题

### Q: 执行迁移时出现 "relation already exists" 错误
A: 表已存在，可以忽略或先删除表：
```sql
DROP TABLE IF EXISTS activity_logs CASCADE;
```

### Q: 执行迁移时出现 "must be owner of table" 错误
A: 确保你使用的是项目所有者账户登录Supabase

### Q: 迁移执行成功但应用仍然报错
A: 检查：
1. Row Level Security (RLS) 策略是否正确设置
2. 环境变量 `.env.local` 中的 Supabase URL 和 Key 是否正确
3. 浏览器控制台是否有CORS错误

## 迁移文件内容预览

每个迁移文件都包含：
- **CREATE TABLE**: 创建表结构
- **CREATE INDEX**: 创建索引优化查询
- **ALTER TABLE ENABLE ROW LEVEL SECURITY**: 启用行级安全
- **CREATE POLICY**: 创建访问策略（anon和service_role）
- **INSERT**: 插入初始配置数据

## 下一步

迁移执行完成后：
1. ✅ 应用应该能够正常访问数据库
2. ✅ 森林场景功能应该可以保存和加载进度
3. ✅ 可以继续集成其他Phase 2功能

---

**重要提示**: 这些迁移文件包含了Phase 2的所有数据库结构。执行前建议先在开发环境测试！
