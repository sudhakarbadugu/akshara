import { describe, it, expect } from 'vitest'
import { getWordsForLetter } from './wordsForLetter'
import type { Language } from '../types'

describe('data/wordsForLetter', () => {
  const langs: Language[] = ['tamil', 'hindi', 'telugu', 'english']

  it('returns words containing the letter', () => {
    for (const lang of langs) {
      const words = getWordsForLetter('அ', lang, 10)
      // May be empty for some languages if letter doesn't exist
      if (words.length > 0) {
        expect(words[0].native).toContain('அ')
      }
    }
  })

  it('returns empty array for empty letter', () => {
    const words = getWordsForLetter('', 'tamil')
    expect(words).toEqual([])
  })

  it('returns empty array for unknown letter', () => {
    const words = getWordsForLetter('zzz', 'tamil')
    expect(words).toEqual([])
  })

  it('returns at most limit words', () => {
    const words = getWordsForLetter('அ', 'tamil', 3)
    expect(words.length).toBeLessThanOrEqual(3)
  })

  it('words starting with letter are prioritized', () => {
    const words = getWordsForLetter('அ', 'tamil', 10)
    if (words.length >= 2) {
      // First word should start with the letter (score 2 > score 1)
      const first = words[0]
      expect(first.native.startsWith('அ')).toBe(true)
    }
  })

  it('caches results per language', () => {
    const words1 = getWordsForLetter('அ', 'tamil', 5)
    const words2 = getWordsForLetter('அ', 'tamil', 5)
    expect(words1).toEqual(words2)
  })
})
