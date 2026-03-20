// AI 服务类型定义
export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIRequestOptions {
  temperature?: number;
  maxTokens?: number;
  childId?: string;
  context?: Record<string, any>;
}

export interface AIResponse {
  text: string;
  isAI: boolean;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIChatConfig {
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  model: string;
}

// 子弹消息历史
export interface ConversationHistory {
  childId: string;
  messages: AIMessage[];
  lastUpdated: Date;
}
