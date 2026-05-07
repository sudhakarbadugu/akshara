import type { Language, LanguageConfig } from '../types'

export const LANGUAGES: Record<Language, LanguageConfig> = {
  tamil: {
    code: 'ta-IN',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'ltr',
    flag: '🇮🇳',
    voiceLang: 'ta-IN',
  },
  hindi: {
    code: 'hi-IN',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    script: 'ltr',
    flag: '🇮🇳',
    voiceLang: 'hi-IN',
  },
  telugu: {
    code: 'te-IN',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    script: 'ltr',
    flag: '🇮🇳',
    voiceLang: 'te-IN',
  },
}

export const DEFAULT_LANGUAGE: Language = 'tamil'

export function getLanguageConfig(lang: Language): LanguageConfig {
  return LANGUAGES[lang] ?? LANGUAGES[DEFAULT_LANGUAGE]
}