import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAdaptiveLearning } from './useAdaptiveLearning'

describe('useAdaptiveLearning', () => {
  const mockStorage: Record<string, string> = {}

  beforeEach(() => {
    Object.keys(mockStorage).forEach(k => delete mockStorage[k])
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => mockStorage[key] || null,
      setItem: (key: string, value: string) => { mockStorage[key] = value },
    })
  })

  it('initializes with empty state', () => {
    const { result } = renderHook(() => useAdaptiveLearning())
    expect(result.current.weakLetters).toEqual({})
    expect(result.current.quizHistory).toEqual([])
  })

  it('records wrong answer', () => {
    const { result } = renderHook(() => useAdaptiveLearning())
    act(() => { result.current.recordWrong('A') })
    expect(result.current.weakLetters['A']).toBe(1)
    expect(result.current.quizHistory.length).toBe(1)
    expect(result.current.quizHistory[0].correct).toBe(false)
  })

  it('records multiple wrong answers', () => {
    const { result } = renderHook(() => useAdaptiveLearning())
    act(() => { result.current.recordWrong('A') })
    act(() => { result.current.recordWrong('A') })
    expect(result.current.weakLetters['A']).toBe(2)
  })

  it('records correct answer and decrements weak count', () => {
    const { result } = renderHook(() => useAdaptiveLearning())
    act(() => { result.current.recordWrong('A') })
    act(() => { result.current.recordWrong('A') })
    act(() => { result.current.recordCorrect('A') })
    expect(result.current.weakLetters['A']).toBe(1)
    expect(result.current.quizHistory.length).toBe(3)
    expect(result.current.quizHistory[2].correct).toBe(true)
  })

  it('removes letter from weak list when count reaches 0', () => {
    const { result } = renderHook(() => useAdaptiveLearning())
    act(() => { result.current.recordWrong('A') })
    act(() => { result.current.recordCorrect('A') })
    expect(result.current.weakLetters['A']).toBeUndefined()
  })

  it('gets weak letters with threshold', () => {
    const { result } = renderHook(() => useAdaptiveLearning())
    act(() => { result.current.recordWrong('A') })
    act(() => { result.current.recordWrong('A') })
    act(() => { result.current.recordWrong('B') })
    act(() => { result.current.recordWrong('B') })
    const weak = result.current.getWeakLetters()
    expect(weak).toContain('A')
    expect(weak).toContain('B')
  })

  it('filters weak letters by allChars', () => {
    const { result } = renderHook(() => useAdaptiveLearning())
    act(() => { result.current.recordWrong('A') })
    act(() => { result.current.recordWrong('A') })
    act(() => { result.current.recordWrong('B') })
    act(() => { result.current.recordWrong('B') })
    const weak = result.current.getWeakLetters(['A'])
    expect(weak).toContain('A')
    expect(weak).not.toContain('B')
  })

  it('sorts weak letters by count descending', () => {
    const { result } = renderHook(() => useAdaptiveLearning())
    act(() => { result.current.recordWrong('A') })
    act(() => { result.current.recordWrong('A') })
    act(() => { result.current.recordWrong('B') })
    const weak = result.current.getWeakLetters()
    expect(weak[0]).toBe('A') // A has count 2, B has count 1
  })

  it('returns weak letters in suggestions', () => {
    const { result } = renderHook(() => useAdaptiveLearning())
    act(() => { result.current.recordWrong('A') })
    act(() => { result.current.recordWrong('A') })
    const suggestions = result.current.getSuggestions(['A', 'B', 'C'], 5)
    expect(suggestions).toContain('A')
  })

  it('returns random suggestions when no weak letters', () => {
    const { result } = renderHook(() => useAdaptiveLearning())
    const suggestions = result.current.getSuggestions(['A', 'B', 'C'], 2)
    expect(suggestions.length).toBe(2)
    expect(suggestions.every(s => ['A', 'B', 'C'].includes(s))).toBe(true)
  })

  it('saves session', () => {
    const { result } = renderHook(() => useAdaptiveLearning())
    act(() => { result.current.saveSession('alphabet', { letter: 'A' }) })
    expect(result.current.shouldShowContinue()).toBe(true)
  })

  it('does not show continue after 48 hours', () => {
    const { result } = renderHook(() => useAdaptiveLearning())
    act(() => { result.current.saveSession('alphabet', { letter: 'A' }) })
    
    vi.useFakeTimers()
    vi.setSystemTime(Date.now() + 49 * 60 * 60 * 1000) // 49 hours later
    expect(result.current.shouldShowContinue()).toBe(false)
    vi.useRealTimers()
  })

  it('calculates accuracy for a character', () => {
    const { result } = renderHook(() => useAdaptiveLearning())
    act(() => { result.current.recordWrong('A') })
    act(() => { result.current.recordCorrect('A') })
    act(() => { result.current.recordCorrect('A') })
    const accuracy = result.current.getAccuracy('A')
    expect(accuracy).toBe(67) // 2 correct out of 3
  })

  it('returns null accuracy for unknown character', () => {
    const { result } = renderHook(() => useAdaptiveLearning())
    const accuracy = result.current.getAccuracy('Z')
    expect(accuracy).toBeNull()
  })

  it('limits quiz history to 100 entries', () => {
    const { result } = renderHook(() => useAdaptiveLearning())
    for (let i = 0; i < 105; i++) {
      act(() => { result.current.recordWrong('A') })
    }
    expect(result.current.quizHistory.length).toBe(100)
  })

  it('persists state to localStorage', () => {
    const { result } = renderHook(() => useAdaptiveLearning())
    act(() => { result.current.recordWrong('A') })
    
    expect(mockStorage['langWeakLetters']).toBeTruthy()
    expect(mockStorage['langQuizHistory']).toBeTruthy()
  })

  it('loads state from localStorage', () => {
    mockStorage['langWeakLetters'] = JSON.stringify({ A: 2 })
    mockStorage['langQuizHistory'] = JSON.stringify([{ char: 'A', correct: false, time: Date.now() }])
    
    const { result } = renderHook(() => useAdaptiveLearning())
    expect(result.current.weakLetters['A']).toBe(2)
    expect(result.current.quizHistory.length).toBe(1)
  })

  it('handles localStorage errors gracefully', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => { throw new Error('Storage error') },
      setItem: () => { throw new Error('Storage error') },
    })
    
    const { result } = renderHook(() => useAdaptiveLearning())
    expect(result.current.weakLetters).toEqual({})
    
    // Should not throw
    act(() => { result.current.recordWrong('A') })
  })
})
