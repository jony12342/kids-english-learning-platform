#!/usr/bin/env node

/**
 * 下载所有单词图片到本地
 * 运行方式: node scripts/download-images.js
 */

const https = require('https');
const http = require('http');
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

console.log(`找到 ${words.length} 个单词`);

// 创建图片目录
const imagesDir = path.join(__dirname, '../public/images/words');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// 按分类创建子目录
const categories = [...new Set(words.map(w => w.category))];
categories.forEach(category => {
  const categoryDir = path.join(imagesDir, category);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }
});

// 下载单个图片
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // 处理重定向
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {}); // 删除部分下载的文件
        reject(err);
      });
    });

    request.on('error', reject);
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// 主下载函数
async function downloadAllImages() {
  let successCount = 0;
  let failCount = 0;
  const failedWords = [];

  console.log('\n开始下载图片...\n');

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const filename = `${word.wordId}.jpg`;
    const filepath = path.join(imagesDir, word.category, filename);

    // 检查文件是否已存在
    if (fs.existsSync(filepath)) {
      console.log(`[${i + 1}/${words.length}] ✓ 跳过 ${word.word} (已存在)`);
      successCount++;
      continue;
    }

    try {
      process.stdout.write(`[${i + 1}/${words.length}] 下载 ${word.word}...`);
      await downloadImage(word.imageUrl, filepath);
      console.log(' ✓');
      successCount++;

      // 添加小延迟避免请求过快
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.log(' ✗');
      console.error(`  错误: ${error.message}`);
      failedWords.push({ word, error: error.message });
      failCount++;
    }
  }

  console.log('\n=== 下载完成 ===');
  console.log(`成功: ${successCount}`);
  console.log(`失败: ${failCount}`);

  if (failedWords.length > 0) {
    console.log('\n失败的单词:');
    failedWords.forEach(({ word, error }) => {
      console.log(`  - ${word.word} (${word.wordId}): ${error}`);
    });

    // 保存失败列表
    const failedPath = path.join(__dirname, '../failed-images.json');
    fs.writeFileSync(failedPath, JSON.stringify(failedWords, null, 2));
    console.log(`\n失败列表已保存到: ${failedPath}`);
  }

  // 生成更新后的 imageUrl 映射
  console.log('\n=== 生成更新脚本 ===');
  const updateScriptPath = path.join(__dirname, '../UPDATE_IMAGES.md');
  let updateScript = `# 图片URL更新指南\n\n`;
  updateScript += `所有图片已下载到 \`public/images/words/\` 目录\n`;
  updateScript += `按分类组织：\n\n`;
  updateScript += `\`\`\`\n`;
  updateScript += `public/images/words/\n`;
  categories.forEach(cat => {
    updateScript += `├── ${cat}/\n`;
  });
  updateScript += `\`\`\`\n\n`;
  updateScript += `## 更新步骤\n\n`;
  updateScript += `运行以下命令自动更新 words.ts:\n`;
  updateScript += `\`\`\`bash\n`;
  updateScript += `node scripts/update-image-urls.js\n`;
  updateScript += `\`\`\`\n`;

  fs.writeFileSync(updateScriptPath, updateScript);
  console.log(`更新指南已保存到: ${updateScriptPath}`);
}

// 运行
downloadAllImages().catch(console.error);
