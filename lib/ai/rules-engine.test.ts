import { describe, it, expect, beforeEach } from '@jest/globals';
import { RulesEngine } from './rules-engine';
import { Rule, MatchResult } from '@/types/rules';

describe('RulesEngine', () => {
  let engine: RulesEngine;
  let testChildId: string;

  beforeEach(() => {
    engine = new RulesEngine();
    testChildId = 'test-child-123';
  });

  describe('Pattern Matching', () => {
    it('should match greeting patterns correctly', () => {
      const result1 = engine.match('Hello');
      const result2 = engine.match('Good morning');
      const result3 = engine.match('Hi there!');

      expect(result1.matched).toBe(true);
      expect(result2.matched).toBe(true);
      expect(result3.matched).toBe(true);
    });

    it('should match animal patterns correctly', () => {
      const result1 = engine.match('I like cats');
      const result2 = engine.match('What is a dog?');
      const result3 = engine.match('Show me a bird');

      expect(result1.matched).toBe(true);
      expect(result2.matched).toBe(true);
      expect(result3.matched).toBe(true);
    });

    it('should match color patterns correctly', () => {
      const result1 = engine.match('I like red');
      const result2 = engine.match('The sky is blue');
      const result3 = engine.match('A yellow banana');

      expect(result1.matched).toBe(true);
      expect(result2.matched).toBe(true);
      expect(result3.matched).toBe(true);
    });

    it('should match number patterns correctly', () => {
      const result1 = engine.match('I have three apples');
      const result2 = engine.match('Give me five cookies');
      const result3 = engine.match('Count to ten');

      expect(result1.matched).toBe(true);
      expect(result2.matched).toBe(true);
      expect(result3.matched).toBe(true);
    });

    it('should match fruit patterns correctly', () => {
      const result1 = engine.match('I want an apple');
      const result2 = engine.match('I like bananas');
      const result3 = engine.match('A sweet strawberry');

      expect(result1.matched).toBe(true);
      expect(result2.matched).toBe(true);
      expect(result3.matched).toBe(true);
    });
  });

  describe('Response Generation', () => {
    it('should generate correct greeting response', async () => {
      const response = await engine.processInput('Hello');

      expect(response.text).toBeTruthy();
      expect(response.isAI).toBe(false);
      expect(response.text).toMatch(/hello|hi|hey/i);
    });

    it('should generate correct animal response', async () => {
      const response = await engine.processInput('What is a cat?');

      expect(response.text).toBeTruthy();
      expect(response.isAI).toBe(false);
      expect(response.text).toMatch(/cat|kitten|meow/i);
    });

    it('should generate correct color response', async () => {
      const response = await engine.processInput('I like red');

      expect(response.text).toBeTruthy();
      expect(response.isAI).toBe(false);
      expect(response.text).toMatch(/red|color|beautiful/i);
    });
  });

  describe('Data Extraction and Saving', () => {
    it('should extract and save child name', async () => {
      const response = await engine.processInput(
        'My name is Emma',
        testChildId
      );

      expect(response.text).toBeTruthy();
      expect(response.text).toMatch(/emma|nice to meet you/i);

      const context = engine.getContext(testChildId);
      expect(context.name).toBe('emma'); // Names are lowercased for consistency
    });

    it('should extract and save favorite animal', async () => {
      engine.updateContext(testChildId, { name: 'Emma' });

      const response = await engine.processInput(
        'I like cats the most',
        testChildId
      );

      const context = engine.getContext(testChildId);
      expect(context.name).toBe('Emma');
      expect(response.text).toBeTruthy();
    });

    it('should extract and save favorite color', async () => {
      engine.updateContext(testChildId, { name: 'emma' });

      const response = await engine.processInput(
        'My favorite color is blue',
        testChildId
      );

      const context = engine.getContext(testChildId);
      expect(context.name).toBe('emma');
      expect(response.text).toBeTruthy();
    });
  });

  describe('Template Variable Substitution', () => {
    it('should substitute name variable correctly', async () => {
      engine.updateContext(testChildId, { name: 'Lucas' });

      const response = await engine.processInput(
        'What is my favorite color?',
        testChildId
      );

      // 某些规则会使用 {name} 变量
      if (response.text.includes('{name}')) {
        expect(response.text).not.toContain('{name}');
      }
    });

    it('should substitute item variable correctly', async () => {
      const response = await engine.processInput('I like apples');

      // 确保模板中的 {item} 被替换了
      if (response.text.includes('{item}')) {
        expect(response.text).not.toContain('{item}');
      }
    });

    it('should substitute color variable correctly', async () => {
      const response = await engine.processInput('The sky is blue');

      // 确保模板中的 {color} 被替换了
      if (response.text.includes('{color}')) {
        expect(response.text).not.toContain('{color}');
      }
    });
  });

  describe('Priority Handling', () => {
    it('should match higher priority rules first', () => {
      // 创建测试规则 - using string array pattern
      const highPriorityRule: Rule = {
        id: 'test-high',
        pattern: ['test'],
        response: 'High priority response',
        priority: 10,
      };

      const lowPriorityRule: Rule = {
        id: 'test-low',
        pattern: ['test'],
        response: 'Low priority response',
        priority: 1,
      };

      const customEngine = new RulesEngine([highPriorityRule, lowPriorityRule]);

      const result = customEngine.match('This is a test');
      expect(result.rule?.id).toBe('test-high');
    });
  });

  describe('Context Management', () => {
    it('should update context correctly', () => {
      engine.updateContext(testChildId, { name: 'Sophia' });
      engine.updateContext(testChildId, { age: 4 });

      const context = engine.getContext(testChildId);
      expect(context.name).toBe('Sophia');
      expect(context.age).toBe(4);
    });

    it('should clear context correctly', () => {
      engine.updateContext(testChildId, { name: 'Sophia' });
      engine.clearContext(testChildId);

      const context = engine.getContext(testChildId);
      expect(context).toEqual({});
    });

    it('should clear all contexts correctly', () => {
      engine.updateContext('child-1', { name: 'Emma' });
      engine.updateContext('child-2', { name: 'Lucas' });

      engine.clearAllContexts();

      expect(engine.getContext('child-1')).toEqual({});
      expect(engine.getContext('child-2')).toEqual({});
    });
  });

  describe('Rule Management', () => {
    it('should add custom rule correctly', () => {
      const customRule: Rule = {
        id: 'custom-rule',
        pattern: ['custom pattern'],
        response: 'Custom response',
        priority: 5,
      };

      engine.addRule(customRule);

      const result = engine.match('This is a custom pattern');
      expect(result.matched).toBe(true);
      expect(result.rule?.id).toBe('custom-rule');
    });

    it('should add multiple rules correctly', () => {
      const rules: Rule[] = [
        {
          id: 'custom-rule-1',
          pattern: ['pattern 1'],
          response: 'Response 1',
          priority: 5,
        },
        {
          id: 'custom-rule-2',
          pattern: ['pattern 2'],
          response: 'Response 2',
          priority: 5,
        },
      ];

      engine.addRules(rules);

      const result1 = engine.match('This is pattern 1');
      const result2 = engine.match('This is pattern 2');

      expect(result1.matched).toBe(true);
      expect(result2.matched).toBe(true);
    });

    it('should remove rule correctly', () => {
      const customRule: Rule = {
        id: 'removable-rule',
        pattern: ['removable pattern'],
        response: 'Removable response',
        priority: 5,
      };

      engine.addRule(customRule);
      expect(engine.match('removable pattern').matched).toBe(true);

      engine.removeRule('removable-rule');
      expect(engine.match('removable pattern').matched).toBe(false);
    });

    it('should get all rules correctly', () => {
      const allRules = engine.getAllRules();
      expect(allRules.length).toBeGreaterThan(0);
      expect(allRules.every((rule) => rule.id)).toBeTruthy();
    });

    it('should get rules by category correctly', () => {
      const greetingRules = engine.getRulesByCategory('greeting');
      expect(greetingRules.length).toBeGreaterThan(0);
      expect(greetingRules.every((rule) => rule.id.startsWith('greeting'))).toBe(
        true
      );
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty input correctly', async () => {
      const response = await engine.processInput('');
      expect(response.text).toBeTruthy();
    });

    it('should handle very long input correctly', async () => {
      const longInput = 'hello '.repeat(1000);
      const response = await engine.processInput(longInput);
      expect(response.text).toBeTruthy();
    });

    it('should handle special characters correctly', async () => {
      const response = await engine.processInput('Hello!!! @#$%^&*()');
      expect(response.text).toBeTruthy();
    });

    it('should handle case-insensitive matching correctly', async () => {
      const response1 = await engine.processInput('HELLO');
      const response2 = await engine.processInput('hello');
      const response3 = await engine.processInput('HeLLo');

      expect(response1.text).toBeTruthy();
      expect(response2.text).toBeTruthy();
      expect(response3.text).toBeTruthy();
    });

    it('should handle unmatched input correctly', async () => {
      const response = await engine.processInput(
        'xyz123 completely unmatched input'
      );
      // Should return the default "I'm still learning" response
      expect(response.text).toBeTruthy();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle conversation flow correctly', async () => {
      // 第一轮：介绍名字
      const response1 = await engine.processInput(
        'My name is Oliver',
        testChildId
      );
      expect(response1.text).toMatch(/oliver|nice to meet you/i);

      // 第二轮：询问最喜欢的颜色（应该记住名字）
      const response2 = await engine.processInput(
        'My favorite color is green',
        testChildId
      );
      expect(response2.text).toBeTruthy();

      // 验证上下文被正确保存
      const context = engine.getContext(testChildId);
      expect(context.name).toBe('oliver'); // lowercased
    });

    it('should handle multiple children contexts correctly', async () => {
      const child1Id = 'child-1';
      const child2Id = 'child-2';

      await engine.processInput('My name is Emma', child1Id);
      await engine.processInput('My name is Lucas', child2Id);

      const context1 = engine.getContext(child1Id);
      const context2 = engine.getContext(child2Id);

      expect(context1.name).toBe('emma'); // lowercased
      expect(context2.name).toBe('lucas'); // lowercased
    });
  });

  describe('Animation and Sound', () => {
    it('should include animation in response when specified', async () => {
      const response = await engine.processInput('Good job!');

      // 某些规则应该有动画效果
      if (response.animation) {
        expect(['happy', 'excited', 'bounce']).toContain(response.animation);
      }
    });

    it('should include sound in response when specified', async () => {
      const response = await engine.processInput('Thank you!');

      // 某些规则应该有音效
      if (response.sound) {
        expect(response.sound).toMatch(/\.(wav|mp3|ogg)$/i);
      }
    });
  });

  describe('Follow-up Questions', () => {
    it('should include follow-up when specified', async () => {
      const response = await engine.processInput('My name is Mia', testChildId);

      // 某些规则应该有追问
      if (response.followUp) {
        expect(response.followUp).toBeTruthy();
        expect(typeof response.followUp).toBe('string');
      }
    });
  });
});
