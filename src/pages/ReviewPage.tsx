import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { getAlphabets } from '../data/alphabets'
import { getLessons } from '../data/lessons'
import { SectionHeader } from '../components/ui/SectionHeader'
import { SpeechButton } from '../components/SpeechButton'
import { useSounds } from '../hooks/useSounds'
import { useMascot } from '../hooks/useMascot'
import { LANGUAGES } from '../i18n/languages'
import { ChevronRight, X, Check, HelpCircle } from 'lucide-react'
import type { AlphabetChar, WordItem, SRSItem } from '../types'

interface ReviewItem {
  id: string
  type: 'alpha' | 'word'
  display: string
  meaning: string
  pronunciation: string
  emoji?: string
}

export function ReviewPage() {
  const navigate = useNavigate()
  const sounds = useSounds()
  const mascot = useMascot()

  const darkMode = useAppStore(s => s.darkMode)
  const currentLanguage = useAppStore(s => s.currentLanguage)
  const learnedAlphabets = useAppStore(s => s.learnedAlphabets)
  const learnedWords = useAppStore(s => s.learnedWords)
  const addXp = useAppStore(s => s.addXp)

  const langConfig = LANGUAGES[currentLanguage]

  const queue = useMemo(() => {
    const items: ReviewItem[] = []
    const alphabets = getAlphabets(currentLanguage)
    const lessons = getLessons(currentLanguage)

    Object.values(alphabets).forEach(group => {
      group.chars.forEach((char: AlphabetChar) => {
        items.push({
          id: `alpha:${char.char}`,
          type: 'alpha',
          display: char.char,
          meaning: char.english,
          pronunciation: char.name,
          emoji: char.emoji,
        })
      })
    })

    lessons.forEach(cat => {
      cat.words.forEach((word: WordItem) => {
        items.push({
          id: `word:${word.english}`,
          type: 'word',
          display: word.native,
          meaning: word.english,
          pronunciation: word.pronunciation,
        })
      })
    })

    return items
  }, [currentLanguage])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [learned, setLearned] = useState<Set<string>>(new Set())
  const [completed, setCompleted] = useState(false)

  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'
  const borderColor = darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'

  const [shuffledQueue] = useState(() => {
    const shuffled = [...queue]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  })

  const currentItem = shuffledQueue[currentIndex]
  const progress = shuffledQueue.length > 0 ? ((currentIndex) / shuffledQueue.length) * 100 : 0
  const isLearned = currentItem ? learned.has(currentItem.id) : false

  const handleKnow = () => {
    if (!currentItem) return
    sounds.playCorrect()
    setLearned(prev => new Set(prev).add(currentItem.id))
    goNext()
  }

  const handleDontKnow = () => {
    sounds.playWrong()
    goNext()
  }

  const goNext = () => {
    if (currentIndex < shuffledQueue.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setShowAnswer(false)
    } else {
      setCompleted(true)
      mascot.celebrate()
      sounds.playCorrect()
      addXp(learned.size * 2)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setShowAnswer(false)
    setLearned(new Set())
    setCompleted(false)
  }

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto">
        <SectionHeader title="Review Complete" subtitle="Great job!" icon="🎉" darkMode={darkMode} />
        <div className="lg:flex lg:gap-6 mt-6">
          {/* Completion card */}
          <div className="flex-1 rounded-2xl p-8 text-center border lg:text-left" style={{ background: bgCard, borderColor }}>
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: textPrimary }}>Session Complete!</h3>
            <p className="text-sm mb-6" style={{ color: textSecondary }}>
              You reviewed {shuffledQueue.length} items and marked {learned.size} as known.
            </p>
            <div className="flex gap-3 lg:justify-start justify-center">
              <button onClick={handleRestart} className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors">
                🔄 Review Again
              </button>
              <button onClick={() => navigate('/')} className="px-6 py-3 rounded-xl font-bold transition-colors" style={{ background: darkMode ? 'rgba(30,41,59,0.8)' : 'rgba(241,245,249,0.9)', color: textPrimary }}>
                🏠 Home
              </button>
            </div>
          </div>

          {/* Stats sidebar */}
          <div className="lg:w-64 space-y-3 mt-5 lg:mt-0">
            {[
              { label: 'Total Items', value: shuffledQueue.length, color: '#6366f1', icon: '📋' },
              { label: 'Known', value: learned.size, color: '#10b981', icon: '✅' },
              { label: 'Unknown', value: shuffledQueue.length - learned.size, color: '#ef4444', icon: '❌' },
              { label: 'Accuracy', value: `${shuffledQueue.length > 0 ? Math.round((learned.size / shuffledQueue.length) * 100) : 0}%`, color: '#f59e0b', icon: '🎯' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-4 border flex items-center gap-3" style={{ background: bgCard, borderColor }}>
                <div className="text-xl">{s.icon}</div>
                <div>
                  <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[10px]" style={{ color: textSecondary }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (shuffledQueue.length === 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <SectionHeader title="Review Queue" subtitle="Practice what you've learned" icon="🧠" darkMode={darkMode} />
        <div className="rounded-2xl p-8 text-center border" style={{ background: bgCard, borderColor }}>
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-bold mb-2" style={{ color: textPrimary }}>No Items Yet</h3>
          <p className="text-sm mb-6" style={{ color: textSecondary }}>Explore the app to learn alphabets and words first.</p>
          <button onClick={() => navigate('/flashcard')} className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors">
            Start Learning →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <button onClick={() => navigate(-1)} className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mb-5 focus-visible:ring-2 focus-visible:ring-indigo-400" aria-label="Go back">
        ← Back
      </button>

      <div className="lg:flex lg:gap-6 lg:items-start">
        {/* ─── Left: Main review card ─── */}
        <div className="flex-1 space-y-5">
          <SectionHeader title="Review" subtitle={`${currentIndex + 1} / ${shuffledQueue.length}`} icon="🧠" darkMode={darkMode} />

          {/* Progress bar */}
          <div className="rounded-xl p-3 border" style={{ background: bgCard, borderColor }}>
            <div className="flex justify-between text-xs mb-1.5">
              <span style={{ color: textSecondary }}>Progress</span>
              <span className="font-bold text-indigo-400">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-slate-700/30 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #6366f1, #10b981)' }} animate={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Review Card — larger on desktop */}
          {currentItem && (
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-2xl p-8 lg:p-12 border text-center"
              style={{ background: bgCard, borderColor: isLearned ? 'rgba(16,185,129,0.3)' : borderColor }}
            >
              <div className="text-xs font-bold text-indigo-400 mb-4 uppercase tracking-wider">
                {currentItem.type === 'alpha' ? 'Alphabet' : 'Word'}
              </div>

              <div
                className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 break-words leading-tight px-2"
                style={{ fontFamily: `"Noto Sans ${langConfig.name}", serif`, color: '#fbbf24' }}
              >
                {currentItem.display}
              </div>

              <div className="flex justify-center gap-3 mb-4">
                <SpeechButton text={currentItem.display} lang={langConfig.voiceLang} size="md" />
                {!showAnswer && (
                  <button
                    onClick={() => { setShowAnswer(true); sounds.playClick() }}
                    className="px-5 py-2.5 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors text-sm"
                  >
                    Show Answer
                  </button>
                )}
              </div>

              <AnimatePresence>
                {showAnswer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t pt-6 mt-4" style={{ borderColor }}>
                      <div className="text-xl lg:text-2xl font-bold mb-2" style={{ color: textPrimary }}>
                        {currentItem.meaning}
                      </div>
                      <div className="text-base mb-6" style={{ color: textSecondary }}>
                        {currentItem.pronunciation}
                      </div>

                      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                        <motion.button
                          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          onClick={handleDontKnow}
                          className="py-4 rounded-xl bg-red-500/20 text-red-400 font-bold hover:bg-red-500/30 transition-colors text-sm flex items-center justify-center gap-2"
                        >
                          <X size={18} /> Don't Know
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          onClick={handleKnow}
                          className="py-4 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold hover:bg-emerald-500/30 transition-colors text-sm flex items-center justify-center gap-2"
                        >
                          <Check size={18} /> Know It
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* ─── Right: Stats sidebar ─── */}
        <div className="lg:w-56 xl:w-64 space-y-3 mt-5 lg:mt-0 lg:pt-12">
          {[
            { label: 'Total', value: shuffledQueue.length, color: '#6366f1', icon: '📋' },
            { label: 'Known', value: learned.size, color: '#10b981', icon: '✅' },
            { label: 'Remaining', value: shuffledQueue.length - currentIndex - 1, color: '#f59e0b', icon: '⏳' },
          ].map(s => (
            <motion.div key={s.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-xl p-4 border flex items-center gap-3" style={{ background: bgCard, borderColor }}>
              <div className="text-xl">{s.icon}</div>
              <div>
                <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[10px]" style={{ color: textSecondary }}>{s.label}</div>
              </div>
            </motion.div>
          ))}

          {/* Mini progress ring */}
          <div className="rounded-xl p-4 border text-center" style={{ background: bgCard, borderColor }}>
            <div className="text-3xl font-black gradient-text">{Math.round(progress)}%</div>
            <div className="text-[10px]" style={{ color: textSecondary }}>Complete</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewPage