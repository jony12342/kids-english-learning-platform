'use client';

/**
 * Word Learning Page
 * 单词学习页面
 *
 * 功能：
 * 1. 显示单词图片
 * 2. 播放标准发音
 * 3. 语音识别评估发音
 * 4. 进度追踪
 */

import { useState, useEffect } from 'react';
import { getAllWords } from '../../data/words';
import { Word, WordCategory, WordDifficulty } from '../../types/vocabulary';
import { textToSpeech, pronunciationAssessor } from '../../lib/speech/pronunciation';

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<WordCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<WordDifficulty | 'all'>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [pronunciationResult, setPronunciationResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [reportedImages, setReportedImages] = useState<Set<string>>(new Set());
  const [availableWordIds, setAvailableWordIds] = useState<string[]>([]);

  // 加载可用图片白名单
  useEffect(() => {
    fetch('/available-images.json')
      .then(res => res.json())
      .then(ids => setAvailableWordIds(ids))
      .catch(err => console.error('Failed to load available images:', err));
  }, []);

  // 加载单词
  useEffect(() => {
    if (availableWordIds.length > 0) {
      loadWords();
    }
  }, [selectedCategory, selectedDifficulty, availableWordIds]);

  const loadWords = () => {
    let filteredWords = getAllWords();

    // 按分类过滤
    if (selectedCategory !== 'all') {
      filteredWords = filteredWords.filter(w => w.category === selectedCategory);
    }

    // 按难度过滤
    if (selectedDifficulty !== 'all') {
      filteredWords = filteredWords.filter(w => w.difficulty === selectedDifficulty);
    }

    // 过滤掉没有本地图片的单词（使用白名单）
    filteredWords = filteredWords.filter(w => availableWordIds.includes(w.wordId));

    // 随机选择10个单词
    const selectedWords = filteredWords.length > 10
      ? filteredWords.sort(() => Math.random() - 0.5).slice(0, 10)
      : filteredWords;

    setWords(selectedWords);
    setCurrentIndex(0);
    setPronunciationResult(null);
    setShowResult(false);
  };

  const currentWord = words[currentIndex];

  // 当单词改变时重置图片加载状态
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [currentIndex]);

  // 播放发音
  const playPronunciation = async () => {
    if (!currentWord || isPlaying) return;

    setIsPlaying(true);
    try {
      await textToSpeech.speak(currentWord.word);
    } catch (error) {
      console.error('Error playing pronunciation:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  // 停止播放
  const stopPlaying = () => {
    textToSpeech.stop();
    setIsPlaying(false);
  };

  // 开始录音识别
  const startListening = async () => {
    if (!currentWord || isListening) return;

    setIsListening(true);
    setShowResult(false);
    setPronunciationResult(null);

    try {
      const result = await pronunciationAssessor.assessWord(currentWord.word);
      setPronunciationResult(result);
      setShowResult(true);

      // 如果发音正确，播放鼓励语音
      if (result.isCorrect) {
        setTimeout(() => {
          textToSpeech.speak('Great!');
        }, 500);
      }
    } catch (error) {
      console.error('Error recognizing speech:', error);
      setPronunciationResult({
        isCorrect: false,
        confidence: 0,
        feedback: 'Could not recognize speech. Please try again.'
      });
      setShowResult(true);
    } finally {
      setIsListening(false);
    }
  };

  // 停止录音
  const stopListening = () => {
    pronunciationAssessor.stopListening();
    setIsListening(false);
  };

  // 下一个单词
  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setPronunciationResult(null);
      setShowResult(false);
    }
  };

  // 上一个单词
  const previousWord = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setPronunciationResult(null);
      setShowResult(false);
    }
  };

  // 重新开始
  const restart = () => {
    setCurrentIndex(0);
    setPronunciationResult(null);
    setShowResult(false);
  };

  // 报告图片错误
  const reportImageError = () => {
    if (!currentWord) return;

    const newReported = new Set(reportedImages);
    newReported.add(currentWord.wordId);
    setReportedImages(newReported);

    // 保存到 localStorage
    const existing = JSON.parse(localStorage.getItem('reportedImages') || '[]');
    if (!existing.includes(currentWord.wordId)) {
      existing.push(currentWord.wordId);
      localStorage.setItem('reportedImages', JSON.stringify(existing));
    }

    // 在控制台记录，方便开发时查看
    console.log(`❌ 图片错误报告: ${currentWord.word} (${currentWord.wordId})`);
    console.log(`   URL: ${currentWord.imageUrl}`);
    console.log(`   中文: ${currentWord.chinese}`);

    alert(`谢谢！已记录 "${currentWord.word}" 的图片问题。我们会尽快修复。`);
  };

  // 检查当前单词是否已报告
  const isCurrentImageReported = currentWord && reportedImages.has(currentWord.wordId);

  if (words.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-yellow via-primary-orange to-primary-pink flex items-center justify-center p-4">
        <div className="text-center text-white">
          <p className="text-2xl mb-4">Loading words...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-yellow via-primary-orange to-primary-pink p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            📚 Word Learning
          </h1>
          <p className="text-xl text-white/90">
            Learn new words with pictures!
          </p>
        </div>

        {/* 过滤器 */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 分类选择 */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as WordCategory | 'all')}
                className="w-full p-2 border-2 border-primary-blue rounded-lg"
              >
                <option value="all">All Categories</option>
                <option value="animals">🐾 Animals</option>
                <option value="food">🍎 Food</option>
                <option value="colors">🌈 Colors</option>
                <option value="numbers">🔢 Numbers</option>
                <option value="family">👨‍👩‍👧‍👦 Family</option>
                <option value="body">👂 Body</option>
                <option value="clothes">👕 Clothes</option>
                <option value="toys">🧸 Toys</option>
                <option value="nature">🌳 Nature</option>
                <option value="vehicles">🚗 Vehicles</option>
                <option value="school">📚 School</option>
                <option value="home">🏠 Home</option>
                <option value="feelings">😊 Feelings</option>
                <option value="actions">🏃 Actions</option>
              </select>
            </div>

            {/* 难度选择 */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Difficulty:
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as WordDifficulty | 'all')}
                className="w-full p-2 border-2 border-primary-blue rounded-lg"
              >
                <option value="all">All Levels</option>
                <option value="easy">Easy (简单)</option>
                <option value="medium">Medium (中等)</option>
                <option value="hard">Hard (困难)</option>
              </select>
            </div>
          </div>

          <button
            onClick={loadWords}
            className="mt-4 w-full bg-primary-green text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            🎲 Load New Words
          </button>
        </div>

        {/* 单词卡片 */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          {/* 进度 */}
          <div className="text-center mb-6">
            <p className="text-lg text-gray-600">
              Word {currentIndex + 1} of {words.length}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-primary-green h-2 rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
              />
            </div>
          </div>

          {/* 单词内容 */}
          <div className="text-center">
            {/* 图片 */}
            <div className="mb-6 relative">
              {!imageLoaded && !imageError && (
                <div className="w-64 h-64 bg-gray-200 rounded-2xl shadow-lg mx-auto flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2 animate-spin">⏳</div>
                    <p className="text-gray-500">Loading...</p>
                  </div>
                </div>
              )}
              {imageError && (
                <div className="w-64 h-64 bg-gradient-to-br from-primary-blue to-primary-purple rounded-2xl shadow-lg mx-auto flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-2">📷</div>
                    <p className="text-xl font-bold">{currentWord.word}</p>
                    <p className="text-sm opacity-80">Image not available</p>
                  </div>
                </div>
              )}
              {imageLoaded && !imageError && (
                <button
                  onClick={reportImageError}
                  disabled={isCurrentImageReported}
                  className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1 px-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
                  title="报告图片错误"
                >
                  {isCurrentImageReported ? '✓ 已报告' : '❌ 图片错误'}
                </button>
              )}
              <img
                src={currentWord.imageUrl}
                alt={currentWord.word}
                className={`w-64 h-64 object-cover rounded-2xl shadow-lg mx-auto transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0 absolute'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true);
                }}
              />
            </div>

            {/* 单词 */}
            <h2 className="text-5xl font-bold text-primary-blue mb-2">
              {currentWord.word}
            </h2>

            {/* 音标 */}
            <p className="text-xl text-gray-600 mb-2">
              {currentWord.phonetic}
            </p>

            {/* 中文翻译 */}
            <p className="text-2xl text-gray-700 mb-4">
              {currentWord.chinese}
            </p>

            {/* 例句 */}
            <div className="bg-primary-yellow/20 rounded-xl p-4 mb-6">
              <p className="text-lg text-gray-700">
                {currentWord.exampleSentence}
              </p>
            </div>

            {/* 控制按钮 */}
            <div className="flex justify-center gap-4 mb-6 flex-wrap">
              {/* 播放发音按钮 */}
              {!isPlaying ? (
                <button
                  onClick={playPronunciation}
                  className="bg-primary-blue text-white font-bold py-4 px-8 rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-2 text-xl"
                >
                  <span>🔊</span>
                  <span>Listen</span>
                </button>
              ) : (
                <button
                  onClick={stopPlaying}
                  className="bg-red-500 text-white font-bold py-4 px-8 rounded-2xl hover:bg-red-600 transition-all flex items-center gap-2 text-xl animate-pulse"
                >
                  <span>⏹️</span>
                  <span>Stop</span>
                </button>
              )}

              {/* 录音按钮 */}
              {!isListening ? (
                <button
                  onClick={startListening}
                  className="bg-primary-pink text-white font-bold py-4 px-8 rounded-2xl hover:bg-pink-600 transition-all flex items-center gap-2 text-xl"
                >
                  <span>🎤</span>
                  <span>Speak</span>
                </button>
              ) : (
                <button
                  onClick={stopListening}
                  className="bg-red-500 text-white font-bold py-4 px-8 rounded-2xl hover:bg-red-600 transition-all flex items-center gap-2 text-xl animate-pulse"
                >
                  <span>⏹️</span>
                  <span>Stop</span>
                </button>
              )}
            </div>

            {/* 评估结果 */}
            {showResult && pronunciationResult && (
              <div
                className={`rounded-2xl p-6 mb-6 ${
                  pronunciationResult.isCorrect
                    ? 'bg-green-100 border-4 border-green-500'
                    : 'bg-yellow-100 border-4 border-yellow-500'
                }`}
              >
                <p className="text-2xl font-bold mb-2">
                  {pronunciationResult.isCorrect ? '🎉 Correct!' : '💪 Try Again!'}
                </p>
                <p className="text-xl text-gray-700 mb-2">
                  {pronunciationResult.feedback}
                </p>
                {pronunciationResult.detectedText && (
                  <p className="text-lg text-gray-600">
                    You said: <span className="font-bold">{pronunciationResult.detectedText}</span>
                  </p>
                )}
                {pronunciationResult.confidence > 0 && (
                  <p className="text-lg text-gray-600">
                    Confidence: <span className="font-bold">{Math.round(pronunciationResult.confidence * 100)}%</span>
                  </p>
                )}
              </div>
            )}

            {/* 导航按钮 */}
            <div className="flex justify-center gap-4">
              <button
                onClick={previousWord}
                disabled={currentIndex === 0}
                className="bg-gray-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ⬅️ Previous
              </button>

              <button
                onClick={restart}
                className="bg-primary-orange text-white font-bold py-3 px-6 rounded-xl hover:bg-orange-600 transition-all"
              >
                🔄 Restart
              </button>

              <button
                onClick={nextWord}
                disabled={currentIndex === words.length - 1}
                className="bg-primary-green text-white font-bold py-3 px-6 rounded-xl hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next ➡️
              </button>
            </div>

            {/* 完成提示 */}
            {currentIndex === words.length - 1 && (
              <div className="mt-6 text-center">
                <p className="text-2xl font-bold text-primary-green">
                  🎊 Great job! You completed all words!
                </p>
                <button
                  onClick={loadWords}
                  className="mt-4 bg-primary-blue text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-600 transition-all"
                >
                  🎲 Learn More Words
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 返回首页 */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="inline-block bg-white/95 backdrop-blur-sm text-gray-700 font-bold py-3 px-8 rounded-xl hover:bg-white transition-all shadow-lg text-lg"
          >
            🏠 Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
