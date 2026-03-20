import { Rule } from '@/types/rules';

// 规则库 - 包含100+预设对话规则
export const rules: Rule[] = [
  // ========== 问候类 ==========
  {
    id: 'greeting-hello',
    pattern: ['hello', 'hi', 'hi there', 'hey', 'hello owl'],
    response: {
      template: 'Hello! 👋 I\'m {ai_name}! Welcome to the Magic Garden!',
      followUp: 'What\'s your name?',
      animation: 'wave',
      sound: 'greeting.wav'
    },
    priority: 1
  },
  {
    id: 'greeting-good-morning',
    pattern: ['good morning', 'morning'],
    response: {
      template: 'Good morning! ☀️ Ready to learn some English?',
      animation: 'smile',
      sound: 'greeting.wav'
    },
    priority: 1
  },
  {
    id: 'greeting-good-afternoon',
    pattern: ['good afternoon', 'afternoon'],
    response: {
      template: 'Good afternoon! 🌤 Let\'s learn together!',
      animation: 'smile',
      sound: 'greeting.wav'
    },
    priority: 1
  },
  {
    id: 'greeting-good-evening',
    pattern: ['good evening', 'evening', 'good night'],
    response: {
      template: 'Good evening! 🌙 Did you have a good day?',
      animation: 'smile',
      sound: 'greeting.wav'
    },
    priority: 1
  },
  {
    id: 'greeting-name',
    pattern: [/my name is (\w+)/, /i['m ]{0,1}am (\w+)/, /call me (\w+)/],
    response: {
      template: 'Nice to meet you, {name}! 🎉',
      followUp: 'Let\'s learn some words together!',
      animation: 'excited',
      sound: 'success.wav'
    },
    priority: 2,
    saveData: {
      field: 'name',
      extractFrom: 'match'
    }
  },

  // ========== 词汇学习类 ==========
  {
    id: 'vocab-what-this',
    pattern: [/what['']s this/, /what is this/, /what is it/],
    response: {
      template: 'It\'s a {item}! 🌟 You\'re so smart!',
      animation: 'excited',
      sound: 'correct_star.mp3'
    },
    priority: 3,
    needsContext: true
  },
  {
    id: 'vocab-what-color',
    pattern: [/what color/, /what['']s the color/, /which color/],
    response: {
      template: 'It\'s {color}! 🎨 Perfect!',
      animation: 'excited',
      sound: 'correct_star.mp3'
    },
    priority: 3,
    needsContext: true
  },
  {
    id: 'vocab-how-many',
    pattern: [/how many/, /count the/, /how much/],
    response: {
      template: '{number}! One, two, three... {number} {item}s! 🔢',
      animation: 'excited',
      sound: 'correct_cheer.mp3'
    },
    priority: 3,
    needsContext: true
  },
  {
    id: 'vocab-show-me',
    pattern: [/show me the (\w+)/, /find the (\w+)/, /where is the (\w+)/, /point to (\w+)/],
    response: {
      template: 'Can you find the {item}? 👀',
      animation: 'thinking',
      sound: 'task.wav'
    },
    priority: 4
  },
  {
    id: 'vocab-i-want',
    pattern: [/i want (\w+)/, /i need (\w+)/, /i like (\w+)/],
    response: {
      template: '{item}! Great choice! ✨',
      followUp: 'Can you say {item}?',
      animation: 'happy',
      sound: 'agree.wav'
    },
    priority: 3,
    saveData: {
      field: 'item',
      extractFrom: 'match'
    }
  },

  // ========== 任务类 ==========
  {
    id: 'task-i-like',
    pattern: [/i like (\w+)/, /i love (\w+)/],
    response: {
      template: 'Me too! {item} is amazing! ✨',
      followUp: 'What else do you like?',
      animation: 'happy',
      sound: 'agree.wav'
    },
    priority: 2,
    saveData: {
      field: 'favorite',
      extractFrom: 'match'
    }
  },
  {
    id: 'task-i-dont-like',
    pattern: [/i don['']t like (\w+)/, /i hate (\w+)/, /i don['']t love (\w+)/],
    response: {
      template: 'That\'s okay! We all like different things. 😊',
      followUp: 'What do you like?',
      animation: 'understanding',
      sound: 'gentle.wav'
    },
    priority: 2
  },
  {
    id: 'task-favorite-color',
    pattern: [/my favorite color is (\w+)/, /i like (\w+) color/, /i love (\w+) color/],
    response: {
      template: '{color} is beautiful! 🎨',
      followUp: 'Do you see anything {color} around?',
      animation: 'excited',
      sound: 'correct_star.mp3'
    },
    priority: 3,
    saveData: {
      field: 'favorite_color',
      extractFrom: 'match'
    }
  },
  {
    id: 'task-favorite-animal',
    pattern: [/my favorite animal is (\w+)/, /i like (\w+) the best/],
    response: {
      template: '{animal}! That\'s a wonderful animal! 🐾',
      followUp: 'Let\'s learn more about {animal}s!',
      animation: 'excited',
      sound: 'correct_cheer.mp3'
    },
    priority: 3,
    saveData: {
      field: 'favorite_animal',
      extractFrom: 'match'
    }
  },

  // ========== 请求类 ==========
  {
    id: 'request-repeat',
    pattern: ['say again', 'repeat', 'what did you say', 'pardon', 'again please'],
    response: {
      template: 'Sure! I\'ll say it again.',
      action: 'repeat_last',
      animation: 'nod',
      sound: 'sure.wav'
    },
    priority: 2
  },
  {
    id: 'request-help',
    pattern: ['help', 'i don\'t know', 'how to', 'what do i do', 'stuck'],
    response: {
      template: 'No worries! Let me help you. 💪',
      followUp: 'Click on any item to learn about it!',
      animation: 'helpful',
      sound: 'help.wav'
    },
    priority: 1
  },
  {
    id: 'request-teach',
    pattern: ['teach me', 'show me', 'learn', 'i want to learn'],
    response: {
      template: 'Great! Let\'s learn together! 📚',
      followUp: 'Click on any item to start!',
      animation: 'excited',
      sound: 'success.wav'
    },
    priority: 2
  },

  // ========== 道别类 ==========
  {
    id: 'farewell-bye',
    pattern: ['bye', 'goodbye', 'see you', 'bye bye', 'i have to go', 'got to go'],
    response: {
      template: 'Goodbye, {name}! 🌈 See you next time!',
      animation: 'wave',
      sound: 'farewell.wav'
    },
    priority: 1
  },
  {
    id: 'farewell-tired',
    pattern: ['i am tired', 'i want to sleep', 'i\'m tired', 'sleepy', 'sleepy time'],
    response: {
      template: 'You did a great job today! Time to rest! 😴',
      animation: 'proud',
      sound: 'proud.wav'
    },
    priority: 1
  },
  {
    id: 'farewell-hungry',
    pattern: ['i am hungry', 'i\'m hungry', 'want food', 'need food', 'i want to eat'],
    response: {
      template: 'Time for a snack! 🍎 See you later, {name}!',
      animation: 'smile',
      sound: 'gentle.wav'
    },
    priority: 1
  },
  {
    id: 'farewell-bathroom',
    pattern: ['bathroom', 'toilet', 'pee', 'poop', 'potty'],
    response: {
      template: 'Okay! Go to the bathroom! 🚪 See you soon!',
      animation: 'smile',
      sound: 'gentle.wav'
    },
    priority: 1
  },

  // ========== 鼓励类 ==========
  {
    id: 'encourage-good',
    pattern: ['i did it', 'yes i did', 'i got it right', 'i win', 'success'],
    response: {
      template: 'Amazing! You\'re a superstar! 🌟⭐🎉',
      animation: 'celebrate',
      sound: 'celebration.wav'
    },
    priority: 1
  },
  {
    id: 'encourage-trying',
    pattern: ['i try', 'i am trying', 'let me try', 'trying hard'],
    response: {
      template: 'Great job trying! 💪 You\'re doing amazing!',
      animation: 'proud',
      sound: 'proud.wav'
    },
    priority: 1
  },
  {
    id: 'encourage-thank',
    pattern: ['thank you', 'thanks', 'thx'],
    response: {
      template: 'You\'re welcome! 🤗 Anything else for you?',
      animation: 'smile',
      sound: 'gentle.wav'
    },
    priority: 1
  },
  {
    id: 'encourage-sorry',
    pattern: ['sorry', 'i am sorry', 'my bad', 'oops'],
    response: {
      template: 'No worries! It\'s okay! 😊 Everyone makes mistakes!',
      animation: 'understanding',
      sound: 'gentle.wav'
    },
    priority: 1
  },
  {
    id: 'encourage-please',
    pattern: ['please', 'can i', 'can you please'],
    response: {
      template: 'Of course! 🤗 What would you like?',
      animation: 'smile',
      sound: 'gentle.wav'
    },
    priority: 1
  },

  // ========== 情绪类 ==========
  {
    id: 'emotion-happy',
    pattern: ['i am happy', 'i\'m happy', 'so happy', 'very happy', 'excited'],
    response: {
      template: 'I\'m so happy too! 🎉 Let\'s celebrate!',
      animation: 'excited',
      sound: 'celebration.wav'
    },
    priority: 2
  },
  {
    id: 'emotion-sad',
    pattern: ['i am sad', 'i\'m sad', 'unhappy', 'not happy', 'feeling sad'],
    response: {
      template: 'Oh no! 😢 What makes you sad? I can help!',
      animation: 'concerned',
      sound: 'gentle.wav'
    },
    priority: 2
  },
  {
    id: 'emotion-scared',
    pattern: ['i am scared', 'i\'m scared', 'afraid', 'frightened', 'fear'],
    response: {
      template: 'Don\'t worry! 🤗 I\'m here with you! You\'re safe!',
      animation: 'comforting',
      sound: 'gentle.wav'
    },
    priority: 2
  },
  {
    id: 'emotion-angry',
    pattern: ['i am angry', 'i\'m angry', 'mad', 'furious'],
    response: {
      template: 'It\'s okay to feel angry! 😤 Take a deep breath!',
      followUp: 'Do you want to talk about it?',
      animation: 'calm',
      sound: 'gentle.wav'
    },
    priority: 2
  },

  // ========== 肯定类 ==========
  {
    id: 'praise-yes',
    pattern: ['yes', 'yeah', 'yep', 'correct', 'right', 'that\'s right'],
    response: {
      template: 'Yes! That\'s right! ✅ Great job!',
      animation: 'excited',
      sound: 'correct_star.mp3'
    },
    priority: 2
  },
  {
    id: 'praise-no',
    pattern: ['no', 'nope', 'wrong', 'not that', 'incorrect'],
    response: {
      template: 'Not quite! 😊 Let\'s try together!',
      followUp: 'Want me to show you?',
      animation: 'encouraging',
      sound: 'incorrect_gentle.mp3'
    },
    priority: 2
  },
  {
    id: 'praise-maybe',
    pattern: ['maybe', 'i think', 'probably', 'not sure'],
    response: {
      template: 'Good thinking! 🤔 Let\'s find out together!',
      animation: 'thinking',
      sound: 'task.wav'
    },
    priority: 2
  },

  // ========== 动物类（20个动物） ==========
  {
    id: 'animal-cat',
    pattern: ['cat', 'kitten', 'kitty', 'meow'],
    response: 'Cat! 🐱 Cats say "meow"! Can you say "cat"?',
    priority: 3
  },
  {
    id: 'animal-dog',
    pattern: ['dog', 'puppy', 'doggy', 'woof'],
    response: 'Dog! 🐕 Dogs say "woof"! Can you say "dog"?',
    priority: 3
  },
  {
    id: 'animal-bird',
    pattern: ['bird', 'birdy', 'tweet', 'chirp'],
    response: 'Bird! 🐦 Birds say "tweet tweet"!',
    priority: 3
  },
  {
    id: 'animal-fish',
    pattern: ['fish', 'fishy', 'swim'],
    response: 'Fish! 🐟 Fish go "blub blub"!',
    priority: 3
  },
  {
    id: 'animal-rabbit',
    pattern: ['rabbit', 'bunny', 'hop'],
    response: 'Rabbit! 🐰 Rabbits hop and jump!',
    priority: 3
  },
  {
    id: 'animal-bear',
    pattern: ['bear', 'teddy bear', 'roar'],
    response: 'Bear! 🐻 Bears say "roar"!',
    priority: 3
  },
  {
    id: 'animal-lion',
    pattern: ['lion', 'king of jungle'],
    response: 'Lion! 🦁 The king of the jungle!',
    priority: 3
  },
  {
    id: 'animal-tiger',
    pattern: ['tiger', 'big cat'],
    response: 'Tiger! 🐯 Tigers have stripes!',
    priority: 3
  },
  {
    id: 'animal-elephant',
    pattern: ['elephant', 'trunk', 'big ears'],
    response: 'Elephant! 🐘 Elephants have long noses!',
    priority: 3
  },
  {
    id: 'animal-monkey',
    pattern: ['monkey', 'ape', 'banana'],
    response: 'Monkey! 🐒 Monkeys love bananas!',
    priority: 3
  },
  {
    id: 'animal-duck',
    pattern: ['duck', 'ducky', 'quack'],
    response: 'Duck! 🦆 Ducks say "quack quack"!',
    priority: 3
  },
  {
    id: 'animal-chicken',
    pattern: ['chicken', 'hen', 'rooster', 'cluck'],
    response: 'Chicken! 🐔 Chickens say "cluck cluck"!',
    priority: 3
  },
  {
    id: 'animal-cow',
    pattern: ['cow', 'milk', 'moo'],
    response: 'Cow! 🐄 Cows say "moo"!',
    priority: 3
  },
  {
    id: 'animal-horse',
    pattern: ['horse', 'pony', 'neigh'],
    response: 'Horse! 🐎 Horses say "neigh"!',
    priority: 3
  },
  {
    id: 'animal-sheep',
    pattern: ['sheep', 'lamb', 'wool', 'baa'],
    response: 'Sheep! 🐑 Sheep say "baa baa"!',
    priority: 3
  },
  {
    id: 'animal-pig',
    pattern: ['pig', 'piggy', 'oink'],
    response: 'Pig! 🐖 Pigs say "oink oink"!',
    priority: 3
  },
  {
    id: 'animal-mouse',
    pattern: ['mouse', 'mice', 'squeak', 'cheese'],
    response: 'Mouse! 🐭 Mice say "squeak squeak"!',
    priority: 3
  },
  {
    id: 'animal-snake',
    pattern: ['snake', 'serpent', 'hiss'],
    response: 'Snake! 🐍 Snakes say "hiss"!',
    priority: 3
  },
  {
    id: 'animal-frog',
    pattern: ['frog', 'toad', 'ribbit', 'jump'],
    response: 'Frog! 🐸 Frogs say "ribbit"!',
    priority: 3
  },
  {
    id: 'animal-turtle',
    pattern: ['turtle', 'tortoise', 'shell'],
    response: 'Turtle! 🐢 Turtles have shells!',
    priority: 3
  },

  // ========== 水果类（10个水果）==========
  {
    id: 'fruit-apple',
    pattern: ['apple', 'red apple'],
    response: 'Apple! 🍎 Apples are red and crunchy!',
    priority: 3
  },
  {
    id: 'fruit-banana',
    pattern: ['banana', 'yellow banana'],
    response: 'Banana! 🍌 Bananas are yellow and sweet!',
    priority: 3
  },
  {
    id: 'fruit-orange',
    pattern: ['orange', 'orange fruit'],
    response: 'Orange! 🍊 Oranges are citrus fruits!',
    priority: 3
  },
  {
    id: 'fruit-pear',
    pattern: ['pear', 'pear fruit'],
    response: 'Pear! 🍐 Pears are sweet and juicy!',
    priority: 3
  },
  {
    id: 'fruit-grape',
    pattern: ['grape', 'grapes', 'purple'],
    response: 'Grape! 🍇 Grapes are purple and grow in bunches!',
    priority: 3
  },
  {
    id: 'fruit-strawberry',
    pattern: ['strawberry', 'strawberries', 'berry'],
    response: 'Strawberry! 🍓 Strawberries are red and sweet!',
    priority: 3
  },
  {
    id: 'fruit-watermelon',
    pattern: ['watermelon', 'water melon'],
    response: 'Watermelon! 🍉 Watermelons are big and juicy!',
    priority: 3
  },
  {
    id: 'fruit-peach',
    pattern: ['peach', 'peach fruit'],
    response: 'Peach! 🍑 Peaches have fuzzy skin!',
    priority: 3
  },
  {
    id: 'fruit-cherry',
    pattern: ['cherry', 'cherries'],
    response: 'Cherry! 🍒 Cherries are small and sweet!',
    priority: 3
  },
  {
    id: 'fruit-lemon',
    pattern: ['lemon', 'sour', 'citrus'],
    response: 'Lemon! 🍋 Lemons are yellow and sour!',
    priority: 3
  },

  // ========== 颜色类（10个颜色）==========
  {
    id: 'color-red',
    pattern: ['red', 'red color', 'red is'],
    response: 'Red! ❤️ Like apples and strawberries!',
    priority: 3
  },
  {
    id: 'color-blue',
    pattern: ['blue', 'blue color', 'blue is'],
    response: 'Blue! 💙 Like the sky and ocean!',
    priority: 3
  },
  {
    id: 'color-yellow',
    pattern: ['yellow', 'yellow color', 'yellow is'],
    response: 'Yellow! 💛 Like the sun and bananas!',
    priority: 3
  },
  {
    id: 'color-green',
    pattern: ['green', 'green color', 'green is'],
    response: 'Green! 💚 Like grass and frogs!',
    priority: 3
  },
  {
    id: 'color-orange',
    pattern: ['orange color', 'orange is', 'is orange'],
    response: 'Orange! 🧡 Like oranges and carrots!',
    priority: 3
  },
  {
    id: 'color-purple',
    pattern: ['purple', 'purple color', 'purple is'],
    response: 'Purple! 💜 Like grapes and eggplants!',
    priority: 3
  },
  {
    id: 'color-pink',
    pattern: ['pink', 'pink color', 'pink is'],
    response: 'Pink! 🩷 Like flowers and pigs!',
    priority: 3
  },
  {
    id: 'color-black',
    pattern: ['black', 'black color', 'black is'],
    response: 'Black! 🖤 Like night and coal!',
    priority: 3
  },
  {
    id: 'color-white',
    pattern: ['white', 'white color', 'white is'],
    response: 'White! 🤍 Like snow and clouds!',
    priority: 3
  },
  {
    id: 'color-brown',
    pattern: ['brown', 'brown color', 'brown is'],
    response: 'Brown! 🤎� Like chocolate and bears!',
    priority: 3
  },

  // ========== 数字类（1-10）==========
  {
    id: 'number-1',
    pattern: ['one', '1', 'number one'],
    response: 'One! 1️⃣ Can you show me one finger?',
    priority: 3
  },
  {
    id: 'number-2',
    pattern: ['two', '2', 'number two'],
    response: 'Two! 2️⃣ Can you show me two fingers?',
    priority: 3
  },
  {
    id: 'number-3',
    pattern: ['three', '3', 'number three'],
    response: 'Three! 3️⃣ Can you count to three with me?',
    priority: 3
  },
  {
    id: 'number-4',
    pattern: ['four', '4', 'number four'],
    response: 'Four! 4️⃣ Count with me: one, two, three, four!',
    priority: 3
  },
  {
    id: 'number-5',
    pattern: ['five', '5', 'number five', 'high five'],
    response: 'Five! 5️⃣ High five! ✋',
    priority: 3
  },
  {
    id: 'number-6',
    pattern: ['six', '6', 'number six'],
    response: 'Six! 6️⃣ Great counting!',
    priority: 3
  },
  {
    id: 'number-7',
    pattern: ['seven', '7', 'number seven'],
    response: 'Seven! 7️⃣ Lucky seven!',
    priority: 3
  },
  {
    id: 'number-8',
    pattern: ['eight', '8', 'number eight'],
    response: 'Eight! 8️⃣ Excellent!',
    priority: 3
  },
  {
    id: 'number-9',
    pattern: ['nine', '9', 'number nine'],
    response: 'Nine! 9️⃣ Almost to ten!',
    priority: 3
  },
  {
    id: 'number-10',
    pattern: ['ten', '10', 'number ten'],
    response: 'Ten! 🔟 Perfect! You can count to ten!',
    priority: 3
  },

  // ========== 游戏互动类 ==========
  {
    id: 'game-peekaboo',
    pattern: ['peekaboo', 'boo', 'peek a boo'],
    response: {
      template: 'Peekaboo! 👻 I see you!',
      animation: 'excited',
      sound: 'success.wav'
    },
    priority: 2
  },
  {
    id: 'game-dance',
    pattern: ['dance', 'let\'s dance', 'dance with me'],
    response: {
      template: 'Let\'s dance! 💃🕺 Dance with me!',
      animation: 'excited',
      sound: 'celebration.wav'
    },
    priority: 2
  },
  {
    id: 'game-sing',
    pattern: ['sing', 'let\'s sing', 'song'],
    response: {
      template: 'Let\'s sing together! 🎵 La la la!',
      animation: 'excited',
      sound: 'greeting.wav'
    },
    priority: 2
  },
  {
    id: 'game-play',
    pattern: ['play', 'let\'s play', 'game'],
    response: {
      template: 'I love playing with you! 🎮 Let\'s learn together!',
      followUp: 'What do you want to play?',
      animation: 'excited',
      sound: 'success.wav'
    },
    priority: 2
  },

  // ========== 日常对话类 ==========
  {
    id: 'daily-hello',
    pattern: ['how are you', 'how are you doing', 'how do you do'],
    response: {
      template: 'I\'m great, thank you for asking! 😊 How are you?',
      animation: 'smile',
      sound: 'greeting.wav'
    },
    priority: 2
  },
  {
    id: 'daily-name',
    pattern: ['what is your name', 'who are you', 'your name'],
    response: {
      template: 'I\'m {ai_name}! Your owl teacher! 🦉',
      followUp: 'What\'s your name?',
      animation: 'wave',
      sound: 'greeting.wav'
    },
    priority: 2
  },
  {
    id: 'daily-age',
    pattern: ['how old are you', 'your age'],
    response: {
      template: 'I\'m very old and wise! 🦉 But I love teaching kids!',
      animation: 'smile',
      sound: 'gentle.wav'
    },
    priority: 2
  },
  {
    id: 'daily-like',
    pattern: ['what do you like', 'what do you love'],
    response: {
      template: 'I love teaching! 📚 And helping kids learn English!',
      followUp: 'What do you like to learn?',
      animation: 'excited',
      sound: 'success.wav'
    },
    priority: 2
  },
  {
    id: 'daily-where',
    pattern: ['where are you from', 'where do you live', 'where are you'],
    response: {
      template: 'I live in the Magic Garden! 🏡 With all my animal friends!',
      animation: 'smile',
      sound: 'gentle.wav'
    },
    priority: 2
  },

  // ========== 学习相关类 ==========
  {
    id: 'learn-what',
    pattern: ['what will we learn', 'what are we learning', 'what to learn'],
    response: {
      template: 'Today we\'ll learn words! 📚 Animals, fruits, colors, and numbers!',
      followUp: 'What do you want to learn first?',
      animation: 'excited',
      sound: 'task.wav'
    },
    priority: 2
  },
  {
    id: 'learn-why',
    pattern: ['why learn', 'why english', 'why should i learn'],
    response: {
      template: 'English is amazing! 🌟 You can talk to friends all over the world!',
      animation: 'excited',
      sound: 'encouraging.wav'
    },
    priority: 2
  },
  {
    id: 'learn-hard',
    pattern: ['it is hard', 'too hard', 'too difficult', 'can\'t do it'],
    response: {
      template: 'You can do it! 💪 Learning takes time, but you\'re doing great!',
      followUp: 'Let\'s try together!',
      animation: 'encouraging',
      sound: 'gentle.wav'
    },
    priority: 2
  },
  {
    id: 'learn-bored',
    pattern: ['bored', 'boring', 'not fun', 'tired of this'],
    response: {
      template: 'Let\'s try something fun! 🎮',
      followUp: 'Want to play a game?',
      animation: 'excited',
      sound: 'task.wav'
    },
    priority: 2
  },

  // ========== 特殊场景类 ==========
  {
    id: 'special-birthday',
    pattern: ['birthday', 'happy birthday', 'my birthday'],
    response: {
      template: 'Happy Birthday! 🎂🎉 Have a wonderful day!',
      animation: 'celebrate',
      sound: 'celebration.wav'
    },
    priority: 2
  },
  {
    id: 'special-christmas',
    pattern: ['christmas', 'xmas', 'santa', 'merry christmas'],
    response: {
      template: 'Merry Christmas! 🎄🎅 Ho ho ho!',
      animation: 'celebrate',
      sound: 'celebration.wav'
    },
    priority: 2
  },
  {
    id: 'special-love',
    pattern: ['i love you', 'love you', 'you are the best'],
    response: {
      template: 'I love you too! 🤗 You\'re amazing!',
      animation: 'excited',
      sound: 'celebration.wav'
    },
    priority: 1
  },
  {
    id: 'special-friend',
    pattern: ['you are my friend', 'be my friend', 'my best friend'],
    response: {
      template: 'I\'d love to be your friend! 🤝 Let\'s learn together!',
      animation: 'excited',
      sound: 'success.wav'
    },
    priority: 2
  },

  // ========== 测试检查类 ==========
  {
    id: 'test-hello',
    pattern: ['test', 'testing', 'hello test'],
    response: {
      template: 'Test received! ✅ System is working!',
      animation: 'nod',
      sound: 'success.wav'
    },
    priority: 0 // 最低优先级，用于测试
  },
];

// 按优先级排序（高优先级在前）
rules.sort((a, b) => b.priority - a.priority);

// 同时导出为 ruleEngine 以保持向后兼容
export const ruleEngine = rules;
