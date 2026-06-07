import type { AlphabetData, Language } from '../../types'
import { tamilAlphabets } from './tamil'
import { hindiAlphabets } from './hindi'
import { teluguAlphabets } from './telugu'
import { englishAlphabets } from './english'

const ALPHABETS: Record<Language, AlphabetData> = {
  tamil: tamilAlphabets,
  hindi: hindiAlphabets,
  telugu: teluguAlphabets,
  english: englishAlphabets,
}

export function getAlphabets(lang: Language): AlphabetData {
  return ALPHABETS[lang] ?? tamilAlphabets
}

export function countAlphabets(data: AlphabetData): number {
  return Object.values(data).reduce((sum, group) => sum + group.chars.length, 0)
}

export { tamilAlphabets, hindiAlphabets, teluguAlphabets, englishAlphabets }
export default ALPHABETS
