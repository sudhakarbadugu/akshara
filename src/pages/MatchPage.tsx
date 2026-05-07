import { useLocation } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { getAlphabets } from '../data/alphabets'
import { getLessons } from '../data/lessons'
import { SectionHeader } from '../components/ui/SectionHeader'
import { MatchGame } from '../components/MatchGame'
import { useSounds } from '../hooks/useSounds'
import { useMascot } from '../hooks/useMascot'
import { alphabetToFlashcardItem, wordToFlashcardItem } from '../types'
import type { FlashcardItem } from '../types'

export function MatchPage() {
  const location = useLocation()
  const sounds = useSounds()
  const mascot = useMascot()

  const matchGroup = useAppStore(s => s.matchGroup)
  const setMatchGroup = useAppStore(s => s.setMatchGroup)
  const darkMode = useAppStore(s => s.darkMode)
  const addXp = useAppStore(s => s.addXp)
  const currentLanguage = useAppStore(s => s.currentLanguage)
  const selectedWordCategory = useAppStore(s => s.selectedWordCategory)

  const alphabets = getAlphabets(currentLanguage)
  const lessons = getLessons(currentLanguage)

  // Category ID from router state (home page) or store (nav bar)
  const stateCatId = (location.state as any)?.wordCategoryId as number | undefined
  const activeCategory = stateCatId ?? selectedWordCategory ?? null

  const isAlphaMode = !activeCategory
  const alphaChars = alphabets[matchGroup]?.chars || []
  const wordCategory = lessons.find(c => c.id === activeCategory)

  const matchItems: FlashcardItem[] = isAlphaMode
    ? alphaChars.map(alphabetToFlashcardItem)
    : (wordCategory?.words || []).map(wordToFlashcardItem)

  return (
    <div className="max-w-md mx-auto space-y-6">
      <SectionHeader title="Match Game" subtitle="Pair letters with their meanings!" icon="🧩" darkMode={darkMode} />

      {isAlphaMode && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {Object.entries(alphabets).map(([key, group]) => (
            <button
              key={key}
              onClick={() => setMatchGroup(key)}
              aria-label={`Match game group: ${group.name.split('—')[0].trim()}`}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 ${matchGroup === key ? 'bg-emerald-500 text-white' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'}`}
            >{group.name.split('—')[0].trim()}</button>
          ))}
        </div>
      )}

      <MatchGame
        items={matchItems}
        darkMode={darkMode}
        onComplete={() => { addXp(15); sounds.playLevelUp(); mascot.celebrate() }}
      />
    </div>
  )
}

export default MatchPage