import { motion } from 'framer-motion'

interface LearningCardProps {
  id: string
  title: string
  subtitle: string
  icon: string
  progress?: number
  status?: 'locked' | 'progress' | 'completed'
  totalItems?: number
  completedItems?: number
  onClick?: (id: string) => void
  level?: number
  xpReward?: number
  locked?: boolean
  darkMode?: boolean
}

export function LearningCard({
  id, title, subtitle, icon, progress = 0, status = 'locked',
  totalItems = 0, completedItems = 0, onClick, level = 1, xpReward = 10,
  locked = false, darkMode = true
}: LearningCardProps) {
  const bgClass = darkMode ? 'bg-slate-800/80' : 'bg-white'
  const textClass = darkMode ? 'text-white' : 'text-slate-900'
  const subtextClass = darkMode ? 'text-slate-400' : 'text-slate-500'

  const statusConfig: Record<string, { badge: string; badgeColor: string; textColor: string }> = {
    locked: { badge: '🔒', badgeColor: 'bg-slate-700', textColor: 'text-slate-400' },
    progress: { badge: '🟡', badgeColor: 'bg-amber-500/20', textColor: 'text-amber-400' },
    completed: { badge: '✅', badgeColor: 'bg-emerald-500/20', textColor: 'text-emerald-400' },
  }
  const cfg = statusConfig[status] || statusConfig.locked

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(id)}
      className={`relative rounded-2xl p-5 border transition-all duration-300 cursor-pointer ${bgClass}
        ${status === 'locked' ? 'opacity-80 border-slate-700 hover:border-indigo-400/30' : 'border-indigo-500/20 hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/10'}`}
      style={{ backdropFilter: 'blur(20px)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl
          ${status === 'completed' ? 'bg-emerald-500/20' : status === 'locked' ? 'bg-slate-700/60' : 'bg-indigo-500/20'}`}
        >{icon}</div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${cfg.badgeColor} ${cfg.textColor}`}>{cfg.badge}</div>
      </div>

      <div className="flex items-center gap-1 mb-2">
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400">LVL {level}</span>
        <span className="text-xs text-slate-500">+{xpReward} XP</span>
      </div>

      <h3 className={`font-bold text-base mb-1 ${textClass}`}>{title}</h3>
      <p className={`text-sm mb-4 ${subtextClass}`}>{subtitle}</p>

      {status !== 'locked' ? (
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className={subtextClass}>{completedItems}/{totalItems} learned</span>
            <span className="font-semibold text-indigo-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: status === 'completed' ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                width: `${progress}%`
              }}
              initial={{ width: 0 }} animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </div>
      ) : (
        <div className="text-xs font-semibold text-indigo-400/70 uppercase tracking-wider">Tap to start →</div>
      )}
    </motion.div>
  )
}