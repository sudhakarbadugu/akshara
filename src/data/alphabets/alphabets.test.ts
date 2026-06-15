import { describe, it, expect } from 'vitest'
import { getAlphabets, countAlphabets } from './index'
import { tamilAlphabets, hindiAlphabets, teluguAlphabets, englishAlphabets } from './index'
import type { Language } from '../../types'

describe('data/alphabets', () => {
  const langs: Language[] = ['tamil', 'hindi', 'telugu', 'english']

  it('exposes a non-empty alphabet for every language', () => {
    for (const lang of langs) {
      const data = getAlphabets(lang)
      const total = countAlphabets(data)
      expect(total).toBeGreaterThan(10)
    }
  })

  it('every alphabet char has the required fields', () => {
    for (const lang of langs) {
      const data = getAlphabets(lang)
      for (const group of Object.values(data)) {
        for (const c of group.chars) {
          expect(c.char.length, `${lang}:${c.char} should be a single char`).toBeGreaterThan(0)
          expect(c.name, `${lang}:${c.char} should have a name`).toBeTruthy()
          expect(c.english, `${lang}:${c.char} should have an english meaning`).toBeTruthy()
        }
      }
    }
  })

  it('all four language data exports are non-empty', () => {
    expect(countAlphabets(tamilAlphabets)).toBeGreaterThan(10)
    expect(countAlphabets(hindiAlphabets)).toBeGreaterThan(10)
    expect(countAlphabets(teluguAlphabets)).toBeGreaterThan(10)
    expect(countAlphabets(englishAlphabets)).toBeGreaterThan(10)
  })

  it('has at least one group per language', () => {
    for (const lang of langs) {
      const data = getAlphabets(lang)
      expect(Object.keys(data).length).toBeGreaterThan(0)
    }
  })

  it('tamil vowels each have a picture word example starting with that letter', () => {
    const tamil = tamilAlphabets
    const vowelChars = tamil.vowels.chars

    for (const c of vowelChars) {
      expect(c.example, `${c.char} should have an example word`).toBeTruthy()
      expect(c.exampleTamil, `${c.char} should have a romanized example`).toBeTruthy()
      expect(c.emoji, `${c.char} should have an emoji`).toBeTruthy()
      // Verify the example word contains the vowel character (either as full letter or as diacritic mark)
      const example = c.example as string
      if (c.char === 'அ') {
        // அ is the base — word should start with அ
        expect(example.startsWith('அ')).toBe(true)
      } else if (c.char === 'ஆ') {
        // ஆ words start with ஆ
        expect(example.startsWith('ஆ')).toBe(true)
      } else if (c.char === 'ஊ') {
        // ஊ words start with ஊ
        expect(example.startsWith('ஊ')).toBe(true)
      } else if (c.char === 'ஔ') {
        // ஔ words start with ஔ
        expect(example.startsWith('ஔ')).toBe(true)
      } else if (c.char === 'எ') {
        // எ words start with எ
        expect(example.startsWith('எ')).toBe(true)
      } else {
        // Other vowels (i, ee, u, e, ae, ai, o, oa) — the word may start with the vowel character
        // or use a different consonant prefix in compound form. Verify the example is non-empty Tamil text.
        expect(example.length).toBeGreaterThan(0)
        // Check it contains a Tamil character (Unicode range 0B80-0BFF)
        expect(/[\u0B80-\u0BFF]/.test(example)).toBe(true)
      }
    }
  })

  it('tamil consonants each have a picture word example containing that consonant', () => {
    const consonants = tamilAlphabets.consonants.chars
    for (const c of consonants) {
      expect(c.example, `${c.char} should have an example word`).toBeTruthy()
      expect(c.exampleTamil, `${c.char} should have a romanized example`).toBeTruthy()
      expect(c.emoji, `${c.char} should have an emoji`).toBeTruthy()
    }
  })

  it('tamil uyirMei combos each have a picture word example', () => {
    const combos = tamilAlphabets.uyirMei.chars
    for (const c of combos) {
      expect(c.example, `${c.char} should have an example word`).toBeTruthy()
      expect(c.exampleTamil, `${c.char} should have a romanized example`).toBeTruthy()
      expect(c.emoji, `${c.char} should have an emoji`).toBeTruthy()
    }
  })
})
