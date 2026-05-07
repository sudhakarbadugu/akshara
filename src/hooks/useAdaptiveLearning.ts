import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEYS = {
  weakLetters: 'langWeakLetters',
  lastSession: 'langLastSession',
  quizHistory: 'langQuizHistory',
}

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

function saveJSON(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export function useAdaptiveLearning() {
  const [weakLetters, setWeakLetters] = useState<Record<string, number>>(() => loadJSON(STORAGE_KEYS.weakLetters, {}))
  const [lastSession, setLastSession] = useState<{ page: string; context: Record<string, unknown>; time: number } | null>(() => loadJSON(STORAGE_KEYS.lastSession, null))
  const [quizHistory, setQuizHistory] = useState<{ char: string; correct: boolean; time: number }[]>(() => loadJSON(STORAGE_KEYS.quizHistory, []))

  useEffect(() => saveJSON(STORAGE_KEYS.weakLetters, weakLetters), [weakLetters])
  useEffect(() => { if (lastSession) saveJSON(STORAGE_KEYS.lastSession, lastSession) }, [lastSession])
  useEffect(() => saveJSON(STORAGE_KEYS.quizHistory, quizHistory), [quizHistory])

  const recordWrong = useCallback((char: string) => {
    setWeakLetters(prev => {
      const next = { ...prev }
      next[char] = (next[char] || 0) + 1
      return next
    })
    setQuizHistory(prev => [...prev.slice(-99), { char, correct: false, time: Date.now() }])
  }, [])

  const recordCorrect = useCallback((char: string) => {
    setWeakLetters(prev => {
      const next = { ...prev }
      if (next[char]) {
        next[char] = Math.max(0, next[char] - 1)
        if (next[char] === 0) delete next[char]
      }
      return next
    })
    setQuizHistory(prev => [...prev.slice(-99), { char, correct: true, time: Date.now() }])
  }, [])

  const getWeakLetters = useCallback((allChars: string[] = []): string[] => {
    const entries = Object.entries(weakLetters)
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
    const weakChars = entries.map(([char]) => char)
    if (allChars.length) {
      return weakChars.filter(c => allChars.includes(c))
    }
    return weakChars
  }, [weakLetters])

  const getSuggestions = useCallback((allChars: string[] = [], count = 5): string[] => {
    const weak = getWeakLetters(allChars)
    if (weak.length) return weak.slice(0, count)
    const shuffled = [...allChars].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }, [getWeakLetters])

  const saveSession = useCallback((page: string, context: Record<string, unknown> = {}) => {
    setLastSession({ page, context, time: Date.now() })
  }, [])

  const shouldShowContinue = useCallback((): boolean => {
    if (!lastSession) return false
    const hoursSince = (Date.now() - lastSession.time) / (1000 * 60 * 60)
    return hoursSince < 48
  }, [lastSession])

  const getAccuracy = useCallback((char: string): number | null => {
    const relevant = quizHistory.filter(q => q.char === char)
    if (!relevant.length) return null
    const correct = relevant.filter(q => q.correct).length
    return Math.round((correct / relevant.length) * 100)
  }, [quizHistory])

  return {
    weakLetters,
    recordWrong,
    recordCorrect,
    getWeakLetters,
    getSuggestions,
    saveSession,
    shouldShowContinue,
    getAccuracy,
    quizHistory,
  }
}

export default useAdaptiveLearning
