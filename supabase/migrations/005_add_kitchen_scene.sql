-- ============================================
-- Phase 2: Kitchen Scene - Cake Baking
-- 厨房场景 - 做蛋糕
-- ============================================

-- Kitchen ingredients table
CREATE TABLE IF NOT EXISTS kitchen_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ingredient_id VARCHAR(50) UNIQUE NOT NULL, -- 'flour', 'sugar', 'milk', 'eggs', 'butter'
  name VARCHAR(100) NOT NULL,
  emoji VARCHAR(10) NOT NULL,
  color VARCHAR(20) NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'dry', 'wet', 'other'
  quantity_unit VARCHAR(20) NOT NULL, -- 'cup', 'tablespoon', 'piece', 'gram'
  pronunciation VARCHAR(100),
  example_sentence TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Kitchen utensils table
CREATE TABLE IF NOT EXISTS kitchen_utensils (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  utensil_id VARCHAR(50) UNIQUE NOT NULL, -- 'bowl', 'whisk', 'spoon', 'pan', 'oven'
  name VARCHAR(100) NOT NULL,
  emoji VARCHAR(10) NOT NULL,
  color VARCHAR(20) NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'mixing', 'cooking', 'baking'
  pronunciation VARCHAR(100),
  example_sentence TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Kitchen verbs table
CREATE TABLE IF NOT EXISTS kitchen_verbs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  verb_id VARCHAR(50) UNIQUE NOT NULL, -- 'mix', 'stir', 'bake', 'add', 'pour'
  name VARCHAR(100) NOT NULL,
  emoji VARCHAR(10) NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'preparation', 'cooking', 'action'
  pronunciation VARCHAR(100),
  example_sentence TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cake recipes table
CREATE TABLE IF NOT EXISTS cake_recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id VARCHAR(50) UNIQUE NOT NULL, -- 'vanilla-cake', 'chocolate-cake'
  name VARCHAR(100) NOT NULL,
  emoji VARCHAR(10) NOT NULL,
  difficulty VARCHAR(20) NOT NULL, -- 'easy', 'medium', 'hard'
  description TEXT,
  steps JSONB NOT NULL, -- Array of step objects
  required_ingredients TEXT[] NOT NULL,
  required_utensils TEXT[] NOT NULL,
  required_verbs TEXT[] NOT NULL,
  prep_time INTEGER, -- minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert ingredients
INSERT INTO kitchen_ingredients (ingredient_id, name, emoji, color, category, quantity_unit, pronunciation, example_sentence) VALUES
  ('flour', 'Flour', '🌾', '#F5DEB3', 'dry', 'cup', 'flaʊər', 'I need two cups of flour.'),
  ('sugar', 'Sugar', '🍬', '#F0E68C', 'dry', 'cup', 'ʃʊɡər', 'Add one cup of sugar.'),
  ('milk', 'Milk', '🥛', '#FFFFFF', 'wet', 'cup', 'mɪlk', 'Pour one cup of milk.'),
  ('eggs', 'Eggs', '🥚', '#FFD700', 'wet', 'piece', 'ɛɡz', 'Crack two eggs into the bowl.'),
  ('butter', 'Butter', '🧈', '#FFE4B5', 'other', 'tablespoon', 'bʌtər', 'Melt the butter in the pan.')
ON CONFLICT (ingredient_id) DO NOTHING;

-- Insert utensils
INSERT INTO kitchen_utensils (utensil_id, name, emoji, color, category, pronunciation, example_sentence) VALUES
  ('bowl', 'Mixing Bowl', '🥣', '#CD853F', 'mixing', 'bɔʊl', 'Put flour in the mixing bowl.'),
  ('whisk', 'Whisk', '➳', '#C0C0C0', 'mixing', 'wɪsk', 'Whisk the eggs and sugar.'),
  ('spoon', 'Spoon', '🥄', '#C0C0C0', 'mixing', 'spuːn', 'Stir with a wooden spoon.'),
  ('pan', 'Cake Pan', '🫕', '#2F4F4F', 'baking', 'pæn', 'Pour batter into the cake pan.'),
  ('oven', 'Oven', '♨️', '#696969', 'baking', 'ʌvən', 'Bake the cake in the oven for 30 minutes.')
ON CONFLICT (utensil_id) DO NOTHING;

-- Insert verbs
INSERT INTO kitchen_verbs (verb_id, name, emoji, category, pronunciation, example_sentence) VALUES
  ('mix', 'Mix', '🔄', 'preparation', 'mɪks', 'Mix the flour and sugar together.'),
  ('stir', 'Stir', '↻', 'action', 'stɜːr', 'Stir the batter slowly.'),
  ('bake', 'Bake', '🔥', 'cooking', 'beɪk', 'Bake at 180 degrees for 30 minutes.'),
  ('add', 'Add', '➕', 'action', 'æd', 'Add the eggs to the mixture.'),
  ('pour', 'Pour', '🫗', 'action', 'pɔːr', 'Pour the milk into the bowl.'),
  ('crack', 'Crack', '💥', 'preparation', 'kræk', 'Crack the eggs carefully.'),
  ('melt', 'Melt', '♨️', 'preparation', 'mɛlt', 'Melt the butter before adding it.')
ON CONFLICT (verb_id) DO NOTHING;

-- Insert vanilla cake recipe
INSERT INTO cake_recipes (recipe_id, name, emoji, difficulty, description, steps, required_ingredients, required_utensils, required_verbs, prep_time) VALUES
  ('vanilla-cake', 'Vanilla Cake', '🍰', 'easy', 'A simple and delicious vanilla cake perfect for beginners!',
  '[
    {
      "step_number": 1,
      "instruction": "Preheat the oven to 180°C (350°F)",
      "ingredients": [],
      "utensils": ["oven"],
      "verbs": ["preheat"]
    },
    {
      "step_number": 2,
      "instruction": "Mix flour and sugar in a bowl",
      "ingredients": ["flour", "sugar"],
      "utensils": ["bowl", "whisk"],
      "verbs": ["mix"]
    },
    {
      "step_number": 3,
      "instruction": "Crack eggs into the mixture",
      "ingredients": ["eggs"],
      "utensils": ["bowl"],
      "verbs": ["crack"]
    },
    {
      "step_number": 4,
      "instruction": "Add milk and melted butter",
      "ingredients": ["milk", "butter"],
      "utensils": ["bowl", "spoon"],
      "verbs": ["add", "melt"]
    },
    {
      "step_number": 5,
      "instruction": "Stir until smooth",
      "ingredients": [],
      "utensils": ["spoon"],
      "verbs": ["stir"]
    },
    {
      "step_number": 6,
      "instruction": "Pour batter into the cake pan",
      "ingredients": [],
      "utensils": ["pan"],
      "verbs": ["pour"]
    },
    {
      "step_number": 7,
      "instruction": "Bake for 30 minutes",
      "ingredients": [],
      "utensils": ["oven"],
      "verbs": ["bake"]
    }
  ]'::jsonb,
  ARRAY['flour', 'sugar', 'milk', 'eggs', 'butter'],
  ARRAY['bowl', 'whisk', 'spoon', 'pan', 'oven'],
  ARRAY['mix', 'stir', 'bake', 'add', 'pour', 'crack', 'melt'],
  30)
