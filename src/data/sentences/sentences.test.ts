import { describe, it, expect } from 'vitest'
import { getSentences, tamilSentences, hindiSentences, teluguSentences, englishSentences } from './index'
import type { Language } from '../../types'

describe('data/sentences', () => {
  const langs: Language[] = ['tamil', 'hindi', 'telugu', 'english']

  it('returns non-empty sentences for every language', () => {
    for (const lang of langs) {
      const sentences = getSentences(lang)
      expect(sentences.length, `${lang} should have sentences`).toBeGreaterThan(0)
    }
  })

  it('every sentence has required fields', () => {
    for (const lang of langs) {
      const sentences = getSentences(lang)
      for (const s of sentences) {
        expect(s.english, `${lang}: sentence should have english`).toBeTruthy()
        expect(s.native, `${lang}: sentence should have native`).toBeTruthy()
        expect(s.pronunciation, `${lang}: sentence should have pronunciation`).toBeTruthy()
        expect(s.meaning, `${lang}: sentence should have meaning`).toBeTruthy()
      }
    }
  })

  it('all four language exports are non-empty', () => {
    expect(tamilSentences.length).toBeGreaterThan(0)
    expect(hindiSentences.length).toBeGreaterThan(0)
    expect(teluguSentences.length).toBeGreaterThan(0)
    expect(englishSentences.length).toBeGreaterThan(0)
  })

  it('getSentences falls back to tamil for unknown language', () => {
    const fallback = getSentences('unknown' as Language)
    const tamil = getSentences('tamil')
    expect(fallback).toEqual(tamil)
  })
})
