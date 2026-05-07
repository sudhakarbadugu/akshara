import type { SentenceItem, Language } from '../../types'
import { tamilSentences } from './tamil'
import { hindiSentences } from './hindi'
import { teluguSentences } from './telugu'

const SENTENCES: Record<Language, SentenceItem[]> = {
  tamil: tamilSentences,
  hindi: hindiSentences,
  telugu: teluguSentences,
}

export function getSentences(lang: Language): SentenceItem[] {
  return SENTENCES[lang] ?? tamilSentences
}

export { tamilSentences, hindiSentences, teluguSentences }
export default SENTENCES
