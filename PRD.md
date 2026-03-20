# 幼儿英语学习平台 - 技术设计文档（PRD）

## 文档信息

- **项目名称**: Kids English Learning Platform
- **文档版本**: v2.0 (MVP完成版)
- **创建日期**: 2026-03-19
- **最后更新**: 2026-03-20
- **项目类型**: 个人创业项目
- **目标市场**: 中国
- **开发模式**: 全职开发 + AI辅助代码生成
- **当前状态**: ✅ MVP阶段已完成

---

## 1. 项目背景与目标

### 1.1 项目概述

面向中国3-6岁幼儿的英语学习平台，通过**AI双向对话交互**和**游戏化场景设计**，让儿童在快乐中自然习得英语。

### 1.2 核心竞争力

- **AI对话互动**：主要差异化优势，区别于传统点击式学习应用
- **场景化学习**：魔法花园、探险森林等沉浸式场景
- **个性化体验**：AI记住孩子的喜好、进度，提供定制化对话

### 1.3 目标用户

- **主要用户**：3-6岁中国幼儿（英语零基础）
- **次要用户**：家长（监控学习进度、设置学习内容）
- **测试用户**：开发者的3岁半孩子（零基础英语）

---

## 2. 技术栈决策

### 2.1 前端技术栈

| 技术 | 版本 | 选择理由 |
|------|------|----------|
| **Next.js** | 14 (App Router) | - 服务器组件减少客户端负担<br>- 内置API路由，无需单独后端<br>- AI生成代码质量高<br>- SEO友好 |
| **TypeScript** | 最新 | - 类型安全<br>- 减少运行时错误 |
| **TailwindCSS** | 最新 | - 快速样式开发<br>- 响应式设计 |
| **shadcn/ui** | 最新 | - 预制组件库，大幅减少开发时间<br>- 样式统一，适合快速迭代<br>- 可定制性强 |
| **Zustand** | 最新 | - 比Redux简单5倍<br>- 适合AI生成代码<br>- 管理学习进度、用户状态 |
| **Framer Motion** | 最新 | - 流畅动画效果<br>- 声明式API，易于维护 |

### 2.2 后端技术栈

| 技术 | 选择理由 |
|------|----------|
| **Next.js API Routes** | - 无需单独后端框架<br>- 统一技术栈<br>- 部署简单 |
| **Supabase** (PostgreSQL) | - 免费额度够MVP使用<br>- 实时订阅功能<br>- 内置认证系统<br>- AI生成代码质量高<br>- 简化数据库操作 |
| **Redis** (可选) | - 缓存AI对话结果<br>- 会话管理 |

### 2.3 AI服务

| 服务 | 用途 | 选择理由 |
|------|------|----------|
| **DeepSeek V3** | 主要AI对话引擎 | - 性价比高（是GPT-4o的1/10价格）<br>- 中文理解能力强<br>- 适合中国市场<br>- API稳定可靠 |
| **规则引擎** | 预设对话和常见问答 | - 降低70%成本<br>- 响应速度快<br>- 保证常见场景质量稳定 |

**混合模式策略：**
```
规则引擎（预设100+对话）
├── 词汇学习（50个常见问题）
├── 日常对话（30个句型）
└── 任务指令（20个）

AI引擎（DeepSeek V3）
├── 复杂问答（超出预设范围）
├── 上下文理解（记住孩子的名字、喜好）
├── 发音纠正和鼓励
└── 创意对话（孩子自由提问）
```

**匹配逻辑：**
1. 用户输入 → 正则匹配规则
2. 命中规则 → 返回预设答案（成本≈0）
3. 未命中 → 调用DeepSeek V3（成本≈¥0.001/次）
4. 保存到规则库（持续优化）

### 2.4 语音服务（✅ MVP已实现）

**⚠️ MVP实现：完全使用免费方案**

#### 实际实施方案

| 服务 | 用途 | 实现状态 | 成本 |
|------|------|----------|------|
| **Web Speech API** | 语音识别 + 语音合成 | ✅ 已实现 | **¥0** |

**已实现功能**：
- ✅ 语音识别 (SpeechRecognition)
- ✅ 语音合成 (SpeechSynthesis)
- ✅ 浏览器兼容性检测
- ✅ 错误处理和降级
- ✅ 对话循环控制
- ✅ 状态指示器（监听中/说话中/处理中）

**实现文件**：
- `lib/speech/use-speech.ts` - 语音Hook
- `lib/speech/webspeech.ts` - Web Speech API封装
- `app/garden/page.tsx` - 集成到魔法花园场景

**实际使用体验**：
- ✅ 完全免费，运行成本 ¥0
- ✅ Chrome/Safari体验最佳
- ✅ 响应速度快，无网络延迟
- ✅ 隐私保护好，数据不离开设备
- ✅ 适合MVP阶段验证

#### 后期升级方案（Phase 2可选）

如果正式上线后需要更高质量的儿童语音，可考虑升级：

| 服务 | 优势 | 成本 | 优先级 |
|------|------|------|--------|
| **科大讯飞** | 儿童音色、情感语音 | ¥76.5/月 | 低 |
| **ElevenLabs** | 高质量儿童声音 | $100-200/月 | 低 |
| **Azure Speech** | 稳定可靠 | $50-100/月 | 低 |

**升级时机建议**：
- 用户量 > 500
- 家长反馈语音质量需求
- 产生正向现金流后

### 2.5 内容生成（重要说明）

**⚠️ 关键原则**：所有图片和音乐在**开发阶段一次性准备**，运行时**不再生成**。

| 内容类型 | 数量 | 准备方式 | 运行时使用 | 成本 |
|----------|------|----------|-----------|------|
| **音乐** | 10-15首 | 下载/生成一次 | 直接播放，不生成 | ¥0（免费下载） |
| **音效** | 20-30个 | 下载/生成一次 | 直接播放，不生成 | ¥0（免费下载） |
| **图片** | 100-200张 | AI生成/购买一次 | 直接显示，不生成 | $10（一次性）或 ¥0 |

**详细清单**：请参阅 `素材准备清单.md` 文档，包含：
- 📁 完整目录结构
- 🎵 音乐和音效清单（30+文件）
- 🖼️ 图片清单（100-200张）
- 🛠️ 准备工具推荐
- 📋 使用示例代码

**准备步骤**：
1. 创建 `public/` 目录结构
2. 下载/生成所有素材文件
3. 按清单放置到对应目录
4. 代码中直接引用这些静态文件
5. 运行时永远不再生成图片或音乐

**更新后的成本**：
```
音乐成本：¥0（Freesound等免费下载）
图片成本：$10（一次性）或 ¥0（用免费素材）

MVP阶段运行成本：
- DeepSeek对话：¥30/月
- 语音服务：¥0（Web Speech API）
- 总计：~¥30/月

正式上线运行成本（100用户，可选升级）：
- DeepSeek对话：¥30/月
- 语音服务：¥76.5/月（如升级到混合方案）
- 总计：~¥106.5/月（或¥30/月，如不升级）
```

---

## 3. 系统架构设计

### 3.1 整体架构图

```
┌─────────────────────────────────────────────────────────┐
│                      儿童端（React）                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐  │
│  │魔法花园  │  │探险森林  │  │虚拟角色  │  │奖励系统 │  │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘  │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│                    API层（Next.js）                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐  │
│  │聊天API   │  │语音API   │  │进度API   │  │认证API  │  │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘  │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│                    服务层                                │
│  ┌──────────────┐        ┌──────────────┐              │
│  │ 规则引擎     │  → 否 → │ DeepSeek V3  │              │
│  │ (100+预设)   │ ← 是    │ AI对话       │              │
│  └──────────────┘        └──────────────┘              │
│         ↓                                                   │
│  ┌──────────────┐        ┌──────────────┐              │
│  │ 科大讯飞     │        │ Web Speech   │              │
│  │ 语音服务     │        │ 降级方案     │              │
│  └──────────────┘        └──────────────┘              │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│                    数据层（Supabase）                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐  │
│  │用户表    │  │学习记录  │  │对话历史  │  │词汇库   │  │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 3.2 数据流设计

```
用户语音输入
    ↓
科大讯飞语音识别
    ↓
规则引擎匹配
    ├─ 命中 → 返回预设答案
    └─ 未命中 → DeepSeek V3生成回复
    ↓
科大讯飞语音合成
    ↓
返回语音 + 动画 + 文字
    ↓
保存学习记录到Supabase
    ↓
更新进度和奖励
```

### 3.3 项目结构

```
kids-english-learning-platform/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 认证相关页面
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (learning)/               # 学习相关页面
│   │   ├── garden/              # 魔法花园
│   │   │   └── page.tsx
│   │   ├── profile/             # 儿童档案
│   │   │   └── page.tsx
│   │   ├── progress/            # 学习进度
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (parent)/                # 家长端
│   │   ├── dashboard/           # 学习报告
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/                     # API路由
│   │   ├── chat/               # AI对话
│   │   │   └── route.ts
│   │   ├── speech/             # 语音处理
│   │   │   ├── recognize/
│   │   │   │   └── route.ts
│   │   │   └── synthesize/
│   │   │       └── route.ts
│   │   ├── progress/           # 进度更新
│   │   │   └── route.ts
│   │   └── auth/               # 认证
│   │       └── route.ts
│   ├── layout.tsx              # 根布局
│   └── page.tsx                # 首页
├── components/                   # React组件
│   ├── ui/                      # shadcn/ui组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── voice/                   # 语音组件
│   │   ├── VoiceRecorder.tsx
│   │   ├── VoicePlayer.tsx
│   │   └── VoiceButton.tsx
│   ├── game/                    # 游戏组件
│   │   ├── MagicGarden.tsx
│   │   ├── VocabularyCard.tsx
│   │   └── RewardAnimation.tsx
│   ├── ai/                      # AI对话组件
│   │   ├── ChatInterface.tsx
│   │   ├── MessageBubble.tsx
│   │   └── TypingIndicator.tsx
│   └── common/                  # 通用组件
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Loading.tsx
├── lib/                         # 工具函数
│   ├── ai/                      # AI引擎
│   │   ├── deepseek.ts         # DeepSeek API
│   │   ├── rules.ts            # 规则引擎
│   │   ├── prompts.ts          # Prompt模板
│   │   └── safety.ts           # 内容安全过滤
│   ├── speech/                  # 语音处理
│   │   ├── iflytek.ts          # 科大讯飞
│   │   ├── web-speech.ts       # 浏览器API
│   │   └── fallback.ts         # 降级策略
│   ├── db/                      # 数据库
│   │   ├── supabase.ts         # Supabase客户端
│   │   ├── queries.ts          # 数据库查询
│   │   └── migrations.sql      # 数据库迁移
│   └── utils/                   # 通用工具
│       ├── validation.ts       # 数据验证
│       └── constants.ts        # 常量定义
├── types/                       # TypeScript类型
│   ├── user.ts
│   ├── chat.ts
│   ├── progress.ts
│   └── vocabulary.ts
├── public/                      # 静态资源
│   ├── images/                  # 图片
│   │   ├── garden/             # 魔法花园素材
│   │   ├── characters/         # 角色图片
│   │   └── rewards/            # 奖励图标
│   ├── sounds/                  # 音效
│   │   ├── buttons/            # 按钮音效
│   │   ├── rewards/            # 奖励音效
│   │   └── background/         # 背景音乐
│   └── models/                  # 3D模型（可选）
├── hooks/                       # 自定义Hooks
│   ├── useChat.ts
│   ├── useSpeech.ts
│   ├── useProgress.ts
│   └── useAuth.ts
├── stores/                      # Zustand状态管理
│   ├── chatStore.ts
│   ├── userStore.ts
│   └── progressStore.ts
├── styles/                      # 全局样式
│   └── globals.css
├── .env.local                   # 环境变量
├── next.config.js               # Next.js配置
├── tailwind.config.ts           # TailwindCSS配置
├── tsconfig.json                # TypeScript配置
└── package.json                 # 依赖管理
```

---

## 4. 数据库设计

### 4.1 数据表结构

```sql
-- 用户表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_email VARCHAR(255) UNIQUE NOT NULL,
  parent_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 儿童档案表
CREATE TABLE child_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 3 AND age <= 6),
  english_level VARCHAR(20) DEFAULT 'beginner', -- beginner, intermediate, advanced
  avatar_url VARCHAR(500),
  favorite_animal VARCHAR(100),
  favorite_color VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 词汇库表
CREATE TABLE vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  word VARCHAR(100) NOT NULL UNIQUE,
  translation VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL, -- animals, fruits, colors, numbers
  pronunciation VARCHAR(200), -- IPA音标
  audio_url VARCHAR(500), -- 语音文件URL
  image_url VARCHAR(500), -- 图片URL
  example_sentence TEXT,
  difficulty INTEGER DEFAULT 1 CHECK (difficulty >= 1 AND difficulty <= 3),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 学习记录表
CREATE TABLE learning_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  vocabulary_id UUID REFERENCES vocabulary(id),
  is_correct BOOLEAN,
  attempts INTEGER DEFAULT 1,
  audio_url VARCHAR(500), -- 孩子发音录音
  pronunciation_score DECIMAL(5,2), -- 发音准确度分数
  learned_at TIMESTAMP DEFAULT NOW()
);

-- 对话历史表
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  audio_url VARCHAR(500), -- 语音文件URL
  is_ai_generated BOOLEAN DEFAULT true, -- true=AI生成, false=规则引擎
  created_at TIMESTAMP DEFAULT NOW()
);

-- 学习进度表
CREATE TABLE learning_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE UNIQUE,
  total_words_learned INTEGER DEFAULT 0,
  total_conversations INTEGER DEFAULT 0,
  total_stars INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  last_learned_at TIMESTAMP,
  consecutive_days INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 奖励记录表
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  reward_type VARCHAR(50) NOT NULL, -- 'star', 'coin', 'gem'
  quantity INTEGER DEFAULT 1,
  reason VARCHAR(255),
  earned_at TIMESTAMP DEFAULT NOW()
);

-- 成就表
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  achievement_type VARCHAR(100) NOT NULL, -- 'first_word', 'word_master', etc.
  achievement_name VARCHAR(200) NOT NULL,
  badge_url VARCHAR(500),
  earned_at TIMESTAMP DEFAULT NOW()
);

-- 每日任务表
CREATE TABLE daily_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  task_date DATE NOT NULL,
  vocabulary_learned INTEGER DEFAULT 0,
  conversations_completed INTEGER DEFAULT 0,
  stars_earned INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(child_id, task_date)
);

-- 索引优化
CREATE INDEX idx_learning_records_child ON learning_records(child_id);
CREATE INDEX idx_chat_history_child ON chat_history(child_id);
CREATE INDEX idx_learning_records_vocab ON learning_records(vocabulary_id);
CREATE INDEX idx_chat_history_created ON chat_history(created_at DESC);
```

### 4.2 初始数据

```sql
-- 插入初始词汇数据（50个）
INSERT INTO vocabulary (word, translation, category, example_sentence, difficulty) VALUES
-- 动物 (20个)
('cat', '猫', 'animals', 'This is a cat.', 1),
('dog', '狗', 'animals', 'I like dogs.', 1),
('bird', '鸟', 'animals', 'Look at the bird!', 1),
('fish', '鱼', 'animals', 'The fish is swimming.', 1),
('rabbit', '兔子', 'animals', 'The rabbit is jumping.', 1),
('bear', '熊', 'animals', 'This is a bear.', 1),
('lion', '狮子', 'animals', 'The lion is big.', 1),
('tiger', '老虎', 'animals', 'I see a tiger.', 1),
('elephant', '大象', 'animals', 'The elephant has a long nose.', 1),
('monkey', '猴子', 'animals', 'The monkey is climbing.', 1),
('duck', '鸭子', 'animals', 'The duck says quack.', 1),
('chicken', '鸡', 'animals', 'This is a chicken.', 1),
('cow', '奶牛', 'animals', 'The cow says moo.', 1),
('horse', '马', 'animals', 'The horse is running.', 1),
('sheep', '绵羊', 'animals', 'The sheep is white.', 1),
('pig', '猪', 'animals', 'This is a pig.', 1),
('mouse', '老鼠', 'animals', 'The mouse is small.', 1),
('snake', '蛇', 'animals', 'The snake is long.', 1),
('frog', '青蛙', 'animals', 'The frog is green.', 1),
('turtle', '乌龟', 'animals', 'The turtle is slow.', 1),

-- 水果 (10个)
('apple', '苹果', 'fruits', 'I like apples.', 1),
('banana', '香蕉', 'fruits', 'The banana is yellow.', 1),
('orange', '橙子', 'fruits', 'This is an orange.', 1),
('pear', '梨', 'fruits', 'I want a pear.', 1),
('grape', '葡萄', 'fruits', 'Grapes are purple.', 1),
('strawberry', '草莓', 'fruits', 'I like strawberries.', 1),
('watermelon', '西瓜', 'fruits', 'The watermelon is big.', 1),
('peach', '桃子', 'fruits', 'This is a peach.', 1),
('cherry', '樱桃', 'fruits', 'Cherries are red.', 1),
('lemon', '柠檬', 'fruits', 'The lemon is sour.', 1),

-- 颜色 (10个)
('red', '红色', 'colors', 'The apple is red.', 1),
('blue', '蓝色', 'colors', 'The sky is blue.', 1),
('yellow', '黄色', 'colors', 'The banana is yellow.', 1),
('green', '绿色', 'colors', 'The frog is green.', 1),
('orange', '橙色', 'colors', 'This is orange.', 1),
('purple', '紫色', 'colors', 'Grapes are purple.', 1),
('pink', '粉色', 'colors', 'I like pink.', 1),
('black', '黑色', 'colors', 'The cat is black.', 1),
('white', '白色', 'colors', 'The sheep is white.', 1),
('brown', '棕色', 'colors', 'The bear is brown.', 1),

-- 数字 (1-10)
('one', '一', 'numbers', 'I have one cat.', 1),
('two', '二', 'numbers', 'I see two birds.', 1),
('three', '三', 'numbers', 'Three rabbits.', 1),
('four', '四', 'numbers', 'I have four apples.', 1),
('five', '五', 'numbers', 'Five stars.', 1),
('six', '六', 'numbers', 'Six fish.', 1),
('seven', '七', 'numbers', 'Seven days.', 1),
('eight', '八', 'numbers', 'Eight ducks.', 1),
('nine', '九', 'numbers', 'Nine oranges.', 1),
('ten', '十', 'numbers', 'Ten fingers.', 1);
```

---

## 5. 核心功能设计

### 5.1 规则引擎设计

#### 5.1.1 规则引擎数据结构

```typescript
// lib/ai/rules.ts
export interface Rule {
  id: string;
  pattern: RegExp | string[];
  response: string | ResponseTemplate;
  priority: number;
  needsContext?: boolean;
  saveData?: {
    field: string;
    extractFrom: 'input' | 'match';
  };
}

export interface ResponseTemplate {
  template: string;
  followUp?: string;
  animation?: string;
  sound?: string;
}

// 规则分类
export const RuleCategories = {
  GREETING: 'greeting',
  VOCABULARY: 'vocabulary',
  TASKS: 'tasks',
  FAREWELL: 'farewell',
  HELP: 'help',
  REPEAT: 'repeat',
} as const;

