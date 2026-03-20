// 规则引擎类型定义
export interface Rule {
  id: string;
  pattern: RegExp | RegExp[] | string[];
  response: string | ResponseTemplate;
  priority: number;
  needsContext?: boolean;
  saveData?: {
    field: string;
    extractFrom: 'input' | 'match';
  };
}

export interface ResponseTemplate {
  template: string;
  followUp?: string;
  animation?: string;
  sound?: string;
}

export interface MatchResult {
  matched: boolean;
  rule?: Rule;
  extractedData?: Record<string, any>;
}

export interface ChatResponse {
  text: string;
  audioUrl?: string;
  animation?: string;
  sound?: string;
  isAI: boolean;
  followUp?: string;
  learnedWord?: string; // 学习到的单词
  category?: string; // 单词分类
}

// 规则分类
export const RuleCategories = {
  GREETING: 'greeting',
  VOCABULARY: 'vocabulary',
  TASKS: 'tasks',
  FAREWELL: 'farewell',
  HELP: 'help',
  REPEAT: 'repeat',
  ENCOURAGE: 'encourage',
} as const;
