import { describe, it, expect } from 'vitest'
import { getLessons, countLessons } from './index'
import type { Language } from '../../types'

describe('data/lessons', () => {
  const langs: Language[] = ['tamil', 'hindi', 'telugu', 'english']

  it('returns a non-empty lesson list for every language', () => {
    for (const lang of langs) {
      const lessons = getLessons(lang)
      expect(lessons.length).toBeGreaterThan(0)
      const totalWords = countLessons(lessons)
      expect(totalWords).toBeGreaterThan(0)
    }
  })

  it('every lesson category has a name and at least one word', () => {
    for (const lang of langs) {
      const lessons = getLessons(lang)
      for (const lesson of lessons) {
        expect(lesson.category, `${lang}: lesson should have a category`).toBeTruthy()
        expect(lesson.words.length, `${lang}:${lesson.category} should have words`).toBeGreaterThan(0)
        expect(typeof lesson.id).toBe('number')
      }
    }
  })

  it('every word has the required fields', () => {
    for (const lang of langs) {
      const lessons = getLessons(lang)
      for (const lesson of lessons) {
        for (const w of lesson.words) {
          expect(w.english, `${lang}:${w.native} should have english`).toBeTruthy()
          expect(w.native, `${lang} word should have native script`).toBeTruthy()
          expect(w.pronunciation, `${lang}:${w.native} should have pronunciation`).toBeTruthy()
          expect(w.meaning, `${lang}:${w.native} should have meaning`).toBeTruthy()
        }
      }
    }
  })

  it('lesson ids are unique within a language', () => {
    for (const lang of langs) {
      const lessons = getLessons(lang)
      const ids = lessons.map(l => l.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('tamil includes picture words extracted from workbook', () => {
    const lessons = getLessons('tamil')
    const pictureWordCategories = lessons.filter(l => 
      l.category.toLowerCase().includes('picture words') ||
      l.category.toLowerCase().includes('uyir ezhuthu') ||
      l.category.toLowerCase().includes('meí ezhuthu')
    )
    expect(pictureWordCategories.length).toBeGreaterThan(0)
    
    // Verify each category has words
    for (const cat of pictureWordCategories) {
      expect(cat.words.length).toBeGreaterThan(0)
    }
  })

  it('tamil picture words include expected key items', () => {
    const lessons = getLessons('tamil')
    const allWords = lessons.flatMap(l => l.words)
    const englishWords = allWords.map(w => w.english.toLowerCase())
    
    // Animals from workbook
    expect(englishWords).toContain('goat')
    expect(englishWords).toContain('tortoise')
    expect(englishWords).toContain('crow')
    expect(englishWords).toContain('owl')
    
    // Objects from workbook
    expect(englishWords).toContain('house')
    expect(englishWords).toContain('mirror')
    expect(englishWords).toContain('box')
    expect(englishWords).toContain('bed')
    expect(englishWords).toContain('swing')
    expect(englishWords).toContain('fan')
    
    // Nature from workbook
    expect(englishWords).toContain('tree')
    expect(englishWords).toContain('leaf')
    expect(englishWords).toContain('coconut')
    expect(englishWords).toContain('apple')
  })
})
