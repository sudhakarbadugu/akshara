import type { DialogueItem, Language } from '../../types'
import { tamilDialogues } from './tamil'
import { hindiDialogues } from './hindi'
import { teluguDialogues } from './telugu'
import { englishDialogues } from './english'

const DIALOGUES: Record<Language, DialogueItem[]> = {
  tamil: tamilDialogues,
  hindi: hindiDialogues,
  telugu: teluguDialogues,
  english: englishDialogues,
}

export function getDialogues(lang: Language): DialogueItem[] {
  return DIALOGUES[lang] ?? tamilDialogues
}

export { tamilDialogues, hindiDialogues, teluguDialogues, englishDialogues }
export default DIALOGUES