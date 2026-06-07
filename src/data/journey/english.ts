import type { JourneyDay } from '../../types'

export const englishJourney: JourneyDay[] = [
  {
    day: 1,
    week: 1,
    theme: 'Greetings',
    subtitle: 'Master basic greetings and introductions',
    icon: '👋',
    dailyGoal: 'Learn 6 common greetings and practice saying them',
    xpReward: 50,
    vocabulary: [
      { english: 'Hello', native: 'Hello', pronunciation: 'he-LOH', meaning: 'General greeting' },
      { english: 'Good morning', native: 'Good morning', pronunciation: 'good MOR-ning', meaning: 'Morning greeting' },
      { english: 'Good evening', native: 'Good evening', pronunciation: 'good EVE-ning', meaning: 'Evening greeting' },
      { english: 'Thank you', native: 'Thank you', pronunciation: 'THANK you', meaning: 'Express gratitude' },
      { english: 'Please', native: 'Please', pronunciation: 'PLEEZ', meaning: 'Polite request' },
      { english: 'Goodbye', native: 'Goodbye', pronunciation: 'good-BYE', meaning: 'Farewell' },
    ],
    learningCard: {
      native: 'Hello',
      english: 'Hello',
      pronunciation: 'he-LOH',
      meaning: 'The most common greeting in English',
      tip: 'Say it with a smile! HEL-loh',
    },
    sentenceOfDay: {
      english: 'Hello! How are you today?',
      native: 'Hello! How are you today?',
      pronunciation: 'HEL-loh! HOW ar YOU to-DAY?',
      meaning: 'A friendly greeting asking about well-being',
    },
    activities: [
      {
        type: 'tap-listen',
        title: 'Tap \u0026 Listen',
        instruction: 'Tap each greeting to hear it and practice',
        data: { items: ['Hello', 'Good morning', 'Good evening', 'Thank you', 'Please', 'Goodbye'] },
        xpReward: 10,
      },
      {
        type: 'match',
        title: 'Match Pairs',
        instruction: 'Match each greeting with its meaning',
        data: { pairs: [['Hello', 'Greeting'], ['Thank you', 'Gratitude'], ['Please', 'Polite request'], ['Goodbye', 'Farewell']] },
        xpReward: 15,
      },
    ],
    quiz: [
      { question: 'Which word means farewell?', options: ['Hello', 'Goodbye', 'Please'], correct: 1, correctAnswer: 'Goodbye' },
      { question: 'What do you say to express gratitude?', options: ['Sorry', 'Thank you', 'Hello'], correct: 1, correctAnswer: 'Thank you' },
    ],
    realLifeUsage: ['Say Hello when you meet someone', 'Use Thank you after receiving something', 'Say Goodbye when leaving'],
    revisionWords: ['Hello', 'Thank you', 'Goodbye'],
  },
]