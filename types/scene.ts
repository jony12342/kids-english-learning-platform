// Scene Progress Types
// 场景进度类型定义

export type SceneType = 'forest' | 'kitchen' | 'garden';

export interface SceneProgress {
  id: string;
  childId: string;
  sceneType: SceneType;
  unlockedAreas: string[];
  completedTasks: string[];
  totalScore: number;
  conversationsCompleted: number;
  starsEarned: number;
  createdAt: Date;
  updatedAt: Date;
}

// Forest Scene Types
// 森林场景类型

export interface ForestAnimal {
  animalId: string;
  name: string;
  emoji: string;
  color: string;
  position: {
    x: number;
    y: number;
  };
  unlockRequirements: {
    minScore?: number;
    completedConversations?: number;
    requiredAnimals?: string[];
  };
  dialogueTopics: string[];
  isActive: boolean;
}

export type AnimalId = 'bear' | 'rabbit' | 'bird' | 'deer';

export interface DialogueOption {
  id: string;
  topic: string;
  questions: string[];
  expectedAnswers?: string[];
  rewards: {
    stars: number;
    unlockNext?: boolean;
  };
}

export interface ForestDialogue {
  animalId: AnimalId;
  topic: string;
  messages: Array<{
    role: 'assistant' | 'user';
    text: string;
    animation?: string;
  }>;
  completed: boolean;
  starsEarned: number;
}

// Forest Scene State
// 森林场景状态

export interface ForestSceneState {
  currentAnimal: ForestAnimal | null;
  activeDialogue: ForestDialogue | null;
  unlockedAnimals: AnimalId[];
  completedDialogues: string[]; // 'bear-greeting', 'rabbit-food', etc.
  totalStars: number;
  currentStreak: number;
}

// Animal Dialogues
// 动物对话配置

export const ANIMAL_DIALOGUES: Record<AnimalId, Record<string, DialogueOption>> = {
  bear: {
    greeting: {
      id: 'bear-greeting',
      topic: 'greeting',
      questions: ['Hello!', 'Hi bear!', 'Good morning!'],
      expectedAnswers: ['hello', 'hi', 'good morning'],
      rewards: { stars: 1, unlockNext: false }
    },
    favorite: {
      id: 'bear-favorite',
      topic: 'favorite',
      questions: ['What do you like?', 'I like honey!', 'What food do you like?'],
      expectedAnswers: ['honey', 'fish', 'berries'],
      rewards: { stars: 2, unlockNext: true }
    },
    help: {
      id: 'bear-help',
      topic: 'help',
      questions: ['Can you help me?', 'Please help!', 'I need help'],
      expectedAnswers: ['yes', 'sure', 'of course', 'ok'],
      rewards: { stars: 1, unlockNext: false }
    }
  },
  rabbit: {
    greeting: {
      id: 'rabbit-greeting',
      topic: 'greeting',
      questions: ['Hello rabbit!', 'Hi there!', 'Good afternoon!'],
      expectedAnswers: ['hello', 'hi', 'good afternoon'],
      rewards: { stars: 1, unlockNext: false }
    },
    food: {
      id: 'rabbit-food',
      topic: 'food',
      questions: ['What do you eat?', 'Carrots!', 'Do you like carrots?'],
      expectedAnswers: ['carrot', 'carrots', 'vegetables'],
      rewards: { stars: 2, unlockNext: true }
    },
    play: {
      id: 'rabbit-play',
      topic: 'play',
      questions: ['Let\'s play!', 'Can we play?', 'Want to play?'],
      expectedAnswers: ['yes', 'sure', 'okay', 'play'],
      rewards: { stars: 1, unlockNext: false }
    }
  },
  bird: {
    greeting: {
      id: 'bird-greeting',
      topic: 'greeting',
      questions: ['Hello bird!', 'Hi little bird!', 'Good morning!'],
      expectedAnswers: ['hello', 'hi', 'good morning', 'tweet'],
      rewards: { stars: 1, unlockNext: false }
    },
    sing: {
      id: 'bird-sing',
      topic: 'sing',
      questions: ['Sing a song!', 'Can you sing?', 'Please sing!'],
      expectedAnswers: ['sing', 'song', 'yes', 'okay'],
      rewards: { stars: 2, unlockNext: true }
    },
    fly: {
      id: 'bird-fly',
      topic: 'fly',
      questions: ['Can you fly?', 'Fly high!', 'Where can you fly?'],
      expectedAnswers: ['sky', 'tree', 'high', 'yes'],
      rewards: { stars: 1, unlockNext: false }
    }
  },
  deer: {
    greeting: {
      id: 'deer-greeting',
      topic: 'greeting',
      questions: ['Hello deer!', 'Hi there!', 'Good evening!'],
      expectedAnswers: ['hello', 'hi', 'good evening'],
      rewards: { stars: 1, unlockNext: false }
    },
    forest: {
      id: 'deer-forest',
      topic: 'forest',
      questions: ['Do you like the forest?', 'The forest is nice!', 'Is it safe here?'],
      expectedAnswers: ['yes', 'safe', 'nice', 'beautiful'],
      rewards: { stars: 2, unlockNext: true }
    },
    run: {
      id: 'deer-run',
      topic: 'run',
      questions: ['Can you run fast?', 'Run with me!', 'Let\'s run!'],
      expectedAnswers: ['fast', 'run', 'yes', 'okay'],
      rewards: { stars: 1, unlockNext: false }
    }
  }
};

// Forest Animals Data
// 森林动物数据

export const FOREST_ANIMALS: ForestAnimal[] = [
  {
    animalId: 'bear',
    name: 'Bear',
    emoji: '🐻',
    color: '#8B4513',
    position: { x: 20, y: 30 },
    unlockRequirements: {},
    dialogueTopics: ['greeting', 'favorite', 'help'],
    isActive: true
  },
  {
    animalId: 'rabbit',
    name: 'Rabbit',
    emoji: '🐰',
    color: '#F5F5DC',
    position: { x: 50, y: 40 },
    unlockRequirements: {
      completedConversations: 2
    },
    dialogueTopics: ['greeting', 'food', 'play'],
    isActive: true
  },
  {
    animalId: 'bird',
    name: 'Bird',
    emoji: '🐦',
    color: '#87CEEB',
    position: { x: 70, y: 20 },
    unlockRequirements: {
      completedConversations: 4
    },
    dialogueTopics: ['greeting', 'sing', 'fly'],
    isActive: true
  },
  {
    animalId: 'deer',
    name: 'Deer',
    emoji: '🦌',
    color: '#D2691E',
    position: { x: 80, y: 60 },
    unlockRequirements: {
      completedConversations: 6
    },
    dialogueTopics: ['greeting', 'forest', 'run'],
    isActive: true
  }
];
