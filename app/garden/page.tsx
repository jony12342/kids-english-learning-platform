'use client';

import { useState, useEffect } from 'react';
import { useChatStore } from '@/lib/store/chat-store';
import { useSpeech } from '@/lib/hooks/use-speech';
import { useRewardStore } from '@/lib/store/reward-store';
import { RewardNotification, StarDisplay } from '@/components/rewards/reward-notification';
import { StreakDisplay } from '@/components/progress/progress-display';
import { Mic, MicOff, Volume2, Home, Smile, Trophy } from 'lucide-react';

export default function GardenPage() {
  const [isClient, setIsClient] = useState(false);

  const {
    messages,
    isListening,
    isProcessing,
    isSpeaking,
    addMessage,
    setListening,
    setProcessing,
    setSpeaking,
    sendMessage,
  } = useChatStore();

  const {
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    isRecognitionSupported,
    isSynthesisSupported,
  } = useSpeech();

  // 初始化奖励系统
  const { stats, initialize } = useRewardStore();

  // 确保在客户端渲染
  useEffect(() => {
    const init = async () => {
      setIsClient(true);
      // 初始化奖励系统
      await initialize('00000000-0000-0000-0000-000000000001');
    };
    init();
  }, [initialize]);

  // 处理开始/停止语音输入
  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
      setListening(false);
    } else {
      startListening(
        // onResult - 用户说话完成
        async (transcript) => {
          setListening(false);
          setProcessing(true);

          try {
            // 发送消息并获取响应
            const response = await sendMessage(transcript);

            // 朗读响应
            if (response.text) {
              setSpeaking(true);
              speak(response.text);

              // 等待说话完成
              setTimeout(() => {
                setSpeaking(false);
              }, 3000);
            }
          } catch (error) {
            console.error('Failed to process message:', error);
            setProcessing(false);
          }
        },
        // onError - 识别错误
        (error) => {
          console.error('Recognition error:', error);
          setListening(false);
          addMessage({
            role: 'assistant',
            text: "I couldn't hear you. Can you try again? 🎤",
          });
        }
      );
      setListening(true);
    }
  };

  // 显示欢迎消息
  useEffect(() => {
    if (isClient && messages.length === 0) {
      setTimeout(() => {
        addMessage({
          role: 'assistant',
          text: "Hello! 👋 I'm Oliver, your owl teacher! Welcome to the Magic Garden! 🌸\n\nTap the microphone button and talk to me!",
        });
      }, 500);
    }
  }, [isClient, messages.length, addMessage]);

  // 如果不是客户端渲染，显示加载状态
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-green-200 to-blue-200">
        <div className="text-4xl font-bold text-primary animate-pulse">
          Loading Magic Garden... ✨
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-200 via-green-200 to-blue-200">
      {/* 奖励通知 */}
      <RewardNotification />

      {/* 顶部导航栏 */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg p-4 flex justify-between items-center">
        <button
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all min-touch-target"
        >
          <Home className="w-6 h-6 text-primary" />
          <span className="font-bold text-primary">Home</span>
        </button>

        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <span>🦉</span>
          <span>Magic Garden</span>
          <span>🌸</span>
        </h1>

        {/* 星星显示 */}
        <StarDisplay totalStars={stats.totalStars} todayStars={stats.todayStars} />
      </header>

      {/* 聊天消息区域 */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
                message.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              {/* 角色标识 */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">
                  {message.role === 'user' ? '👧' : '🦉'}
                </span>
                <span className="font-bold text-sm">
                  {message.role === 'user' ? 'You' : 'Oliver'}
                </span>
                {message.isAI && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    ✨ AI
                  </span>
                )}
              </div>

              {/* 消息内容 */}
              <p className="text-lg whitespace-pre-wrap">{message.text}</p>

              {/* 动画提示 */}
              {message.animation && (
                <div className="mt-2 text-sm opacity-70">
                  {message.animation === 'happy' && '😊 Happy!'}
                  {message.animation === 'excited' && '🎉 Excited!'}
                  {message.animation === 'thinking' && '🤔 Thinking...'}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* 处理中提示 */}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2">
                <div className="animate-spin text-2xl">🦉</div>
                <span className="text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        {/* 监听中提示 */}
        {isListening && (
          <div className="flex justify-center">
            <div className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg animate-pulse">
              <div className="flex items-center gap-2">
                <Mic className="w-6 h-6 animate-bounce" />
                <span className="font-bold">Listening...</span>
              </div>
            </div>
          </div>
        )}

        {/* 说话中提示 */}
        {isSpeaking && (
          <div className="flex justify-center">
            <div className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg">
              <div className="flex items-center gap-2">
                <Volume2 className="w-6 h-6 animate-pulse" />
                <span className="font-bold">Speaking...</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 底部控制栏 */}
      <footer className="bg-white/90 backdrop-blur-sm shadow-lg p-6">
        <div className="max-w-4xl mx-auto flex justify-center items-center gap-4">
          {/* 语音输入按钮 */}
          <button
            onClick={handleToggleListening}
            disabled={isProcessing || isSpeaking}
            className={`flex-1 max-w-sm flex items-center justify-center gap-3 px-8 py-6 rounded-full shadow-lg transition-all min-h-[60px] ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                : 'bg-primary hover:bg-primary/90 text-white hover:scale-105'
            } ${isProcessing || isSpeaking ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isListening ? (
              <>
                <MicOff className="w-8 h-8" />
                <span className="text-2xl font-bold">Stop</span>
              </>
            ) : (
              <>
                <Mic className="w-8 h-8" />
                <span className="text-2xl font-bold">Talk</span>
              </>
            )}
          </button>
        </div>

        {/* 支持信息 */}
        {!isRecognitionSupported && (
          <div className="text-center mt-4 text-red-600 font-bold">
            ⚠️ Speech recognition is not supported in your browser. Please use Chrome or Safari.
          </div>
        )}
      </footer>
    </div>
  );
}
