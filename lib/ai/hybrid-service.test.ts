import { describe, it, expect, beforeEach } from '@jest/globals';
import { HybridAIService } from './hybrid-service';
import { RulesEngine } from './rules-engine';
import { Rule } from '@/types/rules';

describe('HybridAIService', () => {
  let hybridService: HybridAIService;
  let rulesEngine: RulesEngine;
  let mockAIService: any;

  beforeEach(() => {
    rulesEngine = new RulesEngine();
    hybridService = new HybridAIService(rulesEngine);

    // Create mock AI service
    mockAIService = {
      generateResponse: jest.fn((message: string, options?: any) => {
        return Promise.resolve({
          text: `AI response to: ${message}`,
          isAI: true,
          usage: {
            promptTokens: 10,
            completionTokens: 20,
            totalTokens: 30,
          },
        });
      }),
    };

    // Clear mock calls before each test
    (mockAIService.generateResponse as jest.Mock).mockClear();
  });

  describe('Rule Engine Priority', () => {
    it('should use rule engine for matched patterns', async () => {
      const response = await hybridService.processInput('Hello');

      expect(response.isAI).toBe(false);
      expect(response.text).toBeTruthy();
      expect(mockAIService.generateResponse).not.toHaveBeenCalled();
    });

    it('should use rule engine for animal patterns', async () => {
      const response = await hybridService.processInput('I like cats');

      expect(response.text).toBeTruthy();
      expect(response.isAI).toBe(false);
    });

    it('should use rule engine for color patterns', async () => {
      const response = await hybridService.processInput('The sky is blue');

      expect(response.text).toBeTruthy();
      expect(response.isAI).toBe(false);
    });
  });

  describe('AI Fallback', () => {
    it('should fall back to AI when rule engine has no match', async () => {
      hybridService.setAIService(mockAIService);

      const response = await hybridService.processInput('quantum physics theory');

      expect(response.isAI).toBe(true);
      expect(response.text).toContain('AI response to');
      expect(mockAIService.generateResponse).toHaveBeenCalledWith(
        'quantum physics theory',
        expect.objectContaining({
          childId: undefined,
          context: {},
        })
      );
    });

    it('should pass child context to AI', async () => {
      hybridService.setAIService(mockAIService);

      const childId = 'test-child-123';
      rulesEngine.updateContext(childId, { name: 'Emma', age: 4 });

      const response = await hybridService.processInput('Tell me about outer space', childId);

      expect(response.isAI).toBe(true);
      expect(mockAIService.generateResponse).toHaveBeenCalledWith(
        'Tell me about outer space',
        expect.objectContaining({
          childId,
          context: { name: 'Emma', age: 4 },
        })
      );
    });
  });

  describe('AI Disabled', () => {
    it('should use default response when AI is disabled', async () => {
      hybridService.setAIService(mockAIService);
      hybridService.setUseAI(false);

      const response = await hybridService.processInput('quantum physics theory');

      expect(response.isAI).toBe(false);
      expect(response.text).toBeTruthy();
      expect(mockAIService.generateResponse).not.toHaveBeenCalled();
    });
  });

  describe('Context Management', () => {
    it('should get user context from rules engine', () => {
      rulesEngine.updateContext('child-1', { name: 'Lucas' });

      const context = hybridService.getContext('child-1');

      expect(context.name).toBe('Lucas'); // NOT lowercased when using updateContext directly
    });

    it('should update user context through rules engine', () => {
      hybridService.updateContext('child-2', { name: 'Sophia' });

      const context = hybridService.getContext('child-2');

      expect(context.name).toBe('Sophia'); // NOT lowercased
    });

    it('should clear user context', () => {
      rulesEngine.updateContext('child-3', { name: 'Oliver' });
      hybridService.clearContext('child-3');

      const context = hybridService.getContext('child-3');

      expect(context).toEqual({});
    });
  });

  describe('Service Access', () => {
    it('should provide access to rules engine', () => {
      const engine = hybridService.getRulesEngine();

      expect(engine).toBe(rulesEngine);
    });

    it('should provide access to AI service', () => {
      hybridService.setAIService(mockAIService);

      const aiService = hybridService.getAIService();

      expect(aiService).toBe(mockAIService);
    });
  });

  describe('Error Handling', () => {
    it('should handle AI service errors gracefully', async () => {
      hybridService.setAIService(mockAIService);
      mockAIService.generateResponse.mockRejectedValue(new Error('API Error'));

      const response = await hybridService.processInput('quantum physics theory');

      expect(response.isAI).toBe(false);
      expect(response.text).toContain('learning'); // default response
    });

    it('should handle rule engine + AI combination', async () => {
      hybridService.setAIService(mockAIService);

      // Rule engine match
      const ruleResponse = await hybridService.processInput('Hello');
      expect(ruleResponse.isAI).toBe(false);

      // AI fallback
      const aiResponse = await hybridService.processInput('Explain quantum physics');
      expect(aiResponse.isAI).toBe(true);
    });
  });

  describe('Complex Conversation Flow', () => {
    it('should maintain context across multiple turns', async () => {
      hybridService.setAIService(mockAIService);

      const childId = 'test-child-456';

      // First turn: Introduce name (rule engine)
      const response1 = await hybridService.processInput('My name is Mia', childId);
      expect(response1.isAI).toBe(false);

      const context = hybridService.getContext(childId);
      expect(context.name).toBe('mia'); // lowercased by rule engine
    });

    it('should switch between rule engine and AI seamlessly', async () => {
      hybridService.setAIService(mockAIService);

      const childId = 'test-child-789';

      // Rule engine match
      const r1 = await hybridService.processInput('Hello', childId);
      expect(r1.isAI).toBe(false);

      // AI fallback
      const r2 = await hybridService.processInput('How does gravity work?', childId);
      expect(r2.isAI).toBe(true);

      // Back to rule engine
      const r3 = await hybridService.processInput('I like dogs', childId);
      expect(r3.isAI).toBe(false);
    });
  });

  describe('Stats', () => {
    it('should return stats object', () => {
      const stats = hybridService.getStats();

      expect(stats).toHaveProperty('ruleMatches');
      expect(stats).toHaveProperty('aiCalls');
      expect(stats).toHaveProperty('totalInteractions');
    });
  });
});
