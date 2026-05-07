import type { LessonCategory, Language } from '../../types'
import { tamilLessons } from './tamil'
import { hindiLessons } from './hindi'
import { teluguLessons } from './telugu'

const LESSONS: Record<Language, LessonCategory[]> = {
  tamil: tamilLessons,
  hindi: hindiLessons,
  telugu: teluguLessons,
}

export function getLessons(lang: Language): LessonCategory[] {
  return LESSONS[lang] ?? tamilLessons
}

export function countLessons(cats: LessonCategory[]): number {
  return cats.reduce((sum, c) => sum + c.words.length, 0)
}

export { tamilLessons, hindiLessons, teluguLessons }
export default LESSONS
