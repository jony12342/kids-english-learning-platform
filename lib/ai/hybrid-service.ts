import { RulesEngine } from './rules-engine';
import { DeepSeekService } from './deepseek-service';
import { ChatResponse } from '@/types/rules';
import { AIResponse } from '@/types/ai';

/**
 * 混合 AI 服务（规则引擎 + DeepSeek AI）
 * Hybrid AI Service (Rules Engine + DeepSeek AI)
 *
 * 策略：
 * 1. 优先使用规则引擎（快速、准确、成本低）
 * 2. 规则引擎无法匹配时，使用 DeepSeek AI（灵活、智能）
 * 3. 目标：70% 规则引擎 + 30% AI，平衡成本和用户体验
 */
export class HybridAIService {
  private rulesEngine: RulesEngine;
  private aiService: DeepSeekService | null = null;
  private useAI: boolean = true;

  constructor(rulesEngine?: RulesEngine) {
    this.rulesEngine = rulesEngine || new RulesEngine();
  }

  /**
   * 设置 AI 服务
   * Set AI service
   */
  setAIService(aiService: DeepSeekService): void {
    this.aiService = aiService;
  }

  /**
   * 启用/禁用 AI 回退
   * Enable/disable AI fallback
   */
  setUseAI(enabled: boolean): void {
    this.useAI = enabled;
  }

  /**
   * 处理用户输入（混合策略）
   * Process user input with hybrid strategy
   */
  async processInput(
    input: string,
    childId?: string
  ): Promise<ChatResponse> {
    // 1. 首先尝试规则引擎
    const ruleResponse = await this.rulesEngine.processInput(input, childId);

    // 2. 如果规则引擎匹配成功，直接返回
    if (ruleResponse.text && !this.isDefaultResponse(ruleResponse.text)) {
      return ruleResponse;
    }

    // 3. 规则引擎无法匹配，尝试 AI
    if (this.aiService && this.useAI) {
      try {
        // 获取用户上下文
        const context = childId ? this.rulesEngine.getContext(childId) : {};

        // 调用 AI
        const aiResponse = await this.aiService.generateResponse(input, {
          childId,
          context,
        });

        return {
          text: aiResponse.text,
          isAI: true,
          animation: 'thinking',
        };
      } catch (error) {
        console.error('AI service error:', error);
        // AI 出错，返回默认响应
        return {
          text: "I'm still learning! Can you try saying that differently? 🤔",
          isAI: false,
        };
      }
    }

    // 4. AI 不可用，返回默认响应
    return ruleResponse;
  }

  /**
   * 判断是否是默认响应
   * Check if response is the default fallback
   */
  private isDefaultResponse(text: string): boolean {
    const defaultResponses = [
      "i'm still learning!",
      "can you try saying that differently?",
    ];

    const lowerText = text.toLowerCase();
    return defaultResponses.some(response => lowerText.includes(response));
  }

  /**
   * 获取规则引擎
   * Get rules engine
   */
  getRulesEngine(): RulesEngine {
    return this.rulesEngine;
  }

  /**
   * 获取 AI 服务
   * Get AI service
   */
  getAIService(): DeepSeekService | null {
    return this.aiService;
  }

  /**
   * 获取用户上下文
   * Get user context
   */
  getContext(childId: string): Record<string, any> {
    return this.rulesEngine.getContext(childId);
  }

  /**
   * 更新用户上下文
   * Update user context
   */
  updateContext(childId: string, data: Record<string, any>): void {
    this.rulesEngine.updateContext(childId, data);
  }

  /**
   * 清除用户上下文
   * Clear user context
   */
  clearContext(childId: string): void {
    this.rulesEngine.clearContext(childId);
  }

  /**
   * 获取对话统计
   * Get conversation statistics
   */
  getStats(childId?: string): {
    ruleMatches: number;
    aiCalls: number;
    totalInteractions: number;
  } {
    // 这里可以添加统计逻辑
    return {
      ruleMatches: 0,
      aiCalls: 0,
      totalInteractions: 0,
    };
  }
}

// 创建默认实例
export const defaultHybridService = new HybridAIService();
