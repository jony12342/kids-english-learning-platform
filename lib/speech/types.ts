/**
 * Speech and Pronunciation Types
 * 语音和发音评估类型定义
 */

import { PronunciationResult } from './vocabulary';

// 重新导出 vocabulary 类型
export type { PronunciationResult };

/**
 * 语音识别状态
 */
export type RecognitionStatus =
  | 'idle'          // 空闲
  | 'listening';    // 正在监听

/**
 * 文本转语音状态
 */
export type SynthesisStatus =
  | 'idle'          // 空闲
  | 'speaking';     // 正在播放

/**
 * 语音识别事件
 */
export interface RecognitionEvent {
  type: 'start' | 'result' | 'error' | 'end';
  data?: string;
  error?: string;
}

/**
 * 文本转语音事件
 */
export interface SynthesisEvent {
  type: 'start' | 'end' | 'error';
  error?: string;
}
