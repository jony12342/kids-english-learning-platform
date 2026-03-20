# 图片问题修复指南

## 问题说明
由于使用了 Unsplash 图片库，部分单词的图片可能不匹配或无法加载。

## 如何报告图片错误

### 用户操作：
1. 在单词学习页面，如果发现图片错误
2. 点击图片右上角的 **"❌ 图片错误"** 按钮
3. 系统会自动记录该错误

### 开发者查看报告：

#### 方法1：浏览器控制台查看
1. 打开浏览器控制台（F12）
2. 运行代码：
```javascript
JSON.parse(localStorage.getItem('reportedImages') || '[]')
```
3. 查看所有已报告的图片ID

#### 方法2：使用脚本工具
```bash
# 1. 从浏览器控制台复制报告的ID数组
# 2. 运行脚本
node scripts/check-reported-images.js <复制的ID数组>
```

## 修复图片错误

### 步骤：
1. 访问 [Unsplash](https://unsplash.com)
2. 搜索对应的英文单词（例如："ship"）
3. 选择一张合适的、清晰的图片
4. 点击图片，复制图片URL
5. 提取图片ID（格式：`photo-xxxxxxxxx-xxxxxxxxxx-xxxxxx`）
6. 更新 `data/words.ts` 文件

### 更新格式：
```typescript
{
  wordId: 'word_155',
  word: 'ship',
  chinese: '大船',
  category: 'vehicles',
  difficulty: 'medium',
  phonetic: '/ʃɪp/',
  exampleSentence: 'The ship is big.',
  imageUrl: 'https://images.unsplash.com/photo-[图片ID]?w=400&h=400&fit=crop&q=80'
}
```

### 示例：
如果找到的图片URL是：
```
https://images.unsplash.com/photo-1544551763-46a013bb70d5
```

则更新为：
```typescript
imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop&q=80'
```

## 批量检查建议

### 优先检查分类：
1. **Vehicles (交通工具)** - 船、飞机、汽车等容易出错
2. **Nature (自然)** - 植物、天气等抽象概念
3. **Actions (动作)** - 动词类难以用图片表达

### 手动测试方法：
1. 随机选择不同分类
2. 快速浏览每个单词
3. 标记不匹配的图片

## 已知问题图片

| 单词 | wordId | 问题描述 | 状态 |
|------|--------|---------|------|
| ship | word_155 | 原图显示建筑物 | ✅ 已修复 |

## 长期解决方案

### 方案1：使用专业图库
考虑使用以下教育专用图库：
- [Pixabay](https://pixabay.com) - 免费高质量图片
- [Pexels](https://pexels.com) - 免费商用图片
- [LoremFlickr](https://loremflickr.com) - 按关键词获取图片

### 方案2：本地图片存储
1. 下载所有图片到 `public/images/words/` 目录
2. 按分类组织文件夹结构
3. 更新 imageUrl 为本地路径

### 方案3：AI图片生成
使用 AI 服务生成教育图片（需要API密钥）

## 清除报告记录

如果需要清除所有报告记录，在浏览器控制台运行：
```javascript
localStorage.removeItem('reportedImages')
```

然后刷新页面。
