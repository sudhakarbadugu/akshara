import { motion } from 'framer-motion'

export function StreakBadge({ streak = 0, size = 'md', showLabel = true }: { streak?: number; size?: 'sm' | 'md' | 'lg'; showLabel?: boolean }) {
  const sizes: Record<string, { emoji: string; text: string; padding: string }> = {
    sm: { emoji: '20px', text: '14px', padding: '6px 10px' },
    md: { emoji: '28px', text: '18px', padding: '10px 16px' },
    lg: { emoji: '36px', text: '24px', padding: '14px 24px' },
  }
  const s = sizes[size] || sizes.md
  const isActive = streak > 0

  return (
    <motion.div
      className={`inline-flex items-center gap-1.5 rounded-full font-bold ${isActive ? 'streak-glow bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}
      style={{ padding: s.padding, fontSize: s.text }}
      animate={isActive ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 3 }}
    >
      <span style={{ fontSize: s.emoji }}>🔥</span>
      <span>{streak}</span>
      {showLabel && size === 'lg' && <span className="text-amber-300/70 text-xs ml-1">day streak</span>}
    </motion.div>
  )
}

export function XPIndicator({ xp = 0, level = 1, size = 'md', showProgress = true }: { xp?: number; level?: number; size?: 'sm' | 'md' | 'lg'; showProgress?: boolean }) {
  const sizes: Record<string, { icon: string; text: string; padding: string }> = {
    sm: { icon: '14px', text: '13px', padding: '4px 8px' },
    md: { icon: '16px', text: '15px', padding: '8px 12px' },
    lg: { icon: '20px', text: '20px', padding: '12px 20px' },
  }
  const s = sizes[size] || sizes.md
  const xpForNextLevel = level * 100
  const progress = (xp % xpForNextLevel) / xpForNextLevel * 100

  return (
    <div className="inline-flex flex-col gap-1">
      <motion.div
        className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold xp-glow"
        style={{ padding: s.padding, fontSize: s.text }}
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      >
        <span style={{ fontSize: s.icon }}>⚡</span>
        <span>{xp.toLocaleString()} XP</span>
      </motion.div>
      {showProgress && size === 'lg' && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', width: `${progress}%` }}
              initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8 }}
            />
          </div>
          <span className="text-xs text-slate-500">Lvl {level}</span>
        </div>
      )}
    </div>
  )
}

export function LevelBadge({ level = 1 }: { level?: number }) {
  return (
    <motion.div
      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-3 py-1 text-xs"
      initial={{ scale: 0 }} animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
    >
      <span>🏆</span><span>Level {level}</span>
    </motion.div>
  )
}