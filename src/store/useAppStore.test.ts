import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from './useAppStore'

// Reset store before each test by accessing the internal setState
beforeEach(() => {
  // @ts-expect-error - accessing internal zustand api
  useAppStore.setState({
    streak: 0,
    lastVisitDate: null,
    xp: 0,
    level: 1,
    lastLevel: 1,
    learnedWords: [],
    learnedAlphabets: [],
    learnedGunithalu: [],
    srsItems: [],
    score: { correct: 0, wrong: 0 },
    achievedAchievements: [],
    currentJourneyDay: 1,
    completedJourneyDays: [],
    journeyXP: 0,
    journeyStreak: 0,
    journeyStartDate: null,
    lastJourneyVisit: null,
    showConfetti: false,
    showLevelUp: false,
  })
})

describe('useAppStore - Streak', () => {
  it('sets streak to 1 on first visit', () => {
    const state = useAppStore.getState()
    const result = state.checkAndUpdateStreak()
    expect(result.streak).toBe(1)
    expect(useAppStore.getState().streak).toBe(1)
  })

  it('does not increment streak on same day', () => {
    const today = new Date().toISOString().split('T')[0]
    useAppStore.setState({ streak: 3, lastVisitDate: today })
    const state = useAppStore.getState()
    const result = state.checkAndUpdateStreak()
    expect(result.streak).toBe(3)
  })

  it('increments streak on consecutive day', () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    useAppStore.setState({ streak: 5, lastVisitDate: yesterday })
    const state = useAppStore.getState()
    const result = state.checkAndUpdateStreak()
    expect(result.streak).toBe(6)
    expect(useAppStore.getState().streak).toBe(6)
  })

  it('resets streak after gap > 1 day', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0]
    useAppStore.setState({ streak: 10, lastVisitDate: twoDaysAgo })
    const state = useAppStore.getState()
    const result = state.checkAndUpdateStreak()
    expect(result.streak).toBe(1)
    expect(useAppStore.getState().streak).toBe(1)
  })
})

describe('useAppStore - XP & Leveling', () => {
  it('adds XP correctly', () => {
    const state = useAppStore.getState()
    const result = state.addXp(50)
    expect(result.newXp).toBe(50)
    expect(result.newLevel).toBe(1)
    expect(result.leveledUp).toBe(false)
  })

  it('levels up at 100 XP threshold', () => {
    useAppStore.setState({ xp: 95, level: 1, lastLevel: 1 })
    const state = useAppStore.getState()
    const result = state.addXp(10)
    expect(result.newXp).toBe(105)
    expect(result.newLevel).toBe(2)
    expect(result.leveledUp).toBe(true)
    expect(useAppStore.getState().showLevelUp).toBe(true)
  })

  it('levels up at 200 XP threshold', () => {
    useAppStore.setState({ xp: 195, level: 2, lastLevel: 2 })
    const state = useAppStore.getState()
    const result = state.addXp(10)
    expect(result.newXp).toBe(205)
    expect(result.newLevel).toBe(3)
    expect(result.leveledUp).toBe(true)
  })

  it('does not level up if not enough XP', () => {
    useAppStore.setState({ xp: 90, level: 1, lastLevel: 1 })
    const state = useAppStore.getState()
    const result = state.addXp(5)
    expect(result.leveledUp).toBe(false)
  })
})

