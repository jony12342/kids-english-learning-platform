# Database Migration Guide - Phase 2 Kitchen Scene

## Migration: 005_add_kitchen_scene.sql

This migration creates the database tables needed for the Kitchen Cake Baking scene.

## Tables Created

### 1. kitchen_ingredients
Stores ingredient data for cooking

**Columns:**
- `id` - UUID primary key
- `ingredient_id` - Unique identifier ('flour', 'sugar', 'milk', 'eggs', 'butter')
- `name` - Display name
- `emoji` - Emoji icon
- `color` - Display color
- `category` - 'dry', 'wet', or 'other'
- `quantity_unit` - 'cup', 'tablespoon', 'piece', 'gram'
- `pronunciation` - IPA pronunciation
- `example_sentence` - Example usage

**Ingredients inserted:**
- Flour (🌾) - Dry ingredient
- Sugar (🍬) - Dry ingredient
- Milk (🥛) - Wet ingredient
- Eggs (🥚) - Wet ingredient
- Butter (🧈) - Other ingredient

### 2. kitchen_utensils
Stores kitchen tools and equipment

**Columns:**
- `id` - UUID primary key
- `utensil_id` - Unique identifier ('bowl', 'whisk', 'spoon', 'pan', 'oven')
- `name` - Display name
- `emoji` - Emoji icon
- `color` - Display color
- `category` - 'mixing', 'cooking', or 'baking'
- `pronunciation` - IPA pronunciation
- `example_sentence` - Example usage

**Utensils inserted:**
- Mixing Bowl (🥣) - Mixing tool
- Whisk (➳) - Mixing tool
- Spoon (🥄) - Mixing tool
- Cake Pan (🫕) - Baking tool
- Oven (♨️) - Baking tool

### 3. kitchen_verbs
Stores cooking action verbs

**Columns:**
- `id` - UUID primary key
- `verb_id` - Unique identifier ('mix', 'stir', 'bake', 'add', 'pour', 'crack', 'melt')
- `name` - Verb name
- `emoji` - Emoji icon
- `category` - 'preparation', 'cooking', or 'action'
- `pronunciation` - IPA pronunciation
- `example_sentence` - Example usage

**Verbs inserted:**
- Mix (🔄) - Preparation
- Stir (↻) - Action
- Bake (🔥) - Cooking
- Add (➕) - Action
- Pour (🫗) - Action
- Crack (💥) - Preparation
- Melt (♨️) - Preparation

### 4. cake_recipes
Stores complete cake recipes with step-by-step instructions

**Columns:**
- `id` - UUID primary key
- `recipe_id` - Unique identifier ('vanilla-cake', 'chocolate-cake')
- `name` - Recipe name
- `emoji` - Emoji icon
- `difficulty` - 'easy', 'medium', or 'hard'
- `description` - Recipe description
- `steps` - JSONB array of step objects
- `required_ingredients` - Array of ingredient IDs
- `required_utensils` - Array of utensil IDs
- `required_verbs` - Array of verb IDs
- `prep_time` - Preparation time in minutes

**Recipes inserted:**
- Vanilla Cake (🍰) - Easy, 30 minutes
- Chocolate Cake (🎂) - Medium, 35 minutes

## How to Execute

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"

### Step 2: Copy and Execute the Migration
1. Open the file: `supabase/migrations/005_add_kitchen_scene.sql`
2. Copy the entire contents
3. Paste into the SQL Editor
4. Click "Run" or press Cmd+Enter (Mac) / Ctrl+Enter (Windows)

### Step 3: Verify Success
You should see output like:
```
Ingredients: | 5
Utensils:    | 5
Verbs:       | 7
Recipes:     | 2
```

And tables showing all ingredients, utensils, verbs, and recipes.

## Troubleshooting

**Error: "function uuid_generate_v4() does not exist"**
- Solution: Enable the UUID extension by running:
  ```sql
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  ```

**Error: "relation does not exist"**
- Solution: Make sure you've run all previous migrations (001-004) first

**Error: "permission denied"**
- Solution: Check that you have the correct permissions in Supabase

## Learning Content

### Ingredients (食材)
- **Flour** - 面粉
- **Sugar** - 糖
- **Milk** - 牛奶
- **Eggs** - 鸡蛋
- **Butter** - 黄油

### Utensils (厨具)
- **Mixing Bowl** - 搅拌碗
- **Whisk** - 打蛋器
- **Spoon** - 勺子
- **Cake Pan** - 蛋糕模具
- **Oven** - 烤箱

### Verbs (动词)
- **Mix** - 搅拌
- **Stir** - 搅动
- **Bake** - 烘焙
- **Add** - 添加
- **Pour** - 倒
- **Crack** - 打开
- **Melt** - 融化

## Next Steps

After successful migration:
1. Start the development server: `npm run dev`
2. Visit http://localhost:3001/kitchen
3. Test the Kitchen Cake Baking scene
4. Try both recipes (Vanilla Cake & Chocolate Cake)
5. Verify ingredient collection works
6. Check step-by-step baking process
7. Test completion rewards

## Rollback (if needed)

If you need to rollback this migration:

```sql
DROP TABLE IF EXISTS cake_recipes;
DROP TABLE IF EXISTS kitchen_verbs;
DROP TABLE IF EXISTS kitchen_utensils;
DROP TABLE IF EXISTS kitchen_ingredients;
```

## Feature Highlights

### 1. Recipe Selection
- Choose between Vanilla Cake (easy) and Chocolate Cake (medium)
- See difficulty level and preparation time
- Get recipe description before starting

### 2. Preparation Phase
- **Collect Ingredients**: Click to learn ingredient names and pronunciation
- **Collect Utensils**: Learn kitchen tool names in English
- **Learn Verbs**: Master cooking action verbs
- Progress tracking shows what's been collected

### 3. Baking Phase
- **Step-by-step instructions**: Follow 7 steps to complete the cake
- **Visual progress**: See which step you're on
- **Ingredient reminders**: Shows what items are needed for each step
- **Audio support**: Hear instructions spoken aloud

### 4. Completion Rewards
- Award stars for learning new ingredients
- Award stars for learning new utensils
- Award stars for learning new verbs
- Bonus stars for completing recipes (5 for easy, 10 for medium)
- Celebration screen with total stars earned

### 5. Educational Value
- **Vocabulary Building**: Learn 5 ingredients + 5 utensils + 7 verbs
- **Listening Skills**: Hear pronunciations and example sentences
- **Following Instructions**: Practice reading and following steps
- **Practical English**: Real-world cooking vocabulary
