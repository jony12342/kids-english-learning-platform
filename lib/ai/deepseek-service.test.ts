import { describe, it, expect, beforeEach, vi } from '@jest/globals';
import { DeepSeekService } from './deepseek-service';
import { AIMessage } from '@/types/ai';

// Mock the AI SDK
vi.mock('@ai-sdk/openai', () => ({
  createOpenAI: vi.fn(() => ({
    chat: vi.fn(),
  })),
}));

vi.mock('ai', () => ({
  generateText: vi.fn(),
}));

describe('DeepSeekService', () => {
  let service: DeepSeekService;

  beforeEach(() => {
    service = new DeepSeekService('test-api-key');
  });

  describe('Initialization', () => {
    it('should initialize with default config', () => {
      const config = service.getConfig();

      expect(config.model).toBe('deepseek-chat');
      expect(config.temperature).toBe(0.7);
      expect(config.maxTokens).toBe(500);
      expect(config.systemPrompt).toBeTruthy();
    });

    it('should initialize with custom config', () => {
      const customService = new DeepSeekService('test-api-key', {
        temperature: 0.5,
        maxTokens: 1000,
        model: 'custom-model',
      });

      const config = customService.getConfig();

      expect(config.temperature).toBe(0.5);
      expect(config.maxTokens).toBe(1000);
      expect(config.model).toBe('custom-model');
    });
  });

  describe('System Prompt', () => {
    it('should have child-friendly system prompt', () => {
      const config = service.getConfig();

      expect(config.systemPrompt).toContain('owl teacher');
      expect(config.systemPrompt).toContain('3-6');
      expect(config.systemPrompt).toContain('encouraging');
    });
  });

  describe('Context Building', () => {
    it('should build context prompt with name', async () => {
      const context = { name: 'Emma' };
      const generateText = await import('ai');
      const mockGenerateText = vi.mocked(generateText.generateText);

      mockGenerateText.mockResolvedValue({
        text: 'Hi Emma!',
        usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 },
      } as any);

      await service.generateResponse('Hello', { context });

      const calls = mockGenerateText.mock.calls;
      expect(calls.length).toBe(1);

      const messages = calls[0][0].messages;
      const systemMessage = messages[0];

      expect(systemMessage.content).toContain('Emma');
    });

    it('should build context prompt with multiple fields', async () => {
      const context = {
        name: 'Lucas',
        favoriteAnimal: 'cat',
        favoriteColor: 'blue',
        age: 4,
      };

      const generateText = await import('ai');
      const mockGenerateText = vi.mocked(generateText.generateText);

      mockGenerateText.mockResolvedValue({
        text: 'Response',
        usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 },
      } as any);

      await service.generateResponse('Hello', { context });

      const calls = mockGenerateText.mock.calls;
      const systemMessage = calls[0][0].messages[0];

      expect(systemMessage.content).toContain('Lucas');
      expect(systemMessage.content).toContain('cat');
      expect(systemMessage.content).toContain('blue');
      expect(systemMessage.content).toContain('4');
    });
  });

  describe('Conversation History', () => {
    it('should save messages to history', async () => {
      const childId = 'test-child-123';
      const generateText = await import('ai');
      const mockGenerateText = vi.mocked(generateText.generateText);

      mockGenerateText.mockResolvedValue({
        text: 'Hi there!',
        usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 },
      } as any);

      await service.generateResponse('Hello', { childId });

      const history = service.getHistory(childId);

      expect(history).toHaveLength(2); // user message + assistant response
      expect(history[0].role).toBe('user');
      expect(history[0].content).toBe('Hello');
      expect(history[1].role).toBe('assistant');
      expect(history[1].content).toBe('Hi there!');
    });

    it('should maintain history across multiple calls', async () => {
      const childId = 'test-child-456';
      const generateText = await import('ai');
      const mockGenerateText = vi.mocked(generateText.generateText);

      mockGenerateText.mockResolvedValue({
        text: 'Response',
        usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 },
      } as any);

      await service.generateResponse('First message', { childId });
      await service.generateResponse('Second message', { childId });

      const history = service.getHistory(childId);

      expect(history).toHaveLength(4); // 2 rounds * 2 messages
    });

    it('should limit history to 20 messages', async () => {
      const childId = 'test-child-limit';
      const generateText = await import('ai');
      const mockGenerateText = vi.mocked(generateText.generateText);

      mockGenerateText.mockResolvedValue({
        text: 'Response',
        usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 },
      } as any);

      // Send 15 messages (30 messages in history including responses)
      for (let i = 0; i < 15; i++) {
        await service.generateResponse(`Message ${i}`, { childId });
      }

      const history = service.getHistory(childId);

      // Should be limited to 20 messages
      expect(history.length).toBeLessThanOrEqual(20);
    });

    it('should clear history for specific child', async () => {
      const childId = 'test-child-clear';
      const generateText = await import('ai');
      const mockGenerateText = vi.mocked(generateText.generateText);

      mockGenerateText.mockResolvedValue({
        text: 'Response',
        usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 },
      } as any);

      await service.generateResponse('Hello', { childId });
      service.clearHistory(childId);

      const history = service.getHistory(childId);

      expect(history).toHaveLength(0);
    });

    it('should clear all history', async () => {
      const generateText = await import('ai');
      const mockGenerateText = vi.mocked(generateText.generateText);

      mockGenerateText.mockResolvedValue({
        text: 'Response',
        usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 },
      } as any);

      await service.generateResponse('Hello', { childId: 'child-1' });
      await service.generateResponse('Hello', { childId: 'child-2' });

      service.clearAllHistory();

      expect(service.getHistory('child-1')).toHaveLength(0);
      expect(service.getHistory('child-2')).toHaveLength(0);
    });
  });

  describe('Configuration Updates', () => {
    it('should update system prompt', () => {
      const newPrompt = 'You are a math teacher!';

      service.updateSystemPrompt(newPrompt);

      const config = service.getConfig();
      expect(config.systemPrompt).toBe(newPrompt);
    });

    it('should update partial config', () => {
      service.updateConfig({
        temperature: 0.3,
        maxTokens: 800,
      });

      const config = service.getConfig();
      expect(config.temperature).toBe(0.3);
      expect(config.maxTokens).toBe(800);
      expect(config.model).toBe('deepseek-chat'); // unchanged
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const generateText = await import('ai');
      const mockGenerateText = vi.mocked(generateText.generateText);

      mockGenerateText.mockRejectedValue(new Error('API Error'));

      const response = await service.generateResponse('Hello');

      expect(response.text).toContain('trouble');
      expect(response.isAI).toBe(true);
    });
  });
});
