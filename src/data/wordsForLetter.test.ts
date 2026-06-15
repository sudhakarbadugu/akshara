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

  it('tamil picture-word categories are prioritized over generic lessons', () => {
    // Picture-word category id 20 (Uyir Ezhuthu) should be returned first for அ
    const words = getWordsForLetter('அ', 'tamil', 10)
    expect(words.length).toBeGreaterThan(0)
    // First word should be from picture-word category (e.g., அணில் from category 20)
    // Old generic words like அப்பா/அம்மா (from category 1) should not be the top hits
    const firstWord = words[0]
    expect(
      ['அணில்', 'அன்னாசி', 'அடவி', 'அன்னம்'].includes(firstWord.native),
      `Expected first word to be a picture word, got: ${firstWord.native}`
    ).toBe(true)
  })

  it('tamil picture-word categories prioritized for ஆ', () => {
    // Picture words like ஆடு, ஆமை, ஆடி should be in the results for ஆ
    const words = getWordsForLetter('ஆ', 'tamil', 10)
    expect(words.length).toBeGreaterThan(0)
    const nativeWords = words.map(w => w.native)
    expect(
      nativeWords.some(w => ['ஆடு', 'ஆமை', 'ஆடி', 'ஆந்தை', 'ஆலை'].includes(w)),
      `Expected picture words like ஆடு/ஆமை, got: ${nativeWords.join(', ')}`
    ).toBe(true)
  })
})
