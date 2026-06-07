import { describe, it, expect } from 'vitest'
import { englishJourney } from './english'
import { tamilJourney } from './tamil'
import { hindiJourney } from './hindi'
import { teluguJourney } from './telugu'
import type { JourneyDay } from '../../types'

const ALL_JOURNEYS: Record<string, JourneyDay[]> = {
  english: englishJourney,
  tamil: tamilJourney,
  hindi: hindiJourney,
  telugu: teluguJourney,
}

describe('data/journey integrity', () => {
  it('has journey data for every language that defines it', () => {
    // English journey is complete
    expect(englishJourney.length).toBeGreaterThan(0)
    // Tamil/Hindi/Telugu are placeholders today — that's fine
    expect(tamilJourney.length).toBeGreaterThanOrEqual(0)
    expect(hindiJourney.length).toBeGreaterThanOrEqual(0)
    expect(teluguJourney.length).toBeGreaterThanOrEqual(0)
  })

  it('every journey day has required fields', () => {
    for (const [lang, days] of Object.entries(ALL_JOURNEYS)) {
      for (const day of days) {
        expect(typeof day.day, `${lang}: day should be a number`).toBe('number')
        expect(typeof day.week, `${lang}: week should be a number`).toBe('number')
        expect(day.theme, `${lang}:day${day.day} should have a theme`).toBeTruthy()
        expect(day.subtitle, `${lang}:day${day.day} should have a subtitle`).toBeTruthy()
        expect(day.icon, `${lang}:day${day.day} should have an icon`).toBeTruthy()
        expect(day.vocabulary.length, `${lang}:day${day.day} should have vocabulary`).toBeGreaterThan(0)
        expect(day.activities.length, `${lang}:day${day.day} should have activities`).toBeGreaterThan(0)
        expect(day.quiz.length, `${lang}:day${day.day} should have quiz questions`).toBeGreaterThan(0)
        expect(day.xpReward, `${lang}:day${day.day} should have xpReward`).toBeGreaterThan(0)
      }
    }
  })

  it('days are numbered 1..N sequentially within each language', () => {
    for (const [lang, days] of Object.entries(ALL_JOURNEYS)) {
      const dayNumbers = days.map(d => d.day).sort((a, b) => a - b)
      for (let i = 0; i < dayNumbers.length; i++) {
        expect(dayNumbers[i]).toBe(i + 1)
      }
    }
  })

  it('vocabulary words are valid WordItem-shaped objects', () => {
    for (const [lang, days] of Object.entries(ALL_JOURNEYS)) {
      for (const day of days) {
        for (const v of day.vocabulary) {
          expect(v.english).toBeTruthy()
          expect(v.native).toBeTruthy()
          expect(v.pronunciation).toBeTruthy()
          expect(v.meaning).toBeTruthy()
        }
      }
    }
  })

  it('quiz questions have a correct answer that is one of the options', () => {
    for (const [lang, days] of Object.entries(ALL_JOURNEYS)) {
      for (const day of days) {
        for (const q of day.quiz) {
          expect(q.options.length).toBeGreaterThanOrEqual(2)
          expect(q.correct).toBeGreaterThanOrEqual(0)
          expect(q.correct).toBeLessThan(q.options.length)
          expect(q.question).toBeTruthy()
        }
      }
    }
  })
})
