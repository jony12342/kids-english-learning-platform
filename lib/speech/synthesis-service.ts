import {
  SpeechSynthesisConfig,
  SynthesisStatus,
  SpeechSynthesisCallbacks,
  SpeakOptions,
} from '@/types/speech';

/**
 * 语音合成服务（使用 Web Speech API）
 * Speech Synthesis Service using Web Speech API
 */
export class SpeechSynthesisService {
  private synthesis: SpeechSynthesis | null = null;
  private status: SynthesisStatus = 'idle';
  private config: SpeechSynthesisConfig;
  private callbacks: SpeechSynthesisCallbacks = {};
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isSupported: boolean;

  constructor(config?: SpeechSynthesisConfig) {
    this.config = {
      lang: 'en-US',
      rate: 0.9, // 稍慢一点，适合儿童
      pitch: 1.1, // 稍高一点，更亲切
      volume: 1.0,
      ...config,
    };

    // 检查浏览器支持
    this.isSupported = this.checkSupport();

    if (this.isSupported) {
      this.synthesis = window.speechSynthesis;
      this.initVoices();
    }
  }

  /**
   * 检查浏览器是否支持语音合成
   * Check if browser supports speech synthesis
   */
  private checkSupport(): boolean {
    return 'speechSynthesis' in window;
  }

  /**
   * 初始化语音列表
   * Initialize voices
   */
  private initVoices(): void {
    if (!this.synthesis) return;

    // 尝试立即获取语音
    this.voices = this.synthesis.getVoices();

    // 监听语音列表变化（某些浏览器异步加载）
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        this.voices = this.synthesis?.getVoices() || [];
      };
    }
  }

  /**
   * 获取最佳英语语音（优先选择女性、英语）
   * Get best English voice (prefer female, English)
   */
  private getBestVoice(): SpeechSynthesisVoice | undefined {
    if (!this.voices || this.voices.length === 0) {
      return undefined;
    }

    const lang = this.config.lang || 'en-US';

    // 尝试找到英语女性声音
    const femaleEnglish = this.voices.find(
      (voice) =>
        voice.lang.startsWith('en') &&
        (voice.name.includes('Female') ||
          voice.name.includes('female') ||
          voice.name.includes('Woman') ||
          voice.name.includes('woman') ||
          voice.name.includes('Girl') ||
          voice.name.includes('Samantha') ||
          voice.name.includes('Victoria') ||
          voice.name.includes('Karen') ||
          voice.name.includes('Moira') ||
          voice.name.includes('Tessa') ||
          voice.name.includes('Fiona'))
    );

    if (femaleEnglish) return femaleEnglish;

    // 尝试找到英语声音
    const english = this.voices.find((voice) => voice.lang.startsWith('en'));

    if (english) return english;

    // 返回第一个可用声音
    return this.voices[0];
  }

  /**
   * 说话
   * Speak
   */
  speak(options: SpeakOptions): void {
    if (!this.isSupported || !this.synthesis) {
      const error = 'Speech synthesis is not supported in this browser';
      if (this.callbacks.onError) {
        this.callbacks.onError(error);
      }
      return;
    }

    // 停止当前正在说的
    if (this.status === 'speaking') {
      this.stop();
    }

    // 创建语音合成实例
    const utterance = new SpeechSynthesisUtterance(options.text);
    this.currentUtterance = utterance;

    // 配置语音参数
    utterance.lang = options.lang || this.config.lang || 'en-US';
    utterance.rate = options.rate !== undefined ? options.rate : this.config.rate || 1;
    utterance.pitch = options.pitch !== undefined ? options.pitch : this.config.pitch || 1;
    utterance.volume = options.volume !== undefined ? options.volume : this.config.volume || 1;

    // 选择语音
    if (options.voice) {
      const selectedVoice = this.voices.find((v) => v.name === options.voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    } else if (this.config.voice) {
      utterance.voice = this.config.voice;
    } else {
      const bestVoice = this.getBestVoice();
      if (bestVoice) {
        utterance.voice = bestVoice;
      }
    }

    // 设置事件处理器
    utterance.onstart = () => {
      this.status = 'speaking';
      if (this.callbacks.onStart) {
        this.callbacks.onStart();
      }
    };

    utterance.onend = () => {
      this.status = 'idle';
      this.currentUtterance = null;
      if (this.callbacks.onEnd) {
        this.callbacks.onEnd();
      }
    };

    utterance.onerror = (event: any) => {
      this.status = 'error';
      this.currentUtterance = null;

      let errorMessage = 'Synthesis error';
      if (event.error) {
        errorMessage = `Synthesis error: ${event.error}`;
      }

      if (this.callbacks.onError) {
        this.callbacks.onError(errorMessage);
      }

      this.status = 'idle';
    };

    utterance.onpause = () => {
      this.status = 'paused';
      if (this.callbacks.onPause) {
        this.callbacks.onPause();
      }
    };

    utterance.onresume = () => {
      this.status = 'speaking';
      if (this.callbacks.onResume) {
        this.callbacks.onResume();
      }
    };

    // 开始说话
    try {
      this.synthesis.speak(utterance);
    } catch (error) {
      console.error('Failed to speak:', error);
      if (this.callbacks.onError) {
        this.callbacks.onError('Failed to speak');
      }
      this.status = 'idle';
    }
  }

  /**
   * 停止说话
   * Stop speaking
   */
  stop(): void {
    if (this.synthesis && (this.status === 'speaking' || this.status === 'paused')) {
      try {
        this.synthesis.cancel();
        this.status = 'idle';
        this.currentUtterance = null;
      } catch (error) {
        console.error('Failed to stop synthesis:', error);
      }
    }
  }

  /**
   * 暂停
   * Pause
   */
  pause(): void {
    if (this.synthesis && this.status === 'speaking') {
      try {
        this.synthesis.pause();
      } catch (error) {
        console.error('Failed to pause synthesis:', error);
      }
    }
  }

  /**
   * 继续
   * Resume
   */
  resume(): void {
    if (this.synthesis && this.status === 'paused') {
      try {
        this.synthesis.resume();
      } catch (error) {
        console.error('Failed to resume synthesis:', error);
      }
    }
  }

  /**
   * 设置回调函数
   * Set callbacks
   */
  setCallbacks(callbacks: SpeechSynthesisCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  /**
   * 更新配置
   * Update configuration
   */
  updateConfig(config: Partial<SpeechSynthesisConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * 获取当前状态
   * Get current status
   */
  getStatus(): SynthesisStatus {
    return this.status;
  }

  /**
   * 是否支持
   * Check if supported
   */
  isBrowserSupported(): boolean {
    return this.isSupported;
  }

  /**
   * 获取可用语音列表
   * Get available voices
   */
  getVoices(): SpeechSynthesisVoice[] {
    return [...this.voices];
  }

  /**
   * 销毁实例
   * Destroy instance
   */
  destroy(): void {
    this.stop();
    this.synthesis = null;
    this.currentUtterance = null;
    this.callbacks = {};
    this.status = 'idle';
  }
}

// 创建单例实例
let synthesisInstance: SpeechSynthesisService | null = null;

export function getSpeechSynthesisService(config?: SpeechSynthesisConfig): SpeechSynthesisService {
  if (!synthesisInstance) {
    synthesisInstance = new SpeechSynthesisService(config);
  }
  return synthesisInstance;
}

export function destroySpeechSynthesisService(): void {
  if (synthesisInstance) {
    synthesisInstance.destroy();
    synthesisInstance = null;
  }
}
