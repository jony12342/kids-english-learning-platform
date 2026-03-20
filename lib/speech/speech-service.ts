import { SpeechRecognitionService } from './recognition-service';
import { SpeechSynthesisService } from './synthesis-service';
import { SpeakOptions } from '@/types/speech';

/**
 * 组合语音服务（识别 + 合成）
 * Combined Speech Service (Recognition + Synthesis)
 */
export class SpeechService {
  private recognition: SpeechRecognitionService;
  private synthesis: SpeechSynthesisService;

  constructor() {
    this.recognition = new SpeechRecognitionService();
    this.synthesis = new SpeechSynthesisService();
  }

  /**
   * ========== 语音识别 ==========
   * Speech Recognition
   */

  /**
   * 开始语音识别
   * Start speech recognition
   */
  startListening(
    onResult: (transcript: string) => void,
    onError?: (error: string) => void
  ): void {
    this.recognition.setCallbacks({
      onResult: (result) => {
        if (result.isFinal) {
          onResult(result.transcript);
        }
      },
      onError: (error) => {
        console.error('Recognition error:', error);
        if (onError) {
          onError(error);
        }
      },
      onStart: () => {
        console.log('Recognition started');
      },
      onEnd: () => {
        console.log('Recognition ended');
      },
    });

    this.recognition.start();
  }

  /**
   * 停止语音识别
   * Stop speech recognition
   */
  stopListening(): void {
    this.recognition.stop();
  }

  /**
   * 获取识别状态
   * Get recognition status
   */
  getRecognitionStatus() {
    return this.recognition.getStatus();
  }

  /**
   * ========== 语音合成 ==========
   * Speech Synthesis
   */

  /**
   * 文本转语音
   * Text to speech
   */
  speak(text: string, options?: Partial<SpeakOptions>): void {
    this.synthesis.speak({
      text,
      ...options,
    });
  }

  /**
   * 停止说话
   * Stop speaking
   */
  stopSpeaking(): void {
    this.synthesis.stop();
  }

  /**
   * 获取合成状态
   * Get synthesis status
   */
  getSynthesisStatus() {
    return this.synthesis.getStatus();
  }

  /**
   * ========== 完整对话流程 ==========
   * Complete Conversation Flow
   */

  /**
   * 开始对话循环
   * Start conversation loop:
   * 1. 系统说话
   * 2. 等待用户说话
   * 3. 返回用户说的话
   */
  async startConversation(
    prompt: string,
    onUserSpoke: (transcript: string) => void,
    onError?: (error: string) => void
  ): Promise<void> {
    // 1. 系统先说话
    return new Promise((resolve, reject) => {
      this.synthesis.setCallbacks({
        onStart: () => {
          console.log('System speaking:', prompt);
        },
        onEnd: () => {
          // 2. 系统说完后，开始监听用户
          console.log('System finished speaking, starting to listen...');
          this.startListening(
            (transcript) => {
              // 3. 用户说话完成
              console.log('User spoke:', transcript);
              onUserSpoke(transcript);
              resolve();
            },
            (error) => {
              console.error('Conversation error:', error);
              if (onError) {
                onError(error);
              }
              reject(error);
            }
          );
        },
        onError: (error) => {
          console.error('Synthesis error:', error);
          if (onError) {
            onError(error);
          }
          reject(error);
        },
      });

      // 开始说话
      this.synthesis.speak({ text: prompt });
    });
  }

  /**
   * 检查浏览器支持
   * Check browser support
   */
  isRecognitionSupported(): boolean {
    return this.recognition.isBrowserSupported();
  }

  isSynthesisSupported(): boolean {
    return this.synthesis.isBrowserSupported();
  }

  /**
   * 获取可用语音
   * Get available voices
   */
  getVoices() {
    return this.synthesis.getVoices();
  }

  /**
   * 销毁服务
   * Destroy service
   */
  destroy(): void {
    this.recognition.destroy();
    this.synthesis.destroy();
  }
}

// 创建单例实例
let speechServiceInstance: SpeechService | null = null;

export function getSpeechService(): SpeechService {
  if (!speechServiceInstance) {
    speechServiceInstance = new SpeechService();
  }
  return speechServiceInstance;
}

export function destroySpeechService(): void {
  if (speechServiceInstance) {
    speechServiceInstance.destroy();
    speechServiceInstance = null;
  }
}
