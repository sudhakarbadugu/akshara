import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

interface AnimatedFeedbackProps {
  type: 'correct' | 'wrong' | 'hint' | 'star'
  message: string
  visible: boolean
  autoHide?: number
}

export function AnimatedFeedback({ type, message, visible, autoHide = 2000 }: AnimatedFeedbackProps) {
  const controls = useAnimation()

  useEffect(() => {
    if (visible) {
      if (type === 'correct') {
        controls.start({ scale: [1, 1.3, 1], rotate: [0, -5, 5, 0], transition: { duration: 0.5 } })
      } else if (type === 'wrong') {
        controls.start({ x: [0, -8, 8, -8, 8, 0], transition: { duration: 0.5 } })
      }
    }
  }, [visible, type, controls])

  if (!visible) return null

  const config: Record<string, { bg: string; border: string; icon: string }> = {
    correct: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/50', icon: '✅' },
    wrong: { bg: 'bg-red-500/20', border: 'border-red-500/50', icon: '❌' },
    hint: { bg: 'bg-amber-500/20', border: 'border-amber-500/50', icon: '💡' },
    star: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', icon: '⭐' },
  }
  const c = config[type] || config.hint

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={controls}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      className={`${c.bg} ${c.border} border-2 rounded-2xl px-5 py-4 flex items-center gap-4`}
    >
      <span className="text-2xl">{c.icon}</span>
      <span className="text-base font-bold">{message}</span>
    </motion.div>
  )
}

export default AnimatedFeedback