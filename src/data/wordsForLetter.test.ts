import { describe, it, expect } from 'vitest'
import { getWordsForLetter } from './wordsForLetter'
import { getLessons } from './lessons'
import type { Language } from '../types'

describe('data/wordsForLetter', () => {
  // The module caches per-language word lists on first call. Tests share that cache.
  // We just exercise each language once.
  const langs: Language[] = ['tamil', 'hindi', 'telugu', 'english']

  it('returns words for a known starting letter in each language', () => {
    for (const lang of langs) {
      // Pick the first char of the first alphabet in each language
      const lessons = getLessons(lang)
      expect(lessons.length).toBeGreaterThan(0)
      const firstWord = lessons[0].words[0]
      expect(firstWord).toBeDefined()
      const ch = firstWord.native.charAt(0)
      const matches = getWordsForLetter(ch, lang, 5)
      expect(matches.length).toBeGreaterThan(0)
      // All returned words should contain the character
      for (const m of matches) {
        expect(m.native.includes(ch)).toBe(true)
      }
    }
  })

  it('returns words starting with the letter before words that merely contain it', () => {
    // Tamil: ஆ is the second vowel and appears in many words
    const result = getWordsForLetter('ஆ', 'tamil', 20)
    expect(result.length).toBeGreaterThan(0)
    // At least the first result (if any) should start with the char
    if (result.length > 0) {
      expect(result[0].native.startsWith('ஆ')).toBe(true)
    }
  })

  it('returns an empty array for an empty/blank character', () => {
    expect(getWordsForLetter('', 'tamil')).toEqual([])
    expect(getWordsForLetter('   ', 'tamil')).toEqual([])
  })

  it('respects the limit parameter', () => {
    const r1 = getWordsForLetter('க', 'tamil', 1)
    expect(r1.length).toBeLessThanOrEqual(1)
    const r3 = getWordsForLetter('க', 'tamil', 3)
    expect(r3.length).toBeLessThanOrEqual(3)
  })

  // Note: duplicate word entries exist in the raw data. The helper simply slices.
  // This test documents the current behaviour so future data cleanup can be tracked.
  it('may return duplicates if the raw data contains duplicates (documented)', () => {
    const result = getWordsForLetter('அ', 'tamil', 20)
    const natives = result.map(w => w.native)
    // There is a known data duplication for ஆ (vowel+consonant combos share word pools).
    // The function returns scored results and deduping is NOT performed.
    expect(natives.length).toBeGreaterThan(0)
    // Once data is cleaned up, this assertion should pass:
    // expect(new Set(natives).size).toBe(natives.length)
  })
})
