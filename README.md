# Kids English Learning Platform

A gamified English learning platform designed for children, featuring AI-powered pronunciation assessment, interactive learning scenarios, and engaging visual experiences.

## 🎯 Project Overview

This platform helps children learn English through:
- **Interactive Vocabulary Learning**: Learn words with images, audio, and pronunciation practice
- **Sentence Practice**: Master everyday English sentences with voice recognition
- **Gamified Scenarios**: Explore magical gardens, forests, and kitchens while learning
- **AI-Powered Assessment**: Get instant feedback on pronunciation using Web Speech API
- **Progress Tracking**: Monitor learning achievements and daily tasks

## ✨ Core Features

### 1. Word Learning (单词学习)

**Location**: `/words`

**Features**:
- 455 carefully curated words across 14 categories
- Three difficulty levels: Easy, Medium, Hard
- Visual learning with high-quality images from Unsplash
- Native speaker pronunciation playback
- Voice recognition for pronunciation assessment
- Progress tracking with visual indicators

**Word Categories**:
- 🐾 Animals (170 words)
- 🍎 Food (180 words)
- 🌈 Colors (85 words)
- 🔢 Numbers
- 👨‍👩‍👧‍👦 Family
- 👂 Body Parts
- 👕 Clothes
- 🧸 Toys
- 🌳 Nature
- 🚗 Vehicles
- 📚 School
- 🏠 Home
- 😊 Feelings
- 🏃 Actions

**Technical Implementation**:
- Text-to-Speech (TTS) using Web Speech API
- Adjustable speech rate (0.8x) for child-friendly learning
- Speech-to-Text (STT) for pronunciation evaluation
- Similarity-based scoring algorithm
- Fallback image loading for reliability

**Data Structure**:
```typescript
interface Word {
  wordId: string;
  word: string;
  chinese: string;
  category: WordCategory;
  difficulty: WordDifficulty;
  phonetic: string;
  exampleSentence: string;
  imageUrl: string;
}
```

**User Flow**:
1. Select category and difficulty filters
2. View word with image and phonetic transcription
3. Listen to native pronunciation
4. Practice speaking with voice recognition
5. Receive instant feedback on pronunciation
6. Navigate to next/previous words

### 2. Sentence Learning (短句学习)

**Location**: `/sentences`

**Features**:
- 100 practical everyday sentences
- Eight categories covering common situations
- Three difficulty levels
- Native speaker audio playback
- Pronunciation assessment with confidence scoring
- Contextual Chinese translations

