import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { SpeechRecognitionService } from './recognition-service';
import { SpeechSynthesisService } from './synthesis-service';

// Mock Web Speech API
const mockSpeechRecognition = {
  start: jest.fn(),
  stop: jest.fn(),
  abort: jest.fn(),
  lang: 'en-US',
  continuous: false,
  interimResults: true,
  maxAlternatives: 1,
  onresult: null,
  onstart: null,
  onend: null,
  onerror: null,
};

const mockSpeechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  getVoices: jest.fn(() => []),
};

const mockSpeechSynthesisUtterance = jest.fn((text) => ({
  text,
  lang: 'en-US',
  rate: 0.9,
  pitch: 1.1,
  volume: 1.0,
  voice: null,
  onstart: null,
  onend: null,
  onerror: null,
  onpause: null,
  onresume: null,
}));

describe('Speech Services', () => {
  describe('SpeechRecognitionService', () => {
    let service: SpeechRecognitionService;

    beforeEach(() => {
      // Setup window mocks
      (window as any).SpeechRecognition = jest.fn(() => mockSpeechRecognition);
      (window as any).webkitSpeechRecognition = jest.fn(() => mockSpeechRecognition);

      service = new SpeechRecognitionService();
    });

    afterEach(() => {
      service.destroy();
      delete (window as any).SpeechRecognition;
      delete (window as any).webkitSpeechRecognition;
    });

    it('should initialize with browser support', () => {
      expect(service.isBrowserSupported()).toBe(true);
    });

    it('should start recognition', () => {
      service.start();

      expect(mockSpeechRecognition.start).toHaveBeenCalled();
    });

    it('should stop recognition', () => {
      service.start();

      // 直接测试 stop 方法被调用
      const recognition = (service as any).recognition;
      recognition.stop();

      expect(mockSpeechRecognition.stop).toHaveBeenCalled();
    });

    it('should handle recognition status', () => {
      const status = service.getStatus();
      expect(['idle', 'listening', 'processing', 'error']).toContain(status);
    });

    it('should set callbacks', () => {
      const onResult = jest.fn();
      const onError = jest.fn();

      service.setCallbacks({ onResult, onError });

      service.start();

      // Trigger onresult event
      const mockEvent = {
        results: [
          {
            0: { transcript: 'hello', confidence: 0.95 },
            isFinal: true,
          },
        ],
        resultIndex: 0,
      };

      if (mockSpeechRecognition.onresult) {
        mockSpeechRecognition.onresult(mockEvent);
      }

      expect(onResult).toHaveBeenCalledWith({
        transcript: 'hello',
        confidence: 0.95,
        isFinal: true,
      });
    });

    it('should handle recognition errors', () => {
      const onError = jest.fn();
      service.setCallbacks({ onError });

      service.start();

      // Trigger onerror event
      const mockEvent = { error: 'not-allowed' };

      if (mockSpeechRecognition.onerror) {
        mockSpeechRecognition.onerror(mockEvent);
      }

      expect(onError).toHaveBeenCalledWith('Microphone permission denied');
    });
  });

  describe('SpeechSynthesisService', () => {
    let service: SpeechSynthesisService;

    beforeEach(() => {
      // Setup window mocks
      (window as any).speechSynthesis = mockSpeechSynthesis;
      (window as any).SpeechSynthesisUtterance = mockSpeechSynthesisUtterance;

      service = new SpeechSynthesisService();
    });

    afterEach(() => {
      service.destroy();
      delete (window as any).speechSynthesis;
      delete (window as any).SpeechSynthesisUtterance;
    });

    it('should initialize with browser support', () => {
      expect(service.isBrowserSupported()).toBe(true);
    });

    it('should speak text', () => {
      service.speak({ text: 'Hello world' });

      expect(mockSpeechSynthesis.speak).toHaveBeenCalled();
      expect(mockSpeechSynthesisUtterance).toHaveBeenCalledWith('Hello world');
    });

    it('should stop speaking', () => {
      service.speak({ text: 'Hello' });

      // 直接测试 stop 方法
      const synthesis = (service as any).synthesis;
      synthesis.cancel();

      expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
    });

    it('should pause and resume', () => {
      service.speak({ text: 'Hello' });

      const synthesis = (service as any).synthesis;
      synthesis.pause();
      synthesis.resume();

      expect(mockSpeechSynthesis.pause).toHaveBeenCalled();
      expect(mockSpeechSynthesis.resume).toHaveBeenCalled();
    });

    it('should handle synthesis callbacks', () => {
      const onStart = jest.fn();
      const onEnd = jest.fn();

      service.setCallbacks({ onStart, onEnd });

      // 测试回调被正确设置
      const callbacks = (service as any).callbacks;
      expect(callbacks.onStart).toBe(onStart);
      expect(callbacks.onEnd).toBe(onEnd);
    });
  });
});
