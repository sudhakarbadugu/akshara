import { motion } from 'framer-motion'
import { Home, PenTool, FileQuestion, BarChart3, User, Brain } from 'lucide-react'

const navItems = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'practice', label: 'Practice', icon: PenTool },
  { key: 'review', label: 'Review', icon: Brain },
  { key: 'quiz', label: 'Quiz', icon: FileQuestion },
  { key: 'progress', label: 'Progress', icon: BarChart3 },
  { key: 'profile', label: 'Profile', icon: User },
]

export function BottomNav({ active = 'home', onNavigate, darkMode = true }: { active?: string; onNavigate?: (page: string) => void; darkMode?: boolean }) {
  const bg = darkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)'
  const border = darkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)'

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center py-3 px-4"
      style={{
        background: bg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${border}`, paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
      }}
    >
      {navItems.map(item => {
        const Icon = item.icon
        const isActive = active === item.key
        return (
          <motion.button
            key={item.key}
            onClick={() => onNavigate?.(item.key)}
            whileTap={{ scale: 0.85 }}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${isActive ? 'text-indigo-400' : 'text-slate-500'}`}
          >
            <div className={`relative p-2 rounded-xl ${isActive ? 'bg-indigo-500/20' : ''}`}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-indigo-400"
                  style={{ x: '-50%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </div>
            <span className={`text-[10px] font-semibold ${isActive ? 'text-indigo-400' : ''}`}>{item.label}</span>
          </motion.button>
        )
      })}
    </nav>
  )
}