describe('useAppStore - Achievements', () => {
  it('awards first_word when 1 word learned', () => {
    useAppStore.setState({ learnedWords: ['hello'] })
    const state = useAppStore.getState()
    const earned = state.checkAchievements()
    expect(earned).toContain('first_word')
  })

  it('awards words_10 when 10 words learned', () => {
    useAppStore.setState({ learnedWords: Array(10).fill('w') })
    const state = useAppStore.getState()
    const earned = state.checkAchievements()
    expect(earned).toContain('words_10')
  })

  it('awards first_alpha when 1 alphabet learned', () => {
    useAppStore.setState({ learnedAlphabets: ['அ'] })
    const state = useAppStore.getState()
    const earned = state.checkAchievements()
    expect(earned).toContain('first_alpha')
  })

  it('awards streak_3 when streak >= 3', () => {
    useAppStore.setState({ streak: 3 })
    const state = useAppStore.getState()
    const earned = state.checkAchievements()
    expect(earned).toContain('streak_3')
  })

  it('awards xp_500 when XP >= 500', () => {
    useAppStore.setState({ xp: 500 })
    const state = useAppStore.getState()
    const earned = state.checkAchievements()
    expect(earned).toContain('xp_500')
  })

  it('awards level_5 when level >= 5', () => {
    useAppStore.setState({ level: 5 })
    const state = useAppStore.getState()
    const earned = state.checkAchievements()
    expect(earned).toContain('level_5')
  })

  it('does not award already-earned achievements', () => {
    useAppStore.setState({ xp: 500, achievedAchievements: ['xp_500'] })
    const state = useAppStore.getState()
    const earned = state.checkAchievements()
    expect(earned).not.toContain('xp_500')
  })

  it('awards multiple achievements at once', () => {
    useAppStore.setState({
      xp: 500,
      level: 5,
      streak: 3,
      learnedWords: ['a'],
      learnedAlphabets: ['அ'],
    })
    const state = useAppStore.getState()
    const earned = state.checkAchievements()
    expect(earned).toContain('xp_500')
    expect(earned).toContain('level_5')
    expect(earned).toContain('streak_3')
    expect(earned).toContain('first_word')
    expect(earned).toContain('first_alpha')
  })
})

describe('useAppStore - Mark Learned', () => {
  it('marks alphabet as learned and awards XP', () => {
    const state = useAppStore.getState()
    state.markAlphabetLearned('அ')
    const newState = useAppStore.getState()
    expect(newState.learnedAlphabets).toContain('அ')
    expect(newState.xp).toBe(3)
  })

  it('does not duplicate learned alphabets', () => {
    useAppStore.setState({ learnedAlphabets: ['அ'] })
    const state = useAppStore.getState()
    state.markAlphabetLearned('அ')
    const newState = useAppStore.getState()
    expect(newState.learnedAlphabets).toEqual(['அ'])
  })

  it('marks word as learned and awards XP', () => {
    const state = useAppStore.getState()
    state.markWordLearned('hello')
    const newState = useAppStore.getState()
    expect(newState.learnedWords).toContain('hello')
    expect(newState.xp).toBe(2)
  })

  it('marks gunithalu as learned and awards XP', () => {
    const state = useAppStore.getState()
    state.markGunithaluLearned('க்+அ=க')
    const newState = useAppStore.getState()
    expect(newState.learnedGunithalu).toContain('க்+அ=க')
    expect(newState.xp).toBe(3)
  })
})

