import { NextRequest, NextResponse } from 'next/server';
import { initDeepSeekService } from '@/lib/ai/deepseek-service';
import { defaultHybridService } from '@/lib/ai/hybrid-service';

/**
 * POST /api/chat
 * 聊天 API 端点
 * Chat API endpoint
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, childId } = body;

    // 验证输入
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // 初始化 DeepSeek 服务（如果还未初始化）
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (apiKey) {
      const deepSeekService = initDeepSeekService(apiKey);
      defaultHybridService.setAIService(deepSeekService);
    } else {
      console.warn('DEEPSEEK_API_KEY not found, using rules engine only');
    }

    // 处理消息
    const response = await defaultHybridService.processInput(message, childId);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process message',
        text: "I'm having trouble right now! Can we try again? 🤔",
        isAI: false,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/chat
 * 健康检查端点
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'hybrid',
    rules: 'available',
    ai: process.env.DEEPSEEK_API_KEY ? 'available' : 'not configured',
  });
}
