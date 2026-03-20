// 语音服务类型定义
export interface SpeechRecognitionConfig {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}

export interface SpeechSynthesisConfig {
  lang?: string;
  voice?: SpeechSynthesisVoice;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export interface RecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export type RecognitionStatus = 'idle' | 'listening' | 'processing' | 'error';
export type SynthesisStatus = 'idle' | 'speaking' | 'paused' | 'error';

export interface SpeechRecognitionCallbacks {
  onResult?: (result: RecognitionResult) => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

export interface SpeechSynthesisCallbacks {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
  onPause?: () => void;
  onResume?: () => void;
}

// 语音合成选项
export interface SpeakOptions {
  text: string;
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: string;
}
