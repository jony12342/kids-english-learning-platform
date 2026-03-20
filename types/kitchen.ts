// Kitchen Scene Types
// 厨房场景类型定义

// Ingredient Types
export interface KitchenIngredient {
  ingredientId: string;
  name: string;
  emoji: string;
  color: string;
  category: 'dry' | 'wet' | 'other';
  quantityUnit: 'cup' | 'tablespoon' | 'piece' | 'gram';
  pronunciation: string;
  exampleSentence: string;
}

// Utensil Types
export interface KitchenUtensil {
  utensilId: string;
  name: string;
  emoji: string;
  color: string;
  category: 'mixing' | 'cooking' | 'baking';
  pronunciation: string;
  exampleSentence: string;
}

// Verb Types
export interface KitchenVerb {
  verbId: string;
  name: string;
  emoji: string;
  category: 'preparation' | 'cooking' | 'action';
  pronunciation: string;
  exampleSentence: string;
}

// Recipe Step
export interface RecipeStep {
  stepNumber: number;
  instruction: string;
  ingredients: string[];
  utensils: string[];
  verbs: string[];
}

// Recipe Types
export interface CakeRecipe {
  recipeId: string;
  name: string;
  emoji: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  steps: RecipeStep[];
  requiredIngredients: string[];
  requiredUtensils: string[];
  requiredVerbs: string[];
  prepTime: number; // minutes
}

// Kitchen Scene State
export interface KitchenSceneState {
  selectedRecipe: CakeRecipe | null;
  currentStep: number;
  completedSteps: number[];
  collectedIngredients: string[];
  collectedUtensils: string[];
  learnedVerbs: string[];
  isBaking: boolean;
  isComplete: boolean;
  starsEarned: number;
}

// Ingredient ID Types
export type IngredientId = 'flour' | 'sugar' | 'milk' | 'eggs' | 'butter';

// Utensil ID Types
export type UtensilId = 'bowl' | 'whisk' | 'spoon' | 'pan' | 'oven';

// Verb ID Types
export type VerbId = 'mix' | 'stir' | 'bake' | 'add' | 'pour' | 'crack' | 'melt';

// Recipe ID Types
export type RecipeId = 'vanilla-cake' | 'chocolate-cake';

// Kitchen Ingredients Data
export const KITCHEN_INGREDIENTS: KitchenIngredient[] = [
  {
    ingredientId: 'flour',
    name: 'Flour',
    emoji: '🌾',
    color: '#F5DEB3',
    category: 'dry',
    quantityUnit: 'cup',
    pronunciation: 'flaʊər',
    exampleSentence: 'I need two cups of flour.'
  },
  {
    ingredientId: 'sugar',
    name: 'Sugar',
    emoji: '🍬',
    color: '#F0E68C',
    category: 'dry',
    quantityUnit: 'cup',
    pronunciation: 'ʃʊɡər',
    exampleSentence: 'Add one cup of sugar.'
  },
  {
    ingredientId: 'milk',
    name: 'Milk',
    emoji: '🥛',
    color: '#FFFFFF',
    category: 'wet',
    quantityUnit: 'cup',
    pronunciation: 'mɪlk',
    exampleSentence: 'Pour one cup of milk.'
  },
  {
    ingredientId: 'eggs',
    name: 'Eggs',
    emoji: '🥚',
    color: '#FFD700',
    category: 'wet',
    quantityUnit: 'piece',
    pronunciation: 'ɛɡz',
    exampleSentence: 'Crack two eggs into the bowl.'
  },
  {
    ingredientId: 'butter',
    name: 'Butter',
    emoji: '🧈',
    color: '#FFE4B5',
    category: 'other',
    quantityUnit: 'tablespoon',
    pronunciation: 'bʌtər',
    exampleSentence: 'Melt the butter in the pan.'
  }
];

// Kitchen Utensils Data
export const KITCHEN_UTENSILS: KitchenUtensil[] = [
  {
    utensilId: 'bowl',
    name: 'Mixing Bowl',
    emoji: '🥣',
    color: '#CD853F',
    category: 'mixing',
    pronunciation: 'bɔʊl',
    exampleSentence: 'Put flour in the mixing bowl.'
  },
  {
    utensilId: 'whisk',
    name: 'Whisk',
    emoji: '➳',
    color: '#C0C0C0',
    category: 'mixing',
    pronunciation: 'wɪsk',
    exampleSentence: 'Whisk the eggs and sugar.'
  },
  {
    utensilId: 'spoon',
    name: 'Spoon',
    emoji: '🥄',
    color: '#C0C0C0',
    category: 'mixing',
    pronunciation: 'spuːn',
    exampleSentence: 'Stir with a wooden spoon.'
  },
  {
    utensilId: 'pan',
    name: 'Cake Pan',
    emoji: '🫕',
    color: '#2F4F4F',
    category: 'baking',
    pronunciation: 'pæn',
    exampleSentence: 'Pour batter into the cake pan.'
  },
  {
    utensilId: 'oven',
    name: 'Oven',
    emoji: '♨️',
    color: '#696969',
    category: 'baking',
    pronunciation: 'ʌvən',
    exampleSentence: 'Bake the cake in the oven for 30 minutes.'
  }
];

