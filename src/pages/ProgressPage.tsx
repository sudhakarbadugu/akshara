import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { SectionHeader } from '../components/ui/SectionHeader'
import { getAlphabets, countAlphabets } from '../data/alphabets'
import { getLessons } from '../data/lessons'
import { Trophy, Flame, Zap, Target, BookOpen, Award } from 'lucide-react'

export function ProgressPage() {
  const navigate = useNavigate()
  const darkMode = useAppStore(s => s.darkMode)
  const streak = useAppStore(s => s.streak)
  const xp = useAppStore(s => s.xp)
  const level = useAppStore(s => s.level)
  const learnedAlphabets = useAppStore(s => s.learnedAlphabets)
  const learnedWords = useAppStore(s => s.learnedWords)
  const learnedGunithalu = useAppStore(s => s.learnedGunithalu)
  const getOverallPct = useAppStore(s => s.getOverallPct)
  const getAlphaPct = useAppStore(s => s.getAlphaPct)
  const getWordPct = useAppStore(s => s.getWordPct)
  const getAchievements = useAppStore(s => s.getAchievements)
  const currentLanguage = useAppStore(s => s.currentLanguage)
  const score = useAppStore(s => s.score)

  const alphabets = getAlphabets(currentLanguage)
  const totalAlphaCount = countAlphabets(alphabets)
  const lessons = getLessons(currentLanguage)
  const totalWordCount = lessons.reduce((sum, cat) => sum + cat.words.length, 0)

  const overallPct = getOverallPct()
  const alphaPct = getAlphaPct()
  const wordPct = getWordPct()
  const achievements = getAchievements()
  const earnedAchievements = achievements.filter(a => a.earned)

  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'
  const borderColor = darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'

  const totalQ = score.correct + score.wrong
  const accuracy = totalQ > 0 ? Math.round((score.correct / totalQ) * 100) : 0

  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mb-5 focus-visible:ring-2 focus-visible:ring-indigo-400 lg:hidden"
        aria-label="Go back"
      >← Back</button>

      <SectionHeader title="Your Progress" icon="📊" darkMode={darkMode} />

      <div className="mt-6 lg:flex lg:gap-6 lg:items-start">
        {/* ─── Left: Main progress area ─── */}
        <div className="flex-1 space-y-5">
          {/* Overall progress — hero card */}
          <div className="rounded-2xl p-8 border" style={{ background: bgCard, borderColor }}>
            <div className="lg:flex lg:items-center lg:gap-8">
              <div className="text-center lg:text-left mb-4 lg:mb-0">
                <div className="text-6xl lg:text-7xl font-black gradient-text mb-2">{overallPct}%</div>
                <div className="text-sm font-semibold" style={{ color: textSecondary }}>Overall Completion</div>
              </div>
              <div className="flex-1">
                <div className="h-4 bg-slate-700/30 rounded-full overflow-hidden" role="progressbar" aria-valuenow={overallPct} aria-valuemin={0} aria-valuemax={100}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #10b981)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${overallPct}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <div className="mt-3 lg:flex lg:gap-6">
                  <div className="text-sm" style={{ color: textSecondary }}>
                    <span className="font-bold text-indigo-400">{learnedAlphabets.length}</span> of {totalAlphaCount} letters
                  </div>
                  <div className="text-sm" style={{ color: textSecondary }}>
                    <span className="font-bold text-emerald-400">{learnedWords.length}</span> words
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown cards — 2 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Alphabets */}
            <div className="rounded-2xl p-6 border" style={{ background: bgCard, borderColor }}>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={18} className="text-indigo-400" />
                <div className="font-bold">Alphabets</div>
              </div>
              <div className="h-3 bg-slate-700/30 rounded-full overflow-hidden mb-3" role="progressbar" aria-valuenow={alphaPct} aria-valuemin={0} aria-valuemax={100}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${alphaPct}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-3xl font-black text-indigo-400">{learnedAlphabets.length}<span className="text-lg text-slate-500">/{totalAlphaCount}</span></div>
                  <div className="text-xs" style={{ color: textSecondary }}>letters learned</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-purple-400">{alphaPct}%</div>
                </div>
              </div>

              {/* Per-group breakdown */}
              <div className="mt-4 space-y-2">
                {Object.entries(alphabets).map(([key, group]) => {
                  const groupLearned = group.chars.filter((c: any) => learnedAlphabets.includes(c.char)).length
                  const groupTotal = group.chars.length
                  const groupPct = groupTotal > 0 ? Math.round((groupLearned / groupTotal) * 100) : 0
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: textSecondary }}>{group.name.split('—')[0].trim()}</span>
                        <span className="font-semibold" style={{ color: groupPct >= 100 ? '#10b981' : textSecondary }}>{groupLearned}/{groupTotal}</span>
                      </div>
                      <div className="h-1.5 bg-slate-700/30 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${groupPct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Words */}
            <div className="rounded-2xl p-6 border" style={{ background: bgCard, borderColor }}>
              <div className="flex items-center gap-2 mb-4">
                <Target size={18} className="text-emerald-400" />
                <div className="font-bold">Words</div>
              </div>
              <div className="h-3 bg-slate-700/30 rounded-full overflow-hidden mb-3" role="progressbar" aria-valuenow={wordPct} aria-valuemin={0} aria-valuemax={100}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #10b981, #34d399)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${wordPct}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-3xl font-black text-emerald-400">{learnedWords.length}</div>
                  <div className="text-xs" style={{ color: textSecondary }}>words learned</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-emerald-400">{wordPct}%</div>
                </div>
              </div>

              {/* Quiz stats */}
              <div className="mt-4 pt-4 border-t" style={{ borderColor }}>
                <div className="text-xs font-bold mb-3" style={{ color: textSecondary }}>Quiz Performance</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: textSecondary }}>Questions answered</span>
                    <span className="font-bold text-indigo-400">{totalQ}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: textSecondary }}>Accuracy</span>
                    <span className="font-bold text-amber-400">{accuracy}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: textSecondary }}>Gunithalu learned</span>
                    <span className="font-bold text-purple-400">{learnedGunithalu.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements — grid that expands on desktop */}
          <div className="rounded-2xl p-6 border" style={{ background: bgCard, borderColor }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award size={18} className="text-amber-400" />
                <div className="font-bold">Achievements</div>
              </div>
              <div className="text-xs px-3 py-1 rounded-full" style={{ background: darkMode ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.1)', color: '#fbbf24' }}>
                {earnedAchievements.length} / {achievements.length}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {achievements.map(a => (
                <motion.div
                  key={a.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`rounded-xl p-4 text-center border transition-all cursor-default ${
                    a.earned
                      ? 'border-amber-500/30 bg-amber-500/10'
                      : 'border-slate-700/50 bg-slate-800/20 opacity-40'
                  }`}
                >
                  <div className="text-3xl mb-2">{a.earned ? a.icon : '🔒'}</div>
                  <div className="text-xs font-bold mb-0.5" style={{ color: a.earned ? '#fbbf24' : textSecondary }}>{a.title}</div>
                  <div className="text-[10px]" style={{ color: textSecondary }}>{a.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Right: Stats sidebar on desktop ─── */}
        <div className="lg:w-56 xl:w-64 space-y-3 mt-5 lg:mt-0">
          {[
            { label: '🔥 Streak', value: `${streak}d`, color: '#f59e0b', icon: Flame, iconColor: '#f59e0b' },
            { label: '⚡ XP', value: xp.toLocaleString(), color: '#6366f1', icon: Zap, iconColor: '#6366f1' },
            { label: '🏆 Level', value: `${level}`, color: '#8b5cf6', icon: Trophy, iconColor: '#8b5cf6' },
          ].map(stat => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="rounded-xl p-4 border flex items-center gap-3"
                style={{ background: bgCard, borderColor }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.iconColor}15` }}>
                  <Icon size={20} style={{ color: stat.iconColor }} />
                </div>
                <div>
                  <div className="text-xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-[10px]" style={{ color: textSecondary }}>{stat.label}</div>
                </div>
              </motion.div>
            )
          })}

          {/* Level progress */}
          <div className="rounded-xl p-4 border" style={{ background: bgCard, borderColor }}>
            <div className="text-xs mb-2" style={{ color: textSecondary }}>Level {level} → {level + 1}</div>
            <div className="h-2 bg-slate-700/30 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all" style={{ width: `${xp % 100}%` }} />
            </div>
            <div className="text-[10px] mt-1 text-right" style={{ color: textSecondary }}>{100 - (xp % 100)} XP to next</div>
          </div>

          {/* Quick stats */}
          <div className="rounded-xl p-4 border" style={{ background: bgCard, borderColor }}>
            <div className="text-xs font-bold mb-3" style={{ color: textSecondary }}>Quick Stats</div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span style={{ color: textSecondary }}>Letters</span>
                <span className="font-bold text-indigo-400">{learnedAlphabets.length}/{totalAlphaCount}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: textSecondary }}>Words</span>
                <span className="font-bold text-emerald-400">{learnedWords.length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: textSecondary }}>Quiz accuracy</span>
                <span className="font-bold text-amber-400">{accuracy}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressPage