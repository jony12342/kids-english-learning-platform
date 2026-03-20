# Phase 2 开发规划

**项目**: Kids English Learning Platform
**阶段**: Phase 2 - 核心功能扩展
**开始日期**: 2026-03-20
**预计工期**: 4-6周

---

## 🎯 Phase 2 目标

在MVP基础上，添加更多学习场景、游戏化功能和家长端管理功能，提升用户体验和学习效果。

---

## 📋 功能清单

### Feature 9: 探险森林场景（对话练习）
**优先级**: ⭐⭐⭐⭐⭐（最高）
**预计时间**: 3-5天

**功能描述**:
- 森林场景设计（树木、动物、小路）
- 动物角色对话系统
- 对话任务系统
- 场景解锁机制

**学习内容**:
- 日常对话：打招呼、自我介绍、表达喜好
- 简单问答：What's your name? How are you? What color do you like?
- 情景对话：问路、购物、求助

**技术实现**:
- 新页面: `app/forest/page.tsx`
- 森林场景组件
- 动物角色对话系统
- 场景进度追踪

---

### Feature 10: 厨房做蛋糕场景（生活应用）
**优先级**: ⭐⭐⭐⭐
**预计时间**: 3-5天

**功能描述**:
- 厨房场景设计
- 蛋糕制作流程
- 食材词汇学习
- 动词学习（mix, stir, bake）

**学习内容**:
- 食材词汇：flour, sugar, milk, eggs, butter
- 动作动词：mix, stir, bake, add, pour
- 数量表达：two eggs, one cup, three spoons

**技术实现**:
- 新页面: `app/kitchen/page.tsx`
- 厨房场景组件
- 制作流程系统
- 创意模式

---

### Feature 11: 虚拟角色系统
**优先级**: ⭐⭐⭐⭐
**预计时间**: 3-4天

**功能描述**:
- 角色创建功能
- 外观定制（颜色、配饰）
- 角色数据存储
- 角色切换

**技术实现**:
- 新页面: `app/character/page.tsx`
- 角色编辑器组件
- 角色数据模型
- Supabase角色表

---

### Feature 12: 每日任务系统
**优先级**: ⭐⭐⭐⭐⭐
**预计时间**: 2-3天

**功能描述**:
- 每日任务生成
- 任务进度追踪
- 任务完成奖励
- 连续完成奖励

**任务示例**:
- 学习5个新单词
- 完成3次对话
- 获得10颗星星
- 连续学习3天

**技术实现**:
- 任务生成逻辑
- 任务追踪组件
- 任务奖励系统
- 数据库任务记录

---

### Feature 13: 家长端完整功能
**优先级**: ⭐⭐⭐⭐
**预计时间**: 4-5天

**功能描述**:
- 学习报告优化
- 内容控制面板
- 时间管理设置
- 学习数据统计

**技术实现**:
- 新页面: `app/parent/page.tsx`
- 家长认证系统（PIN码）
- 学习报告组件
- 设置面板

---

## 🗓️ 开发时间表

### 第1-2周：探险森林场景
**Day 1-2: 基础场景**
- 创建forest页面
- 设计森林场景UI
- 添加基础动物角色

**Day 3-4: 对话系统**
- 实现动物对话逻辑
- 添加对话任务
- 场景解锁机制

**Day 5: 测试优化**
- 测试所有对话流程
- UI/UX优化
- 性能优化

### 第3-4周：厨房场景 + 角色系统
**Day 1-3: 厨房场景**
- 创建kitchen页面
- 实现制作流程
- 食材和动词教学

**Day 4-6: 角色系统**
- 创建character页面
- 角色编辑器
- 数据存储

**Day 7: 测试优化**
- 跨场景测试
- 数据同步测试

### 第5-6周：任务系统 + 家长端
**Day 1-2: 每日任务系统**
- 任务生成逻辑
- 任务UI组件
- 奖励系统

**Day 3-6: 家长端功能**
- 家长dashboard
- 学习报告优化
- 内容控制面板
- 时间管理

**Day 7: 综合测试**
- 完整功能测试
- 性能测试
- 用户测试

---

## 🔧 技术架构更新

### 新增数据库表

```sql
-- 场景进度表
CREATE TABLE scene_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  scene_type VARCHAR(50) NOT NULL, -- 'forest', 'kitchen'
  unlocked_areas TEXT[] DEFAULT '{}',
  completed_tasks TEXT[] DEFAULT '{}',
  total_score INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(child_id, scene_type)
);

-- 角色表
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  avatar_type VARCHAR(50) DEFAULT 'owl',
  color_config JSONB DEFAULT '{}',
  accessory_ids TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 每日任务表
CREATE TABLE daily_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  task_date DATE NOT NULL,
  tasks JSONB NOT NULL, -- 任务详情
  progress JSONB DEFAULT '{}', -- 完成进度
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(child_id, task_date)
);

-- 家长设置表
CREATE TABLE parent_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE UNIQUE,
  daily_time_limit INTEGER DEFAULT 30, -- 分钟
  allowed_hours INTEGER[] DEFAULT '{9,10,11,12,13,14,15,16,17,18,19,20}',
  content_restrictions JSONB DEFAULT '{}',
  pin_code VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 新增类型定义

```typescript
// types/scene.ts
export interface SceneProgress {
  sceneType: 'forest' | 'kitchen';
  unlockedAreas: string[];
  completedTasks: string[];
  totalScore: number;
}

// types/character.ts
export interface Character {
  id: string;
  childId: string;
  name: string;
  avatarType: 'owl' | 'bear' | 'cat' | 'rabbit';
  colorConfig: {
    primary: string;
    secondary: string;
    accent: string;
  };
  accessoryIds: string[];
  isActive: boolean;
}

// types/daily-tasks.ts
export interface DailyTask {
  id: string;
  type: 'words' | 'conversations' | 'stars' | 'streak';
  target: number;
  current: number;
  reward: {
    stars: number;
    badge?: string;
  };
}

export interface DailyTasks {
  date: string;
  tasks: DailyTask[];
  isCompleted: boolean;
}
```

---

## 🎨 UI/UX 设计方向

### 探险森林场景
- **色调**: 绿色、棕色为主，森林氛围
- **角色**: 小熊、小兔子、小鸟等
- **互动**: 点击动物开始对话
- **进度**: 解锁新的森林区域

### 厨房做蛋糕场景
- **色调**: 暖黄色、橙色，温馨厨房
- **道具**: 食材、厨具、烤箱
- **互动**: 拖拽操作，跟读指令
- **成果**: 完成的蛋糕可保存展示

### 角色系统
- **色调**: 彩色、活泼
- **操作**: 简单点击选择
- **定制**: 颜色、配饰、表情

### 每日任务
- **展示**: 任务卡片列表
- **进度**: 进度条可视化
- **奖励**: 完成动画效果

---

## 📊 成功指标

### Phase 2 完成标准
- ✅ 5个新功能全部实现
- ✅ 用户平均使用时长提升50%
- ✅ 任务完成率 > 60%
- ✅ 家长端使用率 > 40%
- ✅ 无重大bug（崩溃率 < 0.5%）

---

## 🚀 开始开发

让我们从 **Feature 9: 探险森林场景** 开始！

---

*Created: 2026-03-20*
*Phase: Phase 2 - Core Features*