// Kitchen Verbs Data
export const KITCHEN_VERBS: KitchenVerb[] = [
  {
    verbId: 'mix',
    name: 'Mix',
    emoji: '🔄',
    category: 'preparation',
    pronunciation: 'mɪks',
    exampleSentence: 'Mix the flour and sugar together.'
  },
  {
    verbId: 'stir',
    name: 'Stir',
    emoji: '↻',
    category: 'action',
    pronunciation: 'stɜːr',
    exampleSentence: 'Stir the batter slowly.'
  },
  {
    verbId: 'bake',
    name: 'Bake',
    emoji: '🔥',
    category: 'cooking',
    pronunciation: 'beɪk',
    exampleSentence: 'Bake at 180 degrees for 30 minutes.'
  },
  {
    verbId: 'add',
    name: 'Add',
    emoji: '➕',
    category: 'action',
    pronunciation: 'æd',
    exampleSentence: 'Add the eggs to the mixture.'
  },
  {
    verbId: 'pour',
    name: 'Pour',
    emoji: '🫗',
    category: 'action',
    pronunciation: 'pɔːr',
    exampleSentence: 'Pour the milk into the bowl.'
  },
  {
    verbId: 'crack',
    name: 'Crack',
    emoji: '💥',
    category: 'preparation',
    pronunciation: 'kræk',
    exampleSentence: 'Crack the eggs carefully.'
  },
  {
    verbId: 'melt',
    name: 'Melt',
    emoji: '♨️',
    category: 'preparation',
    pronunciation: 'mɛlt',
    exampleSentence: 'Melt the butter before adding it.'
  }
];

// Cake Recipes Data
export const CAKE_RECIPES: CakeRecipe[] = [
  {
    recipeId: 'vanilla-cake',
    name: 'Vanilla Cake',
    emoji: '🍰',
    difficulty: 'easy',
    description: 'A simple and delicious vanilla cake perfect for beginners!',
    prepTime: 30,
    requiredIngredients: ['flour', 'sugar', 'milk', 'eggs', 'butter'],
    requiredUtensils: ['bowl', 'whisk', 'spoon', 'pan', 'oven'],
    requiredVerbs: ['mix', 'stir', 'bake', 'add', 'pour', 'crack', 'melt'],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Preheat the oven to 180°C (350°F)',
        ingredients: [],
        utensils: ['oven'],
        verbs: ['preheat']
      },
      {
        stepNumber: 2,
        instruction: 'Mix flour and sugar in a bowl',
        ingredients: ['flour', 'sugar'],
        utensils: ['bowl', 'whisk'],
        verbs: ['mix']
      },
      {
        stepNumber: 3,
        instruction: 'Crack eggs into the mixture',
        ingredients: ['eggs'],
        utensils: ['bowl'],
        verbs: ['crack']
      },
      {
        stepNumber: 4,
        instruction: 'Add milk and melted butter',
        ingredients: ['milk', 'butter'],
        utensils: ['bowl', 'spoon'],
        verbs: ['add', 'melt']
      },
      {
        stepNumber: 5,
        instruction: 'Stir until smooth',
        ingredients: [],
        utensils: ['spoon'],
        verbs: ['stir']
      },
      {
        stepNumber: 6,
        instruction: 'Pour batter into the cake pan',
        ingredients: [],
        utensils: ['pan'],
        verbs: ['pour']
      },
      {
        stepNumber: 7,
        instruction: 'Bake for 30 minutes',
        ingredients: [],
        utensils: ['oven'],
        verbs: ['bake']
      }
    ]
  },
  {
    recipeId: 'chocolate-cake',
    name: 'Chocolate Cake',
    emoji: '🎂',
    difficulty: 'medium',
    description: 'Rich chocolate cake for chocolate lovers!',
    prepTime: 35,
    requiredIngredients: ['flour', 'sugar', 'milk', 'eggs', 'butter'],
    requiredUtensils: ['bowl', 'whisk', 'spoon', 'pan', 'oven'],
    requiredVerbs: ['mix', 'stir', 'bake', 'add', 'pour', 'crack', 'melt'],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Preheat the oven to 180°C (350°F)',
        ingredients: [],
        utensils: ['oven'],
        verbs: ['preheat']
      },
      {
        stepNumber: 2,
        instruction: 'Mix flour, sugar, and cocoa powder',
        ingredients: ['flour', 'sugar'],
        utensils: ['bowl', 'whisk'],
        verbs: ['mix']
      },
      {
        stepNumber: 3,
        instruction: 'Crack eggs into the mixture',
        ingredients: ['eggs'],
        utensils: ['bowl'],
        verbs: ['crack']
      },
      {
        stepNumber: 4,
        instruction: 'Add milk, butter, and vanilla extract',
        ingredients: ['milk', 'butter'],
        utensils: ['bowl', 'spoon'],
        verbs: ['add', 'melt']
      },
      {
        stepNumber: 5,
        instruction: 'Stir until smooth and creamy',
        ingredients: [],
        utensils: ['spoon'],
        verbs: ['stir']
      },
      {
        stepNumber: 6,
        instruction: 'Pour batter into the cake pan',
        ingredients: [],
        utensils: ['pan'],
        verbs: ['pour']
      },
      {
        stepNumber: 7,
        instruction: 'Bake for 35 minutes',
        ingredients: [],
        utensils: ['oven'],
        verbs: ['bake']
      }
    ]
  }
];
