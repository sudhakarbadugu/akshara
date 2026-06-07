import type { JourneyDay } from '../../types'

export const tamilJourney: JourneyDay[] = [
  // ===================== WEEK 1: WORD FOUNDATION =====================

  // ─── Day 1: Greetings ───
  {
    day: 1,
    week: 1,
    theme: 'Greetings',
    subtitle: 'Master basic greetings and introductions',
    icon: '👋',
    dailyGoal: 'Learn 6 common greetings and practice saying them',
    xpReward: 50,
    vocabulary: [
      { english: 'Hello', native: 'வணக்கம்', pronunciation: 'Vanakkam', meaning: 'Hello / Greetings' },
      { english: 'Good morning', native: 'காலை வணக்கம்', pronunciation: 'Kaalai Vanakkam', meaning: 'Good morning' },
      { english: 'Good evening', native: 'மாலை வணக்கம்', pronunciation: 'Maalai Vanakkam', meaning: 'Good evening' },
      { english: 'Thank you', native: 'நன்றி', pronunciation: 'Nandri', meaning: 'Thank you' },
      { english: 'Please', native: 'தயவுசெய்து', pronunciation: 'Thayavu seithu', meaning: 'Please' },
      { english: 'Goodbye', native: 'போய் வருகிறேன்', pronunciation: 'Poi varukiren', meaning: 'Goodbye' },
    ],
    learningCard: {
      native: 'வணக்கம்',
      english: 'Hello',
      pronunciation: 'Vanakkam',
      meaning: 'The most common greeting in Tamil',
      tip: 'வணக்கம் works for any time of day — morning, noon, or night! 🙏',
    },
    sentenceOfDay: {
      english: 'Hello! How are you?',
      native: 'வணக்கம்! நீங்கள் எப்படி இருக்கிறீர்கள்?',
      pronunciation: 'Vanakkam! Neengal eppadi irukkirgeer?',
      meaning: 'A friendly greeting asking about well-being',
      wordByWordBreakdown: [
        { word: 'வணக்கம்', meaning: 'Hello' },
        { word: 'நீங்கள்', meaning: 'you (respectful)' },
        { word: 'எப்படி', meaning: 'how' },
        { word: 'இருக்கிறீர்கள்', meaning: 'are (verb)' },
      ],
    },
    activities: [
      {
        type: 'tap-listen',
        title: 'Greeting Recall',
        instruction: 'Listen and tap the correct greeting!',
        data: {
          audioWord: 'வணக்கம்',
          options: ['வணக்கம்', 'நன்றி', 'தயவுசெய்து', 'போய் வருகிறேன்'],
          correctIndex: 0,
        },
        xpReward: 10,
      },
      {
        type: 'match',
        title: 'Greeting Match',
        instruction: 'Match each greeting with its meaning.',
        data: {
          pairs: [
            { native: 'வணக்கம்', english: 'Hello' },
            { native: 'நன்றி', english: 'Thank you' },
            { native: 'தயவுசெய்து', english: 'Please' },
            { native: 'போய் வருகிறேன்', english: 'Goodbye' },
            { native: 'காலை வணக்கம்', english: 'Good morning' },
            { native: 'மாலை வணக்கம்', english: 'Good evening' },
          ],
        },
        xpReward: 15,
      },
      {
        type: 'write',
        title: 'Trace: வணக்கம்',
        instruction: 'Trace the word "வணக்கம்" carefully.',
        data: { targetWord: 'வணக்கம்', hint: 'Vanakkam' },
        xpReward: 15,
      },
      {
        type: 'speak',
        title: 'Say the Greetings',
        instruction: 'Speak all six greetings clearly and confidently!',
        data: {
          targetWords: ['வணக்கம்', 'காலை வணக்கம்', 'மாலை வணக்கம்', 'நன்றி', 'தயவுசெய்து', 'போய் வருகிறேன்'],
        },
        xpReward: 10,
      },
    ],
    quiz: [
      {
        question: 'Which word means goodbye in Tamil?',
        options: ['வணக்கம்', 'போய் வருகிறேன்', 'தயவுசெய்து', 'நன்றி'],
        correct: 1,
        correctAnswer: 'போய் வருகிறேன்',
      },
      {
        question: 'What do you say to express gratitude?',
        options: ['வணக்கம்', 'நன்றி', 'காலை வணக்கம்', 'தயவுசெய்து'],
        correct: 1,
        correctAnswer: 'நன்றி',
      },
      {
        question: '"காலை வணக்கம்" is used at what time?',
        options: ['Night', 'Morning', 'Evening', 'Afternoon'],
        correct: 1,
        correctAnswer: 'Morning',
      },
    ],
    realLifeUsage: [
      '👉 Say "வணக்கம்" when you meet someone — it works any time of day!',
      '👉 Use "நன்றி" after receiving help, a gift, or a kind word.',
      '👉 Say "போய் வருகிறேன்" when leaving a place or ending a conversation.',
    ],
    revisionWords: [],
  },

  // ─── Day 2: Colors ───
  {
    day: 2,
    week: 1,
    theme: 'Colors',
    subtitle: 'Learn to name colors around you',
    icon: '🎨',
    dailyGoal: 'Learn 6 color words and practice reading them',
    xpReward: 50,
    vocabulary: [
      { english: 'Red', native: 'சிவப்பு', pronunciation: 'Sivappu', meaning: 'Red' },
      { english: 'Blue', native: 'நீலம்', pronunciation: 'Neelam', meaning: 'Blue' },
      { english: 'Green', native: 'பச்சை', pronunciation: 'Pachchai', meaning: 'Green' },
      { english: 'Yellow', native: 'மஞ்சள்', pronunciation: 'Manjal', meaning: 'Yellow' },
      { english: 'White', native: 'வெள்ளை', pronunciation: 'Vellai', meaning: 'White' },
      { english: 'Black', native: 'கருப்பு', pronunciation: 'Karuppu', meaning: 'Black' },
    ],
    learningCard: {
      native: 'சிவப்பு',
      english: 'Red',
      pronunciation: 'Sivappu',
      meaning: 'The color of fire, roses, and kumkum',
      tip: 'In Tamil culture, red (சிவப்பு) is auspicious and used in celebrations! 🔴',
    },
    sentenceOfDay: {
      english: 'The flower is red.',
      native: 'பூ சிவப்பு நிறம்.',
      pronunciation: 'Poo sivappu niram.',
      meaning: 'Describing the color of a flower',
      wordByWordBreakdown: [
        { word: 'பூ', meaning: 'flower' },
        { word: 'சிவப்பு', meaning: 'red' },
        { word: 'நிறம்', meaning: 'color' },
      ],
    },
    activities: [
      {
        type: 'tap-listen',
        title: 'Color Match',
        instruction: 'Listen to the color name and tap the matching word!',
        data: {
          audioWord: 'சிவப்பு',
          options: ['சிவப்பு', 'நீலம்', 'பச்சை', 'மஞ்சள்'],
          correctIndex: 0,
        },
        xpReward: 10,
      },
      {
        type: 'match',
        title: 'Color Pairs',
        instruction: 'Match each color with its description.',
        data: {
          pairs: [
            { native: 'சிவப்பு', english: 'Color of fire' },
            { native: 'நீலம்', english: 'Color of sky' },
            { native: 'பச்சை', english: 'Color of grass' },
            { native: 'மஞ்சள்', english: 'Color of turmeric' },
            { native: 'வெள்ளை', english: 'Color of milk' },
            { native: 'கருப்பு', english: 'Color of night' },
          ],
        },
        xpReward: 15,
      },
      {
        type: 'write',
        title: 'Trace: சிவப்பு',
        instruction: 'Trace the word "சிவப்பு" carefully.',
        data: { targetWord: 'சிவப்பு', hint: 'Sivappu' },
        xpReward: 15,
      },
      {
        type: 'speak',
        title: 'Say the Colors',
        instruction: 'Speak all six color names clearly. You got this!',
        data: {
          targetWords: ['சிவப்பு', 'நீலம்', 'பச்சை', 'மஞ்சள்', 'வெள்ளை', 'கருப்பு'],
        },
        xpReward: 10,
      },
    ],
    quiz: [
      {
        question: 'Which color is the sky on a clear day?',
        options: ['சிவப்பு', 'நீலம்', 'பச்சை', 'மஞ்சள்'],
        correct: 1,
        correctAnswer: 'நீலம்',
      },
      {
        question: 'What color are leaves on healthy trees?',
        options: ['நீலம்', 'மஞ்சள்', 'பச்சை', 'கருப்பு'],
        correct: 2,
        correctAnswer: 'பச்சை',
      },
      {
        question: 'What color is milk?',
        options: ['கருப்பு', 'வெள்ளை', 'சிவப்பு', 'நீலம்'],
        correct: 1,
        correctAnswer: 'வெள்ளை',
      },
    ],
    realLifeUsage: [
      '👉 Point at objects and say their color: "இந்த சட்டை நீலம்!" (This shirt is blue!)',
      '👉 When shopping: "சிவப்பு நிறத்தில் உள்ளதா?" (Do you have it in red?)',
      '👉 Describe nature: "புல் பச்சை நிறம், வானம் நீலம்." (Grass is green, sky is blue.)',
    ],
    revisionWords: ['வணக்கம்', 'நன்றி', 'போய் வருகிறேன்'],
  },

  // ─── Day 3: Fruits ───
  {
    day: 3,
    week: 1,
    theme: 'Fruits',
    subtitle: 'Delicious fruit names you will love',
    icon: '🍎',
    dailyGoal: 'Learn 6 fruit names and practice pronunciation',
    xpReward: 50,
    vocabulary: [
      { english: 'Apple', native: 'ஆப்பிள்', pronunciation: 'Aappil', meaning: 'Apple' },
      { english: 'Banana', native: 'வாழைப்பழம்', pronunciation: 'Vaazhaipazham', meaning: 'Banana' },
      { english: 'Mango', native: 'மாங்காய்', pronunciation: 'Maangaai', meaning: 'Mango' },
      { english: 'Coconut', native: 'தேங்காய்', pronunciation: 'Thengaai', meaning: 'Coconut' },
      { english: 'Grape', native: 'திராட்சை', pronunciation: 'Thiraatchai', meaning: 'Grape' },
      { english: 'Lemon', native: 'எலுமிச்சை', pronunciation: 'Elumichchai', meaning: 'Lemon' },
    ],
    learningCard: {
      native: 'மாங்காய்',
      english: 'Mango',
      pronunciation: 'Maangaai',
      meaning: 'The king of fruits — sweet, juicy, and loved across Tamil Nadu',
      tip: 'Mango season in Tamil Nadu is summer — everyone waits for it! 🥭',
    },
    sentenceOfDay: {
      english: 'I like mangoes very much.',
      native: 'எனக்கு மாங்காய் மிகவும் பிடிக்கும்.',
      pronunciation: 'Enakku maangaai migavum pidikkum.',
      meaning: 'Expressing love for mangoes',
      wordByWordBreakdown: [
        { word: 'எனக்கு', meaning: 'to me' },
        { word: 'மாங்காய்', meaning: 'mango' },
        { word: 'மிகவும்', meaning: 'very much' },
        { word: 'பிடிக்கும்', meaning: 'like' },
      ],
    },
    activities: [
      {
        type: 'tap-listen',
        title: 'Fruit Recall',
        instruction: 'Listen and tap the correct fruit name!',
        data: {
          audioWord: 'மாங்காய்',
          options: ['ஆப்பிள்', 'மாங்காய்', 'திராட்சை', 'தேங்காய்'],
          correctIndex: 1,
        },
        xpReward: 10,
      },
      {
        type: 'match',
        title: 'Fruit Basket',
        instruction: 'Match each fruit with its description.',
        data: {
          pairs: [
            { native: 'ஆப்பிள்', english: 'Round red or green fruit' },
            { native: 'வாழைப்பழம்', english: 'Long yellow fruit' },
            { native: 'மாங்காய்', english: 'Sweet tropical fruit' },
            { native: 'தேங்காய்', english: 'Hard shell, white inside' },
            { native: 'திராட்சை', english: 'Small fruits in bunches' },
            { native: 'எலுமிச்சை', english: 'Sour yellow citrus' },
          ],
        },
        xpReward: 15,
      },
      {
        type: 'write',
        title: 'Trace: மாங்காய்',
        instruction: 'Trace the word "மாங்காய்" carefully.',
        data: { targetWord: 'மாங்காய்', hint: 'Maangaai' },
        xpReward: 15,
      },
      {
        type: 'speak',
        title: 'Fruit Stand',
        instruction: 'Say each fruit name clearly like you are at a market!',
        data: {
          targetWords: ['ஆப்பிள்', 'வாழைப்பழம்', 'மாங்காய்', 'தேங்காய்', 'திராட்சை', 'எலுமிச்சை'],
        },
        xpReward: 10,
      },
    ],
    quiz: [
      {
        question: 'Which fruit is long and yellow?',
        options: ['ஆப்பிள்', 'வாழைப்பழம்', 'மாங்காய்', 'தேங்காய்'],
        correct: 1,
        correctAnswer: 'வாழைப்பழம்',
      },
      {
        question: 'What fruit is called the "king of fruits" in Tamil Nadu?',
        options: ['ஆப்பிள்', 'தேங்காய்', 'மாங்காய்', 'திராட்சை'],
        correct: 2,
        correctAnswer: 'மாங்காய்',
      },
      {
        question: 'Which fruit grows in small bunches?',
        options: ['ஆப்பிள்', 'வாழைப்பழம்', 'திராட்சை', 'தேங்காய்'],
        correct: 2,
        correctAnswer: 'திராட்சை',
      },
    ],
    realLifeUsage: [
      '👉 At the fruit shop: "ஒரு மாங்காய் கொடுங்கள்." (Give me one mango.)',
      '👉 At breakfast: "நான் ஒரு வாழைப்பழம் சாப்பிடுகிறேன்." (I eat a banana.)',
      '👉 In summer: "மாங்காய் வந்தாச்சு!" (Mango season is here!)',
    ],
    revisionWords: ['சிவப்பு', 'நீலம்', 'பச்சை', 'வணக்கம்', 'நன்றி'],
  },

  // ─── Day 4: Animals ───
  {
    day: 4,
    week: 1,
    theme: 'Animals',
    subtitle: 'Meet the animals and their sounds',
    icon: '🦁',
    dailyGoal: 'Learn 6 animal names and their sounds',
    xpReward: 50,
    vocabulary: [
      { english: 'Dog', native: 'நாய்', pronunciation: 'Naai', meaning: 'Dog' },
      { english: 'Cat', native: 'பூனை', pronunciation: 'Poona', meaning: 'Cat' },
      { english: 'Cow', native: 'பசு', pronunciation: 'Pasu', meaning: 'Cow' },
      { english: 'Bird', native: 'பறவை', pronunciation: 'Paravai', meaning: 'Bird' },
      { english: 'Fish', native: 'மீன்', pronunciation: 'Meen', meaning: 'Fish' },
      { english: 'Elephant', native: 'யானை', pronunciation: 'Yaana', meaning: 'Elephant' },
    ],
    learningCard: {
      native: 'யானை',
      english: 'Elephant',
      pronunciation: 'Yaana',
      meaning: 'The gentle giant of the animal world',
      tip: 'Elephants are sacred in Tamil culture — Lord Ganesha has an elephant head! 🐘',
    },
    sentenceOfDay: {
      english: 'The dog is running.',
      native: 'நாய் ஓடுகிறது.',
      pronunciation: 'Naai odukirathu.',
      meaning: 'Describing a running dog',
      wordByWordBreakdown: [
        { word: 'நாய்', meaning: 'dog' },
        { word: 'ஓடுகிறது', meaning: 'is running' },
      ],
    },
    activities: [
      {
        type: 'tap-listen',
        title: 'Animal Sounds',
        instruction: 'Listen and tap the correct animal name!',
        data: {
          audioWord: 'யானை',
          options: ['நாய்', 'பசு', 'பறவை', 'யானை'],
          correctIndex: 3,
        },
        xpReward: 10,
      },
      {
        type: 'match',
        title: 'Animal Kingdom',
        instruction: 'Match each animal to its description.',
        data: {
          pairs: [
            { native: 'நாய்', english: 'Barks and is loyal' },
            { native: 'பூனை', english: 'Meows and climbs' },
            { native: 'பசு', english: 'Gives milk' },
            { native: 'பறவை', english: 'Flies and sings' },
            { native: 'மீன்', english: 'Lives in water' },
            { native: 'யானை', english: 'Has a long trunk' },
          ],
        },
        xpReward: 15,
      },
      {
        type: 'write',
        title: 'Trace: நாய்',
        instruction: 'Trace the word "நாய்" carefully.',
        data: { targetWord: 'நாய்', hint: 'Naai' },
        xpReward: 15,
      },
      {
        type: 'speak',
        title: 'Zoo Tour',
        instruction: 'Say the animal names aloud like you are at a zoo!',
        data: {
          targetWords: ['நாய்', 'பூனை', 'பசு', 'பறவை', 'மீன்', 'யானை'],
        },
        xpReward: 10,
      },
    ],
    quiz: [
      {
        question: 'Which animal gives us milk?',
        options: ['நாய்', 'பூனை', 'பசு', 'பறவை'],
        correct: 2,
        correctAnswer: 'பசு',
      },
      {
        question: 'What animal lives in water?',
        options: ['பறவை', 'மீன்', 'நாய்', 'பூனை'],
        correct: 1,
        correctAnswer: 'மீன்',
      },
      {
        question: 'Which animal has a long trunk?',
        options: ['நாய்', 'பூனை', 'யானை', 'பசு'],
        correct: 2,
        correctAnswer: 'யானை',
      },
    ],
    realLifeUsage: [
      '👉 Seeing a pet: "பாருங்க, நாய்!" (Look, a dog!)',
      '👉 Visiting a farm: "பசு பால் தருகிறது." (The cow gives milk.)',
      '👉 At the park: "பறவை அழகாக பாடுகிறது." (The bird is singing beautifully.)',
    ],
    revisionWords: ['ஆப்பிள்', 'வாழைப்பழம்', 'மாங்காய்', 'சிவப்பு', 'நீலம்'],
  },

  // ─── Day 5: Family ───
  {
    day: 5,
    week: 1,
    theme: 'Family',
    subtitle: 'Meet your family members in Tamil',
    icon: '👨‍👩‍👧‍👦',
    dailyGoal: 'Learn 6 family member names',
    xpReward: 50,
    vocabulary: [
      { english: 'Mother', native: 'அம்மா', pronunciation: 'Amma', meaning: 'Mother / Mom' },
      { english: 'Father', native: 'அப்பா', pronunciation: 'Appa', meaning: 'Father / Dad' },
      { english: 'Brother', native: 'சகோதரன்', pronunciation: 'Sahodharan', meaning: 'Brother' },
      { english: 'Sister', native: 'சகோதரி', pronunciation: 'Sahodhari', meaning: 'Sister' },
      { english: 'Grandmother', native: 'பாட்டி', pronunciation: 'Paati', meaning: 'Grandmother' },
      { english: 'Grandfather', native: 'தாத்தா', pronunciation: 'Thatha', meaning: 'Grandfather' },
    ],
    learningCard: {
      native: 'பாட்டி',
      english: 'Grandmother',
      pronunciation: 'Paati',
      meaning: 'The loving elder of the family',
      tip: 'Every Tamil child loves their பாட்டி — best cooks and storytellers! 👵',
    },
    sentenceOfDay: {
      english: 'My mother is very kind.',
      native: 'என் அம்மா மிகவும் நல்லவர்.',
      pronunciation: 'En amma migavum nallavar.',
      meaning: "Describing mother's kindness",
      wordByWordBreakdown: [
        { word: 'என்', meaning: 'my' },
        { word: 'அம்மா', meaning: 'mother' },
        { word: 'மிகவும்', meaning: 'very' },
        { word: 'நல்லவர்', meaning: 'kind / good person' },
      ],
    },
    activities: [
      {
        type: 'tap-listen',
        title: 'Family Tree',
        instruction: 'Listen and tap the correct family member!',
        data: {
          audioWord: 'அப்பா',
          options: ['அம்மா', 'அப்பா', 'சகோதரன்', 'சகோதரி'],
          correctIndex: 1,
        },
        xpReward: 10,
      },
      {
        type: 'match',
        title: 'Family Match',
        instruction: 'Match each family word to its meaning.',
        data: {
          pairs: [
            { native: 'அம்மா', english: 'Mother / Mom' },
            { native: 'அப்பா', english: 'Father / Dad' },
            { native: 'சகோதரன்', english: 'Brother' },
            { native: 'சகோதரி', english: 'Sister' },
            { native: 'பாட்டி', english: 'Grandmother' },
            { native: 'தாத்தா', english: 'Grandfather' },
          ],
        },
        xpReward: 15,
      },
      {
        type: 'write',
        title: 'Trace: அம்மா',
        instruction: 'Trace the word "அம்மா" carefully.',
        data: { targetWord: 'அம்மா', hint: 'Amma' },
        xpReward: 15,
      },
      {
        type: 'speak',
        title: 'Family Introduction',
        instruction: 'Say each family member name with love!',
        data: {
          targetWords: ['அம்மா', 'அப்பா', 'சகோதரன்', 'சகோதரி', 'பாட்டி', 'தாத்தா'],
        },
        xpReward: 10,
      },
    ],
    quiz: [
      {
        question: 'Who is a female parent?',
        options: ['அப்பா', 'அம்மா', 'சகோதரன்', 'சகோதரி'],
        correct: 1,
        correctAnswer: 'அம்மா',
      },
      {
        question: 'What do you call your male sibling?',
        options: ['சகோதரி', 'சகோதரன்', 'அப்பா', 'அம்மா'],
        correct: 1,
        correctAnswer: 'சகோதரன்',
      },
      {
        question: '"பாட்டி" means?',
        options: ['Your mother', 'Your grandmother', 'Your sister', 'Your daughter'],
        correct: 1,
        correctAnswer: 'Your grandmother',
      },
    ],
    realLifeUsage: [
      '👉 Introducing family: "இது என் அம்மா." (This is my mother.)',
      '👉 Calling someone: "பாட்டி, ஒரு கதை சொல்லுங்கள்!" (Grandma, tell me a story!)',
      '👉 Talking about family: "என் அப்பா மிகவும் நல்லவர்." (My father is very kind.)',
    ],
    revisionWords: ['நாய்', 'பூனை', 'யானை', 'ஆப்பிள்', 'வாழைப்பழம்'],
  },

  // ─── Day 6: Numbers 1-10 ───
  {
    day: 6,
    week: 1,
    theme: 'Numbers 1-10',
    subtitle: 'Count from one to ten like a pro',
    icon: '🔢',
    dailyGoal: 'Learn numbers 1 through 10 in Tamil',
    xpReward: 50,
    vocabulary: [
      { english: 'One', native: 'ஒன்று', pronunciation: 'Onru', meaning: '1' },
      { english: 'Two', native: 'இரண்டு', pronunciation: 'Irandu', meaning: '2' },
      { english: 'Three', native: 'மூன்று', pronunciation: 'Moondru', meaning: '3' },
      { english: 'Four', native: 'நான்கு', pronunciation: 'Naangu', meaning: '4' },
      { english: 'Five', native: 'ஐந்து', pronunciation: 'Aindhu', meaning: '5' },
      { english: 'Ten', native: 'பத்து', pronunciation: 'Pathu', meaning: '10' },
    ],
    learningCard: {
      native: 'ஐந்து',
      english: 'Five',
      pronunciation: 'Aindhu',
      meaning: 'The number 5',
      tip: 'We have five fingers on each hand — easy to remember! ✋',
    },
    sentenceOfDay: {
      english: 'I have five mangoes.',
      native: 'என்னிடம் ஐந்து மாங்காய் இருக்கிறது.',
      pronunciation: 'Ennidam aindhu maangaai irukkirathu.',
      meaning: 'Counting mangoes',
      wordByWordBreakdown: [
        { word: 'என்னிடம்', meaning: 'with me / I have' },
        { word: 'ஐந்து', meaning: 'five' },
        { word: 'மாங்காய்', meaning: 'mango' },
        { word: 'இருக்கிறது', meaning: 'is there' },
      ],
    },
    activities: [
      {
        type: 'tap-listen',
        title: 'Number Recall',
        instruction: 'Listen and tap the correct number!',
        data: {
          audioWord: 'இரண்டு',
          options: ['ஒன்று', 'இரண்டு', 'மூன்று', 'நான்கு'],
          correctIndex: 1,
        },
        xpReward: 10,
      },
      {
        type: 'match',
        title: 'Counting Match',
        instruction: 'Match Tamil numbers to their digit values.',
        data: {
          pairs: [
            { native: 'ஒன்று', english: '1' },
            { native: 'இரண்டு', english: '2' },
            { native: 'மூன்று', english: '3' },
            { native: 'நான்கு', english: '4' },
            { native: 'ஐந்து', english: '5' },
            { native: 'பத்து', english: '10' },
          ],
        },
        xpReward: 15,
      },
      {
        type: 'write',
        title: 'Trace: மூன்று',
        instruction: 'Trace the word "மூன்று" carefully.',
        data: { targetWord: 'மூன்று', hint: 'Moondru' },
        xpReward: 15,
      },
      {
        type: 'speak',
        title: 'Count Aloud',
        instruction: 'Count from one to ten out loud!',
        data: {
          targetWords: ['ஒன்று', 'இரண்டு', 'மூன்று', 'நான்கு', 'ஐந்து', 'பத்து'],
        },
        xpReward: 10,
      },
    ],
    quiz: [
      {
        question: 'How many hands do you have?',
        options: ['ஒன்று', 'மூன்று', 'இரண்டு', 'ஐந்து'],
        correct: 2,
        correctAnswer: 'இரண்டு',
      },
      {
        question: 'What is the word for 10?',
        options: ['ஐந்து', 'பத்து', 'மூன்று', 'ஒன்று'],
        correct: 1,
        correctAnswer: 'பத்து',
      },
      {
        question: 'How many fingers are on one hand?',
        options: ['3', '5', '4', '2'],
        correct: 1,
        correctAnswer: '5',
      },
    ],
    realLifeUsage: [
      '👉 Shopping: "இரண்டு மாங்காய் கொடுங்கள்." (Give me two mangoes.)',
      '👉 Telling time: "ஐந்து மணிக்கு எழுந்திருக்கிறேன்." (I wake up at five o\'clock.)',
      '👉 Counting people: "நாங்கள் நான்கு பேர் இருக்கிறோம்." (There are four of us.)',
    ],
    revisionWords: ['சிவப்பு', 'நீலம்', 'அம்மா', 'அப்பா', 'நாய்'],
  },

  // ─── Day 7: Common Phrases ───
  {
    day: 7,
    week: 1,
    theme: 'Common Phrases',
    subtitle: 'Useful words and actions for daily life',
    icon: '📚',
    dailyGoal: 'Learn 6 everyday words and actions',
    xpReward: 50,
    vocabulary: [
      { english: 'Come', native: 'வா', pronunciation: 'Vaa', meaning: 'Come' },
      { english: 'Go', native: 'போ', pronunciation: 'Po', meaning: 'Go' },
      { english: 'Sit', native: 'உட்காரு', pronunciation: 'Udkaara', meaning: 'Sit' },
      { english: 'Read', native: 'படி', pronunciation: 'Padi', meaning: 'Read' },
      { english: 'Write', native: 'எழுது', pronunciation: 'Ezhudhu', meaning: 'Write' },
      { english: 'Good', native: 'நல்ல', pronunciation: 'Nalla', meaning: 'Good' },
    ],
    learningCard: {
      native: 'வா',
      english: 'Come',
      pronunciation: 'Vaa',
      meaning: 'A welcoming word to invite someone',
      tip: '"வா" is one of the first words babies learn — simple and powerful! 🤝',
    },
    sentenceOfDay: {
      english: 'Come and read.',
      native: 'வா, படி.',
      pronunciation: 'Vaa, padi.',
      meaning: 'Inviting someone to come and read',
      wordByWordBreakdown: [
        { word: 'வா', meaning: 'come' },
        { word: 'படி', meaning: 'read' },
      ],
    },
    activities: [
      {
        type: 'tap-listen',
        title: 'Word Hunt',
        instruction: 'Listen and tap the correct action word!',
        data: {
          audioWord: 'வா',
          options: ['வா', 'உட்காரு', 'படி', 'எழுது'],
          correctIndex: 0,
        },
        xpReward: 10,
      },
      {
        type: 'match',
        title: 'Action Match',
        instruction: 'Match each action word to its meaning.',
        data: {
          pairs: [
            { native: 'வா', english: 'Come' },
            { native: 'போ', english: 'Go' },
            { native: 'உட்காரு', english: 'Sit' },
            { native: 'படி', english: 'Read' },
            { native: 'எழுது', english: 'Write' },
            { native: 'நல்ல', english: 'Good' },
          ],
        },
        xpReward: 15,
      },
      {
        type: 'write',
        title: 'Trace: வா',
        instruction: 'Trace the word "வா" carefully.',
        data: { targetWord: 'வா', hint: 'Vaa' },
        xpReward: 15,
      },
      {
        type: 'speak',
        title: 'Action Words',
        instruction: 'Say the action words aloud like you are giving commands!',
        data: {
          targetWords: ['வா', 'போ', 'உட்காரு', 'படி', 'எழுது', 'நல்ல'],
        },
        xpReward: 10,
      },
    ],
    quiz: [
      {
        question: 'What word means "come" in Tamil?',
        options: ['வா', 'போ', 'உட்காரு', 'எழுது'],
        correct: 0,
        correctAnswer: 'வா',
      },
      {
        question: 'What word means "read" in Tamil?',
        options: ['படி', 'எழுது', 'போ', 'வா'],
        correct: 0,
        correctAnswer: 'படி',
      },
      {
        question: 'What do you do with a book?',
        options: ['உட்காரு', 'படி', 'போ', 'நல்ல'],
        correct: 1,
        correctAnswer: 'படி',
      },
    ],
    realLifeUsage: [
      '👉 Calling someone: "வா, இங்கே உட்காரு." (Come, sit here.)',
      '👉 Asking: "போ, நல்ல படி." (Go, read well.)',
      '👉 Describing: "நல்ல புத்தகம் எழுது." (Write a good book.)',
    ],
    revisionWords: ['ஒன்று', 'இரண்டு', 'அம்மா', 'அப்பா', 'மாங்காய்', 'வாழைப்பழம்'],
  },
]