// 规则库
export const ruleEngine: Rule[] = [
  // === 问候类 ===
  {
    id: 'greeting-hello',
    pattern: ['hello', 'hi', 'hi there', 'hey'],
    response: {
      template: 'Hello! 👋 I\'m {ai_name}! Welcome to the Magic Garden!',
      followUp: 'What\'s your name?',
      animation: 'wave',
      sound: 'greeting.wav'
    },
    priority: 1
  },
  {
    id: 'greeting-good-morning',
    pattern: ['good morning', 'morning'],
    response: {
      template: 'Good morning! ☀️ Ready to learn some English?',
      animation: 'smile',
      sound: 'greeting.wav'
    },
    priority: 1
  },
  {
    id: 'greeting-name',
    pattern: [/my name is (\w+)/, /i['m ]{0,1}am (\w+)/, /call me (\w+)/],
    response: {
      template: 'Nice to meet you, {name}! 🎉',
      followUp: 'Let\'s learn some words together!',
      animation: 'excited',
      sound: 'success.wav'
    },
    priority: 2,
    saveData: {
      field: 'name',
      extractFrom: 'match'
    }
  },

  // === 词汇学习类 ===
  {
    id: 'vocab-what-this',
    pattern: [/what['']s this/, /what is this/],
    response: 'It\'s a {item}! 🌟 You\'re so smart!',
    priority: 3,
    needsContext: true // 需要知道点击了什么物品
  },
  {
    id: 'vocab-what-color',
    pattern: [/what color/, /what['']s the color/],
    response: 'It\'s {color}! 🎨 Perfect!',
    priority: 3,
    needsContext: true
  },
  {
    id: 'vocab-how-many',
    pattern: [/how many/, /count the/],
    response: '{number}! One, two, three... {number} {item}s! 🔢',
    priority: 3,
    needsContext: true
  },
  {
    id: 'vocab-show-me',
    pattern: [/show me the (\w+)/, /find the (\w+)/, /where is the (\w+)/],
    response: {
      template: 'Can you find the {item}? 👀',
      animation: 'thinking',
      sound: 'task.wav'
    },
    priority: 4
  },

  // === 任务类 ===
  {
    id: 'task-i-like',
    pattern: [/i like (\w+)/, /i love (\w+)/],
    response: {
      template: 'Me too! {item} is amazing! ✨',
      followUp: 'What else do you like?',
      animation: 'happy',
      sound: 'agree.wav'
    },
    priority: 2,
    saveData: {
      field: 'favorite',
      extractFrom: 'match'
    }
  },
  {
    id: 'task-i-dont-like',
    pattern: [/i don['']t like (\w+)/, /i hate (\w+)/],
    response: {
      template: 'That\'s okay! We all like different things. 😊',
      followUp: 'What do you like?',
      animation: 'understanding',
      sound: 'gentle.wav'
    },
    priority: 2
  },

  // === 请求类 ===
  {
    id: 'request-repeat',
    pattern: ['say again', 'repeat', 'what did you say', 'pardon'],
    response: {
      template: 'Sure! I\'ll say it again.',
      action: 'repeat_last',
      animation: 'nod',
      sound: 'sure.wav'
    },
    priority: 2
  },
  {
    id: 'request-help',
    pattern: ['help', 'i don\'t know', 'how to', 'what do i do'],
    response: {
      template: 'No worries! Let me help you. 💪',
      followUp: 'Click on any item to learn about it!',
      animation: 'helpful',
      sound: 'help.wav'
    },
    priority: 1
  },

  // === 道别类 ===
  {
    id: 'farewell-bye',
    pattern: ['bye', 'goodbye', 'see you', 'bye bye', 'i have to go'],
    response: {
      template: 'Goodbye, {name}! 🌈 See you next time!',
      animation: 'wave',
      sound: 'farewell.wav'
    },
    priority: 1
  },
  {
    id: 'farewell-tired',
    pattern: ['i am tired', 'i want to sleep', 'i\'m tired'],
    response: {
      template: 'You did a great job today! Time to rest! 😴',
      animation: 'proud',
      sound: 'proud.wav'
    },
    priority: 1
  },

  // === 鼓励类 ===
  {
    id: 'encourage-good',
    pattern: ['i did it', 'yes i did', 'i got it right'],
    response: {
      template: 'Amazing! You\'re a superstar! 🌟⭐🎉',
      animation: 'celebrate',
      sound: 'celebration.wav'
    },
    priority: 1
  },
];
```

#### 5.1.2 规则匹配逻辑

```typescript
// lib/ai/rules-engine.ts
import { ruleEngine, Rule } from './rules';
import { supabase } from '@/lib/db/supabase';

export interface MatchResult {
  matched: boolean;
  rule?: Rule;
  extractedData?: Record<string, any>;
}

export class RulesEngine {
  /**
   * 匹配输入到规则
   */
  static match(input: string): MatchResult {
    const normalizedInput = input.toLowerCase().trim();

    // 按优先级排序规则
    const sortedRules = [...ruleEngine].sort((a, b) => b.priority - a.priority);

    for (const rule of sortedRules) {
      const match = this.testPattern(rule.pattern, normalizedInput);
      if (match) {
        return {
          matched: true,
          rule,
          extractedData: match
        };
      }
    }

    return { matched: false };
  }

  /**
   * 测试模式匹配
   */
  private static testPattern(
    pattern: RegExp | string[],
    input: string
  ): Record<string, any> | null {
    // 正则表达式匹配
    if (pattern instanceof RegExp) {
      const match = input.match(pattern);
      if (match) {
        return { match: match[1] || match[0] };
      }
      return null;
    }

    // 字符串数组匹配
    if (Array.isArray(pattern)) {
      for (const p of pattern) {
        if (input.includes(p.toLowerCase())) {
          return { matched: p };
        }
      }
      return null;
    }

    return null;
  }

  /**
   * 生成响应（使用模板和数据）
   */
  static generateResponse(
    rule: Rule,
    extractedData: Record<string, any>,
    context?: Record<string, any>
  ): string {
    let response: string;

    if (typeof rule.response === 'string') {
      response = rule.response;
    } else {
      response = rule.response.template;
    }

    // 替换模板变量
    response = response.replace(/{(\w+)}/g, (match, key) => {
      // 优先使用提取的数据
      if (extractedData[key]) {
        return extractedData[key];
      }
      // 其次使用上下文数据
      if (context && context[key]) {
        return context[key];
      }
      // 最后使用默认值
      return match;
    });

    return response;
  }

  /**
   * 保存用户数据（如果规则指定）
   */
  static async saveUserData(
    childId: string,
    rule: Rule,
    extractedData: Record<string, any>
  ): Promise<void> {
    if (!rule.saveData) return;

    const { field, extractFrom } = rule.saveData;
    const value = extractFrom === 'match' ? extractedData.match : extractedData[field];

    if (!value) return;

    // 保存到数据库
    await supabase
      .from('child_profiles')
      .update({
        [field]: value,
        updated_at: new Date().toISOString()
      })
      .eq('id', childId);
  }

  /**
   * 获取上下文数据（如当前点击的物品）
   */
  static async getContext(childId: string): Promise<Record<string, any>> {
    // 从数据库获取孩子信息
    const { data: child } = await supabase
      .from('child_profiles')
      .select('*')
      .eq('id', childId)
      .single();

    if (!child) return {};

    return {
      name: child.name,
      favorite_animal: child.favorite_animal,
      favorite_color: child.favorite_color,
      ai_name: 'Owl' // AI角色名称
    };
  }
}
```

### 5.2 AI引擎设计

#### 5.2.1 DeepSeek V3集成

```typescript
// lib/ai/deepseek.ts
import { createOpenAI } from '@ai-sdk/openai';

const deepseek = createOpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatOptions {
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export class DeepSeekAI {
  private static readonly SYSTEM_PROMPT = `You are a friendly owl teacher named "Owl" for 3-year-old children learning English.

CRITICAL RULES:
- Use SIMPLE words and SHORT sentences (under 15 words)
- Always ENCOURAGE and PRAISE the child
- Use EMOJIS occasionally: 🌟 🎈 🎉 👋 😊
- NEVER suggest anything outside of learning
- If child says something inappropriate, gently redirect
- Keep responses under 20 words
- Be enthusiastic and warm

EXAMPLE RESPONSES:
✅ "Wow! You said that perfectly! 🌟"
✅ "Great job! That's a cat! 🐱"
✅ "Almost there! Let's try together: Apple. Can you say it?"
❌ "No, that's wrong." (Avoid negative expressions)
❌ "You need to practice more." (Too discouraging)

CURRENT CONTEXT:
- Child's age: 3-6 years old
- English level: Beginner
- Current location: Magic Garden
- Learning vocabulary: Animals, fruits, colors, numbers`;

  /**
   * 发送聊天请求到DeepSeek V3
   */
  static async chat(
    messages: ChatMessage[],
    options: ChatOptions = {}
  ): Promise<string> {
    try {
      const response = await deepseek.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: this.SYSTEM_PROMPT },
          ...messages
        ],
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 100,
        stream: options.stream ?? false
      });

      return response.choices[0].message.content || "I didn't understand. Can you say it again?";
    } catch (error) {
      console.error('DeepSeek API error:', error);
      throw new Error('Failed to get AI response');
    }
  }

  /**
   * 流式聊天（用于实时显示）
   */
  static async *chatStream(
    messages: ChatMessage[],
    options: ChatOptions = {}
  ): AsyncGenerator<string> {
    try {
      const stream = await deepseek.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: this.SYSTEM_PROMPT },
          ...messages
        ],
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 100,
        stream: true
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          yield content;
        }
      }
    } catch (error) {
      console.error('DeepSeek stream error:', error);
      throw new Error('Failed to stream AI response');
    }
  }

  /**
   * 评估孩子的发音/回答
   */
  static async evaluateAnswer(
    question: string,
    correctAnswer: string,
    childAnswer: string
  ): Promise<{
    isCorrect: boolean;
    score: number;
    feedback: string;
  }> {
    const prompt = `Evaluate this 3-year-old child's English answer:

Question: "${question}"
Correct Answer: "${correctAnswer}"
Child's Answer: "${childAnswer}"

Consider:
- Is the answer correct or close enough?
- Pronunciation and spelling flexibility for 3-year-olds
- Effort and understanding

Respond in JSON format:
{
  "isCorrect": boolean,
  "score": number (0-100),
  "feedback": "short encouraging message for the child"
}`;

    try {
      const response = await deepseek.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a patient English teacher for young children.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return result;
    } catch (error) {
      console.error('Evaluation error:', error);
      // 默认返回鼓励性反馈
      return {
        isCorrect: false,
        score: 50,
        feedback: "Good try! Let's practice together!"
      };
    }
  }
}
```

#### 5.2.2 混合模式协调器

```typescript
// lib/ai/hybrid-engine.ts
import { RulesEngine, MatchResult } from './rules';
import { DeepSeekAI, ChatMessage } from './deepseek';
import { supabase } from '@/lib/db/supabase';

export interface ChatResponse {
  text: string;
  audioUrl?: string;
  animation?: string;
  sound?: string;
  isAI: boolean;
  followUp?: string;
}

export class HybridChatEngine {
  /**
   * 处理用户消息（混合模式）
   */
  static async processMessage(
    childId: string,
    userInput: string,
    context?: Record<string, any>
  ): Promise<ChatResponse> {
    // 1. 尝试规则引擎匹配
    const ruleMatch = RulesEngine.match(userInput);

    if (ruleMatch.matched && ruleMatch.rule) {
      console.log('✅ Rule matched:', ruleMatch.rule.id);

      // 2. 生成规则响应
      const response = RulesEngine.generateResponse(
        ruleMatch.rule,
        ruleMatch.extractedData || {},
        { ...(await RulesEngine.getContext(childId)), ...context }
      );

      // 3. 保存用户数据（如果需要）
      if (ruleMatch.rule.saveData) {
        await RulesEngine.saveUserData(childId, ruleMatch.rule, ruleMatch.extractedData || {});
      }

      return {
        text: response,
        isAI: false,
        animation: typeof ruleMatch.rule.response !== 'string' ? ruleMatch.rule.response.animation : undefined,
        sound: typeof ruleMatch.rule.response !== 'string' ? ruleMatch.rule.response.sound : undefined,
        followUp: typeof ruleMatch.rule.response !== 'string' ? ruleMatch.rule.response.followUp : undefined
      };
    }

    // 4. 规则引擎未命中，使用AI
    console.log('🤖 Using AI (DeepSeek V3)');

    // 5. 获取对话历史（最近10条）
    const { data: history } = await supabase
      .from('chat_history')
      .select('role, content')
      .eq('child_id', childId)
      .order('created_at', { ascending: false })
      .limit(10);

    const messages: ChatMessage[] = [
      ...(history || []).reverse().map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      { role: 'user', content: userInput }
    ];

    // 6. 调用DeepSeek V3
    const aiResponse = await DeepSeekAI.chat(messages, {
      temperature: 0.7,
      maxTokens: 100
    });

    return {
      text: aiResponse,
      isAI: true
    };
  }