ON CONFLICT (recipe_id) DO NOTHING;

-- Insert chocolate cake recipe
INSERT INTO cake_recipes (recipe_id, name, emoji, difficulty, description, steps, required_ingredients, required_utensils, required_verbs, prep_time) VALUES
  ('chocolate-cake', 'Chocolate Cake', '🎂', 'medium', 'Rich chocolate cake for chocolate lovers!',
  '[
    {
      "step_number": 1,
      "instruction": "Preheat the oven to 180°C (350°F)",
      "ingredients": [],
      "utensils": ["oven"],
      "verbs": ["preheat"]
    },
    {
      "step_number": 2,
      "instruction": "Mix flour, sugar, and cocoa powder",
      "ingredients": ["flour", "sugar"],
      "utensils": ["bowl", "whisk"],
      "verbs": ["mix"]
    },
    {
      "step_number": 3,
      "instruction": "Crack eggs into the mixture",
      "ingredients": ["eggs"],
      "utensils": ["bowl"],
      "verbs": ["crack"]
    },
    {
      "step_number": 4,
      "instruction": "Add milk, butter, and vanilla extract",
      "ingredients": ["milk", "butter"],
      "utensils": ["bowl", "spoon"],
      "verbs": ["add", "melt"]
    },
    {
      "step_number": 5,
      "instruction": "Stir until smooth and creamy",
      "ingredients": [],
      "utensils": ["spoon"],
      "verbs": ["stir"]
    },
    {
      "step_number": 6,
      "instruction": "Pour batter into the cake pan",
      "ingredients": [],
      "utensils": ["pan"],
      "verbs": ["pour"]
    },
    {
      "step_number": 7,
      "instruction": "Bake for 35 minutes",
      "ingredients": [],
      "utensils": ["oven"],
      "verbs": ["bake"]
    }
  ]'::jsonb,
  ARRAY['flour', 'sugar', 'milk', 'eggs', 'butter'],
  ARRAY['bowl', 'whisk', 'spoon', 'pan', 'oven'],
  ARRAY['mix', 'stir', 'bake', 'add', 'pour', 'crack', 'melt'],
  35)
ON CONFLICT (recipe_id) DO NOTHING;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_kitchen_ingredients_category ON kitchen_ingredients(category);
CREATE INDEX IF NOT EXISTS idx_kitchen_utensils_category ON kitchen_utensils(category);
CREATE INDEX IF NOT EXISTS idx_kitchen_verbs_category ON kitchen_verbs(category);
CREATE INDEX IF NOT EXISTS idx_cake_recipes_difficulty ON cake_recipes(difficulty);

-- RLS Policies
ALTER TABLE kitchen_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE kitchen_utensils ENABLE ROW LEVEL SECURITY;
ALTER TABLE kitchen_verbs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cake_recipes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_full_access" ON kitchen_ingredients;
CREATE POLICY "anon_full_access" ON kitchen_ingredients
  FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON kitchen_utensils;
CREATE POLICY "anon_full_access" ON kitchen_utensils
  FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON kitchen_verbs;
CREATE POLICY "anon_full_access" ON kitchen_verbs
  FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_access" ON cake_recipes;
CREATE POLICY "anon_full_access" ON cake_recipes
  FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON kitchen_ingredients;
CREATE POLICY "service_role_all_access" ON kitchen_ingredients
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON kitchen_utensils;
CREATE POLICY "service_role_all_access" ON kitchen_utensils
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON kitchen_verbs;
CREATE POLICY "service_role_all_access" ON kitchen_verbs
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_access" ON cake_recipes;
CREATE POLICY "service_role_all_access" ON cake_recipes
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================
-- Verification
-- ============================================
SELECT 'Ingredients:' as info, COUNT(*) as count FROM kitchen_ingredients;
SELECT 'Utensils:' as info, COUNT(*) as count FROM kitchen_utensils;
SELECT 'Verbs:' as info, COUNT(*) as count FROM kitchen_verbs;
SELECT 'Recipes:' as info, COUNT(*) as count FROM cake_recipes;

SELECT * FROM kitchen_ingredients ORDER BY category, name;
SELECT * FROM cake_recipes ORDER BY difficulty, name;
