import { describe, it, expect } from 'vitest'
import { getDialogues, tamilDialogues, hindiDialogues, teluguDialogues, englishDialogues } from './index'
import type { Language } from '../../types'

describe('data/dialogues', () => {
  const langs: Language[] = ['tamil', 'hindi', 'telugu', 'english']

  it('returns non-empty dialogues for every language', () => {
    for (const lang of langs) {
      const dialogues = getDialogues(lang)
      expect(dialogues.length, `${lang} should have dialogues`).toBeGreaterThan(0)
    }
  })

  it('every dialogue has required fields', () => {
    for (const lang of langs) {
      const dialogues = getDialogues(lang)
      for (const d of dialogues) {
        expect(d.id, `${lang}: dialogue should have id`).toBeTruthy()
        expect(d.title, `${lang}: dialogue should have title`).toBeTruthy()
        expect(d.scenario, `${lang}: dialogue should have scenario`).toBeTruthy()
        expect(d.emoji, `${lang}: dialogue should have emoji`).toBeTruthy()
        expect(d.lines.length, `${lang}: dialogue should have lines`).toBeGreaterThan(0)
      }
    }
  })

  it('every dialogue line has required fields', () => {
    for (const lang of langs) {
      const dialogues = getDialogues(lang)
      for (const d of dialogues) {
        for (const line of d.lines) {
          expect(['A', 'B']).toContain(line.speaker)
          expect(line.english, `${lang}:${d.id} line should have english`).toBeTruthy()
          expect(line.native, `${lang}:${d.id} line should have native`).toBeTruthy()
          expect(line.pronunciation, `${lang}:${d.id} line should have pronunciation`).toBeTruthy()
        }
      }
    }
  })

  it('all four language exports are non-empty', () => {
    expect(tamilDialogues.length).toBeGreaterThan(0)
    expect(hindiDialogues.length).toBeGreaterThan(0)
    expect(teluguDialogues.length).toBeGreaterThan(0)
    expect(englishDialogues.length).toBeGreaterThan(0)
  })

  it('getDialogues falls back to tamil for unknown language', () => {
    const fallback = getDialogues('unknown' as Language)
    const tamil = getDialogues('tamil')
    expect(fallback).toEqual(tamil)
  })

  it('dialogue IDs are unique per language', () => {
    for (const lang of langs) {
      const dialogues = getDialogues(lang)
      const ids = dialogues.map(d => d.id)
      const unique = new Set(ids)
      expect(unique.size, `${lang}: dialogue IDs should be unique`).toBe(ids.length)
    }
  })
})
