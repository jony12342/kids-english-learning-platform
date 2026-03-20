# Phase 2 数据库集成说明

## 概述

Phase 2 的所有功能目前已经创建了数据库schema和类型定义，但是**页面都使用的是前端mock数据，没有真正连接Supabase数据库**。

本文档说明如何将各个功能连接到数据库。

---

## 当前状态

### ✅ 已完成
- 数据库表结构设计（migrations 004-008）
- TypeScript 类型定义
- 页面UI和交互逻辑
- Mock数据演示

### ⚠️ 待完成
- Supabase客户端集成
- 数据CRUD操作
- 实时数据同步
- 错误处理

---

## 功能1: 探险森林场景 (`/forest`)

### 当前实现
- 使用 `FOREST_ANIMALS` 常量数据
- 进度保存在组件state中
- 对话使用 `useChatStore` (Zustand)

### 需要集成的数据库表
1. **forest_animals** - 动物配置（已预填充）
2. **scene_progress** - 场景进度

### 集成步骤

```typescript
// 1. 获取动物数据（可选，因为数据已预填充）
const { data: animals } = await supabase
  .from('forest_animals')
  .select('*')
  .eq('is_active', true);

// 2. 获取/创建场景进度
const { data: progress } = await supabase
  .from('scene_progress')
  .upsert({
    child_id: childId,
    scene_type: 'forest',
    unlocked_areas: ['bear'],
    completed_tasks: [],
    total_score: 0,
    conversations_completed: 0,
    stars_earned: 0
  })
  .select()
  .single();

// 3. 更新进度
const { error } = await supabase
  .from('scene_progress')
  .update({
    unlocked_areas: newUnlockedAreas,
    completed_tasks: newCompletedTasks,
    conversations_completed: progress.conversations_completed + 1,
    stars_earned: progress.stars_earned + newStars
  })
  .eq('child_id', childId)
  .eq('scene_type', 'forest');
```

---

## 功能2: 厨房做蛋糕场景 (`/kitchen`)

### 当前实现
- 使用 `KITCHEN_INGREDIENTS`, `KITCHEN_UTENSILS`, `KITCHEN_VERBS`, `CAKE_RECIPES` 常量
- 进度保存在组件state中

### 需要集成的数据库表
1. **kitchen_ingredients** - 食材配置（已预填充）
2. **kitchen_utensils** - 厨具配置（已预填充）
3. **kitchen_verbs** - 动词配置（已预填充）
4. **cake_recipes** - 蛋糕配方（已预填充）
5. **scene_progress** - 场景进度

### 集成步骤

```typescript
// 1. 获取配置数据（可选，已预填充）
const [ingredients, utensils, verbs, recipes] = await Promise.all([
  supabase.from('kitchen_ingredients').select('*'),
  supabase.from('kitchen_utensils').select('*'),
  supabase.from('kitchen_verbs').select('*'),
  supabase.from('cake_recipes').select('*')
]);

// 2. 获取/更新场景进度
const { data: progress } = await supabase
  .from('scene_progress')
  .upsert({
    child_id: childId,
    scene_type: 'kitchen',
    unlocked_areas: [],
    completed_tasks: [],
    total_score: 0,
    stars_earned: 0
  })
  .select()
  .single();

// 3. 记录学习统计
const { error } = await supabase
  .from('learning_statistics')
  .upsert({
    child_id: childId,
    stat_date: new Date().toISOString().split('T')[0],
    words_learned: newWordsCount, // 学到的食材、厨具、动词
    time_spent_minutes: timeSpent,
    scenes_visited: supabase.raw('array_append(scenes_visited, \'kitchen\')')
  });
```

---

## 功能3: 虚拟角色系统 (`/character`)

### 当前实现
- 使用 `AVATAR_CONFIGURATIONS`, `CHARACTER_ACCESSORIES` 常量
- 角色配置保存在组件state中

### 需要集成的数据库表
1. **avatar_configurations** - 头像配置（已预填充）
2. **character_accessories** - 配饰配置（已预填充）
3. **characters** - 用户角色数据

### 集成步骤

```typescript
// 1. 获取配置数据（可选，已预填充）
const [avatars, accessories] = await Promise.all([
  supabase.from('avatar_configurations').select('*'),
  supabase.from('character_accessories').select('*')
]);

// 2. 保存角色
const { data: character } = await supabase
  .from('characters')
  .insert({
    child_id: childId,
    name: characterName,
    avatar_type: avatarType,
    color_config: { primary, secondary, accent },
    accessory_ids: selectedAccessories,
    is_active: true
  })
  .select()
  .single();

// 3. 更新角色
const { error } = await supabase
  .from('characters')
  .update({
    name: newName,
    avatar_type: newAvatarType,
    color_config: newColors,
    accessory_ids: newAccessories
  })
  .eq('id', characterId);

// 4. 获取用户的所有角色
const { data: userCharacters } = await supabase
  .from('characters')
  .select('*')
  .eq('child_id', childId);
```

---

## 功能4: 每日任务系统 (`/tasks`)

### 当前实现
- 使用 `TASK_TEMPLATES` 常量
- 任务生成和进度在前端计算
- 模拟进度更新

### 需要集成的数据库表
1. **task_templates** - 任务模板（已预填充）
2. **daily_tasks** - 每日任务
3. **user_badges** - 用户徽章

### 集成步骤

