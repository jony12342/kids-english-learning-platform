'use client';

/**
 * Sentence Learning Page
 * 短句学习页面
 *
 * 功能：
 * 1. 显示短句
 * 2. 播放标准发音
 * 3. 语音识别评估发音
 * 4. 进度追踪
 */

import { useState, useEffect } from 'react';
import { getAllSentences } from '../../data/sentences';
import { Sentence, SentenceCategory, WordDifficulty } from '../../types/vocabulary';
import { textToSpeech, pronunciationAssessor } from '../../lib/speech/pronunciation';

export default function SentencesPage() {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<SentenceCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<WordDifficulty | 'all'>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [pronunciationResult, setPronunciationResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  // 加载短句
  useEffect(() => {
    loadSentences();
  }, [selectedCategory, selectedDifficulty]);

  const loadSentences = () => {
    let filteredSentences = getAllSentences();

    // 按分类过滤
    if (selectedCategory !== 'all') {
      filteredSentences = filteredSentences.filter(s => s.category === selectedCategory);
    }

    // 按难度过滤
    if (selectedDifficulty !== 'all') {
      filteredSentences = filteredSentences.filter(s => s.difficulty === selectedDifficulty);
    }

    // 随机选择10个短句
    const selectedSentences = filteredSentences.length > 10
      ? filteredSentences.sort(() => Math.random() - 0.5).slice(0, 10)
      : filteredSentences;

    setSentences(selectedSentences);
    setCurrentIndex(0);
    setPronunciationResult(null);
    setShowResult(false);
  };

  const currentSentence = sentences[currentIndex];

  // 播放发音
  const playPronunciation = async () => {
    if (!currentSentence || isPlaying) return;

    setIsPlaying(true);
    try {
      await textToSpeech.speak(currentSentence.sentence);
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
    if (!currentSentence || isListening) return;

    setIsListening(true);
    setShowResult(false);
    setPronunciationResult(null);

    try {
      const result = await pronunciationAssessor.assessSentence(currentSentence.sentence);
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

  // 下一个短句
  const nextSentence = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setPronunciationResult(null);
      setShowResult(false);
    }
  };

  // 上一个短句
  const previousSentence = () => {
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

  if (sentences.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-purple via-primary-pink to-primary-orange flex items-center justify-center p-4">
        <div className="text-center text-white">
          <p className="text-2xl mb-4">Loading sentences...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-purple via-primary-pink to-primary-orange p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            💬 Sentence Learning
          </h1>
          <p className="text-xl text-white/90">
            Learn everyday sentences!
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
                onChange={(e) => setSelectedCategory(e.target.value as SentenceCategory | 'all')}
                className="w-full p-2 border-2 border-primary-purple rounded-lg"
              >
                <option value="all">All Categories</option>
                <option value="greetings">👋 Greetings</option>
                <option value="introduction">🙋 Introduction</option>
                <option value="daily">💬 Daily</option>
                <option value="questions">❓ Questions</option>
                <option value="feelings">😊 Feelings</option>
                <option value="requests">🙏 Requests</option>
                <option value="manners">🤝 Manners</option>
                <option value="activities">🎮 Activities</option>
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
          </div>

          <button
            onClick={loadSentences}
            className="mt-4 w-full bg-primary-green text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            🎲 Load New Sentences
          </button>
        </div>

        {/* 短句卡片 */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          {/* 进度 */}
          <div className="text-center mb-6">
            <p className="text-lg text-gray-600">
              Sentence {currentIndex + 1} of {sentences.length}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-primary-purple h-2 rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / sentences.length) * 100}%` }}
              />
            </div>
          </div>

          {/* 短句内容 */}
          <div className="text-center">
            {/* 短句 */}
            <h2 className="text-4xl md:text-5xl font-bold text-primary-purple mb-6">
              {currentSentence.sentence}
            </h2>

            {/* 中文翻译 */}
            <p className="text-3xl text-gray-700 mb-8">
              {currentSentence.chinese}
            </p>

            {/* 分类和难度标签 */}
            <div className="flex justify-center gap-4 mb-8">
              <span className="bg-primary-purple/20 text-primary-purple font-bold py-2 px-4 rounded-xl">
                {currentSentence.category}
              </span>
              <span className={`font-bold py-2 px-4 rounded-xl ${
                currentSentence.difficulty === 'easy'
                  ? 'bg-green-100 text-green-700'
                  : currentSentence.difficulty === 'medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {currentSentence.difficulty.toUpperCase()}
              </span>
            </div>

            {/* 控制按钮 */}
            <div className="flex justify-center gap-4 mb-6 flex-wrap">
              {/* 播放发音按钮 */}
              {!isPlaying ? (
                <button
                  onClick={playPronunciation}
                  className="bg-primary-purple text-white font-bold py-4 px-8 rounded-2xl hover:bg-purple-700 transition-all flex items-center gap-2 text-xl"
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
                onClick={previousSentence}
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
                onClick={nextSentence}
                disabled={currentIndex === sentences.length - 1}
                className="bg-primary-green text-white font-bold py-3 px-6 rounded-xl hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next ➡️
              </button>
            </div>

            {/* 完成提示 */}
            {currentIndex === sentences.length - 1 && (
              <div className="mt-6 text-center">
                <p className="text-2xl font-bold text-primary-green">
                  🎊 Great job! You completed all sentences!
                </p>
                <button
                  onClick={loadSentences}
                  className="mt-4 bg-primary-purple text-white font-bold py-3 px-6 rounded-xl hover:bg-purple-600 transition-all"
                >
                  🎲 Learn More Sentences
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
