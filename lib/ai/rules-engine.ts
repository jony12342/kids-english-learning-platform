import { Rule, MatchResult, ChatResponse, ResponseTemplate } from '@/types/rules';
import { rules } from './rules';

/**
 * 规则引擎 - 核心匹配和响应生成逻辑
 * Rule Engine - Core matching and response generation logic
 */

export class RulesEngine {
  private rules: Rule[];
  private context: Map<string, Record<string, any>> = new Map();

  constructor(customRules?: Rule[]) {
    // 按优先级排序，优先级高的先匹配
    this.rules = customRules || rules;
    this.rules.sort((a, b) => b.priority - a.priority);
  }

  /**
   * 匹配用户输入，找到最合适的规则
   * Match user input to find the most appropriate rule
   */
  match(input: string, childId?: string): MatchResult {
    const normalizedInput = input.toLowerCase().trim();

    // 遍历所有规则，找到第一个匹配的（按优先级已排序）
    for (const rule of this.rules) {
      // 如果规则需要上下文，确保提供了 childId
      if (rule.needsContext && !childId) {
        continue;
      }

      const match = this.matchPattern(rule.pattern, normalizedInput);
      if (match) {
        return {
          matched: true,
          rule,
          extractedData: match,
        };
      }
    }

    // 没有匹配的规则
    return { matched: false };
  }

  /**
   * 匹配单个规则的模式
   * Match a single rule pattern
   */
  private matchPattern(
    pattern: RegExp | RegExp[] | string[],
    input: string
  ): Record<string, any> | null {
    // 单个正则表达式匹配
    if (pattern instanceof RegExp) {
      const match = input.match(pattern);
      if (match) {
        // 如果有捕获组，返回第一个命中的内容
        if (match.length > 1) {
          return { match: match[1] || match[0] };
        }
        return { match: match[0] };
      }
      return null;
    }

    // 正则表达式数组匹配
    if (Array.isArray(pattern)) {
      // 检查是否是正则表达式数组
      if (pattern.length > 0 && pattern[0] instanceof RegExp) {
        for (const regex of pattern as RegExp[]) {
          const match = input.match(regex);
          if (match) {
            // 如果有捕获组，返回第一个命中的内容
            if (match.length > 1) {
              return { match: match[1] || match[0] };
            }
            return { match: match[0] };
          }
        }
        return null;
      }

      // 字符串数组匹配
      for (const str of pattern as string[]) {
        const patternStr = typeof str === 'string' ? str.toLowerCase() : String(str).toLowerCase();
        if (input.includes(patternStr)) {
          return { match: str };
        }
      }
      return null;
    }

    return null;
  }

  /**
   * 生成响应
   * Generate response from matched rule
   */
  generateResponse(
    matchResult: MatchResult,
    context?: Record<string, any>
  ): ChatResponse {
    if (!matchResult.matched || !matchResult.rule) {
      return {
        text: "I'm still learning! Can you try saying that differently? 🤔",
        isAI: false,
      };
    }

    const rule = matchResult.rule;
    const extractedData = matchResult.extractedData || {};

    // 合并上下文数据和提取的数据
    const allData = { ...context, ...extractedData };

    // 生成文本响应
    const text = this.substituteTemplate(rule.response, allData);

    // 处理响应模板（如果有动画、声音等）
    const responseTemplate =
      typeof rule.response === 'string'
        ? { template: rule.response }
        : rule.response;

    return {
      text,
      animation: responseTemplate.animation,
      sound: responseTemplate.sound,
      isAI: false,
      followUp: responseTemplate.followUp,
    };
  }

  /**
   * 替换模板变量
   * Substitute template variables
   */
  private substituteTemplate(
    response: string | ResponseTemplate,
    data: Record<string, any>
  ): string {
    const template = typeof response === 'string' ? response : response.template;

    return template.replace(/\{(\w+)\}/g, (match, key) => {
      return data[key] || match;
    });
  }

  /**
   * 保存用户数据（如果规则指定了需要保存）
   * Save user data if rule specifies it
   */
  saveDataIfNeeded(
    matchResult: MatchResult,
    childId?: string
  ): Record<string, any> | null {
    if (!matchResult.matched || !matchResult.rule || !matchResult.rule.saveData) {
      return null;
    }

    const rule = matchResult.rule;
    const saveConfig = rule.saveData;
    const extractedData = matchResult.extractedData || {};

    if (saveConfig.extractFrom === 'match') {
      const value = extractedData.match;
      if (value) {
        // 在 extractedData 中设置字段名，以便模板替换时使用（无论是否有 childId）
        extractedData[saveConfig.field] = value;

        // 只有在提供 childId 时才保存到上下文
        if (childId) {
          this.updateContext(childId, { [saveConfig.field]: value });
        }

        return { [saveConfig.field]: value };
      }
    }

    return null;
  }

  /**
   * 更新用户上下文
   * Update user context
   */
  updateContext(childId: string, data: Record<string, any>): void {
    const currentContext = this.context.get(childId) || {};
    this.context.set(childId, { ...currentContext, ...data });
  }

  /**
   * 获取用户上下文
   * Get user context
   */
  getContext(childId: string): Record<string, any> {
    return this.context.get(childId) || {};
  }

  /**
   * 处理用户输入的完整流程
   * Complete processing flow for user input
   */
  async processInput(
    input: string,
    childId?: string
  ): Promise<ChatResponse> {
    // 1. 匹配规则
    const matchResult = this.match(input, childId);

    // 2. 如果匹配成功，提取并保存需要的数据（即使没有 childId 也要提取数据用于模板替换）
    if (matchResult.matched) {
      this.saveDataIfNeeded(matchResult, childId);
    }

    // 3. 获取上下文（如果有 childId）
    const context = childId ? this.getContext(childId) : {};

    // 4. 生成响应
    return this.generateResponse(matchResult, context);
  }

  /**
   * 添加自定义规则
   * Add custom rule
   */
  addRule(rule: Rule): void {
    this.rules.push(rule);
    // 重新排序
    this.rules.sort((a, b) => b.priority - a.priority);
  }

  /**
   * 批量添加规则
   * Add multiple rules
   */
  addRules(newRules: Rule[]): void {
    this.rules.push(...newRules);
    this.rules.sort((a, b) => b.priority - a.priority);
  }

  /**
   * 移除规则
   * Remove rule by ID
   */
  removeRule(ruleId: string): boolean {
    const index = this.rules.findIndex((r) => r.id === ruleId);
    if (index !== -1) {
      this.rules.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * 获取所有规则
   * Get all rules
   */
  getAllRules(): Rule[] {
    return [...this.rules];
  }

  /**
   * 根据分类获取规则
   * Get rules by category
   */
  getRulesByCategory(category: string): Rule[] {
    // 规则 ID 前缀即为其分类
    return this.rules.filter((rule) => rule.id.startsWith(category));
  }

  /**
   * 清除用户上下文
   * Clear user context
   */
  clearContext(childId: string): void {
    this.context.delete(childId);
  }

  /**
   * 清除所有上下文
   * Clear all contexts
   */
  clearAllContexts(): void {
    this.context.clear();
  }
}

// 创建默认实例
export const defaultRulesEngine = new RulesEngine();
