import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { SectionHeader } from '../components/ui/SectionHeader'
import { getAlphabets, countAlphabets } from '../data/alphabets'
import { countLessons } from '../data/lessons'

export function ProgressPage() {
  const darkMode = useAppStore(s => s.darkMode)
  const streak = useAppStore(s => s.streak)
  const xp = useAppStore(s => s.xp)
  const level = useAppStore(s => s.level)
  const learnedAlphabets = useAppStore(s => s.learnedAlphabets)
  const learnedWords = useAppStore(s => s.learnedWords)
  const getOverallPct = useAppStore(s => s.getOverallPct)
  const getAlphaPct = useAppStore(s => s.getAlphaPct)
  const getWordPct = useAppStore(s => s.getWordPct)
  const getAchievements = useAppStore(s => s.getAchievements)
  const currentLanguage = useAppStore(s => s.currentLanguage)

  const alphabets = getAlphabets(currentLanguage)
  const totalAlphaCount = countAlphabets(alphabets)

  const overallPct = getOverallPct()
  const alphaPct = getAlphaPct()
  const wordPct = getWordPct()
  const achievements = getAchievements()

  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'

  return (
    <div className="max-w-lg mx-auto space-y-6 pb-8">
      <SectionHeader title="Your Progress" icon="📊" darkMode={darkMode} />

      <div className="rounded-2xl p-6 text-center border" style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}>
        <div className="text-6xl font-black gradient-text mb-2">{overallPct}%</div>
        <div className="text-sm font-semibold mb-4" style={{ color: textSecondary }}>Overall Completion</div>
        <div className="h-3 bg-slate-700/30 rounded-full overflow-hidden" role="progressbar" aria-valuenow={overallPct} aria-valuemin={0} aria-valuemax={100}>
          <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #10b981)' }} initial={{ width: 0 }} animate={{ width: `${overallPct}%` }} transition={{ duration: 1 }} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: '🔥 Streak', value: `${streak}d`, color: '#f59e0b', icon: '🔥' },
          { label: '⚡ XP', value: xp.toLocaleString(), color: '#6366f1', icon: '⚡' },
          { label: '🏆 Level', value: level, color: '#8b5cf6', icon: '🏆' },
        ].map(stat => (
          <motion.div key={stat.label} className="rounded-2xl p-4 text-center border" style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs font-semibold" style={{ color: textSecondary }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl p-5 border" style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}>
        <div className="font-bold mb-4">Alphabets</div>
        <div className="h-3 bg-slate-700/30 rounded-full overflow-hidden mb-3" role="progressbar" aria-valuenow={alphaPct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${alphaPct}%` }} />
        </div>
        <div className="text-sm mb-4" style={{ color: textSecondary }}>{learnedAlphabets.length} / {totalAlphaCount} letters · {alphaPct}%</div>

        <div className="font-bold mb-4">Words</div>
        <div className="h-3 bg-slate-700/30 rounded-full overflow-hidden mb-3" role="progressbar" aria-valuenow={wordPct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${wordPct}%` }} />
        </div>
        <div className="text-sm" style={{ color: textSecondary }}>{learnedWords.length} words · {wordPct}%</div>
      </div>

      <div className="rounded-2xl p-5 border" style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}>
        <div className="font-bold mb-4">Achievements</div>
        <div className="grid grid-cols-3 gap-4">
          {achievements.map(a => (
            <motion.div key={a.id} whileHover={{ scale: 1.1 }}
              className={`rounded-2xl p-4 text-center border transition-all ${a.earned ? 'border-amber-500/30 bg-amber-500/10' : 'border-slate-700 bg-slate-800/30 opacity-40'}`}
            >
              <div className="text-3xl mb-1">{a.icon}</div>
              <div className="text-xs font-bold mb-0.5" style={{ color: a.earned ? '#fbbf24' : textSecondary }}>{a.title}</div>
              <div className="text-xs" style={{ color: textSecondary }}>{a.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProgressPage