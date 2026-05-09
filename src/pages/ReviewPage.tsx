import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { SectionHeader } from '../components/ui/SectionHeader'
import { SpeechButton } from '../components/SpeechButton'
import { useSounds } from '../hooks/useSounds'
import { useMascot } from '../hooks/useMascot'
import { LANGUAGES } from '../i18n/languages'
import { ChevronLeft, RotateCcw, Target, Flame } from 'lucide-react'
import type { SRSItem } from '../types'

// SM-2 rating labels and colors
const RATINGS = [
  { value: 1 as const, label: 'Again', color: '#ef4444', bg: 'rgba(239,68,68,0.15)', sub: 'Start over' },
  { value: 2 as const, label: 'Hard', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', sub: 'Difficult' },
  { value: 3 as const, label: 'Good', color: '#6366f1', bg: 'rgba(99,102,241,0.15)', sub: 'Got it' },
  { value: 4 as const, label: 'Easy', color: '#10b981', bg: 'rgba(16,185,129,0.15)', sub: 'Perfect' },
]

export function ReviewPage() {
  const navigate = useNavigate()
  const sounds = useSounds()
  const mascot = useMascot()

  const darkMode = useAppStore(s => s.darkMode)
  const currentLanguage = useAppStore(s => s.currentLanguage)
  const learnedAlphabets = useAppStore(s => s.learnedAlphabets)
  const learnedWords = useAppStore(s => s.learnedWords)
  const learnedGunithalu = useAppStore(s => s.learnedGunithalu)
  const srsItems = useAppStore(s => s.srsItems)
  const addSRSItem = useAppStore(s => s.addSRSItem)
  const rateSRSItem = useAppStore(s => s.rateSRSItem)
  const getSRSItemsDue = useAppStore(s => s.getSRSItemsDue)
  const getSRSStats = useAppStore(s => s.getSRSStats)
  const addXp = useAppStore(s => s.addXp)

  const langConfig = LANGUAGES[currentLanguage]
  const stats = useMemo(() => getSRSStats(), [getSRSStats, srsItems])

  // Build due queue on mount
  const [dueItems, setDueItems] = useState<SRSItem[]>(() => {
    const due = getSRSItemsDue()
    if (due.length === 0) return []
    // Shuffle due items
    return [...due].sort(() => Math.random() - 0.5)
  })

  const [currentIdx, setCurrentIdx] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [sessionResults, setSessionResults] = useState<{ rating: 1|2|3|4; item: SRSItem }[]>([])

  const currentItem = dueItems[currentIdx]
  const progress = dueItems.length > 0 ? (currentIdx / dueItems.length) * 100 : 0

  // Styling
  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'
  const borderColor = darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'

  const handleRate = useCallback((rating: 1|2|3|4) => {
    if (!currentItem) return
    rateSRSItem(currentItem.id, rating)
    setSessionResults(prev => [...prev, { rating, item: currentItem }])

    if (rating >= 3) {
      sounds.playCorrect()
      mascot.celebrate()
      addXp(rating === 4 ? 5 : 3)
    } else {
      sounds.playWrong()
      mascot.encourage()
    }

    if (currentIdx < dueItems.length - 1) {
      setCurrentIdx(prev => prev + 1)
      setShowAnswer(false)
    } else {
      setCompleted(true)
      mascot.celebrate()
      sounds.playCorrect()
    }
  }, [currentItem, currentIdx, dueItems.length, rateSRSItem, sounds, mascot, addXp])

  const handleRestart = () => {
    const due = getSRSItemsDue()
    setDueItems([...due].sort(() => Math.random() - 0.5))
    setCurrentIdx(0)
    setShowAnswer(false)
    setCompleted(false)
    setSessionResults([])
  }

  // ── Completed state ──
  if (completed) {
    const total = sessionResults.length
    const correct = sessionResults.filter(r => r.rating >= 3).length
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
    const avgRating = total > 0
      ? (sessionResults.reduce((s, r) => s + r.rating, 0) / total).toFixed(1)
      : '0'

    return (
      <div className="max-w-2xl mx-auto">
        <SectionHeader title="Review Complete" subtitle={`${total} items reviewed`} icon="🎉" darkMode={darkMode} />

        <div className="lg:flex lg:gap-6 mt-6">
          <div className="flex-1 rounded-2xl p-8 text-center border lg:text-left" style={{ background: bgCard, borderColor }}>
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: textPrimary }}>Session Done!</h3>
            <p className="text-sm mb-6" style={{ color: textSecondary }}>
              {correct} of {total} items rated Good or Easy · Avg: {avgRating}/4
            </p>
            <div className="flex gap-3 lg:justify-start justify-center">
              <button onClick={handleRestart} className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors flex items-center gap-2">
                <RotateCcw size={18} /> Review Again
              </button>
              <button onClick={() => navigate('/')} className="px-6 py-3 rounded-xl font-bold transition-colors" style={{ background: darkMode ? 'rgba(30,41,59,0.8)' : 'rgba(241,245,249,0.9)', color: textPrimary }}>
                🏠 Home
              </button>
            </div>
          </div>

          <div className="lg:w-64 space-y-3 mt-5 lg:mt-0">
            {[
              { label: 'Items', value: total, color: '#6366f1', icon: '📋' },
              { label: 'Strong', value: correct, color: '#10b981', icon: '✅' },
              { label: 'Struggling', value: total - correct, color: '#ef4444', icon: '🔁' },
              { label: 'Accuracy', value: `${accuracy}%`, color: '#f59e0b', icon: '🎯' },
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

  // ── Empty state: no items due ──
  if (dueItems.length === 0) {
    const hasAnyLearned = learnedAlphabets.length > 0 || learnedWords.length > 0
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <SectionHeader title="Review" subtitle="Spaced Repetition Queue" icon="🧠" darkMode={darkMode} />

        <div className="rounded-2xl p-8 text-center border" style={{ background: bgCard, borderColor }}>
          <div className="text-6xl mb-4">☕</div>
          <h3 className="text-xl font-bold mb-2" style={{ color: textPrimary }}>
            {hasAnyLearned ? 'All Caught Up!' : 'Nothing to Review Yet'}
          </h3>
          <p className="text-sm mb-6" style={{ color: textSecondary }}>
            {hasAnyLearned
              ? 'All your review items are scheduled for future days. Come back tomorrow!'
              : 'Learn some alphabets and words first, then return here to review them over time.'}
          </p>

          <div className="flex flex-col gap-3 items-center">
            {stats.totalItems > 0 && (
              <div className="flex gap-4 text-sm mb-2">
                <div className="px-4 py-2 rounded-xl border" style={{ background: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)', borderColor, color: '#a5b4fc' }}>
                  <strong>{stats.totalItems}</strong> total items
                </div>
                <div className="px-4 py-2 rounded-xl border" style={{ background: darkMode ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.1)', borderColor, color: '#34d399' }}>
                  <strong>{stats.learnedItems}</strong> mastered
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {hasAnyLearned ? (
                <>
                  <button onClick={() => navigate('/practice')} className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors">
                    Practice More →
                  </button>
                  <button onClick={handleRestart} className="px-6 py-3 rounded-xl font-bold transition-colors" style={{ background: darkMode ? 'rgba(30,41,59,0.8)' : 'rgba(241,245,249,0.9)', color: textPrimary }}>
                    Check Again
                  </button>
                </>
              ) : (
                <button onClick={() => navigate('/flashcard')} className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors">
                  Start Learning →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Main review UI ──
  return (
    <div className="max-w-5xl mx-auto">
      <button onClick={() => navigate(-1)} className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mb-5 focus-visible:ring-2 focus-visible:ring-indigo-400">
        <ChevronLeft size={16} /> Back
      </button>

      <div className="lg:flex lg:gap-6 lg:items-start">
        {/* Left: Main card */}
        <div className="flex-1 space-y-5">
          <SectionHeader
            title="Review"
            subtitle={`${currentIdx + 1} / ${dueItems.length} · Due today`}
            icon="🧠"
            darkMode={darkMode}
          />

          {/* SRS Progress */}
          <div className="rounded-xl p-3 border" style={{ background: bgCard, borderColor }}>
            <div className="flex justify-between text-xs mb-1.5">
              <span style={{ color: textSecondary }}>Session Progress</span>
              <span className="font-bold text-indigo-400">{Math.round(progress)}%</span>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-2xl p-8 lg:p-12 border text-center"
              style={{ background: bgCard, borderColor }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  {currentItem.type === 'alpha' ? 'Alphabet' : currentItem.type === 'gunithalu' ? 'Gunithalu' : 'Word'}
                </div>
                {currentItem.repetitions > 0 && (
                  <div className="text-[10px] px-2 py-1 rounded-full bg-amber-500/15 text-amber-400">
                    🔁 Reviewed {currentItem.repetitions}x
                  </div>
                )}
              </div>

              <div
                className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 break-words leading-tight px-2"
                style={{ fontFamily: `"Noto Sans ${langConfig.name}", serif`, color: '#fbbf24' }}
              >
                {currentItem.content}
              </div>

              <div className="flex justify-center gap-3 mb-4">
                <SpeechButton text={currentItem.content} lang={langConfig.voiceLang} size="md" />
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
                        {currentItem.type === 'word' ? currentItem.meaning : currentItem.meaning}
                      </div>

                      {/* SM-2 Rating buttons */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-xl mx-auto">
                        {RATINGS.map((r) => (
                          <motion.button
                            key={r.value}
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => handleRate(r.value)}
                            className="py-4 rounded-xl border font-bold text-sm flex flex-col items-center justify-center gap-1 transition-colors"
                            style={{
                              background: r.bg,
                              borderColor: `${r.color}30`,
                              color: r.color,
                            }}
                          >
                            <span>{r.label}</span>
                            <span className="text-[10px] font-medium opacity-70">{r.sub}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Right: Stats sidebar */}
        <div className="lg:w-56 xl:w-64 space-y-3 mt-5 lg:mt-0 lg:pt-12">
          {[
            { label: 'Due Today', value: stats.dueToday, color: '#ef4444', icon: Target },
            { label: 'Mastered', value: stats.learnedItems, color: '#10b981', icon: Flame },
            { label: 'Total', value: stats.totalItems, color: '#6366f1', icon: null },
          ].map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-xl p-4 border flex items-center gap-3"
                style={{ background: bgCard, borderColor }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                  {Icon ? <Icon size={18} style={{ color: s.color }} /> : <span className="text-lg">{s.icon}</span>}
                </div>
                <div>
                  <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[10px]" style={{ color: textSecondary }}>{s.label}</div>
                </div>
              </motion.div>
            )
          })}

          <div className="rounded-xl p-4 border text-center" style={{ background: bgCard, borderColor }}>
            <div className="text-3xl font-black gradient-text">{stats.masteryPct}%</div>
            <div className="text-[10px]" style={{ color: textSecondary }}>Mastery</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewPage
