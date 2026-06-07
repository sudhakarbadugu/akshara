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
})
