#!/usr/bin/env node

/**
 * 检查哪些单词缺少本地图片
 * 运行方式: node scripts/check-missing-images.js
 */

const fs = require('fs');
const path = require('path');

// 读取单词数据
const wordsDataPath = path.join(__dirname, '../data/words.ts');
const wordsData = fs.readFileSync(wordsDataPath, 'utf8');

// 提取所有单词信息
const words = [];
const wordRegex = /{\s*wordId:\s*['"]([^'"]+)['"],\s*word:\s*['"]([^'"]+)['"],\s*chinese:\s*['"]([^'"]+)['"],\s*category:\s*['"]([^'"]+)['"],\s*difficulty:\s*['"]([^'"]+)['"],[^}]*imageUrl:\s*['"]([^'"]+)['"]/g;

let match;
while ((match = wordRegex.exec(wordsData)) !== null) {
  words.push({
    wordId: match[1],
    word: match[2],
    chinese: match[3],
    category: match[4],
    difficulty: match[5],
    imageUrl: match[6]
  });
}

console.log('=== 检查缺失的图片 ===\n');

const missingImages = [];
const existingImages = [];

words.forEach(word => {
  // 提取分类和文件名
  const urlMatch = word.imageUrl.match(/\/images\/words\/([^/]+)\/(word_\d+\.jpg)$/);

  if (urlMatch) {
    const category = urlMatch[1];
    const filename = urlMatch[2];
    const imagePath = path.join(__dirname, `../public/images/words/${category}/${filename}`);

    if (fs.existsSync(imagePath)) {
      existingImages.push(word);
    } else {
      missingImages.push(word);
    }
  } else {
    // URL格式不正确
    missingImages.push(word);
  }
});

console.log(`总单词数: ${words.length}`);
console.log(`有图片: ${existingImages.length}`);
console.log(`缺图片: ${missingImages.length}\n`);

if (missingImages.length > 0) {
  console.log('=== 缺失图片列表 ===\n');

  // 按分类分组
  const byCategory = {};
  missingImages.forEach(word => {
    if (!byCategory[word.category]) {
      byCategory[word.category] = [];
    }
    byCategory[word.category].push(word);
  });

  Object.keys(byCategory).sort().forEach(category => {
    console.log(`\n${category.toUpperCase()} (${byCategory[category].length}):`);
    byCategory[category].forEach(word => {
      console.log(`  - ${word.word} (${word.wordId})`);
      console.log(`    中文: ${word.chinese}`);
      console.log(`    需要路径: /images/words/${category}/${word.wordId}.jpg`);
    });
  });

  // 生成下载清单
  const downloadListPath = path.join(__dirname, '../MISSING_IMAGES_LIST.md');
  let downloadList = `# 缺失图片下载清单\n\n`;
  downloadList += `生成时间: ${new Date().toLocaleString()}\n`;
  downloadList += `缺失数量: ${missingImages.length}\n\n`;
  downloadList += `---\n\n`;

  downloadList += `## 如何补充图片\n\n`;
  downloadList += `### 方法1: 使用免费图库（推荐）\n\n`;
  downloadList += `1. 访问以下网站之一：\n`;
  downloadList += `   - [Pixabay](https://pixabay.com) - 免费高质量图片\n`;
  downloadList += `   - [Pexels](https://pexels.com) - 免费商用图片\n`;
  downloadList += `   - [Unsplash](https://unsplash.com) - 专业摄影图片\n\n`;
  downloadList += `2. 搜索对应的英文单词\n\n`;
  downloadList += `3. 下载图片（建议尺寸：400x400px）\n\n`;
  downloadList += `4. 重命名为以下格式并保存到对应目录：\n\n`;

  Object.keys(byCategory).sort().forEach(category => {
    downloadList += `#### ${category}\n\n`;
    byCategory[category].forEach(word => {
      downloadList += `- **${word.word}** (${word.chinese})\n`;
      downloadList += `  - 保存为: \`public/images/words/${category}/${word.wordId}.jpg\`\n`;
      downloadList += `  - 搜索关键词: \`${word.word}\`\n\n`;
    });
  });

  downloadList += `\n---\n\n`;
  downloadList += `### 方法2: 使用AI生成图片\n\n`;
  downloadList += `使用以下AI工具生成教育图片：\n`;
  downloadList += `- [Midjourney](https://www.midjourney.com)\n`;
  downloadList += `- [DALL-E](https://openai.com/dall-e-3)\n`;
  downloadList += `- [Stable Diffusion](https://stability.ai)\n\n`;

  downloadList += `提示词示例：\n`;
  downloadList += `"\${word.word} for children education, simple and colorful illustration, white background"\n\n`;

  downloadList += `### 方法3: 批量下载脚本\n\n`;
  downloadList += `如果你找到了图片的URL，可以创建一个简单的下载脚本。\n`;

  fs.writeFileSync(downloadListPath, downloadList, 'utf8');
  console.log(`\n✓ 下载清单已保存到: ${downloadListPath}`);

  // 保存JSON格式便于程序处理
  const jsonPath = path.join(__dirname, '../missing-images.json');
  fs.writeFileSync(jsonPath, JSON.stringify(missingImages, null, 2), 'utf8');
  console.log(`✓ JSON数据已保存到: ${jsonPath}`);

  // 生成可用图片的wordId白名单（用于过滤）
  const availableWordIds = existingImages.map(w => w.wordId);
  const whitelistPath = path.join(__dirname, '../available-images.json');
  fs.writeFileSync(whitelistPath, JSON.stringify(availableWordIds, null, 2), 'utf8');
  console.log(`✓ 可用图片白名单已保存到: ${whitelistPath}`);
  console.log(`✓ 共 ${availableWordIds.length} 个单词有可用图片`);
} else {
  console.log('✓ 所有图片都已下载！');

  // 即使全部都有，也生成白名单
  const availableWordIds = existingImages.map(w => w.wordId);
  const whitelistPath = path.join(__dirname, '../available-images.json');
  fs.writeFileSync(whitelistPath, JSON.stringify(availableWordIds, null, 2), 'utf8');
  console.log(`✓ 可用图片白名单已保存到: ${whitelistPath}`);
}
