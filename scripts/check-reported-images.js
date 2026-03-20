#!/usr/bin/env node

/**
 * 查看报告的图片错误
 * 运行方式: node scripts/check-reported-images.js
 */

const { getAllWords } = require('../data/words');

console.log('=== 图片错误报告 ===\n');

// 从 localStorage 模拟读取（实际使用时需要从浏览器控制台获取）
const reportedIds = process.argv.slice(2);

if (reportedIds.length === 0) {
  console.log('使用方法:');
  console.log('1. 在浏览器中打开单词学习页面');
  console.log('2. 打开浏览器控制台（F12）');
  console.log('3. 运行以下代码:');
  console.log('   JSON.parse(localStorage.getItem("reportedImages") || "[]")');
  console.log('4. 复制输出的数组');
  console.log('5. 运行: node scripts/check-reported-images.js <复制的数组>\n');
  process.exit(0);
}

const allWords = getAllWords();
const reportedWords = allWords.filter(word => reportedIds.includes(word.wordId));

console.log(`找到 ${reportedWords.length} 个报告错误的单词:\n`);

reportedWords.forEach((word, index) => {
  console.log(`${index + 1}. ${word.word} (${word.wordId})`);
  console.log(`   中文: ${word.chinese}`);
  console.log(`   分类: ${word.category} - ${word.difficulty}`);
  console.log(`   图片URL: ${word.imageUrl}`);
  console.log('');
});

// 生成修复建议
console.log('\n=== 修复建议 ===');
console.log('1. 访问 https://unsplash.com 搜索对应的英文单词');
console.log('2. 选择一张合适的图片');
console.log('3. 点击图片，获取图片ID（URL中的 photo-xxxxxxxx-xxxxxx 部分）');
console.log('4. 更新 data/words.ts 中对应单词的 imageUrl');
console.log('\n示例格式:');
console.log("   imageUrl: 'https://images.unsplash.com/photo-[图片ID]?w=400&h=400&fit=crop&q=80'");
