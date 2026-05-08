import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Volume2, RotateCcw } from 'lucide-react'
import { useSounds } from '../hooks/useSounds'
import { useSpeech } from '../hooks/useSpeech'
import { useMascot } from '../hooks/useMascot'
import type { FlashcardItem } from '../types'

interface FlashcardModeProps {
  items?: FlashcardItem[]
  onComplete?: (count: number) => void
  darkMode?: boolean
  groupName?: string
  voiceLang?: string
  onMarkLearned?: (index: number) => void
}

export function FlashcardMode({
  items = [], onComplete, darkMode = true, groupName = 'Alphabets', voiceLang = 'ta-IN',
  onMarkLearned
}: FlashcardModeProps) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [learned, setLearned] = useState<Set<number>>(new Set())
  const { playFlip, playCorrect, playClick } = useSounds()
  const { speak, isSpeaking } = useSpeech()
  const mascot = useMascot()

  const current = items[index]
  const total = items.length

  const goNext = useCallback(() => {
    playClick()
    setFlipped(false)
    setIndex(i => (i + 1) % total)
  }, [playClick, total])

  const goPrev = useCallback(() => {
    playClick()
    setFlipped(false)
    setIndex(i => (i - 1 + total) % total)
  }, [playClick, total])

  const handleFlip = useCallback(() => {
    playFlip()
    setFlipped(f => !f)
  }, [playFlip])

  const markLearned = useCallback(() => {
    if (!current) return
    const next = new Set(learned)
    next.add(index)
    setLearned(next)
    onMarkLearned?.(index)
    playCorrect()
    mascot.celebrate()
    if (next.size === total) onComplete?.(next.size)
  }, [current, learned, total, index, playCorrect, mascot, onComplete, onMarkLearned])

  const handleSpeak = useCallback(() => {
    if (!current || isSpeaking) return
    speak(current.display, voiceLang, 0.7)
  }, [current, isSpeaking, speak, voiceLang])

  if (!items.length) return null

  const cardBg = darkMode
    ? 'linear-gradient(145deg, #1e1b4b 0%, #1e293b 40%, #0f172a 100%)'
    : 'linear-gradient(145deg, #eef2ff 0%, #ffffff 40%, #f8fafc 100%)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'
  const isLearned = learned.has(index)

  return (
    <div className="max-w-sm mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold" style={{ color: textSecondary }}>{groupName}</span>
        <span className="text-sm font-bold" style={{ color: textSecondary }}>{index + 1} / {total}</span>
      </div>
      <div className="h-2 bg-slate-700/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
          initial={false} animate={{ width: `${((index + 1) / total) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="relative" style={{ perspective: '1000px' }}>
        <motion.div
          className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border-2 cursor-pointer select-none"
          style={{
            background: cardBg,
            borderColor: isLearned ? '#10b981' : darkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)',
            transformStyle: 'preserve-3d',
          }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          onClick={handleFlip}
          whileTap={{ scale: 0.98 }}
        >
          {/* Front */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6" style={{ backfaceVisibility: 'hidden' }}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} key={`front-${index}`} className="text-center w-full">
              <div className="text-7xl md:text-8xl font-black leading-tight mb-4 break-words px-2" style={{
                fontFamily: '"Noto Sans Tamil", "Noto Sans Devanagari", "Noto Sans Telugu", serif',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: '1.1',
              }}>{current?.display}</div>
              <div className="text-sm font-semibold text-indigo-300/80 mb-2">{current?.name} · /{current?.english}/</div>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={(e) => { e.stopPropagation(); handleSpeak() }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors text-sm font-semibold"
              >
                {isSpeaking ? <span className="inline-block w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" /> : <Volume2 size={16} />}
                Pronounce
              </motion.button>
            </motion.div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} key={`back-${index}`} className="text-center">
              {current?.emoji && (
                <motion.div className="text-7xl mb-4 inline-block" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
                  {current.emoji}
                </motion.div>
              )}
              <div className="text-3xl md:text-4xl font-black mb-2 break-words px-2 leading-tight" style={{
                fontFamily: '"Noto Sans Tamil", "Noto Sans Devanagari", "Noto Sans Telugu", serif', color: '#fbbf24',
              }}>{current?.keywordNative || current?.name}</div>
              <div className="text-lg font-semibold mb-1" style={{ color: textPrimary }}>{current?.keyword || current?.english}</div>
              {current?.example && (
                <div className="text-sm mt-2 px-3 py-2 rounded-xl" style={{ color: textSecondary, background: darkMode ? 'rgba(30,41,59,0.6)' : 'rgba(241,245,249,0.8)' }}>
                  📝 {current.example}
                </div>
              )}
              {current?.tip && (
                <div className="text-xs mt-2 px-3 py-1.5 rounded-lg inline-block bg-indigo-500/10 text-indigo-300">💡 {current.tip}</div>
              )}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={(e) => { e.stopPropagation(); handleSpeak() }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors text-sm font-semibold"
              >
                <Volume2 size={16} /> Hear it
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        <div className="text-center mt-3">
          <span className="text-xs font-medium" style={{ color: textSecondary }}>
            <RotateCcw size={12} className="inline mr-1" /> Tap card to flip
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }} onClick={goPrev}
          className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg"
          style={{ background: darkMode ? 'rgba(30,41,59,0.8)' : 'rgba(241,245,249,0.9)', color: textPrimary, border: `1px solid ${darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)'}` }}
        >
          <ChevronLeft size={20} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} onClick={markLearned}
          className="px-8 py-3 rounded-2xl font-bold text-white text-sm"
          style={{ background: isLearned ? 'linear-gradient(135deg, #10b981, #34d399)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          {isLearned ? '✅ Learned' : '✓ Mark Learned'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }} onClick={goNext}
          className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg"
          style={{ background: darkMode ? 'rgba(30,41,59,0.8)' : 'rgba(241,245,249,0.9)', color: textPrimary, border: `1px solid ${darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)'}` }}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      <div className="text-center">
        <span className="text-xs font-semibold" style={{ color: textSecondary }}>{learned.size} / {total} learned</span>
      </div>
    </div>
  )
}

export default FlashcardMode