```typescript
// 1. 获取或创建今日任务
const today = new Date().toISOString().split('T')[0];
let { data: dailyTask } = await supabase
  .from('daily_tasks')
  .select('*')
  .eq('child_id', childId)
  .eq('task_date', today)
  .single();

if (!dailyTask) {
  // 生成新任务
  const templates = await generateDailyTasks(childId, new Date());
  dailyTask = await supabase
    .from('daily_tasks')
    .insert({
      child_id: childId,
      task_date: today,
      tasks: templates.tasks,
      streak_count: 0
    })
    .select()
    .single();
}

// 2. 更新任务进度
const { error } = await supabase
  .from('daily_tasks')
  .update({
    tasks: updatedTasks,
    is_completed: allCompleted
  })
  .eq('id', dailyTask.id);

// 3. 记录获得的徽章
if (newBadges.length > 0) {
  await Promise.all(newBadges.map(badgeId =>
    supabase
      .from('user_badges')
      .insert({
        child_id: childId,
        badge_id: badgeId,
        badge_name: BADGE_DEFINITIONS[badgeId].name,
        badge_emoji: BADGE_DEFINITIONS[badgeId].emoji,
        badge_description: BADGE_DEFINITIONS[badgeId].description
      })
      .onConflict('child_id,badge_id')
      .ignore()
  ));
}
```

---

## 功能5: 家长端 (`/parent`)

### 当前实现
- PIN认证在前端验证（演示模式）
- 使用mock dashboard数据
- 设置未保存到数据库

### 需要集成的数据库表
1. **parent_settings** - 家长设置
2. **learning_statistics** - 学习统计
3. **activity_logs** - 活动日志

### 集成步骤

```typescript
// 1. PIN认证
const { data: settings } = await supabase
  .from('parent_settings')
  .select('pin_code')
  .eq('child_id', childId)
  .single();

if (settings?.pin_code !== inputPin) {
  throw new Error('Invalid PIN');
}

// 2. 获取dashboard数据
const [stats, activities, settings] = await Promise.all([
  // 获取本周统计
  supabase.rpc('get_weekly_statistics', {
    child_param: childId,
    start_date_param: weekStart
  }),
  // 获取最近活动
  supabase
    .from('activity_logs')
    .select('*')
    .eq('child_id', childId)
    .order('timestamp', { ascending: false })
    .limit(10),
  // 获取设置
  supabase
    .from('parent_settings')
    .select('*')
    .eq('child_id', childId)
    .single()
]);

// 3. 更新设置
const { error } = await supabase
  .from('parent_settings')
  .update({
    daily_time_limit: newLimit,
    allowed_hours: newHours,
    content_restrictions: newRestrictions
  })
  .eq('child_id', childId);

// 4. 记录活动日志
await supabase
  .from('activity_logs')
  .insert({
    child_id: childId,
    activity_type: 'login', // or 'scene_visit', 'task_complete', etc.
    activity_details: { scene: 'garden', duration: 15 }
  });
```

---

## 通用集成模式

### 1. 创建 Supabase 客户端工具

```typescript
// lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const createClient = () => createClientComponentClient();

// 或在服务端
// lib/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createServerClient = () => {
  const cookieStore = cookies();
  return createServerComponentClient({ cookies: cookieStore });
};
```

### 2. 错误处理包装

```typescript
// lib/supabase/utils.ts
export async function handleSupabaseError<T>(
  promise: Promise<{ data?: T; error?: any }>
): Promise<T | null> {
  const { data, error } = await promise;

  if (error) {
    console.error('Supabase error:', error);
    // 可以添加错误上报
    return null;
  }

  return data ?? null;
}

// 使用示例
const progress = await handleSupabaseError(
  supabase.from('scene_progress').select('*').single()
);
```

### 3. React Hooks 集成

```typescript
// hooks/useSceneProgress.ts
export function useSceneProgress(sceneType: string) {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      const supabase = createClient();
      const { data } = await supabase
        .from('scene_progress')
        .select('*')
        .eq('scene_type', sceneType)
        .single();

      setProgress(data);
      setLoading(false);
    }

    loadProgress();
  }, [sceneType]);

  const updateProgress = async (updates: any) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('scene_progress')
      .update(updates)
      .eq('id', progress.id);

    if (!error) {
      setProgress({ ...progress, ...updates });
    }
  };

  return { progress, loading, updateProgress };
}
```

---

## 实施优先级

### 高优先级（核心功能）
1. **探险森林** - 连接 `scene_progress` 表
2. **每日任务** - 连接 `daily_tasks` 表
3. **家长端** - 连接 `parent_settings` 和统计表

### 中优先级（增强功能）
4. **虚拟角色** - 连接 `characters` 表
5. **厨房场景** - 连接 `scene_progress` 表

---

## 开发检查清单

- [ ] 创建 Supabase 客户端工具
- [ ] 实现错误处理
- [ ] 集成森林场景进度
- [ ] 集成每日任务系统
- [ ] 集成家长端数据
- [ ] 集成角色系统
- [ ] 集成厨房场景
- [ ] 添加活动日志记录
- [ ] 测试数据持久化
- [ ] 测试实时更新
- [ ] 性能优化

---

## 注意事项

1. **RLS策略**：所有表都已配置 `anon` 完全访问，生产环境需要更严格的策略
2. **数据验证**：在前端和后端都要验证数据
3. **缓存策略**：考虑使用 React Query 或 SWR 进行数据缓存
4. **错误处理**：提供友好的错误提示给用户
5. **加载状态**：在数据加载时显示加载指示器
6. **离线支持**：考虑添加离线功能（可选）

---

## 总结

Phase 2 的功能已经完整开发，但需要将前端mock数据替换为真实的Supabase数据库调用。这是一个相对直接的过程，因为：

1. ✅ 数据库schema已经创建
2. ✅ 类型定义已经完成
3. ✅ UI逻辑已经实现
4. ⚠️ 只需要添加数据CRUD操作

建议按照优先级逐步集成，每次集成一个功能后进行充分测试。
