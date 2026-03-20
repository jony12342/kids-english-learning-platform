import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { AIMessage, AIRequestOptions, AIResponse, AIChatConfig, ConversationHistory } from '@/types/ai';

/**
 * DeepSeek V3 AI 服务
 * DeepSeek V3 AI Service
 */
export class DeepSeekService {
  private openai: ReturnType<typeof createOpenAI>;
  private config: AIChatConfig;
  private conversationHistory: Map<string, AIMessage[]> = new Map();

  constructor(apiKey: string, config?: Partial<AIChatConfig>) {
    // 创建 OpenAI 兼容的客户端（DeepSeek API 兼容 OpenAI SDK）
    this.openai = createOpenAI({
      apiKey,
      baseURL: 'https://api.deepseek.com', // DeepSeek API endpoint
    });

    // 默认配置
    this.config = {
      systemPrompt: this.getDefaultSystemPrompt(),
      temperature: 0.7,
      maxTokens: 500,
      model: 'deepseek-chat',
      ...config,
    };
  }

  /**
   * 获取默认系统提示词
   * Get default system prompt for kids English learning
   */
  private getDefaultSystemPrompt(): string {
    return `You are a friendly owl teacher named Oliver for children aged 3-6 learning English. Your role is to:

1. **Teach English naturally**: Use simple words, short sentences, and lots of examples
2. **Be encouraging**: Always praise effort, celebrate mistakes as learning opportunities
3. **Use emojis**: Add 2-3 relevant emojis to make responses fun and engaging
4. **Keep it brief**: Use 1-2 sentences max, unless explaining a concept
5. **Be playful**: Use gentle humor, make learning feel like a game
6. **Model correct English**: If child makes mistakes, gently model correct form
7. **Build confidence**: Every interaction should make the child feel successful

Example responses:
- "Cat! 🐱 Cats say 'meow'! Can you say 'cat'?"
- "Blue! 💙 Like the sky and ocean! What else is blue?"
- "Wow! You said 'apple'! 🍎 That's AMAZING! Try again!"
- "Good job counting! 🔢 One, two, three! You're so smart!"

Remember: You're talking to young children. Be warm, patient, and make learning fun!`;
  }

  /**
   * 生成 AI 响应
   * Generate AI response
   */
  async generateResponse(
    userMessage: string,
    options?: AIRequestOptions
  ): Promise<AIResponse> {
    const { childId, context, temperature = this.config.temperature, maxTokens = this.config.maxTokens } = options || {};

    // 构建消息历史
    const messages: AIMessage[] = [
      { role: 'system', content: this.config.systemPrompt },
    ];

    // 添加上下文信息到系统提示（如果有）
    if (context && Object.keys(context).length > 0) {
      const contextInfo = this.buildContextPrompt(context);
      messages[0].content += '\n\n' + contextInfo;
    }

    // 添加历史消息（如果有 childId）
    if (childId && this.conversationHistory.has(childId)) {
      const history = this.conversationHistory.get(childId)!;
      // 只取最近 10 条消息以保持上下文但避免 token 过多
      const recentHistory = history.slice(-10);
      messages.push(...recentHistory);
    }

    // 添加当前用户消息
    messages.push({ role: 'user', content: userMessage });

    try {
      // 调用 DeepSeek API
      const result = await generateText({
        model: this.openai(this.config.model),
        messages: messages.map(m => ({ role: m.role, content: m.content })),
        temperature,
        maxTokens,
      });

      const response = result.text;

      // 保存到历史记录
      if (childId) {
        this.saveToHistory(childId, {
          role: 'user',
          content: userMessage,
        });
        this.saveToHistory(childId, {
          role: 'assistant',
          content: response,
        });
      }

      return {
        text: response,
        isAI: true,
        usage: {
          promptTokens: result.usage?.promptTokens || 0,
          completionTokens: result.usage?.completionTokens || 0,
          totalTokens: result.usage?.totalTokens || 0,
        },
      };
    } catch (error) {
      console.error('DeepSeek API error:', error);
      // 返回友好的错误消息
      return {
        text: "I'm having trouble thinking right now! 🤔 Can we try again?",
        isAI: true,
      };
    }
  }

  /**
   * 构建上下文提示
   * Build context prompt from user data
   */
  private buildContextPrompt(context: Record<string, any>): string {
    const parts: string[] = [];

    if (context.name) {
      parts.push(`The child's name is ${context.name}. Use their name to make responses personal.`);
    }

    if (context.favoriteAnimal) {
      parts.push(`Their favorite animal is ${context.favoriteAnimal}. Use this in examples when relevant.`);
    }

    if (context.favoriteColor) {
      parts.push(`Their favorite color is ${context.favoriteColor}. Use this in examples when relevant.`);
    }

    if (context.age) {
      parts.push(`The child is ${context.age} years old. Adjust language complexity appropriately.`);
    }

    return parts.join('\n');
  }

  /**
   * 保存消息到历史记录
   * Save message to conversation history
   */
  private saveToHistory(childId: string, message: AIMessage): void {
    if (!this.conversationHistory.has(childId)) {
      this.conversationHistory.set(childId, []);
    }

    const history = this.conversationHistory.get(childId)!;
    history.push(message);

    // 限制历史记录长度（最多保留 20 条消息）
    if (history.length > 20) {
      history.splice(0, history.length - 20);
    }
  }

  /**
   * 获取对话历史
   * Get conversation history for a child
   */
  getHistory(childId: string): AIMessage[] {
    return this.conversationHistory.get(childId) || [];
  }

  /**
   * 清除对话历史
   * Clear conversation history for a child
   */
  clearHistory(childId: string): void {
    this.conversationHistory.delete(childId);
  }

  /**
   * 清除所有历史记录
   * Clear all conversation history
   */
  clearAllHistory(): void {
    this.conversationHistory.clear();
  }

  /**
   * 更新系统提示词
   * Update system prompt
   */
  updateSystemPrompt(newPrompt: string): void {
    this.config.systemPrompt = newPrompt;
  }

  /**
   * 更新配置
   * Update configuration
   */
  updateConfig(newConfig: Partial<AIChatConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * 获取配置
   * Get current configuration
   */
  getConfig(): AIChatConfig {
    return { ...this.config };
  }
}

// 创建默认实例（将在 API 路由中使用环境变量初始化）
let defaultInstance: DeepSeekService | null = null;

export function initDeepSeekService(apiKey: string): DeepSeekService {
  if (!defaultInstance) {
    defaultInstance = new DeepSeekService(apiKey);
  }
  return defaultInstance;
}

export function getDeepSeekService(): DeepSeekService | null {
  return defaultInstance;
}
