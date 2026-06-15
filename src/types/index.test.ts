import { describe, it, expect } from 'vitest'
import { alphabetToFlashcardItem, wordToFlashcardItem } from './index'
import type { AlphabetChar, WordItem } from './index'

describe('types/helpers', () => {
  const mockAlphabet: AlphabetChar = {
    char: 'அ',
    name: 'a',
    english: 'A',
    keyword: 'apple',
    keywordTamil: 'ஆப்பிள்',
    emoji: '🍎',
    example: 'A is for apple',
    tip: 'Open your mouth wide',
  }

  const mockWord: WordItem = {
    english: 'Hello',
    native: 'வணக்கம்',
    pronunciation: 'vanakkam',
    meaning: 'A greeting',
  }

  it('converts alphabet to flashcard item', () => {
    const flashcard = alphabetToFlashcardItem(mockAlphabet)
    expect(flashcard.display).toBe('அ')
    expect(flashcard.name).toBe('a')
    expect(flashcard.english).toBe('A')
    expect(flashcard.keyword).toBe('apple')
    expect(flashcard.keywordNative).toBe('ஆப்பிள்')
    expect(flashcard.emoji).toBe('🍎')
    expect(flashcard.example).toBe('A is for apple')
    expect(flashcard.tip).toBe('Open your mouth wide')
  })

  it('converts word to flashcard item', () => {
    const flashcard = wordToFlashcardItem(mockWord)
    expect(flashcard.display).toBe('வணக்கம்')
    expect(flashcard.name).toBe('vanakkam')
    expect(flashcard.english).toBe('Hello')
    expect(flashcard.keywordNative).toBe('வணக்கம்')
    expect(flashcard.emoji).toBe('💬')
    expect(flashcard.example).toBe('A greeting')
  })

  it('handles alphabet without optional fields', () => {
    const minimalAlphabet: AlphabetChar = {
      char: 'அ',
      name: 'a',
      english: 'A',
    }
    const flashcard = alphabetToFlashcardItem(minimalAlphabet)
    expect(flashcard.display).toBe('அ')
    expect(flashcard.keyword).toBeUndefined()
    expect(flashcard.emoji).toBeUndefined()
  })
})
