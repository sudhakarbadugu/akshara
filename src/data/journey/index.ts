// Journey data exports
import { teluguJourney } from './telugu'
import { hindiJourney } from './hindi'
import { tamilJourney } from './tamil'
import type { JourneyDay } from '../../types'

export const getJourney = (lang: 'telugu' | 'hindi' | 'tamil'): JourneyDay[] => {
  if (lang === 'telugu') return teluguJourney
  if (lang === 'hindi') return hindiJourney
  return tamilJourney
}

export { teluguJourney, hindiJourney, tamilJourney }
