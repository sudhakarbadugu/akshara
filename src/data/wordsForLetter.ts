import type { WordItem, Language } from '../types'
import { getLessons } from './lessons'

// Simple in-memory cache
const cache: Record<Language, WordItem[] | undefined> = {
  telugu: undefined,
  tamil: undefined,
  hindi: undefined,
}

function allWords(lang: Language): WordItem[] {
  if (!cache[lang]) {
    cache[lang] = getLessons(lang).flatMap(c => c.words)
  }
  return cache[lang]!
}

/**
 * Get up to `limit` words that contain the given letter character.
 * Words starting with the letter are returned first.
 */
export function getWordsForLetter(letter: string, lang: Language, limit = 10): WordItem[] {
  const words = allWords(lang)
  const ch = letter.trim()
  if (!ch) return []

  const scored = words
    .map(w => {
      const starts = w.native.startsWith(ch)
      const contains = w.native.includes(ch)
      if (!starts && !contains) return null
      return { word: w, score: starts ? 2 : 1 }
    })
    .filter(Boolean) as { word: WordItem; score: number }[]

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map(s => s.word)
}

export default getWordsForLetter