describe('useAppStore - SRS', () => {
  it('adds SRS item with correct defaults', () => {
    const state = useAppStore.getState()
    state.addSRSItem({ id: 'alpha:அ', type: 'alpha', content: 'அ', meaning: 'a' })
    const newState = useAppStore.getState()
    expect(newState.srsItems.length).toBe(1)
    const item = newState.srsItems[0]
    expect(item.easeFactor).toBe(2.5)
    expect(item.interval).toBe(0)
    expect(item.repetitions).toBe(0)
  })

  it('does not add duplicate SRS items', () => {
    const state = useAppStore.getState()
    state.addSRSItem({ id: 'alpha:அ', type: 'alpha', content: 'அ', meaning: 'a' })
    state.addSRSItem({ id: 'alpha:அ', type: 'alpha', content: 'அ', meaning: 'a' })
    const newState = useAppStore.getState()
    expect(newState.srsItems.length).toBe(1)
  })

  it('rates SRS item with Good (3) correctly', () => {
    const today = new Date().toISOString().split('T')[0]
    useAppStore.setState({
      srsItems: [{
        id: 'alpha:அ', type: 'alpha', content: 'அ', meaning: 'a',
        easeFactor: 2.5, interval: 0, repetitions: 0, nextReview: today, created: today,
      }],
    })
    const state = useAppStore.getState()
    state.rateSRSItem('alpha:அ', 3)
    const newState = useAppStore.getState()
    const item = newState.srsItems[0]
    expect(item.repetitions).toBe(1)
    expect(item.interval).toBe(1)
  })

  it('rates SRS item with Easy (4) correctly', () => {
    const today = new Date().toISOString().split('T')[0]
    useAppStore.setState({
      srsItems: [{
        id: 'alpha:அ', type: 'alpha', content: 'அ', meaning: 'a',
        easeFactor: 2.5, interval: 0, repetitions: 0, nextReview: today, created: today,
      }],
    })
    const state = useAppStore.getState()
    state.rateSRSItem('alpha:அ', 4)
    const newState = useAppStore.getState()
    const item = newState.srsItems[0]
    expect(item.repetitions).toBe(1)
    expect(item.interval).toBe(4)
  })

  it('rates SRS item with Again (1) resets progress', () => {
    const today = new Date().toISOString().split('T')[0]
    useAppStore.setState({
      srsItems: [{
        id: 'alpha:அ', type: 'alpha', content: 'அ', meaning: 'a',
        easeFactor: 2.5, interval: 7, repetitions: 3, nextReview: today, created: today,
      }],
    })
    const state = useAppStore.getState()
    state.rateSRSItem('alpha:அ', 1)
    const newState = useAppStore.getState()
    const item = newState.srsItems[0]
    expect(item.repetitions).toBe(0)
    expect(item.interval).toBe(0)
  })

  it('gets items due for review', () => {
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    useAppStore.setState({
      srsItems: [
        { id: 'alpha:அ', type: 'alpha', content: 'அ', meaning: 'a', easeFactor: 2.5, interval: 1, repetitions: 1, nextReview: yesterday, created: today },
        { id: 'alpha:ஆ', type: 'alpha', content: 'ஆ', meaning: 'aa', easeFactor: 2.5, interval: 7, repetitions: 1, nextReview: today, created: today },
        { id: 'alpha:இ', type: 'alpha', content: 'இ', meaning: 'i', easeFactor: 2.5, interval: 7, repetitions: 1, nextReview: '2099-01-01', created: today },
      ],
    })
    const state = useAppStore.getState()
    const due = state.getSRSItemsDue()
    expect(due.length).toBe(2)
    expect(due.map(i => i.id)).toContain('alpha:அ')
    expect(due.map(i => i.id)).toContain('alpha:ஆ')
  })

  it('calculates SRS stats correctly', () => {
    const today = new Date().toISOString().split('T')[0]
    useAppStore.setState({
      srsItems: [
        { id: 'alpha:அ', type: 'alpha', content: 'அ', meaning: 'a', easeFactor: 2.5, interval: 0, repetitions: 0, nextReview: today, created: today },
        { id: 'alpha:ஆ', type: 'alpha', content: 'ஆ', meaning: 'aa', easeFactor: 2.5, interval: 1, repetitions: 1, nextReview: today, created: today },
        { id: 'alpha:இ', type: 'alpha', content: 'இ', meaning: 'i', easeFactor: 2.5, interval: 7, repetitions: 1, nextReview: '2099-01-01', created: today },
      ],
    })
    const state = useAppStore.getState()
    const stats = state.getSRSStats()
    expect(stats.dueToday).toBe(2)
    expect(stats.totalItems).toBe(3)
    expect(stats.learnedItems).toBe(2)
    expect(stats.masteryPct).toBe(67)
  })
})

