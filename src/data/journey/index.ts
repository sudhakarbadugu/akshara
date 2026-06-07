// Journey data exports
import { teluguJourney } from './telugu'
import { hindiJourney } from './hindi'
import { tamilJourney } from './tamil'
import { englishJourney } from './english'
import type { JourneyDay, Language } from '../../types'

export const getJourney = (lang: Language): JourneyDay[] => {
  if (lang === 'telugu') return teluguJourney
  if (lang === 'hindi') return hindiJourney
  if (lang === 'english') return englishJourney
  return tamilJourney
}

export { teluguJourney, hindiJourney, tamilJourney, englishJourney }