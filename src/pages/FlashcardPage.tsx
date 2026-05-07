import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { getAlphabets } from '../data/alphabets'
import { getLessons } from '../data/lessons'
import { SectionHeader } from '../components/ui/SectionHeader'
import { FlashcardMode } from '../components/FlashcardMode'
import { useSounds } from '../hooks/useSounds'
import { useMascot } from '../hooks/useMascot'
import { LANGUAGES } from '../i18n/languages'
import { alphabetToFlashcardItem, wordToFlashcardItem } from '../types'
import type { FlashcardItem, WordItem } from '../types'
import { SpeechButton } from '../components/SpeechButton'

interface WordGridItem extends FlashcardItem {
  pronunciation: string
  meaning: string
}

interface WordGridProps {
  items: WordGridItem[]
  darkMode: boolean
  voiceLang: string
  onMarkLearned?: (index: number) => void
}

function WordGrid({ items, darkMode, voiceLang, onMarkLearned }: WordGridProps) {
  const sounds = useSounds()
  const mascot = useMascot()
  const [learned, setLearned] = useState<Set<number>>(new Set())

  const handleMarkLearned = (idx: number) => {
    setLearned(prev => new Set(prev).add(idx))
    onMarkLearned?.(idx)
    sounds.playCorrect()
    mascot.celebrate()
  }

  const textSecondary = darkMode ? '#94a3b8' : '#475569'

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {items.map((item, i) => {
        const isLearned = learned.has(i)
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.01 }}
            className={`rounded-xl p-2.5 border transition-all min-h-[150px] flex flex-col ${
              isLearned
                ? 'border-emerald-500/40 bg-emerald-500/10'
                : darkMode
                ? 'border-slate-700 bg-slate-800/60 hover:border-indigo-400/40'
                : 'border-slate-200 bg-white hover:border-indigo-300'
            }`}
          >
            <div className="flex items-start justify-between mb-1.5">
              <span
                className="font-black break-words"
                style={{ 
                  fontFamily: '"Noto Sans Tamil", "Noto Sans Devanagari", "Noto Sans Telugu", serif',
                  fontSize: '1.1rem',
                  color: '#fbbf24',
                  wordBreak: 'break-word',
                  lineHeight: '1.1',
                  maxWidth: '70%',
                }}
              >
                {item.display}
              </span>
              <div className="flex-shrink-0 ml-1">
                <SpeechButton text={item.display} lang={voiceLang} size="sm" />
              </div>
            </div>
            <div className="text-[11px] font-bold text-indigo-300 mb-0.5 leading-tight line-clamp-2">{item.english}</div>
            <div className="text-[9px] text-slate-400 leading-tight line-clamp-1">{item.pronunciation}</div>
            <div className="text-[9px] text-slate-500 leading-tight line-clamp-1 mb-1">{item.meaning}</div>
            <div className="mt-auto pt-1">
              {!isLearned && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMarkLearned(i)}
                  className="w-full py-1 rounded-lg text-[10px] font-bold bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-colors"
                >
                  ✓ Learned
                </motion.button>
              )}
              {isLearned && (
                <div className="text-center text-[10px] font-bold text-emerald-400">✓ Learned</div>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export function FlashcardPage() {
  const location = useLocation()
  const sounds = useSounds()
  const mascot = useMascot()

  const flashcardGroup = useAppStore(s => s.flashcardGroup)
  const setFlashcardGroup = useAppStore(s => s.setFlashcardGroup)
  const darkMode = useAppStore(s => s.darkMode)
  const addXp = useAppStore(s => s.addXp)
  const markAlphabetLearned = useAppStore(s => s.markAlphabetLearned)
  const markWordLearned = useAppStore(s => s.markWordLearned)
  const currentLanguage = useAppStore(s => s.currentLanguage)
  const selectedWordCategory = useAppStore(s => s.selectedWordCategory)

  const alphabets = getAlphabets(currentLanguage)
  const lessons = getLessons(currentLanguage)
  const langConfig = LANGUAGES[currentLanguage]

  // Category ID from router state (home page) or store (nav bar)
  const stateCatId = (location.state as any)?.wordCategoryId as number | undefined
  const activeCategory = stateCatId ?? selectedWordCategory ?? null

  // Determine if we're showing alphabet or word flashcards
  const isAlphaMode = !activeCategory
  const alphaChars = alphabets[flashcardGroup]?.chars || []
  const wordCategory = lessons.find(c => c.id === activeCategory)

  const flashcardItems: FlashcardItem[] = isAlphaMode
    ? alphaChars.map(alphabetToFlashcardItem)
    : (wordCategory?.words || []).map(wordToFlashcardItem)

  // Extend word items with pronunciation and meaning for grid view
  const wordGridItems: WordGridItem[] = isAlphaMode
    ? []
    : (wordCategory?.words || []).map(word => ({
        ...wordToFlashcardItem(word),
        pronunciation: word.pronunciation,
        meaning: word.meaning,
      }))

  const groupName = isAlphaMode
    ? (alphabets[flashcardGroup]?.name || flashcardGroup)
    : (wordCategory?.category || 'Words')

  // For large word sets (like 100 numbers), show grid instead of flashcard mode
  const isLargeSet = flashcardItems.length > 20

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <SectionHeader title="Flashcards" subtitle={isLargeSet ? 'Study all words' : 'Flip, learn, repeat!'} icon="🃏" darkMode={darkMode} />

      {isAlphaMode && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {Object.entries(alphabets).map(([key, group]) => (
            <button
              key={key}
              onClick={() => setFlashcardGroup(key)}
              aria-label={`Flashcard group: ${group.name.split('—')[0].trim()}`}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                flashcardGroup === key ? 'bg-indigo-500 text-white' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {group.name.split('—')[0].trim()}
            </button>
          ))}
        </div>
      )}

      {isLargeSet ? (
        <WordGrid
          items={wordGridItems}
          darkMode={darkMode}
          voiceLang={langConfig.voiceLang}
          onMarkLearned={i => {
            if (isAlphaMode) markAlphabetLearned(alphaChars[i]?.char || '')
            else markWordLearned(wordCategory?.words[i]?.english || '')
            addXp(2)
          }}
        />
      ) : (
        <FlashcardMode
          items={flashcardItems}
          darkMode={darkMode}
          groupName={groupName}
          voiceLang={langConfig.voiceLang}
          onComplete={count => { addXp(count * 3); sounds.playCorrect(); mascot.celebrate() }}
          onMarkLearned={i => {
            if (isAlphaMode) markAlphabetLearned(alphaChars[i]?.char || '')
            else markWordLearned(wordCategory?.words[i]?.english || '')
          }}
        />
      )}
    </div>
  )
}

export default FlashcardPage