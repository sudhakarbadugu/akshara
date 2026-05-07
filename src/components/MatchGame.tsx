import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Trophy, Timer } from 'lucide-react'
import { useSounds } from '../hooks/useSounds'
import { useMascot } from '../hooks/useMascot'
import type { FlashcardItem } from '../types'

interface MatchCard {
  id: string
  pairId: string
  type: 'display' | 'name'
  display: string
  name: string
  emoji?: string
}

interface MatchGameProps {
  items?: FlashcardItem[]
  onComplete?: (score: number, moves: number, time: number) => void
  darkMode?: boolean
}

export function MatchGame({ items = [], onComplete, darkMode = true }: MatchGameProps) {
  const [cards, setCards] = useState<MatchCard[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [canFlip, setCanFlip] = useState(true)
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const { playMatch, playWrong, playCorrect, playClick } = useSounds()
  const mascot = useMascot()

  useEffect(() => {
    if (!items.length) return
    const subset = items.slice(0, 6)
    const deck: MatchCard[] = []
    subset.forEach((item, i) => {
      deck.push({ id: `display-${i}`, pairId: item.display, type: 'display', display: item.display, name: item.name, emoji: item.emoji })
      deck.push({ id: `name-${i}`, pairId: item.display, type: 'name', display: item.display, name: item.english, emoji: item.emoji })
    })
    setCards(deck.sort(() => Math.random() - 0.5))
    setFlipped([])
    setMatched([])
    setCanFlip(true)
    setScore(0)
    setMoves(0)
    setTime(0)
    setGameComplete(false)
  }, [items])

  useEffect(() => {
    if (gameComplete || !cards.length) return
    const t = setInterval(() => setTime(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [gameComplete, cards.length])

  const handleCardClick = useCallback((idx: number) => {
    if (!canFlip || flipped.includes(idx) || matched.includes(cards[idx].id)) return
    playClick()
    const newFlipped = [...flipped, idx]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setCanFlip(false)
      setMoves(m => m + 1)
      const [a, b] = newFlipped
      const cardA = cards[a]
      const cardB = cards[b]

      if (cardA.pairId === cardB.pairId && cardA.type !== cardB.type) {
        setTimeout(() => {
          playMatch()
          setMatched(prev => [...prev, cardA.id, cardB.id])
          setFlipped([])
          setCanFlip(true)
          setScore(s => s + 10)
          if (matched.length + 2 === cards.length) {
            setGameComplete(true)
            playCorrect()
            mascot.celebrate()
            onComplete?.(score + 10, moves + 1, time)
          }
        }, 400)
      } else {
        setTimeout(() => { playWrong(); setFlipped([]); setCanFlip(true) }, 900)
      }
    }
  }, [canFlip, flipped, matched, cards, playClick, playMatch, playCorrect, playWrong, mascot, onComplete, score, moves, time])

  const resetGame = useCallback(() => {
    playClick()
    setCards(prev => [...prev].sort(() => Math.random() - 0.5))
    setFlipped([]); setMatched([]); setCanFlip(true); setScore(0); setMoves(0); setTime(0); setGameComplete(false)
  }, [playClick])

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
  const textSecondary = darkMode ? '#94a3b8' : '#475569'

  if (!cards.length) return null

  return (
    <div className="max-w-md mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm font-semibold">
            <Trophy size={14} className="text-amber-400" /><span style={{ color: textSecondary }}>{score} pts</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-semibold">
            <Timer size={14} className="text-indigo-400" /><span style={{ color: textSecondary }}>{formatTime(time)}</span>
          </div>
        </div>
        <motion.button whileTap={{ scale: 0.9 }} onClick={resetGame}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
        >
          <RotateCcw size={12} /> Reset
        </motion.button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(card.id)
          const isMatched = matched.includes(card.id)
          return (
            <motion.button
              key={card.id}
              whileTap={!isFlipped ? { scale: 0.88 } : {}}
              onClick={() => handleCardClick(idx)}
              animate={isFlipped ? { rotateY: 180 } : { rotateY: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className={`relative aspect-square rounded-2xl flex items-center justify-center border-2 transition-colors select-none
                ${isMatched ? 'border-emerald-500/50 bg-emerald-500/15 cursor-default'
                : isFlipped ? 'border-indigo-500/40 bg-indigo-500/10'
                : darkMode ? 'border-slate-700 bg-slate-800/80 hover:border-indigo-500/40'
                : 'border-slate-200 bg-white hover:border-indigo-300'}`}
              style={{ perspective: '600px' }}
            >
              <AnimatePresence mode="wait">
                {!isFlipped ? (
                  <motion.div key="back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-3xl">❓</motion.div>
                ) : (
                  <motion.div key="front" initial={{ opacity: 0, rotateY: -180 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0 }} className="text-center flex flex-col items-center px-1">
                    {card.type === 'display' ? (
                      <span style={{ fontFamily: '"Noto Sans Tamil", "Noto Sans Devanagari", "Noto Sans Telugu", serif', fontSize: '2rem', fontWeight: 900, color: '#fbbf24' }}>{card.display}</span>
                    ) : (
                      <span className="text-sm font-bold text-indigo-300 text-center leading-tight">{card.name}</span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>

      <div className="text-center">
        <span className="text-xs font-semibold" style={{ color: textSecondary }}>{moves} moves · {matched.length / 2} / {cards.length / 2} matches</span>
      </div>

      <AnimatePresence>
        {gameComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="text-center space-y-4 p-6 rounded-3xl border"
            style={{ background: darkMode ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.3)' }}
          >
            <div className="text-5xl mb-2">🎉</div>
            <h3 className="text-xl font-black text-emerald-400">You did it!</h3>
            <p className="text-sm" style={{ color: textSecondary }}>Matched all {cards.length / 2} pairs in {moves} moves and {formatTime(time)}</p>
            <motion.button whileTap={{ scale: 0.95 }} onClick={resetGame}
              className="px-6 py-2.5 rounded-xl font-bold text-white text-sm bg-emerald-500 hover:bg-emerald-400 transition-colors"
            >Play Again</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MatchGame