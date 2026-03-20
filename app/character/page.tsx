'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  AVATAR_CONFIGURATIONS,
  CHARACTER_ACCESSORIES,
  COLOR_PALETTE,
  DEFAULT_CHARACTER,
  AvatarType,
  CharacterAccessory,
  getRarityColor,
  getRarityLabel,
  isAccessoryUnlocked,
} from '@/types/character';
import { Home, Palette, Sparkles, Check, ChevronRight } from 'lucide-react';

export default function CharacterPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Character state
  const [characterName, setCharacterName] = useState('My Character');
  const [avatarType, setAvatarType] = useState<AvatarType>('owl');
  const [primaryColor, setPrimaryColor] = useState('#FF6B6B');
  const [secondaryColor, setSecondaryColor] = useState('#4ECDC4');
  const [accentColor, setAccentColor] = useState('#FFE66D');
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);

  // UI state
  const [currentStep, setCurrentStep] = useState<'avatar' | 'colors' | 'accessories' | 'preview'>('avatar');
  const [isSaving, setIsSaving] = useState(false);

  // User stats (mock data for now)
  const [userStats] = useState({
    totalStars: 25,
    wordsLearned: 15,
    conversationsCompleted: 5
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-red-200">
        <div className="text-4xl font-bold text-purple-700 animate-pulse">
          Loading Character Creator... ✨
        </div>
      </div>
    );
  }

  const selectedAvatar = AVATAR_CONFIGURATIONS.find(av => av.avatarType === avatarType);

  const handleAccessoryToggle = (accessoryId: string) => {
    if (selectedAccessories.includes(accessoryId)) {
      setSelectedAccessories(selectedAccessories.filter(id => id !== accessoryId));
    } else {
      setSelectedAccessories([...selectedAccessories, accessoryId]);
    }
  };

  const handleSaveCharacter = () => {
    setIsSaving(true);

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      alert('Character saved successfully! 🎉');
      router.push('/');
    }, 1000);
  };

  const canAccessAccessory = (accessory: CharacterAccessory) => {
    return isAccessoryUnlocked(accessory, userStats);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-200 via-pink-200 to-red-200">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <Home className="w-6 h-6 text-purple-600" />
            <span className="font-bold text-purple-600">Home</span>
          </button>

          <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-2">
            <span>✨</span>
            <span>Character Creator</span>
            <span>🎨</span>
          </h1>

          <div className="flex items-center gap-4">
            <div className="text-center bg-white rounded-full px-4 py-2 shadow-md">
              <div className="text-sm text-gray-600">Your Stats</div>
              <div className="text-sm font-bold text-yellow-500">⭐ {userStats.totalStars}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg mb-6">
            <div className="flex justify-between items-center">
              {[
                { key: 'avatar', label: 'Avatar', icon: '🦉' },
                { key: 'colors', label: 'Colors', icon: '🎨' },
                { key: 'accessories', label: 'Accessories', icon: '✨' },
                { key: 'preview', label: 'Preview', icon: '👀' }
              ].map((step, index) => {
                const isCompleted = ['avatar', 'colors', 'accessories', 'preview'].indexOf(currentStep) > index;
                const isCurrent = currentStep === step.key;

                return (
                  <div key={step.key} className="flex items-center">
                    <button
                      onClick={() => setCurrentStep(step.key as any)}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all
                        ${isCurrent
                          ? 'bg-purple-500 text-white scale-110'
                          : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                        }
                      `}
                    >
                      <span className="text-xl">{step.icon}</span>
                      <span className="hidden sm:inline">{step.label}</span>
                      {isCompleted && <Check className="w-4 h-4" />}
                    </button>
                    {index < 3 && (
                      <ChevronRight className={`w-6 h-6 mx-2 ${
                        isCompleted ? 'text-green-500' : 'text-gray-400'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Customization */}
            <div className="space-y-4">
              {currentStep === 'avatar' && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                  <h2 className="text-2xl font-bold text-purple-700 mb-4">🦉 Choose Your Avatar</h2>
                  <p className="text-gray-600 mb-6">Select a character to represent you!</p>

                  <div className="grid grid-cols-2 gap-4">
                    {AVATAR_CONFIGURATIONS.map((avatar) => (
                      <button
                        key={avatar.avatarType}
                        onClick={() => setAvatarType(avatar.avatarType)}
                        className={`
                          relative bg-white rounded-2xl p-6 shadow-md border-4
                          transition-all
                          ${avatarType === avatar.avatarType
                            ? 'border-purple-400 scale-105 shadow-xl'
                            : 'border-gray-200 hover:scale-105 hover:shadow-lg'
                          }
                        `}
                      >
                        <div className="text-8xl mb-4">{avatar.emoji}</div>
                        <div className="font-bold text-gray-800 mb-2">{avatar.name}</div>
                        <div className="text-sm text-gray-600">{avatar.description}</div>

                        {avatarType === avatar.avatarType && (
                          <div className="absolute top-2 right-2">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 'colors' && (
                <div className="space-y-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold text-purple-700 mb-4">🎨 Choose Your Colors</h2>
                    <p className="text-gray-600 mb-6">Customize your character with your favorite colors!</p>

                    {/* Primary Color */}
                    <div className="mb-6">
                      <label className="flex items-center gap-2 mb-3">
                        <div
                          className="w-8 h-8 rounded-full border-4 border-white shadow-md"
                          style={{ backgroundColor: primaryColor }}
                        />
                        <span className="font-bold text-gray-800">Primary Color</span>
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {COLOR_PALETTE.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setPrimaryColor(color.value)}
                            className={`
                              relative bg-white rounded-xl p-3 shadow-md border-2
                              transition-all
                              ${primaryColor === color.value
                                ? 'border-purple-400 scale-110'
                                : 'border-gray-200 hover:scale-105'
                              }
                            `}
                          >
                            <div className="text-3xl mb-1">{color.emoji}</div>
                            <div className="text-xs font-bold text-gray-700">{color.name}</div>
                            {primaryColor === color.value && (
                              <div className="absolute -top-2 -right-2">
                                <Check className="w-5 h-5 text-purple-500" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Secondary Color */}
                    <div className="mb-6">
                      <label className="flex items-center gap-2 mb-3">
                        <div
                          className="w-8 h-8 rounded-full border-4 border-white shadow-md"
                          style={{ backgroundColor: secondaryColor }}
                        />
                        <span className="font-bold text-gray-800">Secondary Color</span>
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {COLOR_PALETTE.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setSecondaryColor(color.value)}
                            className={`
                              relative bg-white rounded-xl p-3 shadow-md border-2
                              transition-all
                              ${secondaryColor === color.value
                                ? 'border-purple-400 scale-110'
                                : 'border-gray-200 hover:scale-105'
                              }
                            `}
                          >
                            <div className="text-3xl mb-1">{color.emoji}</div>
                            <div className="text-xs font-bold text-gray-700">{color.name}</div>
                            {secondaryColor === color.value && (
                              <div className="absolute -top-2 -right-2">
                                <Check className="w-5 h-5 text-purple-500" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Accent Color */}
                    <div>
                      <label className="flex items-center gap-2 mb-3">
                        <div
                          className="w-8 h-8 rounded-full border-4 border-white shadow-md"
                          style={{ backgroundColor: accentColor }}
                        />
                        <span className="font-bold text-gray-800">Accent Color</span>
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {COLOR_PALETTE.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setAccentColor(color.value)}
                            className={`
                              relative bg-white rounded-xl p-3 shadow-md border-2
                              transition-all
                              ${accentColor === color.value
                                ? 'border-purple-400 scale-110'
                                : 'border-gray-200 hover:scale-105'
                              }
                            `}
                          >
                            <div className="text-3xl mb-1">{color.emoji}</div>
                            <div className="text-xs font-bold text-gray-700">{color.name}</div>
                            {accentColor === color.value && (
                              <div className="absolute -top-2 -right-2">
                                <Check className="w-5 h-5 text-purple-500" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 'accessories' && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                  <h2 className="text-2xl font-bold text-purple-700 mb-4">✨ Choose Accessories</h2>
                  <p className="text-gray-600 mb-6">Decorate your character with fun accessories!</p>

                  <div className="space-y-4">
                    {['head', 'face', 'hand'].map((category) => (
                      <div key={category}>
                        <h3 className="font-bold text-lg mb-3 capitalize">{category} Accessories</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {CHARACTER_ACCESSORIES.filter(a => a.category === category).map((accessory) => {
                            const isUnlocked = canAccessAccessory(accessory);
                            const isSelected = selectedAccessories.includes(accessory.accessoryId);

                            return (
                              <button
                                key={accessory.accessoryId}
                                onClick={() => isUnlocked && handleAccessoryToggle(accessory.accessoryId)}
                                disabled={!isUnlocked}
                                className={`
                                  relative bg-white rounded-xl p-3 shadow-md border-2
                                  transition-all
                                  ${isSelected
                                    ? 'border-purple-400 scale-105'
                                    : isUnlocked
                                    ? 'border-gray-200 hover:scale-105 hover:shadow-lg'
                                    : 'opacity-50 cursor-not-allowed border-gray-200 grayscale'
                                  }
                                `}
                              >
                                <div className="text-4xl mb-2">{accessory.emoji}</div>
                                <div className="text-sm font-bold text-gray-800">{accessory.name}</div>

                                <div
                                  className="text-xs font-bold mt-1 px-2 py-1 rounded-full inline-block"
                                  style={{
                                    backgroundColor: getRarityColor(accessory.rarity) + '20',
                                    color: getRarityColor(accessory.rarity)
                                  }}
                                >
                                  {getRarityLabel(accessory.rarity)}
                                </div>

                                {isSelected && (
                                  <div className="absolute top-1 right-1">
                                    <Check className="w-4 h-4 text-purple-500" />
                                  </div>
                                )}

                                {!isUnlocked && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                                    <div className="text-white text-center">
                                      <div className="text-2xl">🔒</div>
                                      <div className="text-xs mt-1">
                                        {accessory.unlockCondition.type === 'stars' && `${accessory.unlockCondition.amount} ⭐`}
                                        {accessory.unlockCondition.type === 'words' && `${accessory.unlockCondition.amount} 📚`}
                                        {accessory.unlockCondition.type === 'conversations' && `${accessory.unlockCondition.amount} 💬`}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 'preview' && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                  <h2 className="text-2xl font-bold text-purple-700 mb-4">👀 Preview Your Character</h2>
                  <p className="text-gray-600 mb-6">Review your character before saving!</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Character Name</label>
                      <input
                        type="text"
                        value={characterName}
                        onChange={(e) => setCharacterName(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none font-bold"
                        placeholder="Enter character name..."
                      />
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                      <h3 className="font-bold text-gray-800 mb-2">Character Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avatar:</span>
                          <span className="font-bold">{selectedAvatar?.emoji} {selectedAvatar?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Primary Color:</span>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: primaryColor }}
                            />
                            <span className="font-bold">{COLOR_PALETTE.find(c => c.value === primaryColor)?.name}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Secondary Color:</span>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: secondaryColor }}
                            />
                            <span className="font-bold">{COLOR_PALETTE.find(c => c.value === secondaryColor)?.name}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Accent Color:</span>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: accentColor }}
                            />
                            <span className="font-bold">{COLOR_PALETTE.find(c => c.value === accentColor)?.name}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Accessories:</span>
                          <span className="font-bold">{selectedAccessories.length} selected</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleSaveCharacter}
                      disabled={isSaving}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Sparkles className="w-6 h-6" />
                          <span>Save Character</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel - Live Preview */}
            <div className="lg:sticky lg:top-4 h-fit">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">Live Preview</h2>

                {/* Character Preview */}
                <div
                  className="relative bg-gradient-to-br rounded-3xl p-8 mb-4 shadow-inner"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}40, ${secondaryColor}40)`,
                    minHeight: '400px'
                  }}
                >
                  {/* Avatar */}
                  <div className="text-center">
                    <div className="text-9xl mb-4 animate-bounce-gentle">{selectedAvatar?.emoji}</div>
                    <div className="text-2xl font-bold text-gray-800">{characterName}</div>
                  </div>

                  {/* Accessories Display */}
                  {selectedAccessories.length > 0 && (
                    <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                      {selectedAccessories.map((accessoryId) => {
                        const accessory = CHARACTER_ACCESSORIES.find(a => a.accessoryId === accessoryId);
                        return (
                          <div
                            key={accessoryId}
                            className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl shadow-md border-2"
                            style={{ borderColor: accentColor }}
                          >
                            {accessory?.emoji}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Color Swatches */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                      style={{ backgroundColor: primaryColor }}
                      title="Primary Color"
                    />
                    <div
                      className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                      style={{ backgroundColor: secondaryColor }}
                      title="Secondary Color"
                    />
                    <div
                      className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                      style={{ backgroundColor: accentColor }}
                      title="Accent Color"
                    />
                  </div>
                </div>

                {/* Selected Accessories List */}
                {selectedAccessories.length > 0 && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                    <h3 className="font-bold text-gray-800 mb-2">Equipped Accessories</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAccessories.map((accessoryId) => {
                        const accessory = CHARACTER_ACCESSORIES.find(a => a.accessoryId === accessoryId);
                        return (
                          <div
                            key={accessoryId}
                            className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm"
                          >
                            <span>{accessory?.emoji}</span>
                            <span className="text-sm font-bold">{accessory?.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
