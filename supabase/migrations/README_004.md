# Database Migration Guide - Phase 2 Forest Scene

## Migration: 004_add_scene_progress.sql

This migration creates the database tables needed for the Forest Adventure scene.

## Tables Created

### 1. scene_progress
Tracks user progress in different learning scenes (forest, kitchen, etc.)

**Columns:**
- `id` - UUID primary key
- `child_id` - References children table
- `scene_type` - 'forest', 'kitchen', etc.
- `unlocked_areas` - Array of unlocked areas
- `completed_tasks` - Array of completed task IDs
- `total_score` - Overall score
- `conversations_completed` - Number of conversations finished
- `stars_earned` - Total stars collected
- `created_at`, `updated_at` - Timestamps

### 2. forest_animals
Configuration data for forest animals

**Animals inserted:**
- Bear (🐻) - Unlocked by default
- Rabbit (🐰) - Requires 2 completed conversations
- Bird (🐦) - Requires 4 completed conversations
- Deer (🦌) - Requires 6 completed conversations

## How to Execute

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"

### Step 2: Copy and Execute the Migration
1. Open the file: `supabase/migrations/004_add_scene_progress.sql`
2. Copy the entire contents
3. Paste into the SQL Editor
4. Click "Run" or press Cmd+Enter (Mac) / Ctrl+Enter (Windows)

### Step 3: Verify Success
You should see output like:
```
Forest Animals: | 4
```

And a table showing all 4 animals with their configurations.

## Troubleshooting

**Error: "function uuid_generate_v4() does not exist"**
- Solution: Enable the UUID extension by running:
  ```sql
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  ```

**Error: "function update_updated_at_column() does not exist"**
- Solution: This function should exist from previous migrations. If not, create it:
  ```sql
  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ language 'plpgsql';
  ```

**Error: "table children does not exist"**
- Solution: Make sure you've run all previous migrations (001-003) first

## Next Steps

After successful migration:
1. Start the development server: `npm run dev`
2. Visit http://localhost:3001/forest
3. Test the Forest Adventure scene
4. Verify animal conversations work
5. Check that unlock mechanism functions properly

## Rollback (if needed)

If you need to rollback this migration:

```sql
DROP TRIGGER IF EXISTS update_scene_progress_updated_at ON scene_progress;
DROP TABLE IF EXISTS scene_progress;
DROP TABLE IF EXISTS forest_animals;
```
