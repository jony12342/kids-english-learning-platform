'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSpeech } from '@/lib/hooks/use-speech';
import { useChatStore } from '@/lib/store/chat-store';
import { FOREST_ANIMALS, ForestAnimal, AnimalId } from '@/types/scene';
import { Home, Mic, MicOff, Volume2, ArrowLeft } from 'lucide-react';

export default function ForestPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<ForestAnimal | null>(null);
  const [unlockedAnimals, setUnlockedAnimals] = useState<AnimalId[]>(['bear']);
  const [completedDialogues, setCompletedDialogues] = useState<string[]>([]);
  const [totalStars, setTotalStars] = useState(0);

  const {
    messages,
    isListening,
    isProcessing,
    isSpeaking,
    addMessage,
    setListening,
    setProcessing,
    setSpeaking,
    sendMessage,
  } = useChatStore();

  const {
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    isRecognitionSupported,
  } = useSpeech();

  useEffect(() => {
    setIsClient(true);
    // Show welcome message
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage({
          role: 'assistant',
          text: "Welcome to the Forest Adventure! 🌲\n\nClick on an animal to start talking!\nBear is ready to meet you!",
        });
      }, 500);
    }
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200">
        <div className="text-4xl font-bold text-green-700 animate-pulse">
          Loading Forest... 🌲
        </div>
      </div>
    );
  }

  const handleAnimalClick = (animal: ForestAnimal) => {
    // Check if animal is unlocked
    if (!unlockedAnimals.includes(animal.animalId as AnimalId)) {
      addMessage({
        role: 'assistant',
        text: `You need to complete more conversations first to unlock ${animal.name}! 🦊\n\nKeep talking with other animals!`,
      });
      return;
    }

    setSelectedAnimal(animal);

    // Show greeting message
    addMessage({
      role: 'assistant',
      text: `Hi! I'm ${animal.name}! ${animal.emoji}\n\nNice to meet you! What would you like to talk about?`,
    });
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
      setListening(false);
    } else {
      startListening(
        async (transcript) => {
          setListening(false);
          setProcessing(true);

          try {
            const response = await sendMessage(transcript);

            // Check if this completes a dialogue
            if (selectedAnimal && response.text) {
              const dialogueId = `${selectedAnimal.animalId}-greeting`;
              if (!completedDialogues.includes(dialogueId)) {
                // Award stars for first dialogue
                setCompletedDialogues([...completedDialogues, dialogueId]);
                setTotalStars(totalStars + 1);

                // Check if new animals should be unlocked
                checkUnlocks();
              }
            }

            if (response.text) {
              setSpeaking(true);
              speak(response.text);
              setTimeout(() => {
                setSpeaking(false);
              }, 3000);
            }
          } catch (error) {
            console.error('Failed to process message:', error);
            setProcessing(false);
          }
        },
        (error) => {
          console.error('Recognition error:', error);
          setListening(false);
          addMessage({
            role: 'assistant',
            text: "I couldn't hear you. Can you try again? 🎤",
          });
        }
      );
      setListening(true);
    }
  };

  const checkUnlocks = () => {
    const newUnlocks: AnimalId[] = [...unlockedAnimals];

    // Rabbit: needs 2 completed dialogues
    if (completedDialogues.length >= 2 && !unlockedAnimals.includes('rabbit')) {
      newUnlocks.push('rabbit');
      addMessage({
        role: 'assistant',
        text: "🎉 Congratulations! Rabbit has joined the forest! 🐰",
      });
    }

    // Bird: needs 4 completed dialogues
    if (completedDialogues.length >= 4 && !unlockedAnimals.includes('bird')) {
      newUnlocks.push('bird');
      addMessage({
        role: 'assistant',
        text: "🎉 Amazing! Bird has flown into the forest! 🐦",
      });
    }

    // Deer: needs 6 completed dialogues
    if (completedDialogues.length >= 6 && !unlockedAnimals.includes('deer')) {
      newUnlocks.push('deer');
      addMessage({
        role: 'assistant',
        text: "🎉 Wonderful! Deer has come to the forest! 🦌",
      });
    }

    setUnlockedAnimals(newUnlocks);
  };

  const goBack = () => {
    setSelectedAnimal(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <Home className="w-6 h-6 text-green-600" />
            <span className="font-bold text-green-600">Home</span>
          </button>

          <h1 className="text-3xl font-bold text-green-700 flex items-center gap-2">
            <span>🌲</span>
            <span>Forest Adventure</span>
            <span>🌳</span>
          </h1>

          <div className="flex items-center gap-4">
            <div className="text-center bg-white rounded-full px-4 py-2 shadow-md">
              <div className="text-sm text-gray-600">Stars</div>
              <div className="text-xl font-bold text-yellow-500">⭐ {totalStars}</div>
            </div>
            <div className="text-center bg-white rounded-full px-4 py-2 shadow-md">
              <div className="text-sm text-gray-600">Unlocked</div>
              <div className="text-xl font-bold text-green-600">{unlockedAnimals.length}/4</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        {selectedAnimal ? (
          // Dialogue View
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Animal Header */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-bold">Back to Forest</span>
              </button>

              <div className="flex items-center gap-4">
                <div className="text-8xl">{selectedAnimal.emoji}</div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{selectedAnimal.name}</h2>
                  <p className="text-gray-600">Let's have a conversation!</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
                      message.role === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {message.role === 'user' ? '👧' : selectedAnimal.emoji}
                      </span>
                      <span className="font-bold text-sm">
                        {message.role === 'user' ? 'You' : selectedAnimal.name}
                      </span>
                    </div>
                    <p className="text-lg whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}

              {/* Processing Indicator */}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin text-2xl">{selectedAnimal.emoji}</div>
                      <span className="text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Listening Indicator */}
              {isListening && (
                <div className="flex justify-center">
                  <div className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg animate-pulse">
                    <div className="flex items-center gap-2">
                      <Mic className="w-6 h-6 animate-bounce" />
                      <span className="font-bold">Listening...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Speaking Indicator */}
              {isSpeaking && (
                <div className="flex justify-center">
                  <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-6 h-6 animate-pulse" />
                      <span className="font-bold">Speaking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Forest Scene View
          <div className="max-w-6xl mx-auto">
            {/* Instructions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">🌲 Welcome to the Forest!</h2>
              <p className="text-gray-700">
                Click on an animal to start talking! Complete conversations to unlock more animals!
              </p>
            </div>

            {/* Forest Scene */}
            <div className="bg-gradient-to-b from-green-300 via-green-400 to-green-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              {/* Background Trees */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-4 left-4 text-6xl">🌲</div>
                <div className="absolute top-12 left-1/4 text-5xl">🌳</div>
                <div className="absolute top-8 right-20 text-6xl">🌲</div>
                <div className="absolute top-20 right-1/3 text-5xl">🌳</div>
                <div className="absolute bottom-40 left-8 text-7xl">🌲</div>
                <div className="absolute bottom-20 left-1/3 text-6xl">🌳</div>
                <div className="absolute bottom-32 right-12 text-7xl">🌲</div>
                <div className="absolute bottom-12 right-1/4 text-6xl">🌳</div>
              </div>

              {/* Path */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-700/30 to-transparent"></div>

              {/* Animals Grid - Using Flexbox for better layout */}
              <div className="relative z-10 grid grid-cols-2 gap-6 py-8">
                {FOREST_ANIMALS.map((animal) => {
                  const isUnlocked = unlockedAnimals.includes(animal.animalId as AnimalId);

                  return (
                    <button
                      key={animal.animalId}
                      onClick={() => handleAnimalClick(animal)}
                      disabled={!isUnlocked}
                      className={`
                        relative bg-white/95 backdrop-blur-sm rounded-3xl p-6
                        shadow-xl border-4 border-white/50
                        transition-all duration-300
                        ${isUnlocked
                          ? 'cursor-pointer hover:scale-105 hover:shadow-2xl hover:border-yellow-300'
                          : 'opacity-40 cursor-not-allowed grayscale'
                        }
                      `}
                    >
                      {/* Glow Effect for Unlocked Animals */}
                      {isUnlocked && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-200 to-green-200 rounded-3xl opacity-50 blur -z-10"></div>
                      )}

                      {/* Animal Emoji */}
                      <div className="text-6xl mb-3 transform transition-transform hover:scale-110">
                        {animal.emoji}
                      </div>

                      {/* Animal Name */}
                      <div className="text-xl font-bold text-gray-800 mb-2">
                        {animal.name}
                      </div>

                      {/* Status Badge */}
                      {isUnlocked ? (
                        <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                          <span>✨</span>
                          <span>Ready!</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          {/* Lock Icon */}
                          <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                            <span className="text-xl">🔒</span>
                          </div>

                          {/* Unlock Requirement */}
                          <div className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-center">
                            <div className="font-bold">Keep talking!</div>
                            <div>{animal.unlockRequirements.completedConversations} more</div>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Progress indicator */}
              <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-gray-700">Progress:</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < completedDialogues.length
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Info */}
            <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                <span>📊</span>
                <span>Your Progress</span>
              </h3>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Unlocked Animals</span>
                  <span className="font-bold">{unlockedAnimals.length} / 4</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                    style={{ width: `${(unlockedAnimals.length / 4) * 100}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border-2 border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">⭐</span>
                    <span className="text-sm text-gray-600">Stars Earned</span>
                  </div>
                  <div className="text-3xl font-bold text-yellow-600">{totalStars}</div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">💬</span>
                    <span className="text-sm text-gray-600">Conversations</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">{completedDialogues.length}</div>
                </div>
              </div>

              {/* Next Unlock Hint */}
              {unlockedAnimals.length < 4 && (
                <div className="mt-4 bg-green-50 rounded-xl p-4 border-2 border-green-200">
                  <div className="flex items-center gap-2 text-green-700">
                    <span className="text-xl">🎯</span>
                    <span className="text-sm font-bold">
                      Next unlock: Complete {unlockedAnimals.length} more conversation{unlockedAnimals.length > 1 ? 's' : ''}!
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Control Bar - Only show when animal is selected */}
      {selectedAnimal && (
        <footer className="bg-white/90 backdrop-blur-sm shadow-lg p-6">
          <div className="max-w-4xl mx-auto flex justify-center">
            <button
              onClick={handleToggleListening}
              disabled={isProcessing || isSpeaking}
              className={`
                flex-1 max-w-sm flex items-center justify-center gap-3 px-8 py-6 rounded-full shadow-lg transition-all min-h-[60px]
                ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                    : 'bg-green-500 hover:bg-green-600 text-white hover:scale-105'
                }
                ${isProcessing || isSpeaking ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isListening ? (
                <>
                  <MicOff className="w-8 h-8" />
                  <span className="text-2xl font-bold">Stop</span>
                </>
              ) : (
                <>
                  <Mic className="w-8 h-8" />
                  <span className="text-2xl font-bold">Talk</span>
                </>
              )}
            </button>
          </div>

          {!isRecognitionSupported && (
            <div className="text-center mt-4 text-red-600 font-bold">
              ⚠️ Speech recognition is not supported in your browser. Please use Chrome or Safari.
            </div>
          )}
        </footer>
      )}
    </div>
  );
}
