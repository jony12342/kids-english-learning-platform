/**
 * Pronunciation Assessment
 * 发音评估系统
 *
 * 使用 Web Speech API 进行语音识别和发音评估
 */

import { PronunciationResult } from '../../types/vocabulary';

// 语音识别配置
const SPEECH_RECOGNITION_CONFIG = {
  language: 'en-US', // 美式英语
  continuous: false, // 不连续识别
  interimResults: false, // 不返回临时结果
  maxAlternatives: 1, // 最大备选数量
};

/**
 * 文本转语音 (TTS)
 * 使用 Web Speech API 的 SpeechSynthesis
 */
export class TextToSpeech {
  private synthesis: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.synthesis = window.speechSynthesis;
      this.loadVoices();
    }
  }

  private loadVoices() {
    // 加载可用的语音
    this.voices = this.synthesis.getVoices();

    // 某些浏览器需要等待 voiceschanged 事件
    if (this.voices.length === 0) {
      this.synthesis.onvoiceschanged = () => {
        this.voices = this.synthesis.getVoices();
      };
    }
  }

  /**
   * 播放语音
   * @param text - 要播放的文本
   * @param rate - 语速 (0.1 - 10, 默认 0.8 适合儿童)
   * @param pitch - 音调 (0 - 2, 默认 1)
   */
  speak(text: string, rate: number = 0.8, pitch: number = 1): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // 取消当前正在播放的语音
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // 设置语音参数
      utterance.rate = rate; // 语速稍慢，适合儿童学习
      utterance.pitch = pitch; // 正常音调
      utterance.volume = 1; // 最大音量

      // 选择英语语音（优先选择美式英语）
      const englishVoice = this.voices.find(
        voice => voice.lang.startsWith('en-US') || voice.lang.startsWith('en')
      );
      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onend = () => {
        resolve();
      };

      utterance.onerror = (event) => {
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      this.synthesis.speak(utterance);
    });
  }

  /**
   * 停止播放
   */
  stop() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  /**
   * 暂停播放
   */
  pause() {
    if (this.synthesis) {
      this.synthesis.pause();
    }
  }

  /**
   * 恢复播放
   */
  resume() {
    if (this.synthesis) {
      this.synthesis.resume();
    }
  }
}

/**
 * 语音识别 (STT)
 * 使用 Web Speech API 的 SpeechRecognition
 */
export class SpeechRecognition {
  private recognition: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      // 检查浏览器支持
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.setupRecognition();
      }
    }
  }

  private setupRecognition() {
    this.recognition.lang = SPEECH_RECOGNITION_CONFIG.language;
    this.recognition.continuous = SPEECH_RECOGNITION_CONFIG.continuous;
    this.recognition.interimResults = SPEECH_RECOGNITION_CONFIG.interimResults;
    this.recognition.maxAlternatives = SPEECH_RECOGNITION_CONFIG.maxAlternatives;
  }

  /**
   * 检查浏览器是否支持语音识别
   */
  isSupported(): boolean {
    return this.recognition !== null;
  }

  /**
   * 开始识别
   * @returns Promise<string> - 返回识别的文本
   */
  startListening(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      // 停止之前的识别
      this.recognition.stop();

      this.recognition.onresult = (event: any) => {
        const lastResult = event.results[event.results.length - 1];
        const transcript = lastResult[0].transcript.trim();
        resolve(transcript);
      };

      this.recognition.onerror = (event: any) => {
        // 忽略 "no-speech" 错误（用户没有说话）
        if (event.error === 'no-speech') {
          resolve('');
          return;
        }
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.recognition.onend = () => {
        // 识别正常结束
      };

      this.recognition.start();
    });
  }

  /**
   * 停止识别
   */
  stopListening() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  /**
   * 取消识别
   */
  abortListening() {
    if (this.recognition) {
      this.recognition.abort();
    }
  }
}

/**
 * 发音评估器
 * 评估用户发音是否正确
 */
