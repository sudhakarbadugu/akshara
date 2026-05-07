import type { DialogueItem, Language } from '../../types'
import { tamilDialogues } from './tamil'
import { hindiDialogues } from './hindi'
import { teluguDialogues } from './telugu'

const DIALOGUES: Record<Language, DialogueItem[]> = {
  tamil: tamilDialogues,
  hindi: hindiDialogues,
  telugu: teluguDialogues,
}

export function getDialogues(lang: Language): DialogueItem[] {
  return DIALOGUES[lang] ?? tamilDialogues
}

export { tamilDialogues, hindiDialogues, teluguDialogues }
export default DIALOGUES
