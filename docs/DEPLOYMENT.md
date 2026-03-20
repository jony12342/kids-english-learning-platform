# 🚀 Deployment Guide - Vercel + Supabase
# 部署指南 - Vercel + Supabase

本指南将帮助你将 Kids English Learning Platform 部署到 Vercel，使用 Supabase 作为数据库。

## 📋 准备工作

### 1. 注册 Supabase

#### 步骤：
1. 访问 https://supabase.com
2. 点击 "Start your project"
3. 选择使用 GitHub 账号登录（推荐）
4. 等待账号创建完成

#### 创建项目：
1. 点击 "New Project"
2. 填写项目信息：
   - **Name**: `kids-english-learning`（或任意名称）
   - **Database Password**: 设置一个强密码并**记住它**（例如：`YourStr0ngPassword123!`）
   - **Region**: 选择 `Southeast Asia (Singapore)`（离中国最近）
3. 点击 "Create new project"
4. 等待项目创建（约2分钟）

#### 获取 API 密钥：
1. 项目创建后，进入左侧菜单：**Settings** → **API**
2. 你会看到三个重要信息：
   ```
   Project URL: https://xxxxx.supabase.co
   anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   service_role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. **保存这三个信息**，后面会用到

#### 初始化数据库：
1. 在 Supabase 项目中，点击左侧菜单：**SQL Editor**
2. 点击 "New query"
3. 复制项目中的 `supabase/migrations/001_initial_schema.sql` 文件内容
4. 粘贴到 SQL 编辑器
5. 点击 "Run" ▶️ 或按 `Cmd+Enter` 执行
6. 等待执行完成，看到 "Success" 提示

---

### 2. 注册 Vercel

#### 步骤：
1. 访问 https://vercel.com
2. 点击 "Sign Up"
3. 选择 **Continue with GitHub**（推荐）
4. 授权 Vercel 访问你的 GitHub
5. 等待账号创建完成

#### 准备 GitHub 仓库（如果还没有）：
```bash
# 在 GitHub 上创建新仓库
# 仓库名：kids-english-learning-platform

# 然后在本地项目目录执行：
git init
git add .
git commit -m "Initial commit: Kids English Learning Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kids-english-learning-platform.git
git push -u origin main
```

---

## 🔧 配置环境变量

### 在 Vercel 中配置环境变量：

#### 方法1：通过 Vercel Dashboard（推荐）

1. 登录 Vercel：https://vercel.com/dashboard
2. 点击 "Add New..." → "Project"
3. 导入你的 GitHub 仓库
4. 在 "Configure Project" 页面，找到 "Environment Variables" 部分
5. 添加以下环境变量：

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | 你的 Supabase Project URL | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 你的 Supabase Anon Key | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | 你的 Supabase Service Role Key | Production, Preview |
| `DEEPSEEK_API_KEY` | 你的 DeepSeek API Key | Production, Preview, Development |

6. 点击 "Deploy"

#### 方法2：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 在项目目录执行
vercel

# 按提示操作：
# - Set up and deploy? Y
# - Which scope? 选择你的账号
# - Link to existing project? N
# - Project name: kids-english-learning
# - In which directory is your code located? ./
# - Want to override settings? N

# 添加环境变量
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# 粘贴你的 Supabase URL

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# 粘贴你的 Anon Key

vercel env add SUPABASE_SERVICE_ROLE_KEY production
# 粘贴你的 Service Role Key

vercel env add DEEPSEEK_API_KEY production
# 粘贴你的 DeepSeek API Key

# 部署到生产环境
vercel --prod
```

---

## 🚀 部署步骤

### 首次部署：

1. **推送代码到 GitHub**：
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push
   ```

2. **在 Vercel 导入项目**：
   - Vercel 会自动检测到你的 GitHub 仓库
   - 点击 "Import"
   - 确认配置
   - 点击 "Deploy"

3. **等待部署完成**（约2-3分钟）

4. **获取部署地址**：
   - Vercel 会给你一个 URL，例如：`https://kids-english-learning.vercel.app`

---

## ⚙️ 配置本地开发环境

创建 `.env.local` 文件：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=你的Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Anon Key
SUPABASE_SERVICE_ROLE_KEY=你的Service Role Key

# DeepSeek AI API
DEEPSEEK_API_KEY=你的DeepSeek API Key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## 🧪 测试部署

### 1. 测试本地环境：
```bash
npm run dev
```
访问 http://localhost:3000

### 2. 测试生产环境：
访问 Vercel 提供的 URL，例如：
```
https://kids-english-learning.vercel.app
```

### 3. 测试功能：
- ✅ 打开首页
- ✅ 进入魔法花园（/garden）
- ✅ 测试语音对话
- ✅ 查看进度页面（/progress）
- ✅ 检查 Supabase 数据库中是否有数据

---

## 📊 监控和调试

### 查看 Vercel 日志：
1. 进入 Vercel Dashboard
2. 选择你的项目
3. 点击 "Deployments"
4. 点击最新的部署
5. 查看 "Build Logs" 和 "Function Logs"

### 查看 Supabase 数据：
1. 进入 Supabase Dashboard
2. 选择你的项目
3. 点击 "Table Editor"
4. 查看各个表的数据

---

## 🔄 自动部署

配置完成后，每次你推送代码到 GitHub 主分支：
1. Vercel 自动检测到更新
2. 自动构建项目
3. 自动部署到生产环境
4. 给你发送部署结果通知

---

## 🎯 常见问题

### Q: 部署后 Supabase 连接失败？
A: 检查环境变量是否正确配置，特别是 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Q: 数据库表不存在？
A: 确保在 Supabase SQL Editor 中执行了 `001_initial_schema.sql`

### Q: 语音功能不工作？
A: 确保使用 HTTPS 或 localhost，语音 API 需要 HTTPS

### Q: 如何更新环境变量？
A:
- **Vercel Dashboard**: Project → Settings → Environment Variables
- **Vercel CLI**: `vercel env add`

### Q: 如何查看数据库内容？
A: Supabase Dashboard → Table Editor

---

## 📱 自定义域名（可选）

### 在 Vercel 添加自定义域名：
1. Vercel Dashboard → Your Project → Settings → Domains
2. 点击 "Add Domain"
3. 输入你的域名（如：`english.yourdomain.com`）
4. 按提示配置 DNS 记录

---

## 🎉 完成！

部署完成后：
- ✅ 应用在全球可访问
- ✅ 数据永久保存在 Supabase
- ✅ 自动 HTTPS 加密
- ✅ 全球 CDN 加速
- ✅ 自动持续部署

享受你的 Kids English Learning Platform 吧！🚀

---

## 📞 需要帮助？

- Vercel 文档：https://vercel.com/docs
- Supabase 文档：https://supabase.com/docs
- Next.js 文档：https://nextjs.org/docs

---

**祝部署顺利！** 🎊
