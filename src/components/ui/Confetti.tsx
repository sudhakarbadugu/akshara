import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CONFETTI_COLORS = [
  '#6366f1', '#8b5cf6', '#a78bfa', '#f59e0b', '#10b981',
  '#ef4444', '#ec4899', '#06b6d4', '#f97316', '#84cc16'
]

interface ConfettiPieceProps {
  id: number
  x: number
  color: string
  delay: number
  size: number
}

function ConfettiPiece({ x, color, delay, size }: ConfettiPieceProps) {
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-sm"
      style={{
        left: `${x}%`, top: '-20px', background: color,
        width: size, height: size, borderRadius: size > 8 ? '50%' : '2px'
      }}
      initial={{ y: -20, x: `${x}%`, opacity: 1, rotate: 0 }}
      animate={{
        y: '110vh', x: `${x + (Math.random() * 30 - 15)}%`,
        opacity: [1, 1, 0], rotate: Math.random() * 720
      }}
      transition={{ duration: 2.5 + Math.random() * 1.5, delay, ease: 'easeIn' }}
    />
  )
}

export function ConfettiCelebration({ active = false, count = 60 }: { active?: boolean; count?: number }) {
  const [pieces, setPieces] = useState<ConfettiPieceProps[]>([])

  useEffect(() => {
    if (active) {
      const newPieces = Array.from({ length: count }, (_, i) => ({
        id: i, x: Math.random() * 100,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        delay: Math.random() * 0.8, size: 6 + Math.random() * 10
      }))
      setPieces(newPieces)
      const timer = setTimeout(() => setPieces([]), 4000)
      return () => clearTimeout(timer)
    }
  }, [active, count])

  return (
    <AnimatePresence>
      {active && pieces.length > 0 && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[100] overflow-hidden"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          {pieces.map(p => <ConfettiPiece key={p.id} {...p} />)}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function LevelUpModal({ level, show }: { level: number; show: boolean }) {
  if (!show) return null
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-8 text-center shadow-2xl shadow-indigo-500/20"
        initial={{ scale: 0.5, y: 50 }} animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >🎉</motion.div>
        <h2 className="text-2xl font-black text-white mb-2">Level Up!</h2>
        <div className="text-5xl font-black gradient-text mb-2">Level {level}</div>
        <p className="text-slate-400 text-sm">Keep going! You're doing amazing.</p>
      </motion.div>
    </motion.div>
  )
}