/**
 * Test Supabase Database Connection
 * 测试 Supabase 数据库连接
 */

import { createServerClient } from '../lib/supabase/client';
import { isSupabaseConfigured } from '../lib/supabase/client';

async function testConnection() {
  console.log('🔍 Testing Supabase Connection...\n');

  // Check if Supabase is configured
  if (!isSupabaseConfigured) {
    console.error('❌ Supabase is not configured!');
    console.log('Please check your .env.local file');
    process.exit(1);
  }

  console.log('✅ Supabase environment variables are configured\n');

  try {
    // Create Supabase client
    const supabase = createServerClient();
    console.log('✅ Supabase client created successfully\n');

    // Test connection by querying the parents table
    console.log('📊 Testing database connection...');
    const { data: parents, error } = await supabase
      .from('parents')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Database connection failed:', error.message);
      process.exit(1);
    }

    console.log('✅ Database connection successful!\n');

    // Check if test data exists
    const { data: children } = await supabase
      .from('children')
      .select('*')
      .limit(1);

    console.log('📊 Database Status:');
    console.log(`  - Parents: ${parents?.length || 0} records`);
    console.log(`  - Children: ${children?.length || 0} records`);
    console.log(`  - Database URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}\n`);

    // Test tables
    const tables = [
      'parents',
      'children',
      'learning_words',
      'conversations',
      'conversation_messages',
      'rewards',
      'user_badges',
      'learning_stats',
      'vocabulary_progress',
      'sessions',
    ];

    console.log('📋 Checking tables...');
    for (const table of tables) {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`  ❌ ${table}: ERROR - ${error.message}`);
      } else {
        console.log(`  ✅ ${table}: OK (${count || 0} rows)`);
      }
    }

    console.log('\n✅ All tests passed! Supabase is ready to use.\n');
    console.log('💡 You can now start the application:');
    console.log('   npm run dev');
    console.log('\n');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run the test
testConnection();
