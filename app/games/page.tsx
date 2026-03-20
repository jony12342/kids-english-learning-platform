'use client';

/**
 * Word Memory Match Game
 * 单词卡片记忆游戏
 *
 * 功能：
 * 1. 翻转卡片寻找单词-图片配对
 * 2. 点击播放单词发音
 * 3. 计时和步数统计
 * 4. 星星奖励系统
 */

import { useState, useEffect, useCallback } from 'react';
import { getAllWords } from '../../data/words';
import { Word, WordCategory, WordDifficulty } from '../../types/vocabulary';
import { textToSpeech } from '../../lib/speech/pronunciation';

interface Card {
  id: string;
  type: 'word' | 'image';
  content: string; // 单词文本或图片URL
  wordId: string; // 用于配对
  isFlipped: boolean;
  isMatched: boolean;
}

export default function GamesPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [stars, setStars] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<WordCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<WordDifficulty | 'all'>('all');
  const [availableWordIds, setAvailableWordIds] = useState<string[]>([]);

  // 加载可用图片白名单
  useEffect(() => {
    fetch('/available-images.json')
      .then(res => res.json())
      .then(ids => setAvailableWordIds(ids))
      .catch(err => console.error('Failed to load available images:', err));
  }, []);

  // 初始化游戏
  const initGame = useCallback(() => {
    // 如果白名单还没加载，不初始化
    if (availableWordIds.length === 0) {
      return;
    }

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

    // 随机选择6个单词（形成6对卡片，共12张）
    const selectedWords = filteredWords.length > 6
      ? filteredWords.sort(() => Math.random() - 0.5).slice(0, 6)
      : filteredWords.slice(0, 6);

    // 如果没有足够的单词，显示提示
    if (selectedWords.length < 3) {
      alert('该分类下可用图片不足，请选择其他分类或难度！');
      return;
    }

    // 创建卡片对（单词卡 + 图片卡）
    const cardPairs: Card[] = [];
    selectedWords.forEach((word, index) => {
      cardPairs.push({
        id: `word-${index}`,
        type: 'word',
        content: word.word,
        wordId: word.wordId,
        isFlipped: false,
        isMatched: false,
      });
      cardPairs.push({
        id: `image-${index}`,
        type: 'image',
        content: word.imageUrl,
        wordId: word.wordId,
        isFlipped: false,
        isMatched: false,
      });
    });

    // 打乱卡片顺序
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameStarted(false);
    setGameCompleted(false);
    setStartTime(0);
    setElapsedTime(0);
    setStars(0);
  }, [selectedCategory, selectedDifficulty, availableWordIds]);

  // 组件挂载时初始化游戏
  useEffect(() => {
    initGame();
  }, [initGame]);

  // 计时器
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted, startTime]);

  // 翻转卡片
  const handleCardClick = async (clickedCard: Card) => {
    // 如果已经匹配、已经翻转两张卡、或点击的是同一张卡，则忽略
    if (
      clickedCard.isMatched ||
      clickedCard.isFlipped ||
      flippedCards.length >= 2
    ) {
      return;
    }

    // 开始游戏计时
    if (!gameStarted) {
      setGameStarted(true);
      setStartTime(Date.now());
    }

    // 翻转卡片
    const newCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    // 如果翻了两张卡
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);

      const [card1, card2] = newFlippedCards;

      // 检查是否配对
      if (card1.wordId === card2.wordId) {
        // 配对成功
        setTimeout(() => {
          const updatedCards = newCards.map(card =>
            card.wordId === card1.wordId ? { ...card, isMatched: true } : card
          );
          setCards(updatedCards);
          setFlippedCards([]);
          setMatchedPairs(matchedPairs + 1);

          // 播放发音（如果是单词卡）
          const wordCard = newFlippedCards.find(c => c.type === 'word');
          if (wordCard) {
            textToSpeech.speak(wordCard.content);
          }

          // 检查游戏是否完成
          if (matchedPairs + 1 === selectedWordsCount()) {
            completeGame(moves + 1);
          }
        }, 500);
      } else {
        // 配对失败，翻回去
        setTimeout(() => {
          const resetCards = newCards.map(card =>
            card.id === card1.id || card.id === card2.id
              ? { ...card, isFlipped: false }
              : card
          );
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // 播放单词发音
  const playWordSound = async (word: string, event: React.MouseEvent) => {
    event.stopPropagation(); // 防止触发卡片翻转
    try {
      await textToSpeech.speak(word);
    } catch (error) {
      console.error('Error playing pronunciation:', error);
    }
  };

  // 计算配对数量
  const selectedWordsCount = () => {
    return cards.length / 2;
  };

  // 游戏完成
  const completeGame = (finalMoves: number) => {
    setGameCompleted(true);

    // 计算星星（基于步数）
    const optimalMoves = selectedWordsCount();
    if (finalMoves <= optimalMoves + 4) {
      setStars(3); // 完美
    } else if (finalMoves <= optimalMoves + 8) {
      setStars(2); // 优秀
    } else {
      setStars(1); // 完成
    }
  };

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-purple via-primary-pink to-primary-orange flex items-center justify-center p-4">
        <div className="text-center text-white">
          <p className="text-2xl mb-4">Loading game...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-purple via-primary-pink to-primary-orange p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            🎴 Word Memory Match
          </h1>
          <p className="text-xl text-white/90">
            Find the matching word and image pairs!
          </p>
        </div>

        {/* 游戏设置 */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* 分类选择 */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as WordCategory | 'all')}
                className="w-full p-2 border-2 border-primary-purple rounded-lg"
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
                className="w-full p-2 border-2 border-primary-purple rounded-lg"
              >
                <option value="all">All Levels</option>
                <option value="easy">Easy (简单)</option>
                <option value="medium">Medium (中等)</option>
                <option value="hard">Hard (困难)</option>
              </select>
            </div>

            {/* 开始新游戏按钮 */}
            <div>
              <button
                onClick={initGame}
                className="w-full bg-primary-green text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
              >
                🎲 New Game
              </button>
            </div>
          </div>
        </div>

        {/* 游戏统计 */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600 font-bold">Time</p>
              <p className="text-2xl font-bold text-primary-purple">
                {formatTime(elapsedTime)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-bold">Moves</p>
              <p className="text-2xl font-bold text-primary-purple">
                {moves}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-bold">Pairs</p>
              <p className="text-2xl font-bold text-primary-purple">
                {matchedPairs}/{selectedWordsCount()}
              </p>
            </div>
          </div>
        </div>

        {/* 游戏区域 */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-6">
          {gameCompleted ? (
            /* 胜利界面 */
            <div className="text-center py-12">
              <h2 className="text-5xl font-bold text-primary-green mb-4">
                🎊 Congratulations! 🎊
              </h2>
              <p className="text-2xl text-gray-700 mb-6">
                You matched all the pairs!
              </p>

              {/* 星星奖励 */}
              <div className="text-6xl mb-6">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className={i < stars ? 'text-yellow-400' : 'text-gray-300'}>
                    ⭐
                  </span>
                ))}
              </div>

              {/* 统计信息 */}
              <div className="bg-primary-yellow/20 rounded-2xl p-6 mb-6 max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 font-bold">Time</p>
                    <p className="text-xl font-bold text-gray-800">
                      {formatTime(elapsedTime)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-bold">Moves</p>
                    <p className="text-xl font-bold text-gray-800">
                      {moves}
                    </p>
                  </div>
                </div>
              </div>

              {/* 鼓励语 */}
              <p className="text-xl text-primary-purple font-bold mb-6">
                {stars === 3 && "Perfect! You're a memory master! 🏆"}
                {stars === 2 && "Great job! Keep practicing! 💪"}
                {stars === 1 && "Good effort! Try again for more stars! 🌟"}
              </p>

              {/* 重新开始按钮 */}
              <button
                onClick={initGame}
                className="bg-primary-purple text-white font-bold py-4 px-8 rounded-2xl hover:bg-purple-700 transition-all text-xl"
              >
                🔄 Play Again
              </button>
            </div>
          ) : (
            /* 卡片网格 */
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`relative cursor-pointer transform transition-all duration-300 ${
                    card.isMatched ? 'opacity-50' : 'hover:scale-105'
                  }`}
                  onClick={() => handleCardClick(card)}
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className={`relative w-full aspect-square transition-transform duration-500 ${
                      card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* 卡片背面 */}
                    <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-primary-blue to-primary-purple rounded-2xl shadow-lg flex items-center justify-center">
                      <span className="text-6xl text-white">❓</span>
                    </div>

                    {/* 卡片正面 */}
                    <div
                      className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-lg p-4 flex items-center justify-center border-4"
                      style={{
                        transform: 'rotateY(180deg)',
                        borderColor: card.isMatched ? '#10B981' : '#8B5CF6',
                      }}
                    >
                      {card.type === 'word' ? (
                        <div className="text-center">
                          {/* 单词 */}
                          <p className="text-2xl md:text-3xl font-bold text-primary-purple mb-2">
                            {card.content}
                          </p>
                          {/* 发音按钮 */}
                          <button
                            onClick={(e) => playWordSound(card.content, e)}
                            className="mt-2 bg-primary-pink text-white font-bold py-2 px-4 rounded-xl hover:bg-pink-600 transition-all text-sm"
                          >
                            🔊 Listen
                          </button>
                        </div>
                      ) : (
                        <img
                          src={card.content}
                          alt="Match"
                          className="w-full h-full object-cover rounded-xl"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=?';
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* 匹配成功标记 */}
                  {card.isMatched && (
                    <div className="absolute top-2 right-2 text-3xl">✅</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 返回首页 */}
        <div className="text-center">
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
