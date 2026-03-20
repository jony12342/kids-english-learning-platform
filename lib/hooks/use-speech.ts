import { useState, useEffect, useCallback, useRef } from 'react';
import { getSpeechService } from '@/lib/speech/speech-service';

export interface UseSpeechReturn {
  // 识别状态
  isListening: boolean;
  recognitionStatus: 'idle' | 'listening' | 'processing' | 'error';

  // 合成状态
  isSpeaking: boolean;
  synthesisStatus: 'idle' | 'speaking' | 'paused' | 'error';

  // 浏览器支持
  isRecognitionSupported: boolean;
  isSynthesisSupported: boolean;

  // 识别方法
  startListening: (onResult: (transcript: string) => void, onError?: (error: string) => void) => void;
  stopListening: () => void;

  // 合成方法
  speak: (text: string) => void;
  stopSpeaking: () => void;

  // 对话方法
  startConversation: (prompt: string, onUserSpoke: (transcript: string) => void) => Promise<void>;
}

/**
 * 语音服务 Hook
 * Speech Service Hook
 */
export function useSpeech(): UseSpeechReturn {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognitionStatus, setRecognitionStatus] = useState<'idle' | 'listening' | 'processing' | 'error'>('idle');
  const [synthesisStatus, setSynthesisStatus] = useState<'idle' | 'speaking' | 'paused' | 'error'>('idle');
  const [mounted, setMounted] = useState(false);

  const speechServiceRef = useRef<typeof getSpeechService extends Function ? ReturnType<typeof getSpeechService> : null>(null);

  // 只在客户端挂载时初始化语音服务
  useEffect(() => {
    setMounted(true);
    speechServiceRef.current = getSpeechService();

    return () => {
      setMounted(false);
    };
  }, []);

  const speechService = speechServiceRef.current;

  // 更新识别状态
  useEffect(() => {
    if (!speechService || !mounted) return;
    const status = speechService.getRecognitionStatus();
    setRecognitionStatus(status);
    setIsListening(status === 'listening');
  }, [speechService, mounted]);

  // 更新合成状态
  useEffect(() => {
    if (!speechService || !mounted) return;
    const status = speechService.getSynthesisStatus();
    setSynthesisStatus(status);
    setIsSpeaking(status === 'speaking');
  }, [speechService, mounted]);

  // 开始语音识别
  const startListening = useCallback((
    onResult: (transcript: string) => void,
    onError?: (error: string) => void
  ) => {
    if (!speechService) return;
    speechService.startListening(onResult, onError);
  }, [speechService]);

  // 停止语音识别
  const stopListening = useCallback(() => {
    if (!speechService) return;
    speechService.stopListening();
  }, [speechService]);

  // 文本转语音
  const speak = useCallback((text: string) => {
    if (!speechService) return;
    speechService.speak(text);
  }, [speechService]);

  // 停止说话
  const stopSpeaking = useCallback(() => {
    if (!speechService) return;
    speechService.stopSpeaking();
  }, [speechService]);

  // 开始对话循环
  const startConversation = useCallback(async (
    prompt: string,
    onUserSpoke: (transcript: string) => void
  ) => {
    if (!speechService) return Promise.resolve();
    return speechService.startConversation(prompt, onUserSpoke);
  }, [speechService]);

  return {
    // 识别状态
    isListening,
    recognitionStatus,

    // 合成状态
    isSpeaking,
    synthesisStatus,

    // 浏览器支持
    isRecognitionSupported: speechService?.isRecognitionSupported() ?? false,
    isSynthesisSupported: speechService?.isSynthesisSupported() ?? false,

    // 识别方法
    startListening,
    stopListening,

    // 合成方法
    speak,
    stopSpeaking,

    // 对话方法
    startConversation,
  };
}
