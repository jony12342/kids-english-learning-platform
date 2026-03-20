import { create } from 'zustand';
import { ChatResponse } from '@/types/rules';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  animation?: string;
  sound?: string;
  isAI?: boolean;
}

export interface ChatState {
  // 聊天消息
  messages: Message[];

  // 当前状态
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;

  // 子用户信息
  childId?: string;
  childName?: string;

  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;

  setListening: (isListening: boolean) => void;
  setProcessing: (isProcessing: boolean) => void;
  setSpeaking: (isSpeaking: boolean) => void;

  setChildInfo: (childId: string, childName?: string) => void;

  // 发送消息并获取响应
  sendMessage: (text: string) => Promise<ChatResponse>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  // 初始状态
  messages: [],
  isListening: false,
  isProcessing: false,
  isSpeaking: false,

  // 添加消息
  addMessage: (message) => {
    const newMessage: Message = {
      ...message,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  // 清空消息
  clearMessages: () => {
    set({ messages: [] });
  },

  // 设置监听状态
  setListening: (isListening) => {
    set({ isListening });
  },

  // 设置处理状态
  setProcessing: (isProcessing) => {
    set({ isProcessing });
  },

  // 设置说话状态
  setSpeaking: (isSpeaking) => {
    set({ isSpeaking });
  },

  // 设置儿童信息
  setChildInfo: (childId, childName) => {
    set({ childId, childName });
  },

  // 发送消息并获取响应
  sendMessage: async (text) => {
    const { addMessage, setProcessing, childId, messages } = get();

    // 添加用户消息
    addMessage({
      role: 'user',
      text,
    });

    // 设置处理状态
    setProcessing(true);

    try {
      // 调用 API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          childId: childId,
          messageCount: messages.length + 1, // 当前消息数量
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data: ChatResponse = await response.json();

      // 添加助手消息
      addMessage({
        role: 'assistant',
        text: data.text,
        animation: data.animation,
        sound: data.sound,
        isAI: data.isAI,
      });

      // 自动授予奖励（如果响应包含学习到的单词）
      if (data.learnedWord && data.category) {
        const { useRewardStore } = require('@/lib/store/reward-store');
        useRewardStore.getState().recordWord(data.learnedWord, data.category);
      }

      return data;
    } catch (error) {
      console.error('Failed to send message:', error);

      // 添加错误消息
      addMessage({
        role: 'assistant',
        text: "I'm having trouble right now! Can we try again? 🤔",
      });

      throw error;
    } finally {
      setProcessing(false);
    }
  },

  // 记录完成对话
  recordConversation: () => {
    const { messages } = get();
    const messageCount = messages.length;

    if (messageCount >= 2) { // 至少2轮对话（1个用户消息 + 1个AI响应）
      const { useRewardStore } = require('@/lib/store/reward-store');
      useRewardStore.getState().recordConversation(messageCount);
    }
  },
}));