export class PronunciationAssessor {
  private speechRecognition: SpeechRecognition;

  constructor() {
    this.speechRecognition = new SpeechRecognition();
  }

  /**
   * 检查是否支持语音识别
   */
  isSupported(): boolean {
    return this.speechRecognition.isSupported();
  }

  /**
   * 评估单词发音
   * @param targetWord - 目标单词
   * @returns Promise<PronunciationResult> - 评估结果
   */
  async assessWord(targetWord: string): Promise<PronunciationResult> {
    try {
      const detectedText = await this.speechRecognition.startListening();

      if (!detectedText) {
        return {
          isCorrect: false,
          confidence: 0,
          feedback: 'No speech detected. Please try again.',
          detectedText: ''
        };
      }

      return this.comparePronunciation(targetWord, detectedText);
    } catch (error) {
      return {
        isCorrect: false,
        confidence: 0,
        feedback: 'Could not recognize speech. Please try again.',
        detectedText: ''
      };
    }
  }

  /**
   * 评估短句发音
   * @param targetSentence - 目标短句
   * @returns Promise<PronunciationResult> - 评估结果
   */
  async assessSentence(targetSentence: string): Promise<PronunciationResult> {
    try {
      const detectedText = await this.speechRecognition.startListening();

      if (!detectedText) {
        return {
          isCorrect: false,
          confidence: 0,
          feedback: 'No speech detected. Please try again.',
          detectedText: ''
        };
      }

      return this.comparePronunciation(targetSentence, detectedText);
    } catch (error) {
      return {
        isCorrect: false,
        confidence: 0,
        feedback: 'Could not recognize speech. Please try again.',
        detectedText: ''
      };
    }
  }

  /**
   * 比较目标文本和识别文本
   * @param target - 目标文本
   * @param detected - 识别的文本
   * @returns PronunciationResult - 评估结果
   */
  private comparePronunciation(target: string, detected: string): PronunciationResult {
    // 标准化文本（转小写，去除标点，去除多余空格）
    const normalizeText = (text: string) => {
      return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // 移除标点符号
        .replace(/\s+/g, ' ') // 合并多余空格
        .trim();
    };

    const normalizedTarget = normalizeText(target);
    const normalizedDetected = normalizeText(detected);

    // 完全匹配
    if (normalizedTarget === normalizedDetected) {
      return {
        isCorrect: true,
        confidence: 1.0,
        feedback: 'Great! Perfect pronunciation!',
        detectedText: detected
      };
    }

    // 计算相似度（使用简单的单词匹配）
    const targetWords = normalizedTarget.split(' ');
    const detectedWords = normalizedDetected.split(' ');

    let matchCount = 0;
    for (const targetWord of targetWords) {
      for (const detectedWord of detectedWords) {
        if (targetWord === detectedWord) {
          matchCount++;
          break;
        }
      }
    }

    const similarity = matchCount / targetWords.length;
    const confidence = Math.round(similarity * 100) / 100;

    // 判断是否正确（相似度 >= 0.7）
    const isCorrect = similarity >= 0.7;

    // 生成反馈
    let feedback: string;
    if (similarity >= 0.9) {
      feedback = 'Excellent! Almost perfect!';
    } else if (similarity >= 0.7) {
      feedback = 'Good job! Try again for even better pronunciation.';
    } else if (similarity >= 0.5) {
      feedback = 'Not bad. Listen carefully and try again.';
    } else {
      feedback = 'Keep practicing. Listen to the pronunciation and try again.';
    }

    return {
      isCorrect,
      confidence,
      feedback,
      detectedText: detected
    };
  }

  /**
   * 停止识别
   */
  stopListening() {
    this.speechRecognition.stopListening();
  }

  /**
   * 取消识别
   */
  abortListening() {
    this.speechRecognition.abortListening();
  }
}

// 导出单例实例
export const textToSpeech = new TextToSpeech();
export const pronunciationAssessor = new PronunciationAssessor();
