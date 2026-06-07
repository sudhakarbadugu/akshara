import { describe, it, expect } from 'vitest'
import { LANGUAGES, DEFAULT_LANGUAGE, getLanguageConfig } from './languages'
import type { Language } from '../types'

describe('i18n/languages', () => {
  it('exposes a config for every supported language', () => {
    const expected: Language[] = ['tamil', 'hindi', 'telugu', 'english']
    for (const lang of expected) {
      expect(LANGUAGES[lang]).toBeDefined()
      expect(LANGUAGES[lang].code).toBeTruthy()
      expect(LANGUAGES[lang].name).toBeTruthy()
      expect(LANGUAGES[lang].nativeName).toBeTruthy()
      expect(LANGUAGES[lang].voiceLang).toBeTruthy()
    }
  })

  it('uses BCP-47 voice codes for TTS', () => {
    expect(LANGUAGES.tamil.voiceLang).toBe('ta-IN')
    expect(LANGUAGES.hindi.voiceLang).toBe('hi-IN')
    expect(LANGUAGES.telugu.voiceLang).toBe('te-IN')
    expect(LANGUAGES.english.voiceLang).toBe('en-US')
  })

  it('defaults to tamil when no language is set', () => {
    expect(DEFAULT_LANGUAGE).toBe('tamil')
  })

  it('getLanguageConfig falls back to default for unknown languages', () => {
    const fallback = getLanguageConfig('tamil' as Language)
    expect(fallback).toEqual(LANGUAGES.tamil)
  })

  it('every config marks a script direction', () => {
    for (const cfg of Object.values(LANGUAGES)) {
      expect(['ltr', 'rtl']).toContain(cfg.script)
    }
  })
})
