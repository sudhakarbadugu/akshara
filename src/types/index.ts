// Core data types for the Language Learning App

export interface AlphabetChar {
  char: string
  name: string
  english: string
  keyword?: string
  keywordTamil?: string
  emoji?: string
  example?: string
  tip?: string
}

export interface AlphabetGroup {
  name: string
  chars: AlphabetChar[]
}

export interface AlphabetData {
  [group: string]: AlphabetGroup
}

// Lesson/Word types
export interface WordItem {
  english: string
  native: string  // Native script word (Tamil/Hindi/Telugu)
  pronunciation: string
  meaning: string
}

// Sentence types
export interface SentenceItem {
  english: string
  native: string
  pronunciation: string
  meaning: string
  category?: string
}

// Dialogue types
export interface DialogueLine {
  speaker: 'A' | 'B'
  english: string
  native: string
  pronunciation: string
}

export interface DialogueItem {
  id: string
  title: string
  scenario: string
  emoji: string
  lines: DialogueLine[]
}

// SRS (Spaced Repetition) types
export interface SRSItem {
  id: string // Unique key: e.g., "alpha:க", "word:greetings:1", "gunithalu:க_ா_0"
  type: 'alpha' | 'word' | 'gunithalu'
  content: string // The character/word to review
  meaning: string // English meaning/transliteration
  easeFactor: number // SM-2 ease factor (default 2.5)
  interval: number // Days until next review
  repetitions: number // Number of successful recalls
  nextReview: string // ISO date string (YYYY-MM-DD)
  lastReview?: string // ISO date string
  created: string // ISO date string
}

export interface SRSStats {
  dueToday: number
  totalItems: number
  learnedItems: number // Items with interval >= 1
  masteryPct: number
}

export interface LessonCategory {
  id: number
  category: string
  words: WordItem[]
}

// Gamification types
export interface LearningPath {
  id: string
  title: string
  subtitle: string
  icon: string
  progress: number
  status: 'progress' | 'locked' | 'completed'
  totalItems: number
  completedItems: number
  level: number
  xpReward: number
}

export interface Achievement {
  id: string
  icon: string
  title: string
  desc: string
  earned: boolean
}

// Quiz types
export type QuizType = 'alpha' | 'words'
export type QuizFeedback = 'correct' | 'wrong' | null

// Language types
export type Language = 'tamil' | 'hindi' | 'telugu'

export interface LanguageConfig {
  code: string          // BCP-47 code e.g. 'ta-IN', 'hi-IN', 'te-IN'
  name: string          // Display name e.g. 'Tamil'
  nativeName: string    // Native script name e.g. 'தமிழ்'
  script: string        // Script direction e.g. 'ltr'
  flag: string          // Flag emoji e.g. '🇮🇳'
  voiceLang: string     // TTS language code
}

// Store state types
export interface AppState {
  darkMode: boolean
  setDarkMode: (val: boolean) => void
  toggleDarkMode: () => void

  streak: number
  lastVisitDate: string | null
  achievedAchievements: string[]
  checkAndUpdateStreak: () => { streak: number; message: string }
  checkAchievements: () => string[]
  xp: number
  level: number
  lastLevel: number
  showConfetti: boolean
  setShowConfetti: (val: boolean) => void
  showLevelUp: boolean
  setShowLevelUp: (val: boolean) => void

  learnedWords: string[]
  learnedAlphabets: string[]
  learnedGunithalu: string[]
  srsItems: SRSItem[] // Spaced repetition items
  score: { correct: number; wrong: number }

  practiceChar: AlphabetChar | null
  practiceMode: 'trace' | 'write'
  showGuide: boolean
  currentAlphaGroup: string
  alphaCardIndex: number
  setPracticeChar: (char: AlphabetChar | null) => void
  setPracticeMode: (mode: 'trace' | 'write') => void
  setShowGuide: (val: boolean) => void
  setCurrentAlphaGroup: (group: string) => void
  setAlphaCardIndex: (idx: number) => void