**Sentence Categories**:
- 👋 Greetings (Hello, Good morning, etc.)
- 🙋 Introduction (My name is..., I am..., etc.)
- 💬 Daily Conversation (How are you?, What's this?, etc.)
- ❓ Questions (What, Where, Who, How questions)
- 😊 Feelings (I'm happy, sad, tired, etc.)
- 🙏 Requests (Can you help me?, Please, etc.)
- 🤝 Manners (Thank you, You're welcome, etc.)
- 🎮 Activities (Let's play, I like to..., etc.)

**Technical Implementation**:
- Same Web Speech API infrastructure as word learning
- Sentence-level pronunciation assessment
- Word-by-word similarity comparison
- Confidence threshold: 70% for passing

**Data Structure**:
```typescript
interface Sentence {
  sentenceId: string;
  sentence: string;
  chinese: string;
  category: SentenceCategory;
  difficulty: WordDifficulty;
}
```

### 3. Magical Garden (魔法花园)

**Location**: `/garden`

Learn vocabulary with owl teacher in an enchanted garden setting.

### 4. Adventure Forest (探险森林)

**Location**: `/forest`

Practice conversational English with friendly forest animals.

### 5. Happy Kitchen (快乐厨房)

**Location**: `/kitchen`

Learn food vocabulary while baking cakes with interactive gameplay.

### 6. Daily Tasks (每日任务)

**Location**: `/tasks`

Complete daily learning challenges to earn rewards and maintain consistency.

### 7. Progress Tracking (学习进度)

**Location**: `/progress`

View detailed statistics on learning achievements, words mastered, and time spent.

### 8. Character Customization (我的角色)

**Location**: `/character`

Create and personalize a learning companion character.

### 9. Word Memory Match Game (趣味单词游戏)

**Location**: `/games`

**Features**:
- Card matching gameplay with 6 word-image pairs (12 cards total)
- Interactive 3D card flip animations
- Click-to-hear pronunciation on word cards
- Real-time game statistics (time, moves, pairs matched)
- Star rating system based on performance
- Category and difficulty filters
- Victory celebration with rewards

**Gameplay**:
- Players flip cards to find matching word-image pairs
- Each successful match plays the word pronunciation
- Game tracks time elapsed and number of moves
- Star rating awarded on completion:
  - ⭐⭐⭐ (3 stars): Perfect performance (optimal + 4 moves)
  - ⭐⭐ (2 stars): Great performance (optimal + 8 moves)
  - ⭐ (1 star): Completed game

**Technical Implementation**:
- React state management for card states (flipped, matched)
- CSS 3D transforms for flip animations
- Web Speech API integration for pronunciation
- Randomized card shuffling algorithm
- Win detection with star calculation logic

**User Flow**:
1. Select category and difficulty filters
2. Click "New Game" to start
3. Click cards to flip them
4. Find matching word-image pairs
5. Listen to pronunciation when matched
6. Complete all pairs to win
7. Receive star rating and celebration

### 10. Parent Dashboard (家长中心)

**Location**: `/parent`

Monitor child's learning progress with detailed reports and analytics.

## 🛠️ Technical Architecture

### Frontend Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks (useState, useEffect)
- **Client Components**: All interactive pages use 'use client'

### Speech Recognition System

**Text-to-Speech (TTS)**:
```typescript
class TextToSpeech {
  speak(text: string, rate: number = 0.8, pitch: number = 1): Promise<void>
  stop(): void
  pause(): void
  resume(): void
}
```

**Speech-to-Text (STT)**:
```typescript
class SpeechRecognition {
  startListening(): Promise<string>
  stopListening(): void
  isSupported(): boolean
}
```

**Pronunciation Assessment**:
```typescript
class PronunciationAssessor {
  async assessWord(targetWord: string): Promise<PronunciationResult>
  async assessSentence(targetSentence: string): Promise<PronunciationResult>

  // Scoring Algorithm:
  // - Normalizes text (lowercase, remove punctuation)
  // - Compares word-by-word similarity
  // - Returns confidence score (0-1)
  // - Threshold: 0.7 for passing
}
```

**Browser Support**:
- Chrome/Edge: Full support (SpeechRecognition & SpeechSynthesis)
- Safari: Full support (webkitSpeechRecognition & SpeechSynthesis)
- Firefox: SpeechSynthesis only
- Mobile: Limited support (varies by device)

### Data Management

**Word Data**: `data/words.ts`
- EASY_WORDS: 170 words
- MEDIUM_WORDS: 180 words
- HARD_WORDS: 85 words
- Total: 455 words

**Sentence Data**: `data/sentences.ts`
- EASY_SENTENCES: 40 sentences
- MEDIUM_SENTENCES: 35 sentences
- HARD_SENTENCES: 25 sentences
- Total: 100 sentences

**Image Hosting**: Unsplash API
- High-quality, educational images
- Automatic fallback to placeholder on load failure
- Format: 400x400px cropped images

### Color Scheme

```css
--primary-blue: #3B82F6
--primary-purple: #8B5CF6
--primary-pink: #EC4899
--primary-orange: #F97316
--primary-yellow: #EAB308
--primary-green: #22C55E
```

## 📁 Project Structure

```
kids-english-learning-platform/
├── app/
│   ├── page.tsx              # Homepage with all learning scenes
│   ├── words/
│   │   └── page.tsx          # Word learning page
│   ├── sentences/
│   │   └── page.tsx          # Sentence learning page
│   ├── games/
│   │   └── page.tsx          # Memory match game page
│   ├── garden/
│   ├── forest/
│   ├── kitchen/
│   ├── tasks/
│   ├── progress/
│   ├── character/
│   └── parent/
├── data/
│   ├── words.ts              # Word vocabulary database
│   └── sentences.ts          # Sentence database
├── lib/
│   └── speech/
│       ├── pronunciation.ts  # TTS, STT, and assessment logic
│       └── types.ts          # Speech-related type definitions
├── types/
│   └── vocabulary.ts         # Core type definitions
└── public/
    └── (static assets)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Modern browser (Chrome/Safari recommended for speech features)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kids-english-learning-platform
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open browser:
```
http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly buttons (min 44x44px)

### Accessibility
- Semantic HTML
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast colors for readability

### Animations
- Gentle bounce effects for headers
- Wiggle animation on hover for icons
- Pulse animation for recording states
- Smooth transitions (200-300ms)

### Error Handling
- Image loading fallbacks to placeholder
- Speech recognition error handling with user feedback
- Graceful degradation for unsupported browsers

## 📊 Assessment Logic

### Pronunciation Scoring

**Algorithm**:
1. Normalize both target and detected text
2. Split into words
3. Calculate word-by-word matching
4. Compute similarity ratio: `matched_words / total_words`
5. Return confidence score (0-1)

**Feedback Levels**:
- **0.9 - 1.0**: "Excellent! Almost perfect!"
- **0.7 - 0.9**: "Good job! Try again for even better pronunciation."
- **0.5 - 0.7**: "Not bad. Listen carefully and try again."
- **0.0 - 0.5**: "Keep practicing. Listen to the pronunciation and try again."

**Passing Threshold**: 70% similarity

## 🔒 Privacy & Safety

- No user data collection
- All speech processing happens locally in the browser
- No external API calls for speech recognition
- Child-friendly interface with no external links
- No advertisements or in-app purchases

## 🌐 Browser Compatibility

| Feature | Chrome | Safari | Firefox | Edge | Mobile |
|---------|--------|--------|---------|------|--------|
| TTS | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| STT | ✅ | ✅ | ❌ | ✅ | ⚠️ |

⚠️ Mobile browsers have limited speech recognition support

## 📝 Future Enhancements

- [ ] Add more word categories (weather, occupations, etc.)
- [ ] Implement offline mode with service workers
- [ ] Add voice recording playback for comparison
- [ ] Create multiplayer learning mode
- [ ] Add more gamification elements (badges, achievements)
- [ ] Implement spaced repetition algorithm
- [ ] Add video lessons
- [ ] Create printable worksheets
- [ ] Add progress export functionality

## 🤝 Contributing

This is an educational project. Contributions are welcome!

## 📄 License

[License information to be added]

## 👨‍👩‍👧‍👦 Target Audience

- Age: 4-10 years old
- English level: Beginner to Intermediate
- Learning style: Visual and auditory learners

## 🎯 Learning Objectives

By using this platform, children will:
- Build vocabulary of 400+ common English words
- Master 100+ everyday sentences
- Develop proper pronunciation through AI feedback
- Gain confidence in speaking English
- Learn through play and exploration

## 📞 Support

For issues or questions, please open an issue on the repository.

---

**Made with ❤️ for young learners everywhere**