  /**
   * 保存对话到数据库
   */
  static async saveConversation(
    childId: string,
    userMessage: string,
    aiResponse: ChatResponse
  ): Promise<void> {
    // 保存用户消息
    await supabase.from('chat_history').insert({
      child_id: childId,
      role: 'user',
      content: userMessage,
      is_ai_generated: false
    });

    // 保存AI回复
    await supabase.from('chat_history').insert({
      child_id: childId,
      role: 'assistant',
      content: aiResponse.text,
      audio_url: aiResponse.audioUrl,
      is_ai_generated: aiResponse.isAI
    });
  }

  /**
   * 获取对话统计（用于优化规则引擎）
   */
  static async getConversationStats(childId: string) {
    const { data } = await supabase
      .from('chat_history')
      .select('is_ai_generated')
      .eq('child_id', childId);

    const total = data?.length || 0;
    const aiGenerated = data?.filter(d => d.is_ai_generated).length || 0;
    const ruleBased = total - aiGenerated;

    return {
      total,
      aiGenerated,
      ruleBased,
      aiPercentage: total > 0 ? (aiGenerated / total) * 100 : 0
    };
  }
}
```

### 5.3 语音服务设计

#### 5.3.1 科大讯飞语音识别

```typescript
// lib/speech/iflytek.ts
import crypto from 'crypto';

export interface IFlyTekConfig {
  appId: string;
  apiKey: string;
  apiSecret: string;
}

export class IFlyTekSpeechRecognition {
  private config: IFlyTekConfig;

  constructor(config: IFlyTekConfig) {
    this.config = config;
  }

  /**
   * 生成鉴权URL
   */
  private generateAuthUrl(): string {
    const host = 'raasr.xfyun.cn';
    const path = '/v2/api/upload';
    const method = 'POST';

    // 生成RFC1123格式时间戳
    const date = new Date().toUTCString();

    // 生成签名原文
    const signatureOrigin = `host: ${host}\ndate: ${date}\n${method} ${path} HTTP/1.1`;

    // 使用HMAC-SHA256加密
    const signatureSha = crypto
      .createHmac('sha256', this.config.apiSecret)
      .update(signatureOrigin)
      .digest('base64');

    // 生成authorization
    const authorizationOrigin = `api_key="${this.config.apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signatureSha}"`;
    const authorization = Buffer.from(authorizationOrigin).toString('base64');

    // 生成请求URL
    const params = new URLSearchParams({
      authorization,
      date,
      host
    });

    return `https://${host}${path}?${params.toString()}`;
  }

  /**
   * 识别音频文件
   */
  async recognize(audioData: Buffer, options: {
    language?: 'en' | 'zh';
    format?: 'wav' | 'mp3' | 'pcm';
  } = {}): Promise<string> {
    const { language = 'en', format = 'wav' } = options;

    try {
      const url = this.generateAuthUrl();

      const formData = new FormData();
      formData.append('file', new Blob([audioData]), `audio.${format}`);
      formData.append('language', language === 'en' ? 'en_us' : 'zh_cn');

      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`IFlyTek API error: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.code !== 0) {
        throw new Error(`IFlyTek recognition failed: ${result.message}`);
      }

      return result.data?.result?.[0] || '';
    } catch (error) {
      console.error('IFlyTek recognition error:', error);
      throw error;
    }
  }

  /**
   * 流式识别（实时语音转文字）
   */
  async *recognizeStream(audioStream: AsyncIterable<Buffer>): AsyncGenerator<string> {
    // 实现流式识别逻辑
    // 这需要WebSocket连接到科大讯飞的实时语音服务
    // 这里简化实现
    for await (const chunk of audioStream) {
      const result = await this.recognize(chunk);
      if (result) {
        yield result;
      }
    }
  }
}
```

#### 5.3.2 科大讯飞语音合成

```typescript
// lib/speech/iflytek-tts.ts
import crypto from 'crypto';

export class IFlyTekTTS {
  private config: IFlyTekConfig;

  constructor(config: IFlyTekConfig) {
    this.config = config;
  }

  /**
   * 文字转语音
   */
  async synthesize(text: string, options: {
    voiceName?: string;
    speed?: number;
    volume?: number;
    pitch?: number;
  } = {}): Promise<Buffer> {
    const {
      voiceName = 'xiaoyan', // 默认女声
      speed = 50,
      volume = 50,
      pitch = 50
    } = options;

    try {
      const host = 'tts.xfyun.cn';
      const path = '/v1/private/tsl8n_multimedia_bantu_cylинга_streaming';
      const method = 'POST';
      const date = new Date().toUTCString();

      // 构建请求体
      const requestBody = {
        text,
        voice_name: voiceName,
        speed,
        volume,
        pitch,
        format: 'wav',
        encoding: 'utf8'
      };

      // 生成签名
      const signatureOrigin = `host: ${host}\ndate: ${date}\n${method} ${path} HTTP/1.1`;
      const signatureSha = crypto
        .createHmac('sha256', this.config.apiSecret)
        .update(signatureOrigin)
        .digest('base64');

      const authorizationOrigin = `api_key="${this.config.apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signatureSha}"`;
      const authorization = Buffer.from(authorizationOrigin).toString('base64');

      // 发送请求
      const url = `https://${host}${path}?authorization=${encodeURIComponent(authorization)}&date=${encodeURIComponent(date)}&host=${host}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`IFlyTek TTS error: ${response.statusText}`);
      }

      const audioBuffer = await response.arrayBuffer();
      return Buffer.from(audioBuffer);
    } catch (error) {
      console.error('IFlyTek TTS error:', error);
      throw error;
    }
  }

  /**
   * 获取儿童声音列表
   */
  getChildVoices(): Array<{ id: string; name: string; description: string }> {
    return [
      { id: 'xiaoyan', name: '小燕（女童）', description: '5-6岁女孩声音' },
      { id: 'xiaofeng', name: '小峰（男童）', description: '5-6岁男孩声音' },
      { id: 'aisxping', name: '艾思平（温柔女声）', description: '温柔老师声音' },
      { id: 'aisjinger', name: '艾思洁儿（活泼女声）', description: '活泼姐姐声音' }
    ];
  }
}
```

#### 5.3.3 语音降级策略

```typescript
// lib/speech/fallback.ts
import { IFlyTekSpeechRecognition, IFlyTekTTS } from './iflytek';
import { WebSpeechRecognition, WebSpeechTTS } from './web-speech';

