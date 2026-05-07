import { useAppStore } from '../store/useAppStore'
import { LevelBadge } from '../components/ui/Gamification'
import { countAlphabets } from '../data/alphabets'
import { getAlphabets } from '../data/alphabets'
import { LANGUAGES } from '../i18n/languages'
import { APP_VERSION, APP_BUILD } from '../version'

export function ProfilePage() {
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

  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'

  const handleReset = () => {
    if (confirm('Reset all progress? This cannot be undone.')) {
      resetProgress()
    }
  }

  return (
    <div className="max-w-lg mx-auto space-y-6 pb-8">
      <div className="rounded-2xl p-6 text-center border" style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}>
        <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>🌐</div>
        <h2 className="text-xl font-black mb-1" style={{ color: textPrimary }}>{langConfig.name} Learner</h2>
        <p className="text-sm mb-4" style={{ color: textSecondary }}>Learning {langConfig.nativeName}</p>
        <div className="flex justify-center gap-3"><LevelBadge level={level} /></div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total XP', value: xp, icon: '⚡', color: '#6366f1' },
          { label: 'Day Streak', value: streak, icon: '🔥', color: '#f59e0b' },
          { label: 'Level', value: level, icon: '🏆', color: '#8b5cf6' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4 text-center border" style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}>
            <div className="text-2xl">{s.icon}</div>
            <div className="text-2xl font-black mt-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: textSecondary }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-5 border" style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}>
        <h3 className="font-bold mb-4">Your Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span style={{ color: textSecondary }}>Letters learned</span>
            <span className="font-bold text-indigo-400">{learnedAlphabets.length} / {totalAlphaCount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: textSecondary }}>Words learned</span>
            <span className="font-bold text-emerald-400">{learnedWords.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: textSecondary }}>Quizzes completed</span>
            <span className="font-bold text-purple-400">{score.correct + score.wrong}</span>
          </div>
          <div className="flex justify-between text-sm" role="status" aria-live="polite">
            <span style={{ color: textSecondary }}>Quiz accuracy</span>
            <span className="font-bold text-yellow-400">
              {score.correct + score.wrong > 0 ? Math.round((score.correct / (score.correct + score.wrong)) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="rounded-2xl p-5 border" style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}>
        <h3 className="font-bold mb-4">🏆 Achievements ({earnedCount}/{achievements.length})</h3>
        <div className="grid grid-cols-2 gap-2">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`rounded-xl p-3 border transition-all ${
                ach.earned
                  ? 'border-amber-500/40 bg-amber-500/10'
                  : darkMode
                  ? 'border-slate-700 bg-slate-800/40 opacity-50'
                  : 'border-slate-200 bg-slate-50/50 opacity-50'
              }`}
            >
              <div className="text-2xl mb-1">{ach.earned ? ach.icon : '🔒'}</div>
              <div className={`text-xs font-bold ${ach.earned ? 'text-amber-400' : textSecondary}`}>{ach.title}</div>
              <div className="text-[10px]" style={{ color: textSecondary }}>{ach.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* App Info */}
      <div className="rounded-2xl p-5 border" style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}>
        <h3 className="font-bold mb-4">App Info</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span style={{ color: textSecondary }}>Version</span>
            <span className="font-bold text-indigo-400">v{APP_VERSION}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: textSecondary }}>Build</span>
            <span className="font-bold text-emerald-400">{APP_BUILD}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: textSecondary }}>Language</span>
            <span className="font-bold text-purple-400">{langConfig.name} ({langConfig.nativeName})</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleReset} aria-label="Reset all progress"
        className="w-full py-3 rounded-2xl border-2 border-red-500/30 text-red-400 font-bold hover:bg-red-500/10 transition-colors text-sm focus-visible:ring-2 focus-visible:ring-indigo-400"
      >🗑️ Reset All Progress</button>
    </div>
  )
}

export default ProfilePage