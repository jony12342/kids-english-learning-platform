// Character System Types
// 角色系统类型定义

// Character Types
export type AvatarType = 'owl' | 'bear' | 'cat' | 'rabbit';

export interface Character {
  id: string;
  childId: string;
  name: string;
  avatarType: AvatarType;
  colorConfig: {
    primary: string;
    secondary: string;
    accent: string;
  };
  accessoryIds: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Accessory Types
export interface CharacterAccessory {
  accessoryId: string;
  name: string;
  emoji: string;
  category: 'head' | 'face' | 'hand';
  rarity: 'common' | 'rare' | 'epic';
  unlockCondition: {
    type: 'free' | 'stars' | 'words' | 'conversations';
    amount?: number;
  };
}

// Avatar Configuration
export interface AvatarConfiguration {
  avatarType: AvatarType;
  name: string;
  emoji: string;
  baseColor: string;
  availableColors: string[];
  description: string;
  isAvailable: boolean;
}

// Character State
export interface CharacterState {
  selectedCharacter: Character | null;
  userCharacters: Character[];
  availableAccessories: CharacterAccessory[];
  unlockedAccessories: string[];
  currentAvatarType: AvatarType;
  currentColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  currentAccessories: string[];
  isEditing: boolean;
}

// Color Palettes
export const COLOR_PALETTE = [
  { name: 'Coral Red', value: '#FF6B6B', emoji: '🔴' },
  { name: 'Turquoise', value: '#4ECDC4', emoji: '🩵' },
  { name: 'Sunny Yellow', value: '#FFE66D', emoji: '🟡' },
  { name: 'Mint Green', value: '#95E1D3', emoji: '🟢' },
  { name: 'Coral Pink', value: '#F38181', emoji: '🌸' },
  { name: 'Lavender', value: '#AA96DA', emoji: '💜' },
  { name: 'Baby Pink', value: '#FCBAD3', emoji: '🩷' },
  { name: 'Cream', value: '#FFFFD2', emoji: '🟨' }
];

// Avatar Configurations Data
export const AVATAR_CONFIGURATIONS: AvatarConfiguration[] = [
  {
    avatarType: 'owl',
    name: 'Owl',
    emoji: '🦉',
    baseColor: '#8B4513',
    availableColors: [
      '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3',
      '#F38181', '#AA96DA', '#FCBAD3', '#FFFFD2'
    ],
    description: 'Wise owl teacher, perfect for learning!',
    isAvailable: true
  },
  {
    avatarType: 'bear',
    name: 'Bear',
    emoji: '🐻',
    baseColor: '#8B4513',
    availableColors: [
      '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3',
      '#F38181', '#AA96DA', '#FCBAD3', '#FFFFD2'
    ],
    description: 'Friendly bear, great companion for adventures!',
    isAvailable: true
  },
  {
    avatarType: 'cat',
    name: 'Cat',
    emoji: '🐱',
    baseColor: '#FFA500',
    availableColors: [
      '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3',
      '#F38181', '#AA96DA', '#FCBAD3', '#FFFFD2'
    ],
    description: 'Curious cat, loves exploring new things!',
    isAvailable: true
  },
  {
    avatarType: 'rabbit',
    name: 'Rabbit',
    emoji: '🐰',
    baseColor: '#F5F5DC',
    availableColors: [
      '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3',
      '#F38181', '#AA96DA', '#FCBAD3', '#FFFFD2'
    ],
    description: 'Playful rabbit, always ready for fun!',
    isAvailable: true
  }
];

// Accessories Data
export const CHARACTER_ACCESSORIES: CharacterAccessory[] = [
  // Head accessories
  {
    accessoryId: 'hat',
    name: 'Party Hat',
    emoji: '🎉',
    category: 'head',
    rarity: 'common',
    unlockCondition: { type: 'free' }
  },
  {
    accessoryId: 'crown',
    name: 'Crown',
    emoji: '👑',
    category: 'head',
    rarity: 'epic',
    unlockCondition: { type: 'stars', amount: 50 }
  },
  {
    accessoryId: 'cap',
    name: 'Cap',
    emoji: '🧢',
    category: 'head',
    rarity: 'common',
    unlockCondition: { type: 'free' }
  },

  // Face accessories
  {
    accessoryId: 'glasses',
    name: 'Glasses',
    emoji: '👓',
    category: 'face',
    rarity: 'rare',
    unlockCondition: { type: 'words', amount: 20 }
  },
  {
    accessoryId: 'sunglasses',
    name: 'Sunglasses',
    emoji: '🕶️',
    category: 'face',
    rarity: 'rare',
    unlockCondition: { type: 'words', amount: 30 }
  },

  // Hand accessories
  {
    accessoryId: 'wand',
    name: 'Magic Wand',
    emoji: '🪄',
    category: 'hand',
    rarity: 'rare',
    unlockCondition: { type: 'conversations', amount: 10 }
  },
  {
    accessoryId: 'bow',
    name: 'Bow Tie',
    emoji: '🎀',
    category: 'hand',
    rarity: 'common',
    unlockCondition: { type: 'free' }
  },
  {
    accessoryId: 'star',
    name: 'Star',
    emoji: '⭐',
    category: 'hand',
    rarity: 'common',
    unlockCondition: { type: 'free' }
  }
];

// Default character configuration
export const DEFAULT_CHARACTER: Omit<Character, 'id' | 'childId' | 'createdAt' | 'updatedAt'> = {
  name: 'My Character',
  avatarType: 'owl',
  colorConfig: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#FFE66D'
  },
  accessoryIds: [],
  isActive: false
};

// Helper function to check if accessory is unlocked
export function isAccessoryUnlocked(
  accessory: CharacterAccessory,
  userStats: {
    totalStars: number;
    wordsLearned: number;
    conversationsCompleted: number;
  }
): boolean {
  const { type, amount = 0 } = accessory.unlockCondition;

  switch (type) {
    case 'free':
      return true;
    case 'stars':
      return userStats.totalStars >= amount;
    case 'words':
      return userStats.wordsLearned >= amount;
    case 'conversations':
      return userStats.conversationsCompleted >= amount;
    default:
      return false;
  }
}

// Helper function to get rarity color
export function getRarityColor(rarity: 'common' | 'rare' | 'epic'): string {
  switch (rarity) {
    case 'common':
      return '#9CA3AF'; // Gray
    case 'rare':
      return '#3B82F6'; // Blue
    case 'epic':
      return '#A855F7'; // Purple
    default:
      return '#9CA3AF';
  }
}

// Helper function to get rarity label
export function getRarityLabel(rarity: 'common' | 'rare' | 'epic'): string {
  switch (rarity) {
    case 'common':
      return 'Common';
    case 'rare':
      return 'Rare';
    case 'epic':
      return 'Epic';
    default:
      return 'Common';
  }
}
