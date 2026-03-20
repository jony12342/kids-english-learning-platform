# Database Migration Guide - Phase 2 Character System

## Migration: 006_add_character_system.sql

This migration creates the database tables needed for the Virtual Character System.

## Tables Created

### 1. characters
Stores user-created character configurations

**Columns:**
- `id` - UUID primary key
- `child_id` - References children table
- `name` - Character name
- `avatar_type` - 'owl', 'bear', 'cat', or 'rabbit'
- `color_config` - JSONB with primary, secondary, and accent colors
- `accessory_ids` - Array of equipped accessory IDs
- `is_active` - Whether this is the currently active character
- `created_at`, `updated_at` - Timestamps

### 2. character_accessories
Available accessories for character customization

**Columns:**
- `id` - UUID primary key
- `accessory_id` - Unique identifier
- `name` - Display name
- `emoji` - Emoji icon
- `category` - 'head', 'face', or 'hand'
- `rarity` - 'common', 'rare', or 'epic'
- `unlock_condition` - JSONB with unlock requirements

**Accessories inserted:**

**Head Accessories:**
- Party Hat (🎉) - Common - Free
- Crown (👑) - Epic - Requires 50 stars
- Cap (🧢) - Common - Free

**Face Accessories:**
- Glasses (👓) - Rare - Requires 20 words learned
- Sunglasses (🕶️) - Rare - Requires 30 words learned

**Hand Accessories:**
- Magic Wand (🪄) - Rare - Requires 10 conversations
- Bow Tie (🎀) - Common - Free
- Star (⭐) - Common - Free

### 3. avatar_configurations
Available avatar types with color options

**Columns:**
- `id` - UUID primary key
- `avatar_type` - Unique identifier
- `name` - Display name
- `emoji` - Emoji icon
- `base_color` - Default base color
- `available_colors` - JSONB array of color options
- `description` - Avatar description
- `is_available` - Availability status

**Avatars inserted:**
- Owl (🦉) - Wise owl teacher
- Bear (🐻) - Friendly bear companion
- Cat (🐱) - Curious explorer
- Rabbit (🐰) - Playful friend

## How to Execute

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"

### Step 2: Copy and Execute the Migration
1. Open the file: `supabase/migrations/006_add_character_system.sql`
2. Copy the entire contents
3. Paste into the SQL Editor
4. Click "Run" or press Cmd+Enter (Mac) / Ctrl+Enter (Windows)

### Step 3: Verify Success
You should see output like:
```
Accessories: | 8
Avatars:     | 4
```

And tables showing all accessories and avatar configurations.

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

## Character Creation Flow

### Step 1: Choose Avatar
- Select from 4 avatar types: Owl, Bear, Cat, Rabbit
- Each avatar has a unique personality description
- Avatar choice affects base character appearance

### Step 2: Customize Colors
- **Primary Color**: Main color scheme
- **Secondary Color**: Secondary color scheme
- **Accent Color**: Highlight and accent color

**Available Colors:**
- Coral Red (#FF6B6B)
- Turquoise (#4ECDC4)
- Sunny Yellow (#FFE66D)
- Mint Green (#95E1D3)
- Coral Pink (#F38181)
- Lavender (#AA96DA)
- Baby Pink (#FCBAD3)
- Cream (#FFFFD2)

### Step 3: Add Accessories
Accessories are organized by category:
- **Head**: Hats, crowns, caps
- **Face**: Glasses, sunglasses
- **Hand**: Wands, bows, stars

**Rarity System:**
- **Common** (Gray): Free to use
- **Rare** (Blue): Unlock by learning words or completing conversations
- **Epic** (Purple): Unlock by earning many stars

### Step 4: Preview & Save
- Enter character name
- Review all customization choices
- See live preview of character
- Save character to profile

## Unlock Conditions

Accessories unlock based on user progress:

**Free Accessories:**
- Party Hat, Cap, Bow Tie, Star
- Available immediately

**Word-based Unlocks:**
- Glasses: Learn 20 words
- Sunglasses: Learn 30 words

**Conversation-based Unlocks:**
- Magic Wand: Complete 10 conversations

**Star-based Unlocks:**
- Crown: Earn 50 stars

## Feature Highlights

### 1. Avatar Selection
- 4 unique avatar types
- Distinct personalities and descriptions
- Large emoji display for easy selection

### 2. Color Customization
- 8 vibrant color options
- 3 color slots (primary, secondary, accent)
- Visual color swatches
- Real-time preview

### 3. Accessory System
- 8 accessories across 3 categories
- Rarity system (common, rare, epic)
- Unlock-based progression
- Visual lock indicators for locked items

### 4. Live Preview
- Real-time character preview
- Shows avatar, colors, and accessories
- Animated character display
- Color swatch display
- Equipped accessories list

### 5. Progress Tracking
- Step-by-step creation wizard
- Visual progress indicator
- Checkmarks for completed steps
- Easy navigation between steps

## Educational Value

### Creativity & Expression
- Encourages creative self-expression
- Develops aesthetic awareness
- Personal avatar creation

### Decision Making
- Practice making choices
- Learn color combinations
- Understand matching and coordination

### Goal Setting
- Unlock system teaches goal-setting
- Progress tracking shows achievements
- Incentivizes learning and practice

## Next Steps

After successful migration:
1. Start the development server: `npm run dev`
2. Visit http://localhost:3001/character
3. Test character creation flow
4. Try all 4 avatar types
5. Test color combinations
6. Attempt to equip locked accessories (should show lock overlay)
7. Complete and save a character
8. Verify character appears in profile

## Rollback (if needed)

If you need to rollback this migration:

```sql
DROP TRIGGER IF EXISTS update_characters_updated_at ON characters;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS character_accessories;
DROP TABLE IF EXISTS avatar_configurations;
```

## Technical Notes

### Color Storage
Colors are stored as hex codes in JSONB format:
```json
{
  "primary": "#FF6B6B",
  "secondary": "#4ECDC4",
  "accent": "#FFE66D"
}
```

### Accessory Tracking
Accessories stored as text array:
```sql
accessory_ids TEXT[] DEFAULT '{}'
```
Example: `'{hat, glasses, star}'`

### Active Character
Only one character per child can be active at a time:
```sql
is_active BOOLEAN DEFAULT false
```
Application logic should ensure only one character has `is_active = true` per child.

### Avatar Configuration
Avatars have available colors pre-configured:
```json
{
  "availableColors": [
    "#FF6B6B", "#4ECDC4", "#FFE66D",
    "#95E1D3", "#F38181", "#AA96DA",
    "#FCBAD3", "#FFFFD2"
  ]
}
```

## Future Enhancements

Potential additions to the character system:
- More avatar types (dog, fox, lion, etc.)
- More accessories (clothing, pets, backgrounds)
- Animated avatar poses
- Avatar leveling system
- Character sharing between users
- Avatar export as image
- Custom accessory creation
