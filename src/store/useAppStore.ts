import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState, Language, LearningPath, Achievement, AlphabetChar, WordItem, SRSItem } from '../types'
import { getAlphabets, countAlphabets } from '../data/alphabets'
import { getLessons, countLessons } from '../data/lessons'

function makeLearningPaths(lang: Language): LearningPath[] {
  const langName = lang.charAt(0).toUpperCase() + lang.slice(1)
  return [
    { id: 'alphabets', title: `${langName} Alphabets`, subtitle: 'Vowels, Consonants & Compounds', icon: '🔤', progress: 0, status: 'progress', totalItems: 0, completedItems: 0, level: 1, xpReward: 50 },
    { id: 'gunihalu', title: `${langName} Gunithalu`, subtitle: 'Learn compound letters', icon: '🔣', progress: 0, status: 'progress', totalItems: 15, completedItems: 0, level: 2, xpReward: 60 },
    { id: 'greetings', title: 'Greetings & Basics', subtitle: `Say hello in ${langName}`, icon: '👋', progress: 0, status: 'progress', totalItems: 8, completedItems: 0, level: 1, xpReward: 30 },
    { id: 'numbers', title: 'Numbers 1-100', subtitle: `Count in ${langName}`, icon: '🔢', progress: 0, status: 'progress', totalItems: 100, completedItems: 0, level: 1, xpReward: 25 },
    { id: 'numbers-1k', title: 'Numbers 1K-100K', subtitle: `Thousands in ${langName}`, icon: '📊', progress: 0, status: 'progress', totalItems: 10, completedItems: 0, level: 2, xpReward: 30 },
    { id: 'numbers-lakh', title: 'Lakhs & Crores', subtitle: `Indian numbering system`, icon: '💎', progress: 0, status: 'progress', totalItems: 10, completedItems: 0, level: 3, xpReward: 35 },
    { id: 'family', title: 'Family Words', subtitle: `Family members in ${langName}`, icon: '👨‍👩‍👧‍👦', progress: 0, status: 'progress', totalItems: 8, completedItems: 0, level: 2, xpReward: 40 },
    { id: 'food', title: 'Food & Drinks', subtitle: `${langName} cuisine vocabulary`, icon: '🍛', progress: 0, status: 'progress', totalItems: 10, completedItems: 0, level: 2, xpReward: 35 },
    { id: 'colors', title: `Colors in ${langName}`, subtitle: 'Express yourself with color', icon: '🎨', progress: 0, status: 'progress', totalItems: 8, completedItems: 0, level: 3, xpReward: 30 },
    { id: 'days', title: 'Days of the Week', subtitle: 'Learn the calendar', icon: '📅', progress: 0, status: 'progress', totalItems: 7, completedItems: 0, level: 3, xpReward: 25 },
    { id: 'phrases', title: 'Common Phrases', subtitle: 'Everyday conversations', icon: '💬', progress: 0, status: 'progress', totalItems: 7, completedItems: 0, level: 3, xpReward: 50 },
    { id: 'body', title: 'Body Parts', subtitle: 'Parts of the body', icon: '🦴', progress: 0, status: 'progress', totalItems: 8, completedItems: 0, level: 4, xpReward: 35 },
  ]
}

