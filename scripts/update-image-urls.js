#!/usr/bin/env node

/**
 * 自动更新 words.ts 中的图片URL为本地路径（包含分类）
 * 运行方式: node scripts/update-image-urls.js
 */

const fs = require('fs');
const path = require('path');

const wordsFilePath = path.join(__dirname, '../data/words.ts');
const backupFilePath = path.join(__dirname, '../data/words.ts.backup');

console.log('开始更新图片URL...\n');

// 1. 备份原文件
console.log('1. 备份原文件...');
fs.copyFileSync(wordsFilePath, backupFilePath);
console.log('   ✓ 备份已保存到: data/words.ts.backup\n');

// 2. 读取文件
console.log('2. 读取 words.ts...');
const content = fs.readFileSync(wordsFilePath, 'utf8');

// 3. 替换所有图片URL
console.log('3. 替换图片URL...\n');

let replaceCount = 0;

// 匹配整个单词对象，提取wordId、category和imageUrl
const wordObjectRegex = /{\s*wordId:\s*['"]([^'"]+)['"],\s*word:\s*['"][^'"]+['"],\s*chinese:\s*['"][^'"]+['"],\s*category:\s*['"]([^'"]+)['"],[\s\S]*?imageUrl:\s*['"]https:\/\/images\.unsplash\.com\/[^'"]+['"]/g;

const newContent = content.replace(wordObjectRegex, (match, wordId, category) => {
  replaceCount++;
  // 替换imageUrl为包含分类的路径
  return match.replace(
    /imageUrl:\s*['"]https:\/\/images\.unsplash\.com\/[^'"]+['"]/,
    `imageUrl: '/images/words/${category}/${wordId}.jpg'`
  );
});

console.log(`   ✓ 替换了 ${replaceCount} 个图片URL\n`);

// 4. 保存文件
console.log('4. 保存更新后的文件...');
fs.writeFileSync(wordsFilePath, newContent, 'utf8');
console.log('   ✓ 文件已更新\n');

console.log('=== 完成 ===');
console.log(`\n更新了 ${replaceCount} 个图片URL`);
console.log('格式: /images/words/[分类]/word_xxx.jpg');
console.log('\n如果需要回滚，运行:');
console.log('  cp data/words.ts.backup data/words.ts');
console.log('\n现在可以删除备份文件:');
console.log('  rm data/words.ts.backup');