describe('useAppStore - Quiz', () => {
  it('handles correct quiz answer', () => {
    useAppStore.setState({
      quizType: 'alpha',
      quizWord: { char: 'அ', name: 'a', english: 'a' },
      selectedAnswer: null,
      quizFeedback: null,
      score: { correct: 0, wrong: 0 },
    })
    const state = useAppStore.getState()
    const correct = state.handleQuizAnswer({ char: 'அ', name: 'a', english: 'a' })
    const newState = useAppStore.getState()
    expect(correct).toBe(true)
    expect(newState.quizFeedback).toBe('correct')
    expect(newState.score.correct).toBe(1)
    expect(newState.xp).toBe(5)
  })

  it('handles wrong quiz answer', () => {
    useAppStore.setState({
      quizType: 'alpha',
      quizWord: { char: 'அ', name: 'a', english: 'a' },
      selectedAnswer: null,
      quizFeedback: null,
      score: { correct: 0, wrong: 0 },
    })
    const state = useAppStore.getState()
    const correct = state.handleQuizAnswer({ char: 'ஆ', name: 'aa', english: 'aa' })
    const newState = useAppStore.getState()
    expect(correct).toBe(false)
    expect(newState.quizFeedback).toBe('wrong')
    expect(newState.score.wrong).toBe(1)
    expect(newState.xp).toBe(0)
  })

  it('does not allow second answer after selection', () => {
    useAppStore.setState({
      quizType: 'alpha',
      quizWord: { char: 'அ', name: 'a', english: 'a' },
      selectedAnswer: { char: 'அ', name: 'a', english: 'a' },
      quizFeedback: 'correct',
      score: { correct: 1, wrong: 0 },
    })
    const state = useAppStore.getState()
    const correct = state.handleQuizAnswer({ char: 'ஆ', name: 'aa', english: 'aa' })
    const newState = useAppStore.getState()
    expect(correct).toBe(false)
    expect(newState.score.correct).toBe(1)
  })
})

describe('useAppStore - Journey', () => {
  it('starts journey with correct defaults', () => {
    const state = useAppStore.getState()
    state.startJourney()
    const newState = useAppStore.getState()
    expect(newState.journeyStartDate).toBeTruthy()
    expect(newState.currentJourneyDay).toBe(1)
    expect(newState.journeyStreak).toBe(1)
  })

  it('completes day and advances', () => {
    const state = useAppStore.getState()
    state.startJourney()
    const result = state.completeDay(1, 50)
    const newState = useAppStore.getState()
    expect(newState.completedJourneyDays).toContain(1)
    expect(newState.currentJourneyDay).toBe(2)
    expect(result.xpEarned).toBe(50)
  })

  it('calculates journey progress', () => {
    useAppStore.setState({
      completedJourneyDays: [1, 2, 3, 4, 5],
      journeyXP: 250,
      journeyStreak: 5,
    })
    const state = useAppStore.getState()
    const progress = state.getJourneyProgress()
    expect(progress.completedDays).toBe(5)
    expect(progress.totalXP).toBe(250)
    expect(progress.streak).toBe(5)
    expect(progress.percent).toBe(17)
  })
})

describe('useAppStore - Progress Calculation', () => {
  it('calculates overall percentage', () => {
    useAppStore.setState({
      currentLanguage: 'tamil',
      learnedAlphabets: ['அ', 'ஆ', 'இ'],
      learnedWords: ['hello', 'world'],
    })
    const state = useAppStore.getState()
    const pct = state.getOverallPct()
    expect(pct).toBeGreaterThan(0)
    expect(pct).toBeLessThanOrEqual(100)
  })

  it('calculates alphabet percentage', () => {
    useAppStore.setState({
      currentLanguage: 'tamil',
      learnedAlphabets: ['அ', 'ஆ', 'இ'],
    })
    const state = useAppStore.getState()
    const pct = state.getAlphaPct()
    expect(pct).toBeGreaterThan(0)
    expect(pct).toBeLessThanOrEqual(100)
  })

  it('returns 0 when no progress', () => {
    const state = useAppStore.getState()
    expect(state.getOverallPct()).toBe(0)
    expect(state.getAlphaPct()).toBe(0)
    expect(state.getWordPct()).toBe(0)
  })
})

describe('useAppStore - Reset', () => {
  it('resets all progress', () => {
    useAppStore.setState({
      learnedWords: ['hello'],
      learnedAlphabets: ['அ'],
      xp: 100,
      level: 2,
      streak: 5,
    })
    const state = useAppStore.getState()
    state.resetProgress()
    const newState = useAppStore.getState()
    expect(newState.learnedWords).toEqual([])
    expect(newState.learnedAlphabets).toEqual([])
    expect(newState.xp).toBe(0)
    expect(newState.level).toBe(1)
    expect(newState.streak).toBe(0)
  })
})
