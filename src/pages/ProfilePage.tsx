import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { LevelBadge } from '../components/ui/Gamification'
import { countAlphabets } from '../data/alphabets'
import { getAlphabets } from '../data/alphabets'
import { LANGUAGES } from '../i18n/languages'
import { APP_VERSION, APP_BUILD } from '../version'
import { Trophy, Flame, Zap, BookOpen, Target, Award, Info, AlertTriangle, Shield } from 'lucide-react'

export function ProfilePage() {
  const navigate = useNavigate()
  const darkMode = useAppStore(s => s.darkMode)
  const xp = useAppStore(s => s.xp)
  const streak = useAppStore(s => s.streak)
  const level = useAppStore(s => s.level)
  const learnedAlphabets = useAppStore(s => s.learnedAlphabets)
  const learnedWords = useAppStore(s => s.learnedWords)
  const learnedGunithalu = useAppStore(s => s.learnedGunithalu)
  const score = useAppStore(s => s.score)
  const resetProgress = useAppStore(s => s.resetProgress)
  const currentLanguage = useAppStore(s => s.currentLanguage)
  const getAchievements = useAppStore(s => s.getAchievements)

  const alphabets = getAlphabets(currentLanguage)
  const totalAlphaCount = countAlphabets(alphabets)
  const langConfig = LANGUAGES[currentLanguage]

  const achievements = getAchievements()
  const earnedCount = achievements.filter(a => a.earned).length

  const totalQ = score.correct + score.wrong
  const accuracy = totalQ > 0 ? Math.round((score.correct / totalQ) * 100) : 0

  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'
  const borderColor = darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'

  const handleReset = () => {
    if (confirm('Reset all progress? This cannot be undone.')) {
      resetProgress()
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mb-5 focus-visible:ring-2 focus-visible:ring-indigo-400 lg:hidden"
        aria-label="Go back"
      >← Back</button>

      <div className="lg:flex lg:gap-6 lg:items-start">
        {/* ─── Left: Main profile area ─── */}
        <div className="flex-1 space-y-5">
          {/* Profile hero card */}
          <div className="rounded-2xl p-8 border" style={{ background: bgCard, borderColor }}>
            <div className="lg:flex lg:items-center lg:gap-8">
              <div className="text-center lg:text-left mb-4 lg:mb-0">
                <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full mx-auto lg:mx-0 mb-4 flex items-center justify-center text-6xl" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>🌐</div>
                <div className="flex justify-center lg:justify-start gap-2"><LevelBadge level={level} /></div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-black mb-1" style={{ color: textPrimary }}>{langConfig.name} Learner</h2>
                <p className="text-sm mb-4" style={{ color: textSecondary }}>Learning {langConfig.nativeName}</p>

                {/* Quick stat pills */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'XP', value: xp.toLocaleString(), color: '#6366f1', icon: Zap },
                    { label: 'Streak', value: `${streak}d`, color: '#f59e0b', icon: Flame },
                    { label: 'Level', value: `${level}`, color: '#8b5cf6', icon: Trophy },
                  ].map(s => {
                    const Icon = s.icon
                    return (
                      <div key={s.label} className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: `${s.color}15` }}>
                        <Icon size={16} style={{ color: s.color }} />
                        <div>
                          <div className="text-sm font-bold" style={{ color: s.color }}>{s.value}</div>
                          <div className="text-[10px]" style={{ color: textSecondary }}>{s.label}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed stats — 2 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Learning stats */}
            <div className="rounded-2xl p-6 border" style={{ background: bgCard, borderColor }}>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={18} className="text-indigo-400" />
                <h3 className="font-bold">Learning Stats</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Letters learned', value: `${learnedAlphabets.length} / ${totalAlphaCount}`, color: '#6366f1', pct: totalAlphaCount > 0 ? Math.round((learnedAlphabets.length / totalAlphaCount) * 100) : 0 },
                  { label: 'Words learned', value: `${learnedWords.length}`, color: '#10b981', pct: undefined },
                  { label: 'Gunithalu learned', value: `${learnedGunithalu.length}`, color: '#8b5cf6', pct: undefined },
                  { label: 'Quizzes completed', value: `${totalQ}`, color: '#f59e0b', pct: undefined },
                  { label: 'Quiz accuracy', value: `${accuracy}%`, color: accuracy >= 80 ? '#10b981' : accuracy >= 50 ? '#f59e0b' : '#ef4444', pct: accuracy },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: textSecondary }}>{s.label}</span>
                      <span className="font-bold" style={{ color: s.color }}>{s.value}</span>
                    </div>
                    {s.pct !== undefined && (
                      <div className="h-1.5 bg-slate-700/30 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${s.pct}%`, background: s.color }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* App info */}
            <div className="rounded-2xl p-6 border" style={{ background: bgCard, borderColor }}>
              <div className="flex items-center gap-2 mb-4">
                <Info size={18} className="text-emerald-400" />
                <h3 className="font-bold">App Info</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Version', value: `v${APP_VERSION}`, color: '#6366f1' },
                  { label: 'Build', value: APP_BUILD, color: '#10b981' },
                  { label: 'Language', value: `${langConfig.name} (${langConfig.nativeName})`, color: '#8b5cf6' },
                  { label: 'Platform', value: typeof navigator !== 'undefined' && /Mobi/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop', color: '#f59e0b' },
                ].map(s => (
                  <div key={s.label} className="flex justify-between text-sm">
                    <span style={{ color: textSecondary }}>{s.label}</span>
                    <span className="font-bold" style={{ color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Reset button */}
              <div className="mt-6 pt-4 border-t" style={{ borderColor }}>
                <button
                  onClick={handleReset}
                  aria-label="Reset all progress"
                  className="w-full py-3 rounded-xl border-2 border-red-500/30 text-red-400 font-bold hover:bg-red-500/10 transition-colors text-sm flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <AlertTriangle size={16} /> Reset All Progress
                </button>
              </div>
            </div>
          </div>

          {/* Achievements — expanded grid on desktop */}
          <div className="rounded-2xl p-6 border" style={{ background: bgCard, borderColor }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award size={18} className="text-amber-400" />
                <h3 className="font-bold">Achievements</h3>
              </div>
              <div className="text-xs px-3 py-1 rounded-full" style={{ background: darkMode ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.1)', color: '#fbbf24' }}>
                {earnedCount}/{achievements.length}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`rounded-xl p-4 border transition-all ${
                    ach.earned
                      ? 'border-amber-500/40 bg-amber-500/10'
                      : darkMode
                      ? 'border-slate-700 bg-slate-800/40 opacity-50'
                      : 'border-slate-200 bg-slate-50/50 opacity-50'
                  }`}
                >
                  <div className="text-3xl mb-2">{ach.earned ? ach.icon : '🔒'}</div>
                  <div className={`text-xs font-bold ${ach.earned ? 'text-amber-400' : ''}`} style={!ach.earned ? { color: textSecondary } : undefined}>{ach.title}</div>
                  <div className="text-[10px]" style={{ color: textSecondary }}>{ach.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Right: Desktop sidebar ─── */}
        <div className="hidden lg:block lg:w-56 xl:w-64 space-y-3">
          {/* XP progress to next level */}
          <div className="rounded-xl p-4 border" style={{ background: bgCard, borderColor }}>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} style={{ color: '#6366f1' }} />
              <span className="text-xs font-bold" style={{ color: textSecondary }}>Level Progress</span>
            </div>
            <div className="text-3xl font-black gradient-text text-center mb-2">Lv.{level}</div>
            <div className="h-2 bg-slate-700/30 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all" style={{ width: `${xp % 100}%` }} />
            </div>
            <div className="text-[10px] mt-1 text-center" style={{ color: textSecondary }}>{100 - (xp % 100)} XP to Level {level + 1}</div>
          </div>

          {/* Quick numbers */}
          {[
            { label: 'Letters', value: `${learnedAlphabets.length}/${totalAlphaCount}`, color: '#6366f1', icon: BookOpen },
            { label: 'Words', value: `${learnedWords.length}`, color: '#10b981', icon: Target },
            { label: 'Quizzes', value: `${totalQ}`, color: '#f59e0b', icon: Shield },
          ].map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} className="rounded-xl p-4 border flex items-center gap-3" style={{ background: bgCard, borderColor }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
                  <Icon size={16} style={{ color: s.color }} />
                </div>
                <div>
                  <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[10px]" style={{ color: textSecondary }}>{s.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage