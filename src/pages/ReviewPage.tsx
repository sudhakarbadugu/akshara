import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { SectionHeader } from '../components/ui/SectionHeader'
import { SpeechButton } from '../components/SpeechButton'
import { useSounds } from '../hooks/useSounds'
import { useMascot } from '../hooks/useMascot'
import { LANGUAGES } from '../i18n/languages'
import type { SRSItem } from '../types'

export function ReviewPage() {
  const navigate = useNavigate()
  const sounds = useSounds()
  const mascot = useMascot()

  const darkMode = useAppStore(s => s.darkMode)
  const currentLanguage = useAppStore(s => s.currentLanguage)
  const getSRSItemsDue = useAppStore(s => s.getSRSItemsDue)
  const getSRSStats = useAppStore(s => s.getSRSStats)
  const rateSRSItem = useAppStore(s => s.rateSRSItem)
  const addSRSItem = useAppStore(s => s.addSRSItem)
  const learnedAlphabets = useAppStore(s => s.learnedAlphabets)
  const learnedWords = useAppStore(s => s.learnedWords)
  const learnedGunithalu = useAppStore(s => s.learnedGunithalu)

  const langConfig = LANGUAGES[currentLanguage]
  const stats = getSRSStats()
  const dueItems = getSRSItemsDue()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [queue, setQueue] = useState<SRSItem[]>([])

  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'

  // Initialize queue from learned items
  useEffect(() => {
    const items: SRSItem[] = []
    
    // Add alphabets to SRS queue
    learnedAlphabets.forEach(char => {
      const id = `alpha:${char}`
      items.push({
        id,
        type: 'alpha',
        content: char,
        meaning: char,
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReview: new Date().toISOString().split('T')[0],
        created: new Date().toISOString().split('T')[0],
      })
    })

    // Add words to SRS queue
    learnedWords.forEach(key => {
      const id = `word:${key}`
      items.push({
        id,
        type: 'word',
        content: key,
        meaning: key,
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReview: new Date().toISOString().split('T')[0],
        created: new Date().toISOString().split('T')[0],
      })
    })

    // Add gunithalu to SRS queue
    learnedGunithalu.forEach(key => {
      const id = `gunithalu:${key}`
      items.push({
        id,
        type: 'gunithalu',
        content: key.split('_')[0] || key,
        meaning: key,
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReview: new Date().toISOString().split('T')[0],
        created: new Date().toISOString().split('T')[0],
      })
    })

    // Filter to only due items
    const today = new Date().toISOString().split('T')[0]
    const due = items.filter(item => item.nextReview <= today)
    setQueue(due)
  }, [learnedAlphabets, learnedWords, learnedGunithalu])

  const currentItem = queue[currentIndex]
  const progress = queue.length > 0 ? ((currentIndex) / queue.length) * 100 : 0

  const handleRate = (rating: 1 | 2 | 3 | 4) => {
    if (!currentItem) return
    rateSRSItem(currentItem.id, rating)
    sounds.playClick()
    
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setShowAnswer(false)
    } else {
      // Queue complete
      mascot.celebrate()
      sounds.playCorrect()
    }
  }

  const handleSkip = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setShowAnswer(false)
      sounds.playClick()
    }
  }

  if (queue.length === 0) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <SectionHeader title="Review Queue" subtitle="Spaced Repetition Practice" icon="🧠" darkMode={darkMode} />
        
        <div className="rounded-2xl p-8 text-center border" style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}>
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-bold mb-2" style={{ color: textPrimary }}>All Caught Up!</h3>
          <p className="text-sm mb-6" style={{ color: textSecondary }}>
            No items due for review. Keep learning to add more items to your review queue.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-xl p-3" style={{ background: darkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.05)' }}>
              <div className="text-2xl font-bold text-indigo-400">{stats.totalItems}</div>
              <div className="text-xs" style={{ color: textSecondary }}>Total Items</div>
            </div>
            <div className="rounded-xl p-3" style={{ background: darkMode ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.05)' }}>
              <div className="text-2xl font-bold text-emerald-400">{stats.masteryPct}%</div>
              <div className="text-xs" style={{ color: textSecondary }}>Mastery</div>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <SectionHeader title="Review Queue" subtitle={`${queue.length} items due`} icon="🧠" darkMode={darkMode} />

      {/* Progress bar */}
      <div className="rounded-xl p-3 border" style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}>
        <div className="flex justify-between text-xs mb-1.5">
          <span style={{ color: textSecondary }}>Progress</span>
          <span className="font-bold text-indigo-400">{currentIndex} / {queue.length}</span>
        </div>
        <div className="h-2 bg-slate-700/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #6366f1, #10b981)' }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Review Card */}
      {currentItem && (
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="rounded-2xl p-6 border text-center"
          style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}
        >
          <div className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-wider">
            {currentItem.type === 'alpha' ? 'Alphabet' : currentItem.type === 'word' ? 'Word' : 'Compound'}
          </div>

          {/* Front of card */}
          <div
            className="text-6xl font-black mb-4"
            style={{ fontFamily: `"Noto Sans ${langConfig.name}", serif`, color: '#fbbf24' }}
          >
            {currentItem.content}
          </div>

          {!showAnswer ? (
            <>
              <div className="text-sm mb-4" style={{ color: textSecondary }}>Tap to reveal answer</div>
              <div className="flex gap-3 justify-center">
                <SpeechButton text={currentItem.content} lang={langConfig.voiceLang} size="lg" />
                <button
                  onClick={() => { setShowAnswer(true); sounds.playClick() }}
                  className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors"
                >
                  Show Answer
                </button>
              </div>
            </>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="text-lg font-bold mb-4" style={{ color: textPrimary }}>
                  {currentItem.meaning}
                </div>
                
                <div className="text-xs mb-4" style={{ color: textSecondary }}>
                  How well did you remember?
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleRate(1)}
                    className="py-3 rounded-xl bg-red-500/20 text-red-400 font-bold hover:bg-red-500/30 transition-colors"
                  >
                    Again
                  </button>
                  <button
                    onClick={() => handleRate(2)}
                    className="py-3 rounded-xl bg-orange-500/20 text-orange-400 font-bold hover:bg-orange-500/30 transition-colors"
                  >
                    Hard
                  </button>
                  <button
                    onClick={() => handleRate(3)}
                    className="py-3 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold hover:bg-emerald-500/30 transition-colors"
                  >
                    Good
                  </button>
                  <button
                    onClick={() => handleRate(4)}
                    className="py-3 rounded-xl bg-blue-500/20 text-blue-400 font-bold hover:bg-blue-500/30 transition-colors"
                  >
                    Easy
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      )}

      {/* Skip button */}
      {!showAnswer && (
        <div className="flex justify-center">
          <button
            onClick={handleSkip}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: darkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.05)', color: textSecondary }}
          >
            Skip →
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl p-3 text-center" style={{ background: bgCard }}>
          <div className="text-lg font-bold text-indigo-400">{stats.totalItems}</div>
          <div className="text-[10px]" style={{ color: textSecondary }}>Total</div>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ background: bgCard }}>
          <div className="text-lg font-bold text-emerald-400">{stats.learnedItems}</div>
          <div className="text-[10px]" style={{ color: textSecondary }}>Learned</div>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ background: bgCard }}>
          <div className="text-lg font-bold text-amber-400">{stats.masteryPct}%</div>
          <div className="text-[10px]" style={{ color: textSecondary }}>Mastery</div>
        </div>
      </div>
    </div>
  )
}

export default ReviewPage