export class SpeechService {
  private iflytekASR: IFlyTekSpeechRecognition;
  private iflytekTTS: IFlyTekTTS;
  private webASR: WebSpeechRecognition;
  private webTTS: WebSpeechTTS;

  constructor(iflytekConfig: IFlyTekConfig) {
    this.iflytekASR = new IFlyTekSpeechRecognition(iflytekConfig);
    this.iflytekTTS = new IFlyTekTTS(iflytekConfig);
    this.webASR = new WebSpeechRecognition();
    this.webTTS = new WebSpeechTTS();
  }

  /**
   * 语音识别（带降级策略）
   */
  async recognize(audioData: Buffer, options?: any): Promise<{
    text: string;
    provider: 'iflytek' | 'web';
    confidence: number;
  }> {
    try {
      // 优先使用科大讯飞
      const text = await this.iflytekASR.recognize(audioData, options);
      return {
        text,
        provider: 'iflytek',
        confidence: 0.95
      };
    } catch (error) {
      console.warn('IFlyTek failed, falling back to Web Speech API:', error);

      // 降级到Web Speech API
      try {
        const text = await this.webASR.recognize(audioData);
        return {
          text,
          provider: 'web',
          confidence: 0.70
        };
      } catch (webError) {
        console.error('Web Speech API also failed:', webError);
        throw new Error('All speech recognition providers failed');
      }
    }
  }

  /**
   * 语音合成（带降级策略）
   */
  async synthesize(text: string, options?: any): Promise<{
    audioData: Buffer;
    provider: 'iflytek' | 'web';
  }> {
    try {
      // 优先使用科大讯飞
      const audioData = await this.iflytekTTS.synthesize(text, options);
      return {
        audioData,
        provider: 'iflytek'
      };
    } catch (error) {
      console.warn('IFlyTek TTS failed, falling back to Web Speech API:', error);

      // 降级到Web Speech API
      return {
        audioData: Buffer.from([]), // Web Speech API直接播放，不返回音频数据
        provider: 'web'
      };
    }
  }
}
```

---

## 6. UI/UX设计规范

### 6.1 设计原则

- **色彩鲜艳**：使用明亮、饱和的颜色吸引注意力
- **大按钮设计**：最小点击区域44x44px，适合儿童手指操作
- **即时反馈**：每个操作都有声音、动画反馈
- **最小化文字**：以图像和声音为主，文字为辅
- **友好角色**：可爱的猫头鹰老师作为AI形象

### 6.2 颜色方案

```typescript
// tailwind.config.ts
const colors = {
  primary: {
    blue: '#4F46E5',      // 主蓝色
    yellow: '#FBBF24',    // 主黄色
    green: '#10B981',     // 主绿色
    orange: '#F97316',    // 主橙色
  },
  accent: {
    pink: '#EC4899',      // 强调粉色
    purple: '#8B5CF6',    // 强调紫色
  },
  neutral: {
    cream: '#FFF7ED',     // 背景奶油色
    lightBlue: '#E0F2FE', // 背景浅蓝
    gray: '#6B7280',      // 中性灰
  }
};
```

### 6.3 字体规范

```typescript
// app/globals.css
.font-primary {
  font-family: 'Fredoka One', 'Comic Sans MS', cursive;
}

.font-size-large {
  font-size: 32px;  /* 主要文字 */
}

.font-size-medium {
  font-size: 24px;  /* 次要文字 */
}

.font-size-small {
  font-size: 18px;  /* 最小文字 */
}
```

### 6.4 动画规范

```typescript
// 所有动画过渡时间200-300ms
const animation = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500
  },
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // 弹性效果
};
```

---

## 7. 安全性与合规

### 7.1 儿童隐私保护

- **COPPA合规**：符合美国儿童在线隐私保护法
- **最小数据收集**：只收集必要的学习数据
- **家长授权**：所有功能需要家长同意
- **数据加密**：所有敏感数据加密存储
- **本地优先**：语音录音优先存储在本地

### 7.2 内容安全

```typescript
// lib/ai/safety.ts
export class ContentSafety {
  // 敏感词列表
  private static readonly SENSITIVE_WORDS = [
    // 暴力相关
    'kill', 'hurt', 'fight',
    // 不当内容
    // ...
  ];

  /**
   * 检查输入是否安全
   */
  static checkInput(input: string): { safe: boolean; reason?: string } {
    const lowerInput = input.toLowerCase();

    for (const word of this.SENSITIVE_WORDS) {
      if (lowerInput.includes(word)) {
        return {
          safe: false,
          reason: 'Sensitive word detected'
        };
      }
    }

    return { safe: true };
  }

  /**
   * 过滤AI输出
   */
  static filterOutput(output: string): string {
    // 移除不当内容
    // 限制长度
    // 确保友好语气
    return output;
  }
}
```

### 7.3 家长控制

- **PIN码保护**：家长设置页面需要PIN码
- **时间限制**：可设置每日学习时长
- **内容过滤**：可选择学习主题
- **数据查看**：家长可查看所有学习记录
- **账户删除**：可随时删除账户和数据

---

## 8. 开发计划

### 8.1 MVP阶段完成情况（✅ 已完成）

**实际开发时间：2026-03-19 至 2026-03-20**

#### 已完成的8个核心功能

**Feature 1: 首页和基础布局** ✅
- 响应式设计
- 彩色渐变背景
- 卡片式布局
- 导航系统
- 实现文件: `app/page.tsx`

**Feature 2: 规则引擎** ✅
- 正则表达式匹配
- 优先级系统
- 模板化回复
- 词汇教学逻辑
- 实现文件: `lib/rules/`, `lib/rules/achievement-definitions.ts`

**Feature 3: DeepSeek V3 集成** ✅
- AI对话功能
- 词汇学习
- 智能回复
- 错误处理
- 实现文件: `app/api/chat/route.ts`

**Feature 4: Web Speech API** ✅
- 语音识别
- 语音合成
- 对话循环
- 浏览器兼容处理
- 实现文件: `lib/speech/use-speech.ts`

**Feature 5: 魔法花园场景** ✅
- 聊天界面
- 实时消息显示
- 状态指示器
- 儿童友好设计
- 实现文件: `app/garden/page.tsx`

**Feature 6: 奖励系统** ✅
- 星星奖励机制
- 20+徽章系统
- 成就追踪
- 连续学习天数
- 实时通知
- 实现文件: `lib/rewards/`, `components/rewards/`

**Feature 7: Supabase 数据库** ✅
- 完整数据库schema（10个表）
- 数据访问层(DAL)
- 行级安全(RLS)
- 触发器和视图
- 持久化存储
- 实现文件: `lib/supabase/`, `supabase/migrations/`

**Feature 8: 学习进度追踪** ✅
- 进度摘要
- 周报告
- 月报告
- 统计仪表板
- 实现文件: `lib/progress/`, `app/progress/page.tsx`

#### MVP技术调整说明

**1. 语音服务调整**
- 原计划：科大讯飞（付费） + Web Speech API（免费降级）
- 实际实现：完全使用 Web Speech API（免费）
- 原因：
  - MVP阶段成本控制
  - Web Speech API已满足基本需求
  - Chrome/Safari支持良好
  - 零运行成本，适合验证

**2. 数据库选择**
- 原计划：考虑MySQL兼容方案
- 实际实现：Supabase (PostgreSQL)
- 原因：
  - Supabase免费额度充足
  - 内置认证和RLS
  - TypeScript支持优秀
  - AI生成代码质量高

**3. shadcn/ui组件库**
- 原计划：使用shadcn/ui
- 实际实现：自定义组件 + TailwindCSS
- 原因：
  - 快速开发，减少配置
  - 更灵活的定制化
  - 减少依赖

**4. RLS策略实现**
- 实际实现：添加了anon用户的完整RLS策略
- 文件：`supabase/migrations/003_add_rls_policies.sql`
- 原因：支持客户端直接访问数据库

### 8.2 Phase 2 规划（待开发）

**第1-2周：探险森林场景**
- 对话练习场景
- 动物角色对话
- 场景任务系统

**第3-4周：厨房做蛋糕场景**
- 生活应用场景
- 动词和数量学习
- 创意模式

**第5-6周：虚拟角色系统**
- 角色创建
- 外观定制
- 装扮系统

**第7-8周：家长端完整功能**
- 学习报告优化
- 内容控制面板
- 时间管理

### 8.2 成本预算

**运行时月成本**（100个活跃用户）：

### MVP阶段（前3个月）
| 项目 | 月成本 | 说明 |
|------|--------|------|
| **DeepSeek V3** | ¥30 | 100用户，30%AI对话 |
| **Web Speech API** | ¥0 | 完全免费 |
| **Supabase** | ¥0 | 免费额度够用 |
| **Vercel** | ¥0 | 免费额度够用 |
| **MVP总计** | **~¥30/月** | 超低成本启动 |

### 正式上线后（可选升级）
| 项目 | 月成本 | 说明 |
|------|--------|------|
| **DeepSeek V3** | ¥30 | 100用户，30%AI对话 |
| **语音服务** | ¥0-¥76.5 | 根据是否升级决定 |
| **Supabase** | ¥0 | 免费额度够用 |
| **Vercel** | ¥0 | 免费额度够用 |
| **上线总计** | **¥30-106.5/月** | 灵活选择 |

**一次性投入**（开发阶段）：

| 项目 | 成本 | 说明 |
|------|------|------|
| **音乐和音效** | ¥0 | Freesound等免费下载 |
| **图片素材** | $10（一次性）或 ¥0 | Leonardo.ai生成或用免费素材 |
| **准备时间** | 3-5小时 | 下载/生成素材 |

**总计**：
- 一次性投入：$10（或¥0）+ 3-5小时
- MVP运行时：¥30/月
- 正式运行时：¥30-106.5/月（灵活选择）
- 单用户成本：¥0.3-1.07/月/用户

---

## 9. 成功指标

### 9.1 MVP成功标准

- ✅ 20个测试用户
- ✅ 平均每日学习5分钟以上
- ✅ 家长满意度 > 80%
- ✅ 语音识别准确率 > 85%
- ✅ AI对话响应时间 < 2秒
- ✅ 应用崩溃率 < 1%

### 9.2 长期目标

- **6个月内**：1000个注册用户，100个日活
- **1年内**：5000个注册用户，500个日活
- **18个月内**：实现正向现金流

---

## 10. 风险与应对

### 10.1 技术风险

| 风险 | 可能性 | 影响 | 应对策略 |
|------|--------|------|----------|
| 儿童:语音识别准确率低 | 高 | 高 | 1. 模糊匹配<br>2. 上下文理解<br>3. 文字输入备选 |
| AI对话延迟 | 中 | 高 | 1. 规则引擎降级<br>2. 流式响应<br>3. 预加载 |
| 科大讯飞API不稳定 | 中 | 中 | 1. Web Speech API降级<br>2. 多供应商备选 |

### 10.2 产品风险

| 风险 | 可能性 | 影响 | 应对策略 |
|------|--------|------|----------|
| 儿童容易分心 | 高 | 高 | 1. 增强互动性<br>2. 短时段学习<br>3. 即时奖励 |
| 家长担心屏幕时间 | 中 | 中 | 1. 时间控制功能<br>2. 学习报告展示效果<br>3. 教育价值证明 |
| 市场竞争激烈 | 高 | 高 | 1. 突出AI互动差异化<br>2. 快速迭代<br>3. 家长口碑传播 |

---

## 11. 后续规划

### 11.1 Phase 2功能（3个月后）

- 探险森林场景（对话练习）
- 厨房做蛋糕场景（生活应用）
- 成就徽章系统
- 每日任务系统
- 虚拟角色创建
- 家长端完整功能

### 11.2 Phase 3功能（6个月后）

- 彩虹岛进阶场景
- 社交分享功能
- 多语言支持（中文学习）
- 节日主题活动
- AR/VR集成探索

---

## 12. 附录

### 12.1 环境变量配置

```bash
# .env.local
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# DeepSeek V3
DEEPSEEK_API_KEY=your_deepseek_api_key

# 科大讯飞
IFLYTEK_APP_ID=your_iflytek_app_id
IFLYTEK_API_KEY=your_iflytek_api_key
IFLYTEK_API_SECRET=your_iflytek_api_secret

# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Kids English Learning
```

### 12.2 推荐资源

**AI和语音服务：**
- DeepSeek: https://platform.deepseek.com/
- 科大讯飞: https://www.xfyun.cn/
- ElevenLabs: https://elevenlabs.io/

**开发工具：**
- Next.js: https://nextjs.org/
- shadcn/ui: https://ui.shadcn.com/
- Supabase: https://supabase.com/

**设计资源：**
- Leonardo.ai: https://leonardo.ai/
- Suno AI: https://suno.ai/
- Freesound: https://freesound.org/

---

**文档结束**

下一步行动：开始初始化Next.js项目并搭建开发环境。
