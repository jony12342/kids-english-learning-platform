'use client';

/**
 * Word Bubble Pop Game
 * 单词泡泡射击游戏
 *
 * 功能：
 * 1. 彩色泡泡显示图片
 * 2. 选择正确的单词
 * 3. 泡泡爆炸效果，星星散落
 * 4. 朗读单词和鼓励语音
 * 5. 星星收集系统
 */

import { useState, useEffect, useCallback } from 'react';
import { getAllWords } from '../../data/words';
import { Word, WordCategory, WordDifficulty } from '../../types/vocabulary';
import { textToSpeech } from '../../lib/speech/pronunciation';

interface Bubble {
  id: string;
  word: Word;
  isPopping: boolean;
  options: string[];
  correctAnswer: string;
}

interface Star {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  opacity: number;
}

export default function BubbleGamePage() {
  const [currentBubble, setCurrentBubble] = useState<Bubble | null>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [score, setScore] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<WordCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<WordDifficulty | 'all'>('all');
  const [gameStarted, setGameStarted] = useState(false);
  const [availableWordIds, setAvailableWordIds] = useState<string[]>([]);

  // 加载可用图片白名单
  useEffect(() => {
    fetch('/available-images.json')
      .then(res => res.json())
      .then(ids => setAvailableWordIds(ids))
      .catch(err => console.error('Failed to load available images:', err));
  }, []);

  // 生成随机选项
  const generateOptions = useCallback((correctWord: Word, allWords: Word[]): string[] => {
    const options = [correctWord.word];

    // 随机选择2个错误选项
    const wrongOptions = allWords
      .filter(w => w.wordId !== correctWord.wordId)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map(w => w.word);

    options.push(...wrongOptions);
    return options.sort(() => Math.random() - 0.5);
  }, []);

  // 创建新泡泡
  const createBubble = useCallback((allWords: Word[]): Bubble | null => {
    if (allWords.length === 0) return null;

    const word = allWords[Math.floor(Math.random() * allWords.length)];
    const options = generateOptions(word, allWords);

    return {
      id: `bubble-${Date.now()}-${Math.random()}`,
      word,
      isPopping: false,
      options,
      correctAnswer: word.word,
    };
  }, [generateOptions]);

  // 开始游戏
  const startGame = useCallback(() => {
    if (availableWordIds.length === 0) return;

    let filteredWords = getAllWords().filter(w => availableWordIds.includes(w.wordId));

    if (selectedCategory !== 'all') {
      filteredWords = filteredWords.filter(w => w.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filteredWords = filteredWords.filter(w => w.difficulty === selectedDifficulty);
    }

    if (filteredWords.length < 3) {
      alert('该分类下可用单词不足，请选择其他分类或难度！');
      return;
    }

    const bubble = createBubble(filteredWords);
    if (bubble) {
      setCurrentBubble(bubble);
      setScore(0);
      setStreak(0);
      setGameStarted(true);
    }
  }, [availableWordIds, selectedCategory, selectedDifficulty, createBubble]);

  // 处理答案选择
  const handleAnswer = async (selectedWord: string) => {
    if (!currentBubble || currentBubble.isPopping) return;

    const isCorrect = selectedWord === currentBubble.correctAnswer;

    if (isCorrect) {
      // 答对了
      setCurrentBubble(prev => prev ? { ...prev, isPopping: true } : null);

      // 随机选择鼓励语
      const encouragements = ['Great job!', 'Amazing!', 'Wonderful!', 'Excellent!'];
      const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];

      // 播放单词发音和鼓励语音
      await textToSpeech.speak(`${currentBubble.word.word}! ${encouragement}`);

      // 生成爆炸星星
      const newStars: Star[] = [];
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const speed = 5 + Math.random() * 5;
        newStars.push({
          id: `star-${Date.now()}-${i}`,
          x: 50, // center
          y: 40, // center of bubble area
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rotation: Math.random() * 360,
          opacity: 1,
        });
      }
      setStars(newStars);

      // 更新分数
      setScore(prev => prev + 10);
      setTotalStars(prev => prev + 1);
      setStreak(prev => prev + 1);

      // 移除泡泡并创建新泡泡
      setTimeout(() => {
        let filteredWords = getAllWords().filter(w => availableWordIds.includes(w.wordId));

        if (selectedCategory !== 'all') {
          filteredWords = filteredWords.filter(w => w.category === selectedCategory);
        }

        if (selectedDifficulty !== 'all') {
          filteredWords = filteredWords.filter(w => w.difficulty === selectedDifficulty);
        }

        const newBubble = createBubble(filteredWords);
        setCurrentBubble(newBubble);
        setStars([]);
      }, 2000);
    } else {
      // 答错了
      setStreak(0);
      // 播放提示语音
      await textToSpeech.speak('Try again!');
    }
  };

  // 星星动画
  useEffect(() => {
    if (stars.length === 0) return;

    const interval = setInterval(() => {
      setStars(prev =>
        prev.map(star => ({
          ...star,
          x: star.x + star.vx * 0.3,
          y: star.y + star.vy * 0.3,
          vy: star.vy + 0.5, // gravity
          rotation: star.rotation + 10,
          opacity: star.opacity - 0.02,
        })).filter(star => star.opacity > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [stars.length > 0]);

  if (!gameStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-pink-400 via-purple-400 to-indigo-500 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* 标题 */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              🫧 Word Bubble Pop!
            </h1>
            <p className="text-2xl text-white/90 drop-shadow">
              戳泡泡学单词，超好玩！
            </p>
          </div>

          {/* 游戏设置 */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* 分类选择 */}
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">
                  📚 选择分类:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as WordCategory | 'all')}
                  className="w-full p-4 border-3 border-primary-purple rounded-xl text-lg shadow-md"
                >
                  <option value="all">所有分类</option>
                  <option value="animals">🐾 动物 Animals</option>
                  <option value="food">🍎 食物 Food</option>
                  <option value="colors">🌈 颜色 Colors</option>
                  <option value="numbers">🔢 数字 Numbers</option>
                  <option value="family">👨‍👩‍👧‍👦 家庭 Family</option>
                  <option value="body">👂 身体 Body</option>
                  <option value="clothes">👕 衣服 Clothes</option>
                  <option value="toys">🧸 玩具 Toys</option>
                  <option value="nature">🌳 自然 Nature</option>
                  <option value="vehicles">🚗 交通 Vehicles</option>
                  <option value="school">📚 学校 School</option>
                  <option value="home">🏠 家 Home</option>
                  <option value="feelings">😊 感情 Feelings</option>
                  <option value="actions">🏃 动作 Actions</option>
                </select>
              </div>

              {/* 难度选择 */}
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">
                  ⭐ 选择难度:
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as WordDifficulty | 'all')}
                  className="w-full p-4 border-3 border-primary-purple rounded-xl text-lg shadow-md"
                >
                  <option value="all">所有难度</option>
                  <option value="easy">简单 Easy</option>
                  <option value="medium">中等 Medium</option>
                  <option value="hard">困难 Hard</option>
                </select>
              </div>
            </div>

            {/* 开始按钮 */}
            <button
              onClick={startGame}
              disabled={availableWordIds.length === 0}
              className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-6 px-8 rounded-2xl hover:from-green-500 hover:to-green-700 transition-all text-3xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              🎮 开始游戏
            </button>
          </div>

          {/* 游戏说明 */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-6">
            <h2 className="text-3xl font-bold text-primary-purple mb-6 text-center">
              🎯 怎么玩
            </h2>
            <div className="space-y-4 text-xl text-gray-700">
              <p className="flex items-center gap-3">
                <span className="text-3xl">🫧</span>
                <span>看泡泡里的图片</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-3xl">👆</span>
                <span>点击正确的单词</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-3xl">💥</span>
                <span>戳破泡泡，收集星星！</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-3xl">⭐</span>
                <span>答对越多，星星越多！</span>
              </p>
            </div>
          </div>

          {/* 返回首页 */}
          <div className="text-center">
            <a
              href="/"
              className="inline-block bg-white/95 backdrop-blur-sm text-gray-700 font-bold py-4 px-8 rounded-xl hover:bg-white transition-all shadow-lg text-xl"
            >
              🏠 返回首页
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-300 via-blue-400 to-purple-500 relative overflow-hidden">
      {/* 星星动画 */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute pointer-events-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            transform: `translate(-50%, -50%) rotate(${star.rotation}deg)`,
            fontSize: '40px',
            opacity: star.opacity,
            transition: 'all 0.016s linear',
          }}
        >
          ⭐
        </div>
      ))}

      {/* 游戏UI */}
      <div className="relative z-10 p-4 md:p-8">
        {/* 顶部信息栏 */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 md:p-6 mb-6 shadow-2xl">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-sm md:text-base text-gray-600 font-bold">分数 Score</p>
                <p className="text-3xl md:text-4xl font-bold text-primary-purple">{score}</p>
              </div>
              <div className="text-center">
                <p className="text-sm md:text-base text-gray-600 font-bold">星星 Stars</p>
                <p className="text-3xl md:text-4xl font-bold text-primary-yellow">⭐ {totalStars}</p>
              </div>
              {streak >= 3 && (
                <div className="text-center animate-pulse">
                  <p className="text-sm md:text-base text-gray-600 font-bold">连击 Streak</p>
                  <p className="text-3xl md:text-4xl font-bold text-primary-orange">🔥 {streak}</p>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setGameStarted(false);
                setCurrentBubble(null);
                setStars([]);
              }}
              className="bg-gradient-to-r from-red-400 to-red-600 text-white font-bold py-3 px-6 rounded-xl hover:from-red-500 hover:to-red-700 transition-all text-lg shadow-lg"
            >
              🏠 退出
            </button>
          </div>
        </div>

        {/* 泡泡区域 */}
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          {currentBubble && !currentBubble.isPopping && (
            <div className="flex flex-col items-center">
              {/* 泡泡 */}
              <div className="relative mb-8">
                {/* 泡泡主体 */}
                <div
                  className="rounded-full flex items-center justify-center border-8 border-white shadow-2xl animate-bounce-gentle"
                  style={{
                    width: '280px',
                    height: '280px',
                    background: 'linear-gradient(135deg, #FF6B9D 0%, #C44CD9 50%, #6B8FFF 100%)',
                  }}
                >
                  {/* 图片 */}
                  <img
                    src={currentBubble.word.imageUrl}
                    alt={currentBubble.word.word}
                    className="w-[85%] h-[85%] object-cover rounded-full"
                  />
                </div>

                {/* 泡泡高光 */}
                <div
                  className="absolute rounded-full bg-white/50 pointer-events-none"
                  style={{
                    width: '80px',
                    height: '80px',
                    top: '30px',
                    left: '40px',
                  }}
                />
              </div>

              {/* 选项按钮 */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl w-full max-w-2xl">
                <p className="text-center text-xl text-gray-600 mb-4 font-bold">
                  这是什么？
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {currentBubble.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="bg-gradient-to-r from-purple-400 to-purple-600 text-white font-bold py-6 px-6 rounded-2xl hover:from-purple-500 hover:to-purple-700 transition-all text-xl md:text-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentBubble && currentBubble.isPopping && (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="text-6xl animate-ping">💥</div>
              <p className="text-4xl font-bold text-white mt-8 drop-shadow-lg">
                太棒了！
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
