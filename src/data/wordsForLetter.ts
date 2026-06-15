import type { WordItem, Language } from '../types'
import { getLessons } from './lessons'

// Simple in-memory cache
const cache: Record<Language, WordItem[] | undefined> = {
  telugu: undefined,
  tamil: undefined,
  hindi: undefined,
  english: undefined,
}

// Picture-word category ids for Tamil (from workbook extraction).
// These contain curated words that start with each Tamil letter and are
// given priority in getWordsForLetter() so the practice page surfaces them.
const TAMIL_PICTURE_CATEGORY_IDS = new Set([20, 21, 22, 23, 24, 25, 26, 27, 28, 29])

function allWords(lang: Language): WordItem[] {
  if (!cache[lang]) {
    cache[lang] = getLessons(lang).flatMap(c => c.words)
  }
  return cache[lang]!
}

/**
 * Get up to `limit` words that contain the given letter character.
 * Words starting with the letter are returned first.
 *
 * For Tamil, picture-word categories (workbook extraction) are prioritized
 * so the practice page surfaces curated words for each letter.
 */
export function getWordsForLetter(letter: string, lang: Language, limit = 10): WordItem[] {
  const words = allWords(lang)
  const ch = letter.trim()
  if (!ch) return []

  // For Tamil, look at the source category so we can boost picture words
  const lessons = lang === 'tamil' ? getLessons('tamil') : []

  const scored = words
    .map(w => {
      const starts = w.native.startsWith(ch)
      const contains = w.native.includes(ch)
      if (!starts && !contains) return null

      // Find the source category for this word
      const sourceCategory = lessons.find(c => c.words.includes(w))
      const isPicture = sourceCategory
        ? TAMIL_PICTURE_CATEGORY_IDS.has(sourceCategory.id)
        : false

      // Base score: starts (2) > contains (1)
      // Boost: picture words get +10 so they appear first
      let score = starts ? 2 : 1
      if (isPicture && starts) score = 12
      else if (isPicture) score = 11

      return { word: w, score }
    })
    .filter(Boolean) as { word: WordItem; score: number }[]

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map(s => s.word)
}

export default getWordsForLetter
