import {
  SpeechRecognitionConfig,
  RecognitionResult,
  RecognitionStatus,
  SpeechRecognitionCallbacks,
} from '@/types/speech';

/**
 * 语音识别服务（使用 Web Speech API）
 * Speech Recognition Service using Web Speech API
 */
export class SpeechRecognitionService {
  private recognition: any = null;
  private status: RecognitionStatus = 'idle';
  private config: SpeechRecognitionConfig;
  private callbacks: SpeechRecognitionCallbacks = {};
  private isSupported: boolean;

  constructor(config?: SpeechRecognitionConfig) {
    this.config = {
      lang: 'en-US', // 默认英语
      continuous: false, // 不连续识别（说完一句就停止）
      interimResults: true, // 返回临时结果
      maxAlternatives: 1,
      ...config,
    };

    // 检查浏览器支持
    this.isSupported = this.checkSupport();

    if (this.isSupported) {
      this.initRecognition();
    }
  }

  /**
   * 检查浏览器是否支持语音识别
   * Check if browser supports speech recognition
   */
  private checkSupport(): boolean {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    return !!SpeechRecognition;
  }

  /**
   * 初始化语音识别实例
   * Initialize speech recognition instance
   */
  private initRecognition(): void {
    if (!this.isSupported) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    // 配置识别参数
    this.recognition.lang = this.config.lang || 'en-US';
    this.recognition.continuous = this.config.continuous || false;
    this.recognition.interimResults = this.config.interimResults || false;
    this.recognition.maxAlternatives = this.config.maxAlternatives || 1;

    // 设置事件处理器
    this.setupEventHandlers();
  }

  /**
   * 设置事件处理器
   * Setup event handlers
   */
  private setupEventHandlers(): void {
    if (!this.recognition) return;

    // 识别结果
    this.recognition.onresult = (event: any) => {
      const lastResult = event.results[event.results.length - 1];
      const transcript = lastResult[0].transcript;
      const confidence = lastResult[0].confidence;
      const isFinal = lastResult.isFinal;

      this.status = 'processing';

      const result: RecognitionResult = {
        transcript: transcript.trim(),
        confidence,
        isFinal,
      };

      if (this.callbacks.onResult) {
        this.callbacks.onResult(result);
      }

      if (isFinal) {
        this.status = 'idle';
        if (this.callbacks.onEnd) {
          this.callbacks.onEnd();
        }
      }
    };

    // 识别开始
    this.recognition.onstart = () => {
      this.status = 'listening';
      if (this.callbacks.onStart) {
        this.callbacks.onStart();
      }
    };

    // 识别结束
    this.recognition.onend = () => {
      if (this.status === 'listening') {
        this.status = 'idle';
        if (this.callbacks.onEnd) {
          this.callbacks.onEnd();
        }
      }
    };

    // 识别错误
    this.recognition.onerror = (event: any) => {
      this.status = 'error';

      let errorMessage = 'Recognition error';
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected';
          break;
        case 'audio-capture':
          errorMessage = 'No microphone found';
          break;
        case 'not-allowed':
          errorMessage = 'Microphone permission denied';
          break;
        case 'network':
          errorMessage = 'Network error';
          break;
        case 'aborted':
          errorMessage = 'Recognition aborted';
          break;
        default:
          errorMessage = event.error || 'Unknown error';
      }

      if (this.callbacks.onError) {
        this.callbacks.onError(errorMessage);
      }

      this.status = 'idle';
    };
  }

  /**
   * 开始识别
   * Start recognition
   */
  start(): void {
    if (!this.isSupported) {
      const error = 'Speech recognition is not supported in this browser';
      if (this.callbacks.onError) {
        this.callbacks.onError(error);
      }
      return;
    }

    if (!this.recognition) {
      this.initRecognition();
    }

    try {
      // 如果正在识别，先停止
      if (this.status === 'listening') {
        this.stop();
      }

      this.recognition.start();
    } catch (error) {
      console.error('Failed to start recognition:', error);
      if (this.callbacks.onError) {
        this.callbacks.onError('Failed to start recognition');
      }
    }
  }

  /**
   * 停止识别
   * Stop recognition
   */
  stop(): void {
    if (this.recognition && this.status === 'listening') {
      try {
        this.recognition.stop();
      } catch (error) {
        console.error('Failed to stop recognition:', error);
      }
    }
  }

  /**
   * 取消识别
   * Abort recognition immediately
   */
  abort(): void {
    if (this.recognition) {
      try {
        this.recognition.abort();
        this.status = 'idle';
      } catch (error) {
        console.error('Failed to abort recognition:', error);
      }
    }
  }

  /**
   * 设置回调函数
   * Set callbacks
   */
  setCallbacks(callbacks: SpeechRecognitionCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  /**
   * 更新配置
   * Update configuration
   */
  updateConfig(config: Partial<SpeechRecognitionConfig>): void {
    this.config = { ...this.config, ...config };

    // 重新初始化以应用新配置
    if (this.recognition) {
      this.initRecognition();
    }
  }

  /**
   * 获取当前状态
   * Get current status
   */
  getStatus(): RecognitionStatus {
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
   * 销毁实例
   * Destroy instance
   */
  destroy(): void {
    this.abort();
    this.recognition = null;
    this.callbacks = {};
    this.status = 'idle';
  }
}

// 创建单例实例
let recognitionInstance: SpeechRecognitionService | null = null;

export function getSpeechRecognitionService(config?: SpeechRecognitionConfig): SpeechRecognitionService {
  if (!recognitionInstance) {
    recognitionInstance = new SpeechRecognitionService(config);
  }
  return recognitionInstance;
}

export function destroySpeechRecognitionService(): void {
  if (recognitionInstance) {
    recognitionInstance.destroy();
    recognitionInstance = null;
  }
}