  showEnglishInAlphaQuiz: boolean
  setShowEnglishInAlphaQuiz: (val: boolean) => void
  quizActive: boolean
  quizWord: AlphabetChar | WordItem | null
  quizOptions: (AlphabetChar | WordItem)[]
  selectedAnswer: AlphabetChar | WordItem | null
  quizFeedback: QuizFeedback
  quizType: QuizType
  selectedCategory: number | null
  setQuizActive: (val: boolean) => void
  setQuizWord: (word: AlphabetChar | WordItem | null) => void
  setQuizOptions: (opts: (AlphabetChar | WordItem)[]) => void
  setSelectedAnswer: (ans: AlphabetChar | WordItem | null) => void
  setQuizFeedback: (fb: QuizFeedback) => void
  setQuizType: (type: QuizType) => void
  setSelectedCategory: (cat: number | null) => void

  selectedWordCategory: number | null
  wordCardIndex: number
  showWordAnswer: boolean
  setSelectedWordCategory: (cat: number | null) => void
  setWordCardIndex: (idx: number) => void
  setShowWordAnswer: (val: boolean) => void

  flashcardGroup: string
  matchGroup: string
  setFlashcardGroup: (group: string) => void
  setMatchGroup: (group: string) => void

  // Actions
  addXp: (amount: number) => { newXp: number; newLevel: number; leveledUp: boolean }
  completeLesson: () => { newXp: number; leveledUp: boolean }
  handleQuizAnswer: (option: AlphabetChar | WordItem) => boolean
  startAlphaQuiz: () => void
  startWordQuiz: (categoryId: number) => void
  markAlphabetLearned: (char: string) => void
  markGunithaluLearned: (compound: string) => void
  markWordLearned: (key: string) => void
  advanceAlphaCard: () => void
  prevAlphaCard: () => void
  advanceWordCard: () => void
  prevWordCard: () => void
  resetProgress: () => void

  // SRS actions
  addSRSItem: (item: Omit<SRSItem, 'easeFactor' | 'interval' | 'repetitions' | 'nextReview' | 'created'>) => void
  rateSRSItem: (id: string, rating: 1 | 2 | 3 | 4) => void // 1=Again, 2=Hard, 3=Good, 4=Easy
  getSRSItemsDue: () => SRSItem[]
  getSRSStats: () => SRSStats

  // Computed helpers
  getOverallPct: () => number
  getAlphaPct: () => number
  getWordPct: () => number
  getUpdatedPaths: () => LearningPath[]
  getAchievements: () => Achievement[]

  // Language selection
  currentLanguage: Language
  setCurrentLanguage: (lang: Language) => void
}

// Flashcard item — can be either an alphabet char or a word
export interface FlashcardItem {
  display: string       // The main text to show (char or native word)
  name: string         // Romanized name / pronunciation
  english: string       // English meaning
  keyword?: string      // Optional keyword hint
  keywordNative?: string // Optional native keyword
  emoji?: string
  example?: string
  tip?: string
}

// Helper: convert AlphabetChar to FlashcardItem
export function alphabetToFlashcardItem(c: AlphabetChar): FlashcardItem {
  return {
    display: c.char,
    name: c.name,
    english: c.english,
    keyword: c.keyword,
    keywordNative: c.keywordTamil,
    emoji: c.emoji,
    example: c.example,
    tip: c.tip,
  }
}

// Helper: convert WordItem to FlashcardItem
export function wordToFlashcardItem(w: WordItem): FlashcardItem {
  return {
    display: w.native,
    name: w.pronunciation,
    english: w.english,
    keywordNative: w.native,
    emoji: '💬',
    example: w.meaning,
  }
}

// Speech types
export interface SpeechRecognitionResult {
  transcript: string
  matched: boolean
  alternatives: string[]
}