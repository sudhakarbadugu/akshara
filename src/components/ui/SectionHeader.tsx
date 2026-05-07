import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  action?: string
  icon?: string
  darkMode?: boolean
}

export function SectionHeader({ title, subtitle, action, icon, darkMode = true }: SectionHeaderProps) {
  const textClass = darkMode ? 'text-white' : 'text-slate-900'
  const subClass = darkMode ? 'text-slate-400' : 'text-slate-500'

  return (
    <div className="flex items-end justify-between mb-5">
      <div className="flex items-center gap-3">
        {icon && <span className="text-2xl">{icon}</span>}
        <div>
          <h2 className={`text-xl font-bold ${textClass}`}>{title}</h2>
          {subtitle && <p className={`text-sm mt-0.5 ${subClass}`}>{subtitle}</p>}
        </div>
      </div>
      {action && (
        <button className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">{action}</button>
      )}
    </div>
  )
}

interface ContinueLearningBannerProps {
  title: string
  subtitle: string
  progress?: number
  icon?: string
  streak?: number
  onResume: () => void
  darkMode?: boolean
}

export function ContinueLearningBanner({ title, subtitle, progress = 60, icon = '📚', streak = 0, onResume, darkMode = true }: ContinueLearningBannerProps) {
  const bg = darkMode
    ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)'
    : 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #e0e7ff 100%)'

  return (
    <motion.div
      className="relative rounded-3xl p-6 overflow-hidden cursor-pointer"
      style={{ background: bg }}
      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
      onClick={onResume}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="text-white/60 text-sm font-medium mb-1">Continue Learning</div>
          <h3 className="text-white text-lg font-bold truncate">{title}</h3>
          <p className="text-white/60 text-sm truncate">{subtitle}</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
            <span className="text-white/80 text-sm font-bold">{progress}%</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          {streak > 0 && (
            <div className="bg-white/20 backdrop-blur rounded-xl px-3 py-1.5 flex items-center gap-1.5">
              <span className="text-xl">🔥</span>
              <span className="text-white font-bold text-sm">{streak}</span>
            </div>
          )}
          <motion.div
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-xl">▶️</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}