const ACHIEVEMENTS_TEMPLATE: Omit<Achievement, 'earned'>[] = [
  { id: 'first_word', icon: '🌟', title: 'First Word', desc: 'Learn your first word' },
  { id: 'first_alpha', icon: '📝', title: 'First Alphabet', desc: 'Learn your first alphabet' },
  { id: 'streak_3', icon: '🔥', title: '3-Day Streak', desc: 'Learn 3 days in a row' },
  { id: 'streak_7', icon: '🏆', title: 'Week Warrior', desc: '7-day streak' },
  { id: 'streak_14', icon: '💪', title: 'Fortnight Fighter', desc: '14-day streak' },
  { id: 'streak_30', icon: '👑', title: 'Monthly Master', desc: '30-day streak' },
  { id: 'alpha_10', icon: '🔤', title: 'Alpha Hunter', desc: 'Learn 10 alphabets' },
  { id: 'alpha_50', icon: '📖', title: 'Alpha Master', desc: 'Learn 50 alphabets' },
  { id: 'alpha_100', icon: '🎓', title: 'Alpha Scholar', desc: 'Learn 100 alphabets' },
  { id: 'gunithalu_25', icon: '🔣', title: 'Compound Creator', desc: 'Learn 25 gunithalu combos' },
  { id: 'gunithalu_100', icon: '💎', title: 'Compound King', desc: 'Learn 100 gunithalu combos' },
  { id: 'words_10', icon: '💬', title: 'Word Starter', desc: 'Learn 10 words' },
  { id: 'words_50', icon: '📚', title: 'Word Wizard', desc: 'Learn 50 words' },
  { id: 'words_100', icon: '🧠', title: 'Word Master', desc: 'Learn 100 words' },
  { id: 'perfect_quiz', icon: '💯', title: 'Perfect Quiz', desc: 'Get 100% on a quiz' },
  { id: 'xp_500', icon: '⭐', title: 'XP Collector', desc: 'Earn 500 XP' },
  { id: 'xp_1000', icon: '🌟', title: 'XP Champion', desc: 'Earn 1000 XP' },
  { id: 'level_5', icon: '🎯', title: 'Level 5', desc: 'Reach level 5' },
  { id: 'level_10', icon: '🚀', title: 'Level 10', desc: 'Reach level 10' },
  { id: 'trilingual', icon: '🌍', title: 'Trilingual', desc: 'Explore all 3 languages' },
]

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Language
      currentLanguage: 'tamil',
      setCurrentLanguage: (lang: Language) => {
        const alphabets = getAlphabets(lang)
        const lessons = getLessons(lang)
        const firstGroup = Object.keys(alphabets)[0] ?? 'vowels'
        const firstChars = alphabets[firstGroup]?.chars ?? []
        set({
          currentLanguage: lang,
          currentAlphaGroup: firstGroup,
          alphaCardIndex: 0,
          practiceChar: firstChars[0] ?? null,
          selectedWordCategory: null,
          wordCardIndex: 0,
          flashcardGroup: firstGroup,
          matchGroup: firstGroup,
          quizActive: false,
          quizWord: null,
          quizOptions: [],
          selectedAnswer: null,
          quizFeedback: null,
        })
      },

      // UI / Theme
      darkMode: true,
      setDarkMode: (val: boolean) => set({ darkMode: val }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // Gamification
      streak: 0,
      lastVisitDate: null, // ISO date string of last visit
      achievedAchievements: [], // Array of earned achievement IDs
      xp: 0,
      level: 1,
      lastLevel: 1,
      showConfetti: false,
      setShowConfetti: (val: boolean) => set({ showConfetti: val }),
      showLevelUp: false,
      setShowLevelUp: (val: boolean) => set({ showLevelUp: val }),

      // Progress
      learnedWords: [],
      learnedAlphabets: [],
      learnedGunithalu: [], // Track learned gunithalu compounds
      srsItems: [], // Spaced repetition items
      score: { correct: 0, wrong: 0 },

      // Practice
      practiceChar: null,
      practiceMode: 'trace',
      showGuide: true,
      currentAlphaGroup: 'vowels',
      alphaCardIndex: 0,
      setPracticeChar: (char: AlphabetChar | null) => set({ practiceChar: char }),
      showEnglishInAlphaQuiz: false,
      setPracticeMode: (mode: 'trace' | 'write') => set({ practiceMode: mode }),
      setShowGuide: (val: boolean) => set({ showGuide: val }),
      setCurrentAlphaGroup: (group: string) => set({ currentAlphaGroup: group }),
      setShowEnglishInAlphaQuiz: (val: boolean) => set({ showEnglishInAlphaQuiz: val }),
      setAlphaCardIndex: (idx: number) => set({ alphaCardIndex: idx }),

      // Quiz
      quizActive: false,
      quizWord: null,
      quizOptions: [],
      selectedAnswer: null,
      quizFeedback: null,
      quizType: 'alpha',
      selectedCategory: null,
      setQuizActive: (val: boolean) => set({ quizActive: val }),
      setQuizWord: (word: AlphabetChar | WordItem | null) => set({ quizWord: word }),
      setQuizOptions: (opts: (AlphabetChar | WordItem)[]) => set({ quizOptions: opts }),
      setSelectedAnswer: (ans: AlphabetChar | WordItem | null) => set({ selectedAnswer: ans }),
      setQuizFeedback: (fb: 'correct' | 'wrong' | null) => set({ quizFeedback: fb }),
      setQuizType: (type: 'alpha' | 'words') => set({ quizType: type }),
      setSelectedCategory: (cat: number | null) => set({ selectedCategory: cat }),

      // Words
      selectedWordCategory: null,
      wordCardIndex: 0,
      showWordAnswer: false,
      setSelectedWordCategory: (cat: number | null) => set({ selectedWordCategory: cat }),
      setWordCardIndex: (idx: number) => set({ wordCardIndex: idx }),
      setShowWordAnswer: (val: boolean) => set({ showWordAnswer: val }),

      // Flashcard & Match
      flashcardGroup: 'vowels',
      matchGroup: 'vowels',
      setFlashcardGroup: (group: string) => set({ flashcardGroup: group }),
      setMatchGroup: (group: string) => set({ matchGroup: group }),

      // Actions
      checkAndUpdateStreak: () => {
        const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
        const state = get()
        const lastVisit = state.lastVisitDate
        
        if (!lastVisit) {
          // First visit ever
          set({ streak: 1, lastVisitDate: today })
          return { streak: 1, message: 'First day! 🔥' }
        }
        
        const lastDate = new Date(lastVisit)
        const todayDate = new Date(today)
        const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
        
        if (diffDays === 0) {
          // Already visited today
          return { streak: state.streak, message: `Keep going! 🔥 ${state.streak} day streak` }
        } else if (diffDays === 1) {
          // Consecutive day
          const newStreak = state.streak + 1
          set({ streak: newStreak, lastVisitDate: today })
          return { streak: newStreak, message: `Streak extended! 🔥 ${newStreak} days` }
        } else {
          // Streak broken
          set({ streak: 1, lastVisitDate: today })
          return { streak: 1, message: 'Streak reset. Start fresh! 🔥' }
        }
      },

      checkAchievements: () => {
        const state = get()
        const newAchievements: string[] = []
        const alreadyEarned = state.achievedAchievements || []
        
        // Helper to check and add achievement
        const check = (id: string, condition: boolean) => {
          if (condition && !alreadyEarned.includes(id)) {
            newAchievements.push(id)
          }
        }

        // Word achievements
        check('first_word', state.learnedWords.length >= 1)
        check('words_10', state.learnedWords.length >= 10)
        check('words_50', state.learnedWords.length >= 50)
        check('words_100', state.learnedWords.length >= 100)

        // Alphabet achievements
        const firstAlpha = state.learnedAlphabets.length >= 1
        check('first_alpha', firstAlpha)
        check('alpha_10', state.learnedAlphabets.length >= 10)
        check('alpha_50', state.learnedAlphabets.length >= 50)
        check('alpha_100', state.learnedAlphabets.length >= 100)

        // Gunithalu achievements
        check('gunithalu_25', state.learnedGunithalu.length >= 25)
        check('gunithalu_100', state.learnedGunithalu.length >= 100)

        // Streak achievements
        check('streak_3', state.streak >= 3)
        check('streak_7', state.streak >= 7)
        check('streak_14', state.streak >= 14)
        check('streak_30', state.streak >= 30)

        // XP achievements
        check('xp_500', state.xp >= 500)
        check('xp_1000', state.xp >= 1000)

        // Level achievements
        check('level_5', state.level >= 5)
        check('level_10', state.level >= 10)

        // Perfect quiz (check score)
        const totalQuiz = state.score.correct + state.score.wrong
        const accuracy = totalQuiz > 0 ? (state.score.correct / totalQuiz) * 100 : 0
        check('perfect_quiz', accuracy === 100 && totalQuiz >= 5)

        // Trilingual (check if user has explored all languages)
        // This would need additional tracking - skip for now

        if (newAchievements.length > 0) {
          set({ achievedAchievements: [...alreadyEarned, ...newAchievements] })
          return newAchievements
        }
        return []
      },

      addXp: (amount: number) => {
        const state = get()
        const newXp = state.xp + amount
        const newLevel = Math.floor(newXp / 100) + 1
        set({
          xp: newXp,
          level: newLevel,
          lastLevel: newLevel > state.lastLevel ? newLevel : state.lastLevel,
          showLevelUp: newLevel > state.lastLevel,
          showConfetti: newLevel > state.lastLevel ? true : state.showConfetti,
        })
        return { newXp, newLevel, leveledUp: newLevel > state.lastLevel }
      },

      completeLesson: () => {
        const state = get()
        const { newXp, leveledUp } = get().addXp(20)
        set({
          showConfetti: true,
          streak: state.streak + 1,
        })
        return { newXp, leveledUp }
      },

      handleQuizAnswer: (option: AlphabetChar | WordItem) => {
        const state = get()
        if (state.selectedAnswer) return false
        const isAlpha = state.quizType === 'alpha'
        const correct = isAlpha
          ? (option as AlphabetChar).char === (state.quizWord as AlphabetChar)?.char
          : (option as WordItem).english === (state.quizWord as WordItem)?.english
        set({
          selectedAnswer: option,
          quizFeedback: correct ? 'correct' : 'wrong',
          score: {
            correct: state.score.correct + (correct ? 1 : 0),
            wrong: state.score.wrong + (correct ? 0 : 1),
          },
        })
        if (correct) get().addXp(5)
        return correct
      },

      startAlphaQuiz: () => {
        const state = get()
        const alphabets = getAlphabets(state.currentLanguage)
        const chars = alphabets[state.currentAlphaGroup]?.chars || []
        if (!chars.length) return
        const randChar = chars[Math.floor(Math.random() * chars.length)]
        const others = chars.filter((c) => c.char !== randChar.char).slice(0, 3)
        set({
          quizWord: randChar,
          selectedAnswer: null,
          quizFeedback: null,
          quizOptions: [...others, randChar].sort(() => Math.random() - 0.5),
        })
      },

      startWordQuiz: (categoryId: number) => {
        const state = get()
        const lessons = getLessons(state.currentLanguage)
        const cat = lessons.find((c) => c.id === categoryId)
        if (!cat) return
        const randWord = cat.words[Math.floor(Math.random() * cat.words.length)]
        set({
          quizWord: randWord,
          selectedCategory: categoryId,
          selectedAnswer: null,
          quizFeedback: null,
          quizOptions: [...cat.words.filter((w) => w.english !== randWord.english).slice(0, 3), randWord].sort(() => Math.random() - 0.5),
        })
      },

      markAlphabetLearned: (char: string) => {
        const state = get()
        if (!state.learnedAlphabets.includes(char)) {
          set({ learnedAlphabets: [...state.learnedAlphabets, char] })
          get().checkAchievements() // Check for new achievements
        }
        get().addXp(3)
      },

      markGunithaluLearned: (compound: string) => {
        const state = get()
        if (!state.learnedGunithalu.includes(compound)) {
          set({ learnedGunithalu: [...state.learnedGunithalu, compound] })
          get().checkAchievements() // Check for new achievements
        }
        get().addXp(3)
      },

      markWordLearned: (key: string) => {
        const state = get()
        if (!state.learnedWords.includes(key)) {
          set({ learnedWords: [...state.learnedWords, key] })
          get().checkAchievements() // Check for new achievements
        }
        get().addXp(2)
      },

      advanceAlphaCard: () => {
        const state = get()
        const alphabets = getAlphabets(state.currentLanguage)
        const chars = alphabets[state.currentAlphaGroup]?.chars || []
        const nextIndex = (state.alphaCardIndex + 1) % chars.length
        set({ alphaCardIndex: nextIndex, practiceChar: chars[nextIndex] })
      },

      prevAlphaCard: () => {
        const state = get()
        const alphabets = getAlphabets(state.currentLanguage)
        const chars = alphabets[state.currentAlphaGroup]?.chars || []
        const nextIndex = (state.alphaCardIndex - 1 + chars.length) % chars.length
        set({ alphaCardIndex: nextIndex, practiceChar: chars[nextIndex] })
      },

      advanceWordCard: () => {
        const state = get()
        const lessons = getLessons(state.currentLanguage)
        const words = state.selectedWordCategory
          ? lessons.find((c) => c.id === state.selectedWordCategory)?.words || []
          : []
        set({ wordCardIndex: (state.wordCardIndex + 1) % words.length, showWordAnswer: false })
      },

      prevWordCard: () => {
        const state = get()
        const lessons = getLessons(state.currentLanguage)
        const words = state.selectedWordCategory
          ? lessons.find((c) => c.id === state.selectedWordCategory)?.words || []
          : []
        set({ wordCardIndex: (state.wordCardIndex - 1 + words.length) % words.length, showWordAnswer: false })
      },

      resetProgress: () => {
        set({
          learnedWords: [],
          learnedAlphabets: [],
          learnedGunithalu: [],
          srsItems: [],
          score: { correct: 0, wrong: 0 },
          streak: 0,
          xp: 0,
          level: 1,
          lastLevel: 1,
          achievedAchievements: [],
        })
      },

      // SRS (Spaced Repetition) Actions
      addSRSItem: (item) => {
        const state = get()
        const existing = state.srsItems.find(i => i.id === item.id)
        if (existing) return // Already exists
        
        const today = new Date().toISOString().split('T')[0]
        const newItem: SRSItem = {
          ...item,
          easeFactor: 2.5, // Default SM-2 ease
          interval: 0, // New item, review today
          repetitions: 0,
          nextReview: today,
          created: today,
        }
        set({ srsItems: [...state.srsItems, newItem] })
      },

      rateSRSItem: (id, rating) => {
        const state = get()
        const item = state.srsItems.find(i => i.id === id)
        if (!item) return
        
        const today = new Date()
        const todayStr = today.toISOString().split('T')[0]
        
        // SM-2 Algorithm
        let { easeFactor, interval, repetitions } = item
        
        if (rating === 1) {
          // Again - reset
          repetitions = 0
          interval = 0
        } else {
          // Hard (2), Good (3), Easy (4)
          if (repetitions === 0) {
            interval = rating === 4 ? 4 : (rating === 3 ? 1 : 0.5)
          } else if (repetitions === 1) {
            interval = rating === 4 ? 7 : (rating === 3 ? 3 : 1)
          } else {
            interval = Math.round(interval * (rating === 4 ? 2.5 : (rating === 3 ? 1.3 : 1.2)))
          }
          repetitions += 1
        }
        
        // Update ease factor
        easeFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02))
        easeFactor = Math.max(1.3, Math.min(3.0, easeFactor)) // Clamp between 1.3 and 3.0
        
        // Calculate next review date
        const nextReview = new Date(today)
        nextReview.setDate(today.getDate() + (interval > 0 ? interval : 0))
        const nextReviewStr = nextReview.toISOString().split('T')[0]
        
        const updatedItem: SRSItem = {
          ...item,
          easeFactor,
          interval,
          repetitions,
          nextReview: nextReviewStr,
          lastReview: todayStr,
        }
        
        set({
          srsItems: state.srsItems.map(i => i.id === id ? updatedItem : i)
        })
      },

      getSRSItemsDue: () => {
        const state = get()
        const today = new Date().toISOString().split('T')[0]
        return state.srsItems.filter(item => item.nextReview <= today)
      },

      getSRSStats: () => {
        const state = get()
        const today = new Date().toISOString().split('T')[0]
        const dueToday = state.srsItems.filter(item => item.nextReview <= today).length
        const learnedItems = state.srsItems.filter(item => item.interval >= 1).length
        const totalItems = state.srsItems.length
        const masteryPct = totalItems > 0 ? Math.round((learnedItems / totalItems) * 100) : 0
        
        return { dueToday, totalItems, learnedItems, masteryPct }
      },

      // Computed helpers
      getOverallPct: () => {
        const state = get()
        const alphabets = getAlphabets(state.currentLanguage)
        const lessons = getLessons(state.currentLanguage)
        const totalAlpha = countAlphabets(alphabets)
        const totalWord = countLessons(lessons)
        if (totalAlpha + totalWord === 0) return 0
        return Math.round(((state.learnedAlphabets.length + state.learnedWords.length) / (totalAlpha + totalWord)) * 100)
      },

      getAlphaPct: () => {
        const state = get()
        const alphabets = getAlphabets(state.currentLanguage)
        const totalAlpha = countAlphabets(alphabets)
        if (totalAlpha === 0) return 0
        return Math.round((state.learnedAlphabets.length / totalAlpha) * 100)
      },

      getWordPct: () => {
        const state = get()
        const lessons = getLessons(state.currentLanguage)
        const totalWord = countLessons(lessons)
        if (totalWord === 0) return 0
        return Math.round((state.learnedWords.length / totalWord) * 100)
      },

      getUpdatedPaths: () => {
        const state = get()
        const paths = makeLearningPaths(state.currentLanguage)
        return paths.map((p) => {
          if (p.id === 'alphabets') {
            const alphabets = getAlphabets(state.currentLanguage)
            const total = countAlphabets(alphabets)
            const pct = total > 0 ? Math.round((state.learnedAlphabets.length / total) * 100) : 0
            return { ...p, progress: pct, completedItems: state.learnedAlphabets.length, totalItems: total }
          }
          return p
        })
      },

      getAchievements: () => {
        const state = get()
        const earned = state.achievedAchievements || []
        return ACHIEVEMENTS_TEMPLATE.map(a => ({
          ...a,
          earned: earned.includes(a.id)
        }))
      },
    }),
    {
      name: 'language-learn-store',
      partialize: (state) => ({
        darkMode: state.darkMode,
        streak: state.streak,
        lastVisitDate: state.lastVisitDate,
        achievedAchievements: state.achievedAchievements,
        xp: state.xp,
        level: state.level,
        lastLevel: state.lastLevel,
        learnedWords: state.learnedWords,
        learnedAlphabets: state.learnedAlphabets,
        learnedGunithalu: state.learnedGunithalu,
        srsItems: state.srsItems,
        score: state.score,
        currentLanguage: state.currentLanguage,
        showEnglishInAlphaQuiz: state.showEnglishInAlphaQuiz,
      }),
    }
  )
)

export default useAppStore
