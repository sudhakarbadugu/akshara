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
})
