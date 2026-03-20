import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Client Configuration
 * Supabase 客户端配置
 */

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Create a Supabase client for client-side operations
 * 创建用于客户端操作的Supabase客户端
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce', // Use PKCE flow for better security
  },
});

/**
 * Create a Supabase client for server-side operations
 * Use this in API routes and server components
 * 创建用于服务端操作的Supabase客户端
 * 在API路由和服务端组件中使用
 */
export function createServerClient() {
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!supabaseServiceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Type definitions for database tables
 * 数据库表的类型定义
 */

export type Database = {
  public: {
    Tables: {
      children: {
        Row: {
          id: string;
          parent_id: string;
          name: string;
          avatar_url: string | null;
          birth_date: string | null;
          language_level: 'beginner' | 'intermediate' | 'advanced';
          created_at: string;
          updated_at: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          parent_id: string;
          name: string;
          avatar_url?: string | null;
          birth_date?: string | null;
          language_level?: 'beginner' | 'intermediate' | 'advanced';
          created_at?: string;
          updated_at?: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          parent_id?: string;
          name?: string;
          avatar_url?: string | null;
          birth_date?: string | null;
          language_level?: 'beginner' | 'intermediate' | 'advanced';
          created_at?: string;
          updated_at?: string;
          is_active?: boolean;
        };
      };
      parents: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      learning_words: {
        Row: {
          id: string;
          child_id: string;
          word: string;
          category: string | null;
          translation: string | null;
          example_sentence: string | null;
          pronunciation_url: string | null;
          image_url: string | null;
          learned_at: string;
          review_count: number;
          last_reviewed_at: string | null;
          mastery_level: number;
        };
        Insert: {
          id?: string;
          child_id: string;
          word: string;
          category?: string | null;
          translation?: string | null;
          example_sentence?: string | null;
          pronunciation_url?: string | null;
          image_url?: string | null;
          learned_at?: string;
          review_count?: number;
          last_reviewed_at?: string | null;
          mastery_level?: number;
        };
        Update: {
          id?: string;
          child_id?: string;
          word?: string;
          category?: string | null;
          translation?: string | null;
          example_sentence?: string | null;
          pronunciation_url?: string | null;
          image_url?: string | null;
          learned_at?: string;
          review_count?: number;
          last_reviewed_at?: string | null;
          mastery_level?: number;
        };
      };
      conversations: {
        Row: {
          id: string;
          child_id: string;
          started_at: string;
          ended_at: string | null;
          message_count: number;
          topic: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          child_id: string;
          started_at?: string;
          ended_at?: string | null;
          message_count?: number;
          topic?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          child_id?: string;
          started_at?: string;
          ended_at?: string | null;
          message_count?: number;
          topic?: string | null;
          created_at?: string;
        };
      };
      conversation_messages: {
        Row: {
          id: string;
          conversation_id: string;
          role: 'user' | 'assistant';
          content: string;
          audio_url: string | null;
          is_ai: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          role: 'user' | 'assistant';
          content: string;
          audio_url?: string | null;
          is_ai?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          role?: 'user' | 'assistant';
          content?: string;
          audio_url?: string | null;
          is_ai?: boolean;
          created_at?: string;
        };
      };
      rewards: {
        Row: {
          id: string;
          child_id: string;
          type: 'star' | 'badge';
          reason: string;
          count: number;
          metadata: any | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          child_id: string;
          type: 'star' | 'badge';
          reason: string;
          count?: number;
          metadata?: any | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          child_id?: string;
          type?: 'star' | 'badge';
          reason?: string;
          count?: number;
          metadata?: any | null;
          created_at?: string;
        };
      };
      user_badges: {
        Row: {
          id: string;
          child_id: string;
          badge_id: string;
          unlocked_at: string;
          progress: number;
        };
        Insert: {
          id?: string;
          child_id: string;
          badge_id: string;
          unlocked_at?: string;
          progress?: number;
        };
        Update: {
          id?: string;
          child_id?: string;
          badge_id?: string;
          unlocked_at?: string;
          progress?: number;
        };
      };
      learning_stats: {
        Row: {
          id: string;
          child_id: string;
          date: string;
          words_learned: number;
          conversations_completed: number;
          stars_earned: number;
          time_spent_minutes: number;
          current_streak: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          child_id: string;
          date: string;
          words_learned?: number;
          conversations_completed?: number;
          stars_earned?: number;
          time_spent_minutes?: number;
          current_streak?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          child_id?: string;
          date?: string;
          words_learned?: number;
          conversations_completed?: number;
          stars_earned?: number;
          time_spent_minutes?: number;
          current_streak?: number;
          created_at?: string;
        };
      };
      vocabulary_progress: {
        Row: {
          id: string;
          child_id: string;
          word: string;
          attempts: number;
          correct_attempts: number;
          last_attempt_at: string | null;
          next_review_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          child_id: string;
          word: string;
          attempts?: number;
          correct_attempts?: number;
          last_attempt_at?: string | null;
          next_review_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          child_id?: string;
          word?: string;
          attempts?: number;
          correct_attempts?: number;
          last_attempt_at?: string | null;
          next_review_at?: string | null;
          created_at?: string;
        };
      };
      sessions: {
        Row: {
          id: string;
          child_id: string;
          started_at: string;
          ended_at: string | null;
          duration_minutes: number | null;
          device_info: any | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          child_id: string;
          started_at?: string;
          ended_at?: string | null;
          duration_minutes?: number | null;
          device_info?: any | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          child_id?: string;
          started_at?: string;
          ended_at?: string | null;
          duration_minutes?: number | null;
          device_info?: any | null;
          created_at?: string;
        };
      };
    };
  };
};
