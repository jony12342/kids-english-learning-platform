'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSpeech } from '@/lib/hooks/use-speech';
import {
  CAKE_RECIPES,
  KITCHEN_INGREDIENTS,
  KITCHEN_UTENSILS,
  KITCHEN_VERBS,
  CakeRecipe,
  KitchenIngredient,
  KitchenUtensil,
  KitchenVerb,
} from '@/types/kitchen';
import { Home, Volume2, ArrowLeft, CheckCircle2, Circle, Play, RotateCcw } from 'lucide-react';

export default function KitchenPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<CakeRecipe | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [collectedIngredients, setCollectedIngredients] = useState<string[]>([]);
  const [collectedUtensils, setCollectedUtensils] = useState<string[]>([]);
  const [learnedVerbs, setLearnedVerbs] = useState<string[]>([]);
  const [isBaking, setIsBaking] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);

  const { speak, isSpeaking } = useSpeech();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 via-amber-200 to-yellow-200">
        <div className="text-4xl font-bold text-orange-700 animate-pulse">
          Loading Kitchen... 🧁
        </div>
      </div>
    );
  }

  const handleRecipeSelect = (recipe: CakeRecipe) => {
    setSelectedRecipe(recipe);
    setCurrentStep(0);
    setCompletedSteps([]);
    setCollectedIngredients([]);
    setCollectedUtensils([]);
    setLearnedVerbs([]);
    setIsBaking(false);
    setIsComplete(false);
    setStarsEarned(0);

    // Speak recipe description
    speak(`Let's make a ${recipe.name}! ${recipe.description}`);
  };

  const handleIngredientClick = (ingredient: KitchenIngredient) => {
    if (!selectedRecipe) return;

    // Check if this ingredient is needed for the recipe
    if (!selectedRecipe.requiredIngredients.includes(ingredient.ingredientId)) {
      speak(`We don't need ${ingredient.name} for this recipe.`);
      return;
    }

    // Check if already collected
    if (collectedIngredients.includes(ingredient.ingredientId)) {
      speak(`We already have ${ingredient.name}.`);
      return;
    }

    // Add to collected ingredients
    setCollectedIngredients([...collectedIngredients, ingredient.ingredientId]);

    // Teach the ingredient
    speak(`${ingredient.name}! ${ingredient.exampleSentence}`);

    // Award star for learning new ingredient
    setStarsEarned(starsEarned + 1);
  };

  const handleUtensilClick = (utensil: KitchenUtensil) => {
    if (!selectedRecipe) return;

    // Check if this utensil is needed for the recipe
    if (!selectedRecipe.requiredUtensils.includes(utensil.utensilId)) {
      speak(`We don't need ${utensil.name} for this recipe.`);
      return;
    }

    // Check if already collected
    if (collectedUtensils.includes(utensil.utensilId)) {
      speak(`We already have ${utensil.name}.`);
      return;
    }

    // Add to collected utensils
    setCollectedUtensils([...collectedUtensils, utensil.utensilId]);

    // Teach the utensil
    speak(`${utensil.name}! ${utensil.exampleSentence}`);

    // Award star for learning new utensil
    setStarsEarned(starsEarned + 1);
  };

  const handleVerbClick = (verb: KitchenVerb) => {
    if (!selectedRecipe) return;

    // Check if already learned
    if (learnedVerbs.includes(verb.verbId)) {
      return; // Don't award stars for reviewing
    }

    // Add to learned verbs
    setLearnedVerbs([...learnedVerbs, verb.verbId]);

    // Teach the verb
    speak(`${verb.name}! ${verb.emoji} ${verb.exampleSentence}`);

    // Award star for learning new verb
    setStarsEarned(starsEarned + 1);
  };

  const handleStepComplete = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) return;

    setCompletedSteps([...completedSteps, stepNumber]);

    // Check if recipe is complete
    if (stepNumber === selectedRecipe?.steps.length) {
      setIsComplete(true);
      setIsBaking(false);

      // Award completion bonus
      const bonusStars = selectedRecipe?.difficulty === 'easy' ? 5 : selectedRecipe?.difficulty === 'medium' ? 10 : 15;
      setStarsEarned(starsEarned + bonusStars);

      speak('Amazing! Your cake is ready! Great job!');
    } else {
      // Move to next step
      setCurrentStep(stepNumber);
    }
  };

  const handleStartBaking = () => {
    // Check if all ingredients and utensils are collected
    const hasAllIngredients = selectedRecipe?.requiredIngredients.every(id =>
      collectedIngredients.includes(id)
    );
    const hasAllUtensils = selectedRecipe?.requiredUtensils.every(id =>
      collectedUtensils.includes(id)
    );

    if (!hasAllIngredients || !hasAllUtensils) {
      speak('Wait! We need to collect all ingredients and utensils first!');
      return;
    }

    setIsBaking(true);
    setCurrentStep(1);
    speak('Let\'s start baking! Follow the steps carefully!');
  };

  const handleReset = () => {
    if (selectedRecipe) {
      handleRecipeSelect(selectedRecipe);
    }
  };

  const goBack = () => {
    if (selectedRecipe) {
      setSelectedRecipe(null);
      setCurrentStep(0);
      setCompletedSteps([]);
      setCollectedIngredients([]);
      setCollectedUtensils([]);
      setLearnedVerbs([]);
      setIsBaking(false);
      setIsComplete(false);
      setStarsEarned(0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-200 via-amber-200 to-yellow-200">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <Home className="w-6 h-6 text-orange-600" />
            <span className="font-bold text-orange-600">Home</span>
          </button>

          <h1 className="text-3xl font-bold text-orange-700 flex items-center gap-2">
            <span>🧁</span>
            <span>Kitchen Fun</span>
            <span>👩‍🍳</span>
          </h1>

          <div className="flex items-center gap-4">
            <div className="text-center bg-white rounded-full px-4 py-2 shadow-md">
              <div className="text-sm text-gray-600">Stars</div>
              <div className="text-xl font-bold text-yellow-500">⭐ {starsEarned}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        {!selectedRecipe ? (
          // Recipe Selection View
          <div className="max-w-6xl mx-auto">
            {/* Instructions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-orange-700 mb-2">🧁 Welcome to the Kitchen!</h2>
              <p className="text-gray-700">
                Choose a recipe to start baking! Learn ingredients, utensils, and cooking verbs!
              </p>
            </div>

            {/* Recipe Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CAKE_RECIPES.map((recipe) => (
                <button
                  key={recipe.recipeId}
                  onClick={() => handleRecipeSelect(recipe)}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <div className="text-8xl mb-4">{recipe.emoji}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
                  <p className="text-gray-600 mb-4">{recipe.description}</p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-600">Difficulty:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        recipe.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                        recipe.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {recipe.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-600">Time:</span>
                      <span className="px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-700">
                        {recipe.prepTime} min
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-orange-600">
                    <span className="font-bold">Start Baking</span>
                    <span>→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Cooking View
          <div className="max-w-6xl mx-auto space-y-4">
            {/* Recipe Header */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-4"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-bold">Back to Recipes</span>
              </button>

              <div className="flex items-center gap-4">
                <div className="text-8xl">{selectedRecipe.emoji}</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800">{selectedRecipe.name}</h2>
                  <p className="text-gray-600">{selectedRecipe.description}</p>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span className="font-bold">Reset</span>
                </button>
              </div>
            </div>

            {!isBaking ? (
              // Preparation Phase
              <div className="space-y-4">
                {/* Progress Overview */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-orange-700 mb-4">📋 Preparation Checklist</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Ingredients Progress */}
                    <div>
                      <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <span>🌾</span>
                        <span>Ingredients</span>
                        <span className="text-sm text-gray-600">
                          ({collectedIngredients.length}/{selectedRecipe.requiredIngredients.length})
                        </span>
                      </h4>
                      <div className="space-y-2">
                        {selectedRecipe.requiredIngredients.map((id) => {
                          const ingredient = KITCHEN_INGREDIENTS.find(i => i.ingredientId === id);
                          const isCollected = collectedIngredients.includes(id);
                          return (
                            <div
                              key={id}
                              className={`flex items-center gap-2 p-2 rounded-lg ${
                                isCollected ? 'bg-green-100' : 'bg-gray-100'
                              }`}
                            >
                              {isCollected ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400" />
                              )}
                              <span className="font-bold">{ingredient?.emoji}</span>
                              <span>{ingredient?.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Utensils Progress */}
                    <div>
                      <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <span>🥣</span>
                        <span>Utensils</span>
                        <span className="text-sm text-gray-600">
                          ({collectedUtensils.length}/{selectedRecipe.requiredUtensils.length})
                        </span>
                      </h4>
                      <div className="space-y-2">
                        {selectedRecipe.requiredUtensils.map((id) => {
                          const utensil = KITCHEN_UTENSILS.find(u => u.utensilId === id);
                          const isCollected = collectedUtensils.includes(id);
                          return (
                            <div
                              key={id}
                              className={`flex items-center gap-2 p-2 rounded-lg ${
                                isCollected ? 'bg-green-100' : 'bg-gray-100'
                              }`}
                            >
                              {isCollected ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400" />
                              )}
                              <span className="font-bold">{utensil?.emoji}</span>
                              <span>{utensil?.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Start Baking Button */}
                  {collectedIngredients.length === selectedRecipe.requiredIngredients.length &&
                   collectedUtensils.length === selectedRecipe.requiredUtensils.length && (
                    <button
                      onClick={handleStartBaking}
                      className="w-full mt-4 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all font-bold text-xl"
                    >
                      <Play className="w-8 h-8" />
                      <span>Start Baking!</span>
                    </button>
                  )}
                </div>

                {/* Ingredients Collection */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-orange-700 mb-4">🌾 Ingredients</h3>
                  <p className="text-gray-600 mb-4">Click on ingredients to learn about them!</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {KITCHEN_INGREDIENTS.map((ingredient) => {
                      const isRequired = selectedRecipe.requiredIngredients.includes(ingredient.ingredientId);
                      const isCollected = collectedIngredients.includes(ingredient.ingredientId);

                      return (
                        <button
                          key={ingredient.ingredientId}
                          onClick={() => handleIngredientClick(ingredient)}
                          disabled={!isRequired || isCollected}
                          className={`
                            relative bg-white rounded-2xl p-4 shadow-md border-2
                            transition-all
                            ${isRequired && !isCollected
                              ? 'cursor-pointer hover:scale-105 hover:shadow-lg border-orange-300'
                              : isCollected
                              ? 'border-green-300 bg-green-50'
                              : 'opacity-40 cursor-not-allowed border-gray-200'
                            }
                          `}
                        >
                          <div className="text-5xl mb-2">{ingredient.emoji}</div>
                          <div className="font-bold text-gray-800">{ingredient.name}</div>
                          <div className="text-xs text-gray-500">{ingredient.pronunciation}</div>

                          {isCollected && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                            </div>
                          )}

                          {isRequired && !isCollected && (
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-200 to-amber-200 rounded-2xl opacity-50 blur -z-10"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Utensils Collection */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-orange-700 mb-4">🥣 Utensils</h3>
                  <p className="text-gray-600 mb-4">Click on utensils to learn about them!</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {KITCHEN_UTENSILS.map((utensil) => {
                      const isRequired = selectedRecipe.requiredUtensils.includes(utensil.utensilId);
                      const isCollected = collectedUtensils.includes(utensil.utensilId);

                      return (
                        <button
                          key={utensil.utensilId}
                          onClick={() => handleUtensilClick(utensil)}
                          disabled={!isRequired || isCollected}
                          className={`
                            relative bg-white rounded-2xl p-4 shadow-md border-2
                            transition-all
                            ${isRequired && !isCollected
                              ? 'cursor-pointer hover:scale-105 hover:shadow-lg border-orange-300'
                              : isCollected
                              ? 'border-green-300 bg-green-50'
                              : 'opacity-40 cursor-not-allowed border-gray-200'
                            }
                          `}
                        >
                          <div className="text-5xl mb-2">{utensil.emoji}</div>
                          <div className="font-bold text-gray-800">{utensil.name}</div>
                          <div className="text-xs text-gray-500">{utensil.pronunciation}</div>

                          {isCollected && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                            </div>
                          )}

                          {isRequired && !isCollected && (
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-200 to-amber-200 rounded-2xl opacity-50 blur -z-10"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Verbs Learning */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-orange-700 mb-4">🔄 Cooking Verbs</h3>
                  <p className="text-gray-600 mb-4">Learn the cooking actions!</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {KITCHEN_VERBS.map((verb) => {
                      const isLearned = learnedVerbs.includes(verb.verbId);

                      return (
                        <button
                          key={verb.verbId}
                          onClick={() => handleVerbClick(verb)}
                          className={`
                            relative bg-white rounded-2xl p-4 shadow-md border-2
                            transition-all
                            ${isLearned
                              ? 'border-blue-300 bg-blue-50'
                              : 'cursor-pointer hover:scale-105 hover:shadow-lg border-orange-300'
                            }
                          `}
                        >
                          <div className="text-4xl mb-2">{verb.emoji}</div>
                          <div className="font-bold text-gray-800 text-sm">{verb.name}</div>
                          <div className="text-xs text-gray-500">{verb.pronunciation}</div>

                          {isLearned && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              // Baking Steps View
              <div className="space-y-4">
                {!isComplete ? (
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                    <h3 className="text-2xl font-bold text-orange-700 mb-4">👩‍🍳 Baking Steps</h3>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span className="font-bold">
                          Step {currentStep} of {selectedRecipe.steps.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-500"
                          style={{ width: `${(currentStep / selectedRecipe.steps.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Current Step */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200 mb-4">
                      <div className="flex items-start gap-4">
                        <div className="text-6xl">
                          {currentStep <= selectedRecipe.steps.length ? '👆' : '✅'}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-800 mb-2">
                            Step {currentStep}
                          </h4>
                          <p className="text-lg text-gray-700 mb-4">
                            {selectedRecipe.steps[currentStep - 1]?.instruction}
                          </p>

                          {/* Items needed for this step */}
                          <div className="flex flex-wrap gap-2">
                            {selectedRecipe.steps[currentStep - 1]?.ingredients.map((id) => {
                              const ingredient = KITCHEN_INGREDIENTS.find(i => i.ingredientId === id);
                              return (
                                <span
                                  key={id}
                                  className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold"
                                >
                                  {ingredient?.emoji} {ingredient?.name}
                                </span>
                              );
                            })}
                            {selectedRecipe.steps[currentStep - 1]?.utensils.map((id) => {
                              const utensil = KITCHEN_UTENSILS.find(u => u.utensilId === id);
                              return (
                                <span
                                  key={id}
                                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold"
                                >
                                  {utensil?.emoji} {utensil?.name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          if (currentStep > 1) {
                            setCurrentStep(currentStep - 1);
                          }
                        }}
                        disabled={currentStep === 1}
                        className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous Step
                      </button>
                      <button
                        onClick={() => handleStepComplete(currentStep)}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all"
                      >
                        {currentStep === selectedRecipe.steps.length ? 'Finish!' : 'Complete Step'}
                      </button>
                    </div>

                    {/* All Steps Overview */}
                    <div className="mt-6">
                      <h4 className="font-bold text-lg mb-3">All Steps:</h4>
                      <div className="space-y-2">
                        {selectedRecipe.steps.map((step) => {
                          const isCompleted = completedSteps.includes(step.stepNumber);
                          const isCurrent = currentStep === step.stepNumber;

                          return (
                            <div
                              key={step.stepNumber}
                              className={`
                                flex items-start gap-3 p-3 rounded-lg
                                ${isCompleted ? 'bg-green-100' : isCurrent ? 'bg-orange-100' : 'bg-gray-100'}
                              `}
                            >
                              <div className="flex-shrink-0">
                                {isCompleted ? (
                                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                                ) : (
                                  <Circle className="w-6 h-6 text-gray-400" />
                                )}
                              </div>
                              <div>
                                <div className="font-bold">Step {step.stepNumber}</div>
                                <div className="text-sm text-gray-700">{step.instruction}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Completion View
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg text-center">
                    <div className="text-9xl mb-4">🎉</div>
                    <h3 className="text-3xl font-bold text-orange-700 mb-4">Congratulations!</h3>
                    <p className="text-xl text-gray-700 mb-6">
                      Your {selectedRecipe.name} is ready!
                    </p>

                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-300 mb-6">
                      <div className="text-5xl mb-2">⭐</div>
                      <div className="text-2xl font-bold text-yellow-600">
                        {starsEarned} Stars Earned!
                      </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all"
                      >
                        <RotateCcw className="w-5 h-5" />
                        <span>Make Again</span>
                      </button>
                      <button
                        onClick={goBack}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 transition-all"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Other Recipes</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
